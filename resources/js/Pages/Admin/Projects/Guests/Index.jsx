import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge, EmptyState } from '@/Components/UI';

export default function Index({ auth, project, guests, app_url }) {
    const { flash } = usePage().props;
    const [showImport, setShowImport] = useState(false);
    const [copyingId, setCopyingId] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingGuest, setEditingGuest] = useState(null);

    // Form for Guest CRUD
    const { data: guestData, setData: setGuestData, post: postGuest, put: putGuest, delete: deleteGuest, processing: guestProcessing, reset: resetGuest } = useForm({
        name: '',
        phone: '',
        location: '',
        category: 'Reguler',
        notes: '',
    });

    const openCreateModal = () => {
        setEditingGuest(null);
        resetGuest();
        setShowModal(true);
    };

    const openEditModal = (guest) => {
        setEditingGuest(guest);
        setGuestData({
            name: guest.name,
            phone: guest.phone || '',
            location: guest.location || '',
            category: guest.category || 'Reguler',
            notes: guest.notes || '',
        });
        setShowModal(true);
    };

    const submitGuest = (e) => {
        e.preventDefault();
        if (editingGuest) {
             putGuest(route('projects.guests.update', [project.slug, editingGuest.id]), {
                 onSuccess: () => setShowModal(false)
             });
        } else {
             postGuest(route('projects.guests.store', project.slug), {
                 onSuccess: () => {
                     setShowModal(false);
                     resetGuest();
                 }
             });
        }
    };

    const confirmDelete = (guest) => {
        if (confirm(`Hapus tamu ${guest.name}? Semua data RSVP dan pesan terkait (jika ada) akan ikut terhapus.`)) {
             deleteGuest(route('projects.guests.destroy', [project.slug, guest.id]));
        }
    };

    // Form for Import
    const { data: importData, setData: setImportData, post: postImport, processing: importProcessing, reset: resetImport } = useForm({
        file: null,
    });

    const submitImport = (e) => {
        e.preventDefault();
        postImport(route('projects.guests.import', project.slug), {
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
                         <a href={route('projects.guests.template', project.slug)} className="bg-white border border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-black py-2.5 px-6 rounded-xl shadow-sm transition-all text-xs flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0L8 8m4-4v12" /></svg>
                             Download Format
                         </a>
                         <button onClick={openCreateModal} className="bg-emerald-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all text-xs flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                             Tambah Tamu
                         </button>
                         <button onClick={() => setShowImport(!showImport)} className="bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all text-sm flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                             Pintu Import
                         </button>
                         <Link href={route('projects.show', project.slug)} className="text-sm font-bold text-gray-500 hover:text-gray-900 border border-transparent px-4 py-2.5 flex items-center gap-2 transition-all">
                             Tutup
                         </Link>
                    </div>
                }
            />

            {/* Modal ADD/EDIT */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-neutral-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                     <SectionCard title={editingGuest ? 'Edit Data Tamu' : 'Tambah Tamu Baru'} className="w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
                         <form onSubmit={submitGuest} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Tamu</label>
                                      <input required type="text" className="w-full border-gray-200 rounded-xl text-sm" value={guestData.name} onChange={e => setGuestData('name', e.target.value)} />
                                  </div>
                                  <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">No HP (WA)</label>
                                      <input type="text" className="w-full border-gray-200 rounded-xl text-sm" value={guestData.phone} onChange={e => setGuestData('phone', e.target.value)} />
                                  </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tempat/Domisili</label>
                                      <input type="text" className="w-full border-gray-200 rounded-xl text-sm" value={guestData.location} onChange={e => setGuestData('location', e.target.value)} />
                                  </div>
                                  <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Kategori</label>
                                      <select className="w-full border-gray-200 rounded-xl text-sm" value={guestData.category} onChange={e => setGuestData('category', e.target.value)}>
                                           <option value="Reguler">Reguler</option>
                                           <option value="VIP">VIP</option>
                                           <option value="Keluarga">Keluarga</option>
                                           <option value="Teman">Teman</option>
                                      </select>
                                  </div>
                              </div>
                              <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Catatan Internal</label>
                                  <textarea className="w-full border-gray-200 rounded-xl text-sm" rows="3" value={guestData.notes} onChange={e => setGuestData('notes', e.target.value)} />
                              </div>
                              <div className="flex gap-3 justify-end pt-4">
                                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-xs font-bold text-gray-400">Batal</button>
                                  <button type="submit" disabled={guestProcessing} className="bg-indigo-600 text-white font-black py-2.5 px-8 rounded-xl text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-700 disabled:opacity-50">
                                      {editingGuest ? 'Update Data' : 'Simpan Tamu'}
                                  </button>
                              </div>
                         </form>
                     </SectionCard>
                </div>
            )}

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
                             <a href={route('projects.guests.template', project.slug)} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Download Format</a>
                             <button type="submit" disabled={importProcessing || !importData.file} className="bg-indigo-600 text-white font-black py-3 px-10 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 disabled:opacity-50">Mulai Proses</button>
                        </div>
                    </form>
                </SectionCard>
            )}

            {/* Guests List */}
             <div className="grid grid-cols-1 gap-6 pb-20">
                {guests.data.length > 0 ? guests.data.map(guest => {
                    const uniqueUrl = `${app_url}/v/${project.invitation.slug}/${guest.guest_code}`;
                    return (
                        <div key={guest.id} className="bg-white border border-gray-100 rounded-[40px] p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 hover:shadow-xl hover:shadow-gray-100 transition-all duration-500">
                             <div className="space-y-4 max-w-sm">
                                 <div className="space-y-2">
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
                                 </div>
                                 
                                 <div className="p-4 bg-gray-50 rounded-2xl space-y-2 border border-gray-100 flex items-center justify-between group/link">
                                     <p className="text-[10px] font-bold text-indigo-400 break-all leading-tight max-w-[200px]">{uniqueUrl}</p>
                                     <button 
                                        onClick={() => copyToClipboard(uniqueUrl, guest.id)}
                                        className="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 shrink-0"
                                     >
                                         {copyingId === guest.id ? 'COPIED!' : 'COPY'}
                                     </button>
                                 </div>
                             </div>

                             <div className="flex flex-wrap items-center gap-3">
                                 <a 
                                    href={getWaLink(guest)} 
                                    target="_blank"
                                    className="bg-emerald-50 text-emerald-600 font-bold py-3 px-6 rounded-2xl flex items-center gap-2 hover:bg-emerald-100 transition-all text-xs border border-emerald-100"
                                 >
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.139c1.559.923 3.191 1.411 4.887 1.412 5.433 0 9.85-4.417 9.853-9.85.002-2.632-1.026-5.105-2.895-6.974-1.871-1.868-4.341-2.896-6.974-2.895-5.433 0-9.85 4.417-9.853 9.853 0 1.933.567 3.82 1.642 5.47l-.371 1.353.371-1.353s-[.001] 0 0 0zm11.722-6.562c-.276-.139-1.631-.805-1.884-.898-.252-.092-.437-.139-.621.139-.184.277-.712.898-.874 1.082-.161.185-.322.208-.598.069-.276-.139-1.166-.43-2.222-1.371-.82-.731-1.374-1.634-1.536-1.911-.161-.277-.017-.426.121-.563.125-.124.276-.323.414-.485.138-.162.184-.277.276-.462.093-.185.046-.347-.023-.485-.069-.139-.621-1.498-.85-2.052-.224-.543-.448-.468-.621-.476l-.53-.008c-.183 0-.482.069-.733.346-.252.277-.963.945-.963 2.304s.988 2.671 1.127 2.855c.139.185 1.944 2.969 4.706 4.16.657.284 1.17.453 1.57.581.659.209 1.258.179 1.733.109.529-.079 1.631-.666 1.861-1.31.23-.643.23-1.196.161-1.31-.069-.115-.253-.185-.529-.323z"/></svg>
                                      Kirim Link WA
                                 </a>
                                 
                                 <div className="flex gap-2 text-right">
                                     <Link 
                                        href={route('projects.guests.regenerate', [project.slug, guest.id])} 
                                        method="post"
                                        as="button"
                                        className="p-3 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all border border-gray-100"
                                     >
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                     </Link>
                                     <button 
                                        onClick={() => openEditModal(guest)}
                                        className="p-3 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all border border-gray-100"
                                     >
                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                     </button>
                                     <button 
                                        onClick={() => confirmDelete(guest)}
                                        className="p-3 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all border border-gray-100"
                                     >
                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                     </button>
                                 </div>
                             </div>
                        </div>
                    );
                }) : (
                    <EmptyState 
                        title="Daftar Tamu Masih Kosong" 
                        description="Mulai tambahkan tamu secara manual atau gunakan fitur Pintu Import untuk bulk data." 
                        actions={<button onClick={openCreateModal} className="bg-indigo-600 text-white font-black py-3 px-8 rounded-2xl text-xs uppercase tracking-widest shadow-xl">Tambah Tamu Pertama</button>}
                    />
                )}
             </div>
        </AuthenticatedLayout>
    );
}
