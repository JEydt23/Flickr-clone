from flask_wtf import FlaskForm
from wtforms.fields import StringField, SubmitField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    body = StringField("Comment", [DataRequired()])
    submit = SubmitField("Submit")
