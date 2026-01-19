# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nutric is a nutrition tracking application with a Spring Boot backend, Angular frontend, and Keycloak authentication. It integrates with the Yazio API for food database search and uses PostgreSQL for data persistence.

## Common Commands

### Backend (Spring Boot)

```bash
# Build the backend
cd backend && ./gradlew build

# Run tests
cd backend && ./gradlew test

# Run the backend (dev mode with local DB)
cd backend && ./gradlew bootRun --args='--spring.profiles.active=dev'

# Clean build artifacts
cd backend && ./gradlew clean
```

### Frontend (Angular)

```bash
# Install dependencies
cd frontend && npm install

# Start dev server (http://localhost:4200)
cd frontend && npm start

# Build for production
cd frontend && npm run build

# Run tests
cd frontend && npm test

# Analyze bundle size
cd frontend && npm run analyze-bundle
```

### Docker Services

```bash
# Start PostgreSQL and Keycloak (required for local development)
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f keycloak
docker-compose logs -f postgres
```

### Environment Setup

**Backend**: Copy `backend/.env.example` to `backend/.env` and configure Yazio API credentials:
```
YAZIO_API_CLIENT_ID=your_client_id
YAZIO_API_CLIENT_SECRET=your_client_secret
YAZIO_API_USER=your_yazio_email
YAZIO_API_PASSWORD=your_yazio_password
```

**Database**: Default credentials (dev mode):
- Host: localhost:5432
- Database: nutric
- User: postgresuser
- Password: postgrespassword

**Keycloak**: Access at http://localhost:8080
- Admin console: admin/admin
- Realm: nutric
- Frontend client: frontend

## Architecture

### Backend - Clean Architecture Pattern

The backend follows Clean/Hexagonal Architecture with clear separation of concerns:

**Layers**:
- **Controllers** (`/controllers`): REST endpoints, extract user context from JWT via `@RequestAttribute` (injected by `UserInterceptor`)
- **Use Cases** (`/use_cases`): Business logic, one class per operation (e.g., `SearchFoodUseCase`, `TrackFoodUseCase`)
- **Repositories** (`/out/db/repositories`): Spring Data JPA interfaces for data access
- **Adapters** (`/out`): External integrations (DB entities, HTTP clients)

**Key Patterns**:
- **User Context**: `UserInterceptor` extracts JWT claims (`userUuid`, `userFirstName`, `userLastName`, `userEmail`) and sets them as request attributes
- **DTOs**: Input/output DTOs in `/use_cases/dto` and `/dto/in` separate domain models from API contracts
- **Factories**: Reusable DTO construction (e.g., `ProductDataFactory`, `LastTrackedAmountDataFactory`)
- **Constructor Injection**: All dependencies injected via constructor for testability

**Security**:
- Stateless OAuth2 Resource Server with JWT validation
- All endpoints require authentication
- Token validation against Keycloak issuer-uri
- User context extracted once per request in interceptor

**External API Integration**:
- **Yazio API**: Food database search via `YazioSearchService`
- **Token Management**: `YazioBearerTokenProvider` handles OAuth2 token lifecycle with automatic refresh on 401

### Frontend - Angular Standalone Components

**Architecture**:
- **Standalone Components**: No NgModules, modern Angular 19 approach
- **Signals**: Reactive state using Angular Signals (not RxJS for UI state)
- **Services**: API communication layer (`ProductSearchService`, `TrackingEntriesService`, `ProfileService`, `DayService`)
- **Guards**: Route protection via `isAuthenticated` guard
- **Keycloak Integration**: `keycloak-angular` with auto-token refresh

**Key Patterns**:
- **Service Layer**: HTTP abstraction, components don't directly call HttpClient
- **Lazy Loading**: Routes loaded on demand
- **State Management**: `SelectedDateService` persists selected day using Signals
- **Authentication**: Keycloak interceptor auto-injects Bearer token for `/api/*` requests
- **UI Library**: PrimeNG 19 + Tailwind CSS 4

