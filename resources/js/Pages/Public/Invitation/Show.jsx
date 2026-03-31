import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ invitation }) {
    const { template, sections, galleries, guest_messages, slug } = invitation;
    const settings = template.default_settings || {};
    
    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-indigo-100" style={{ '--primary': settings.primary_color || '#4f46e5' }}>
            <Head title={invitation.title} />
            
            {/* Modular Sections Rendering */}
            <div className="max-w-screen-sm mx-auto shadow-2xl bg-white min-h-screen">
                {sections.filter(s => s.is_active).map((section, idx) => (
                    <SectionRenderer 
                        key={section.id} 
                        section={section} 
                        galleries={galleries} 
                        messages={guest_messages}
                        slug={slug}
                        isFirst={idx === 0}
                    />
                ))}

                {/* Footer simple */}
                <footer className="py-12 px-6 text-center bg-slate-50 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dibuat Dengan ❤️ Oleh</p>
                    <h4 className="text-lg font-black text-indigo-600 tracking-tighter">Undangan Sangkolo</h4>
                </footer>
            </div>
        </div>
    );
}

function SectionRenderer({ section, galleries, messages, slug, isFirst }) {
    const { section_type, title, content } = section;

    switch (section_type) {
        case 'hero':
        case 'opening':
            return (
                <section className="relative h-screen flex items-center justify-center text-center p-8 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-10"></div>
                    <div className="relative z-20 space-y-6">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-indigo-300">{title || 'The Wedding of'}</p>
                        <h1 className="text-5xl font-black leading-none tracking-tight">{content?.couple_names || 'Mempelai Pria & Wanita'}</h1>
                        <p className="text-sm font-bold tracking-widest italic text-white/60">{content?.event_date_formatted || 'Minggu, 12 Desember 2026'}</p>
                        {isFirst && (
                             <div className="pt-12 animate-bounce opacity-40">
                                 <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                             </div>
                        )}
                    </div>
                </section>
            );

        case 'event':
        case 'location':
            return (
                <section className="py-20 px-8 text-center space-y-8 border-b border-slate-100">
                    <div className="space-y-2">
                        <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">{title || 'Acara Utama'}</h2>
                        <h3 className="text-3xl font-black text-slate-900">{content?.location_name || 'Gedung Pernikahan'}</h3>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                        <p className="text-sm font-bold leading-relaxed">{content?.address || 'Jl. Contoh Alamat No. 123, Kota Makassar'}</p>
                        <p className="text-xs font-bold text-slate-400 capitalize">{content?.time || 'Pukul 10:00 - Selesai'}</p>
                    </div>
                    {content?.maps_url && (
                        <a href={content.maps_url} target="_blank" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-black py-4 px-10 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-100">Buka Maps</a>
                    )}
                </section>
            );

        case 'gallery':
            return (
                <section className="py-20 px-4 text-center border-b border-slate-100">
                    <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-12">{title || 'Momen Bahagia'}</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {galleries.map((img, i) => (
                            <div key={i} className={`rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100 ${i % 3 === 0 ? 'col-span-2 aspect-video' : ''}`}>
                                <img src={img.image_path} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
            );

        case 'rsvp':
            return <RsvpSection slug={slug} title={title} />;

        case 'wishes':
        case 'guest_messages':
            return <WishesSection slug={slug} title={title} messages={messages} />;

        default:
            return null;
    }
}

function RsvpSection({ slug, title }) {
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        name: '',
        attendance_status: 'attending',
        guest_count: 1,
        notes: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('invitation.rsvp', slug), {
            onSuccess: () => reset(),
            preserveScroll: true
        });
    };

    return (
        <section className="py-20 px-8 bg-slate-50 border-b border-slate-100">
             <div className="text-center mb-12 space-y-2">
                 <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">{title || 'Konfirmasi Kehadiran'}</h2>
                 <p className="text-xs font-bold text-slate-400">Berikan kepastian kehadiran Anda.</p>
             </div>
             {recentlySuccessful ? (
                 <div className="p-8 rounded-3xl bg-indigo-600 text-white text-center font-black animate-pulse">Terima Kasih! Konfirmasi Terkirim.</div>
             ) : (
                <form onSubmit={submit} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Nama Lengkap"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-100 outline-none font-bold text-sm"
                        required
                    />
                    <select 
                         value={data.attendance_status}
                         onChange={e => setData('attendance_status', e.target.value)}
                         className="w-full p-4 rounded-2xl border border-slate-200 font-bold text-sm"
                    >
                         <option value="attending">Hadir</option>
                         <option value="maybe">Masih Ragu</option>
                         <option value="not_attending">Tidak Hadir</option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="Jumlah Tamu"
                        value={data.guest_count}
                        onChange={e => setData('guest_count', e.target.value)}
                        className="w-full p-4 rounded-2xl border border-slate-200 outline-none font-bold text-sm"
                        min="1" max="10"
                    />
                    <textarea 
                        placeholder="Catatan kecil (opsional)"
                        value={data.notes}
                        onChange={e => setData('notes', e.target.value)}
                        className="w-full p-4 rounded-2xl border border-slate-200 outline-none font-bold text-sm h-32"
                    ></textarea>
                    <button 
                        disabled={processing}
                        className="w-full bg-indigo-600 text-white font-black py-5 px-6 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all"
                    >
                        Kirim Konfirmasi
                    </button>
                </form>
             )}
        </section>
    );
}

function WishesSection({ slug, title, messages }) {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        relation: '',
        message: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('invitation.message', slug), {
            onSuccess: () => reset(),
            preserveScroll: true
        });
    };

    return (
        <section className="py-20 px-8 border-b border-slate-100">
             <div className="text-center mb-12 space-y-2">
                 <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">{title || 'Ucapan Doa'}</h2>
                 <p className="text-xs font-bold text-slate-400">Tuliskan pesan manis untuk kami.</p>
             </div>
             
             <form onSubmit={submit} className="mb-12 space-y-4 p-8 rounded-3xl border border-slate-100 bg-white shadow-sm">
                <input 
                    type="text" 
                    placeholder="Nama Anda"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full p-4 rounded-2xl border border-slate-50 bg-slate-50 focus:bg-white outline-none font-bold text-sm"
                    required
                />
                <textarea 
                    placeholder="Tulis ucapan & doa..."
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                    className="w-full p-4 rounded-2xl border border-slate-50 bg-slate-50 focus:bg-white outline-none font-bold text-sm h-32"
                    required
                ></textarea>
                <button 
                    disabled={processing}
                    className="w-full bg-slate-900 text-white font-black py-4 px-6 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-slate-100 active:scale-[0.98] transition-all"
                >
                    Kirim Ucapan
                </button>
             </form>

             <div className="space-y-6">
                {messages.length > 0 ? messages.map((m, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-slate-50 space-y-2 border border-slate-100">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-600">{m.name.charAt(0)}</div>
                             <p className="text-xs font-black text-slate-900">{m.name}</p>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-bold italic">"{m.message}"</p>
                    </div>
                )) : (
                    <div className="py-12 text-center text-slate-300 text-xs font-bold italic">Belum ada ucapan. Jadilah yang pertama!</div>
                )}
             </div>
        </section>
    );
}
