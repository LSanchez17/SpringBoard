import pdb
from boggle import Boggle
from flask import Flask, request, render_template, session, url_for, jsonify, redirect
# from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Secret Code'
# debug = DebugToolbarExtension(app)


boggle_game = Boggle()
boggle_board = boggle_game.make_board()

@app.route('/')
def home_page():
    """Show Board"""

    session['gameboard'] = boggle_board
    return render_template('base.html', boggle_game=boggle_board)

@app.route('/valid-word')
def handle_guess():
    """Check validity and extras"""
    word = request.args['word']
    valid_word = boggle_game.check_valid_word(boggle_board, word)
    return jsonify({'result': valid_word})

@app.route('/stats', methods=['POST'])
def handle_statistics():
    """Saves user score, and number of times played"""
    # pdb.set_trace()
    
    score = request.json['score']
    timesplayed = request.json['timesplayed']
    
    session['score'] = score
    session['timesplayed'] = timesplayed

    return redirect('/');
    
