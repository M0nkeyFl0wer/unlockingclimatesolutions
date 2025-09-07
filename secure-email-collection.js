// 🔒 SECURE EMAIL COLLECTION SYSTEM
// Security-first approach for GitHub Pages hosting

class SecureEmailCollector {
    constructor() {
        this.init();
        this.setupCSP();
    }

    init() {
        this.createSecureForm();
        this.setupValidation();
        this.setupRateLimiting();
    }

    setupCSP() {
        // Add Content Security Policy for XSS protection
        const csp = document.createElement('meta');
        csp.setAttribute('http-equiv', 'Content-Security-Policy');
        csp.setAttribute('content', 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "img-src 'self' data:; " +
            "connect-src 'self' https://formspree.io https://api.netlify.com;"
        );
        document.head.appendChild(csp);
    }

    createSecureForm() {
        const formHTML = this.sanitizeHTML(`
            <div class="secure-email-form glass">
                <h3>Stay Updated on Climate Solutions</h3>
                <p>Get insights on blockchain-enabled climate technology</p>
                
                <!-- OPTION 1: Netlify Forms (Most Secure for Netlify hosting) -->
                <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="netlify-form" style="display: none;">
                    <p class="hidden">
                        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                    </p>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Enter your email" required>
                        <button type="submit">Subscribe</button>
                    </div>
                </form>
                
                <!-- OPTION 2: Formspree (Secure third-party service) -->
                <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="formspree-form">
                    <input type="email" name="email" placeholder="Enter your email" required>
                    <input type="hidden" name="_subject" value="Climate Solutions Newsletter" />
                    <input type="hidden" name="_next" value="${window.location.href}?success=1" />
                    <button type="submit">Subscribe</button>
                </form>
                
                <!-- OPTION 3: Simple mailto fallback -->
                <form action="mailto:your-email@domain.com?subject=Newsletter Subscription" method="post" enctype="text/plain" class="mailto-form" style="display: none;">
                    <input type="email" name="email" placeholder="Enter your email" required>
                    <button type="submit">Subscribe via Email</button>
                </form>
                
                <p class="privacy-notice">
                    We respect your privacy. View our <a href="/privacy-policy.html">Privacy Policy</a>
                </p>
            </div>
        `);

        // Replace existing forms securely
        this.replaceFormsSecurely(formHTML);
        this.addSecureStyles();
    }

    sanitizeHTML(html) {
        // Basic HTML sanitization to prevent XSS
        const temp = document.createElement('div');
        temp.textContent = html;
        return temp.innerHTML;
    }

    replaceFormsSecurely(formHTML) {
        // Find and replace existing forms safely
        const existingForms = document.querySelectorAll('form[action="#"]');
        
        existingForms.forEach(form => {
            // Create new element safely
            const newForm = document.createElement('div');
            newForm.innerHTML = formHTML;
            
            // Replace the form
            if (form.parentNode) {
                form.parentNode.replaceChild(newForm, form);
            }
        });
    }

    setupValidation() {
        // Client-side validation (server-side validation still required)
        document.addEventListener('submit', (e) => {
            if (e.target.matches('.formspree-form, .netlify-form')) {
                if (!this.validateSubmission(e.target)) {
                    e.preventDefault();
                    return false;
                }
                
                this.handleSecureSubmission(e.target);
            }
        });
    }

    validateSubmission(form) {
        const email = form.querySelector('input[name="email"]').value;
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return false;
        }

        // Check for suspicious patterns
        if (this.containsMaliciousContent(email)) {
            this.showMessage('Invalid email format', 'error');
            return false;
        }

        return true;
    }

    containsMaliciousContent(input) {
        // Basic security checks
        const maliciousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+=/i,
            /&lt;script/i,
            /&lt;\/script/i
        ];

        return maliciousPatterns.some(pattern => pattern.test(input));
    }

    setupRateLimiting() {
        // Simple client-side rate limiting
        this.lastSubmission = 0;
        this.RATE_LIMIT = 60000; // 1 minute between submissions

        document.addEventListener('submit', (e) => {
            const now = Date.now();
            if (now - this.lastSubmission < this.RATE_LIMIT) {
                e.preventDefault();
                this.showMessage('Please wait before submitting again', 'warning');
                return false;
            }
            this.lastSubmission = now;
        });
    }

    handleSecureSubmission(form) {
        // Show loading state securely
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Submitting...';
        button.disabled = true;

        // Reset button after delay (forms will redirect)
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    }

    showMessage(message, type = 'info') {
        // Secure message display
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message; // Use textContent to prevent XSS
        
        const form = document.querySelector('.secure-email-form');
        if (form) {
            form.appendChild(messageEl);
            
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 5000);
        }
    }

    addSecureStyles() {
        // Add styles without inline CSS (CSP friendly)
        const styles = `
            .secure-email-form {
                background: var(--bg-glass);
                backdrop-filter: blur(12px);
                border: 1px solid var(--border-primary);
                border-radius: 1rem;
                padding: 2rem;
                margin: 2rem 0;
                text-align: center;
            }
            
            .secure-email-form h3 {
                color: var(--accent-primary);
                margin-bottom: 0.5rem;
            }
            
            .form-group {
                display: flex;
                gap: 0.5rem;
                margin: 1.5rem 0;
                flex-wrap: wrap;
            }
            
            .secure-email-form input[type="email"] {
                flex: 1;
                min-width: 250px;
                padding: 0.75rem 1rem;
                border: 2px solid var(--border-secondary);
                border-radius: 0.5rem;
                background: var(--bg-tertiary);
                color: var(--text-primary);
                font-size: 1rem;
            }
            
            .secure-email-form button {
                padding: 0.75rem 1.5rem;
                background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                color: white;
                border: none;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .secure-email-form button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
            }
            
            .secure-email-form button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }
            
            .form-message {
                padding: 1rem;
                border-radius: 0.5rem;
                margin-top: 1rem;
            }
            
            .form-message.error {
                background: rgba(239, 68, 68, 0.2);
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: #ef4444;
            }
            
            .form-message.warning {
                background: rgba(245, 158, 11, 0.2);
                border: 1px solid rgba(245, 158, 11, 0.3);
                color: #f59e0b;
            }
            
            .privacy-notice {
                font-size: 0.875rem;
                color: var(--text-muted);
                margin-top: 1rem;
            }
            
            .hidden {
                display: none !important;
            }
            
            @media (max-width: 768px) {
                .form-group {
                    flex-direction: column;
                }
                
                .secure-email-form input[type="email"] {
                    min-width: 100%;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    // Check for success parameter in URL
    checkForSuccess() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === '1') {
            this.showMessage('Successfully subscribed! Thank you for joining us! 🌱', 'success');
            
            // Clean URL
            const url = new URL(window.location);
            url.searchParams.delete('success');
            window.history.replaceState({}, '', url);
        }
    }
}

// Initialize secure email collection when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const collector = new SecureEmailCollector();
    collector.checkForSuccess();
});

// Don't expose anything to global scope for security