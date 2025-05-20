import { useQuery } from '@tanstack/react-query';
import { mockEmployees } from '../data/employees';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      // Simulate fetch delay
      await new Promise((res) => setTimeout(res, 300));
      return mockEmployees;
    },
  });
};
