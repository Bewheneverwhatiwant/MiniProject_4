import styled, { keyframes, css } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../SubPage/AuthContext';

import CustomFont from '../../../Components/Container/CustomFont';
import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';
import Comments from './Comments';
import StyledImg from '../../../Components/Container/StyledImg';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const PageContainer = styled(ContainerCenter)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 8vh;
  padding-bottom: 5vh;
  gap: 20px;
  position: relative;
  background-color: white;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  background-color: #f0f8e0;
  padding: 1rem;
  border-radius: 20px;
`;

const Tab = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => (props.active ? '#78AB34' : '#B2B2B2')};
  border-bottom: ${props => (props.active ? '2px solid #78AB34' : 'none')};
  cursor: pointer;
`;

const PurpleBox = styled.div`
  background-color: #fdeaf1;
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem 0;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LikeButton = styled.button`
  background: url('icon_like_button.png') no-repeat center;
  background-size: cover;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: width 0.2s, height 0.2s;

  &:active {
    width: 30px;
    height: 30px;
  }
`;

const Divide = styled.div`
width: 80%;
height: 1px;
background-color: #D389C7;
`;

const DocRound = styled.div`
background-color: white;
display: flex;
flex-direction: column;
border-radius: 20px;
width: 100%;
`;

const DocContent = styled.div`
display: flex;
flex-direction: column;
min-height: 100px;
width: 100%;
margin: 10px;
line-height: 1.2rem;

align-items: center;
justify-content: center;
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${props => props.color || '#F0F0F0'};
  border: none;
`;

const DocHeader = styled.div`
width: 100%;
height: 20px;
background-color: #3C3C3C;
display: flex;
align-items: center;
justify-content: flex-start;
gap: 1rem;
border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const grow = keyframes`
  0% {
    width: 100px;
    height: 100px;
  }
  50% {
    width: 200px;
    height: 200px;
  }
  100% {
    width: 100px;
    height: 100px;
  }
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

// 모달의 위아래 움직임 애니메이션
const moveUpDown_Boo = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const BuyModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BuyModal = styled.div`
  width: 400px;
  height: 400px;
  background-color: transparent;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('icon_boo_happyAndBlushed.png');
  background-size: cover;
  animation: ${moveUpDown_Boo} 1s infinite; /* 위아래 움직임 애니메이션 적용 */
`;

const StyledImg_heart = styled.img`
  width: 100px;
  height: 100px;
  animation: ${grow} 3s infinite;
  opacity: 0.5;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #C1EEA5;
  border: none;
  border-radius: 20px;
`;

const DocShare = styled.button`
  padding: 0.5rem 1rem;
  margin: 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #FFB9F4;
  border: none;
  border-radius: 10px;
`;

const RewardButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 1rem;
  font-size: 1rem;
  background-color: ${props => props.active ? 'red' : '#D9D9D9'};
  border: none;
  border-radius: 20px;
  color: white;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};

  ${props =>
        !props.active &&
        css`
      cursor: not-allowed;
    `}
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
  width: 100%;
`;

const LikeBattle = styled.div`
  background-color: #C1EEA5;
  width: 90%;
  height: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-image: url('DocBrowse_event.png');
  background-size: calc(100% + 60px) calc(100% + 60px);
  background-position: -20px -20px;
`;

const CustomButton = ({ active, onClick, text }) => (
    <RewardButton active={active} onClick={onClick} disabled={!active}>
        {active ? '지금이야!' : text}
    </RewardButton>
);

const getButtonText = (totalLikes, rewardReceived, requiredLikes) => {
    if (rewardReceived) return '이미 보상을 받았어요.';
    return `좋아요 총합 ${requiredLikes}개가 필요해요.`;
};

