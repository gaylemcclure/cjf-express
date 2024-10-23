import * as contentful from "contentful";
import { useState, useEffect } from "react";
import BannerHeader from "../components/pageSections/bannerHeader";
import ButtonSection from "../components/pageSections/buttonSection";
import PageHeadingSection from "../components/pageSections/pageHeadingSection";
import PageTextSection from "../components/pageSections/pageTextSection";
import SingleImageHeadlineSection from "../components/pageSections/singleImageHeadlineSection";
import SingleImageTextSection from "../components/pageSections/singleImageTextSection";
import SingleTextSection from "../components/pageSections/singleTextSection";
import AccordionComponent from "../components/accordion";
// import { SendContact } from "../applications/serverData";
import styled from "styled-components";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { CONTACT_CONFIRMATION } from "../utils/mutations";

const ContactPage = () => {
  const [pageData, setPageData] = useState([]);
  const currentPage = window.location.pathname.slice(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pages, setPages] = useState("start");
  const [sendContactConfirmation] = useMutation(CONTACT_CONFIRMATION);
  // const [sendExistingUserEmail] = useMutation(SEND_EXISTING_EMAIL);

  // //Sends email to an existing user - who can add the project to their space
  // const handleSendExistingEmail = async (userToken) => {
  //   try {
  //     const { data } = await sendExistingUserEmail({
  //       variables: {
  //         email: emailInput,
  //         senderEmail: userData.email,
  //         projectId: selectedProjectId,
  //         projectName: selectedProjectName,
  //         first: userData.first,
  //         last: userData.last,
  //         userToken: userToken,
  //       },
  //     });
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  //Sends email to an new user - who can sign up and see the project in their space
  const handleContactEmail = async () => {
    try {
      const { data } = await sendContactConfirmation({
        variables: {
          senderEmail: email,
          senderName: name,
          message: message,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // //Invite button - checks that both fields are populated, and queries if user is already registered
  // const handleInviteUser = async (e) => {
  //   if (emailInput === "") {
  //     setErrorText("error");
  //   } else if (selectedProjectId === "") {
  //     setErrorText("error");
  //   } else {
  //     setErrorText("hidden");
  //     const { data } = await usersEmail({ variables: { email: emailInput } });
  //     if (data.usersEmail.length === 0) {
  //       //Sends new email template and asks user to signup
  //       handleSendNewEmail();
  //     } else if (data.usersEmail.length === 1) {
  //       //Sends existing email template and asks user to login
  //       handleSendExistingEmail(data.usersEmail[0]._id);
  //     }
  //   }
  // };

  const client = contentful.createClient({
    space: "b10z0f9dnsdt",
    accessToken: "bYqdQnmfDAq3pW7IRc34GawRTXvvxSUcRiB6pUSpCTg",
  });
  useEffect(() => {
    try {
      client
        .getEntries({
          content_type: "generalPage",
          "fields.slug[match]": currentPage,
          include: 10,
        })
        .then((entry) => {
          setPageData(entry.items[0].fields.sections);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }, []);

  // const SendContactEmail = async () => {
  //   const NewButton = ({}) => {
  //     return <button></button>;
  //   };
  //   return (
  //     <main className="flex flex-col items-center justify-center gap-4">
  //       <form>
  //         <NewButton formAction={SendContact(name, email, text)} />
  //       </form>
  //     </main>
  //   );
  // };

  const submitForm = () => {
    handleContactEmail();
    setPages("submit");
  };

  return (
    <>
      <div className="w-screen p-8 md:pl-40 md:pr-40">
        <h1 className="mb-16 text-center uppercase text-5xl pt-8">Contact Us</h1>
        <div className="flex flex-col md:flex-row">
          <div className="left w-full md:w-1/2">
            <div className=" w-full border-black border-2 md:w-3/4 rounded-md p-4 mb-8 shadow-[5px_5px_9px_-2px_rgba(0,0,0,0.3)]">
              <h2 className="uppercase">Email Us</h2>
              <p>info@castlemainejazzfestival.com.au</p>
            </div>
            <div className=" w-full border-black border-2 md:w-3/4 rounded-md p-4 mb-8 shadow-[5px_5px_9px_-2px_rgba(0,0,0,0.3)]">
              <h2 className="uppercase">Send us mail</h2>
              <p className="mb-0">PO Box 179</p>
              <p>Chewton, VIC, 3451</p>
            </div>
            <div className=" w-full border-black border-2 md:w-3/4 rounded-md p-4 mb-8 shadow-[5px_5px_9px_-2px_rgba(0,0,0,0.3)]">
              <h2 className="uppercase">See our socials</h2>
              <div className="flex space-x-8 pt-4">
                <a
                  className="text-black text-4xl hover:text-yellow transform hover:scale-150 
                  transition-all duration-150 ease-in-out "
                  href="https://www.facebook.com/castlemainejazzfestival/"
                  target="_blank"
                >
                  <FaFacebook className={``} />
                </a>
                <a
                  className="text-black text-4xl hover:text-yellow transform hover:scale-150
                   transition-all duration-150 ease-in-out"
                  href="https://www.instagram.com/castlemainejazzfestival/?hl=en"
                  target="_blank"
                >
                  <FaInstagram className="" />
                </a>
              </div>
            </div>
            <div className=" w-full border-black border-2 md:w-3/4 rounded-md p-4 mb-8 shadow-[5px_5px_9px_-2px_rgba(0,0,0,0.3)]">
              <h2 className="uppercase">Our Info</h2>
              <p className="mb-0">Castlemaine Jazz Festival Incorporated</p>
              <p>A006 009 1D - Association registration</p>
            </div>
          </div>
          <div className="right w-full md:w-1/2 flex justify-center bg-yellow  rounded-md p-4 mb-8 shadow-[5px_5px_9px_-2px_rgba(0,0,0,0.3)]">
            {pages === "start" && (
              <form className="flex flex-col ml-4 mr-4 md:w-3/4">
                <h2 className="uppercase mb-8">Contact our committee</h2>
                <ContactInput placeholder="Name" onChange={(e) => setName(e.target.value)} required></ContactInput>
                <ContactInput placeholder="Email" onChange={(e) => setEmail(e.target.value)} required></ContactInput>
                <ContactText placeholder="Message" onChange={(e) => setMessage(e.target.value)} required></ContactText>

                {/* <Button
                    onClick={handleInviteUser}
                    sx={{ backgroundColor: "var(--main-green)", marginTop: "1rem",padding: "0 2rem", marginLeft: '0.5rem' }}
                    className="signup-button"
                    id="signup-button"
                    type="submit"
                  >
                    Invite
                  </Button> */}
                <button className="h-[3rem] bg-black font-extrabold uppercase text-white rounded-md" type="submit" onClick={submitForm}>
                  Submit
                </button>
              </form>
            )}
            {pages === "submit" && (
              <div className="flex flex-col items-center">
                <h2 className="uppercase mb-8">Contact our committee</h2>
                <h3 className="pt-4 pl-12 pr-12 font-light">Thank you for submitting your message. We will be in touch soon. </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  //   return (
  //     <>
  //       {pageData && (
  //         <>
  //           {pageData.map((section, i) => {
  //             if (section.sys.contentType.sys.id === "bannerHeading") {
  //               return (
  //                 <BannerHeader
  //                   url={section.fields.bannerImage.fields.file.url}
  //                   filename={section.fields.bannerImage.fields.file.filename}
  //                   headingText={section.fields.headingText}
  //                   key={i}
  //                 />
  //               );
  //             }
  //             if (section.sys.contentType.sys.id === "buttonSection") {
  //               return <ButtonSection key={i} />;
  //             }
  //             if (section.sys.contentType.sys.id === "pageHeadingSection") {
  //               return <PageHeadingSection heading={section.fields.heading} subtitle={section.fields.subtitle} key={i} />;
  //             }
  //             if (section.sys.contentType.sys.id === "pageTextSection") {
  //               return (
  //                 <PageTextSection
  //                   heading={section.fields.heading}
  //                   subtitle={section.fields.subtitle}
  //                   textId={section.sys.id}
  //                   buttonText={section.fields.buttonText}
  //                   buttonLink={section.fields.buttonLink}
  //                   showCtaButton={section.fields.showCtaButton}
  //                 />
  //               );
  //             }
  //             /*Headline image section */
  //             if (section.sys.contentType.sys.id === "singleImageTextSection") {
  //               return <SingleImageHeadlineSection key={i} />;
  //             }
  //             /*Text image section */
  //             if (section.sys.contentType.sys.id === "singleImageTextSections") {
  //               return (
  //                 <SingleImageTextSection
  //                   key={i}
  //                   url={section.fields.image.fields.file.url}
  //                   filename={section.fields.image.fields.file.filename}
  //                   heading={section.fields.headingText}
  //                   textId={section.sys.id}
  //                   buttonText={section.fields.buttonText}
  //                   buttonLink={section.fields.buttonLink}
  //                 />
  //               );
  //             }
  //             if (section.sys.contentType.sys.id === "singleTextSection") {
  //               return (
  //                 <div className="ml-auto mr-auto max-w-screenMax">
  //                   <SingleTextSection textId={section.sys.id} key={i} />
  //                 </div>
  //               );
  //             }
  //           })}
  //         </>
  //       )}
  //     </>
  //   );
};

const ContactWrapper = styled.div``;
const ContactInput = styled.input`
  height: 40px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
  padding-left: 0.5rem;
  &&::placeholder {
    color: #000000;
  }
  &&::focus-visible {
    border: none;
  }
`;

const ContactText = styled.textarea`
  border-radius: 8px;
  margin-bottom: 1.5rem;
  min-height: 400px;
  padding: 0.5rem;
  box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
  &&::placeholder {
    color: #000000;
  }
`;
export default ContactPage;
