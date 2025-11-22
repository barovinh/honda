<script setup>
import { ref, computed, onMounted } from 'vue'

const visible = ref(true)
const name = ref('')
const phone = ref('')
const email = ref('')
const isSending = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')
const showThankYou = ref(false)

function close() { visible.value = false }

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const phoneValid = computed(() => /^\+?[0-9\s\-]{7,15}$/.test(phone.value))
const nameValid = computed(() => name.value.trim().length >= 2)
const formValid = computed(() => nameValid.value && phoneValid.value && emailValid.value)

async function submitForm() {
    if (!formValid.value || isSending.value) return
    isSending.value = true
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID || ''
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID || ''
    const USER_ID = import.meta.env.VITE_USER_ID || ''

    console.log('Using EmailJS config:', { SERVICE_ID, TEMPLATE_ID, USER_ID })
    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
        toastMessage.value = 'Missing email configuration. Please set env keys.'
        toastVisible.value = true
        isSending.value = false
        setTimeout(() => (toastVisible.value = false), 4000)
        return
    }

    // Prepare payload for EmailJS REST API
    const payload = {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: USER_ID,
        template_params: {
            title: 'Phản hồi khách hàng',
            name: name.value,
            phone: phone.value,
            email: email.value
        }
    }

    try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            throw new Error('Email send failed')
        }

        toastMessage.value = 'Submit successfully'
        toastVisible.value = true
        visible.value = false
        showThankYou.value = true

        setTimeout(() => (toastVisible.value = false), 3000)

        setTimeout(() => (showThankYou.value = false), 2500)
    } catch (err) {
        console.error(err)
        toastMessage.value = 'Submit failed. Please try again.'
        toastVisible.value = true
        setTimeout(() => (toastVisible.value = false), 3000)
    } finally {
        isSending.value = false
    }
}

onMounted(() => {
    // keep visible true; user will close or submit. No localStorage so it reappears after full refresh.
})
</script>

<template>
    <transition name="popup-fade">
        <div v-if="visible" class="popup-overlay" role="dialog" aria-modal="true">
            <div class="popup-panel">
                <button class="popup-close" @click="close" aria-label="Đóng">✕</button>
                <div class="popup-hero">
                    <h3>Đăng ký nhận tin</h3>
                    <p>Nhập thông tin để nhận ưu đãi và bản tin từ Honda.</p>
                </div>

                <form class="popup-form" @submit.prevent="submitForm">
                    <label>
                        Họ và tên
                        <input v-model="name" type="text" placeholder="Nguyễn Văn A" required />
                    </label>

                    <label>
                        Số điện thoại
                        <input v-model="phone" type="tel" placeholder="+84 9xxxxxxx" required />
                    </label>

                    <label>
                        Email
                        <input v-model="email" type="email" placeholder="email@example.com" required />
                    </label>

                    <div class="actions">
                        <button type="button" class="btn btn-ghost" @click="close">Đóng</button>
                        <button type="submit" class="btn btn-primary" :disabled="!formValid || isSending">
                            <span v-if="!isSending">Gửi</span>
                            <span v-else>Đang gửi...</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>

    <!-- Toast -->
    <transition name="toast-fade">
        <div v-if="toastVisible" class="popup-toast">{{ toastMessage }}</div>
    </transition>

    <!-- Thank you small modal -->
    <transition name="popup-fade">
        <div v-if="showThankYou" class="thank-overlay" role="status">
            <div class="thank-panel">
                <div class="bow-icon" aria-hidden>
                    <!-- simple bow icon -->
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12c2 0 4-1 5-2.5S16 6 12 6s-5 2.5-5 3.5S10 12 12 12z" fill="#C8102E" />
                        <path d="M6 12c-1 2-1 4 0 6s4 2 6 0s4-2 6 0s1-4 0-6" stroke="#C8102E" stroke-width="0.8"
                            fill="none" />
                    </svg>
                </div>
                <h4>Thank you</h4>
            </div>
        </div>
    </transition>
</template>

<style scoped lang="scss">
$primary: #C8102E;
/* Honda red */
$accent: #0b84ff;

.popup-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(3, 7, 18, 0.5);
    z-index: 1400;
    padding: 24px;
}

.popup-panel {
    width: 100%;
    max-width: 520px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(2, 6, 23, 0.2);
    position: relative;
    overflow: hidden;
}

.popup-close {
    position: absolute;
    right: 12px;
    top: 10px;
    border: 0;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
}

.popup-hero {
    background: linear-gradient(90deg, $primary 0%, darken($primary, 6%) 100%);
    color: #fff;
    padding: 18px 20px;
}

.popup-hero h3 {
    margin: 0 0 6px;
    font-size: 1.125rem;
}

.popup-hero p {
    margin: 0;
    font-size: 0.92rem;
    opacity: 0.95
}

.popup-form {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.popup-form label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    color: #222;
}

.popup-form input {
    margin-top: 6px;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    font-size: 0.95rem;
}

.actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 6px;
}

.btn {
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}

.btn-ghost {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.08);
}

.btn-primary {
    background: $primary;
    color: #fff;
    border: 0;
}

.btn-primary[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}

/* transition */
.popup-fade-enter-active,
.popup-fade-leave-active {
    transition: opacity 200ms ease, transform 200ms ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

@media (max-width:420px) {
    .popup-panel {
        max-width: 92%;
        border-radius: 10px;
    }

    .popup-hero h3 {
        font-size: 1rem
    }
}

/* Toast */
.popup-toast {
    position: fixed;
    top: 18px;
    right: 18px;
    background: rgba(17, 17, 17, 0.9);
    color: #fff;
    padding: 10px 14px;
    border-radius: 8px;
    z-index: 1600;
    box-shadow: 0 6px 20px rgba(2, 6, 23, 0.2);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
    transition: opacity 240ms ease, transform 240ms ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

/* Thank you */
.thank-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1500;
    pointer-events: none;
}

.thank-panel {
    pointer-events: auto;
    background: #fff;
    border-radius: 12px;
    padding: 18px 22px;
    display: flex;
    gap: 12px;
    align-items: center;
    box-shadow: 0 12px 40px rgba(2, 6, 23, 0.18);
    text-align: center;
}

.thank-panel h4 {
    margin: 0;
    font-size: 1.05rem;
    color: #111;
}

.bow-icon svg {
    display: block;
}
</style>
