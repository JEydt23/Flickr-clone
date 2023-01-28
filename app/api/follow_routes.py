from flask import Flask, jsonify, Blueprint
from ..models import db, User, follows
from flask_login import login_required, current_user

follow_route = Blueprint("follows", __name__)

# GET A LIST OF PEOPLE THAT I (THE USER) FOLLOW

@follow_route.route('/<int:user_id>/follower')
@login_required
def get_list_follower(user_id):
    user = User.query.get(user_id)

    following_users_query = user.followers.all()
    following_users = [user.to_dict() for user in following_users_query]

    return {'Followers': following_users}

# GET A LIST OF PEOPLE THAT ARE FOLLOWING YOU (THE USER)

@follow_route.route('/<int:user_id>/following')
@login_required
def get_list_following(user_id):
    user = User.query.get(user_id)
    following_users_query = user.following.all()
    following_users = [user.to_dict() for user in following_users_query]
    total_followers = len(following_users)
    return {'Followers' : following_users, "totalFollowers" : total_followers}


# FOLLOW ANOTHER USER

@follow_route.route('/<int:user_id>', methods=['POST'])
@login_required
def add_follower(user_id):
    following_user = User.query.get(current_user.id)
    followed_user = User.query.get(user_id)

    if followed_user.following.filter(follows.c.followerId == following_user.id).count() > 0:
        return { "Error" : "You are already following this user"}

    followed_user.following.append(following_user)
    db.session.commit()
    following_user_query = followed_user.following.all()
    following_users = [user.to_dict() for user in following_user_query]

    total_followers = len(following_users)
    return jsonify({'Follower': following_user.to_dict(), "totalFollowers": total_followers})

# UNFOLLOW ANOTHER USER

@follow_route.route('/<int:user_id>', methods=['DELETE'])
@login_required
def delete_follower(user_id):
    following_user = User.query.get(current_user.id)
    followed_user = User.query.get(user_id)
    if followed_user.following.filter(follows.c.followerId == following_user.id).count() <= 0:
        return { "error": "User does not follow this user yet"}

    followed_user.following.remove(following_user)

    db.session.commit()

    return { "message": "Succesfully unfollowed"}
