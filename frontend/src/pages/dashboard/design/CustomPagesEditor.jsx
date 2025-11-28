import { useState } from 'react';
import useDesignStore from '../../../store/designStore';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import api from '../../../api/axios';

const CustomPagesEditor = ({ storeId }) => {
    const { customPages, fetchDesignConfigs } = useDesignStore();
    const [editingPage, setEditingPage] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleEdit = (page) => {
        setEditingPage({ ...page });
        setIsNew(false);
    };

    const handleNew = () => {
        setEditingPage({ title: '', content: '' });
        setIsNew(true);
    };

    const handleCancel = () => {
        setEditingPage(null);
        setIsNew(false);
    };

    const handleSave = async () => {
        if (!editingPage.title) return;
        setSaving(true);
        try {
            if (isNew) {
                await api.post(`/stores/${storeId}/design/pages`, editingPage);
            } else {
                await api.put(`/stores/${storeId}/design/pages/${editingPage.id}`, editingPage);
            }
            await fetchDesignConfigs(storeId);
            setEditingPage(null);
        } catch (error) {
            console.error('Failed to save page');
        }
        setSaving(false);
    };

    const handleDelete = async (pageId) => {
        if (!window.confirm('Are you sure you want to delete this page?')) return;
        try {
            await api.delete(`/stores/${storeId}/design/pages/${pageId}`);
            await fetchDesignConfigs(storeId);
        } catch (error) {
            console.error('Failed to delete page');
        }
    };

    if (editingPage) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{isNew ? 'New Page' : 'Edit Page'}</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleCancel}
                            className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {saving ? 'Saving...' : 'Save Page'}
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Page Title</label>
                        <input
                            type="text"
                            value={editingPage.title}
                            onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g. About Us"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            rows={12}
                            value={editingPage.content}
                            onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                            placeholder="HTML or Markdown content..."
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Custom Pages</h3>
                <button
                    onClick={handleNew}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Page
                </button>
            </div>

            <div className="space-y-2">
                {customPages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No custom pages yet.
                    </div>
                ) : (
                    customPages.map((page) => (
                        <div key={page.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <h4 className="font-medium text-gray-900">{page.title}</h4>
                                <p className="text-sm text-gray-500">/{page.slug}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(page)}
                                    className="p-2 text-gray-400 hover:text-indigo-600"
                                >
                                    <Edit2 className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(page.id)}
                                    className="p-2 text-gray-400 hover:text-red-600"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomPagesEditor;
