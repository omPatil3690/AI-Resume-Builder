import React, { useState } from 'react'
import { Layout, Check } from 'lucide-react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        {
            id: 'classic',
            name: 'Classic',
            preview:
                'A clean, traditional resume format with clear sections and professional typography',
        },
        {
            id: 'modern',
            name: 'Modern',
            preview:
                'A clean, traditional resume format with clear sections and professional typography',
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview:
                "Minimal design with a single image and clean typography",
        },
        {
            id: "minimal",
            name: "Minimal",
            preview:
                "Ultra-clean design that puts your content front and center",
        }
    ]

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-1 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100 hover:-translate-y-0.5 transition-all duration-200"
            >
                <Layout size={14} />
                <span className="max-sm:hidden">Template</span>
            </button>

            {isOpen && (
                <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 rounded-xl border border-slate-200/80 bg-white/95 backdrop-blur shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)]">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => {
                                onChange(template.id)
                                setIsOpen(false)
                            }}
                            className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id
                                ? 'border-cyan-300 bg-cyan-50'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                }`}>

                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2">
                                    <div className="size-5 bg-cyan-500 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                            )}
                            <div className="space-y-1">
                                <h4 className="font-medium text-slate-800">
                                    {template.name}
                                </h4>

                                <div className="mt-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500 italic">
                                    {template.preview}
                                </div>
                            </div>
                            {/* Template item content goes here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TemplateSelector
