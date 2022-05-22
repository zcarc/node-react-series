import React from "react";
import { Menu } from "antd";

const items = [
  { label: <a href="/">Home</a>, key: "mail" },
  { label: <a href="/favorite">Favorite</a>, key: "favorite" },
];

function LeftMenu(props) {
  return <Menu mode={props.mode} items={items} />;
}

export default LeftMenu;
