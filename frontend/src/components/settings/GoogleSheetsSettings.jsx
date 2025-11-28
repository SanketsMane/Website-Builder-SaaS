import { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle, Loader, AlertCircle, BookOpen, Link2, Settings } from 'lucide-react';
import api from '../../api/axios';

const GoogleSheetsSettings = ({ storeId }) => {
    const [loading, setLoading] = useState(false);
    const [testing, setTesting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [connectionData, setConnectionData] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        spreadsheetUrl: '',
        worksheetName: 'Orders'
    });

    useEffect(() => {
        checkConnection();
    }, [storeId]);

    const checkConnection = async () => {
        try {
            const response = await api.get(`/stores/${storeId}`);
            if (response.data.googleSheetsConfig) {
                setConnected(true);
                setConnectionData(response.data.googleSheetsConfig);
                setFormData({
                    spreadsheetUrl: response.data.sheetUrl || '',
                    worksheetName: response.data.worksheetName || 'Orders'
                });
            }
        } catch (err) {
            console.error('Failed to check connection:', err);
        }
    };

    const testConnection = async () => {
        if (!formData.spreadsheetUrl.trim()) {
            setError('Please enter a Google Sheets URL');
            return;
        }

        setTesting(true);
        setError('');

        try {
            const response = await api.post(`/stores/${storeId}/sheets/test`, {
                spreadsheetUrl: formData.spreadsheetUrl
            });

            if (response.data.success) {
                setSuccess('✅ Connection test successful! You can now connect this sheet.');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to test connection');
        } finally {
            setTesting(false);
        }
    };

    const connectSheet = async () => {
        if (!formData.spreadsheetUrl.trim()) {
            setError('Please enter a Google Sheets URL');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post(`/stores/${storeId}/sheets/connect`, formData);
            setConnected(true);
            setConnectionData(response.data.config);
            setSuccess('🎉 Google Sheets connected successfully! New orders will be automatically synced.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to connect Google Sheets');
        } finally {
            setLoading(false);
        }
    };

    const disconnectSheet = async () => {
        if (!confirm('Are you sure you want to disconnect Google Sheets?')) {
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await api.delete(`/stores/${storeId}/sheets/disconnect`);
            setConnected(false);
            setConnectionData(null);
            setFormData({ spreadsheetUrl: '', worksheetName: 'Orders' });
            setSuccess('Google Sheets disconnected successfully.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to disconnect Google Sheets');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        📊 Google Sheets Integration
                        {connected && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Connected
                            </span>
                        )}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Automatically sync all orders to a Google Sheet for easy tracking and analysis.
                    </p>
                </div>
            </div>

            {connected && connectionData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-green-900">Google Sheets Connected</h4>
                            <p className="text-green-800 text-sm mt-1">
                                Orders are being synced to worksheet: <strong>{connectionData.worksheetName}</strong>
                            </p>
                            {connectionData.lastSyncAt && (
                                <p className="text-green-700 text-xs mt-1">
                                    Last synced: {new Date(connectionData.lastSyncAt).toLocaleString()}
                                </p>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            <a
                                href={connectionData.spreadsheetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1 border border-green-300 text-xs font-medium rounded text-green-700 bg-white hover:bg-green-50"
                            >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Open Sheet
                            </a>
                            <button
                                onClick={disconnectSheet}
                                disabled={loading}
                                className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 disabled:opacity-50"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!connected && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                        <Link2 className="h-5 w-5 mr-2 text-gray-500" />
                        Connect Google Sheets
                    </h4>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Google Sheets URL *
                            </label>
                            <input
                                type="url"
                                value={formData.spreadsheetUrl}
                                onChange={(e) => setFormData({ ...formData, spreadsheetUrl: e.target.value })}
                                placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Paste the full URL of your Google Sheet (make sure it's shared with edit permissions)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Worksheet Name
                            </label>
                            <input
                                type="text"
                                value={formData.worksheetName}
                                onChange={(e) => setFormData({ ...formData, worksheetName: e.target.value })}
                                placeholder="Orders"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Name of the worksheet tab where orders will be added
                            </p>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={testConnection}
                                disabled={testing || !formData.spreadsheetUrl.trim()}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {testing ? (
                                    <Loader className="animate-spin h-4 w-4 mr-2" />
                                ) : (
                                    <Settings className="h-4 w-4 mr-2" />
                                )}
                                Test Connection
                            </button>
                            <button
                                onClick={connectSheet}
                                disabled={loading || !formData.spreadsheetUrl.trim()}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader className="animate-spin h-4 w-4 mr-2" />
                                ) : (
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                )}
                                Connect Sheet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <p className="text-green-700 text-sm">{success}</p>
                    </div>
                </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">📋 Setup Instructions</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Create or open a Google Sheet</li>
                    <li>2. Share it with "Anyone with the link can edit"</li>
                    <li>3. Copy the sheet URL and paste it above</li>
                    <li>4. Test the connection and click Connect</li>
                </ol>
                <div className="mt-3">
                    <p className="text-xs text-blue-700 font-medium">Order data includes:</p>
                    <p className="text-xs text-blue-600">Order ID, Date, Customer details, Items, Total, Status</p>
                </div>
            </div>
        </div>
    );
};

export default GoogleSheetsSettings;