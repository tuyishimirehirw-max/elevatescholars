// Registration Form Multi-Step Logic
class RegistrationForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.formData = {};

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgressBar();
    }

    setupEventListeners() {
        // Next/Previous buttons
        document.querySelectorAll('.btn-next').forEach(btn => {
            btn.addEventListener('click', () => this.nextStep());
        });

        document.querySelectorAll('.btn-previous').forEach(btn => {
            btn.addEventListener('click', () => this.previousStep());
        });

        // Radio option visual selection
        document.querySelectorAll('.radio-option').forEach(option => {
            option.addEventListener('click', function () {
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;

                // Remove selected class from siblings
                this.parentElement.querySelectorAll('.radio-option').forEach(opt => {
                    opt.classList.remove('selected');
                });

                // Add selected class to this option
                this.classList.add('selected');

                // Trigger conditional field display
                registrationForm.handleConditionalFields();
            });
        });

        // Payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function () {
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;

                // Remove selected class from siblings
                this.parentElement.querySelectorAll('.payment-method').forEach(m => {
                    m.classList.remove('selected');
                });

                // Add selected class
                this.classList.add('selected');
            });
        });

        // Form submission
        const form = document.getElementById('registrationForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    nextStep() {
        if (this.validateStep(this.currentStep)) {
            this.saveStepData(this.currentStep);

            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgressBar();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgressBar();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Update summary if on final step
        if (stepNumber === this.totalSteps) {
            this.updateSummary();
        }
    }

    updateProgressBar() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const stepNumber = index + 1;

            step.classList.remove('active', 'completed');

            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
            }
        });
    }

    validateStep(stepNumber) {
        const stepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (!stepElement) return true;

        let isValid = true;
        const requiredFields = stepElement.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');

            // Clear previous errors
            formGroup.classList.remove('has-error');
            field.classList.remove('error');

            // Check if field is filled
            if (!field.value.trim() && field.type !== 'radio' && field.type !== 'checkbox') {
                isValid = false;
                formGroup.classList.add('has-error');
                field.classList.add('error');
            }

            // Special validation for radio buttons
            if (field.type === 'radio') {
                const radioGroup = stepElement.querySelector(`input[name="${field.name}"]:checked`);
                if (!radioGroup) {
                    isValid = false;
                    formGroup.classList.add('has-error');
                }
            }

            // Email validation
            if (field.type === 'email' && field.value) {
                if (!this.validateEmail(field.value)) {
                    isValid = false;
                    formGroup.classList.add('has-error');
                    field.classList.add('error');
                }
            }

            // Phone validation
            if (field.name === 'phone' || field.name === 'whatsapp') {
                if (!this.validatePhone(field.value)) {
                    isValid = false;
                    formGroup.classList.add('has-error');
                    field.classList.add('error');
                }
            }

            // Date validation (must be in the past for DOB)
            if (field.type === 'date' && field.name === 'dob') {
                const selectedDate = new Date(field.value);
                const today = new Date();
                if (selectedDate >= today) {
                    isValid = false;
                    formGroup.classList.add('has-error');
                    field.classList.add('error');
                }
            }
        });

        if (!isValid) {
            // Show error alert
            this.showAlert('error', 'Please fill in all required fields correctly.');
        }

        return isValid;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePhone(phone) {
        // Rwanda phone format: +250 XXX XXX XXX or 07XX XXX XXX
        const re = /^(\+250|0)[7][0-9]{8}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    saveStepData(stepNumber) {
        const stepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (!stepElement) return;

        const inputs = stepElement.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) {
                    this.formData[input.name] = input.value;
                }
            } else if (input.type === 'checkbox') {
                if (!this.formData[input.name]) {
                    this.formData[input.name] = [];
                }
                if (input.checked) {
                    this.formData[input.name].push(input.value);
                }
            } else {
                this.formData[input.name] = input.value;
            }
        });
    }

    handleConditionalFields() {
        const userType = document.querySelector('input[name="userType"]:checked');

        if (userType) {
            // Show/hide fields based on user type
            const parentFields = document.getElementById('parentFields');
            const schoolFields = document.getElementById('schoolFields');

            if (parentFields) parentFields.style.display = 'none';
            if (schoolFields) schoolFields.style.display = 'none';

            if (userType.value === 'parent' && parentFields) {
                parentFields.style.display = 'block';
            } else if (userType.value === 'school' && schoolFields) {
                schoolFields.style.display = 'block';
            }
        }
    }

    updateSummary() {
        // User Type
        const userTypeValue = this.formData.userType || 'Not specified';
        this.updateSummaryField('summaryUserType', this.formatUserType(userTypeValue));

        // Student Name
        const studentName = `${this.formData.firstName || ''} ${this.formData.lastName || ''}`.trim();
        this.updateSummaryField('summaryStudentName', studentName || 'Not specified');

        // Program
        const programValue = this.formData.program || 'Not specified';
        this.updateSummaryField('summaryProgram', this.formatProgram(programValue));

        // Contact
        const email = this.formData.email || 'Not specified';
        this.updateSummaryField('summaryEmail', email);

        const phone = this.formData.phone || 'Not specified';
        this.updateSummaryField('summaryPhone', phone);

        // Payment Method
        const paymentMethod = this.formData.paymentMethod || 'Not specified';
        this.updateSummaryField('summaryPayment', this.formatPaymentMethod(paymentMethod));
    }

    updateSummaryField(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    formatUserType(value) {
        const types = {
            'parent': 'Parent Enrolling Child',
            'school': 'School Representative',
            'individual': 'Individual Student'
        };
        return types[value] || value;
    }

    formatProgram(value) {
        const programs = {
            'junior-orators': 'Junior Orators (Ages 7-12)',
            'global-scholars': 'High School (Ages 13-18)',
            'executive': 'University & Professional (18+)'
        };
        return programs[value] || value;
    }

    formatPaymentMethod(value) {
        const methods = {
            'mtn-momo': 'MTN Mobile Money',
            'airtel-money': 'Airtel Money',
            'bank-transfer': 'Bank Transfer',
            'card': 'Credit/Debit Card'
        };
        return methods[value] || value;
    }

    showAlert(type, message) {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        // Create new alert
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;

        const icon = type === 'error' ? 'fa-exclamation-circle' :
            type === 'success' ? 'fa-check-circle' :
                type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';

        alert.innerHTML = `
      <i class="fas ${icon}"></i>
      <div>${message}</div>
    `;

        const currentStep = document.querySelector('.form-step.active');
        if (currentStep) {
            currentStep.insertBefore(alert, currentStep.firstChild);
        }

        // Auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Final validation
        if (!this.validateStep(this.totalSteps - 1)) {
            return;
        }

        // Save final step data
        this.saveStepData(this.totalSteps - 1);

        // Check terms agreement
        const termsAgreed = document.getElementById('agreeTerms');
        if (!termsAgreed || !termsAgreed.checked) {
            this.showAlert('error', 'Please agree to the terms and conditions to continue.');
            return;
        }

        // Show loading state
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="spinner"></div> Processing...';

        try {
            // Simulate API call (replace with actual API endpoint)
            await this.submitToServer(this.formData);

            // Show success
            this.showSuccessPage();
        } catch (error) {
            // Show error
            this.showAlert('error', 'An error occurred during registration. Please try again or contact support.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    async submitToServer(data) {
        try {
            // Prepare data for Supabase
            const registrationData = {
                user_type: data.userType,
                first_name: data.firstName,
                last_name: data.lastName,
                date_of_birth: data.dob,
                gender: data.gender,
                school: data.school,
                grade_level: data.gradeLevel,
                email: data.email,
                phone: data.phone,
                whatsapp: data.whatsapp,
                parent_name: data.parentName || null,
                parent_email: data.parentEmail || null,
                parent_phone: data.parentPhone || null,
                school_name: data.schoolName || null,
                school_size: data.schoolSize || null,
                school_role: data.schoolRole || null,
                program: data.program,
                goals: data.goals,
                experience: data.experience || null,
                how_heard: data.howHeard || null,
                payment_method: data.paymentMethod,
                agreed_to_terms: true,
                status: 'pending'
            };

            console.log('Submitting registration to database...', registrationData);

            // Insert into Supabase
            const { data: result, error } = await supabase
                .from('registrations')
                .insert([registrationData])
                .select();

            if (error) {
                console.error('Supabase error:', error);
                throw new Error(error.message);
            }

            console.log('✅ Registration successful:', result);
            
            // Optional: Send confirmation email via Supabase Edge Function
            // This would require setting up an Edge Function in Supabase
            // await this.sendConfirmationEmail(data.email, result[0].id);
            
            return { success: true, data: result };
            
        } catch (error) {
            console.error('❌ Registration submission error:', error);
            throw error;
        }
    }

    showSuccessPage() {
        // Hide form
        document.querySelector('.registration-container').style.display = 'none';

        // Show success message
        const successPage = document.getElementById('successPage');
        if (successPage) {
            successPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

// Initialize registration form when DOM is ready
let registrationForm;

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('registrationForm')) {
        registrationForm = new RegistrationForm();
    }
});
