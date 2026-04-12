const STORAGE_KEY = "truetym_events_v1";

let state = {
  events: [],
  filters: {
    search: "",
    geo: "all",
    type: "all",
    sector: "all",
    status: "all"
  },
  view: "orgs",
  calMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(),
  modal: null
};

function loadEvents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      state.events = JSON.parse(saved);
    } else {
      state.events = SEED_EVENTS.map(e => ({ ...e }));
      saveEvents();
    }
  } catch (e) {
    state.events = SEED_EVENTS.map(e => ({ ...e }));
  }
}

function saveEvents() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.events)); } catch (e) {}
}

function nextId() {
  return state.events.length ? Math.max(...state.events.map(e => e.id)) + 1 : 1;
}

function getOrgById(id) { return ORGS.find(o => o.id === id); }
function getOrgByName(name) { return ORGS.find(o => o.name === name); }

function filteredOrgs() {
  const { search, geo, type, sector } = state.filters;
  return ORGS.filter(o => {
    if (search) {
      const q = search.toLowerCase();
      if (!o.name.toLowerCase().includes(q) && !o.note.toLowerCase().includes(q)) return false;
    }
    if (geo !== "all" && o.geo !== geo) return false;
    if (type !== "all" && o.type !== type) return false;
    if (sector !== "all") {
      if (!o.sectors.includes("all") && !o.sectors.includes(sector)) return false;
    }
    return true;
  });
}

function filteredEvents() {
  const { search, geo, type, sector, status } = state.filters;
  return state.events.filter(ev => {
    if (status !== "all" && ev.status !== status) return false;
    if (search) {
      const q = search.toLowerCase();
      const org = getOrgById(ev.orgId);
      const orgName = org ? org.name.toLowerCase() : "";
      if (!ev.event.toLowerCase().includes(q) && !orgName.includes(q) && !(ev.notes||"").toLowerCase().includes(q)) return false;
    }
    if (geo !== "all" || type !== "all" || sector !== "all") {
      const org = getOrgById(ev.orgId);
      if (org) {
        if (geo !== "all" && org.geo !== geo) return false;
        if (type !== "all" && org.type !== type) return false;
        if (sector !== "all") {
          if (!org.sectors.includes("all") && !org.sectors.includes(sector)) return false;
        }
      }
    }
    return true;
  });
}

function typeBadgeHtml(type) {
  const map = { chamber: ["badge-chamber","Chamber"], industry: ["badge-industry","Industry"], econ: ["badge-econ","Econ dev"], indie: ["badge-indie","Independent"] };
  const [cls, label] = map[type] || ["badge-chamber", type];
  return `<span class="badge ${cls}">${label}</span>`;
}

function sectorBadgeHtml(sector) {
  if (sector === "all") return "";
  const map = { manufacturing: "Manufacturing", construction: "Construction", healthcare: "Home healthcare", logistics: "Logistics" };
  return `<span class="badge badge-sector">${map[sector] || sector}</span>`;
}

function statusPill(status) {
  return `<span class="pill pill-${status}">${status}</span>`;
}

