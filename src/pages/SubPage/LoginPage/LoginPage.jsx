import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';
import StyledImg from '../../../Components/Container/StyledImg';
import CustomFont from '../../../Components/Container/CustomFont';
import { useAuth } from '../AuthContext';

import FindIdModal from './FindIdModal';
import ChangePwModal from './ChangePw/ChangePwModal';
import SignUpModal from './SignUp/SignUpModal';
import SignUpModal_happy from './SignUp/SignUpModal_happy';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 100vh;
`;

const PageContainer = styled(ContainerCenter)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 8vh;
  padding-bottom: 5vh;
  gap: 20px;
  position: relative;
  background-color: white;
  background-image: url('MainImg.png');
  background-size: 100% 100%;
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
  outline: none;  // 클릭 시 기본적으로 적용되는 아웃라인 제거
}
`;

const LoginButton = styled.button`
width: 30%;
display: flex;
align-items: center;
justify-content: center;
padding: 1rem;
color: white;
border: none;
border-radius: 20px;
background-color: ${props => props.isActive ? '#585858' : '#D9D9D9'};
cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
pointer-events: ${props => props.isActive ? 'auto' : 'none'};
`;

const MiniButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
padding: 0.3rem;
color: grey;
border: none;
background-color: transparent;
cursor: pointer;
text-decoration: underline;
`;

const BuyModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 60vh;
  transform: translate(-50%, -50%);
  background-color: #ECFFE0;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* Modal이 항상 위에 오도록 설정 */
  background-image: url('Modal_LoginSuccess_back.png');
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
  z-index: 1000; /* ModalOverlay가 BuyModal의 바로 아래에 오도록 설정 */
`;

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// StyledImg 컴포넌트에 애니메이션 추가
const StyledImg_boo = styled.img`
  width: ${props => props.width};
  height: ${props => props.height};
  animation: ${moveUpDown} 1s ease-in-out infinite; // 2초마다 위 아래로 움직이는 애니메이션
`;

export default function Component() {

  // 입력 필드 유효성 검사를 위한 상태
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const isFormFilled = userId && password;

  // 모달 제어를 위한 상태
  const [changepw, setChangepw] = useState(false); // 비번 변경 모달
  const [findid, setFindid] = useState(false); // 아이디 찾기 모달
  const [signup, setSignup] = useState(false); // 회원가입 모달
  const [showTicketAlert, setShowTicketAlert] = useState(false);
  const [username, setUsername] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // 로그인 성공 모달 상태

  const navigate = useNavigate();
  const { login } = useAuth();

  // 로그인 API 연동
  const handleLogin = async () => {
    if (isFormFilled) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/login`, null, {
          params: {
            id: userId,
            password: password,
          }
        });
        console.log(response);
        login(userId); // 로그인 상태 업데이트
        setLoginSuccess(true); // 로그인 성공 모달 표시
        setTimeout(() => {
          setLoginSuccess(false); // 3초 후 모달 닫기
          navigate('/mainpage'); // /mainpage로 이동
        }, 3000);
      } catch (error) {
        console.error(error);
        alert('로그인에 실패하였습니다.');
      }
    }
  }

  // 비번 변경 모달 띄우기
  const ChangePW = () => {
    setChangepw(true);
  };

  // 비번 변경 모달 닫기
  const closeChangePW = () => {
    setChangepw(false);
  };

  // 아이디 찾기 모달 띄우기
  const Findid = () => {
    setFindid(true);
  }

  // 아이디 찾기 모달 닫기
  const handleClose = () => {
    setFindid(false);
  };

  // 회원가입 모달 띄우기
  const SignUp = () => {
    setSignup(true);
  }

  const closeModals = () => {
    setSignup(false);
    setShowTicketAlert(false);
  }

  const handleShowTicketAlert = (username) => {
    setUsername(username);
    setShowTicketAlert(true);
  };

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='5rem'>

          <CustomRow width='90%' justifyContent='center' alignItems='flex-end' gap='0.1rem'>
            <StyledImg src={'icon_boo_small.png'} />
            <StyledImg src={'icon_boo_big.png'} />
            <StyledImg src={'icon_boo_middle.png'} />
          </CustomRow>

          <CustomColumn width='100%' alignItems='center' justifyContent='center' gap='0.6rem'>
            <CustomFont color='black' font='1.2rem' fontWeight='bold'>문서 작성이 어려운 당신을 위한</CustomFont>
            <CustomFont color='black' font='3rem' fontWeight='bold' className="bmjua-text">내 문서를 부탁해</CustomFont>
          </CustomColumn>

          <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='2rem'>
            <CustomColumn width='30%' justifyContent='center' alignItems='flex-start' gap='1rem'>
              <CustomFont color='black' font='1rem' fontWeight='bold'>아이디</CustomFont>
              <InputForm placeholder='아이디를 입력하세요.' value={userId} onChange={e => setUserId(e.target.value)} />
            </CustomColumn>

            <CustomColumn width='30%' justifyContent='center' alignItems='flex-start' gap='1rem'>
              <CustomFont color='black' font='1rem' fontWeight='bold'>비밀번호</CustomFont>
              <InputForm type='password' placeholder='비밀번호를 입력하세요.' value={password} onChange={e => setPassword(e.target.value)} />
            </CustomColumn>

            <LoginButton isActive={isFormFilled} onClick={handleLogin}>
              <CustomFont font='1rem' color='white' fontWeight='bold'>로그인 하기</CustomFont>
            </LoginButton>

            <CustomRow width='50%' justifyContent='center' alignItems='space-around' gap='5rem'>
              <MiniButton onClick={Findid}>아이디 찾기</MiniButton>
              <MiniButton onClick={ChangePW}>비밀번호 변경하기</MiniButton>
              <MiniButton onClick={SignUp}>회원가입</MiniButton>
            </CustomRow>
          </CustomColumn>
        </CustomColumn>

        {changepw && <ChangePwModal onClose={closeChangePW} />}
        {findid && <FindIdModal onClose={handleClose} />}
        {signup && <SignUpModal onClose={() => setSignup(false)} onShowTicketAlert={handleShowTicketAlert} />}
        {showTicketAlert && <SignUpModal_happy username={username} onClose={closeModals} />}
        {loginSuccess && (
          <>
            <ModalOverlay />
            <BuyModal>
              <CustomColumn width='100%' height='100%' alignItems='center' justifyContent='flex-end'>
                <StyledImg_boo src={'icon_boo_happyAndBlushed.png'} width='300px' height='300px' />
              </CustomColumn>
            </BuyModal>
          </>
        )}
        <CustomColumn height='200px'></CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
};
