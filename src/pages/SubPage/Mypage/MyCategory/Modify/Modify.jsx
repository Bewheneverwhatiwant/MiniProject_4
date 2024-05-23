import styled from 'styled-components';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../Components/Container/StyledImg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../AuthContext';
import ChangePwdModal from './ChangePwdModal';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
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

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem;
  border: 1.5px solid #979797;
  border-radius: 30px;
  width: 150px;
  color: #979797;
  background-color: transparent;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #C1EEA580;
  border: 2px solid #8CC63F;
  border-radius: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 150px;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #8CC63F;
`;

const Button = styled.button`
  font-size: 1.2rem;
  color: white;
  background-color: #C1EEA580;
  border: 2px solid white;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #7BB32E;
  }
`;

const LogOutImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height:150px;
  border-radius: 20px;
`;

const userImg = 'ex_myprofile.png';

const LogoutModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 50vh;
  transform: translate(-50%, -50%);
  background-color: #ECFFE0;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-image: url('Modal_LogOut.png');
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

export default function Component() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const Modal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const { isLoggedIn, logout } = useAuth(); // useAuth를 이용하여 로그인 상태 가져오기

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('마이페이지 정보 요청 시작');
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/user_total_info`);
        console.log(response.data);
        const user = response.data.find(user => user.username === isLoggedIn);
        if (user) {
          console.log('유저 확인!');
          setUserData({ username: user.username, password: user.password });
          console.log({ username: user.username, password: user.password });
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setTimeout(() => {
      logout();
      setShowLogoutModal(false);
      navigate('/');
    }, 3000); // 3초 후 로그아웃 및 모달 닫기
  };

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='1rem'>

          <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1.5rem'>
            {isLoggedOut ? (
              <LogOutImg>로그인해주세요</LogOutImg>
            ) : (
              <StyledImg src={userImg} width='150px' height='150px' borderRadius='20px' />
            )}
            <CustomColumn width='100%' justifyContent='flex-start' alignItems='flex-start' gap='1rem'>
              {isLoggedOut ? (
                <CustomFont font='2rem' color='979797' fontWeight='bold'>로그인해주세요</CustomFont>
              ) : (
                <CustomFont font='2rem' color='979797' fontWeight='bold'>{userData.username}님 환영합니다.</CustomFont>
              )}
              <LogoutButton onClick={handleLogout}>
                <CustomFont color='#979797' font='1rem' fontWeight='bold'>로그아웃</CustomFont>
              </LogoutButton>
            </CustomColumn>
          </CustomRow>

          <InfoContainer>
            <CustomRow width='80%' justifyContent='space-between' alignItems='center'>
              <CustomFont color='#8CC63F' fontWeight='bold' font='1.2rem'>아이디</CustomFont>
              <CustomFont color='#8CC63F' fontWeight='bold' font='1.2rem'>
                {isLoggedOut ? '로그인해주세요' : userData.username}
              </CustomFont>
            </CustomRow>

            <Divider />

            <CustomRow width='80%' justifyContent='space-between' alignItems='center'>
              <CustomFont color='#8CC63F' fontWeight='bold' font='1.2rem'>비밀번호</CustomFont>
              <Button onClick={Modal}>
                <CustomFont color='white' fontWeight='bold' font='1.2rem'>비밀번호 변경</CustomFont>
              </Button>
            </CustomRow>
          </InfoContainer>

          {showModal && <ChangePwdModal onClose={closeModal} />}

        </CustomColumn>
      </PageContainer>

      {showLogoutModal && (
        <>
          <ModalOverlay />
          <LogoutModal />
        </>
      )}
    </ContainerCenter>
  );
}
