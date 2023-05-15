const express = require('express');
const router = express.Router();
const studentScoreController = require('../controller/s_controller');

router.post('/', studentScoreController.createStudentScore);
router.put('/:id', studentScoreController.updateStudentScore);
router.delete('/:id', studentScoreController.deleteStudentScore);

    module.exports = router;