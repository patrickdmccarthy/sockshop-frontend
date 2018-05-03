import React, { Component, cloneElement } from 'react'
import fetch from 'isomorphic-unfetch'
import { withRouter } from 'react-router-dom'

const {REACT_APP_CART_SERVICE} = process.env

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

      const res = await fetch(`${REACT_APP_CART_SERVICE}/carts/${cartId}`)
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

  addItem = (item, callback) => {
    this.setState({
      cart: {
        ...this.state.cart,
        CartItems: [...this.state.cart.CartItems, item]
      }
    }, () => { if(callback) { callback() }})
  }

  addAndCheckout = (item) => {
    this.addItem(item, () => this.props.history.push('/checkout'))
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      cloneElement(child, {
        fetchCart: this.fetchCart,
        updateItemState: this.updateItemState,
        removeItem: this.removeItem,
        addItem: this.addItem,
        addAndCheckout: this.addAndCheckout,
        cart: this.state.cart
      }))

    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

export default withRouter(CartProvider);
