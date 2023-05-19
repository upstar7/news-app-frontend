import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Row, Col } from "react-bootstrap";
import NewsItem from "../../components/NewsItem/NewsItem";
import Spinner from "../../components/Spinner/Spinner";
import SearchNews from "../../components/SearchNews/SearchNews";
import FilterNews from "../../components/FilterNews/FilterNews";
// import { Header, card } from "./style";
import HttpService from "../../services/httpService";
import "./NewsPage.css";

function News(props) {
    const [articles, setArticles] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterString, setFilterString] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    // const capitaLize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    document.title = "News Aggregator App";

    useEffect(() => {
        const fetchNews = (search, filter) => {
            try {
                HttpService.get(
                    "news?",
                    `search=${search}&page=1&${filter}`,
                    true
                ).then((response) => {
                    setLoading(true);
                    const parsedData = response.data.data;
                    setArticles(parsedData.data);
                    setTotalResults(parsedData.total);
                    setLoading(false);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchNews(searchText, filterString);
    }, [searchText, filterString]);

    const fetchMoreNews = () => {
        HttpService.get(
            "news",
            `?search=${searchText}&page=${parseInt(page) + 1}&${filterString}`,
            true
        ).then((response) => {
            setPage(page + 1);
            const parsedData = response.data.data;
            setArticles(articles.concat(parsedData.data));
            setTotalResults(parsedData.total);
        });
    };

    const searchNews = (search) => {
        setSearchText(search);
    };

    const setFilter = (filterString) => {
        setFilterString(filterString);
    };

    return (
        <>
            <Container>
                <h2 className="header text-center">
                    Welcome to visit to News Page!
                </h2>
                <Row className="justify-content-center">
                    <Col sm={12} md={6}>
                        <SearchNews searchNews={searchNews} />
                    </Col>
                </Row>
            </Container>
            <FilterNews setFilter={setFilter} />
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreNews}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <Container>
                    <Row>
                        {articles.map((element) => (
                            <Col
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                                // style={card}
                                key={element.id}
                            >
                                <NewsItem
                                    className="mb-3"
                                    title={element.title}
                                    description={element.body}
                                    author={element.author}
                                    category={element.category}
                                    date={element.created_at}
                                    // channel={element.source.name}
                                    alt="Card image cap"
                                    publishedAt={element.published_at}
                                    imageUrl={element.thumb}
                                    urlNews={element.web_url}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </InfiniteScroll>
        </>
    );
}

News.defaultProps = {
    country: "us",
    pageSize: 7,
    category: "general",
};
// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };

export default News;
