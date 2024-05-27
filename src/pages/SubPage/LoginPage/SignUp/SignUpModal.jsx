import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import axios from 'axios';

import CustomColumn from '../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../Components/Container/CustomRow';
import StyledImg from '../../../../Components/Container/StyledImg';
import CustomFont from '../../../../Components/Container/CustomFont';
import SignUpModal_happy from './SignUpModal_happy';
import CustomModal from '../../../../Components/Container/CustomModal';

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
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  color: white;
  border: none;
  border-radius: 15px;
  background-color: ${props => props.isValid ? '#8CC63F' : '#855427'};
  cursor: pointer;
`;

const SignupButton = styled.button`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  color: white;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.isActive ? '#3C3C3C' : '#D9D9D9'};
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  pointer-events: ${props => props.isActive ? 'auto' : 'none'};
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })``;

const ImageWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: -32px;
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const OverlappingImage = styled(StyledImg)`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  ${props => props.isValid && css`
    animation: ${bounceAnimation} 0.5s ease-in-out infinite;
  `}
`;

export default function Component({ onClose, onShowTicketAlert }) {
    const [userId, setUserId] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isValid_email, setIsValid_email] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const isPasswordsMatch = password === passwordConfirm;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{6,9}$/;
    const isPasswordValid = passwordRegex.test(password);
    const isFormFilled = userId && isValid && password && passwordConfirm && isPasswordsMatch && isPasswordValid && isCheck && email && isValid_email;

    const [showTicketAlert, setShowTicketAlert] = useState(false); // happy 모달 제어
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const handleIdCheck = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/duplicate_confirmation`, {
                params: {
                    user_name: userId,
                }
            });
            setIsValid(true);
        } catch (error) {
            setIsValid(false);
            if (error.response && error.response.status === 409) {
                alert('이미 사용 중인 아이디입니다.');
            } else {
                console.error('아이디 중복 검사 실패', error);
                alert('아이디 중복 검사에 실패했습니다.');
            }
        }
    };


    // 이메일 중복검사 API. 서버한테 중복 시 400말고 409로 상태코드 달라고 말하기
    const handleEmailCheck = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/duplicate_email`, {
                params: {
                    email: email,
                }
            });
            setIsValid_email(true);
        } catch (error) {
            setIsValid_email(false);
            if (error.response && error.response.status === 409) {
                alert('이미 사용 중인 이메일입니다.');
            } else {
                console.error('이메일 중복 검사 실패', error);
                alert('이메일 중복 검사에 실패했습니다.');
            }
        }
    };

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

    useEffect(() => {
        if (showTicketAlert) {
            const timer = setTimeout(() => {
                setShowTicketAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showTicketAlert]);

    return (
        <CustomModal width='30%' height='90vh' padding='20px' onClose={onClose} maxHeight='100vh'>
            <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='4rem'>
                <CustomRow width='80%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                    <CustomFont color='#8CC63F' font='2rem' fontWeight='bold'>내 문서를 부탁해</CustomFont>
                    <StyledImg src={'icon_feather.png'} width='30px' height='30px' />
                </CustomRow>

                <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='2rem'>

                    <CustomRow width='80%'>

                        <CustomColumn width='70%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                            <CustomRow width='40%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                                <CustomFont color='black' font='1rem' fontWeight='bold'>아이디</CustomFont>
                                <CustomFont color='red' font='1rem' fontWeight='bold'>*</CustomFont>
                            </CustomRow>

                            <CustomRow width='100%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                                <InputForm placeholder='사용하실 아이디를 입력하세요.' value={userId} onChange={e => setUserId(e.target.value)} />
                            </CustomRow>
                            {!userId && <ErrorText>필수 필드입니다.</ErrorText>}
                        </CustomColumn>

                        <CustomColumn width='30%' alignItems='center' justifyContent='center' gap='1px'>
                            <ImageWrapper>
                                <OverlappingImage src={'icon_boo_small.png'} width='60px' height='60px' isValid={isValid} />
                            </ImageWrapper>
                            <IsValidButton isValid={isValid} onClick={handleIdCheck}>
                                {isValid ? '사용 가능' : '중복검사'}
                            </IsValidButton>
                        </CustomColumn>

                    </CustomRow>

                    <CustomColumn width='80%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                        <CustomRow width='40%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>비밀번호</CustomFont>
                            <CustomFont color='red' font='1rem' fontWeight='bold'>*</CustomFont>
                        </CustomRow>
                        <InputForm type="password" placeholder='사용하실 비밀번호를 입력하세요.' value={password} onChange={e => setPassword(e.target.value)} />
                        {!password && <ErrorText>필수 필드입니다.</ErrorText>}
                        {password && !isPasswordValid && <ErrorText>비밀번호는 6자 이상 9자 이하, 특수문자와 숫자를 포함해야 합니다.</ErrorText>}
                    </CustomColumn>
                    <CustomColumn width='80%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                        <CustomRow width='40%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>비밀번호 확인</CustomFont>
                            <CustomFont color='red' font='1rem' fontWeight='bold'>*</CustomFont>
                        </CustomRow>
                        <InputForm type="password" placeholder='비밀번호를 한번 더 입력하세요.' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                        {!passwordConfirm && <ErrorText>필수 필드입니다.</ErrorText>}
                        {passwordConfirm && !isPasswordsMatch && <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>}
                    </CustomColumn>

                    <CustomRow width='80%' gap='1.4rem'>
                        <CustomColumn width='70%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                            <CustomRow width='30%' justifyContent='flex-start' alignItems='center' gap='0.5rem'>
                                <CustomFont color='black' font='1rem' fontWeight='bold'>이메일</CustomFont>
                                <CustomFont color='red' font='1rem' fontWeight='bold'>*</CustomFont>
                            </CustomRow>
                            <InputForm placeholder='이메일 주소를 입력하세요.' value={email} onChange={e => setEmail(e.target.value)} />
                            {!email && <ErrorText>필수 필드입니다.</ErrorText>}
                        </CustomColumn>

                        <CustomColumn width='30%' alignItems='center' justifyContent='center' gap='1px'>
                            <ImageWrapper>
                                <OverlappingImage src={'icon_boo_small.png'} width='60px' height='60px' isValid={isValid_email} />
                            </ImageWrapper>
                            <IsValidButton isValid={isValid_email} onClick={handleEmailCheck}>
                                {isValid_email ? '사용 가능' : '중복검사'}
                            </IsValidButton>
                        </CustomColumn>
                    </CustomRow>

                    <CustomRow width='80%' justifyContent='flex-start' alignItems='center' gap='1rem'>
                        <Checkbox checked={isCheck} onChange={(e) => setIsCheck(e.target.checked)} />
                        <CustomFont color='black' font='1rem'>개인정보 이용 약관에 동의합니다.</CustomFont>
                    </CustomRow>
                    <SignupButton isActive={isFormFilled} onClick={handleSignup}>
                        <CustomFont font='1rem' color='white' fontWeight='bold'>회원가입 완료</CustomFont>
                    </SignupButton>
                    {showTicketAlert && (
                        <SignUpModal_happy username={username} />
                    )}
                </CustomColumn>
            </CustomColumn>
        </CustomModal>
    );
}
