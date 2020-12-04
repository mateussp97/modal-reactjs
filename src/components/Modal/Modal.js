import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import modalImage from "../../image/modal.jpg";

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 900px;
  margin: 2rem auto 0 auto;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
  background: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 999;
  border-radius: 10px;

  @media screen and (max-width: 676px) {
    grid-template-columns: 1fr;
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      ),
      url(${modalImage});
    background-position: center;
    background-size: cover;
    color: #ffffff;
  }
`;

const ModalImg = styled.img`
  width: 100%;
  max-height: 675px;
  border-radius: 7px 0 0 7px;
  @media screen and (max-width: 676px) {
    display: none;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 2rem;

  h1 {
    font-size: clamp(1.5rem, 2vw, 2.25rem);
    margin-bottom: 1rem;
  }

  h3 {
    font-size: clamp(1.25rem, 1.75vw, 1.75rem);
    margin: 1rem 0;
  }

  p {
    font-size: clamp(0.875rem, 1vw, 1.25rem);
    max-width: 500px;
    padding: 0 0.75rem;

    @media screen and (max-width: 676px) {
      padding: 0 0.25rem;
    }
  }

  li {
    text-align: start;
  }

  li + li {
    margin-top: 0.25rem;
  }

  button {
    padding: 15px 29px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 3rem;

    @media screen and (max-width: 676px) {
      background: #fff;
      color: #141414;
    }
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
              <ModalImg src={modalImage} alt="Fitness Boy" />
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
                  <li>Análise da taxa de metabolismo basal</li>
                  <li>Análise de cálculo de calorias</li>
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
