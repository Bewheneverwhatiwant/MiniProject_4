import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState('icon_boo_big.png');

    const fetchProfileImage = async (username) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_profile`, {
                params: { user_name: username },
                responseType: 'blob'
            });
            if (response.status === 200) {
                const imageUrl = URL.createObjectURL(response.data);
                setProfileImage(imageUrl);
            } else {
                setProfileImage('icon_boo_big.png');
            }
        } catch (error) {
            console.error("프로필 이미지 불러오기 실패", error);
            setProfileImage('icon_boo_big.png');
        }
    };

    const login = (username) => {
        setIsLoggedIn(username);
        fetchProfileImage(username);  // 로그인 시 프로필 이미지 로드
    };

    const logout = () => {
        setIsLoggedIn(false);
        setProfileImage('icon_boo_big.png');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, profileImage, setProfileImage }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
