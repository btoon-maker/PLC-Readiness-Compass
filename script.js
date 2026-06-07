const DOMAINS = [
  {
    id: "leadership",
    title: "Shared and Supportive Leadership",
    short: "Shared Leadership",
    description: "This section looks at how formal PLC leadership supports shared ownership, teacher voice, and meaningful collaboration, even when the PLC is facilitated by a designated lead or guided by administrative priorities.",
    evidenceLead: "Think about recent agendas, administrative priorities, facilitation moves, team decisions, follow-up, and whose voices shaped the work.",
    items: [
      "When we meet as a PLC, team members have meaningful opportunities to shape the work, even when the agenda is guided by a department lead or administrative priorities.",
      "Although one person may formally facilitate the PLC, different members have opportunities to guide discussion, ask questions, contribute expertise, or take ownership of next steps.",
      "Our PLC time is protected for meaningful instructional work, not only announcements, reminders, administrative updates, or compliance tasks.",
      "When we identify a barrier, the department lead, administrator, or team helps remove it or helps us find a realistic path forward."
    ],
    prompts: [
      "Where do members currently have real influence over PLC decisions?",
      "Whose voices are shaping the work most often, and whose voices might be easier to miss?",
      "What small facilitation move would make leadership feel more shared next time?"
    ],
    recommendation: "Clarify which parts of the PLC agenda are administratively directed, which parts can be shaped by the team, and one decision or follow-up action members can collectively own."
  },
  {
    id: "vision",
    title: "Shared Values and Vision",
    short: "Shared Vision",
    description: "This section asks whether the team has a shared reason for meeting that goes deeper than completing tasks.",
    evidenceLead: "Think about whether the team returns to common goals, student needs, course expectations, or shared definitions of success.",
    items: [
      "Our PLC has a clear shared purpose that connects to student learning, not just department operations.",
      "When we talk about student success, we generally mean the same thing and can name what we are trying to improve.",
      "Our PLC priorities connect to larger school, department, or organizational goals without losing sight of what our students need.",
      "When we disagree about a decision, we can return to shared values or student evidence to move the conversation forward."
    ],
    prompts: [
      "What student-learning priority most clearly unites our work right now?",
      "Where are we truly aligned, and where might we only be assuming alignment?",
      "How could our next agenda make our shared purpose more visible?"
    ],
    recommendation: "Name one shared student-learning priority and use it to anchor the next PLC agenda."
  },
  {
    id: "learning",
    title: "Collective Learning and Application",
    short: "Collective Learning",
    description: "This section focuses on whether PLC conversations lead to shared learning, instructional action, and follow-up.",
    evidenceLead: "Think about student work, assessment data, engagement patterns, shared strategies, implementation checks, or revisiting prior decisions.",
    items: [
      "In PLC meetings, we use student work, assessment data, engagement evidence, or teacher observations to decide what instructional action to try next.",
      "We share strategies or resources in a way that helps others understand how they could actually use them.",
      "Ideas from PLC do not just stay in the meeting. We try them, adapt them, or build them into our work.",
      "We come back to previous PLC actions and ask whether they helped students or need to be adjusted."
    ],
    prompts: [
      "What evidence do we currently use to guide decisions?",
      "What is one idea we have discussed but not yet tested?",
      "How will we know whether a PLC action improved student learning?"
    ],
    recommendation: "Choose one shared strategy to try, decide what evidence will show whether it helped, and revisit it at the next meeting."
  },
  {
    id: "practice",
    title: "Shared Personal Practice",
    short: "Shared Practice",
    description: "This section looks at how safe and normal it feels to make teaching practice visible to colleagues.",
    evidenceLead: "Think about student work samples, feedback examples, lesson artifacts, classroom dilemmas, peer questions, or moments when practice was discussed honestly.",
    items: [
      "It feels safe enough in our PLC to share real examples of practice, including things that are unfinished, messy, or still in progress.",
      "We talk about instructional choices and student learning, not only pacing, deadlines, or logistics.",
      "When someone shares a challenge, the conversation feels supportive and problem-solving oriented rather than judgmental.",
      "Our team has low-risk ways to examine practice, such as looking at student work, assignment examples, feedback, or lesson materials together."
    ],
    prompts: [
      "What kind of practice-sharing would feel safe as a first step?",
      "What feels too risky to share right now?",
      "How can we begin with artifacts before moving toward deeper feedback?"
    ],
    recommendation: "Begin with a low-risk artifact protocol, such as reviewing one student work sample or one assignment example together."
  },
  {
    id: "conditions",
    title: "Supportive Conditions",
    short: "Supportive Conditions",
    description: "This section asks whether the team has the time, trust, norms, tools, and structures needed for PLC work to actually happen.",
    evidenceLead: "Think about meeting time, agenda structure, norms, data access, psychological safety, tools, resources, and follow-through systems.",
    items: [
      "Our PLC has enough protected time and structure to do more than rush through updates.",
      "We have norms or routines that help us have honest, respectful, and productive conversations.",
      "We can access the data, tools, resources, or examples we need when we are trying to solve an instructional problem.",
      "People can name barriers or ask for help without worrying that it will be used against them."
    ],
    prompts: [
      "What structural barrier most limits our PLC work?",
      "Which norm would improve the quality of our conversation?",
      "What support do we need from leadership to strengthen PLC readiness?"
    ],
    recommendation: "Strengthen the meeting structure first: clarify agenda purpose, norms, needed evidence, and one follow-up routine."
  }
];

