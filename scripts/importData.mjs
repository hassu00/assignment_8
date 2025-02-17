import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-24',
});

// Function to upload an image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

// Function to import blog posts
async function importBlogPosts() {
  try {
    console.log('Fetching blog posts from API...');
    const response = await axios.get('https://fakestoreapi.com/products'); // Replace with your blog API URL
    const posts = response.data;

    console.log(`Fetched ${posts.length} blog posts`);

    for (const post of posts) {
      console.log(`Processing post: ${post.title}`);

      // Upload associated image to Sanity
      let imageRef = null;
      if (post.image) {
        imageRef = await uploadImageToSanity(post.image);
      }

      // Create blog post object for Sanity
      const sanityPost = {
        _type: 'post',
        title: post.title,
        content: post.description, // Map the description to content
        category: post.category ? [post.category] : [], // Map category
        publishedDate: new Date().toISOString(), // Add a publish date
        image: imageRef ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,
          },
        } : undefined,
      };

      console.log('Uploading blog post to Sanity:', sanityPost.title);
      const result = await client.create(sanityPost);
      console.log(`Blog post uploaded successfully: ${result._id}`);
    }

    console.log('Blog posts import completed successfully!');
  } catch (error) {
    console.error('Error importing blog posts:', error);
  }
}

// Start the import process
importBlogPosts();
