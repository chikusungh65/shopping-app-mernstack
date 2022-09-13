import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Footer from './Components/footer';
import Header from './Components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetails from './screens/ProductDetails';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
  return (
    <Router>
    <Header/>
    <main className="my-3">
    <Container>
      
      <Route path="/" component={HomeScreen} exact/>
      <Route path="/login" component={LoginScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/shipping" component={ShippingScreen}/>
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/product/:id" component={ProductDetails}/>
      <Route path="/cart/:id?" component={CartScreen}/>
    </Container>
    </main>
    <Footer/>
      
    </Router>
  );
}

export default App;
