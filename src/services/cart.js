import fetch from 'isomorphic-unfetch'

const {REACT_APP_CART_SERVICE} = process.env

export const updateQuantity = async (item, callback) => {
  try {
    const res = await fetch(`${REACT_APP_CART_SERVICE}/cartItems/${item.id}`, {
      body: JSON.stringify({quantity: item.quantity}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      mode: 'cors',
    })
    const data = await res.json()
    callback(data)
  } catch (error) {
    console.log(error)
  }
}

export const deleteItem = async (item, callback) => {
  try {
    const res = await fetch(`${REACT_APP_CART_SERVICE}/cartItems/${item.id}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE',
      mode: 'cors',
    })
    await res
    callback(item)
  } catch (error) {
    console.log(error)
  }
}
