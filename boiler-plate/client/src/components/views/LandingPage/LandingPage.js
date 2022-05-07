import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    // 클라이언트와 서버의 포트가 달라서 CORS 에러가 발생한다.
    axios
      .get("http://localhost:3010/api/hello")
      .then((res) => console.log(res.data));
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
