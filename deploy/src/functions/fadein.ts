import type { kinfOfFadein } from "../models/models";

const fadeInListener = () => {
  const kindOfFade: kinfOfFadein[] = [
    "top",
    "bottom",
    "left",
    "right",
    "center",
  ];

  document.addEventListener("scroll", function (e: Event) {
    for (const kind of kindOfFade) {
      const classDoc: HTMLCollectionOf<Element> =
        document.getElementsByClassName("fade_in_" + kind);
      for (let i = 0; i < classDoc.length; i++) {
        if (
          window.scrollY >
          classDoc[i].getBoundingClientRect().top + window.pageYOffset - 400
        ) {
          classDoc[i].classList.add("active");
        } else {
          classDoc[i].classList.remove("active");
        }
      }
    }
  });
};

export default fadeInListener;
