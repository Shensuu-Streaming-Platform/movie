import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { HiOutlineSearch } from "react-icons/hi";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(query || "");

    const fetchInitialData = (searchQueryToFetch) => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${searchQueryToFetch}&page=1`).then(
            (res) => {
                setData(res);
                setPageNum(2);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${searchQuery}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length > 0) {
                fetchInitialData(searchQuery);
                // navigate silently to reflect the URL change
                navigate(`/search/${searchQuery}`, { replace: true });
            } else {
                setData(null);
                setLoading(false);
                navigate(`/search`, { replace: true });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    <div className="searchInputBox">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <HiOutlineSearch />
                    </div>

                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${searchQuery}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            {searchQuery.length > 0 ? "Sorry, Results not found!" : "Start typing to search..."}
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
