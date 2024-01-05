
export interface BookItem {
    bookId: number;
    title: string;
    author: string;
    price: number;
    isPublic: boolean;
    imgu: string;
    categoryId: number;
}
export interface categoryListItem{
    name:String;
    categoryId:number;
    isSelected: boolean;
}
export interface categories{
    categories: categoryListItem[];
    name?:string;
    selected?:string;
}
export interface name{
    name?: string;
}

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
    id:number;
    book: BookItem;
    quantity: number;

    constructor(theBook: BookItem) {
        this.id = theBook.bookId;
        this.book = theBook;
        this.quantity = 1;
    }
}
// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] =  [];

export const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 16 }, (_, i) => currentYear + i);
export interface CustomerForm {
    name: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpiryMonth: number;
    ccExpiryYear: number;
}

export interface Order {
    orderId: number;
    amount: number;
    dateCreated: number;
    confirmationNumber: number;
    customerId: number;
}

export interface OrderDetails {
    order: Order;
    customer: Customer;
    books: BookItem[];
}

export interface ServerErrorResponse {
    reason: string;
    message: string;
    fieldName: string;
    error: boolean;
}

export interface Order {
    orderId: number;
    amount: number;
    dateCreated: number;
    confirmationNumber: number;
    customerId: number;
}

export interface LineItem {
    bookId: number;
    orderId: number;
    quantity: number;
}
export interface Customer {
    customerName: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpDate: number;
}

export interface OrderDetails {
    order: Order;
    customer: Customer;
    books: BookItem[];
    lineItems: LineItem[];
}