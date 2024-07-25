import React, { useState } from 'react';
import NavbarAdmin from "../components/NavbarAdmin";

// Sample data
const initialCardData = [
  { title: "SALINITAS", description: "110 PPT" },
  { title: "SENSOR PH", description: "7.5" },
  { title: "OKSIGEN", description: "1000 PPM" },
  { title: "KEKERUHAN", description: "20%" },
  { title: "SUHU UDARA", description: "20 C" },
  { title: "SUHU AIR", description: "25 C" },
  { title: "STOK PAKAN", description: "20 KG" },
  { title: "STOK OBAT", description: "10 L" },
];

export default function Salintas() {
  const [cardData, setCardData] = useState(initialCardData);
  const [newData, setNewData] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find the specific item for "SALINITAS"
  const salinitasData = cardData.find(item => item.title === "SALINITAS");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddData = (e) => {
    e.preventDefault();
    if (newData.title && newData.description) {
      setCardData(prevData => [...prevData, newData]);
      setNewData({ title: "", description: "" }); // Clear the form
      setIsModalOpen(false); // Close the modal
    }
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

          {salinitasData ? (
            <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-md w-full max-w-md mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Salinitas Data</h2>
              <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">{salinitasData.title}</h3>
                <p className="text-gray-600">{salinitasData.description}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-md w-full max-w-md mb-6 text-center">
              <p className="text-gray-600">No data available for Salinitas.</p>
            </div>
          )}
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
