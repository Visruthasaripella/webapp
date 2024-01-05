import React from "react";
import "../assets/css/ConfirmationTableCSS.css";
import { asDollarsAndCents } from "../util";
import { BookItem, OrderDetails } from "../types";
import { OrderDetailsStore } from "../contexts/OrderDetailContext";
import { useContext } from "react";

function ConfirmationTable() {
    const { orderDetails } = useContext(OrderDetailsStore);

    // A helper function - optional to use
    const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
        return orderDetails.books[index];
    };

    return (
        <table className="confirmation_table">
            <thead>
            <tr className="confirmation_tr">
                <th className="confirmation_td">Title</th>
                <th className="confirmation_td">Book ID</th>
                <th className="confirmation_td">Quantity</th>
                <th className="confirmation_td">Price</th>
            </tr>
            </thead>
            <tbody>
            {orderDetails.books?.map((book, i) => (
                <tr className="confirmation_tr" key={i}>
                    <td className="confirmation_td" >{book.title}</td>
                    <td className="confirmation_td" >{book.bookId}</td>
                    <td className="confirmation_td" >{orderDetails.lineItems[i]?.quantity}</td>
                    <td className="confirmation_td" style={{ textAlign: 'right' }}>{asDollarsAndCents(book.price * orderDetails.lineItems[i]?.quantity * 100)}</td>
                </tr>
            ))}
            <tr>
                <td className="confirmation_td" colSpan={3}>
                    <b>Surcharge :</b>
                </td>
                <td className="confirmation_td" style={{ textAlign: 'right' }}>
                    {asDollarsAndCents(500)}
                </td>
            </tr>
            <tr>
                <td className="confirmation_td" colSpan={3}>
                    <b>Total :</b>
                </td>
                <td className="confirmation_td" style={{ textAlign: 'right' }}>
                    {asDollarsAndCents(
                        orderDetails.books.reduce((total, book, i) => total + book.price * orderDetails.lineItems[i]?.quantity, 0) * 100
                    )}
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default ConfirmationTable;
