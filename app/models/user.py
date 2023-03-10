from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follow import follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    profile_picture = db.Column(db.String(255))
    bio = db.Column(db.String(1000))


    photos = db.relationship("Photo", back_populates="users", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="users", cascade="all, delete")
    likes = db.relationship("Like", back_populates="users", cascade="all, delete")

    # liked_photos = db.relationship("Photo", back_populates="liked_by_user", secondary=like, lazy="joined")

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followerId == id),
        secondaryjoin=(follows.c.followedId == id),
        backref=db.backref("following",lazy="dynamic"),
        lazy="dynamic",

        cascade="all, delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_picture': self.profile_picture,
            'bio': self.bio,
            
        }
