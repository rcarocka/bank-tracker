// Bank Tracker API - Cloudflare Worker
// Handles API requests for Yodlee and Trustly integrations

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Enable CORS for all requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route handling
      if (path === '/api/health') {
        return handleHealth(request, env);
      } else if (path.startsWith('/api/yodlee')) {
        return handleYodleeAPI(request, env, path);
      } else if (path.startsWith('/api/trustly')) {
        return handleTrustlyAPI(request, env, path);
      } else {
        return new Response('Not Found', { 
          status: 404,
          headers: corsHeaders 
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};

// Health check endpoint
async function handleHealth(request, env) {
  return new Response(JSON.stringify({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: env.ENVIRONMENT || 'development'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

// Yodlee API proxy
async function handleYodleeAPI(request, env, path) {
  const yodleeApiKey = env.YODLEE_API_KEY;
  
  if (!yodleeApiKey) {
    return new Response(JSON.stringify({ 
      error: 'Yodlee API key not configured' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Mock response for now - will be replaced with actual Yodlee API calls
  const mockData = {
    accounts: [
      {
        id: 1,
        accountName: 'Chase Checking',
        accountNumber: '****1234',
        accountType: 'CHECKING',
        balance: { amount: 2450.50, currency: 'USD' },
        providerName: 'Chase Bank'
      },
      {
        id: 2,
        accountName: 'Wells Fargo Savings',
        accountNumber: '****5678',
        accountType: 'SAVINGS',
        balance: { amount: 8750.25, currency: 'USD' },
        providerName: 'Wells Fargo'
      }
    ]
  };

  return new Response(JSON.stringify(mockData), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

// Trustly API proxy
async function handleTrustlyAPI(request, env, path) {
  const trustlyApiKey = env.TRUSTLY_API_KEY;
  
  if (!trustlyApiKey) {
    return new Response(JSON.stringify({ 
      error: 'Trustly API key not configured' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Mock response for now - will be replaced with actual Trustly API calls
  const mockData = {
    transfers: [
      {
        id: 'txn_123',
        amount: 100.00,
        currency: 'USD',
        status: 'completed',
        fromAccount: 'Chase Checking',
        toAccount: 'Wells Fargo Savings',
        timestamp: new Date().toISOString()
      }
    ]
  };

  return new Response(JSON.stringify(mockData), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

