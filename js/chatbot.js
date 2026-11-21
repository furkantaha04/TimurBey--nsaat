/**
 * TimurBey İnşaat - AI Chatbot
 * Gemini API ile çalışan yapay zeka asistanı
 * Backend: Netlify Functions (API key güvenli şekilde saklanır)
 */

class Chatbot {
    constructor() {
        this.isOpen = false;
        this.isLoading = false;
        this.messages = [];

        this.init();
    }

    init() {
        this.createChatWidget();
        this.bindEvents();
        this.addWelcomeMessage();
    }

    createChatWidget() {
        // Ana container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'chatbot-container';
        chatContainer.innerHTML = `
            <!-- Chatbot Toggle Button -->
            <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Asistan">
                <i class="fas fa-comments"></i>
                <span class="chatbot-pulse"></span>
            </button>

            <!-- Chat Window -->
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chatbot-header-text">
                            <h4>TimurBey Asistan</h4>
                            <span class="chatbot-status">
                                <span class="status-dot"></span>
                                Çevrimiçi
                            </span>
                        </div>
                    </div>
                    <button class="chatbot-close" id="chatbot-close" aria-label="Kapat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="chatbot-messages" id="chatbot-messages">
                    <!-- Mesajlar buraya eklenecek -->
                </div>

                <div class="chatbot-input-area">
                    <form id="chatbot-form">
                        <input 
                            type="text" 
                            id="chatbot-input" 
                            placeholder="Mesajınızı yazın..."
                            autocomplete="off"
                        >
                        <button type="submit" id="chatbot-send" aria-label="Gönder">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(chatContainer);

        // Element referansları
        this.container = chatContainer;
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.closeBtn = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.form = document.getElementById('chatbot-form');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
    }

    bindEvents() {
        // Toggle button
        this.toggleBtn.addEventListener('click', () => this.toggle());

        // Close button
        this.closeBtn.addEventListener('click', () => this.close());

        // Form submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        // ESC tuşu ile kapatma
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.window.classList.add('active');
        this.toggleBtn.classList.add('active');
        this.input.focus();
    }

    close() {
        this.isOpen = false;
        this.window.classList.remove('active');
        this.toggleBtn.classList.remove('active');
    }

    addWelcomeMessage() {
        this.addMessage(
            'Merhaba! 👋 Ben TimurBey İnşaat\'ın yapay zeka asistanıyım. Nasıl yardımcı olabilirim?',
            'bot'
        );
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;

        const time = new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                ${sender === 'bot' ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>' : ''}
                <div class="message-bubble">
                    <p>${this.formatMessage(text)}</p>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        this.messages.push({ text, sender, time });
    }

    formatMessage(text) {
        // Basit markdown desteği
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-bubble">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async sendMessage() {
        const message = this.input.value.trim();

        if (!message || this.isLoading) return;

        // Kullanıcı mesajını ekle
        this.addMessage(message, 'user');
        this.input.value = '';

        // Loading state
        this.isLoading = true;
        this.sendBtn.disabled = true;
        this.addTypingIndicator();

        try {
            // Netlify Functions'a istek gönder
            const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            this.removeTypingIndicator();

            if (response.ok && data.reply) {
                this.addMessage(data.reply, 'bot');
            } else {
                // Detaylı hata mesajı göster
                const errorMsg = data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.';
                this.addMessage(`⚠️ ${errorMsg}`, 'bot');
                console.error('API Response:', data);
            }

        } catch (error) {
            console.error('Chat error:', error);
            this.removeTypingIndicator();
            this.addMessage('❌ Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.', 'bot');
        } finally {
            this.isLoading = false;
            this.sendBtn.disabled = false;
            this.input.focus();
        }
    }
}

// Sayfa yüklendiğinde chatbot'u başlat
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
