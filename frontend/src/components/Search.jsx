import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { searchCity } from '../api/travelApi';

const Search = () => {
  const [city, setCity] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await searchCity(city, token);
      setItinerary(data);
    } catch (error) {
      setError(error.message);
      if (error.message === 'Token expired') {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container search-container">
      <div className="search-header">
        <h2>
          <i className="bi bi-airplane me-2"></i>
          Travel Agent AI
        </h2>
        <button onClick={logout} className="btn btn-danger">
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Searching...
              </>
            ) : (
              <>
                <i className="bi bi-search me-2"></i>
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {itinerary && (
        <div className="timeline-container">
          <div className="timeline-header text-center mb-4">
            <h3 className="mb-3">{itinerary.city} - One Day Itinerary</h3>
            <div className="d-flex justify-content-center gap-4">
              <div className="timeline-summary">
                <i className="bi bi-arrow-right-circle me-2"></i>
                <span>{itinerary.totalDistance}</span>
              </div>
              <div className="timeline-summary">
                <i className="bi bi-clock me-2"></i>
                <span>{itinerary.totalTime}</span>
              </div>
            </div>
          </div>
          
          <div className="timeline">
            {itinerary.locations.map((location, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  {index !== itinerary.locations.length - 1 && (
                    <div className="timeline-line"></div>
                  )}
                </div>
                <div className="timeline-content">
                  <div className="timeline-time">
                    <i className="bi bi-clock me-2"></i>
                    {location.timeToSpend}
                  </div>
                  <h4 className="timeline-title">{location.name}</h4>
                  <div className="timeline-distance">
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    {location.distanceFromPrevious}
                  </div>
                  <p className="timeline-description">{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search; 