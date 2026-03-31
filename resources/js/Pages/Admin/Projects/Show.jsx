import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
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
                             Editor Konten
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
                                     ? "Seluruh data inti sudah lengkap dan layak tayang." 
                                     : "Beberapa data krusial pernikahan belum lengkap. Harap selesaikan checklist sebelum rilis."}
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

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <StatCard label="Total Tamu" value={stats.guests_count} unit="Tamu" color="amber" />
                          <StatCard label="Hadir (RSVP)" value={stats.attending_total} unit="Pax" color="emerald" />
                          <StatCard label="Wishes Received" value={invite?.guest_messages?.length || 0} unit="Pesan" color="indigo" />
                     </div>

                     {/* RSVP List Section */}
                     <SectionCard title="Respon RSVP Tamu" actions={<div className="flex gap-4 text-[9px] font-black uppercase tracking-widest"><span className="text-emerald-600">{stats.attending_total} Hadir</span><span className="text-amber-600">{stats.maybe_total} Ragu</span><span className="text-gray-400">{stats.not_attending_total} Tidak</span></div>}>
                         <div className="overflow-x-auto -mx-6 sm:mx-0">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                        <th className="px-6 py-4">Tamu</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Pax</th>
                                        <th className="px-6 py-4">Catatan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {(invite?.rsvps || []).length > 0 ? invite.rsvps.map((rsvp) => (
                                        <tr key={rsvp.id} className="text-xs group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-black tracking-tight">{rsvp.name}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge 
                                                    status={rsvp.attendance_status} 
                                                    type={rsvp.attendance_status === 'attending' ? 'success' : (rsvp.attendance_status === 'maybe' ? 'warning' : 'default')} 
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-black">{rsvp.guest_count}</td>
                                            <td className="px-6 py-4 text-gray-400 italic text-[11px] font-medium">{rsvp.notes || '-'}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">Belum ada respon RSVP untuk project ini.</td></tr>
                                    )}
                                </tbody>
                            </table>
                         </div>
                     </SectionCard>

                     {/* Wishes List Section */}
                     <SectionCard title="Ucapan & Doa (Wishes)">
                         <div className="space-y-4 max-h-[300px] overflow-y-auto px-1">
                             {(invite?.guest_messages || []).length > 0 ? invite.guest_messages.map((m) => (
                                 <div key={m.id} className="p-5 rounded-3xl bg-neutral-50/50 border border-neutral-100 flex gap-4 items-start">
                                     <div className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center font-black text-xs text-indigo-600 shrink-0">{m.name.charAt(0)}</div>
                                     <div className="space-y-1">
                                         <div className="flex items-center gap-2">
                                             <span className="font-black text-gray-900 text-xs">{m.name}</span>
                                             <span className="text-[9px] font-bold text-gray-400">{new Date(m.created_at).toLocaleDateString()}</span>
                                         </div>
                                         <p className="text-xs text-gray-600 font-medium leading-relaxed italic">"{m.message}"</p>
                                     </div>
                                 </div>
                             )) : (
                                 <div className="py-10 text-center text-gray-400 italic text-sm">Belum ada kiriman ucapan.</div>
                             )}
                         </div>
                     </SectionCard>

                     <SectionCard title="Administrasi & Konten (Read Only)">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                             <DetailItem label="Nama Project" value={project.name_project} />
                             <DetailItem label="Template Terpilih" value={invite?.template?.name || "Belum dipilih"} />
                             <DetailItem label="Mempelai Wanita" value={invite?.bride_full_name || "-"} />
                             <DetailItem label="Mempelai Pria" value={invite?.groom_full_name || "-"} />
                         </div>
                     </SectionCard>
                </div>
                
                {/* Right Side: Checklist & Publishing */}
                <div className="space-y-8">
                    <SectionCard title="Wedding Checklist">
                        <div className="space-y-4">
                             <CheckItem label="Template Desain" status={checklist.template_selected} />
                             <CheckItem label="Data Mempelai Lengkap" status={checklist.mempelai_complete} />
                             <CheckItem label="Minimal 1 Jadwal Acara" status={checklist.event_schedule_exists} />
                             <CheckItem label="Slug Alamat Publik" status={checklist.slug_valid} />
                             <CheckItem label="Daftar Tamu" status={checklist.has_guests} />
                        </div>

                        <div className="pt-8 mt-8 border-t border-gray-50 space-y-6 text-center">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Status Publikasi</label>
                            
                            <StatusBadge 
                                status={invite?.is_published ? 'PUBLISHED' : 'DRAFT'} 
                                type={invite?.is_published ? 'success' : 'warning'} 
                            />

                            <div className="pt-2">
                                 <p className="text-[10px] font-bold text-gray-400 leading-relaxed px-4 italic">
                                     {invite?.is_published ? "Tamu sudah bisa mengakses link publik." : "Undangan masih dalam tahap pengerjaan."}
                                 </p>
                            </div>

                            <Link href={route('projects.edit', project.id)} className={`w-full font-black py-4 px-6 rounded-[24px] transition-all shadow-xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest ${invite?.is_published ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'}`}>
                                 {invite?.is_published ? 'Unpublish Undangan' : 'Sempurnakan & Publish'}
                            </Link>
                        </div>
                    </SectionCard>

                    <div className="p-8 rounded-[40px] bg-gray-900 text-white space-y-4 shadow-2xl">
                         <h6 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Client Note</h6>
                         <p className="text-xs text-indigo-100/70 font-medium leading-relaxed italic">"{project.notes || "Belum ada catatan khusus untuk project ini. Tambahkan di editor jika perlu."}"</p>
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

function StatCard({ label, value, unit, color, link = null }) {
    const bgColors = {
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
        indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
        amber: 'bg-amber-50 border-amber-100 text-amber-600',
    };
    const textColors = {
        emerald: 'text-emerald-900',
        indigo: 'text-indigo-900',
        amber: 'text-amber-900',
    };

    return (
        <div className={`${bgColors[color]} border p-6 rounded-[30px] space-y-1`}>
            <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{label}</p>
            <h5 className={`text-2xl font-black ${textColors[color]}`}>{value} <span className="text-[10px] opacity-40">{unit}</span></h5>
            {link && <Link href={link} className="inline-block mt-3 text-[9px] font-black underline uppercase tracking-widest opacity-60 hover:opacity-100">View &rarr;</Link>}
        </div>
    );
}

function CheckItem({ label, status }) {
    return (
        <div className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${status ? 'bg-emerald-50/20 border-emerald-100' : 'bg-gray-50/50 border-gray-100'}`}>
             <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${status ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                 {status ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                 ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                 )}
             </div>
             <span className={`text-[10px] font-black uppercase tracking-widest ${status ? 'text-emerald-900 opacity-80' : 'text-gray-400'}`}>{label}</span>
        </div>
    );
}
