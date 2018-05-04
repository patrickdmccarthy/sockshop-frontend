import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import ProductPage from '../components/ProductPage'

const {REACT_APP_PRODUCT_SERVICE_PORT} = process.env

class Product extends Component {
  constructor () {
    super()
    this.state = {
      product: {}
    }
  }

  componentDidMount = async () => {
    try {
      const { id } = this.props.match.params
      const res = await fetch(`${window.location.protocol + "//" + window.location.hostname + REACT_APP_PRODUCT_SERVICE_PORT}/product/${id}`)
      const product = await res.json()

      this.setState({
        product
      })
    } catch(e) {
      return console.log(e);
    }
  }

  render() {
    const { product } = this.state

    return <ProductPage product={product} {...this.props}/>
  }
}

export default Product
