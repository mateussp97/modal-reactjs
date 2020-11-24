import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Fitness from "../../image/modal.jpg";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 900px;
  height: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 9px 0 0 9px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: start;
  line-height: 1.8;
  color: #141414;

  h1 {
    margin-bottom: 3rem;
  }

  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }

  button {
    padding: 15px 29px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 3rem;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? "translateY(0%)" : "translateY(-100%)",
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.hey === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={Fitness} alt="Fitness Boy" />
              <ModalContent>
                <h1>Hipertrofia</h1>
                <h3>O que será feito?</h3>
                <p>
                  Iremos potencializar seu ganho de massa muscular com ajustes
                  individuais feitos para sua genética!
                </p>
                <h3>Iremos analisar:</h3>
                <ul>
                  <li>Biotipo corporal</li>
                  <li>
                    Análise da taxa de metabolismo basal e cálculo de calorias
                  </li>
                  <li>Adequação da dieta de acordo com o treino</li>
                </ul>
                <button>Entre em Contato</button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close Modal"
                onClick={() => setShowModal((previous) => !previous)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