function readinessLabel(score) {
  if (score < 2) return {
    label: "Foundational Concern",
    cls: "low",
    desc: "major readiness conditions may be absent or inconsistent. The team may need to begin with trust, time, norms, and clarity before expecting deeper PLC work."
  };

  if (score < 2.8) return {
    label: "Emerging",
    cls: "mid",
    desc: "some readiness conditions are present, but the team may need more consistency, shared routines, and support."
  };

  if (score < 3.5) return {
    label: "Developing",
    cls: "neutral",
    desc: "the team has usable readiness foundations and may be ready to strengthen PLC practice through focused next steps and follow-up."
  };

  return {
    label: "Established",
    cls: "good",
    desc: "this area appears to be a strong readiness condition for deeper PLC work."
  };
}

function spreadInfo(spread) {
  if (spread <= 0.24) return {
    label: "Similar responses",
    cls: "good",
    meaning: "The response spread is relatively small, so members may be seeing this condition in similar ways."
  };

  if (spread <= 0.49) return {
    label: "Some variation",
    cls: "neutral",
    meaning: "The response spread shows some variation, so it may be useful to ask what different experiences or evidence shaped members’ responses."
  };

  return {
    label: "Larger variation",
    cls: "mid",
    meaning: "The response spread is larger, so the team should discuss what different experiences may be shaping members’ perceptions before choosing a next step."
  };
}

function domainInterpretation(domain, score, spread) {
  const spreadText = spreadInfo(spread);

  const cues = {
    leadership: {
      cue: "This domain may be worth discussing in relation to teacher voice, shared ownership, facilitation, and how administrative priorities are translated into PLC work.",
      question: "Where do team members currently have meaningful voice or ownership, and where could that be strengthened?"
    },
    vision: {
      cue: "This domain may be worth discussing in relation to shared purpose, student-learning priorities, and whether the team is working from the same definition of success.",
      question: "What student-learning priority should most clearly guide our next PLC cycle?"
    },
    learning: {
      cue: "This domain may be worth discussing in relation to how the team uses evidence, shares strategies, tries ideas, and follows up on whether those ideas helped students.",
      question: "What evidence or student work should guide our next instructional decision?"
    },
    practice: {
      cue: "This domain may be worth discussing in relation to trust, psychological safety, and how comfortable the team feels examining real examples of practice together.",
      question: "What kind of practice-sharing would feel useful and low-risk for this team right now?"
    },
    conditions: {
      cue: "This domain may be worth discussing in relation to time, meeting structure, norms, resources, data access, and the supports needed for meaningful PLC work.",
      question: "What condition would make our PLC time more focused, honest, or useful?"
    }
  };

  return {
    cue: `${cues[domain.id].cue} ${spreadText.meaning}`,
    question: cues[domain.id].question
  };
}