function fmtDate(d) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${parseInt(day)}, ${y}`;
}

function today() { return new Date().toISOString().slice(0, 10); }

function renderSidebar() {
  const orgsList = filteredOrgs();
  const eventsList = filteredEvents();
  const upcoming = state.events.filter(e => e.status === "upcoming").length;
  const tracking = state.events.filter(e => e.status === "tracking").length;

  function filterList(containerId, options, filterKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const counts = {};
    if (filterKey === "status") {
      state.events.forEach(e => { counts[e.status] = (counts[e.status] || 0) + 1; });
    }
    container.innerHTML = options.map(opt => {
      const isActive = state.filters[filterKey] === opt.value;
      let count = "";
      if (filterKey === "geo" && opt.value !== "all") count = ORGS.filter(o => o.geo === opt.value).length;
      if (filterKey === "type" && opt.value !== "all") count = ORGS.filter(o => o.type === opt.value).length;
      if (filterKey === "sector" && opt.value !== "all") count = ORGS.filter(o => o.sectors.includes(opt.value)).length;
      if (filterKey === "status" && opt.value !== "all") count = counts[opt.value] || 0;
      return `<div class="filter-item ${isActive ? "active" : ""}" onclick="setFilter('${filterKey}','${opt.value}')">
        <span class="filter-dot" style="background:${opt.color}"></span>
        <span>${opt.label}</span>
        ${count !== "" ? `<span class="filter-count">${count}</span>` : ""}
      </div>`;
    }).join("");
  }

  filterList("geoFilters", GEO_OPTIONS, "geo");
  filterList("typeFilters", TYPE_OPTIONS, "type");
  filterList("sectorFilters", SECTOR_OPTIONS, "sector");
  filterList("statusFilters", STATUS_OPTIONS, "status");

  document.getElementById("sidebarStats").innerHTML = `
    <div class="stat-mini"><div class="stat-mini-num">${orgsList.length}</div><div class="stat-mini-label">Orgs shown</div></div>
    <div class="stat-mini"><div class="stat-mini-num">${ORGS.filter(o=>o.priority).length}</div><div class="stat-mini-label">Priority</div></div>
    <div class="stat-mini"><div class="stat-mini-num">${upcoming}</div><div class="stat-mini-label">Upcoming</div></div>
    <div class="stat-mini"><div class="stat-mini-num">${state.events.length}</div><div class="stat-mini-label">Events logged</div></div>
  `;
}

function renderOrgsView() {
  const orgs = filteredOrgs();
  const priority = orgs.filter(o => o.priority);
  const rest = orgs.filter(o => !o.priority);
  const container = document.getElementById("view-orgs");

  if (!orgs.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">◎</div><p>No organizations match your current filters.<br>Try adjusting the sidebar filters.</p></div>`;
    return;
  }

  let html = "";
  if (priority.length) {
    html += `<div class="orgs-section-label">Priority targets — ${priority.length} organizations</div>`;
    html += `<div class="orgs-grid">${priority.map(orgCardHtml).join("")}</div>`;
  }
  if (rest.length) {
    html += `<div class="orgs-section-label">Additional organizations — ${rest.length}</div>`;
    html += `<div class="orgs-grid">${rest.map(orgCardHtml).join("")}</div>`;
  }
  container.innerHTML = html;
}

function orgCardHtml(o) {
  const eventCount = state.events.filter(e => e.orgId === o.id).length;
  const badges = [typeBadgeHtml(o.type)];
  if (o.priority) badges.push(`<span class="badge badge-priority">Priority</span>`);
  o.sectors.filter(s => s !== "all").forEach(s => badges.push(sectorBadgeHtml(s)));

  return `<div class="org-card ${o.priority ? "priority" : ""}" onclick="openOrgDetail(${o.id})">
    <div class="org-name">${o.name}</div>
    <div class="badges">${badges.join("")}</div>
    <div class="org-geo">${o.geo}</div>
    ${o.url ? `<a class="org-url" href="${o.url}" target="_blank" onclick="event.stopPropagation()">${o.url.replace("https://","")}</a>` : `<div class="org-freq" style="height:18px"></div>`}
    <div class="org-freq">Events: ${o.freq}</div>
    <div class="org-note">${o.note}</div>
    <button class="card-log-btn" onclick="event.stopPropagation(); openEventForm(null, ${o.id})">
      + Log event ${eventCount > 0 ? `<span style="color:var(--textmute);">(${eventCount} logged)</span>` : ""}
    </button>
  </div>`;
}

