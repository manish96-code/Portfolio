import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ certificates }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        organization: '',
        issue_date: '',
        credential_url: '',
        image_file: null,
    });

    const openCreateModal = () => {
        reset();
        setEditingCert(null);
        setIsModalOpen(true);
    };

    const openEditModal = (cert) => {
        setEditingCert(cert);
        setData({
            title: cert.title,
            organization: cert.organization,
            issue_date: cert.issue_date,
            credential_url: cert.credential_url || '',
            image_file: null,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingCert(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Since we are uploading file via POST request (even for update, Laravel sometimes has issues with PUT requests containing multipart/form-data. So we can use POST with a _method PUT parameter or just standard POST for storage, but here we can do it via Inertia post).
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('organization', data.organization);
        formData.append('issue_date', data.issue_date);
        formData.append('credential_url', data.credential_url);
        if (data.image_file) {
            formData.append('image_file', data.image_file);
        }

        if (editingCert) {
            // Laravel PATCH/PUT file uploads workaround: use post with _method
            router.post(`/admin/certificates/${editingCert.id}`, {
                _method: 'PUT',
                ...data
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/certificates', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this certificate record?')) {
            router.delete(`/admin/certificates/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Certificates" />

            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-100">Certificates & Awards</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage technical certifications, issuer organizations, and dates.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white text-xs font-bold transition shadow-lg shadow-[#FF2D20]/20"
                    >
                        + Add Certificate
                    </button>
                </div>

                <div className="bg-[#0d121f]/20 border border-slate-900 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-900/40 text-slate-400 font-bold border-b border-slate-900">
                                <th className="p-4">Certificate Title</th>
                                <th className="p-4">Issuer Organization</th>
                                <th className="p-4">Issue Date</th>
                                <th className="p-4">Credential Link</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 text-slate-300">
                            {certificates.length > 0 ? (
                                certificates.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-[#0d121f]/10">
                                        <td className="p-4 font-bold text-slate-200">{cert.title}</td>
                                        <td className="p-4">{cert.organization}</td>
                                        <td className="p-4">{cert.issue_date}</td>
                                        <td className="p-4 max-w-[200px] truncate font-mono text-slate-500">
                                            {cert.credential_url ? (
                                                <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                                                    Verify URL
                                                </a>
                                            ) : '—'}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => openEditModal(cert)}
                                                className="text-xs text-slate-500 hover:text-[#FF2D20] transition"
                                            >
                                                Edit
                                            </button>
                                            <span className="text-slate-700">|</span>
                                            <button
                                                onClick={() => handleDelete(cert.id)}
                                                className="text-xs text-slate-500 hover:text-rose-400 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500 font-light">
                                        No certificates registered.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
                        <div className="w-full max-w-md bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-2xl relative">
                            <h3 className="text-lg font-black text-slate-100 mb-6">
                                {editingCert ? 'Edit Certificate Details' : 'Add New Certificate'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Certificate Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        placeholder="Laravel Advanced Certification"
                                        required
                                    />
                                    {errors.title && <p className="text-[10px] text-rose-500 mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Issuer Organization</label>
                                    <input
                                        type="text"
                                        value={data.organization}
                                        onChange={e => setData('organization', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        placeholder="Laravel Academy / Udemy"
                                        required
                                    />
                                    {errors.organization && <p className="text-[10px] text-rose-500 mt-1">{errors.organization}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Issue Date</label>
                                        <input
                                            type="text"
                                            value={data.issue_date}
                                            onChange={e => setData('issue_date', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="March 2026"
                                            required
                                        />
                                        {errors.issue_date && <p className="text-[10px] text-rose-500 mt-1">{errors.issue_date}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Verification URL</label>
                                        <input
                                            type="url"
                                            value={data.credential_url}
                                            onChange={e => setData('credential_url', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="https://verify.url"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Upload Image (Optional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('image_file', e.target.files[0])}
                                        className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-300 file:mr-3 file:py-0.5 file:px-2 file:rounded file:border-0 file:bg-slate-900 file:text-slate-400 file:text-[10px] file:font-semibold"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 rounded-xl bg-[#FF2D20] text-white font-bold transition shadow-lg shadow-[#FF2D20]/20 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Certificate'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
