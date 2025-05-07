FROM gradle:8.13-jdk23-noble AS build
WORKDIR /app

COPY build.gradle* settings.gradle* gradle/ ./
RUN gradle --no-daemon dependencies
COPY . .
RUN gradle bootJar --no-daemon --stacktrace

FROM eclipse-temurin:23-jdk-alpine
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
