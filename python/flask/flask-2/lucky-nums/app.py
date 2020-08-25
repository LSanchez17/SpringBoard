from flask import Flask, render_template, request, jsonify
import json, random, requests

app = Flask(__name__)


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.route('/api/get-lucky-num', methods=['POST'])
def show_luck():
    user_data = request.json

    print(f'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%{user_data["name"]}')

    name = user_data['name']
    email = user_data['email']
    year = user_data['year']
    color = user_data['color']

    number = random.randrange(0,100)

    lucky_number = requests.get(f'http://numbersapi.com/{number}')
    
    year_facts = requests.get(f'http://numbersapi.com/{year}')
    # print(year_facts.content) <== byte string arrrggg

    if([item for item in user_data if len(item) == 0]):
        errors = 'All fields required'        
        return json.dumps({'error': errors})
    else:
        summary = { 
            "name": name,
            "email": email,
            "year": {
                "year": year,
                "fact": year_facts.content.decode("utf-8")
            },
            "color": color,
            "number": {
                "number": number,
                "fact": lucky_number.content.decode("utf-8")
            }
        }
        return summary

