import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const api_key = import.meta.env.VITE_APP_TMDB_API;

const Genres = ({ data, mediaType, id }) => {
    const { genres } = useSelector((state) => state.home);
    const [certification, setCertification] = useState("");

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/release_dates?api_key=${api_key}`);
                const result = await response.json();
                
                const usRelease = result.results.find(
                    (release) => release.iso_3166_1 === "US"
                );

                if (usRelease && usRelease.release_dates.length > 0) {
                    setCertification(usRelease.release_dates[0].certification);
                }
            } catch (error) {
                console.error("Error fetching certification:", error);
            }
        };

        fetchCertification();
    }, [mediaType, id]);

    return (
        <div className="genres">
            {certification && (
                <div className="certification">
                    {certification}
                </div>
            )}
            {data?.map((g) => {
                if (!genres[g]?.name) return null;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