**Routing**:
- `/` - DashboardComponent (today's meals and nutrition summary)
- `/track` - TrackFoodScreenComponent (search and log food)
- `/profile` - ProfileComponent (edit goals)

### Database Schema

**Key Tables**:
- **profile**: User-centric table using Keycloak UUID as PK, stores default goals
- **day**: Per-user per-date snapshot, denormalizes goals from profile (allows per-day goal changes)
- **product**: Dual identification (`uuid` for local ID, `externalUuid` for Yazio ID), caches nutrition facts
- **tracking_entry**: Immutable audit trail with denormalized nutrition values, `tracked_in_base_unit` flag preserves user intent

**Migrations**: Flyway sequential migrations (V1-V7) in `backend/src/main/resources/db/migration`

**Important Design Decisions**:
1. **Nutrition Caching**: TrackingEntry snapshots nutrition values at tracking time (product changes don't affect past entries)
2. **Day Snapshot**: Goals stored per day for historical accuracy
3. **Serving Unit Tracking**: `tracked_in_base_unit` distinguishes "100g" from "1 portion"

### API Structure

**Base URL**: `/api` (all require authentication)

**Endpoints**:
- `GET /api/foods/search?query={query}` - Search products (Yazio + local)
- `GET /api/days?day={YYYY-MM-DD}` - Get day summary with goals
- `GET /api/days/{YYYY-MM-DD}/tracking-entries` - List entries for a day
- `POST /api/days/{YYYY-MM-DD}/tracking-entries` - Track food
- `PUT /api/days/{YYYY-MM-DD}/tracking-entries/{uuid}` - Update entry
- `DELETE /api/days/{YYYY-MM-DD}/tracking-entries/{uuid}` - Delete entry
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile goals
- `GET /api/last-tracked-foods` - Get recently tracked foods

## Important Implementation Details

### Adding New Endpoints

1. Create a new controller in `/controllers` with `@RestController` and `@RequestMapping`
2. Extract user context from `@RequestAttribute` parameters (set by `UserInterceptor`)
3. Create a use case in `/use_cases` with `@Component`
4. Define input/output DTOs in `/use_cases/dto` or `/dto/in`
5. Update frontend service in `/services` to call the new endpoint
6. Add TypeScript models in `/data/models` if needed

### Database Changes

1. Create a new migration file: `V{next_number}__{description}.sql` in `backend/src/main/resources/db/migration`
2. Flyway validates and runs migrations on startup
3. Never modify existing migration files
4. Update JPA entities in `/out/db/entities` to match schema
5. Add repository methods in `/out/db/repositories` if needed

### Authentication Flow

**Backend**:
1. Request arrives with `Authorization: Bearer <jwt_token>`
2. Spring Security validates token against Keycloak issuer-uri
3. `UserInterceptor` extracts claims and sets request attributes
4. Controller accesses user context via `@RequestAttribute`

**Frontend**:
1. User redirects to Keycloak login (`onLoad: 'login-required'`)
2. Token stored in session by `keycloak-angular`
3. Keycloak interceptor auto-injects token for `/api/*` requests
4. Auto-refresh on inactivity (60s timeout)

### Working with Units and Nutrition

**Base Units**: GRAMS, ML (stored in enum)

**Serving Units**: Custom units like "portion", "tbsp" (stored as string in ProductDbModel.servingUnit)

**Amount Conversion**:
- Frontend converts between serving unit and base unit using `baseUnitAmount`
- Backend stores amounts in base unit for calculations
- `trackedInBaseUnit` flag preserves whether user tracked in base unit or serving unit

**Nutrition Calculation**:
- Stored per base unit (e.g., per 100g)
- Multiply by amount to get total nutrition for tracking entry
- TrackingEntry denormalizes nutrition values (snapshot at tracking time)

### Testing

**Backend**:
- JUnit 5 + Spring Boot Test
- Tests in `backend/src/test/java`
- Run specific test: `cd backend && ./gradlew test --tests "ClassName.testMethod"`

**Frontend**:
- Jasmine + Karma
- Tests in `*.spec.ts` files next to components
- Run in watch mode: `cd frontend && npm test`
- Single run: `cd frontend && npm test -- --watch=false`

## Technology Stack

**Backend**: Spring Boot 3.4.4, Spring Security OAuth2, Spring Data JPA, PostgreSQL, Flyway, Lombok, Java 23

**Frontend**: Angular 19.2, Standalone Components, Signals, PrimeNG 19, Tailwind CSS 4, Keycloak-Angular 19, ZXing (barcode)

**Infrastructure**: Docker, Keycloak 26.1.4, PostgreSQL
