"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

DEFAULT_IMG = 'data:image/png;base64,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'

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    """Does stuff with user data"""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=True, default=DEFAULT_IMG)

    posts = db.relationship('Post', backref='user', cascade='all, delete-orphan')

    @property
    def full_name(self):
        return f'I am {self.first_name} {self.last_name}'


class Post(db.Model):
    """Does stuff with post data"""

    __tablename__ = 'posts'

    posts_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)


    def get_date_time():
        today = datetime.now()
        return today
    # user_posts = db.relationship('User', backref=db.backref('Posts'))

class Tags(db.Model):
    """Does stuff with tag table data"""

    __tablename__ = 'tags'

    tag_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)

    posts = db.relationship('Post', secondary='post_tags', backref='tags')


class Post_tags(db.Model):
    """Join table for handling multiple tags per post per user"""

    __tablename__ = 'post_tags'

    post_id = db.Column(db.Integer, db.ForeignKey('posts.posts_id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.tag_id'), primary_key=True)