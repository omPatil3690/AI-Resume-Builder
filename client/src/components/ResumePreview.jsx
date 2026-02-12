import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({ data, template, accentColor, classes = '' }) => {

    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />
        }
    }

    return (
        <div className="w-full bg-gradient-to-b from-slate-100 to-slate-200/70 p-2 sm:p-3">
            <div
                id="resume-preview"
                className={'overflow-hidden rounded-xl border border-slate-200 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.55)] print:shadow-none print:border-none ' + classes}>
                {renderTemplate()}
            </div>
            <style jsx>
                {
                    `
    @page {
  size: letter;
  margin: 0;
}

@media print {
  html,
  body {
    width: 8.5in;
    height: 11in;
    overflow: hidden;
  }

  body * {
    visibility: hidden;
  }

  #resume-preview,
  #resume-preview * {
    visibility: visible;
  }

  #resume-preview {
    position: absolute;
    left: 0;
  top: 0;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  box-shadow: none !important;
  border: none !important;
  }
}

    `
                }
            </style>
        </div>
    )
}

export default ResumePreview
