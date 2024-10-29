import styled from "styled-components";
import ImageSide from "../components/imageSide";
import { useState } from "react";
import Button from "../components/button";
import HeaderText from "../components/h1";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Div = styled.div`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  width: 80%;
  margin-top: 60px;
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  border-radius: 16px;
  font-size: 20px;
  width: 60%;
  margin-bottom: 20px;
  border: none;
  outline: none;
  box-shadow: 1px 1px 5px rgba(91, 84, 142, 0.2);
  padding: 8px 12px;
`;
const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const[err,setErr] = useState('')
  const fechData = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8080/api/auth/register",
        {username:name, email: email, password: pwd },
        {
          withCredentials: true,
        }
      );
      console.log(resp.data);
      navigate('/login')
    } catch (error) {
      setErr("user with this email already exists !")
      // navigate("/login");
      console.log(error);
    }
  };

  return (
    <Container>
      <Div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HeaderText text="Welcome !" />
          <h2>Create Your Account </h2>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            fechData();
          }}
        >
          <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            placeholder="Emali"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
          />
          <Button text={'Sign Up'} type='submit'></Button>
        </Form>
        <p style={{ color: "red" }}>{err}</p>
      </Div>
      <ImageSide to="login" />
    </Container>
  );
};

export default Signup;
