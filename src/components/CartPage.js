import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CartItem from './CartItem'
import { updateQuantity, deleteItem } from '../services/cart'

class CartPage extends Component {
  increaseQuantity = (item) => {
    updateQuantity({...item, quantity: item.quantity + 1}, this.props.updateItemState)
  }

  decreaseQuantity = (item) => {
    if(item.quantity > 1) {
      updateQuantity({...item, quantity: item.quantity - 1}, this.props.updateItemState)
    }
  }

  handleDelete = item => {
    deleteItem(item, this.props.removeItem)
  }

  render() {
  const {cart, history} = this.props
  const totalPrice = cart && cart.CartItems ? cart.CartItems.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0) : null

  return (
    <div className={'container'}>
      <h1>Your Cart</h1>
      { cart.CartItems && cart.CartItems.map((item, i) => (
        <CartItem
          decreaseQuantity={ () => this.decreaseQuantity(item) }
          increaseQuantity={ () => this.increaseQuantity(item) }
          handleDelete={ () => this.handleDelete(item) }
          key={i}
          {...item}
        />
      ))}
      { cart.CartItems &&
        <div className={'checkout-container'}>
          <p>Total: ${ totalPrice }</p>
          <button onClick={() => history.push('/checkout')}>Checkout</button>
        </div>
      }
      <style jsx>{`
      .container {
        padding: 1.5em 0;
        display: flex;
        max-width: 900px;
        flex-direction: column;
        margin: 0 auto;
      }

      .checkout-container {
        text-align: right;
      }
    `}</style>
    </div>
    )
  }
}

export default withRouter(CartPage);
