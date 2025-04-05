import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Feedback from "react-bootstrap/Feedback";
import { ClickButton } from "../buttons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const VolunteerApplicationModal = () => {
  const [show, setShow] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [pages, setPages] = useState(1);
  //Button disabled bools
  const [applicationDisabled, setApplicationDisabled] = useState(true);
  const [detailsDisabled, setDetailsDisabled] = useState(true);
  const [contactDisabled, setContactDisabled] = useState(true);
  const [emergencyDisabled, setEmergencyDisabled] = useState(true);

  //Volunteer Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [age, setAge] = useState("");
  const [dl, setDl] = useState("");
  const [rsa, setRsa] = useState("");
  const [lifting, setLifting] = useState("");
  const [none, setNone] = useState("");
  const [bump, setBump] = useState("");
  const [hosp, setHosp] = useState("");
  const [pre, setPre] = useState("");
  const [door, setDoor] = useState("");
  const [billet, setBillet] = useState("");
  const [ecName, setECName] = useState("");
  const [ecPhone, setECPhone] = useState("");
  const [ecR, setECR] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [playingYear, setPlayingYear] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todayDate = new Date();
  const thisYear = todayDate.getFullYear();
  const thisMonth = todayDate.getMonth();

  useEffect(() => {
    if (thisMonth === 0) {
      const stringYear = thisYear.toString();
      setPlayingYear(stringYear);
    } else {
      const year = thisYear;
      const stringYear = year.toString();
      setPlayingYear(stringYear);
    }
  }, [thisYear]);

  //Get data from Contentful
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/page/volunteer-application-questions");
        const data = res;
        setQuestionData(data.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  //----- DISABLE CHECKS -------
  //Disable details questions button
  useEffect(() => {
    if (firstName !== "" && lastName !== "" && email !== "" && phone !== "" && address !== "" && city !== "" && state !== "" && postcode !== "") {
      setDetailsDisabled(false);
    }
  }, [firstName, lastName, email, phone, address, city, state, postcode]);

  //Disable contact questions button
  useEffect(() => {
    if (
      age !== "" &&
      (dl !== "" || rsa !== "" || lifting !== "" || none !== "") &&
      (bump !== "" || pre !== "" || hosp !== "" || door !== "" || billet !== "")
    ) {
      setContactDisabled(false);
    }
  }, [age, dl, rsa, lifting, none, bump, pre, hosp, door, billet]);

  // //Disable emergency questions button
  useEffect(() => {
    if (ecName !== "" && ecPhone !== "" && ecR !== null) {
      setEmergencyDisabled(false);
    }
  }, [ecName, ecPhone, ecR]);

  //----- INPUT VERIFICATION CHECKS -------
  //Detail input verifications
  const handleDetailsPage = (e) => {
    const nm = document.getElementById("Name").querySelector("div");
    const eml = document.getElementById("Email").querySelector("div");
    const pn = document.getElementById("phone").querySelector("div");
    const add = document.getElementById("Address").querySelector("div");

    if (firstName === "" && lastName === "") {
      nm.style.display = "flex";
    }
    if (firstName !== "" && lastName !== "") {
      nm.style.display = "none";
    }
    if (email === "") {
      eml.style.display = "flex";
    }
    if (email !== "") {
      eml.style.display = "none";
    }
    if (phone === "") {
      pn.style.display = "flex";
    }
    if (phone !== "") {
      pn.style.display = "none";
    }
    if (address === "" && city === "" && state === "" && postcode === "") {
      add.style.display = "flex";
    }
    if ((address !== "") & (city !== "") && state !== "" && postcode !== "") {
      add.style.display = "none";
    }
    setPages(pages + 1);
  };

  //Contact input verifications
  const handleInfoPage = (e) => {
    const bln = document.getElementById("Age").querySelector("div");
    const ble = document.getElementById("Do you have ?").querySelector("div");
    const blp = document.getElementById("Roles").querySelector("div");

    if (age === "") {
      bln.style.display = "flex";
    }
    if (age !== "") {
      bln.style.display = "none";
    }
    if (dl === "" || rsa === "" || lifting === "" || none === "") {
      ble.style.display = "flex";
    }
    if (dl !== "" || rsa !== "" || lifting !== "" || none !== "") {
      ble.style.display = "none";
    }
    if (bump === "" || (pre === "") | (hosp === "") || (door === "") | (billet === "")) {
      blp.style.display = "flex";
    }
    if (bump !== "" || (pre !== "") | (hosp !== "") || (door !== "") | (billet !== "")) {
      blp.style.display = "none";
    }

    if (lifting === "") {
      setLifting(false);
    }
    if (dl === "") {
      setDl(false);
    }
    if (rsa === "") {
      setRsa(false);
    }
    setPages(pages + 1);
  };

  // ------- PAGE NAVIGATION --------
  const handlePageForward = () => {
    setPages(pages + 1);
  };

  const handlePageBack = () => {
    setPages(pages - 1);
  };

  const handlePreQPage = () => {
    setPages(pages + 1);
    setApplicationDisabled(!applicationDisabled);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    const rolesArr = [];

    if (bump) {
      rolesArr.push("Bump In/Bump Out");
    }
    if (hosp) {
      rolesArr.push("Hospitality");
    }
    if (pre) {
      rolesArr.push("Pre Festival Jobs");
    }
    if (door) {
      rolesArr.push("Door Monitor/Ticket Sales");
    }
    if (billet) {
      rolesArr.push("Billeting");
    }

    const userData = {
      name: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: `${address}, ${city}, ${state}, ${postcode} `,
      age: age,
      licence: dl,
      rsa: rsa,
      lifting: lifting,
      roles: rolesArr,
      ecName: ecName,
      ecPhone: ecPhone,
      ecR: ecR,
      year: playingYear,
    };
    try {
      const response = await axios.post("/api/airtable/volunteer-application", userData);
      if (response.status === 200) {
        setShowSpinner(false);
        setPages(7);
      } else {
        setPages(8);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const TestSend = () => {
  //   setDataRetrieved(true);
  //   return (
  //     <main className="flex flex-col items-center justify-center gap-4">
  //       <form>
  //         <button formAction={SendWelcome(leaderEmail, leaderName, bandId)}></button>
  //       </form>
  //     </main>
  //   );
  // };

  return (
    <>
      {questionData.length !== 0 && (
        <>
          <ClickButton text="Apply now" click={handleShow} classNme="w-[20rem] mr-auto ml-auto mt-4 mb-8 flex items-center" />

          <Modal show={show} onHide={handleClose} size="lg" contentClassName=" pl-3 pr-3 sm:pl-4 pr-4 md:pl-6 pr-6">
            {showSpinner && (
              <Spinner animation="border" role="status" className="absolute top-2/4 left-2/4 z-10">
                <span className="visually-hidden absolute top-2/4 left-2/4">Loading...</span>
              </Spinner>
            )}
            {showSpinner && <p className="absolute top-[56%] left-[47%] z-10">Submitting...</p>}

            <>
              {questionData[0].fields.referenceItems.map((question, i) => {
                if (question.fields.pageNumber === pages) {
                  return (
                    <div key={i} className="flex flex-col">
                      <Modal.Header closeButton>
                        <Modal.Title>{question.fields.heading}</Modal.Title>
                      </Modal.Header>
                      {question.sys.contentType.sys.id === "applicationQuestion" && (
                        <>
                          <Modal.Body>
                            <div>{documentToReactComponents(question.fields.preQuestionText)}</div>
                            {question.fields.title !== "Volunteer thank you" && (
                              <ModalWrapper>
                                <Form.Group className="mb-3 pt-8">
                                  {/* <Form.Control size="lg"> */}
                                  <Form.Check
                                    className="flex items-center"
                                    required
                                    label={question.fields.checkboxLabel}
                                    feedback="You must agree before continuing."
                                    feedbackType="invalid"
                                    onChange={(e) => setApplicationDisabled(!applicationDisabled)}
                                  />
                                  {/* </Form.Control> */}
                                </Form.Group>
                              </ModalWrapper>
                            )}
                          </Modal.Body>

                          <Modal.Footer>
                            {question.fields.title !== "Volunteer thank you" && (
                              <Button disabled={applicationDisabled} onClick={handlePreQPage}>
                                Next
                              </Button>
                            )}
                            {question.fields.title === "Volunteer thank you" && <Button onClick={handleClose}>Close</Button>}
                          </Modal.Footer>
                        </>
                      )}
                      {/* Application form question section */}
                      <>
                        {question.sys.contentType.sys.id === "referenceSection" && (
                          <>
                            {question.fields.title === "Volunteer form: Details" && (
                              <>
                                <Modal.Body>
                                  {question.fields.referenceItems.map((q, i) => (
                                    <div key={i}>
                                      {q.fields.isInput && q.fields.inputType === "text" && (
                                        <Row className="mb-3 flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
                                          <Form.Group as={Col} controlId="firstName" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              placeholder="First name"
                                              required
                                              onChange={(e) => setFirstName(e.target.value)}
                                              value={firstName}
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                                          </Form.Group>
                                          <Form.Group as={Col} controlId="lastName" className="" id="last-name">
                                            <Form.Label className="invisible">LastName</Form.Label>
                                            <Form.Control
                                              type="text"
                                              placeholder="Last name"
                                              required
                                              onChange={(e) => setLastName(e.target.value)}
                                              value={lastName}
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                                          </Form.Group>
                                        </Row>
                                      )}

                                      {q.fields.isInput && q.fields.inputType === "email" && (
                                        <Row className="mb-3 flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
                                          <Form.Group as={Col} controlId="email" className="" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control
                                              type="email"
                                              placeholder="email address"
                                              required
                                              value={email}
                                              onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide your email.</Form.Control.Feedback>
                                          </Form.Group>
                                          <Form.Group as={Col} controlId="phone" id="phone">
                                            <Form.Label>
                                              Phone <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control
                                              type="tel"
                                              value={phone}
                                              placeholder="0444 444 444"
                                              onChange={(e) => setPhone(e.target.value)}
                                              required
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
                                          </Form.Group>
                                        </Row>
                                      )}

                                      {q.fields.isInput && q.fields.inputType === "address" && (
                                        <Form.Group md="6" className="mb-8" id={q.fields.inputLabel}>
                                          <Form.Label>
                                            {q.fields.inputLabel} <span className="text-red">*</span>
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Street address"
                                            required
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address}
                                          />
                                          <Form.Control
                                            type="text"
                                            placeholder="City"
                                            required
                                            onChange={(e) => setCity(e.target.value)}
                                            value={city}
                                            className="mt-3"
                                          />
                                          <div className=" flex flex-row gap-4">
                                            <Form.Control
                                              type="text"
                                              placeholder="State"
                                              required
                                              onChange={(e) => setState(e.target.value)}
                                              value={state}
                                              className="mt-3"
                                            />
                                            <Form.Control
                                              type="text"
                                              placeholder="Postcode"
                                              required
                                              onChange={(e) => setPostcode(e.target.value)}
                                              value={postcode}
                                              className="mt-3"
                                            />
                                          </div>
                                          <Form.Control.Feedback type="invalid">Please provide an address name.</Form.Control.Feedback>
                                        </Form.Group>
                                      )}
                                    </div>
                                  ))}
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button type="submit" disabled={detailsDisabled} onClick={handleDetailsPage}>
                                    Next
                                  </Button>
                                </Modal.Footer>
                              </>
                            )}
                            <>
                              {question.fields.title === "Volunteer Form: Info" && (
                                <>
                                  <Modal.Body>
                                    {question.fields.referenceItems.map((q, i) => (
                                      <div key={i}>
                                        {q.fields.isInput && q.fields.inputType === "dropdown" && (
                                          <Form.Group className="mb-8" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Select
                                              aria-label="age"
                                              required
                                              onChange={(e) => setAge(e.target.value)}
                                              feedback="Please select an age group."
                                              feedbackType="invalid"
                                            >
                                              <option>Select age</option>
                                              {q.fields.multiSelectOptions.map((opt, i) => (
                                                <option key={i}>{opt}</option>
                                              ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">Please select age group.</Form.Control.Feedback>
                                          </Form.Group>
                                        )}
                                        {q.fields.isInput && q.fields.title === "Do you have?" && (
                                          <Form.Group className="mb-8" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Check label="Drivers Licence" onChange={(e) => setDl(e.target.checked)} />
                                            <Form.Check
                                              label="Responsible Service of Alcohol certificate"
                                              onChange={(e) => setRsa(e.target.checked)}
                                            />
                                            <Form.Check
                                              label="Are you able/willing to do some heavy lifting?"
                                              onChange={(e) => setLifting(e.target.checked)}
                                            />
                                            <Form.Check label="None of the above" onChange={(e) => setNone(e.target.checked)} />
                                          </Form.Group>
                                        )}

                                        {q.fields.isInput && q.fields.title === "Roles" && (
                                          <Form.Group className="mb-8" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Check label="Bump In/Bump Out" onChange={(e) => setBump(e.target.checked)} />
                                            <Form.Check label="Hospitality" onChange={(e) => setHosp(e.target.checked)} />
                                            <Form.Check label="Pre Festival Jobs?" onChange={(e) => setPre(e.target.checked)} />
                                            <Form.Check label="Door Monitor/Ticket Sales" onChange={(e) => setDoor(e.target.checked)} />
                                            <Form.Check label="Billeting" onChange={(e) => setBillet(e.target.checked)} />
                                          </Form.Group>
                                        )}
                                      </div>
                                    ))}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handlePageBack}>
                                      Back
                                    </Button>
                                    <Button disabled={contactDisabled} onClick={handleInfoPage} type="submit">
                                      Next
                                    </Button>
                                  </Modal.Footer>
                                </>
                              )}
                            </>
                            <>
                              {question.fields.title === "Volunteer Form: Emergency Contact" && (
                                <Form
                                  onSubmit={handleSubmit}
                                  encType={"multipart/form-data"}
                                  className="container flex justify-content-center flex-col h-full"
                                >
                                  <>
                                    <Modal.Body>
                                      {question.fields.referenceItems.map((q, i) => (
                                        <div key={i}>
                                          {q.fields.isInput && q.fields.title === "Contact Name" && (
                                            <>
                                              <Form.Group controlId="ecName" id={q.fields.inputLabel} className="mb-4">
                                                <Form.Label>
                                                  Emergency {q.fields.inputLabel} <span className="text-red">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Contact name"
                                                  required
                                                  onChange={(e) => setECName(e.target.value)}
                                                  value={ecName}
                                                />
                                                <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                                              </Form.Group>
                                            </>
                                          )}

                                          {q.fields.isInput && q.fields.title === "Contact Phone" && (
                                            <Row className="mb-3 flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
                                              <Form.Group as={Col} controlId="phone" id="phone">
                                                <Form.Label>
                                                  Emergency Contact Phone <span className="text-red">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                  type="tel"
                                                  value={ecPhone}
                                                  placeholder="0444 444 444"
                                                  onChange={(e) => setECPhone(e.target.value)}
                                                  required
                                                  className="mb-3"
                                                />
                                                <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
                                              </Form.Group>
                                              <Form.Group as={Col} controlId="relationship" className="" id="relationship">
                                                <Form.Label className="">
                                                  Emergency Contact Relationship <span className="text-red">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Relationship"
                                                  required
                                                  onChange={(e) => setECR(e.target.value)}
                                                  value={ecR}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                  Please provide your emergency contact relationship.
                                                </Form.Control.Feedback>
                                              </Form.Group>
                                            </Row>
                                          )}
                                        </div>
                                      ))}
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="secondary" onClick={handlePageBack}>
                                        Back
                                      </Button>
                                      <Button type="submit" variant="primary" disabled={emergencyDisabled}>
                                        Submit
                                      </Button>
                                    </Modal.Footer>
                                  </>
                                </Form>
                              )}
                            </>
                          </>
                        )}
                      </>
                    </div>
                  );
                }
              })}
            </>
          </Modal>
        </>
      )}
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
export default VolunteerApplicationModal;
