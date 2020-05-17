import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../../state/product.actions';
import { ProductEffects } from '../state/product.effects';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  componentActive = true;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>,
    private productService: ProductService,
    private productEffect: ProductEffects) { }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode);

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.pipe(select(fromProduct.getCurrentProuct),
      takeWhile(() => this.componentActive))
      .subscribe((currentProduct) => this.selectedProduct = currentProduct);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }


  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
