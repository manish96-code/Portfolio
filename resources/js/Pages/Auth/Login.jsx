import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex items-center justify-center relative p-6">
            {/* Glowing background circles for ambient premium look */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF2D20]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <Head title="Admin Login" />

            <div className="w-full max-w-md bg-slate-900/30 border border-slate-900 p-8 rounded-3xl backdrop-blur-sm shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF2D20]/5 rounded-full blur-xl"></div>
                
                {/* Header branding */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF2D20] to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-[#FF2D20]/25">
                            A
                        </div>
                    </Link>
                    <h2 className="text-2xl font-black text-slate-100 tracking-tight">Admin Console</h2>
                    <p className="text-slate-500 text-xs mt-1.5">Sign in to manage your public portfolio & CRUDs</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 focus:ring-1 focus:ring-[#FF2D20]/20 rounded-xl px-4 py-3 text-xs text-slate-200 transition"
                            placeholder="admin@portfolio.com"
                            required
                            autoFocus
                        />
                        {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 focus:ring-1 focus:ring-[#FF2D20]/20 rounded-xl px-4 py-3 text-xs text-slate-200 transition"
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && <p className="text-[10px] text-rose-500 mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="rounded bg-slate-950 border-slate-900 text-[#FF2D20] focus:ring-0 cursor-pointer"
                            />
                            Remember Me
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white font-bold transition shadow-lg shadow-[#FF2D20]/20 disabled:opacity-50 mt-2"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link href="/" className="text-[10px] text-slate-500 hover:text-slate-300 transition">
                        &larr; Back to Live Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
}
