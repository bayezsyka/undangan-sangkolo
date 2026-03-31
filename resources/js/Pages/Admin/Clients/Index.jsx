import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard } from '@/Components/UI';

export default function Index({ auth, clients }) {
    const destroy = (id) => {
        if (confirm('Hapus client ini? Seluruh project terkait juga akan terpengaruh.')) {
            router.delete(route('clients.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manajemen Client" />
            
            <PageHeader 
                title="Client Database" 
                subtitle="Kelola seluruh basis data klien yang memesan undangan digital."
                actions={
                    <Link href={route('clients.create')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2.5 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] text-sm flex items-center gap-2 uppercase tracking-widest">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Tambah Client
                    </Link>
                }
            />

            <SectionCard title="Daftar Client">
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="px-6 py-4">Nama Client</th>
                                <th className="px-6 py-4">Kontak</th>
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {clients.data.map((client) => (
                                <tr key={client.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-4">
                                        <div className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{client.name}</div>
                                        <div className="text-[10px] text-gray-400 mt-0.5">{client.email || '— No Email'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs font-black text-emerald-600 tracking-widest">{client.whatsapp}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-black bg-gray-100 px-3 py-1.5 rounded-full text-gray-500">{client.projects_count} Project</span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link href={route('clients.edit', client.id)} className="text-[9px] font-black uppercase text-indigo-600 hover:underline">Edit</Link>
                                        <button onClick={() => destroy(client.id)} className="text-[9px] font-black uppercase text-rose-500 hover:underline">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {clients.data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center text-gray-400 text-sm italic font-medium">Buku alamat client masih kosong.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                {clients.links && clients.links.length > 3 && (
                     <div className="flex justify-center pt-8 border-t border-gray-50 gap-1">
                        {clients.links.map((link, i) => (
                             <Link 
                                key={i}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${link.active ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-100 text-gray-500 hover:bg-indigo-50'}`}
                             />
                        ))}
                     </div>
                )}
            </SectionCard>
        </AuthenticatedLayout>
    );
}
