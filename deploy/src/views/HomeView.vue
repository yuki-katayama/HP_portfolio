<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import VoiceView from "./top/VoiceView.vue";
import ValueView from "./top/ValueView.vue";
import ProfileView from "./top/ProfileView.vue";
import AchivementView from "./top/AchivementView.vue";
import FormView from "./top/FormView.vue";
import NewsView from "./top/NewsView.vue";
import { onMounted, ref, onUpdated } from "vue";
import fadeInListener from "./../functions/fadein";

onMounted(() => {
  fadeInListener();
});
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <body>
      <figure>
        <img
          class="only_pc"
          src="../assets/images/top_pc.jpg"
          style="width: 100%"
        />
        <img
          class="only_sp"
          src="../assets/images/top_sp.jpg"
          style="width: 100%"
        />
      </figure>
      <VoiceView />
      <ValueView />
      <ProfileView />
      <AchivementView />
      <NewsView />
      <FormView />
    </body>
  </main>
</template>

<style scoped>
/* @import "../layouts/css/top.css"; */
</style>
