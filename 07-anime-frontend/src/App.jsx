import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Trash2, Edit2, Plus, X, Search, MonitorPlay } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/v1/animes';

function App() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', genre: '', episodes: 0 });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAnimes = async () => {
    try {
      // Pastikan backend Go sedang berjalan di port 8080
      const response = await axios.get(API_URL);
      // Di Gin, response JSON kita berbentuk { message: "...", data: [...] }
      // Jadi kita ambil response.data.data
      setAnimes(response.data.data || []);
    } catch (error) {
      console.error('Error fetching animes:', error);
      // Jika terjadi error (misal backend mati), set jadi kosong agar tidak crash
      setAnimes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        genre: formData.genre,
        episodes: parseInt(formData.episodes)
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      
      setIsModalOpen(false);
      setFormData({ title: '', genre: '', episodes: 0 });
      setEditingId(null);
      fetchAnimes();
    } catch (error) {
      console.error('Error saving anime:', error);
      alert("Gagal menyimpan data! Pastikan backend Go berjalan.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus anime ini?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchAnimes();
      } catch (error) {
        console.error('Error deleting anime:', error);
      }
    }
  };

  const openEditModal = (anime) => {
    setFormData({ title: anime.title, genre: anime.genre, episodes: anime.episodes });
    setEditingId(anime.id);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({ title: '', genre: '', episodes: 0 });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const filteredAnimes = animes.filter(a => 
    (a.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (a.genre || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-2xl backdrop-blur-md border border-blue-500/30">
            <MonitorPlay className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              NimeKu
            </h1>
            <p className="text-slate-400 text-sm mt-1">Kelola Koleksi Anime Anda</p>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari anime..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-400 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-blue-500/50"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Tambah</span>
          </button>
        </div>
      </header>

      {/* Content Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimes.map((anime) => (
            <div 
              key={anime.id} 
              className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20 overflow-hidden"
            >
              {/* Floating Action Buttons yang muncul saat hover */}
              <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                <button 
                  onClick={() => openEditModal(anime)}
                  className="p-2 bg-slate-700/80 hover:bg-blue-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(anime.id)}
                  className="p-2 bg-slate-700/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-slate-700">
                  <Play className="w-5 h-5 text-blue-400 ml-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white leading-tight">{anime.title}</h3>
                  <span className="text-sm font-medium text-blue-400">{anime.genre}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Episode</span>
                <span className="bg-slate-900/50 px-3 py-1 rounded-full text-slate-300 border border-slate-700/50">
                  {anime.episodes} eps
                </span>
              </div>
            </div>
          ))}
          
          {/* Tampilkan pesan jika kosong */}
          {filteredAnimes.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center h-64 text-slate-400">
              <MonitorPlay className="w-16 h-16 mb-4 opacity-50" />
              <p>Belum ada data Anime. Silakan tambah!</p>
            </div>
          )}
        </div>
      )}

      {/* Form Modal (Popup) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? 'Edit Anime' : 'Tambah Anime'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Judul Anime</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                    placeholder="Contoh: One Piece"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Genre</label>
                  <input
                    required
                    type="text"
                    value={formData.genre}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                    placeholder="Contoh: Shonen"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Jumlah Episode</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={formData.episodes}
                    onChange={(e) => setFormData({...formData, episodes: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-900/20"
                  >
                    Simpan Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
