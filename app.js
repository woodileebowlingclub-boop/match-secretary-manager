const STORAGE_KEY = "clubMatchSecretaryManagerEtsyV1";

const demoData = {
  clubName: "Club Name",
  clubType: "Sports Club",
  clubVenue: "",
  clubContact: "",
  clubEmail: "",
  clubPhone: "",
  pin: "1234",
  colours: {
    header: "#173b69",
    section: "#2f8b57",
    button: "#2f8b57"
  },
  activePage: "Dashboard",
  fixtures: [],
  players: [],
  team: [],
  tournament: {
    name: "Tournament",
    players: [],
    rounds: []
  },
  results: [],
  leagueTable: [],
  transport: [],
  catering: [],
  contacts: [],
  notice: ""
};

let state = loadState();
let unlocked = sessionStorage.getItem("clubMatchSecretaryUnlocked") === "yes";

const pages = [
  "Dashboard",
  "Fixtures",
  "Members",
  "Availability",
  "Team Selection",
  "Tournaments",
  "Match Results",
  "League Table",
  "Transport",
  "Catering",
  "Contacts",
  "Reports",
  "Settings"
];

function render() {
  if (!unlocked) {
    renderPinScreen();
    return;
  }

  document.getElementById("app").innerHTML = `
    <div class="app-shell" style="${themeStyle()}">
      <header class="topbar">
        <div class="brand">
          <div class="logo-mark" aria-hidden="true">CM</div>
          <div>
            <h1>Club Match Secretary Manager</h1>
            <p>${escapeHtml(state.clubName)} - ${escapeHtml(state.clubType)} - fixtures, teams, availability, results and reports</p>
          </div>
        </div>
        <nav class="tabs" aria-label="App sections">
          ${pages.map((page) => `<button class="tab ${state.activePage === page ? "active" : ""}" data-page="${page}">${page}</button>`).join("")}
        </nav>
      </header>

      <main class="main">
        ${state.notice ? `<div class="notice">${escapeHtml(state.notice)}</div>` : ""}
        ${renderPage()}
      </main>
    </div>
  `;

  wireNavigation();
  wireActions();
}

function renderPinScreen() {
  document.getElementById("app").innerHTML = `
    <main class="pin-screen" style="${themeStyle()}">
      <section class="card pin-card">
        <div class="logo-mark pin-logo" aria-hidden="true">CM</div>
        <h1>Club Match Secretary Manager</h1>
        <p class="help-text">Enter your PIN to open the app.</p>
        <label class="field-label">
          PIN
          <input id="pin-input" type="password" inputmode="numeric" autocomplete="off" />
        </label>
        <button class="button primary" data-pin-login>Open App</button>
        ${state.notice ? `<div class="notice">${escapeHtml(state.notice)}</div>` : ""}
        <p class="help-text">Default PIN: 1234. Change it in Settings after opening.</p>
      </section>
    </main>
  `;

  document.querySelector("[data-pin-login]").addEventListener("click", unlockWithPin);
  document.getElementById("pin-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlockWithPin();
  });
}

function renderPage() {
  const pageMap = {
    Dashboard: renderDashboard,
    Fixtures: renderFixtures,
    Members: renderMembers,
    Availability: renderAvailability,
    "Team Selection": renderTeamSelection,
    Tournaments: renderTournaments,
    "Match Results": renderResults,
    "League Table": renderLeagueTable,
    Transport: renderTransport,
    Catering: renderCatering,
    Contacts: renderContacts,
    Reports: renderReports,
    Settings: renderSettings
  };
  return pageMap[state.activePage]();
}

function pageTitle(title, actions = "") {
  return `
    <div class="page-title">
      <h2>${title}</h2>
      <div class="actions">${actions}</div>
    </div>
  `;
}

function sectionButtons(sectionId, csvType = "") {
  return `
    <button class="button" data-action="print" data-print="${sectionId}">Print</button>
    <button class="button" data-action="export-pdf" data-print="${sectionId}">Export PDF</button>
    ${csvType ? `<button class="button" data-action="export-csv" data-csv="${csvType}">Export CSV</button>` : ""}
  `;
}

function renderDashboard() {
  const nextFixture = [...state.fixtures].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))[0];
  return `
    ${pageTitle("Dashboard", sectionButtons("dashboard-print"))}
    <section id="dashboard-print">
      <section class="summary-grid">
        ${summaryCard("Fixtures", state.fixtures.length)}
        ${summaryCard("Members", state.players.length)}
        ${summaryCard("Available", state.players.filter((player) => player.availability === "Available").length)}
        ${summaryCard("Team Sheet", state.team.length)}
        ${summaryCard("Tournament Players", state.tournament.players.length)}
        ${summaryCard("Transport", state.transport.length)}
        ${summaryCard("Catering", state.catering.length)}
        ${summaryCard("Contacts", state.contacts.length)}
      </section>
      <section class="card next-card">
        <span class="eyebrow">Next Fixture</span>
        ${nextFixture ? `
          <h3>${escapeHtml(nextFixture.home)} v ${escapeHtml(nextFixture.away)}</h3>
          <p>${formatDate(nextFixture.date)} at ${escapeHtml(nextFixture.time)} - ${escapeHtml(nextFixture.venue)} - ${escapeHtml(nextFixture.competition)}</p>
        ` : "<p>No fixtures added yet. Use the Fixtures section to add your first fixture.</p>"}
      </section>
      <section class="card panel club-details">
        <h3>Club Details</h3>
        <p><strong>Type:</strong> ${escapeHtml(state.clubType)}</p>
        <p><strong>Venue:</strong> ${escapeHtml(state.clubVenue || "Not added")}</p>
        <p><strong>Contact:</strong> ${escapeHtml(state.clubContact || "Not added")}</p>
        <p><strong>Email:</strong> ${escapeHtml(state.clubEmail || "Not added")}</p>
        <p><strong>Phone:</strong> ${escapeHtml(state.clubPhone || "Not added")}</p>
      </section>
    </section>
  `;
}

