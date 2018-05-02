import fetch from 'isomorphic-unfetch'

const {REACT_APP_CART_SERVICE} = process.env

export const addToCart = async (product, callback) => {
  const { price, name, img, id } = product
  const cartId = localStorage.getItem("cartId")
  const cartItem = {
    id,
    price,
    name,
    img,
    cartId
  }

  const res = await fetch(`${REACT_APP_CART_SERVICE}/cartItems`, {
    body: JSON.stringify(cartItem),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
  })
  const data = await res.json()
  callback(data)
}
