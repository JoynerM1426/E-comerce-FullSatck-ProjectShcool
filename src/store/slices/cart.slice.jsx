import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const cartProducts = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload
    }

  }
})

export const thunkCartGet = () => async (dispatch) => {
  try {
    const response = await axios
      .get(`${import.meta.env.VITE_API_URL}/carts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

    if (response.status === 200) {
      dispatch(setCart(response.data))
    }
  } catch (response) {
    if (response.status === 404) {
      dispatch(setCart([]))
    } else {

      console.error(response)
    }
  }
}

export const thunkCartPost = (body) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(`${import.meta.env.VITE_API_URL}/carts`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    // .then(() => dispatch(thunkCartGet()))
     .then((resp)=>console.log(resp))
    .catch((resp) => console.log(resp))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartProducts.actions;

export default cartProducts.reducer;
