import styled from "styled-components";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const IndividualBandPage = () => {
  const [schedule, setSchedule] = useState();
  const location = useLocation();
  const band = location.state.bandData;
  const [bio, setBio] = useState();

  useEffect(() => {
    const splitBio = band.Bio.split("/n");
    setBio(splitBio);
  }, [band]);

  useEffect(() => {
    const sortScheduleArray = () => {
      const scheduleArr = [];
      //Separate the text into date, venue & time
      const textArr = band.Schedule_Text;
      const sch = textArr.forEach((t) => {
        const dayArray = t.split(": ");
        const timeArray = dayArray[1].split("- ");
        //Add an index for sorting
        let dayindex;
        if (dayArray[0] === "Thursday") {
          dayindex = 0;
        } else if (dayArray[0] === "Friday") {
          dayindex = 1;
        } else if (dayArray[0] === "Saturday") {
          dayindex = 2;
        } else if (dayArray[0] === "Sunday") {
          dayindex = 3;
        } else if (dayArray[0] === "Monday") {
          dayindex = 4;
        }
        scheduleArr.push({ date: dayArray[0], venue: timeArray[0], time: timeArray[1], dayIndex: dayindex });
      });
      //Sort the array
      const sortSch = scheduleArr.sort((first, second) => first.dayIndex - second.dayIndex);
      setSchedule(sortSch);
    };

    sortScheduleArray();
  }, [band]);

  const getScheduleTimes = (time) => {
    return (
      <h2 className="text-xl">
        {time.date} | {time.venue} | {time.time}
      </h2>
    );
  };

  return (
    <PageWrapper>
      <h1 className="flex justify-center mb-4">{band["Band Name"]}</h1>
      {schedule?.map((sc) => {
        return getScheduleTimes(sc);
      })}
      <BandImg className="band-imgs mt-4 mb-4" src={band.Image_Link} />
      <div className="flex flex-row gap-8 contents-center items-center">
        <h4 className="mb-0">Jazz Style: {band.Jazz_Style}</h4>
        <a href={band["Music Link"]} target="_blank" className="no-underline">
          <button className="bg-yellowAlt text-black rounded flex gap-2 no-underline items-center">
            Listen <FaPlay />
          </button>
        </a>
      </div>
      <div>{bio && bio.map((b) => <p className="mt-8 max-w-[800px]">{b}</p>)}</div>
      <a href="https://castlemainejazzfestival.com.au/band" className="flex flex-row no-underline">
        <button className="flex flex-row items-center gap-1 text-black bg-yellowAlt mt-4">
          <FaAngleLeft /> Bands
        </button>
      </a>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  margin: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 500px) {
    margin: 4rem 4rem;
  }
  @media screen and (min-width: 900px) {
    margin: 4rem 8rem;
  }
`;

const BandImg = styled.img`
  max-height: 500px;
  max-width: 100vw;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

export default IndividualBandPage;
