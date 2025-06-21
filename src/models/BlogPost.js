export const BlogPostSchema = {
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

export function createBlogPost(data) {
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