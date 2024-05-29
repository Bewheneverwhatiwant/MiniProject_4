import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomFont from '../../../Components/Container/CustomFont';
import StyledImg from '../../../Components/Container/StyledImg';
import { useNavigate } from 'react-router-dom';
import Modify from './MyCategory/Modify/Modify';
import CheckTicket from './MyCategory/CheckTicket/CheckTicket';
import MyCharacter from './MyCategory/MyCharacter/MyCharacter';

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

const CategoryButton = styled.button`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0.5rem;
`;

const DivideLine = styled.div`
  width: 1px;
  height: 100vh;
  background-color: #979797;
`;

export default function Component() {
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로딩 시 스크롤을 맨 위로 설정
  }, []);

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const MyAsk = () => {
    navigate('/myask');
  }

  const renderRightComponent = () => {
    switch (selectedCategory) {
      case 'modify':
        return <Modify />;
      case 'checkTicket':
        return <CheckTicket />;
      case 'myCharacter':
        return <MyCharacter />;
      default:
        return <Modify />;
    }
  }

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomRow width='100%' justifyContent='space-between' alignItems='center' gap='0.1rem'>
          <CustomColumn width='50%' justifyContent='center' alignItems='center' gap='1rem'>
            <CategoryButton onClick={() => setSelectedCategory('modify')}>
              <CustomFont color={selectedCategory === 'modify' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                내 정보 수정
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('checkTicket')}>
              <CustomFont color={selectedCategory === 'checkTicket' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                내 티켓 확인
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('myCharacter')}>
              <CustomFont color={selectedCategory === 'myCharacter' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                내 캐릭터
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={MyAsk}>
              <CustomFont color='#9EE93A' fontWeight='bold' font='1.5rem'>내 질문 목록</CustomFont>
            </CategoryButton>
          </CustomColumn>

          <DivideLine />
          <CustomColumn width='50%' justify-content='center' align-items='center'>
            {renderRightComponent()}
          </CustomColumn>
        </CustomRow>
      </PageContainer>
    </ContainerCenter>
  );
};
