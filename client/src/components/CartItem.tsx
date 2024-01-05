import {ShoppingCartItem} from "../types";
import React, {useContext} from "react";
import "../assets/css/CartTable.css";
import "../assets/css/CartItem.css";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";


interface CartItemProps {
    shoppingCartItem: ShoppingCartItem
}
function CartItem(prop:CartItemProps){
    const  {dispatch} = useContext(CartStore);
    const deleteBook = () => {
        dispatch({ type: CartTypes.DELETE, book:prop, id: prop.shoppingCartItem.id });
    };
    const increaseBookQuantity = () => {
        dispatch({ type: CartTypes.INCREASE, book:prop, id: prop.shoppingCartItem.id });
    };
    const decreaseBookQuantity = () => {
        dispatch({ type: CartTypes.DECREASE, book:prop, id: prop.shoppingCartItem.id });
    };
    return (
        <tr className={"cart-item-book"}>
            <td className="cart-book-image">
                <i className="fa-regular fa-circle-xmark" onClick={deleteBook}></i>
                <img src={require("../assets/images/books/images/"+prop.shoppingCartItem.book.bookId+".jpg")} alt={prop.shoppingCartItem.book.title} title={prop.shoppingCartItem.book.title}/>
            </td>
            <td className="cart-book-title">{prop.shoppingCartItem.book.title}</td>
            <td className="cart-book-price">${prop.shoppingCartItem.book.price}</td>
            <td className="cart-book-quantity">
                <i
                    className="icon-button inc-button fa-solid fa-circle-plus"
                    onClick={increaseBookQuantity}
                >
                </i>
                <span className="quantity">{prop.shoppingCartItem.quantity} </span>
                <i
                    className="icon-button dec-button fa-solid fa-circle-minus"
                    onClick={decreaseBookQuantity}
                >
                </i>
            </td>
            <td className="cart-book-subtotal">
                ${(prop.shoppingCartItem.book.price * prop.shoppingCartItem.quantity).toFixed(2)}
            </td>
            <td>
            </td>
        </tr>
    )
}


export default CartItem;



