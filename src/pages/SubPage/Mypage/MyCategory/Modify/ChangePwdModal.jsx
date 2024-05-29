import styled from 'styled-components';
import React, { useState } from 'react';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomRow from '../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../Components/Container/StyledImg';
import CustomModal from '../../../../../Components/Container/CustomModal';
import ChangePwdModal_New from './ChangePwdModal_New';

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

export default function ChangePwdModal({ onClose }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const isFormFilled = id && password;
    const [click, setClick] = useState(false);

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        if (isFormFilled) {
            setClick(true);
        }
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
                                    <CustomFont font='1rem' color='black'>아이디</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                                </CustomRow>
                                <InputForm placeholder='회원가입 시 등록하신 아이디를 입력하세요.' value={id} onChange={handleIdChange} />
                                {!id && <Error>필수 필드입니다.</Error>}
                            </CustomColumn>
                            <CustomColumn width='80%'>
                                <CustomRow>
                                    <CustomFont font='1rem' color='black'>현재 비밀번호</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                                </CustomRow>
                                <InputForm type='password' placeholder='현재 비밀번호를 입력하세요.' value={password} onChange={handlePasswordChange} />
                                {!password && <Error>필수 필드입니다.</Error>}
                            </CustomColumn>
                            <CustomRow width='100%' justifyContent='flex-end' alignItems='center'>
                                <Button onClick={handleSubmit} disabled={!isFormFilled}>확인</Button>
                            </CustomRow>
                        </CustomColumn>
                    </PwdDiv>
                )}
                {click && <ChangePwdModal_New userId={id} oldPassword={password} onClose={onClose} />}
            </CustomRow>
        </CustomModal>
    );
}
