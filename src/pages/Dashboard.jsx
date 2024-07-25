import React, { useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  FaThermometerHalf,
  FaTint,
  FaWind,
  FaCloudRain,
  FaThermometerThreeQuarters,
  FaThermometerFull,
  FaUtensils,
  FaMedkit
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

  const tambakLocation = [-7.797068, 110.370529];

  const cardData = [
    { title: "SALINITAS", description: "110 PPT", value: 110, icon: <FaTint /> },
    { title: "SENSOR PH", description: "7.5", value: 7.5, icon: <FaThermometerHalf /> },
    { title: "OKSIGEN", description: "1000 PPM", value: 1000, icon: <FaWind /> },
    { title: "KEKERUHAN", description: "20%", value: 20, icon: <FaCloudRain /> },
    { title: "SUHU UDARA", description: "20°C", value: 20, icon: <FaThermometerThreeQuarters /> },
    { title: "SUHU AIR", description: "25°C", value: 25, icon: <FaThermometerFull /> },
    { title: "STOK PAKAN", description: "20 KG", value: 20, icon: <FaUtensils /> },
    { title: "STOK OBAT", description: "10 L", value: 10, icon: <FaMedkit /> },
  ];

  // Data for the bar chart
  const chartData = {
    labels: cardData.map(card => card.title),
    datasets: [
      {
        label: 'Values',
        data: cardData.map(card => card.value),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="flex  bg-gray-800">
      <NavbarAdmin onSidebarToggle={setIsSidebarOpen} />
      <div className={`flex-1 mt-32 p-8 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-16'}`}>
        {/* Data Cards Section */}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cardData.map((data, index) => (
            <div key={index} className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-2">
                  {data.icon}
                </div>
                <h5 className="text-base font-bold tracking-tight text-white">{data.title}</h5>
              </div>
              <p className="text-sm text-gray-300">{data.description}</p>
              <p className="text-lg font-semibold text-white">{data.value}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 mb-4">
          <h5 className="mb-2 text-base font-bold tracking-tight text-white text-center">
            DIAGRAM BATANG DATA
          </h5>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Map */}
        <div className="p-5 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300">
          <h5 className="mb-3 text-base font-bold tracking-tight text-white text-center">
            PETA LOKASI TAMBAK
          </h5>
          <div className="h-64 bg-gray-700 rounded-lg overflow-hidden">
            <MapContainer center={tambakLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={tambakLocation}>
                <Popup>Tambak Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Copyright */}
        <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 mt-4">
          <div className="flex justify-center items-center">
            <h1 className="text-xs font-semibold text-white">
              HAK CIPTA
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}