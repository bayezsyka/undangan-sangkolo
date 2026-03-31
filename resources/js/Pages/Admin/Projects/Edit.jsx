import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard, StatusBadge } from '@/Components/UI';

export default function Edit({ auth, project, clients, templates, active_slots_count }) {
    const [activeTab, setActiveTab] = useState('project'); // 'project' or 'invitation'
    
    // Initial data with invitation nested handles
    const { data, setData, put, processing, errors } = useForm({
        client_id: project.client_id || '',
        name_project: project.name_project || '',
        event_type: project.event_type || 'Wedding',
        event_date: project.event_date || '',
        status_order: project.status_order || 'pending',
        status_project: project.status_project || 'queue',
        is_active_slot: project.is_active_slot == 1,
        deadline: project.deadline || '',
        notes: project.notes || '',
        
        // Invitation Fields
        invitation: {
            template_id: project.invitation?.template_id || '',
            slug: project.invitation?.slug || '',
            host_names: project.invitation?.host_names || '',
            event_time: project.invitation?.event_time || '',
            event_location_name: project.invitation?.event_location_name || '',
            event_address: project.invitation?.event_address || '',
            event_maps_url: project.invitation?.event_maps_url || '',
            opening_quote: project.invitation?.opening_quote || '',
            is_published: project.invitation?.is_published == 1,
        }
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('projects.update', project.id));
    };

    const handleInviteChange = (field, value) => {
        setData('invitation', {
            ...data.invitation,
            [field]: value
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Builder: ${project.name_project}`} />
            
            <PageHeader 
                title="Invitation Builder" 
                subtitle={`Mengatur data acara dan konten undangan untuk ${project.name_project}`}
                actions={
                    <div className="flex gap-3">
                         {project.invitation && (
                            <a href={route('invitation.show', project.invitation.slug)} target="_blank" className="bg-emerald-50 text-emerald-600 font-bold py-2.5 px-6 rounded-xl border border-emerald-100 flex items-center gap-2 hover:bg-emerald-100 transition-all text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                Lihat Undangan
                            </a>
                        )}
                        <Link href={route('projects.index')} className="text-sm font-bold text-gray-500 hover:text-gray-900 border border-transparent px-4 py-2.5 flex items-center gap-2 transition-all">
                             Batal
                        </Link>
                    </div>
                }
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side: Navigation / Tab Content Selector */}
                <div className="lg:w-1/4 space-y-4">
                     <button onClick={() => setActiveTab('project')} className={`w-full text-left p-6 rounded-3xl border transition-all ${activeTab === 'project' ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border-gray-100 text-gray-700 hover:border-indigo-200'}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${activeTab === 'project' ? 'text-indigo-200' : 'text-gray-400'}`}>Step 01</p>
                        <h4 className="font-black text-lg">Data Admin & Status</h4>
                        <p className={`text-xs mt-2 ${activeTab === 'project' ? 'text-indigo-100 opacity-80' : 'text-gray-400'}`}>Kelola slot, pembayaran, dan rincian project.</p>
                     </button>

                     <button onClick={() => setActiveTab('invitation')} className={`w-full text-left p-6 rounded-3xl border transition-all ${activeTab === 'invitation' ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border-gray-100 text-gray-700 hover:border-indigo-200'}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${activeTab === 'invitation' ? 'text-indigo-200' : 'text-gray-400'}`}>Step 02</p>
                        <h4 className="font-black text-lg">Konten Undangan</h4>
                        <p className={`text-xs mt-2 ${activeTab === 'invitation' ? 'text-indigo-100 opacity-80' : 'text-gray-400'}`}>Isi detail acara, mempelai, dan lokasi.</p>
                     </button>
                    
                     <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                         <h5 className="font-black text-amber-800 text-sm mb-2 italic">📌 Solo Operator Note</h5>
                         <p className="text-xs text-amber-700 leading-relaxed font-medium">Pastikan data acara konfirmasi final sebelum menekan tombol "Publish".</p>
                     </div>
                </div>

                {/* Right Side: Tab Contents in Form */}
                <form onSubmit={submit} className="lg:w-3/4 space-y-8 pb-32">
                    {activeTab === 'project' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <SectionCard title="Administrasi Project">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormGroup label="Pilih Client">
                                        <select value={data.client_id} onChange={e => setData('client_id', e.target.value)} className="w-full input-premium appearance-none">
                                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="Nama Project / Acara">
                                        <input type="text" value={data.name_project} onChange={e => setData('name_project', e.target.value)} className="w-full input-premium" />
                                    </FormGroup>
                                    <FormGroup label="Status Order">
                                        <select value={data.status_order} onChange={e => setData('status_order', e.target.value)} className="w-full input-premium">
                                            <option value="pending">Pending</option>
                                            <option value="paid">Paid (Lunas)</option>
                                            <option value="cancelled">Dibatalkan</option>
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="Status Project">
                                        <select value={data.status_project} onChange={e => setData('status_project', e.target.value)} className="w-full input-premium">
                                            <option value="queue">Antrean (Queue)</option>
                                            <option value="designing">Desain</option>
                                            <option value="revision">Revisi</option>
                                            <option value="finished">Selesai</option>
                                        </select>
                                    </FormGroup>
                                    <div className="md:col-span-2 pt-6">
                                        <label className={`flex items-center gap-4 p-5 rounded-3xl border transition-all ${ (active_slots_count < 3 || data.is_active_slot) ? 'bg-indigo-50/50 border-indigo-100 hover:bg-white cursor-pointer' : 'opacity-50 grayscale bg-gray-50'}`}>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Status Slot Aktif</p>
                                                <p className="text-xs font-bold text-gray-400 italic">{(active_slots_count < 3 || data.is_active_slot) ? 'Project ini menempati slot prioritas.' : 'Slot penuh (3/3). Selesaikan project lain dulu.'}</p>
                                            </div>
                                            <div className="relative">
                                                <input type="checkbox" className="sr-only peer" checked={data.is_active_slot} disabled={active_slots_count >= 3 && !data.is_active_slot} onChange={e => setData('is_active_slot', e.target.checked)} />
                                                <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {activeTab === 'invitation' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                             <SectionCard title="Konten Inti Undangan">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormGroup label="Pilih Template Desain" span={2}>
                                        <select value={data.invitation.template_id} onChange={e => handleInviteChange('template_id', e.target.value)} className="w-full input-premium">
                                            <option value="">- Pilih Desain -</option>
                                            {templates.map(t => <option key={t.id} value={t.id}>{t.name} ({t.category})</option>)}
                                        </select>
                                        {errors['invitation.template_id'] && <p className="text-rose-500 text-[10px] font-bold mt-2 uppercase">{errors['invitation.template_id']}</p>}
                                    </FormGroup>
                                    <FormGroup label="Nama Mempelai / Host (Center)">
                                        <input type="text" placeholder="Farros & Pasangan" value={data.invitation.host_names} onChange={e => handleInviteChange('host_names', e.target.value)} className="w-full input-premium font-black text-indigo-600" />
                                    </FormGroup>
                                    <FormGroup label="Waktu Pelaksanaan">
                                        <input type="text" placeholder="Minggu, 10:00 - Selesai" value={data.invitation.event_time} onChange={e => handleInviteChange('event_time', e.target.value)} className="w-full input-premium" />
                                    </FormGroup>
                                    <FormGroup label="Nama Lokasi Acara">
                                        <input type="text" placeholder="Gedung Pernikahan" value={data.invitation.event_location_name} onChange={e => handleInviteChange('event_location_name', e.target.value)} className="w-full input-premium" />
                                    </FormGroup>
                                    <FormGroup label="Link Google Maps">
                                        <input type="text" placeholder="https://maps.google.com/..." value={data.invitation.event_maps_url} onChange={e => handleInviteChange('event_maps_url', e.target.value)} className="w-full input-premium" />
                                    </FormGroup>
                                    <FormGroup label="Alamat Lengkap Lokasi" span={2}>
                                        <textarea rows="3" value={data.invitation.event_address} onChange={e => handleInviteChange('event_address', e.target.value)} className="w-full input-premium" />
                                    </FormGroup>
                                    <FormGroup label="URL Slug Undangan (Unique)">
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-400 text-xs font-bold">sangkolo.store/v/</span>
                                             <input type="text" value={data.invitation.slug} onChange={e => handleInviteChange('slug', e.target.value)} className="flex-1 input-premium" placeholder="nama-slug" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup label="Status Publikasi">
                                        <label className="flex items-center gap-4 cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={data.invitation.is_published} onChange={e => handleInviteChange('is_published', e.target.checked)} />
                                            <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-500">{data.invitation.is_published ? 'Published' : 'Draft'}</span>
                                        </label>
                                    </FormGroup>
                                </div>
                             </SectionCard>

                             <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[40px] flex items-center justify-between shadow-2xl shadow-indigo-100">
                                 <div>
                                     <h4 className="text-xl font-black text-indigo-900 mb-1">Final Checklist?</h4>
                                     <p className="text-sm text-indigo-700 font-medium opacity-80 italic">Simpan seluruh perubahan sebelum meninggalkan halaman ini.</p>
                                 </div>
                                 <button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-12 rounded-3xl shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs">
                                    {processing ? 'Menyimpan...' : 'Update & Publish'}
                                 </button>
                             </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Custom Form Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                .input-premium {
                    background: #fcfcfd;
                    border: 1px solid #f1f1f4;
                    border-radius: 20px;
                    padding: 12px 20px;
                    font-size: 14px;
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
        <div className={`space-y-1.5 ${span === 2 ? 'md:col-span-2' : ''}`}>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 leading-none">{label}</label>
            {children}
        </div>
    );
}
