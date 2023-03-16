import { Router } from "express";

export const router = Router();

const { createGroup, getGroupById, addGroupMember } = require('../controllers/groupController');

router.post('/', createGroup);
router.get('/:groupId', getGroupById);
router.post('/:groupId/members', addGroupMember);

module.exports = router;
