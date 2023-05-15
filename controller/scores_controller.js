const pool = require('../db');

exports.getStudentScores = (req, res) => {
    const studentId = req.params.student_id;
    const sql = 'SELECT * FROM scores WHERE student_id = ?';

    pool.query(sql, studentId, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to get student scores." });
        } else {
            res.status(200).json({ studentScores: results });
        }
    });
};



exports.registerScore = (req, res) => {
    const { java_score, python_score,  c_score, registered_date } = req.body;
    const student_id = req.params.student_id;  // student_id를 req.params에서 가져옵니다.
    const total = java_score + python_score +  c_score;
    const average = total / 3;
    const sql = 
        'INSERT INTO scores (`student_id`, `java_score`, `python_score`, `c_score`, `registered_date`, `total`, `average`) \
        VALUES (?, ?, ?, ?, ?, ?, ?)';
        pool.query(
        sql,
        [student_id, java_score, python_score,  c_score, registered_date, total, average],
        (error, results) => {
            if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to register student score' });
            } else {
            res.status(201).json({ message: 'Student score successfully registered.' });
            }
        }
        );
    };
    
exports.updateScore = (req, res) => {
        const { student_id } = req.params;
        const { java_score, python_score,  c_score, registered_date } = req.body;
        const total = java_score + python_score +  c_score;
        const average = total / 3;
        
        const sql = 
            'UPDATE scores SET `java_score` = ?, `python_score` = ?, ` c_score` = ?, `registered_date` = ?, `total` = ?, `average` = ? WHERE `student_id` = ?';
        
            pool.query(
            sql,
            [java_score, python_score,  c_score, registered_date, total, average, student_id],
            (error, results) => {
                if (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to update student score' });
                } else {
                res.status(200).json({ message: 'Student score successfully updated.' });
                }
            }
            );
        };

        exports.deleteScore = (req, res) => {
            const { id } = req.params;
            
                const sql = 'DELETE FROM scores WHERE student_id = ?';
            
                pool.query(sql, [id], (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to delete student score' });
                } else {
                    res.status(200).json({ message: 'Student score successfully deleted.' });
                }
                });
            };


// 모든 학생의 성적 정보를 조회하는 함수
exports.getAllStudentScores = (req, res) => {
    const sql = 'SELECT * FROM scores';
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to get student scores." });
        } else {
            res.status(200).json({ studentScores: results });
        }
    });
};