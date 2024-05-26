import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../SubPage/AuthContext';

import CustomFont from '../../../Components/Container/CustomFont';
import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';

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
width: 80%;
`;

const DocContent = styled.div`
display: flex;
flex-direction: column;
min-height: 60px;
width: 100%;
margin: 10px;
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

const mockData = [
    { content: '미안', user_name: '하이이', target: '친구 윤서에게', name: '어제 우류를 쏟아서 미안해', like: 5 },
    { content: '죄송합니다', user_name: 'lny021102', target: '선생님께', name: '공부를 낭해서 성적이 너무 떨어졌기 때문에', like: 3 },
];

const defaultContent = ['b', 'c', 'd', 'e', 'f'];

export default function Component() {
    const { isLoggedIn } = useAuth(); // useAuth 훅에서 로그인 상태와 유저 정보를 가져옴
    const [userData, setUserData] = useState({ username: '', free_tickets: 0, paid_tickets: 0 });
    const [activeTab, setActiveTab] = useState(0);
    const [content, setContent] = useState(mockData);

    const navigate = useNavigate();

    const handleTabClick = (index) => {
        setActiveTab(index);
        if (index === 0) {
            setContent(mockData);
        } else {
            setContent([]);
        }
    };

    const handleLikeClick = (index) => {
        if (content[index].liked) {
            alert('이미 좋아요를 누르셨습니다!');
        } else {
            setContent(prevContent => {
                const newContent = [...prevContent];
                newContent[index].liked = true;
                newContent[index].like += 1;
                return newContent;
            });
        }
    };

    useEffect(() => {
        setContent(mockData);
    }, []);

    return (
        <ContainerCenter>
            <PageContainer>
                <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='2rem'>
                    <CustomFont color='black'>문서 구경 페이지</CustomFont>

                    <Tabs>
                        <Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>사과문</Tab>
                        <Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>보고서/시말서</Tab>
                        <Tab active={activeTab === 2} onClick={() => handleTabClick(2)}>편지</Tab>
                        <Tab active={activeTab === 3} onClick={() => handleTabClick(3)}>광고/포스터</Tab>
                        <Tab active={activeTab === 4} onClick={() => handleTabClick(4)}>이력서</Tab>
                        <Tab active={activeTab === 5} onClick={() => handleTabClick(5)}>모집/채용공고</Tab>
                    </Tabs>

                    {activeTab === 0 ? (
                        content.map((item, index) => (
                            <PurpleBox key={index}>
                                <CustomFont color='#D389C7' font='1.5rem' fontWeight='bold'>
                                    {item.content}
                                </CustomFont>
                                <CustomFont color='#D389C7' font='1rem'>
                                    작성자: {item.user_name}
                                </CustomFont>

                                <CustomFont color='#D389C7' font='1rem'>
                                    대상: {item.target}
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
                                            {item.name}
                                        </CustomFont>
                                    </DocContent>
                                </DocRound>

                                <Divide />

                                <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                                    <LikeButton onClick={() => handleLikeClick(index)} />
                                    <CustomFont color='#D389C7' font='1.2rem' fontWeight='bold'>
                                        좋아요 {item.like}개
                                    </CustomFont>
                                </CustomRow>
                            </PurpleBox>
                        ))
                    ) : (
                        <div>{defaultContent[activeTab - 1]}</div>
                    )}

                </CustomColumn>
            </PageContainer>
        </ContainerCenter>
    );
}
