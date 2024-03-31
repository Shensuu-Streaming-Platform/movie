import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const SeasonEpisodes = ({ mediaType, id }) => {
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState("Select a season");
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        fetchSeasons();
    }, []);

    useEffect(() => {
        fetchEpisodes(selectedSeason);
    }, [selectedSeason]);

    const fetchSeasons = () => {
        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=9b9243db9e1283068ea9874cb17d1ac1`)
            .then(response => response.json())
            .then(data => populateSeasonsDropdown(data.seasons))
            .catch(error => console.error('Error fetching season list:', error));
    }

    const populateSeasonsDropdown = (seasons) => {
        setSeasons(seasons);
    }

    const fetchEpisodes = (seasonNumber) => {
        if (!seasonNumber || seasonNumber === "Select a season") return;

        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/season/${seasonNumber}?api_key=9b9243db9e1283068ea9874cb17d1ac1`)
            .then(response => response.json())
            .then(data => setEpisodes(data.episodes))
            .catch(error => console.error('Error fetching episodes:', error));
    }

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    }

    return (
        <>	
		<ContentWrapper>
            <div id="seasons-dropdown-container">
                <select id="seasons-dropdown" onChange={handleSeasonChange} value={selectedSeason}>
                    <option>Select a season</option>
                    {seasons.map(season => (
                        <option key={season.season_number} value={season.season_number}>Season {season.season_number}</option>
                    ))}
                </select>
            </div>
            <div id="episodes-container">
                {episodes.map(episode => (
                    <div key={episode.id} className="episode">
                        <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt={episode.name} />
                        <div className="episode-info">
                            <div>
                                <h4>{episode.episode_number}. {episode.name}</h4>
                                <div>{episode.runtime || 'N/A'} minutes</div>
                            </div>
                        </div>
                        <div className="episode-description">{episode.overview}</div>
                    </div>
                ))}
            </div>
        </ContentWrapper>
		</>
    );
};

export default SeasonEpisodes;
