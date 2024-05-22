import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import CustomColumn from '../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../Components/Container/CustomRow';
import StyledImg from '../../../../Components/Container/StyledImg';
import CustomFont from '../../../../Components/Container/CustomFont';
import SignUpModal_happy from './SignUpModal_happy';

const BuyModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30%;
  height: 90vh;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* Modal이 항상 위에 오도록 설정 */
//   background-image: url('Modal_img_2.png');
//   background-size: 100% 100%;
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

const ErrorText = styled.div`
  color: red;
  font-size: 0.8rem;
`;

const IsValidButton = styled.button`
  width: 30%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  color: white;
  border: none;
  border-radius: 15px;
  background-color: ${props => props.isActive ? '#8CC63F' : '#D9D9D9'};
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  pointer-events: ${props => props.isActive ? 'auto' : 'none'};
`;

const SignupButton = styled.button`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: white;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.isActive ? '#3C3C3C' : '#D9D9D9'};
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  pointer-events: ${props => props.isActive ? 'auto' : 'none'};
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })``;

export default function Component({ onClose, onShowTicketAlert }) {
    const [userId, setUserId] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const isPasswordsMatch = password === passwordConfirm;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{6,9}$/;
    const isPasswordValid = passwordRegex.test(password);
    const isFormFilled = userId && isValid && password && passwordConfirm && isPasswordsMatch && isPasswordValid && isCheck && email;

    const [showTicketAlert, setShowTicketAlert] = useState(false); // happy 모달 제어
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    // 아이디 중복검사 API 호출
    const handleIdCheck = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/duplicate_confirmation`, {
                params: {
                    user_name: userId,
                }
            });
            alert('사용 가능한 아이디입니다.');
            setIsValid(true);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('이미 사용 중인 아이디입니다.');
                setIsValid(false);
            } else {
                console.error('아이디 중복 검사 실패', error);
                alert('아이디 중복 검사에 실패했습니다.');
            }
        }
    };

    // 회원가입 API 호출
    const handleSignup = async () => {
        if (isFormFilled) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/join`, {
                    username: userId,
                    password: password,
                    email: email,
                    free_tickets: 3,
                    paid_tickets: 0,
                    nick_name: userId,
                });
                console.log(response);
                setUsername(userId);
                onShowTicketAlert(userId);
            } catch (error) {
                console.error(error);
                alert('회원가입에 실패했습니다.');
            }
        }
    };

    // 만약 회원가입 성공 시, 3초간 축하 Modal이 뜬 뒤 돌아가도록 하기 위함
    useEffect(() => {
        if (showTicketAlert) { // happy 모달이 뜨면 타이머 시작
            const timer = setTimeout(() => {
                setShowTicketAlert(false); // 3초 뒤 happy 모달 끄기
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showTicketAlert]);

    return (
        <ModalOverlay>
            <BuyModal>
                <ModalContent>

                    <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='4rem'>
                        {/* 제목 및 아이콘 */}
                        <CustomRow width='80%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                            <CustomFont color='#8CC63F' font='2rem' fontWeight='bold'>내 문서를 부탁해</CustomFont>
                            <StyledImg src={'icon_feather.png'} width='30px' height='30px' />
                        </CustomRow>

                        {/* 입력 필드들 */}
                        <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='2rem'>
                            {/* 아이디 필드 */}

                            <CustomColumn width='80%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                                <CustomRow width='40%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                                    <CustomFont color='black' font='1rem' fontWeight='bold'>아이디</CustomFont>
                                    <CustomFont color='red' font='1rem' fontWeight='bold'>*</CustomFont>
                                </CustomRow>
                                <CustomRow width='100%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                                    <InputForm placeholder='사용하실 아이디를 입력하세요.' value={userId} onChange={e => setUserId(e.target.value)} />
                                    <IsValidButton isActive={userId.length > 0} onClick={handleIdCheck}>중복검사</IsValidButton>
                                </CustomRow>
                                {!userId && <ErrorText>필수 필드입니다.</ErrorText>}
                            </CustomColumn>

                            {/* 비밀번호 필드 */}
                            <CustomColumn width='80%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                                <CustomRow width='40%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                                    <CustomFont color='black' font='1rem' fontWeight='bold'>비밀번호</CustomFont>
                                    <CustomFont color='red' font='1rem' fontWeight='bold'>*</CustomFont>
                                </CustomRow>
                                <InputForm type="password" placeholder='사용하실 비밀번호를 입력하세요.' value={password} onChange={e => setPassword(e.target.value)} />
                                {!password && <ErrorText>필수 필드입니다.</ErrorText>}
                                {password && !isPasswordValid && <ErrorText>비밀번호는 6자 이상 9자 이하, 특수문자와 숫자를 포함해야 합니다.</ErrorText>}
                            </CustomColumn>

                            {/* 비밀번호 확인 필드 */}
                            <CustomColumn width='80%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                                <CustomRow width='40%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                                    <CustomFont color='black' font='1rem' fontWeight='bold'>비밀번호 확인</CustomFont>
                                    <CustomFont color='red' font='1rem' fontWeight='bold'>*</CustomFont>
                                </CustomRow>
                                <InputForm type="password" placeholder='비밀번호를 한번 더 입력하세요.' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                                {!passwordConfirm && <ErrorText>필수 필드입니다.</ErrorText>}
                                {passwordConfirm && !isPasswordsMatch && <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>}
                            </CustomColumn>

                            {/* 이메일 입력 필드 */}
                            <CustomColumn width='80%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                                <CustomRow width='30%' justifyContent='flex-start' alignItems='center' gap='0.5rem'>
                                    <CustomFont color='black' font='1rem' fontWeight='bold'>이메일</CustomFont>
                                    <CustomFont color='red' font='1rem' fontWeight='bold'>*</CustomFont>
                                </CustomRow>
                                <InputForm placeholder='이메일 주소를 입력하세요.' value={email} onChange={e => setEmail(e.target.value)} />
                                {!email && <ErrorText>필수 필드입니다.</ErrorText>}
                            </CustomColumn>

                            {/* 개인정보 동의 */}
                            <CustomRow width='80%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                                <Checkbox checked={isCheck} onChange={(e) => setIsCheck(e.target.checked)} />
                                <CustomFont color='black' font='1rem'>개인정보 이용 약관에 동의합니다.</CustomFont>
                            </CustomRow>

                            {/* 회원가입 버튼 */}
                            <SignupButton isActive={isFormFilled} onClick={handleSignup}>
                                <CustomFont font='1rem' color='white' fontWeight='bold'>회원가입 완료</CustomFont>
                            </SignupButton>

                            {showTicketAlert && (
                                <SignUpModal_happy username={username} />
                            )}
                        </CustomColumn>
                    </CustomColumn>

                </ModalContent>
            </BuyModal>
        </ModalOverlay>
    );
};
