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

  const handleSubmit = async (event) => {
    //Stop page from refreshing
    event.preventDefault();

    const name = `${firstName} ${lastName}`;

    //Function to create a new customer
    const createCustomer = async () => {
      const customerData = {
        name: name,
        email: email,
      };
      try {
        const response = await axios.post("/api/stripe/create-customer", customerData);
        if (response.status === 200) {
          const newCustomer = response.data.client_id;
          return newCustomer;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const updateIntent = async (data) => {
      const pi = id.substring(0, id.indexOf("_secret"));
      const customerData = {
        customerId: data,
        pi: pi,
      };
      const res = await axios.post("/api/stripe/update", customerData);
      const updateCustomer = res.data;
      return updateCustomer;
    };

    //Function to search for existing customer
    const searchCustomers = async () => {
      const response = await fetch(`/api/stripe/search/users/${name}/emails/${email}`);
      const data = await response.json();

      if (data.length === 0) {
        //create customer
        const clientId = await createCustomer();
        if (clientId) {
          await updateIntent(clientId);
        }
      } else {
        //get customer ID and update payment intent
        await updateIntent(data[0].id);
      }
    };

    const stripeOptions = await searchCustomers();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/membership",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <>
      <div className="flex flex-col h-[85vh]">
        <Modal.Header closeButton>
          <Modal.Title>Membership Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalWrapper>
            <form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First name</Form.Label>
                  <Form.Control placeholder="First name" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGrid">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control placeholder="Last name" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3 mt-12" id="formGridCheckbox">
                <Form.Check type="checkbox" label=" I agree to become a member of the Castlemaine Jazz Festival Inc" />
              </Form.Group>
              <PaymentElement />
              <button disabled={!stripe}>Submit</button>
              {/* Show error message to your customers */}
              {errorMessage && <div>{errorMessage}</div>}{" "}
            </form>
          </ModalWrapper>
        </Modal.Body>

        <Modal.Footer>
          <Button disabled={applicationDisabled} onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
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
