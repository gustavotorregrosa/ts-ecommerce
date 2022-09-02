import { createStore, combineReducers } from 'redux'
import userReducer from './user/user.reducer'
import stockReducer from './stock/stock.reducer'
import cartReducer from './cart/cart.reducer'
import orderReducer from './order/order.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    stock: stockReducer,
    cart: cartReducer,
    orders: orderReducer
})

export const store = createStore(rootReducer)