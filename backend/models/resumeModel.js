const mongoose = require("mongoose")

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String
    },
    template: {
        theme: String,
        colorPalette: [String]
    },
    profileInfo: {
        profilePreviewUrl: String,
        fullName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        designation: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        summary: String
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
        },
        phone: {
            type: String,
            match: [/^\+?[0-9\s()-]{7,20}$/, "Please enter a valid phone number"]
        },
        location: String,
        linkedin: String,
        github: String,
        website: String
    },
    workExperience: [
        {
            company: { type: String, minlength: 3 },
            role: { type: String, minlength: 3 },
            startDate: String,
            endDate: String,
            description: String
        }
    ],
    education: [
        {
            degree: { type: String, minlength: 3, required: true },
            institution: { type: String, minlength: 3, maxlength: 50, required: true },
            startDate: { type: String, required: true },
            endDate: { type: String, required: true }
        }
    ],
    skills: [
        {
            name: { type: String, minlength: 3, required: true },
            progress: Number
        }
    ],
    projects: [
        {
            title: { type: String, minlength: 3, required: true },
            description: { type: String, minlength: 3, required: true },
            github: String,
            liveDemo: String
        }
    ],
    certifications: [
        {
            title: String,
            issuer: String,
            year: {
                type: Number,
                min: 1950,
                max: new Date().getFullYear(),
            }
        }
    ],
    languages: [
        {
            name: { type: String, minlength: 3, required: true },
            progress: Number
        }
    ],
    interests: [String]
},
    {
        timestamps: true
    }
)

const ResumeModel = mongoose.model("Resume", resumeSchema)
module.exports = ResumeModel