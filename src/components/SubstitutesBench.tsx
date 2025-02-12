import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useTeamStore } from '../store/teamStore';
import { Player } from '../types';

export const SubstitutesBench: React.FC = () => {
  const { substitutes, setSubstitute } = useTeamStore();
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const filteredPlayers = storedPlayers.filter((player: Player) => player.role === "Player");
    setAllPlayers(filteredPlayers);
  }, []);

  const availablePlayers = allPlayers.filter(
    (player) => !substitutes.some((sub) => sub.id === player.id)
  );
  
  const togglePlayerList = () => {
    setShowPlayerList(!showPlayerList);
  };

  const handleSelectPlayer = (player: Player) => {
    setSubstitute(player);
    setShowPlayerList(false);
  };

  return (
    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Remplaçants</h2>
      <Droppable droppableId="substitutes" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-6 p-4 bg-gray-50 rounded-xl min-h-[120px] items-center"
          >
            {substitutes.map((player, index) => (
              <Draggable
                key={player.id}
                draggableId={`sub-${player.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-col items-center group"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
                      <img
                        src={player.image || "./playerclub.png"}
                        alt={player.nom}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700">
                      {player.prenom} {player.nom}
                    </span>
                    <span className="text-xs text-gray-500">{player.num_shirt}</span>
                  </div>
                )}
              </Draggable>
            ))}
            <div
              className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-200"
              onClick={togglePlayerList}
            >
              <span className="text-2xl text-gray-400">+</span>
            </div>
            {showPlayerList && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Sélectionner un joueur</h2>
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
                    onClick={togglePlayerList}
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}

            {substitutes.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Glissez les joueurs ici pour les ajouter aux remplaçants
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};