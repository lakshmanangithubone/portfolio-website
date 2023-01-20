const menubtn = document.querySelector(".menu-btn");
const closebtn = document.querySelector(".close-btn");
const ul = document.querySelector(".ul");
const li = document.querySelectorAll(".li");
const fullsections = document.querySelectorAll(".section");

const hiddenelements = document.querySelectorAll(".hidden");
const lefthiddenelements = document.querySelectorAll(".left-hidden");

// show side nav bar

function showsidenavbar() {
  ul.classList.add("shownav");
  // menubtn.style.display = "none";
  // closebtn.style.display = "flex";
}

function removesidnavbar() {
  ul.classList.remove("shownav");
  // closebtn.style.display = "none";
  // menubtn.style.display = "flex";
}

li.forEach((li) => {
  li.addEventListener("click", () => {
    ul.classList.remove("shownav");
  });
});

function scrollactive() {
  const scrollY = window.pageYOffset;

  fullsections.forEach((section) => {
    const sectionheight = section.offsetHeight;

    const sectiontop = section.offsetTop - 50;

    sectionid = section.getAttribute("id");

    if (scrollY > sectiontop && scrollY <= sectiontop + sectionheight) {
      document.querySelector(`.a-${sectionid}`).classList.add("highlight");
    } else {
      document.querySelector(`.a-${sectionid}`).classList.remove("highlight");
    }
  });
}

// observer transition

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

const obstwo = new IntersectionObserver(
  (entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  },
  {
    threshold: 0.2,
  }
);

hiddenelements.forEach((el) => {
  obs.observe(el);
});

lefthiddenelements.forEach((el) => {
  obs.observe(el);
});

// event listeners

menubtn.addEventListener("click", showsidenavbar);

closebtn.addEventListener("click", removesidnavbar);

window.addEventListener("scroll", scrollactive);

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyiyFfi3YdAf9qccg7_ZPtsOEzbOJf0TLkPC0jjLutDejGzZld1vs3eyzR8LtmEqFZH/exec";
const form = document.forms["submit-to-google-sheet"];

const msg = document.querySelector(".msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";

      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
