import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import BookBox from "./bookbox";
import {BookItem, categories, categoryListItem, name} from "../types";
import {useParams} from "react-router";
import axios from "axios";
import "../assets/css/AppHeader.css"
import {CategoryList} from "../contexts/CategoryContext";

function AppCategory(props: name) {
    const categories = useContext<categoryListItem[]>(CategoryList);  // add this statment

    const [books, setBooks] = useState([]);
    const {paramName:paraName} = useParams<{paramName:string}>();
    const categoryName = paraName || props.name
    let link: string = "";
    if(categoryName === "top-rated"){
        link = 'books/top-rated'

    }else{
        link = 'categories/name/'+categoryName+'/books'
    }
    useEffect(() => {
        axios.get(link)
            .then((result) => setBooks(result.data))
            .catch(console.error);
    },[link, categoryName]);
    let presentSection = window.location.href.replaceAll('%20',' ').split('/').at(-1);
    if(presentSection === 'categories'){
        presentSection = 'Crime Thriller'
    }
    return (
    <div>
        <ul className="nav justify-content-center">

            {
                categories.map((item) => (
                    <li className={"nav-item cat-links"} key={item.categoryId}>
                        <Link className={(presentSection === item.name) ? "nav-link cat-link cat-links-active": "nav-link cat-link"} to={"/categories/"+item.name} key={item.categoryId}>
                            {item.name}
                        </Link>
                    </li>))
            }
        </ul>
      <div className="container mt-2 mb-3">
        <div className="row">
            {
                books.map((book:BookItem) =>(
                    <div className="col-3" key={book.bookId}>
                        <BookBox bookId={book.bookId} title={book.title} author={book.author} price={book.price} isPublic={book.isPublic} imgu={book.bookId+".jpg"}  categoryId={book.categoryId}/>
                    </div>
                ))
            }
      </div>
    </div>
    </div>
  )
}

export default AppCategory