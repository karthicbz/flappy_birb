import React from "react";
import styled from "styled-components";
import { Button, FlexDiv } from "./ReplayScreen";

const Div = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SaveScoreModal = ({ displayValue, hideSaveScreen, score }) => {
  async function saveScore() {}
  return (
    <Div style={{ display: displayValue }} className="save-screen-modal">
      <div
        className="background"
        style={{
          backgroundColor: "rgba(135,206,235,0.9)",
          width: "100%",
          height: "100%",
        }}
      ></div>
      <FlexDiv
        className="score-form"
        style={{ position: "absolute", top: "350px", left: "150px" }}
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
          style={{ fontSize: "1.2rem", padding: "4px" }}
        />
        <Button>Save</Button>
        <Button onClick={hideSaveScreen}>Cancel</Button>
      </FlexDiv>
    </Div>
  );
};

export default SaveScoreModal;
