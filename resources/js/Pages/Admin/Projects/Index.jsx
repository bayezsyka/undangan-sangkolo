import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Index({ auth, projects, filters, active_slots_count }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(route('projects.index'), { search, status }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, status]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manajemen Projects" />
            
            <PageHeader 
                title="Projects" 
                subtitle={`Mengelola antrean dan pengerjaan undangan digital.`}
                actions={
                    <div className="flex items-center gap-4">
                        <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 ${active_slots_count >= 3 ? 'bg-rose-50 border-rose-100' : 'bg-indigo-50 border-indigo-100'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${active_slots_count >= 3 ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500'}`}></div>
                            <span className="text-sm font-bold text-gray-700">Slot Aktif: {active_slots_count}/3</span>
                        </div>
                        <Link 
                            href={route('projects.create')} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] text-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Buat Project
                        </Link>
                    </div>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-3 relative">
                    <input 
                        type="text" 
                        placeholder="Cari project atau nama klien..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                    />
                    <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-bold text-gray-500 text-sm appearance-none"
                >
                    <option value="">Semua Status</option>
                    <option value="queue">Queue</option>
                    <option value="designing">Designing</option>
                    <option value="revision">Revision</option>
                    <option value="finished">Finished</option>
                </select>
            </div>

            <SectionCard>
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="px-6 py-4">Nama Project</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Status Project</th>
                                <th className="px-6 py-4">Slot</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {projects.data.map((project) => (
                                <tr key={project.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <Link href={route('projects.show', project)} className="font-bold text-gray-900 hover:text-indigo-600 transition-colors">{project.name_project}</Link>
                                        <div className="text-[11px] text-gray-400 mt-0.5">{project.event_type} • {new Date(project.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-gray-700">{project.client.name}</div>
                                        <div className="text-[11px] text-gray-400">{project.client.whatsapp}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge 
                                            status={project.status_project} 
                                            type={project.status_project === 'finished' ? 'success' : (project.status_project === 'designing' ? 'primary' : (project.status_project === 'revision' ? 'warning' : 'default'))} 
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        {project.is_active_slot ? (
                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                                                Active
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pl-2">Queue / WL</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={route('projects.edit', project)} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects.data.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center text-gray-400 text-sm italic">Belum ada project yang terdaftar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {projects.total > projects.per_page && (
                    <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Halaman {projects.current_page} dari {projects.last_page}</span>
                        <div className="flex gap-2">
                             {projects.prev_page_url && <Link href={projects.prev_page_url} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Prev</Link>}
                             {projects.next_page_url && <Link href={projects.next_page_url} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Next</Link>}
                        </div>
                    </div>
                )}
            </SectionCard>
        </AuthenticatedLayout>
    );
}
