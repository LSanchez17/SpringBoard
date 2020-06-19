from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    return 'welcome'

@app.route('/welcome/home')
def second_welcome():
    return """ 
           welcome home
           """

@app.route('/welcome/back')
def third_welcome():
    return """
           welcome back
           """  

