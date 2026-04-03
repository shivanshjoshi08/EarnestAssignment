const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  // Important: Credentials includes cookies for the refresh token
  config.credentials = 'include';

  let response = await fetch(`${API_URL}${endpoint}`, config);

  // If 401, try to refresh token once
  if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
    try {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!refreshRes.ok) {
        throw new Error('Refresh failed');
      }

      const refreshData = await refreshRes.json();
      localStorage.setItem('accessToken', refreshData.data.accessToken);

      // Retry original request with new token
      headers.set('Authorization', `Bearer ${refreshData.data.accessToken}`);
      response = await fetch(`${API_URL}${endpoint}`, { ...config, headers });
    } catch (refreshErr) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      throw new ApiError(401, 'Session expired');
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'API request failed', data);
  }

  return data;
}

export const api = {
  get: (endpoint: string, options?: RequestInit) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint: string, data?: any, options?: RequestInit) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),
  patch: (endpoint: string, data?: any, options?: RequestInit) => request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) }),
  put: (endpoint: string, data?: any, options?: RequestInit) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint: string, options?: RequestInit) => request(endpoint, { ...options, method: 'DELETE' }),
};
