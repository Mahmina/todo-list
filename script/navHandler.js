import { showAllView } from "./views/allView.js";
import { showActiveView } from "./views/activeView.js";

document.querySelectorAll('.nav-link')
.forEach((link) => {
  link.addEventListener('click', () => {
    const viewName = link.dataset.view;

    document.querySelectorAll('.nav-link').forEach(l => l.      classList.remove('active'));

    link.classList.add('active'); 

    if (viewName === "all") {
      showAllView();
    }  

    if (viewName === "active") {
      showActiveView();
    }
  });
});


