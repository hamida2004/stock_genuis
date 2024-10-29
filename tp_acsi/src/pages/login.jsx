import styled from "styled-components";
import ImageSide from "../components/imageSide";
import { useState } from "react";
import Button from "../components/button";
import HeaderText from "../components/h1";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const fechData = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email: email, password: pwd },
        {
          withCredentials: true,
        }
      );
      // localStorage.setItem("loggedin", true);
      navigate("/");
    } catch (error) {
      // navigate("/login");
      setErr("invalid Email or Password");
      console.log(error);
    }
  };

  return (
    <Container>
      <ImageSide to="signup" />
      <Div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HeaderText text="Welcome Back!" />
          <h2>Please Log In to Your Account </h2>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            fechData();
          }}
        >
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
          <Button type="submit" text={"login"}></Button>
        </Form>
        <p style={{ color: "red" }}>{err}</p>
      </Div>
    </Container>
  );
};

export default Login;
