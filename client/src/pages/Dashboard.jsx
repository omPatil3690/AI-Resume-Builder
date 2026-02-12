import React, { useCallback, useEffect, useState } from "react";
import {
  UploadCloudIcon,
  PlusIcon,
  FilePenLineIcon,
  TrashIcon,
  PencilIcon,
  XIcon,
  UploadCloud,
  LoaderCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token, loading } = useSelector((state) => state.auth);

  const cardPalette = [
    { bg: "from-cyan-50 to-cyan-100/80", border: "border-cyan-200", icon: "text-cyan-600" },
    { bg: "from-emerald-50 to-emerald-100/80", border: "border-emerald-200", icon: "text-emerald-600" },
    { bg: "from-sky-50 to-sky-100/80", border: "border-sky-200", icon: "text-sky-600" },
    { bg: "from-teal-50 to-teal-100/80", border: "border-teal-200", icon: "text-teal-600" },
    { bg: "from-blue-50 to-blue-100/80", border: "border-blue-200", icon: "text-blue-600" },
  ];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = useCallback(async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const timerId = setTimeout(() => {
        loadAllResumes();
      }, 0);
      return () => clearTimeout(timerId);
    }
  }, [token, loadAllResumes]);

  const createResume = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.put(
        "/api/resumes/update/",
        { resumeId: editResumeId, resumeData: { title } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAllResumes((prev) =>
        prev.map((item) =>
          item._id === editResumeId ? { ...item, title } : item,
        ),
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this resume?",
      );
      if (confirmed) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAllResumes((prev) => prev.filter((item) => item._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const closeCreateModal = () => {
    setShowCreateResume(false);
    setTitle("");
  };

  const closeUploadModal = () => {
    setShowUploadResume(false);
    setTitle("");
    setResume(null);
  };

  const closeEditModal = () => {
    setEditResumeId("");
    setTitle("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="rounded-full border border-red-200 bg-red-50 px-5 py-2 text-red-600">
          Unauthorized
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
              Dashboard
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Welcome back, {user?.name || "User"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Create, upload, edit, and manage all of your resume versions.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            {allResumes.length} resume{allResumes.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => setShowCreateResume(true)}
            className="group h-44 rounded-2xl border border-dashed border-cyan-300 bg-gradient-to-br from-cyan-50 to-cyan-100/70 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <PlusIcon className="mb-4 size-10 rounded-xl bg-white/80 p-2 text-cyan-700 ring-1 ring-cyan-200" />
            <p className="text-lg font-semibold text-slate-800">Create Resume</p>
            <p className="mt-1 text-sm text-slate-600">
              Start from scratch with guided sections and live preview.
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="group h-44 rounded-2xl border border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <UploadCloudIcon className="mb-4 size-10 rounded-xl bg-white/80 p-2 text-emerald-700 ring-1 ring-emerald-200" />
            <p className="text-lg font-semibold text-slate-800">
              Upload Existing Resume
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Import a PDF and let AI prefill your editable sections.
            </p>
          </button>
        </div>

        <div className="my-8 border-t border-slate-200/80" />

        {allResumes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-10 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-800">
              No resumes created yet
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Use “Create Resume” or “Upload Existing Resume” to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {allResumes.map((resumeItem, index) => {
              const theme = cardPalette[index % cardPalette.length];
              return (
                <button
                  onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
                  key={resumeItem._id}
                  className={`group relative h-52 rounded-2xl border bg-gradient-to-br ${theme.bg} ${theme.border} p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
                >
                  <FilePenLineIcon className={`size-7 ${theme.icon}`} />

                  <p className="mt-4 line-clamp-2 text-base font-semibold text-slate-800">
                    {resumeItem.title}
                  </p>

                  <p className="absolute bottom-4 text-xs text-slate-600">
                    Updated{" "}
                    {new Date(resumeItem.updatedAt).toLocaleDateString()}
                  </p>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-2 top-2 hidden items-center rounded-full border border-white/70 bg-white/70 p-1 backdrop-blur group-hover:flex"
                  >
                    <button
                      type="button"
                      onClick={() => deleteResume(resumeItem._id)}
                      className="rounded-md p-1.5 text-slate-700 transition hover:bg-white"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditResumeId(resumeItem._id);
                        setTitle(resumeItem.title);
                      }}
                      className="rounded-md p-1.5 text-slate-700 transition hover:bg-white"
                    >
                      <PencilIcon className="size-4" />
                    </button>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={closeCreateModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                Create a Resume
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Give your resume a title to begin.
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="mt-5 w-full"
                required
              />

              <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                Create Resume
              </button>

              <button
                type="button"
                className="absolute right-4 top-4 rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
                onClick={closeCreateModal}
              >
                <XIcon className="size-4" />
              </button>
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={closeUploadModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                Upload Resume
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Upload a PDF and let AI extract sections for editing.
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="mt-5 w-full"
                required
              />

              <label htmlFor="resume-input" className="mt-4 block text-sm">
                <div className="mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-slate-500 transition hover:border-cyan-300 hover:bg-cyan-50">
                  {resume ? (
                    <p className="font-medium text-emerald-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-12 stroke-1.5" />
                      <p>Select resume PDF</p>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button
                disabled={isLoading || !resume}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading && (
                  <LoaderCircleIcon className="size-4 animate-spin text-white" />
                )}
                {isLoading ? "Uploading..." : "Upload Resume"}
              </button>

              <button
                type="button"
                className="absolute right-4 top-4 rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
                onClick={closeUploadModal}
              >
                <XIcon className="size-4" />
              </button>
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={closeEditModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                Edit Resume Title
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Update the title shown on your dashboard.
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="mt-5 w-full"
                required
              />

              <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                Update
              </button>

              <button
                type="button"
                className="absolute right-4 top-4 rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
                onClick={closeEditModal}
              >
                <XIcon className="size-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
