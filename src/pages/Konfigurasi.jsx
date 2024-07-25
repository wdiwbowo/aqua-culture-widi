import React, { useState } from 'react';
import NavbarAdmin from "../components/NavbarAdmin";

// Sample data
const initialCardData = [
  { id: 1, title: "SALINITAS", description: "110 PPT" },
  { id: 2, title: "SENSOR PH", description: "7.5" },
  { id: 3, title: "OKSIGEN", description: "1000 PPM" },
  { id: 4, title: "KEKERUHAN", description: "20%" },
  { id: 5, title: "SUHU UDARA", description: "20 C" },
  { id: 6, title: "SUHU AIR", description: "25 C" },
  { id: 7, title: "STOK PAKAN", description: "20 KG" },
  { id: 8, title: "STOK ONBAT", description: "10 L" },
];

export default function Instrumentasi() {
  const [cardData, setCardData] = useState(initialCardData);
  const [newData, setNewData] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [configType, setConfigType] = useState("STOK ONBAT"); // Default config type

  // Filter data based on config type
  const filteredData = cardData.filter(item => item.title === configType);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddData = (e) => {
    e.preventDefault();
    if (newData.title && newData.description) {
      setCardData(prevData => [...prevData, { ...newData, id: prevData.length + 1 }]);
      setNewData({ title: "", description: "" }); // Clear the form
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleConfigChange = (e) => {
    setConfigType(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdmin />
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100">
        <div className="relative w-full max-w-3xl flex flex-col items-center">
          {/* Button to open modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Tambah Data
          </button>

          {/* Config Selector */}
          <div className="mb-4">
            <label className="block text-gray-700">Pilih Konfigurasi</label>
            <select
              value={configType}
              onChange={handleConfigChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="STOK ONBAT">STOK ONBAT</option>
              <option value="KEKERUHAN">KEKERUHAN</option>
              {/* Add other options here if needed */}
            </select>
          </div>

          {/* Render filtered cards based on config type */}
          {filteredData.length > 0 ? (
            <div className="w-full max-w-md">
              {filteredData.map(item => (
                <div key={item.id} className="bg-white p-6 border border-gray-300 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">{item.title}</h2>
                  <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-600 text-center">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-md w-full max-w-md mb-6 text-center">
              <p className="text-gray-600">No data available for {configType}.</p>
            </div>
          )}

          {/* Additional Section for Data Kesehatan */}
          <div className="w-full max-w-md mt-6">
            <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Data Kesehatan</h2>
              {/* Placeholder content for Data Kesehatan */}
              <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                <p className="text-gray-600 text-center">Placeholder for Data Kesehatan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-md w-full max-w-md relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Tambah Data</h2>
              <form onSubmit={handleAddData}>
                <div className="mb-4">
                  <label className="block text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={newData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Tambah
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