function renderEventsView() {
  const events = filteredEvents().sort((a, b) => b.date.localeCompare(a.date));
  const container = document.getElementById("view-events");

  let html = `<div class="events-toolbar">
    <select onchange="state.filters.status=this.value;render()">
      ${STATUS_OPTIONS.map(s => `<option value="${s.value}" ${state.filters.status===s.value?"selected":""}>${s.label}</option>`).join("")}
    </select>
    <span style="font-size:13px;color:var(--textmute);margin-left:auto;">${events.length} event${events.length !== 1 ? "s" : ""}</span>
  </div>`;

  if (!events.length) {
    html += `<div class="empty-state"><div class="empty-state-icon">◎</div><p>No events logged yet.<br>Click "+ Log event" or click an organization card to add one.</p></div>`;
    container.innerHTML = html;
    return;
  }

  html += `<div class="table-wrap"><table class="evt-table">
    <thead><tr>
      <th style="width:100px">Date</th>
      <th style="width:200px">Organization</th>
      <th>Event</th>
      <th style="width:130px" class="col-hide">Type</th>
      <th style="width:110px">Status</th>
      <th style="width:70px">Edit</th>
    </tr></thead><tbody>`;

  events.forEach(ev => {
    const org = getOrgById(ev.orgId);
    html += `<tr>
      <td style="white-space:nowrap;font-size:12px;color:var(--textmute)">${fmtDate(ev.date)}</td>
      <td><div class="evt-org-name">${org ? org.name : "Unknown"}</div></td>
      <td>
        <div class="evt-name">${ev.event}</div>
        ${ev.notes ? `<div class="evt-notes">${ev.notes}</div>` : ""}
      </td>
      <td class="col-hide" style="font-size:12px;color:var(--textmute)">${ev.type}</td>
      <td>${statusPill(ev.status)}</td>
      <td><button class="act-btn" onclick="openEventForm(${ev.id})">Edit</button></td>
    </tr>`;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

function renderCalendarView() {
  const container = document.getElementById("view-calendar");
  const { calMonth, calYear } = state;
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrev = new Date(calYear, calMonth, 0).getDate();
  const todayStr = today();

  const monthEvents = state.events.filter(e => {
    const [y, m] = e.date.split("-");
    return parseInt(y) === calYear && parseInt(m) - 1 === calMonth;
  });

  let html = `<div class="calendar-wrap">
    <div class="cal-month-nav">
      <button class="cal-nav-btn" onclick="prevMonth()">&#8249;</button>
      <div class="cal-month-title">${monthNames[calMonth]} ${calYear}</div>
      <button class="cal-nav-btn" onclick="nextMonth()">&#8250;</button>
    </div>
    <div class="cal-grid">`;

  dayNames.forEach(d => { html += `<div class="cal-day-head">${d}</div>`; });

  let day = 1;
  let nextDay = 1;
  for (let i = 0; i < 42; i++) {
    if (i < firstDay) {
      const d = daysInPrev - firstDay + i + 1;
      html += `<div class="cal-day other-month"><div class="cal-day-num">${d}</div></div>`;
    } else if (day <= daysInMonth) {
      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
      const isToday = dateStr === todayStr;
      const dayEvts = monthEvents.filter(e => e.date === dateStr);
      html += `<div class="cal-day${isToday?" today":""}">
        <div class="cal-day-num">${day}</div>
        ${dayEvts.map(e => `<div class="cal-event-dot dot-${e.status}" onclick="openEventForm(${e.id})" title="${e.event}">${e.event}</div>`).join("")}
      </div>`;
      day++;
    } else {
      html += `<div class="cal-day other-month"><div class="cal-day-num">${nextDay++}</div></div>`;
    }
  }

  html += `</div></div>`;
  container.innerHTML = html;
}

function render() {
  renderSidebar();
  renderOrgsView();
  renderEventsView();
  renderCalendarView();
}

function setFilter(key, value) {
  state.filters[key] = value;
  render();
}

function switchView(v) {
  state.view = v;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.view === v));
  document.querySelectorAll(".view").forEach(el => el.classList.toggle("active", el.id === `view-${v}`));
}

function prevMonth() {
  state.calMonth--;
  if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
  renderCalendarView();
}

function nextMonth() {
  state.calMonth++;
  if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
  renderCalendarView();
}

function openModal(title, bodyHtml) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = bodyHtml;
  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  state.modal = null;
}

function openOrgDetail(orgId) {
  const o = getOrgById(orgId);
  if (!o) return;
  const orgEvents = state.events.filter(e => e.orgId === orgId).sort((a,b) => b.date.localeCompare(a.date));
  const badges = [typeBadgeHtml(o.type)];
  if (o.priority) badges.push(`<span class="badge badge-priority">Priority</span>`);
  o.sectors.filter(s => s !== "all").forEach(s => badges.push(sectorBadgeHtml(s)));

  let html = `
    <div class="org-detail-name">${o.name}</div>
    <div class="org-detail-meta">${badges.join("")}</div>
    <div style="font-size:13px;color:var(--textmute);margin-bottom:6px;">${o.geo} &nbsp;·&nbsp; ${o.freq}</div>
    ${o.url ? `<a href="${o.url}" target="_blank" style="font-size:13px;color:var(--blue);display:block;margin-bottom:12px;">${o.url}</a>` : ""}
    <div class="org-detail-note">${o.note}</div>
    <div class="org-detail-events">
      <h3>Logged events (${orgEvents.length})</h3>
      ${orgEvents.length ? `<table style="width:100%;font-size:12.5px;border-collapse:collapse;">
        ${orgEvents.map(e=>`<tr style="border-bottom:1px solid var(--mint)">
          <td style="padding:6px 4px;color:var(--textmute);white-space:nowrap;width:90px">${fmtDate(e.date)}</td>
          <td style="padding:6px 4px;font-weight:500">${e.event}</td>
          <td style="padding:6px 4px">${statusPill(e.status)}</td>
          <td style="padding:6px 4px"><button class="act-btn" onclick="closeModal();openEventForm(${e.id})">Edit</button></td>
        </tr>`).join("")}
      </table>` : `<p style="font-size:13px;color:var(--textmute);">No events logged yet.</p>`}
    </div>
    <div style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--mint);">
      <button class="btn-save" onclick="closeModal();openEventForm(null,${orgId})">+ Log event for this org</button>
    </div>`;

  openModal(o.name, html);
}