export default function Component() {
    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 로딩 시 스크롤을 맨 위로 설정
    }, []);

    const { isLoggedIn } = useAuth(); // useAuth 훅에서 로그인 상태와 유저 정보를 가져옴
    const [userData, setUserData] = useState({ username: '', free_tickets: 0, paid_tickets: 0 });
    const [activeTab, setActiveTab] = useState(0);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedDocName, setSelectedDocName] = useState('');
    const [selectedDocUserName, setSelectedDocUserName] = useState('');

    const handleCommentClick = (docName, docUserName) => {
        console.log(`handleCommentClick 호출됨 - docName: ${docName}, docUserName: ${docUserName}`);
        setSelectedDocName(docName);
        setSelectedDocUserName(docUserName);
        setShowCommentModal(true);
    };

    const handleCloseModal = () => {
        setShowCommentModal(false);
    };


    const [showGood, setShowGood] = useState(false);

    const [totalLikes, setTotalLikes] = useState(0);
    const [ranking, setRanking] = useState('');

    const [rewards, setRewards] = useState([true, true, true]); // 서버에서 가져온 초기 상

    const fetchTotalLikes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_total_likes`, {
                params: { user_name: isLoggedIn }
            });
            const responseData = response.data.split('\n'); // 응답 데이터를 줄바꿈으로 분할
            setTotalLikes(responseData[0]); // 첫 번째 줄은 totalLikes
            setRanking(responseData[1]); // 두 번째 줄은 ranking
        } catch (error) {
            console.error('총 좋아요 수를 불러오는 데 실패했습니다.', error);
        }
    };

    const fetchRewards = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_like_levels`, {
                params: { user_name: isLoggedIn }
            });
            setRewards(response.data);
        } catch (error) {
            console.error('보상 정보를 불러오는 데 실패했습니다.', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchTotalLikes();
            fetchRewards();
        }
    }, [isLoggedIn]);

    const handleRewardClick = async (level) => {
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_IP}/update_like_levels`, null, {
                params: { user_name: isLoggedIn, level }
            });
            // 무료 티켓 증가 API 호출
            const ticketResponse = await axios.put(`${process.env.REACT_APP_SERVER_IP}/plus_tickets`, null, {
                params: { username: isLoggedIn }
            });
            if (ticketResponse.status === 200) {
                alert('무료 티켓 1개가 적립되었습니다.');
            }
            fetchRewards(); // 보상 정보를 다시 가져와 업데이트
        } catch (error) {
            console.error('보상 업데이트에 실패했습니다.', error);
        }
    };

    // 여기까지 좋아요 보상 관련

    const sortByLikes = () => {
        setLoading(true);
        setTimeout(() => {
            const sortedContent = [...content].sort((a, b) => b.likeCount - a.likeCount);
            setContent(sortedContent);
            setLoading(false);
        }, 1000);
    };

    const [originalContent, setOriginalContent] = useState([]); // 원래 데이터를 저장할 상태

    const sortByRecent = () => {
        setLoading(true);
        setTimeout(() => {
            const sortedContent = [...originalContent].slice().reverse();
            setContent(sortedContent); // 원래 데이터를 사용하여 복원하고 역순으로 정렬
            setLoading(false);
        }, 1000);
    };

    const handleGoodClick = () => {
        setShowGood(true);
        setTimeout(() => {
            setShowGood(false);
        }, 2500);
    }

    const navigate = useNavigate();

    const handleTabClick = (index) => {
        setActiveTab(index);
        setLoading(true); // 탭을 클릭하면 로딩 상태로 설정
        let type = '';
        switch (index) {
            case 0:
                type = 'sorry';
                break;
            case 1:
                type = 'notice';
                break;
            case 2:
                type = 'letter';
                break;
            case 3:
                type = 'poster';
                break;
            case 4:
                type = 'job';
                break;
            case 5:
                type = 'hire';
                break;
            default:
                type = '';
        }
        fetchData(type);
    };

    // fetchData 함수 수정
    const fetchData = async (type) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/shared_documents`);
            const documents = response.data.filter(doc => doc.type === type).map(doc => ({ ...doc, like: doc.like_count || 0 }));
            setContent(documents);
            setOriginalContent(documents); // 원래 데이터를 저장
            setLoading(false); // 데이터가 로드되면 로딩 상태 해제
        } catch (error) {
            console.error('데이터 불러오기 실패', error);
            setLoading(false); // 에러가 발생해도 로딩 상태 해제
        }
    };


    const handleLikeClick = async (index) => {
        const doc = content[index];

        // 좋아요 클릭 시 즉시 프론트엔드 상태 업데이트
        setContent(prevContent => {
            const newContent = [...prevContent];
            newContent[index].liked = true;
            newContent[index].likeCount = (newContent[index].likeCount || 0) + 1; // 초기값 설정
            return newContent;
        });

        handleGoodClick();

        try {

            console.log('시작');

            // 서버에 좋아요 증가 요청
            // 여기서 400 오류 해결 중 -> user_name에 누르난 사람이 아닌 doc 작성자 아이디 담도록 변경!
            await axios.put(`${process.env.REACT_APP_SERVER_IP}/add_like_count`, null, {
                params: {
                    doc_name: doc.name,
                    user_name: doc.userName
                }
            });

            console.log('좋아요 post 끝');

            // 서버에서 최신 좋아요 수 가져와서 업데이트
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_like_count`, {
                params: {
                    doc_name: doc.name,
                    user_name: doc.userName
                }
            });

            console.log('좋아요 개수 업데이트 끝');

            const updatedLikeCount = response.data;

            console.log(updatedLikeCount);

            // 서버에서 받은 최신 좋아요 수가 유효한지 확인 후 상태 업데이트
            if (typeof updatedLikeCount === 'number') {
                setContent(prevContent => {
                    const newContent = [...prevContent];
                    newContent[index].like_count = updatedLikeCount;
                    return newContent;
                });
            } else {
                console.error('서버로부터 유효하지 않은 좋아요 수를 받았습니다:', updatedLikeCount);
            }
        } catch (error) {
            // 인코딩된 doc_name과 user_name을 콘솔에 출력
            console.log('doc_name:', encodeURIComponent(doc.name));
            console.log('user_name:', encodeURIComponent(isLoggedIn));
            console.log(doc.userName);
            console.log(doc.name);
            console.error('좋아요 추가 실패', error);
        }
    };


    useEffect(() => {
        fetchData('sorry'); // 처음 로드할 때는 사과문 카테고리를 로드
    }, []);

    return (
        <ContainerCenter>
            <PageContainer>
                <AnimatedRow>
                    <LikeBattle />
                </AnimatedRow>
                <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='2rem'>
                    <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='1rem'>
                        <CustomRow width='100%' justifyContent='center' alignItems='center' gap='1rem'>
                            <CustomFont color='black' font='2.2rem' fontWeight='bold' className="bmjua-text">내 문서의 총 좋아요 개수는?</CustomFont>
                            <CustomFont color='black' font='2.2rem' fontWeight='bold' className="bmjua-text">{totalLikes}개</CustomFont>
                            <StyledImg src={'icon_fire_event.png'} width='60px' height='60px' />
                        </CustomRow>

                        <CustomRow width='100%' justifyContent='center' alignItems='center' gap='1rem'>
                            <CustomFont color='black' font='1.5rem' fontWeight='bold' className="bmjua-text">나는 문서를 부탁하는 사람들 중에서</CustomFont>
                            <CustomFont color='black' font='1.5rem' fontWeight='bold' className="bmjua-text">{ranking}등이에요!</CustomFont>
                        </CustomRow>



                        <CustomRow width='100%' justifyContent='center' alignItems='center' gap='1rem'>
                            <CustomButton
                                active={totalLikes >= 6 && rewards[0]}
                                onClick={() => handleRewardClick('LEVEL1')}
                                text={getButtonText(totalLikes, !rewards[0], 6)}
                            />
                            <CustomButton
                                active={totalLikes >= 20 && rewards[1]}
                                onClick={() => handleRewardClick('LEVEL2')}
                                text={getButtonText(totalLikes, !rewards[1], 20)}
                            />
                            <CustomButton
                                active={totalLikes >= 50 && rewards[2]}
                                onClick={() => handleRewardClick('LEVEL3')}
                                text={getButtonText(totalLikes, !rewards[2], 50)}
                            />
                        </CustomRow>
                    </CustomColumn>

                    <Tabs>
                        <Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>사과문</Tab>
                        <Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>보고서/시말서</Tab>
                        <Tab active={activeTab === 2} onClick={() => handleTabClick(2)}>편지</Tab>
                        <Tab active={activeTab === 3} onClick={() => handleTabClick(3)}>광고/포스터</Tab>
                        <Tab active={activeTab === 4} onClick={() => handleTabClick(4)}>이력서</Tab>
                        <Tab active={activeTab === 5} onClick={() => handleTabClick(5)}>모집/채용공고</Tab>
                    </Tabs>

                    <CustomRow width='80%' justifyContent='center' alignItems='center' gap='1rem'>
                        <Button onClick={sortByLikes}>
                            <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>좋아요순</CustomFont>
                        </Button>
                        <Button onClick={sortByRecent}>
                            <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>최신순</CustomFont>
                        </Button>
                    </CustomRow>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        content.length > 0 ? (
                            content.map((item, index) => (
                                <PurpleBox key={index}>
                                    <CustomFont color='#D389C7' font='1.5rem' fontWeight='bold'>
                                        {item.name}
                                    </CustomFont>
                                    <CustomFont color='#D389C7' font='1rem'>
                                        작성자: {item.userName}
                                    </CustomFont>

                                    <CustomFont color='#D389C7' font='1rem'>
                                        대상: {item.content}
                                    </CustomFont>

                                    <DocRound>
                                        <DocHeader>
                                            <CustomRow width='10%' alignItems='center' justifyContent='space-around'>
                                                <Circle color='#EC6A5E' />
                                                <Circle color='#F4BF4F' />
                                                <Circle color='#61C554' />
                                            </CustomRow>
                                        </DocHeader>
                                        <DocContent>
                                            <CustomFont color='#D389C7' font='1rem'>
                                                {item.target}
                                            </CustomFont>
                                        </DocContent>
                                    </DocRound>

                                    <Divide />

                                    <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                                        <LikeButton onClick={() => handleLikeClick(index)} />
                                        <CustomFont color='#D389C7' font='1.2rem' fontWeight='bold'>
                                            좋아요 {item.likeCount}개
                                        </CustomFont>
                                    </CustomRow>
                                    <DocShare onClick={() => handleCommentClick(item.name, item.userName)}>
                                        <CustomFont color='#C06CB2' font='1rem' fontWeight='bold'>댓글달기</CustomFont>
                                    </DocShare>
                                </PurpleBox>
                            ))
                        ) : (
                            <p>아직 공유된 문서가 없어요.</p>
                        )
                    )}

                    {showCommentModal && (
                        <>
                            <Comments docName={selectedDocName} docUserName={selectedDocUserName} onClose={handleCloseModal} />
                            <p>현재 선택된 docUserName: {selectedDocUserName}</p>
                        </>
                    )}

                    {showGood && (
                        <>
                            <ModalOverlay />
                            <BuyModalContainer>
                                <BuyModal>
                                    <StyledImg_heart src={'icon_redHeart.png'} />
                                </BuyModal>
                            </BuyModalContainer>
                        </>
                    )}

                </CustomColumn>
            </PageContainer>
        </ContainerCenter>
    );
}
