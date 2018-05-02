import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import fetch from 'isomorphic-unfetch'

const {REACT_APP_PRODUCT_SERVICE, REACT_APP_CART_SERVICE} = process.env

const setUserId = () => {
  const randomId = Math.floor(Math.random() * 10E8)
  localStorage.setItem("userId", randomId)
}

const setCartId = async () => {
  const res = await fetch(`${REACT_APP_CART_SERVICE}/carts`, {
    body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
  })
  const data = await res.json()
  localStorage.setItem("cartId", data.id)
}

class Home extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  componentDidMount = async function() {
    try {
      const res = await fetch(`${REACT_APP_PRODUCT_SERVICE}/products`)
      const data = await res.json()
      const { products } = data
      this.setState({ products })
    } catch(e) {
      return console.log(e);
    }


    if (localStorage.getItem("userId") === null) {
      setUserId()
    }

    if (localStorage.getItem("cartId") === null) {
      setCartId()
    }
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <div className={"product-container"}>
          {products && products.map((product) => (
            <div key={product.id} className={"product"}>
              <Link to={`/product/${product.id}`}>
                <div>
                  <div>
                    <img src={product.img.small} />
                  </div>
                  <span>{product.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Home
