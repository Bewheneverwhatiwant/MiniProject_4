import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomFont from '../../../Components/Container/CustomFont';
import CustomRow from '../../../Components/Container/CustomRow';
import StyledImg from '../../../Components/Container/StyledImg';
import CustomModal from '../../../Components/Container/CustomModal';

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

const PwdDiv = styled.div`
  background-color: #ECFFE0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px;
  width: 50%;
`;

const Button = styled.button`
  background-color: #FFC7C7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  width: 20%;
`;

const Error = styled.div`
  color: red;
  font-size: 0.8rem;
`;

export default function FindIdModal({ onClose }) {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [click, setClick] = useState(false);

    const CheckFilled = () => {
        if (id) {
            setClick(true);
        }
    }

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText('lny021102').then(() => {
            alert('아이디가 클립보드에 복사되었습니다.');
        }).catch((err) => {
            alert('클립보드 복사에 실패했습니다.');
            console.error('클립보드 복사 실패:', err);
        });
    };

    return (
        <CustomModal width='60%' height='50vh' padding='20px' onClose={onClose}>
            <CustomRow width='100%' height='100%' alignItems='center' justifyContent='center' gap='2rem'>
                <StyledImg src={'icon_Boo_graduate.png'} width='300px' height='400px' />
                {!click && (
                    <PwdDiv>
                        <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>아이디 찾기</CustomFont>
                            <CustomColumn width='80%'>
                                <CustomRow>
                                    <CustomFont font='1rem' color='black'>이메일</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                                </CustomRow>
                                <InputForm placeholder='회원가입 시 등록하신 이메일을 입력하세요.' value={id} onChange={handleIdChange} />
                                {!id && <Error>필수 필드입니다.</Error>}
                            </CustomColumn>
                            <CustomRow width='100%' justifyContent='flex-end' alignItems='center'>
                                <Button onClick={CheckFilled}>확인</Button>
                            </CustomRow>
                        </CustomColumn>
                    </PwdDiv>
                )}
                {click && (
                    <PwdDiv>
                        <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>아이디 찾기</CustomFont>
                            <CustomColumn width='80%'>
                                <CustomRow>
                                    <CustomRow>
                                        <CustomFont color='black' font='1rem'>회원님의 아이디는</CustomFont>
                                        <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>lny021102</CustomFont>
                                        <CustomFont color='black' font='1rem'>입니다.</CustomFont>
                                    </CustomRow>
                                    <Button onClick={copyToClipboard}>아이디 복사</Button>
                                </CustomRow>
                                <Button onClick={onClose}>닫기</Button>
                            </CustomColumn>
                        </CustomColumn>
                    </PwdDiv>
                )}
            </CustomRow>
        </CustomModal>
    );
}
