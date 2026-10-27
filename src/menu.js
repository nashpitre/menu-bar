
    document.addEventListener("DOMContentLoaded", function () {
      var triggers = document.querySelectorAll("[data-nashp-popover]");
      if (!triggers.length) return;
      var menus = {
        projects: '<a href="/basketball">Basketball</a><a href="/extractor">Extractor</a><a href="/games">Games</a><a href="/music">Music</a><a href="/playlists">Playlists</a>',
        archives: '<a href="/archives">Archives</a><a href="/log">Log</a><a href="#search" data-nashp-popover-search>Search</a>',
        follow: '<a href="https://bsky.app/profile/nashp.com">Bluesky</a><a href="https://www.instagram.com/nashpitre/">Instagram</a><a href="https://c.im/@nashp">Mastodon</a><a href="/feed.rss">RSS</a><a href="https://www.threads.com/@nashpdotcom">Threads</a><a href="https://www.twitch.tv/nashptv">Twitch</a><a href="https://www.youtube.com/@nashptv">YouTube</a>',
        support: '<a href="mailto:nashp@me.com">Email</a><a href="https://www.patreon.com/nashp">Patreon</a><a href="https://buy.stripe.com/fZe4jqd135LRc4U4gj">Send a Tip</a>'
      };
      var panel = null;
      var active = null;

      function closePanel() {
        if (panel) panel.remove();
        panel = null;
        active = null;
      }

      function openPanel(button) {
        var name = button.getAttribute("data-nashp-popover");
        if (!menus[name]) return;
        if (active === button) { closePanel(); return; }
        closePanel();
        panel = document.createElement("div");
        panel.className = "nashp-bar-popover";
        panel.innerHTML = menus[name];
        panel.style.position = "fixed";
        var rect = button.getBoundingClientRect();
        var width = Math.min(240, window.innerWidth - 24);
        var left = Math.max(12, Math.min(rect.left + (rect.width - width) / 2, window.innerWidth - width - 12));
        panel.style.width = width + "px";
        panel.style.left = left + "px";
        panel.style.bottom = Math.max(12, window.innerHeight - rect.top + 8) + "px";
        document.body.appendChild(panel);
        active = button;
      }

      triggers.forEach(function (button) {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          openPanel(button);
        });
      });
      document.addEventListener("click", function (event) {
        if (!panel) return;
        var search = event.target.closest("[data-nashp-popover-search]");
        if (search) {
          event.preventDefault();
          closePanel();
          var searchButton = document.getElementById("nashp-search-trigger");
          if (searchButton) searchButton.click();
        }
        if (panel && !panel.contains(event.target)) closePanel();
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closePanel();
      });
      window.addEventListener("resize", closePanel);
    });
  