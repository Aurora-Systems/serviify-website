import { ProvidersService } from '../services/providers.service';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export class SitemapGenerator {
  private static readonly BASE_URL = 'https://serviify.co.zw';
  private static readonly providersService = ProvidersService.getInstance();

  /**
   * Generate static URLs for the sitemap
   */
  private static getStaticUrls(): SitemapUrl[] {
    return [
      {
        loc: `${this.BASE_URL}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: `${this.BASE_URL}/services`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${this.BASE_URL}/provider-search`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: 0.8
      },
      {
        loc: `${this.BASE_URL}/about`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${this.BASE_URL}/support`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        loc: `${this.BASE_URL}/help-centre`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        loc: `${this.BASE_URL}/app`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.5
      },
      {
        loc: `${this.BASE_URL}/privacy-policy`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: `${this.BASE_URL}/terms-of-service`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: 0.3
      }
    ];
  }

  /**
   * Generate provider URLs for the sitemap
   */
  private static async getProviderUrls(): Promise<SitemapUrl[]> {
    try {
      // Get all providers with a large limit to capture all
      const response = await this.providersService.discoverServices({
        limit: 1000, // Adjust based on your provider count
        page: 1
      });

      return response.providers.map(provider => ({
        loc: `${this.BASE_URL}/provider/${provider.id}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.7
      }));
    } catch (error) {
      console.error('Error fetching providers for sitemap:', error);
      return [];
    }
  }

  /**
   * Generate complete sitemap XML
   */
  public static async generateSitemap(): Promise<string> {
    const staticUrls = this.getStaticUrls();
    const providerUrls = await this.getProviderUrls();
    const allUrls = [...staticUrls, ...providerUrls];

    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetClose = '</urlset>';

    const urlElements = allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

    return `${xmlHeader}\n${urlsetOpen}${urlElements}\n${urlsetClose}`;
  }

  /**
   * Generate sitemap and save to public directory
   */
  public static async updateSitemapFile(): Promise<void> {
    try {
      const sitemapXml = await this.generateSitemap();
      
      // In a real application, you would write this to the public directory
      // For now, we'll log it or return it for manual update
      console.log('Generated sitemap:', sitemapXml);
      
      // You can implement file writing logic here if needed
      // fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapXml);
      
    } catch (error) {
      console.error('Error generating sitemap:', error);
    }
  }

  /**
   * Get provider count for sitemap planning
   */
  public static async getProviderCount(): Promise<number> {
    try {
      const response = await this.providersService.discoverServices({
        limit: 1,
        page: 1
      });
      return response.total || 0;
    } catch (error) {
      console.error('Error getting provider count:', error);
      return 0;
    }
  }
}