const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students');
const studentScoreRoutes = require('./routes/student_scores');
const scoresRoutes = require('./routes/scores');
const studentRouter = require('./studentRouter');

const app = express();
app.use(bodyParser.json());
app.use('/', studentRoutes);
app.use('/student_scores', studentScoreRoutes);
app.use('/scores', scoresRoutes);
app.use('/students', studentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

