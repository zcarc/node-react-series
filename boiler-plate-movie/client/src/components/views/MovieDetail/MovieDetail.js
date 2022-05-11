import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../../config/keys";
import { API_URL, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail() {
  const { movieId } = useParams();
  console.log("movieId: ", movieId);

  const [Movie, setMovie] = useState(null);
  useEffect(() => {
    const endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log("response: ", response);
        setMovie(response);
      });
  }, []);

  return (
    <div>
      {/* Header */}
      {Movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}/w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Info */}

        {Movie && <MovieInfo movie={Movie} />}

        <br />

        {/* Actors Grid*/}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button>Toggle Actor View </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
