const ButtonSection = ({ text, link, title }) => {
  //Setup just to show the download schedule buttons
  //Need to fix for generic use

  return (
    <div className="flex flex-row align-middle justify-center p-8 gap-4">
      <a className="text-white" href="./uploads/2025-landscape.jpg" download>
        <button id="download-web" value="download" className="bg-ltBlue rounded-s">
          Download web schedule
        </button>
      </a>
      <a className="text-white" href="./uploads/2025-portrait.jpg" download>
        <button id="download-mob" value="download" className="bg-ltBlue rounded-s">
          Download mobile schedule
        </button>
      </a>
    </div>
  );
};

export default ButtonSection;
