import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomCenter from '../../../../../Components/Container/CustomCenter';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../Components/Container/StyledImg';
import { useAuth } from '../../../AuthContext';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
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
  background-color: #C1EEA5;
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
    color: #D9D9D9;
  }

  &:active {
    outline: none;
  }
`;

export default function CharacterComponent() {
  const [documentCount, setDocumentCount] = useState(0);
  const [nickname, setNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { isLoggedIn, profileImage, setProfileImage } = useAuth();
  const username = isLoggedIn;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      setLoading(true);
      fetchDocumentCount();
      fetchNickname().finally(() => setLoading(false));
    }
  }, [username]);

  useEffect(() => {
    console.log('nickname 상태 업데이트:', nickname);
  }, [nickname]);

  const fetchDocumentCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/document_create_count`, {
        params: { user_name: username },
      });
      setDocumentCount(response.data.count);
    } catch (error) {
      console.error('문서 생성 수 불러오기 실패', error);
    }
  };

  const fetchNickname = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_nickname`, {
        params: { user_name: username },
      });
      console.log('닉네임 조회 성공:', response.data);
      const fetchedNickname = response.data;
      // 닉네임이 존재하며, 빈 문자열이 아닐 경우 기본값을 설정하는 부분이다
      setNickname(fetchedNickname && fetchedNickname.trim() !== '' ? fetchedNickname : 'Boo의 이름을 지어주세요.');
    } catch (error) {
      console.error('닉네임 불러오기 실패', error);
      setNickname('Boo의 이름을 지어주세요.');
    }
  };

  const updateNickname = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_IP}/change_nick_name`, null, {
        params: {
          user_name: username,
          nick_name: newNickname,
        }
      });
      console.log('닉네임 변경 성공:', response.data);
      setNickname(newNickname);
      setIsEditing(false);
    } catch (error) {
      console.error('닉네임 변경 실패', error);
    }
  };

  const getImageBasedOnDocumentCount = () => {
    if (documentCount >= 1 && documentCount < 20) return 'Boo_grow_1.png';
    if (documentCount >= 20 && documentCount < 40) return 'Boo_grow_2.png';
    if (documentCount >= 40 && documentCount < 60) return 'Boo_grow_3.png';
    if (documentCount >= 60 && documentCount < 80) return 'Boo_grow_4.png';
    if (documentCount >= 80 && documentCount < 100) return 'Boo_grow_5.png';
    if (documentCount >= 100 && documentCount < 120) return 'Boo_grow_6.png';
    if (documentCount >= 120 && documentCount < 140) return 'Boo_grow_7.png';
    if (documentCount >= 140) return 'Boo_grow_8.png';
    return 'Boo_grow_1.png';
  };

  return (
    <ContainerCenter>
      <PageContainer>
        <StyledImg src={getImageBasedOnDocumentCount()} width='200px' height='200px' />
        {loading ? (
          <p>Loading...</p>
        ) : isEditing ? (
          <CustomColumn width='80%' alignItems='center' gap='10px'>
            <InputForm placeholder='새 닉네임 입력' value={newNickname} onChange={(e) => setNewNickname(e.target.value)} />
            <CustomRow width='100%' justifyContent='space-around'>
              <IsValidButton onClick={updateNickname}>확인</IsValidButton>
              <IsValidButton onClick={() => setIsEditing(false)}>취소</IsValidButton>
            </CustomRow>
          </CustomColumn>
        ) : (
          <CustomColumn width='80%' alignItems='center' justifyContent='center' gap='10px'>
            <IsValidButton onClick={() => setIsEditing(true)}>
              <CustomRow width='100%' justifyContent='space-around'>
                <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>
                  {nickname}
                </CustomFont>
                <StyledImg src={'icon_feather.png'} width='30px' height='30px' />
              </CustomRow>
            </IsValidButton>
          </CustomColumn>
        )}
      </PageContainer>
    </ContainerCenter>
  );
}
