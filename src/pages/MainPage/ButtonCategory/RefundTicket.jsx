import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import CustomRow from '../../../Components/Container/CustomRow';
import CustomColumn from '../../../Components/Container/CustomColumn';
import StyledImg from '../../../Components/Container/StyledImg';
import CustomFont from '../../../Components/Container/CustomFont';

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
  background-color: #f0fff0;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  text-align: center;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const CloseButton = styled.button`
background-color: #D9D9D9;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
margin-top: 20px;
cursor: pointer;
`;

const RefundButton = styled.button`
  background-color: ${props => props.active ? '#FF5959' : '#D9D9D9'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  margin-top: 20px;
  cursor: pointer;
`;

const SorryDiv = styled.div`
background-color: #8CC63F;
border-radius: 30px;
padding: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 60%;
gap: 1rem;
`;

const RefundTicket = ({ username, onClose }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const navigate = useNavigate();

    const handleRefundClick = async () => {
        if (isChecked) {
            try {
                const response = await axios.put('http://223.130.153.51:8080/plus_tickets', null, {
                    params: { username }
                });

                if (response.status === 200) {
                    alert('티켓 환불이 완료되었습니다.');
                    onClose();
                    navigate('/mypage');
                } else {
                    console.error('티켓 환불 실패:', response);
                }
            } catch (error) {
                console.error('티켓 환불 중 오류 발생:', error);
            }
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>

                <CustomRow width='80%' alignItems='center' justifyContent='space-between'>
                    <StyledImg src={'icon_boo_refund.png'} alt="Refund Icon" width='100px' height='150px' />
                    <SorryDiv>
                        <CustomFont color='white' font='1rem' fontWeight='bold'>
                            만족스러운 문서를 생성해드리지 못해 죄송해요.
                        </CustomFont>
                        <CustomFont color='white' font='1rem' fontWeight='bold'>
                            아래의 환불 규약 설명을 꼭 읽어주세요...!
                        </CustomFont>
                    </SorryDiv>
                </CustomRow>

                <CustomColumn width='80%' alignItems='flex-start' justifyContent='center' gap='2rem'>

                    <CustomColumn width='100%' alignItems='flex-start' justifyContent='center' gap='0.7rem'>
                        <CustomFont color='#8CC63F' font='0.8rem' fontWeight='bold'>사용하신 티켓은 무료 티켓으로 환불됩니다.</CustomFont>
                        <CustomFont color='#8CC63F' font='0.8rem' fontWeight='bold'>환불을 신청하시는 즉시 무료 티켓이 적립됩니다.</CustomFont>
                        <CustomFont color='#8CC63F' font='0.8rem' fontWeight='bold'>환불이 가능한 사유는 다음과 같습니다:</CustomFont>
                        <CustomFont color='#518F00' font='1rem' fontWeight='bold'>언어, 말투, 분량 중 한 가지 이상의 조건에 맞지 않는 형태로 문서가 생성되었을 경우</CustomFont>

                        <CustomFont color='#8CC63F' font='0.8rem' fontWeight='bold'>이외의 경우는 티켓 환불이 어려우며, 관리자의 내역 확인 후 티켓 회수가 진행될 수 있습니다.</CustomFont>
                        <CustomFont color='#8CC63F' font='0.8rem' fontWeight='bold'>환불 직후 티켓을 의도적으로 모두 소진하시는 등 부적절한 행위가 감지되는 경우,</CustomFont>
                        <CustomFont color='#518F00' font='1rem' fontWeight='bold'>‘내 문서를 부탁해’ 서비스의 사용이 영구 차단될 수 있습니다.</CustomFont>
                    </CustomColumn>

                    <label>
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                        <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>
                            환불 규약을 모두 읽었으며 이에 동의합니다.
                        </CustomFont>
                    </label>
                </CustomColumn>

                <CustomRow width='80%' alignItems='center' justifyContent='space-between'>
                    <RefundButton active={isChecked} onClick={handleRefundClick}>티켓 환불 신청</RefundButton>
                    <CloseButton onClick={onClose}>티켓 환불 취소</CloseButton>
                </CustomRow>

            </ModalContent>
        </ModalOverlay>
    );
};

export default RefundTicket;
