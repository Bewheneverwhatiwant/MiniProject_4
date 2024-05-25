// 서희님은 피그마 디자인을 바탕으로 이 컴포넌트를 만들어주세요!
// Character는 나중에 개발할 기능이니까, Boo 캐릭터를 넣어서 '곧 (Character 기능을) 만나요~' 같은 느낌으로 꾸며주세요
// import 되어있는 컴포넌트를 적극 활용하세요!
// 이 컴포넌트는 마이페이지의 '캐릭터' 탭을 눌러서 볼 수 있어요.

import styled from 'styled-components';
import CustomFont from '../../../../../Components/Container/CustomFont'; // 폰트 디자인 가능 컴포넌트
// 사용예시: <CustomFont font='2rem' color='black' fontWeight='bold>여기에 글씨</CustomFont>
//font에는 글싸의 크기를, color에는 색상을, fontWeight는 굵게하고 싶을 때 bold를 넣어 쓰세요!

import CustomCenter from '../../../../../Components/Container/CustomCenter'; // 중앙 정렬 컴포넌트
// 사용예시: <CustomCenter>중앙에 오게 만들고 싶은 아무 요소</CustomCenter>

import CustomColumn from '../../../../../Components/Container/CustomColumn'; // 세로 정렬 가능 컴포넌트
// 사용예시: <CustomColumn width='100%' alignItems='center' justifyContent='center'>세로 정렬하고 싶은 요소들</CustomColumn>
// width에는 가로 길이를(부모 컴포넌트의 가로 길이에 비례해서 길어져요) alignItems에는 세로로 center/flex-start/flex-end 중 뭔지, justifyContent는 가로로~

import CustomRow from '../../../../../Components/Container/CustomRow'; // 가로 정렬 가능 컴포넌트
// 사용예시:  <CustomRow width='100%' alignItems='center' justifyContent='center'>세로 정렬하고 싶은 요소들</CustomRow>

import StyledImg from '../../../../../Components/Container/StyledImg'; // 이미지 디자인 가능 컴포넌트
// 사용얘시: <StyledImg src={'이미지 경로.확장자'} width='가로길이' height='세로길이' />

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

export default function Component() {
  return (
    <ContainerCenter>
      <PageContainer>
      <CustomCenter>
          <StyledImg src={'icon_boo.png'} width='500px' height='480px' borderRadius='20%' />
        </CustomCenter>

        <CustomFont color='skyblue' fontWeight='bold' font='50px'>Coming Soon...!</CustomFont>
        <CustomFont color='black' fontWeight='thin' font='20px'>보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.</CustomFont>
        <CustomFont color='black' fontWeight='thin' font='20px'>빠른 시일 내에 만나요!</CustomFont>

      </PageContainer>
    </ContainerCenter>
  );
};