import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import "../assets/css/AppHeader.css";
import {categoryListItem} from "../types";
import {CategoryList} from "../contexts/CategoryContext";
import {CartStore} from "../contexts/CartContext";

function NavBar() {
    const categories = useContext<categoryListItem[]>(CategoryList);  // add this statment
    const { cart, dispatch } = useContext(CartStore);
    let noOfItems = 0
    let price = 0
    cart.forEach((element, index, array) => {
        price+=element.book.price*element.quantity;
        noOfItems+=element.quantity;
    });
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="navbar-brand">
            <nav className="navbar navbar-dark bg-secondary text-center">
              <Link className="navbar-brand" to="/home">
                <img  src={require("../assets/images/websitelogo.jpg")} width="40" height="40" alt="" color={"#ffffff"} />
                <h6 className="icon-title">AJ Books</h6>
              </Link>
            </nav>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active ml-3 mr-3">
              <Link className="nav-link text-center pt-3 " to="/home">
                  <i className="fa-solid fa-lg fa-house"></i>
                  <p>Home</p>
              </Link>
            </li>
            <li className="nav-item active ml-3 mr-3">
                <Link className="nav-link text-center pt-3 " to="#">
                    <i className="fa-solid fa-lg fa-arrow-right-arrow-left"></i>
                    <p> Exchange </p>
                </Link>
              </li>
              <li className="nav-item active ml-3 mr-3">
                <Link className="nav-link text-center pt-3 " to="/categories"></Link>
                    <i className="fa-solid fa-lg fa-list"></i>
                    <div className="dropdown primary-color-text">
                        <Link to="/categories">Categories <i className="fa-solid fa-angle-down"></i></Link>
                        <div className="dropdown-content">
                            {categories.map((item) => (
                                <Link to={"categories/"+item.name} key={item.categoryId} >{item.name}</Link>
                            ))}
                        </div>
                    </div>

              </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search" />
              <img
                  className="search-icon"
                  src={require("../assets/images/magnifier-icon.png")}
                  alt="Search Icon" width="20" height="20"
              />
          </form>
          
        </div>


        <i className="nav-link navbar-dark text-center  text-light ml-3 ">
            <Link to="/cart" className={"cart-icon"}><i className="fas fa-light fa-cart-shopping fa-lg hover-effect">
                <div className=" cart-count">{noOfItems}</div></i>
            </Link>
        </i>
        <i className="nav-link text-center text-white  " ><i className="fa-regular fa-xl fa-bell"></i></i>
        <i className="nav-link text-center text-white "><i className="fa-solid fa-xl fa-gear"></i></i>
      </nav>
    
  )
}

export default NavBar