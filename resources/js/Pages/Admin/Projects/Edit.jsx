import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageHeader, SectionCard } from '@/Components/UI';

export default function Edit({ auth, project, clients, templates, active_slots_count }) {
    const [activeTab, setActiveTab] = useState('project'); 
    
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
            invitation_type: project.invitation?.invitation_type || 'wedding',
            opening_label: project.invitation?.opening_label || 'Pernikahan Suci Kami',
            
            bride_full_name: project.invitation?.bride_full_name || '',
            bride_nickname: project.invitation?.bride_nickname || '',
            bride_father_name: project.invitation?.bride_father_name || '',
            bride_mother_name: project.invitation?.bride_mother_name || '',
            
            groom_full_name: project.invitation?.groom_full_name || '',
            groom_nickname: project.invitation?.groom_nickname || '',
            groom_father_name: project.invitation?.groom_father_name || '',
            groom_mother_name: project.invitation?.groom_mother_name || '',
            
            wedding_date: project.invitation?.wedding_date || '',
            countdown_datetime: project.invitation?.countdown_datetime || '',
            
            hero_subtitle: project.invitation?.hero_subtitle || '',
            opening_quote: project.invitation?.opening_quote || '',
            closing_note: project.invitation?.closing_note || '',
            gift_note: project.invitation?.gift_note || '',
            
            event_time: project.invitation?.event_time || '',
            event_location_name: project.invitation?.event_location_name || '',
            event_address: project.invitation?.event_address || '',
            event_maps_url: project.invitation?.event_maps_url || '',
            
            is_published: project.invitation?.is_published == 1,
        },

        // Related Data
        schedules: project.invitation?.schedules || [{ title: '', date: '', start_time: '', location_name: '', address: '', maps_url: '' }],
        gift_accounts: project.invitation?.gift_accounts || [{ bank_name: '', account_number: '', account_holder: '' }],
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('projects.update', project));
    };

    const handleInviteChange = (field, value) => {
        setData('invitation', {
            ...data.invitation,
            [field]: value
        });
    };

    const addSchedule = () => {
        setData('schedules', [...data.schedules, { title: '', date: '', start_time: '', location_name: '', address: '', maps_url: '' }]);
    };

    const removeSchedule = (index) => {
        const newSchedules = [...data.schedules];
        newSchedules.splice(index, 1);
        setData('schedules', newSchedules);
    };

    const handleScheduleChange = (index, field, value) => {
        const newSchedules = [...data.schedules];
        newSchedules[index][field] = value;
        setData('schedules', newSchedules);
    };

    const addGiftAccount = () => {
        setData('gift_accounts', [...data.gift_accounts, { bank_name: '', account_number: '', account_holder: '' }]);
    };

    const removeGiftAccount = (index) => {
        const newGifts = [...data.gift_accounts];
        newGifts.splice(index, 1);
        setData('gift_accounts', newGifts);
    };

    const handleGiftChange = (index, field, value) => {
        const newGifts = [...data.gift_accounts];
        newGifts[index][field] = value;
        setData('gift_accounts', newGifts);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Builder: ${project.name_project}`} />
            
            <PageHeader 
                title="Invitation Builder" 
                subtitle={`Membangun produk digital untuk ${project.name_project}`}
                actions={
                    <div className="flex gap-3">
                         {project.invitation && (
                            <a href={route('invitation.show', project.invitation.slug)} target="_blank" className="bg-emerald-50 text-emerald-600 font-bold py-2.5 px-6 rounded-xl border border-emerald-100 flex items-center gap-2 hover:bg-emerald-100 transition-all text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                Lihat Undangan
                            </a>
                        )}
                        <Link href={route('projects.show', project.id)} className="text-sm font-bold text-gray-500 hover:text-gray-900 border border-transparent px-4 py-2.5 flex items-center gap-2 transition-all">
                             Batal
                        </Link>
                    </div>
                }
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side: Navigation */}
                <div className="lg:w-1/4 space-y-3">
                     <TabButton active={activeTab === 'project'} onClick={() => setActiveTab('project')} step="01" title="Data Project" icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     <TabButton active={activeTab === 'mempelai'} onClick={() => setActiveTab('mempelai')} step="02" title="Data Mempelai" icon="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                     <TabButton active={activeTab === 'schedules'} onClick={() => setActiveTab('schedules')} step="03" title="Susunan Acara" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     <TabButton active={activeTab === 'gifts'} onClick={() => setActiveTab('gifts')} step="04" title="Amplop Online" icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                     <TabButton active={activeTab === 'publish'} onClick={() => setActiveTab('publish')} step="05" title="Publish Status" icon="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    
                     <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl mt-6">
                         <h5 className="font-black text-amber-800 text-xs mb-2 uppercase tracking-widest italic">📌 Pro Tip</h5>
                         <p className="text-[11px] text-amber-700 leading-relaxed font-bold">Pastikan format foto prewedding sudah dikompres agar load undangan lebih ringan.</p>
                     </div>
                </div>

                {/* Right Side: Tab Contents */}
                <form onSubmit={submit} className="lg:w-3/4 space-y-8 pb-32">
                    {activeTab === 'project' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <SectionCard title="Administrasi Project">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormGroup label="Pilih Client">
                                        <select value={data.client_id} onChange={e => setData('client_id', e.target.value)} className="w-full input-premium">
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
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {activeTab === 'mempelai' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                             <SectionCard title="Data Mempelai Wanita">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                     <FormGroup label="Nama Lengkap">
                                         <input type="text" value={data.invitation.bride_full_name} onChange={e => handleInviteChange('bride_full_name', e.target.value)} className="w-full input-premium" placeholder="Siti Aminah, S.T." />
                                     </FormGroup>
                                     <FormGroup label="Nama Panggilan">
                                         <input type="text" value={data.invitation.bride_nickname} onChange={e => handleInviteChange('bride_nickname', e.target.value)} className="w-full input-premium" placeholder="Aminah" />
                                     </FormGroup>
                                     <FormGroup label="Nama Ayah">
                                         <input type="text" value={data.invitation.bride_father_name} onChange={e => handleInviteChange('bride_father_name', e.target.value)} className="w-full input-premium" />
                                     </FormGroup>
                                     <FormGroup label="Nama Ibu">
                                         <input type="text" value={data.invitation.bride_mother_name} onChange={e => handleInviteChange('bride_mother_name', e.target.value)} className="w-full input-premium" />
                                     </FormGroup>
                                 </div>
                             </SectionCard>

                             <SectionCard title="Data Mempelai Pria">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                     <FormGroup label="Nama Lengkap">
                                         <input type="text" value={data.invitation.groom_full_name} onChange={e => handleInviteChange('groom_full_name', e.target.value)} className="w-full input-premium" placeholder="Ahmad Fauzan, M.BA" />
                                     </FormGroup>
                                     <FormGroup label="Nama Panggilan">
                                         <input type="text" value={data.invitation.groom_nickname} onChange={e => handleInviteChange('groom_nickname', e.target.value)} className="w-full input-premium" placeholder="Fauzan" />
                                     </FormGroup>
                                     <FormGroup label="Nama Ayah">
                                         <input type="text" value={data.invitation.groom_father_name} onChange={e => handleInviteChange('groom_father_name', e.target.value)} className="w-full input-premium" />
                                     </FormGroup>
                                     <FormGroup label="Nama Ibu">
                                         <input type="text" value={data.invitation.groom_mother_name} onChange={e => handleInviteChange('groom_mother_name', e.target.value)} className="w-full input-premium" />
                                     </FormGroup>
                                 </div>
                             </SectionCard>
                        </div>
                    )}

                    {activeTab === 'schedules' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                             <div className="flex justify-between items-center px-4">
                                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Daftar Acara</h3>
                                 <button type="button" onClick={addSchedule} className="bg-indigo-50 text-indigo-600 font-black py-2 px-6 rounded-2xl hover:bg-indigo-100 transition-all text-[10px] uppercase tracking-widest">
                                     + Tambah Acara
                                 </button>
                             </div>
                             
                             {data.schedules.map((schedule, index) => (
                                 <SectionCard key={index} title={`Acara #${index + 1}`}>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                         <FormGroup label="Nama Acara (e.g. Akad Nikah)">
                                             <input type="text" value={schedule.title} onChange={e => handleScheduleChange(index, 'title', e.target.value)} className="w-full input-premium" />
                                         </FormGroup>
                                         <FormGroup label="Tanggal Acara">
                                             <input type="date" value={schedule.date} onChange={e => handleScheduleChange(index, 'date', e.target.value)} className="w-full input-premium" />
                                         </FormGroup>
                                         <FormGroup label="Waktu Mulai (e.g. 08:00)">
                                             <input type="time" value={schedule.start_time} onChange={e => handleScheduleChange(index, 'start_time', e.target.value)} className="w-full input-premium" />
                                         </FormGroup>
                                         <FormGroup label="Nama Tempat">
                                             <input type="text" value={schedule.location_name} onChange={e => handleScheduleChange(index, 'location_name', e.target.value)} className="w-full input-premium" />
                                         </FormGroup>
                                         <FormGroup label="Alamat / Link Maps" span={2}>
                                             <input type="text" value={schedule.address} onChange={e => handleScheduleChange(index, 'address', e.target.value)} className="w-full input-premium mb-2" placeholder="Alamat lengkap..." />
                                             <input type="text" value={schedule.maps_url} onChange={e => handleScheduleChange(index, 'maps_url', e.target.value)} className="w-full input-premium" placeholder="Google Maps URL..." />
                                         </FormGroup>
                                         <div className="md:col-span-2 flex justify-end">
                                             <button type="button" onClick={() => removeSchedule(index)} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-700">Hapus Acara</button>
                                         </div>
                                     </div>
                                 </SectionCard>
                             ))}
                        </div>
                    )}

                    {activeTab === 'gifts' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                             <div className="flex justify-between items-center px-4">
                                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Amplop Online</h3>
                                 <button type="button" onClick={addGiftAccount} className="bg-indigo-50 text-indigo-600 font-black py-2 px-6 rounded-2xl hover:bg-indigo-100 transition-all text-[10px] uppercase tracking-widest">
                                     + Tambah Rekening
                                 </button>
                             </div>

                             <SectionCard title="Gift Configuration">
                                 <FormGroup label="Catatan Kado (e.g. Mohon tidak membawa kado fisik)">
                                     <textarea rows="2" value={data.invitation.gift_note} onChange={e => handleInviteChange('gift_note', e.target.value)} className="w-full input-premium" />
                                 </FormGroup>
                             </SectionCard>
                             
                             {data.gift_accounts.map((gift, index) => (
                                 <div key={index} className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-xl relative overflow-hidden">
                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                         <FormGroup label="Nama Bank / E-Wallet">
                                             <input type="text" value={gift.bank_name} onChange={e => handleGiftChange(index, 'bank_name', e.target.value)} className="w-full input-premium" placeholder="BCA / OVO / Dana" />
                                         </FormGroup>
                                         <FormGroup label="Nomor Rekening">
                                             <input type="text" value={gift.account_number} onChange={e => handleGiftChange(index, 'account_number', e.target.value)} className="w-full input-premium" />
                                         </FormGroup>
                                         <FormGroup label="Atas Nama">
                                             <input type="text" value={gift.account_holder} onChange={e => handleGiftChange(index, 'account_holder', e.target.value)} className="w-full input-premium" />
                                         </FormGroup>
                                     </div>
                                     <button type="button" onClick={() => removeGiftAccount(index)} className="absolute top-4 right-8 text-[10px] font-black text-rose-500 uppercase tracking-widest opacity-40 hover:opacity-100">Remove</button>
                                 </div>
                             ))}
                        </div>
                    )}

                    {activeTab === 'publish' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                             <SectionCard title="Final Settings">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormGroup label="Pilih Template Desain" span={2}>
                                        <select value={data.invitation.template_id} onChange={e => handleInviteChange('template_id', e.target.value)} className="w-full input-premium">
                                            <option value="">- Pilih Desain -</option>
                                            {templates.map(t => <option key={t.id} value={t.id}>{t.name} ({t.category})</option>)}
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="URL Slug Undangan (Unique)">
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-400 text-xs font-bold">sangkolo.store/v/</span>
                                             <input type="text" value={data.invitation.slug} onChange={e => handleInviteChange('slug', e.target.value)} className="flex-1 input-premium" placeholder="nama-slug" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup label="Labels / Quotes" span={2}>
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             <textarea rows="3" placeholder="Quotes pembuka (e.g. QS. Ar-rum)..." value={data.invitation.opening_quote} onChange={e => handleInviteChange('opening_quote', e.target.value)} className="w-full input-premium text-xs" />
                                             <textarea rows="3" placeholder="Ucapan penutup / terima kasih..." value={data.invitation.closing_note} onChange={e => handleInviteChange('closing_note', e.target.value)} className="w-full input-premium text-xs" />
                                         </div>
                                     </FormGroup>
                                     <FormGroup label="Status Visibilitas" span={2}>
                                         <div className={`p-6 rounded-3xl border transition-all flex items-center justify-between ${data.invitation.is_published ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                                              <div className="space-y-1">
                                                  <p className={`text-sm font-black ${data.invitation.is_published ? 'text-emerald-900' : 'text-amber-900'}`}>{data.invitation.is_published ? 'LIVE: Undangan Sudah Terbit' : 'DRAFT: Masih Tahap Pengerjaan'}</p>
                                                  <p className="text-[10px] font-medium opacity-60">Kontrol visibilitas undangan di sisi publik.</p>
                                              </div>
                                              <button 
                                                 type="button"
                                                 onClick={() => handleInviteChange('is_published', !data.invitation.is_published)}
                                                 className={`w-14 h-8 rounded-full relative transition-colors ${data.invitation.is_published ? 'bg-emerald-500' : 'bg-amber-400'}`}
                                              >
                                                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${data.invitation.is_published ? 'translate-x-6' : ''}`}></div>
                                              </button>
                                         </div>
                                     </FormGroup>
                                </div>
                             </SectionCard>
                        </div>
                    )}

                    <div className="fixed bottom-10 right-10 left-auto md:left-auto flex justify-end">
                         <button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-12 rounded-[30px] shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
                            {processing ? 'Saving...' : 'Save All Changes'}
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

function TabButton({ active, onClick, step, title, icon }) {
    return (
        <button type="button" onClick={onClick} className={`w-full text-left p-5 rounded-3xl border transition-all flex items-center gap-4 ${active ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border-gray-100 text-gray-700 hover:border-indigo-200'}`}>
            <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${active ? 'bg-indigo-500' : 'bg-indigo-50 text-indigo-500'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} /></svg>
            </div>
            <div>
                <p className={`text-[9px] font-black uppercase tracking-widest leading-none mb-1 ${active ? 'text-indigo-200' : 'text-gray-400'}`}>Step {step}</p>
                <h4 className="font-black text-sm">{title}</h4>
            </div>
        </button>
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
