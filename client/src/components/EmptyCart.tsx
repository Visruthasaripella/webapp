function EmptyCart(){
    return (
        <div className={"empty-cart"}>
            <img src={require("../assets/images/books/images/empty-cart.png")} height={600} width={600}/>
            <h1>Looks like there are no Items in your cart</h1>
        </div>
    );
}
export default EmptyCart;