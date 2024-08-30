const PageHeadingSection = ({ heading, subtitle }) => {
  return (
    <div className="band-wrapper flex flex-col justify-center content-center max-w-screenMax ml-auto mr-auto">
      <h2 className="mt-8 mb-8 text-6xl font-extrabold leading-none tracking-tight text-black flex justify-center uppercase">
        {heading}
      </h2>
      <h3 className={` justify-center flex text-4xl`}>{subtitle}</h3>
    </div>
  );
};

export default PageHeadingSection;
