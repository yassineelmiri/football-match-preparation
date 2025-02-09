export interface Player {
  nom: string;
  prenom: string;
  id: number;
  equipe_id: number;
  num_shirt: string;
  role: string;
  licenceNumber: string;
  category: string;
  dateNaissance: string;
  nationality: string;
  image: string;
  post: string | null;
  shirtNumber: string;
}

export interface Staff {
  nom: string;
  prenom: string;
  id: number;
  equipe_id: number;
  role: string;
  licenceNumber: string;
  dateNaissance: string;
  nationality: string;
  image: string;
}

export interface TeamData {
  Players: [
    {
      nom: "yassine",
      prenom: "bono",
      id: 1823,
      equipe_id: 9,
      num_shirt: "0",
      role: "Player",
      licenceNumber: "106PMMW08",
      category: "U17",
      dateNaissance: "2008-08-18",
      nationality: "Maroc",
      image: "http://localhost:3000/uploads/profil-default.jpg",
      post: null,
      shirtNumber: "0"
    },
    {
      nom: "Sofyan ",
      prenom: "Amrabat",
      id: 1823,
      equipe_id: 9,
      num_shirt: "0",
      role: "Player",
      licenceNumber: "106PMMW08",
      category: "U17",
      dateNaissance: "2008-08-18",
      nationality: "Maroc",
      image: "http://localhost:3000/uploads/profil-default.jpg",
      post: null,
      shirtNumber: "0"
    }
  ],
  staffs: [
    {
      nom: "Oussama ",
      prenom: "Targhalline",
      id: 2105,
      equipe_id: 9,
      role: "COACH",
      licenceNumber: "128PLWW08",
      dateNaissance: "2008-10-05",
      nationality: "Maroc",
      image: "http://localhost:3000/uploads/profil-default.jpg"
    }
    , {
      nom: "AHMED",
      prenom: "ELALAOUI",
      id: 2105,
      equipe_id: 9,
      role: "COACH",
      licenceNumber: "128PLWW08",
      dateNaissance: "2008-10-05",
      nationality: "Maroc",
      image: "http://localhost:3000/uploads/profil-default.jpg"
    }
  ]
}

export interface FieldPosition {
  id: string;
  position: string;
  x: number;
  y: number;
}