import React, { useState, useRef } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const castListRef = useRef(null);

    const navigation = (dir) => {
        const container = castListRef.current;

        if (!container) return;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth / 5) * 2
                : container.scrollLeft + (container.offsetWidth / 5) * 2;

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
    let trailerVideos = [];
    let teaserVideos = [];

    if (data && data.results) {
        filteredVideos = data.results.filter(video => video.type === "Trailer" || video.type === "Teaser");

        // Separate trailer and teaser videos
        filteredVideos.forEach(video => {
            if (video.type === "Trailer") {
                trailerVideos.push(video);
            } else {
                teaserVideos.push(video);
            }
        });

        // Reverse the order of trailer videos
        trailerVideos.reverse();

        // Concatenate trailer and teaser videos
        filteredVideos = [...trailerVideos, ...teaserVideos];
    }

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Videos</div>
                {!loading ? (
                    <div className="videosWrapper">
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
                        {filteredVideos.length > 5 && (
                            <div className="scrollButtons">
                                <BsChevronLeft
                                    className="arrow left"
                                    onClick={() => navigation("left")}
                                />
                                <BsChevronRight
                                    className="arrow right"
                                    onClick={() => navigation("right")}
                                />
                            </div>
                        )}
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
            />
        </div>
    );
};

export default VideosSection;
