from flask import Flask, jsonify, Blueprint, redirect, request
from sqlalchemy.sql import func, select
from ..models import db, Photo, User, Comment
from ..forms import CommentForm
from flask_login import login_required, current_user
comment_route = Blueprint("comments", __name__)

# GET ALL COMMENTS FOR PHOTO ID

@comment_route.route('/<int:photoId>')
def get_comment(photo_id):
    print("\n \n \n XXXXXXXXXXXXXX~~~~~~~~~~~~~~~~~~~PHOTO ID ======", photo_id, "\n\n\n\n\n\n")
    result = []
    comments = Comment.query.filter_by(photo_id = photo_id).all()

    for comment in comments:
        res = comment.to_dict()
        # users = User.query.filter_by(id=res['user_id']).first()
        # res['user'] = users.to_dict()

        result.append(res)

    if len(comments) == 0:
        return "No comments for this photo"

    return jsonify(result)


# CREATE NEW COMMENT FOR PHOTO

@comment_route.route('/<int:photoId>/comments', methods=["POST"])
def create_comment(photoId):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
          body = form.data['body'],
          user_id = current_user.id,
          photo_id = photoId
        )
    if form.errors:
        return "Invalid data"
    db.session.add(new_comment)
    db.session.commit()
    res = new_comment.to_dict()

    return res
