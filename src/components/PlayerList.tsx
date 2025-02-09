import React, { useState } from 'react';
import { Player } from '../types';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTeamStore } from '../store/teamStore';

interface PlayerListProps {
  players: Player[];
}

export const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const { setPlayers } = useTeamStore();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleDeletePlayer = (playerId: number) => {
    const updatedPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const handleUpdatePlayer = (player: Player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };

  const handleSave = (updatedPlayer: Player) => {
    const updatedPlayers = players.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p));
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    closeModal();
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const reorderedPlayers = Array.from(players);
    const [movedPlayer] = reorderedPlayers.splice(source.index, 1);
    reorderedPlayers.splice(destination.index, 0, movedPlayer);

    setPlayers(reorderedPlayers);
    localStorage.setItem('players', JSON.stringify(reorderedPlayers));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-6 bg-blue-600 text-white p-3 rounded-t-lg">
          <div>NOM COMPLET</div>
          <div>FONCTION</div>
          <div>MAILLOT</div>
          <div>LICENCE</div>
          <div>CONVOQUÉ</div>
          <div>ACTIONS</div>
        </div>

        <Droppable droppableId="playerList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white">
              {players.map((player, index) => (
                <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="grid grid-cols-6 p-3 border-b hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <img src="./playerimage.png" alt={`${player.prenom} ${player.nom}`} className="w-8 h-8 rounded-full" />
                        <span>{`${player.prenom} ${player.nom}`}</span>
                      </div>
                      <div>{player.role}</div>
                      <div>{player.num_shirt}</div>
                      <div>{player.licenceNumber}</div>
                      <div className="text-red-500">Non convoqué</div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleUpdatePlayer(player)} className="text-blue-500 hover:text-blue-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDeletePlayer(player.id)} className="text-red-500 hover:text-red-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Update Modal */}
        {selectedPlayer && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Modifier le joueur</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(selectedPlayer);
                }}
              >
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    value={selectedPlayer.nom}
                    onChange={(e) => setSelectedPlayer({ ...selectedPlayer, nom: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    type="text"
                    value={selectedPlayer.prenom}
                    onChange={(e) => setSelectedPlayer({ ...selectedPlayer, prenom: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Numéro de maillot</label>
                  <input
                    type="number"
                    value={selectedPlayer.num_shirt}
                    onChange={(e) => setSelectedPlayer({ ...selectedPlayer, num_shirt: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
                    Annuler
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};