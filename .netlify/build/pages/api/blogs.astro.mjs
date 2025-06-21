import { c as clientPromise } from '../../chunks/mongodb_BYzvVdGx.mjs';
export { renderers } from '../../renderers.mjs';

const BlogPostSchema = {
  title: {
    type: String,
    required: true
  },
  title_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: false
  },
  tags: {
    type: Array,
    required: false,
    default: []
  },
  categories: {
    type: Array,
    required: false,
    default: []
  },
  author: {
    type: String,
    required: true
  },
  authorImage: {
    type: String,
    required: false,
    default: null
  },
  authorImageType: {
    type: String,
    required: false,
    default: null
  },
  publishDate: {
    type: Date,
    required: true
  },
  isPublished: {
    type: Boolean,
    required: false,
    default: true
  },
  seoTitle: {
    type: String,
    required: false
  },
  seoDescription: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: false,
    default: new Date()
  }
};

function createBlogPost(data) {
  const generateTitleId = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  return {
    title: data.title,
    title_id: data.title_id || generateTitleId(data.title),
    content: data.content,
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    categories: data.categories || [],
    author: data.author,
    authorImage: data.authorImage || null,
    authorImageType: data.authorImageType || null,
    publishDate: data.publishDate || new Date(),
    isPublished: data.isPublished !== undefined ? data.isPublished : true,
    seoTitle: data.seoTitle || data.title,
    seoDescription: data.seoDescription || data.excerpt,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

const prerender = false;

async function GET() {
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

async function POST({ request }) {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
