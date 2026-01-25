// ============================================
// ADMIN DASHBOARD
// The Voices Of Future Rwanda
// ============================================

class AdminDashboard {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadStats();
        await this.loadRecentRegistrations();
        await this.loadRecentContacts();
    }

    async loadStats() {
        try {
            // Total registrations
            const { count: totalReg } = await supabase
                .from('registrations')
                .select('*', { count: 'exact', head: true });

            document.getElementById('totalRegistrations').textContent = totalReg || 0;

            // Pending registrations
            const { count: pendingReg } = await supabase
                .from('registrations')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending');

            document.getElementById('pendingRegistrations').textContent = pendingReg || 0;

            // Active programs
            const { count: activeProgs } = await supabase
                .from('programs')
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true);

            document.getElementById('activePrograms').textContent = activeProgs || 0;

            // New contacts
            const { count: newCont } = await supabase
                .from('contacts')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'new');

            document.getElementById('newContacts').textContent = newCont || 0;

            // Registrations this week
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const { count: weeklyReg } = await supabase
                .from('registrations')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', oneWeekAgo.toISOString());

            document.getElementById('registrationsChange').textContent = weeklyReg || 0;

        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async loadRecentRegistrations() {
        const container = document.getElementById('recentRegistrations');

        try {
            const { data, error } = await supabase
                .from('registrations')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;

            if (!data || data.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: #64748b;">
                        <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>No registrations yet</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Program</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(reg => `
                            <tr>
                                <td>${this.escapeHtml(reg.first_name)} ${this.escapeHtml(reg.last_name)}</td>
                                <td>${this.formatProgram(reg.program)}</td>
                                <td>${this.escapeHtml(reg.email)}</td>
                                <td><span class="badge ${this.getStatusBadge(reg.status)}">${this.escapeHtml(reg.status)}</span></td>
                                <td>${this.formatDate(reg.created_at)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

        } catch (error) {
            console.error('Error loading recent registrations:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ef4444;">
                    <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Error loading registrations</p>
                </div>
            `;
        }
    }

    async loadRecentContacts() {
        const container = document.getElementById('recentContacts');

        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;

            if (!data || data.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: #64748b;">
                        <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>No contact messages yet</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Inquiry Type</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(contact => `
                            <tr>
                                <td>${this.escapeHtml(contact.name)}</td>
                                <td>${this.formatInquiryType(contact.inquiry_type)}</td>
                                <td>${this.escapeHtml(contact.email)}</td>
                                <td><span class="badge ${this.getStatusBadge(contact.status)}">${this.escapeHtml(contact.status)}</span></td>
                                <td>${this.formatDate(contact.created_at)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

        } catch (error) {
            console.error('Error loading recent contacts:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ef4444;">
                    <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Error loading contact messages</p>
                </div>
            `;
        }
    }

    formatProgram(slug) {
        const programs = {
            'junior-orators': 'Junior Orators',
            'global-scholars': 'Global Scholars',
            'executive': 'Executive Communicator',
            'executive-communicator': 'Executive Communicator'
        };
        return programs[slug] || slug;
    }

    formatInquiryType(type) {
        const types = {
            'enroll-individual': 'Individual Enrollment',
            'enroll-parent': 'Parent Enrollment',
            'school-partnership': 'School Partnership',
            'program-info': 'Program Info',
            'demo': 'Demo Request',
            'other': 'Other'
        };
        return types[type] || type;
    }

    getStatusBadge(status) {
        const badges = {
            'pending': 'badge-warning',
            'new': 'badge-warning',
            'approved': 'badge-success',
            'enrolled': 'badge-success',
            'read': 'badge-info',
            'responded': 'badge-success',
            'rejected': 'badge-danger',
            'cancelled': 'badge-secondary',
            'archived': 'badge-secondary'
        };
        return badges[status] || 'badge-secondary';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new AdminDashboard();
});
