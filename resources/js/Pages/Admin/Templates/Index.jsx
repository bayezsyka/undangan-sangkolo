import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Index({ auth, templates }) {
    const toggleActive = (template) => {
        router.put(route('templates.update', template.id), {
            ...template,
            is_active: !template.is_active
        }, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manajemen Templates" />
            
            <PageHeader 
                title="Templates" 
                subtitle="Pilih dan kelola desain dasar untuk setiap undangan digital."
                actions={
                    <Link 
                        href={route('templates.create')} 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] text-sm flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Tambah Template
                    </Link>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.data.map((template) => (
                    <div key={template.id} className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:border-indigo-100 transition-all hover:shadow-xl hover:shadow-indigo-50/50">
                        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                            <img 
                                src={template.thumbnail || 'https://placehold.co/600x400?text=No+Thumbnail'} 
                                alt={template.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 capitalize">
                                <StatusBadge 
                                    status={template.is_active ? 'Active' : 'Inactive'} 
                                    type={template.is_active ? 'success' : 'default'} 
                                />
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-black text-gray-900 text-lg leading-tight mb-1">{template.name}</h3>
                                    <p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">{template.category}</p>
                                </div>
                                <button 
                                    onClick={() => toggleActive(template)}
                                    className={`w-10 h-6 rounded-full transition-colors relative ${template.is_active ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${template.is_active ? 'translate-x-4' : ''}`}></div>
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-6 font-medium italic">
                                {template.description || "Tidak ada deskripsi."}
                            </p>
                            <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                                <Link 
                                    href={route('templates.edit', template.id)}
                                    className="flex-1 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900 border border-gray-100 font-bold py-3 px-4 rounded-xl text-center text-[10px] transition-all uppercase tracking-[0.15em]"
                                >
                                    Konfigurasi
                                </Link>
                                <a 
                                    href={template.preview_url} 
                                    target="_blank"
                                    className="flex-[1.5] bg-indigo-600 hover:bg-black text-white font-black py-3 px-6 rounded-xl text-center text-[10px] transition-all uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                                >
                                    LIHAT DESIGN
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
                {templates.data.length === 0 && (
                    <div className="col-span-full py-32 text-center">
                         <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                         </div>
                         <h3 className="text-lg font-black text-gray-900 mb-1">Belum Ada Template</h3>
                         <p className="text-gray-400 text-sm font-medium italic">Klik tombol "Tambah Template" untuk membuat desain baru.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
