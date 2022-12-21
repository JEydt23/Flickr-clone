from .db import db, environment, SCHEMA, add_prefix_for_prod

class Photo(db.Model):
    __tablename__ = "photos"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(40), nullalbe=False)
    description = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    date_uploaded = db.Column(db.Datetime, server_default=db.func.now())
    tag = db.Column(db.String(40))

    users = db.relationship("User", back_populates="photos")

    def to_dict(self):
        return {
        "id": self.id,
        "user_id": self.user_id,
        "title": self.title,
        "description": self.description,
        "file_path": self.file_path,
        "date_uploaded": self.date_uploaded,
        "tags": self.tags
    }
