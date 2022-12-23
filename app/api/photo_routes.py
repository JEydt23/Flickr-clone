from flask import Flask, jsonify, Blueprint, redirect, request
from sqlalchemy.sql import func, select
from ..models import db, Photo, User
from ..forms import PhotoForm
from flask_login import login_required, current_user
photo_route = Blueprint("photos", __name__)


# GET ALL PHOTOS ROUTE

@photo_route.route('/')
def get_all_photos():
    # print("Hi")
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
    # print("res ==== ", res)
    return jsonify({'Photos': res})



# GET PHOTO BY ID

@photo_route.route('/<int:photoId>')
def get_photo(photoId):
    photo = Photo.query.get(photoId).to_dict()

    userInfo = User.query.get(photo["user_id"])

    photo['userInfo'] = userInfo.to_dict()


    return photo

# CREATE A NEW PHOTO UPLOAD

@photo_route.route('/', methods=['POST'], strict_slashes=False)
# @login_required
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
    if form.errors:
        print(form.errors)
        return "Invalid data entered"

    db.session.add(new_photo)
    db.session.commit()

    return new_photo.to_dict()


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
