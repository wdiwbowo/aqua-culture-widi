import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarAdmin from '../components/NavbarAdmin';
import { FaTint, FaThermometerHalf, FaWind, FaCloudRain, FaThermometerThreeQuarters, FaThermometerFull, FaUtensils, FaMedkit } from 'react-icons/fa';

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

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (newState) => {
    setIsSidebarOpen(newState);
  };

  return (
    <div className="flex  bg-gray-800">
      <NavbarAdmin onSidebarToggle={handleSidebarToggle} />
      <div className={`flex-grow-1 p-4 ${isSidebarOpen ? 'ml-60' : 'ml-16'} transition-all duration-300`}>
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h1>Dashboard</h1>
              <p className="text-muted">Department wise monthly sales report</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4 bg-secondary text-white 24">
                <div className="card-header">
                  <h3 className="card-title">Market Share</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="card-title">Market Share</h4>
                      <div className="d-flex">
                        <div className="mr-3">
                          <FaTint size={20} className="mr-1" /> +45.36%
                        </div>
                        <div className="mr-3">
                          <FaThermometerHalf size={20} className="mr-1" /> -50.69%
                        </div>
                        <div>
                          <FaWind size={20} className="mr-1" /> +16.85%
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2>27,695.65</h2>
                    </div>
                  </div>
                  <div className="chart mt-4">
                    <canvas id="areaChart" style={{ minHeight: '250px', height: '250px', maxHeight: '250px', maxWidth: '100%' }}></canvas>
                  </div>
                </div>
              </div>
              <div className="row 24">
                {cardData.slice(0, 4).map((card, index) => (
                  <div key={index} className="col-md-6 mb-4">
                    <div className="card bg-secondary text-white">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.description}</p>
                          </div>
                          <div className="icon" style={{ fontSize: '2rem' }}>
                            {card.icon}
                          </div>
                        </div>
                        <p className="mt-3 mb-0">
                          <span className="badge badge-info">{card.value}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card mb-4 bg-secondary text-white 24">
                <div className="card-body">
                  <h4>Total Revenue</h4>
                  <ul className="list-unstyled">
                    <li className="d-flex justify-content-between py-2">
                      <span>Bitcoin</span>
                      <span className="text-success">+ $145.85</span>
                    </li>
                    <li className="d-flex justify-content-between py-2">
                      <span>Ethereum</span>
                      <span className="text-danger">- $6.368</span>
                    </li>
                    <li className="d-flex justify-content-between py-2">
                      <span>Ripple</span>
                      <span className="text-success">+ $458.63</span>
                    </li>
                    <li className="d-flex justify-content-between py-2">
                      <span>Neo</span>
                      <span className="text-danger">- $5.631</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row 24">
                {cardData.slice(4).map((card, index) => (
                  <div key={index} className="col-12 mb-4">
                    <div className="card bg-secondary text-white">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.description}</p>
                          </div>
                          <div className="icon" style={{ fontSize: '2rem' }}>
                            {card.icon}
                          </div>
                        </div>
                        <p className="mt-3 mb-0">
                          <span className="badge badge-info">{card.value}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;