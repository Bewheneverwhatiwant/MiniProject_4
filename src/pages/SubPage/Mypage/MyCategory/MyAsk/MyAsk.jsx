import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../Components/Container/CustomRow';
import CustomFont from '../../../../../Components/Container/CustomFont';
import axios from 'axios';
import { useAuth } from '../../../AuthContext';
import CustomCenter from '../../../../../Components/Container/CustomCenter';
import CustomModal from '../../../../../Components/Container/CustomModal';
import StyledImg from '../../../../../Components/Container/StyledImg';

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

const TitleAnswer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100px;
background-color: #DDF6CE;
border: none;
border-radius: 10px;
margin: 10px;
`;

const MyAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #FFD7D7;
  border: none;
  border-radius: 10px;
  padding: 15px;
  width: 80%;
  height: 80%;
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

const DocContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding-top: 30px;

overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8CC63F;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 10px;
  }
`;

const Xbutton = styled.button`
background-color: #D9D9D9;
border: none;
border-radius: 50px;
display: flex;
align-items: center;
justify-contents: center;
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
  background-image: url('Modal_Delete.png');
  background-size: 100% 100%;
`;

const EditModal = styled.div`
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
  background-image: url('Modal_editTitle.png');
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

const ConfirmButton = styled.button`
  background-color: #FF9292;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  color: white;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #D9D9D9;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  color: white;
  cursor: pointer;
`;

const ShareButton = styled.button`
border: none;
border-radius: 10px;
background-color: white;
color: black;
width: 80%;
padding: 5px;
cursor: pointer;
margin: 10px;
`;

const ModalOverlay_share = styled.div`
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

// 좌우 움직임 애니메이션
const moveLeftRight = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
`;

// 좌우 기울임 애니메이션
const tiltLeftRight = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-20deg);
  }
  75% {
    transform: rotate(20deg);
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

const BuyModal_share = styled.div`
  width: 600px;
  height: 400px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('Modal_share_success_back.png');
  background-size: 100% 100%;
`;

const StyledImg_tamburin = styled.img`
  width: 150px;
  height: 150px;
  animation: ${moveLeftRight} 1s infinite; /* 위아래 움직임 애니메이션 적용 */
  position: fixed;
  top: 150px;
  left: 200px;
`;

const StyledImg_Boo = styled.img`
  width: 250px;
  height: 250px;
  animation: ${moveUpDown_Boo} 1s infinite; /* 위아래 움직임 애니메이션 적용 */
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

const StyledImg_mike = styled.img`
  width: 200px;
  height: 200px;
  animation: ${tiltLeftRight} 1s infinite; /* 위아래 움직임 애니메이션 적용 */
  position: fixed;
  bottom: 0;
  left: 20px;
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
  background-color: #8CC63F;
  cursor: pointer;
`;

const IsValidButton_2 = styled.button`
  width: 30%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  color: white;
  border: none;
  border-radius: 15px;
  background-color: #FF7474;
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
    color: white;
    font-weight: bold;
  }

  &:active {
    outline: none;
  }
`;

