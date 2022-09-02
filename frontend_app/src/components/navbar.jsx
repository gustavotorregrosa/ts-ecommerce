import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../store/user/user.actions';
import 'materialize-css/dist/css/materialize.min.css'
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
import M from 'materialize-css'

export default function Navbar() {
    let navBarMobile = useRef(null)
    let instance
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const email = useSelector(state => state.user.email)

    useEffect(() => {
        instance = M.Sidenav.init(navBarMobile.current, {})
    }, [])

    const redirect = (e, page) => {
        e.preventDefault()
        navigate('/'+page)
    }

    const loginLink = () => {
        if(email){
            return  <li><a href="#" style={{
                color: 'black'
            }}
            onClick={e => {
                e.preventDefault()
                dispatch(logout())
                localStorage.removeItem('email')

            }}>Logout - {email}</a></li>
        }else {
            return  <li><a href="#" style={{
                color: 'black'
            }}
            onClick={e => {
                e.preventDefault()
                let _email = prompt('Your email:')
                dispatch(login(_email))
                localStorage.setItem('email', _email)

            }}
            >Login</a></li>
        }
    }


    return (<div>
        <nav className="transparent">
            <div className="nav-wrapper container">
                <a href="#" onClick={e => redirect(e, '')} className="brand-logo" style={{
                    color: 'black'
                }}>Amazing Devs Shopp</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#" onClick={e => redirect(e, 'products')} style={{
                        color: 'black'
                    }}>Products</a></li>

                    <li><a href="#" onClick={e => redirect(e, 'shopping-cart')} style={{
                        color: 'black'
                    }}>Shopping Cart</a></li>

                    <li><a href="#" onClick={e => redirect(e, 'orders')} style={{
                        color: 'black'
                    }}>Orders</a></li>

                    {loginLink()}
                </ul>

            </div>
        </nav>

        <ul ref={navBarMobile} className="sidenav" id="mobile-demo">
            <li><a href="#" onClick={e => redirect(e, 'products')}>Products</a></li>
            <li><a href="#" onClick={e => redirect(e, 'shopping-cart')}>Shopping Cart</a></li>
            <li><a href="#" onClick={e => redirect(e, 'orders')} style={{
                        color: 'black'
                    }}>Orders</a></li>
            {loginLink()}
        </ul>

    </div>)
}
