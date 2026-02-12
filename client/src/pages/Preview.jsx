import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "lucide-react";
import api from "../configs/api";

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = useCallback(async () => {
    try {
      const { data } = await api.get("/api/resumes/public/" + resumeId);
      setResumeData({
        ...data.resume,
        project: data.resume.project || data.resume.projects || [],
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  if (isLoading) {
    return <Loader />;
  }

  if (!resumeData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-cyan-50/35 to-emerald-50/30 px-4 text-center">
        <p className="text-3xl font-semibold text-slate-700 sm:text-5xl">
          Resume not found
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-6 py-2.5 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100"
        >
          <ArrowLeftIcon className="size-4" />
          Go to home page
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/35 to-emerald-50/30">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm transition hover:text-slate-900"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Link>
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  );
};

export default Preview;
