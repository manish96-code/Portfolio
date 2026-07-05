import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ experiences }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        company: '',
        designation: '',
        duration: '',
        description: '',
        skills_used: [],
        is_current: false,
        order_index: 0,
    });

    const [techInput, setTechInput] = useState('');

    const openCreateModal = () => {
        reset();
        setTechInput('');
        setEditingExp(null);
        setIsModalOpen(true);
    };

    const openEditModal = (exp) => {
        setEditingExp(exp);
        const skills = Array.isArray(exp.skills_used) ? exp.skills_used : JSON.parse(exp.skills_used || '[]');
        setData({
            company: exp.company,
            designation: exp.designation,
            duration: exp.duration,
            description: exp.description || '',
            skills_used: skills,
            is_current: exp.is_current,
            order_index: exp.order_index,
        });
        setTechInput('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingExp(null);
    };

    const addTech = () => {
        if (techInput.trim() !== '' && !data.skills_used.includes(techInput.trim())) {
            setData('skills_used', [...data.skills_used, techInput.trim()]);
            setTechInput('');
        }
    };

    const removeTech = (tech) => {
        setData('skills_used', data.skills_used.filter(t => t !== tech));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingExp) {
            put(`/admin/experiences/${editingExp.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/experiences', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this experience record?')) {
            router.delete(`/admin/experiences/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Experience" />

            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-100">Professional Experience</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage employment timelines, intern designations, and career descriptions.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white text-xs font-bold transition shadow-lg shadow-[#FF2D20]/20"
                    >
                        + Add Experience
                    </button>
                </div>

                <div className="bg-[#0d121f]/20 border border-slate-900 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-900/40 text-slate-400 font-bold border-b border-slate-900">
                                <th className="p-4">Role Designation</th>
                                <th className="p-4">Company</th>
                                <th className="p-4">Duration</th>
                                <th className="p-4">Technologies</th>
                                <th className="p-4">Sort Order</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 text-slate-300">
                            {experiences.length > 0 ? (
                                experiences.map((exp) => {
                                    const skills = Array.isArray(exp.skills_used) ? exp.skills_used : JSON.parse(exp.skills_used || '[]');
                                    return (
                                        <tr key={exp.id} className="hover:bg-[#0d121f]/10">
                                            <td className="p-4 font-bold text-slate-200">{exp.designation}</td>
                                            <td className="p-4">{exp.company}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-0.5 rounded bg-[#FF2D20]/15 text-[#FF2D20] font-semibold text-[10px]">
                                                    {exp.duration}
                                                </span>
                                            </td>
                                            <td className="p-4 max-w-[200px] truncate">
                                                {skills.join(', ') || '—'}
                                            </td>
                                            <td className="p-4 font-mono text-slate-500">{exp.order_index}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <button
                                                    onClick={() => openEditModal(exp)}
                                                    className="text-xs text-slate-500 hover:text-[#FF2D20] transition"
                                                >
                                                    Edit
                                                </button>
                                                <span className="text-slate-700">|</span>
                                                <button
                                                    onClick={() => handleDelete(exp.id)}
                                                    className="text-xs text-slate-500 hover:text-rose-400 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500 font-light">
                                        No experiences registered.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
                        <div className="w-full max-w-lg bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                            <h3 className="text-lg font-black text-slate-100 mb-6">
                                {editingExp ? 'Edit Experience Record' : 'Add Experience Record'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Designation</label>
                                        <input
                                            type="text"
                                            value={data.designation}
                                            onChange={e => setData('designation', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="Full Stack Developer Intern"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Company Name</label>
                                        <input
                                            type="text"
                                            value={data.company}
                                            onChange={e => setData('company', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="Comestro Techlabs Pvt Ltd"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Duration String</label>
                                        <input
                                            type="text"
                                            value={data.duration}
                                            onChange={e => setData('duration', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="Jan 2024 - Present"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Display Order</label>
                                        <input
                                            type="number"
                                            value={data.order_index}
                                            onChange={e => setData('order_index', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-[9px] cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_current}
                                            onChange={e => setData('is_current', e.target.checked)}
                                            className="rounded bg-slate-950 border-slate-800 text-[#FF2D20] focus:ring-0"
                                        />
                                        Currently working here
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Role Description</label>
                                    <textarea
                                        rows="4"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 resize-none"
                                        placeholder="Tasks and achievements in this role..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Technologies / Skills Used</label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={techInput}
                                            onChange={e => setTechInput(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="Add tech, e.g. Laravel"
                                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                                        />
                                        <button
                                            type="button"
                                            onClick={addTech}
                                            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold transition"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-850 min-h-[50px]">
                                        {data.skills_used.map((t, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
                                                {t}
                                                <button type="button" onClick={() => removeTech(t)} className="text-rose-500 font-bold hover:text-rose-400">×</button>
                                            </span>
                                        ))}
                                    </div>
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
                                        {processing ? 'Saving...' : 'Save Record'}
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
