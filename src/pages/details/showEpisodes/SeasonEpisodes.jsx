import React, { useState, useEffect } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const SeasonEpisodes = ({ mediaType, id }) => {
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(""); // Initialize to empty string
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        fetchSeasons();
    }, []);

    useEffect(() => {
        if (mediaType !== "movie" && selectedSeason !== "") {
            fetchEpisodes(selectedSeason);
        } else {
            setEpisodes([]); // Clear episodes if mediaType is "movie" or if selectedSeason is not set
        }
    }, [selectedSeason, mediaType]);

    const fetchSeasons = () => {
        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=9b9243db9e1283068ea9874cb17d1ac1`)
            .then(response => response.json())
            .then(data => {
                setSeasons(data.seasons);
                // Load episodes for season 0 by default, if not available load season 1
                const seasonZero = data.seasons.find(season => season.season_number === 0);
                const defaultSeason = seasonZero ? seasonZero.season_number : 1;
                setSelectedSeason(defaultSeason.toString());
            })
            .catch(error => console.error('Error fetching season list:', error));
    }

    const fetchEpisodes = (seasonNumber) => {
        if (!seasonNumber || seasonNumber === "Select a season") return;

        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/season/${seasonNumber}?api_key=9b9243db9e1283068ea9874cb17d1ac1`)
            .then(response => response.json())
            .then(data => {
                const filteredEpisodes = data.episodes.filter(episode => episode.runtime !== null && episode.still_path !== null);
                setEpisodes(filteredEpisodes);

                // Get the ID of the selected season
                const selectedSeasonData = seasons.find(season => season.season_number === parseInt(seasonNumber));
                const seasonId = selectedSeasonData.id;

                // Update state with the episode data
                setEpisodes(filteredEpisodes.map(episode => ({
                    ...episode,
                    seasonId: seasonId,
                })));
            })
            .catch(error => console.error('Error fetching episodes:', error));
    }

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    }

    const handleEpisodeClick = (seasonId, episodeId) => {
        const url = `/play?type=${mediaType}&id=${id}&season=${seasonId}&episode=${episodeId}`;
        window.location.href = url;
    }

    return (
        <ContentWrapper>
            {mediaType !== "movie" && (
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
                            <a key={episode.id} className="episode" onClick={() => handleEpisodeClick(episode.seasonId, episode.id)}>
                                <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt={episode.name} />
                                <div className="episode-info">
                                    <div className="episode-time-title">
                                        <h4 className="ep-title">{episode.episode_number}. {episode.name}</h4>
                                        <div className="minutes-info">{episode.runtime || 'N/A'}m</div>
                                    </div>
                                </div>
                                <div className="episode-description">{episode.overview}</div>
                            </a>
                        ))}
                    </div>
                </>
            )}
        </ContentWrapper>
    );
};

export default SeasonEpisodes;
