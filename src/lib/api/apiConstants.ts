export const ApiConstants = {
  baseUrl: 'https://serviify-container.calmriver-5338a541.southafricanorth.azurecontainerapps.io',
  
  // Websocket endpoints
  wsBaseUrl: 'wss://serviify-container.calmriver-5338a541.southafricanorth.azurecontainerapps.io',
  
  // Auth endpoints
  auth: {
    login: '/login',
    socialLogin: '/auth/social-login',
    register: '/register',
    verifyEmail: '/verify-email',
    resendVerification: '/resend-verification',
    resetPassword: '/reset-password',
    logout: '/logout'
  },
  
  // Post endpoints
  posts: {
    create: '/posts/create',
    getUserPosts: '/posts/users',
    closeRequest: '/posts/close-request',
    get: '/posts'
  },
  
  // Notifications endpoints
  notifications: {
    getUnseen: '/notifications/get-unseen',
    deleteAll: '/notifications/delete-all'
  },
  
  // Expresses endpoints
  expresses: {
    create: '/expresses/create',
    getUserExpresses: '/expresses/users',
    getGlobal: '/expresses',
    sendView: '/expresses/views'
  },
  
  // Feed endpoints
  feed: {
    getGlobalFeed: '/feed/country'
  },
  
  // Storage endpoints
  storage: {
    uploadImage: '/storage/upload',
    images: '/storage/images/'
  },
  
  // Location endpoints
  locations: {
    nearbyServices: '/locations/nearby-services',
    getDetails: '/locations/location-details',
    getSuggestions: '/locations/location-suggestions'
  },
  
  // Interactions endpoints
  interactions: {
    like: '/interactions/like',
    toggleFollow: '/interactions/toggle-follow',
    accept: '/interactions/toggle-accept',
    getComments: '/interactions/get-comments',
    addComment: '/interactions/add-comment',
    getRefers: '/interactions/get-refers',
    getAccepts: '/interactions/get-accepts',
    addRefer: '/interactions/add-refer'
  },
  
  // User endpoints
  users: {
    getDetails: '/users',
    search: '/users/search',
    activateProviderAccount: '/users/activate-provider-account',
    editProviderDetails: '/users/provider',
    updateLocation: '/users/update-location',
    deviceToken: '/users/device-token'
  },
  
  // Reviews endpoints
  reviews: {
    send: '/user/reviews',
    get: '/user/reviews'
  },
  
  // Gallery endpoints
  gallery: {
    updatePortfolioImages: '/user/gallery'
  },
  
  // Chat endpoints
  chats: {
    create: '/chats/create-chat',
    get: '/chats'
  },
  
  // Messaging endpoints
  messages: {
    send: '/messages',
    get: '/messages'
  },
  
  // Discover endpoints
  discover: {
    services: '/api/discover/services'
  },
  
  // Version endpoints
  version: {
    get: '/api/version',
    check: '/api/version/check'
  },
  
  // Default timeout
  timeout: 15000 // 15 seconds timeout
}; 