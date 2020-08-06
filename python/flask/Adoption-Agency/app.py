"""adoption agency"""
from flask import Flask, redirect, request, flash, render_template
from models import db, connect_db, Pets
from forms import AddPets, EditPets

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pets'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'testt'
connect_db(app)
db.create_all()

@app.route('/')
def get_home():
    """Redirect To Homepage"""
    list_of_pets = Pets.query.all()
    
    return render_template('index.html', pets = list_of_pets)

@app.route('/add')
def show_form():
    """Add a pet page""" 
    form = AddPets()

    return render_template('add_pet.html', form=form)

@app.route('/add', methods=['POST'])
def add_pet():
    """add pet to database"""
    form  = AddPets() 
    
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        new_pet = Pets(name=name, species=species, photo_url=photo, age=age, notes=notes)
        db.session.add(new_pet)
        db.session.commit()

        return redirect('/')
    else:
        return render_template('add_pet.html', form=form)

@app.route('/edit/<int:pet_id>')
def show_edit(pet_id):
    which_pet = Pets.query.get(pet_id)
    edit_form = EditPets()

    return render_template('edit_page.html', pet=which_pet, form=edit_form)

@app.route('/edit/<int:pet_id>', methods=['POST'])
def commit_edit(pet_id):
    form = EditPets() 
    which_pet = Pets.query.get_or_404(pet_id)
    
    if form.validate_on_submit():
        which_pet.photo_url = form.photo_url.data
        which_pet.notes = form.notes.data
        which_pet.available  = form.available.data 

        db.session.add(which_pet)
        db.session.commit()

        return redirect('/')
    else:
        return render_template('edit_page.html', form=form, pet=which_pet)


