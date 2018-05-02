import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import CartProvider from "./components/CartProvider";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

const history = createBrowserHistory();

history.listen(function (location) {
  window.ga('set', 'page', location.pathname + location.search);
  window.ga('send', 'pageview', location.pathname + location.search);
});

export default () => (
  <Router history={history}>
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
