import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user_id');
  
  const socket = useMemo(() => socketio('http://localhost:3000', {
    query: { user_id },
  }), [user_id]);
  
  useEffect(() => {
    socket.on('booking_request', data => {
      console.log(data);
      setRequests([...requests, data]);
    })
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user_id');
      const response = await api.get(`/spots/user/${user_id}`);

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request.id !== id));
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request.id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {console.log(requests)}
        {requests.map(request => (
          <li key={request.id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(request.id)}>ACEITAR</button>
            <button className="reject" onClick={() => handleReject(request.id)}>REJEITAR</button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot.id}>
            <header style={{ backgroundImage: `url(http://localhost:3000/files/${spot.thumbnail})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  )
}