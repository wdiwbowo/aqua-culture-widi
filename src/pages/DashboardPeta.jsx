import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarAdmin from '../components/NavbarAdmin';
import { FaHome } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function DashboardPeta() {
  const [locations, setLocations] = useState([
    { position: [-7.797068, 110.370529], name: 'Tambak 1', link: '/Dashboard' },
    { position: [-7.940916087153265, 110.27526855468751], name: 'Tambak 2', link: '/Tambak2' },
    { position: [-7.715754684123847, 110.27664184570314], name: 'Tambak 3', link: '/Tambak3' },
    { position: [-7.828860776868768, 110.09021759033205], name: 'Tambak 4', link: '/Tambak4' },
  ]);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lat: '',
    lng: '',
  });

  const handleSidebarToggle = (open) => {
    setSidebarOpen(open);
  };

  const handleAddLocation = () => {
    const { name, lat, lng } = formData;
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (name && !isNaN(latitude) && !isNaN(longitude)) {
      setLocations([...locations, { name, position: [latitude, longitude], link: '/details' }]);
      setFormData({ name: '', lat: '', lng: '' });
      setFormVisible(false);
    } else {
      alert('Please enter valid name and coordinates.');
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setFormData({ ...formData, lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return formData.lat && formData.lng ? (
      <Marker position={[formData.lat, formData.lng]} />
    ) : null;
  }

  return (
    <div className={`flex bg-gray-800 ${isSidebarOpen ? 'ml-60' : 'ml-16'} transition-all duration-300`}>
      <NavbarAdmin onSidebarToggle={handleSidebarToggle} className="fixed top-0 left-0 w-full z-10" /> {/* Make navbar fixed */}
      <div className="flex-1 mt-32 p-8 overflow-y-auto relative"> {/* Adjusted margin-top to match navbar height */}
        <div className="flex flex-col w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg mb-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <div className="flex-1 text-left">
              <h5 className="text-sm font-bold tracking-tight text-gray-100">MAP</h5>
            </div>
            <div className="flex-1 flex justify-center">
              <button onClick={() => setFormVisible(true)} className="text-lg sm:text-xl text-blue-300">
                Add Location
              </button>
            </div>
            <Link to="/" className="text-lg sm:text-xl text-blue-300">
              <FaHome />
            </Link>
          </div>
        </div>
        <div className={`relative bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 h-[calc(100vh-10rem)] ${isFormVisible ? 'opacity-50' : ''}`}>
          <div className="h-full w-full">
            <MapContainer center={locations[0].position} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {locations.map((location, index) => (
                <Marker key={index} position={location.position}>
                  <Popup closeOnClick={false} closeButton={false} autoPan={false}>
                    <div className="p-2">
                      <p className="text-lg font-semibold mb-1">{location.name}</p>
                      <Link to={location.link} className="text-blue-300 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <Polyline positions={locations.map(location => location.position)} color="blue" />
              {isFormVisible && <LocationMarker />}
            </MapContainer>
          </div>
        </div>
        {isFormVisible && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md pointer-events-auto relative z-50">
              <h5 className="mb-4 text-2xl font-bold text-gray-100 text-center">Add New Location</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddLocation();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-gray-300 font-medium mb-1"></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter location name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1"></label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter latitude"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1"></label>
                  <input
                    type="number"
                    step="any"
                    name="lng"
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter longitude"
                    required
                  />
                </div>
                <div className="h-64 w-full rounded-lg overflow-hidden">
                  <MapContainer center={[formData.lat || -7.797068, formData.lng || 110.370529]} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker />
                  </MapContainer>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gray-600 text-gray-100 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Add Location
                </button>
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="w-full px-4 py-2 bg-gray-500 text-gray-100 rounded-lg hover:bg-gray-600 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPeta;
