import {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import { AppActions, cartReducer } from "../reducers/CartReducer";
import { ShoppingCartItem } from "../types";

const initialCartState: ShoppingCartItem[] = [];

export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null,
});

CartStore.displayName = 'CartContext';

interface CartContextProps {
    children: ReactNode;
}
const storageKey = "cart";
function CartContext({ children }: CartContextProps) {
    const [cart, dispatch] = useReducer(
        cartReducer as (state: ShoppingCartItem[], action: AppActions) => ShoppingCartItem[],
        initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );
    useEffect(()=>
        localStorage.setItem(storageKey,JSON.stringify(cart)),[cart]);
    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}


export default CartContext;