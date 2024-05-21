import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomColumn from "../../../../Components/Container/CustomColumn";
import CustomFont from "../../../../Components/Container/CustomFont";
import CustomRow from "../../../../Components/Container/CustomRow";
import StyledImg from "../../../../Components/Container/StyledImg";
import CustomCenter from '../../../../Components/Container/CustomCenter';

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

const ReplyDiv = styled.div`
width: 80%;
height: 500px;
background-color: rgba(255, 199, 199, 0.5);
border-radius: 20px;
line-height: 30px;
padding: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: black;
`;

const Buttoms = styled.button`
width: ${props => props.width || '200px'};
hwight: 70px;
background-color: #FFC7C7;
border-radius: 10px;
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
border: none;
`;

const LoadingMessage = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50vh;
    height: 20vh;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

// 45도로 기울어지도록 애니메이션
const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(45deg); }
`;

// 회전, 확대, 축소 애니메이션
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

export default function Component() {

    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);

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

    const handleSaveContent = () => {
        const existingContents = JSON.parse(localStorage.getItem('savedContents')) || [];
        existingContents.push({ title, content });
        localStorage.setItem('savedContents', JSON.stringify(existingContents));
        alert('저장되었습니다.');
        setShowModal(false);
        navigate('/myask');
    };

    const showModalSaveContent = () => {
        setShowModal(true);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    return (
        <ContainerCenter>
            <PageContainer>

                <CustomCenter>
                    <CustomFont color='#8CC63F' font='2rem' fontWeight='bold'>
                        Boo가 생성한 광고/포스터가 도착했습니다!
                    </CustomFont>
                </CustomCenter>

                <ReplyDiv>
                    {content ? content : '답변이 없습니다.'}
                </ReplyDiv>

                {content && (
                    <CustomColumn width='100%' gap='1.5rem' justifyContent='center' alignItems='center'>
                        <CustomColumn width='100%' gap='1.5rem' justifyContent='center' alignItems='center'>
                            <CustomRow width='100%' gap='1.5rem' justifyContent='center' alignItems='center'>
                                <CustomFont color='black' font='1rem'>답변이 마음에 드시나요?</CustomFont>
                            </CustomRow>
                            <CustomRow width='100%' gap='1.5rem' justifyContent='center' alignItems='center'>
                                <AnimatedButton>
                                    <StyledImg src={'icon_good.png'} />
                                </AnimatedButton>
                                <AnimatedButton>
                                    <StyledImg src={'icon_bad.png'} />
                                </AnimatedButton>
                            </CustomRow>
                        </CustomColumn>
                        <CustomRow width='100%' gap='0.5rem'>
                            <Buttoms><CustomFont color="white" fontWeight='bold' onClick={copyToClipboard}>복사하기</CustomFont></Buttoms>
                            <Buttoms><CustomFont color="white" fontWeight='bold' onClick={BackToGen}>재생성하기</CustomFont></Buttoms>
                            <Buttoms onClick={showModalSaveContent}>
                                <CustomFont color="white" fontWeight='bold'>저장하기</CustomFont>
                            </Buttoms>
                        </CustomRow>
                        <Buttoms width='620px'> <CustomFont color="white" fontWeight='bold'>카카오톡으로 공유하기</CustomFont></Buttoms>
                    </CustomColumn>
                )}

                {showModal && (
                    <LoadingMessage>
                        <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='2rem'>
                            <CustomFont color='black' font='1rem'>문서를 저장할 제목을 입력해주세요.</CustomFont>
                            <InputForm value={title} onChange={handleTitleChange} />
                            <CustomRow width='100%' alignItems='center' justifyContent='center' gap='1rem'>
                                <ConfirmButton onClick={handleSaveContent} disabled={!title.trim()}>확인</ConfirmButton>
                                <CancelButton onClick={() => setShowModal(false)}>취소</CancelButton>
                            </CustomRow>
                        </CustomColumn>
                    </LoadingMessage>
                )}

            </PageContainer>
        </ContainerCenter>
    );
}