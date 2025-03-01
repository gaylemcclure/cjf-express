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

const BandApplicationModal = () => {
  const [show, setShow] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [pages, setPages] = useState(1);
  //Button disabled bools
  const [applicationDisabled, setApplicationDisabled] = useState(true);
  const [detailsDisabled, setDetailsDisabled] = useState(true);
  const [contactDisabled, setContactDisabled] = useState(true);
  const [memberDisabled, setMemberDisabled] = useState(true);
  const [datesDisabled, setdatesDisabled] = useState(true);
  const [availabilityDisabled, setAvailabilityDisabled] = useState(true);
  const [feesDisabled, setFeesDisabled] = useState(true);
  const [marketingDisabled, setMarketingDisabled] = useState(true);
  const [memberNumberDisabled, setMemberNumberDisabled] = useState(false);
  //Band Details
  const [bandName, setBandName] = useState("");
  const [bandStyle, setBandStyle] = useState("");
  const [bandLink, setBandLink] = useState("");
  const [aboutBand, setAboutBand] = useState("");
  //Contact details
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  //Member details
  const [numberMembers, setNumberMembers] = useState();
  const [membersArr, setMembersArr] = useState([]);
  const [showNoMembers, setShowNoMembers] = useState(false);
  const [instrument, setInstrument] = useState({ id: 0, inst: "" });
  const [musicians, setMusicians] = useState({ id: 0, muso: "" });
  const [musicianArr, setMusicianArr] = useState([]);
  //Availability details
  const [availability, setAvailability] = useState([]);
  //Fee details
  const [firstFee, setFirstFee] = useState(0);
  const [secondFee, setSecondFee] = useState(0);
  //Marketing details
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [bio, setBio] = useState("");
  const [upload, setUpload] = useState(null);
  const [playingYear, setPlayingYear] = useState("");
  const [uploadedFileURL, setUploadedFileURL] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  //Unused
  const [allBandData, setAllBandData] = useState();
  const [bandId, setBandId] = useState();
  //Verification bools
  const [playedBefore, setPlayedBefore] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [inputId, setInputId] = useState();
  const [verified, setVerified] = useState(false);
  const [validated, setValidated] = useState(false);
  const [bandValidated, setBandValidated] = useState(false);

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
      const year = thisYear + 1;
      const stringYear = year.toString();
      setPlayingYear(stringYear);
    }
  }, [thisYear]);

  //Get data from Contentful
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/page/band-application-questions");
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
    if (bandName !== "" && bandStyle !== "" && bandLink !== "" && aboutBand !== "") {
      setDetailsDisabled(false);
    }
  }, [bandName, bandStyle, bandLink, aboutBand]);

  //Disable contact questions button
  useEffect(() => {
    if (leaderEmail !== "" && leaderName !== "" && leaderPhone !== "") {
      setContactDisabled(false);
    }
  }, [leaderEmail, leaderName, leaderPhone]);

  //Disable member questions button
  useEffect(() => {
    if (numberMembers > 0) {
      if (Number(numberMembers) === musicianArr.length) {
        setMemberDisabled(false);
      }
    }
  }, [musicianArr, numberMembers]);

  //Disable availability questions button
  useEffect(() => {
    console.log(availability.length);
    if (availability.length > 0) {
      setAvailabilityDisabled(false);
    } else if (availability.length === 0) {
      setAvailabilityDisabled(true);
    }
  }, [availability]);

  //Disable fees questions button
  useEffect(() => {
    if (firstFee !== 0 && secondFee !== 0) {
      setFeesDisabled(false);
    }
  }, [firstFee, secondFee]);

  //Disable marketing questions button
  useEffect(() => {
    if (bio !== "" && websiteUrl !== "" && uploadedFileURL !== null) {
      setMarketingDisabled(false);
    }
  }, [bio, websiteUrl, uploadedFileURL]);

  //----- INPUT VERIFICATION CHECKS -------
  //Detail input verifications
  const handleDetailsPage = (e) => {
    const bn = document.getElementById("Band Name").querySelector("div");
    const bs = document.getElementById("Band Style").querySelector("div");
    const lnk = document.getElementById("Links to band music").querySelector("div");

    if (bandName === "") {
      bn.style.display = "flex";
    }
    if (bandName !== "") {
      bn.style.display = "none";
    }
    if (bandStyle === "") {
      bs.style.display = "flex";
    }
    if (bandStyle !== "") {
      bs.style.display = "none";
    }
    if (bandLink === "") {
      lnk.style.display = "flex";
    }
    if (bandLink !== "") {
      lnk.style.display = "none";
    }

    setPages(pages + 1);
  };

  //Contact input verifications
  const handleContactPage = (e) => {
    const bln = document.getElementById("Band Leader Name").querySelector("div");
    const ble = document.getElementById("Band Leader Email").querySelector("div");
    const blp = document.getElementById("Band Leader Phone").querySelector("div");

    if (leaderName === "") {
      bln.style.display = "flex";
    }
    if (leaderName !== "") {
      bln.style.display = "none";
    }
    if (leaderEmail === "") {
      ble.style.display = "flex";
    }
    if (leaderEmail !== "") {
      ble.style.display = "none";
    }
    if (leaderPhone === "") {
      blp.style.display = "flex";
    }
    if (leaderPhone !== "") {
      blp.style.display = "none";
    }

    setPages(pages + 1);
  };

  //Member input verifications
  const handleMemberPage = (e) => {
    const bn = document.getElementById("Band Name").querySelector("div");
    const bs = document.getElementById("Band Style").querySelector("div");
    const lnk = document.getElementById("Links to band music").querySelector("div");

    if (bandName === "") {
      bn.style.display = "flex";
    }
    if (bandName !== "") {
      bn.style.display = "none";
    }
    if (bandStyle === "") {
      bs.style.display = "flex";
    }
    if (bandStyle !== "") {
      bs.style.display = "none";
    }
    if (bandLink === "") {
      lnk.style.display = "flex";
    }
    if (bandLink !== "") {
      lnk.style.display = "none";
    }

    setPages(pages + 1);
  };

  //Availability input verifications
  const handleAvailabilityPage = (e) => {
    const bn = document.getElementById("Band Name").querySelector("div");
    const bs = document.getElementById("Band Style").querySelector("div");
    const lnk = document.getElementById("Links to band music").querySelector("div");

    if (bandName === "") {
      bn.style.display = "flex";
    }
    if (bandName !== "") {
      bn.style.display = "none";
    }
    if (bandStyle === "") {
      bs.style.display = "flex";
    }
    if (bandStyle !== "") {
      bs.style.display = "none";
    }
    if (bandLink === "") {
      lnk.style.display = "flex";
    }
    if (bandLink !== "") {
      lnk.style.display = "none";
    }

    setPages(pages + 1);
  };

  //Fees input verifications
  const handleFeesPage = (e) => {
    const bn = document.getElementById("Band Name").querySelector("div");
    const bs = document.getElementById("Band Style").querySelector("div");
    const lnk = document.getElementById("Links to band music").querySelector("div");

    if (bandName === "") {
      bn.style.display = "flex";
    }
    if (bandName !== "") {
      bn.style.display = "none";
    }
    if (bandStyle === "") {
      bs.style.display = "flex";
    }
    if (bandStyle !== "") {
      bs.style.display = "none";
    }
    if (bandLink === "") {
      lnk.style.display = "flex";
    }
    if (bandLink !== "") {
      lnk.style.display = "none";
    }

    setPages(pages + 1);
  };

  //Marketing input verifications
  const handleMarketingPage = (e) => {
    const bn = document.getElementById("Band Name").querySelector("div");
    const bs = document.getElementById("Band Style").querySelector("div");
    const lnk = document.getElementById("Links to band music").querySelector("div");

    if (bandName === "") {
      bn.style.display = "flex";
    }
    if (bandName !== "") {
      bn.style.display = "none";
    }
    if (bandStyle === "") {
      bs.style.display = "flex";
    }
    if (bandStyle !== "") {
      bs.style.display = "none";
    }
    if (bandLink === "") {
      lnk.style.display = "flex";
    }
    if (bandLink !== "") {
      lnk.style.display = "none";
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

  //Create number of required fields for member input
  const createNumberMembers = (number) => {
    setMemberNumberDisabled(true);
    const numberArr = [];
    for (let i = 0; i < number; i++) {
      numberArr.push(i + 1);
    }
    setMembersArr(numberArr);
    setShowNoMembers(true);
    setMusicians({ id: 0, muso: "" });
    setInstrument({ id: 0, inst: "" });
    setMusicianArr([]);
    const mem = document.getElementById(`member-1`);
    if (mem) {
      numberArr.map((num) => {
        document.getElementById(`member-${num}`).value = "";
        document.getElementById(`inst-${num}`).value = "";
      });
    }
  };

  const handleMultipleMembers = (mem) => {
    if (musicians.id > 0 && instrument.id > 0) {
      //Update the save button
      const button = document.getElementById(`member-save-${mem}`);
      button.classList.remove("bg-black");
      button.classList.add("bg-success");
      button.innerHTML = "saved";
      //Show the next option
      const nextRow = mem + 1;

      const nextMem = document.getElementById(`member-group-${nextRow}`);
      const nextInst = document.getElementById(`inst-group-${nextRow}`);
      if (nextMem) {
        nextMem.classList.remove("hidden");
        nextInst.classList.remove("hidden");
      }

      if (musicianArr.length > 0) {
        const newData = musicianArr.map((m) => {
          if (mem !== m.id) {
            return m;
          } else {
            if (musicians.id === mem && instrument.id === mem) {
              return m;
            } else if (musicians.id !== mem && instrument.id === mem) {
              return {
                ...m,
                musician: musicians.muso,
              };
            } else if (musicians.id === mem && instrument.id !== mem) {
              return {
                ...m,
                instrument: instrument.inst,
              };
            } else if (musicians.id !== mem && instrument.id !== mem) {
              return {
                ...m,
                musician: musicians.muso,
                instrument: instrument.inst,
              };
            }

            // return setMusicianArr({ ...musicianArr, musician: musicians, instrument: instrument });
            //   return setMusicianArr([...musicianArr, { id: mem, musician: musicians, instrument: instrument }]);
            // } else {
            // return {
            //   ...musicianArr,
            //   id: mem,
            //   musician: musicians,
            //   instrument: instrument,
            // };
          }
          //New arr changes go here
          setMusicianArr(newData);
        });
        //Adding new obj goes here
        setMusicianArr([...musicianArr, { id: mem, musician: musicians.muso, instrument: instrument.inst }]);
      } else {
        setMusicianArr([{ id: mem, musician: musicians.muso, instrument: instrument.inst }]);
      }
    }
  };

  const handleAvailability = (opts) => {
    setAvailability((prevAvailability) => {
      // If the array is empty, save the data in the array
      if (prevAvailability.length === 0) {
        return [opts];
      }

      // Check if the data already exists in the array
      const index = prevAvailability.indexOf(opts);
      if (index !== -1) {
        // If new data matches old data, remove it from the array
        return prevAvailability.filter((item) => item !== opts);
      } else {
        // If data doesn't exist, add it to the array
        return [...prevAvailability, opts];
      }
    });
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", upload);
    formData.append("bio", bio);
    formData.append("website", websiteUrl);

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    try {
      const data = await axios.post("/imageupload", formData, config);
      setUploadedFileURL(`${process.env.CLIENT_URL}/uploads/${data.data.filename}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    if (uploadedFileURL !== null) {
      const userData = {
        bandName: bandName,
        leaderName: leaderName,
        bandStyle: bandStyle,
        firstFee: firstFee,
        availability: availability,
        websiteUrl: websiteUrl,
        otherInfo: aboutBand,
        yearPlaying: playingYear,
        leaderEmail: leaderEmail,
        leaderPhone: leaderPhone,
        secondFee: secondFee,
        upload: uploadedFileURL,
        bio: bio,
        bandLink: bandLink,
        musicians: musicianArr,
      };
      try {
        const response = await axios.post("/api/airtable/band-application", userData);
        if (response.status === 200) {
          setShowSpinner(false);
          setPages(13);
        } else {
          setPages(14);
        }
      } catch (error) {
        console.log(error);
      }
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
          <ClickButton text="Apply now" click={handleShow} classNme="w-[20rem] mr-auto ml-auto mt-4 flex items-center" />

          <Modal show={show} onHide={handleClose} size="lg" contentClassName=" pl-8 pr-8">
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
                        <Modal.Title>{question.fields.title}</Modal.Title>
                      </Modal.Header>
                      {question.sys.contentType.sys.id === "applicationQuestion" && (
                        <>
                          <Modal.Body>
                            <div>{documentToReactComponents(question.fields.preQuestionText)}</div>
                            {question.fields.title !== "Thank you" && (
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
                            {question.fields.title !== "Thank you" && (
                              <Button disabled={applicationDisabled} onClick={handlePreQPage}>
                                Next
                              </Button>
                            )}
                            {question.fields.title === "Thank you" && <Button onClick={handleClose}>Close</Button>}
                          </Modal.Footer>
                        </>
                      )}
                      {/* Application form question section */}
                      <>
                        {question.sys.contentType.sys.id === "referenceSection" && (
                          <>
                            {question.fields.title === "Band Application: Band Details" && (
                              <>
                                <Modal.Body>
                                  {question.fields.referenceItems.map((q, i) => (
                                    <div key={i}>
                                      {q.fields.isInput && q.fields.inputType === "text" && (
                                        <Form.Group md="6" className="mb-8" id={q.fields.inputLabel}>
                                          <Form.Label>
                                            {q.fields.inputLabel} <span className="text-red">*</span>
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="A Band Name"
                                            required
                                            onChange={(e) => setBandName(e.target.value)}
                                            value={bandName}
                                          />
                                          <Form.Control.Feedback type="invalid">Please provide a band name.</Form.Control.Feedback>
                                        </Form.Group>
                                      )}
                                      {q.fields.isInput && q.fields.inputType === "dropdown" && (
                                        <Form.Group className="mb-8" id={q.fields.inputLabel}>
                                          <Form.Label>
                                            {q.fields.inputLabel} <span className="text-red">*</span>
                                          </Form.Label>
                                          <Form.Select
                                            aria-label="band style"
                                            value={bandStyle}
                                            required
                                            onChange={(e) => setBandStyle(e.currentTarget.value)}
                                            feedback="You must agree before submitting."
                                            feedbackType="invalid"
                                          >
                                            <option value="" className="opacity-30">
                                              Select ...
                                            </option>
                                            {q.fields.dropdownOptions.map((opts, i) => (
                                              <option value={opts} key={i}>
                                                {opts}
                                              </option>
                                            ))}
                                          </Form.Select>
                                          <Form.Control.Feedback type="invalid">Please select a band style</Form.Control.Feedback>
                                        </Form.Group>
                                      )}
                                      {q.fields.isInput && q.fields.inputType === "url" && (
                                        <Form.Group className="mb-8" id={q.fields.inputLabel}>
                                          <Form.Label>
                                            {q.fields.inputLabel} <span className="text-red">*</span>
                                          </Form.Label>
                                          <Form.Control
                                            type="url"
                                            value={bandLink}
                                            placeholder="https://www.soundcloud.com"
                                            onChange={(e) => setBandLink(e.target.value)}
                                            required
                                            feedback="You must agree before submitting."
                                            feedbackType="invalid"
                                          />
                                          <Form.Control.Feedback type="invalid">Please provide a link to your band's music.</Form.Control.Feedback>
                                        </Form.Group>
                                      )}
                                      {q.fields.isInput && q.fields.inputType === "Large text area" && (
                                        <Form.Group className="mb-8" id={q.fields.inputLabel}>
                                          <Form.Label>
                                            {q.fields.inputLabel} <span className="text-red">*</span>
                                          </Form.Label>
                                          <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Anything you would like us to know..."
                                            value={aboutBand}
                                            onChange={(e) => setAboutBand(e.target.value)}
                                            // required
                                            // feedback="You must agree before submitting."
                                            // feedbackType="invalid"
                                          />
                                          {/* <Form.Control.Feedback type="invalid">
                                            Please provide some information about your band.
                                          </Form.Control.Feedback> */}
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
                              {question.fields.title === "Band Application: Contact Details" && (
                                <>
                                  <Modal.Body>
                                    {question.fields.referenceItems.map((q) => (
                                      <>
                                        {q.fields.isInput && q.fields.inputType === "text" && (
                                          <Form.Group md="6" className="mb-8" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              placeholder="Jane Doe"
                                              required
                                              value={leaderName}
                                              onChange={(e) => setLeaderName(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide a band leader's name.</Form.Control.Feedback>
                                          </Form.Group>
                                        )}
                                        {q.fields.isInput && q.fields.inputType === "email" && (
                                          <Form.Group md="6" className="mb-8" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control
                                              type="email"
                                              placeholder="j.doe@email.com"
                                              required
                                              value={leaderEmail}
                                              onChange={(e) => setLeaderEmail(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide a band leader's email.</Form.Control.Feedback>
                                          </Form.Group>
                                        )}
                                        {q.fields.isInput && q.fields.inputType === "tel" && (
                                          <Form.Group className="mb-8" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control
                                              type="tel"
                                              value={leaderPhone}
                                              placeholder="0444 444 444"
                                              onChange={(e) => setLeaderPhone(e.target.value)}
                                              required
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
                                          </Form.Group>
                                        )}
                                      </>
                                    ))}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handlePageBack}>
                                      Back
                                    </Button>
                                    <Button disabled={contactDisabled} onClick={handleContactPage} type="submit">
                                      Next
                                    </Button>
                                  </Modal.Footer>
                                </>
                              )}
                            </>
                            <>
                              {question.fields.title === "Band Application: Band Members" && (
                                <>
                                  <Modal.Body>
                                    <h3 className="font-lg font-bold mb-8">{question.fields.subtitle}</h3>
                                    {question.fields.referenceItems.map((q) => (
                                      <>
                                        {q.fields.isInput && q.fields.inputType === "number" && (
                                          <Form.Group md="6" className="mb-8" id={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <InputGroup className="mb-3">
                                              <Form.Control
                                                placeholder="1"
                                                value={numberMembers}
                                                aria-label="number members"
                                                type="number"
                                                onChange={(e) => setNumberMembers(e.target.value)}
                                              />
                                              <Button
                                                variant="dark"
                                                id="number-members"
                                                disabled={memberNumberDisabled}
                                                onClick={() => createNumberMembers(numberMembers)}
                                              >
                                                {memberNumberDisabled ? "Confirmed" : "Confirm"}
                                              </Button>
                                            </InputGroup>
                                          </Form.Group>
                                        )}
                                        {q.fields.title === "Member Name" && (
                                          <Row className="mb-1 member-inputs">
                                            {showNoMembers && (
                                              <>
                                                {/* <div className="members"> */}
                                                {membersArr.map((mem) => (
                                                  <>
                                                    <Form.Group
                                                      as={Col}
                                                      md="6"
                                                      id={`member-group-${mem}`}
                                                      className={mem === 1 ? "member mb-2" : "member mb-2 hidden"}
                                                    >
                                                      <Form.Label>
                                                        Member {mem}'s full name <span className="text-red">*</span>
                                                      </Form.Label>
                                                      <Form.Control
                                                        type="text"
                                                        placeholder="Jane Doe"
                                                        required
                                                        id={`member-${mem}`}
                                                        onChange={(e) => setMusicians({ id: mem, muso: e.target.value })}
                                                      />
                                                      <Form.Control.Feedback type="invalid">
                                                        Please provide a band leader's name.
                                                      </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group
                                                      as={Col}
                                                      md="6"
                                                      id={`inst-group-${mem}`}
                                                      className={mem === 1 ? "instrument mb-6" : "instrument mb-6 hidden"}
                                                    >
                                                      <Form.Label>
                                                        Member {mem}'s Instrument <span className="text-red">*</span>
                                                      </Form.Label>
                                                      <InputGroup className="mb-3">
                                                        <Form.Select
                                                          aria-label="band style"
                                                          required
                                                          onChange={(e) => setInstrument({ id: mem, inst: e.target.value })}
                                                          feedback="You must agree before submitting."
                                                          feedbackType="invalid"
                                                          id={`inst-${mem}`}
                                                        >
                                                          <option value="">Select ...</option>
                                                          <option value="Vocals">Vocals</option>
                                                          <option value="Guitar">Guitar</option>
                                                          <option value="Bass">Bass</option>
                                                          <option value="Double Bass">Double Bass</option>
                                                          <option value="Drums">Drums</option>
                                                          <option value="Percussion">Percussion</option>
                                                          <option value="Piano">Piano</option>
                                                          <option value="Keyboard">Keyboard</option>
                                                          <option value="Saxophone">Saxophone</option>
                                                          <option value="Trombone">Trombone</option>
                                                          <option value="Trumpet">Trumpet</option>
                                                          <option value="Clarinet">Clarinet</option>
                                                          <option value="Flute">Flute</option>
                                                          <option value="Other">Other</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">Please select a band style</Form.Control.Feedback>
                                                        <Button
                                                          variant="dark"
                                                          className="bg-black"
                                                          id={`member-save-${mem}`}
                                                          onClick={() => handleMultipleMembers(mem)}
                                                        >
                                                          Save
                                                        </Button>
                                                      </InputGroup>
                                                    </Form.Group>
                                                  </>
                                                ))}
                                              </>
                                            )}
                                          </Row>
                                        )}
                                      </>
                                    ))}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                      Cancel
                                    </Button>
                                    <Button variant="secondary" onClick={handlePageBack}>
                                      Back
                                    </Button>
                                    <Button type="submit" disabled={memberDisabled} onClick={handlePageForward}>
                                      Next
                                    </Button>
                                  </Modal.Footer>
                                </>
                              )}
                            </>
                            <>
                              {question.fields.title === "Band Application: Availability" && (
                                <>
                                  <Modal.Body>
                                    <h3 className="font-bold text-lg pb-8">
                                      {question.fields.subtitle} <span className="text-red">*</span>
                                    </h3>
                                    {question.fields.referenceItems.map((q) => (
                                      <>
                                        {q.fields.isInput && q.fields.inputType === "Multi select" && (
                                          <Form.Group className="mb-3">
                                            {q.fields.multiSelectOptions.map((opts) => (
                                              <Form.Check label={opts} value={opts} onChange={(e) => handleAvailability(e.currentTarget.value)} />
                                            ))}
                                          </Form.Group>
                                        )}
                                      </>
                                    ))}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                      Cancel
                                    </Button>
                                    <Button variant="secondary" onClick={handlePageBack}>
                                      Back
                                    </Button>
                                    <Button type="submit" disabled={availabilityDisabled} onClick={handlePageForward}>
                                      Next
                                    </Button>
                                  </Modal.Footer>
                                </>
                              )}
                            </>
                            <>
                              {question.fields.title === "Band Application: Fees" && (
                                <>
                                  <Modal.Body>
                                    {question.fields.referenceItems.map((q) => (
                                      <Form.Group className="mb-3">
                                        <>
                                          {q.fields.title === "First fee" && (
                                            <div>
                                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                                {q.fields.inputLabel} <span className="text-red">*</span>
                                              </label>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control
                                                  aria-label="Amount (to the nearest dollar)"
                                                  onChange={(e) => setFirstFee(Number(e.target.value))}
                                                  value={firstFee}
                                                />
                                              </InputGroup>
                                            </div>
                                          )}
                                        </>
                                        <>
                                          {q.fields.title === "Second fee" && (
                                            <div>
                                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                                {q.fields.inputLabel} <span className="text-red">*</span>
                                              </label>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control
                                                  aria-label="Amount (to the nearest dollar)"
                                                  value={secondFee}
                                                  onChange={(e) => setSecondFee(Number(e.currentTarget.value))}
                                                />
                                              </InputGroup>
                                            </div>
                                          )}
                                        </>
                                      </Form.Group>
                                    ))}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                      Cancel
                                    </Button>
                                    <Button variant="secondary" onClick={handlePageBack}>
                                      Back
                                    </Button>
                                    <Button type="submit" disabled={feesDisabled} onClick={handlePageForward}>
                                      Next
                                    </Button>
                                  </Modal.Footer>
                                </>
                              )}
                            </>
                            <>
                              {question.fields.title === "Band Application: Marketing" && (
                                <Form
                                  onSubmit={handleSubmit}
                                  // action="/image-upload"
                                  encType={"multipart/form-data"}
                                  className="container flex justify-content-center flex-col h-full"
                                >
                                  <Modal.Body>
                                    {question.fields.referenceItems.map((q) => (
                                      <>
                                        {q.fields.isInput && q.fields.inputType === "Large text area" && (
                                          <Form.Group className="mb-3 mt-3" controlId={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control
                                              as="textarea"
                                              rows={3}
                                              value={bio}
                                              placeholder="Band bio used for marketing..."
                                              onChange={(e) => setBio(e.target.value)}
                                              required
                                            />
                                          </Form.Group>
                                        )}
                                        {q.fields.isInput && q.fields.inputType === "url" && (
                                          <Form.Group md="6" controlId={q.fields.inputLabel}>
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              value={websiteUrl}
                                              placeholder="Link to your website, facebook etc"
                                              required
                                              onChange={(e) => setWebsiteUrl(e.target.value)}
                                            />
                                            {/* <Form.Control.Feedback type="invalid">Please provide a band website.</Form.Control.Feedback> */}
                                          </Form.Group>
                                        )}
                                        {q.fields.isInput && q.fields.inputType === "File upload" && (
                                          <Form.Group controlId="formFile" className="mb-3 mt-3">
                                            <Form.Label>
                                              {q.fields.inputLabel} <span className="text-red">*</span>
                                            </Form.Label>
                                            <Form.Control type="file" name="image" onChange={(e) => setUpload(e.target.files[0])} />

                                            {upload !== null && <Button onClick={handleImageUpload}>Upload</Button>}
                                            {setUploadedFileURL !== null && <img className="h-[120px]" src={uploadedFileURL} />}
                                          </Form.Group>
                                        )}
                                      </>
                                    ))}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                      Cancel
                                    </Button>
                                    <Button variant="secondary" onClick={handlePageBack}>
                                      Back
                                    </Button>
                                    {/* <Button type="submit" disabled={false} onClick={handleSubmit}>
                                      Submit
                                    </Button> */}
                                    <Button type="submit" variant="primary" disabled={marketingDisabled}>
                                      Submit
                                    </Button>
                                  </Modal.Footer>
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
export default BandApplicationModal;
