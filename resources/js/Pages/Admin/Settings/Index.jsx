import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard } from '@/Components/UI';

export default function Index({ auth }) {
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('settings.password.update'), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pengaturan" />
            <PageHeader title="Pengaturan Akun" subtitle="Kelola profil dan konfigurasi admin Sangkolo." />
            
            <div className="max-w-2xl pb-20">
                <SectionCard title="Profil Admin">
                    <div className="space-y-6">
                        <div className="pb-6 border-b border-gray-50">
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Nama Admin</label>
                             <p className="font-bold text-gray-900 text-lg">{auth.user.name}</p>
                        </div>
                        <div className="pb-6 border-b border-gray-50">
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Email Login</label>
                             <p className="font-bold text-gray-900 text-lg">{auth.user.email}</p>
                        </div>

                        {flash?.success && (
                            <div className="p-4 bg-emerald-50 text-emerald-700 text-xs font-black rounded-2xl border border-emerald-100 animate-in slide-in-from-top duration-300">
                                ✨ {flash.success}
                            </div>
                        )}

                        {!showForm ? (
                             <div className="pt-4">
                                 <button 
                                    onClick={() => setShowForm(true)}
                                    className="bg-indigo-600 text-white font-black py-4 px-8 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                                 >
                                     Ubah Password Admin
                                 </button>
                             </div>
                        ) : (
                            <form onSubmit={submit} className="pt-4 space-y-6 animate-in slide-in-from-bottom duration-300">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Password Saat Ini</label>
                                        <input 
                                            type="password"
                                            value={data.current_password}
                                            onChange={e => setData('current_password', e.target.value)}
                                            className="w-full bg-gray-50 border-gray-100 rounded-2xl text-sm font-bold focus:border-indigo-600 focus:ring-0"
                                            required
                                        />
                                        {errors.current_password && <p className="text-[10px] text-rose-500 font-bold mt-1 uppercase tracking-widest">{errors.current_password}</p>}
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Password Baru</label>
                                        <input 
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full bg-gray-50 border-gray-100 rounded-2xl text-sm font-bold focus:border-indigo-600 focus:ring-0"
                                            required
                                        />
                                        {errors.password && <p className="text-[10px] text-rose-500 font-bold mt-1 uppercase tracking-widest">{errors.password}</p>}
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Konfirmasi Password Baru</label>
                                        <input 
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                            className="w-full bg-gray-50 border-gray-100 rounded-2xl text-sm font-bold focus:border-indigo-600 focus:ring-0"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-indigo-600 text-white font-black py-4 px-8 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:opacity-50"
                                    >
                                        Update Password
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => { setShowForm(false); reset(); }}
                                        className="text-gray-400 font-black py-4 px-8 rounded-2xl text-[10px] uppercase tracking-widest hover:text-gray-600 transition-all"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </SectionCard>
            </div>
        </AuthenticatedLayout>
    );
}
