"""Blogly application."""

from flask import Flask, redirect, request, flash, render_template, url_for
from models import db, connect_db, User, Post, Tags, Post_tags

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()


@app.route('/')
def get_home():
    """Redirect to homepage"""
    return redirect('/home')

@app.route('/home')
def homepage():
    """Displays posts by creation date, tags not functional? """

    posts = Post.query.order_by(Post.created_at).all()
    tags =  Post_tags.query.all()

    return render_template('index.html', posts=posts, tags=tags)

@app.route('/users')
def show_users():
    """Displays list of users"""

    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('user_list.html',users=users)

@app.route('/createuser')
def make_user():
    """Allows for creation of user"""
    return render_template('make_user.html')

@app.route('/createuser', methods=['POST'])
def created_user():
    """Form/Database handling"""

    new_user = User(first_name = request.form['firstname'],
                    last_name = request.form['lastname'],
                    image_url=request.form['imageurl'])

    db.session.add(new_user)
    db.session.commit()

    return redirect('/users')

@app.route('/info')
def not_allowed():
    """redirect"""
    return redirect('/home')

@app.route('/info/<int:user_id>')
def show_user_info(user_id):
    """Specific information for XYZ user"""
    which_user = User.query.get_or_404(user_id)
    # print(which_user)
    return render_template('user_info.html', user = which_user)

@app.route('/info/<int:user_id>/posts')
def show_user_posts(user_id):
    """Show posts attached to that user"""
    which_user = User.query.get_or_404(user_id)
    which_posts = Post.query.filter(Post.user_id == which_user.user_id)

    return render_template('current_user_posts.html', user=which_user, posts=which_posts)

@app.route('/info/<int:user_id>/add')
def add_user_post(user_id):
    """Allow said user to add posts"""
    # print(user_id)
    which_user = User.query.get_or_404(user_id)
    which_tags = Tags.query.all()

    return render_template('user_posts.html', user = which_user, tags = which_tags)

@app.route('/info/<int:user_id>/add', methods=['POST'])
def made_new_story(user_id):
    """Form/Database handling for user posts"""
    user = User.query.get_or_404(user_id)

    tag_id = [int(num) for num in request.form.getlist('tags')]
    tags = Tags.query.filter(Tags.tag_id.in_(tag_id)).all()
    
    new_post = Post(title = request.form['title'],
                    content = request.form['content'],
                    user_id = user.user_id,
                    tags=tags) 

    # print(new_post)

    db.session.add(new_post)
    db.session.commit()

    return redirect('/home')

@app.route('/post/<int:post_id>')
def read_post(post_id):
    """Get a particular post"""

    which_post = Post.query.get_or_404(post_id)

    return render_template('read_post.html', post=which_post)

@app.route('/post/<int:post_id>/edit')
def edit_current_post(post_id):
    """Edit a particular post"""

    which_post = Post.query.get_or_404(post_id)
    which_tags = Tags.query.order_by(Tags.tag_id).all()

    return render_template('edit_current_post.html', post=which_post, tags=which_tags)

@app.route('/post/<int:post_id>/edit', methods=['POST'])
def editted_current_story(post_id):
    """Form/Database Handling for editing post"""

    post = Post.query.get_or_404(post_id)
    u_id = post.user_id
    which_user = User.query.get_or_404(u_id)
    tag_id = [int(num) for num in request.form.getlist('tags')]
    post.tags = Tags.query.filter(Tags.tag_id.in_(tag_id)).all()
    
    post.title = request.form['title']
    post.content = request.form['content']
    post.created_at = Post.get_date_time()
    post.user_id = which_user.user_id 

    # print(new_post)

    db.session.add(post)
    db.session.commit()

    return redirect('/home')

@app.route('/edit')
def not_allowed_again():
    """Redirect"""
    return redirect('/home')

@app.route('/edit/<int:user_id>')
def edit_user_info(user_id):
    """Edit a particular user"""

    which_user = User.query.get_or_404(user_id)

    return render_template('edit_user_info.html', user=which_user)

@app.route('/edit/<user>', methods=['POST'])
def submitted_edit_user(user):
    """Form/Database handling for editing user"""

    which_user = User.query.get_or_404(user)

    which_user.first_name = request.form['firstname']
    which_user.last_name = request.form['lastname']
    which_user.image_url = request.form['image']

    db.session.add(which_user)
    db.session.commit()

    return redirect('/users')

@app.route('/tags')
def show_tags():
    """Show current tags"""

    tags = Tags.query.order_by(Tags.tag_id)

    return render_template('tags.html', tags=tags)

@app.route('/tag/new')
def make_tag():
    """Make a new tag category"""

    return render_template('make_tags.html')

@app.route('/tag/new', methods=['POST'])
def submitted_tag():
    """Form/Database Handling for tag creation"""
    
    new_tag = Tags(name = request.form['tag'])

    db.session.add(new_tag)
    db.session.commit() 

    return redirect('/tags')

@app.route('/tag/<int:tag_id>')
def edit_tag(tag_id):
    """See a specific tag to edit it"""
    
    which_tag = Tags.query.get_or_404(tag_id)

    return render_template('current_tag.html', tag=which_tag)


@app.route('/tag/<int:tag_id>', methods=['POST'])
def changed_tag(tag_id):
    """Form/Database handling for tag"""

    which_tag = Tags.query.get_or_404(tag_id)

    which_tag.name = request.form['newname']

    db.session.add(which_tag)
    db.session.commit()

    return redirect('/tags')












