# Put your app in here.
from flask import Flask, request
from operations import add,sub,mult, div

app = Flask(__name__)

@app.route('/add')
def adds():
    """add a and b"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    res = add(a,b)

    return str(res)

@app.route('/sub')
def subs():
    """subtracts a and b"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    res = sub(a,b)

    return str(res)

@app.route('/mult')
def mults():
    """ multiplies a and b"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    res = mult(a,b)

    return str(res)

@app.route('/div')
def divs():
    """ divides a and b"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    res = div(a,b)

    return str(res)


mode = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}

@app.route('/math/<operation>')
def do_math(operation):
    """does math and operations based on params"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    res = mode[operation](a,b)
    
    return str(res)