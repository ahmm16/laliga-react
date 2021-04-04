import React from "react";
import { Layout } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import styled from "styled-components";

const { Footer } = Layout;

const FooterStyled = styled(Footer)`
  margin-top: 5px;
  border-top: 1px solid #eee;
  text-align: center;
  background-color: #fff;
`;
const OwnFooter = () => {
  return (
    <>
      {/* 
      TODO: investigar problemas con StricMode
      <BackTop /> */}
      <FooterStyled>
        Made with <HeartTwoTone /> by Alex
      </FooterStyled>
    </>
  );
};

export default OwnFooter;
