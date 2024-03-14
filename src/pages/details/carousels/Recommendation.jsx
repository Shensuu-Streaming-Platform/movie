import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

import "./style.scss";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
		<div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Recommendations</span>
            </ContentWrapper>
            <Carousel
				data={data?.results}
				loading={loading}
				endpoint={mediaType}
			/>
        </div>
    );
};

export default Recommendation;
