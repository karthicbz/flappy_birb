import RectBar from "./components/RectBar";
import "./App.css";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import Player from "./components/Player";
import ReplayScreen from "./components/ReplayScreen";
import StartScreen from "./components/StartScreen";

const PlayArea = styled.div`
  max-width: 500px;
  min-height: 800px;
  background-color: white;
  box-shadow: 1px 1px 8px 1px gray;
  position: relative;
  margin: 0 auto;
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
  const bottomGreenTubeOneRef = useRef();
  const bottomGreenTubeTwoRef = useRef();
  const scoreRef = useRef(0);
  const [replayDisplay, setReplayDisplay] = useState("none");
  const [tubeOneColor, setTubeOneColor] = useState("transparent");
  const [tubeTwoColor, setTubeTwoColor] = useState("transparent");
  const [startScreenDisplay, setStartScreenDisplay] = useState("flex");

  //this use effect will move green tubes, reset it position and make it wait for next move
  useEffect(() => {
    if (greenTubePosOne === 400) {
      setTubeOneColor("transparent");
      clearInterval(intervalIdOne);
      setGreenTubePosOne(-100);
      setGreenTubeOneHeight(randNumber());
    }

    if (greenTubePosTwo === 400) {
      setTubeTwoColor("transparent");
      clearInterval(intervalIdTwo);
      setGreenTubePosTwo(-100);
      setGreenTubeTwoHeight(randNumber());
    }

    if (greenTubePosOne === 250) {
      scoreRef.current += 1;
      startMovingTube(setGreenTubePosTwo, setIntervalIdTwo);
    }

    if (greenTubePosTwo === 250) {
      scoreRef.current += 1;
      startMovingTube(setGreenTubePosOne, setIntervalIdOne);
    }

    if (greenTubePosOne === 0) {
      setTubeOneColor("green");
    }

    if (greenTubePosTwo === 0) {
      setTubeTwoColor("green");
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
        setReplayDisplay("flex");
      }

      if (playerAltitude < bottomGreenTubeOneHeight) {
        console.log("smashed on bottom one");
        setGameStart(false);
        setReplayDisplay("flex");
      }
    }

    if (greenTubePosTwo >= 150 && greenTubePosTwo < 350) {
      const bottomGreenTubeTwoHeight =
        bottomGreenTubeTwoRef.current.style.height.replace("px", "");

      if (playerAltitude > 750 - greenTubeTwoHeight) {
        console.log("smashed on top two");
        setGameStart(false);
        setReplayDisplay("flex");
      }

      if (playerAltitude < bottomGreenTubeTwoHeight) {
        console.log("smashed on bottom two");
        setGameStart(false);
        setReplayDisplay("flex");
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
    }, 600);

    setIntervalId(interval);
  }

  function randNumber() {
    return Math.floor(Math.random() * 400);
  }

  function increasePlayerAltitude() {
    setPlayerAltitude((prevAltitude) => prevAltitude + 180);
  }

  function startGame() {
    setStartScreenDisplay("none");
    setGameStart(true);
    startMovingTube(setGreenTubePosOne, setIntervalIdOne);
  }

  function replayGame(e) {
    scoreRef.current = 0;
    setPlayerAltitude(400);
    setGreenTubePosOne(-100);
    setGreenTubePosTwo(-100);
    setReplayDisplay("none");
    setTubeOneColor("transparent");
    setTubeTwoColor("transparent");
    e.preventDefault();
    e.stopPropagation();
    startGame();
  }

  useEffect(() => {
    if (gameStart) {
      if (playerAltitude !== 0) {
        const interval = setInterval(() => {
          setPlayerAltitude((prevAltitude) => prevAltitude - 20);
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
        backgroundColor={tubeOneColor}
      />
      <RectBar
        height={greenTubeTwoHeight}
        right={greenTubePosTwo}
        top="0"
        backgroundColor={tubeTwoColor}
      />

      <RectBar
        height={500 - greenTubeOneHeight}
        right={greenTubePosOne}
        bottom="0"
        greenTubeRef={bottomGreenTubeOneRef}
        backgroundColor={tubeOneColor}
      />

      <RectBar
        height={500 - greenTubeTwoHeight}
        right={greenTubePosTwo}
        bottom="0"
        greenTubeRef={bottomGreenTubeTwoRef}
        backgroundColor={tubeTwoColor}
      />
      <Player bottom={playerAltitude} />
      <p
        className="score"
        style={{
          fontSize: "4rem",
          position: "absolute",
          top: 0,
          left: "calc((500px - 4rem) - 50%)",
          fontFamily: "'Press Start 2P', cursive",
        }}
      >
        {scoreRef.current}
      </p>
      {/* <button
        onClick={startGame}
        Start
      </button> */}
      <StartScreen displayValue={startScreenDisplay} startGame={startGame} />
      <ReplayScreen
        displayValue={replayDisplay}
        score={scoreRef.current}
        replayGame={replayGame}
      />
    </PlayArea>
  );
}

export default App;
