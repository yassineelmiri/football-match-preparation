import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useTeamStore } from "../store/teamStore";
import { Player } from "../types";

Modal.setAppElement("#root");

interface FootballFieldProps {
  formation: string;
}

export const FootballField: React.FC<FootballFieldProps> = ({ formation }) => {
  const { fieldPlayers, setFieldPlayer } = useTeamStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    setPlayers(storedPlayers);
  }, []);

  const handleOpenModal = (positionId: string) => {
    setSelectedPosition(positionId);
    setModalIsOpen(true);
  };

  const handleSelectPlayer = (player: Player) => {
    if (selectedPosition) {
      setFieldPlayer(selectedPosition, player);
      setModalIsOpen(false);
    }
  };

  const formations = {
    "4-3-3": [
      { id: "gk", nom: "Gardien", x: 50, y: 90 },
      { id: "lb", nom: "Latéral Gauche", x: 20, y: 70 },
      { id: "cb1", nom: "Défenseur Central 1", x: 40, y: 70 },
      { id: "cb2", nom: "Défenseur Central 2", x: 60, y: 70 },
      { id: "rb", nom: "Latéral Droit", x: 80, y: 70 },
      { id: "lm", nom: "Milieu Gauche", x: 30, y: 50 },
      { id: "cm", nom: "Milieu Central", x: 50, y: 50 },
      { id: "rm", nom: "Milieu Droit", x: 70, y: 50 },
      { id: "lw", nom: "Ailier Gauche", x: 20, y: 30 },
      { id: "st", nom: "Attaquant", x: 50, y: 30 },
      { id: "rw", nom: "Ailier Droit", x: 80, y: 30 },
    ],
    "3-5-2": [
      { id: "gk", nom: "Gardien", x: 50, y: 90 },
      { id: "cb1", nom: "Défenseur Central 1", x: 30, y: 70 },
      { id: "cb2", nom: "Défenseur Central 2", x: 50, y: 70 },
      { id: "cb3", nom: "Défenseur Central 3", x: 70, y: 70 },
      { id: "lm", nom: "Milieu Gauche", x: 20, y: 50 },
      { id: "cm1", nom: "Milieu Central 1", x: 40, y: 50 },
      { id: "cm2", nom: "Milieu Central 2", x: 60, y: 50 },
      { id: "rm", nom: "Milieu Droit", x: 80, y: 50 },
      { id: "st1", nom: "Attaquant 1", x: 40, y: 30 },
      { id: "st2", nom: "Attaquant 2", x: 60, y: 30 },
    ],
  };

  const currentFormation = formations[formation as keyof typeof formations];

  return (
    <div className="relative w-full h-[600px] bg-field rounded-lg shadow-lg p-4 overflow-hidden">
      <h2 className="text-white text-2xl font-bold text-center mb-6">Terrain de Football</h2>

      {currentFormation.map((pos) => (
        <div
          key={pos.id}
          onClick={() => handleOpenModal(pos.id)}
          className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
        >
          {fieldPlayers[pos.id] ? (
            <div className="p-2 bg-blue-500 text-white rounded-full text-center text-xs font-medium">
              {fieldPlayers[pos.id]!.prenom}
            </div>
          ) : (
            <span className="text-xs text-gray-600 font-medium">{pos.nom}</span>
          )}
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Sélectionner un joueur"
        className="bg-white p-6 rounded-lg shadow-2xl max-w-md mx-auto mt-20 transform transition-all duration-300 ease-in-out"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Choisir un joueur</h2>
        <ul className="space-y-2">
          {players.map((player) => (
            <li
              key={player.id}
              onClick={() => handleSelectPlayer(player)}
              className="p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition-all duration-200 rounded-lg"
            >
              <span className="text-gray-700 font-medium">
                {player.prenom} {player.nom}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
        >
          Annuler
        </button>
      </Modal>
    </div>
  );
};