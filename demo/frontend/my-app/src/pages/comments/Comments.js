import {useEffect, useState} from "react";
import Comment from "./Comment";
import "../../styles/comment.css";
import CommentForm from "./CommentForm";

const Comments = ({currentUserId}) => {

    const [backEndComments, setBackEndComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backEndComments.filter(
        (backEndComment) => backEndComment.parentId === null
    )
    const getReplies = commendId => {
        return backEndComments.filter(backEndComments => backEndComments.parentId === commendId.toString()).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }

    const addComment = (text, parentId) =>{
        fetch('http://localhost:8080/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "body": text,
                "createdAt": new Date().getTime(),
                "parentId": parentId,
                "userId": currentUserId,
                "username": sessionStorage.getItem("name")
            })
        }).then(r => null)

        setActiveComment(null);

        window.location.reload();

    }

    const deleteComment = (commentId) =>{
        if(window.confirm('Are you sure you want to remove comment?')){
            fetch('http://localhost:8080/deleteComment/' + commentId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(() => {const updatedBackendComments = backEndComments.filter(
                backEndComment => backEndComment.id !== commentId)
                setBackEndComments(updatedBackendComments)
            })
        }
    }

    const updateComment = (text,commentId) =>{
        fetch('http://localhost:8080/editComment/' + commentId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: text
        }).then(() => {
            const updatedBackendComments = backEndComments.map(backEndComment => {
                if(backEndComment.id === commentId){
                    return {...backEndComment, body: text};
                }
                return backEndComment;
            })
            setBackEndComments(updatedBackendComments);
            setActiveComment(null);
        })
    }


    useEffect(() => {
        getComments();
    }, [])

    function getComments(){
        fetch("http://localhost:8080/getComments", {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setBackEndComments(data)
        })
    }

    return (
        <div className="comments" style={{marginTop: 100}}>
            <h3 className="comments-title">Reviews</h3>
            <div className="comment-form-title">Write Comment</div>
            {sessionStorage.getItem("name") ? <CommentForm submitLabel="Write" handleSubmit={addComment}/> : <a href="/login">Log in to write a review</a>}
            <div className="comments-container">
                {
                    rootComments.map(
                        rootComment => (
                            <Comment
                                key={rootComment.id}
                                comment={rootComment}
                                replies={getReplies(rootComment.id.toString())}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                addComment={addComment}
                                updateComment={updateComment}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
}

export default Comments;