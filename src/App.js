import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { Modal } from "./components/Modal/Modal";
import { GlobalStyle } from "./globalStyles";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

function App() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((previous) => !previous);
  };

  return (
    <>
      <Container>
        <Button onClick={openModal}>Ver Mais</Button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default App;
