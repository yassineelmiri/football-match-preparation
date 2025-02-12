import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useTeamStore } from "../store/teamStore";
import { Player } from "../types";

Modal.setAppElement("#root");

interface FootballFieldProps {
  formation: string;
}

export const FootballField: React.FC<FootballFieldProps> = ({ formation }) => {
  const { fieldPlayers, substitutes, setFieldPlayer } = useTeamStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    setPlayers(storedPlayers);
  }, []);

  const availablePlayers = players.filter(
    (player) =>
      !Object.values(fieldPlayers).some((fieldPlayer) => fieldPlayer?.id === player.id) &&
      !substitutes.some((substitute) => substitute.id === player.id)
  );

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

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === "field") {
      const player = players.find((p) => p.id.toString() === draggableId);
      if (player) {
        setFieldPlayer(destination.droppableId, player);
      }
    }
  };

  const formations = {
    "4-3-3": [
      { id: "gk", nom: "Gardien", x: 50, y: 70 },
      { id: "lb", nom: "Latéral Gauche", x: 20, y: 50 },
      { id: "cb1", nom: "Défenseur Central 1", x: 40, y: 50 },
      { id: "cb2", nom: "Défenseur Central 2", x: 60, y: 50 },
      { id: "rb", nom: "Latéral Droit", x: 80, y: 50 },
      { id: "lm", nom: "Milieu Gauche", x: 30, y: 26 },
      { id: "cm", nom: "Milieu Central", x: 50, y: 26 },
      { id: "rm", nom: "Milieu Droit", x: 70, y: 26 },
      { id: "lw", nom: "Ailier Gauche", x: 20, y: 5 },
      { id: "st", nom: "Attaquant", x: 50, y: 5 },
      { id: "rw", nom: "Ailier Droit", x: 80, y: 5 },
    ],
    "3-5-2": [
      { id: "gk", nom: "Gardien", x: 50, y: 70 },
      { id: "cb1", nom: "Défenseur Central 1", x: 30, y: 50 },
      { id: "cb2", nom: "Défenseur Central 2", x: 50, y: 50 },
      { id: "cb3", nom: "Défenseur Central 3", x: 70, y: 50 },
      { id: "lm", nom: "Milieu Gauche", x: 20, y: 26 },
      { id: "cm1", nom: "Milieu Central 1", x: 40, y: 26 },
      { id: "cm2", nom: "Milieu Central 2", x: 60, y: 26 },
      { id: "rm", nom: "Milieu Droit", x: 80, y: 26 },
      { id: "st1", nom: "Attaquant 1", x: 40, y: 5 },
      { id: "st2", nom: "Attaquant 2", x: 60, y: 5 },
    ],
  };
  const handleRemovePlayer = (positionId: string) => {
    setFieldPlayer(positionId, null);
  };

  const currentFormation = formations[formation as keyof typeof formations];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="relative w-full h-[600px] bg-field rounded-lg shadow-lg p-4 overflow-hidden">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Terrain de Football</h2>

        <Droppable droppableId="field">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="relative w-full h-full"
            >
              {currentFormation.map((pos, index) => (
                <Draggable key={pos.id} draggableId={pos.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleOpenModal(pos.id)}
                      className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {fieldPlayers[pos.id] ? (
                        <div className="relative text-center">
                          <img
                            src={fieldPlayers[pos.id]!.image}
                            alt={`${fieldPlayers[pos.id]!.prenom}`}
                            className="w-full h-full object-cover  mb-14"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs text-center py-1 rounded-b-full">
                            <span className="block font-bold">{fieldPlayers[pos.id]!.nom}</span>
                            <span className="text-gray-300">#{fieldPlayers[pos.id]!.num_shirt}</span>
                            <span className="block text-sm">{fieldPlayers[pos.id]!.post}</span>
                          </div>
                          {/* Bouton de suppression */}
                          <button
                            className="absolute top-0 right-0  text-white text-xs p-1 rounded-full shadow-md hover:bg-red-100 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePlayer(pos.id);
                            }}
                          >
                            ❌
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-600 font-medium">{pos.nom}</span>
                      )}

                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Sélectionner un joueur"
          className="bg-white p-6 rounded-lg shadow-2xl max-w-md mx-auto mt-20 transform transition-all duration-300 ease-in-out"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">Choisir un joueur</h2>
          <ul className="space-y-2">
            {availablePlayers.map((player) => (
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
    </DragDropContext>
  );
};