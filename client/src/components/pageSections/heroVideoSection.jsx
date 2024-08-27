
const HeroVideoSection = ({ url }) => {

  return (
    <>
    {url && (
      
        <video
    id="my-video"
    className="video-js w-screen"
    muted
    autoPlay 
    preload="auto"
    data-setup="{}"
  >
    <source src={url} type="video/mp4" />
    <p className="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a>
    </p>
  </video>
  
)}
    </>

  )
};

export default HeroVideoSection;