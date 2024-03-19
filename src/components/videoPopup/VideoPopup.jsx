import React from "react";
import ReactPlayer from "react-player/youtube";
import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId, type, title }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };

    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <div className="videoHeader">
                    <span className="videoType">{type}</span>
                    <span className="videoTitle">{title}</span>
                </div>
                <span className="closeBtn" onClick={hidePopup}>
                    X
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;
