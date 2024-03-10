import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const [greeting, setGreeting] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/trending/all/day"); {/* /movie/upcoming */}

    useEffect(() => {
        if (data) {
            const bg =
                url.backdrop +
                data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
            setBackground(bg);
        }
    }, [data, url]);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting("Good Morning");
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    }, []);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
		if (event.type === "click" && query.length > 0) {
            navigate(`/search/${query}`);
            event.preventDefault();
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div> 
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">{greeting}</span>
                    <span className="subTitle">
                        What would you like to watch today?
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a Movie or TV Show"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={searchQueryHandler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
