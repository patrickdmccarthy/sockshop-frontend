import fetch from 'isomorphic-unfetch'
import serialize from 'form-serialize';

const {REACT_APP_CART_SERVICE} = process.env

export const checkout = async (form, callback) => {
  const address = serialize(form, { hash: true })
  const orderData = {
    id: localStorage.getItem("cartId"),
    ...address
  }

  try {
    const res = await fetch(`${REACT_APP_CART_SERVICE}/checkout`, {
      body: JSON.stringify(orderData),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      mode: 'cors',
    })
    const data = await res.json()
    if(data.errors) {
      throw('Zip Code must be 5 characters')
    } else {
      callback()
    }
    console.log(data)
  } catch (error) {
    alert(error)
  }
}

