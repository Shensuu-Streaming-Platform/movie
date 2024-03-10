import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import NowPlaying from "./nowPlaying/NowPlaying";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Discover from "./discover/Discover";
import DiscoverNetflix from "./discoverNetflix/DiscoverNetflix";
import DiscoverAmazon from "./discoverAmazon/DiscoverAmazon";
import DiscoverApple from "./discoverApple/DiscoverApple";
import DiscoverHBO from "./discoverHBO/DiscoverHBO";
import DiscoverDisney from "./discoverDisney/DiscoverDisney";
import DiscoverParamount from "./discoverParamount/DiscoverParamount";

const Home = () => {
    return (
        <div className="homePage">
            <HeroBanner />
			<NowPlaying />
            <Trending />
            <Popular />
			<DiscoverNetflix />
			<DiscoverApple />
			<DiscoverAmazon />
			<DiscoverDisney />
			<DiscoverParamount />
			<DiscoverHBO />
			<Discover />
            {/* <TopRated /> */}
        </div>
    );
};

export default Home;
