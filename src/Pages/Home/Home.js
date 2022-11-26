import React from "react";
import AdvertiseProducts from "./AdvertiseProducts";
import Banner from "./Banner";
import Categories from "./Categories";
import NewsLetter from "./NewsLetter";

import Stats from "./Stats";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <AdvertiseProducts />
      <Stats />
      <Testimonials />
      <NewsLetter />
    </div>
  );
};

export default Home;
