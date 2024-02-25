import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Discover from "./discover/Discover";
import DiscoverNetflix from "./discoverNetflix/DiscoverNetflix";

const Home = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <Trending />
            <Popular />
			<Discover />
			<DiscoverNetflix />
            <TopRated />
        </div>
    );
};

export default Home;
