import React, { useState } from "react";
import { Affix, Menu } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo.jpg";
import styled from "styled-components";
import { useUser } from "../context/user.context";

const Logo = styled.img`
  width: 100px;
`;
const HeaderStyled = styled.header`
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;
`;
const MenuStyled = styled(Menu)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const MenuItem = styled(Menu.Item)`
  height: 60px !important;
`;
const OwnHeader = () => {
  const { logOut, token } = useUser();
  const handleClick = () => {
    return logOut();
  };
  const [top] = useState(0);
  return (
    <Affix offsetTop={top}>
      <HeaderStyled>
        <MenuStyled>
          <MenuItem>
            <Logo src={logo} alt="logo" title="logo" />
          </MenuItem>
          {token && (
            <MenuItem
              key="logout-menu"
              onClick={handleClick}
              icon={<LogoutOutlined />}
            >
              LogOut
              <Link to="/login" />
            </MenuItem>
          )}
        </MenuStyled>
      </HeaderStyled>
    </Affix>
  );
};

export default OwnHeader;
