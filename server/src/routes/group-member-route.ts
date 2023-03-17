import { Router } from "express";
import { getGroupMembers } from "../controllers/GroupMember.controller";

export const router = Router();

router.get('/:groupId/members', getGroupMembers);

