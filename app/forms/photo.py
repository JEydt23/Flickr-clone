from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired

class StoryForm(FlaskForm):
    title = StringField("Title",[DataRequired()])
    description = StringField("Description",[DataRequired()])
    file_path = StringField("File_Path",[DataRequired()])
    tags = StringField("Tags")
