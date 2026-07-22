import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import { useEffect, useState } from "react";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResult] = useState(0);
  const [nextPage, setNextPage] = useState(null);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;

  const updateNews = async () => {
    props.setProgress(10);
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    

    console.log("API Key:", apiKey);
    console.log("Length:", apiKey?.length);

    // const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us&category=${props.category}&language=en`;
    
    setLoading(true);
    console.log(url);
    
    let data = await fetch(url);

    console.log(data.status);

    let parsedData = await data.json();
    console.log(JSON.stringify(parsedData, null, 2));

    // let parsedData = await data.json();

    if (!data.ok) {
    console.error(parsedData);
    setLoading(false);
    return;
    }

// setArticles(parsedData.results);
    if (parsedData.status === "success") {
      const uniqueArticles = parsedData.results.filter(
          article => !article.duplicate
      );

      setArticles(uniqueArticles);
      setTotalResult(parsedData.totalResults);
      setNextPage(parsedData.nextPage);

} else {
  console.error(parsedData);
  setArticles([]);
}
    setLoading(false);
    setTotalResult(parsedData.totalResults);

    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, [props.category]);



  const fetchMoreData = async () => {


    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    console.log(process.env.REACT_APP_NEWS_API_KEY);
    // const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
const url =`https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us&category=${props.category}&language=en&page=${nextPage}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // let parsedData = await data.json();
    console.log(parsedData.results);

    if (parsedData.status === "error") {
        console.error(parsedData.results.message);
        setArticles([]);
        setLoading(false);
        return;
    }

    console.log("Current token:", nextPage);
    console.log(parsedData.nextPage);
    const uniqueArticles = parsedData.results.filter(
    article => !article.duplicate
    );

      setArticles(prev => [
          ...prev,
          ...uniqueArticles
      ]);
    setNextPage(parsedData.nextPage);
    setTotalResult(parsedData.totalResults);
  };

  console.log("render");

  return (
    <div className="container my-3">
      <h1
        className="text-center"
        style={{ marginTop: "90px", marginBottom: "25px" }}
      >
        NEWS - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={nextPage !== null}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {!loading &&
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.article_id}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      key={element.article_id}
                      imgUrl={element.image_url}
                      newsUrl={element.link}
                      author={element.creator ? element.creator[0] : "Unknown"}
                      date={element.pubDate}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "top",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
