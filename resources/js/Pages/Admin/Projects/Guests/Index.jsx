import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge, EmptyState } from '@/Components/UI';

export default function Index({ auth, project, guests, app_url }) {
    const { flash } = usePage().props;
    const [showImport, setShowImport] = useState(false);
    const [copyingId, setCopyingId] = useState(null);

    // Form for Import
    const { data: importData, setData: setImportData, post: postImport, processing: importProcessing, errors: importErrors, reset: resetImport } = useForm({
        file: null,
    });

    const submitImport = (e) => {
        e.preventDefault();
        postImport(route('projects.guests.import', project.id), {
            onSuccess: () => {
                setShowImport(false);
                resetImport();
            },
        });
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopyingId(id);
        setTimeout(() => setCopyingId(null), 2000);
    };

    const getWaLink = (guest) => {
        const link = `${app_url}/v/${project.invitation.slug}/${guest.guest_code}`;
        const message = `Halo *${guest.name}*,\n\nKami mengundang Anda untuk hadir di acara kami. Detail undangan dapat dilihat pada tautan berikut:\n\n${link}\n\nMerupakan suatu kehormatan bagi kami jika Anda berkenan hadir. Terima kasih!`;
        return `https://wa.me/${guest.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Daftar Tamu: ${project.name_project}`} />
            
            <PageHeader 
                title="Personalisasi Tamu" 
                subtitle={`Mengelola tautan unik untuk masing-masing tamu ${project.name_project}`}
                actions={
                    <div className="flex gap-3">
                         <a href={route('projects.guests.export', project.id)} target="_blank" className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all text-sm flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                             Export ke CSV
                         </a>
                         <button onClick={() => setShowImport(!showImport)} className="bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all text-sm flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                             Pintu Import
                         </button>
                         <Link href={route('projects.show', project.id)} className="text-sm font-bold text-gray-500 hover:text-gray-900 border border-transparent px-4 py-2.5 flex items-center gap-2 transition-all">
                             Batal
                         </Link>
                    </div>
                }
            />

            {/* Status Invitation Notice if Unpublished */}
            {!project.invitation.is_published && (
                <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-3xl flex items-center gap-4 text-amber-800">
                    <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <p className="text-xs font-bold leading-relaxed">Peringatan: Undangan berstatus <span className="uppercase tracking-widest font-black">Draft</span>. Link di bawah mungkin belum bisa diakses tamu hingga status diubah menjadi Published.</p>
                </div>
            )}

            {/* Import Feedback Section */}
            {flash?.success_import && (
                <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl animate-in slide-in-from-top duration-500">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-black text-emerald-900 flex items-center gap-2 italic">📌 Scan Log Import</h4>
                    </div>
                    <div className="flex gap-8">
                         <div>
                             <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Berhasil</p>
                             <p className="text-2xl font-black text-emerald-900">{flash.success_import.success_count}</p>
                         </div>
                         <div>
                             <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest leading-none mb-1">Gagal</p>
                             <p className="text-2xl font-black text-rose-500">{flash.success_import.failed_count}</p>
                         </div>
                    </div>
                    {flash.success_import.errors?.length > 0 && (
                        <div className="mt-6 p-4 bg-white/50 rounded-2xl space-y-1">
                             {flash.success_import.errors.map((err, i) => <p key={i} className="text-[11px] font-bold text-rose-400">⚠️ {err}</p>)}
                        </div>
                    )}
                </div>
            )}

            {/* Import Form */}
            {showImport && (
                <SectionCard title="Update Database Tamu" className="mb-8 animate-in slide-in-from-right duration-300">
                    <form onSubmit={submitImport} className="space-y-6">
                        <div className="p-10 border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50/50 text-center">
                             <input type="file" className="hidden" id="excel-upload" onChange={e => setImportData('file', e.target.files[0])} />
                             <label htmlFor="excel-upload" className="cursor-pointer block group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm group-hover:bg-indigo-50 transition-colors">
                                     <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                </div>
                                <p className="text-sm font-black text-gray-700">{importData.file ? importData.file.name : 'Pilih File XLSX'}</p>
                             </label>
                        </div>
                        <div className="flex items-center justify-between">
                             <a href={route('projects.guests.template', project.id)} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Download Format (.csv)</a>
                             <button type="submit" disabled={importProcessing || !importData.file} className="bg-indigo-600 text-white font-black py-3 px-10 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 disabled:opacity-50">Mulai Proses</button>
                        </div>
                    </form>
                </SectionCard>
            )}

            {/* Guests List */}
            <div className="grid grid-cols-1 gap-6 pb-20">
                {guests.data.map(guest => {
                    const uniqueUrl = `${app_url}/v/${project.invitation.slug}/${guest.guest_code}`;
                    return (
                        <div key={guest.id} className="bg-white border border-gray-100 rounded-[40px] p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 hover:shadow-xl hover:shadow-gray-100 transition-all duration-500">
                             <div className="space-y-2 max-w-sm">
                                 <div className="flex items-center gap-3">
                                     <h4 className="text-xl font-black text-gray-900 tracking-tight">{guest.name}</h4>
                                     <StatusBadge 
                                        status={guest.category || 'Reguler'} 
                                        type={guest.category?.toLowerCase() === 'vip' ? 'warning' : 'default'} 
                                     />
                                 </div>
                                 <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                                     <span className="flex items-center gap-1.5"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{guest.phone || "-"}</span>
                                     <span className="flex items-center gap-1.5"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{guest.location || "-"}</span>
                                 </div>
                                 <div className="bg-gray-50 inline-block px-3 py-1.5 rounded-full border border-gray-100 flex items-center gap-2 max-w-full">
                                      <code className="text-[10px] font-black text-indigo-600 truncate">{uniqueUrl}</code>
                                      <button onClick={() => copyToClipboard(uniqueUrl, guest.id)} className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full transition-all ${copyingId === guest.id ? 'bg-emerald-500 text-white' : 'bg-white text-gray-400 hover:text-indigo-600'}`}>
                                          {copyingId === guest.id ? 'Copied!' : 'Copy'}
                                      </button>
                                 </div>
                             </div>

                             <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0 border-t lg:border-t-0 pt-6 lg:pt-0 border-gray-50">
                                 {guest.phone && (
                                     <a href={getWaLink(guest)} target="_blank" className="flex-1 lg:flex-none bg-emerald-50 text-emerald-600 font-black py-4 px-8 rounded-3xl border border-emerald-100 hover:bg-emerald-100 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                         Kirim Link WA
                                     </a>
                                 )}
                                 <Link 
                                    href={route('projects.guests.regenerate', [project.id, guest.id])} 
                                    method="post"
                                    className="bg-gray-50 text-gray-400 font-bold p-4 rounded-3xl border border-gray-100 hover:text-indigo-600 transition-all"
                                 >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                 </Link>
                             </div>
                        </div>
                    );
                })}

                {guests.data.length === 0 && (
                    <EmptyState 
                        title="Belum Ada Target Tamu" 
                        description="Segera import daftar tamu untuk men-generate link personal mereka."
                        icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
