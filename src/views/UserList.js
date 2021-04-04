import React, { useState, useEffect, useCallback } from "react";
import { Layout } from "../components";
import { getUsersApi } from "../services/reqresApi";
import { useUser } from "../context/user.context";
import { Card, Spin, Pagination, Result } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
const { Meta } = Card;

const PaginationStyled = styled(Pagination)`
  text-align: center;
  margin: 20px auto;
`;
const ListContainer = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const SpinStyled = styled(Spin)`
  display: block;
  margin: 10px auto;
`;
const LinkStyled = styled(Link)`
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 40%;
  }
`;
const UserList = () => {
  const { user, setUser } = useUser();
  const [usersLoader, setUsersLoader] = useState(false);

  const getUsersEffect = useCallback(async () => {
    try {
      setUsersLoader(true);
      const response = await getUsersApi(1);
      setUser({ usersList: response.data });

      return setUsersLoader(false);
    } catch (err) {
      return setUsersLoader(false);
    }
  }, [setUser]);
  const onShowSizeChange = async (current) => {
    setUsersLoader(true);
    const response = await getUsersApi(current);
    setUsersLoader(false);
    return setUser({ usersList: response.data });
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUsersEffect();
    }
    //borrar todas las suscripciones para evitar advertencias de pérdida de memoria
    return () => (mounted = false);
  }, [getUsersEffect]);
  console.log("user", user);
  return (
    <Layout>
      <ListContainer>
        {user?.usersList &&
          user.usersList.map((item, index) => (
            <LinkStyled key={index} to={"/user/" + item.id}>
              <Card hoverable cover={<img alt="example" src={item.avatar} />}>
                <Meta
                  title={`${item.first_name} ${item.last_name}`}
                  description={item.email}
                />
              </Card>
            </LinkStyled>
          ))}
      </ListContainer>
      {!usersLoader && !user.usersList && (
        <Result status="error" title="Users not found" />
      )}
      {usersLoader && <SpinStyled size="large" />}
      {user.usersList && (
        <PaginationStyled total={12} onChange={onShowSizeChange} />
      )}
    </Layout>
  );
};

export default UserList;
