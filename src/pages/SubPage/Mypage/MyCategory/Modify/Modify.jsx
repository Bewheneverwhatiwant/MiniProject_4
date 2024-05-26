import styled, { keyframes } from 'styled-components';
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
  gap: 4rem;
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

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;

const defaultImg = 'icon_boo_big.png';

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

const LevelModal = styled.div`
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
  background-size: 100% 100%;
`;

const LevelButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
border: none;
border-radius: 20px;
background-color: #C1EEA5;
cursor: pointer;
`;

const GiftButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: ${props => (props.disabled ? '#D9D9D9' : '#C1EEA5')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
`;

const LevelModalX = styled.button`
display: flex;
align-items: center;
justify-content: center;
border: none;
background-color: #D9D9D9;
color: white;
border-radius: 10px;
cursor: pointer;
`;

const ProgressBar = styled.div`
  width: ${props => props.width || '0%'};
  height: 100%;
  background-color: #8CC63F;
  transition: width 0.3s;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
`;

const SmallBooSay = styled.div`
display: flex;
background-color: #C1EEA5;
align-items: center;
justify-content: center;
padding: 5px;
text-align: center;
border-radius: 30px;
width: 200px;
line-height: 1.2rem;
`;

const LevelDiv = styled.div`
background-color: #8CC63F;
padding: 10px;
width: 100%;
border-radius: 30px;
display: flex;
justify-content: center;
align-items: center;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const AnimatedRow = styled(CustomRow)`
  animation: ${bounce} 1s infinite;
