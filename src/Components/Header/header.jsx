import React from "react";
import { Form, Button } from 'react-bootstrap';
import {  FaCartShopping } from "react-icons/fa6";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { Search } from 'react-bootstrap-icons';
import '../Header/header.css';
import {Link} from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { useState, useEffect } from "react";

const Header = () => {
   const [categories, setCategories] = useState([]); 
   const [loading, setLoading] = useState(true); 
   const [error, setError] = useState(null);

    useEffect(() => {
       fetch('http://localhost:8081/api/category')
       .then(response =>{
          if(!response.ok){
            throw new Error('network error')
          }
          return response.json();
       })
       .then(data => {
         setCategories(data.data);
         setLoading(false);
       })
       .catch(error =>{
         setError(error.message);
         setLoading(false);
       });
    },[]);

   return (
      <>
         <header className="head">
            <div className="conatiner-fluid top-header">
               <div className="row top-head">
                  <div className="col-2 logo">
                    <Link to="/"><img src={logo} alt="" width={200} height={20} /></Link>
                  </div>
                  <div className="col-7">
                     <div className="search-box">
                        <Form className="search-section">
                           {/* <div className="search-category">
                              <Form.Select aria-label="Select Category">
                              <option value="all">All Categories</option>
                                 {loading ? (
                                    <option>Loading...</option>
                                 ) : error ? (
                                    <option>Error loading categories</option>
                                 ) : (
                                    categories.map((category, index) => (
                                       <option key={category.id} value={category.slug}>
                                          {category.name}
                                       </option>
                                    ))
                                 )}
                              </Form.Select>
                           </div> */}
                           <div className="search-input">
                              <Form.Control type="text" placeholder="What are you looking for?" />
                           </div>
                           <div className="search-icon">
                              <Button type="submit">
                                 <Search />
                              </Button>
                           </div>
                        </Form>
                     </div>
                  </div>
                  <div className="col-3">
                     <div className="icons">
                        <div className="icon-list">
                           <a href="#">
                              <FaRegHeart />
                           </a>
                        </div>
                        <div className="icon-list">
                           <Link to="/cart">
                              <FaCartShopping />
                           </Link>
                        </div>
                        <div className="icon-list">
                           <a href="#">
                              <FaUser />
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
                <div>
                  <ul className="category">
                     {loading ? (
                        <li>Loading...</li>
                     ) : error ? (
                        <li>Error Loading </li>
                     ) : (
                        categories.map((category,index) => (
                           <li  className="cate-name" key={category.id} ><a href="{category.slug}">{category.name}</a></li>
                        ))
                     )}
                  </ul>
               </div>
            </div>
         </header>
      </>
   )

}

export default Header;