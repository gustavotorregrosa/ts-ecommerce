import React from 'react'
import ProductCard from '../components/productCard'
import { useSelector, useDispatch } from 'react-redux'

export default function Products() {

  let stockItems = useSelector(state => state.stock.stockItems)
  
  return (
    <>
        <h4>Products</h4>
        <div className="row">
            {stockItems.map(product => (<ProductCard key={product.id} productID={product.id}/>))}
        </div>
    </>
  )
}
