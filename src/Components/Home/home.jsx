import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import '../Home/home.css';
import New from './newproduct'
import Featured from './featured'
import Footer from '../Footer/Footer'
import Slider from '../Slider/slider'

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Home = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8081/api/category/')
  .then(response => {
    if (!response.ok) {
      throw new Error("Network error");
    }
    return response.json();
  })
  .then(data => {
    setCategory(data.data); 
    setLoading(false);
  })
  .catch((error) => {
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

  return (
   <>
   <Slider/>
    <div className="container mt-4">
      <h2 className="text-center">All Shining Stars</h2>
      <OwlCarousel className="owl-theme" {...options}>
        {category.map((item) => (
          <div className="item" key={item.id}>
            <img src={`http://localhost:8081/upload/images/${item.photo}`} alt={item.name} className="category-img" />
            <h4>{item.name}</h4>
          </div>
        ))}
      </OwlCarousel>
    </div>
    <New/>
    <Featured/>
    <Footer/>
   </>
  );
}

export default Home;
