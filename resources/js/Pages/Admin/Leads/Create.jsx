import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard } from '@/Components/UI';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name_calon: '',
        whatsapp: '',
        event_type: 'Wedding',
        event_date: '',
        source: '',
        status: 'new',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('leads.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Lead Baru" />
            
            <PageHeader 
                title="Tambah Lead" 
                subtitle="Isi data calon klien untuk mulai mengelola peluang baru."
                actions={
                    <Link href={route('leads.index')} className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Batal & Kembali
                    </Link>
                }
            />

            <div className="max-w-3xl">
                <form onSubmit={submit}>
                    <SectionCard title="Data Utama Lead" description="Informasi dasar kontak dan acara.">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Nama Calon Klien</label>
                                <input 
                                    type="text" 
                                    value={data.name_calon}
                                    onChange={(e) => setData('name_calon', e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-bold text-gray-700"
                                />
                                {errors.name_calon && <p className="text-[11px] text-rose-500 font-bold pl-1">{errors.name_calon}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">WhatsApp</label>
                                <input 
                                    type="text" 
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', e.target.value)}
                                    placeholder="Contoh: 08123456789"
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-bold text-gray-700"
                                />
                                {errors.whatsapp && <p className="text-[11px] text-rose-500 font-bold pl-1">{errors.whatsapp}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Jenis Acara</label>
                                <select 
                                    value={data.event_type}
                                    onChange={(e) => setData('event_type', e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-bold text-gray-700 appearance-none"
                                >
                                    <option value="Wedding">Pernikahan (Wedding)</option>
                                    <option value="Engagement">Tunangan (Engagement)</option>
                                    <option value="Birthday">Ulang Tahun (Birthday)</option>
                                    <option value="Other">Lainnya</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Tanggal Acara</label>
                                <input 
                                    type="date" 
                                    value={data.event_date}
                                    onChange={(e) => setData('event_date', e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-bold text-gray-700"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Sumber Lead</label>
                                <input 
                                    type="text" 
                                    value={data.source}
                                    onChange={(e) => setData('source', e.target.value)}
                                    placeholder="Contoh: Instagram / Teman"
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-bold text-gray-700"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Status Awal</label>
                                <select 
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-bold text-gray-700 appearance-none"
                                >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="negotiating">Negotiating</option>
                                </select>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Catatan Tambahan</label>
                                <textarea 
                                    rows="4"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full px-4 py-4 rounded-3xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium text-gray-700"
                                    placeholder="Kebutuhan khusus klien, rincian acara, dll..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.1em] text-xs"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Lead'}
                            </button>
                        </div>
                    </SectionCard>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
