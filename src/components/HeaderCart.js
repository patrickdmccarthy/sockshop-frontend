import React from 'react'
import MdShoppingCart from 'react-icons/lib/md/shopping-cart'
import { totalItems } from '../utils/helpers'

export default ({fetchCart, cart}) => (
  <div>
    <MdShoppingCart size={25}/>
    <span>{ totalItems(cart) }</span>
  </div>
)
