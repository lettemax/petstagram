from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..helpers import *
from ..config import Config
from app.models import Comment, Post, Like, User, db
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def getAllComments():
    comments = Comment.query.all()
    # comments = Comment.query.filter_by(postId=post_id).all()
    comments_formatted = []
    def comment_info(self, like_count, username, photo):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": self.userId,
            "content": self.content,
            "likes": like_count,
            "createdAt": self.createdAt,
            "username": username,
            "photo": photo,
        }
    for comment in comments:
        likes = Like.query.filter(Like.commentId == comment.id).all()
        like_count = len(likes)
        username = comment.user.username
        photo = comment.user.profilePhotoUrl
        comments_formatted.append(comment_info(comment, like_count, username, photo))


    return {"comments": comments_formatted}


@comment_routes.route('/<int:post_id>', methods=["POST"])
# @login_required
def createComment(post_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    def comment_info(self):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": current_user.id,
            "content": self.content,
            "likes": 0,
            "createdAt": self.createdAt,
            "username": current_user.username,
            "photo": current_user.profilePhotoUrl,
        }

    if form.validate_on_submit():
        commentData = request.form.get('content')
        comment = Comment(
            postId=post_id,
            userId=current_user.id,
            content=commentData
        )
        db.session.add(comment)
        db.session.commit()

        return comment_info(comment)
    return "Bad Data"


@comment_routes.route('/delete/<int:comment_id>', methods=["GET"])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment.userId == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return 'delete comment'
    else:
        return 'not allowed to delete this comment'


@comment_routes.route('/edit/<int:comment_id>', methods=["POST"])
@login_required
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment.userId == current_user.id:
        print("<<<<<<==============>>>>>>>", request.data.decode('ascii'))
        comment.content = request.data.decode('ascii')
        db.session.add(comment)
        db.session.commit()
        return 'edited comment'
    else:
        return 'not allowed to edit this comment'
