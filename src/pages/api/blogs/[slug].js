import clientPromise from '../../../lib/mongodb.js';

export const prerender = false;

export async function GET({ params }) {
  const { slug } = params;
  
  try {
    const client = await clientPromise;
    const db = client.db("blogDatabase");
    const collection = db.collection("posts");
    
    const blog = await collection.findOne({ title_id: slug });
    
    if (!blog) {
      return new Response(JSON.stringify({
        success: false, 
        error: 'Blog post not found'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false, 
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function PUT({ params, request }) {
  const { slug } = params;
  
  try {
    const blogData = await request.json();
    delete blogData._id;
    
    const client = await clientPromise;
    const db = client.db("blogDatabase");
    const collection = db.collection("posts");
    
    const result = await collection.findOneAndUpdate(
      { title_id: slug },
      { 
        $set: {
          ...blogData,
          updatedAt: new Date(),
          publishDate: new Date(blogData.publishDate)
        }
      },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return new Response(JSON.stringify({
        success: false, 
        error: 'Blog post not found'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: result
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return new Response(JSON.stringify({
      success: false, 
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function DELETE({ params }) {
  const { slug } = params;
  
  try {
    const client = await clientPromise;
    const db = client.db("blogDatabase");
    const collection = db.collection("posts");
    
    const result = await collection.deleteOne({ title_id: slug });
    
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({
        success: false, 
        error: 'Blog post not found'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new Response(JSON.stringify({
      success: false, 
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}