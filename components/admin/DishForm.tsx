'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/Lib/supabaseClient';
import { X, Upload } from 'lucide-react';

interface DishFormProps {
  dish?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DishForm({ dish, onClose, onSuccess }: DishFormProps) {
  const [formData, setFormData] = useState({
    name: dish?.name || '',
    description: dish?.description || '',
    price: dish?.price || 0,
    category: dish?.category || 'principales',
    image_url: dish?.image_url || '',
    tags: dish?.tags || [],
    is_available: dish?.is_available ?? true,
    display_order: dish?.display_order || 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(dish?.image_url || null);

  const categories = ['entradas', 'principales', 'antojitos', 'bebidas'];
  const allTags = ['especialidad', 'popular', 'vegano'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      image_url: value,
    }));

    // Actualizar preview
    if (value && value.length > 0) {
      setImagePreview(value);
    } else {
      setImagePreview(null);
    }
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.name.trim()) {
        throw new Error('El nombre del platillo es requerido');
      }

      if (!formData.description.trim()) {
        throw new Error('La descripción es requerida');
      }

      if (formData.price <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }

      const dataToSave = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price as any),
        category: formData.category,
        image_url: formData.image_url.trim() || null,
        tags: formData.tags,
        is_available: formData.is_available,
        display_order: parseInt(formData.display_order as any) || 0,
      };

      if (dish?.id) {
        // Actualizar platillo existente
        const { error: updateError } = await supabase
          .from('dishes')
          .update(dataToSave)
          .eq('id', dish.id);

        if (updateError) throw updateError;
        setSuccess('✅ Platillo actualizado correctamente');
      } else {
        // Crear nuevo platillo
        const { error: insertError } = await supabase
          .from('dishes')
          .insert([dataToSave]);

        if (insertError) throw insertError;
        setSuccess('✅ Platillo creado correctamente');
      }

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el platillo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-stone-50">
          {dish?.id ? '✏️ Editar Platillo' : '➕ Nuevo Platillo'}
        </h2>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-300 font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-green-300 font-medium">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-stone-300 font-medium mb-2">Nombre del Platillo *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ej: Arrachera Marinada"
            className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-stone-300 font-medium mb-2">Descripción *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe el platillo en detalle..."
            rows={4}
            className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
          />
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-stone-300 font-medium mb-2">Precio ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0.01"
              className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-stone-300 font-medium mb-2">Categoría *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'principales' ? 'Al Grill' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-stone-300 font-medium mb-2">URL de Imagen</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleImageChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          <p className="text-stone-400 text-xs mt-2">
            💡 Usa URLs de Unsplash o Pexels (gratis)
          </p>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 w-full object-cover rounded-lg border border-stone-700"
                onError={() => setImagePreview(null)}
              />
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-stone-300 font-medium mb-4">Etiquetas</label>
          <div className="flex gap-4 flex-wrap">
            {allTags.map(tag => (
              <label key={tag} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="w-4 h-4 rounded border-stone-700 text-amber-500 focus:ring-amber-500 bg-stone-800"
                />
                <span className="text-stone-300 capitalize text-sm">
                  {tag === 'especialidad' && '🔥'}
                  {tag === 'popular' && '⭐'}
                  {tag === 'vegano' && '🌿'}
                  {' ' + tag}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Order & Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-stone-300 font-medium mb-2">Orden de Visualización</label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_available"
                checked={formData.is_available}
                onChange={handleChange}
                className="w-4 h-4 rounded border-stone-700 text-amber-500 bg-stone-800"
              />
              <span className="text-stone-300 font-medium">Disponible</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t border-stone-700">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : '💾 Guardar Platillo'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-stone-800 text-stone-300 font-semibold rounded-lg hover:bg-stone-700 transition-all"
          >
            ✕ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}