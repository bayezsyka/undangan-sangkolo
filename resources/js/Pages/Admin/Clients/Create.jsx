import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard } from '@/Components/UI';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        whatsapp: '',
        email: '',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('clients.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Client Baru" />
            
            <PageHeader 
                title="Registrasi Client" 
                subtitle="Daftarkan profil client baru ke dalam basis data Anda."
                actions={
                    <Link href={route('clients.index')} className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Batal
                    </Link>
                }
            />

            <div className="max-w-3xl">
                <form onSubmit={submit} className="space-y-8">
                    <SectionCard title="Identitas Client">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormGroup label="Nama Lengkap Client">
                                <input 
                                    type="text" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Ahmad Fauzan"
                                    className="w-full input-premium"
                                />
                                {errors.name && <p className="text-[10px] text-rose-500 font-black pl-1">{errors.name}</p>}
                            </FormGroup>

                            <FormGroup label="Nomor WhatsApp">
                                <input 
                                    type="text" 
                                    value={data.whatsapp}
                                    onChange={e => setData('whatsapp', e.target.value)}
                                    placeholder="081234567890"
                                    className="w-full input-premium font-black tracking-widest text-emerald-600"
                                />
                                {errors.whatsapp && <p className="text-[10px] text-rose-500 font-black pl-1">{errors.whatsapp}</p>}
                            </FormGroup>

                            <FormGroup label="Alamat Email (Opsional)">
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full input-premium font-bold text-gray-500"
                                />
                            </FormGroup>

                            <FormGroup label="Catatan Tambahan" span={2}>
                                <textarea 
                                    rows="3"
                                    value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                    className="w-full input-premium h-32"
                                    placeholder="Informasi tambahan tentang client..."
                                ></textarea>
                            </FormGroup>
                        </div>
                    </SectionCard>

                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-indigo-600 hover:bg-black text-white font-black py-4 px-12 rounded-[30px] shadow-2xl shadow-indigo-100 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-[10px]"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Profil Client'}
                        </button>
                    </div>
                </form>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .input-premium {
                    background: #fdfdfd;
                    border: 1px solid #f1f1f4;
                    border-radius: 20px;
                    padding: 12px 20px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #1a1a1b;
                    transition: all 0.3s ease;
                    outline: none;
                }
                .input-premium:focus {
                    background: #fff;
                    border-color: #4f46e5;
                    box-shadow: 0 0 0 5px #4f46e510;
                }
            `}} />
        </AuthenticatedLayout>
    );
}

function FormGroup({ label, children, span = 1 }) {
    return (
        <div className={`space-y-2 ${span === 2 ? 'md:col-span-2' : ''}`}>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 leading-none">{label}</label>
            {children}
        </div>
    );
}
