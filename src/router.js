import { createBrowserRouter } from "react-router-dom";
import ForOutlet from "./pages/ForOutlet";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/SubPage/LoginPage/LoginPage";
import MyPage from "./pages/SubPage/Mypage/Mypage";
import Paper_hire from "./pages/MainPage/ButtonCategory/Paper_hire/Paper_hire";
import Paper_job from "./pages/MainPage/ButtonCategory/Paper_job/Paper_job";
import Paper_letter from "./pages/MainPage/ButtonCategory/Paper_letter/Paper_letter";
import Paper_notice from "./pages/MainPage/ButtonCategory/Paper_notice/Paper_notice";
import Paper_poster from "./pages/MainPage/ButtonCategory/Paper_poster/Paper_poster";
import Paper_sorry from "./pages/MainPage/ButtonCategory/Paper_sorry/Paper_sorry";
import MyAsk from "./pages/SubPage/Mypage/MyCategory/MyAsk/MyAsk";
import Paper_hire_reply from "./pages/MainPage/ButtonCategory/Paper_hire/Paper_hire_reply";
import Paper_job_reply from "./pages/MainPage/ButtonCategory/Paper_job/Paper_job_reply";
import Paper_letter_reply from "./pages/MainPage/ButtonCategory/Paper_letter/Paper_letter_reply";
import Paper_notice_reply from "./pages/MainPage/ButtonCategory/Paper_notice/Paper_notice_reply";
import Paper_poster_reply from "./pages/MainPage/ButtonCategory/Paper_poster/Paper_poster_reply";
import Paper_sorry_reply from "./pages/MainPage/ButtonCategory/Paper_sorry/Paper_sorry_reply";
import BuyTicket from "./pages/SubPage/Mypage/MyCategory/CheckTicket/BuyTicket/BuyTicket";
import BrowseDocument from "./pages/MainPage/BrowseDocument/BrowseDocument";
import AdminPage from './pages/SubPage/Mypage/MyCategory/CheckTicket/AdminPage';

// 로그인화면 -> 회원가입 클릭 시 모달 -> 가입 및 로그인 완료 후 메인페이지

export default createBrowserRouter([
    {
        path: "/",
        element: <ForOutlet />,
        children: [
            {
                path: "",
                element: <LoginPage />
            },
            {
                path: "/mainpage",
                element: <MainPage />
            },
            {
                path: "/mypage",
                element: <MyPage />
            },
            {
                path: "/paper_hire",
                element: <Paper_hire />
            },
            {
                path: "/paper_job",
                element: <Paper_job />
            },
            {
                path: "/paper_letter",
                element: <Paper_letter />
            },
            {
                path: "/paper_notice",
                element: <Paper_notice />
            },
            {
                path: "/paper_poster",
                element: <Paper_poster />
            },
            {
                path: "/paper_sorry",
                element: <Paper_sorry />
            },
            {
                path: "/myask",
                element: <MyAsk />
            },
            {
                path: "/paperhirereply",
                element: <Paper_hire_reply />
            },
            {
                path: "/paperjobreply",
                element: <Paper_job_reply />
            },
            {
                path: "/paperletterreply",
                element: <Paper_letter_reply />
            },
            {
                path: "/papernoticereply",
                element: <Paper_notice_reply />
            },
            {
                path: "/paperposterreply",
                element: <Paper_poster_reply />
            },
            {
                path: "/papersorryreply",
                element: <Paper_sorry_reply />
            },
            {
                path: "/buyticketpage",
                element: <BuyTicket />
            },
            {
                path: "/browsedocumentpage",
                element: <BrowseDocument />
            },
            {
                path: "/adminpage",
                element: <AdminPage />
            }
        ]
    }
]);