import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/trending/${mediaType}/week`); {/*  /${mediaType}/${id}/similar */}

    const title = mediaType === "tv" ? "Discover TV Shows" : "Discover Movies";

    return (
		<>
			{data && data.results && data.results.length > 0 && (
				<Carousel
					title={title}
					data={data?.results}
					loading={loading}
					endpoint={mediaType}
				/>
			)}
		</>
    );
};

export default Similar;
