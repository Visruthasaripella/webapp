
import {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import {OrderDetails} from "../types";
import {OrderDetailsActions, OrderDetailsReducer} from "../reducers/OrderDetailsReducer";


const storageKey = 'orderDetails';
const initialOrderDetails: OrderDetails = {
    order: {
        orderId: 0,
        amount: 0,
        dateCreated: 0,
        confirmationNumber: 0,
        customerId: 0,
    },
    customer: {
        customerName: '',
        address: '',
        phone: '',
        email: '',
        ccNumber: '',
        ccExpDate: 0,
    },
    books: [],
    lineItems: [],
};
export const OrderDetailsStore = createContext<{
    orderDetails: OrderDetails;
    orderDetailsDispatch: Dispatch<any>;
}>({
    orderDetails: initialOrderDetails,
    orderDetailsDispatch: () => null,
});

OrderDetailsStore.displayName = 'OrderDetailContext';

interface OrderDetailsContextProps {
    children: ReactNode;
}


function OrderDetailsContext({ children }: OrderDetailsContextProps) {

    const [orderDetails, orderDetailsDispatch] = useReducer(
        OrderDetailsReducer as (state:OrderDetails, action: OrderDetailsActions) => OrderDetails,
        initialOrderDetails,
        (initialState) => {
            try {
                const storedOrderDetails = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedOrderDetails as OrderDetails || initialState;
            } catch (error) {
                console.log('Error parsing order details', error);
                return initialState;
            }
        },
    );
    useEffect(()=>
        localStorage.setItem(storageKey,JSON.stringify(orderDetails)),[orderDetails]);
    return (
        <OrderDetailsStore.Provider value={{ orderDetails, orderDetailsDispatch }}>
            {children}
        </OrderDetailsStore.Provider>
    );
}



export default OrderDetailsContext;