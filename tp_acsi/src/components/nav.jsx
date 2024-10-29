import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo-black.png";
const NavBar = styled.nav`
  padding: 0px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 6px -3px rgba(91, 84, 142, 0.2);
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #9acd32;
  font-size: 24px;

`;

const Nav = () => {
  return (
    <NavBar>
      <img
        src={Logo}
        style={{
          height: "60px",
        }}
      />
      <StyledLink
      onClick={()=>{
        localStorage.setItem('loggedin',false)
      }}
      to='/login'>log out </StyledLink>
    </NavBar>
  );
};

export default Nav;
