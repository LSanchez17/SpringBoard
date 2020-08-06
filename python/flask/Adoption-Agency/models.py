"""Models for Pets Table"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMG = 'https://image.flaticon.com/icons/svg/3094/3094652.svg'

class Pets(db.Model):
    """Creates a pet model for the pet table"""

    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.Text, nullable = False)
    species = db.Column(db.Text, nullable = False)
    photo_url = db.Column(db.Text, default = DEFAULT_IMG)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable = False, default = True)

    def get_image(self):
        return self.photo_url or DEFAULT_IMG

def connect_db(app):
    db.app = app
    db.init_app(app)