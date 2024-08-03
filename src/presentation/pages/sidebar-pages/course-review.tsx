import React, { useEffect, useState } from 'react';
import { db } from '@/domain/config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { MAluno } from '@/domain/models/aluno-model';
import { User } from 'firebase/auth';
import { users } from '@/utils/image-exporter';
import { DateUtils } from '@/utils/dateutils';

interface Comment {
    id: string;
    userId: string;
    userName: string;
    pic: string
    content: string;
    timestamp: number;
}

interface CommentSectionProps {
    courseId: string | undefined;
    lessonId: string | undefined;
    user: (User & MAluno) | null
}

export const CommentSection: React.FC<CommentSectionProps> = ({ courseId, lessonId, user }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    useEffect(() => {
        const fetchComments = async () => {
            if (courseId && lessonId) {
                const commentsRef = collection(db, 'courses', courseId, 'lessons', lessonId, 'comments');
                const snapshot = await getDocs(commentsRef);
                const fetchedComments = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Comment[];
                setComments(fetchedComments);
            }
        };

        fetchComments();
    }, [courseId, lessonId]);

    const handleCommentSubmit = async () => {
        if (newComment.trim() && courseId && lessonId) {
            const commentsRef = collection(db, 'courses', courseId, 'lessons', lessonId, 'comments');
            await addDoc(commentsRef, {
                userId: user?.uid,
                userName: user?.displayName,
                content: newComment,
                pic: user?.photoURL,
                timestamp: Date.now(),
            });
            setNewComment('');
            const snapshot = await getDocs(commentsRef);
            const fetchedComments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Comment[];
            setComments(fetchedComments);
        }
    };

    return (
        <div className="comment-section">
            <h3 className="text-lg font-bold dark:text-white">Comentários</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id} className="comment dark:text-white bg-slate-100/50 dark:bg-slate-100/10 my-4 px-2 py-2 rounded-md">
                        <p>
                            <div className="flex gap-2">
                                <img src={comment?.pic || users.user_default} alt={comment.userName} className="w-7 h-7 rounded-full border border-primary" />
                                <strong>{comment.userName} </strong>
                            </div>
                            <span className="hacker text-sm ms-6">
                                {comment.content}
                            </span>

                        </p>
                        <div className='text-end'>
                            <span className='text-xs hacker'>{DateUtils.formatDateToPTSecond(new Date(comment.timestamp))}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Adicione um comentário..."
                rows={4}
                className="w-full dark:bg-transparent dark:text-white mt-2 p-2 border outline-none focus-within:border-2 focus-within:border-primary  rounded"
            />
            <div className='text-end'>
                <button onClick={handleCommentSubmit} className="mt-2 px-4 py-1 ms-auto bg-primary text-black rounded">
                    Enviar
                </button>
            </div>
            <br />
            <br />
            <br />

        </div>
    );
};
