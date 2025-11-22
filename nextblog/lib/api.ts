// Strapi API Base URL
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// API Helper Functions for Strapi Integration

/**
 * 1. Get Hero/Homepage Settings
 * Used in: components/Hero.tsx
 */
export async function getHeroContent() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/hero`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
}

/**
 * 2. Get Featured Blog Post
 * Used in: components/FeaturedPost.tsx
 */
export async function getFeaturedPost() {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-posts?filters[featured][$eq]=true&populate=*&sort=publishedAt:desc&pagination[limit]=1`
    );
    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching featured post:', error);
    return null;
  }
}

/**
 * 3. Get Recent Blog Posts
 * Used in: components/RecentPosts.tsx
 */
export async function getRecentPosts(limit = 6) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-posts?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

/**
 * 4. Get All Categories
 * Used in: components/CategoryBrowse.tsx, app/categories/page.tsx
 */
export async function getCategories() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories?populate=*`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * 5. Subscribe to Newsletter
 * Used in: components/Newsletter.tsx
 */
export async function subscribeNewsletter(email: string) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { email }
      }),
    });
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error };
  }
}

/**
 * 6. Get All Blog Posts (with pagination)
 * Used in: app/blog/page.tsx
 */
export async function getAllBlogPosts(page = 1, pageSize = 10) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-posts?populate=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    const data = await response.json();
    return {
      posts: data.data || [],
      pagination: data.meta?.pagination || null
    };
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return { posts: [], pagination: null };
  }
}

/**
 * 7. Get Single Blog Post by Slug
 * Used in: app/blog/[slug]/page.tsx
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`
    );
    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

/**
 * 8. Get Posts by Category
 * Used in: app/category/[slug]/page.tsx
 */
export async function getPostsByCategory(categorySlug: string) {
  try {
    // First get category details
    const categoryResponse = await fetch(
      `${STRAPI_URL}/api/categories?filters[slug][$eq]=${categorySlug}`
    );
    const categoryData = await categoryResponse.json();
    const category = categoryData.data?.[0];

    // Then get posts in this category
    const postsResponse = await fetch(
      `${STRAPI_URL}/api/blog-posts?filters[category][slug][$eq]=${categorySlug}&populate=*&sort=publishedAt:desc`
    );
    const postsData = await postsResponse.json();

    return {
      category: category || null,
      posts: postsData.data || []
    };
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return { category: null, posts: [] };
  }
}

/**
 * 9. Get Posts by Tag
 * Used in: app/tag/[slug]/page.tsx
 */
export async function getPostsByTag(tagSlug: string) {
  try {
    // First get tag details
    const tagResponse = await fetch(
      `${STRAPI_URL}/api/tags?filters[slug][$eq]=${tagSlug}`
    );
    const tagData = await tagResponse.json();
    const tag = tagData.data?.[0];

    // Then get posts with this tag
    const postsResponse = await fetch(
      `${STRAPI_URL}/api/blog-posts?filters[tags][slug][$eq]=${tagSlug}&populate=*&sort=publishedAt:desc`
    );
    const postsData = await postsResponse.json();

    return {
      tag: tag || null,
      posts: postsData.data || []
    };
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return { tag: null, posts: [] };
  }
}

/**
 * 10. Get All Categories with Post Count
 * Used in: app/categories/page.tsx
 */
export async function getCategoriesWithCount() {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories?populate[blog_posts][count]=true`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories with count:', error);
    return [];
  }
}

/**
 * 11. Submit Contact Form
 * Used in: app/contact/page.tsx
 */
export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: formData
      }),
    });
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
}
