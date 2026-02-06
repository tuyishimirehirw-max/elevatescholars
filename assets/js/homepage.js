// Homepage Featured Programs
async function loadFeaturedPrograms() {
  const container = document.getElementById('featured-programs-container');
  
  if (!container) return;
  
  try {
    const { data: programs, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(3);
    
    if (error) throw error;
    
    if (programs && programs.length > 0) {
      container.innerHTML = programs.map(program => `
        <div class="featured-card">
          <div class="featured-icon">${program.icon_emoji || '📚'}</div>
          <h3>${program.title}</h3>
          <p>${program.short_description}</p>
          <a href="programs/${program.slug}.html" class="btn-primary">Learn More</a>
        </div>
      `).join('');
    }
    
  } catch (error) {
    console.error('Error loading featured programs:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadFeaturedPrograms);