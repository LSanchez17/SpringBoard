from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hi!'

@app.route('/madlibs')
def madlibs():
    """Shows form for entering libs"""
    return render_template('madlibsform.html')

@app.route('/madlibs', methods=['POST'])
def addlibs():
    """Passes the items to the story template"""
    place = request.form['place']
    adjective = request.form['adjective']
    noun = request.form['noun']
    verb = request.form['verb']
    plural_noun = request.form['plural_noun']

    madlibs_list = [place, adjective, noun, verb, plural_noun]

    return render_template('madlibsform.html', madlibs_list = madlibs_list )

@app.route('/base')
def homebase():
    return render_template('base.html')