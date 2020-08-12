from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, PasswordField, TextAreaField
from wtforms.validators import InputRequired, Optional, Email, Length

class RegisterUser(FlaskForm):
    """Register a user"""

    username = StringField('Username:', validators=[InputRequired(), Length(max=20)])
    password = PasswordField('Password:', validators=[InputRequired()])
    email = StringField('Email:', validators=[InputRequired(), Email(), Length(max=50)])
    first_name = StringField('First Name:',validators=[InputRequired(), Length(max=30)])
    last_name = StringField('Last Name:', validators=[InputRequired(), Length(max=30)])

class LoginUser(FlaskForm):
    """Logs in a user"""

    username = StringField('Username: ', validators=[InputRequired()])
    password = PasswordField('Password: ', validators=[InputRequired()])

class FeedbackForm(FlaskForm):
    """Feedback form for user to add feedback"""

    title = StringField('Title:', validators=[InputRequired(), Length(max=100)])
    content = TextAreaField('Content: ', validators=[InputRequired()])

class UpdateFeedbackForm(FlaskForm):
    """Feedback form for user to add feedback"""

    title = StringField('Title:', validators=[Optional(), Length(max=100)])
    content = TextAreaField('Content: ', validators=[Optional()])