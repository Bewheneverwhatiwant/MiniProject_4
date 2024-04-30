import styled from 'styled-components';
import CustomFont from '../../../../../Components/Container/CustomFont';

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
        <CustomFont color='black' fontWeight='bold' font='1.5rem'>잘 가, 내 캐릭터!</CustomFont>
      </PageContainer>
    </ContainerCenter>
  );
};