import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../Components/Container/CustomRow';
import CustomFont from '../../../../../Components/Container/CustomFont';
import axios from 'axios';
import { useAuth } from '../../../AuthContext';

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
  height: 50vh;
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
  padding: 15px;
  width: 100%;
  height: 30%;
  line-height: 1.5;
  margin-top: 10px;
  overflow-y: auto; // 스크롤 활성화
  scrollbar-width: thin;
  scrollbar-color: white #FFD7D7;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #FFD7D7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 10px;
    border: 3px solid #FFD7D7;
  }
`;

export default function MyAsk() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('sorry');
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const { isLoggedIn } = useAuth(); // 로그인 상태에서 사용자명을 가져옴

  useEffect(() => {
    if (isLoggedIn) {
      fetchDocuments(selectedCategory);
    }
  }, [selectedCategory, isLoggedIn]);

  const fetchDocuments = async (category) => {
    const serverIp = process.env.REACT_APP_SERVER_IP;
    try {
      const response = await axios.get(`${serverIp}/category_documents`, {
        params: {
          user_name: isLoggedIn,
          type: category
        }
      });
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const openModal = (document) => {
    setSelectedDocument(document);
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

          <CustomColumn width='50%' height='100vh' justifyContent='center' alignItems='flex-start'>
            {documents.map((doc, index) => (
              <MyAnswerContainer key={index} onClick={() => openModal(doc)}>
                <CustomFont color='#00000' font='1rem'>제목: {doc.name}</CustomFont>
                <CustomFont color='#00000' font='1rem'>대상: {doc.target}</CustomFont>
                <CustomFont color='#00000' font='1rem'>분량: {doc.amount}</CustomFont>
                <CustomFont color='#00000' font='1rem'>내용: {doc.text}</CustomFont>
              </MyAnswerContainer>
            ))}
          </CustomColumn>
        </CustomRow>
      </PageContainer>

      {selectedDocument && (
        <ModalOverlay show={modalVisible} onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CustomFont color='#000000' font='1.5rem'>문서 상세 정보</CustomFont>
            <MyAnswerContainer>
              <CustomFont color='#000000' font='1rem'>제목: {selectedDocument.name}</CustomFont>
              <CustomFont color='#000000' font='1rem'>대상(target): {selectedDocument.target}</CustomFont>
              <CustomFont color='#000000' font='1rem'>분량(amount): {selectedDocument.amount}</CustomFont>
              <CustomFont color='#000000' font='1rem'>내용(text): {selectedDocument.text}</CustomFont>
            </MyAnswerContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </ContainerCenter>
  );
}
