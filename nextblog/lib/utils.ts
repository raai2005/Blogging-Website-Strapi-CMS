/**
 * Utility functions for the blog application
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Extracts the cover image URL from a blog post object
 * Handles the nested Strapi v4 data structure
 */
export function getCoverImageUrl(post: any): string | null {
  try {
    // Handle Strapi structure: post.attributes.coverimage or post.coverimage
    const attributes = post?.attributes || post;
    const coverimage = attributes?.coverimage;
    
    if (!coverimage) {
      return null;
    }

    // The url is directly in the coverimage object
    const url = coverimage?.url;
    
    if (!url) {
      return null;
    }

    // Construct full URL
    return getFullImageUrl(url);
  } catch (error) {
    console.error('Error extracting cover image URL:', error);
    return null;
  }
}

/**
 * Converts a relative Strapi image URL to a full URL
 */
export function getFullImageUrl(relativePath: string): string {
  if (!relativePath) {
    return '';
  }

  // If already a full URL, return as is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Remove leading slash if present to avoid double slashes
  const path = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  
  return `${STRAPI_URL}/${path}`;
}

/**
 * Gets a fallback image URL
 */
export function getFallbackImageUrl(): string {
  return '/placeholder-blog.jpg';
}
