import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const api_key = import.meta.env.VITE_APP_TMDB_TOKEN;

const Popular = () => {
    const [endpoint, setEndpoint] = useState("tv");

    const { data, loading } = useFetch(`/trending/all/${endpoint}?api_key=${api_key}&with_networks=213`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "TV Shows" ? "tv" : "movie");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Netflix Originals</span>
                <SwitchTabs
                    data={["TV Shows", "Movie"]}
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
