import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import CartProvider from "./components/CartProvider";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

export default () => (
  <Router>
    <CartProvider>
      <Routes />
    </CartProvider>
  </Router>
)

const Routes = (props) => (
  <div>
    <Nav {...props}/>
    <Route exact path="/" component={Home}/>
    <Route path="/product/:id" render={({match}) => <Product match={match} {...props} />}/>
    <Route path="/cart" render={() => <Cart {...props}/> }/>
    <Route path="/checkout" component={Checkout}/>
    <Route path="/thankyou" component={ThankYou}/>
  </div>
)

const a = () => (
  <div>
    <h1>test</h1>
    <Route path="/cart" component={Cart}/>
  </div>
)
