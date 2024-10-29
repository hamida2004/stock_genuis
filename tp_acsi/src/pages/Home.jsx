import Bar from "../components/bar";
import Button from "../components/button";
import styled from "styled-components";
import Nav from "../components/nav";
import Item from "../components/item";
import { useEffect, useState } from "react";
import Modal from "../components/modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Content = styled.div`
  min-height: 60vh;
  width: 100%;
  overflow-y: scroll;
`;
const Shadow = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const handleClose = () => {
    setShowCreate(false);
    setInfo(null)
    setDisabled(false);
  };
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product ?"
    );
    if (confirm) {
      try {
        const resp = await axios.delete(`http://localhost:8080/${id}`, {
          withCredentials: true,
        });
        console.log(resp);

      } catch (error) {
        alert(`unable to delete the product with id : ${id}`);
        console.log(error);
      }
    } else {
      return;
    }
  };
  const [info, setInfo] = useState(null);
  const handleView = async (id) => {
    try {
      const resp = await axios.get(`http://localhost:8080/${id}`, {
        withCredentials: true,
      });
      console.log(resp);
      setInfo(resp.data);
      setDisabled(true);
      setShowCreate(true);
    } catch (error) {
      alert("something went wrong !");
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {

    try {
      const resp = await axios.get(`http://localhost:8080/${id}`, {
        withCredentials: true,
      });
      setDisabled(false)
      setInfo(resp.data);
      setShowCreate(true);
    } catch (error) {
      alert("something went wrong !");
      console.log(error);
    }
  };
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  useEffect(() => {
    const fechData = async () => {
      try {
        const resp = await axios.get("http://localhost:8080/", {
          withCredentials: true,
        });
        console.log(resp);
        setList(resp.data);
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    };
    fechData();
  }, [handleClose]);
  return (
    <>
      <Nav />
      <Container>
        <Bar />
        <Content>
          {list.map((item, index) => {
            return (
              <Item
                id={item.id}
                nmber={index}
                name={item.name}
                quantity={item.quantity}
                onDelete={handleDelete}
                onView={handleView}
                onUpdate={handleUpdate}
              />
            );
          })}
        </Content>
        <Button
          text="Ajouter Un Article"
          handleClick={(e) => {
            e.preventDefault();
            setShowCreate(true);
          }}
        />
      </Container>
      {showCreate && (
        <Shadow>
          <Modal onClose={handleClose} disabled={disabled} object={info} />
        </Shadow>
      )}
    </>
  );
};
export default Home;
