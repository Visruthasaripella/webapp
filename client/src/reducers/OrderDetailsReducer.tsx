import {OrderDetails} from "../types";

export type OrderDetailsActions = {
    id:number;
    type: 'CLEAR' | 'UPDATE';
    orderDetails: OrderDetails;
}



export const OrderDetailsReducer = (state:OrderDetails, action:OrderDetailsActions) => {
    switch (action.type) {
        case "CLEAR":
            return [];
        case "UPDATE":
            return action.orderDetails;
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};