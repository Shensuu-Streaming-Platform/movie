import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import YouTube from 'react-youtube';
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../../details/Playbtn";

const HeroBanner = () => {
    const [movie, setMovie] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef(null);
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data: trendingData, loading } = useFetch("/trending/movie/day"); {/* /movie/upcoming  or  /trending/all/day*/}
    const { data: videoData } = useFetch(movie ? `/movie/${movie.id}/videos` : null);

    useEffect(() => {
        if (trendingData?.results) {
            const randomMovie = trendingData.results[Math.floor(Math.random() * trendingData.results.length)];
            setMovie(randomMovie);
        }
    }, [trendingData]);

    useEffect(() => {
        if (videoData?.results) {
            const trailers = videoData.results.filter(v => v.type === 'Trailer');
            if (trailers.length > 0) {
                const lastTrailer = trailers[trailers.length - 1];
                setVideoId(lastTrailer.key);
            } else {
                // Fallback if no trailers
                setVideoId('dQw4w9WgXcQ');
            }
        }
    }, [videoData]);

    const playBtnHandler = () => {
        if (movie) {
            navigate(`/movie/${movie.id}`);
        }
    };

    const toggleMute = () => {
        if (playerRef.current) {
            if (isMuted) {
                playerRef.current.internalPlayer.unMute();
            } else {
                playerRef.current.internalPlayer.mute();
            }
            setIsMuted(!isMuted);
        }
    };

    const opts = {
        playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            cc_load_policy: 0,
            showinfo: 0
        }
    };

    useEffect(() => {
        document.title = "Shensuu Movie";
    }, []);

    return (
        <div className="heroBanner">
            {!loading && (
                <>
                    <div className="backdrop-img">
                        {videoId ? (
                            <YouTube
                                videoId={videoId}
                                opts={opts}
                                ref={playerRef}
                                className="youtube-player"
                            />
                        ) : (
                            <Img src={movie ? url.backdrop + movie.backdrop_path : "/landscape.jpg"} />
                        )}
                    </div>
                    <div className="opacity-layer"></div>
                </>
            )}

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">{movie?.title}</span>
                    <span className="subTitle">
                        {movie?.overview}
                    </span>
                    <div className="playBtn">
                        <button onClick={playBtnHandler} className="play-button">
                            <PlayIcon />
                            <span className="play-text"></span>
                        </button>
                        <button onClick={toggleMute} className="mute-button">
                            {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                        </button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
