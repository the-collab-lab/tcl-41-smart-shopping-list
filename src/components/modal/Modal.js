import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  top: 50%;
  left: 50%;
  display: flex;
  width: 70vw;
  flex-direction: column;
  transform: translate(-50%, -50%);
  position: absolute;
  text-align: center;
  border-radius: 15px;
  padding: 10px;
  background-color: antiquewhite;
  color: #152b51;
  border: 14px solid #f68e8e;
`;

const ModalWrapper = styled.div`
  display: flex;
  padding-bottom: 50px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  color: #152b51;
  margin-top: 12px;
  p {
    margin-bottom: 1rem;
    font-size: calc(4px + 2vmin);
  }
`;

const CloseModalButton = styled(MdClose)`
  transform: translate(-50%, -50%);
  background-color: lightblue;
  border-radius: 50px;
  width: 26px;
  height: 26px;
  padding: 8px;
  z-index: 10;
  margin-top: 28px;
  position: absolute;
  top: 88%;
  left: 50%;
`;

const Header = styled.h2`
  font-family: Baskerville;
  margin: 0;
`;

const Soon = styled.span`
  height: calc(24px + 2vmin);
  width: calc(24px + 2vmin);
  background-color: #ac2c2c;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
  position: relative;
`;

const KindofSoon = styled.span`
  height: calc(24px + 2vmin);
  width: calc(24px + 2vmin);
  background-color: #ff6b6b;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
`;

const NotSoon = styled.span`
  height: calc(24px + 2vmin);
  width: calc(24px + 2vmin);
  background-color: #f9bcbc;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
`;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <Header>Color-Coded List Items:</Header>
                <Header>What Do They Mean?</Header>
                <p>
                  your smart shopping list remembers what you buy & when you buy
                  it. the colors tell us when it thinks you should buy that item
                  again.
                </p>
                <p>never run out of cheese again 🥲</p>
                <Dots>
                  <Soon />
                  <p>
                    you're almost out! buy this <strong>soon</strong>
                  </p>
                </Dots>
                <Dots>
                  <KindofSoon />
                  <p>
                    no stress but buy this <strong>kinda soon</strong>
                  </p>
                </Dots>
                <Dots>
                  <NotSoon />
                  <p>
                    don't worry: <strong>not soon</strong>
                  </p>
                </Dots>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
