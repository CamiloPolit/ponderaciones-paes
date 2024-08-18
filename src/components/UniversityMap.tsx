"use client";
import React from "react";
import dynamic from "next/dynamic";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function UniversityMap({ latitud, longitud }) {
  return (
    <MapContainer
      center={[Number(latitud), Number(longitud)]}
      zoom={15}
      style={{
        height: "300px",
        width: "300px",
        margin: "auto",
        borderRadius: "20px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[Number(latitud), Number(longitud)]} />
    </MapContainer>
  );
}
