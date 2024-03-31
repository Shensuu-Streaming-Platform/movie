import React, { useState, useEffect } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";

const api_key = import.meta.env.VITE_APP_TMDB_API;

const SeasonEpisodes = ({ mediaType, id }) => {
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState("");
    const [episodes, setEpisodes] = useState([]);
	const { data, loading } = useFetch(`/${mediaType}/${id}`);

    useEffect(() => {
        fetchSeasons();
    }, [data]);

    useEffect(() => {
        if (mediaType !== "movie" && selectedSeason !== "") {
            fetchEpisodes(selectedSeason);
        } else {
            setEpisodes([]);
        }
    }, [selectedSeason, mediaType]);

    const fetchSeasons = () => {
        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${api_key}`)
            .then(response => response.json())
            .then(data => {
                setSeasons(data.seasons);
                const defaultSeason = data.seasons.find(season => season.season_number === 1);
                setSelectedSeason(defaultSeason ? defaultSeason.season_number.toString() : "");
                reloadSeasonOne(); // Call reloadSeasonOne after fetching seasons
            })
            .catch(error => console.error('Error fetching season list:', error));
    }

    const fetchEpisodes = (seasonNumber) => {
        if (!seasonNumber || seasonNumber === "Select a season") return;

        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/season/${seasonNumber}?api_key=${api_key}`)
            .then(response => response.json())
            .then(data => {
                const filteredEpisodes = data.episodes.filter(episode => episode.runtime !== null && episode.still_path !== null);
                setEpisodes(filteredEpisodes);
                const selectedSeasonData = seasons.find(season => season.season_number === parseInt(seasonNumber));
                const seasonId = selectedSeasonData.id;
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

    // Function to reload Season 1
    const reloadSeasonOne = () => {
        const seasonOne = seasons.find(season => season.season_number === 1);
        if (seasonOne) {
            fetchEpisodes(seasonOne.season_number);
        }
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
