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
            <div className="seasons-dropdown-container">
                <select id="seasons-dropdown" onChange={handleSeasonChange} value={seasonNumber}>
                    {showData?.seasons?.map((season) => (
                        <option key={season.id} value={season.season_number}>
                            Season {season.season_number}
                        </option>
                    ))}
                </select>
            </div>
            <div className="episodes-container">
                {seasonData?.episodes?.map((episode) => (
                    <div key={episode.id} className="episode">
                        <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt={episode.name} />
                        <div className="episode-info">
                            <div>
                                <h4>Episode {episode.episode_number}: {episode.name}</h4>
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
