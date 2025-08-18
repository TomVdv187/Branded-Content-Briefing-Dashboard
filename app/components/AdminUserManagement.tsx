'use client';

import React, { useState, useEffect } from 'react';
import { Shield, UserPlus, UserMinus, Mail, Crown, User, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from './AuthContext';

interface AdminUser {
  email: string;
  role: 'admin' | 'super_admin';
  addedBy: string;
  addedDate: string;
}

interface AdminUserManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminUserManagement({ isOpen, onClose }: AdminUserManagementProps) {
  const { isSuperAdmin, user } = useAuth();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'super_admin'>('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen && isSuperAdmin()) {
      loadAdminUsers();
    }
  }, [isOpen, isSuperAdmin]);

  // Security check - only super admins can manage admin users
  if (!isSuperAdmin()) {
    return null;
  }

  const loadAdminUsers = () => {
    const stored = localStorage.getItem('contentcraft_admin_users');
    if (stored) {
      try {
        setAdminUsers(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading admin users:', error);
      }
    } else {
      // Initialize with your super admin account
      const initialAdmins: AdminUser[] = [
        {
          email: 'tomvdvenne@gmail.com',
          role: 'super_admin',
          addedBy: 'system',
          addedDate: new Date().toISOString()
        }
      ];
      setAdminUsers(initialAdmins);
      localStorage.setItem('contentcraft_admin_users', JSON.stringify(initialAdmins));
    }
  };

  const addAdminUser = () => {
    setError('');
    setSuccess('');

    if (!newAdminEmail.trim()) {
      setError('Please enter an email address');
      return;
    }

    if (!newAdminEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if user already exists
    if (adminUsers.some(admin => admin.email.toLowerCase() === newAdminEmail.toLowerCase())) {
      setError('User is already an admin');
      return;
    }

    const newAdmin: AdminUser = {
      email: newAdminEmail.trim().toLowerCase(),
      role: newAdminRole,
      addedBy: user?.email || 'unknown',
      addedDate: new Date().toISOString()
    };

    const updatedAdmins = [...adminUsers, newAdmin];
    setAdminUsers(updatedAdmins);
    localStorage.setItem('contentcraft_admin_users', JSON.stringify(updatedAdmins));

    setSuccess(`${newAdminEmail} has been added as ${newAdminRole === 'super_admin' ? 'Super Admin' : 'Admin'}`);
    setNewAdminEmail('');
    setNewAdminRole('admin');
  };

  const removeAdminUser = (email: string) => {
    if (email === 'tomvdvenne@gmail.com') {
      setError('Cannot remove the primary super admin');
      return;
    }

    const updatedAdmins = adminUsers.filter(admin => admin.email !== email);
    setAdminUsers(updatedAdmins);
    localStorage.setItem('contentcraft_admin_users', JSON.stringify(updatedAdmins));
    setSuccess(`${email} has been removed from admin access`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/40 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm text-white p-6 border-b border-slate-600/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Crown className="text-purple-400" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Admin User Management</h2>
                <p className="text-purple-200">Manage admin access and permissions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Add New Admin */}
          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <UserPlus className="mr-2 text-green-400" size={20} />
              Add New Admin User
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-600/50 border border-slate-500/40 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="admin@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Role
                </label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as 'admin' | 'super_admin')}
                  className="w-full px-4 py-2 bg-slate-600/50 border border-slate-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
                <p className="text-green-200 text-sm">{success}</p>
              </div>
            )}

            <button
              onClick={addAdminUser}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} />
              <span>Add Admin User</span>
            </button>
          </div>

          {/* Current Admin Users */}
          <div className="bg-slate-700/50 rounded-xl border border-slate-600/30 overflow-hidden">
            <div className="p-6 border-b border-slate-600/30">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Shield className="mr-2 text-blue-400" size={20} />
                Current Admin Users ({adminUsers.length})
              </h3>
            </div>

            <div className="divide-y divide-slate-600/30">
              {adminUsers.map((admin, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-600/20 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      admin.role === 'super_admin' 
                        ? 'bg-purple-500/20' 
                        : 'bg-blue-500/20'
                    }`}>
                      {admin.role === 'super_admin' 
                        ? <Crown className="text-purple-400" size={20} />
                        : <Shield className="text-blue-400" size={20} />
                      }
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white">{admin.email}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          admin.role === 'super_admin'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400">
                        Added by {admin.addedBy} on {formatDate(admin.addedDate)}
                      </div>
                    </div>
                  </div>

                  {admin.email !== 'tomvdvenne@gmail.com' && (
                    <button
                      onClick={() => removeAdminUser(admin.email)}
                      className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                      title="Remove admin access"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
            <h4 className="text-blue-300 font-semibold mb-2 flex items-center">
              <Shield size={16} className="mr-2" />
              Permission Levels
            </h4>
            <div className="text-sm text-blue-200 space-y-1">
              <p><strong>Admin:</strong> Can view admin dashboard and user analytics</p>
              <p><strong>Super Admin:</strong> All admin permissions + can manage other admin users</p>
              <p><strong>Note:</strong> Changes take effect immediately for new logins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}