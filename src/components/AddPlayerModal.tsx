import React, { useState } from "react";

interface Player {
  nom: string;
  prenom: string;
  id: number;
  equipe_id: number;
  num_shirt: string;
  role: "Player" | "Staff";
  licenceNumber: string;
  category: string;
  dateNaissance: string;
  nationality: string;
  convoque: boolean;
  image: string;
  post: string | null;
  shirtNumber: string;
}

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (player: Player) => void;
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ isOpen, onClose, onAddPlayer }) => {
  const [formData, setFormData] = useState<Player>({
    nom: "",
    prenom: "",
    id: 0,
    equipe_id: 9,
    num_shirt: "",
    role: "Player",
    licenceNumber: "",
    category: "U17",
    dateNaissance: "",
    nationality: "Maroc",
    convoque: false,
    image: "http://localhost:3000/uploads/profil-default.jpg",
    post: null,
    shirtNumber: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Liste des postes disponibles
  const postOptions = [
    { id: "gk", nom: "Gardien" },
    { id: "cb1", nom: "Défenseur Central 1" },
    { id: "cb2", nom: "Défenseur Central 2" },
    { id: "cb3", nom: "Défenseur Central 3" },
    { id: "lm", nom: "Milieu Gauche" },
    { id: "cm1", nom: "Milieu Central 1" },
    { id: "cm2", nom: "Milieu Central 2" },
    { id: "rm", nom: "Milieu Droit" },
    { id: "st1", nom: "Attaquant 1" },
    { id: "st2", nom: "Attaquant 2" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.num_shirt || !formData.licenceNumber) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const newPlayer = { ...formData, id: Date.now() };
    onAddPlayer(newPlayer);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter un joueur/staff</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ligne 1 : Nom et Prénom */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le nom"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le prénom"
                  required
                />
              </div>
            </div>

            {/* Ligne 2 : Numéro de maillot et Licence */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de maillot *</label>
                <input
                  type="text"
                  name="num_shirt"
                  value={formData.num_shirt}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le numéro de maillot"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de licence *</label>
                <input
                  type="text"
                  name="licenceNumber"
                  value={formData.licenceNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le numéro de licence"
                  required
                />
              </div>
            </div>

            {/* Ligne 3 : Rôle et Catégorie */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Player">Joueur</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez la catégorie"
                  required
                />
              </div>
            </div>

            {/* Ligne 4 : Date de naissance et Nationalité */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label>
                <input
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité *</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez la nationalité"
                  required
                />
              </div>
            </div>

            {/* Ligne 5 : Poste */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poste *</label>
              <select
                name="post"
                value={formData.post || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Sélectionnez un poste</option>
                {postOptions.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Image (nouvelle ligne avec style pour l'input d'image) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Prévisualisation" className="w-24 h-24 object-cover rounded-full mx-auto" />
                </div>
              )}
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};