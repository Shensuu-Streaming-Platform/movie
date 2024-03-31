import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const SeasonEpisodes = ({ mediaType, id }) => {
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState("1"); // Default to season 1
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        fetchSeasons();
    }, []);

    useEffect(() => {
        if (mediaType !== "movie") {
            fetchEpisodes(selectedSeason);
        } else {
            setEpisodes([]); // Clear episodes if mediaType is "movie"
        }
    }, [selectedSeason, mediaType]);

    const fetchSeasons = () => {
        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=9b9243db9e1283068ea9874cb17d1ac1`)
            .then(response => response.json())
            .then(data => {
                setSeasons(data.seasons);
                // Load episodes for season 1 by default
                const season1 = data.seasons.find(season => season.season_number === 1);
                if (season1) {
                    setSelectedSeason(season1.season_number.toString());
                }
            })
            .catch(error => console.error('Error fetching season list:', error));
    }

    const fetchEpisodes = (seasonNumber) => {
        if (!seasonNumber || seasonNumber === "Select a season") return;

        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/season/${seasonNumber}?api_key=9b9243db9e1283068ea9874cb17d1ac1`)
            .then(response => response.json())
            .then(data => {
                // Filter out episodes with null runtime
                const filteredEpisodes = data.episodes.filter(episode => episode.runtime !== null);
                setEpisodes(filteredEpisodes);
            })
            .catch(error => console.error('Error fetching episodes:', error));
    }

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    }

    return (
        <>
            <ContentWrapper>
                {mediaType !== "movie" && ( // Render only if mediaType is not "movie"
                    <>
                        <div className="epHeading">Episodes</div> 
                        <div id="seasons-dropdown-container">
                            <select id="seasons-dropdown" onChange={handleSeasonChange} value={selectedSeason}>
                                {seasons.map(season => (
                                    <option key={season.season_number} value={season.season_number}>{`Season ${season.season_number}`}</option>
                                ))}
                            </select>
                        </div>
                        <div id="episodes-container">
                            {episodes.map(episode => (
                                <div key={episode.id} className="episode">
                                    <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt={episode.name} />
                                    <div className="episode-info">
                                        <div>
                                            <h4 className="ep-title">{episode.episode_number}. {episode.name}</h4>
                                            <div className="minutes-info">{episode.runtime || 'N/A'}m</div>
                                        </div>
                                    </div>
                                    <div className="episode-description">{episode.overview}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </ContentWrapper>
        </>
    );
};

export default SeasonEpisodes;
