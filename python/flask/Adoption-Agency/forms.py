from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import InputRequired, Optional, URL, AnyOf, NumberRange

class AddPets(FlaskForm):
    """Adds a pet"""

    name = StringField('Pet Name:', validators=[InputRequired()])
    species = StringField('Species:', validators=[InputRequired(), AnyOf(['cat','dog','porcupine'])])
    photo_url = StringField('Photo URL:', validators=[Optional(), URL(require_tld=False)])
    age = IntegerField('Age:', validators=[Optional(), NumberRange(0, 30)])
    notes = StringField('Notes:', validators=[Optional()])   

class EditPets(FlaskForm):
    """Edit a pet"""

    photo_url = StringField('Photo URL:', validators=[Optional(), URL(require_tld=False)])
    notes = StringField('Notes:', validators=[Optional()])   
    available = BooleanField('Available?', validators=[Optional()])