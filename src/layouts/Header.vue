<script setup>
</script>

<template>
    <header class="site-header">
        <div class="container header-inner">
            <div class="brand">Honda</div>
            <nav class="nav">
                <router-link to="/" class="nav-link">Trang chủ</router-link>
                <router-link to="/oto" class="nav-link">Oto</router-link>
                <router-link to="/contact" class="nav-link">Liên hệ</router-link>
            </nav>
        </div>
    </header>
</template>

<style scoped lang="scss">
.site-header {
    background: linear-gradient(90deg, #0f172a 0%, #0b84ff 100%);
    color: #fff;
    box-shadow: 0 2px 6px rgba(11, 24, 64, 0.12);
    position: sticky;
    top: 0;

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
    height: 68px;
}

.brand {
    font-weight: 700;
    font-size: 1.125rem;
}

.nav {
    display: flex;
    gap: 12px;
    align-items: center;
}

.nav-link {
    color: rgba(255, 255, 255, 0.95);
    text-decoration: none;
    padding: 8px 10px;
    border-radius: 6px;
    font-weight: 500;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.06);
}

@media (max-width: 640px) {
    .nav {
        display: none;
    }

    .header-inner {
        height: 56px;
    }
}
</style>
