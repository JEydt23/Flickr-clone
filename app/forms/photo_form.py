from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired


class PhotoForm(FlaskForm):
    title = StringField("Title", [DataRequired()])
    description = StringField("Description", [DataRequired()])
    file_path = StringField("File_Path", [DataRequired()])
    tags = StringField("Tags")
