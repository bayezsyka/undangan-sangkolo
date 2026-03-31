import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge, EmptyState } from '@/Components/UI';

export default function Index({ auth, rsvps }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="RSVP Masuk" />
            
            <PageHeader 
                title="RSVP & Kehadiran" 
                subtitle="Pantau konfirmasi kehadiran dari tamu undangan digital."
            />

            <SectionCard>
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="px-6 py-4">Tamu</th>
                                <th className="px-6 py-4">Undangan / Project</th>
                                <th className="px-6 py-4">Kehadiran</th>
                                <th className="px-6 py-4">Catatan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rsvps.data.map((rsvp) => (
                                <tr key={rsvp.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 leading-tight">{rsvp.name}</div>
                                        <div className="text-[11px] text-indigo-600 font-black mt-1 uppercase tracking-wider">{rsvp.guest_count} Orang</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-gray-700">{rsvp.invitation.title}</div>
                                        <div className="text-[11px] text-gray-400 mt-1">{rsvp.invitation.project.client.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge 
                                            status={rsvp.attendance_status} 
                                            type={rsvp.attendance_status === 'attending' ? 'success' : (rsvp.attendance_status === 'maybe' ? 'warning' : 'danger')} 
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs text-gray-500 max-w-xs truncate italic leading-relaxed">
                                            {rsvp.notes || "-"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rsvps.data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center">
                                         <EmptyState 
                                            title="Belum Ada RSVP" 
                                            description="Tunggu tamu mengisi formulir di halaman publik."
                                            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {rsvps.total > rsvps.per_page && (
                    <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Halaman {rsvps.current_page} dari {rsvps.last_page}</span>
                        <div className="flex gap-2">
                             {rsvps.prev_page_url && <Link href={rsvps.prev_page_url} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Prev</Link>}
                             {rsvps.next_page_url && <Link href={rsvps.next_page_url} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Next</Link>}
                        </div>
                    </div>
                )}
            </SectionCard>
        </AuthenticatedLayout>
    );
}