`;

export default function Component() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { profileImage, setProfileImage } = useAuth(); // useAuth 훅을 사용하여 프로필 이미지 상태와 업데이트 함수를 가져옴
  const [level, setLevel] = useState(false);
  const [getGift, setGetGift] = useState(false); // 보상받기 클릭 시 모달

  const [docCount, setDocCount] = useState(0);

  const fetchDocumentCreateCount = async () => {
    try {
      const response = await axios.get(`http://223.130.153.51:8080/document_create_count`, {
        params: { user_name: userData.username }
      });
      if (response.status === 200) {
        setDocCount(response.data);  // response.data.count 대신 response.data
        console.log(response.data);
      }
    } catch (error) {
      console.error('문서 생성 카운트 불러오기 실패', error);
    }
  };

  useEffect(() => {
    if (userData.username) {
      fetchDocumentCreateCount();
    }
  }, [userData.username]);

  // 레벨 계산 함수
  const calculateLevel = (count) => {
    if (count >= 1 && count < 20) return 'BOO론즈';
    if (count >= 20 && count < 40) return 'BOO지런한 새';
    if (count >= 40 && count < 60) return '남 BOO럽지 않아';
    if (count >= 60 && count < 80) return '문서 BOO자';
    if (count >= 80 && count <= 100) return '문서왕';
  };

  // 다음 레벨 계산 함수
  const calculateNextLevel = (count) => {
    if (count >= 1 && count < 20) return 'BOO지런한 새';
    if (count >= 20 && count < 40) return '남 BOO럽지 않아';
    if (count >= 40 && count < 60) return '문서 BOO자';
    if (count >= 60 && count < 80) return '문서왕';
    if (count >= 80 && count <= 100) return '문서왕';
  };

  const remainingDocuments = (level) => {
    const levels = ['BOO론즈', 'BOO지런한 새', '남 BOO럽지 않아', '문서 BOO자', '문서왕'];
    const levelThresholds = [20, 40, 60, 80, 100];
    const currentLevelIndex = levels.indexOf(calculateLevel(docCount));

    const levelIndex = levels.indexOf(level);
    if (levelIndex > currentLevelIndex) return '?';

    if (level === 'BOO론즈') return 20 - docCount;
    if (level === 'BOO지런한 새') return 40 - docCount;
    if (level === '남 BOO럽지 않아') return 60 - docCount;
    if (level === '문서 BOO자') return 80 - docCount;
    if (level === '문서왕') return 100 - docCount;
  };

  const [giftStatus, setGiftStatus] = useState({
    'BOO론즈': false,
    'BOO지런한 새': false,
    '남 BOO럽지 않아': false,
    '문서 BOO자': false,
    '문서왕': false,
  });

  const currentLevel = calculateLevel(docCount);
  const nextLevel = calculateNextLevel(docCount);

  // 프로필 이미지 업로드 및 업데이트 API
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_name", userData.username);

      try {
        let response;
        if (profileImage !== defaultImg) {
          response = await axios.put(
            `${process.env.REACT_APP_SERVER_IP}/update_profile`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axios.post(
            `${process.env.REACT_APP_SERVER_IP}/upload_profile`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        if (response.status === 200) {
          console.log("프로필 이미지가 성공적으로 업로드/업데이트되었습니다.");
          const imageUrl = URL.createObjectURL(file);
          setProfileImage(imageUrl); // 전역 상태 업데이트
        } else {
          console.error("프로필 이미지 업로드/업데이트 실패", response);
        }
      } catch (error) {
        console.error("프로필 이미지 업로드/업데이트 중 오류 발생", error);
      }
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  // 프로필 이미지 삭제 API
  const handleDeleteImage = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_IP}/delete_profile`, {
        params: { user_name: userData.username }
      });
      if (response.status === 200) {
        console.log("프로필 이미지가 성공적으로 삭제되었습니다.");
        setProfileImage(defaultImg); // 전역 상태 업데이트
      } else {
        console.error("프로필 이미지 삭제 실패", response);
      }
    } catch (error) {
      console.error("프로필 이미지 삭제 중 오류 발생", error);
    }
  };

  // 프로필 이미지 반환 API
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (userData.username) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_IP}/get_profile`,
            {
              params: { user_name: userData.username },
              responseType: 'blob'
            }
          );
          if (response.status === 200) {
            const imageUrl = URL.createObjectURL(response.data);
            setProfileImage(imageUrl); // 전역 상태 업데이트
          } else if (response.status === 404) {
            setProfileImage(defaultImg); // 기본 이미지로 설정
          }
        } catch (error) {
          console.error("프로필 이미지 불러오기 실패", error);
          setProfileImage(defaultImg); // 기본 이미지로 설정
        }
      }
    };

    fetchProfileImage();
  }, [userData.username]);

  const Modal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleLevelModal = () => {
    const savedGiftStatus = JSON.parse(localStorage.getItem('giftStatus'));
    if (savedGiftStatus) {
      setGiftStatus(savedGiftStatus);
    }
    setLevel(true);
  };

  const handleLevelModalX = () => {
    setLevel(false);
  }

  const handleGetGift = async (level) => {
    if (giftStatus[level]) return; // 이미 보상을 받았으면 함수 종료

    try {
      const response = await axios.put('http://223.130.153.51:8080/plus_tickets', null, {
        params: { username: userData.username }
      });

      if (response.status === 200) {
        setGiftStatus((prevStatus) => {
          const newStatus = { ...prevStatus, [level]: true };
          localStorage.setItem('giftStatus', JSON.stringify(newStatus)); // 로컬 저장소에 저장
          return newStatus;
        }); // 보상을 받았음을 기록
        setGetGift(true);
        console.log('무료 티켓이 성공적으로 증가되었습니다.');
      } else {
        console.error('무료 티켓 증가 실패:', response);
      }
    } catch (error) {
      console.error('무료 티켓 증가 중 오류 발생:', error);
    }
  };

  // 초기 상태 설정 시 로컬 저장소에서 giftStatus 불러오기
  useEffect(() => {
    const savedGiftStatus = JSON.parse(localStorage.getItem('giftStatus'));
    if (savedGiftStatus) {
      setGiftStatus(savedGiftStatus);
    }
  }, []);

  useEffect(() => {
    if (getGift) {
      const timer = setTimeout(() => {
        setGetGift(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [getGift]);

  useEffect(() => {
    if (getGift) {
      const timer = setTimeout(() => {
        setGetGift(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [getGift]);
  // 나중에 getGift 모달에, 무료 쿠폰 +1 해주는 API 연동하기

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
              <ProfileContainer>
                <StyledImg
                  src={profileImage}
                  width="150px"
                  height="150px"
                  borderRadius="20px"
                  onClick={handleImageClick}
                  style={{ cursor: "pointer" }}
                />
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <DeleteButton onClick={handleDeleteImage}>X</DeleteButton>
              </ProfileContainer>
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

          {showLogoutModal && (
            <>
              <ModalOverlay />
              <LogoutModal />
            </>
          )}

        </CustomColumn>

        <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='3rem'>

          <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='1rem'>
            <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
              <CustomFont color='black' font='1.5rem' fontWeight='bold'>내가 지금까지 생성한 문서는?</CustomFont>
            </CustomRow>
            <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
              <CustomFont color='#8CC63F' font='1.5rem' fontWeight='bold'>{docCount}개</CustomFont>
            </CustomRow>
            <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
              <CustomFont color='#8CC63F' font='1rem'>{userData.username}님은 {currentLevel}Level 입니다.</CustomFont>
            </CustomRow>
          </CustomColumn>

          <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
            <StyledImg src={'icon_boo_glass.png'} width='70px' height='70px' />
            <CustomRow width='100%' justifyContent='center' alignItems='center'>
              <ProgressBarContainer>
                <ProgressBar width={`${docCount}%`} />
              </ProgressBarContainer>
            </CustomRow>
          </CustomRow>

          <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
            <CustomFont color='black' font='1rem' fontWeight='bold'>다음 레벨은?</CustomFont>

            {nextLevel === '문서왕' ? (
              <StyledImg src={'icon_boo_glass.png'} width='20px' height='20px' />
            ) : (
              <LevelButton onClick={handleLevelModal}>
                <CustomFont color='white' font='1rem'>{nextLevel}</CustomFont>
              </LevelButton>
            )}
          </CustomRow>

          {level && (
            <>
              <ModalOverlay />
              <LevelModal>
                <CustomColumn width='95%' alignItems='center' justifyContent='center'>

                  <CustomRow width='100%' alignItems='center' justifyContent='flex-end'>
                    <CustomRow>
                      <AnimatedRow>
                        <StyledImg src={'icon_boo_small.png'} width='50px' height='50px' />
                        <SmallBooSay>
                          <CustomFont color='white' font='1rem' fontWeight='bold'>
                            목표에 달성하는 순간, <br />버튼이 활성화될 거예요!
                          </CustomFont>
                        </SmallBooSay>
                      </AnimatedRow>
                      <LevelModalX onClick={handleLevelModalX}>x</LevelModalX>
                    </CustomRow>
                  </CustomRow>

                  <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                    {['BOO론즈', 'BOO지런한 새', '남 BOO럽지 않아', '문서 BOO자', '문서왕'].map((level, index) => (
                      <CustomRow key={index} width='100%' alignItems='center' justifyContent='center' gap='1rem'>
                        <CustomRow width='25%' alignItems='center' justifyContent='center'>
                          <StyledImg src={'icon_boo_small.png'} width={`${15 + index * 5}px`} height={`${15 + index * 5}px`} />
                        </CustomRow>

                        <CustomRow width='25%' alignItems='center' justifyContent='center'>
                          <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>{level}</CustomFont>
                        </CustomRow>

                        <CustomRow width='25%' alignItems='center' justifyContent='center'>
                          <LevelDiv>
                            <CustomFont color='white' font='1rem'>
                              {remainingDocuments(level)}장 남았어요
                            </CustomFont>
                          </LevelDiv>
                        </CustomRow>

                        <CustomRow width='25%' alignItems='center' justifyContent='center'>
                          <GiftButton disabled={level !== currentLevel || giftStatus[level]} onClick={() => handleGetGift(level)}>
                            <CustomFont color='white' font='1rem'>
                              {giftStatus[level] ? '이미 보상을 받았어요.' : '보상받기'}
                            </CustomFont>
                          </GiftButton>
                        </CustomRow>
                      </CustomRow>
                    ))}
                  </CustomColumn>
                </CustomColumn>
              </LevelModal>
            </>
          )}

          {getGift && (
            <>
              <ModalOverlay />
              <LevelModal>
                <CustomColumn width='100%' alignItems='center' justifyContent='center' gap='1rem'>
                  <CustomFont color='#8CC63F' font='1.5rem' fontWeight='bold'>축하합니다! 무료 티켓 1장이 적립되었어요!</CustomFont>
                  <AnimatedRow>
                    <StyledImg src='icon_booAndTicket.png' width='500px' height='400px' />
                  </AnimatedRow>
                </CustomColumn>
              </LevelModal>
            </>
          )}

        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
}
