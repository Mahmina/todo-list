import { showAllView } from "./views/allView.js";
import { showActiveView } from "./views/activeView.js";
import { showCompletedView } from "./views/completedView.js";
import { showRemovedView } from "./views/removedView.js";

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

    if (viewName === "completed") {
      showCompletedView();
    }

    if (viewName === "removed") {
      showRemovedView();
    }
  });
});


