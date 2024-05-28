import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomCenter from '../../../../../Components/Container/CustomCenter';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../Components/Container/StyledImg';
import { useAuth } from '../../../AuthContext';

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
  background-color: #C1EEA5;
  cursor: pointer;
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

const SmallBooSay = styled.div`
display: flex;
background-color: #C1EEA5;
align-items: center;
justify-content: center;
padding: 5px;
text-align: center;
border-radius: 30px;
width: 350px;
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

export default function CharacterComponent() {
  const [documentCount, setDocumentCount] = useState(0);
  const [nickname, setNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { isLoggedIn, profileImage, setProfileImage } = useAuth();
  const [userData, setUserData] = useState({ username: '', password: '' });
  const username = isLoggedIn;
  const [loading, setLoading] = useState(true);
  const [docCount, setDocCount] = useState(0);
  const [getGift, setGetGift] = useState(false); // 보상받기 클릭 시 모달
  const [level, setLevel] = useState(false);
  const [levelStatus, setLevelStatus] = useState([true, true, true, true, true]); // 보상 상태

  useEffect(() => {
    if (username) {
      setLoading(true);
      console.log('fetchDocumentCreateCount 호출');
      fetchDocumentCount();
      console.log('레벨 API 호출');
      fetchLevelStatus();
      fetchNickname().finally(() => setLoading(false));
    }
  }, [username]);

  useEffect(() => {
    console.log('nickname 상태 업데이트:', nickname);
  }, [nickname]);


  // 문서 생성 횟수 반환 API 연동
  const fetchDocumentCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/document_create_count`, {
        params: { user_name: username },
      });
      console.log('Document Count Response:', response.data); // 응답 값 확인
      setDocumentCount(response.data);
      setDocCount(response.data); // docCount 값도 설정
    } catch (error) {
      console.error('문서 생성 수 불러오기 실패', error);
    } finally {
      setLoading(false);
    }
  };

  // 레벨 상태 불러오기 API 연동
  const fetchLevelStatus = async () => {
    try {
      const response = await axios.get(`http://223.130.153.51:8080/get_levels`, {
        params: { user_name: username }
      });
      if (response.status === 200) {
        setLevelStatus(response.data);
        console.log('레벨 상태 불러오기 성공', response.data);
      }
    } catch (error) {
      console.error('레벨 상태 불러오기 실패', error);
    }
  };

  // 레벨 계산 함수
  const calculateLevel = (count) => {
    if (count >= 0 && count < 20) return 'BOO론즈';
    if (count >= 20 && count < 40) return 'BOO지런한 새';
    if (count >= 40 && count < 60) return '남 BOO럽지 않아';
    if (count >= 60 && count < 80) return '문서 BOO자';
    if (count >= 80 && count <= 100) return '문서왕';
  };

  // 다음 레벨 계산 함수
  const calculateNextLevel = (count) => {
    if (count >= 0 && count < 20) return 'BOO지런한 새';
    if (count >= 20 && count < 40) return '남 BOO럽지 않아';
    if (count >= 40 && count < 60) return '문서 BOO자';
    if (count >= 60 && count < 80) return '문서왕';
    if (count >= 80 && count <= 100) return '문서왕';
  };

  const remainingDocuments = (level) => {
    const levels = ['BOO론즈', 'BOO지런한 새', '남 BOO럽지 않아', '문서 BOO자', '문서왕'];

    const currentLevelIndex = levels.indexOf(calculateLevel(docCount));

    const levelIndex = levels.indexOf(level);
    if (levelIndex > currentLevelIndex) return '?';

    if (level === 'BOO론즈') return 20 - docCount;
    if (level === 'BOO지런한 새') return 40 - docCount;
    if (level === '남 BOO럽지 않아') return 60 - docCount;
    if (level === '문서 BOO자') return 80 - docCount;
    if (level === '문서왕') return 100 - docCount;
  };

  const currentLevel = calculateLevel(docCount);
  const nextLevel = calculateNextLevel(docCount);

  const handleLevelModal = () => {
    fetchLevelStatus(); // 레벨 상태 최신화
    setLevel(true);
  };

  const handleLevelModalX = () => {
    setLevel(false);
  }


  useEffect(() => {
    if (getGift) {
      const timer = setTimeout(() => {
        setGetGift(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [getGift]);

  const fetchNickname = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_nickname`, {
        params: { user_name: username },
      });
      console.log('닉네임 조회 성공:', response.data);
      const fetchedNickname = response.data;
      // 닉네임이 존재하며, 빈 문자열이 아닐 경우 기본값을 설정하는 부분이다
      setNickname(fetchedNickname && fetchedNickname.trim() !== '' ? fetchedNickname : 'Boo의 이름을 지어주세요.');
    } catch (error) {
      console.error('닉네임 불러오기 실패', error);
      setNickname('Boo의 이름을 지어주세요.');
    }
  };

  const updateNickname = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_IP}/change_nick_name`, null, {
        params: {
          user_name: username,
          nick_name: newNickname,
        }
      });
      console.log('닉네임 변경 성공:', response.data);
      setNickname(newNickname);
      setIsEditing(false);
    } catch (error) {
      console.error('닉네임 변경 실패', error);
    }
  };

  const getImageBasedOnDocumentCount = () => {
    if (documentCount >= 1 && documentCount < 20) return 'Boo_grow_1.png';
    if (documentCount >= 20 && documentCount < 40) return 'Boo_grow_2.png';
    if (documentCount >= 40 && documentCount < 60) return 'Boo_grow_3.png';
    if (documentCount >= 60 && documentCount < 80) return 'Boo_grow_4.png';
    if (documentCount >= 80 && documentCount < 100) return 'Boo_grow_5.png';
    if (documentCount >= 100 && documentCount < 120) return 'Boo_grow_6.png';
    if (documentCount >= 120 && documentCount < 140) return 'Boo_grow_7.png';
    if (documentCount >= 140) return 'Boo_grow_8.png';
    return 'Boo_grow_1.png';
  };

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='100%' alignItems='center' justifyContent='center'>

          <CustomColumn width='80%' alignItems='center' justifyContent='center'>

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
              <CustomFont color='black' font='1.5rem' fontWeight='bold'>
                BOO는 문서를 먹으면서 성장해요.</CustomFont>
            </CustomRow>

            <CustomColumn width='100%' justifyContent='flex-start' alignItems='center' gap='0.2rem'>
              <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                <CustomFont color='#8CC63F' font='1rem'>{username}님이 문서를 많이 생성할 수록 BOO는 빠르게 성장합니다.</CustomFont>
              </CustomRow>
              <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                <CustomFont color='#8CC63F' font='1rem'>나만의 BOO에게 이름을 지어주고 BOO의 생애를 관찰하세요.</CustomFont>
              </CustomRow>
            </CustomColumn>

            <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
              <AnimatedRow>
                <LevelButton>
                  <CustomColumn width='100%' alignItems='center' justifyContent='center' gap='0.5rem'>
                    <CustomFont color='#8CC63F' font='0.7rem' fontWeight='bold'>"귀여운 BOO가 어른이 되면, 어떤 모습일까?"</CustomFont>
                    <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>BOO의 생애 미리보기</CustomFont>
                  </CustomColumn>
                </LevelButton>
              </AnimatedRow>
            </CustomRow>

            <StyledImg src={getImageBasedOnDocumentCount()} width='300px' height='300px' />
            {loading ? (
              <p>Loading...</p>
            ) : isEditing ? (
              <CustomColumn width='80%' alignItems='center' gap='10px'>
                <InputForm placeholder='새 닉네임 입력' value={newNickname} onChange={(e) => setNewNickname(e.target.value)} />
                <CustomRow width='100%' justifyContent='space-around'>
                  <IsValidButton onClick={updateNickname}>확인</IsValidButton>
                  <IsValidButton onClick={() => setIsEditing(false)}>취소</IsValidButton>
                </CustomRow>
              </CustomColumn>
            ) : (
              <CustomColumn width='80%' alignItems='center' justifyContent='center' gap='10px'>
                <CustomColumn width='60%' alignItems='center' justifyContent='center' gap='0.5rem'>
                  <CustomFont color='black' font='0.7rem'>BOO의 이름은 깃털을 눌러 새로 지어줄 수 있어요.</CustomFont>
                  <CustomFont color='#8CC63F' font='0.9rem' fontWeight='bold'>{username}님이 키우는 BOO의 이름은</CustomFont>
                </CustomColumn>
                <IsValidButton onClick={() => setIsEditing(true)}>
                  <CustomRow width='100%' justifyContent='space-around'>
                    <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>
                      {nickname}
                    </CustomFont>
                    <StyledImg src={'icon_feather.png'} width='30px' height='30px' />
                  </CustomRow>
                </IsValidButton>
              </CustomColumn>
            )}
          </CustomColumn>

          <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='3rem'>

            <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='1rem'>
              <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
                <CustomFont color='#8CC63F' font='1.5rem' fontWeight='bold'>{nickname}</CustomFont>
                <CustomFont color='black' font='1.5rem' fontWeight='bold'>(이)가 지금까지 먹은 문서는?</CustomFont>
              </CustomRow>
              <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
                <CustomFont color='#8CC63F' font='1.5rem' fontWeight='bold'>{docCount}개</CustomFont>
              </CustomRow>
              <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
                <CustomFont color='#8CC63F' font='1rem'>{username}님이 키우는 {nickname}(은)는 {currentLevel}로 성장했어요.</CustomFont>
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
              <CustomFont color='black' font='1rem' fontWeight='bold'>다음 성장단계는?</CustomFont>

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
                              각 성장단계별 보상은<br />'내 정보 수정' 탭에서 받으실 수 있어요!
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

                        </CustomRow>
                      ))}
                    </CustomColumn>
                  </CustomColumn>
                </LevelModal>
              </>
            )}

          </CustomColumn>

        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
}
