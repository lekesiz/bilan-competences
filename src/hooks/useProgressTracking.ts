import { useEffect } from 'react';
import { useAssessmentStore } from '../store/useAssessmentStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { useAuthStore } from '../store/useAuthStore';

export const useProgressTracking = () => {
  const { results } = useAssessmentStore();
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!user) return;

    const userResults = results.filter((result) => result.userId === user.id);
    const latestResult = userResults[userResults.length - 1];

    if (latestResult) {
      const score = Math.round((latestResult.score / 9) * 100); // 9 is max score (3 * 3)
      let message = '';

      if (score >= 90) {
        message = 'Excellent progress! Keep up the great work!';
      } else if (score >= 70) {
        message = 'Good job! You\'re making solid progress.';
      } else {
        message = 'Keep practicing! Every assessment helps you improve.';
      }

      addNotification({
        type: 'success',
        message,
      });
    }

    // Weekly progress notification
    const weeklyCheckInterval = setInterval(() => {
      const completedThisWeek = userResults.filter(
        (result) => 
          result.completedAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length;

      addNotification({
        type: 'info',
        message: `You've completed ${completedThisWeek} assessments this week.`,
      });
    }, 7 * 24 * 60 * 60 * 1000); // Weekly interval

    return () => clearInterval(weeklyCheckInterval);
  }, [results, user, addNotification]);
};