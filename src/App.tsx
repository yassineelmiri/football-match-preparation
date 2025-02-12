import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { PlayerList } from './components/PlayerList';
import { FootballField } from './components/FootballField';
import { SubstitutesBench } from './components/SubstitutesBench';
import { StaffList } from './components/StaffList';
import { useTeamStore } from './store/teamStore';
import { Player, Staff } from './types';
import { AddPlayerModal } from './components/AddPlayerModal';

const mockData = {
  Players: [
    {
      nom: "walid",
      prenom: "MARCUS",
      id: 1823,
      equipe_id: 9,
      num_shirt: "0",
      role: "Player",
      licenceNumber: "106PMMW08",
      category: "U17",
      dateNaissance: "2008-08-18",
      nationality: "Maroc",
      convoque: false,
      image: "http://localhost:3000/uploads/profil-default.jpg",
      post: null,
      shirtNumber: "0"
    },
    {
      nom: "safa",
      prenom: "dawi",
      id: 1824,
      equipe_id: 9,
      num_shirt: "0",
      role: "Player",
      licenceNumber: "106PMMW09",
      category: "U17",
      dateNaissance: "2008-08-18",
      nationality: "Maroc",
      convoque: false,
      image: "http://localhost:3000/uploads/profil-default.jpg",
      post: null,
      shirtNumber: "0"
    },
    {
      nom: "yassine",
      prenom: "MARCUS",
      id: 1825,
      equipe_id: 9,
      num_shirt: "0",
      role: "Player",
      licenceNumber: "106PMMW10",
      category: "U17",
      dateNaissance: "2008-08-18",
      nationality: "Maroc",
      convoque: false,
      image: "http://localhost:3000/uploads/profil-default.jpg",
      post: null,
      shirtNumber: "0"
    }
  ],
  staffs: [
    {
      nom: "yassoine",
      prenom: "ELALAOUI",
      id: 2105,
      equipe_id: 9,
      role: "COACH",
      licenceNumber: "128PLWW08",
      dateNaissance: "2008-10-05",
      nationality: "Maroc",
      convoque: false,
      image: "http://localhost:3000/uploads/profil-default.jpg"
    },
    {
      nom: "AHMED",
      prenom: "ELALAOUI",
      id: 2106,
      equipe_id: 9,
      role: "COACH",
      licenceNumber: "128PLWW09",
      dateNaissance: "2008-10-05",
      nationality: "Maroc",
      convoque: false,
      image: "http://localhost:3000/uploads/profil-default.jpg"
    }
  ]
};

function App() {
  const {
    players,
    staffs,
    setPlayers,
    setStaffs,
    setFieldPlayer,
    setSubstitute,
    setStaffMember,
  } = useTeamStore();
  const [selectedStaffs, setSelectedStaffs] = useState<Player[]>([]);

  const [formation, setFormation] = useState("4-3-3");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSelectStaff = (staff: Player) => {
    setSelectedStaffs((prev) => [...prev, staff]);
  };
  React.useEffect(() => {
    const storedPlayers = localStorage.getItem('players');
    const storedStaffs = localStorage.getItem('staffs');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    } else {
      setPlayers(mockData.Players);
    }
    if (storedStaffs) {
      setStaffs(JSON.parse(storedStaffs));
    } else {
      setStaffs(mockData.staffs);
    }
  }, [setPlayers, setStaffs]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === 'playerList' && destination.droppableId === 'playerList') {
      const reorderedPlayers = Array.from(players);
      const [movedPlayer] = reorderedPlayers.splice(source.index, 1);
      reorderedPlayers.splice(destination.index, 0, movedPlayer);
      setPlayers(reorderedPlayers);
      localStorage.setItem('players', JSON.stringify(reorderedPlayers));
      return;
    }

    const player = players.find((p: Player) => p.id.toString() === draggableId);
    const staff = staffs.find((s: Staff) => s.id.toString() === draggableId);

    if (player) {
      if (destination.droppableId.startsWith('field-')) {
        const position = destination.droppableId.replace('field-', '');
        setFieldPlayer(position, player);
      } else if (destination.droppableId === 'substitutes') {
        setSubstitute(player);
      } else if (destination.droppableId === 'staff') {
        setStaffMember(player);
      }
    } else if (staff) {
      if (destination.droppableId === 'staff') {
        setStaffMember(staff);
      }
    }
  };

  const handleAddPlayer = (newPlayer: Player) => {
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const handleFormationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormation(e.target.value);
  };

  const filteredPlayers = players.filter((player) =>
    player.nom.toLowerCase().includes(searchTerm)
  );
  const handleClearField = () => {
    setFieldPlayer("position", {} as Player);
  };
  const handlePrint = () => {
    window.print();
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-[#f8fafc] p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">M</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">MRNE</span>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
          >
            Valider la composition
          </button>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Player List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Effectif</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher par nom"
                    className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  />

                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Convoquer un joueur
                </button>
              </div>
            </div>
            <PlayerList players={filteredPlayers} />
          </div>

          {/* Composition */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Composition</h2>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="schema"
                        id="with-schema"
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                        defaultChecked
                      />
                      <span className="text-gray-700">Avec schéma</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="schema"
                        id="without-schema"
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Sans schéma</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select value={formation} onChange={handleFormationChange} className="border rounded p-2">
                  <option value="4-3-3">4-3-3</option>
                  <option value="3-5-2">3-5-2</option>
                </select>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Enregistrer
                </button>
                <button
                  onClick={handleClearField}
                  className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Vider le terrain
                </button>

              </div>
            </div>

            <FootballField formation={formation} />
            <SubstitutesBench />
            <StaffList staffs={selectedStaffs} onSelectStaff={handleSelectStaff} />
          </div>
        </div>

        {/* Add Player Modal */}
        <AddPlayerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddPlayer={handleAddPlayer}
        />
      </div>
    </DragDropContext>
  );
}

export default App;