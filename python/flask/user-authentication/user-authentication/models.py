"""Models for User feedback"""
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    """User model"""

    __tablename__ = 'user'

    username = db.Column(db.String(20), primary_key = True, nullable = False, unique = True)
    password = db.Column(db.Text, nullable = False)
    email = db.Column(db.String(50), nullable = False)
    first_name = db.Column(db.String(30), nullable = False)
    last_name = db.Column(db.String(30), nullable = False)

    feedback = db.relationship('Feedback', backref='user')

    @classmethod
    def hashed_pwd(cls, password):
        """Registers user & hashes their password"""
        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode('utf8')

        return hashed_utf8

    @classmethod
    def authenticate(cls, username, password):
        """Validates a user"""
        U = User.query.filter_by(username=username).first()
        if U and bcrypt.check_password_hash(U.password, password):
            return U
        else:
            return False

class Feedback(db.Model):
    """Users give feedback"""

    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)    
    title = db.Column(db.String(100), nullable = False)
    content = db.Column(db.Text, nullable = False)
    username = db.Column(db.String(20), db.ForeignKey('user.username'))

def connect_db(app):
    """Initialzie app"""
    db.app = app
    db.init_app(app)