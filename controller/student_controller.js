const pool = require('../db');

exports.createStudent = (req, res) => {
    const { student_id, name, contact, email, address, registered_date } = req.body;
    const sql =
        'INSERT INTO student_info (`student_id`, `name`, `contact`, `email`, `address`, `registered_date`) VALUES (?, ?, ?, ?, ?, ?)';
    pool.query(
        sql,
        [student_id, name, contact, email, address, registered_date],
        (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create student' });
        } else {
            res.status(201).json({ message: 'Student successfully created.' });
        }
        }
    );
    };

    exports.getStudentsSortedByScore = (req, res) => {
    const sql =
        `
        SELECT s.serial_no, s.student_id, s.name, s.contact, s.email, s.address, s.registered_date, sc.total, sc.average,
        ((SELECT COUNT(*) FROM scores sc2 WHERE sc2.average > sc.average) + 1) AS rank
        FROM student_info s
        LEFT JOIN scores sc ON s.student_id = sc.student_id
        ORDER BY sc.average DESC, s.student_id DESC;
        `;
    pool.query(sql, (error, results) => {
        if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get students' });
        } else {
        res.status(200).json(results);
        }
    });
    };

    exports.updateStudent = (req, res) => {
        const { id } = req.params;
            const { name, gender, address, phone, email } = req.body;
        
            const sql = 'UPDATE students SET name = ?, gender = ?, address = ?, phone = ?, email = ? WHERE id = ?';
        
            pool.query(sql, [name, gender, address, phone, email, id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to update student information' });
            } else {
                res.status(200).json({ message: 'Student information successfully updated.' });
            }
            });
        };

    exports.deleteStudent = (req, res) => {
    const { student_id } = req.params;
    const sql1 = 'DELETE FROM student_info WHERE `student_id` = ?';
    const sql2 = 'DELETE FROM scores WHERE `student_id` = ?';
    pool.query(sql1, [student_id], (error, result1) => {
        if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete student' });
        } else {
        pool.query(sql2, [student_id], (error, result2) => {
            if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete student score' });
            } else {
            res.status(200).json({ message: 'Student and score deleted successfully.' });
            }
        });
        }
    });
    };

    exports.getStudentById = (req, res) => {
    const { student_id } = req.params;
    const sql = 'SELECT * FROM student_info WHERE `student_id` = ?';
    pool.query(sql, [student_id], (error, results) => {
        if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get student' });
        } else {
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
        }
    });
};
