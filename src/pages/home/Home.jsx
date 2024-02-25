import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Discover from "./discover/Discover";
import DiscoverNetflix from "./discoverNetflix/DiscoverNetflix";
import DiscoverAmazon from "./discoverAmazon/DiscoverAmazon";

const Home = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <Trending />
            <Popular />
			<DiscoverNetflix />
			<DiscoverAmazon />
			<Discover />
            <TopRated />
        </div>
    );
};

export default Home;
