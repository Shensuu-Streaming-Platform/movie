import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Recommendation from "./carousels/Recommendation";
import SeasonsAndEpisodes from "./seasonsAndEpisodes/SeasonsAndEpisodes";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );
    const { data: seasonsData, loading: seasonsLoading } = useFetch(
        `/${mediaType}/${id}/seasons`
    );

    // Check if data and credits are available before accessing properties
    const video = data?.results?.[0] || null;
    const crew = credits?.crew || null;

    return (
        <div>
            {/* Pass the modified video and crew props to DetailsBanner */}
            <DetailsBanner video={video} crew={crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            {mediaType === "tv" && (
                <SeasonsAndEpisodes seasons={seasonsData} />
            )}
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;
