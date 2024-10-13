import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import SingleTextSection from "./pageSections/singleTextSection";
import Card from "react-bootstrap/Card";

const PINK = "rgba(255, 192, 203, 0.6)";
const BLUE = "rgba(0, 0, 255, 0.6)";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className="w-full border-none bg-accordionWhite items-start flex pl-0 pr-0 font-semibold text-2xl"
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

const AccordionComponent = ({ heading, items }) => {
  let itemCount = 0;
  return (
    <div className="accordion pb-16">
      <h3 className="uppercase font-bold text-4xl pt-8 pb-4">{heading}</h3>
      <Accordion>
        {items.map((item, i) => {
          itemCount++;
          return (
            <Card
              key={i}
              className={
                itemCount === 1
                  ? "p-0 bg-gray border-r-0 border-l-0 rounded-none border-t-[1px] pr-0 pl-0"
                  : "p-0 bg-gray border-r-0 border-l-0 rounded-none border-t-[0.5px] pr-0 pl-0"
              }
            >
              <Card.Header className="bg-gray border-b-0 pl-0 pr-0">
                <ContextAwareToggle eventKey={item.sys.id}>{item.fields.title}</ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={item.sys.id}>
                <Card.Body>
                  <SingleTextSection textId={item.sys.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </div>
  );
};

//

//   function ContextAwareToggle({ children, eventKey, callback }) {
//     const { activeEventKey } = useContext(AccordionContext);
//     const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

//     console.log(activeEventKey);
//     const isCurrentEventKey = activeEventKey === eventKey;
//     return (

//     );
//   }

//   return (

//   );
// };

export default AccordionComponent;
