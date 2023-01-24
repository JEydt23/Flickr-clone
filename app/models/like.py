from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    photo_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("photos.id")), nullable=False)

    photos = db.relationship("Photo", back_populates="likes")
    users = db.relationship("User", back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "photo_id": self.photo_id
        }
