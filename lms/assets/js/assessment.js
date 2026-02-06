/**
 * Assessment functionality for The Voices Of Future Rwanda LMS
 * Handles question navigation, timer, word counting, and submission
 */

let currentQuestionIndex = 1;
const totalQuestions = 5; // Update this based on actual number of questions
let timeRemaining = 45 * 60; // 45 minutes in seconds
let timerInterval;

// Initialize assessment
document.addEventListener('DOMContentLoaded', function () {
    startTimer();
    setupEventListeners();
    loadSavedProgress();
    updateProgress();
});

// Timer functionality
function startTimer() {
    timerInterval = setInterval(function () {
        timeRemaining--;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your assessment will be submitted automatically.');
            submitAssessment();
            return;
        }

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const timerElement = document.getElementById('timer');

        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            // Change color when time is running out
            if (timeRemaining <= 5 * 60) { // Last 5 minutes
                timerElement.style.color = 'var(--error)';
            } else if (timeRemaining <= 10 * 60) { // Last 10 minutes
                timerElement.style.color = 'var(--warning)';
            }
        }
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // Radio button change listeners
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function () {
            // Highlight selected option
            const options = this.closest('.answer-options').querySelectorAll('.answer-option');
            options.forEach(opt => opt.classList.remove('selected'));
            this.closest('.answer-option').classList.add('selected');

            // Auto-save
            saveProgress();
        });
    });

    // Essay word counter
    const essayTextarea = document.getElementById('essay1');
    const essayCounter = document.getElementById('essayCounter1');

    if (essayTextarea) {
        essayTextarea.addEventListener('input', function () {
            const text = this.value.trim();
            const words = text ? text.split(/\s+/).length : 0;

            essayCounter.textContent = `${words} / 250 words`;

            // Change color based on word count
            if (words > 250) {
                essayCounter.classList.add('error');
                essayCounter.classList.remove('warning');
            } else if (words > 225) {
                essayCounter.classList.add('warning');
                essayCounter.classList.remove('error');
            } else {
                essayCounter.classList.remove('error', 'warning');
            }

            // Auto-save
            saveProgress();
        });
    }
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestionIndex < totalQuestions) {
        document.getElementById(`question${currentQuestionIndex}`).style.display = 'none';
        currentQuestionIndex++;
        document.getElementById(`question${currentQuestionIndex}`).style.display = 'block';
        updateProgress();
        updateNavigationButtons();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestionIndex > 1) {
        document.getElementById(`question${currentQuestionIndex}`).style.display = 'none';
        currentQuestionIndex--;
        document.getElementById(`question${currentQuestionIndex}`).style.display = 'block';
        updateProgress();
        updateNavigationButtons();
    }
}

// Update progress bar and indicators
function updateProgress() {
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressPercent').textContent = Math.round(progress) + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex;
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Previous button
    prevBtn.disabled = currentQuestionIndex === 1;

    // Next/Submit buttons
    if (currentQuestionIndex === totalQuestions) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

// Save progress to localStorage
function saveProgress() {
    const answers = {};

    // Save MCQ and True/False answers
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        answers[radio.name] = radio.value;
    });

    // Save essay answers
    const essay1 = document.getElementById('essay1');
    if (essay1) {
        answers['essay1'] = essay1.value;
    }

    // Save current state
    const progressData = {
        answers: answers,
        currentQuestion: currentQuestionIndex,
        timeRemaining: timeRemaining,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('assessment_module_9_progress', JSON.stringify(progressData));

    // Show save confirmation
    const saveBtn = event?.target;
    if (saveBtn && saveBtn.textContent.includes('Save')) {
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-check"></i> <span>Saved!</span>';
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
        }, 2000);
    }
}

// Load saved progress
function loadSavedProgress() {
    const savedData = localStorage.getItem('assessment_module_9_progress');

    if (savedData) {
        const progressData = JSON.parse(savedData);

        // Restore answers
        Object.keys(progressData.answers).forEach(key => {
            if (key.startsWith('essay')) {
                const textarea = document.getElementById(key);
                if (textarea) {
                    textarea.value = progressData.answers[key];
                    textarea.dispatchEvent(new Event('input'));
                }
            } else {
                const radio = document.querySelector(`input[name="${key}"][value="${progressData.answers[key]}"]`);
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                }
            }
        });

        // Restore current question
        if (progressData.currentQuestion) {
            document.getElementById(`question${currentQuestionIndex}`).style.display = 'none';
            currentQuestionIndex = progressData.currentQuestion;
            document.getElementById(`question${currentQuestionIndex}`).style.display = 'block';
            updateProgress();
            updateNavigationButtons();
        }

        // Ask if user wants to continue
        if (confirm('You have a saved assessment in progress. Would you like to continue where you left off?')) {
            // Already restored above
        } else {
            localStorage.removeItem('assessment_module_9_progress');
            location.reload();
        }
    }
}

// Submit assessment
function submitAssessment() {
    // Validate all questions are answered
    const unanswered = [];

    for (let i = 1; i <= totalQuestions; i++) {
        const question = document.getElementById(`question${i}`);
        const questionType = question.querySelector('.question-type').textContent;

        if (questionType.includes('Essay')) {
            const textarea = question.querySelector('textarea');
            if (!textarea.value.trim()) {
                unanswered.push(i);
            } else {
                // Check word count
                const words = textarea.value.trim().split(/\s+/).length;
                if (words > 250) {
                    alert(`Question ${i}: Essay exceeds 250-word limit (${words} words). Please reduce before submitting.`);
                    return;
                }
            }
        } else {
            const radios = question.querySelectorAll('input[type="radio"]');
            const checked = Array.from(radios).some(r => r.checked);
            if (!checked) {
                unanswered.push(i);
            }
        }
    }

    if (unanswered.length > 0) {
        const proceed = confirm(`You have ${unanswered.length} unanswered question(s): ${unanswered.join(', ')}. Do you want to submit anyway?`);
        if (!proceed) return;
    }

    // Confirm submission
    if (!confirm('Are you sure you want to submit your assessment? You cannot change your answers after submission.')) {
        return;
    }

    // Stop timer
    clearInterval(timerInterval);

    // Collect all answers
    const submission = {
        assessmentId: 'module_9',
        studentId: JSON.parse(localStorage.getItem('lms_user')).id,
        answers: {},
        submittedAt: new Date().toISOString(),
        timeSpent: (45 * 60) - timeRemaining
    };

    // Collect answers
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        submission.answers[radio.name] = radio.value;
    });

    const essay1 = document.getElementById('essay1');
    if (essay1) {
        submission.answers['essay1'] = essay1.value;
    }

    // Save submission
    localStorage.setItem('assessment_module_9_submission', JSON.stringify(submission));

    // Clear progress
    localStorage.removeItem('assessment_module_9_progress');

    // Redirect to results page
    alert('Assessment submitted successfully! Redirecting to results...');
    window.location.href = 'module-9-results.html';
}