function average(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function stdDev(arr) {
  if (arr.length <= 1) return 0;
  const m = average(arr);
  const variance = average(arr.map(x => Math.pow(x - m, 2)));
  return Math.sqrt(variance);
}

function makeCode(scores) {
  const payload = DOMAINS.map(d => scores[d.id].join(",")).join("|");
  return "PLC-COMPASS|" + payload;
}

function parseCode(code) {
  const trimmed = code.trim();

  if (!trimmed.startsWith("PLC-COMPASS|")) {
    throw new Error("Code must begin with PLC-COMPASS|");
  }

  const parts = trimmed.replace("PLC-COMPASS|", "").split("|");

  if (parts.length !== DOMAINS.length) {
    throw new Error("Code does not contain all five PLC domains.");
  }

  const out = {};

  parts.forEach((part, i) => {
    const nums = part.split(",").map(x => Number(x.trim()));

    if (nums.length !== 4 || nums.some(n => ![1, 2, 3, 4].includes(n))) {
      throw new Error("Each domain must contain four ratings from 1 to 4.");
    }

    out[DOMAINS[i].id] = nums;
  });

  return out;
}

function scoreDomains(scores) {
  const result = {};

  DOMAINS.forEach(d => {
    result[d.id] = round2(average(scores[d.id]));
  });

  return result;
}

function renderBars(domainScores, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  DOMAINS.forEach(d => {
    const score = domainScores[d.id];
    const info = readinessLabel(score);
    const pct = (score / 4) * 100;

    const row = document.createElement("div");
    row.className = "score-row";

    const labelCell = document.createElement("div");
    labelCell.innerHTML = `<strong>${d.short}</strong><br><span class="small">${d.title}</span>`;

    const chartCell = document.createElement("div");
    chartCell.className = "svg-bar-wrap";
    chartCell.innerHTML = `
      <svg class="score-svg" viewBox="0 0 400 24" preserveAspectRatio="none" aria-label="${d.short} score bar">
        <rect x="1" y="1" width="398" height="22" rx="11" ry="11" fill="#ffffff" stroke="#b8bfd1" stroke-width="1.5"></rect>
        <rect x="1" y="1" width="${Math.max(6, pct * 3.98)}" height="22" rx="11" ry="11" fill="#149da1"></rect>
        <line x1="100" y1="1" x2="100" y2="23" stroke="#d8cfe5" stroke-width="1"></line>
        <line x1="200" y1="1" x2="200" y2="23" stroke="#d8cfe5" stroke-width="1"></line>
        <line x1="300" y1="1" x2="300" y2="23" stroke="#d8cfe5" stroke-width="1"></line>
        <text x="200" y="16" text-anchor="middle" font-size="11" fill="#172033">${score.toFixed(2)} / 4.00</text>
      </svg>
    `;

    const scoreCell = document.createElement("div");
    scoreCell.innerHTML = `<span class="badge ${info.cls}">${score.toFixed(2)}</span>`;

    row.appendChild(labelCell);
    row.appendChild(chartCell);
    row.appendChild(scoreCell);
    container.appendChild(row);
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function collectEvidenceNotes() {
  const notes = {};

  DOMAINS.forEach(domain => {
    const field = document.querySelector(`textarea[name="${domain.id}_evidence"]`);
    notes[domain.id] = field ? field.value.trim() : "";
  });

  return notes;
}

function renderEvidenceNotes(notes, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const hasAnyNotes = DOMAINS.some(d => notes[d.id]);

  if (!hasAnyNotes) {
    container.innerHTML = `
      <h3>Evidence Notes</h3>
      <p class="small">No written evidence notes were entered. Ratings can still be used for reflection, but adding notes can make the summary more useful.</p>
    `;
    return;
  }

  const rows = DOMAINS.map(domain => {
    const safeNote = notes[domain.id]
      ? escapeHtml(notes[domain.id]).replaceAll("\n", "<br>")
      : "<span class='small'>No note entered.</span>";

    return `
      <div class="result-card">
        <h4>${domain.title}</h4>
        <p>${safeNote}</p>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <h3>Evidence Notes</h3>
    <p class="small">These notes are included in your individual PDF summary. They are not included in the response code shared with the facilitator.</p>
    ${rows}
  `;
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => alert("Copied."));
}

function exportPdf(title) {
  document.title = title || "PLC Readiness Compass Report";
  window.print();
}

function generateIndividualForm() {
  const form = document.getElementById("assessmentForm");
  if (!form) return;

  DOMAINS.forEach((domain) => {
    const section = document.createElement("section");
    section.className = "card domain";

    section.innerHTML = `
      <h2>${domain.title}</h2>
      <p class="domain-intro">${domain.description}</p>
      <div class="evidence-note">
        <strong>Before rating:</strong> ${domain.evidenceLead}
      </div>
    `;

    domain.items.forEach((item, i) => {
      const name = `${domain.id}_${i}`;

      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      itemDiv.innerHTML = `
        <p>${i + 1}. ${item}</p>
        <div class="radio-row" role="radiogroup" aria-label="${item}">
          <label><input type="radio" name="${name}" value="1" required> 1 Not Yet</label>
          <label><input type="radio" name="${name}" value="2"> 2 Emerging</label>
          <label><input type="radio" name="${name}" value="3"> 3 Developing</label>
          <label><input type="radio" name="${name}" value="4"> 4 Established</label>
        </div>
      `;

      section.appendChild(itemDiv);
    });

    const evidence = document.createElement("div");
    evidence.className = "item";

    evidence.innerHTML = `
      <p>One example that influenced your ratings</p>
      <p class="plain">This does not transfer to the team dashboard. It is here to help make your ratings evidence-informed instead of just a gut reaction.</p>
      <textarea name="${domain.id}_evidence" placeholder="For example: a recent agenda, a student work conversation, a shared resource, a decision point, a barrier, or a moment of trust/distrust."></textarea>
    `;

    section.appendChild(evidence);
    form.appendChild(section);
  });
}

function collectIndividualScores() {
  const scores = {};
  let missing = [];

  DOMAINS.forEach(domain => {
    scores[domain.id] = [];

    domain.items.forEach((item, i) => {
      const selected = document.querySelector(`input[name="${domain.id}_${i}"]:checked`);

      if (!selected) {
        missing.push(`${domain.short} item ${i + 1}`);
      } else {
        scores[domain.id].push(Number(selected.value));
      }
    });
  });

  if (missing.length) {
    alert("Please answer all rating items before generating your summary.");
    return null;
  }

  return scores;
}

function initIndividualPage() {
  generateIndividualForm();

  const btn = document.getElementById("generateIndividual");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const scores = collectIndividualScores();
    if (!scores) return;

    const domainScores = scoreDomains(scores);
    const code = makeCode(scores);
    const evidenceNotes = collectEvidenceNotes();

    document.getElementById("individualResults").style.display = "block";

    renderBars(domainScores, "individualBars");
    renderEvidenceNotes(evidenceNotes, "individualEvidenceNotes");

    const overall = round2(average(Object.values(domainScores)));
    const level = readinessLabel(overall);

    document.getElementById("individualOverall").innerHTML = `
      <h3>Individual Readiness Snapshot</h3>
      <p><strong>Overall average:</strong> <span class="badge ${level.cls}">${overall.toFixed(2)} — ${level.label}</span></p>
      <p>Your responses suggest that ${level.desc}</p>
      <div class="warm-notice">
        <strong>Use this as reflection, not judgment.</strong> A lower score does not mean the team is failing. It means there may be a condition worth strengthening before expecting deeper PLC work.
      </div>
    `;

    document.getElementById("responseCode").textContent = code;

    window.scrollTo({
      top: document.getElementById("individualResults").offsetTop - 20,
      behavior: "smooth"
    });
  });

  const copyBtn = document.getElementById("copyCode");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => copyText(document.getElementById("responseCode").textContent));
  }

  const exportBtn = document.getElementById("exportIndividualPdf");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => exportPdf("Individual PLC Readiness Summary"));
  }
}

