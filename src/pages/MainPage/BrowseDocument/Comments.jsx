// Comments.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../SubPage/AuthContext';

import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomFont from '../../../Components/Container/CustomFont';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CommentModal = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #8cc63f;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #78ab34;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CommentContainer = styled.div`
  max-height: 200px;
  overflow-y: scroll;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
`;

const CommentItem = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export default function Comments({ docName, docUserName, onClose }) {
    const [comment, setComment] = useState('');
    const { isLoggedIn, logout } = useAuth(); // useAuth를 이용하여 로그인 상태 가져오기
    const [userData, setUserData] = useState({ username: '' });
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('댓글 컴포넌트 정보 요청 시작');
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/user_total_info`);
                console.log(response.data);
                const user = response.data.find(user => user.username === isLoggedIn);
                if (user) {
                    console.log('유저 확인!');
                    setUserData({ username: user.username, });
                    console.log({ username: user.username, });
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        if (isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            if (!userData.username) {
                console.error('사용자 정보가 없습니다.');
                console.log('댓글을 달려고 하는 문서 정보는');
                console.log(docUserName);
                console.log(docName);
                return;
            }

            // 현재 로그인한 사용자의 이름을 user_name으로 사용
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_doc_id`, {
                params: { user_name: docUserName, doc_name: docName }
            });

            const docId = response.data;

            await axios.post(`${process.env.REACT_APP_SERVER_IP}/create_comment`, null, {
                params: { doc_id: docId, user_name: userData.username, content: comment }
            });

            alert('댓글을 성공적으로 작성했습니다!');
            console.log('댓글을 달려고 하는 문서 정보는');
            console.log(docUserName);
            console.log(docName);
            setComment(''); // 댓글 입력란 초기화

            // 댓글 목록 갱신
            const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_document_comments`, {
                params: { doc_id: docId }
            });
            setComments(commentsResponse.data);

        } catch (error) {
            console.error('댓글 달기 실패', error);
            console.log('댓글을 달려고 하는 문서 정보는');
            console.log(docUserName);
            console.log(docName);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_doc_id`, {
                    params: { user_name: docUserName, doc_name: docName }
                });
                const docId = response.data;
                const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_document_comments`, {
                    params: { doc_id: docId }
                });
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('댓글을 불러오는 데 실패했습니다.', error);
            }
        };

        fetchComments();
    }, [docName, docUserName]); // 모달이 열릴 때마다 댓글 목록을 가져옴

    const handleEditClick = (commentId, currentContent) => {
        setEditingCommentId(commentId);
        setNewContent(currentContent);
    };

    const handleEditChange = (e) => {
        setNewContent(e.target.value);
    };

    const handleEditSubmit = async (commentId) => {
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_IP}/update_comment`, null, {
                params: { comment_id: commentId, new_content: newContent }
            });

            alert('나의 댓글이 성공적으로 수정되었습니다!');
            setEditingCommentId(null);
            setNewContent('');

            // 댓글 목록 갱신
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_doc_id`, {
                params: { user_name: docUserName, doc_name: docName }
            });

            const docId = response.data;
            const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_document_comments`, {
                params: { doc_id: docId }
            });
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('댓글 수정 실패', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setNewContent('');
    };

    const handleDeleteClick = async (commentId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_IP}/delete_comment`, {
                params: { comment_id: commentId }
            });

            alert('댓글이 삭제되었습니다!');

            // 댓글 목록 갱신
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_doc_id`, {
                params: { user_name: docUserName, doc_name: docName }
            });

            const docId = response.data;
            const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_document_comments`, {
                params: { doc_id: docId }
            });
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('댓글 삭제 실패', error);
        }
    };

    const handleLikeClick = async (commentId) => {
        // 좋아요 클릭 시 프론트엔드 상태 즉시 업데이트
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId ? { ...comment, likeCount: (comment.likeCount || 0) + 1 } : comment
            )
        );

        try {
            await axios.put(`${process.env.REACT_APP_SERVER_IP}/update_comment_like`, null, {
                params: { comment_id: commentId }
            });

            console.log('댓글 좋아요 성공');

            // 댓글의 좋아요 수를 갱신
            const likeResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_comment_likes`, {
                params: { comment_id: commentId }
            });
            const updatedLikes = likeResponse.data.likeCount;

            // 댓글 목록 갱신
            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId ? { ...comment, likeCount: updatedLikes } : comment
                )
            );

        } catch (error) {
            console.error('댓글 좋아요 실패', error);
        }
    };


    return (
        <ModalOverlay>
            <CommentModal>
                <CustomFont font="1rem" color="black">댓글을 입력하세요:</CustomFont>
                <Input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="미풍양속을 해치지 않는 댓글을 달아주세요."
                />
                <Button onClick={handleCommentSubmit}>작성하기</Button>
                <Button onClick={onClose}>취소</Button>
                <CommentContainer>
                    {comments.length > 0 ? (
                        comments.map((commentItem, index) => (
                            <CommentItem key={index}>
                                <CustomFont color='black' font='1rem'>{commentItem.userName}</CustomFont>
                                <CustomFont color='gray' font='1rem'>{commentItem.content}</CustomFont>
                                {userData.username === commentItem.userName && (
                                    <>
                                        <Button onClick={() => handleEditClick(commentItem.id, commentItem.content)}>수정하기</Button>
                                        <Button onClick={() => handleDeleteClick(commentItem.id)}>삭제하기</Button>
                                        <Button onClick={() => handleLikeClick(commentItem.id)}>좋아요</Button>
                                        <CustomFont color='black' font='1rem'>좋아요 수: {commentItem.likeCount}</CustomFont>
                                        {editingCommentId === commentItem.id && (
                                            <>
                                                <Input
                                                    type="text"
                                                    value={newContent}
                                                    onChange={handleEditChange}
                                                    placeholder="수정할 내용을 입력하세요."
                                                />
                                                <Button
                                                    onClick={() => handleEditSubmit(commentItem.id)}
                                                    disabled={!newContent.trim()}
                                                >
                                                    수정 완료
                                                </Button>
                                                <Button onClick={handleCancelEdit}>취소</Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </CommentItem>
                        ))
                    ) : (
                        <CustomFont color='gray' font='1rem'>아직 댓글이 없습니다</CustomFont>
                    )}
                </CommentContainer>
            </CommentModal>
        </ModalOverlay>
    );
}
