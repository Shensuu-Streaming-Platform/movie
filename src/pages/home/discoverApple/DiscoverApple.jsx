import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const api_key = import.meta.env.VITE_APP_TMDB_TOKEN;

const Popular = () => {
    const [endpoint, setEndpoint] = useState("tv");

    const { data, loading } = useFetch(`/discover/${endpoint}?api_key=${api_key}&watch_region=PH&with_watch_providers=350&with_networks=2552`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Series" ? "tv" : "movie");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Apple TV+</span>
                <SwitchTabs
                    data={["Series", "Movie"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default Popular;
