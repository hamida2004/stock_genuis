import styled from "styled-components";
const H1 = styled.h1`
font-size: 64px;
font-weight: 600;
color:  #9acd32;
letter-spacing: 1.2;
margin-bottom:10px ;

`
const HeaderText = (props)=>{
    return <H1>{props.text}</H1>
}

export default HeaderText;