import React, { useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ skills }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        category: 'Backend',
        icon: '',
        level: 80,
    });

    const openCreateModal = () => {
        reset();
        setEditingSkill(null);
        setIsModalOpen(true);
    };

    const openEditModal = (skill) => {
        setEditingSkill(skill);
        setData({
            name: skill.name,
            category: skill.category,
            icon: skill.icon || '',
            level: skill.level,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingSkill(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSkill) {
            put(`/admin/skills/${editingSkill.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/skills', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this skill from your stack?')) {
            router.delete(`/admin/skills/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Skills" />

            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-100">Skills Ecosystem</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage technical expertise levels and group by categorizations.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white text-xs font-bold transition shadow-lg shadow-[#FF2D20]/20"
                    >
                        + Add Skill
                    </button>
                </div>

                {/* Skills Table List */}
                <div className="bg-[#0d121f]/20 border border-slate-900 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-900/40 text-slate-400 font-bold border-b border-slate-900">
                                <th className="p-4">Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Icon Identifier</th>
                                <th className="p-4">Level</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 text-slate-300">
                            {skills.length > 0 ? (
                                skills.map((skill) => (
                                    <tr key={skill.id} className="hover:bg-[#0d121f]/10">
                                        <td className="p-4 font-bold text-slate-200">{skill.name}</td>
                                        <td className="p-4 capitalize">{skill.category}</td>
                                        <td className="p-4 font-mono text-slate-500">{skill.icon || '—'}</td>
                                        <td className="p-4 font-semibold text-cyan-400">{skill.level}%</td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => openEditModal(skill)}
                                                className="text-xs text-slate-500 hover:text-[#FF2D20] transition"
                                            >
                                                Edit
                                            </button>
                                            <span className="text-slate-700">|</span>
                                            <button
                                                onClick={() => handleDelete(skill.id)}
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
                                        No skills registered yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Form Dialog Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
                        <div className="w-full max-w-md bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-2xl relative">
                            <h3 className="text-lg font-black text-slate-100 mb-6">
                                {editingSkill ? 'Edit Skill Details' : 'Add New Skill'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Skill Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        placeholder="Laravel"
                                        required
                                    />
                                    {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
                                        <select
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        >
                                            <option value="Backend">Backend</option>
                                            <option value="Frontend">Frontend</option>
                                            <option value="Database">Database</option>
                                            <option value="Tools">Tools</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Level (%)</label>
                                        <input
                                            type="number"
                                            value={data.level}
                                            onChange={e => setData('level', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            min="0"
                                            max="100"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Icon Identifier (optional)</label>
                                    <input
                                        type="text"
                                        value={data.icon}
                                        onChange={e => setData('icon', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        placeholder="laravel, git, database"
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
                                        {processing ? 'Saving...' : 'Save Skill'}
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
