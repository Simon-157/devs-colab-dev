

const { createProblem, getProblemById } = require('../controllers/problemController');

router.post('/', createProblem);
router.get('/:problemId', getProblemById);

module.exports = router;
