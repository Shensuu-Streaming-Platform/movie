import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useFetch from "../../hooks/useFetch";
import dayjs from "dayjs";

import Genres from "../../components/genres/Genres";
import SeasonEpisodes from "../details/showEpisodes/SeasonEpisodes";

const VideoPlayer = () => {
    const { mediaType, id, season_number, episode_number } = useParams();
	
	const navigate = useNavigate();

    // Set default values if mediaType is tv
    const seasonNumber = mediaType === "tv" ? season_number || 1 : season_number;
    const episodeNumber = mediaType === "tv" ? episode_number || 1 : episode_number;

    // Construct the API URL
    const apiUrl = `/${mediaType}/${id}${seasonNumber ? `/${seasonNumber}` : ""}${episodeNumber ? `/${episodeNumber}` : ""}`;
    const { data, loading } = useFetch(apiUrl);

    // Set Page Title
    const { data: titleData, loading: titleLoading } = useFetch(`/${mediaType}/${id}`);

	const _genres = titleData?.genres?.map((g) => g.id);

    useEffect(() => {
        document.title = `${titleData?.name || titleData?.title || "Loading"} | Shensuu Movie`;
    }, [titleData]);

    const goBack = () => {
        navigate(-1);
    };
	
	{/* For API's Documentations
	
	Visit:
	
	https://vidsrc.pro/
	https://vidsrc.to/
	https://moviesapi.club/
 	https://embed.su/embed/
  	https://vidbinge.dev/embed/

  	Default Example for tv: https://vidsrc.pro/embed/${mediaType}/${id}${seasonNumber ? `/${seasonNumber}` : ""}${episodeNumber ? `/${episodeNumber}` : ""}
	
	*/}

    // Construct the iframe URL
    const iframeUrl = mediaType === "movie"
        ? `https://vidsrc.pro/embed/${mediaType}/${id}`
        : `https://vidsrc.pro/embed/${mediaType}/${id}${seasonNumber ? `/${seasonNumber}` : ""}${episodeNumber ? `/${episodeNumber}` : ""}`;

	const networkLogo = titleData?.networks?.[0]?.logo_path;

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
							allowtransparency="true"
                        />
                    </div>
                    <div className="playtitle">
                        {`${
							titleData?.name || titleData?.title
						} (${dayjs(
							titleData?.release_date
						).format("YYYY")})`}
                        {mediaType === "tv" && ` | Season: ${seasonNumber} Episode: ${episodeNumber}`}
						
                    </div>
					
					<div className="subinfo">
						<div className="subtitle">
							{titleData?.tagline}
						</div>
						
						<Genres data={_genres} />
					</div>
					
                    <hr />
                </ContentWrapper>
                {mediaType === "tv" && <SeasonEpisodes mediaType={mediaType} id={id} />}
            </div>
        </>
    );
};

export default VideoPlayer;



