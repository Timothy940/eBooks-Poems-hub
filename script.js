// TEMPORARY DEBUG - REMOVE LATER
console.log("Script connected!");
console.log("Menu button exists:", !!document.querySelector('.hamburger-btn'));
console.log("Sidebar exists:", !!document.querySelector('.dashboard-sidebar'));


// Dashboard Functionality
function initDashboard() {
  try {
    const toggleBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!toggleBtn || !closeBtn || !overlay) {
      throw new Error('Required dashboard elements not found');
    }

    toggleBtn.addEventListener('click', () => {
      console.log('Menu button clicked');
      document.body.classList.add('dashboard-active');
    });

    const closeSidebar = () => {
      console.log('Closing sidebar');
      document.body.classList.remove('dashboard-active');
    };

    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });

    console.log('Dashboard initialized successfully');
  } catch (error) {
    console.error('Dashboard initialization error:', error);
  }
}

// Lazy Loading Images
function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img.lazy-load');

  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Search Functionality
function initSearch() {
  const searchInput = document.getElementById('search');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      document.querySelectorAll('.ebook-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
      });
    });
  }
}

// Section Toggle Logic
function initSectionNavigation() {
  const navItems = document.querySelectorAll('[data-target]');
  const sections = document.querySelectorAll('[data-section]');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const target = item.getAttribute('data-target');
      
      // Let poems open in new page (do NOT prevent default)
      if (target === 'poems') {
        console.log('Navigating to poems.html...');
        return; // Allow natural navigation
      }

      // Prevent page reload for others
      e.preventDefault();
      console.log(`Navigating to: ${target}`);

      // Hide all sections
      sections.forEach(section => {
        section.style.display = 'none';
      });

      // Show selected section
      const targetSection = document.querySelector(`[data-section="${target}"]`);
      if (targetSection) {
        targetSection.style.display = 'block';
      }

      // Update body class for styling context
      document.body.className = target;

      // Always close sidebar after navigation
      document.body.classList.remove('dashboard-active');
    });
  });

  // Show home section by default on load
  const homeSection = document.querySelector('[data-section="home"]');
  if (homeSection) homeSection.style.display = 'block';
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');

  initDashboard();
  initLazyLoad();
  initSearch();
  initSectionNavigation();
  initBookSearch(); // Enables book search
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("custom-splash");

  setTimeout(() => {
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
    }, 500); // wait for fade-out
  }, 1000); // 1 second splash duration

  // Any other init logic goes here...
});

});
function initBookSearch() {
  const searchInput = document.getElementById('book-search');
  const books = document.querySelectorAll('.ebook-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();

    books.forEach(book => {
      const title = book.querySelector('h3').textContent.toLowerCase();
      const author = book.querySelector('.author').textContent.toLowerCase();
      book.style.display = (title.includes(keyword) || author.includes(keyword)) ? 'block' : 'none';
    });
  });
}
