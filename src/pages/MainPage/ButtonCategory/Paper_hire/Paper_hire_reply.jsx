import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomColumn from "../../../../Components/Container/CustomColumn";
import CustomFont from "../../../../Components/Container/CustomFont";
import CustomRow from "../../../../Components/Container/CustomRow";
import StyledImg from "../../../../Components/Container/StyledImg";
import CustomCenter from '../../../../Components/Container/CustomCenter';
import axios from 'axios';
import { useAuth } from "../../../SubPage/AuthContext";
import CustomModal from "../../../../Components/Container/CustomModal";
import CustomChat from "../../../../Components/Container/CustomChat";

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

  align-items: center;
`;

const Buttoms = styled.button`
width: ${props => props.width || '200px'};
height: 70px;
background-color: #8CC63F;
border-radius: 10px;
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
border: none;
`;

const ConfirmButton = styled.button`
width: 80px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;

  background-color: ${props => props.disabled ? '#D9D9D9' : '#FFC7C7'};
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const CancelButton = styled.button`
width: 80px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;

  background-color: white;
  border: 1px solid #FFC7C7;
  color: #FFC7C7;
  padding: 10px;
  border-radius: 5px;
`;

const InputForm = styled.input`
  display: flex;
  border: 1.5px solid #FFC7C7;
  background-color: transparent;
  border-radius: 15px;
  width: 80%;
  height: 2rem;
  padding: 0.3rem;

  &::placeholder {
    color: #D9D9D9;
  }

  &:active {
    outline: none;
  }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(45deg); }
`;

const complexAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(45deg) scale(1); }
  50% { transform: rotate(45deg) scale(2); }
  75% { transform: rotate(45deg) scale(2); }
  100% { transform: rotate(45deg) scale(1); }
`;

const AnimatedButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-block;

  &:focus {
    outline: none;
  }

  &:active {
    animation: ${rotateAnimation} 2s ease forwards, ${complexAnimation} 2s ease forwards;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Modal보다 낮은 레이어에 설정 */
`;

const Modal = styled.div`
  position: relative;
  width: 40%;
  height: 50vh;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* Modal이 항상 위에 오도록 설정 */
  background-image: url('Modal_ComingSoon.png');
  background-size: 100% 100%;
`;

const ModalX = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  border-radius: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
`;

const StyledImg_Doc = styled.img`
  position: absolute;
  bottom: 140px;
  right: 90px;
  animation: ${moveUpDown} 1s infinite;
  width: 100px;
  height: 100px;
`;

const Modal_save = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 50vh;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* Modal이 항상 위에 오도록 설정 */
  background-image: url('Modal_SaveSuccess.png');
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

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const BadModal = styled.div`
  width: 400px;
  height: 400px;
  background-color: transparent;
  padding: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-image: url('icon_boo_wounded.png');
  background-size: cover;
  position: relative;
`;

const ReMake = styled.button`
width: 150px;
background-color: #8CC63F;
border: none;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
padding: 5px;
cursor: pointer;
`;

const Not_ReMake = styled.button`
width: 150px;
background-color: #FFBEBE;
border: none;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
padding: 5px;
cursor: pointer;
`;

const StyledImg_Ooops = styled.img`
  position: absolute;
  top: 50px;
  left: 10px;
  width: 200px;
  height: 200px;
  animation: ${rotate} 1s linear infinite;
