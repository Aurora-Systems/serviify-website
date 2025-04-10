import { ApiConstants } from './apiConstants';
import { ApiException } from './apiException';

// Define a base response interface
export interface ApiResponse {
  [key: string]: unknown;
}

export class ApiService {
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  private isSuccessful(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
  }

  private async handleResponse(response: Response): Promise<Response> {
    if (this.isSuccessful(response.status)) {
      return response;
    }
    
    throw await ApiException.fromResponseWithJson(response);
  }

  private createAbortController(timeoutMs = ApiConstants.timeout): { controller: AbortController, timeoutId: number } {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
    
    return { controller, timeoutId };
  }

  private clearTimeout(timeoutId: number): void {
    window.clearTimeout(timeoutId);
  }

  async get<T = ApiResponse>(
    endpoint: string, 
    options: { 
      headers?: Record<string, string>,
      params?: Record<string, string>, 
    } = {}
  ): Promise<T> {
    const { headers, params } = options;
    let url = `${ApiConstants.baseUrl}${endpoint}`;
    
    // Add query parameters if provided
    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      url += `?${queryParams.toString()}`;
    }
    
    console.log('➡️ API GET CALL START ➡️');
    console.log(`📍 Endpoint: ${url}`);
    console.log(`🎯 Headers: ${JSON.stringify(headers)}`);
    
    const { controller, timeoutId } = this.createAbortController();
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        signal: controller.signal,
      });
      
      this.clearTimeout(timeoutId);
      await this.handleResponse(response);
      return await response.json();
    } catch (error) {
      this.clearTimeout(timeoutId);
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiException('Request timeout', { code: 'TIMEOUT' });
      } else if (error instanceof TypeError && error.message.includes('NetworkError')) {
        throw new ApiException('No internet connection', { code: 'NO_CONNECTION' });
      } else if (error instanceof SyntaxError) {
        throw new ApiException('Invalid response format', { code: 'INVALID_FORMAT' });
      } else if (error instanceof ApiException) {
        throw error;
      } else {
        throw new ApiException(`Failed to make request: ${error}`, { code: 'REQUEST_FAILED' });
      }
    }
  }

  async post<T = ApiResponse>(
    endpoint: string, 
    options: { 
      body?: Record<string, unknown>, 
      headers?: Record<string, string> 
    } = {}
  ): Promise<T> {
    const { body, headers } = options;
    const url = `${ApiConstants.baseUrl}${endpoint}`;
    
    console.log('➡️ API POST CALL START ➡️');
    console.log(`📍 Endpoint: ${url}`);
    console.log(`📦 Body: ${JSON.stringify(body)}`);
    console.log(`🎯 Headers: ${JSON.stringify(headers)}`);
    
    const { controller, timeoutId } = this.createAbortController();
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      
      this.clearTimeout(timeoutId);
      await this.handleResponse(response);
      return await response.json();
    } catch (error) {
      this.clearTimeout(timeoutId);
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiException('Request timeout', { code: 'TIMEOUT' });
      } else if (error instanceof TypeError && error.message.includes('NetworkError')) {
        throw new ApiException('No internet connection', { code: 'NO_CONNECTION' });
      } else if (error instanceof SyntaxError) {
        throw new ApiException('Invalid response format', { code: 'INVALID_FORMAT' });
      } else if (error instanceof ApiException) {
        throw error;
      } else {
        throw new ApiException(`Failed to make request: ${error}`, { code: 'REQUEST_FAILED' });
      }
    }
  }

  async patch<T = ApiResponse>(
    endpoint: string, 
    options: { 
      body?: Record<string, unknown>, 
      headers?: Record<string, string> 
    } = {}
  ): Promise<T> {
    const { body, headers } = options;
    const url = `${ApiConstants.baseUrl}${endpoint}`;
    
    console.log('➡️ API PATCH CALL START ➡️');
    console.log(`📍 Endpoint: ${url}`);
    console.log(`📦 Body: ${JSON.stringify(body)}`);
    console.log(`🎯 Headers: ${JSON.stringify(headers)}`);
    
    const { controller, timeoutId } = this.createAbortController();
    
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      
      this.clearTimeout(timeoutId);
      await this.handleResponse(response);
      return await response.json();
    } catch (error) {
      this.clearTimeout(timeoutId);
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiException('Request timeout', { code: 'TIMEOUT' });
      } else if (error instanceof TypeError && error.message.includes('NetworkError')) {
        throw new ApiException('No internet connection', { code: 'NO_CONNECTION' });
      } else if (error instanceof SyntaxError) {
        throw new ApiException('Invalid response format', { code: 'INVALID_FORMAT' });
      } else if (error instanceof ApiException) {
        throw error;
      } else {
        throw new ApiException(`Failed to make request: ${error}`, { code: 'REQUEST_FAILED' });
      }
    }
  }

  async delete<T = ApiResponse>(
    endpoint: string, 
    options: { 
      headers?: Record<string, string> 
    } = {}
  ): Promise<T> {
    const { headers } = options;
    const url = `${ApiConstants.baseUrl}${endpoint}`;
    
    console.log('➡️ API DELETE CALL START ➡️');
    console.log(`📍 Endpoint: ${url}`);
    console.log(`🎯 Headers: ${JSON.stringify(headers)}`);
    
    const { controller, timeoutId } = this.createAbortController();
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        signal: controller.signal,
      });
      
      this.clearTimeout(timeoutId);
      await this.handleResponse(response);
      return await response.json();
    } catch (error) {
      this.clearTimeout(timeoutId);
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiException('Request timeout', { code: 'TIMEOUT' });
      } else if (error instanceof TypeError && error.message.includes('NetworkError')) {
        throw new ApiException('No internet connection', { code: 'NO_CONNECTION' });
      } else if (error instanceof SyntaxError) {
        throw new ApiException('Invalid response format', { code: 'INVALID_FORMAT' });
      } else if (error instanceof ApiException) {
        throw error;
      } else {
        throw new ApiException(`Failed to make request: ${error}`, { code: 'REQUEST_FAILED' });
      }
    }
  }
  
  // Singleton instance
  private static instance: ApiService;
  
  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
} 