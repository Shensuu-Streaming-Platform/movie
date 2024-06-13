import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./style.scss";

const api_key = import.meta.env.VITE_APP_TMDB_API;

const Genres = ({ data }) => {
    const { mediaType, id } = useParams();
    const { genres } = useSelector((state) => state.home);
    const [certification, setCertification] = useState(null);

    useEffect(() => {
        const fetchCertification = async () => {
            if (!mediaType) return; // Exit if no mediaType is provided

            if (mediaType === "tv") {
                setCertification("NC-17");
                return;
            }

            try {
                const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/release_dates?api_key=${api_key}`);
                const releaseDates = await response.json();
                const usRelease = releaseDates.results.find((result) => result.iso_3166_1 === "US");
                if (usRelease && usRelease.release_dates.length > 0) {
                    setCertification(usRelease.release_dates[0].certification || "NC-17");
                } else {
                    setCertification("NC-17");
                }
            } catch (error) {
                console.error("Error fetching certification:", error);
            }
        };

        fetchCertification();
    }, [mediaType, id]);

    return (
        <div className="genres">
            {mediaType && certification && (
                <div className="certification">
                    Rated: {certification}
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
