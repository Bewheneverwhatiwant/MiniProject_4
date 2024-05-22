import styled, { keyframes } from 'styled-components';
import React, { useEffect } from 'react';

import CustomColumn from '../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../Components/Container/CustomRow';
import CustomFont from '../../../../Components/Container/CustomFont';

const BuyModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 50vh;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-image: url('Modal_img_2.png');
  background-size: 100% 100%;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const expandAndFadeOut = keyframes`
  0% {
    width: 200px;
    height: 200px;
    opacity: 1;
  }
  50% {
    width: 300px;
    height: 300px;
    opacity: 0.5;
  }
  100% {
    width: 250px;
    height: 250px;
    opacity: 0;
  }
`;

const OverlayContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BouncingImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${bounceAnimation} 1s ease-in-out infinite alternate;
`;

const ExpandingImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  animation: ${expandAndFadeOut} 1.5s forwards;
`;

export default function SignUpModal_happy({ username, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ModalOverlay>
      <BuyModal onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <CustomColumn width='100%' alignItems='center' justifyContents='center' gap='2rem'>
            <CustomColumn gap='0.5rem'>
              <CustomFont color='black' font='1.5rem' fontWeight='bold'>{username}님 환영합니다!</CustomFont>
              <CustomFont color='#BAD234' font='1rem' fontWeight='bold'>로그인 화면으로 이동할게요.</CustomFont>
            </CustomColumn>
            <CustomRow width='100%' alignItems='center' justifyContents='center' gap='8rem'>
              <OverlayContainer>
                <BouncingImg src={'icon_Boo_Loved.png'} />
                <ExpandingImg src={'icon_greenHeart.png'} />
              </OverlayContainer>
            </CustomRow>
          </CustomColumn>
        </ModalContent>
      </BuyModal>
    </ModalOverlay>
  );
};
