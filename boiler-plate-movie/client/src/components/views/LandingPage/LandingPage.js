import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../../config/keys";
import { API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  const fetchMovies = (endpoint) => {
    console.log("fetchMovies... endpoint: ", endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log("response.results: ", response.results);
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  useEffect(() => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* Main Image */}

      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}/w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />

        {/* Movie Grid Cards */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => {
              return (
                <React.Fragment key={index}>
                  {/* 속성에 아무값도 할당하지 않으면 기본값 true */}
                  <GridCards
                    landingPage
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                  />
                </React.Fragment>
              );
            })}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}> Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
