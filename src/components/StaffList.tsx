import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Player } from '../types';

interface StaffListProps {
  staffs: Player[];
  onSelectStaff: (staff: Player) => void;
}

export const StaffList: React.FC<StaffListProps> = ({ staffs, onSelectStaff }) => {
  const [showStaffList, setShowStaffList] = useState(false);
  const [allStaffs, setAllStaffs] = useState<Player[]>([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const filteredStaffs = storedPlayers.filter((player: Player) => player.role === "Staff");
    setAllStaffs(filteredStaffs);
  }, []);

  const availableStaffs = allStaffs.filter(
    (staff) => !staffs.some((selectedStaff) => selectedStaff.id === staff.id)
  );

  const toggleStaffList = () => {
    setShowStaffList(!showStaffList);
  };

  const handleSelectStaff = (staff: Player) => {
    onSelectStaff(staff);
    setShowStaffList(false);
  };

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
                        src={staff.image || "./playerclub.png"}
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

            <div
              className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-200"
              onClick={toggleStaffList}
            >
              <span className="text-2xl text-gray-400">+</span>
            </div>

            {showStaffList && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Sélectionner un membre du staff</h2>
                  <ul className="space-y-2">
                    {availableStaffs.map((staff) => (
                      <li
                        key={staff.id}
                        onClick={() => handleSelectStaff(staff)}
                        className="p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition-all duration-200 rounded-lg"
                      >
                        <span className="text-gray-700 font-medium">
                          {staff.prenom} {staff.nom}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={toggleStaffList}
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}

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