`;

export default function Component({ onClose }) {

  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [showGood, setShowGood] = useState(false);
  const [showBad, setShowBad] = useState(false);

  const [docId_chat, setDocId_chat] = useState(null); // input 조회를 위해서
  const [formattedResponse, setFormattedResponse] = useState(null); // 포맷팅된 응답을 저장할 상태 변수

  useEffect(() => {
    // a 파일에서 저장한 문서 ID를 로컬 스토리지에서 가져옴
    const savedDocId = localStorage.getItem('doc_id');
    if (savedDocId) {
      setDocId_chat(savedDocId);
    }
  }, []);

  useEffect(() => {
    if (docId_chat) {
      const serverIp = process.env.REACT_APP_SERVER_IP;
      axios.get(`${serverIp}/get_document_input`, {
        params: {
          doc_input: docId_chat  // 문서 ID를 doc_input 값으로 사용
        }
      })
        .then(response => {
          console.log('이 문서의 input들은', response.data);
          // setApiResponse(JSON.stringify(response.data)); // API 응답을 상태 변수에 저장
          const data = response.data;

          // 응답 데이터를 원하는 형식으로 포맷팅
          const formattedData = `
문서 종류: ${data.type},
보여주는 사람: ${data.target},
문서 분량: ${data.amount},
내가 보낸 내용: ${data.text}.
BOO, 내가 원하는 문서를 생성해줘!
                `;
          setFormattedResponse(formattedData); // 포맷팅된 응답을 상태 변수에 저장
        })
        .catch(error => {
          console.error('API Error:', error.response ? error.response.data : error.message);
        });
    }
  }, [docId_chat]);

  const handleGoodClick = () => {
    setShowGood(true);
    setTimeout(() => {
      setShowGood(false);
    }, 2500);
  }

  const handleBadClick = () => {
    setShowBad(true);
  }

  const handleRemake = () => {
    setShowBad(false);
    navigate('/paper_hire');
  }

  const handleNotRemake = () => {
    setShowBad(false);
  }

  // 저장 오류 해결!
  const { isLoggedIn, logout } = useAuth(); // useAuth를 이용하여 로그인 상태 가져오기
  const [userData, setUserData] = useState({ username: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/user_total_info`);
        const user = response.data.find(user => user.username === isLoggedIn);
        if (user) {
          setUserData({ username: isLoggedIn });
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const storedContent = localStorage.getItem('content');
    if (storedContent) {
      setContent(storedContent);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    alert("문서가 복사되었습니다.");
  };

  const BackToGen = () => {
    navigate('/paper_hire');
  }

  const [showComingsoon, setShowcomingsoon] = useState(false);

  const Soon = () => {
    setShowcomingsoon(true);
  }

  const SoonX = () => {
    setShowcomingsoon(false);
  }

  const handleSaveContent = () => {
    const existingContents = JSON.parse(localStorage.getItem('savedContents')) || [];
    existingContents.push({ title, content });
    localStorage.setItem('savedContents', JSON.stringify(existingContents));
    setSaveModal(true); // 여기다가 추가해야 하는 거였음
    setShowModal(false);
  };

  useEffect(() => {
    let timer;
    if (saveModal) {
      timer = setTimeout(() => {
        navigate('/myask');
      }, 2500); // 2.5초 후(아직 saveModal이 true일 때)에 navigate 실행
    }
    return () => clearTimeout(timer); // 타이머 클리어
  }, [saveModal]);

  useEffect(() => {
    if (saveModal) {
      console.log('saveModal is true');
      const timer = setTimeout(() => {
        console.log('3초 후 saveModal을 false로 설정');
        setSaveModal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveModal]);

  const showModalSaveContent = () => {
    setShowModal(true);
  }

  const CloseModal = () => {
    setShowModal(false);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleApiSave = async () => {
    const serverIp = process.env.REACT_APP_SERVER_IP;
    const docId = localStorage.getItem('doc_id'); // 서버에서 doc_id 받아오는 걸로 바꾸기

    if (!docId) {
      alert('doc_id가 없습니다. 다시 시도해 주세요.');
      return;
    }

    console.log('요창된 데이터는', { doc_id: docId, document_name: title, content: content, user_name: userData.username });

    try {
      const response = await axios.post(`${serverIp}/save_doc_output`, null, {
        params: {
          user_name: userData.username,
          doc_id: docId,
          document_name: title,
          content: encodeURIComponent(content)
        }
      });

      console.log('API 응답은?', response.data);
      //alert('저장되었습니다!');
      handleSaveContent();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <ContainerCenter>
      <PageContainer>

        <CustomCenter>
          <CustomFont color='#8CC63F' font='2rem' fontWeight='bold'>
            Boo가 생성한 모집/공고문이 도착했습니다!
          </CustomFont>
        </CustomCenter>

        {formattedResponse && (
          <CustomChat isMe={true} text={formattedResponse} />
        )}
        {content ? (
          <CustomChat text={content} isMe={false} />
        ) : (
          '답변이 없습니다.'
        )}

        {content && (
          <CustomColumn width='100%' gap='1.5rem' justifyContent='center' alignItems='center'>
            <CustomColumn width='100%' gap='1.5rem' justifyContent='center' alignItems='center'>

              <CustomRow width='100%' gap='1.5rem' justifyContent='center' alignItems='center'>
                <AnimatedButton onClick={handleGoodClick}>
                  <StyledImg src={'icon_good.png'} />
                </AnimatedButton>
                <AnimatedButton onClick={handleBadClick}>
                  <StyledImg src={'icon_bad.png'} />
                </AnimatedButton>
              </CustomRow>
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

              {showBad && (
                <>
                  <ModalOverlay />
                  <BuyModalContainer>
                    <BadModal>
                      <StyledImg_Ooops src={'icon_Ooops.png'} />
                      <CustomRow>
                        <ReMake onClick={handleRemake}>
                          <CustomFont color='white' fontWeight='bold' font='1rem'>재생성하기</CustomFont>
                        </ReMake>
                        <Not_ReMake onClick={handleNotRemake}>
                          <CustomFont color='white' fontWeight='bold' font='1rem'>취소</CustomFont>
                        </Not_ReMake>
                      </CustomRow>
                    </BadModal>
                  </BuyModalContainer>
                </>
              )}
            </CustomColumn>
            <CustomRow width='100%' gap='0.5rem'>
              <Buttoms><CustomFont color="white" fontWeight='bold' onClick={copyToClipboard}>복사하기</CustomFont></Buttoms>
              <Buttoms><CustomFont color="white" fontWeight='bold' onClick={BackToGen}>재생성하기</CustomFont></Buttoms>
              <Buttoms onClick={showModalSaveContent}>
                <CustomFont color="white" fontWeight='bold'>저장하기</CustomFont>
              </Buttoms>
            </CustomRow>
            <Buttoms width='620px' onClick={Soon}> <CustomFont color="white" fontWeight='bold'>카카오톡으로 공유하기</CustomFont></Buttoms>
          </CustomColumn>
        )}

        {
          showComingsoon && (
            <Overlay onClick={SoonX}>
              <Modal>
                <ModalX onClick={SoonX}>X</ModalX>
              </Modal>
            </Overlay>
          )
        }

        {showModal && (
          <CustomModal width='30%' maxHeight='100vh' padding='20px' onClose={CloseModal}>
            <CustomColumn width='100%' alignItems='center' justifyContent='center'>
              <CustomFont color='black' font='1rem'>문서를 저장할 제목을 입력해주세요.</CustomFont>
              <InputForm value={title} onChange={handleTitleChange} />
              <CustomRow width='100%' alignItems='center' justifyContent='center' gap='1rem'>
                <ConfirmButton onClick={handleApiSave} disabled={!title.trim()}>확인</ConfirmButton>
                <CancelButton onClick={() => setShowModal(false)}>취소</CancelButton>
              </CustomRow>
            </CustomColumn>
          </CustomModal>
        )}

        {
          saveModal && (
            <>
              <ModalOverlay />
              <Modal_save>
                <StyledImg_Doc src={'icon_Doc.png'} />
              </Modal_save>
            </>
          )
        }

      </PageContainer>
    </ContainerCenter>
  );
}
