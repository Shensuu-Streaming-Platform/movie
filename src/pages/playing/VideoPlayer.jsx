import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useFetch from "../../hooks/useFetch";

import SeasonEpisodes from "../details/showEpisodes/SeasonEpisodes";

const VideoPlayer = () => {
    const { mediaType, id, season_number, episode_number } = useParams();

    // Set default values if mediaType is tv
    const seasonNumber = mediaType === "tv" ? season_number || 1 : season_number;
    const episodeNumber = mediaType === "tv" ? episode_number || 1 : episode_number;

    // Construct the API URL
    const apiUrl = `/${mediaType}/${id}${seasonNumber ? `/${seasonNumber}` : ""}${episodeNumber ? `/${episodeNumber}` : ""}`;
    const { data, loading } = useFetch(apiUrl);

	//Set Page Title
    const { data: titleData, loading: titleLoading } = useFetch(`/${mediaType}/${id}`);

    useEffect(() => {
        document.title = `${titleData?.name || titleData?.title || "Loading"} | Shensuu Movie`;
    }, [titleData]);

    const goBack = () => {
        window.history.back();
    };
	
	{/* For API's Documentations
	
	Visit:
	
	https://vidsrc.pro/
	https://vidsrc.to/
	https://moviesapi.club/
	
	*/}

    // Construct the iframe URL
    const iframeUrl = `https://shensuuplayer-proxy.glitch.me/embed/${mediaType}/${id}${seasonNumber ? `/${seasonNumber}` : ""}${episodeNumber ? `/${episodeNumber}` : ""}`;

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
					<div className="playtitle">
                        {titleData?.name || titleData?.title}
                        {mediaType === "tv" && ` | Season: ${seasonNumber} Episode: ${episodeNumber}`}
                    </div>
					<hr />
                </ContentWrapper>
                <SeasonEpisodes mediaType={mediaType} id={id} />
            </div>
        </>
    );
};

export default VideoPlayer;


