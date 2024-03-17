import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const SeasonsAndEpisodes = ({ seasons }) => {
  const { url } = useSelector((state) => state.home);
  const [selectedSeason, setSelectedSeason] = useState(seasons[0].season_number);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <div className="seasonsAndEpisodesSection">
      <div className="sectionHeading">
        Seasons
        <select
          className="seasonDropdown"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          {seasons.map((season) => (
            <option key={season.id} value={season.season_number}>
              Season {season.season_number}
            </option>
          ))}
        </select>
      </div>
      <div className="episodesList">
        {seasons
          .find((season) => season.season_number === selectedSeason)
          ?.episodes.map((episode) => (
            <div key={episode.id} className="episodeItem">
              <div className="episodeBanner">
                <img
                  src={episode.still_path ? url.still + episode.still_path : placeholderImage}
                  alt={`Episode ${episode.episode_number} Banner`}
                />
              </div>
              <div className="episodeDetails">
                <div className="episodeTitle">{episode.name}</div>
                <div className="episodeOverview">{episode.overview}</div>
                <div className="episodeInfo">
                  Episode {episode.episode_number} | Air Date: {episode.air_date}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeasonsAndEpisodes;
