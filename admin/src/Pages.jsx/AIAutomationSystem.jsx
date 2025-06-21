import React, { useState, useMemo } from 'react';
import {
  Zap, Brain, Settings, Users, DollarSign, Lightbulb, TrendingDown, ClipboardCheck,
  FileText, CheckCircle, Clock, AlertTriangle, MessageSquare, Download, Play, Pause, PieChart, BarChart
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, Legend, BarChart as RechartsBarChart, Bar
} from 'recharts';

const AIAutomationSystem = () => {
  // Dummy Data for demonstration
  const [automationStats] = useState({
    automatedActions: 5230,
    recommendationsMade: 185,
    suggestionsAdopted: 72,
    activeAutomations: 12,
  });

  const [usagePatterns] = useState([
    { month: 'Jan 24', estimatesGenerated: 1200, avgCreditsUsed: 15, activeUsers: 80 },
    { month: 'Feb 24', estimatesGenerated: 1500, avgCreditsUsed: 18, activeUsers: 95 },
    { month: 'Mar 24', estimatesGenerated: 1350, avgCreditsUsed: 16, activeUsers: 88 },
    { month: 'Apr 24', estimatesGenerated: 1700, avgCreditsUsed: 20, activeUsers: 105 },
    { month: 'May 24', estimatesGenerated: 1600, avgCreditsUsed: 19, activeUsers: 100 },
    { month: 'Jun 24', estimatesGenerated: 1900, avgCreditsUsed: 22, activeUsers: 115 },
  ]);

  const [creditRecommendations] = useState([
    { userId: 'USR005', name: 'David Rodriguez', currentCredits: 5, recommendedCredits: 50, reason: 'High recent usage, frequent top-ups.' },
    { userId: 'USR007', name: 'Robert Kim', currentCredits: 2, recommendedCredits: 100, reason: 'Frequent high-value estimates, low balance.' },
  ]);

  const [planDowngradeSuggestions] = useState([
    { userId: 'USR003', name: 'Mike Chen', currentPlan: 'Basic Plan', usage: 'Low (12 estimates/month avg)', suggestedPlan: 'Free Tier', reason: 'Consistently underutilizing current plan.' },
    { userId: 'USR008', name: 'Anna Martinez', currentPlan: 'Pro Plan', usage: 'Medium (5 estimates/month avg)', suggestedPlan: 'Basic Plan', reason: 'Usage far below Pro Plan capacity.' },
  ]);

  const [monthlySummaries] = useState([
    { id: 'SUMM001', month: 'May 2024', generatedDate: '2024-06-01', status: 'generated', insights: 'Overall increase in Enterprise plan usage, slight dip in Basic plan estimates.' },
    { id: 'SUMM002', month: 'April 2024', generatedDate: '2024-05-01', status: 'generated', insights: 'Highest user acquisition month, correlated with "Welcome Series" campaign.' },
  ]);

  // AI Assistant State (for demonstration)
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleAiPrompt = async () => {
    setIsLoadingAi(true);
    setAiResponse(''); // Clear previous response

    // Simulate API call to a generative model
    const mockResponses = {
      "usage patterns": "Based on recent data, we've observed a 15% increase in estimate generation over the last quarter, primarily driven by Pro Plan users. Average credits used per estimate have also increased by 10%, suggesting users are utilizing more advanced features.",
      "credit needs": "For users with fewer than 10 credits, our AI suggests an average top-up of 50 credits to maintain uninterrupted service, based on their historical usage and plan type.",
      "plan utilization": "Approximately 15% of Pro Plan users are currently underutilizing their subscription, generating fewer than 20 estimates per month. The AI suggests a review of their usage patterns for potential downgrade recommendations.",
      "default": "I'm still learning to provide deep insights on that specific query. However, I can analyze overall trends, credit consumption, and plan utilization."
    };

    let response = mockResponses.default;
    if (aiPrompt.toLowerCase().includes("usage patterns")) {
      response = mockResponses["usage patterns"];
    } else if (aiPrompt.toLowerCase().includes("credit needs")) {
      response = mockResponses["credit needs"];
    } else if (aiPrompt.toLowerCase().includes("plan utilization")) {
      response = mockResponses["plan utilization"];
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setAiResponse(response);
    setIsLoadingAi(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'paused': return 'bg-yellow-500/20 text-yellow-300';
      case 'generated': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Brain className="mr-3" size={32} />
              AI & Automation <span className="ml-3 px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full">Future Ready</span>
            </h1>
            <p className="text-gray-400 mt-1">Harness AI to analyze usage, automate tasks, and prepare for scale.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
              <Settings size={16} className="mr-2" />
              Configure Automations
            </button>
          </div>
        </div>

        {/* Automation Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Zap className="text-blue-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{automationStats.automatedActions.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Automated Actions</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Lightbulb className="text-green-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{automationStats.recommendationsMade}</p>
                <p className="text-gray-400 text-sm">Recommendations Made</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <ClipboardCheck className="text-purple-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{automationStats.suggestionsAdopted}</p>
                <p className="text-gray-400 text-sm">Suggestions Adopted</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Play className="text-yellow-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{automationStats.activeAutomations}</p>
                <p className="text-gray-400 text-sm">Active Automations</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant to auto-analyze usage patterns */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Brain className="mr-2" size={24} />
            AI Usage Pattern Analysis Assistant
          </h3>
          <p className="text-gray-400 mb-4">Ask the AI about usage trends, anomalies, or specific user patterns.</p>
          <div className="flex space-x-3 mb-4">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., 'What are the recent usage patterns?', 'Tell me about credit needs for low-balance users.'"
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAiPrompt}
              disabled={isLoadingAi}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingAi ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Brain size={16} className="mr-2" />
              )}
              Analyze
            </button>
          </div>
          {aiResponse && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-300">
              <strong className="text-white">AI Insight:</strong> {aiResponse}
            </div>
          )}

          {/* Usage Pattern Trend Chart */}
          <h4 className="text-white font-medium mt-6 mb-3 flex items-center">
            <LineChart className="mr-2" size={20} />
            Estimate & User Activity Trends
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={usagePatterns}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="month" stroke="#cbd5e0" />
              <YAxis yAxisId="left" stroke="#3b82f6" label={{ value: 'Estimates Generated', angle: -90, position: 'insideLeft', fill: '#cbd5e0' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#22c55e" label={{ value: 'Active Users', angle: 90, position: 'insideRight', fill: '#cbd5e0' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="estimatesGenerated" stroke="#3b82f6" name="Estimates Generated" />
              <Line yAxisId="right" type="monotone" dataKey="activeUsers" stroke="#22c55e" name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Auto Credit Recommendation System */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <DollarSign className="mr-2" size={24} />
            Auto Credit Recommendation System
          </h3>
          <p className="text-gray-400 mb-4">AI-driven suggestions for user credit top-ups based on their usage patterns.</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">User</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Current Credits</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Recommended Credits</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Reason</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {creditRecommendations.length > 0 ? (
                  creditRecommendations.map((rec) => (
                    <tr key={rec.userId} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-white">{rec.name} ({rec.userId.slice(-3)})</td>
                      <td className="px-4 py-3 text-gray-300">{rec.currentCredits}</td>
                      <td className="px-4 py-3 text-green-400 font-semibold">{rec.recommendedCredits}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{rec.reason}</td>
                      <td className="px-4 py-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                          Apply Recommendation
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">No new credit recommendations at this time.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Plan Downgrade Suggestion */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingDown className="mr-2" size={24} />
            Plan Downgrade Suggestions
          </h3>
          <p className="text-gray-400 mb-4">Identify users who may benefit from a lower-tier plan due to underutilization.</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">User</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Current Plan</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Usage</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Suggested Plan</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Reason</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {planDowngradeSuggestions.length > 0 ? (
                  planDowngradeSuggestions.map((suggestion) => (
                    <tr key={suggestion.userId} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-white">{suggestion.name} ({suggestion.userId.slice(-3)})</td>
                      <td className="px-4 py-3 text-gray-300">{suggestion.currentPlan}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{suggestion.usage}</td>
                      <td className="px-4 py-3 text-yellow-400 font-semibold">{suggestion.suggestedPlan}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{suggestion.reason}</td>
                      <td className="px-4 py-3">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors">
                          Send Suggestion
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-400">No plan downgrade suggestions at this time.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Usage Summaries */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <FileText className="mr-2" size={24} />
            Monthly Usage Summaries (Auto-Generated)
          </h3>
          <p className="text-gray-400 mb-4">Comprehensive reports generated automatically, detailing key usage metrics.</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Report Month</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Generated Date</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Key Insights</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {monthlySummaries.length > 0 ? (
                  monthlySummaries.map((summary) => (
                    <tr key={summary.id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-white">{summary.month}</td>
                      <td className="px-4 py-3 text-gray-300">{new Date(summary.generatedDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(summary.status)}`}>
                          {summary.status.charAt(0).toUpperCase() + summary.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{summary.insights}</td>
                      <td className="px-4 py-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center">
                          <Download size={14} className="mr-1" /> View/Download
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">No monthly summaries generated yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAutomationSystem;
