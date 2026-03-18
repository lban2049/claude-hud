window.__DS_NAV__ = {
  "siteName": "claude-hud",
  "locale": "en",
  "languages": [
    {
      "code": "en",
      "name": "English",
      "flag": "🇺🇸"
    },
    {
      "code": "zh",
      "name": "简体中文",
      "flag": "🇨🇳"
    }
  ],
  "documents": [
    {
      "title": "Overview",
      "path": "/overview",
      "href": "/docs/overview.html"
    },
    {
      "title": "Getting Started",
      "path": "/getting-started",
      "href": "/docs/getting-started.html"
    },
    {
      "title": "Configuration",
      "path": "/configuration",
      "href": "/docs/configuration.html"
    },
    {
      "title": "HUD Elements",
      "path": "/hud-elements",
      "href": "/docs/hud-elements.html"
    },
    {
      "title": "Architecture",
      "path": "/architecture",
      "href": "/docs/architecture.html"
    },
    {
      "title": "Troubleshooting",
      "path": "/troubleshooting",
      "href": "/docs/troubleshooting.html"
    }
  ],
  "translations": {
    "zh": {
      "/overview": "概述",
      "/getting-started": "快速上手",
      "/configuration": "配置",
      "/hud-elements": "HUD 元素",
      "/architecture": "架构",
      "/troubleshooting": "故障排除"
    }
  }
};

(function() {
  var nav = window.__DS_NAV__;
  if (!nav) return;

  var lang = document.documentElement.lang;
  var path = document.body.dataset.dsPath || '';
  var tr = (nav.translations && nav.translations[lang]) || {};

  function t(item) {
    return tr[item.path] || item.title;
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // Render sidebar
  var sb = document.querySelector('[data-ds="sidebar"]');
  if (sb) {
    var h = '<ul>';
    nav.documents.forEach(function(item) {
      if (item.children && item.children.length > 0) {
        var ph = '/' + lang + item.href;
        h += '<li>';
        h += '<a href="' + ph + '" class="nav-group-title' + (item.path === path ? ' active' : '') + '">' + esc(t(item)) + '</a>';
        h += '<ul>';
        item.children.forEach(function(c) {
          var ch = '/' + lang + c.href;
          h += '<li><a href="' + ch + '"' + (c.path === path ? ' class="active"' : '') + '>' + esc(t(c)) + '</a></li>';
        });
        h += '</ul></li>';
      } else {
        var ih = '/' + lang + item.href;
        h += '<li><a href="' + ih + '"' + (item.path === path ? ' class="active"' : '') + '>' + esc(t(item)) + '</a></li>';
      }
    });
    h += '</ul>';
    sb.innerHTML = h;
  }

  // Render language dropdown
  if (nav.languages && nav.languages.length > 1) {
    var ctrl = document.querySelector('.header-controls');
    if (ctrl) {
      var cur = nav.languages.find(function(l) { return l.code === lang; }) || nav.languages[0];
      var mi = '';
      nav.languages.forEach(function(l) {
        var lh = '/' + l.code + '/docs' + path + '.html';
        mi += '<a href="' + lh + '"' + (l.code === lang ? ' class="active"' : '') + '>';
        mi += '<span class="lang-flag">' + l.flag + '</span>' + l.name + '</a>';
      });
      var dd = document.createElement('div');
      dd.className = 'lang-dropdown';
      dd.innerHTML =
        '<button class="lang-dropdown-trigger">' +
        '<span class="lang-flag">' + cur.flag + '</span>' + cur.name +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
        '</button>' +
        '<div class="lang-dropdown-menu">' + mi + '</div>';
      ctrl.insertBefore(dd, ctrl.firstChild);
    }
  }

  // Prevent duplicate rendering from legacy inline scripts
  window.__DS_NAV__ = null;
})();
