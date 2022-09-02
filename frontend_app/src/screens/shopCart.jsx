import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveOrder } from '../services/orders'
import { addProduct, refresh, removeProduct} from '../store/cart/cart.actions'
import { increaseBy, refreshAll } from '../store/stock/stock.actions'
import M from 'materialize-css'
import { getStock } from '../services/stock'

export default function ShopCart() {

  const cartItems = useSelector(state => state.cart.products)
  const email = useSelector(state => state.user.email)
  const dispatch = useDispatch()

  const line = product => <tr>
    <td>{product.title}</td>
    <td>U$ { (product.price * (1 - product.discountPercentage/100)).toFixed(2) }</td>
    <td>{product.qty}</td>
    <td>U$ {product.qty * (product.price * (1 - product.discountPercentage/100)).toFixed(2)}</td>
    <td>
      <a onClick={(e) => {
          e.preventDefault()
          dispatch(removeProduct(product))
          dispatch(increaseBy({
            id: product.id,
            qty: 1
          }))
        }}
      href='#' style={{
        marginRight: '3em'
      }}>Remove</a>
      <a onClick={(e) => {
          e.preventDefault()
          dispatch(addProduct(product))
          dispatch(increaseBy({
            id: product.id,
            qty: -1
          }))
        }} href='#'>One more!</a>
    </td>
  </tr>

  const sendOrder = async e => {
    e.preventDefault()
    try{
      await saveOrder(cartItems, email)
      M.toast({html: 'Order saved'})
      
      //clean cart
      dispatch(refresh([]))

      //reset stock items
      let stockItems = await getStock()
      dispatch(refreshAll(stockItems))


    } catch(e){
      console.log({e})
    }
    
  }

  return (
    <>
      <h4>ShopCart</h4>

      <div class="row">
            <div class="col s8">
              <table className="highlight responsive-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Unit price</th>
                    <th>Qty</th>
                    <th>Total price</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems && cartItems.map(cItem => line(cItem))}
                </tbody>
              </table>
            </div>
            <div class="col s4">

              <p>Total price: U$ {cartItems.reduce((a, b) => a + b.qty * (b.price * (1 - b.discountPercentage/100)).toFixed(2), 0)}</p>
              <a onClick={e => sendOrder(e)} class="waves-effect waves-light btn"><i class="material-icons left">shopping_cart</i>buy</a>
            </div>
      </div>
    </>
  )
}
