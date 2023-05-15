const express = require('express');
const router = express.Router();
const scoresController = require('../controller/scores_controller');

// 학생의 점수 정보 조회
router.get('/:student_id', scoresController.getStudentScores);

// 학생의 점수 정보 등록
router.post('/students/:student_id/scores', scoresController.registerScore);

// 학생의 점수 정보 업데이트
router.put('/:student_id/scores/:score_id', scoresController.updateScore);

// 학생의 점수 정보 삭제
router.delete('/:student_id/scores/:score_id', scoresController.deleteScore);

module.exports = router;