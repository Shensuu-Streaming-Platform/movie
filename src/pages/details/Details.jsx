import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
{/* import Similar from "./carousels/Similar"; */}
import Recommendation from "./carousels/Recommendation";
import SeasonEpisodes from "./showEpisodes/SeasonEpisodes";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
			<SeasonEpisodes mediaType={mediaType} id={id} />
			<VideosSection data={data} loading={loading} />
			<Cast data={credits?.cast} loading={creditsLoading} />
            <Recommendation mediaType={mediaType} id={id} />
				{/* <Similar mediaType={mediaType} id={id} /> */}
        </div>
    );
};

export default Details;
