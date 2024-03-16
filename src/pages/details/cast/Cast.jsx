import React, { useRef } from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const castListRef = useRef(null);

    const handleScrollLeft = () => {
        if (castListRef.current) {
            castListRef.current.scrollLeft -= 200; // Adjust as needed
        }
    };

    const handleScrollRight = () => {
        if (castListRef.current) {
            castListRef.current.scrollLeft += 200; // Adjust as needed
        }
    };

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                <div className="scrollButtons">
                    <button className="scrollButton" onClick={handleScrollLeft}>
                        &lt;
                    </button>
                    <button className="scrollButton" onClick={handleScrollRight}>
                        &gt;
                    </button>
                </div>
                {!loading ? (
                    <div className="listItems" ref={castListRef}>
                        {data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
