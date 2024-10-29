import styled from "styled-components";
const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background-color: #9acd32;
  color: #fff;
  font-size: 24px;
  margin-top: 28px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 16px;
  box-shadow: 1px 1px 5px rgba(91, 84, 142, 0.2);
`;
const Button = (props) => {
  return <Btn type={props.type ? props.type :'button'} onClick={props.handleClick}>{props.text}</Btn>;
};

export default Button;
