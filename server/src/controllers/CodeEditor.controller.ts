import { Request, Response } from "express";
import CodeEditor from "../models/codeEditor";

const createCodeEditor = async (req: Request, res: Response) => {
  try {
    const { group_id, problem_id } = req.body;

    const codeEditor = await CodeEditor.create({
      group_id,
      problem_id,
    });

    res.status(201).json(codeEditor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCodeEditor = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const { codeEditorId } = req.params;

    const codeEditor = await CodeEditor.findByPk(codeEditorId);

    if (!codeEditor) {
      return res.status(404).json({ message: "Code editor not found" });
    }

    codeEditor.code = code;
    await codeEditor.save();

    res.status(200).json(codeEditor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { createCodeEditor, updateCodeEditor };
