import React, { useState } from "react";
import styled from "styled-components";
import SaveScoreModal from "./SaveScoreModal";
import Leaderboard from "./Leaderboard";

export const Button = styled.button`
  padding: 8px;
  border: 3px solid orange;
  width: 150px;
  font-family: "Press Start 2P", cursive;
  font-size: 0.6rem;
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ReplayScreen = ({ displayValue, score, replayGame }) => {
  const [saveScreenMode, setSaveScreenMode] = useState("none");
  const [saveScoreButton, setSaveScoreButton] = useState("block");
  const [leaderboardMode, setLeaderboardMode] = useState("none");

  function hideSaveScoreButton() {
    setSaveScoreButton("none");
  }
  function hideSaveScreen() {
    setSaveScreenMode("none");
  }
  function hideLeaderboard() {
    setLeaderboardMode("none");
  }
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "palevioletred",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: displayValue,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <FlexDiv>
        <p
          style={{ fontSize: "4rem", fontFamily: "'Press Start 2P', cursive" }}
        >
          {score}
        </p>
        <Button
          onClick={() => setSaveScreenMode("block")}
          style={{ display: saveScoreButton }}
        >
          Save Score
        </Button>
        <Button onClick={() => setLeaderboardMode("block")}>Leaderboard</Button>
        <Button onClick={replayGame}>Replay</Button>
      </FlexDiv>
      <SaveScoreModal
        displayValue={saveScreenMode}
        hideSaveScreen={hideSaveScreen}
        score={score}
        hideSaveScoreButton={hideSaveScoreButton}
      />
      <Leaderboard
        displayValue={leaderboardMode}
        leaderboardStatus={leaderboardMode}
        hideLeaderboard={hideLeaderboard}
      />
    </div>
  );
};

export default ReplayScreen;
