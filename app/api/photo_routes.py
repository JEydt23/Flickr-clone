from flask import Flask, jsonify, Blueprint, redirect, request
from sqlalchemy.sql import func, select
from ..models import db, Photo, User, Comment, Like
from ..forms import PhotoForm, LikeForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from .aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
            "likesComments": photo.to_dict_likes(),
            "User": {
                "id": photoUser.id,
                "username": photoUser.username,
                "first_name": photoUser.first_name,
                "last_name": photoUser.last_name,
            },

        })

    return jsonify({'Photos': res})



# GET PHOTO BY ID

@photo_route.route('/<int:photoId>')
def get_photo(photoId):
    photo = Photo.query.get(photoId).to_dict()
    likes = Like.query.filter_by(photo_id = photoId).all()
    userInfo = User.query.get(photo["user_id"])
    followers = userInfo.following.all()

    photo['totalLikes'] = len(likes)
    photo['userInfo'] = userInfo.to_dict()
    # photo['totalFollowers'] = [follower.to_dict() for follower in followers]


    return photo

# GET PHOTOS OF ALL USERS YOU FOLLOW

@photo_route.route('/user/<int:user_id>/following')
@login_required
def get_photos_by_follower(user_id):
    res = []
    user = User.query.get(user_id)
    following_users = user.followers.all()


    following_users_ids = [user.to_dict()['id'] for user in following_users]
    print("FOLLOWING USERS IDS ========== ", following_users_ids)
    for id in following_users_ids:

        following_user_photos_class = Photo.query.filter_by(user_id = id)
        # following_user_photos = photo.to_dict() for photo in following_user_photos_class]
        print("FOLLOWING USER PHOTOS CLASS ======= ", following_user_photos_class)
        for photo in following_user_photos_class:
            photo_dict = photo.to_dict()
            user = User.query.get(id).to_dict()
            print("PHOTO_DICT ====== ", photo_dict)
            res.append({
                "id": photo_dict['id'],
                "user_id": photo_dict['user_id'],
                "title": photo_dict['title'],
                "description": photo_dict['description'],
                "file_path": photo_dict['file_path'],
                "date_uploaded": photo_dict['date_uploaded'],
                "tags": photo_dict['tags'],
                 "likesComments": photo.to_dict_likes(),
                "User": {
                    "id": user['id'],
                    "username": user['username'],
                    "first_name": user['first_name'],
                    "last_name": user['last_name'],
                },
            })

    return {'Photos': res}

# CREATE A NEW PHOTO UPLOAD

@photo_route.route('/', methods=['POST'])
@login_required
def create_photo():
    print(request, "XXXXXXXXXXX IS THIS WHATS WRONG? XXXXXXXXXXXXXXXXXXXXXXX")

    if "photo" not in request.files:
        return {"errors": "photo required"}, 400

    photo = request.files["photo"]

    if not allowed_file(photo.filename):
        return {"errors": "file type not permitted"}, 400

    photo.filename = get_unique_filename(photo.filename)

    upload = upload_file_to_s3(photo)
    print("DIS BE DA UPLOAD  +++++++++++ ", upload)

    if "url" not in upload:
        # if the dictionary doesn't have a file_path key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        print("ZZZZZZZZZZZZZZZZZZZZZZ IS THIS WHATS WRONG? ZZZZZZZZZZZZZZZZZ")
        return upload, 400

    # url = upload["url"]
    # flask_login allows us to get the current user from the request



    # form = PhotoForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     new_photo = Photo(
    #     user_id = current_user.id,
    #     title = form.data["title"],
    #     description = form.data["description"],
    #     file_path = form.data["file_path"],
    #     tags = form.data["tags"]
    # )

    user_id = current_user.id
    title = request.form['title']
    description = request.form['description']
    file_path = upload['url']
    tags = request.form['tags']

    new_photo = Photo(
        user_id = user_id,
        title = title,
        description = description,
        file_path = file_path,
        tags = tags
    )
    db.session.add(new_photo)
    db.session.commit()
    return new_photo.to_dict()

    # if form.errors:
    #     print("***********", form.errors)
    #     return {"error" : validation_errors_to_error_messages(form.errors)}, 401

    # return {"error" : "Field required."}



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


# CREATE A LIKE FOR A PHOTO BY PHOTO ID

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

# REMOVE A LIKE FROM A PHOTO BY PHOTO ID

@photo_route.route('/likes/<int:photo_id>', methods=['DELETE'])
@login_required
def remove_photo_like(photo_id):
    like = Like.query.filter_by(photo_id = photo_id).first()
    print("DID WE HIT THIS ROUTE WHEN DELETING A LIKE?")

    if not like:
        return ("No Like Found.")
    else:
        db.session.delete(like)
        db.session.commit()
        return {
            "message": "Successfully Deleted!",
            "statusCode":200
            }
