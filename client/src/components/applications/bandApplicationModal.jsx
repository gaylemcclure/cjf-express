import { useState, useEffect } from "react";
import axios from "axios";
// import { Modal as BaseModal, FormControlLabel } from "@mui/material";
import clsx from "clsx";
import { styled, css } from "@mui/system";
// import { getBands } from "../api/airtable/bandTable/index";
// import { pagesArr } from "../data/questionPages";
// import { SendWelcome } from "./serverData";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import Switch from "@mui/joy/Switch";
// import Modal from "@mui/joy/Modal";
// import ModalClose from "@mui/joy/ModalClose";
// import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
// import ModalOverflow from "@mui/joy/ModalOverflow";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import { quatrocento } from "@/app/fonts";
import { ClickButton, SmallButton, SmallBackButton } from "../buttons";
// import styles from "@/styles/modalApplication.module.css";
// import * as Input from "@/app/components/inputs";
// import * as AppQ from "@/app/components/modalQuestion";
// import Image from "next/image";
// import checkIcon from "@/public/tick-icon.png";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// function Example() {
// const [show, setShow] = useState(false);

// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);

//   return (
//     <>
// <Button variant="primary" onClick={handleShow}>
//   Launch demo modal
// </Button>

// <Modal show={show} onHide={handleClose}>
//   <Modal.Header closeButton>
//     <Modal.Title>Modal heading</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={handleClose}>
//       Close
//     </Button>
//     <Button variant="primary" onClick={handleClose}>
//       Save Changes
//     </Button>
//   </Modal.Footer>
// </Modal>
//     </>
//   );
// }

// export default Example;

