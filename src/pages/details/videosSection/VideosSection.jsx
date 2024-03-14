import React, { useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    const filteredVideos = data?.results?.filter(video => video.type === "Trailer");

    if (loading) {
        return null;
    }

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Videos</div>
                <div className="videos">
                    {filteredVideos?.map((video) => (
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
                <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                />
            </ContentWrapper>
        </div>
    );
};

export default VideosSection;
