import { useState, useContext } from "react";
import { FiAlignJustify, FiArrowLeft } from "react-icons/fi";
import { SlArrowRight } from "react-icons/sl";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import CloseButton from "react-bootstrap/CloseButton";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));
  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className="w-full border-none bg-accordionWhite items-start flex pl-0 pr-0 font-semibold text-2xl uppercase"
      onClick={decoratedOnClick}
    >
      {children}
      <span
        className={
          isCurrentEventKey
            ? "material-symbols-outlined ml-auto transition duration-300 transform rotate-45 text-3xl font-normal text-blue"
            : "material-symbols-outlined ml-auto transform rotate-0 transition duration-300 text-3xl font-normal text-yellowAlt"
        }
      >
        add
      </span>
    </button>
  );
}

const DropdownMenu = ({ links, logo }) => {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  return (
    <div className="flex flex-col absolute top-4 right-3 z-10 dropdown-modal">
      <button className="flex justify-end bg-transparent text-white text-3xl p-0" onClick={() => handleShow()}>
        <FiAlignJustify />
      </button>

      <Modal id="nav-menu" show={show} fullscreen onHide={() => setShow(false)}>
        <Modal.Header className="pr-2">
          <LogoImg src={logo} alt="logo" />
          <CloseButton variant="white" onClick={() => setShow(false)} />
        </Modal.Header>
        <Modal.Body>
          <div className="accordion pb-16">
            <Accordion>
              {links.map((link, i) => {
                if (link.fields.isParentNav === true) {
                  return (
                    <Card key={i} className="p-0">
                      <Card.Header className="bg-gray border-b-0 pl-0 pr-0">
                        <ContextAwareToggle eventKey={link.sys.id}>{link.fields.title}</ContextAwareToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={link.sys.id}>
                        <Card.Body className="flex flex-col">
                          {link.fields.childLinks.map((child) => {
                            return (
                              <Link
                                to={child.fields.slug}
                                onClick={() => setShow(false)}
                                className="p-3 no-underline text-2xl uppercase flex flex-row items-center text-yellowAlt"
                              >
                                <SlArrowRight className="pl-2 mr-3" />
                                {child.fields.title}
                              </Link>
                            );
                          })}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  );
                } else {
                  return (
                    <Card key={i} className="p-0">
                      <Card.Header className="bg-gray border-b-0 pl-0 pr-0">
                        <Link to={link.fields.slug} onClick={() => setShow(false)} className="no-underline text-black">
                          <button
                            type="button"
                            className="w-full border-none bg-accordionWhite items-start flex pl-0 pr-0 font-semibold text-2xl uppercase"
                          >
                            {link.fields.title}
                          </button>
                        </Link>
                      </Card.Header>
                    </Card>
                  );
                }
              })}
            </Accordion>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const LogoImg = styled.img`
  height: 85px;
  border-radius: 4px;
  @media screen and (max-width: 800px) {
    height: 60px;
  }
`;

export default DropdownMenu;
