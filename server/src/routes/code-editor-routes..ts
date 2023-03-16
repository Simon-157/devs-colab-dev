
const { createCodeEditor, updateCodeEditor } = require('../controllers/codeEditorController');

router.post('/', createCodeEditor);
router.put('/:codeEditorId', updateCodeEditor);

module.exports = router;
