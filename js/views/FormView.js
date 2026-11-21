/**
 * FormView - Form Görünümü
 * MVC View Katmanı
 */
class FormView {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.submitBtn = this.form ? this.form.querySelector('button[type="submit"]') : null;
        this.originalBtnText = this.submitBtn ? this.submitBtn.innerHTML : '';
    }

    showLoading() {
        if (this.submitBtn) {
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            this.submitBtn.disabled = true;
        }
    }

    showSuccess() {
        if (this.submitBtn) {
            this.submitBtn.innerHTML = '✓ Mesajınız Gönderildi!';
            this.submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        }
    }

    showError() {
        if (this.submitBtn) {
            this.submitBtn.innerHTML = '✗ Hata oluştu, tekrar deneyin';
            this.submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        }
    }

    reset() {
        if (this.submitBtn) {
            this.submitBtn.innerHTML = this.originalBtnText;
            this.submitBtn.style.background = '';
            this.submitBtn.disabled = false;
        }
    }

    resetForm() {
        if (this.form) {
            this.form.reset();
        }
    }

    getForm() {
        return this.form;
    }

    getSubmitBtn() {
        return this.submitBtn;
    }

    hasForm() {
        return this.form !== null;
    }
}

export default FormView;
