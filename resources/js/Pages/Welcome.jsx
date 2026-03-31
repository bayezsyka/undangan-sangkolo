import React from 'react';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Setup Success" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <main className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 max-w-md w-full transition-all hover:scale-[1.02] duration-300">
                    <div className="w-20 h-20 bg-gradient-to-tr from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                        Setup Berhasil!
                    </h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Laravel + Inertia React + Tailwind CSS sudah siap digunakan untuk membangun <span className="font-semibold text-indigo-600">Undangan Sangkolo</span>.
                    </p>
                    
                    <div className="grid gap-3">
                        <div className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-left">
                            <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">1</span>
                            <span className="text-sm font-medium text-gray-700">Inertia React Aktif</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-left">
                            <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">2</span>
                            <span className="text-sm font-medium text-gray-700">Tailwind CSS 4.0 Terintegrasi</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-left">
                            <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">3</span>
                            <span className="text-sm font-medium text-gray-700">Struktur Folder Bersih</span>
                        </div>
                    </div>
                    
                    <footer className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Farros - Undangan Sangkolo Project
                    </footer>
                </main>
                
                <div className="mt-8 text-indigo-400 animate-pulse text-sm font-medium">
                    Admin Panel Foundation Initialized
                </div>
            </div>
        </>
    );
}
