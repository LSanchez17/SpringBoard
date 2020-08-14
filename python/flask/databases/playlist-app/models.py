"""Models for Playlist app."""
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""

    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(50), nullable = False)
    description = db.Column(db.Text, nullable = False)

    songs = db.relationship('Song', secondary = 'playlists_songs')

class Song(db.Model):
    """Song."""
    
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column(db.String(50), nullable = False)
    artist = db.Column(db.String(30), nullable = False)

    playlists = db.relationship('Playlist', secondary = 'playlists_songs')


class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    __tablename__ = 'playlists_songs'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    
    song = db.relationship(Song, backref=backref('playlists_songs', cascade='all, delete-orphan'))
    playlist = db.relationship(Playlist, backref=backref('playlists_songs', cascade='all, delete-orphan'))


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
