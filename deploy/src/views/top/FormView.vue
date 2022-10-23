<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import * as models from "@/models/models";

const form = ref<models.SesModel>({ name: "", email: "", content: "" });

const validate = () => {
  let error = "";
  if (form.value.name === "") {
    error = "名前を入力してください";
  } else if (form.value.email === "") {
    error = "メールを入力してください";
  } else if (form.value.content === "") {
    error = "内容を入力してください";
  }
  if (error !== "") {
    alert(error);
    return true;
  }
  return false;
};
const fetchApi = async () => {
  if (validate()) {
    return;
  }
  await axios
    .post(
      "https://f8ixp428m6.execute-api.ap-northeast-1.amazonaws.com/get/send",
      JSON.stringify(form.value),
      { headers: { "Content-Type": "application/json" } }
    )
    .then(
      (response) => (alert("送信に成功しました"), console.log(response.data))
    )
    .catch((error) => console.log(error));
};
</script>
<template>
  <article class="form">
    <h2 class="title">Form</h2>
    <div class="form_container">
      <div class="form_input">
        <input placeholder="名前" v-model="form.name" />
      </div>
      <div class="form_input">
        <input name="email" placeholder="メールアドレス" v-model="form.email" />
      </div>
      <div class="form_input">
        <textarea
          placeholder="お問い合わせ本文"
          v-model="form.content"
        ></textarea>
      </div>
      <div class="submit">
        <button :onclick="fetchApi">送信する</button>
      </div>
    </div>
  </article>
</template>
<style scoped>
@import "@/layouts/css/form_style.css";
</style>
