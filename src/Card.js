import React from 'react';
import './Card.css';

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>Priority: {ticket.priority}</p>
      <p>Assigned to: {ticket.assigned_user || 'Unassigned'}</p>
    </div>
  );
};

export default Card;
