import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { Button } from '../../components/ui/Button';
import { Trash2, Search, FileText } from 'lucide-react';
import { format } from 'date-fns';

export const UserManagement: React.FC = () => {
  const { users, fetchUsers, deleteUser } = useAdminStore();
  const { results, assessments } = useAssessmentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
    }
  };

  const getUserResults = (userId: string) => {
    return results
      .filter((result) => result.userId === userId)
      .map((result) => ({
        ...result,
        assessment: assessments.find((a) => a.id === result.assessmentId),
      }))
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registered
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assessments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg. Score
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr className={selectedUser === user.id ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(user.registeredAt, 'PP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(user.lastActive, 'PP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.completedAssessments}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.averageScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                {selectedUser === user.id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-blue-50">
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">Assessment Results</h3>
                        <div className="space-y-2">
                          {getUserResults(user.id).map((result) => (
                            <div
                              key={result.id}
                              className="bg-white p-4 rounded-lg shadow-sm"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {result.assessment?.title}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Completed on {format(result.completedAt, 'PPp')}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-semibold text-blue-600">
                                    {Math.round((result.score / (result.assessment?.questions.length || 1) / 3) * 100)}%
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Score: {result.score} / {(result.assessment?.questions.length || 0) * 3}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};