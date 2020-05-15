import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// extends interface preserving the lazy loading model
export interface State extends fromRoot.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initalState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
};

const getProductFeatureState =
createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);


export const getCurrentProuct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);


export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export function reducer(state = initalState, action): ProductState {

    switch (action.type) {

        case 'TOGGLE_PRODUCT_CODE' :
               return {
                ...state,
                showProductCode: action.payload
            };

        default:
            return state;
    }
}
