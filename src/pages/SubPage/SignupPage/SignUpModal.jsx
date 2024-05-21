import styled from 'styled-components';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomColumn from '../../../Components/Container/CustomColumn';
import React from 'react';
import CustomFont from '../../../Components/Container/CustomFont';
import StyledImg from '../../../Components/Container/StyledImg';

const BuyModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 50vh;
  transform: translate(-50%, -50%);
  background-color: #ECFFE0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* Modal이 항상 위에 오도록 설정 */
  background-image: url('Modal_img_2.png');
  background-size: cover;
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
  z-index: 1000; /* ModalOverlay가 BuyModal의 바로 아래에 오도록 설정 */
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

export default function SignUpModal({ username }) {
    return (
        <ModalOverlay>
            <BuyModal onClick={(e) => e.stopPropagation()}>
                <ModalContent>
                    <CustomColumn width='100%' alignItems='center' justifyContents='center' gap='0.5rem'>
                        <CustomFont color='black' font='1.5rem' fontWeight='bold'>{username}님 환영합니다~!</CustomFont>
                        <CustomRow width='100%' alignItems='center' justifyContents='center' gap='8rem'>
                            <StyledImg src={'icon_Boo_Loved.png'} width='200px' height='200px' />
                        </CustomRow>
                    </CustomColumn>
                </ModalContent>
            </BuyModal>
        </ModalOverlay>
    );
};
