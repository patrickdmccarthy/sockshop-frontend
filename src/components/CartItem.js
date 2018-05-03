import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-bottom: 2em;
`;

const Image = styled.img`
  width: 100%;
`;

const Section = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export default ({decreaseQuantity, increaseQuantity, handleDelete, img, name, price, quantity}) => (
  <Container>
    <Section>
      <Image src={img.small} />
    </Section>
    <Section>{name}</Section>
    <Section>{`$${price}`}</Section>
    <Section>
      <button onClick={decreaseQuantity}>-</button>
      Quantity: {quantity}
      <button onClick={increaseQuantity}>+</button>
    </Section>
    <DeleteWrapper>
      <button onClick={handleDelete}>Delete item</button>
    </DeleteWrapper>
  </Container>
)
