import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const castListRef = useRef(null);

    const navigation = (dir) => {
        const container = castListRef.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 50)
                : container.scrollLeft + (container.offsetWidth + 50);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
		<div className="castSection">
			<ContentWrapper>
				<div className="sectionHeading">
					Cast
					<div className="scrollButtons">
						<BsFillArrowLeftCircleFill
							className="arrow"
							onClick={() => navigation("left")}
						/>
						<BsFillArrowRightCircleFill
							className="arrow"
							onClick={() => navigation("right")}
						/>
					</div>
				</div>
				{!loading ? (
					<div className="listItems" ref={castListRef}>
						{data?.map((item) => {
							let imgUrl = item.profile_path
								? url.profile + item.profile_path
								: avatar;
							return (
								<div key={item.id} className="listItem">
									<div className="profileImg">
										<Img src={imgUrl} />
									</div>
									<div className="name">{item.name}</div>
									<div className="character">
										{item.character}
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="castSkeleton">
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
					</div>
				)}
			</ContentWrapper>
		</div>
	);
};

export default Cast;
