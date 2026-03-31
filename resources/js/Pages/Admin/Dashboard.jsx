import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Dashboard({ auth, stats, recent_projects, total_rsvps }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            
            <PageHeader 
                title="Dashboard" 
                subtitle={`Halo ${auth.user.name.split(' ')[0]}, apa rencana kerja Anda hari ini?`}
                actions={
                    <div className="flex items-center gap-4">
                         <div className={`px-4 py-2 rounded-2xl border flex items-center gap-3 ${stats.active_slots.is_full ? 'bg-rose-50 border-rose-100' : 'bg-indigo-50 border-indigo-100'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${stats.active_slots.is_full ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500'}`}></div>
                            <span className="text-sm font-bold text-gray-700">
                                Slot Aktif: {stats.active_slots.count}/{stats.active_slots.total}
                            </span>
                            {stats.active_slots.is_full && (
                                <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded ml-1">FULL</span>
                            )}
                        </div>
                    </div>
                }
            />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard 
                    label="Total Client" 
                    value={stats.clients_count} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                    color="text-blue-600" 
                    bg="bg-blue-50"
                />
                <StatsCard 
                    label="Antrean Client" 
                    value={stats.waiting_list_count} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    color="text-amber-600" 
                    bg="bg-amber-50"
                />
                <StatsCard 
                    label="Undangan Draft" 
                    value={stats.draft_invitations} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
                    color="text-indigo-600" 
                    bg="bg-indigo-50"
                />
                <StatsCard 
                    label="Total RSVP" 
                    value={total_rsvps} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    color="text-emerald-600" 
                    bg="bg-emerald-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects */}
                <div className="lg:col-span-2">
                    <SectionCard 
                        title="Project Terbaru" 
                        actions={<Link href="/admin/projects" className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Semua</Link>}
                    >
                        <div className="overflow-x-auto -mx-6 sm:mx-0">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                        <th className="px-6 py-4">Project</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recent_projects.length > 0 ? recent_projects.map((project) => (
                                        <tr key={project.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                                            <td className="px-6 py-4" onClick={() => window.location.href = route('projects.show', project.id)}>
                                                <div className="font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{project.name_project}</div>
                                                <div className="text-[11px] text-gray-400 mt-0.5">{project.client.name} • {project.event_type}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge 
                                                    status={project.status_project} 
                                                    type={project.status_project === 'finished' ? 'success' : (project.status_project === 'designing' ? 'primary' : 'default')}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={route('projects.edit', project.id)} className="text-[8px] font-black uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-indigo-600 hover:text-white transition-all">Editor</Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-10 text-center text-gray-400 text-sm italic">Belum ada project</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>
                </div>

                {/* System Shortcut */}
                <div className="space-y-6">
                    <div className="bg-indigo-600 p-8 rounded-[40px] text-white space-y-6 shadow-2xl shadow-indigo-100">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h5 className="text-xl font-black leading-tight tracking-tight">Cepat Bangun Undangan Digital?</h5>
                        <p className="text-xs text-indigo-100/70 font-medium leading-relaxed">Pilih template, input data mempelai, dan publish dalam hitungan menit.</p>
                        <Link href={route('projects.create')} className="block w-full bg-white text-indigo-600 text-center py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">Mulai Project Baru</Link>
                    </div>

                    <div className="p-8 rounded-[40px] bg-white border border-gray-100 space-y-4">
                         <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Quick Links</h6>
                         <Link href={route('clients.index')} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 group border border-transparent hover:border-gray-100 transition-all text-xs font-bold text-gray-700">
                            Kelola Client
                            <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                         </Link>
                         <Link href={route('templates.index')} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 group border border-transparent hover:border-gray-100 transition-all text-xs font-bold text-gray-700">
                            Pilihan Design
                            <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                         </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatsCard({ label, value, icon, color, bg }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors">
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</p>
                <h4 className="text-3xl font-black text-gray-900 leading-none">{value}</h4>
            </div>
            <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {icon}
                </svg>
            </div>
        </div>
    );
}
