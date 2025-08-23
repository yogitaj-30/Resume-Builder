const ResumeModel = require("../models/resumeModel");
const fs = require("fs")
const path = require("path")

const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await ResumeModel.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })

        res.status(201).json(newResume)
    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message })
    }
}

const getUserResumes = async (req, res) => {
    try {
        const resumes = await ResumeModel.find({ userId: req.user._id }).sort({
            updatedAt: -1
        })
        res.json(resumes)
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message })
    }
}

const getResumeById = async (req, res) => {
    try {
        const resume = await ResumeModel.findOne({ _id: req.params.id, userId: req.user._id })
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: "Failed to get resume", error: error.message })
    }
}

const updateResume = async (req, res) => {
    try {
        const resume = await ResumeModel.findOne({ _id: req.params.id, userId: req.user._id })
        if (!resume) {
            return res.status(404).json({ message: "Resume not found or user not authorized" });
        }

        Object.assign(resume, req.body);

        const savedResume = await resume.save();
        res.status(200).json(savedResume);
    } catch (error) {
        res.status(500).json({ message: "Failed to update resume", error: error.message })
    }
}

const deleteResume = async (req, res) => {
    try {
        const resume = await ResumeModel.findOne({ _id: req.params.id, userId: req.user._id })
        if (!resume) {
            return res.status(404).json({ message: "Resume not found or user not authorized" });
        }

        const uploadsFolder = path.join(process.cwd(), 'uploads')

        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail)
            }
        }

        if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile)
            }
        }

        const deleted = await ResumeModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!deleted) {
            return res.status(404).json({ message: "Resume not found or user not authorized" });
        }
        res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete resume", error: error.message })
    }
}


module.exports = { createResume, getUserResumes, getResumeById, updateResume, deleteResume }