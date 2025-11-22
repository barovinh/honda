<script setup>
import { ref } from 'vue'
const open = ref(false)
function toggle() { open.value = !open.value }
</script>

<template>
    <header class="site-header" :class="{ opened: open }">
        <div class="container header-inner">
            <div class="brand">
                <router-link to="/">
                    <img src="https://www.honda.com.vn/images/logo_honda_v1.png?v=20251114" alt="HONDA Việt Nam"
                        class="brand-logo">
                </router-link>
            </div>

            <nav class="nav" :class="{ open: open }" aria-label="Main navigation">
                <router-link class="nav-link" to="/">Trang chủ</router-link>
                <router-link class="nav-link" to="/oto">Ô tô</router-link>
                <router-link class="nav-link" to="/contact">Liên hệ</router-link>
            </nav>

            <div class="header-actions">
                <button class="search-btn" aria-label="Tìm kiếm">
                    <img src="https://www.honda.com.vn/images/icon/icon_search.png" alt="search" />
                </button>
                <button class="menu-btn" @click="toggle" :aria-expanded="open" aria-label="Mở menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </div>
        </div>

        <div class="mobile-nav-backdrop" v-if="open" @click="toggle"></div>
    </header>
</template>

<style scoped lang="scss">
$primary-red: #C8102E;

.site-header {
    position: sticky;
    top: 0;
    z-index: 1200;
    background: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    transition: box-shadow 200ms ease, background 200ms ease;
}

.site-header.opened {
    box-shadow: 0 8px 24px rgba(12, 18, 30, 0.08);
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px;
}

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
}

.brand-logo {
    height: 40px;
    display: block;
}

.nav {
    display: flex;
    gap: 18px;
    align-items: center;
}

.nav-link {
    color: #111;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 500;
}

.nav-link:hover {
    color: $primary-red;
    background: rgba(200, 20, 30, 0.04);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.search-btn {
    background: transparent;
    border: 0;
    padding: 6px;
    cursor: pointer;
}

.search-btn img {
    width: 18px;
    height: 18px;
    filter: grayscale(1) contrast(0.9);
}

.menu-btn {
    display: none;
    width: 44px;
    height: 36px;
    border: 0;
    background: transparent;
    padding: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.menu-btn .bar {
    display: block;
    width: 22px;
    height: 2px;
    background: #111;
    margin: 4px 0;
    border-radius: 2px;
    transition: transform 180ms ease, opacity 180ms ease;
}

/* Mobile behaviour */
@media (max-width: 880px) {
    .nav {
        display: none;
    }

    .menu-btn {
        display: flex;
    }

    .site-header .header-inner {
        height: 64px;
    }

    .nav.open {
        display: flex;
        position: absolute;
        left: 0;
        right: 0;
        top: 64px;
        background: #fff;
        flex-direction: column;
        padding: 12px 16px;
        gap: 8px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    .mobile-nav-backdrop {
        position: fixed;
        inset: 64px 0 0 0;
        background: rgba(0, 0, 0, 0.28);
        z-index: 1100;
    }
}

@media (max-width: 420px) {
    .brand-logo {
        height: 34px;
    }

    .header-inner {
        padding: 0 8px;
    }
}
</style>
