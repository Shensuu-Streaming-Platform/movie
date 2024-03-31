import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

const SeasonEpisodes = ({ mediaType, id }) => {
    const [seasonNumber, setSeasonNumber] = useState("");
    const { data: showData, loading: loadingShow, error: errorShow } = useFetch(`/${mediaType}/${id}`);
    const { data: seasonData, loading: loadingSeason, error: errorSeason } = useFetch(seasonNumber ? `/${mediaType}/${id}/season/${seasonNumber}` : null);

    const handleSeasonChange = (event) => {
        setSeasonNumber(event.target.value);
    };

    return (
        <>
            {errorShow && <div>Error fetching show details.</div>}
            {loadingShow ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="seasons-dropdown-container">
                        <select id="seasons-dropdown" onChange={handleSeasonChange} value={seasonNumber}>
                            <option value="">Select a season</option>
                            {showData?.seasons?.map((season) => (
                                <option key={season.id} value={season.season_number}>
                                    Season {season.season_number}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="episodes-container">
                        {errorSeason && <div>Error fetching season episodes.</div>}
                        {loadingSeason ? (
                            <div>Loading episodes...</div>
                        ) : (
                            seasonData?.episodes?.map((episode) => (
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
                            ))
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default SeasonEpisodes;
