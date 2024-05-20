import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomRow from '../../Components/Container/CustomRow';
import CustomColumn from '../../Components/Container/CustomColumn';
import { useAuth } from '../SubPage/AuthContext';

const ButtonsContainer = styled.header`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 1rem;
background-color: transparent;
`;

const Button = styled.button`
background-color: ${props => props.backColor || 'white'};
color: black;
align-items: center;
justify-content: center;

border: none;
border-radius: 20px;
width: 20rem;
height: 7rem;
padding: 20px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
cursor: pointer;
`;

export default function Component() {

    const navigate = useNavigate();

    const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기

    // 로그인 여부를 확인하는 함수
    const checkLoginAndNavigate = (path) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            alert('로그인 후 모든 기능을 사용하실 수 있습니다!');
        }
    }


    return (

        <ButtonsContainer>
            <CustomColumn width='100%' alignItems='center' justifyContents='center' gap='2rem'>
                <CustomRow width='100%' alignItems='center' justifyContents='center' gap='2rem'>
                    <Button backColor='#FFEBEB' onClick={() => checkLoginAndNavigate('/paper_sorry')}>사과문</Button>
                    <Button backColor='#ECFFE0' onClick={() => checkLoginAndNavigate('/paper_notice')}>보고서</Button>
                    <Button backColor='#FFF6E0' onClick={() => checkLoginAndNavigate('/paper_letter')}>편지</Button>
                </CustomRow>

                <CustomRow width='100%' alignItems='center' justifyContents='center' gap='2rem'>
                    <Button backColor='#DFF2FF' onClick={() => checkLoginAndNavigate('/paper_poster')}>광고/포스터</Button>
                    <Button backColor='#F4E5FF' onClick={() => checkLoginAndNavigate('/paper_job')}>이력서</Button>
                    <Button backColor='#EBEBEB' onClick={() => checkLoginAndNavigate('/paper_hire')}>모집/채용공고</Button>
                </CustomRow>
            </CustomColumn>
        </ButtonsContainer>

    );
};