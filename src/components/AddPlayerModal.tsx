import React, { useState } from 'react';
import { Player } from '../types';

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (player: Player) => void;
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ isOpen, onClose, onAddPlayer }) => {
  const [formData, setFormData] = useState<Player>({
    nom: '',
    prenom: '',
    id: 0,
    equipe_id: 9,
    num_shirt: '',
    role: 'Player',
    licenceNumber: '',
    category: 'U17',
    dateNaissance: '',
    nationality: 'Maroc',
    image: 'http://localhost:3000/uploads/profil-default.jpg',
    post: null,
    shirtNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlayer = { ...formData, id: Date.now() }; // Génère un ID unique
    onAddPlayer(newPlayer);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un joueur</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Numéro de maillot</label>
            <input
              type="text"
              name="num_shirt"
              value={formData.num_shirt}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Numéro de licence</label>
            <input
              type="text"
              name="licenceNumber"
              value={formData.licenceNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};