import { useState } from 'react';
import useDesignStore from '../../../store/designStore';
import { Save, Image, Type, Layout } from 'lucide-react';

const HomepageEditor = ({ storeId }) => {
    const { homepageConfig, setHomepageConfig, updateHomepageConfig } = useDesignStore();
    const [saving, setSaving] = useState(false);

    if (!homepageConfig) return <div>Loading...</div>;

    const handleSave = async () => {
        setSaving(true);
        await updateHomepageConfig(storeId, homepageConfig);
        setSaving(false);
    };

    const updateSection = (index, updates) => {
        const newSections = [...homepageConfig.sections];
        newSections[index] = { ...newSections[index], ...updates };
        setHomepageConfig({ ...homepageConfig, sections: newSections });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Homepage Sections</h3>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="space-y-4">
                {homepageConfig.sections?.map((section, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                {section.type === 'header' && <Layout className="h-5 w-5 text-gray-500 mr-2" />}
                                {section.type === 'banner' && <Image className="h-5 w-5 text-gray-500 mr-2" />}
                                {section.type === 'products' && <Layout className="h-5 w-5 text-gray-500 mr-2" />}
                                {section.type === 'footer' && <Layout className="h-5 w-5 text-gray-500 mr-2" />}
                                <span className="font-medium text-gray-900 capitalize">{section.type}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={section.visible}
                                            onChange={(e) => updateSection(index, { visible: e.target.checked })}
                                        />
                                        <div className={`block w-10 h-6 rounded-full ${section.visible ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${section.visible ? 'transform translate-x-4' : ''}`}></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {section.visible && section.type === 'banner' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        value={section.title || ''}
                                        onChange={(e) => updateSection(index, { title: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                    <input
                                        type="text"
                                        value={section.subtitle || ''}
                                        onChange={(e) => updateSection(index, { subtitle: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {section.visible && section.type === 'products' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Section Title</label>
                                    <input
                                        type="text"
                                        value={section.title || ''}
                                        onChange={(e) => updateSection(index, { title: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomepageEditor;
