import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);
    const [certification, setCertification] = useState(null);

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                const response = await fetch(`/${data.mediaType}/${data.id}/release_dates`);
                const releaseDates = await response.json();
                const usRelease = releaseDates.results.find((result) => result.iso_3166_1 === "US");
                if (usRelease && usRelease.release_dates.length > 0) {
                    setCertification(usRelease.release_dates[0].certification);
                }
            } catch (error) {
                console.error("Error fetching certification:", error);
            }
        };

        fetchCertification();
    }, [data]);

    return (
        <div className="genres">
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
            {certification && (
                <div className="certification">
                    Certification: {certification}
                </div>
            )}
        </div>
    );
};

export default Genres;
