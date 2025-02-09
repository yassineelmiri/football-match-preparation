import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useTeamStore } from '../store/teamStore';

export const SubstitutesBench: React.FC = () => {
  const { substitutes } = useTeamStore();

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
                        src={player.image}
                        alt={player.nom}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700">{player.nom}</span>
                    <span className="text-xs text-gray-500">{player.num_shirt}</span>
                  </div>
                )}
              </Draggable>
            ))}
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