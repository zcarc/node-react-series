import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLandingPage />}></Route>
        <Route path="/login" element={<AuthLoginPage />}></Route>
        <Route path="/register" element={<AuthRegisterPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
