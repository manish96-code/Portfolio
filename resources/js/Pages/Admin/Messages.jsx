import React, { useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Messages({ messages }) {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const markAsRead = (id) => {
        router.post(`/admin/messages/${id}/read`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedMessage && selectedMessage.id === id) {
                    setSelectedMessage({ ...selectedMessage, is_read: true });
                }
            }
        });
    };

    const deleteMessage = (id) => {
        if (confirm('Are you sure you want to delete this message permanently?')) {
            router.delete(`/admin/messages/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedMessage && selectedMessage.id === id) {
                        setSelectedMessage(null);
                    }
                }
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Contact Messages" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-100">Contact Form Messages</h1>
                    <p className="text-slate-500 text-xs mt-1">Review contact inquiries submitted from the public portfolio forms.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Inbox List */}
                    <div className="lg:col-span-5 space-y-3.5 max-h-[70vh] overflow-y-auto pr-2">
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <button
                                    key={msg.id}
                                    onClick={() => {
                                        setSelectedMessage(msg);
                                        if (!msg.is_read) markAsRead(msg.id);
                                    }}
                                    className={`w-full text-left p-4 rounded-xl border flex flex-col gap-1.5 transition ${
                                        selectedMessage?.id === msg.id 
                                            ? 'bg-slate-900 border-[#FF2D20]/50' 
                                            : msg.is_read 
                                                ? 'bg-[#0d121f]/20 border-slate-900 hover:bg-[#0d121f]/40' 
                                                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
                                    }`}
                                >
                                    <div className="flex justify-between items-center text-[10px] text-slate-500 w-full">
                                        <span className="font-bold text-slate-400">{msg.name}</span>
                                        <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className={`text-xs truncate font-bold ${msg.is_read ? 'text-slate-300' : 'text-white'}`}>
                                        {msg.subject || '(No Subject)'}
                                    </h4>
                                    <p className="text-[10px] text-slate-500 truncate">{msg.message}</p>
                                    {!msg.is_read && (
                                        <span className="w-2 h-2 rounded-full bg-[#FF2D20] self-end mt-1"></span>
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="text-center py-20 text-slate-500 border border-slate-900 rounded-xl bg-[#0d121f]/10">
                                <span className="text-3xl">📨</span>
                                <p className="text-xs mt-3 font-light">Your inbox is empty.</p>
                            </div>
                        )}
                    </div>

                    {/* Message Details */}
                    <div className="lg:col-span-7 bg-[#0d121f]/25 border border-slate-900 p-8 rounded-2xl relative min-h-[300px] flex flex-col justify-between">
                        {selectedMessage ? (
                            <>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-900">
                                        <div>
                                            <h3 className="text-lg font-black text-slate-200">{selectedMessage.subject || '(No Subject)'}</h3>
                                            <p className="text-xs text-[#FF2D20] font-semibold mt-1">From: {selectedMessage.name} ({selectedMessage.email})</p>
                                        </div>
                                        <span className="text-[10px] text-slate-500 font-mono">
                                            {new Date(selectedMessage.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="text-slate-300 text-xs leading-relaxed whitespace-pre-line font-light">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-6 border-t border-slate-900">
                                    <button
                                        onClick={() => deleteMessage(selectedMessage.id)}
                                        className="px-4 py-2 rounded-xl border border-rose-900/30 bg-rose-950/10 hover:bg-rose-950/20 text-rose-400 text-xs font-bold transition"
                                    >
                                        Delete Message
                                    </button>
                                    <a 
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || '')}`}
                                        className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition"
                                    >
                                        Reply via Email
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-600">
                                <span className="text-4xl">📬</span>
                                <p className="text-xs mt-2 font-mono">Select a message to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
