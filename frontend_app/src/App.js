import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar';
import Products from './screens/products';
import Home from './screens/home';
import ShopCart from './screens/shopCart';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './store/user/user.actions';
import { getStock } from './services/stock'
import {refreshAll, increaseBy} from './store/stock/stock.actions'
import { refresh } from './store/cart/cart.actions';
import Orders from './screens/orders';


function App() {

  const dispatch = useDispatch()

  const listStock = async () => {
    let stockItems = await getStock()
    dispatch(refreshAll(stockItems))
  }

  const getEmail = () => {
    const email = localStorage.getItem('email')
    if(email){
      dispatch(login(email))
    }
  
  }

  const getCartFromLocal = () => {
    let products = JSON.parse(localStorage.getItem('cart'))
    if(!products){
      return
    }
    dispatch(refresh(products))

    setTimeout(() => {
      products.map(product => {
        dispatch(increaseBy({
          id: product.id,
          qty: -product.qty
        }))
      })
    }, 500)

  }

  useEffect(() => {
    listStock()
    getEmail()
    getCartFromLocal()
  }, [])


  return <>
            <BrowserRouter>
                <Navbar/>
                <br/><br/>
                <main className='container'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<Products/>} />
                    <Route path='shopping-cart' element={<ShopCart />}/>
                    <Route path='/orders' element={<Orders />}/>
                  </Routes>
                </main>
            </BrowserRouter>
  </>
}

export default App;
