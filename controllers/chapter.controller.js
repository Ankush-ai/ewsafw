const Chapter = require("../models/Chapter");
const fs = require("fs");
const upstashFetch = require("../config/upstash");

exports.uploadChapters = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("File required.");

    const data = JSON.parse(fs.readFileSync(file.path));
    const failed = [];

    const promises = data.map(async (item) => {
      try {
        const chapter = new Chapter(item);
        await chapter.validate();
        return chapter;
      } catch (e) {
        failed.push(item);
        return null;
      }
    });

    const validated = (await Promise.all(promises)).filter(Boolean);
    await Chapter.insertMany(validated);

    await upstashFetch("flushall", []);

    return res.json({ success: validated.length, failed });
  } catch (err) {
    return res.status(500).json({ message: "Upload error", error: err.message });
  }
};

exports.getChapters = async (req, res) => {
  const { class: cls, unit, status, subject, weakChapters, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (cls) filter.class = cls;
  if (unit) filter.unit = unit;
  if (status) filter.status = status;
  if (subject) filter.subject = subject;
  if (weakChapters === "true") filter.isWeakChapter = true;

  const chapters = await Chapter.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Chapter.countDocuments(filter);

  return res.json({ total, page: Number(page), limit: Number(limit), chapters });
};

exports.getChapterById = async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  if (!chapter) return res.status(404).json({ message: "Not found" });
  return res.json(chapter);
};