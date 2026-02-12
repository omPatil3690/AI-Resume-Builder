import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  ChevronLeft,
  ChevronRight,
  Share2,
  Eye,
  EyeOff,
  Download,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = useCallback(async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.resume) {
        setResumeData((prev) => ({
          ...prev,
          ...data.resume,
          project: data.resume.project || data.resume.projects || [],
        }));
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [resumeId, token]);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];
  const activeSection = sections[activeSectionIndex];
  const ActiveSectionIcon = activeSection.icon;
  const progressPercent = Math.round(
    ((activeSectionIndex + 1) * 100) / sections.length,
  );
  const toolbarButtonClass =
    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5";

  useEffect(() => {
    const timerId = setTimeout(() => {
      loadExistingResume();
    }, 0);
    return () => clearTimeout(timerId);
  }, [loadExistingResume]);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public }),
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({
        url: resumeUrl,
        text: "My Resume",
      });
    } else {
      alert("Share not supported on this browser.");
    }
  };
  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      console.log("SAVE FUNCTION CALLED");
      let updatedResumeData = structuredClone(resumeData);

      //remove image from updatedResumeData
      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");

      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResumeData((prev) => ({
        ...prev,
        ...data.resume,
        project: data.resume.project || data.resume.projects || [],
      }));
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/40 to-emerald-50/50 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur px-4 py-2 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-2xl overflow-hidden">
            <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-[0_20px_50px_-25px_rgba(15,23,42,0.5)] p-6 pt-0">
              {/* progress bar using activeSectionIndex */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200/80" />
              <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 transition-all duration-700"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
              <div className="pt-6 pb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-slate-400">
                    Resume Studio
                  </p>
                  <h1 className="text-lg font-semibold text-slate-800 truncate">
                    {resumeData.title || "Untitled Resume"}
                  </h1>
                </div>
                <span className="shrink-0 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1),
                      )
                    }
                    className={`flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all ${
                      activeSectionIndex === sections.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mb-5 flex items-center justify-between rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-cyan-50 px-4 py-3">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <ActiveSectionIcon className="size-4 text-cyan-600" />
                  {activeSection.name}
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 border border-slate-200">
                  Step {activeSectionIndex + 1} of {sections.length}
                </span>
              </div>
              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>
              <button
                onClick={() => {
                  toast.promise(saveResume(), {
                    loading: "Saving...",
                    success: "Saved successfully",
                    error: "Failed to save",
                  });
                }}
                className="w-full mt-6 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_12px_24px_-12px_rgba(6,182,212,0.8)] hover:shadow-[0_16px_28px_-14px_rgba(6,182,212,0.9)] hover:-translate-y-0.5 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel -Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="mb-4 flex flex-wrap items-center justify-end gap-2 rounded-xl border border-slate-200 bg-white/85 backdrop-blur px-3 py-2 shadow-sm">
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className={`${toolbarButtonClass} border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100`}
                >
                  <Share2 className="size-4" />
                  Share
                </button>
              )}

              <button
                onClick={changeResumeVisibility}
                className={`${toolbarButtonClass} ${
                  resumeData.public
                    ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {resumeData.public ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOff className="size-4" />
                )}
                {resumeData.public ? "Public" : "Private"}
              </button>
              <button
                onClick={downloadResume}
                className={`${toolbarButtonClass} border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
              >
                <Download className="size-4" />
                Download
              </button>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-3 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.5)]">
              <div className="rounded-xl overflow-hidden">
                <ResumePreview
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
