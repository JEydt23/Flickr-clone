from flask import Flask, jsonify, Blueprint, redirect, request
from sqlalchemy.sql import func, select
from ..models import db, Photo, User, Comment
from ..forms import CommentForm
from flask_login import login_required, current_user
comment_route = Blueprint("comments", __name__)

# GET ALL COMMENTS ROUTE

@comment_route.route('/<int:photoId>')
def get_comment(photoId):
    result = []
    comments = Comment.query.filter_by(photo_id = photoId).all()

    for comment in comments:
        res = comment.to_dict()
        users = User.query.filter_by(id=res['user_id']).first()
        res['user'] = users.to_dict()

        result.append(res)
    return jsonify(result)
