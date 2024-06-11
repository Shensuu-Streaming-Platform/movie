import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";

import "./style.scss";

const api_key = import.meta.env.VITE_APP_TMDB_API;

const Genres = ({ genresData, mediaType, id }) => {
    const { genres } = useSelector((state) => state.home);
    const [certification, setCertification] = useState("");
    const { data } = useFetch(`/${mediaType}/${id}/release_dates`);

    useEffect(() => {
        const fetchCertification = async () => {
            if (!data) return;

            try {
                const usRelease = data.results.find(
                    (release) => release.iso_3166_1 === "US"
                );

                if (usRelease && usRelease.release_dates.length > 0) {
                    setCertification(usRelease.release_dates[0].certification);
                }
            } catch (error) {
                console.error("Error processing certification data:", error);
            }
        };

        fetchCertification();
    }, [data]);

    return (
        <div className="genres">
            {certification && (
                <div className="certification">
                    {certification}
                </div>
            )}
            {genresData?.map((g) => {
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
