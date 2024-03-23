import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import useFetch from "../../hooks/useFetch";

const VideoPlayer = () => {
    const { mediaType, id } = useParams();
	
	const { data, loading } = useFetch(`/${mediaType}/${id}`);
	
	useEffect(() => {
		document.title = `${data?.name || data?.title || "Shensuu Movie"} | Shensuu Movie`;
	}, [data]);
	
	const goBackPage = () => {
        window.history.back();
    };
	
	const goBack = () => {
		const url = `/${mediaType}/${id}`;
		window.location.href = url;
	};

    // Constructing the iframe URL
    const iframeUrl = `https://shensuumovie.8888008.xyz/#/media/tmdb-${mediaType}-${id}`;

    return (
        <>
			<div className="videoPlayer">
				<ContentWrapper>
					<div className="videogoback">
						<span className="gbackbutton" onClick={goBack}>
							<i class="bi bi-arrow-bar-left"></i> Go Back
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
			</div>
		</>
    );
};

export default VideoPlayer;
