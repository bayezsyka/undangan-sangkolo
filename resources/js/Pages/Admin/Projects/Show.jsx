import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Show({ auth, project, stats, checklist, is_ready_to_publish, publish_progress, app_url }) {
    const invite = project.invitation;
    const [copying, setCopying] = useState(false);

    const copyLink = (url) => {
        navigator.clipboard.writeText(url);
        setCopying(true);
        setTimeout(() => setCopying(false), 2000);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Mission Control: ${project.name_project}`} />
            
            <PageHeader 
                title="Mission Control" 
                subtitle={`Pusat kerja strategis untuk ${project.name_project}`}
                actions={
                    <div className="flex gap-3">
                        <Link href={route('projects.edit', project.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2.5 px-8 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] text-sm flex items-center gap-2 uppercase tracking-widest">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                             Edit Content
                        </Link>
                        <Link href={route('projects.index')} className="text-sm font-bold text-gray-500 hover:text-gray-900 border border-gray-100 bg-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all">
                             Project List
                        </Link>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Summary & Data */}
                <div className="lg:col-span-2 space-y-8">
                     {/* Progress & Quick Links */}
                     <div className="bg-white border border-gray-100 rounded-[40px] p-8 lg:p-10 shadow-2xl shadow-gray-100 flex flex-col md:flex-row items-center gap-10">
                        <div className="relative shrink-0">
                             <svg className="w-32 h-32 transform -rotate-90">
                                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-50" />
                                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * publish_progress) / 100} className="text-indigo-600 transition-all duration-1000 ease-out" strokeLinecap="round" />
                             </svg>
                             <div className="absolute inset-0 flex items-center justify-center flex-col">
                                 <span className="text-2xl font-black text-gray-900">{publish_progress}%</span>
                                 <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Ready</span>
                             </div>
                        </div>
                        <div className="flex-1 space-y-4">
                             <h4 className="text-2xl font-black text-gray-900 tracking-tight">Status Kesiapan Produk</h4>
                             <p className="text-sm font-medium text-gray-400 leading-relaxed max-w-sm">
                                 {is_ready_to_publish 
                                    ? "Seluruh data inti sudah lengkap. Undangan siap dipublikasikan ke tamu." 
                                    : "Beberapa data krusial belum lengkap. Harap selesaikan checklist sebelum rilis."}
                             </p>
                             <div className="flex flex-wrap gap-3">
                                 {invite && (
                                     <button onClick={() => copyLink(`${app_url}/v/${invite.slug}`)} className={`text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl border transition-all ${copying ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-white'}`}>
                                         {copying ? 'Slug Copied!' : 'Copy Generic Link'}
                                     </button>
                                 )}
                                 {invite?.is_published && (
                                     <a href={`${app_url}/v/${invite.slug}`} target="_blank" className="text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-all flex items-center gap-2">
                                         Open Live Preview
                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                     </a>
                                 )}
                             </div>
                        </div>
                     </div>

                     <SectionCard title="Administrasi & Konten">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                             <DetailItem label="Nama Project" value={project.name_project} />
                             <DetailItem label="Template Terpilih" value={invite?.template?.name || "Belum dipilih"} />
                             <DetailItem label="Mempelai / Host" value={invite?.host_names || "-"} />
                             <DetailItem label="Waktu & Lokasi" value={invite ? `${invite.event_time} @ ${invite.event_location_name}` : "-"} span={2} />
                         </div>
                     </SectionCard>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[40px] space-y-2">
                              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Database Tamu</p>
                              <h5 className="text-3xl font-black text-emerald-900">{stats.guests_count} <span className="text-sm font-bold opacity-40 uppercase tracking-tighter ml-1">Tamu</span></h5>
                              <Link href={route('projects.guests.index', project.id)} className="inline-block mt-4 text-[10px] font-black text-emerald-700 bg-white px-5 py-2.5 rounded-full shadow-sm hover:translate-x-1 transition-all uppercase tracking-widest">Kelola Daftar Tamu &rarr;</Link>
                         </div>
                         <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[40px] space-y-2">
                              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Respon RSVP</p>
                              <h5 className="text-3xl font-black text-indigo-900">{stats.rsvp_count} <span className="text-sm font-bold opacity-40 uppercase tracking-tighter ml-1">Respon</span></h5>
                              <Link href={route('rsvp.index')} className="inline-block mt-4 text-[10px] font-black text-indigo-700 bg-white px-5 py-2.5 rounded-full shadow-sm hover:translate-x-1 transition-all uppercase tracking-widest">Buka Inbox RSVP &rarr;</Link>
                         </div>
                     </div>
                </div>
                
                {/* Right Side: Checklist & Publishing */}
                <div className="space-y-8">
                    <SectionCard title="Publish Checklist">
                        <div className="space-y-6">
                             <CheckItem label="Pilih Template Desain" status={checklist.template_selected} />
                             <CheckItem label="Isi Detail Acara (Waktu & Loc)" status={checklist.event_data_complete} />
                             <CheckItem label="Atur Nama Mempelai / Host" status={checklist.host_names_set} />
                             <CheckItem label="Slug Alamat Publik Valid" status={checklist.slug_valid} />
                             <CheckItem label="Import Minimal 1 Tamu" status={checklist.has_guests} />
                        </div>

                        <div className="pt-10 mt-10 border-t border-gray-50 space-y-6 text-center">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Final Action</label>
                            
                            <StatusBadge 
                                status={invite?.is_published ? 'PUBLISHED' : 'DRAFT'} 
                                type={invite?.is_published ? 'success' : 'warning'} 
                            />

                            <div className="pt-4">
                                {is_ready_to_publish ? (
                                     <p className="text-xs font-bold text-gray-400 leading-relaxed px-4">Siap untuk ditayangkan. Klik tombol di bawah untuk mengubah status tayang.</p>
                                ) : (
                                     <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                         Blocker Ditemukan
                                     </p>
                                )}
                            </div>

                            <Link href={route('projects.edit', project.id)} className={`w-full font-black py-4 px-6 rounded-3xl transition-all shadow-xl flex items-center justify-center gap-3 text-xs uppercase tracking-widest ${invite?.is_published ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'}`}>
                                 {invite?.is_published ? 'Unpublish Undangan' : 'Atur Publikasi'}
                            </Link>
                        </div>
                    </SectionCard>

                    <div className="p-8 rounded-[40px] bg-gray-50 border border-gray-100 italic">
                         <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">📌 Catatan Operator</h6>
                         <p className="text-xs text-gray-500 font-medium leading-relaxed">{project.notes || "Gunakan Checklist di atas untuk memantau kelengkapan produk sebelum dibagikan ke client."}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DetailItem({ label, value, span = 1 }) {
    return (
        <div className={span === 2 ? 'md:col-span-2' : ''}>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 leading-none pl-1">{label}</label>
            <p className="text-gray-900 font-black text-lg leading-tight tracking-tight">{value || "-"}</p>
        </div>
    );
}

function CheckItem({ label, status }) {
    return (
        <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${status ? 'bg-emerald-50/30 border-emerald-100' : 'bg-gray-50/50 border-gray-100'}`}>
             <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${status ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                 {status ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                 ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                 )}
             </div>
             <span className={`text-[11px] font-black uppercase tracking-widest ${status ? 'text-emerald-900 opacity-80' : 'text-gray-400'}`}>{label}</span>
        </div>
    );
}
