import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const VideoPlayer = () => {
    const { mediatype, id } = useParams();

    const iframeUrl = `https://shensuumovie.8888008.xyz/#/media/tmdb-${mediatype}-${id}`;

    return (
        <div className="videoPlayer">
            <ContentWrapper>
                <iframe 
                    title="Shensuu Movie"
                    src={iframeUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                />
            </ContentWrapper>
        </div>
    );
};

export default VideoPlayer;
