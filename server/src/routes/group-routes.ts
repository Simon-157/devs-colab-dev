import { Router } from "express";
import { createGroup } from "../controllers/Group.controller";

export const router = Router();


router.post('/', createGroup);
// TO DO FOR CONTROLLER CALBACK FUNCTIONS
// router.get('/:groupId', getGroupById);
// router.post('/:groupId/members', addGroupMember);

