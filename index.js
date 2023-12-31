const express = require('express');
const mongoose=require('mongoose')
const app = express();
const userRoutes = require('./routes/userroutes');
const port = 3000;
mongoose.connect('mongodb+srv://lpaul4440:louispaul@tourapp.9nrhixd.mongodb.net/talentskoolretryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up middleware
app.use(express.json());
app.use('/users', userRoutes);
// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});