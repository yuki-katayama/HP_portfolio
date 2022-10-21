<script setup lang="ts"></script>
<template>
  <article class="achivement">
    <h2 class="title">ACHIVEMENT</h2>
    <section class="box box_odd fade_in_bottom">
      <figure class="left">
        <img src="@/assets/images/achivement1.jpg" width="100%" />
      </figure>
      <div class="right">
        <h3 class="box_title">請戸小学校</h3>
        <p>
          2011年3月11日・東日本大震災、未だかつて経験したことのない大地震・大
          津波。倒壊を免れた校舎に刻まれた脅威と、全員避難することができた経験
          を伝えるため、2021年より震災遺構として一般公開いたしました。訪れた人
          の、“自分事として震災をとらえ、防災について考えるきっかけ”になれば幸
          いです。
        </p>
        <div class="box_odd_button">
          <!-- <label class="button" for="pop-up1">
									PREVIEW !
								</label> -->
          <a
            class="button"
            href="https://namie-ukedo.com/"
            target="_blank"
            rel="noopener noreferrer"
            >PREVIEW !</a
          >
        </div>
      </div>
    </section>
    <section class="box_rev box_even fade_in_bottom">
      <figure class="left">
        <img src="@/assets/images/achivement2.jpg" width="100%" />
      </figure>
      <div class="right">
        <h3 class="box_title">キャリア・キャディ</h3>
        <p>
          人生100年時代のいま、次の活躍の「場」へ進むための助言をもらう「キャ
          リア・キャディー」をつけるという、ご提案。次の「場」に向かってナイスショット
          を決めるための助言を「キャリア・キャディー」に求めることが、最善解を探す手が
          かりにつながります。
        </p>
        <div class="box_even_button">
          <!-- <label class="button" for="pop-up2">
									PREVIEW !
								</label> -->
          <a
            class="button"
            href="https://www.careercaddie.net/"
            target="_blank"
            rel="noopener noreferrer"
            >PREVIEW !</a
          >
        </div>
      </div>
    </section>
    <section class="box box_odd fade_in_bottom">
      <figure class="left">
        <img src="@/assets/images/achivement3.jpg" width="100%" />
      </figure>
      <div class="right">
        <h3 class="box_title">Lloyd-Fish-Factory</h3>
        <p>
          店を出すには簡単です。でも、売れる（支持される）店を創るのは難しいです。
          それには”戦略”と”戦術”が必要になります。
          「自分の思いを店舗という形」にすると同時にビジネスとして
          成功・継続させ るには、”失敗しない為のノウハウと知識を習得します”。
        </p>
        <div class="box_odd_button">
          <!-- <label class="button" for="pop-up3">
									PREVIEW !
								</label> -->
          <a
            class="button"
            href="https://lloyd-fish-factory.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            >PREVIEW !</a
          >
        </div>
      </div>
    </section>
    <input type="checkbox" id="pop-up1" />
    <label id="popup" for="pop-up1" class="overlay">
      <label class="popWindow">
        <div class="ptitle">
          <h2>請戸小学校</h2>
          <label class="close" for="pop-up1">×</label>
          <img
            itemprop="image"
            loading="lazy"
            src="@/assets/images/ukedo.jpg"
            alt="横浜赤レンガ倉庫のクリスマスツリー"
            width="720"
            height="100%"
          />
        </div>
      </label>
    </label>
    <input type="checkbox" id="pop-up2" />
    <label id="popup" for="pop-up2" class="overlay">
      <label class="popWindow">
        <div class="ptitle">
          <h2>キャリア・キャディ</h2>
          <label class="close" for="pop-up2">×</label>
          <img
            itemprop="image"
            loading="lazy"
            src="@/assets/images/hgm48.jpg"
            alt="横浜赤レンガ倉庫のクリスマスツリー"
            width="720"
            height="100%"
          />
        </div>
      </label>
    </label>
    <input type="checkbox" id="pop-up3" />
    <label id="popup" for="pop-up3" class="overlay">
      <label class="popWindow">
        <div class="ptitle">
          <h2>Lloyd-Fish-Factory</h2>
          <label class="close" for="pop-up3">×</label>
          <img
            itemprop="image"
            loading="lazy"
            src="@/assets/images/lloyd.jpg"
            alt="横浜赤レンガ倉庫のクリスマスツリー"
            width="720"
            height="100%"
          />
        </div>
      </label>
    </label>
  </article>
</template>
<style scoped>
@import "@/layouts/css/achivement_style.css";
</style>
