import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomFont from '../../../Components/Container/CustomFont';
import CustomRow from '../../../Components/Container/CustomRow';
import StyledImg from '../../../Components/Container/StyledImg';
import CustomModal from '../../../Components/Container/CustomModal';
import axios from 'axios';

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
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [click, setClick] = useState(false);
    const [error, setError] = useState('');

    const handleIdChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFindId = async () => {
        if (!email) {
            setError('필수 필드입니다.');
            return;
        }

        try {
            const serverIp = process.env.REACT_APP_SERVER_IP;
            const response = await axios.get(`${serverIp}/find_id`, {
                params: {
                    user_email: email
                }
            });
            console.log('API 응답 데이터:', response.data); // 응답 데이터 구조 확인을 위한 로그
            setUserId(response.data); // 응답 데이터에서 아이디 추출
            setClick(true);
        } catch (error) {
            console.error('Error finding ID:', error);
            setError('아이디 찾기에 실패했습니다.');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(userId).then(() => {
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
                                <InputForm placeholder='회원가입 시 등록하신 이메일을 입력하세요.' value={email} onChange={handleIdChange} />
                                {error && <Error>{error}</Error>}
                            </CustomColumn>
                            <CustomRow width='100%' justifyContent='flex-end' alignItems='center'>
                                <Button onClick={handleFindId}>확인</Button>
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
                                        <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>{userId}</CustomFont>
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
