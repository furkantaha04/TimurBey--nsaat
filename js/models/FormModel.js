/**
 * FormModel - Form Verileri
 * MVC Model Katmanı
 */
class FormModel {
    constructor() {
        this.data = {
            name: '',
            phone: '',
            email: '',
            subject: '',
            message: ''
        };
        this.isSubmitting = false;
        this.isSubmitted = false;
        this.error = null;
    }

    setData(field, value) {
        if (this.data.hasOwnProperty(field)) {
            this.data[field] = value;
        }
    }

    getData() {
        return { ...this.data };
    }

    setFromFormData(formData) {
        this.data = {
            name: formData.get('name') || '',
            phone: formData.get('phone') || '',
            email: formData.get('email') || '',
            subject: formData.get('subject') || '',
            message: formData.get('message') || ''
        };
    }

    validate() {
        const errors = [];

        if (!this.data.name.trim()) {
            errors.push('Ad Soyad gerekli');
        }

        if (!this.data.email.trim()) {
            errors.push('E-posta gerekli');
        } else if (!this.isValidEmail(this.data.email)) {
            errors.push('Geçerli bir e-posta adresi girin');
        }

        if (!this.data.message.trim()) {
            errors.push('Mesaj gerekli');
        }

        return errors;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setSubmitting(status) {
        this.isSubmitting = status;
    }

    setSubmitted(status) {
        this.isSubmitted = status;
    }

    setError(error) {
        this.error = error;
    }

    reset() {
        this.data = {
            name: '',
            phone: '',
            email: '',
            subject: '',
            message: ''
        };
        this.isSubmitting = false;
        this.isSubmitted = false;
        this.error = null;
    }
}

export default FormModel;
