import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Show({ auth, lead }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Lead: ${lead.name_calon}`} />
            
            <PageHeader 
                title="Detail Lead" 
                subtitle={`Melihat rincian prospek ${lead.name_calon}`}
                actions={
                    <div className="flex gap-3">
                        <Link href={route('leads.edit', lead.id)} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-[0.98] text-sm flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                             Edit
                        </Link>
                        <Link href={route('leads.index')} className="text-sm font-bold text-gray-500 hover:text-gray-900 border border-transparent px-4 py-2.5 flex items-center gap-2 transition-all">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                             Kembali
                        </Link>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <SectionCard title="Informasi Lengkap">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                             <DetailItem label="Nama Lengkap" value={lead.name_calon} />
                             <DetailItem label="Nomor WhatsApp" value={lead.whatsapp} />
                             <DetailItem label="Jenis & Rencana Acara" value={`${lead.event_type} • ${lead.event_date ? new Date(lead.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Belum ditentukan'}`} />
                             <DetailItem label="Sumber Lead" value={lead.source} />
                             <div className="md:col-span-2 pt-6 border-t border-gray-50">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Catatan Prospek</label>
                                 <div className="text-sm text-gray-700 leading-relaxed font-bold bg-gray-50 p-6 rounded-3xl min-h-[100px] border border-gray-100 italic">
                                     {lead.notes || "Tidak ada catatan untuk lead ini."}
                                 </div>
                             </div>
                        </div>
                     </SectionCard>
                </div>
                
                <div className="space-y-8">
                    <SectionCard title="Status & Aksi">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Status Saat Ini</label>
                                <StatusBadge 
                                    status={lead.status} 
                                    type={lead.status === 'closed' ? 'success' : (lead.status === 'lost' ? 'danger' : (lead.status === 'negotiating' ? 'warning' : (lead.status === 'new' ? 'primary' : 'default')))} 
                                />
                            </div>
                            
                            <div className="pt-6 border-t border-gray-50">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 italic">Quick Conversion (Placeholder)</label>
                                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-emerald-50 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xs uppercase tracking-wider">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" /></svg>
                                    Jadikan Project
                                </button>
                                <p className="text-[10px] text-gray-400 mt-4 text-center leading-relaxed">
                                     Klik tombol di atas untuk mengubah lead ini menjadi project baru setelah deal tercapai.
                                </p>
                            </div>
                        </div>
                    </SectionCard>
                    
                    <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-100 rotate-1">
                        <h4 className="font-black text-lg mb-2">💡 Tips Solo Operator</h4>
                        <p className="text-sm text-indigo-100 leading-relaxed font-medium">Jangan biarkan lead menganggur lebih dari 24 jam. Segera hubungi via WhatsApp untuk menjaga momentum order.</p>
                    </div>
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
