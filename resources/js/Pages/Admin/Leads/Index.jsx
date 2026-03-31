import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Index({ auth, leads, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(route('leads.index'), { search, status }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, status]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manajemen Leads" />
            
            <PageHeader 
                title="Leads" 
                subtitle="Manajemen calon klien dan peluang baru anda."
                actions={
                    <Link 
                        href={route('leads.create')} 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] text-sm flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Lead
                    </Link>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-3 relative">
                    <input 
                        type="text" 
                        placeholder="Cari nama atau nomor WhatsApp..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                    />
                    <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none appearance-none font-bold text-gray-500 text-sm"
                >
                    <option value="">Semua Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="negotiating">Negotiating</option>
                    <option value="closed">Closed</option>
                    <option value="lost">Lost</option>
                </select>
            </div>

            <SectionCard>
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="px-6 py-4">Nama Prospek</th>
                                <th className="px-6 py-4">Kontak / Acara</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {leads.data.map((lead) => (
                                <tr key={lead.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <Link href={route('leads.show', lead.id)} className="font-bold text-gray-900 leading-tight hover:text-indigo-600">{lead.name_calon}</Link>
                                        <div className="text-[11px] text-gray-400 mt-1 font-medium italic">Sumber: {lead.source || 'Tidak diketahui'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-gray-700">{lead.whatsapp}</div>
                                        <div className="text-[11px] text-gray-400 font-medium">
                                            {lead.event_type} • {lead.event_date ? new Date(lead.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Tanggal belum pasti'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge 
                                            status={lead.status} 
                                            type={lead.status === 'closed' ? 'success' : (lead.status === 'lost' ? 'danger' : (lead.status === 'negotiating' ? 'warning' : (lead.status === 'new' ? 'primary' : 'default')))} 
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={route('leads.edit', lead.id)} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </Link>
                                            <button className="p-2 text-gray-400 hover:text-rose-600 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {leads.data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center text-gray-400 text-sm italic">Tidak ada lead yang ditemukan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Simple Pagination info */}
                {leads.total > leads.per_page && (
                    <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Halaman {leads.current_page} dari {leads.last_page}</span>
                        <div className="flex gap-2">
                             {leads.prev_page_url && <Link href={leads.prev_page_url} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">Sebelumnya</Link>}
                             {leads.next_page_url && <Link href={leads.next_page_url} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">Selanjutnya</Link>}
                        </div>
                    </div>
                )}
            </SectionCard>
        </AuthenticatedLayout>
    );
}
