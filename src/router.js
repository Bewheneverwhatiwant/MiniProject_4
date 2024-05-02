import { createBrowserRouter } from "react-router-dom";
import ForOutlet from "./pages/ForOutlet";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/SubPage/LoginPage/LoginPage";
import SignupPage from "./pages/SubPage/SignupPage/SignupPage";
import MyPage from "./pages/SubPage/Mypage/Mypage";
import Paper_hire from "./pages/MainPage/ButtonCategory/Paper_hire/Paper_hire";
import Paper_job from "./pages/MainPage/ButtonCategory/Paper_job/Paper_job";
import Paper_letter from "./pages/MainPage/ButtonCategory/Paper_letter/Paper_letter";
import Paper_notice from "./pages/MainPage/ButtonCategory/Paper_notice/Paper_notice";
import Paper_poster from "./pages/MainPage/ButtonCategory/Paper_poster/Paper_poster";
import Paper_sorry from "./pages/MainPage/ButtonCategory/Paper_sorry/Paper_sorry";
import MyAsk from "./pages/SubPage/Mypage/MyCategory/MyAsk/MyAsk";
import Paper_hire_reply from "./pages/MainPage/ButtonCategory/Paper_hire/Paper_hire_reply";

export default createBrowserRouter([
    {
        path: "/",
        element: <ForOutlet />,
        children: [
            {
                path: "",
                element: <MainPage />
            },
            {
                path: "/loginpage",
                element: <LoginPage />
            },
            {
                path: "/signuppage",
                element: <SignupPage />
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
            }
        ]
    }
]);