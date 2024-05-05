import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../Components/Container/CustomRow';
import CustomFont from '../../../../../Components/Container/CustomFont';
// import AskHire from './AskHire/AskHire';
// import AskJob from './AskJob/AskJob';
// import AskNotice from './AskNotice/AskNotice';
// import AskLetter from './AskLetter/AskLetter';
// import AskPoster from './AskPoster/AskPoster';
// import AskSorry from './AskSorry/AskSorry';
import AnswerContainer from './AnswerContainer'

import data from '../../../../../data/MyAsk.json';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 50%;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 9999;
`;

const ModalContent = styled.div`
width: 55%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px; 
  padding-right: 80px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const MyAnswerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #FFD7D7;
    border: none;
    border-radius: 10px;
    padding:15px;
    width: 100%;
    line-height: 1.5;
    margin-top: 10px;
`;

export default function MyAsk() {
  const [selectedCategory, setSelectedCategory] = useState('sorry');
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = data.filter(item => item.category === selectedCategory);
      setFilteredData(filtered);
    }
  }, [selectedCategory]);

  const openModal = index => {
    setSelectedItemIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomRow width='100%' justifyContent='space-between' alignItems='center' gap='0.1rem'>
          <CustomColumn width='50%' justifyContent='center' alignItems='center' gap='1rem'>
            <CategoryButton onClick={() => setSelectedCategory('sorry')}>
              <CustomFont color={selectedCategory === 'sorry' ? '#FF9292' : 'black'} fontWeight='bold' font='1.5rem'>
                사과문
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('notice')}>
              <CustomFont color={selectedCategory === 'notice' ? '#FF9292' : 'black'} fontWeight='bold' font='1.5rem'>
                보고서
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('letter')}>
              <CustomFont color={selectedCategory === 'letter' ? '#FF9292' : 'black'} fontWeight='bold' font='1.5rem'>
                편지
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('poster')}>
              <CustomFont color={selectedCategory === 'poster' ? '#FF9292' : 'black'} fontWeight='bold' font='1.5rem'>
                광고/포스터
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('job')}>
              <CustomFont color={selectedCategory === 'job' ? '#FF9292' : 'black'} fontWeight='bold' font='1.5rem'>
                이력서
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('hire')}>
              <CustomFont color={selectedCategory === 'hire' ? '#FF9292' : 'black'} fontWeight='bold' font='1.5rem'>
                모집/채용 공고
              </CustomFont>
            </CategoryButton>
          </CustomColumn>

          <DivideLine />

          <CustomColumn width='50%' justify-content='center' align-items='center'>
            {filteredData.map((item, index) => (
              <AnswerContainer key={index} title={item.title} onClick={() => openModal(index)} />
            ))}
          </CustomColumn>
        </CustomRow>
      </PageContainer>

      <ModalOverlay show={modalVisible} onClick={closeModal}>
        <ModalContent>
          {selectedItemIndex !== null && (
            <>
            <CustomFont color='#00000' font='1.8rem'>나의 요청 사항</CustomFont>
            <MyAnswerContainer>
            <CustomFont color='#00000' font='1.5rem'>대상: {filteredData[selectedItemIndex].to}</CustomFont>
            <CustomFont color='#00000' font='1.5rem'>분량: {filteredData[selectedItemIndex].amount}</CustomFont>
            <CustomFont color='#00000' font='1.5rem'>사유: {filteredData[selectedItemIndex].reason}</CustomFont>
            </MyAnswerContainer>
            <div style={{ marginBottom: '50px' }}></div>

            <CustomFont color='#00000' font='1.8rem'>AI가 생성한 문서</CustomFont>
            <MyAnswerContainer>
            ai여기에
            </MyAnswerContainer>


            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </ContainerCenter>
  );
}