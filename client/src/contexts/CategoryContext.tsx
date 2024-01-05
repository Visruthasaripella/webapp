import {createContext, ReactNode, useEffect, useState} from "react";
import {categoryListItem} from "../types";
import axios from "axios";

export const CategoryList  = createContext<categoryListItem[] | []>([]);
CategoryList.displayName = 'CategoryContext';

interface CategoryContextProps {
    children: ReactNode;
}
function CategoryContext ({ children }:CategoryContextProps)  {
    const [categories, setCategories]  = useState([]);
    useEffect(() => {
        axios.get('categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);
    return (
        <CategoryList.Provider value ={categories}>{children}</CategoryList.Provider>
    );
}
export default CategoryContext;