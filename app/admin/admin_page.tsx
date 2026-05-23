'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/Lib/supabaseClient';
import { Plus, LogOut, Settings } from 'lucide-react';
import DishForm from '@/components/admin/DishForm';
import DishList from '@/components/admin/DishList';

interface User {
  id: string;
  email: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = '/admin/login';
        return;
      }

      setUser({
        id: session.user.id,
        email: session.user.email || '',
      });
    } catch (error) {
      console.error('Auth error:', error);
      window.location.href = '/admin/login';
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleAddDish = () => {
    setSelectedDish(null);
    setShowForm(true);
    setFormKey(prev => prev + 1);
  };

  const handleEditDish = (dish: any) => {
    setSelectedDish(dish);
    setShowForm(true);
    setFormKey(prev => prev + 1);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDish(null);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    setFormKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-stone-900 to-stone-800 border-b border-stone-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-amber-400">El Maguey - Grill</h1>
              <p className="text-stone-400 text-sm mt-1">🔧 Panel de Administración</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-stone-300 text-sm font-medium">{user?.email}</p>
                <p className="text-stone-500 text-xs">Administrador</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-all font-medium text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="mb-8">
          <button
            onClick={handleAddDish}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Agregar Nuevo Platillo
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mb-12 bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-8 shadow-2xl">
            <DishForm
              key={formKey}
              dish={selectedDish}
              onClose={handleCloseForm}
              onSuccess={handleFormSuccess}
            />
          </div>
        )}

        {/* Dishes List */}
        <div className="bg-stone-950">
          <DishList onEdit={handleEditDish} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 mt-16 py-8 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-400">
            <p>Panel de Administración - El Maguey Grill © 2024</p>
            <a
              href="/"
              className="text-amber-400 hover:text-amber-500 transition-colors font-medium"
            >
              ← Ir a la página principal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}