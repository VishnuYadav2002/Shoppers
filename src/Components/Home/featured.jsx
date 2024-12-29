
import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import '../Home/home.css'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate } from 'react-router-dom';

const Featured =  () => {
    const[product , setProduct]=useState([]);
    const[error, setError]=useState(null);
    const[loading, setLoading]=useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('http://localhost:8081/api/getProducts')
        .then(response =>{
            if(!response.ok){
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(data => {
            const featuredProducts = data.data.filter(item => item.is_type==="feature");
            setProduct(featuredProducts);
            setLoading(false);
        })
        .catch(error =>{
            setError(error.message);
            setLoading(false);
        });

    }, []);

    if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>Error: {error}</div>;
      }

      const options = {
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 5,
          },
        },
      };

      const handleItemClick = (item) => {
        navigate('/ProductPage', {state:{productData : item}});
      };
      
    

      return (
        <div className="container mt-5">
          <h2 className="text-center">Featured Products</h2>
          <OwlCarousel className="owl-theme  mt-4" {...options}>
            {product.map((item) => (
              <div className="item product-card" key={item.id}>
                <img src={`http://localhost:8081/upload/images/${item.photo}`} alt={item.name} />
                <a href="#" onClick={(e) => { e.preventDefault(); handleItemClick(item); }}>
                            {item.name.substring(0, 25)}
                </a>
              </div>
            ))}
          </OwlCarousel>
        </div>
      );
};

export default Featured;