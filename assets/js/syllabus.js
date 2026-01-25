// ============================================
// SYLLABUS PAGE - DYNAMIC LOADING
// The Voices Of Future Rwanda
// ============================================
// File: assets/js/syllabus.js

// Cache syllabus data to avoid multiple database calls
let allSyllabusData = [];
let currentLevel = 'all';

/**
 * Load and display syllabus content
 */
async function loadSyllabus(level = 'all') {
  const container = document.getElementById('syllabus-container');
  currentLevel = level;

  if (!container) {
    console.warn('Syllabus container not found on this page');
    return;
  }

  try {
    // Fetch data only on first load
    if (allSyllabusData.length === 0) {
      container.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading curriculum...</p>
        </div>
      `;

      const { data, error } = await supabase
        .from('syllabus')
        .select('*')
        .eq('is_active', true)
        .order('education_level', { ascending: true })
        .order('module_number', { ascending: true });

      if (error) throw error;
      
      allSyllabusData = data;
      console.log(`✅ Loaded ${data.length} syllabus modules`);
    }

    // Filter by level
    const filteredData = level === 'all'
      ? allSyllabusData
      : allSyllabusData.filter(item => item.education_level === level);

    // Clear container
    container.innerHTML = '';

    // Check if data exists
    if (!filteredData || filteredData.length === 0) {
      container.innerHTML = `
        <div class="no-data">
          <h3>No Curriculum Available</h3>
          <p>Content for this level is coming soon.</p>
        </div>
      `;
      return;
    }

    // Group by education level
    const groupedByLevel = groupByLevel(filteredData);

    // Render each level section
    Object.keys(groupedByLevel).forEach(levelName => {
      const levelSection = createLevelSection(levelName, groupedByLevel[levelName]);
      container.appendChild(levelSection);
    });

  } catch (error) {
    console.error('❌ Error loading syllabus:', error);
    container.innerHTML = `
      <div class="error-message">
        <h3>Unable to Load Curriculum</h3>
        <p>We're having trouble loading the content. Please try again.</p>
        <button onclick="loadSyllabus('${currentLevel}')" class="btn-retry">Retry</button>
      </div>
    `;
  }
}

/**
 * Group syllabus data by education level
 */
function groupByLevel(data) {
  return data.reduce((acc, item) => {
    if (!acc[item.education_level]) {
      acc[item.education_level] = [];
    }
    acc[item.education_level].push(item);
    return acc;
  }, {});
}

/**
 * Create a level section with all its modules
 */
function createLevelSection(levelName, modules) {
  const section = document.createElement('div');
  section.className = 'level-section';

  section.innerHTML = `
    <div class="level-header">
      <h2>${escapeHtml(levelName)} Level</h2>
      <p class="module-count">${modules.length} ${modules.length === 1 ? 'Module' : 'Modules'}</p>
    </div>
    <div class="modules-grid">
      ${modules.map(module => renderModule(module)).join('')}
    </div>
  `;

  return section;
}

/**
 * Render a single module card
 */
function renderModule(module) {
  return `
    <div class="module-card">
      <div class="module-header">
        ${module.badge_emoji ? `<span class="module-badge">${module.badge_emoji}</span>` : ''}
        <div class="module-title-wrap">
          <h4>Module ${module.module_number}: ${escapeHtml(module.module_title)}</h4>
          ${module.badge_name ? `<span class="badge-name">${escapeHtml(module.badge_name)}</span>` : ''}
        </div>
      </div>

      <div class="module-content">
        <div class="module-goal">
          <strong>🎯 Goal:</strong> ${escapeHtml(module.goal_description)}
        </div>

        ${module.hook_text ? `
          <div class="module-hook">
            <strong>💡 The Hook:</strong> ${escapeHtml(module.hook_text)}
          </div>
        ` : ''}

        ${module.video_url ? `
          <div class="module-video">
            <strong>📺 Watch:</strong>
            <a href="${escapeHtml(module.video_url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(module.video_title || 'Learning Video')}
            </a>
          </div>
        ` : ''}

        <div class="module-activity">
          <strong>🎤 Activity:</strong> ${escapeHtml(module.activity_title)}
          <p>${escapeHtml(module.activity_description)}</p>
        </div>

        ${module.submission_prompt ? `
          <div class="module-submission">
            <strong>✅ Submit:</strong> ${escapeHtml(module.submission_prompt)}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Setup filter button functionality
 */
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      // Load filtered data
      const level = e.target.dataset.level;
      loadSyllabus(level);
    });
  });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize on page load
if (document.getElementById('syllabus-container')) {
  document.addEventListener('DOMContentLoaded', () => {
    loadSyllabus();
    setupFilters();
  });
}