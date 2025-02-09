import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Staff } from '../types';

interface StaffListProps {
  staffs: Staff[];
}

export const StaffList: React.FC<StaffListProps> = ({ staffs }) => {
  return (
    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Staff Technique</h2>
      <Droppable droppableId="staff" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-6 p-4 bg-gray-50 rounded-xl min-h-[120px] items-center"
          >
            {staffs.map((staff, index) => (
              <Draggable
                key={staff.id}
                draggableId={`staff-${staff.id}`}
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
                        src={staff.image}
                        alt={`${staff.prenom} ${staff.nom}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700">
                      {`${staff.prenom} ${staff.nom}`}
                    </span>
                    <span className="text-xs text-gray-500">{staff.role}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {staffs.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Glissez les membres du staff ici
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};