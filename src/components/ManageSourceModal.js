"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ManageSourceModal({ isOpen, onClose, sourceData = null, onSave }) {
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    link: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        link: ''
      });
      setError('');
      console.log('Modal opened with sourceData:', sourceData);
    }
  }, [isOpen, sourceData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin()) {
      setError('Only administrators can manage sources');
      return;
    }

    if (!formData.title.trim() || !formData.link.trim()) {
      setError('Both title and link are required');
      return;
    }

    console.log('Full sourceData:', sourceData);
    
    // Extract the source URL - it might be nested in sourceData.source.url
    const sourceUrl = sourceData?.url || sourceData?.source?.url || sourceData?.link || sourceData?.source?.link;
    
    if (!sourceUrl) {
      console.error('No source URL found in sourceData:', sourceData);
      setError('No source URL found. Please try again.');
      return;
    }

    console.log('Using source URL:', sourceUrl);

    console.log('Submitting article with data:', {
      sourceUrl: sourceUrl,
      title: formData.title.trim(),
      link: formData.link.trim(),
      sourceTitle: sourceData?.title || sourceData?.source?.title
    });

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/manage-articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceUrl: sourceUrl,  // Pass the extracted source URL
          title: formData.title.trim(),
          link: formData.link.trim()
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to add article');
      }

      const result = await response.json();
      console.log('Success result:', result);
      onSave(result);
      onClose();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err.message || 'Failed to add article');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Add Custom Article
          </h2>
          
          {sourceData && (
            <div className="mb-4 p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">Adding to:</p>
              <p className="font-semibold">{sourceData?.title || sourceData?.source?.title || 'Unknown Source'}</p>
              <p className="text-xs text-gray-500">URL: {sourceData?.url || sourceData?.source?.url || sourceData?.link || sourceData?.source?.link || 'No URL found'}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Article Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Jets' Fields returns, but sidelined day after scare"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Article Link *
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/article"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Article'}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 