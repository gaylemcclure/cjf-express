import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Feedback from "react-bootstrap/Feedback";
import { ClickButton } from "../buttons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";
import PaymentStatus from "./paymentStatus";
import { useStripeContext } from "../../utils/stripeContext";

const stripePromise = loadStripe(process.env.STRIPE_TEST_PUBLISHABLE);

const MembershipModal = () => {
  const { stripe } = useStripeContext();

  const [showSuccess, setShowSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  //Button disabled bools
  const [applicationDisabled, setApplicationDisabled] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todayDate = new Date();
  const thisYear = todayDate.getFullYear();
  const thisMonth = todayDate.getMonth();

  const handleSubmitData = async (e) => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      city: city,
      state: state,
      postcode: postcode,
      date: todayDate,
    };
    try {
      const response = await axios.post("/api/airtable/", userData);
      if (response.status === 200) {
        handlePageForward();
      } else {
        setPages(14);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getIntentStatus = async () => {
    const response = await fetch(`/api/stripe/payment-status`);
    const data = await response.json();
    if (data === "succeeded") {
      setShowSuccess(true);
    }
    return data;
  };

  getIntentStatus;

  return (
    <>
      <Elements stripe={stripePromise} options={stripe}>
        <ClickButton text="Apply now" click={handleShow} classNme="w-[20rem] mr-auto ml-auto mt-4 flex items-center" />

        <Modal show={show} onHide={handleClose} size="lg" contentClassName="min-h-[55rem] pl-8 pr-8">
          <CheckoutForm id={stripe.clientSecret} />
        </Modal>
        {showSuccess && <PaymentStatus />}
      </Elements>
    </>
  );
};

const ModalWrapper = styled.div`
  margin-top: auto;
  .form-check-input {
    height: 22px;
    width: 22px;
  }
  .form-check-label {
    font-weight: 600;
    padding-left: 1rem;
  }
`;
export default MembershipModal;
