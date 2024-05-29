import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomRow from '../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../Components/Container/StyledImg';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 100vh;
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
  min-height: 100vh;
`;

const RefundItem = styled.div`
  width: 80%;
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function Component() {
    const [refunds, setRefunds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 로딩 시 스크롤을 맨 위로 설정

        const fetchRefunds = async () => {
            try {
                const response = await axios.get('http://223.130.153.51:8080/get_refunded_doc');
                if (response.data && response.data.length > 0) {
                    setRefunds(response.data);
                } else {
                    setRefunds([]);
                }
            } catch (error) {
                console.error('환불 내역을 가져오는 중 오류 발생:', error);
                setRefunds([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRefunds();
    }, []);

    return (
        <ContainerCenter>
            <PageContainer>
                <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                    <CustomFont font='1.5rem' fontWeight='bold'>관리자 페이지</CustomFont>
                    <CustomFont font='1rem'>환불 내역을 get한 응답값을 반복 출력한다.</CustomFont>

                    {loading ? (
                        <CustomFont font='1rem'>로딩 중...</CustomFont>
                    ) : (
                        refunds.length > 0 ? (
                            refunds.map((refund, index) => (
                                <RefundItem key={index}>
                                    <CustomFont font='1rem' fontWeight='bold' color='black'>문서id: {refund.id}</CustomFont>
                                    <CustomFont font='1rem' color='black'>사용자가 요청한 내용: {refund.setContent}</CustomFont>
                                    <CustomFont font='1rem' color='black'>gpt 생성 내용: {refund.content}</CustomFont>
                                    <CustomFont font='1rem' color='black'>생성 시각: {refund.createdAt}</CustomFont>
                                    <CustomFont font='1rem' color='black'>userid: {refund.user_id}</CustomFont>
                                </RefundItem>
                            ))
                        ) : (
                            <CustomFont font='1rem'>아직 환불을 신청한 사용자가 없습니다.</CustomFont>
                        )
                    )}
                </CustomColumn>
            </PageContainer>
        </ContainerCenter>
    );
};
