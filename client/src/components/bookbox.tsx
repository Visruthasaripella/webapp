import React, {useContext} from "react";
import "../assets/css/AppHeader.css";
import {BookItem} from "../types";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";

function BookBox(props:BookItem){
    const  {dispatch} = useContext(CartStore);
    const addBookToCart = () => {
        dispatch({ type: CartTypes.ADD, item:props, id: props.bookId });
    };

    return (
        <div className="shadow">
            <div className="p-2 text-center" >
                <div className="image-container">
                    <img src={require("../assets/images/books/images/"+props.imgu)} width="150" height="200" alt={props.title}/>
                    {props.isPublic &&
                        <button className={"read-now-button"}><i className="fa-solid fa-book-open"></i></button>
                    }
                </div>
                <h5 className="book-name text-center" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.title}</h5>
                <div className="d-flex flex-row p-2">
                    <i className="fa-regular fa-user"></i>
                    <p className="pl-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.author}</p></div>
                <h6 className="book-cost">${props.price}</h6>
            </div>
            <div className="text-center d-flex flex-column m-1">
                <button className="btn btn-secondary mb-3 text-center" onClick={addBookToCart}><i className="fa-solid fa-cart-shopping"></i> Add to Cart </button>
            </div>
        </div>
    );
}
export default BookBox;