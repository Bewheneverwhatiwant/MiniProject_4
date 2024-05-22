import styled, { keyframes } from 'styled-components';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomRow from '../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../Components/Container/StyledImg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChangePwdModal_New from './ChangePwdModal_New';

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
  z-index: 1001; /* Modal이 항상 위에 오도록 설정 */
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

const InputForm = styled.input`
  display: flex;
  border: 1.5px solid #8CC63F;
  background-color: transparent;
  border-radius: 15px;
  width: 100%;
  height: 2rem;
  padding: 0.3rem;

  &::placeholder {
    color: #D9D9D9;
  }

  &:active {
    outline: none;
  }
`;

const PwdDiv = styled.div`
background-color: #ECFFE0;
display: flex;
align-items: center;
justify-content: center;
border-radius: 20px;
padding: 10px;
width: 50%;
`;

const Button = styled.button`
background-color: #FFC7C7;
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
border: none;
border-radius: 10px;
color: white;
width: 20%;
`;

const Error = styled.div`
  color: red;
  font-size: 0.8rem;
`;

export default function SignUpModal() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const isFormFilled = email && id;
    const [click, setClick] = useState(false); // 컴포넌트 전환 대비

    const CheckFilled = () => {
        if (isFormFilled) {
            // 컴포넌트 바뀌기
            setClick(true);
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    return (
        <ModalOverlay>
            <BuyModal onClick={(e) => e.stopPropagation()}>
                <ModalContent>
                    <CustomRow width='100%' height='100%' alignItems='center' justifyContents='center' gap='2rem'>
                        <StyledImg src={'icon_Boo_graduate.png'} width='300px' height='400px' />

                        {!click &&
                            <PwdDiv>
                                <CustomColumn width='100%' alignItems='center' justifyContents='center'>
                                    <CustomFont color='black' font='1rem' fontWeight='bold'>비밀번호 변경하기</CustomFont>


                                    <CustomColumn width='80%'>
                                        <CustomRow>
                                            <CustomFont font='1rem' color='black'>이메일</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                                        </CustomRow>
                                        <InputForm placeholder='회원가입 시 등록하신 이메일을 입력하세요.' value={email} onChange={handleEmailChange} />
                                        {!email && <Error>필수 필드입니다.</Error>}
                                    </CustomColumn>

                                    <CustomColumn width='80%'>
                                        <CustomRow>
                                            <CustomFont font='1rem' color='black'>아이디</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                                        </CustomRow>
                                        <InputForm placeholder='회원가입 시 등록하신 아이디를 입력하세요.' value={id} onChange={handleIdChange} />
                                        {!id && <Error>필수 필드입니다.</Error>}
                                    </CustomColumn>

                                    <CustomRow width='100%' justifyContents='flex-end' alignItems='center'>
                                        <Button onClick={CheckFilled}>확인</Button>
                                    </CustomRow>
                                </CustomColumn>
                            </PwdDiv>
                        }

                        {
                            click &&
                            <ChangePwdModal_New />
                        }
                    </CustomRow>
                </ModalContent>
            </BuyModal>
        </ModalOverlay>
    );
};
