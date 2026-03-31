import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Dashboard({ auth, stats, recent_projects, recent_leads }) {
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
                    label="Leads Baru" 
                    value={stats.leads_count} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                    color="text-blue-600" 
                    bg="bg-blue-50"
                />
                <StatsCard 
                    label="Waiting List" 
                    value={stats.waiting_list_count} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    color="text-amber-600" 
                    bg="bg-amber-50"
                />
                <StatsCard 
                    label="Invitation Draft" 
                    value={stats.draft_invitations} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
                    color="text-indigo-600" 
                    bg="bg-indigo-50"
                />
                <StatsCard 
                    label="Published" 
                    value={stats.published_invitations} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    color="text-emerald-600" 
                    bg="bg-emerald-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
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
                                    <th className="px-6 py-4">Slot</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recent_projects.length > 0 ? recent_projects.map((project) => (
                                    <tr key={project.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900 leading-tight">{project.name_project}</div>
                                            <div className="text-[11px] text-gray-400 mt-0.5">{project.client.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge 
                                                status={project.status_project} 
                                                type={project.status_project === 'finished' ? 'success' : (project.status_project === 'designing' ? 'primary' : 'default')}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.is_active_slot ? (
                                                <span className="flex items-center gap-2 text-indigo-600">
                                                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                                    <span className="text-[11px] font-black uppercase tracking-wider">Active</span>
                                                </span>
                                            ) : (
                                                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Queue</span>
                                            )}
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

                {/* Recent Leads */}
                <SectionCard 
                    title="Leads Terbaru" 
                    actions={<Link href="/admin/leads" className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Semua</Link>}
                >
                    <div className="space-y-4">
                        {recent_leads.length > 0 ? recent_leads.map((lead) => (
                            <div key={lead.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-indigo-100 transition-colors">
                                <div>
                                    <div className="font-bold text-gray-900 leading-none">{lead.name_calon}</div>
                                    <div className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-2">
                                        <span>{lead.whatsapp}</span>
                                        <span>•</span>
                                        <span>{lead.event_type}</span>
                                    </div>
                                </div>
                                <StatusBadge status={lead.status} type={lead.status === 'new' ? 'warning' : 'default'} />
                            </div>
                        )) : (
                            <div className="py-10 text-center text-gray-400 text-sm italic">Belum ada leads</div>
                        )}
                    </div>
                </SectionCard>
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
