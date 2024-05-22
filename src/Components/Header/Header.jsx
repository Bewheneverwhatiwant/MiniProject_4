import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledImg from '../Container/StyledImg';
import CustomRow from '../Container/CustomRow';
import { useAuth } from '../../pages/SubPage/AuthContext';
import CustomFont from '../Container/CustomFont';

const HeaderContainer = styled.header`
position: fixed;
top: 0;
width: 100%;
height: 6vh;
z-index: 99;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: transparent;
`;

const HeaderButton = styled.button`
background-color: transparent;
font-size: 12px;
color: #979797;
text-align: center;
justify-content: center;

border: 2px solid #D9D9D9;
border-radius: 30px;
width: 90px;
padding: 10px;
cursor: pointer;
`;

const LogoButton = styled.button`
cursor: pointer;
border: 1.5px solid #979797;
background-color: transparent;
display: flex;
align-items: center;
justify-content: center;
padding: 5px;
`

export default function Header() {

    const { isLoggedIn, logout } = useAuth();

    const navigate = useNavigate();

    const Back = () => {
        navigate('/');
    }

    const Signup = () => {
        navigate('/signuppage');
    }

    const Login = () => {
        navigate('/loginpage');
    }

    const Mypage = () => {
        navigate('/mypage');
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    // 개편된 디자인에 따라 수정 완료

    return (

        <HeaderContainer>
            <CustomRow width='97%' justifyContent='flex-end'>
                <CustomRow width='20%' justifyContent='center'>
                    {!isLoggedIn ? (
                        <>

                        </>
                    ) : (
                        <>
                            <HeaderButton onClick={Mypage}>
                                <CustomFont color='#979797' font='1rem' fontWeight='bold'>
                                    My
                                </CustomFont>
                            </HeaderButton>
                            <HeaderButton onClick={handleLogout}>
                                <CustomFont color='#979797' font='1rem' fontWeight='bold'>
                                    Logout
                                </CustomFont>
                            </HeaderButton>
                        </>
                    )}
                </CustomRow>
            </CustomRow>
        </HeaderContainer>

    );
};