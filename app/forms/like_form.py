from flask_wtf import FlaskForm
from wtforms.fields import SubmitField, IntegerField
from wtforms.validators import DataRequired

class LikeForm(FlaskForm):
    user_id = IntegerField("user_id",[DataRequired()])
    photo_id = IntegerField("photo_id",[DataRequired()])
    submit = SubmitField("Submit")
