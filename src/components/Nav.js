import React from 'react'
import { Link } from 'react-router-dom'
import MdShoppingCart from 'react-icons/lib/md/shopping-cart'

import { totalItems } from '../utils/helpers'

export default ({cart}) => {
  console.log(cart)
  return (
  <div className={'nav-wrapper'}>
    <Link to={`/`}>
      <a>
        <h1>Socks Unlimited</h1>
      </a>
    </Link>

    <div className={'shopping-cart-container'}>
        <Link to={`/cart`}>
          <MdShoppingCart size={25}/>
          <span>{ totalItems(cart) }</span>
        </Link>
    </div>

    <style jsx>{`
      .nav-wrapper {
        width: 100%;
        background-color: gray;
        padding: 1em 3em;
        display: flex;
        justify-content: space-between;
      }

      .shopping-cart-container {
        display: flex;
        align-items: center;
        margin-right: 2em;
        cursor: pointer;
      }
    `}</style>
  </div>
)}
