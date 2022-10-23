<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Footer from "@/views/Footer.vue";
</script>

<template>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- <Header /> -->
  <RouterView />
  <Footer />
</template>

<style scoped></style>
