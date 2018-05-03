import React from 'react'
import isEmpty from 'lodash.isempty'

import { addToCart } from '../services/product'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 3em;
`;

const ImageContainer = styled.div`
  width: 50%;
`;

const DetailsContainer = styled.div`
  width: 50%;
  padding-left: 8%;
  padding-right: 8%;
`;

const Image = styled.img`
  max-width: 100%;
`;

export default ({addItem, addAndCheckout, cart, product}) => (
    <div>
      { !isEmpty(product) &&
        <Container>
          <ImageContainer>
            <Image src={product.img.medium} />
          </ImageContainer>
          <DetailsContainer>
            <h1>{product.name}</h1>
            <p>${product.price}</p>
            <p>{product.text}</p>
            <div>{
               cart.CartItems && cart.CartItems.map(item => item.itemId).includes(product.id)
              ?
                <button disabled={true}>Already Added</button>
              :
                <div>
                  <button onClick={() => addToCart(product, addItem)}>Add to Cart</button>
                  <button onClick={() => addToCart(product, addAndCheckout)}>Quick Buy</button>
                </div>
                }
              </div>
            </DetailsContainer>
          </Container>
      }
  </div>
)
