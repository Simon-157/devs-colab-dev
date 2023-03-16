import { Router } from "express";

export const router = Router();

const { getGroupMembers } = require('../controllers/groupMemberController');

router.get('/:groupId/members', getGroupMembers);

module.exports = router;