function initDashboardPage() {
  const btn = document.getElementById("generateDashboard");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const raw = document.getElementById("codesInput").value
      .split(/\n+/)
      .map(x => x.trim())
      .filter(Boolean);

    if (raw.length < 2) {
      alert("Paste at least two individual response codes to generate a team dashboard.");
      return;
    }

    let parsed = [];
    let errors = [];

    raw.forEach((code, idx) => {
      try {
        parsed.push(parseCode(code));
      } catch (e) {
        errors.push(`Line ${idx + 1}: ${e.message}`);
      }
    });

    if (errors.length) {
      alert("Some response codes could not be read:\n\n" + errors.join("\n"));
      return;
    }

    const domainTeamScores = {};
    const domainSpread = {};

    DOMAINS.forEach(d => {
      const memberAvgs = parsed.map(p => average(p[d.id]));
      domainTeamScores[d.id] = round2(average(memberAvgs));
      domainSpread[d.id] = round2(stdDev(memberAvgs));
    });

    const overall = round2(average(Object.values(domainTeamScores)));
    const overallInfo = readinessLabel(overall);

    const sortedLow = [...DOMAINS].sort((a, b) => domainTeamScores[a.id] - domainTeamScores[b.id]);
    const lowest = sortedLow[0];
    const highest = sortedLow[sortedLow.length - 1];
    const widest = [...DOMAINS].sort((a, b) => domainSpread[b.id] - domainSpread[a.id])[0];
    const lowInfo = readinessLabel(domainTeamScores[lowest.id]);

    document.getElementById("dashboardResults").style.display = "block";

    document.getElementById("teamSummary").innerHTML = `
      <h2>PLC Readiness Conversation Report</h2>
      <p class="small">A team-level snapshot of readiness conditions, perception gaps, and possible next steps.</p>
      <p><strong>Number of individual assessments included:</strong> ${parsed.length}</p>
      <p><strong>Overall team average:</strong> <span class="badge ${overallInfo.cls}">${overall.toFixed(2)} — ${overallInfo.label}</span></p>
      <p>The submitted responses suggest that ${overallInfo.desc}</p>
      <div class="warm-notice">
        <strong>How to read this report:</strong> The scores are not the conversation. They are the doorway into the conversation. Start by asking what evidence might explain the pattern.
      </div>
      <div class="notice">
        <strong>Primary conversation priority:</strong> ${lowest.title}. This domain had the lowest average score. This pattern suggests that ${lowInfo.desc}
      </div>
    `;

    renderBars(domainTeamScores, "teamBars");

let tableRows = DOMAINS.map(d => {
  const score = domainTeamScores[d.id];
  const spread = domainSpread[d.id];
  const info = readinessLabel(score);
  const spreadDetails = spreadInfo(spread);
  const interpretation = domainInterpretation(d, score, spread);

  return `
    <tr>
      <td><strong>${d.title}</strong></td>
      <td>${score.toFixed(2)}</td>
      <td><span class="badge ${info.cls}">${info.label}</span></td>
      <td>
        <strong>${spread.toFixed(2)}</strong><br>
        <span class="badge ${spreadDetails.cls}">${spreadDetails.label}</span>
      </td>
      <td>${interpretation.cue}</td>
      <td>${interpretation.question}</td>
    </tr>
  `;
}).join("");

    document.getElementById("domainTable").innerHTML = `
      <h3>Domain Results</h3>
      <table class="domain-results-table">
        <thead>
          <tr>
            <th>PLC Component</th>
            <th>Avg.</th>
            <th>Level</th>
            <th>Spread</th>
            <th>Conversation cue</th>
            <th>Possible next question</th>          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
      <p class="small">Response spread is based on variation in member domain averages. A larger spread suggests members may be experiencing this PLC condition differently.</p>
    `;

    document.getElementById("strengthGap").innerHTML = `
      <h3>Conversation Drivers</h3>
      <div class="grid">
        <div class="result-card col-4">
          <h4>Build From This Strength</h4>
          <p><strong>${highest.title}</strong></p>
          <p>This area appears to be the strongest readiness condition. Ask what makes it work and how that strength could support another domain.</p>
        </div>
        <div class="result-card col-4">
          <h4>Start Here</h4>
          <p><strong>${lowest.title}</strong></p>
          <p>${lowest.recommendation}</p>
        </div>
        <div class="result-card col-4">
          <h4>Notice This Perception Gap</h4>
          <p><strong>${widest.title}</strong></p>
          <p>Members may be experiencing this condition differently. Discuss evidence before jumping to solutions.</p>
        </div>
      </div>
    `;

    const lowPrompts = lowest.prompts.map(p => `<li>${p}</li>`).join("");
    const widePrompts = widest.prompts.map(p => `<li>${p}</li>`).join("");

    document.getElementById("conversationPrompts").innerHTML = `
      <h3>Facilitated Conversation Prompts</h3>
      <div class="grid">
        <div class="result-card col-6">
          <h4>Start with the lowest readiness area: ${lowest.short}</h4>
          <ul>${lowPrompts}</ul>
        </div>
        <div class="result-card col-6">
          <h4>Then discuss the largest perception gap: ${widest.short}</h4>
          <ul>${widePrompts}</ul>
        </div>
      </div>
      <div class="notice">
        <strong>Facilitation reminder:</strong> Ask, “What evidence explains this pattern?” before asking, “What should we do next?”
      </div>
    `;

    document.getElementById("actionPlan").innerHTML = `
      <h3>PLC Action Plan</h3>
      <p>Choose one realistic move to try before your next PLC meeting. The goal is not to fix everything. The goal is to strengthen one readiness condition on purpose.</p>
      <table class="action-table">
        <thead>
          <tr>
            <th>Readiness condition to strengthen</th>
            <th>One next step</th>
            <th>Owner/facilitator</th>
            <th>Timeline</th>
            <th>Evidence to revisit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${lowest.title}</td>
            <td><textarea class="action-input" placeholder="What is one realistic next step?"></textarea></td>
            <td><textarea class="action-input" placeholder="Who will lead or follow up?"></textarea></td>
            <td><textarea class="action-input" placeholder="By when?"></textarea></td>
            <td><textarea class="action-input" placeholder="What evidence will we revisit?"></textarea></td>
          </tr>
          <tr>
            <td>${widest.title}</td>
            <td><textarea class="action-input" placeholder="What is one realistic next step?"></textarea></td>
            <td><textarea class="action-input" placeholder="Who will lead or follow up?"></textarea></td>
            <td><textarea class="action-input" placeholder="By when?"></textarea></td>
            <td><textarea class="action-input" placeholder="What evidence will we revisit?"></textarea></td>
          </tr>
        </tbody>
      </table>
    `;

    setupActionPlanTextareas();

    window.scrollTo({
      top: document.getElementById("dashboardResults").offsetTop - 20,
      behavior: "smooth"
    });
  });

  const exportBtn = document.getElementById("exportDashboardPdf");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => exportPdf("PLC Readiness Conversation Report"));
  }

  const sampleBtn = document.getElementById("loadSample");
  if (sampleBtn) {
    sampleBtn.addEventListener("click", () => {
      document.getElementById("codesInput").value = [
        "PLC-COMPASS|3,3,2,3|3,4,3,3|3,2,3,3|2,2,2,3|3,2,3,2",
        "PLC-COMPASS|2,2,2,3|4,3,3,4|3,3,3,2|2,1,2,2|2,2,3,2",
        "PLC-COMPASS|3,2,3,2|3,3,4,3|2,3,2,3|1,2,2,2|2,2,2,3",
        "PLC-COMPASS|4,3,3,3|4,4,3,4|3,3,4,3|2,2,3,2|3,3,2,2"
      ].join("\n");
    });
  }
}

function setupActionPlanTextareas() {
  const textareas = document.querySelectorAll(".action-input");

  textareas.forEach(textarea => {
    const resize = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", resize);
    resize();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initIndividualPage();
  initDashboardPage();
});
