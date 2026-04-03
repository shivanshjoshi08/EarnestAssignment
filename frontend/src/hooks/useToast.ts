import { showToastUtil } from '@/components/Toast';

export function useToast() {
  return {
    showToast: (message: string, type: 'success' | 'error' = 'success') => {
      showToastUtil(message, type);
    }
  };
}
