from flask import Flask, redirect, request, render_template, session, flash
from logic import Converter

app = Flask(__name__)
app.config['SECRET_KEY'] = 'spoopy'

currency_magic = Converter()

@app.route('/')
def turn_to_exchange():
    return redirect('/exchange')

@app.route('/exchange')
def exchange():
    """Displays form"""
    return render_template('index.html')

@app.route('/exchange', methods=['POST'])
def show_exchange():
    """"Handles logical exchange of form to exchange file and returns that files answer"""
    starting_currency = request.form['currentCurrency']
    ending_currency = request.form['endingCurrency']
    amount_to_convert = request.form['amtToConvert']

    if currency_magic.is_it_currency(starting_currency):
        if currency_magic.is_it_currency(ending_currency):
            if currency_magic.is_it_money(amount_to_convert):
                currency_value = currency_magic.convert_currency(starting_currency, ending_currency, int(amount_to_convert))
                currency_value = round(currency_value, 2)
                fancy_symbol = currency_magic.give_fancy_symbol(ending_currency)

                return render_template('index.html', currency_converted = currency_value, curr_symbol = fancy_symbol)
            if currency_magic.is_it_money(amount_to_convert) == False:
                flash(f'Incorrect Monetary Value {amount_to_convert}')
                return render_template('index.html')
        if currency_magic.is_it_currency(ending_currency) == False:
            flash(f'Incorrect Ending Currency {ending_currency} ')
            return render_template('index.html')

    if currency_magic.is_it_currency(starting_currency) == False:
        flash(f'Incorrect Starting Currency {starting_currency}')
        if currency_magic.is_it_currency(ending_currency):
            if currency_magic.is_it_money(amount_to_convert):
                return render_template('index.html')
            if currency_magic.is_it_money(amount_to_convert) == False:
                flash(f'Incorrect Monetary Value {amount_to_convert}')
                return render_template('index.html')
        if currency_magic.is_it_currency(ending_currency) == False:
            flash(f'Incorrect Ending Currency {ending_currency}')
            if currency_magic.is_it_money(amount_to_convert):
                return render_template('index.html')
            if currency_magic.is_it_money(amount_to_convert) == False:
                flash(f'Incorrect Monetary Value {amount_to_convert}')
                return render_template('index.html')
