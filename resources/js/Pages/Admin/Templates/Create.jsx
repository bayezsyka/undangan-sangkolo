import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard } from '@/Components/UI';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: 'Wedding',
        description: '',
        thumbnail: '',
        preview_url: '',
        is_active: true,
        default_settings: {
            primary_color: '#4f46e5',
            secondary_color: '#f97316',
            font_family: 'Inter',
            sections: ['Hero', 'Opening', 'Couple', 'Event', 'Gallery', 'RSVP', 'Wishes', 'Closing']
        }
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('templates.store'));
    };

    const handleSettingChange = (key, value) => {
        setData('default_settings', {
            ...data.default_settings,
            [key]: value
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buat Template Baru" />
            
            <PageHeader 
                title="Tambah Template" 
                subtitle="Siapkan desain dasar baru untuk katalog undangan Sangkolo."
                actions={
                    <Link href={route('templates.index')} className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Batal
                    </Link>
                }
            />

            <div className="max-w-4xl">
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <SectionCard title="Identitas Template" description="Detail dasar untuk identifikasi di dashboard.">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Nama Template</label>
                                    <input 
                                        type="text" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: Modern Elegance Gold"
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none font-bold text-gray-700"
                                    />
                                    {errors.name && <p className="text-[11px] text-rose-500 font-bold pl-1">{errors.name}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Kategori</label>
                                    <select 
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-bold text-gray-700 appearance-none"
                                    >
                                        <option value="Wedding">Wedding</option>
                                        <option value="Engagement">Engagement</option>
                                        <option value="Birthday">Birthday</option>
                                        <option value="Aqiqah">Aqiqah</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Thumbnail URL</label>
                                    <input 
                                        type="text" 
                                        value={data.thumbnail}
                                        onChange={(e) => setData('thumbnail', e.target.value)}
                                        placeholder="URL gambar thumbnail..."
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-bold text-gray-700"
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Preview URL</label>
                                    <input 
                                        type="text" 
                                        value={data.preview_url}
                                        onChange={(e) => setData('preview_url', e.target.value)}
                                        placeholder="https://sangkolo.com/preview/..."
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-bold text-gray-700"
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-1 pt-4">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Deskripsi Singkat</label>
                                    <textarea 
                                        rows="4"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full px-4 py-4 rounded-3xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-medium text-gray-700"
                                        placeholder="Tuliskan keunggulan template ini."
                                    ></textarea>
                                </div>
                            </div>
                        </SectionCard>
                    </div>

                    <div className="space-y-8">
                        <SectionCard title="Setelan Default">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Warna Utama</label>
                                    <div className="flex items-center gap-4">
                                        <input 
                                            type="color" 
                                            value={data.default_settings.primary_color}
                                            onChange={(e) => handleSettingChange('primary_color', e.target.value)}
                                            className="w-12 h-12 rounded-xl cursor-pointer border-0 bg-transparent overflow-hidden"
                                        />
                                        <input 
                                            type="text" 
                                            value={data.default_settings.primary_color}
                                            onChange={(e) => handleSettingChange('primary_color', e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-mono font-bold text-gray-700 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Font Utama</label>
                                    <select 
                                         value={data.default_settings.font_family}
                                         onChange={(e) => handleSettingChange('font_family', e.target.value)}
                                         className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-bold text-gray-700 text-sm appearance-none"
                                    >
                                        <option value="Inter">Inter (Sans)</option>
                                        <option value="Outfit">Outfit (Round)</option>
                                        <option value="Playfair Display">Playfair (Serif/Elegant)</option>
                                        <option value="Montserrat">Montserrat (Modern)</option>
                                    </select>
                                </div>

                                <div className="pt-6 border-t border-gray-50">
                                    <label className="flex items-center gap-4 cursor-pointer p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white group transition-colors">
                                        <div className="flex-1">
                                            <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.15em] mb-1">Status Publik</p>
                                            <p className="text-[10px] text-gray-400 leading-tight font-bold italic">Tersedia untuk project baru.</p>
                                        </div>
                                        <div className="relative">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 transition-all"></div>
                                        </div>
                                    </label>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-indigo-50 transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.1em] text-xs mt-4"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Template'}
                                </button>
                            </div>
                        </SectionCard>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
