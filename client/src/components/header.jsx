import styled from 'styled-components';
import { useHeaderContext } from '../utils/headerContext';
import { useState } from 'react';


const Header = () => {
  const { logo, links } = useHeaderContext();
  const [openLinks, setOpenLinks] = useState(false)

  const createParentLink = (data, key) => {
    return (
      <div key={key} className=" flex flex-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <NavLink id={data.title}>{data.title}</NavLink>
      {openLinks && (
        <div className="open-menu flex flex-col">
          {data.childLinks.map((child) => (
            <NavLinkChild className="p-4" key={child.sys.id}>{child.fields.title}</NavLinkChild>
      ))}
        </div>
      )}

      </div>
    )
  }

  const handleMouseEnter = () => {
    setOpenLinks(true)
  }
const handleMouseLeave = () => {
  setOpenLinks(false)
}
  return (
    <Navbar className="navbar flex flex-row justify-start">
      <div className="logo-wrapper">
      <LogoImg src={logo} alt="logo"/>
      </div>
      <div className="links-wrapper flex ml-auto space-x-4">
        {links.map((link, key) => {
          if (link.sys.contentType.sys.id === "parentNavigationLink") {
            return createParentLink(link.fields, link.sys.id)
          }
          return <NavLink key={link.sys.id} href={link.fields.slug}>{link.fields.title}</NavLink>
        })}
      </div>

    </Navbar>
  );
};

const Navbar = styled.nav`
background-color: black;
width: 100%;
height: 120px;

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
`

const LogoImg = styled.img`
  height: 100px;
  border-radius: 4px;
`

const NavLink = styled.a`
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  &&:hover {
    cursor: pointer;
    color: var(--yellow);
  }
`

const NavLinkChild = styled.a`
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  &&:hover {
    cursor: pointer;
    background-color: var(--main-gray);
    border-radius: 8px;
    color: var(--yellow);

  }
`

const NavButton = styled.button`

`

export default Header;
