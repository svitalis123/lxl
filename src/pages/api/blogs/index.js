import clientPromise from '../../../lib/mongodb.js';
import { createBlogPost, BlogPostSchema } from '../../../models/BlogPost.js';

export const prerender = false;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("blogDatabase");
    const collection = db.collection("posts");
    
    const blogPosts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(blogPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST({ request }) {
  try {
    const blogData = await request.json();
    
    // Validate blogData against BlogPostSchema
    Object.keys(BlogPostSchema).forEach(key => {
      if (BlogPostSchema[key].required && !blogData[key]) {
        throw new Error(`${key} is required`);
      }
    });

    const client = await clientPromise;
    const db = client.db("blogDatabase");
    const collection = db.collection("posts");
    
    const blogPost = createBlogPost({
      ...blogData,
      publishDate: new Date(blogData.publishDate),
    });

    const result = await collection.insertOne(blogPost);
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: result.insertedId,
      title_id: blogPost.title_id 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return new Response(JSON.stringify({
      success: false, 
      error: error.message || 'Failed to create blog post'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}