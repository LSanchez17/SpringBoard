const db = require('../db');
const ExpressError = require('../expressError');

class Invoices {
    constructor(id, companyCode, amount, paid, addDate = new Date(), paidDate = null){
        this.id = id;
        this.comp_code = companyCode;
        this.amt = amount;
        this.paid = paid;
        this.add_date = addDate;
        this.paid_date = paidDate;
    }

    static async getAll(){
        let results = await db.query('SELECT * FROM invoices');
        return results.rows;
    }
    
    static async oneInvoice(invoiceId){
        let result = await db.query('SELECT id, comp_code, amt, paid, add_date, paid_date FROM invoices WHERE id = $1',[invoiceId]);
        let data = result.rows[0];
        if(!data){
            throw new ExpressError('Invoice not found', 404);
        }
        return new Invoices(data.id, data.comp_code, data.amt, data.paid, data.add_date, data.paid_date);
    }

    static async createInvoice(newId, newCompCode, newAmt, isItPaid, startDate, endDate){
        let result = await db.query('INSERT INTO invoices(id, comp_code, amt, paid, add_date, paid_date) VALUES($1,$2,$3,$4,$5,$6) RETURNING id, comp_code, amt, paid, add_date, paid_date', [newId, newCompCode, newAmt, isItPaid, startDate, endDate])
        let {id, compCode, totalAmt, isPaid, beginDate, endingDate} = result.rows[0];

        return new Invoices(id, compCode, totalAmt, isPaid, beginDate, endingDate);
    }

    async deleteInvoice(){
        await db.query('DELETE FROM invoices WHERE id = $1',[this.id]);
        return ({'Message':`${this.id} has been deleted`});
    }

    async updateInvoice(){
        await db.query('UPDATE invoices SET comp_code = $1, amt = $2, paid = $3, add_date = $4, paid_date = $5 WHERE id = $6', [this.comp_code, this.amt, this.paid, this.add_date, this.paid_date, this.id]);
        return ({'Message': `${this.id} has been updated`});
    }

    async deleteInvoice(){
        await db.query('DELETE FROM invoices WHERE id = $1',[this.id]);
        return ({'Message': `${this.id} has been deleted`});
    }
}

module.exports = Invoices;