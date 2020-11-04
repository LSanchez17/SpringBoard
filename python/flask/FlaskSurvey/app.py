from flask import Flask, request, render_template, redirect, url_for, flash, session
from Flask_Debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)

app.config['SECRET_KEY'] = 'SOMETHING'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


RESPONSES = []

@app.route('/')
def home():
    """Home Page"""
    root = True
    session['responses'] = []
    return render_template('base.html', show=root) 

@app.route('/questions/<int:n>')
def questions(n):
    """Question Handling and basic logic"""

    if len(RESPONSES) is None:
        return redirect('/')
    
    if len(RESPONSES) == len(satisfaction_survey.questions):
        return redirect('/done')
    
    if len(RESPONSES) != satisfaction_survey.questions[n]:
        flash(f'Invalid Attempt! No cheating!')
        return redirect(f'/questions/{n}')
    
    return render_template('questions.html', n=n, satisfaction_survey=satisfaction_survey)

@app.route('/questions/<int:n>', methods=['POST'])
def answered(n):
    """Saves user responses"""

    radio_val = request.form['option']
    
    """Adding values to the session"""
    session_value = session['survey']
    session_value.append(radio_val)
    session['survey'] = session_value

    RESPONSES.append(radio_val)
    if len(RESPONSES) != 4:
        return redirect(url_for('questions', n=n+1))
    else:
        return render_template('results.html', responses = RESPONSES)




@app.route('/done')
def finished():
    """Placeholder for expansions"""
    return render_template('results.html')
