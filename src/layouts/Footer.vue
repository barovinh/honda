<script setup>
const year = new Date().getFullYear()
</script>

<template>
    <footer class="site-footer">
        <div class="container footer-inner">
            <div class="left">© {{ year }} Honda — All rights reserved.</div>
            <div class="right">
                <a href="#" class="footer-link">Privacy</a>
                <a href="#" class="footer-link">Terms</a>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.site-footer {
    background: linear-gradient(90deg, #0b1220 0%, #17233a 100%);
    color: rgba(255, 255, 255, 0.85);
    border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    max-width: 1100px;
    margin: 0 auto;
    padding: 12px 16px;
}

.footer-link {
    color: rgba(255, 255, 255, 0.7);
    margin-left: 12px;
    text-decoration: none;
}

.footer-link:hover {
    color: #fff;
}

@media (max-width:640px) {
    .footer-inner {
        flex-direction: column;
        gap: 8px;
        text-align: center;
    }
}
</style>
