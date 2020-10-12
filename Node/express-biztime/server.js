/** Server startup for BizTime. */
const app = require("./app");
const companiesRoutes = require('./routes/companies');
const invoiceRoutes = require('./routes/invoices');

app.use('/companies', companiesRoutes);
app.use('/invoices', invoiceRoutes);

app.listen(3000, function () {
  console.log("Listening on 3000");
});