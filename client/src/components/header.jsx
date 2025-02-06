import styled from "styled-components";
import { useHeaderContext } from "../utils/headerContext";
import { Link } from "react-router-dom";
import DropdownMenu from "./dropdownMenu";

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
            <Link className="p-2 text-white uppercase text-[17px]" key={child.sys.id} to={`/${child.fields.slug}`}>
              {child.fields.title}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Navbar className="navbar flex flex-row justify-start">
      {/* Logo section */}
      <div className="logo-wrapper flex flex-row">
        <a href="/">
          <LogoImg src={logo} alt="logo" />
        </a>
        <div className="pl-4 m-auto">
          <h1 className="text-white text-lg mb-0 leading-none">5th - 8th</h1>
          <h1 className="text-white text-lg leading-none">June 2025</h1>
        </div>
      </div>
      {/* Links section */}
      <div className="links-wrapper flex ml-auto space-x-2">
        {links.map((link, key) => {
          if (link.fields.isParentNav) {
            return createParentLink(link.fields, link.sys.id);
          }
          return (
            <Link className="p-[0.6em] text-white uppercase text-[17px] no-underline" key={link.sys.id} to={link.fields.slug}>
              {link.fields.title}
            </Link>
          );
        })}
      </div>
      <DropdownMenu logo={logo} links={links} />
    </Navbar>
  );
};

const Navbar = styled.nav`
  background-color: black;
  width: 100%;
  height: 95px;

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

  @media screen and (max-width: 800px) {
    height: 70px;
    .links-wrapper {
      display: none;
    }
    .logo-wrapper {
      margin: auto 1rem;
    }
  }
`;

const LogoImg = styled.img`
  height: 85px;
  border-radius: 4px;
  @media screen and (max-width: 800px) {
    height: 60px;
  }
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
