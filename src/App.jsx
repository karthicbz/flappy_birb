import RectBar from "./components/RectBar";
import "./App.css";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import Player from "./components/Player";

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
  const [playerAltitude, setPlayerAltitude] = useState(400);
  const [gameStart, setGameStart] = useState(false);
  const topGreenTubeOneRef = useRef();
  const topGreenTubeTwoRef = useRef();
  const bottomGreenTubeOneRef = useRef();
  const bottomGreenTubeTwoRef = useRef();

  //this use effect will move green tubes, reset it position and make it wait for next move
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

  //this use effect check whether any crash happened
  useEffect(() => {
    if (greenTubePosOne >= 150 && greenTubePosOne < 350) {
      const bottomGreenTubeOneHeight =
        bottomGreenTubeOneRef.current.style.height.replace("px", "");

      if (playerAltitude > 750 - greenTubeOneHeight) {
        console.log("smashed on top one");
        setGameStart(false);
      }

      if (playerAltitude < bottomGreenTubeOneHeight) {
        console.log("smashed on bottom one");
        setGameStart(false);
      }
    }

    if (greenTubePosTwo >= 150 && greenTubePosTwo < 350) {
      const bottomGreenTubeTwoHeight =
        bottomGreenTubeTwoRef.current.style.height.replace("px", "");

      if (playerAltitude > 750 - greenTubeTwoHeight) {
        console.log("smashed on top two");
        setGameStart(false);
      }

      if (playerAltitude < bottomGreenTubeTwoHeight) {
        console.log("smashed on bottom two");
        setGameStart(false);
      }
    }
  }, [playerAltitude]);

  //this useEffect stop moving greentubes when player smashed into greentubes
  useEffect(() => {
    if (gameStart === false) {
      clearInterval(intervalIdOne);
      clearInterval(intervalIdTwo);
    }
  }, [gameStart]);

  function startMovingTube(setGreenTubePos, setIntervalId) {
    const interval = setInterval(() => {
      setGreenTubePos((prevPos) => prevPos + 50);
    }, 1000);

    setIntervalId(interval);
  }

  function randNumber() {
    return Math.floor(Math.random() * 400);
  }

  function increasePlayerAltitude() {
    setPlayerAltitude((prevAltitude) => prevAltitude + 180);
  }

  function startGame() {
    setGameStart(true);
    startMovingTube(setGreenTubePosOne, setIntervalIdOne);
  }

  useEffect(() => {
    if (gameStart) {
      if (playerAltitude !== 0) {
        const interval = setInterval(() => {
          setPlayerAltitude((prevAltitude) => prevAltitude - 10);
        }, 50);

        return () => clearInterval(interval);
      }
    }
  }, [playerAltitude]);

  return (
    <PlayArea className="canvas" onClick={increasePlayerAltitude}>
      <RectBar
        height={greenTubeOneHeight}
        right={greenTubePosOne}
        top="0"
        greenTubeRef={topGreenTubeOneRef}
      />
      <RectBar
        height={greenTubeTwoHeight}
        right={greenTubePosTwo}
        top="0"
        greenTubeRef={topGreenTubeTwoRef}
      />

      <RectBar
        height={500 - greenTubeOneHeight}
        right={greenTubePosOne}
        bottom="0"
        greenTubeRef={bottomGreenTubeOneRef}
      />

      <RectBar
        height={500 - greenTubeTwoHeight}
        right={greenTubePosTwo}
        bottom="0"
        greenTubeRef={bottomGreenTubeTwoRef}
      />
      <Player bottom={playerAltitude} />
      <button onClick={startGame}>Start</button>
    </PlayArea>
  );
}

export default App;
