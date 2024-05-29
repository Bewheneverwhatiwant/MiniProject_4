import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomColumn from '../../../../Components/Container/CustomColumn';
import CustomFont from '../../../../Components/Container/CustomFont';
import CustomRow from '../../../../Components/Container/CustomRow';
import StyledImg from '../../../../Components/Container/StyledImg';
import ChangePwModal_new from './ChangePwModal_new';
import CustomModal from '../../../../Components/Container/CustomModal';

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
  background-color: ${props => props.disabled ? '#D9D9D9' : '#FFC7C7'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  width: 20%;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const Error = styled.div`
  color: red;
  font-size: 0.8rem;
`;

export default function SignUpModal({ onClose }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const isFormFilled = email && id;
    const [click, setClick] = useState(false);

    const CheckFilled = () => {
        if (isFormFilled && isEmailValid) {
            setClick(true);
        }
    };

    const [isEmailValid, setIsEmailValid] = useState(true); // 이메일 유효성 상태 추가

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(validateEmail(value)); // 이메일 유효성 검사
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    return (
        <CustomModal width='60%' maxHeight='100vh' padding='20px' onClose={onClose}>
            <CustomRow width='100%' height='100%' alignItems='center' justifyContent='center' gap='2rem'>
                <StyledImg src={'icon_Boo_graduate.png'} width='300px' height='400px' />
                {!click && (
                    <PwdDiv>
                        <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>비밀번호 변경하기</CustomFont>
                            <CustomColumn width='80%'>
                                <CustomRow>
                                    <CustomFont font='1rem' color='black'>이메일</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                                </CustomRow>
                                <InputForm placeholder='회원가입 시 등록하신 이메일을 입력하세요.' value={email} onChange={handleEmailChange} />
                                {!email && <Error>필수 필드입니다.</Error>}
                                {email && !isEmailValid && <Error>이메일 양식을 알맞게 입력해주세요.</Error>}
                            </CustomColumn>
                            <CustomColumn width='80%'>
                                <CustomRow>
                                    <CustomFont font='1rem' color='black'>아이디</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                                </CustomRow>
                                <InputForm placeholder='회원가입 시 등록하신 아이디를 입력하세요.' value={id} onChange={handleIdChange} />
                                {!id && <Error>필수 필드입니다.</Error>}
                            </CustomColumn>
                            <CustomRow width='100%' justifyContent='flex-end' alignItems='center'>
                                <Button onClick={CheckFilled} disabled={!isFormFilled || !isEmailValid}>확인</Button>
                            </CustomRow>
                        </CustomColumn>
                    </PwdDiv>
                )}
                {click && <ChangePwModal_new email={email} userId={id} onClose={onClose} />}
            </CustomRow>
        </CustomModal>
    );
}
