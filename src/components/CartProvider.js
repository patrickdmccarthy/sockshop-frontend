import React, { Component, cloneElement } from 'react'
import fetch from 'isomorphic-unfetch'

const {REACT_APP_CART_SERVICE_PORT} = process.env

class CartProvider extends Component {
  constructor () {
    super()
    this.state = {
      cart: {}
    }
  }

  componentDidMount = async () => {
    try {
      const cartId = localStorage.getItem("cartId")

      const res = await fetch(`${window.location.protocol + "//" + window.location.hostname + REACT_APP_CART_SERVICE_PORT}/carts/${cartId}`)
      const data = await res.json()

      this.setState({
        cart: data
      })
    } catch(e) {
      return console.log(e);
    }
  }

  updateItemState = (item) => {
    let items = this.state.cart.CartItems.slice()
    const itemIndex = items.findIndex(i => i.id === item.id)
    items = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    this.setState({
      cart: {
        ...this.state.cart,
        CartItems: items
      }
    })
  }

  removeItem = (item) => {
    let items = this.state.cart.CartItems.slice()
    items = items.filter(i => i.id !== item.id)
    this.setState({
      cart: {
        ...this.state.cart,
        CartItems: items
      }
    })
  }

  addItem = (item) => {
    this.setState({
      cart: {
        ...this.state.cart,
        CartItems: [...this.state.cart.CartItems, item]
      }
    })
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      cloneElement(child, {
        fetchCart: this.fetchCart,
        updateItemState: this.updateItemState,
        removeItem: this.removeItem,
        addItem: this.addItem,
        cart: this.state.cart
      }))

    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

export default CartProvider
