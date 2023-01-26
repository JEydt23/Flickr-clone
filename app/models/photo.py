from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .join import like


class Photo(db.Model):
    __tablename__ = "photos"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(), nullable=False)
    date_uploaded = db.Column(db.DateTime, server_default=db.func.now())
    tags = db.Column(db.String(100))

    users = db.relationship("User", back_populates="photos")
    comments = db.relationship("Comment", back_populates="photos", cascade="all, delete")
    likes = db.relationship("Like", back_populates="photos", cascade="all, delete")

    # liked_by_user = db.relationship("User", back_populates="liked_photos", secondary=like, lazy="joined")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "file_path": self.file_path,
            "date_uploaded": self.date_uploaded,
            "tags": self.tags,
            # "liked_by_users": {user.to_dict()['id']: user.to_dict() for user in self.liked_by_user},
            # "likes": len(self.liked_by_user),
            'userLikes': [like.to_dict() for like in self.likes],
            "comments": [comment.to_dict() for comment in self.comments]
        }

    def to_dict_likes(self):
        return {
            # 'user': self.users.to_dict(),
            # 'userLikes': [like.to_dict() for like in self.likes],
            # "id": self.id,
            # "user_id": self.user_id,
            # "title": self.title,
            # "description": self.description,
            # "file_path": self.file_path,
            # "date_uploaded": self.date_uploaded,
            # "tags": self.tags,
            # "liked_by_users": {user.to_dict()['id']: user.to_dict() for user in self.liked_by_user},
            # "likes": len(self.liked_by_user),
            'userLikes': [like.to_dict() for like in self.likes],
            "comments": [comment.to_dict() for comment in self.comments]
        }
