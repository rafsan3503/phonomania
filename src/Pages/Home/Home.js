import React from "react";
import AdvertiseProducts from "./AdvertiseProducts";
import Banner from "./Banner";
import Categories from "./Categories";

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
    </div>
  );
};

export default Home;
