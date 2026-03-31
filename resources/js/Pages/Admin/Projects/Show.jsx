import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Show({ auth, project }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Project: ${project.name_project}`} />
            
            <PageHeader 
                title="Detail Project" 
                subtitle={`Mengelola operasional untuk ${project.name_project}`}
                actions={
                    <div className="flex gap-3">
                        <Link href={route('projects.edit', project.id)} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-[0.98] text-sm flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                             Edit
                        </Link>
                        <Link href={route('projects.index')} className="text-sm font-bold text-gray-500 hover:text-gray-900 border border-transparent px-4 py-2.5 flex items-center gap-2 transition-all">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                             Kembali
                        </Link>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <SectionCard title="Rincian Pelaksanaan">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                             <DetailItem label="Nama Project" value={project.name_project} />
                             <DetailItem label="Nama Client" value={project.client.name} />
                             <DetailItem label="Jenis Acara" value={project.event_type} />
                             <DetailItem label="Tanggal Acara" value={new Date(project.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} />
                             <DetailItem label="Deadline Kerja" value={project.deadline ? new Date(project.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"} />
                             <DetailItem label="Status Pembayaran" value={project.status_order.toUpperCase()} />
                        </div>
                        <div className="mt-10 pt-10 border-t border-gray-50">
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Catatan Internal</label>
                             <div className="text-sm text-gray-700 leading-relaxed font-bold bg-gray-50 p-6 rounded-3xl border border-gray-100 italic">
                                 {project.notes || "Tidak ada catatan internal."}
                             </div>
                        </div>
                     </SectionCard>
                </div>
                
                <div className="space-y-8">
                    <SectionCard title="Status Kerja">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Progres Project</label>
                                <StatusBadge 
                                    status={project.status_project} 
                                    type={project.status_project === 'finished' ? 'success' : (project.status_project === 'designing' ? 'primary' : 'default')} 
                                />
                            </div>
                            
                            <div className="pt-6 border-t border-gray-50">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Slot Prioritas</label>
                                {project.is_active_slot ? (
                                     <div className="bg-indigo-600 text-white p-4 rounded-2xl flex items-center gap-3">
                                         <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
                                         <span className="text-xs font-black uppercase tracking-widest leading-none mt-0.5">Sedang Dikerjakan</span>
                                     </div>
                                ) : (
                                     <div className="bg-gray-100 text-gray-400 p-4 rounded-2xl flex items-center gap-3 border border-gray-200">
                                         <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                                         <span className="text-xs font-black uppercase tracking-widest leading-none mt-0.5">Dalam Antrean / WL</span>
                                     </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-gray-50">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Akses Undangan</label>
                                {project.invitation ? (
                                     <Link className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-black py-4 px-6 rounded-2xl border border-indigo-100 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-wider">
                                         Buka Editor Undangan
                                     </Link>
                                ) : (
                                     <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-400 font-black py-4 px-6 rounded-2xl border border-gray-100 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-wider cursor-not-allowed">
                                         Belum Ada Undangan
                                     </button>
                                )}
                            </div>
                        </div>
                    </SectionCard>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DetailItem({ label, value }) {
    return (
        <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">{label}</label>
            <p className="text-gray-900 font-bold text-lg leading-tight">{value || "-"}</p>
        </div>
    );
}
