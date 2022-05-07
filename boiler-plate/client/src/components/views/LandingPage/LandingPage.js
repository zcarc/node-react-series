import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    // 클라이언트와 서버의 포트가 달라서 CORS 에러가 발생한다.
    // setupProxy.js를 작성하면 문제를 해결할 수 있다.
    axios.get("/api/hello").then((res) => console.log(res));
    console.log("landing");
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
