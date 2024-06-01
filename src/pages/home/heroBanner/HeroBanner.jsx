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
    const [subgreeting, setsubGreeting] = useState("");
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
            setGreeting("Morning Bai");
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting("what if");
        } else {
            setGreeting("inom ta bai");
        }
    }, [greeting]);
    
    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setsubGreeting("Use <a href="https://brave.com/download" style="textDecoration: none;" target="_blank">Brave</a> browser for better experience!");
        } else if (currentHour >= 12 && currentHour < 18) {
            setsubGreeting("Use <a href="https://brave.com/download" style="textDecoration: none;" target="_blank">Brave</a> browser for better experience!");
        } else {
            setsubGreeting("Use <a href="https://brave.com/download" style="textDecoration: none;" target="_blank">Brave</a> browser for better experience!");
        }
    }, [subgreeting]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
        if (event.type === "click" && query.length > 0) {
            navigate(`/search/${query}`);
            event.preventDefault();
        }
    };

    useEffect(() => {
        document.title = "Shensuu Movie";
    }, []);

    return (
        <div className="heroBanner">
        {/* {!loading && ( */}
                <div className="backdrop-img">
                    <Img src="/landscape.jpg" />    {/* <Img src={background} /> */}
                </div> 
        {/*    )}  */}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">{greeting}</span>
                    <span className="subTitle">
                        {subgreeting}
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
