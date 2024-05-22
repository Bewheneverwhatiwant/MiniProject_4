import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';
import StyledImg from '../../../Components/Container/StyledImg';
import CustomFont from '../../../Components/Container/CustomFont';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import ChangeRwdModal from '../Mypage/MyCategory/Modify/ChangePwdModal';
import FindIdModal from '../LoginPage/FindIdModal';

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
background-color: ${props => props.isActive ? '#8CC63F' : '#D9D9D9'};
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

export default function Component() {

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const isFormFilled = userId && password;
  const [changepw, setChangepw] = useState('');
  const [findid, setFindid] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

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
        alert('로그인에 성공하였습니다!');
        login(userId); // 로그인 상태 업데이트
        navigate('/');
      } catch (error) {
        console.error(error);
        alert('로그인에 실패하였습니다.');
      }
    }
  }

  const MoveSignup = () => {
    navigate('/signuppage');
  }

  const ChangePW = () => {
    setChangepw(true);
  }

  const Findid = () => {
    setFindid(true);
  }

  const handleClose = () => {
    setFindid(false);
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
              <MiniButton onClick={MoveSignup}>회원가입</MiniButton>
            </CustomRow>
          </CustomColumn>
        </CustomColumn>

        {
          changepw && <ChangeRwdModal />
        }

        {
          findid && <FindIdModal onClose={handleClose} />
        }
      </PageContainer>
    </ContainerCenter>
  );
};