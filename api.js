// API service layer for communicating with Cloudflare Workers backend

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://bank-tracker-api.your-domain.workers.dev' 
  : 'http://localhost:8787';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // Yodlee API methods
  async getAccounts() {
    return this.request('/api/yodlee/accounts');
  }

  async getAccountDetails(accountId) {
    return this.request(`/api/yodlee/accounts/${accountId}`);
  }

  async getTransactions(accountId, options = {}) {
    const params = new URLSearchParams(options);
    return this.request(`/api/yodlee/accounts/${accountId}/transactions?${params}`);
  }

  async getHistoricalBalances(accountId, options = {}) {
    const params = new URLSearchParams(options);
    return this.request(`/api/yodlee/accounts/${accountId}/historicalBalances?${params}`);
  }

  // Trustly API methods
  async initiateTransfer(transferData) {
    return this.request('/api/trustly/transfer', {
      method: 'POST',
      body: JSON.stringify(transferData),
    });
  }

  async getTransferStatus(transferId) {
    return this.request(`/api/trustly/transfer/${transferId}`);
  }

  async getTransferHistory() {
    return this.request('/api/trustly/transfers');
  }

  // Account linking simulation (FastLink)
  async linkAccount(providerData) {
    return this.request('/api/yodlee/link-account', {
      method: 'POST',
      body: JSON.stringify(providerData),
    });
  }
}

export default new ApiService();

