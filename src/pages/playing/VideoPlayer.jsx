import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const VideoPlayer = () => {
    const { mediatype, id } = useParams();

    // Constructing the iframe URL
    const iframeUrl = `https://shensuumovie.8888008.xyz/#/media/tmdb-${mediatype}-${id}`;

    return (
        <div className="videoPlayer">
            <ContentWrapper>
                <div className="videoWrapper">
                    <iframe 
                        title="Shensuu Movie"
                        src={iframeUrl}
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>
            </ContentWrapper>
        </div>
    );
};

export default VideoPlayer;
