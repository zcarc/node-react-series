import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
import NavBar from "./components/views/NavBar/NavBar";
import FavoritePage from "./components/views/FavoritePage/FavoritePage";

function App() {
  // 아무나 진입 가능한 페이지
  // Ex)
  // LandingPage
  // AboutPage

  // 로그인 한 회원만 진입 가능한 페이지
  // Ex)
  // Detail Page

  // 로그인 한 회원은 진입 불가능한 페이지
  // Ex)
  // Register Page
  // Login Page

  // 관리자만 진입 가능한 페이지
  // Ex)
  // Admin Page

  // HOC로 사용자 인증 체크
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthMovieDetail = Auth(MovieDetail, null);
  const AuthMFavoritePage = Auth(FavoritePage, null);

  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route path="/" element={<AuthLandingPage />}></Route>
          <Route path="/login" element={<AuthLoginPage />}></Route>
          <Route path="/register" element={<AuthRegisterPage />}></Route>
          <Route path="/movie/:movieId" element={<AuthMovieDetail />}></Route>
          <Route path="/favorite" element={<AuthMFavoritePage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