export default function MyAsk() {
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로딩 시 스크롤을 맨 위로 설정
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('sorry');
  const [documents, setDocuments] = useState([]); // input과 output 필드를 저장
  const [selectedDocument, setSelectedDocument] = useState(null);
  const { isLoggedIn } = useAuth(); // 로그인 상태에서 사용자명을 가져옴

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  const [newTitle, setNewTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // 공유하기 클릭 시 뜨는 모달 상태 제어
  const [showGood, setShowGood] = useState(false);

  const handleGoodClick = () => {
    setShowGood(true);
    setTimeout(() => {
      setShowGood(false);
    }, 2000);
  }

  // 수정 완료 시 뜨는 모달 상태 제어
  const [editTitle, setEditTitle] = useState(false);

  const handleEditTitle = () => {
    setEditTitle(true);

    setTimeout(() => {
      setEditTitle(false);
    }, 2500);
  }

  useEffect(() => {
    if (isEditingTitle) {
      setNewTitle(''); // isEditingTitle이 true로 변경될 때 newTitle을 초기화
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (selectedDocument) {
      setNewTitle(''); // 새로운 문서를 선택할 때 newTitle을 초기화
    }
  }, [selectedDocument]);

  // '제목 수정하기' 버튼 클릭 핸들러
  const handleEditTitleClick = () => {
    setIsEditingTitle(true);
  };

  // '취소' 버튼 클릭 핸들러
  const handleCancelEditTitle = () => {
    setIsEditingTitle(false);
  };


  useEffect(() => {
    if (isLoggedIn) {
      fetchDocuments(selectedCategory);
    }
  }, [selectedCategory, isLoggedIn]);

  // input과 output 필드 정보를 동시에 가져오는 API -> 오류 해결!
  const fetchDocuments = async (category) => {
    const serverIp = process.env.REACT_APP_SERVER_IP;
    try {
      const inputResponse = await axios.get(`${serverIp}/category_doc_input`, {
        params: {
          user_name: isLoggedIn,
          type: category
        }
      });

      const outputResponse = await axios.get(`${serverIp}/category_doc_output`, {
        params: {
          user_name: isLoggedIn,
          type: category
        }
      });

      const inputDocuments = inputResponse.data;
      const outputDocuments = outputResponse.data;

      console.log('Input Documents:', inputDocuments);
      console.log('Output Documents:', outputDocuments);

      // inputDocuments와 outputDocuments를 순서대로 결합
      const combinedDocuments = inputDocuments.map((inputDoc, index) => {
        const outputDoc = outputDocuments[index];
        return { ...inputDoc, ...outputDoc };
      });

      setDocuments(combinedDocuments);
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

  const closeModal_2 = () => {
    setSelectedDocument(null);
    setIsEditingTitle(false);  // isEditingTitle을 false로 설정
  }

  // 문서 삭제 API -> user_name 필드가 string으로 고쳐지면 다시 시도해보기
  const handleDelete = async (docName, userId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const serverIp = process.env.REACT_APP_SERVER_IP;
        const url = `${serverIp}/delete_document`;
        console.log('DELETE 요청 URL:', url);
        console.log('삭제할 문서 이름:', docName);
        console.log('사용자 ID:', userId);

        // URL 인코딩 추가
        const response = await axios.delete(url, {
          params: {
            doc_name: docName,
            user_name: userId
          }
        });

        console.log('DELETE 응답:', response);

        if (response.status === 200) {
          alert('삭제되었습니다!');
          setShowDeleteModal(false); // 여기
          closeModal_2();
          setDocuments(documents.filter(doc => doc.content !== docName));
        } else {
          alert('문서 삭제에 실패했습니다.');
          setShowDeleteModal(false);
        }
      } catch (error) {
        console.error('문서 삭제 중 오류 발생:', error);
        alert('문서 삭제에 실패했습니다.');
        setShowDeleteModal(false);
      }
    }
  };

  const handleShare = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_IP}/update_is_shared`, null, {
        params: {
          user_name: isLoggedIn,
          document_name: selectedDocument.content
        }
      });

      handleGoodClick();

      console.log('공유 API 호출 성공:', response.data);
    } catch (error) {
      console.error('공유 API 호출 실패:', error);
    }
  };

  const handleTitleUpdate = async () => {
    try {
      const response = await axios.put('http://223.130.153.51:8080/update_document_name', null, {
        params: {
          doc_name: selectedDocument.content,
          user_name: isLoggedIn,
          new_doc_name: newTitle
        }
      });

      if (response.status === 200) {
        //alert('제목이 성공적으로 수정되었습니다.');
        setIsEditingTitle(false);
        handleEditTitle();
        closeModal_2(); // 모달 닫기
        fetchDocuments(selectedCategory); // 제목 수정 후 문서 목록 갱신
      } else {
        console.error('제목 수정 실패:', response);
      }
    } catch (error) {
      console.error('제목 수정 중 오류 발생:', error);
    }
  };

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomRow width='100%' justifyContent='center' alignItems='center' gap='0.1rem'>

          <CustomColumn width='30%' justifyContent='center' alignItems='center' gap='1rem'>
            <CategoryButton onClick={() => setSelectedCategory('sorry')}>
              <CustomFont color={selectedCategory === 'sorry' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                사과문
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('notice')}>
              <CustomFont color={selectedCategory === 'notice' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                보고서/시말서
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('letter')}>
              <CustomFont color={selectedCategory === 'letter' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                편지
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('poster')}>
              <CustomFont color={selectedCategory === 'poster' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                광고/포스터
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('job')}>
              <CustomFont color={selectedCategory === 'job' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                이력서
              </CustomFont>
            </CategoryButton>
            <CategoryButton onClick={() => setSelectedCategory('hire')}>
              <CustomFont color={selectedCategory === 'hire' ? '#71A62B' : 'black'} fontWeight='bold' font='1.5rem'>
                모집/채용 공고
              </CustomFont>
            </CategoryButton>
          </CustomColumn>

          <DivideLine />

          <CustomColumn width='50%' height='100vh' justifyContent='center' alignItems='flex-start'>
            <DocContainer>
              <CustomRow width='100%' alignItems='center' justifyContent='center'>
                <CustomFont font='1rem' fontWeight='bold' color='#D9D9D9'>문서를 클릭하여 모든 내용을 볼 수 있어요.</CustomFont>
              </CustomRow>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <CustomRow key={index} width='100%' justifyContent='space-between' alignItems='center'>
                    <TitleAnswer onClick={() => openModal(doc)}>

                      <CustomRow width='80%' alignItems='center' justifyContent='space-between'>
                        <CustomFont color='#71A62B' font='1.6rem' fontWeight='bold'>{doc.content}</CustomFont>
                        <Xbutton onClick={() => {
                          console.log('삭제할 문서 설정:', doc.content); // 삭제할 문서 설정 로그 출력
                          setDocToDelete(doc.content);
                          setShowDeleteModal(true);
                        }}>
                          x
                        </Xbutton>
                      </CustomRow>
                    </TitleAnswer>


                    {showDeleteModal && (

                      <>
                        <ModalOverlay show={showDeleteModal} />
                        <BuyModal>
                          <CustomRow>
                            <ConfirmButton onClick={() => handleDelete(docToDelete, isLoggedIn)}>확인</ConfirmButton>
                            <CancelButton onClick={() => setShowDeleteModal(false)}>취소</CancelButton>
                          </CustomRow>
                        </BuyModal>
                      </>
                    )}
                  </CustomRow>
                ))
              ) : (
                <CustomFont color='#00000' font='1.5rem'>
                  <CustomCenter width='100%' height='100vh'>
                    <CustomFont font='2rem' color='#D9D9D9' fontWeight='bold'>
                      아직 이 카테고리의 문서를 생성하지 않았어요.
                    </CustomFont>
                  </CustomCenter>
                </CustomFont>
              )}
            </DocContainer>
          </CustomColumn>
        </CustomRow>
      </PageContainer>

      {/* title, content도 상세 정보 아래에 추가하기 */}
      {selectedDocument && (
        <ModalOverlay>
          <CustomModal width='55%' padding='20px' onClose={closeModal_2} maxHeight='100vh'>
            <CustomColumn width='100' alignItems='center' justifyContent='center'>
              <CustomFont color='#000000' font='1.5rem'>문서 상세 정보</CustomFont>
              <MyAnswerContainer>
                <CustomFont color='#000000' font='1rem'>제목: {selectedDocument.content}</CustomFont>
                <CustomFont color='#000000' font='1rem'>대상: {selectedDocument.target}</CustomFont>
                <CustomFont color='#000000' font='1rem'>분량: {selectedDocument.amount}</CustomFont>
                <CustomFont color='#000000' font='1rem'>내용: {selectedDocument.name}</CustomFont>
                <ShareButton onClick={handleShare}>
                  <CustomRow width='90%' alignItems='center' justifyContent='space-between'>
                    <StyledImg src={'Button_share.png'} width='100px' height='50px' />
                    <CustomFont color='black' font='1rem' fontWeight='bold'>공유하기</CustomFont>
                  </CustomRow>
                </ShareButton>
                {isEditingTitle ? (
                  <CustomRow>
                    <InputForm
                      type="text"
                      placeholder="이 문서의 새로운 제목을 지어주세요."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <IsValidButton onClick={handleTitleUpdate}>
                      <CustomFont color='white' fontWeight='bold' font='1rem'>완료</CustomFont>
                    </IsValidButton>
                    <IsValidButton_2 onClick={handleCancelEditTitle}>
                      <CustomFont color='white' fontWeight='bold' font='1rem'>취소</CustomFont>
                    </IsValidButton_2>
                  </CustomRow>
                ) : (
                  <ShareButton onClick={handleEditTitleClick}>
                    <CustomRow width='90%' alignItems='center' justifyContent='space-between'>
                      <StyledImg src={'Button_editTitle.png'} width='80px' height='50px' />
                      <CustomFont color='black' font='1rem' fontWeight='bold'>제목 수정하기</CustomFont>
                    </CustomRow>
                  </ShareButton>
                )}

              </MyAnswerContainer>
            </CustomColumn>
          </CustomModal>
        </ModalOverlay>
      )}

      {
        editTitle && (
          <>
            <ModalOverlay />
            <EditModal />
          </>
        )
      }

      {showGood && (
        <>
          <ModalOverlay_share />
          <BuyModalContainer>
            <BuyModal_share>
              <StyledImg_tamburin src={'icon_tamburin.png'} />
              <StyledImg_mike src={'icon_mike.png'} />
              <StyledImg_Boo src={'icon_Boo_blush.png'} />
            </BuyModal_share>
          </BuyModalContainer>
        </>
      )}
    </ContainerCenter>
  );
}
