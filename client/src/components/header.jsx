import styled from "styled-components";
import { useHeaderContext } from "../utils/headerContext";

const Header = () => {
  const { logo, links } = useHeaderContext();

  //Creates the links for parent folders
  const createParentLink = (data, key) => {
    return (
      <div className="dropdown" key={key}>
        <NavButton className="dropbtn">
          {data.title}
          <i className="fa fa-caret-down"></i>
        </NavButton>
        <div className="dropdown-content">
          {data.childLinks.map((child) => (
            <NavLinkChild
              className="p-2"
              key={child.sys.id}
              href={`/${child.fields.slug}`}
            >
              {child.fields.title}
            </NavLinkChild>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Navbar className="navbar flex flex-row justify-start">
      {/* Logo section */}
      <div className="logo-wrapper">
        <a href="/">
          <LogoImg src={logo} alt="logo" />
        </a>
      </div>
      {/* Links section */}
      <div className="links-wrapper flex ml-auto space-x-2">
        {links.map((link, key) => {
          if (link.fields.isParentNav) {
            return createParentLink(link.fields, link.sys.id);
          }
          return (
            <NavLink key={link.sys.id} href={link.fields.slug}>
              {link.fields.title}
            </NavLink>
          );
        })}
      </div>
    </Navbar>
  );
};

const Navbar = styled.nav`
  background-color: black;
  width: 100%;
  height: 120px;

  .navbar {
    overflow: hidden;
  }

  .navbar a {
    float: left;
    font-size: 17px;
    color: white;
    text-align: center;
    padding: 0.6em;
    text-decoration: none;
  }

  .dropdown {
    float: left;
  }

  .dropdown .dropbtn {
    padding: 0.6em;
  }

  .navbar a:hover,
  .dropdown:hover .dropbtn {
    color: var(--yellow);
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #242424;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    float: none;
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .open-menu {
    background-color: gray;
    padding: 1rem 0.5rem;
    border-radius: 8px;
    position: absolute;
    margin-top: 2rem;
  }
  .logo-wrapper {
    margin: auto 2rem;
  }
  .links-wrapper {
    margin: auto 2rem auto auto;
  }
`;

const LogoImg = styled.img`
  height: 100px;
  border-radius: 4px;
`;

const NavLink = styled.a`
  color: white;
  text-transform: uppercase;
  font-size: 17px;
  margin: auto;
  &&:hover {
    cursor: pointer;
    color: var(--yellow);
  }
`;

const NavLinkChild = styled.a`
  color: white;
  text-transform: uppercase;
  font-size: 17px;
  &&:hover {
    cursor: pointer;
    background-color: var(--main-gray);
    border-radius: 4px;
    color: var(--yellow);
  }
`;

const NavButton = styled.button`
  color: white;
  text-transform: uppercase;
  font-size: 17px;
  background-color: transparent;
  border: none;
  ${
    "" /* &&:hover {
    cursor: pointer;
    color: var(--yellow);
  } */
  }
`;

export default Header;
