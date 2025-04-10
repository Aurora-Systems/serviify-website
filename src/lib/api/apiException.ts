export class ApiException extends Error {
  code: string;
  status?: number;
  
  constructor(message: string, options: { code: string, status?: number } = { code: 'UNKNOWN_ERROR' }) {
    super(message);
    this.name = 'ApiException';
    this.code = options.code;
    this.status = options.status;
    
    // This is needed to properly extend Error in TypeScript
    Object.setPrototypeOf(this, ApiException.prototype);
  }

  static fromResponse(response: Response): ApiException {
    // Try to parse error message from response
    const message = `HTTP Error: ${response.status}`;
    const code = `HTTP_${response.status}`;
    
    return new ApiException(message, { 
      code, 
      status: response.status 
    });
  }

  static async fromResponseWithJson(response: Response): Promise<ApiException> {
    try {
      const data = await response.json();
      const message = data.message || data.error || `HTTP Error: ${response.status}`;
      const code = data.code || `HTTP_${response.status}`;
      
      return new ApiException(message, { 
        code, 
        status: response.status 
      });
    } catch (e) {
      return ApiException.fromResponse(response);
    }
  }
} 