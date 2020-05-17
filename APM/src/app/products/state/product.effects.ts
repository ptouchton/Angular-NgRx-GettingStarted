import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from '../../state/product.actions';
import {  map, switchMap, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';
@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions,
                private productService: ProductService) { }

    @Effect()
    loadProducts = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        switchMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );
}
