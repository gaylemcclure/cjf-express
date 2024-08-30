import {
  ClickButton,
  SmallButton,
  SmallBackButton,
} from "../components/buttons";
import { Modal as BaseModal, FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import Form from "react-bootstrap/Form";

export function FirstQuestion({ title, year, text, click, subtitle }) {
  return (
    <div className="text-center justify-center pt-4 md:pl-8 md:pr-8">
      <h1 className="justify-center flex uppercase text-black text-2xl font-extrabold">
        {title}{" "}
      </h1>
      <h2 className="uppercase text-lg pb-8">
        {subtitle} {year}
      </h2>

      <p className="text-smoke justify-center flex mb-2">{text}</p>
      <SmallButton click={click} text="Continue" disabled={false} />
    </div>
  );
}

{
  /* <Form>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="name@example.com" />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  <Form.Label>Example textarea</Form.Label>
  <Form.Control as="textarea" rows={3} />
</Form.Group>
</Form> */
}

export function Questions({
  title,
  text,
  check,
  label,
  back,
  forward,
  disabled,
}) {
  return (
    <div className="pt-4 md:pl-8 md:pr-8">
      <h1 className="justify-center flex uppercase text-black text-2xl font-extrabold pb-8">
        {title}
      </h1>
      <p className="text-smoke justify-center flex mb-2">{text}</p>
      {/* <FormControlLabel
        required
        control={<Checkbox onChange={check} />}
        label={label}
      /> */}
      <div className="button-wrapper flex">
        <SmallBackButton click={back} text="Previous" disabled={false} />
        <SmallButton click={forward} text="Continue" disabled={disabled} />
      </div>
    </div>
  );
}
export function MultiQuestion({
  title,
  text,
  text2,
  check,
  label,
  back,
  forward,
  disabled,
}) {
  return (
    <div className="pt-4 md:pl-8 md:pr-8">
      <h1 className="justify-center flex uppercase text-black text-4xl font-extrabold pb-8">
        {title}
      </h1>
      <ul className="list-disc ml-4 mb-8">
        <li className="pb-2">{text}</li>
        <li>{text2}</li>
      </ul>
      {/* <FormControlLabel
        required
        control={<Checkbox onChange={check} />}
        label={label}
      /> */}
      <div className="button-wrapper flex">
        <SmallBackButton click={back} text="Previous" disabled={false} />
        <SmallButton click={forward} text="Continue" disabled={disabled} />
      </div>
    </div>
  );
}

export function TriQuestion({
  title,
  text,
  text2,
  text3,
  check,
  label,
  back,
  forward,
  disabled,
}) {
  return (
    <div className="pt-4 md:pl-8 md:pr-8">
      <h1 className="justify-center flex uppercase text-black text-4xl font-extrabold pb-8">
        {title}
      </h1>
      <ul className="list-disc ml-4">
        <li className="pb-2">{text}</li>
        <li className="pb-2">{text2}</li>
        <li className="pb-2">{text3}</li>
      </ul>
      {/* <FormControlLabel
        required
        control={<Checkbox onChange={check} />}
        label={label}
      /> */}
      <div className="button-wrapper flex">
        <SmallBackButton click={back} text="Previous" disabled={false} />
        <SmallButton click={forward} text="Continue" disabled={disabled} />
      </div>
    </div>
  );
}
