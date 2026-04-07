let allPosts = [];

async function loadPosts() {
  const res = await fetch('posts/manifest.json');
  allPosts = await res.json();
  renderPosts(allPosts);
}

function renderPosts(list) {
  const container = document.getElementById('posts');
  container.innerHTML = '';

  list.forEach(post => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <div class="title">${post.title}</div>
      <div class="desc">${post.desc}</div>
    `;

    div.onclick = () => {
      window.location.href = `post.html?file=${post.file}`;
    };

    container.appendChild(div);
  });
}

function searchPosts() {
  const value = document.getElementById('search').value.toLowerCase();
  renderPosts(allPosts.filter(p => p.title.toLowerCase().includes(value)));
}

function filterPosts(category) {
  if (category === 'all') {
    renderPosts(allPosts);
  } else {
    const filtered = allPosts.filter(p => 
      p.category && p.category.toLowerCase().trim() === category
    );
    renderPosts(filtered);
  }
}

loadPosts();