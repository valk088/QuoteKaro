import React, { useState, useMemo } from 'react';
import {
  HelpCircle, MessageSquare, Eye ,CheckCircle, Clock, User, Plus, Search, Filter, Calendar, Edit, X, Archive, Users, Phone, NotebookText
} from 'lucide-react';

const HelpdeskSupport = () => {
  // Dummy data for support tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TKT001',
      userId: 'USR001',
      subject: 'Cannot login to my account',
      description: 'I am unable to log in, password reset not working.',
      status: 'open', // open, in_progress, resolved, closed
      priority: 'high', // low, medium, high
      assignedTo: 'Agent Sarah',
      submittedAt: '2024-06-20T10:30:00Z',
      lastUpdated: '2024-06-21T11:00:00Z',
      internalNotes: [
        { id: 'NOTE001', agent: 'Agent Sarah', date: '2024-06-20T11:00:00Z', note: 'Checked user account status. Appears locked. Resetting password manually.' },
        { id: 'NOTE002', agent: 'Agent Sarah', date: '2024-06-21T09:00:00Z', note: 'Followed up with user, they confirmed login successful after reset.' },
      ],
      contactHistory: [
        { type: 'email', date: '2024-06-20T10:35:00Z', detail: 'Automated "Ticket Received" email sent.' },
        { type: 'call', date: '2024-06-20T11:30:00Z', detail: 'Spoke with John Smith, confirmed issue, provided temporary password.' },
      ],
    },
    {
      id: 'TKT002',
      userId: 'USR002',
      subject: 'Question about Enterprise plan features',
      description: 'I want to know if feature X is included in the Enterprise plan.',
      status: 'open',
      priority: 'medium',
      assignedTo: 'Unassigned',
      submittedAt: '2024-06-21T09:15:00Z',
      lastUpdated: '2024-06-21T09:15:00Z',
      internalNotes: [],
      contactHistory: [],
    },
    {
      id: 'TKT003',
      userId: 'USR003',
      subject: 'Credits not reflecting after top-up',
      description: 'My recent credit top-up transaction shows completed, but credits are not updated.',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'Agent Mike',
      submittedAt: '2024-06-19T14:00:00Z',
      lastUpdated: '2024-06-20T10:00:00Z',
      internalNotes: [
        { id: 'NOTE003', agent: 'Agent Mike', date: '2024-06-19T14:30:00Z', note: 'Investigating payment gateway logs. Cross-referencing with user transaction ID.' },
      ],
      contactHistory: [
        { type: 'email', date: '2024-06-19T14:05:00Z', detail: 'Automated "Ticket Received" email sent.' },
      ],
    },
    {
      id: 'TKT004',
      userId: 'USR004',
      subject: 'Feature request: Dark mode for dashboard',
      description: 'Please add a dark mode option to the dashboard, it would be much easier on the eyes.',
      status: 'closed',
      priority: 'low',
      assignedTo: 'Agent Sarah',
      submittedAt: '2024-06-15T08:00:00Z',
      lastUpdated: '2024-06-16T12:00:00Z',
      internalNotes: [
        { id: 'NOTE004', agent: 'Agent Sarah', date: '2024-06-15T08:30:00Z', note: 'Logged as feature request. Informed user about it.' },
      ],
      contactHistory: [
        { type: 'email', date: '2024-06-15T08:10:00Z', detail: 'Acknowledged feature request.' },
      ],
    },
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: 'all',
    assignedTo: 'all',
    priority: 'all',
    startDate: '',
    endDate: '',
  });
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newNote, setNewNote] = useState('');

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Memoized filtered tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const ticketDate = new Date(ticket.submittedAt);
      const start = filters.startDate ? new Date(filters.startDate) : null;
      const end = filters.endDate ? new Date(filters.endDate) : null;

      const matchesSearch = ticket.subject.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            ticket.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            ticket.userId.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'all' || ticket.status === filters.status;
      const matchesAssignedTo = filters.assignedTo === 'all' || ticket.assignedTo === filters.assignedTo;
      const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority;
      const matchesDate = (!start || ticketDate >= start) && (!end || ticketDate <= end);

      return matchesSearch && matchesStatus && matchesAssignedTo && matchesPriority && matchesDate;
    });
  }, [tickets, filters]);

  // Derived stats
  const totalTicketsCount = tickets.length;
  const openTicketsCount = tickets.filter(t => t.status === 'open').length;
  const inProgressTicketsCount = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedTicketsCount = tickets.filter(t => t.status === 'resolved').length;
  const closedTicketsCount = tickets.filter(t => t.status === 'closed').length;

  // Unique values for filters
  const uniqueAgents = [...new Set(tickets.map(t => t.assignedTo))].filter(Boolean); // Filter out empty strings/nulls
  const uniqueUsers = [...new Set(tickets.map(t => t.userId))];

  const handleOpenTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleCloseTicketModal = () => {
    setShowTicketModal(false);
    setSelectedTicket(null);
    setNewNote('');
  };

  const handleUpdateTicket = (updatedFields) => {
    setTickets(tickets.map(t =>
      t.id === selectedTicket.id ? { ...t, ...updatedFields, lastUpdated: new Date().toISOString() } : t
    ));
    setSelectedTicket(prev => ({ ...prev, ...updatedFields, lastUpdated: new Date().toISOString() }));
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedTicket) {
      const newInternalNote = {
        id: `NOTE${Math.floor(Math.random() * 10000)}`,
        agent: 'Current Agent', // In a real app, this would be dynamic
        date: new Date().toISOString(),
        note: newNote.trim(),
      };
      const updatedNotes = [...selectedTicket.internalNotes, newInternalNote];
      handleUpdateTicket({ internalNotes: updatedNotes });
      setNewNote('');
    }
  };

  // Ticket Detail Modal Component
  const TicketDetailModal = ({ ticket, onClose, onUpdateTicket, onAddNote, newNote, setNewNote }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'open': return 'bg-red-500/20 text-red-300';
        case 'in_progress': return 'bg-yellow-500/20 text-yellow-300';
        case 'resolved': return 'bg-blue-500/20 text-blue-300';
        case 'closed': return 'bg-green-500/20 text-green-300';
        default: return 'bg-gray-500/20 text-gray-300';
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return 'text-red-400';
        case 'medium': return 'text-yellow-400';
        case 'low': return 'text-green-400';
        default: return 'text-gray-400';
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <MessageSquare className="mr-2" size={24} />
              Ticket Details - {ticket.id}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ticket Info */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-white text-2xl font-bold">{ticket.subject}</h3>
              <p className="text-gray-400 text-sm">Submitted by: <span className="text-white">{`User ${ticket.userId.slice(-3)}`}</span></p>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
                <span className={`inline-flex items-center text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  Priority: {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </span>
                <span className="text-gray-400 text-xs flex items-center">
                  <Clock size={14} className="mr-1" />
                  Submitted: {new Date(ticket.submittedAt).toLocaleDateString()}
                </span>
                <span className="text-gray-400 text-xs flex items-center">
                  <Edit size={14} className="mr-1" />
                  Last Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}
                </span>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 mt-4">
                <h4 className="text-white font-medium mb-2">Description</h4>
                <p className="text-gray-300 text-sm">{ticket.description}</p>
              </div>

              {/* Internal Notes */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <NotebookText size={18} className="mr-2" />
                  Internal Notes
                </h4>
                <div className="space-y-3">
                  {ticket.internalNotes.length > 0 ? (
                    ticket.internalNotes.map(note => (
                      <div key={note.id} className="bg-gray-600 rounded-md p-3">
                        <p className="text-gray-200 text-sm">{note.note}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          By {note.agent} on {new Date(note.date).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No internal notes yet.</p>
                  )}
                </div>
                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new internal note..."
                    className="flex-1 bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <button onClick={onAddNote} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Add Note
                  </button>
                </div>
              </div>

              {/* Contact History */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Phone size={18} className="mr-2" />
                  Contact History
                </h4>
                <div className="space-y-3">
                  {ticket.contactHistory.length > 0 ? (
                    ticket.contactHistory.map((contact, index) => (
                      <div key={index} className="bg-gray-600 rounded-md p-3">
                        <p className="text-gray-200 text-sm">
                          <span className="font-semibold">{contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}:</span> {contact.detail}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(contact.date).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No contact history yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions & Assignment */}
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                <h4 className="text-white font-medium">Assignment & Status</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Assign To</label>
                  <select
                    value={ticket.assignedTo}
                    onChange={(e) => onUpdateTicket({ assignedTo: e.target.value })}
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Unassigned">Unassigned</option>
                    {uniqueAgents.map(agent => <option key={agent} value={agent}>{agent}</option>)}
                    {/* Add more agents dynamically in real app */}
                    <option value="Agent Sarah">Agent Sarah</option>
                    <option value="Agent Mike">Agent Mike</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    value={ticket.status}
                    onChange={(e) => onUpdateTicket({ status: e.target.value })}
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <select
                    value={ticket.priority}
                    onChange={(e) => onUpdateTicket({ priority: e.target.value })}
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => onUpdateTicket({ status: 'resolved' })}
                  disabled={ticket.status === 'resolved'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={14} className="mr-2" />
                  Mark as Resolved
                </button>
                <button
                  onClick={() => onUpdateTicket({ status: 'closed' })}
                  disabled={ticket.status === 'closed'}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Archive size={14} className="mr-2" />
                  Close Ticket
                </button>
                {/* Add more actions like "Escalate", "Merge Ticket" etc. */}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <HelpCircle className="mr-3" size={32} />
              Helpdesk / Support
            </h1>
            <p className="text-gray-400 mt-1">Built-in support features for your users.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
              <Plus size={16} className="mr-2" />
              Create New Ticket
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MessageSquare className="text-blue-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{totalTicketsCount}</p>
                <p className="text-gray-400 text-sm">Total Tickets</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Clock className="text-red-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{openTicketsCount}</p>
                <p className="text-gray-400 text-sm">Open Tickets</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Users className="text-yellow-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{inProgressTicketsCount}</p>
                <p className="text-gray-400 text-sm">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="text-green-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{resolvedTicketsCount + closedTicketsCount}</p>
                <p className="text-gray-400 text-sm">Resolved / Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by subject, user ID..."
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-300 mb-1">Assigned To</label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={filters.assignedTo}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Agents</option>
                <option value="Unassigned">Unassigned</option>
                {uniqueAgents.map(agent => <option key={agent} value={agent}>{agent}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
              <select
                id="priority"
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">From Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">To Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Ticket ID</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Subject</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">User</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Priority</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Assigned To</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Submitted</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className={`border-t border-gray-700 hover:bg-gray-700/30 transition-colors`}>
                      <td className="px-6 py-4 text-white">{ticket.id}</td>
                      <td className="px-6 py-4 text-white">{ticket.subject}</td>
                      <td className="px-6 py-4 text-gray-300">{`User ${ticket.userId.slice(-3)}`}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'open' ? 'bg-red-500/20 text-red-300' :
                          ticket.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-300' :
                          ticket.status === 'resolved' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {ticket.status.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center text-xs font-medium ${
                          ticket.priority === 'high' ? 'text-red-400' :
                          ticket.priority === 'medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{ticket.assignedTo}</td>
                      <td className="px-6 py-4 text-gray-300">{new Date(ticket.submittedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOpenTicketModal(ticket)}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleUpdateTicket({ status: 'resolved' })}
                            disabled={ticket.status === 'resolved' || ticket.status === 'closed'}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-green-400 hover:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Resolve Ticket"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleUpdateTicket({ status: 'closed' })}
                            disabled={ticket.status === 'closed'}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-purple-400 hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Close Ticket"
                          >
                            <Archive size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-gray-400">
                      No tickets found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Detail Modal */}
        {showTicketModal && selectedTicket && (
          <TicketDetailModal
            ticket={selectedTicket}
            onClose={handleCloseTicketModal}
            onUpdateTicket={handleUpdateTicket}
            onAddNote={handleAddNote}
            newNote={newNote}
            setNewNote={setNewNote}
          />
        )}
      </div>
    </div>
  );
};

export default HelpdeskSupport;
