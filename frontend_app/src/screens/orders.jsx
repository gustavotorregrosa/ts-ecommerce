import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders } from '../services/orders'
import { refreshAll } from '../store/order/order.actions'

export default function Orders() {

  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders.orderItems) || []
  const email = useSelector(state => state.user.email) || localStorage.getItem('email')

  useEffect(() => {
    updateOrders(email)
  }, [])

  const updateOrders = async user => {
    const _orders = await getOrders(user)
    dispatch(refreshAll(_orders))
  }


  const orderCard = order => <div className="col s12 m6">
  <div className="card blue-grey darken-1">
    <div className="card-content white-text">
      <span className="card-title">U$ {order.totalValue.toFixed(2)}</span>
      <p>
          {order.lineItems.map(lineItem => <p>{lineItem.title} x {lineItem.qty}</p>)}
      </p>
    </div>
  </div>
</div>

  return (
    <>
        <h4>Orders</h4>
        <div className="row">
         {orders.map(order => orderCard(order))}
        </div>
    </>
  )
}
