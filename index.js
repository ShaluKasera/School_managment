require('dotenv').config;
const express = require('express')
const sequelize = require('./config/db')
const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/school')

const app = express();
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/school', schoolRoutes);


const PORT = process.env.PORT;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Unable to connect to DB:', err);
});