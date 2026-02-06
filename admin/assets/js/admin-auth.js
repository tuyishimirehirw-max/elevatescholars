// ============================================
// ADMIN AUTHENTICATION
// The Voices Of Future Rwanda
// ============================================

class AdminAuth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    async init() {
        // Check authentication status
        await this.checkAuth();

        // Setup login form if on login page
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Setup logout buttons
        const logoutBtns = document.querySelectorAll('.btn-logout');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', () => this.logout());
        });
    }

    async checkAuth() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) throw error;

            const currentPage = window.location.pathname;
            const isLoginPage = currentPage.includes('index.html') || currentPage.endsWith('/admin/') || currentPage.endsWith('/admin');

            if (session) {
                // User is logged in
                this.currentUser = session.user;

                // Update last login time
                await supabase
                    .from('admin_profiles')
                    .update({ last_login: new Date().toISOString() })
                    .eq('id', session.user.id);

                // Redirect to dashboard if on login page
                if (isLoginPage) {
                    window.location.href = 'dashboard.html';
                }

                // Load user profile
                await this.loadUserProfile();

            } else {
                // User is not logged in
                if (!isLoginPage) {
                    // Redirect to login
                    window.location.href = 'index.html';
                }
            }
        } catch (error) {
            console.error('Auth check error:', error);
            // Redirect to login on error
            if (!window.location.pathname.includes('index.html')) {
                window.location.href = 'index.html';
            }
        }
    }

    async loadUserProfile() {
        if (!this.currentUser) return;

        try {
            const { data, error } = await supabase
                .from('admin_profiles')
                .select('*')
                .eq('id', this.currentUser.id)
                .single();

            if (error) throw error;

            // Update UI with user info
            const userNameEl = document.querySelector('.admin-user-name');
            const userRoleEl = document.querySelector('.admin-user-role');

            if (userNameEl) userNameEl.textContent = data.full_name;
            if (userRoleEl) userRoleEl.textContent = data.role === 'super_admin' ? 'Super Admin' : 'Admin';

        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('errorMessage');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Signing in...</span>';
        errorDiv.style.display = 'none';

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            console.log('✅ Login successful:', data.user.email);

            // Redirect to dashboard
            window.location.href = 'dashboard.html';

        } catch (error) {
            console.error('❌ Login error:', error);
            errorDiv.textContent = 'Invalid email or password. Please try again.';
            errorDiv.style.display = 'block';

            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }

    async logout() {
        if (!confirm('Are you sure you want to logout?')) return;

        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            console.log('✅ Logged out successfully');
            window.location.href = 'index.html';

        } catch (error) {
            console.error('❌ Logout error:', error);
            alert('Error logging out. Please try again.');
        }
    }

    // Helper method to get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Helper method to check if user is super admin
    async isSuperAdmin() {
        if (!this.currentUser) return false;

        try {
            const { data, error } = await supabase
                .from('admin_profiles')
                .select('role')
                .eq('id', this.currentUser.id)
                .single();

            if (error) throw error;
            return data.role === 'super_admin';

        } catch (error) {
            console.error('Error checking admin role:', error);
            return false;
        }
    }
}

// Initialize authentication
const adminAuth = new AdminAuth();

// Export for use in other scripts
window.adminAuth = adminAuth;
