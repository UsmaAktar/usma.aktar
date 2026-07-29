(function () {
    "use strict";

    var sidebar = document.getElementById("sidebar");
    var toggle = document.getElementById("navToggle");

    if (toggle && sidebar) {
        toggle.addEventListener("click", function () {
            var isOpen = sidebar.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Close mobile menu after a nav link is tapped
        sidebar.querySelectorAll(".side-nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                sidebar.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Scrollspy: highlight the current section in the sidebar nav
    var sections = document.querySelectorAll("main .section");
    var navLinks = document.querySelectorAll(".side-nav-link");

    if (sections.length && navLinks.length && "IntersectionObserver" in window) {
        var linkFor = {};
        navLinks.forEach(function (link) {
            linkFor[link.getAttribute("href").slice(1)] = link;
        });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    var link = linkFor[entry.target.id];
                    if (!link) return;
                    if (entry.isIntersecting) {
                        navLinks.forEach(function (l) {
                            l.classList.remove("active");
                        });
                        link.classList.add("active");
                    }
                });
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }
})();
