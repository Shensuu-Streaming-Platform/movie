import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const [selectedSeason, setSelectedSeason] = useState('');
    const [seasons, setSeasons] = useState([]);
    const { data: episodesData, loading: episodesLoading, error: episodesError } = useFetch(
        selectedSeason ? `/${mediaType}/${id}/season/${selectedSeason}` : null
    );

    const { data: seasonsData, loading: seasonsLoading, error: seasonsError } = useFetch(
        `/${mediaType}/${id}`
    );

    useEffect(() => {
        if (seasonsData && seasonsData.seasons) {
            setSeasons(seasonsData.seasons);
            setSelectedSeason(seasonsData.seasons[0]?.season_number || '');
        }
    }, [seasonsData]);

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    };

    return (
        <div>
			<ContentWrapper>
				<div>
					<select value={selectedSeason} onChange={handleSeasonChange}>
						{seasons.map(season => (
							<option key={season.id} value={season.season_number}>Season {season.season_number}</option>
						))}
					</select>
				</div>
				<div>
					{episodesData && episodesData.episodes.map(episode => (
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
			</ContentWrapper>
        </div>
    );
};

export default Recommendation;
