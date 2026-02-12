import React from "react"

const Loader = ()=>{
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-cyan-50/40 to-emerald-50/30">
            <div className="relative">
                <div className="size-14 rounded-full border-4 border-cyan-200 border-t-cyan-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border-4 border-emerald-200 border-b-emerald-500 animate-spin [animation-direction:reverse]" />
            </div>
        </div>
    )
}
export default Loader
