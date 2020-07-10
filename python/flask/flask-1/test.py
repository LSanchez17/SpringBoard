from unittest import TestCase
from app import app
from logic import Converter

class FlaskTests(TestCase):
    
    def test_homepage(self):
        """Tests redirect to /exchange"""
        with app.test_client() as client:
            resp = client.get('/')

            self.assertEqual(resp.status, '302 FOUND')

    def test_exchange_page(self):
        """Tests the exchange page renders"""
        with app.test_client() as client:
            resp = client.get('/exchange')
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<title>Currency Exchange</title>', html)

    def test_valid_currency(self):
        """checks to see if currency valid"""
        with app.test_client() as client:
            resp = client.post('/exchange', data={'currentCurrency': 'USD', 'endingCurrency':'EUR', 'amtToConvert': '500'})

            self.assertEqual(resp.status_code, 200)

    def test_valid_num(self):
        """Tests for valid numerical value"""
        with app.test_client() as client:
            resp = client.post('/exchange', data={'currentCurrency': 'USD', 'endingCurrency':'EUR', 'amtToConvert': '500'})

            self.assertEqual(resp.status_code, 200)

    def test_same_currency_conversion(self):
        """Tests that converting a value to the same currency is that same value"""
        with app.test_client() as client:
            resp = client.post('/exchange', data={'currentCurrency': 'USD', 'endingCurrency':'USD', 'amtToConvert': '1'})
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Your Converted Currency is: US$ 1.0</h1>', html)

    def test_invalid_currency(self):
        """Should return a 200 status code, but also appear with HTML that alerts the user it failed"""
        with app.test_client() as client:
            resp = client.post('/exchange', data={'currentCurrency': 'USD', 'endingCurrency':'test', 'amtToConvert': '500'})
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h2>Incorrect Ending Currency test </h2>', html)

            resp = client.post('/exchange', data={'currentCurrency': '1234', 'endingCurrency':'USD', 'amtToConvert': '500'})
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h2>Incorrect Ending Currency 1234 </h2>', html)

    def test_invalid_currency(self):
        """should return 200, and alert on webpage currency is wrong!"""
        with app.test_client() as client:
            resp = client.post('/exchange', data={'currentCurrency': 'USD', 'endingCurrency':'EUR', 'amtToConvert': 'test'})
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h2>Incorrect Monetary Value test</h2>', html)

    def test_get_symbol_currency(self):
        """Checks to see if we get a currency symbol"""
        with app.test_client() as client:
            resp = client.post('/exchange', data={'currentCurrency': 'USD', 'endingCurrency':'EUR', 'amtToConvert': '500'})
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Your Converted Currency is: € 440.84</h1>', html)

    def test_messages_flashed(self):
        """Tests to see if we get the messages during error"""
        with app.test_client() as client:
            resp = client.post('/exchange', data={'currentCurrency': 'USD', 'endingCurrency':'test', 'amtToConvert': '500'})
            assert b'Incorrect Ending Currency test' in resp.data

            second_resp = client.post('/exchange', data={'currentCurrency': 'test', 'endingCurrency':'EUR', 'amtToConvert': '500'})
            assert b'Incorrect Starting Currency test' in second_resp.data

            third_resp = client.post('/exchange', data={'currentCurrency': 'USD', 'endingCurrency':'EUR', 'amtToConvert': 'fff'})
            assert b'Incorrect Monetary Value fff' in third_resp.data
