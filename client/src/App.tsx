import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AppCategory from "./components/Category";
import axios from "axios";
import Checkout from "./components/Checkout";
import CartComponent from "./components/CartComponent";
import ConformationPage from "./components/ConformationPage";
import ConfirmationPage from "./components/ConfirmationPage";


function App() {
    //axios.defaults.baseURL= 'http://localhost:8080/VisrutaBookstoreReactTransact/api/';
    axios.defaults.baseURL= 'http://webdev.cs.vt.edu:8080/VisrutaBookstoreReactTransact/api/';

  return (
      <Router basename="/VisrutaBookstoreReactTransact">
       <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<AppCategory name={"Crime Thriller"}/>} />
            <Route path="/categories/:paramName" element={<AppCategory />} />
            <Route path="/cart" element={<CartComponent />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;

