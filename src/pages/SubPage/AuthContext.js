import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState('icon_boo_big.png'); // 프로필 이미지 상태 추가

    const login = (username) => {
        setIsLoggedIn(username); // 로그인 시 사용자명을 저장
    };

    const logout = () => {
        setIsLoggedIn(false);
        setProfileImage('icon_boo_big.png'); // 로그아웃 시 기본 프로필 이미지로 설정
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
