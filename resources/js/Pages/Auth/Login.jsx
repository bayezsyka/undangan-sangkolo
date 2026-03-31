import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#fdfdfd]">
            <Head title="Login Admin" />
            
            <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white shadow-2xl shadow-indigo-100 rounded-3xl border border-gray-100 overflow-hidden">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 mb-4 rotate-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Login</h1>
                    <p className="text-sm text-gray-500 mt-1">Sangkolo Invitation Panel</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-900"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-900"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password}</p>}
                    </div>

                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Ingat saya</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? 'Masuk...' : 'Masuk sekarang'}
                    </button>
                    
                    <div className="text-center mt-4">
                      <p className="text-xs text-gray-400 italic">"Simplicity is the ultimate sophistication"</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
