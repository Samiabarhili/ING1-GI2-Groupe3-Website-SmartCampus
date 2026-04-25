import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import "./css/Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour récupérer les objets et les salles en fonction du query
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q") || "";  // Récupérer la query du URL
    setQuery(searchQuery);

    // Récupérer les salles en fonction de la recherche
    fetch(`http://localhost:5000/rooms?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Erreur rooms :", err));

    // Récupérer les objets en fonction de la recherche
    fetch(`http://localhost:5000/devices?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setDevices(data))
      .catch((err) => console.error("Erreur devices :", err));
  }, [location.search]);

  return (
    <main className="search-page">
      <section className="search-section">
        <h2>Résultats de recherche pour : "{query}"</h2>

        {/* Salles disponibles */}
        <section className="rooms-section">
          <h3>Salles correspondantes</h3>
          <div className="room-cards-grid">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                image={`../assets/${room.name}.png`}
                name={room.name}
                status={room.status}
                fill={(room.capacity / 1000) * 100} // Capacité utilisée
                onClick={() => navigate(`/room/${room.id}`)}  // Détail de la salle
              />
            ))}
          </div>
        </section>

        {/* Objets connectés */}
        <section className="devices-section">
          <h3>Objets correspondants</h3>
          <div className="device-cards-grid">
            {devices.map((device) => (
              <RoomCard
                key={device.id}
                image={`../assets/${device.name}.png`}
                name={device.name}
                status={device.status}
                fill={Math.random() * 100}  // Remplissage aléatoire de capacité pour les objets
                onClick={() => navigate(`/device/${device.id}`)}  // Détail de l'objet
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Search;