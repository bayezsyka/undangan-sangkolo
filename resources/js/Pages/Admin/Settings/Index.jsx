import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard } from '@/Components/UI';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pengaturan" />
            <PageHeader title="Pengaturan Akun" subtitle="Kelola profil dan konfigurasi admin Sangkolo." />
            
            <div className="max-w-2xl">
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
                        <div className="pt-4">
                             <button className="bg-gray-100 font-black text-gray-400 py-4 px-8 rounded-2xl text-[10px] uppercase tracking-widest cursor-not-allowed">
                                 Ubah Password (Coming Soon)
                             </button>
                        </div>
                    </div>
                </SectionCard>
            </div>
        </AuthenticatedLayout>
    );
}
