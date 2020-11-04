from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def test_home(self):
        """ Home page route works? """
        with app.test_client() as client:
            resp = client.get('/')
            Html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h3>Words guessed:</h3>',Html)

    def test_invalid_word(self):
        """ tests for valid word, but not on board """
        with app.test_client() as client:
            response = client.get('/valid-word?word=new')
            self.assertEqual(response.json['result'], 'not-on-board')

    def test_real_word(self):
        """ checks for fake gibberish text """
        with app.test_client() as client:
            response = client.get('/valid-word?word=sdfasdf')
            self.assertEqual(response.json['result'], 'not-word')

    def test_valid_word(self):
        """ this one fails, not sure why """
        """ make a mock board, test for word in it """
        with app.test_client() as client:
            with client.session_transaction() as curr_session:
                curr_session['gameboard'] = [['C', 'A', 'R', 'O', 'W'],
                          ['C', 'A', 'R', 'O', 'W'],
                          ['C', 'A', 'R', 'O', 'W'],
                          ['C', 'A', 'R', 'O', 'W'],
                          ['C', 'A', 'R', 'O', 'W']]

                response = client.get('/valid-word?word=row')
                # print(curr_session.get('gameboard'))
                self.assertEqual(response.json['result'], 'ok')
