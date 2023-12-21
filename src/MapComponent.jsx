import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3000"; // Your server endpoint
const socket = socketIOClient(ENDPOINT);

const MapComponent = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Listen for location updates from the server
    socket.on("locationUpdate", (updatedUsers) => {
      setUsers(updatedUsers);
    });
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {Object.keys(users).map((userId) => {
        const user = users[userId];
        return (
          <Marker key={userId} position={[user.location.latitude, user.location.longitude]}>
            <Popup>
              A {user.role} is here!
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
