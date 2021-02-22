from .db import db
import datetime


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False, unique=True)
    caption = db.Column(db.String(140))
    createdAt = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.relationship("User", back_populates="posts")
    photos = db.relationship("Photo", back_populates="post")
    comments = db.relationship("Comment", back_populates="post")
    likes = db.relationship("Like", back_populates="post")
