import RectBar from "./components/RectBar";
import "./App.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

const PlayArea = styled.div`
  max-width: 500px;
  min-height: 800px;
  background-color: white;
  box-shadow: 1px 1px 8px 1px gray;
  position: relative;
`;

function App() {
  const [greenTubePosOne, setGreenTubePosOne] = useState(-100);
  const [greenTubePosTwo, setGreenTubePosTwo] = useState(-100);
  const [intervalIdOne, setIntervalIdOne] = useState(null);
  const [intervalIdTwo, setIntervalIdTwo] = useState(null);
  const [greenTubeOneHeight, setGreenTubeOneHeight] = useState(randNumber());
  const [greenTubeTwoHeight, setGreenTubeTwoHeight] = useState(randNumber());

  useEffect(() => {
    if (greenTubePosOne === 500) {
      clearInterval(intervalIdOne);
      setGreenTubePosOne(-100);
      setGreenTubeOneHeight(randNumber());
    }

    if (greenTubePosTwo === 500) {
      clearInterval(intervalIdTwo);
      setGreenTubePosTwo(-100);
      setGreenTubeTwoHeight(randNumber());
    }

    if (greenTubePosOne === 250) {
      startMovingTube(setGreenTubePosTwo, setIntervalIdTwo);
    }

    if (greenTubePosTwo === 250) {
      startMovingTube(setGreenTubePosOne, setIntervalIdOne);
    }
  }, [greenTubePosOne, greenTubePosTwo]);

  function startMovingTube(setGreenTubePos, setIntervalId) {
    const interval = setInterval(() => {
      setGreenTubePos((prevPos) => prevPos + 50);
    }, 1000);

    setIntervalId(interval);
  }

  function randNumber() {
    return Math.floor(Math.random() * 400);
  }

  return (
    <PlayArea
      className="canvas"
      onClick={() => startMovingTube(setGreenTubePosOne, setIntervalIdOne)}
    >
      <RectBar height={greenTubeOneHeight} right={greenTubePosOne} />
      <RectBar height={greenTubeTwoHeight} right={greenTubePosTwo} />
    </PlayArea>
  );
}

export default App;
