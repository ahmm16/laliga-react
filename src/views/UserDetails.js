import React, { useState, useEffect, useCallback } from "react";
import { Layout, EditForm } from "../components";
import { getUserApi, deleteUserApi } from "../services/reqresApi";
import { Card, Spin, Button } from "antd";
import { Result } from "antd";
import { useParams } from "react-router-dom";
import { useUser } from "../context/user.context";
import styled from "styled-components";
const { Meta } = Card;

const CardStyled = styled(Card)`
  height: 100%;
`;

const ButtonGrid = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const SpinStyled = styled(Spin)`
  display: block;
  margin: 10px auto;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const UserDetails = () => {
  const { user, setUser } = useUser();
  let { id } = useParams();
  const [userLoader, setUserLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteReponse, setDeleteReponse] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const deleteUser = useCallback(
    async (id) => {
      try {
        setDeleteLoader(true);
        setShowForm(false);
        await deleteUserApi(id);
        setDeleteLoader(false);
        return setDeleteReponse(1);
      } catch (err) {
        setDeleteLoader(false);
        return setDeleteReponse(-1);
      }
    },
    [setShowForm]
  );
  const getUserEffect = useCallback(
    async (id) => {
      try {
        setUserLoader(true);
        const response = await getUserApi(id);
        setUserLoader(false);
        return setUser(response.data);
      } catch (err) {
        return setUserLoader(false);
      }
    },
    [setUser]
  );
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserEffect(id);
    }
    //borrar todas las suscripciones para evitar advertencias de pérdida de memoria
    return () => {
      mounted = false;
      window.removeEventListener("click", deleteUser);
    };
  }, [id, deleteUser, getUserEffect]);
  return (
    <Layout breadcrumb={true}>
      <CardContainer>
        {deleteReponse === 1 && (
          <Result status="success" title="User deleted" />
        )}
        {deleteReponse === -1 && (
          <Result status="error" title="User could not be deleted" />
        )}
        {userLoader && <SpinStyled size="large" />}
        {!userLoader && user.email && deleteReponse === 0 && (
          <>
            <CardStyled cover={<img alt="example" src={user.avatar} />}>
              <Meta
                title={`${user.first_name} ${user.last_name}`}
                description={user.email}
              />
              {deleteLoader && <SpinStyled size="large" />}
              <ButtonGrid>
                <Button type="primary" onClick={() => setShowForm(true)}>
                  Edit
                </Button>
                <Button type="secondary" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </ButtonGrid>
            </CardStyled>
          </>
        )}
        {/* {!userLoader && !user.email && deleteReponse === 0 && (
          <Result status="error" title="User not found" />
        )} */}
        {showForm && (
          <EditForm
            id={user.id}
            setShowForm={setShowForm}
            avatar={user.avatar}
          />
        )}
      </CardContainer>
    </Layout>
  );
};

export default UserDetails;
