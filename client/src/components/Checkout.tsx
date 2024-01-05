import  "../assets/css/checkout.css"
import  "../assets/css/CheckoutCSS.css"
import { isCreditCard, isMobilePhone, isvalidEmail } from '../util';
import {BookItem, CustomerForm, months, OrderDetails,  years} from "../types";
import {CartStore} from "../contexts/CartContext"
import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import axios from "axios";
import {OrderDetailsStore} from "../contexts/OrderDetailContext";
function CheckoutPage() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-2);
    }
    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                setCheckoutStatus("OK");
                navigate('/confirmation');}
            else{
                console.log("Error placing order");
            }
        }
    }
    const placeOrder =  async (customerForm: CustomerForm) =>  {
        const order = { customerForm: customerForm, cart:{itemArray:cart} };
        const orders = JSON.stringify(order);
        const url = 'orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                navigate("/confirmation")
                console.log(response);
                return response.data;
            })
            .catch((error)=>setCheckoutStatus("ERROR"));
        orderDetailsDispatch({type:"UPDATE",orderDetails:orderDetails});
        console.log("order deatils: ", orderDetails);
        return orderDetails;
    }
    const {orderDetails, orderDetailsDispatch} = useContext(OrderDetailsStore);


    const {cart, dispatch} = useContext(CartStore);


    let cartQuantity = 0
    let cartTotalPrice = 0
    cart.forEach((element, index, array) => {
        cartTotalPrice += element.book.price * element.quantity
        cartQuantity += element.quantity
    });

    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCcNumberError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: 0,
        ccExpiryYear: 0
    });

    const [checkoutStatus, setCheckoutStatus] = useState("");
    function isValidForm() {
        let errorN = false;
        if(nameError === "" && addressError === "" && phoneError === "" && emailError === "" && ccNumberError === ""){
            if (formData.name === "") {
                setNameError("Name must be at least 4 characters long!");
                errorN=true;
            }

            if (formData.address === "") {
                setAddressError("Address must be at least 4 characters long!");
                errorN=true;
            }

            if (formData.phone === "") {
                setPhoneError('Phone number must be 10 digits long!');
                errorN=true;
            }

            if (formData.email === "") {
                setEmailError('Enter a valid email address!');
                errorN=true;
            }

            if (formData.ccNumber === "") {
                setCcNumberError('Enter a valid 16-digit credit card number!');
                errorN=true;
            }
            if(errorN===true){
                return false;
            }else{
                return true;
            }
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (value.length < 4 || value.length > 45) {
                    setNameError(`Name must be at least 4 characters long!`);
                } else {
                    setNameError('');
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (value.length < 4 || value.length > 45) {
                    setAddressError(`Address must be at least 4 characters long!`);
                } else {
                    setAddressError('');
                }
                break;
            case 'phone':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                // TO DO: Phone validation
                if (!isMobilePhone(value)) {
                    setPhoneError('Phone number must be 10 digits long!');
                } else {
                    setPhoneError('');
                }
                break;
            case 'email':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                // TO DO: Email validation
                if (!isvalidEmail(value)) {
                    setEmailError('Enter a valid email address!');
                } else {
                    setEmailError('');
                }
                break;
            case 'ccNumber':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                // TO DO: Credit card validation
                if (!isCreditCard(value)) {
                    setCcNumberError('Enter a valid 16-digit credit card number!');
                } else {
                    setCcNumberError('');
                }
                break;
            case 'ccExpiryMonth':
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value, 10)}));
                break;
            default:
                break;
        }
    }


    // TO DO submitOrder function comes here. See the project Spec

    return (
        cart.length > 0 ?
            <section className="checkout-cart-table-view">
                <div className="checkout-page-body">
                    <div>
                        <form
                            className="checkout-form"
                            // onSubmit ={(event)=>submitOrder(event)}
                            method="post"
                        >
                            <div>
                                <label htmlFor="fname">Name</label>
                                <div className={"input-field-with-error"}>
                                    <input
                                        type="text"
                                        size={20}
                                        name="name"
                                        id="fname"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    {nameError && <div className="error"> {nameError}</div>}
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <div className={"input-field-with-error"}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    {phoneError && <div className="error">{phoneError}</div>}
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor="address">Address</label>
                                <div className={"input-field-with-error"}>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                    {addressError && <div className="error">{addressError}</div>}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email">Email</label>
                                <div className={"input-field-with-error"}>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    {emailError && <div className="error">{emailError}</div>}
                                </div>
                            </div>

                            {/* Credit Card */}
                            <div>
                                <label htmlFor="ccNumber">Credit Card</label>
                                <div className={"input-field-with-error"}>
                                    <input
                                        type="text"
                                        name="ccNumber"
                                        id="ccNumber"
                                        value={formData.ccNumber}
                                        onChange={handleInputChange}
                                    />
                                    {ccNumberError && <div className="error">{ccNumberError}</div>}
                                </div>
                            </div>

                            {/* Expiration Date */}
                            <div>
                                <label htmlFor="ccExpiryMonth">Exp Month</label>
                                <select
                                    style={{color: 'black'}}
                                    name="ccExpiryMonth"
                                    value={formData.ccExpiryMonth}
                                    onChange={handleInputChange}
                                >
                                    {months.map((month, i) => (
                                        <option key={i} value={i + 1}>
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                {/* Expiration Year */}
                                <label htmlFor="ccExpiryYear">Exp Year</label>
                                <select
                                    style={{color: 'black'}}
                                    name="ccExpiryYear"
                                    value={formData.ccExpiryYear}
                                    onChange={handleInputChange}
                                >
                                    {years.map((year, i) => (
                                        <option key={i} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>

                    {/* TO DO the checkout box with the total cost, tax) */}
                    {/* and the Complete Purchase button comes here*/}
                    <div className={"cart-summary-table"}>
                        <table>
                            <tbody>
                            <tr>
                                <td>Books</td>
                                <td>{cartQuantity}</td>
                            </tr>
                            {cartTotalPrice > 0 &&
                                <tr>
                                    <td>Subtotal (without tax)</td>
                                    <td>${cartTotalPrice}</td>
                                </tr>}
                            {cartTotalPrice > 0 &&
                                <tr>
                                    <td>Tax</td>
                                    <td>${(cartTotalPrice / 100 * 18).toFixed(2)}</td>
                                </tr>
                            }
                            {cartTotalPrice > 0 &&
                                <tr>
                                    <td className={"bold-text"}>Total</td>
                                    <td className={"price"}>${(cartTotalPrice + cartTotalPrice / 100 * 18).toFixed(2)}</td>
                                </tr>
                            }

                            </tbody>
                        </table>
                        <button className={"checkout-btn-primary"} onClick={submitOrder}>Complete Purchase</button>
                    </div>
                    {/*<div className={"checkout-box"}>*/}
                    {/*    <div >Items({cartQuantity}):</div><div>{cartTotalPrice}</div>*/}
                    {/*    <div>Tax:</div><div>${(cartTotalPrice/100*18).toFixed(2)}</div>*/}
                    {/*</div>*/}

                    <div>
                        {/*The following code displays different string based on the */}
                        {/*value of the checkoutStatus*/}
                        {/*Note the ternary operator*/}
                        {
                            checkoutStatus !== '' ?
                                <>
                                    <section className="checkoutStatusBox">
                                        {(checkoutStatus === 'ERROR') ?
                                            <div>
                                                Error: Please fix the problems above and try again.
                                            </div> : (checkoutStatus === 'PENDING' ?
                                                <div>
                                                    Processing...
                                                </div> : (checkoutStatus === 'OK' ?
                                                    <div>
                                                        Order placed...
                                                    </div> :
                                                    <div>
                                                        An unexpected error occurred, please try again.
                                                    </div>))}
                                    </section>
                                </>
                                : <></>}
                    </div>
                </div>

                <div>
                    {/*This displays the information about the items in the cart*/}
                    <ul className="checkout-cart-info">
                        {
                            cart?.map((item, i) => (
                                <div className="checkout-cart-book-item" key={item.id}>
                                    <div className="checkout-cart-book-image" key={i}>
                                        <img src={require("../assets/images/books/images/" + item.book.bookId+".jpg")} alt="title"
                                             className="checkout-cart-info-img"
                                             width="20%"
                                             height="20%"
                                        />
                                    </div>
                                    <div className="checkout-cart-book-info">
                                        <div className="checkout-cart-book-title">
                                            {item.book.title}</div>

                                        <div className="checkout-cart-book-subtotal">
                                            <div>subtotal: <span className={"price"}>$ {item.book.price+item.book.price/100*18}</span></div>
                                        </div>
                                        <div className="checkout-cart-book-quantity">
                                            <button className="checkout-icon-button inc-button" onClick={() => {
                                                dispatch({type: CartTypes.ADD, item: item.book, id: item.book.bookId});
                                            }}>
                                                <i className="fas fa-plus-circle"></i>
                                            </button>
                                            <button className="checkout-num-button">{item.quantity}</button>
                                            <button className="checkout-icon-button dec-button"
                                                    onClick={() => {
                                                        dispatch({
                                                            type: CartTypes.DECREASE,
                                                            item: item.book,
                                                            id: item.book.bookId
                                                        });
                                                    }}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                    </ul>
                </div>
            </section> :
            <div className={"no-items-checkout"}>
                <h1>Your Cart is Empty</h1>
                <h2>Please add books</h2>
                <button onClick={goBack} className={"buy-now-button"}>Continue Shopping</button>
            </div>
    )
}
export default CheckoutPage;