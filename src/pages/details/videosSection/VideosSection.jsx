import React, { useState, useRef } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const castListRef = useRef(null);

    const navigation = (dir) => {
        const container = castListRef.current;
		
		if (!container) return;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 10)
                : container.scrollLeft + (container.offsetWidth + 10);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    let filteredVideos = [];

    if (data && data.results) {
        // Filter videos to include only trailers and teasers
        filteredVideos = data.results.filter(video => video.type === "Trailer" || video.type === "Teaser");
    }

    return (
        <div className="videosSection">
            <ContentWrapper>
                {!loading && filteredVideos.length > 0 && (
                    <div className="sectionHeading">
                        Videos
                        <div className="scrollButtons">
                            <BsFillArrowLeftCircleFill
                                className="arrow"
                                onClick={() => navigation("left")}
                            />
                            <BsFillArrowRightCircleFill
                                className="arrow"
                                onClick={() => navigation("right")}
                            />
                        </div>
                    </div>
                )}
                {!loading ? (
                    <div className="videos" ref={castListRef}>
                        {filteredVideos.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem"
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="videoThumbnail">
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
                type={filteredVideos.length > 0 ? filteredVideos[0].type : ""}
                title={filteredVideos.length > 0 ? filteredVideos[0].name : ""}
            />
        </div>
    );
};

export default VideosSection;
