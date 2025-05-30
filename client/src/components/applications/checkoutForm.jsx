import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import axios from "axios";

const CheckoutForm = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
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

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAirtable = async (e) => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      city: city,
      postcode: postcode,
      paid: true,
    };
    try {
      const response = await axios.post("/api/airtable/new-member", userData);
      if (response.status === 200) {
        console.log("success");
      } else {
        console.log("nope");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAirtable();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.CLIENT_URL}/member-success?email=${email}&name=${firstName}`,
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <>
      <div className="flex flex-col h-[86vh]">
        <Modal.Header closeButton>
          <Modal.Title>Membership Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalWrapper>
            <form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    First name <span className="text-red">*</span>
                  </Form.Label>
                  <Form.Control type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGrid">
                  <Form.Label>
                    Last name <span className="text-red">*</span>
                  </Form.Label>
                  <Form.Control type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    Email <span className="text-red">*</span>
                  </Form.Label>
                  <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    Phone <span className="text-red">*</span>
                  </Form.Label>
                  <Form.Control type="phone" value={phone} required onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>
                  Address <span className="text-red">*</span>
                </Form.Label>
                <Form.Control type="text" value={address} required onChange={(e) => setAddress(e.target.value)} />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>
                    City <span className="text-red">*</span>
                  </Form.Label>
                  <Form.Control type="text" value={city} required onChange={(e) => setCity(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>
                    State <span className="text-red">*</span>
                  </Form.Label>
                  <Form.Select defaultValue="VIC">
                    <option>VIC</option>
                    <option>ACT</option>
                    <option>NSW</option>
                    <option>NT</option>
                    <option>QLD</option>
                    <option>SA</option>
                    <option>TAS</option>
                    <option>WA</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>
                    Postcode <span className="text-red">*</span>
                  </Form.Label>
                  <Form.Control type="text" value={postcode} required onChange={(e) => setPostcode(e.target.value)} />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3 mt-12" id="formGridCheckbox">
                <Form.Check type="checkbox" label=" I agree to become a member of the Castlemaine Jazz Festival Inc and pay $5 membership fee *" />
              </Form.Group>
              {/* <PaymentElement />
              <button disabled={!stripe} type="submit">Submit</button>
              {/* Show error message to your customers 
              {errorMessage && <div>{errorMessage}</div>}{" "} */}

              <PaymentElement id="payment-element" options={paymentElementOptions} />
              <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </form>
          </ModalWrapper>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </div>
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

export default CheckoutForm;
