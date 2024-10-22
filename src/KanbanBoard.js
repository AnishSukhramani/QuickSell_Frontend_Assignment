import React from 'react';
import Card from './Card';
import './KanbanBoard.css';

const KanbanBoard = ({ groupedTickets }) => {
  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group, index) => (
        <div key={index} className="kanban-column">
          <h2>{group}</h2>
          {groupedTickets[group].map((ticket) => (
            <Card key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
