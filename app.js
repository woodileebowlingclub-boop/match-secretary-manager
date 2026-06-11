const icons = {
  dashboard: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  fixtures: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>`,
  availability: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M3 21v-2a6 6 0 0 1 9-5.2"/><path d="m16 19 2 2 4-5"/></svg>`,
  team: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  trophy: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M5 5H3v3a4 4 0 0 0 4 4"/><path d="M19 5h2v3a4 4 0 0 1-4 4"/></svg>`,
  results: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5"/><path d="M8 17V7"/><path d="M12 19v-7"/><path d="M16 15V5"/><path d="M20 19V9"/></svg>`,
  reports: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M8 16v-4M12 16V8M16 16v-6"/></svg>`,
  list: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>`,
  setup: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.64V21a2 2 0 1 1-4 0v-.09a1.8 1.8 0 0 0-1-1.64 1.8 1.8 0 0 0-2 .36l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.64-1H3a2 2 0 1 1 0-4h.09a1.8 1.8 0 0 0 1.64-1 1.8 1.8 0 0 0-.36-2l-.06-.06A2 2 0 1 1 7.14 3.9l.06.06a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1-1.64V3a2 2 0 1 1 4 0v.09a1.8 1.8 0 0 0 1 1.64 1.8 1.8 0 0 0 2-.36l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.64 1H21a2 2 0 1 1 0 4h-.09a1.8 1.8 0 0 0-1.51 1Z"/></svg>`
};

const storageKey = "matchSecretaryApp";

const starterData = {
  active: "Dashboard",
  club: {
    name: "Your Club",
    sport: "Bowls, football, darts, pool, tennis...",
    venue: "Home Venue",
    contact: "Match Secretary",
    email: "secretary@exampleclub.com",
    teamFormat: "Rinks / squads",
    notes: "Use this area to tailor labels, fixtures, team roles, divisions, and reporting needs for each club."
  },
  fixtures: [
    { id: id(), date: "2025-06-14", time: "14:00", home: "Your Club", away: "Riverside Club", venue: "Home Venue", type: "League", status: "Confirmed" },
    { id: id(), date: "2025-06-21", time: "14:00", home: "Your Club", away: "Hilltop Club", venue: "Home Venue", type: "Friendly", status: "Team due" },
    { id: id(), date: "2025-06-28", time: "13:30", home: "Lakeside Club", away: "Your Club", venue: "Lakeside Venue", type: "League", status: "Away" }
  ],
  players: [
    { id: id(), name: "Player One", role: "Captain", available: "yes", team: "1" },
    { id: id(), name: "Player Two", role: "Vice Captain", available: "yes", team: "1" },
    { id: id(), name: "Player Three", role: "Player", available: "maybe", team: "1" },
    { id: id(), name: "Player Four", role: "Player", available: "yes", team: "1" },
    { id: id(), name: "Player Five", role: "Captain", available: "yes", team: "2" },
    { id: id(), name: "Player Six", role: "Vice Captain", available: "no", team: "2" }
  ],
  tournament: {
    name: "Club Singles",
    players: ["Player One", "Player Two", "Player Three", "Player Four", "Player Five", "Player Six"],
    rounds: []
  },
  results: [
    { id: id(), date: "2025-06-01", opponent: "Northside Club", score: "4 - 2", result: "Win" },
    { id: id(), date: "2025-05-25", opponent: "West Park Club", score: "1 - 3", result: "Loss" }
  ],
  notice: ""
};

let state = loadState();

const tabs = [
  ["Dashboard", "dashboard"],
  ["Fixtures", "fixtures"],
  ["Members", "team"],
  ["Availability", "availability"],
  ["Team Selection", "list"],
  ["Tournaments", "trophy"],
  ["Match Results", "results"],
  ["Reports", "reports"],
  ["Club Setup", "setup"]
];

