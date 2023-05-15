const express = require('express');
const app = express();
const studentsRoutes = require('./routes/student.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/students', studentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});