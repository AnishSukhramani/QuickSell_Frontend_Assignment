import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State setup
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('Status');
  const [ordering, setOrdering] = useState('Priority');
  const [showMenu, setShowMenu] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to get user name from userId
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Sort tickets based on the current "Ordering" selection
  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      if (ordering === 'Priority') {
        return a.priority - b.priority;
      }
      if (ordering === 'Title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  // Group tickets based on the current "Grouping" selection
  const groupTickets = () => {
    const sortedTickets = sortTickets(tickets);

    if (grouping === 'Status') {
      return sortedTickets.reduce((groups, ticket) => {
        const group = groups[ticket.status] || [];
        group.push(ticket);
        groups[ticket.status] = group;
        return groups;
      }, {});
    }

    if (grouping === 'User') {
      return sortedTickets.reduce((groups, ticket) => {
        const userName = getUserName(ticket.userId);
        const group = groups[userName] || [];
        group.push(ticket);
        groups[userName] = group;
        return groups;
      }, {});
    }

    if (grouping === 'Priority') {
      return sortedTickets.reduce((groups, ticket) => {
        const priorityGroup = `Priority ${ticket.priority}`;
        const group = groups[priorityGroup] || [];
        group.push(ticket);
        groups[priorityGroup] = group;
        return groups;
      }, {});
    }

    return { Default: sortedTickets }; // Default group
  };

  const ticketGroups = groupTickets();

  return (
    <div className="app-container">
      <header className="app-header">
        <button
          className="display-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src="/icons_FEtask/display.svg" alt="Display Icon" /> Display
        </button>
        {showMenu && (
          <div className="menu">
            <div className="menu-grouping">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="menu-ordering">
              <label htmlFor="ordering">Ordering</label>
              <select
                id="ordering"
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        )}
      </header>
      
      <main className="kanban-board">
        {Object.keys(ticketGroups).map((groupKey) => (
          <div key={groupKey} className="kanban-column">
            <h2>{groupKey} </h2>
            {ticketGroups[groupKey].map((ticket) => (
              <div key={ticket.id} className="kanban-card">
                <h3>
                  {ticket.title}
                  {ticket.priority === 4 && <img src="/icons_FEtask/Img - High Priority.svg" alt="High Priority" />}
                  {ticket.priority === 3 && <img src="/icons_FEtask/Img - Medium Priority.svg" alt="Medium Priority" />}
                  {ticket.priority === 2 && <img src="/icons_FEtask/Img - Low Priority.svg" alt="Low Priority" />}
                  {ticket.priority === 1 && <img src="/icons_FEtask/SVG - Urgent Priority colour.svg" alt="Urgent Priority" />}
                </h3>
                <p>{ticket.tag.join(', ')}</p>
                <p><strong>User:</strong> {getUserName(ticket.userId)}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
                <p><strong>Priority:</strong> {ticket.priority}</p>
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
