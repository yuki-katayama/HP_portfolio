const kindOfFade = ["top", "bottom", "left", "right", "center"];

document.addEventListener('scroll', function (e) {
	for (const kind of kindOfFade) {
		const classDoc = document.getElementsByClassName('fade_in_' + kind);
		for (let i = 0; i < classDoc.length; i++) {
			if (window.scrollY > classDoc[i].getBoundingClientRect().top + window.pageYOffset - 500) {
				classDoc[i].classList.add("active");
			} else {
				classDoc[i].classList.remove("active");
			}
		}
	}
})