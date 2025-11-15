<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
import OneTimePopup from '@/components/OneTimePopup.vue'
</script>

<template>
    <div class="full-layout">
        <Header />
        <OneTimePopup />

        <main class="site-main">
            <div class="container">
                <router-view />
            </div>
        </main>

        <Footer />
    </div>
</template>

<style scoped lang="scss">
.full-layout {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px;
}

.site-main {
    flex: 1 0 auto;
    padding: 32px 0;
    background: #fff;
}
</style>