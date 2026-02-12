import React from 'react'
import { useState } from 'react';
import { Palette, Check } from 'lucide-react';

const ColorPicker = ({ selectedColor, onChange }) => {
    const colors = [
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Indigo', value: '#6366F1' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Green', value: '#10B981' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Teal', value: '#14B8A6' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Gray', value: '#6B7280' },
        { name: 'Black', value: '#1F2937' },
    ]
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 hover:-translate-y-0.5 transition-all duration-200"
            >
                <Palette size={16} />
                <span className="max-sm:hidden">Accent</span>
            </button>

            {isOpen && (
                <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 rounded-xl border border-slate-200/80 bg-white/95 backdrop-blur shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)]">
                    {colors.map((color) => (
                        <div key={color.value} className='relative cursor-pointer group flex flex-col' onClick={() => { onChange(color.value); setIsOpen(false) }}>
                            <div
                                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-all group-hover:scale-105"
                                style={{ backgroundColor: color.value }}
                            >
                            </div>

                            {selectedColor === color.value && (
                                <div className="absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center">
                                    <Check className="size-5 text-white" />
                                </div>
                            )}

                            <p className="text-xs text-center mt-1 text-slate-600">
                                {color.name}
                            </p>


                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ColorPicker
