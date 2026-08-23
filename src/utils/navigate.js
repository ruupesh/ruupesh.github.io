/* ═══════════════════════════════════════════════════════════════
   PAGE NAVIGATION FROM CONVERSATION
   Lets the assistant drive the page: a question that names a
   company, project, or section moves the page to it and, for a
   role, selects that role in the experience spine.

   Routing is done locally from entities already in src/data.js —
   it does not depend on the API returning structured output, so it
   behaves identically against the live backend and the fallback.
   ═══════════════════════════════════════════════════════════════ */

export const NAV_EVENT = "portfolio:navigate";

const SECTION_TERMS = [
  { section: "about", terms: ["about", "who is", "background", "summary"] },
  { section: "skills", terms: ["skill", "tech stack", "technolog", "stack", "tools"] },
  { section: "experience", terms: ["experience", "work", "job", "career", "role"] },
  { section: "education", terms: ["education", "degree", "university", "college", "cgpa"] },
  { section: "achievements", terms: ["certification", "certificate", "award", "achievement", "recognition"] },
  { section: "projects", terms: ["project", "built", "portfolio piece"] },
  { section: "publications", terms: ["publication", "article", "blog", "medium", "writing"] },
  { section: "contact", terms: ["contact", "email", "reach", "hire", "get in touch"] },
];

// Short forms people actually type for each employer.
const COMPANY_ALIASES = {
  "Electronic Arts": ["electronic arts", "ea"],
  "Hashedin by Deloitte": ["hashedin", "deloitte"],
  CLSA: ["clsa"],
  "Persistent Systems": ["persistent"],
};

const hasWord = (text, term) =>
  new RegExp(`(^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(text);

/**
 * Works out where a question points, if anywhere.
 * Returns { section, roleIndex? } or null.
 */
export function routeFromText(text, data) {
  if (!text || !data) return null;
  const q = text.toLowerCase();

  // A named employer is the most specific signal — go to that role.
  const roleIndex = (data.experience || []).findIndex((role) => {
    const aliases = COMPANY_ALIASES[role.company] || [role.company.toLowerCase()];
    return aliases.some((a) => hasWord(q, a));
  });
  if (roleIndex >= 0) return { section: "experience", roleIndex };

  // A named project.
  const project = (data.projects || []).find((p) => {
    const name = p.name.toLowerCase();
    if (q.includes(name)) return true;
    const lead = name.split(/\s+/).slice(0, 2).join(" ");
    return lead.length > 6 && q.includes(lead);
  });
  if (project) return { section: "projects", projectName: project.name };

  for (const { section, terms } of SECTION_TERMS) {
    if (terms.some((t) => q.includes(t))) return { section };
  }

  return null;
}

/** Moves the page and tells interested sections what was asked for. */
export function navigateTo(target) {
  if (!target?.section) return;
  const el = document.getElementById(target.section);
  if (!el) return;

  window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: target }));

  // When a specific role was named, scroll to that entry rather than the
  // top of the section — two competing smooth scrolls would fight and the
  // section-level one would win, landing away from what was asked about.
  const role =
    typeof target.roleIndex === "number"
      ? document.getElementById(`role-${target.roleIndex}`)
      : null;

  (role || el).scrollIntoView({
    behavior: "smooth",
    block: role ? "center" : "start",
  });
  history.replaceState(null, "", `#${target.section}`);

  // Brief pulse so it is obvious which section answered.
  el.classList.add("is-nav-target");
  window.setTimeout(() => el.classList.remove("is-nav-target"), 1600);
}
