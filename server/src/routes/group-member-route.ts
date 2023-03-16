
const { getGroupMembers } = require('../controllers/groupMemberController');

router.get('/:groupId/members', getGroupMembers);

module.exports = router;
