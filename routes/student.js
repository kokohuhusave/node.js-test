const express = require('express');
const router = express.Router();
const studentController = require('../controller/student_controller');
const scoresController = require('../controller/scores_controller');


router.post('/', studentController.createStudent);
router.get('/sorted_by_avg', studentController.getStudentsSortedByScore);
router.put('/:student_id', studentController.updateStudent);
router.delete('/:student_id', studentController.deleteStudent);
router.get('/:student_id', studentController.getStudentById);

router.post('/students', studentController.createStudent);
router.post('/students/:student_id/scores', scoresController.registerScore);
router.get('/', function(req, res){
        Student.getAllStudentScores(function(err, student){
        if(err) {
            res.json({
            error: err
            })
        } else {
            res.json({
            message: "성적 조회 성공",
            data: student
            })
        }
        })
    })


module.exports = router;