function openEventForm(eventId, prefillOrgId) {
  state.modal = { type: "event", eventId, prefillOrgId };
  const ev = eventId ? state.events.find(e => e.id === eventId) : null;
  const isEdit = !!ev;

  const orgOptions = ORGS.map(o =>
    `<option value="${o.id}" ${(ev ? ev.orgId : prefillOrgId) === o.id ? "selected" : ""}>${o.name}</option>`
  ).join("");

  const typeOptions = EVENT_TYPES.map(t =>
    `<option ${(ev && ev.type === t) ? "selected" : ""}>${t}</option>`
  ).join("");

  const statusOptions = STATUS_OPTIONS.filter(s => s.value !== "all").map(s =>
    `<option value="${s.value}" ${(ev ? ev.status : "upcoming") === s.value ? "selected" : ""}>${s.label}</option>`
  ).join("");

  const html = `
    <div class="form-row">
      <div class="form-group">
        <label>Date</label>
        <input type="date" id="f_date" value="${ev ? ev.date : today()}">
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="f_status">${statusOptions}</select>
      </div>
    </div>
    <div class="form-row full">
      <div class="form-group">
        <label>Organization</label>
        <select id="f_org">${orgOptions}</select>
      </div>
    </div>
    <div class="form-row full">
      <div class="form-group">
        <label>Event name</label>
        <input type="text" id="f_event" placeholder="e.g. Monthly networking mixer, Annual summit..." value="${ev ? ev.event : ""}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Event type</label>
        <select id="f_type">${typeOptions}</select>
      </div>
      <div class="form-group">
        <label>Date (confirm)</label>
        <input type="date" id="f_date2" value="${ev ? ev.date : today()}" style="display:none">
      </div>
    </div>
    <div class="form-row full">
      <div class="form-group">
        <label>Notes / follow-ups</label>
        <textarea id="f_notes" placeholder="Contacts met, follow-up actions, TrueTym relevance...">${ev ? ev.notes || "" : ""}</textarea>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn-save" onclick="saveEventForm(${eventId || "null"})">Save</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      ${isEdit ? `<button class="btn-delete" onclick="deleteEvent(${eventId})">Delete</button>` : ""}
    </div>`;

  openModal(isEdit ? "Edit event" : "Log event", html);
}

function saveEventForm(eventId) {
  const date = document.getElementById("f_date").value;
  const orgId = parseInt(document.getElementById("f_org").value);
  const event = document.getElementById("f_event").value.trim();
  const type = document.getElementById("f_type").value;
  const status = document.getElementById("f_status").value;
  const notes = document.getElementById("f_notes").value.trim();

  if (!event) { document.getElementById("f_event").focus(); return; }
  if (!date) { document.getElementById("f_date").focus(); return; }

  if (eventId !== null) {
    const idx = state.events.findIndex(e => e.id === eventId);
    if (idx > -1) state.events[idx] = { id: eventId, date, orgId, event, type, status, notes };
  } else {
    state.events.push({ id: nextId(), date, orgId, event, type, status, notes });
  }

  saveEvents();
  closeModal();
  render();
}

function deleteEvent(eventId) {
  if (!confirm("Delete this event?")) return;
  state.events = state.events.filter(e => e.id !== eventId);
  saveEvents();
  closeModal();
  render();
}

function exportCSV() {
  const rows = [["Date","Organization","Event","Type","Status","Notes"]];
  state.events.sort((a,b)=>b.date.localeCompare(a.date)).forEach(ev => {
    const org = getOrgById(ev.orgId);
    rows.push([
      ev.date,
      org ? org.name : "",
      ev.event,
      ev.type,
      ev.status,
      (ev.notes || "").replace(/,/g,";")
    ]);
  });
  const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `truetym-events-${today()}.csv`;
  a.click();
}

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();

  document.getElementById("searchInput").addEventListener("input", e => {
    state.filters.search = e.target.value;
    render();
  });

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  document.getElementById("addEventBtn").addEventListener("click", () => openEventForm(null));
  document.getElementById("exportBtn").addEventListener("click", exportCSV);

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modalOverlay")) closeModal();
  });

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  render();
});
