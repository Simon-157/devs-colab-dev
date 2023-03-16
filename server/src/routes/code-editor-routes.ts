import { Router } from "express";
const express = require('express');

export const router = Router();

const { createCodeEditor, updateCodeEditor } = require('../controllers/codeEditorController');

router.post('/', createCodeEditor);
router.put('/:codeEditorId', updateCodeEditor);


