import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Profile({ user }) {
    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/profile', {
            onSuccess: () => reset('current_password', 'new_password', 'new_password_confirmation'),
        });
    };

    return (
        <AdminLayout>
            <Head title="Profile Settings" />

            <div className="max-w-xl mx-auto space-y-8">
                <div className="border-b border-slate-900 pb-4">
                    <h1 className="text-2xl font-black text-slate-100">Profile Settings</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage your administrative access credentials, name, and email details.</p>
                </div>

                {wasSuccessful && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        Profile details and password updated successfully.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 bg-[#0d121f]/20 border border-slate-900 p-8 rounded-3xl backdrop-blur-sm shadow-xl">
                    <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-900 mb-4">
                        Account Details
                    </h3>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Display Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                            required
                        />
                        {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                            required
                        />
                        {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-900 mt-8 mb-4 pt-4">
                        Change Password
                    </h3>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Password</label>
                        <input
                            type="password"
                            value={data.current_password}
                            onChange={e => setData('current_password', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                            placeholder="Leave blank to keep current"
                        />
                        {errors.current_password && <p className="text-[10px] text-rose-500 mt-1">{errors.current_password}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">New Password</label>
                            <input
                                type="password"
                                value={data.new_password}
                                onChange={e => setData('new_password', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                                placeholder="New password"
                            />
                            {errors.new_password && <p className="text-[10px] text-rose-500 mt-1">{errors.new_password}</p>}
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={data.new_password_confirmation}
                                onChange={e => setData('new_password_confirmation', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white font-bold transition shadow-lg shadow-[#FF2D20]/25 disabled:opacity-50 mt-4"
                    >
                        {processing ? 'Saving changes...' : 'Save Profile Changes'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
