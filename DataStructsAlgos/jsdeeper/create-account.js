function createAccount(pin, amount = 0) {
    //makes a bank account, with a PIN, and init deposit
    //should return object with methods!
    return({
        checkBalance(pinAttempt){
            if(pinAttempt === pin){
                return `$${amount}`;
            }
            return 'Invalid PIN.';
        },
        deposit(pinAttempt, depositAmount){
            if(pinAttempt === pin){
                amount += depositAmount;
                return `Succesfully deposited $${depositAmount}. Current balance: $${amount}.`;
            }
            return 'Invalid PIN.';
        },
        withdraw(pinAttempt, withdrawAmt){
            if(pinAttempt === pin){
                if(withdrawAmt <= amount){
                    amount -= withdrawAmt;
                    return `Succesfully withdrew $${withdrawAmt}. Current balance: $${amount}.`;
                }
                return 'Withdrawal amount exceeds account balance. Transaction cancelled.'
            }
            return 'Invalid PIN.';
        },
        changePin(pinAttempt, newPin){
            if(pinAttempt === pin){
                pin = newPin;
                return 'PIN successfully changed!';
            }
            return 'Invalid PIN.';
        },
    })
}

module.exports = { createAccount };
