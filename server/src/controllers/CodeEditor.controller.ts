import { Request, Response } from "express";
import { ReplOptions } from "repl";
async function createCodeEditor(req:Request, res:Response) {
  try {
    const { group_id, problem_id } = req.body;

    const codeEditor = await CodeEditor.create({
      group_id,
      problem_id,
    });

    res.status(201).json(codeEditor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateCodeEditor(req:Request, res:Response) {
  try {
    const { code } = req.body;
    const { codeEditorId } = req.params;

    const codeEditor = await CodeEditor.findByPk(codeEditorId);

    if (!codeEditor) {
      return res.status(404).json({ message: 'Code editor not found' });
    }

    codeEditor.code = code;
    await codeEditor.save();

    res.status(200).json(codeEditor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createCodeEditor,
  updateCodeEditor,
};
