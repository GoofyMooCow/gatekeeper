/* Gatekeeper Wiki — shared header, sidebar, search, TOC, and demo.
   >>> Set the Screen Configurator link ONCE, right here: <<< */
const CONFIGURATOR_URL = "https://goofymoocow.github.io/gatekeeper/configurator";

const PAGES = [
  { file: "index.html", title: "Home", group: "Getting started", desc: "What Gatekeeper is and where to begin", kw: "overview intro whitelist replacement why" },
  { file: "installation.html", title: "Installation", group: "Getting started", desc: "Install Gatekeeper and approve your first admin", kw: "install setup jar mods fabric api floodgate geyser first administrator" },
  { file: "how-it-works.html", title: "How it works", group: "Getting started", desc: "Player records, statuses, and access checks", kw: "record join check status disconnect lifecycle" },
  { file: "commands.html", title: "Commands", group: "Administration", desc: "Every /gatekeeper command and vanilla replacement", kw: "command status add info delete list set clear audit joinlog reload whitelist ban pardon" },
  { file: "statuses.html", title: "Player statuses", group: "Administration", desc: "Built-in and custom statuses", kw: "whitelisted neutral banned custom status deny allow" },
  { file: "denial-screens.html", title: "Denial screens", group: "Administration", desc: "Custom messages for players who can't join", kw: "screen configurator kick disconnect message color bedrock placeholder messages.json" },
  { file: "player-profiles.html", title: "Player profiles", group: "Administration", desc: "Store Discord, email, bio, and more", kw: "profile fields public private discord email phone bio fields.json" },
  { file: "configuration.html", title: "Configuration", group: "Reference", desc: "Files in config/gatekeeper and reloading", kw: "config.json messages.json fields.json reload hot" },
  { file: "http-api.html", title: "HTTP API", group: "Reference", desc: "Public and admin API for websites and bots", kw: "api rest token discord bot dashboard website 8123 admin public" },
  { file: "security.html", title: "Security", group: "Reference", desc: "Fail-closed design and API hardening", kw: "fail closed rate limit lockout tls reverse proxy token private" },
  { file: "permissions.html", title: "Permissions", group: "Reference", desc: "Who can run Gatekeeper commands", kw: "op level 3 console permission" },
  { file: "faq.html", title: "FAQ", group: "Help", desc: "Common questions and quick answers", kw: "faq help question troubleshoot whitelist.json bedrock restart" },
];

const current = (document.body.dataset.page || location.pathname.split("/").pop() || "index.html");

function wireScrollReset() {
  try {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  } catch (e) {}

  const reset = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  reset();
  window.addEventListener("pageshow", reset, { passive: true });
}

function wireScrollSpy() {
  const links = [...document.querySelectorAll("#toc a")];
  if (!links.length || !("IntersectionObserver" in window)) return;
  const heads = links.map(l => document.getElementById(l.getAttribute("href").slice(1))).filter(Boolean);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-70px 0px -70% 0px" });
  heads.forEach(h => io.observe(h));
}

function wireSearch() {
  const input = document.getElementById("search"), box = document.getElementById("results");
  if (!input) return;
  const render = q => {
    q = q.trim().toLowerCase();
    if (!q) { box.classList.remove("open"); return; }
    const hits = PAGES.filter(p => (p.title + " " + p.desc + " " + p.kw).toLowerCase().includes(q)).slice(0, 6);
    box.innerHTML = hits.length
      ? hits.map(p => `<a href="${p.file}"><b>${p.title}</b><span>${p.desc}</span></a>`).join("")
      : `<a href="#" onclick="return false"><span>No pages match “${q.replace(/</g, "&lt;")}”.</span></a>`;
    box.classList.add("open");
  };
  input.addEventListener("input", () => render(input.value));
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") { const a = box.querySelector("a[href$='.html']"); if (a) location.href = a.getAttribute("href"); }
    if (e.key === "Escape") { input.value = ""; render(""); }
  });
  document.addEventListener("click", e => { if (!e.target.closest(".search")) box.classList.remove("open"); });
  document.addEventListener("keydown", e => {
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
  });
}

function wireChrome() {
  document.querySelectorAll("[data-configurator]").forEach(a => { a.href = CONFIGURATOR_URL; });
  const theme = document.getElementById("theme-btn");
  if (theme) theme.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("gk-theme", next); } catch (e) {}
  });
  const menu = document.getElementById("menu-btn"), side = document.getElementById("sidebar");
  if (menu && side) {
    menu.addEventListener("click", () => {
      const open = side.classList.toggle("open");
      menu.setAttribute("aria-expanded", open);
    });
    side.addEventListener("click", e => { if (e.target.tagName === "A") side.classList.remove("open"); });
  }
  document.querySelectorAll(".doc pre").forEach(pre => {
    const b = document.createElement("button");
    b.className = "copy"; b.type = "button"; b.textContent = "Copy";
    b.addEventListener("click", () => {
      const text = pre.querySelector("code") ? pre.querySelector("code").innerText : pre.innerText;
      const done = () => { b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy"), 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
    });
    pre.appendChild(b);
  });
}

wireScrollReset(); wireScrollSpy(); wireSearch(); wireChrome();
