"""Flask app for Cupcakes"""
from flask import Flask, redirect, render_template, request, jsonify, abort
from models import db, connect_db, Cupcake
# from forms import AddPets, EditPets

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'testt'

connect_db(app)
db.create_all()

@app.route('/')
def redirecting():
    return render_template('index.html')

@app.route('/api/cupcakes', methods=['GET'])
def get_all_cupcakes():
    json_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]

    return jsonify(cupcakes=json_cupcakes)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['GET'])
def get_individual_cupcake(cupcake_id):
    which_cupcake = Cupcake.query.get_or_404(cupcake_id)
    if which_cupcake:
        
        json_prep = which_cupcake.serialize()

        return jsonify(cupcake=json_prep)
    else:
        abort(404)

@app.route('/api/cupcakes', methods=['POST'])
def post_new_cupcake():
    new_cupcake_data = request.json

    new_cupcake = Cupcake(flavor = new_cupcake_data['flavor'], 
                          rating = new_cupcake_data['rating'], 
                          size = new_cupcake_data['size'], 
                          image = new_cupcake_data['image'] or None)
    
    db.session.add(new_cupcake)
    db.session.commit()

    return (jsonify(new_cupcake.serialize()), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def patch_individual_cupcake(cupcake_id):
    which_cupcake = Cupcake.query.get_or_404(cupcake_id)
    patch_data = request.json

    which_cupcake.flavor = data['flavor']
    which_cupcake.rating = data['rating']
    which_cupcake.size = data['size']
    which_cupcake.image = data['image']

    db.session.add(which_cupcake)
    db.session.commit()

    return jsonify(which_cupcake.serialize())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_individual_cupcake(cupcake_id):
    which_cupcake = Cupcake.query.get_or_404(cupcake_id)
    message = {'message':'Cupcake Deleted'}

    db.session.delete(which_cupcake)
    db.session.commit()

    return jsonify(message)





