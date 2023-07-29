import React, { useEffect, useState } from "react";
import { Button, FlexDiv } from "./ReplayScreen";
import { Div } from "./SaveScoreModal";
import styled from "styled-components";

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
        style={{ top: "100px", left: "200px", position: "absolute" }}
      >
        <p>Top 10 scores</p>
        <table>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
          {scores.map((score) => {
            return (
              <tr>
                <td>{score.userName}</td>
                <td>{score.score}</td>
              </tr>
            );
          })}
        </table>
        <Button onClick={hideLeaderboard}>Close</Button>
      </FlexDiv>
    </Div>
  );
};

export default Leaderboard;
