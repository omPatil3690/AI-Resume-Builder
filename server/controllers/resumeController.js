import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

const normalizeResumeForClient = (resume) => {
  if (!resume) return resume;
  const normalized = resume.toObject ? resume.toObject() : { ...resume };

  normalized.project = normalized.project || normalized.projects || [];
  normalized.education = (normalized.education || []).map((edu) => ({
    ...edu,
    graduation_date: edu.graduation_date || edu.graduation || "",
  }));

  return normalized;
};

const normalizeResumeForStorage = (resumeData) => {
  const normalized =
    typeof structuredClone === "function"
      ? structuredClone(resumeData)
      : JSON.parse(JSON.stringify(resumeData));

  if (normalized.project && !normalized.projects) {
    normalized.projects = normalized.project;
  }

  if (Array.isArray(normalized.education)) {
    normalized.education = normalized.education.map((edu) => ({
      ...edu,
      graduation: edu.graduation || edu.graduation_date || "",
    }));
  }

  return normalized;
};

// controller for creating a new resume
// POST: /api/resumes/create

export const createResume = async (req, res) => {
  try {
    const userId = req.userId; // set by auth middleware
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newResume = await Resume.create({
      userId,
      title,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// controller for deleting a resume
// DELTE: /api/resumes/delete

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params; // Same as -> const resumeId = req.params.resumeId;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    //return success message
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get user resume by id
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const normalizedResume = normalizeResumeForClient(resume);
    normalizedResume.__v = undefined;
    normalizedResume.createdAt = undefined;
    normalizedResume.updatedAt = undefined;

    return res.status(200).json({ resume: normalizedResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get resume by id public
// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume: normalizeResumeForClient(resume) });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for updating a resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;
    if (typeof resumeData === "string") {
      resumeDataCopy = normalizeResumeForStorage(JSON.parse(resumeData));
    } else {
      resumeDataCopy = normalizeResumeForStorage(resumeData);
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });
      resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true },
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Saved successfully",
      resume: normalizeResumeForClient(resume),
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