const BandApplicationModal = () => {
  const [open, setOpen] = useState(true);
  const [pages, setPages] = useState("start");
  //Button disabled bools
  const [contactDisabled, setContactDisabled] = useState(true);
  const [datesDisabled, setdatesDisabled] = useState(true);
  const [availabilityDisabled, setavailabilityDisabled] = useState(true);
  const [feesDisabled, setfeesDisabled] = useState(true);
  const [scheduleDisabled, setscheduleDisabled] = useState(true);
  //Verification bools
  const [playedBefore, setPlayedBefore] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [inputId, setInputId] = useState();
  const [verified, setVerified] = useState(false);
  //Band data
  const [allBandData, setAllBandData] = useState();
  const [bandName, setBandName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState();
  const [bandId, setBandId] = useState();
  const [bandStyle, setBandStyle] = useState();
  const [availability, setAvailability] = useState();
  const [websiteUrl, setWebsiteUrl] = useState();
  const [leaderInstrument, setLeaderInstrument] = useState();
  const [musicians, setMusicians] = useState();
  const [bio, setBio] = useState();
  const [firstFee, setFirstFee] = useState();
  const [secondFee, setSecondFee] = useState();
  const [numberMembers, setNumberMembers] = useState();
  const [upload, setUpload] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/page/band-application-questions");
        const data = res;
        console.log(data);
        setQuestionData(data.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  console.log(questionData);

  let bandInputData;

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handlePage = () => {
    pagesArr.map((page) => {
      if (page.current === pages) {
        setPages(page.next);
      }
    });
  };

  const handlePageBack = () => {
    pagesArr.map((page) => {
      if (page.current === pages) {
        setPages(page.previous);
      }
    });
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

  // const retrieveBandData = async () => {
  //   bandInputData = await getBands(bandName);
  //   if (bandInputData) {
  //     setBandId(bandInputData[0].id);
  //     setAllBandData(bandInputData[0].fields);
  //     setDataRetrieved(true);
  //     // TestSend();
  //   }
  // };

  const setContactButton = () => {
    setContactDisabled(false);
  };
  const setDateButton = () => {
    setdatesDisabled(false);
  };
  const setAvailabilityButton = () => {
    setavailabilityDisabled(false);
  };
  const setFeesButton = () => {
    setfeesDisabled(false);
  };

  const setScheduleButton = () => {
    setscheduleDisabled(false);
  };

  const updateBandData = () => {
    if (bandId === inputId) {
      setVerified(true);
    }
    setPlayedBefore(false);
    setDataRetrieved(false);
  };

  return (
    <div>
      {/* <div className="button-container pb-8">
        <ClickButton click={handleOpen} text="Apply Now" />
      </div> */}

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        // slots={{ backdrop: StyledBackdrop}}
      > */}
      {/* <ModalOverflow>
          <ModalDialog sx={{ width: 800 }}>
            {pages === "start" && (
              <>
                <AppQ.FirstQuestion
                  title="Band Application:"
                  subtitle="Castlemaine Jazz Festival"
                  year="2024"
                  text="Please read and accept all the guidelines in the form before submitting your application. Only one application is required per band, to be completed by the Band Leader. This application registers your interest in playing at the Castlemaine Jazz Festival and does not guarantee any performances."
                  click={handlePage}
                />
                <button onClick={() => setPages("questions")}>
                  Skip Question Hack
                </button>
              </>
            )}
            {pages === "contact" && (
              <AppQ.Questions
                title="Terms & Conditions"
                text="Please complete all form fields in full. Correct contact details are important to ensure that any festival matters can be dealt with promptly. Please ensure you provide full names and instruments for all band members."
                check={() => setContactButton()}
                label="I agree to provide correct details for all band members"
                back={handlePageBack}
                forward={handlePage}
                disabled={contactDisabled}
              />
            )}
            {pages === "dates" && (
              <AppQ.Questions
                title="Festival Dates & Performance Times"
                text="The festival will run from Friday 7th June to Sunday 9th June 2024. The target of the Festival Committee is to allocate two performance slots to each band in consultation with the band. The Committee reserves the right to allocate band performance times and locations according to venue and time limitations."
                check={() => setDateButton()}
                label="I agree to the dates and performance allocations"
                back={handlePageBack}
                forward={handlePage}
                disabled={datesDisabled}
              />
            )}
            {pages === "availability" && (
              <AppQ.Questions
                title="Availability"
                text="The information on your band's availability is necessary to ensure that scheduling conflicts do notoccur. It is proposed that each band will play up to two performances of 60 minutes each."
                check={() => setAvailabilityButton()}
                label="I agree to provide my correct availability"
                back={handlePageBack}
                forward={handlePage}
                disabled={availabilityDisabled}
              />
            )}
            {pages === "fees" && (
              <AppQ.Questions
                title="Fees"
                text="Please nominate a fee you wish to be paid for a single one-hour performance and a fee for a secondone-hour performance at the festival. While we have a very restricted budget we will include as manybands as possible. However not all applications can be accepted."
                check={() => setFeesButton()}
                label="I agree to the dates and performance allocations"
                back={handlePageBack}
                forward={handlePage}
                disabled={feesDisabled}
              />
            )}
            {pages === "scheduling" && (
              <AppQ.Questions
                title="Scheduling"
                text="We will let you know if your application has been successful before 31st January 2024. Band Leaders
                        should take note that no musician can apply to perform in more than three bands. We acknowledge that
                        changes are inevitable; and if there is any variation in the band's line-up and/or band availability,
                        the Band Leader should advise the Committee as soon as possible. If for any reason you are unable to
                        attend your session, please notify the Committee as soon as possible. Any request to change performance
                        times within 60 days of the festival may be refused due to print and programming requirements.."
                check={() => setScheduleButton()}
                label="I agree to the dates and performance allocations"
                back={handlePageBack}
                forward={handlePage}
                disabled={scheduleDisabled}
              />
            )}
            {pages === "questions" && (
              <>
                <h1 className="justify-center flex uppercase text-black text-4xl font-extrabold pb-8">
                  Band Details
                </h1>

                <Input.TextInput
                  label="Band Name"
                  id="band-name"
                  txtname="band-name"
                  change={(e) => setBandName(e.target.value)}
                />

                <Input.EmailInput
                  label="Band Leader Email"
                  id="band-email"
                  emlname="band-email"
                  change={(e) => setLeaderEmail(e.target.value)}
                />
                <div>
                  <div className="flex">
                    <p className="mr-4 block text-sm font-medium leading-6 text-gray-900">
                      Have you applied for a previous festival ?{" "}
                    </p>
                    <div className={`${styles.help_tip}`}>
                      <p className="">
                        If you have applied previously, we may be able to
                        retrieve saved information to help complete your
                        application.
                      </p>
                    </div>
                  </div>
                  <FormControlLabel
                    label=""
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={playedBefore}
                        onChange={() => setPlayedBefore(!playedBefore)}
                      />
                    }
                  />
                </div>

                {playedBefore === true && (
                  <>
                    <div className="flex ">
                      <div className="mr-4">
                        Retrieve previous application data?
                      </div>
                      <div className={`${styles.help_tip}`}>
                        <p>
                          Please check your email address is correct, and we
                          will send you a code via email to retrieve your
                          details.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={retrieveBandData}
                        className={`${styles.select_btn} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                      >
                        YES
                      </button>
                      <button
                        type="button"
                        // onClick={}
                        className={`${styles.select_btn} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                      >
                        NO
                      </button>
                    </div>
                  </>
                )}
                {dataRetrieved === true && (
                  <>
                    <p>
                      If the Band Name, Band Leader Name and Band Leader Email
                      match an application in the system, an email has been sent
                      to your selected email address with a code. Input the code
                      in the Band Id field and click retrieve to auto populate
                      your application. You can update the information provided
                      and this will be saved for your new application
                    </p>
                    <Input.TextInput
                      label="Band Leader Name"
                      id="band-leader"
                      txtname="band-leader"
                      change={(e) => setLeaderName(e.target.value)}
                    />
                    <Input.TextInput
                      label="Band Id"
                      id="band-id"
                      txtname="band-id"
                      change={(e) => setInputId(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={updateBandData}
                      className={`${styles.select_btn} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                    >
                      Retrieve application data
                    </button>
                  </>
                )}
                {verified === true && (
                  <>
                    <Input.ValueTextInput
                      label="Band Leader Phone"
                      id="band-phone"
                      txtname="band-phone"
                      change={(e) => setLeaderPhone(e.target.value)}
                      value={allBandData.Band_Leader_Phone}
                    />
                    <Input.ValueTextInput
                      label="Band Style"
                      id="band-style"
                      txtname="band-style"
                      change={(e) => setBandStyle(e.target.value)}
                      value={allBandData.Jazz_Style}
                    />
                    <Input.ValueTextInput
                      label="Band Leader Instrument"
                      id="band-instrument"
                      txtname="band-instrument"
                      change={(e) => setLeaderInstrument(e.target.value)}
                      value={allBandData.Band_Leader_Instrument}
                    />
                    <Input.ValueTextInput
                      label="Availability **TO FILL OUT"
                      id="band-availability"
                      txtname="band-availability"
                      change={(e) => setAvailability(e.target.value)}
                      value=""
                    />
                    <Input.ValueTextInput
                      label="Band Website"
                      id="band-url"
                      txtname="band-url"
                      change={(e) => setWebsiteUrl(e.target.value)}
                      value={allBandData.Band_Website}
                    />
                    <Input.ValueTextInput
                      label="Musicians **SORT OUT MULTI SELECT"
                      id="musicians"
                      txtname="musicians"
                      change={(e) => setMusicians(e.target.value)}
                      value=""
                    />
                    <Input.ValueTextInput
                      label="Band Bio"
                      id="band-bio"
                      txtname="band-bio"
                      change={(e) => setInputId(e.target.value)}
                      value={allBandData.Other_Info}
                    />
                    <Input.ValueTextInput
                      label="First Fee **TO FILL OUT"
                      id="first-fee"
                      txtname="first-fee"
                      change={(e) => setFirstFee(e.target.value)}
                      value=""
                    />
                    <Input.ValueTextInput
                      label="Second Fee **TO FILL OUT"
                      id="second-fee"
                      txtname="second-fee"
                      change={(e) => setSecondFee(e.target.value)}
                      value=""
                    />
                    <Input.ValueTextInput
                      label="Band Image (to be used for marketing purposes) **FIGURE OUT IMAGES"
                      id="band-img"
                      txtname="band-img"
                      change={(e) => setUpload(e.target.value)}
                      value=""
                    />
                  </>
                )}
              </>
            )}
            {pages === "submit" && (
              <p>Thank you for submitting your volunteer application.</p>
            )}
          </ModalDialog>
        </ModalOverflow> */}
      {/* </Modal> */}
    </div>
  );
};

export default BandApplicationModal;

// const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
//   const { open, className, ...other } = props;
//   return <div className={clsx({ "base-Backdrop-open": open }, className)} ref={ref} {...other} />;
// });

// const Modal = styled(BaseModal)`
//   position: fixed;
//   z-index: 1300;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StyledBackdrop = styled(Backdrop)`
//   z-index: -1;
//   position: fixed;
//   inset: 0;
//   background-color: rgb(0 0 0 / 0.7);
//   -webkit-tap-highlight-color: transparent;
// `;

// const ModalContent = styled("div")(
//   ({ theme }) => css`
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     overflow: hidden;
//     background-color: ${theme.palette.mode === "dark" ? "#1C2025" : "#fff"};
//     border-radius: 8px;
//     border: 1px solid ${theme.palette.mode === "dark" ? "#434D5B" : "#DAE2ED"};
//     box-shadow: 0 4px 12px ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
//     padding: 24px;
//   `
// );
