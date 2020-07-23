import React from 'react';
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
import IconLibrary from './ultis/addIcon';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';





IconLibrary.addIcon();

function App() {
  return (
    <React.Fragment>
        <NavBar/>
        <Switch>
            <Route path="/san-pham/:album" component={AlbumDetail}/>
            <Route path="/san-pham" component={Product}/>
            <Route path="/blog/:article" component={BlogArticle}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/dang-nhap" component={LogIn}/>
            <Route path="/dang-ky" component={Register}/>
            <Route exact path="/" component={HomePage}/>
        </Switch>
        <Footer/>
    </React.Fragment>
  );
}

export default App;
