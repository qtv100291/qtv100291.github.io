import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Product from './components/Product';
import AlbumDetail from'./components/AlbumDetail';
import Blog from './components/Blog';
import BlogArticle from './components/BlogArticle';
import LogIn from './components/LogIn';
import Register from './components/Register';
import ScrollTopIcon from './components/common/scrollTopIcon';
import PurchaseGuidance from './components/PurchaseGuidance';
import ShoppingCart from './components/ShoppingCart';
import ContactUs from './components/ContactUs';
import ServicePolicy from './components/ServicePolicy';
import Payout from './components/Payout';
import IconLibrary from './ultis/addIcon';
import authService from './services/loginService';
import shoppingCartFunc from './ultis/shoppingCartFunc';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';




IconLibrary.addIcon();



class App extends Component {
  state = { }
  async componentDidMount() {
    //Load Shopping Cart
    const shoppingCart = shoppingCartFunc.loadCartLocal()
    this.setState({ shoppingCart });
    //Authentication
    const user = await authService.getCurrentUser();
    const timeNow = Date.now()/1000;
    if (user && user.exp > timeNow) {
      const userId = user.sub
      console.log(user.sub)
      const userName = await authService.getCurrentUserName(userId)
      user.name = userName;
      this.setState({ user });
    }
    else return
  }

  handleUpdateShoppingCart = newItem => {
    const shoppingCartPrev = this.state.shoppingCart ? [...this.state.shoppingCart] : new Array(0);
    const shoppingCart = shoppingCartFunc.addItemToShoppingCart(shoppingCartPrev, newItem);
    this.setState({ shoppingCart });
    toast.success('Đã thêm vào giỏ hàng', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
  }

  handlePlusQuantity = id => {
    const newShoppingCart = [...this.state.shoppingCart]
    for (let item of newShoppingCart){
      if ( item.id === id ){
        item.count += 1
      }
    }
    this.setState({ shoppingCart : newShoppingCart})
    shoppingCartFunc.saveCartLocal(newShoppingCart);
  }

  handleMinusQuantity = id => {
    const newShoppingCart = [...this.state.shoppingCart]
    for (let item of newShoppingCart){
      if ( item.id === id ){
        item.count += -1
      }
    }
    this.setState({ shoppingCart : newShoppingCart})
    shoppingCartFunc.saveCartLocal(newShoppingCart);
  }

  handleCheckEmpty = (id, input) => {//when input field loses focus, if input.value is empty, add value = 1 to input
    const newShoppingCart = [...this.state.shoppingCart];
    if ( input.value !== "") return 
    else {
      for (let item of newShoppingCart) {
        if (item.id === id ){
          item.count = 1;
          break;
        }
      }
      this.setState({ shoppingCart : newShoppingCart})
      shoppingCartFunc.saveCartLocal(newShoppingCart);
    }
  } 

  handleChangeQuantity = (id , input) => {
    const newShoppingCart = [...this.state.shoppingCart];
    for (let item of newShoppingCart){
      if ( item.id === id ){
        if (input.value === "") item.count = ""
        else item.count = parseInt(input.value)
        break
      }
    }
    this.setState({ shoppingCart : newShoppingCart})
    shoppingCartFunc.saveCartLocal(newShoppingCart);
    
    
  }

  handleDeleteItem = id => {
    const newShoppingCart = [...this.state.shoppingCart].filter(item => item.id !== id);
    this.setState({ shoppingCart : newShoppingCart})
    shoppingCartFunc.saveCartLocal(newShoppingCart);
  } 

  render() { 
    const {user, shoppingCart} = this.state
    return ( 
      <React.Fragment>
        <ToastContainer/>
        <NavBar user = {user} shoppingCart= {shoppingCart}/>
        <Switch>
            <Route path="/san-pham/:album" render={(props) => <AlbumDetail {...props} updateShoppingCart= {this.handleUpdateShoppingCart}/>}/>
            <Route path="/san-pham" render={(props) => <Product {...props} updateShoppingCart= {this.handleUpdateShoppingCart}/>}/>
            <Route path="/blog/:article" component={BlogArticle}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/dang-nhap" component={LogIn}/>
            <Route path="/dang-ky" component={Register}/>
            <Route path="/huong-dan-mua-hang" component={PurchaseGuidance}/>
            <Route path="/dieu-khoan-dich-vu" component={ServicePolicy}/>
            <Route path="/lien-he" component={ContactUs}/>
            <Route path="/gio-hang"
              render={(props) => <ShoppingCart {...props} 
              shoppingCart ={ shoppingCart } 
              onPlusQuantity = {this.handlePlusQuantity}
              onMinusQuantity = {this.handleMinusQuantity}
              onChangeQuantity = {this.handleChangeQuantity}
              onDeleteItem = {this.handleDeleteItem}
              onCheckEmpty = {this.handleCheckEmpty}
            />}/>
            <Route path="/thanh-toan" component={Payout}/>
            <Route exact path="/" render={(props) => <HomePage {...props} updateShoppingCart= {this.handleUpdateShoppingCart}/>}/>
        </Switch>
        <ScrollTopIcon/>
        <Footer/>
    </React.Fragment>
     );
  }
}
 
export default App;

