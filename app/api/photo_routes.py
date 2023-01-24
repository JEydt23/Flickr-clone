from flask import Flask, jsonify, Blueprint, redirect, request
from sqlalchemy.sql import func, select
from ..models import db, Photo, User, Comment, Like
from ..forms import PhotoForm, LikeForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

photo_route = Blueprint("photos", __name__)


# GET ALL PHOTOS ROUTE

@photo_route.route('/')
def get_all_photos():

    photos = Photo.query.all()
    res = []
    for photo in photos:

        photoUser = User.query.filter_by(id=photo.user_id).first()

        res.append({
            "id": photo.id,
            "user_id": photo.user_id,
            "title": photo.title,
            "description": photo.description,
            "file_path": photo.file_path,
            "date_uploaded": photo.date_uploaded,
            "tags": photo.tags,
            "User": {
                "id": photoUser.id,
                "username": photoUser.username,
                "first_name": photoUser.first_name,
                "last_name": photoUser.last_name,

            }
        })

    return jsonify({'Photos': res})



# GET PHOTO BY ID

@photo_route.route('/<int:photoId>')
def get_photo(photoId):
    photo = Photo.query.get(photoId).to_dict()

    userInfo = User.query.get(photo["user_id"])

    photo['userInfo'] = userInfo.to_dict()


    return photo

# CREATE A NEW PHOTO UPLOAD

@photo_route.route('/', methods=['POST'])
@login_required
def create_photo():
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_photo = Photo(
            user_id = current_user.id,
            title = form.data["title"],
            description = form.data["description"],
            file_path = form.data["file_path"],
            tags = form.data["tags"]
        )
        db.session.add(new_photo)
        db.session.commit()
        return new_photo.to_dict()

    if form.errors:
        print("***********", form.errors)
        return {"error" : validation_errors_to_error_messages(form.errors)}, 401

    return {"error" : "Field required."}



# UPDATE AN UPLOADED PHOTO

@photo_route.route('/<int:photoId>', methods=['PUT'])
# @login_required
def update_photo(photoId):
    photo = Photo.query.filter_by(id = photoId).first()
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        setattr(photo, "title", form.data['title'])
        setattr(photo, "description", form.data["description"])
        setattr(photo, "file_path", form.data["file_path"])
        setattr(photo, "tags", form.data["tags"])

    # if form.errrors:
    #     print(form.errors)
    #     return "Invalid data entered."

    db.session.commit()
    return photo.to_dict()


# DELETE A PHOTO

@photo_route.route('/<int:photoId>', methods=['DELETE'])
# @login_required
def delete_photo(photoId):
    photo = Photo.query.filter_by(id = photoId).first()
    if not photo:
        return ("No Photo Found.")
    else:
        db.session.delete(photo)
        db.session.commit()
        return {
            "message": "Successfully Deleted!",
            "statusCode":200
            }


# GET ALL COMMENTS FOR PHOTO ID

@photo_route.route('/<int:photo_id>/comments')
def get_comment(photo_id):
    comments = Comment.query.filter_by(photo_id = photo_id).all()

    return { "comments" : [comment.to_dict() for comment in comments] }


    # for comment in comments:
    # print("\n \n \n XXXXXXXXXXXXXX~~~~~~~~~~~~~~~~~~~PHOTO ID ======", photo_id, "\n\n\n\n\n\n")
    # result = []
    #     res = comment.to_dict()
    #     users = User.query.filter_by(id=res['user_id']).first()
    #     res['user'] = users.to_dict()

    #     result.append(res)

    # if len(comments) == 0:
    #     return "No comments for this photo"


# CREATE A LIKE FOR A PHOTO

@photo_route.route('/likes/<int:photo_id>', methods=['POST'])
@login_required
def create_photo_like(photo_id):
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['user_id'].data = current_user.id
    form['photo_id'].data = photo_id
    if form.validate_on_submit():
        new_like = Like(
            user_id = current_user.id,
            photo_id = photo_id
        )
    if form.errors:
        print("Form Errors ======== ", form.errors)
        return "Invalid data."
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()
