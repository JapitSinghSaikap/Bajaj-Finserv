const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const bfhlRoute = require('./routes/bfhl');
const healthRoute = require('./routes/health');

app.use('/bfhl', bfhlRoute);
app.use('/health', healthRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
