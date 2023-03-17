const express = require('express');
import { Router } from "express";
import { createCodeEditor, updateCodeEditor } from "../controllers/CodeEditor.controller";

export const router = Router();


router.post('/', createCodeEditor);
router.put('/:codeEditorId', updateCodeEditor);
