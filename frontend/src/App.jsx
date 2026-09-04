import React, { useState, useEffect } from 'react';
import { projectApi, feedbackApi } from './api';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import FeedbackList from './components/FeedbackList';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [stats, setStats] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial list of projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  // Fetch stats and feedback tickets whenever selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      loadProjectData(selectedProject.id);
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    try {
      const res = await projectApi.getAll();
      setProjects(res.data || []);
      if (res.data && res.data.length > 0) {
        setSelectedProject(res.data[0]);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectData = async (projectId) => {
    try {
      const [statsRes, feedbackRes] = await Promise.all([
        feedbackApi.getStats(projectId),
        feedbackApi.getByProject(projectId),
      ]);
      setStats(statsRes.data);
      setFeedbacks(feedbackRes.data || []);
    } catch (err) {
      console.error('Failed to load project details:', err);
    }
  };

  const handleCreateProject = async (data) => {
    try {
      const res = await projectApi.create(data);
      setProjects((prev) => [...prev, res.data]);
      setSelectedProject(res.data);
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleStatusChange = async (feedbackId, newStatus) => {
    try {
      await feedbackApi.updateStatus(feedbackId, newStatus);
      if (selectedProject) {
        loadProjectData(selectedProject.id);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
        Connecting to FeedbackHub API...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onCreateProject={handleCreateProject}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {selectedProject ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{selectedProject.name}</h1>
                <p className="text-xs text-slate-500 mt-1">
                  API Key: <code className="bg-slate-200 px-2 py-0.5 rounded text-indigo-700 font-mono">{selectedProject.apiKey}</code>
                </p>
              </div>
            </div>

            <StatsCards stats={stats} />
            <FeedbackList feedbacks={feedbacks} onStatusChange={handleStatusChange} />
          </>
        ) : (
          <div className="text-center py-20 text-slate-400">
            No projects found. Use the "+ New Project" button above to get started!
          </div>
        )}
      </main>
    </div>
  );
}