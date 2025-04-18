import { ApiConstants } from '../lib/api/apiConstants';
import { ApiService } from '../lib/api/apiService';

// Types
export interface Provider {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  headline?: string;
  serviceType?: string;
  service_type?: string;
  location?: string;
  provider_location?: string;
  service_rating?: number;
  avatar?: string;
  profile_image_url?: string;
  provider_bio?: string | null;
  provider_skills?: string[];
  provider_availability?: string;
  is_service_provider?: boolean;
  reviews?: Review[];
  gallery?: GalleryItem[];
  follows_count?: number;
  following_count?: number;
  posts_count?: number;
  posts?: Post[];
  refers_count?: number;
  bookmarks_count?: number;
  total_clients?: number;
  total_bookmarks?: number;
  total_referrals?: number;
}

// Analytics data interface
export interface AnalyticsData {
  rating: number;
  refers_count: number;
  bookmarks_count: number;
}

// Review interface
export interface Review {
  id: string;
  user_id: string;
  provider_id: string;
  reviewer_name: string;
  reviewer_image: string;
  rating: number;
  comment: string;
  created_at: string;
  client?: {
    id: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
  };
}

// Gallery item interface
export interface GalleryItem {
  id: string;
  user_id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface Post {
  id: string;
  profile_id: string;
  caption: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

export interface DiscoverServicesParams {
  query?: string;
  location?: string;
  sortBy?: 'rating' | 'distance' | 'recent';
  limit?: number;
  page?: number;
}

export interface DiscoverServicesResponse {
  providers: Provider[];
  total: number;
  page: number;
  limit: number;
}



interface BackendUser {
  id: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  is_service_provider: boolean;
  service_type: string | null;
  service_rating: number | null;
  average_rating: number | null;
  provider_bio: string | null;
  provider_location: string | null;
  headline?: string | null;
  followers_count?: number;
  following_count?: number;
  refers_count?: number;
  bookmarks_count?: number;
  total_clients?: number;
  total_bookmarks?: number;
  total_referrals?: number;
  service_provider?: {
    provider_id: string;
    service_type: string;
    headline: string;
    bio: string;
    location: string;
    city: string;
    skills: string[];
    availability: string;
    portfolio_images: string[];
    average_rating: number;
    total_clients?: number;
    total_bookmarks?: number;
    total_referrals?: number;
    created_at?: string;
  };
  created_at?: string;
  following_ids?: string[];
}

interface BackendService {
  id?: string;
  _id?: string;
  userId?: string;
  name?: string;
  providerName?: string;
  firstName?: string;
  lastName?: string;
  serviceType?: string;
  service?: string;
  location?: string;
  rating?: number;
  average_rating?: number;
  avatar?: string;
  profileImage?: string;
  headline?: string;
}

// Define interfaces for API responses
interface UserResponse {
  data: BackendUser;
  message: string;
  status: string;
  error: string | null;
  meta?: Record<string, unknown>;
}

interface ReviewsResponse {
  data: Review[];
  message: string;
  status: string;
  error: string | null;
}

interface GalleryResponse {
  data: GalleryItem[];
  message: string;
  status: string;
  error: string | null;
}

interface PostsResponse {
  data: {
    posts: Post[];
    hasMore?: boolean;
    total?: number;
  };
  message: string;
  status: string;
  error: string | null;
}

// For search users response
interface SearchUsersResponse {
  data: BackendUser[];
  message: string;
  status: string;
  error: string | null;
  meta?: Record<string, unknown>;
}

// Define the discover services response
interface DiscoverServicesApiResponse {
  data: {
    services: BackendService[];
    total?: number;
  };
  message: string;
  status: string;
  error: string | null;
}

// Define the nearby services response
interface NearbyServicesResponse {
  data: {
    services: BackendService[];
  };
  message: string;
  status: string;
  error: string | null;
}

export class ProvidersService {
  private static instance: ProvidersService;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): ProvidersService {
    if (!ProvidersService.instance) {
      ProvidersService.instance = new ProvidersService();
    }
    return ProvidersService.instance;
  }

  // Search for users by name
  public async searchUsers(query: string): Promise<Provider[]> {
    try {
      const endpoint = `${ApiConstants.users.search}/${encodeURIComponent(query)}`;
      
      const result = await this.apiService.get<SearchUsersResponse>(endpoint);
      console.log('Parsed search response:', result);
      
      const userData = result.data || [];
      console.log('User data extracted:', userData);
      
      // Filter the users to include only service providers
      const serviceProviders = userData.filter((user: BackendUser) => user.is_service_provider === true);
      console.log('Filtered service providers:', serviceProviders);
      
      const mappedProviders = this.mapUsersToProviders(serviceProviders);
      console.log('Mapped providers:', mappedProviders);
      
      return mappedProviders;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  // Discover services with filters
  public async discoverServices(params: DiscoverServicesParams): Promise<DiscoverServicesResponse> {
    try {
      const queryParams: Record<string, string> = {};
      if (params.query) queryParams.query = params.query;
      if (params.location) queryParams.location = params.location;
      if (params.sortBy) queryParams.sort_by = params.sortBy;
      queryParams.page = (params.page || 1).toString();
      queryParams.limit = (params.limit || 10).toString();
      
      const result = await this.apiService.get<DiscoverServicesApiResponse>(ApiConstants.discover.services, {
        params: queryParams
      });
      
      console.log('Parsed discover services response:', result);
      
      const servicesData = result.data?.services || result.data || [];
      console.log('Services data extracted:', servicesData);
      
      const mappedProviders = this.mapServicesToProviders(servicesData);
      console.log('Mapped service providers:', mappedProviders);
      
      return {
        providers: mappedProviders,
        total: result.data?.total || servicesData.length || 0,
        page: parseInt(params.page?.toString() || '1', 10),
        limit: parseInt(params.limit?.toString() || '10', 10)
      };
    } catch (error) {
      console.error('Error discovering services:', error);
      throw error;
    }
  }

  // Get nearby services based on location
  public async getNearbyServices(latitude: number, longitude: number, radius = 25): Promise<Provider[]> {
    try {
      const result = await this.apiService.get<NearbyServicesResponse>(ApiConstants.locations.nearbyServices, {
        params: {
          lat: latitude.toString(),
          lng: longitude.toString(),
          radius: radius.toString()
        }
      });
      
      console.log('Parsed nearby services response:', result);
      
      // Updated response handling
      const servicesData = result.data?.services || [];
      console.log('Nearby services data extracted:', servicesData);
      
      return this.mapServicesToProviders(servicesData);
    } catch (error) {
      console.error('Error getting nearby services:', error);
      throw error;
    }
  }

  // Get provider by ID
  public async getProviderById(id: string): Promise<Provider | null> {
    try {
      const endpoint = `${ApiConstants.users.getDetails}/${encodeURIComponent(id)}`;
      
      const result = await this.apiService.get<UserResponse>(endpoint);
      console.log('Parsed provider details response:', result);
      
      const userData = result.data || null;
      if (!userData) {
        console.error("No user data returned");
        return null;
      }
      
      // Set is_service_provider flag based on service_provider object presence
      userData.is_service_provider = userData.service_provider !== undefined;
      
      if (!userData.is_service_provider) {
        console.error("User is not a service provider");
        return null;
      }
      
      // Fetch additional data - reviews
      let reviews: Review[] = [];
      try {
        const reviewsEndpoint = `${ApiConstants.reviews.get}/${encodeURIComponent(id)}`;
        const reviewsResult = await this.apiService.get<ReviewsResponse>(reviewsEndpoint);
        reviews = reviewsResult.data || [];
        console.log('Provider reviews:', reviews);
      } catch (error) {
        console.error('Error getting provider reviews:', error);
        // Continue execution even if reviews fetch fails
      }
      
      // Fetch portfolio/gallery
      let gallery: GalleryItem[] = [];
      try {
        // If we already have portfolio_images in the service_provider, use those
        if (userData.service_provider && userData.service_provider.portfolio_images) {
          gallery = userData.service_provider.portfolio_images.map((url: string, index: number) => ({
            id: index.toString(),
            user_id: id,
            image_url: url,
            caption: null,
            created_at: new Date().toISOString()
          }));
          console.log('Provider gallery from portfolio_images:', gallery);
        } else {
          // Otherwise fetch from gallery endpoint
          const galleryEndpoint = `${ApiConstants.users.getDetails}/${encodeURIComponent(id)}/gallery`;
          const galleryResult = await this.apiService.get<GalleryResponse>(galleryEndpoint);
          gallery = galleryResult.data || [];
          console.log('Provider gallery from API:', gallery);
        }
      } catch (error) {
        console.error('Error getting provider gallery:', error);
        // Continue execution even if gallery fetch fails
      }
      
      // Fetch posts
      let posts: Post[] = [];
      try {
        const postsEndpoint = `${ApiConstants.posts.getUserPosts}/${encodeURIComponent(id)}`;
        const postsResult = await this.apiService.get<PostsResponse>(postsEndpoint);
        // Extract the nested posts array, defaulting to an empty array if not found
        posts = postsResult.data?.posts || []; 
        console.log('Provider posts:', postsResult.data); // Log the whole data object for context
      } catch (error) {
        console.error('Error getting provider posts:', error);
        // Continue execution even if posts fetch fails
      }
      
      // Map the provider data initially (might be slightly incomplete before adding reviews/posts)
      const mappedProvider = this.mapUsersToProviders([userData])[0];
      console.log('Mapped provider data before final merge:', mappedProvider);

      // Ensure the final object correctly uses data, especially from service_provider
      const finalProvider: Provider = {
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        name: `${userData.first_name} ${userData.last_name}`.trim(),
        profile_image_url: userData.profile_image_url,
        avatar: userData.profile_image_url,
        headline: userData.service_provider?.headline || userData.headline || undefined,
        service_type: userData.service_provider?.service_type || userData.service_type || undefined,
        serviceType: userData.service_provider?.service_type || userData.service_type || undefined,
        provider_location: this.extractCityFromLocation(userData.service_provider?.location || userData.provider_location || null),
        location: this.extractCityFromLocation(userData.service_provider?.location || userData.provider_location || null),
        service_rating: userData.service_provider?.average_rating || userData.average_rating || userData.service_rating || 0,
        provider_bio: userData.service_provider?.bio || userData.provider_bio || undefined,
        provider_skills: userData.service_provider?.skills,
        provider_availability: userData.service_provider?.availability,
        is_service_provider: !!userData.service_provider,
        reviews: reviews,
        gallery: gallery.length > 0 ? gallery : mappedProvider.gallery || [],
        posts: posts,
        follows_count: userData.followers_count || 0,
        following_count: userData.following_count || 0,
        posts_count: posts.length,
        total_clients: userData.service_provider?.total_clients || 0,
        total_bookmarks: userData.service_provider?.total_bookmarks || 0,
        total_referrals: userData.service_provider?.total_referrals || 0,
        refers_count: userData.service_provider?.total_referrals || 0, 
        bookmarks_count: userData.service_provider?.total_bookmarks || 0,
      };

      console.log('Final provider object being returned:', finalProvider);
      return finalProvider;
    } catch (error) {
      console.error('Error getting provider details:', error);
      throw error;
    }
  }


  private extractCityFromLocation(location: string | null): string {
    if (!location) return 'Location not specified';
    
  
    const parts = location.split(',').map(part => part.trim()).filter(part => part);
    
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
    
    return location;
  }

  private mapUsersToProviders(users: BackendUser[]): Provider[] {
    console.log('Raw users data for mapping:', users);
    
    return users.map(user => {
      const sp = user.service_provider; // Alias for easier access
      
      // Determine appropriate service type, prioritizing service_provider
      const serviceType = sp?.service_type || user.service_type || 'Service Provider';
      
      // Check if user is a service provider based on the object
      const isServiceProvider = !!sp;
      
      // Extract provider location, prioritizing service_provider
      const cityOnly = this.extractCityFromLocation(sp?.location || user.provider_location || null);
      
      // Extract provider bio, prioritizing service_provider
      const providerBio = sp?.bio || user.provider_bio || undefined; // Ensure undefined if null
      
      // Extract rating, prioritizing service_provider
      const rating = sp?.average_rating || user.average_rating || user.service_rating || 0;
      
      // Extract follower counts                
      const followsCount = user.followers_count || 0;
      const followingCount = user.following_count || 0;
      
      // Extract analytics data from service_provider object
      const totalClients = sp?.total_clients || 0;
      const totalBookmarks = sp?.total_bookmarks || 0;
      const totalReferrals = sp?.total_referrals || 0;
      
      return {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`.trim(),
        first_name: user.first_name,
        last_name: user.last_name,
        headline: sp?.headline || user.headline || undefined,
        serviceType: serviceType,
        service_type: serviceType,
        location: cityOnly,
        provider_location: cityOnly,
        rating: rating,
        service_rating: rating,
        avatar: user.profile_image_url,
        profile_image_url: user.profile_image_url,
        provider_bio: providerBio,
        provider_skills: sp?.skills,
        provider_availability: sp?.availability,
        is_service_provider: isServiceProvider,
        follows_count: followsCount,
        following_count: followingCount,
        posts_count: 0, // Will be populated later in getProviderById
        refers_count: totalReferrals,
        bookmarks_count: totalBookmarks,
        total_clients: totalClients,
        total_bookmarks: totalBookmarks,
        total_referrals: totalReferrals,
        gallery: sp?.portfolio_images ? 
          sp.portfolio_images.map((url, index) => ({
            id: index.toString(),
            user_id: user.id,
            image_url: url,
            caption: null,
            created_at: new Date().toISOString()
          })) : []
      };
    });
  }

  // Helper method to map backend service data to our Provider interface
  private mapServicesToProviders(services: BackendService[]): Provider[] {
    console.log('Raw services data for rating debug:', services);
    
    return services.map(service => {
      // Debug log for each service's rating
      console.log('Service rating debug:', {
        id: service.id || service._id,
        name: service.name || service.providerName || `${service.firstName || ''} ${service.lastName || ''}`.trim(), 
        rating: service.rating,
        average_rating: service.average_rating,
        ratingType: typeof service.average_rating,
        hasRating: 'average_rating' in service,
        headline: service.headline,
        allKeys: Object.keys(service)
      });
      
      // Extract only the city from the location
      const location = this.extractCityFromLocation(service.location || null);
      
      return {
        id: service.id || service._id || service.userId || '',
        name: service.name || service.providerName || `${service.firstName || ''} ${service.lastName || ''}`.trim(),
        first_name: service.firstName || '',
        last_name: service.lastName || '',
        headline: service.headline,
        serviceType: service.serviceType || service.service || 'Unknown service',
        service_type: service.serviceType || service.service || 'Unknown service',
        location: location,
        provider_location: location,
        rating: service.average_rating || service.rating || 0,
        service_rating: service.rating || service.average_rating || 0,
        avatar: service.avatar || service.profileImage,
        profile_image_url: service.profileImage || service.avatar
      };
    });
  }
} 