function summaryCard(label, value) {
  return `<article class="card summary-card"><strong>${value}</strong><span>${label}</span></article>`;
}

function renderFixtures() {
  return `
    ${pageTitle("Fixtures", `
      <button class="button primary" data-action="add-fixture">Add Fixture</button>
      ${sectionButtons("fixtures-print", "fixtures")}
    `)}
    <section class="card panel" id="fixtures-print">
      <h3>Fixtures</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Date</th><th>Time</th><th>Home</th><th>Away</th><th>Venue</th><th>Competition</th><th>Status</th><th class="no-print">Actions</th></tr>
          </thead>
          <tbody>
            ${state.fixtures.length ? state.fixtures.map((fixture) => `
              <tr>
                <td>${formatDate(fixture.date)}</td>
                <td>${escapeHtml(fixture.time)}</td>
                <td>${escapeHtml(fixture.home)}</td>
                <td>${escapeHtml(fixture.away)}</td>
                <td>${escapeHtml(fixture.venue)}</td>
                <td>${escapeHtml(fixture.competition)}</td>
                <td><span class="badge">${escapeHtml(fixture.status)}</span></td>
                <td class="row-actions no-print">
                  <button class="small-button" data-action="edit-fixture" data-id="${fixture.id}">Edit Fixture</button>
                  <button class="small-button danger" data-action="delete-fixture" data-id="${fixture.id}">Delete Fixture</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="8" class="empty">No fixtures added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderMembers() {
  return `
    ${pageTitle("Members", `
      <button class="button primary" data-action="add-player">Add Player</button>
      ${sectionButtons("members-print", "members")}
    `)}
    <section class="card panel" id="members-print">
      <h3>Members</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Member</th><th>Role</th><th>Phone</th><th>Email</th><th>Availability</th><th class="no-print">Actions</th></tr>
          </thead>
          <tbody>
            ${state.players.length ? state.players.map((player) => `
              <tr>
                <td>${escapeHtml(player.name)}</td>
                <td>${escapeHtml(player.role)}</td>
                <td>${escapeHtml(player.phone)}</td>
                <td>${escapeHtml(player.email)}</td>
                <td><span class="badge ${availabilityClass(player.availability)}">${escapeHtml(player.availability)}</span></td>
                <td class="row-actions no-print">
                  <button class="small-button" data-action="edit-player" data-id="${player.id}">Edit Player</button>
                  <button class="small-button danger" data-action="delete-player" data-id="${player.id}">Delete Player</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="6" class="empty">No players added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderAvailability() {
  return `
    ${pageTitle("Availability", `
      ${sectionButtons("availability-print", "availability")}
    `)}
    <section class="card panel" id="availability-print">
      <h3>Availability Report</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Member</th><th>Role</th><th>Availability</th><th class="no-print">Actions</th></tr>
          </thead>
          <tbody>
            ${state.players.length ? state.players.map((player) => `
              <tr>
                <td>${escapeHtml(player.name)}</td>
                <td>${escapeHtml(player.role)}</td>
                <td><span class="badge ${availabilityClass(player.availability)}">${escapeHtml(player.availability)}</span></td>
                <td class="row-actions no-print">
                  <button class="small-button success" data-action="set-availability" data-id="${player.id}" data-value="Available">Mark Available</button>
                  <button class="small-button warning" data-action="set-availability" data-id="${player.id}" data-value="Unsure">Mark Unsure</button>
                  <button class="small-button danger" data-action="set-availability" data-id="${player.id}" data-value="Unavailable">Mark Unavailable</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="4" class="empty">No members added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderTeamSelection() {
  return `
    ${pageTitle("Team Selection", `
      <button class="button primary" data-action="add-team-player">Add Player to Team</button>
      <button class="button danger" data-action="clear-team">Clear Team</button>
      ${sectionButtons("team-print")}
    `)}
    <section class="card panel" id="team-print">
      <h3>Team Sheet</h3>
      ${state.team.length ? `
        <div class="table-wrap">
          <table>
            <thead><tr><th>Position</th><th>Player</th><th class="no-print">Actions</th></tr></thead>
            <tbody>
              ${state.team.map((member) => `
                <tr>
                  <td>${escapeHtml(member.position)}</td>
                  <td>${escapeHtml(member.playerName)}</td>
                  <td class="row-actions no-print">
                    <button class="small-button danger" data-action="remove-team-player" data-id="${member.id}">Remove Player from Team</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      ` : `<p class="empty">No players selected for the team yet.</p>`}
    </section>
  `;
}

function renderTournaments() {
  return `
    ${pageTitle("Tournaments", `
      <button class="button primary" data-action="add-tournament-player">Add Tournament Player</button>
      <button class="button" data-action="use-players-for-tournament">Use Player List</button>
      <button class="button" data-action="shuffle-tournament">Shuffle Draw</button>
      <button class="button primary" data-action="generate-tournament">Generate Bracket</button>
      <button class="button danger" data-action="clear-tournament">Clear Bracket</button>
      ${sectionButtons("tournament-print")}
    `)}
    <section class="tournament-grid">
      <article class="card panel">
        <h3>Tournament Setup</h3>
        <label class="field-label">
          Tournament name
          <input id="tournament-name-input" value="${escapeAttr(state.tournament.name)}" />
        </label>
        <div class="chips">
          ${state.tournament.players.map((player, index) => `
            <span class="chip">
              <input id="tournament-player-${index}" value="${escapeAttr(player)}" />
              <button data-action="edit-tournament-player" data-index="${index}">Edit Player</button>
              <button data-action="delete-tournament-player" data-index="${index}">Delete Player</button>
            </span>
          `).join("")}
        </div>
      </article>
      <article class="card panel">
        <h3>How to use</h3>
        <p class="help-text">Add any number of players, generate a knockout bracket, then click a player name in a match to advance them.</p>
      </article>
    </section>
    <section class="card panel bracket-card" id="tournament-print">
      <h3>${escapeHtml(state.tournament.name)}</h3>
      ${renderBracket()}
    </section>
  `;
}

function renderBracket() {
  if (!state.tournament.rounds.length) {
    return `<p class="empty">No bracket generated yet.</p>`;
  }

  return `
    <div class="bracket">
      ${state.tournament.rounds.map((round, roundIndex) => `
        <div class="round">
          <h4>${escapeHtml(round.name)}</h4>
          ${round.matches.map((match, matchIndex) => `
            <div class="match">
              ${renderSeed(match.a, match.winner, roundIndex, matchIndex)}
              ${renderSeed(match.b, match.winner, roundIndex, matchIndex)}
            </div>
          `).join("")}
        </div>
      `).join("")}
    </div>
  `;
}

function renderSeed(name, winner, roundIndex, matchIndex) {
  const disabled = !name || name === "Bye";
  return `
    <button
      class="seed ${winner === name ? "winner" : ""}"
      ${disabled ? "disabled" : ""}
      data-action="advance-tournament-player"
      data-round="${roundIndex}"
      data-match="${matchIndex}"
      data-name="${escapeAttr(name || "")}"
    >
      <span>${escapeHtml(name || "TBD")}</span>
      <span>${winner === name ? "Winner" : ""}</span>
    </button>
  `;
}

function renderResults() {
  return `
    ${pageTitle("Match Results", `
      <button class="button primary" data-action="add-result">Add Result</button>
      ${sectionButtons("results-print", "results")}
    `)}
    <section class="card panel" id="results-print">
      <h3>Results</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Opponent</th><th>Competition</th><th>Score</th><th>Outcome</th><th class="no-print">Actions</th></tr></thead>
          <tbody>
            ${state.results.length ? state.results.map((result) => `
              <tr>
                <td>${formatDate(result.date)}</td>
                <td>${escapeHtml(result.opponent)}</td>
                <td>${escapeHtml(result.competition)}</td>
                <td>${escapeHtml(result.scoreFor)} - ${escapeHtml(result.scoreAgainst)}</td>
                <td><span class="badge ${result.outcome === "Win" ? "success-badge" : result.outcome === "Loss" ? "danger-badge" : "warning-badge"}">${escapeHtml(result.outcome)}</span></td>
                <td class="row-actions no-print">
                  <button class="small-button" data-action="edit-result" data-id="${result.id}">Edit Result</button>
                  <button class="small-button danger" data-action="delete-result" data-id="${result.id}">Delete Result</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="6" class="empty">No results added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderLeagueTable() {
  return `
    ${pageTitle("League Table", `
      <button class="button primary" data-action="add-league-team">Add Team</button>
      ${sectionButtons("league-print", "league")}
    `)}
    <section class="card panel" id="league-print">
      <h3>League Table</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Team</th><th>Played</th><th>Won</th><th>Drawn</th><th>Lost</th><th>Points</th><th class="no-print">Actions</th></tr></thead>
          <tbody>
            ${state.leagueTable.length ? state.leagueTable.map((team) => `
              <tr>
                <td>${escapeHtml(team.team)}</td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.drawn}</td>
                <td>${team.lost}</td>
                <td><strong>${team.points}</strong></td>
                <td class="row-actions no-print">
                  <button class="small-button" data-action="edit-league-team" data-id="${team.id}">Edit Team</button>
                  <button class="small-button danger" data-action="delete-league-team" data-id="${team.id}">Delete Team</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="7" class="empty">No league teams added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderTransport() {
  return `
    ${pageTitle("Transport", `
      <button class="button primary" data-action="add-transport">Add Transport</button>
      ${sectionButtons("transport-print")}
    `)}
    <section class="card panel" id="transport-print">
      <h3>Transport</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Fixture</th><th>Driver</th><th>Seats</th><th>Notes</th><th class="no-print">Actions</th></tr></thead>
          <tbody>
            ${state.transport.length ? state.transport.map((item) => `
              <tr>
                <td>${formatDate(item.date)}</td>
                <td>${escapeHtml(item.fixture)}</td>
                <td>${escapeHtml(item.driver)}</td>
                <td>${escapeHtml(item.seats)}</td>
                <td>${escapeHtml(item.notes)}</td>
                <td class="row-actions no-print">
                  <button class="small-button" data-action="edit-transport" data-id="${item.id}">Edit Transport</button>
                  <button class="small-button danger" data-action="delete-transport" data-id="${item.id}">Delete Transport</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="6" class="empty">No transport added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderCatering() {
  return `
    ${pageTitle("Catering", `
      <button class="button primary" data-action="add-catering">Add Catering</button>
      ${sectionButtons("catering-print")}
    `)}
    <section class="card panel" id="catering-print">
      <h3>Catering</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Fixture / Event</th><th>Required</th><th>Responsible</th><th>Notes</th><th class="no-print">Actions</th></tr></thead>
          <tbody>
            ${state.catering.length ? state.catering.map((item) => `
              <tr>
                <td>${formatDate(item.date)}</td>
                <td>${escapeHtml(item.event)}</td>
                <td>${escapeHtml(item.required)}</td>
                <td>${escapeHtml(item.responsible)}</td>
                <td>${escapeHtml(item.notes)}</td>
                <td class="row-actions no-print">
                  <button class="small-button" data-action="edit-catering" data-id="${item.id}">Edit Catering</button>
                  <button class="small-button danger" data-action="delete-catering" data-id="${item.id}">Delete Catering</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="6" class="empty">No catering added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderContacts() {
  return `
    ${pageTitle("Contacts", `
      <button class="button primary" data-action="add-contact">Add Contact</button>
      ${sectionButtons("contacts-print")}
    `)}
    <section class="card panel" id="contacts-print">
      <h3>Contacts</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Club / Organisation</th><th>Role</th><th>Phone</th><th>Email</th><th class="no-print">Actions</th></tr></thead>
          <tbody>
            ${state.contacts.length ? state.contacts.map((item) => `
              <tr>
                <td>${escapeHtml(item.name)}</td>
                <td>${escapeHtml(item.club)}</td>
                <td>${escapeHtml(item.role)}</td>
                <td>${escapeHtml(item.phone)}</td>
                <td>${escapeHtml(item.email)}</td>
                <td class="row-actions no-print">
                  <button class="small-button" data-action="edit-contact" data-id="${item.id}">Edit Contact</button>
                  <button class="small-button danger" data-action="delete-contact" data-id="${item.id}">Delete Contact</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="6" class="empty">No contacts added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderReports() {
  return `
    ${pageTitle("Reports", sectionButtons("reports-print"))}
    <section class="report-grid">
      <article class="card panel">
        <h3>Print Reports</h3>
        <div class="report-buttons">
          <button class="button" data-action="print" data-print="team-print-source">Printable Team Sheet</button>
          <button class="button" data-action="print" data-print="fixtures-print-source">Fixture List</button>
          <button class="button" data-action="print" data-print="members-print-source">Member List</button>
          <button class="button" data-action="print" data-print="availability-print-source">Availability Report</button>
          <button class="button" data-action="print" data-print="results-print-source">Results Summary</button>
          <button class="button" data-action="print" data-print="league-print-source">League Table Report</button>
          <button class="button" data-action="print" data-print="tournament-print-source">Tournament Draw Report</button>
        </div>
      </article>
      <article class="card panel">
        <h3>Summary</h3>
        <p>${state.fixtures.length} fixtures, ${state.players.length} players, ${state.tournament.players.length} tournament players, ${state.results.length} results and ${state.leagueTable.length} league teams saved.</p>
      </article>
    </section>
    <div id="reports-print">
      ${printBlock("Printable Team Sheet", renderTeamPrintRows())}
      ${printBlock("Fixture List", renderFixturePrintRows())}
      ${printBlock("Member List", renderMemberPrintRows())}
      ${printBlock("Availability Report", renderAvailabilityPrintRows())}
      ${printBlock("Results Summary", renderResultPrintRows())}
      ${printBlock("League Table Report", renderLeaguePrintRows())}
      ${printBlock("Tournament Draw Report", renderBracket())}
    </div>
    <div class="print-sources">
      <section id="team-print-source">${printBlock("Team Sheet", renderTeamPrintRows())}</section>
      <section id="fixtures-print-source">${printBlock("Fixtures", renderFixturePrintRows())}</section>
      <section id="members-print-source">${printBlock("Member List", renderMemberPrintRows())}</section>
      <section id="availability-print-source">${printBlock("Availability", renderAvailabilityPrintRows())}</section>
      <section id="results-print-source">${printBlock("Results", renderResultPrintRows())}</section>
      <section id="league-print-source">${printBlock("League Table", renderLeaguePrintRows())}</section>
      <section id="tournament-print-source">${printBlock(state.tournament.name, renderBracket())}</section>
    </div>
  `;
}

function printBlock(title, content) {
  return `<div class="card panel"><h3>${title}</h3>${content}</div>`;
}

function renderSettings() {
  return `
    ${pageTitle("Settings", `<button class="button primary" data-action="save-settings">Save Settings</button>`)}
    <section class="card panel settings-panel">
      <h3>Club Details</h3>
      <div class="settings-grid">
        <label>
          Club name
          <input id="setting-club-name" value="${escapeAttr(state.clubName)}" />
        </label>
        <label>
          Type of club
          <input id="setting-club-type" value="${escapeAttr(state.clubType)}" placeholder="Bowling Club, Sports Club, Tennis Club..." />
        </label>
        <label>
          Venue / home ground
          <input id="setting-club-venue" value="${escapeAttr(state.clubVenue)}" />
        </label>
        <label>
          Contact name
          <input id="setting-club-contact" value="${escapeAttr(state.clubContact)}" />
        </label>
        <label>
          Contact email
          <input id="setting-club-email" value="${escapeAttr(state.clubEmail)}" />
        </label>
        <label>
          Contact phone
          <input id="setting-club-phone" value="${escapeAttr(state.clubPhone)}" />
        </label>
      </div>
      <h3>Colours</h3>
      <div class="settings-grid colour-grid">
        <label>
          Header colour
          <input id="setting-colour-header" type="color" value="${escapeAttr(state.colours.header)}" />
        </label>
        <label>
          Section accent colour
          <input id="setting-colour-section" type="color" value="${escapeAttr(state.colours.section)}" />
        </label>
        <label>
          Main button colour
          <input id="setting-colour-button" type="color" value="${escapeAttr(state.colours.button)}" />
        </label>
      </div>
      <h3>PIN</h3>
      <div class="settings-grid">
        <label>
          Change PIN
          <input id="setting-pin" type="password" inputmode="numeric" value="${escapeAttr(state.pin)}" />
        </label>
      </div>
      <p class="help-text">This is a standalone product template. All customer data saves only in this browser using localStorage.</p>
    </section>
  `;
}

function wireNavigation() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePage = button.dataset.page;
      state.notice = "";
      saveAndRender();
    });
  });
}

function wireActions() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button));
  });
}

function unlockWithPin() {
  const enteredPin = valueFromInput("pin-input");
  if (enteredPin === state.pin) {
    unlocked = true;
    sessionStorage.setItem("clubMatchSecretaryUnlocked", "yes");
    state.notice = "";
    render();
    return;
  }
  state.notice = "Incorrect PIN.";
  renderPinScreen();
}

function handleAction(button) {
  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "print") printElement(button.dataset.print);
  if (action === "export-pdf") printElement(button.dataset.print);
  if (action === "export-csv") exportCsv(button.dataset.csv);
  if (action === "save-settings") saveSettings();

  if (action === "add-fixture") addFixture();
  if (action === "edit-fixture") editFixture(id);
  if (action === "delete-fixture") deleteItem("fixtures", id, "Fixture deleted.");

  if (action === "add-player") addPlayer();
  if (action === "edit-player") editPlayer(id);
  if (action === "delete-player") deletePlayer(id);
  if (action === "set-availability") setAvailability(id, button.dataset.value);

  if (action === "add-team-player") addTeamPlayer();
  if (action === "remove-team-player") deleteItem("team", id, "Player removed from team.");
  if (action === "clear-team") clearTeam();

  if (action === "add-tournament-player") addTournamentPlayer();
  if (action === "edit-tournament-player") editTournamentPlayer(Number(button.dataset.index));
  if (action === "delete-tournament-player") deleteTournamentPlayer(Number(button.dataset.index));
  if (action === "use-players-for-tournament") usePlayersForTournament();
  if (action === "shuffle-tournament") shuffleTournament();
  if (action === "generate-tournament") generateTournament();
  if (action === "clear-tournament") clearTournament();
  if (action === "advance-tournament-player") advanceTournamentPlayer(Number(button.dataset.round), Number(button.dataset.match), button.dataset.name);

  if (action === "add-result") addResult();
  if (action === "edit-result") editResult(id);
  if (action === "delete-result") deleteItem("results", id, "Result deleted.");

  if (action === "add-league-team") addLeagueTeam();
  if (action === "edit-league-team") editLeagueTeam(id);
  if (action === "delete-league-team") deleteItem("leagueTable", id, "League team deleted.");

  if (action === "add-transport") addTransport();
  if (action === "edit-transport") editTransport(id);
  if (action === "delete-transport") deleteItem("transport", id, "Transport deleted.");

  if (action === "add-catering") addCatering();
  if (action === "edit-catering") editCatering(id);
  if (action === "delete-catering") deleteItem("catering", id, "Catering deleted.");

  if (action === "add-contact") addContact();
  if (action === "edit-contact") editContact(id);
  if (action === "delete-contact") deleteItem("contacts", id, "Contact deleted.");
}

function addFixture() {
  const fixture = fixturePrompt();
  if (!fixture) return;
  state.fixtures.push({ id: createId(), ...fixture });
  state.notice = "Fixture added.";
  saveAndRender();
}

function editFixture(id) {
  const fixture = findById(state.fixtures, id);
  const updated = fixturePrompt(fixture);
  if (!updated) return;
  Object.assign(fixture, updated);
  state.notice = "Fixture edited.";
  saveAndRender();
}

function fixturePrompt(existing = {}) {
  const date = prompt("Fixture date (YYYY-MM-DD)", existing.date || today());
  if (date === null) return null;
  const time = prompt("Fixture time", existing.time || "14:00");
  if (time === null) return null;
  const home = prompt("Home team", existing.home || state.clubName);
  if (home === null) return null;
  const away = prompt("Away team", existing.away || "");
  if (away === null) return null;
  const venue = prompt("Venue", existing.venue || state.clubVenue);
  if (venue === null) return null;
  const competition = prompt("Competition", existing.competition || "");
  if (competition === null) return null;
  const status = prompt("Status", existing.status || "Confirmed");
  if (status === null) return null;
  return { date, time, home, away, venue, competition, status };
}

function addPlayer() {
  const player = playerPrompt();
  if (!player) return;
  state.players.push({ id: createId(), ...player });
  state.notice = "Player added.";
  saveAndRender();
}

function editPlayer(id) {
  const player = findById(state.players, id);
  const updated = playerPrompt(player);
  if (!updated) return;
  Object.assign(player, updated);
  state.team.forEach((teamPlayer) => {
    if (teamPlayer.playerName === player.name) teamPlayer.playerName = updated.name;
  });
  state.notice = "Player edited.";
  saveAndRender();
}

function playerPrompt(existing = {}) {
  const name = prompt("Player name", existing.name || "");
  if (name === null) return null;
  const role = prompt("Role / position", existing.role || "Player");
  if (role === null) return null;
  const phone = prompt("Phone", existing.phone || "");
  if (phone === null) return null;
  const email = prompt("Email", existing.email || "");
  if (email === null) return null;
  const availability = prompt("Availability: Available, Unavailable or Unsure", existing.availability || "Unsure");
  if (availability === null) return null;
  return { name, role, phone, email, availability: normaliseAvailability(availability) };
}

function deletePlayer(id) {
  const player = findById(state.players, id);
  state.players = state.players.filter((item) => item.id !== id);
  state.team = state.team.filter((item) => item.playerName !== player.name);
  state.notice = "Player deleted.";
  saveAndRender();
}

function setAvailability(id, availability) {
  const player = findById(state.players, id);
  player.availability = availability;
  state.notice = `${player.name} marked ${availability}.`;
  saveAndRender();
}

function addTeamPlayer() {
  const playerNames = state.players.map((player) => player.name).join(", ");
  const playerName = prompt(`Add player to team. Available players: ${playerNames || "none added yet"}`, state.players[0]?.name || "");
  if (playerName === null) return;
  const position = prompt("Team position / rink / role", "Player");
  if (position === null) return;
  state.team.push({ id: createId(), playerName, position });
  state.notice = "Player added to team.";
  saveAndRender();
}

function clearTeam() {
  if (!confirm("Clear the whole team sheet?")) return;
  state.team = [];
  state.notice = "Team cleared.";
  saveAndRender();
}

function addTournamentPlayer() {
  saveTournamentName();
  const name = prompt("Tournament player name", "");
  if (name === null || !name.trim()) return;
  state.tournament.players.push(name.trim());
  state.tournament.rounds = [];
  state.notice = "Tournament player added.";
  saveAndRender();
}

function editTournamentPlayer(index) {
  saveTournamentName();
  const currentName = state.tournament.players[index];
  const name = prompt("Edit tournament player", currentName);
  if (name === null || !name.trim()) return;
  state.tournament.players[index] = name.trim();
  state.tournament.rounds = [];
  state.notice = "Tournament player edited. Generate the bracket again when ready.";
  saveAndRender();
}

function deleteTournamentPlayer(index) {
  if (!confirm("Delete this tournament player?")) return;
  state.tournament.players.splice(index, 1);
  state.tournament.rounds = [];
  state.notice = "Tournament player deleted.";
  saveAndRender();
}

function usePlayersForTournament() {
  saveTournamentName();
  state.tournament.players = state.players.map((player) => player.name).filter(Boolean);
  state.tournament.rounds = [];
  state.notice = "Player list copied into tournament.";
  saveAndRender();
}

function shuffleTournament() {
  saveTournamentName();
  state.tournament.players = shuffle([...state.tournament.players]);
  state.tournament.rounds = [];
  state.notice = "Tournament players shuffled. Generate the bracket when ready.";
  saveAndRender();
}

function generateTournament() {
  saveTournamentName();
  const players = state.tournament.players.map((player) => player.trim()).filter(Boolean);
  if (players.length < 2) {
    alert("Add at least two tournament players first.");
    return;
  }

  const size = nextPowerOfTwo(players.length);
  const seeded = [...players, ...Array(size - players.length).fill("Bye")];
  const roundCount = Math.log2(size);

  state.tournament.rounds = Array.from({ length: roundCount }, (_, roundIndex) => {
    const matchCount = size / Math.pow(2, roundIndex + 1);
    return {
      name: tournamentRoundName(roundIndex, roundCount),
      matches: Array.from({ length: matchCount }, (_, matchIndex) => {
        if (roundIndex === 0) {
          const a = seeded[matchIndex * 2];
          const b = seeded[matchIndex * 2 + 1];
          return { a, b, winner: a === "Bye" ? b : b === "Bye" ? a : "" };
        }
        return { a: "", b: "", winner: "" };
      })
    };
  });

  advanceTournamentByes();
  state.notice = "Tournament bracket generated.";
  saveAndRender();
}

function clearTournament() {
  if (!confirm("Clear the tournament bracket? Players will stay in the tournament list.")) return;
  state.tournament.rounds = [];
  state.notice = "Tournament bracket cleared.";
  saveAndRender();
}

function advanceTournamentPlayer(roundIndex, matchIndex, winner) {
  if (!winner) return;
  const match = state.tournament.rounds[roundIndex]?.matches[matchIndex];
  if (!match) return;
  match.winner = winner;
  placeTournamentWinner(roundIndex, matchIndex, winner);
  clearLaterTournamentWinners(roundIndex + 1, Math.floor(matchIndex / 2));
  advanceTournamentByes();
  state.notice = `${winner} advanced.`;
  saveAndRender();
}

function placeTournamentWinner(roundIndex, matchIndex, winner) {
  const nextRound = state.tournament.rounds[roundIndex + 1];
  if (!nextRound) return;
  const nextMatch = nextRound.matches[Math.floor(matchIndex / 2)];
  if (matchIndex % 2 === 0) nextMatch.a = winner;
  else nextMatch.b = winner;
  nextMatch.winner = "";
}

function clearLaterTournamentWinners(roundIndex, matchIndex) {
  for (let index = roundIndex; index < state.tournament.rounds.length; index += 1) {
    const match = state.tournament.rounds[index].matches[matchIndex];
    if (match) match.winner = "";
    matchIndex = Math.floor(matchIndex / 2);
  }
}

function advanceTournamentByes() {
  state.tournament.rounds.forEach((round, roundIndex) => {
    round.matches.forEach((match, matchIndex) => {
      if (!match.winner && match.a && (!match.b || match.b === "Bye")) {
        match.winner = match.a;
        placeTournamentWinner(roundIndex, matchIndex, match.a);
      }
      if (!match.winner && match.b && (!match.a || match.a === "Bye")) {
        match.winner = match.b;
        placeTournamentWinner(roundIndex, matchIndex, match.b);
      }
    });
  });
}

function saveTournamentName() {
  const input = document.getElementById("tournament-name-input");
  if (input) state.tournament.name = input.value.trim() || "Example Tournament";
}

function addResult() {
  const result = resultPrompt();
  if (!result) return;
  state.results.push({ id: createId(), ...result });
  state.notice = "Result added.";
  saveAndRender();
}

function editResult(id) {
  const result = findById(state.results, id);
  const updated = resultPrompt(result);
  if (!updated) return;
  Object.assign(result, updated);
  state.notice = "Result edited.";
  saveAndRender();
}

function resultPrompt(existing = {}) {
  const date = prompt("Result date (YYYY-MM-DD)", existing.date || today());
  if (date === null) return null;
  const opponent = prompt("Opponent", existing.opponent || "");
  if (opponent === null) return null;
  const competition = prompt("Competition", existing.competition || "");
  if (competition === null) return null;
  const scoreFor = Number(prompt("Score for", existing.scoreFor ?? 0));
  if (Number.isNaN(scoreFor)) return null;
  const scoreAgainst = Number(prompt("Score against", existing.scoreAgainst ?? 0));
  if (Number.isNaN(scoreAgainst)) return null;
  const outcome = prompt("Outcome: Win, Loss or Draw", existing.outcome || "Win");
  if (outcome === null) return null;
  return { date, opponent, competition, scoreFor, scoreAgainst, outcome };
}

function addLeagueTeam() {
  const team = leagueTeamPrompt();
  if (!team) return;
  state.leagueTable.push({ id: createId(), ...team });
  state.notice = "League team added.";
  saveAndRender();
}

function addTransport() {
  const item = transportPrompt();
  if (!item) return;
  state.transport.push({ id: createId(), ...item });
  state.notice = "Transport added.";
  saveAndRender();
}

function editTransport(id) {
  const item = findById(state.transport, id);
  const updated = transportPrompt(item);
  if (!updated) return;
  Object.assign(item, updated);
  state.notice = "Transport edited.";
  saveAndRender();
}

function transportPrompt(existing = {}) {
  const date = prompt("Transport date (YYYY-MM-DD)", existing.date || today());
  if (date === null) return null;
  const fixture = prompt("Fixture / event", existing.fixture || "");
  if (fixture === null) return null;
  const driver = prompt("Driver / organiser", existing.driver || "");
  if (driver === null) return null;
  const seats = prompt("Seats / spaces", existing.seats || "");
  if (seats === null) return null;
  const notes = prompt("Notes", existing.notes || "");
  if (notes === null) return null;
  return { date, fixture, driver, seats, notes };
}

function addCatering() {
  const item = cateringPrompt();
  if (!item) return;
  state.catering.push({ id: createId(), ...item });
  state.notice = "Catering added.";
  saveAndRender();
}

function editCatering(id) {
  const item = findById(state.catering, id);
  const updated = cateringPrompt(item);
  if (!updated) return;
  Object.assign(item, updated);
  state.notice = "Catering edited.";
  saveAndRender();
}

function cateringPrompt(existing = {}) {
  const date = prompt("Catering date (YYYY-MM-DD)", existing.date || today());
  if (date === null) return null;
  const event = prompt("Fixture / event", existing.event || "");
  if (event === null) return null;
  const required = prompt("Catering required", existing.required || "");
  if (required === null) return null;
  const responsible = prompt("Responsible person", existing.responsible || "");
  if (responsible === null) return null;
  const notes = prompt("Notes", existing.notes || "");
  if (notes === null) return null;
  return { date, event, required, responsible, notes };
}

function addContact() {
  const item = contactPrompt();
  if (!item) return;
  state.contacts.push({ id: createId(), ...item });
  state.notice = "Contact added.";
  saveAndRender();
}

function editContact(id) {
  const item = findById(state.contacts, id);
  const updated = contactPrompt(item);
  if (!updated) return;
  Object.assign(item, updated);
  state.notice = "Contact edited.";
  saveAndRender();
}

function contactPrompt(existing = {}) {
  const name = prompt("Contact name", existing.name || "");
  if (name === null) return null;
  const club = prompt("Club / organisation", existing.club || "");
  if (club === null) return null;
  const role = prompt("Role", existing.role || "");
  if (role === null) return null;
  const phone = prompt("Phone", existing.phone || "");
  if (phone === null) return null;
  const email = prompt("Email", existing.email || "");
  if (email === null) return null;
  return { name, club, role, phone, email };
}

function editLeagueTeam(id) {
  const team = findById(state.leagueTable, id);
  const updated = leagueTeamPrompt(team);
  if (!updated) return;
  Object.assign(team, updated);
  state.notice = "League team edited.";
  saveAndRender();
}

function leagueTeamPrompt(existing = {}) {
  const team = prompt("Team name", existing.team || "Example Team");
  if (team === null) return null;
  const played = numberPrompt("Played", existing.played ?? 0);
  if (played === null) return null;
  const won = numberPrompt("Won", existing.won ?? 0);
  if (won === null) return null;
  const drawn = numberPrompt("Drawn", existing.drawn ?? 0);
  if (drawn === null) return null;
  const lost = numberPrompt("Lost", existing.lost ?? 0);
  if (lost === null) return null;
  const points = numberPrompt("Points", existing.points ?? 0);
  if (points === null) return null;
  return { team, played, won, drawn, lost, points };
}

function numberPrompt(label, value) {
  const response = prompt(label, value);
  if (response === null) return null;
  const number = Number(response);
  return Number.isNaN(number) ? null : number;
}

function deleteItem(collection, id, message) {
  if (!confirm("Delete this item?")) return;
  state[collection] = state[collection].filter((item) => item.id !== id);
  state.notice = message;
  saveAndRender();
}

function saveSettings() {
  state.clubName = valueFromInput("setting-club-name") || "Club Name";
  state.clubType = valueFromInput("setting-club-type") || "Sports Club";
  state.clubVenue = valueFromInput("setting-club-venue");
  state.clubContact = valueFromInput("setting-club-contact");
  state.clubEmail = valueFromInput("setting-club-email");
  state.clubPhone = valueFromInput("setting-club-phone");
  state.colours = {
    header: valueFromInput("setting-colour-header") || "#173b69",
    section: valueFromInput("setting-colour-section") || "#2f8b57",
    button: valueFromInput("setting-colour-button") || "#2f8b57"
  };
  state.pin = valueFromInput("setting-pin") || "1234";
  state.notice = "Settings saved.";
  saveAndRender();
}

function valueFromInput(id) {
  return document.getElementById(id)?.value.trim() || "";
}

function printElement(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const printRoot = document.createElement("div");
  printRoot.id = "print-root";
  printRoot.innerHTML = `
    <div class="print-header">
      <h1>${escapeHtml(state.clubName || "Club Match Secretary Manager")}</h1>
      <p>Club Match Secretary Manager - ${escapeHtml(readableDate(new Date()))}</p>
    </div>
    ${element.innerHTML}
  `;
  document.body.appendChild(printRoot);
  document.body.classList.add("printing");
  window.print();
  document.body.classList.remove("printing");
  printRoot.remove();
}

function exportCsv(type) {
  const exports = {
    fixtures: {
      filename: "fixtures.csv",
      headers: ["Date", "Time", "Home", "Away", "Venue", "Competition", "Status"],
      rows: state.fixtures.map((item) => [item.date, item.time, item.home, item.away, item.venue, item.competition, item.status])
    },
    members: {
      filename: "members.csv",
      headers: ["Name", "Role", "Phone", "Email", "Availability"],
      rows: state.players.map((item) => [item.name, item.role, item.phone, item.email, item.availability])
    },
    availability: {
      filename: "availability.csv",
      headers: ["Name", "Role", "Availability"],
      rows: state.players.map((item) => [item.name, item.role, item.availability])
    },
    results: {
      filename: "results.csv",
      headers: ["Date", "Opponent", "Competition", "Score For", "Score Against", "Outcome"],
      rows: state.results.map((item) => [item.date, item.opponent, item.competition, item.scoreFor, item.scoreAgainst, item.outcome])
    },
    league: {
      filename: "league-table.csv",
      headers: ["Team", "Played", "Won", "Drawn", "Lost", "Points"],
      rows: state.leagueTable.map((item) => [item.team, item.played, item.won, item.drawn, item.lost, item.points])
    }
  };
  const selected = exports[type];
  if (!selected) return;
  const csv = [selected.headers, ...selected.rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = selected.filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function renderTeamPrintRows() {
  return state.team.length
    ? `<table><thead><tr><th>Position</th><th>Player</th></tr></thead><tbody>${state.team.map((item) => `<tr><td>${escapeHtml(item.position)}</td><td>${escapeHtml(item.playerName)}</td></tr>`).join("")}</tbody></table>`
    : "<p>No team selected.</p>";
}

function renderMemberPrintRows() {
  return `<table><thead><tr><th>Member</th><th>Role</th><th>Phone</th><th>Email</th><th>Availability</th></tr></thead><tbody>${state.players.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.role)}</td><td>${escapeHtml(item.phone)}</td><td>${escapeHtml(item.email)}</td><td>${escapeHtml(item.availability)}</td></tr>`).join("")}</tbody></table>`;
}

function renderFixturePrintRows() {
  return `<table><thead><tr><th>Date</th><th>Time</th><th>Home</th><th>Away</th><th>Venue</th><th>Competition</th><th>Status</th></tr></thead><tbody>${state.fixtures.map((item) => `<tr><td>${formatDate(item.date)}</td><td>${escapeHtml(item.time)}</td><td>${escapeHtml(item.home)}</td><td>${escapeHtml(item.away)}</td><td>${escapeHtml(item.venue)}</td><td>${escapeHtml(item.competition)}</td><td>${escapeHtml(item.status)}</td></tr>`).join("")}</tbody></table>`;
}

function renderAvailabilityPrintRows() {
  return `<table><thead><tr><th>Player</th><th>Role</th><th>Availability</th></tr></thead><tbody>${state.players.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.role)}</td><td>${escapeHtml(item.availability)}</td></tr>`).join("")}</tbody></table>`;
}

function renderResultPrintRows() {
  return `<table><thead><tr><th>Date</th><th>Opponent</th><th>Competition</th><th>Score</th><th>Outcome</th></tr></thead><tbody>${state.results.map((item) => `<tr><td>${formatDate(item.date)}</td><td>${escapeHtml(item.opponent)}</td><td>${escapeHtml(item.competition)}</td><td>${item.scoreFor} - ${item.scoreAgainst}</td><td>${escapeHtml(item.outcome)}</td></tr>`).join("")}</tbody></table>`;
}

function renderLeaguePrintRows() {
  return `<table><thead><tr><th>Team</th><th>Played</th><th>Won</th><th>Drawn</th><th>Lost</th><th>Points</th></tr></thead><tbody>${state.leagueTable.map((item) => `<tr><td>${escapeHtml(item.team)}</td><td>${item.played}</td><td>${item.won}</td><td>${item.drawn}</td><td>${item.lost}</td><td>${item.points}</td></tr>`).join("")}</tbody></table>`;
}

function nextPowerOfTwo(number) {
  return Math.pow(2, Math.ceil(Math.log2(number)));
}

function tournamentRoundName(index, total) {
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

function findById(collection, id) {
  return collection.find((item) => item.id === id);
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(demoData);
  try {
    const loaded = { ...structuredClone(demoData), ...JSON.parse(saved), notice: "" };
    loaded.tournament = { ...structuredClone(demoData.tournament), ...(loaded.tournament || {}) };
    loaded.colours = { ...structuredClone(demoData.colours), ...(loaded.colours || {}) };
    loaded.pin = loaded.pin || "1234";
    loaded.transport = loaded.transport || [];
    loaded.catering = loaded.catering || [];
    loaded.contacts = loaded.contacts || [];
    return loaded;
  } catch {
    return structuredClone(demoData);
  }
}

function themeStyle() {
  const colours = state.colours || demoData.colours;
  return [
    `--navy:${escapeAttr(colours.header)}`,
    `--navy-light:${lightenHex(colours.header, 18)}`,
    `--green:${escapeAttr(colours.section)}`,
    `--green-dark:${darkenHex(colours.section, 16)}`,
    `--button-colour:${escapeAttr(colours.button)}`
  ].join(";");
}

function lightenHex(hex, amount) {
  return adjustHex(hex, amount);
}

function darkenHex(hex, amount) {
  return adjustHex(hex, -amount);
}

function adjustHex(hex, amount) {
  const clean = String(hex || "#173b69").replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(clean)) return hex;
  const parts = [clean.slice(0, 2), clean.slice(2, 4), clean.slice(4, 6)];
  const adjusted = parts.map((part) => {
    const value = Math.max(0, Math.min(255, parseInt(part, 16) + amount));
    return value.toString(16).padStart(2, "0");
  });
  return `#${adjusted.join("")}`;
}

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, notice: "" }));
  render();
}

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

function readableDate(date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

function normaliseAvailability(value) {
  const lower = String(value).toLowerCase();
  if (lower.startsWith("avail")) return "Available";
  if (lower.startsWith("un")) return "Unavailable";
  return "Unsure";
}

function availabilityClass(value) {
  if (value === "Available") return "success-badge";
  if (value === "Unavailable") return "danger-badge";
  return "warning-badge";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

render();
