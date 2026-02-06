// ============================================
// PROGRAMS PAGE - DYNAMIC LOADING
// The Voices Of Future Rwanda
// ============================================
// File: assets/js/programs.js

/**
 * Load and display all active programs from Supabase
 */
async function loadPrograms() {
  const container = document.getElementById('programs-container');
  
  if (!container) {
    console.warn('Programs container not found on this page');
    return;
  }

  try {
    // Show loading state
    container.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading programs...</p>
      </div>
    `;

    // Fetch programs from Supabase
    const { data: programs, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;

    // Clear loading state
    container.innerHTML = '';

    // Check if programs exist
    if (!programs || programs.length === 0) {
      container.innerHTML = `
        <div class="no-data">
          <p>No programs available at this time.</p>
          <p>Please check back soon!</p>
        </div>
      `;
      return;
    }

    // Render each program
    programs.forEach((program) => {
      const programCard = createProgramCard(program);
      container.appendChild(programCard);
    });

    console.log(`✅ Loaded ${programs.length} programs`);

  } catch (error) {
    console.error('❌ Error loading programs:', error);
    container.innerHTML = `
      <div class="error-message">
        <h3>Unable to Load Programs</h3>
        <p>We're having trouble connecting to our database. Please try again later.</p>
        <button onclick="loadPrograms()" class="btn-retry">Retry</button>
      </div>
    `;
  }
}

/**
 * Create a program card element
 */
function createProgramCard(program) {
  const card = document.createElement('div');
  card.className = 'program-card';
  
  if (program.is_featured) {
    card.classList.add('featured');
  }

  card.innerHTML = `
    ${program.is_featured ? '<span class="badge-featured">Most Popular</span>' : ''}
    
    <div class="program-icon">${program.icon_emoji || '📚'}</div>
    
    <h3>${escapeHtml(program.title)}</h3>
    
    ${program.age_range ? `<p class="age-range">📅 ${escapeHtml(program.age_range)}</p>` : ''}
    
    ${program.education_level ? `<p class="program-level">${escapeHtml(program.education_level)}</p>` : ''}
    
    ${program.short_description ? `<p class="program-description">${escapeHtml(program.short_description)}</p>` : ''}
    
    ${program.features && program.features.length > 0 ? `
      <ul class="program-features">
        ${program.features.slice(0, 3).map(feature => 
          `<li>✓ ${escapeHtml(feature)}</li>`
        ).join('')}
        ${program.features.length > 3 ? '<li class="more">+ more...</li>' : ''}
      </ul>
    ` : ''}
    
    <div class="program-meta">
      ${program.duration_weeks ? `<span class="duration">📆 ${program.duration_weeks} weeks</span>` : ''}
      ${program.modules_count ? `<span class="modules">📖 ${program.modules_count} modules</span>` : ''}
    </div>
    
    <a href="programs/${program.slug}.html" class="btn-primary">Learn More</a>
  `;

  return card;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize when DOM is ready
if (document.getElementById('programs-container')) {
  document.addEventListener('DOMContentLoaded', loadPrograms);
}