import React, { useEffect, useState } from "react";
import { Button, FlexDiv } from "./ReplayScreen";
import { Div } from "./SaveScoreModal";
import styled from "styled-components";

const TR = styled.tr`
  border: 1px solid black;
`;

const TD = styled.td`
  padding: 4px;
  border: 1px solid black;
`;

const TH = styled.th`
  padding: 4px;
  border: 1px solid black;
  text-align: center;
`;

const Leaderboard = ({ displayValue, leaderboardStatus, hideLeaderboard }) => {
  const [scores, setScores] = useState([]);

  async function getAllScores() {
    const scores = await fetch("http://localhost:3000", { mode: "cors" });
    const scoresData = await scores.json();
    setScores([...scoresData]);
  }

  useEffect(() => {
    getAllScores();
  }, [leaderboardStatus]);

  return (
    <Div style={{ display: displayValue }}>
      <div
        className="background"
        style={{ backgroundColor: "skyblue", width: "100%", height: "100%" }}
      ></div>
      <FlexDiv
        className="player-leaderboard"
        style={{ top: "100px", left: "180px", position: "absolute" }}
      >
        <p>Top 10 scores</p>
        <table>
          <TR>
            <TH>User</TH>
            <TH>Score</TH>
          </TR>
          {scores.map((score) => {
            return (
              <TR>
                <TD>{score.userName}</TD>
                <TD>{score.score}</TD>
              </TR>
            );
          })}
        </table>
        <Button onClick={hideLeaderboard}>Close</Button>
      </FlexDiv>
    </Div>
  );
};

export default Leaderboard;
