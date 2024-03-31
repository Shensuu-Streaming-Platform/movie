import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

const SeasonEpisodes = ({ mediaType, id }) => {
    const [seasonNumber, setSeasonNumber] = useState("");
    const { data: showData } = useFetch(`/${mediaType}/${id}`);
    const { data: seasonData } = useFetch(seasonNumber ? `/${mediaType}/${id}/season/${seasonNumber}` : null);

    const handleSeasonChange = (event) => {
        setSeasonNumber(event.target.value);
    };

    return (
        <>
            <div className="episodes-container">
                {seasonData?.episodes?.map((episode) => (
                    <div key={episode.id} className="episode">
                        <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt={episode.name} />
                        <div className="episode-info">
                            <div>
                                <span>Episode {episode.episode_number}: {episode.name}</span>
                                <div>{episode.runtime || 'N/A'} minutes</div>
                            </div>
                        </div>
                        <div className="episode-description">{episode.overview}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SeasonEpisodes;
