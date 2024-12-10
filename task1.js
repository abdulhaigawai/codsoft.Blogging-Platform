// script.js

// API Endpoint (Replace with your backend endpoint if needed)
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM Elements
const postList = document.getElementById('post-list');
const createPostSection = document.getElementById('create-post');
const postForm = document.getElementById('post-form');
const homeLink = document.getElementById('home-link');
const createPostLink = document.getElementById('create-post-link');

// Fetch and Display Posts
async function fetchPosts() {
  const response = await fetch(API_URL);
  const posts = await response.json();

  // Display posts
  postList.innerHTML = '';
  posts.slice(0, 10).forEach(post => {
    const postElement = document.createElement('article');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    `;
    postList.appendChild(postElement);
  });
}

// Toggle Between Home and Create Post Sections
function toggleSection(sectionToShow) {
  postList.classList.toggle('hidden', sectionToShow !== 'post-list');
  createPostSection.classList.toggle('hidden', sectionToShow !== 'create-post');
}

// Handle Post Submission
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newPost = {
    title: document.getElementById('title').value,
    body: document.getElementById('content').value,
    userId: 1, // Hardcoded for now
  };

  // Send to API
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });

  const createdPost = await response.json();

  // Add the new post to the top of the list
  const postElement = document.createElement('article');
  postElement.innerHTML = `
    <h2>${createdPost.title}</h2>
    <p>${createdPost.body}</p>
  `;
  postList.prepend(postElement);

  // Reset form and navigate to Home
  postForm.reset();
  toggleSection('post-list');
});

// Navigation
homeLink.addEventListener('click', () => toggleSection('post-list'));
createPostLink.addEventListener('click', () => toggleSection('create-post'));

// Initial Load
fetchPosts();
// DOM Element
const aboutSection = document.getElementById('about');
const aboutLink = document.getElementById('about-link');

// Toggle Between Sections
function toggleSection(sectionToShow) {
  postList.classList.toggle('hidden', sectionToShow !== 'post-list');
  createPostSection.classList.toggle('hidden', sectionToShow !== 'create-post');
  aboutSection.classList.toggle('hidden', sectionToShow !== 'about');
}

// Event Listener for About Link
aboutLink.addEventListener('click', () => toggleSection('about'));