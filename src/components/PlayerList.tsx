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

    if (!destination || destination.index === source.index) {
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
        {/* En-tête du tableau */}
        <div className="grid grid-cols-6 bg-blue-600 text-white p-3 rounded-t-lg">
          <div>NOM COMPLET</div>
          <div>FONCTION</div>
          <div>MAILLOT</div>
          <div>LICENCE</div>
          <div>CONVOQUÉ</div>
          <div>ACTIONS</div>
        </div>

        {/* Liste des joueurs */}
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
                      {/* Nom complet */}
                      <div className="flex items-center gap-2">
                        <img
                          src={player.image}
                          alt={`${player.prenom} ${player.nom}`}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{`${player.prenom} ${player.nom}`}</span>
                      </div>

                      {/* Rôle */}
                      <div>{player.role}</div>

                      {/* Numéro de maillot */}
                      <div>{player.num_shirt}</div>

                      {/* Numéro de licence */}
                      <div>{player.licenceNumber}</div>

                      {/* Statut convoqué */}
                      <div className={player.convoque ? 'text-green-500' : 'text-red-500'}>
                        {player.convoque ? 'Oui' : 'Non'}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleUpdatePlayer(player)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeletePlayer(player.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
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

        {/* Modal de modification */}
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
                {/* Nom */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    value={selectedPlayer.nom}
                    onChange={(e) =>
                      setSelectedPlayer({ ...selectedPlayer, nom: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Prénom */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    type="text"
                    value={selectedPlayer.prenom}
                    onChange={(e) =>
                      setSelectedPlayer({ ...selectedPlayer, prenom: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Numéro de maillot */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Numéro de maillot</label>
                  <input
                    type="text"
                    value={selectedPlayer.num_shirt}
                    onChange={(e) =>
                      setSelectedPlayer({ ...selectedPlayer, num_shirt: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Statut convoqué */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Convoqué</label>
                  <select
                    value={selectedPlayer.convoque ? 'oui' : 'non'}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        convoque: e.target.value === 'oui',
                      })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                  </select>
                </div>
                {/* Boutons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
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