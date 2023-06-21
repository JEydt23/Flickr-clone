from flask import Flask, jsonify, Blueprint, redirect, request
from sqlalchemy.sql import func, select
from ..models import db, Photo, User, Comment
from ..forms import CommentForm
from flask_login import login_required, current_user
import json

comment_route = Blueprint("comments", __name__)


# CREATE NEW COMMENT FOR PHOTO

@comment_route.route('/<int:photo_id>/comments', methods=["POST"])
@login_required
def create_comment(photo_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            body=form.data['body'],
            user_id=current_user.id,
            photo_id=photo_id
        )
        db.session.add(new_comment)
        db.session.commit()
        res = new_comment.to_dict()
        res['user'] = current_user.to_dict()
        return res
    else:
        errors = {}
        for field, field_errors in form.errors.items():
            errors[field] = field_errors[0]
        return jsonify(errors), 400

    # form = CommentForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # users = User.query.filter_by(id = current_user.id).first()

    # if form.validate_on_submit():
    #     new_comment = Comment(
    #       body = form.data['body'],
    #       user_id = current_user.id,
    #       photo_id = photo_id
    #     )
    # if form.errors:
    #     print(form.errors)
    #     return "Invalid data"

    # db.session.add(new_comment)
    # db.session.commit()
    # res = new_comment.to_dict()
    # res['user'] = users.to_dict()

    # return res

# UPDATE COMMENT ROUTE

@comment_route.route('/<int:comment_id>', methods=["PUT"])
@login_required
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    # comment = Comment.query.filter_by(id = comment_id).first()
    # users = User.query.filter_by(id = current_user.id).first()
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # setattr(comment, 'body', form.data['body'])
        comment.body = form.data['body']
        db.session.commit()
        return comment.to_dict()

    if form.errors:
        print(form.errors)
        return 'Invalid Data'

    # db.session.commit()
    # return comment.to_dict()

@comment_route.route('<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    # comment = Comment.query.filter_by(id = comment_id).first()
    comment = Comment.query.get(comment_id)
    if not comment:
        return 'No comment found!'
    else:
        db.session.delete(comment)
        db.session.commit()
        return {
            'message': 'Successfully Deleted!',
            "statusCode": 200
            }
