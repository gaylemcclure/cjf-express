import { FaInstagram, FaFacebook } from "react-icons/fa";
import styled from "styled-components";
import { useHeaderContext } from '../utils/headerContext';

const Footer = () => {
  const { footer } = useHeaderContext();

  const year = new Date().getFullYear();


  return (
    <FooterSection>
    <div className="browser relative">
      <div className="absolute top-0 left-0 w-[100%] overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="relative block h-[600px] fill-white"
          ></path>
        </svg>
        <div className="grid_parent">
          <div className="flex flex-col mt-3">
            <p>{footer.acknowledgementText}</p>
          </div>

            <div className="flex flex-row align-center w-full">
              <div className="flex flex-col w-full">
                <label className="mail_label">{footer.signupText}</label>
                <div className="flex flex-row w-full">
                  <input type="email" placeholder="Email address" className="mail_input w-9/12"/>
                  <button type="submit" className="mail_button font-extrabold w-3/12">
                    {footer.signupButton}
                  </button>
                </div>
              </div>
            </div>
          
          <div className="mb-4 md:mb-0">
            <h2 className="text-[22px] font-semibold py-2 uppercase">{footer.contactHeading}</h2>
            <p className="text-[16px] my-4">Email: {footer.emailText}</p>
            <p className="text-[16px] my-4">Phone: {footer.phoneText} </p>
            <div className="flex space-x-4">
              <a
                className="text-black hover:text-yellow-500 transform hover:scale-150 
                    transition-all duration-150 ease-in-out "
                href="https://www.facebook.com/castlemainejazzfestival/"
                target="_blank"
              >
                <FaFacebook className="social_icon"/>
              </a>
              <a
                className="text-black hover:text-yellow-500 transform hover:scale-150
                     transition-all duration-150 ease-in-out"
                href="https://www.instagram.com/castlemainejazzfestival/?hl=en"
                target="_blank"
              >
                <FaInstagram className="social_icon"/>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col content-center align-center mb-4">
            <p className="flex self-center text-sm">© Castlemaine Jazz Festival {year}.</p>
            <p className="flex self-center text-sm">{footer.abnText}</p>
            </div>
      </div>
    </div>


    {/* Mobile footer - TBD redo above with media query & absolute position */}
    <div className="mobile relative">
    <div className="absolute top-0 left-0 w-[100%] overflow-hidden">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
              250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
              3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="relative block h-[600px] fill-white"
        ></path>
      </svg>
      <div className={` `}>

      <div className={`flex flex-row align-center w-full`}>
            <div className={` flex flex-col w-full`}>
              <label >{footer.signupText}</label>
              <div className="flex flex-row w-full">
                <input type="email" className={` w-9/12`} />
                <button type="submit" className={`font-extrabold bg-yellow w-3/12`}>
                  {footer.signupButton}
                </button>
              </div>
            </div>
          </div>


          <div className="flex justify-center mb-4 mt-8 md:mb-0 md:mt-0">
          {/* <h2 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">Contact</h2>
          <p className="text-[16px] my-4">Email: info@castlemainejazzfestival.com.au</p>
          <p className="text-[16px] my-4">Phone: +61 407309753 </p> */}
          <div className="flex space-x-8">
            <a
              className="text-white hover:text-yellow-500 transform hover:scale-150 
                  transition-all duration-150 ease-in-out "
              href="https://www.facebook.com/castlemainejazzfestival/"
              target="_blank"
            >
              <FaFacebook className={``}/>
            </a>
            <a
              className="text-white hover:text-pink-500 transform hover:scale-150
                   transition-all duration-150 ease-in-out"
              href="https://www.instagram.com/castlemainejazzfestival/?hl=en"
              target="_blank"
            >
              <FaInstagram  className={``}/>
            </a>
          </div>
        </div>


        <div className="flex flex-col mt-3">
          <p className="text-center text-sm">
{footer.acknowledgementText}
          </p>
        </div>

        

      </div>
      <div className="mt-8 flex flex-col content-center align-center mb-4">
          <p className="flex self-center text-sm">© Castlemaine Jazz Festival {year}.</p>
          <p className="flex self-center text-sm">{footer.abnText}</p>
          </div>
    </div>
  </div>
</FooterSection>
  );
};

const FooterSection = styled.footer`
.logo {
  width: 125px;
  z-index: 3;
  border-radius: 8px;
}

.icon_wrapper {
  display: flex;
  flex-direction: row;
  z-index: 3;
  margin: 0 13rem;
}

.left_footer {
  position: relative;
  bottom: 15rem;
}
.mail_label {
  font-size: 32px;
  font-weight: 700;
}

.mail_input {
  border-radius: 24px;
  background-color: #d9d9d9;
  height: 50px;
}

.mail_button {
  height: 50px;
  border-radius: 24px;
  background-color: var(--yellow);
}

.footer_text {
  display: flex;
  flex-direction: row;
  margin-left: 13rem;
}

.grid_parent {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 5rem;
  grid-row-gap: 0px;
  margin: 0 6rem 3rem;
}

.social_icon {
  height: 2rem;
  width: 2rem;
}
input::placeholder {
  padding-left: 1rem;
}
@media screen and (max-width: 900px) {
  .grid_parent {
    display: flex;
    flex-direction: column;
    margin: 0 2rem 3rem;
  }
  .browser {
    display: none;
  }
  .mail_label {
    font-size: 21px;
    font-weight: 700;
    padding: 1rem 0;
  }
  .mail_input {
    height: 40px;
  }
  .mail_button {
    height: 40px;
  }
  
}

@media screen and (min-width: 901px) {
  .mobile {
    display: none;
  }
}
`

export default Footer;
