import React, { useState, useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ invitation, guest }) {
    const { 
        template, schedules = [], gift_accounts = [], galleries = [], 
        guest_messages = [], slug, bride_full_name, bride_nickname, 
        bride_father_name, bride_mother_name, groom_full_name, 
        groom_nickname, groom_father_name, groom_mother_name,
        wedding_date, countdown_datetime, opening_label, opening_quote,
        closing_note, gift_note, hero_subtitle, host_names
    } = invitation;

    const [isOpened, setIsOpened] = useState(false);
    const audioRef = useRef(null);

    const openInvitation = () => {
        setIsOpened(true);
        if (invitation.background_music && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play blocked: ", e));
        }
    };

    // Countdown Timer logic if needed
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (!countdown_datetime) return;
        const target = new Date(countdown_datetime).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = target - now;
            if (diff < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown_datetime]);

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-rose-100 overflow-x-hidden">
            <Head title={`${host_names || 'Wedding Invitation'} - ${guest?.name || ''}`} />
            
            {invitation.background_music && (
                <audio ref={audioRef} src={invitation.background_music} loop />
            )}

            {/* COVER SECTION */}
            {!isOpened && (
                <section className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 bg-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                         <div className="absolute top-0 left-0 w-64 h-64 border-t border-l border-neutral-300 rounded-tl-[100px]"></div>
                         <div className="absolute bottom-0 right-0 w-64 h-64 border-b border-r border-neutral-300 rounded-br-[100px]"></div>
                    </div>
                    
                    <div className="relative text-center space-y-12 max-w-sm animate-in fade-in zoom-in duration-1000">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">{opening_label || 'WEDDING INVITATION'}</h4>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 leading-tight">
                                {bride_nickname || 'Siti'} <span className="text-neutral-300">&</span> {groom_nickname || 'Fauzan'}
                            </h1>
                        </div>

                        <div className="py-10 space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                            <h2 className="text-2xl font-black text-neutral-900">{guest?.name || 'VVIP Guest'}</h2>
                        </div>

                        <button 
                            onClick={openInvitation}
                            className="bg-neutral-900 text-white font-black py-4 px-12 rounded-full text-[10px] uppercase tracking-widest shadow-2xl hover:bg-neutral-800 transition-all active:scale-95"
                        >
                            Open Invitation
                        </button>
                    </div>
                </section>
            )}

            {/* MAIN CONTENT (Scrollable) */}
            <div className={`transition-all duration-1000 ${isOpened ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="max-w-screen-sm mx-auto bg-white shadow-2xl relative">
                    
                    {/* HERO */}
                    <div className="relative h-screen flex flex-col justify-end p-12 text-white overflow-hidden">
                        <div className="absolute inset-0 bg-neutral-900">
                            {invitation.cover_image && (
                                <img src={invitation.cover_image} className="w-full h-full object-cover opacity-60" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                        <div className="relative z-10 space-y-4 animate-in slide-in-from-bottom duration-1000 delay-500">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300">{hero_subtitle || 'The Wedding of'}</p>
                            <h2 className="text-4xl font-black leading-tight tracking-tighter uppercase whitespace-pre-wrap">{host_names || `${bride_nickname} & ${groom_nickname}`}</h2>
                            <p className="text-sm font-bold tracking-widest uppercase text-white/60">{wedding_date ? new Date(wedding_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</p>
                        </div>
                    </div>

                    {/* OPENING QUOTE */}
                    <section className="py-32 px-10 text-center space-y-8 bg-neutral-50/50">
                        <div className="max-w-md mx-auto space-y-6">
                            <div className="w-10 h-[1px] bg-neutral-200 mx-auto"></div>
                            <p className="text-sm font-medium italic text-neutral-500 leading-relaxed">
                                {opening_quote || '"And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."'}
                            </p>
                            <div className="w-10 h-[1px] bg-neutral-200 mx-auto"></div>
                        </div>
                    </section>

                    {/* COUPLE */}
                    <section className="py-32 px-10 space-y-24 bg-white">
                        {/* Bride */}
                        <div className="text-center space-y-6">
                             <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-neutral-50 shadow-xl">
                                 <img src={`https://ui-avatars.com/api/?name=${bride_nickname || 'B'}&background=f5f5f5&color=333&size=200`} className="w-full h-full object-cover" />
                             </div>
                             <div className="space-y-1">
                                 <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{bride_full_name || 'Mempelai Wanita'}</h3>
                                 <p className="text-xs font-bold text-neutral-400">Putri dari Bapak {bride_father_name || '...'} & Ibu {bride_mother_name || '...'}</p>
                             </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-4 py-4 text-neutral-200">
                             <div className="flex-1 h-[1px] bg-neutral-100"></div>
                             <span className="text-2xl font-black italic">&</span>
                             <div className="flex-1 h-[1px] bg-neutral-100"></div>
                        </div>

                        {/* Groom */}
                        <div className="text-center space-y-6">
                             <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-neutral-50 shadow-xl">
                                 <img src={`https://ui-avatars.com/api/?name=${groom_nickname || 'G'}&background=ececec&color=333&size=200`} className="w-full h-full object-cover" />
                             </div>
                             <div className="space-y-1">
                                 <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{groom_full_name || 'Mempelai Pria'}</h3>
                                 <p className="text-xs font-bold text-neutral-400">Putra dari Bapak {groom_father_name || '...'} & Ibu {groom_mother_name || '...'}</p>
                             </div>
                        </div>
                    </section>

                    {/* COUNTDOWN */}
                    {timeLeft && (
                        <section className="py-24 px-10 bg-neutral-900 text-white text-center rounded-t-[60px] -mt-10 relative z-20">
                             <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
                                 <CountdownBox value={timeLeft.days} unit="Days" />
                                 <CountdownBox value={timeLeft.hours} unit="Hrs" />
                                 <CountdownBox value={timeLeft.minutes} unit="Mins" />
                                 <CountdownBox value={timeLeft.seconds} unit="Secs" />
                             </div>
                        </section>
                    )}

                    {/* SCHEDULES */}
                    {schedules.length > 0 && (
                        <section className="py-32 px-10 bg-white">
                            <div className="text-center mb-16 space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">The Events</h4>
                                <h2 className="text-3xl font-black text-neutral-900 tracking-tighter">Susunan Acara</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {schedules.map((item, i) => (
                                    <div key={i} className="group p-8 lg:p-12 rounded-[50px] bg-neutral-50 hover:bg-neutral-900 hover:text-white transition-all duration-700 border border-neutral-100 flex flex-col justify-between">
                                         <div className="space-y-6">
                                              <div className="flex justify-between items-start">
                                                  <h3 className="text-xl font-black uppercase tracking-tight max-w-[150px]">{item.title}</h3>
                                                  <span className="text-[10px] font-black bg-white/10 px-3 py-1.5 rounded-full border border-neutral-200 group-hover:border-white/20">{item.start_time || 'TBA'}</span>
                                              </div>
                                              <div className="pt-4 border-t border-neutral-200/50">
                                                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Tanggal</p>
                                                  <p className="text-sm font-black">{new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                              </div>
                                         </div>
                                         <div className="pt-10 space-y-4">
                                              <div className="space-y-2">
                                                  <p className="text-sm font-black">{item.location_name}</p>
                                                  <p className="text-xs font-medium opacity-60 leading-relaxed">{item.address}</p>
                                              </div>
                                              {item.maps_url && (
                                                  <a href={item.maps_url} target="_blank" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest underline underline-offset-4 pt-4 group-hover:text-indigo-400">View Map</a>
                                              )}
                                         </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* GALLERY */}
                    {galleries.length > 0 && (
                        <section className="py-32 px-4 bg-neutral-50">
                            <div className="text-center mb-16">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400 mb-2">Our Gallery</h4>
                                <h2 className="text-3xl font-black text-neutral-900 tracking-tighter">Captured Moments</h2>
                            </div>
                            <div className="columns-2 gap-4 space-y-4 px-4 overflow-hidden">
                                {galleries.map((img, i) => (
                                    <div key={i} className="rounded-3xl overflow-hidden shadow-sm break-inside-avoid">
                                        <img src={img.image_path} className="w-full h-auto object-cover hover:scale-110 transition-all duration-700" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* GIFTS */}
                    {gift_accounts.length > 0 && (
                        <section className="py-32 px-10 bg-white text-center">
                            <div className="mb-16 space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">Wedding Gift</h4>
                                <h2 className="text-3xl font-black text-neutral-900 tracking-tighter">Amplop Online</h2>
                                <p className="text-xs font-medium text-neutral-400 max-w-xs mx-auto leading-relaxed">{gift_note || 'Doa restu Anda merupakan kado terindah bagi kami. Namun jika ingin memberikan tanda kasih lainnya, silakan melalui:'}</p>
                            </div>
                            <div className="space-y-4">
                                {gift_accounts.map((gift, i) => (
                                    <GiftCard key={i} gift={gift} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* RSVP & WISHES */}
                    <div className="px-6 pb-20 space-y-8">
                        <RsvpSection slug={slug} guest={guest} />
                        <WishesSection slug={slug} messages={guest_messages} guest={guest} />
                    </div>

                    {/* FOOTER */}
                    <footer className="py-24 px-10 text-center bg-neutral-50 rounded-t-[60px] border-t border-neutral-100">
                        <div className="space-y-8">
                             <div className="space-y-4 max-w-xs mx-auto">
                                 <p className="text-sm font-medium italic text-neutral-400">{closing_note || "Atas kehadiran dan doa restu Anda, kami ucapkan terima kasih yang sebesar-besarnya."}</p>
                                 <h4 className="text-2xl font-black tracking-tighter text-neutral-900 uppercase">
                                     {bride_nickname} <span className="text-neutral-300">&</span> {groom_nickname}
                                 </h4>
                             </div>
                             
                             <div className="pt-12 border-t border-neutral-200/50">
                                 <p className="text-[10px] font-black tracking-[0.3em] text-neutral-300 uppercase mb-3">Created With Love</p>
                                 <p className="text-lg font-black tracking-tighter text-neutral-900">Undangan Sangkolo</p>
                                 <p className="text-[9px] font-bold text-neutral-400 tracking-widest mt-1">sangkolo.store</p>
                             </div>
                        </div>
                    </footer>

                    {/* Floating Music Control */}
                    {isOpened && invitation.background_music && (
                        <div className="fixed bottom-10 right-6 z-[100]">
                             <button onClick={() => {
                                 if (audioRef.current.paused) audioRef.current.play();
                                 else audioRef.current.pause();
                             }} className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center border border-neutral-100 text-neutral-900 animate-pulse">
                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2A1 1 0 007 8z" /></svg>
                             </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CountdownBox({ value, unit }) {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center">
            <span className="text-2xl font-black leading-none">{value}</span>
            <span className="text-[8px] font-black uppercase tracking-widest mt-2 text-white/40">{unit}</span>
        </div>
    );
}

function GiftCard({ gift }) {
    const [copied, setCopied] = useState(false);
    const copyTxt = () => {
        navigator.clipboard.writeText(gift.account_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-8 bg-neutral-50 rounded-[40px] border border-neutral-100 space-y-4">
             <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{gift.bank_name}</p>
                 <h5 className="text-xl font-black">{gift.account_number}</h5>
                 <p className="text-xs font-bold opacity-60">a.n {gift.account_holder}</p>
             </div>
             <button onClick={copyTxt} className={`text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all border ${copied ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-900 hover:text-white'}`}>
                 {copied ? 'Copied!' : gift.copy_label || 'Salin Nomor'}
             </button>
        </div>
    );
}

function RsvpSection({ slug, guest }) {
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        name: guest?.name || '',
        attendance_status: guest?.rsvp?.attendance_status || 'attending',
        guest_count: guest?.rsvp?.guest_count || 1,
        notes: guest?.rsvp?.notes || '',
        invitation_guest_id: guest?.id || null
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('invitation.rsvp', slug), {
            preserveScroll: true
        });
    };

    return (
        <div className="p-10 bg-neutral-900 text-white rounded-[50px] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
             
             <div className="text-center mb-10 space-y-2 relative z-10">
                 <h2 className="text-2xl font-black tracking-tighter">RSVP</h2>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Konfirmasi Kehadiran</p>
             </div>

             {recentlySuccessful ? (
                 <div className="py-20 text-center font-black animate-pulse text-rose-400 uppercase tracking-widest">✨ Konfirmasi Anda Berhasil Disimpan</div>
             ) : (
                <form onSubmit={submit} className="space-y-4 relative z-10">
                    <input 
                        type="text" 
                        placeholder="Nama Lengkap"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full p-5 rounded-3xl bg-white/10 border border-white/5 focus:bg-white focus:text-neutral-900 outline-none font-bold text-sm transition-all disabled:opacity-50"
                        required
                        disabled={!!guest}
                    />
                    <div className="flex gap-3">
                        <button 
                            type="button"
                            onClick={() => setData('attendance_status', 'attending')}
                            className={`flex-1 p-5 rounded-[28px] border transition-all text-[10px] font-black uppercase tracking-widest ${data.attendance_status === 'attending' ? 'bg-white text-neutral-900 border-white shadow-xl shadow-white/10 scale-[1.02]' : 'bg-white/5 text-white/50 border-white/5 hover:bg-white/10'}`}
                        >
                            Hadir
                        </button>
                        <button 
                            type="button"
                            onClick={() => setData('attendance_status', 'maybe')}
                            className={`flex-1 p-5 rounded-[28px] border transition-all text-[10px] font-black uppercase tracking-widest ${data.attendance_status === 'maybe' ? 'bg-white text-neutral-900 border-white shadow-xl shadow-white/10 scale-[1.02]' : 'bg-white/5 text-white/50 border-white/5 hover:bg-white/10'}`}
                        >
                            Ragu
                        </button>
                        <button 
                            type="button"
                            onClick={() => setData('attendance_status', 'not_attending')}
                            className={`flex-1 p-5 rounded-[28px] border transition-all text-[10px] font-black uppercase tracking-widest ${data.attendance_status === 'not_attending' ? 'bg-white text-neutral-900 border-white shadow-xl shadow-white/10 scale-[1.02]' : 'bg-white/5 text-white/50 border-white/5 hover:bg-white/10'}`}
                        >
                            Tidak
                        </button>
                    </div>
                    <textarea 
                        placeholder="Ucapan tambahan (opsional)"
                        value={data.notes}
                        onChange={e => setData('notes', e.target.value)}
                        className="w-full p-5 rounded-3xl bg-white/10 border border-white/5 focus:bg-white focus:text-neutral-900 outline-none font-bold text-sm h-32 transition-all"
                    ></textarea>
                    <button 
                        disabled={processing}
                        className="w-full bg-white text-neutral-900 font-black py-5 px-6 rounded-3xl text-[10px] uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] transition-all hover:bg-neutral-100"
                    >
                        {guest?.rsvp ? 'Update Konfirmasi' : 'Kirim Konfirmasi'}
                    </button>
                </form>
             )}
        </div>
    );
}

function WishesSection({ slug, messages, guest }) {
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        name: guest?.name || '',
        message: guest?.message?.message || '',
        invitation_guest_id: guest?.id || null
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('invitation.message', slug), {
            preserveScroll: true
        });
    };

    return (
        <div className="space-y-12">
             <div className="text-center space-y-2">
                 <h2 className="text-2xl font-black tracking-tighter text-neutral-900 uppercase">Wishes</h2>
                 <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Ucapan Doa & Harapan</p>
             </div>
             
             {recentlySuccessful ? (
                  <div className="p-10 rounded-[40px] bg-emerald-50 text-emerald-800 text-center font-black animate-in zoom-in duration-500 uppercase tracking-widest text-[10px]">Ucapan Anda Sudah Terkirim! ✨</div>
             ) : (
                <form onSubmit={submit} className="space-y-4 p-8 rounded-[40px] border border-neutral-100 bg-neutral-50 shadow-sm">
                    <input 
                        type="text" 
                        placeholder="Nama Anda"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full p-4 rounded-2xl bg-white border border-neutral-100 focus:border-neutral-900 outline-none font-bold text-sm disabled:opacity-60 transition-all"
                        required
                        disabled={!!guest}
                    />
                    <textarea 
                        placeholder="Tulis ucapan & doa..."
                        value={data.message}
                        onChange={e => setData('message', e.target.value)}
                        className="w-full p-4 rounded-2xl bg-white border border-neutral-100 focus:border-neutral-900 outline-none font-bold text-sm h-32 transition-all"
                        required
                    ></textarea>
                    <button 
                        disabled={processing}
                        className="w-full bg-neutral-900 text-white font-black py-4 px-6 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all"
                    >
                        {guest?.message ? 'Update Wishes' : 'Save Wishes'}
                    </button>
                </form>
             )}

             <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {messages.length > 0 ? messages.map((m, i) => (
                    <div key={m.id || i} className={`p-8 rounded-[40px] bg-white space-y-4 border ${m.invitation_guest_id === guest?.id ? 'border-indigo-200 ring-4 ring-indigo-50 shadow-xl' : 'border-neutral-100'} hover:shadow-lg transition-all duration-500 relative`}>
                        {m.invitation_guest_id === guest?.id && (
                            <span className="absolute top-6 right-8 bg-indigo-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">YOU</span>
                        )}
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-black text-neutral-900 uppercase">{m.name.charAt(0)}</div>
                             <div>
                                <p className="text-xs font-black text-neutral-900">{m.name}</p>
                                <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">{new Date(m.created_at).toLocaleDateString('id-ID')}</p>
                             </div>
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed font-medium italic">"{m.message}"</p>
                    </div>
                )) : (
                    <div className="py-20 text-center text-neutral-300 text-xs font-bold italic">Belum ada ucapan. Jadilah yang pertama!</div>
                )}
             </div>
        </div>
    );
}

