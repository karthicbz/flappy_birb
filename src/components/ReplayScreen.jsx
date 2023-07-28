import React from "react";

const ReplayScreen = ({ displayValue, score, replayGame }) => {
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
      <div>
        <p>{score}</p>
        <button onClick={replayGame}>Replay</button>
      </div>
    </div>
  );
};

export default ReplayScreen;
