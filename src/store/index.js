import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import cart from './slices/cart.slice'

export default configureStore({
  reducer: {

        isLoading: isLoadingSlice,
        product: productsSlice,
        cart

	}
})