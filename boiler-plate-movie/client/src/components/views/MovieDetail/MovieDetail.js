import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../../config/keys";
import { API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../LandingPage/Sections/MainImage";
import Favorite from "./Sections/Favorite";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail() {
  const { movieId } = useParams();
  console.log("movieId: ", movieId);

  const [Movie, setMovie] = useState(null);
  const [Casts, setCasts] = useState(null);
  const [ActorToggle, setActorToggle] = useState(false);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  useEffect(() => {
    const endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log("endpointInfo response: ", response);
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        console.log("endpointCrew response: ", response);
        setCasts(response.cast);
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {Movie && (
            <Favorite
              movieInfo={Movie}
              movieId={movieId}
              userFrom={localStorage.getItem("userId")}
            />
          )}
        </div>

        {/* Movie Info */}

        {Movie && <MovieInfo movie={Movie} />}

        <br />

        {/* Actors Grid*/}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button onClick={toggleActorView}>Toggle Actor View </Button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => {
                return (
                  <React.Fragment key={index}>
                    <GridCards
                      image={
                        cast.profile_path
                          ? `${IMAGE_BASE_URL}/w500${cast.profile_path}`
                          : null
                      }
                      characterName={cast.name}
                    />
                  </React.Fragment>
                );
              })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
