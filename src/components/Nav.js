import React from 'react'
import { Link } from 'react-router-dom'
import MdShoppingCart from 'react-icons/lib/md/shopping-cart'
import styled from 'styled-components';

import { totalItems } from '../utils/helpers'

const NavContainer = styled.div`
  background-color: gray;
  padding: 1em 3em;
  display: flex;
  justify-content: space-between;
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2em;
  cursor: pointer;
`;

export default ({cart}) => (
  <NavContainer>
    <Link to={`/`}>
      <a>
        <h1>Socks Unlimited</h1>
      </a>
    </Link>

    <CartContainer>
        <Link to={`/cart`}>
          <MdShoppingCart size={25}/>
          <span>{ totalItems(cart) }</span>
        </Link>
    </CartContainer>
  </NavContainer>
)