function app() {
  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand-row">
          <div class="brand">
            <div class="shield" aria-hidden="true"></div>
            <div>
              <h1>${escapeHtml(state.club.name || "Club Match Secretary Manager")}</h1>
              <p>${escapeHtml(state.club.sport || "Fixtures")} - Teams - Availability - Results - Reports</p>
            </div>
          </div>
          <button class="logout" data-action="reset-demo">Reset Demo Data</button>
        </div>
        <div class="tabs-wrap">
          <nav class="tabs" aria-label="Main sections">
            ${tabs.map(([label, icon]) => `<button class="tab ${state.active === label ? "active" : ""}" data-tab="${label}">${icons[icon]} ${label}</button>`).join("")}
          </nav>
        </div>
      </header>
      <main class="main">
        ${state.notice ? `<div class="notice">${escapeHtml(state.notice)}</div>` : ""}
        ${renderPage()}
      </main>
    </div>
  `;

  wireCommonActions();
  wirePageActions();
}

function wireCommonActions() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.active = button.dataset.tab;
      state.notice = "";
      saveAndRender();
    });
  });

  const reset = document.querySelector("[data-action='reset-demo']");
  reset.addEventListener("click", () => {
    if (!confirm("Reset all demo data? This clears your saved changes in this browser.")) return;
    localStorage.removeItem(storageKey);
    state = loadState();
    app();
  });
}

function wirePageActions() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    const action = element.dataset.action;
    if (action === "save-club") element.addEventListener("click", saveClub);
    if (action === "add-player") element.addEventListener("click", addPlayer);
    if (action === "update-player") element.addEventListener("click", () => updatePlayer(element.dataset.id));
    if (action === "remove-player") element.addEventListener("click", () => removePlayer(element.dataset.id));
    if (action === "add-fixture") element.addEventListener("click", addFixture);
    if (action === "update-fixture") element.addEventListener("click", () => updateFixture(element.dataset.id));
    if (action === "remove-fixture") element.addEventListener("click", () => removeFixture(element.dataset.id));
    if (action === "add-tournament-player") element.addEventListener("click", addTournamentPlayer);
    if (action === "remove-tournament-player") element.addEventListener("click", () => removeTournamentPlayer(Number(element.dataset.index)));
    if (action === "rename-tournament-player") element.addEventListener("click", () => renameTournamentPlayer(Number(element.dataset.index)));
    if (action === "generate-bracket") element.addEventListener("click", generateBracketFromPlayers);
    if (action === "shuffle-bracket") element.addEventListener("click", shuffleTournament);
    if (action === "advance-winner") element.addEventListener("click", () => advanceWinner(Number(element.dataset.round), Number(element.dataset.match), element.dataset.name));
    if (action === "clear-bracket") element.addEventListener("click", clearBracket);
    if (action === "use-members-for-tournament") element.addEventListener("click", useMembersForTournament);
  });

  document.querySelectorAll("[data-availability]").forEach((button) => {
    button.addEventListener("click", () => {
      const player = state.players.find((item) => item.id === button.dataset.id);
      if (!player) return;
      player.available = button.dataset.availability;
      state.notice = `${player.name} marked as ${player.available}.`;
      saveAndRender();
    });
  });

  const memberImport = document.getElementById("member-import");
  if (memberImport) memberImport.addEventListener("change", (event) => importCsv(event, importMembers));

  const fixtureImport = document.getElementById("fixture-import");
  if (fixtureImport) fixtureImport.addEventListener("change", (event) => importCsv(event, importFixtures));
}

function renderPage() {
  const pages = {
    Dashboard: dashboard,
    Fixtures: fixtures,
    Members: members,
    Availability: availability,
    "Team Selection": teamSelection,
    Tournaments: tournaments,
    "Match Results": matchResults,
    Reports: reports,
    "Club Setup": clubSetup
  };

  return pages[state.active]();
}

function title(name, actions = "") {
  return `<div class="page-title"><h2>${name}</h2><div class="actions">${actions}</div></div>`;
}

function dashboard() {
  const next = state.fixtures.slice().sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];
  return `
    ${title("Dashboard")}
    ${next ? `
      <section class="card next-fixture">
        <div class="eyebrow">Next Fixture</div>
        <h3>${escapeHtml(next.home)} v ${escapeHtml(next.away)}</h3>
        <div class="meta">${formatDate(next.date)} at ${escapeHtml(next.time)} - ${escapeHtml(next.venue)} - ${escapeHtml(next.type)}</div>
      </section>
    ` : `<section class="card empty">Import or add fixtures to show your next match here.</section>`}
    <section class="grid two">
      ${stat("fixtures", state.fixtures.length, "Fixtures")}
      ${stat("team", state.players.length, "Members")}
      ${stat("availability", state.players.filter((p) => p.available === "yes").length, "Available")}
      ${stat("trophy", state.tournament.players.length, "Tournament Players")}
    </section>
  `;
}

function stat(icon, value, label) {
  return `<article class="card stat">${icons[icon]}<strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span></article>`;
}

function clubSetup() {
  return `
    ${title("Club Setup", `<button class="button primary" data-action="save-club">Save Settings</button>`)}
    <section class="card panel">
      <div class="form-grid">
        ${inputField("club-name", "Club name", state.club.name)}
        ${inputField("club-sport", "Sport or activity", state.club.sport)}
        ${inputField("club-venue", "Home venue", state.club.venue)}
        ${inputField("club-contact", "Primary contact", state.club.contact)}
        ${inputField("club-email", "Email", state.club.email)}
        <div class="field">
          <label for="club-format">Team format</label>
          <select id="club-format">
            ${["Rinks / squads", "Singles", "Pairs", "Full team"].map((option) => `<option ${state.club.teamFormat === option ? "selected" : ""}>${option}</option>`).join("")}
          </select>
        </div>
        <div class="field wide">
          <label for="club-notes">Customer notes</label>
          <textarea id="club-notes" rows="5">${escapeHtml(state.club.notes)}</textarea>
        </div>
      </div>
    </section>
  `;
}

function members() {
  return `
    ${title("Members", `<label class="button file-button">Import CSV<input id="member-import" type="file" accept=".csv,text/csv" /></label><button class="button primary" data-action="add-player">Add Member</button>`)}
    <section class="card panel">
      <p class="meta">CSV columns accepted: name, role, team, available. A simple one-column list of names also works.</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Team</th><th>Availability</th><th>Actions</th></tr></thead>
          <tbody>
            ${state.players.map((player) => memberRow(player)).join("") || `<tr><td colspan="5">No members yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function memberRow(player) {
  return `
    <tr>
      <td><input id="player-name-${player.id}" value="${escapeAttr(player.name)}" /></td>
      <td><input id="player-role-${player.id}" value="${escapeAttr(player.role)}" /></td>
      <td><input id="player-team-${player.id}" value="${escapeAttr(player.team)}" /></td>
      <td>
        <select id="player-available-${player.id}">
          ${["yes", "maybe", "no"].map((value) => `<option value="${value}" ${player.available === value ? "selected" : ""}>${value}</option>`).join("")}
        </select>
      </td>
      <td class="row-actions">
        <button class="small-button" data-action="update-player" data-id="${player.id}">Save</button>
        <button class="small-button danger" data-action="remove-player" data-id="${player.id}">Remove</button>
      </td>
    </tr>
  `;
}

function fixtures() {
  return `
    ${title("Fixtures", `<label class="button file-button">Import CSV<input id="fixture-import" type="file" accept=".csv,text/csv" /></label><button class="button primary" data-action="add-fixture">Add Fixture</button>`)}
    <section class="card panel">
      <p class="meta">CSV columns accepted: date, time, home, away, venue, type, status. Dates should be like 2025-06-14.</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Time</th><th>Home</th><th>Away</th><th>Venue</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            ${state.fixtures.map((fixture) => fixtureRow(fixture)).join("") || `<tr><td colspan="8">No fixtures yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function fixtureRow(fixture) {
  return `
    <tr>
      <td><input id="fixture-date-${fixture.id}" type="date" value="${escapeAttr(fixture.date)}" /></td>
      <td><input id="fixture-time-${fixture.id}" type="time" value="${escapeAttr(fixture.time)}" /></td>
      <td><input id="fixture-home-${fixture.id}" value="${escapeAttr(fixture.home)}" /></td>
      <td><input id="fixture-away-${fixture.id}" value="${escapeAttr(fixture.away)}" /></td>
      <td><input id="fixture-venue-${fixture.id}" value="${escapeAttr(fixture.venue)}" /></td>
      <td><input id="fixture-type-${fixture.id}" value="${escapeAttr(fixture.type)}" /></td>
      <td><input id="fixture-status-${fixture.id}" value="${escapeAttr(fixture.status)}" /></td>
      <td class="row-actions">
        <button class="small-button" data-action="update-fixture" data-id="${fixture.id}">Save</button>
        <button class="small-button danger" data-action="remove-fixture" data-id="${fixture.id}">Remove</button>
      </td>
    </tr>
  `;
}

function availability() {
  return `
    ${title("Availability")}
    <section class="card panel">
      <div class="availability">
        ${state.players.map((player) => `
          <div class="availability-row">
            <strong>${escapeHtml(player.name)}</strong>
            <button class="choice ${player.available === "yes" ? "selected yes" : ""}" data-availability="yes" data-id="${player.id}">Available</button>
            <button class="choice ${player.available === "maybe" ? "selected maybe" : ""}" data-availability="maybe" data-id="${player.id}">Maybe</button>
            <button class="choice ${player.available === "no" ? "selected no" : ""}" data-availability="no" data-id="${player.id}">Unavailable</button>
          </div>
        `).join("") || `<div class="empty">Import members first, then record availability here.</div>`}
      </div>
    </section>
  `;
}

function teamSelection() {
  const teams = [...new Set(state.players.map((player) => player.team || "Unassigned"))].sort();
  return `
    ${title("Team Selection")}
    <section class="grid two">
      ${teams.map((team) => `
        <article class="card panel">
          <h3>Team ${escapeHtml(team)}</h3>
          <table>
            <tbody>
              ${state.players.filter((player) => (player.team || "Unassigned") === team).map((player) => `
                <tr>
                  <td><strong>${escapeHtml(player.role || "Player")}</strong></td>
                  <td>${escapeHtml(player.name)}</td>
                  <td><span class="badge ${player.available === "no" ? "danger" : player.available === "maybe" ? "warn" : ""}">${escapeHtml(player.available)}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      `).join("") || `<article class="card empty">No teams yet.</article>`}
    </section>
  `;
}

function tournaments() {
  return `
    ${title("Tournaments", `<button class="button" data-action="clear-bracket">Clear Draw</button><button class="button" data-action="shuffle-bracket">Shuffle Draw</button><button class="button primary" data-action="generate-bracket">Generate Bracket</button>`)}
    <section class="grid two tournament-layout">
      <article class="card panel">
        <div class="field">
          <label for="tournament-name">Tournament name</label>
          <input id="tournament-name" value="${escapeAttr(state.tournament.name)}" />
        </div>
        <div class="field inline-field">
          <label for="tournament-player">Add player</label>
          <div class="inline-controls">
            <input id="tournament-player" placeholder="Player name" />
            <button class="button primary" data-action="add-tournament-player">Add</button>
          </div>
        </div>
        <div class="player-chips">
          ${state.tournament.players.map((name, index) => `
            <span class="chip">
              <input id="tournament-player-${index}" value="${escapeAttr(name)}" />
              <button title="Rename" data-action="rename-tournament-player" data-index="${index}">Save</button>
              <button title="Remove" data-action="remove-tournament-player" data-index="${index}">x</button>
            </span>
          `).join("") || `<p class="meta">Add as many players as you need, then generate the bracket.</p>`}
        </div>
      </article>
      <article class="card panel">
        <h3>Import from members</h3>
        <p class="meta">Use the current member list as tournament entrants.</p>
        <button class="button" data-action="use-members-for-tournament">Use All Members</button>
      </article>
    </section>
    <section class="card panel bracket-scroll">
      ${renderBracket()}
    </section>
  `;
}

function renderBracket() {
  if (!state.tournament.rounds.length) {
    return `<div class="empty">No draw yet. Add players, then choose Generate Bracket.</div>`;
  }

  return `
    <div class="bracket">
      ${state.tournament.rounds.map((round, roundIndex) => `
        <div class="round">
          <h3>${escapeHtml(round.name)}</h3>
          ${round.matches.map((match, matchIndex) => `
            <div class="match">
              ${seedButton(match.a, match.winner, roundIndex, matchIndex)}
              ${seedButton(match.b, match.winner, roundIndex, matchIndex)}
            </div>
          `).join("")}
        </div>
      `).join("")}
    </div>
  `;
}

function seedButton(name, winner, roundIndex, matchIndex) {
  const isBye = !name || name === "Bye";
  return `
    <button class="seed ${winner === name ? "winner" : ""}" ${isBye ? "disabled" : ""} data-action="advance-winner" data-round="${roundIndex}" data-match="${matchIndex}" data-name="${escapeAttr(name || "")}">
      <span>${escapeHtml(name || "TBD")}</span>
      <span>${winner === name ? "W" : ""}</span>
    </button>
  `;
}

function matchResults() {
  return `
    ${title("Match Results")}
    <section class="card table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Opponent</th><th>Score</th><th>Result</th></tr></thead>
        <tbody>
          ${state.results.map((result) => `
            <tr>
              <td>${formatDate(result.date)}</td>
              <td>${escapeHtml(result.opponent)}</td>
              <td><strong>${escapeHtml(result.score)}</strong></td>
              <td><span class="badge ${result.result === "Loss" ? "danger" : result.result === "Draw" ? "warn" : ""}">${escapeHtml(result.result)}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function reports() {
  const played = state.results.length || 1;
  const wins = state.results.filter((item) => item.result === "Win").length;
  const replies = state.players.filter((item) => item.available !== "maybe").length;
  return `
    ${title("Reports")}
    <section class="report-grid">
      <article class="card panel">
        <h3>Season Summary</h3>
        ${reportRow("Wins", Math.round((wins / played) * 100))}
        ${reportRow("Availability replies", state.players.length ? Math.round((replies / state.players.length) * 100) : 0)}
        ${reportRow("Fixtures listed", Math.min(state.fixtures.length * 10, 100))}
      </article>
      <article class="card panel">
        <h3>Quick Notes</h3>
        <p class="meta">${state.players.filter((item) => item.available === "maybe").length} members are still marked maybe. ${state.fixtures.length} fixtures are currently saved.</p>
      </article>
    </section>
  `;
}

function saveClub() {
  state.club = {
    name: value("club-name"),
    sport: value("club-sport"),
    venue: value("club-venue"),
    contact: value("club-contact"),
    email: value("club-email"),
    teamFormat: value("club-format"),
    notes: value("club-notes")
  };
  state.notice = "Club settings saved.";
  saveAndRender();
}

function addPlayer() {
  state.players.push({ id: id(), name: "New Member", role: "Player", available: "maybe", team: "1" });
  state.notice = "Member added.";
  saveAndRender();
}

function updatePlayer(playerId) {
  const player = state.players.find((item) => item.id === playerId);
  if (!player) return;
  player.name = value(`player-name-${playerId}`);
  player.role = value(`player-role-${playerId}`);
  player.team = value(`player-team-${playerId}`);
  player.available = value(`player-available-${playerId}`);
  state.notice = "Member saved.";
  saveAndRender();
}

function removePlayer(playerId) {
  state.players = state.players.filter((item) => item.id !== playerId);
  state.notice = "Member removed.";
  saveAndRender();
}

function addFixture() {
  state.fixtures.push({ id: id(), date: today(), time: "14:00", home: state.club.name, away: "Opponent Club", venue: state.club.venue, type: "League", status: "Draft" });
  state.notice = "Fixture added.";
  saveAndRender();
}

function updateFixture(fixtureId) {
  const fixture = state.fixtures.find((item) => item.id === fixtureId);
  if (!fixture) return;
  fixture.date = value(`fixture-date-${fixtureId}`);
  fixture.time = value(`fixture-time-${fixtureId}`);
  fixture.home = value(`fixture-home-${fixtureId}`);
  fixture.away = value(`fixture-away-${fixtureId}`);
  fixture.venue = value(`fixture-venue-${fixtureId}`);
  fixture.type = value(`fixture-type-${fixtureId}`);
  fixture.status = value(`fixture-status-${fixtureId}`);
  state.notice = "Fixture saved.";
  saveAndRender();
}

function removeFixture(fixtureId) {
  state.fixtures = state.fixtures.filter((item) => item.id !== fixtureId);
  state.notice = "Fixture removed.";
  saveAndRender();
}

function addTournamentPlayer() {
  state.tournament.name = value("tournament-name");
  const name = value("tournament-player");
  if (!name) return;
  state.tournament.players.push(name);
  state.notice = "Tournament player added.";
  saveAndRender();
}

function renameTournamentPlayer(index) {
  state.tournament.name = value("tournament-name");
  state.tournament.players[index] = value(`tournament-player-${index}`);
  state.notice = "Tournament player renamed.";
  saveAndRender();
}

function removeTournamentPlayer(index) {
  state.tournament.players.splice(index, 1);
  state.tournament.rounds = [];
  state.notice = "Tournament player removed. Generate the bracket again when ready.";
  saveAndRender();
}

function useMembersForTournament() {
  state.tournament.players = state.players.map((player) => player.name).filter(Boolean);
  state.tournament.rounds = [];
  state.notice = "Members copied into tournament players.";
  saveAndRender();
}

function shuffleTournament() {
  state.tournament.name = value("tournament-name") || state.tournament.name;
  state.tournament.players = shuffle([...state.tournament.players]);
  generateBracketFromPlayers();
}

function clearBracket() {
  state.tournament.rounds = [];
  state.notice = "Tournament draw cleared.";
  saveAndRender();
}

function generateBracketFromPlayers() {
  state.tournament.name = value("tournament-name") || state.tournament.name;
  const players = state.tournament.players.map((name) => name.trim()).filter(Boolean);
  const size = nextPowerOfTwo(Math.max(players.length, 2));
  const seeded = [...players, ...Array(size - players.length).fill("Bye")];
  const roundCount = Math.log2(size);
  const rounds = [];

  for (let round = 0; round < roundCount; round += 1) {
    const matchCount = size / Math.pow(2, round + 1);
    rounds.push({
      name: roundName(round, roundCount),
      matches: Array.from({ length: matchCount }, (_, index) => {
        if (round === 0) {
          const a = seeded[index * 2] || "Bye";
          const b = seeded[index * 2 + 1] || "Bye";
          return { a, b, winner: a === "Bye" ? b : b === "Bye" ? a : "" };
        }
        return { a: "", b: "", winner: "" };
      })
    });
  }

  state.tournament.rounds = rounds;
  advanceByes();
  state.notice = `Bracket generated for ${players.length} players.`;
  saveAndRender();
}

function advanceWinner(roundIndex, matchIndex, winner) {
  if (!winner) return;
  const match = state.tournament.rounds[roundIndex].matches[matchIndex];
  match.winner = winner;
  clearFutureWinners(roundIndex, matchIndex);
  placeWinnerInNextRound(roundIndex, matchIndex, winner);
  advanceByes();
  state.notice = `${winner} advanced.`;
  saveAndRender();
}

function placeWinnerInNextRound(roundIndex, matchIndex, winner) {
  const nextRound = state.tournament.rounds[roundIndex + 1];
  if (!nextRound) return;
  const nextMatch = nextRound.matches[Math.floor(matchIndex / 2)];
  if (matchIndex % 2 === 0) nextMatch.a = winner;
  else nextMatch.b = winner;
}

function clearFutureWinners(roundIndex, matchIndex) {
  for (let round = roundIndex + 1; round < state.tournament.rounds.length; round += 1) {
    const affected = Math.floor(matchIndex / Math.pow(2, round - roundIndex));
    const match = state.tournament.rounds[round].matches[affected];
    if (match) match.winner = "";
  }
}

function advanceByes() {
  state.tournament.rounds.forEach((round, roundIndex) => {
    round.matches.forEach((match, matchIndex) => {
      if (!match.winner && match.a && (!match.b || match.b === "Bye")) {
        match.winner = match.a;
        placeWinnerInNextRound(roundIndex, matchIndex, match.a);
      }
      if (!match.winner && match.b && (!match.a || match.a === "Bye")) {
        match.winner = match.b;
        placeWinnerInNextRound(roundIndex, matchIndex, match.b);
      }
    });
  });
}

function importCsv(event, handler) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => handler(parseCsv(String(reader.result || "")));
  reader.readAsText(file);
}

function importMembers(rows) {
  state.players = rows.map((row) => ({
    id: id(),
    name: row.name || row.member || row.player || row[0] || "Unnamed Member",
    role: row.role || row.position || "Player",
    team: row.team || row.rink || row.squad || "",
    available: normalAvailability(row.available || row.availability || "maybe")
  }));
  state.notice = `${state.players.length} members imported.`;
  saveAndRender();
}

function importFixtures(rows) {
  state.fixtures = rows.map((row) => ({
    id: id(),
    date: row.date || row[0] || today(),
    time: row.time || row[1] || "",
    home: row.home || row[2] || state.club.name,
    away: row.away || row.opponent || row[3] || "Opponent Club",
    venue: row.venue || row[4] || state.club.venue,
    type: row.type || row.competition || row[5] || "Fixture",
    status: row.status || row[6] || "Draft"
  }));
  state.notice = `${state.fixtures.length} fixtures imported.`;
  saveAndRender();
}

function parseCsv(text) {
  const rows = [];
  let current = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      current.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      current.push(cell.trim());
      if (current.some(Boolean)) rows.push(current);
      current = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  current.push(cell.trim());
  if (current.some(Boolean)) rows.push(current);
  if (!rows.length) return [];

  const header = rows[0].map((item) => item.toLowerCase().trim());
  const hasHeader = header.some((item) => ["name", "member", "player", "date", "home", "away", "opponent"].includes(item));
  if (!hasHeader) return rows.map((row) => Object.assign([...row], row));

  return rows.slice(1).map((row) => {
    const item = Object.assign([...row], row);
    header.forEach((key, index) => {
      item[key] = row[index] || "";
    });
    return item;
  });
}

function inputField(idValue, label, currentValue) {
  return `<div class="field"><label for="${idValue}">${label}</label><input id="${idValue}" value="${escapeAttr(currentValue)}" /></div>`;
}

function reportRow(label, value) {
  return `<p><strong>${escapeHtml(label)}</strong></p><div class="bar"><span style="width:${value}%"></span></div>`;
}

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return normalizeState(structuredClone(starterData));
  try {
    return normalizeState({ ...structuredClone(starterData), ...JSON.parse(saved), notice: "" });
  } catch {
    return normalizeState(structuredClone(starterData));
  }
}

function normalizeState(data) {
  data.club = { ...starterData.club, ...(data.club || {}) };
  data.fixtures = (data.fixtures || []).map((fixture) => ({
    id: fixture.id || id(),
    date: fixture.date || today(),
    time: fixture.time || "",
    home: fixture.home || data.club.name,
    away: fixture.away || fixture.opponent || "Opponent Club",
    venue: fixture.venue || data.club.venue,
    type: fixture.type || fixture.competition || "Fixture",
    status: fixture.status || "Draft"
  }));
  data.players = (data.players || []).map((player) => ({
    id: player.id || id(),
    name: player.name || "Unnamed Member",
    role: player.role || player.position || "Player",
    available: normalAvailability(player.available || player.availability || "maybe"),
    team: player.team || player.rink || player.squad || ""
  }));
  data.tournament = {
    ...starterData.tournament,
    ...(data.tournament || {}),
    players: ((data.tournament && data.tournament.players) || []).filter(Boolean),
    rounds: ((data.tournament && data.tournament.rounds) || []).filter(Boolean)
  };
  data.results = (data.results || []).map((result) => ({ id: result.id || id(), ...result }));
  data.notice = "";
  return data;
}

function saveAndRender() {
  localStorage.setItem(storageKey, JSON.stringify({ ...state, notice: "" }));
  app();
}

function value(elementId) {
  const element = document.getElementById(elementId);
  return element ? element.value.trim() : "";
}

function id() {
  return Math.random().toString(36).slice(2, 10);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function nextPowerOfTwo(number) {
  return Math.pow(2, Math.ceil(Math.log2(number)));
}

function roundName(index, total) {
  const remaining = total - index;
  if (remaining === 1) return "Final";
  if (remaining === 2) return "Semi Finals";
  if (remaining === 3) return "Quarter Finals";
  return `Round ${index + 1}`;
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
  return items;
}

function normalAvailability(valueText) {
  const lowered = String(valueText).toLowerCase();
  if (["yes", "y", "available", "true"].includes(lowered)) return "yes";
  if (["no", "n", "unavailable", "false"].includes(lowered)) return "no";
  return "maybe";
}

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00`));
}

function escapeHtml(valueText) {
  return String(valueText || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(valueText) {
  return escapeHtml(valueText);
}

app();
