/**
 * FormController - Form Kontrolcüsü
 * MVC Controller Katmanı
 */
import FormModel from '../models/FormModel.js';
import FormView from '../views/FormView.js';

class FormController {
    constructor() {
        this.view = new FormView();
        this.model = new FormModel();

        if (this.view.hasForm()) {
            this.init();
        }
    }

    init() {
        this.setupFormSubmit();
    }

    setupFormSubmit() {
        const form = this.view.getForm();

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    async handleSubmit() {
        const form = this.view.getForm();
        const formData = new FormData(form);

        // Model'e verileri set et
        this.model.setFromFormData(formData);
        this.model.setSubmitting(true);

        // Loading göster
        this.view.showLoading();

        try {
            // Netlify'a gönder
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                this.model.setSubmitted(true);
                this.view.showSuccess();
                this.view.resetForm();
            } else {
                throw new Error('Form gönderilemedi');
            }
        } catch (error) {
            this.model.setError(error.message);
            this.view.showError();
            console.error('Form gönderim hatası:', error);
        } finally {
            this.model.setSubmitting(false);

            // 3 saniye sonra butonu eski haline getir
            setTimeout(() => {
                this.view.reset();
                this.model.reset();
            }, 3000);
        }
    }
}

export default FormController;
