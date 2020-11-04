from forex_python.converter import CurrencyRates, CurrencyCodes

class Converter():
    def __init__(self):
        self.currency = CurrencyRates()
        self.symbols = CurrencyCodes()

    def convert_currency(self, init_curr, final_curr, amt):
        units = self.currency.convert(init_curr, final_curr, amt)
        return units
    
    def is_it_currency(self, currency):
        try:
            value = self.currency.get_rates(currency)
            if value:
                return True
        except Exception:
            return False

    def is_it_money(self, money):
        try:
            float(money)
            return True
        except Exception:
            return False

    def give_fancy_symbol(self, currency):
        symbol = self.symbols.get_symbol(currency)
        return symbol
