import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import MealType from '../../models/meal-type.enum';
import { Button } from 'primeng/button';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import ProductSearchService from '../../services/product-search.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subscription,
} from 'rxjs';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { ProductCardComponent } from './product-card/product-card.component';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { Product } from '../../models/product.model';
import { isValidDate } from '../../utils/date.utils';
import { TrackDialogComponent } from './track-dialog/track-dialog.component';

@Component({
  selector: 'app-track-food-screen',
  imports: [
    Button,
    PageHeaderComponent,
    InputText,
    ReactiveFormsModule,
    ProgressSpinner,
    Message,
    ProductCardComponent,
    InputGroup,
    InputGroupAddon,
    TrackDialogComponent,
  ],
  templateUrl: './track-food-screen.component.html',
  standalone: true,
  styleUrl: './track-food-screen.component.scss',
})
export class TrackFoodScreenComponent implements OnInit, OnDestroy {
  day: string | null = null;
  mealType: MealType | null = null;
  trackDialogVisible: boolean = false;
  selectedProduct: Product | null = null;

  queryControl: FormControl<string | null> = new FormControl<string | null>(
    null,
  );
  trackFoodForm: FormGroup = new FormGroup({
    queryControl: this.queryControl,
  });

  search$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected productSearchService: ProductSearchService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.day = params['day'];
      this.mealType = params['mealType'];
    });

    this.subscriptions.push(
      this.queryControl.valueChanges
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe((query) => this.triggerSearch(query)),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  triggerSearch(query: string | null): void {
    if (!query || query.length < 3) {
      return;
    }

    this.productSearchService.searchProducts(query);
  }

  onBack(): void {
    this.productSearchService.reset();
    this.router.navigate(['/']);
  }

  clearQuery(): void {
    this.queryControl.setValue('');
  }

  showTrackDialog(product: Product): void {
    this.trackDialogVisible = true;
    this.selectedProduct = product;
  }

  get shouldShowSearchHelper(): boolean {
    const length = this.queryControl.value?.length ?? 0;
    return length > 0 && length < 3;
  }

  get isValidDay(): boolean {
    if (!this.day) {
      return false;
    }

    return isValidDate(this.day);
  }
}
