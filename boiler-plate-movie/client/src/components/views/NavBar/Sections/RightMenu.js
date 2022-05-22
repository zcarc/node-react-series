import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useNavigate, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const not_auth = [
    { label: <a href="/login">Signin</a>, key: "mail" },
    { label: <a href="/register">Signup</a>, key: "app" },
  ];

  const auth = [
    { label: <a onClick={logoutHandler}>Logout</a>, key: "logout" },
  ];

  if (user.userData && !user.userData.isAuth) {
    return <Menu mode={props.mode} items={not_auth} />;
  } else {
    return <Menu mode={props.mode} items={auth} />;
  }
}

export default RightMenu;
