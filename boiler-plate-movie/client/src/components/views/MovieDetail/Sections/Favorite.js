import Axios from "axios";
import React, { useEffect } from "react";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  let variables = {
    userFrom,
    movieId,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log("favoriteNumber... response: ", response);
      if (response.data.success) {
      } else {
        alert("favorite 정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <button>Favorite</button>
    </div>
  );
}

export default Favorite;
