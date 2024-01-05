import "../assets/css/CheckoutCSS.css"
function ConformationPage(){
    return (
        <div className={"confirmation-css"}>
            <img src={require("../assets/images/confirmationImage.gif")} />
            Order Confirmed
        </div>
    )
}
export default ConformationPage;