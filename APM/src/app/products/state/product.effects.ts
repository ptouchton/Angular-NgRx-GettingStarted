import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from '../../state/product.actions';
import {  map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';
@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions,
                private productService: ProductService) { }

    @Effect()
    loadProducts = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        switchMap(() => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );

    @Effect()
    updateProduct = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) =>
        this.productService.updateProduct(product).pipe(
            map(updateProduct => (new productActions.UpdateProductSuccess(updateProduct))),
            catchError(err => of(new productActions.UpdateProductFail(err)))
        ))
    );

    @Effect()
    createProduct = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.CreateProduct),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Product) =>
        this.productService.createProduct(product).pipe(
            map(newProduct => (new productActions.CreateProductSuccess(newProduct))),
            catchError(err => of(new productActions.CreateProductFail(err)))
        ))
    );

    @Effect()
    deleteProduct = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((id: number) =>
        this.productService.deleteProduct(id).pipe(
            map(() => (new productActions.DeleteProductSuccess(id))),
            catchError(err => of(new productActions.UpdateProductFail(err)))
        ))
    );
}
