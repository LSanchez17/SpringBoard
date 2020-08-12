"""User feedback"""
from flask import Flask, redirect, request, flash, render_template, session
from models import db, connect_db, User, Feedback
from forms import RegisterUser, LoginUser, FeedbackForm, UpdateFeedbackForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'testt'

connect_db(app)
db.create_all()
 
@app.route('/')
def homepage():
    """Homepage"""
    return redirect('/register')

@app.route('/register')
def register():
    """registration page"""
    form = RegisterUser()

    return render_template('register.html', form=form)

@app.route('/register', methods=['POST'])
def new_user_registration():
    """New user register, handle data submission"""
    form = RegisterUser()
	
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        password = User.hashed_pwd(password)

        new_user = User(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.username

        return redirect(f'/users/{new_user.username}')
    else:
        return render_template('register.html', form=form)

@app.route('/users/<username>')
def user_route(username):
    if 'user_id' not in session:
        flash('Not authorized')
        return redirect('/')
    else:
        which_user = User.query.get_or_404(username)
        which_feedback = Feedback.query.filter(Feedback.username == username)

        return render_template('user.html', user=which_user, feedback=which_feedback)

@app.route('/users/<username>/delete')
def view_user_delete_page(username):
    """show user form for deleting their account"""
    which_user = User.query.get_or_404(username)
    
    return render_template('delete.html', username=which_user)

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user_account(username):
    """Delete user from database :( """
    which_user = User.query.get_or_404(username)
    which_feedback = Feedback.query.filter(eedback.username == username)

    db.session.delete(which_feedback)
    db.session.delete(which_user)
    db.session.commit()

    session.pop('user_id')

    return redirect('/')

@app.route('/users/<username>/feedback/add')
def add_feedback_form(username):
    """Shows user a form to add feedback if logged in"""
    if 'user_id' not in session or session['user_id'] != username:
        flash('unathorizedS')
        return redirect('/')
    else:
        form = FeedbackForm()

        return render_template('feedback_form.html', form=form, username=username)

@app.route('/users/<username>/feedback/add', methods=['POST'])
def submit_feedback(username):
    """User submits a form to add feedback if logged in"""
    if 'user_id' not in session or session['user_id'] != username:
        flash('unathorizedS')
        return redirect('/')
    else:
        form = FeedbackForm()

        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            username = username

            new_feedback = Feedback(title=title, content=content, username=username)
            db.session.add(new_feedback)
            db.session.commit()

            return redirect(f'/users/{username}')
        else:
            return render_template('feedback_form.html', form=form)

# @app.route('/feedback/<int:feedback_id>/update')
# def show_edit_feedback(feedback_id):
#     """Show form for editing feedback"""
#     which_feedback = Feedback.query.get_or_404(feedback_id)
#     form = UpdateFeedbackForm(obj=which_feedback)

#     return render_template('edit_feedback.html', feedback=which_feedback, form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=['GET','POST'])
def updated_feedback(feedback_id):
    which_feedback = Feedback.query.get_or_404(feedback_id)
    form = UpdateFeedbackForm()
    user_id = session['user_id']
    # print(f'******************{form.validate_on_submit()}******************')

    if form.validate_on_submit():
        which_feedback.title = form.title.data
        which_feedback.content = form.content.data

        db.session.add(which_feedback)
        db.session.commit()

        return redirect(f'/users/{user_id}')
    else:
        return render_template('edit_feedback.html', feedback=which_feedback, form=form)

@app.route('/feedback/<int:feedback_id>/delete')
def delete_feedback_page(feedback_id):
    """Show page for deleting this feedback"""
    which_feedback = Feedback.query.get_or_404(feedback_id)

    return render_template('feedback_delete.html', feedback=which_feedback)

@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    """Handles deleting feedback"""
    which_feedback = Feedback.query.get_or_404(feedback_id)
    username = which_feedback.username

    db.session.delete(which_feedback)
    db.session.commit()

    return redirect(f'/users/{username}')

@app.route('/login')
def login_page():
    """Login page"""
    form = LoginUser()

    return render_template('login.html', form=form)

@app.route('/login', methods=['POST'])
def logged_in():
    """Handle login form"""
    form = LoginUser()
	
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user_valid = User.authenticate(username, password)

        if user_valid:
            session['user_id'] = user_valid.username
            return redirect(f'/users/{username}')
        else:
            form.username.errors = ['Bad username & password']
    
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    """Logs user out"""
    session.pop('user_id')

    return redirect('/')














