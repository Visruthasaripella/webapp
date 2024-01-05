import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import "../assets/css/Home.css";
import {BookItem} from "../types";

type Props = {}

function Home({}: Props) {
    const [bestSellers, setBestSellers]  = useState([]);
    useEffect(() => {
        axios.get('/books/top-rated?limit=3')
            .then((result) => setBestSellers(result.data ))
            .catch(console.error);
    }, []);
    console.log(bestSellers);
  return (
    <div>
        <div className="text-secondary text-center mt-3" >
        <h1 style={{fontSize: '50px', fontWeight: 600}} >VIRGINIA TECH AJ<br/>BOOK STORE</h1>
        <p style={{fontSize: '20px'}}>shop official appear, textbooks and electronic products all in one place at the bookstore</p>
    </div>
    <h1 className="ml-5 pl-5 text-secondary" style={{fontSize: '25px'}}>AJ choices</h1>
    <div className="container mt-3">
        <div className="row">
            {
                bestSellers.map((book:BookItem) =>(
                    <div className="col-4" key={book.bookId}>
                        <img  className="shadow"  src={require("../assets/images/books/images/"+book.bookId+".jpg")} style={{height: '300px'}}  alt={book.title}/>
                    </div>
                ))
            }
        <div className="col-12 m-5 text-center">
            <Link to="/categories" className="button-cta">Shop Now</Link>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Home