import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard } from '@/Components/UI';

export default function Create({ auth, clients, can_activate_slot }) {
    const { data, setData, post, processing, errors } = useForm({
        client_id: '',
        name_project: '',
        event_type: 'Wedding',
        event_date: '',
        status_order: 'pending',
        status_project: 'queue',
        is_active_slot: false,
        deadline: '',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buat Project Baru" />
            
            <PageHeader 
                title="Buat Project" 
                subtitle="Inisialisasi pengerjaan undangan digital untuk klien."
                actions={
                    <Link href={route('projects.index')} className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Batal
                    </Link>
                }
            />

            <div className="max-w-4xl">
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <SectionCard title="Informasi Project" description="Detail acara dan identitas klien.">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Nama Project</label>
                                    <input 
                                        type="text" 
                                        value={data.name_project}
                                        onChange={(e) => setData('name_project', e.target.value)}
                                        placeholder="Contoh: Undangan Wedding Farros & Dini"
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none font-bold text-gray-700"
                                    />
                                    {errors.name_project && <p className="text-[11px] text-rose-500 font-bold pl-1">{errors.name_project}</p>}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center pr-1">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Pilih Client</label>
                                        <Link href={route('clients.create')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">+ Tambah Client</Link>
                                    </div>
                                    <select 
                                        value={data.client_id}
                                        onChange={(e) => setData('client_id', e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-bold text-gray-700 appearance-none"
                                    >
                                        <option value="">- Pilih Client -</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>{client.name} ({client.whatsapp})</option>
                                        ))}
                                    </select>
                                    {errors.client_id && <p className="text-[11px] text-rose-500 font-bold pl-1">{errors.client_id}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Jenis Acara</label>
                                    <select 
                                        value={data.event_type}
                                        onChange={(e) => setData('event_type', e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-bold text-gray-700 appearance-none"
                                    >
                                        <option value="Wedding">Pernikahan</option>
                                        <option value="Engagement">Tunangan</option>
                                        <option value="Birthday">Ulang Tahun</option>
                                        <option value="Other">Lainnya</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Tanggal Acara</label>
                                    <input 
                                        type="date" 
                                        value={data.event_date}
                                        onChange={(e) => setData('event_date', e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-bold text-gray-700"
                                    />
                                    {errors.event_date && <p className="text-[11px] text-rose-500 font-bold pl-1">{errors.event_date}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Deadline Internal</label>
                                    <input 
                                        type="date" 
                                        value={data.deadline}
                                        onChange={(e) => setData('deadline', e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-bold text-gray-700"
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-1 pt-4">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Catatan Internal</label>
                                    <textarea 
                                        rows="4"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="w-full px-4 py-4 rounded-3xl border border-gray-100 bg-gray-50/50 focus:bg-white outline-none font-medium text-gray-700"
                                        placeholder="Kebutuhan khusus, revisi, atau rincian paket."
                                    ></textarea>
                                </div>
                            </div>
                        </SectionCard>
                    </div>

                    <div className="space-y-8">
                        <SectionCard title="Status & Slot">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Status Pembayaran</label>
                                    <select 
                                        value={data.status_order}
                                        onChange={(e) => setData('status_order', e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-indigo-100 outline-none font-bold text-gray-700 appearance-none"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Lunas (Paid)</option>
                                        <option value="cancelled">Dibatalkan</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Status Pengerjaan</label>
                                    <select 
                                        value={data.status_project}
                                        onChange={(e) => setData('status_project', e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-indigo-100 outline-none font-bold text-gray-700 appearance-none"
                                    >
                                        <option value="queue">Dalam Antrean (Queue)</option>
                                        <option value="designing">Sedang Desain</option>
                                        <option value="revision">Revisi</option>
                                        <option value="finished">Selesai</option>
                                    </select>
                                </div>

                                <div className="pt-6 border-t border-gray-50">
                                    <label className="flex items-center gap-4 cursor-pointer p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white transition-colors group">
                                        <div className="flex-1">
                                            <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.15em] mb-1">Masuk Slot Aktif</p>
                                            <p className="text-[10px] text-gray-400 leading-tight font-bold italic">
                                                {can_activate_slot ? 'Tandai ini untuk mulai dikerjakan instensif.' : 'Maaf, slot pengerjaan sudah penuh (3/3).'}
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={data.is_active_slot}
                                                disabled={!can_activate_slot && !data.is_active_slot}
                                                onChange={(e) => setData('is_active_slot', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 peer-disabled:opacity-20 transition-all"></div>
                                        </div>
                                    </label>
                                    {errors.is_active_slot && <p className="text-[11px] text-rose-500 font-bold mt-2 pl-1 leading-relaxed">{errors.is_active_slot}</p>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-indigo-50 transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.1em] text-xs mt-4"
                                >
                                    {processing ? 'Proses...' : 'Simpan Project'}
                                </button>
                            </div>
                        </SectionCard>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
