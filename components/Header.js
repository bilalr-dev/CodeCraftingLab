import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyledHeader = styled.header`
  background-color: #232323;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 30px;
`;

const NavLink = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  a {
    color: #aaa;
    text-decoration: none;
    position: relative;
  }

  &:hover a {
    color: #fff;
  }

  ul {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #232323;
    list-style: none;
    padding: 10px;
    margin: 0;
    display: none;
  }

  &:hover ul {
    display: block;
  }

  li {
    margin-bottom: 5px;
  }

  /* Indicator styles */
  &::before {
    content: "";
    position: absolute;
    top: 8px; /* Adjust the top position for alignment */
    right: -12px; /* Adjust the right margin for the gap */
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #aaa;
    transition: color 0.3s;
  }

  &:hover::before {
    border-top-color: #fff;
  }

  /* Indicator visible only if there are li elements */
  &:not(:has(ul li))::before {
    display: none;
  }
`;

const SubMenuLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  display: block;
  padding: 5px;

`;

export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>CodeCraftingLab</Logo>
          <StyledNav>
            <NavLink>
              <a href={"/categories"}>
                Categories
              </a>
              <ul>
                <li>
                  <SubMenuLink href={"/categories/subcategory1"}>
                    Subcategory 1
                  </SubMenuLink>
                </li>
                <li>
                  <SubMenuLink href={"/categories/subcategory2"}>
                    Subcategory 2
                  </SubMenuLink>
                </li>
              </ul>
            </NavLink>
            <NavLink>
              <a href={"/courses"}>Courses</a>
              <ul>
                <li>
                  <SubMenuLink href={"/courses/web-development"}>
                    Web Development
                  </SubMenuLink>
                </li>
                <li>
                  <SubMenuLink href={"/courses/mobile-development"}>
                    Mobile Development
                  </SubMenuLink>
                </li>
              </ul>
            </NavLink>
            <NavLink>
              <a href={"/courses"}>Online IDE</a>
            </NavLink>
            <NavLink>
              <a href={"/contact"}>Contact Us</a>
            </NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
