import "./App.css";
import Header from "./components/layout/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import WebFont from "webfontloader";
import React, { useEffect } from "react";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import LoginSignup from "./components/user/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/layout/header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import MyOrder from "./components/order/MyOrder";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import Contact from './components/layout/contact/Contact';
import About from './components/layout/about/About';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const stripeApiKey =
    "pk_test_51KL0EuSDefxy4XCKa5kAFoRXdRHDZemtz6DS5ADCjaQxpmpsLK1Tgw6XTBItGa2aLCIRaDm0CXV5bPx3nCzElmmf00J8K7ffYK";
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get(`/api/v1/stripeapikey`);

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    if (isAuthenticated) {
      store.dispatch(loadUser());
    }
    // getStripeApiKey();
  }, []);
  return (
    <div className="App">
      <Router>
        <Header></Header>
        {isAuthenticated && <UserOptions user={user}></UserOptions>}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>

          <Route
            path="/account"
            element={<ProtectedRoute element={<Profile />}> </ProtectedRoute>}
          ></Route>

          <Route path="/search" element={<Search />}></Route>
          <Route path="/me/update" element={<UpdateProfile />}></Route>
          <Route path="/password/update" element={<UpdatePassword />}></Route>
          <Route path="/password/forgot" element={<ForgotPassword />}></Route>
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          ></Route>
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login/shipping" element={<Shipping />}></Route>
          <Route path="/success" element={<OrderSuccess />}></Route>
          <Route
            path="/orders"
            element={<ProtectedRoute element={<MyOrder />}> </ProtectedRoute>}
          ></Route>

          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/products" element={<ProductList />}></Route>
          <Route path="/admin/product" element={<NewProduct />}></Route>
          <Route path="/admin/product/:id" element={<UpdateProduct />}></Route>
          <Route path="/admin/orders" element={<OrderList />}></Route>
          <Route path="/admin/orders/:id" element={<ProcessOrder />}></Route>
          <Route path="/admin/users" element={<UsersList />}></Route>
          <Route path="/admin/user/:id" element={<UpdateUser />}></Route>
          <Route path="/admin/reviews" element={<ProductReviews />}></Route>

          <Route>
            <Route path="/order/confirm" element={<ConfirmOrder />}></Route>

            <Route path="/order/:id" element={<OrderDetails />}></Route>
          </Route>
          <Route
            path="/account/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          ></Route>
        </Routes>

        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
