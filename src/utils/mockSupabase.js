export function createMockSupabaseClient() {
  const mockResponse = { data: null, error: null };
  
  const queryBuilder = {
    select: function() { return this; },
    insert: function() { return this; },
    update: function() { return this; },
    upsert: function() { return this; },
    delete: function() { return this; },
    eq: function() { return this; },
    single: function() { return Promise.resolve(mockResponse); },
    limit: function() { return this; },
    then: function(resolve) { return Promise.resolve(mockResponse).then(resolve); }
  };

  return {
    from: () => queryBuilder,
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null }, error: null }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ data: null, error: null }),
      onAuthStateChange: (callback) => {
        if (callback) setTimeout(() => callback('SIGNED_OUT', null), 0);
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    }
  };
}

