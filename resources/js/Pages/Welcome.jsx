import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-indigo-100">
            <Head title="Undangan Sangkolo - Digital Wedding Invitation" />
            
            {/* Header / Nav */}
            <nav className="h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black">S</div>
                    <span className="font-black text-lg tracking-tighter">Sangkolo.store</span>
                </div>
                <Link href={route('login')} className="bg-neutral-900 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-full hover:bg-indigo-600 transition-all">
                    Admin Portal
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                    <div className="inline-block bg-indigo-50 text-indigo-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                        Digital invitation platform
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-neutral-900">
                        Undangan <br />
                        Digital <br />
                        <span className="text-indigo-600 italic underline underline-offset-8">Sangkolo</span>
                    </h1>
                    <p className="text-lg text-neutral-500 font-medium leading-relaxed max-w-md italic">
                        "Ciptakan momen tak terlupakan dengan undangan digital minimalis, elegan, dan premium dalam hitungan menit."
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href={route('login')} className="bg-indigo-600 text-white font-black py-5 px-12 rounded-2xl text-xs uppercase tracking-widest shadow-2xl shadow-indigo-100 hover:bg-neutral-900 transition-all text-center">
                            Bangun Undangan Sekarang
                        </Link>
                        <a href="#templates" className="bg-neutral-50 text-neutral-400 font-black py-5 px-12 rounded-2xl text-xs uppercase tracking-widest border border-neutral-100 hover:bg-white hover:text-neutral-900 transition-all text-center">
                            Lihat Katalog
                        </a>
                    </div>
                </div>

                <div className="relative aspect-square">
                    <div className="absolute inset-x-8 -bottom-8 h-1/2 bg-indigo-100 rounded-[60px] -rotate-3 -z-10 blur-2xl opacity-40"></div>
                    <div className="w-full h-full bg-neutral-50 rounded-[60px] border border-neutral-100 overflow-hidden shadow-2xl rotate-2 relative">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent flex flex-col justify-end p-12 text-white">
                             <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 underline underline-offset-4 mb-2">Sample Template No. 01</p>
                             <h3 className="text-3xl font-black tracking-tight leading-none uppercase">Wedding<br />Elegant Minimal</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Quick Grid */}
            <section id="templates" className="py-32 px-6 md:px-12 bg-neutral-50 rounded-t-[80px]">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-neutral-900 tracking-tighter uppercase whitespace-pre-wrap">Our Design <span className="text-indigo-600 italic">Philosophy</span></h2>
                        <p className="text-sm font-medium text-neutral-400 max-w-sm mx-auto leading-relaxed">Kami percaya bahwa undangan digital harus terasa semewah undangan fisik.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <TemplatePreviewCard 
                             title="Wedding Elegant Minimal" 
                             description="Desain bersih dengan tipografi sans-serif modern dominasi white-space." 
                             tag="Popular" 
                             img="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500"
                        />
                        <TemplatePreviewCard 
                             title="Modern Floral" 
                             description="Sentuhan alam dengan dekorasi bunga garis halus yang memanjakan mata." 
                             tag="New" 
                             img="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=500"
                        />
                        <TemplatePreviewCard 
                             title="Dark Luxury" 
                             description="Warna hitam pekat dengan aksen emas untuk kesan super-premium & misterius." 
                             tag="Limited" 
                             img="https://images.unsplash.com/photo-1563245372-f21724e3a453?auto=format&fit=crop&q=80&w=500"
                        />
                    </div>
                </div>
            </section>

            {/* Contact / Footer */}
            <footer className="py-24 px-6 md:px-12 bg-white text-center border-t border-neutral-100">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black">S</div>
                    <span className="font-black text-lg tracking-tighter">Sangkolo.store</span>
                </div>
                <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em] mb-12">Proudly created in Makassar with ❤️</p>
                <div className="flex justify-center gap-8 text-[10px] font-black text-neutral-900 uppercase tracking-widest opacity-60">
                    <a href="#" className="hover:text-indigo-600">Instagram</a>
                    <a href="#" className="hover:text-indigo-600">TikTok</a>
                    <a href="#" className="hover:text-indigo-600">WhatsApp</a>
                </div>
            </footer>
        </div>
    );
}

function TemplatePreviewCard({ title, description, tag, img }) {
    return (
        <div className="group space-y-6">
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-neutral-100 relative shadow-xl shadow-neutral-100/50">
                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">{tag}</span>
                </div>
            </div>
            <div className="px-4 space-y-2">
                <h4 className="text-xl font-black text-neutral-900 tracking-tight">{title}</h4>
                <p className="text-xs font-medium text-neutral-400 leading-relaxed italic line-clamp-2">"{description}"</p>
            </div>
        </div>
    );
}
