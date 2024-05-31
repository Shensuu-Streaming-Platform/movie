import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useFetch from "../../hooks/useFetch";

import SeasonEpisodes from "../details/showEpisodes/SeasonEpisodes";

const VideoPlayer = () => {
    const { mediaType, id, season_number, episode_number } = useParams();

    const apiUrl = `/${mediaType}/${id}${season_number ? `/${season_number}` : ""}${episode_number ? `/${episode_number}` : ""}`;
    const { data, loading } = useFetch(apiUrl);

    useEffect(() => {
        document.title = `${data?.name || data?.title || "Shensuu Movie"} | Shensuu Movie`;
    }, [data]);

    const goBack = () => {
		
		window.history.back();
        {/* const url = `/${mediaType}/${id}`;
        window.location.href = url; */}
    };

    // Constructing the iframe URL
    const iframeUrl = `https://vidsrc.pro/embed/${mediaType}/${id}${season_number ? `/${season_number}` : ""}${episode_number ? `/${episode_number}` : ""}`;

    return (
        <>
            <div className="videoPlayer">
                <ContentWrapper>
                    <div className="videogoback">
                        <span className="gbackbutton" onClick={goBack}>
                            <i className="bi bi-arrow-bar-left"></i> Go Back
                        </span>
                    </div>
                    <div className="videoWrapper">
                        <iframe
                            title="Shensuu Movie"
                            src={iframeUrl}
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                </ContentWrapper>
				<SeasonEpisodes mediaType={mediaType} id={id} />
            </div>
        </>
    );
};

export default VideoPlayer;
