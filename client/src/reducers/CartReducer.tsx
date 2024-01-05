import {ShoppingCartItem, BookItem} from "../types";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR',
    DELETE: 'DELETE',
    INCREASE:'INCREASE',
    DECREASE:'DECREASE'
};

export type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR' | 'DELETE' | 'INCREASE' |'DECREASE';
    item: BookItem;
}
const findItem = (cart:ShoppingCartItem[],id:number)=> {
    let flag = false
    cart.forEach((element, index, array) => {
        if(element.id===id){
            flag=true
        }
    });
    if(flag){
        return true;
    }else{
        return false;
    }
}

export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            if (findItem(state, action.item.bookId)) {
                return state.map((book) =>
                    book.id === action.item.bookId ? {...book, quantity: book.quantity + 1}
                        : book
                );
            }
            return [
                ...state,
                {book:action.item,id:action.item.bookId,quantity: 1 },
            ];
        case CartTypes.INCREASE:
            if(findItem(state,action.id)){
                return state.map((book) =>
                    book.id === action.id? {...book, quantity: book.quantity + 1}:book
                );
            }
            return [...state]
        case CartTypes.DECREASE:
            if(findItem(state,action.id)){
                const books= state.map((book) =>
                    book.id === action.id? {...book, quantity: book.quantity - 1}:book
                );
                return books.filter((book)=>book.quantity>0);
            }
            return [...state]
        case CartTypes.REMOVE:
            /*
               will be defiend in Project 7
             */
            return ;
        case CartTypes.CLEAR:
            return [];    // will be defined in Project 7

        case CartTypes.DELETE:
            if(findItem(state, action.id)){
                return state.filter((book) =>
                    book.id !== action.id
                );
            }
            return [...state];
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};