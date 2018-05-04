import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components';

const Container = styled.div`
  padding: 5%;
  display: flex;
  flex-wrap: wrap;
`;

const Product = styled.div`
  width: 33%;
  text-align: center;
  margin-bottom: 2em;
  cursor: pointer;
`

const {REACT_APP_PRODUCT_SERVICE_PORT, REACT_APP_CART_SERVICE_PORT} = process.env

const setUserId = () => {
  const randomId = Math.floor(Math.random() * 10E8)
  localStorage.setItem("userId", randomId)
}

const setCartId = async () => {
  const res = await fetch(`${window.location.protocol + "//" + window.location.hostname + REACT_APP_CART_SERVICE_PORT}/carts`, {
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
      const res = await fetch(`${window.location.protocol + "//" + window.location.hostname + REACT_APP_PRODUCT_SERVICE_PORT}/products`)
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
        <Container>
          {products && products.map((product) => (
            <Product key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div>
                  <div>
                    <img src={product.img.small} alt={product.name} />
                  </div>
                  <span>{product.name}</span>
                </div>
              </Link>
            </Product>
          ))}
        </Container>
      </div>
    )
  }
}

export default Home
