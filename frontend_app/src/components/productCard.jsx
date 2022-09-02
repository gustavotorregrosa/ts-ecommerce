import React, {useEffect, useRef} from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../store/cart/cart.actions'
import { increaseBy } from '../store/stock/stock.actions'


export default function ProductCard({productID}) {

    const product = useSelector(state => state.stock.stockItems.find(p => p.id == productID))

    const dispatch = useDispatch()

    let carousel = useRef(null)
    let instance

    useEffect(() => {
        instance = M.Carousel.init(carousel.current, {})
    }, [])

    const addProductToShopCart = (e, product) => {
        e.preventDefault()
        if(product.stock == 0){
            M.toast({html: 'Zero stock'})
            return
        }
        dispatch(addProduct(product))
        dispatch(increaseBy({
            id: product.id,
            qty: -1
        }))

        M.toast({html: 'Product added'})
    }

    return (
        <div className="col s12 m6 l4">
            <div className="card" >
                <div className="card-image">
                    <div  ref={carousel} className="carousel">
                        {product.images.map(image => <a key={image} className="carousel-item" href="#!"><img src={image} /></a>)}
                    </div>

                    <span className="card-title" style={{
                        color: 'black'
                    }}>{product.title}</span>
                    <a onClick={e => addProductToShopCart(e, product) } className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                </div>
                <div className="card-content" style={{
                    height: 300
                }}>
                    <p>{product.description}</p>
                    <p>Price: <span style={{
                        textDecoration: 'line-through'
                    }}>U$ {product.price}</span> U$ {(product.price * (1 - product.discountPercentage/100)).toFixed(2)} </p>

                    <p>Stock: {product.stock}</p>
                
                </div>
            </div>
        </div>
    )
}
