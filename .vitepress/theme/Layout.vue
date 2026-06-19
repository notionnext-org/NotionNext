<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import GiscusComment from './components/GiscusComment.vue'
import HomeMotion from './components/HomeMotion.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <ClientOnly>
        <HomeMotion />
      </ClientOnly>
    </template>
    <template #doc-footer-before>
      <GiscusComment />
    </template>
  </Layout>
</template>
