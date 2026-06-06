const DOMAINS = [
  {
    id: "leadership",
    title: "Shared and Supportive Leadership",
    short: "Shared Leadership",
    description: "The extent to which leadership is distributed, teacher voice is valued, and PLC work is protected and supported.",
    items: [
      "Team members have meaningful voice in PLC goals, agenda items, and decisions.",
      "Leadership responsibilities are distributed rather than held by one person only.",
      "PLC meetings are used for inquiry and instructional improvement, not only announcements or compliance tasks.",
      "Leaders protect time and conditions needed for collaborative professional learning."
    ],
    prompts: [
      "Where do members have real influence over PLC decisions?",
      "Whose voices are most centered, and whose may be missing?",
      "What facilitation move would make leadership feel more shared?"
    ]
  },
  {
    id: "vision",
    title: "Shared Values and Vision",
    short: "Shared Vision",
    description: "The degree to which the team has a common purpose connected to student learning and instructional improvement.",
    items: [
      "The team has a shared understanding of what student success means in this context.",
      "PLC work is connected to clear instructional or student-learning priorities.",
      "Members can explain how the PLC’s work connects to department, school, or organizational goals.",
      "The team returns to shared values when making decisions about instruction or support."
    ],
    prompts: [
      "What student-learning priority most clearly unites our work?",
      "Where are we aligned, and where are we assuming alignment?",
      "How could our next agenda better reflect our shared purpose?"
    ]
  },
  {
    id: "learning",
    title: "Collective Learning and Application",
    short: "Collective Learning",
    description: "The extent to which the team learns together, examines evidence, applies ideas, and revisits outcomes.",
    items: [
      "The team regularly examines student evidence to guide instructional decisions.",
      "Members learn from one another’s strategies, resources, and experiences.",
      "Ideas discussed in PLC are tested in practice rather than only discussed.",
      "The team revisits prior actions to determine whether they helped students."
    ],
    prompts: [
      "What evidence do we currently use to guide decisions?",
      "What is one idea we have discussed but not yet tested?",
      "How will we know whether a PLC action improved student learning?"
    ]
  },
  {
    id: "practice",
    title: "Shared Personal Practice",
    short: "Shared Practice",
    description: "The willingness and safety to make teaching practice visible through artifacts, student work, lesson design, peer feedback, or observation.",
    items: [
      "Teachers are willing to share artifacts of practice such as student work, lessons, feedback, or examples.",
      "The team discusses instructional decisions, not only logistics or pacing.",
      "Feedback is framed as collective improvement rather than judgment of individual teachers.",
      "The team has enough trust to examine challenges honestly."
    ],
    prompts: [
      "What kind of practice-sharing would feel safe as a first step?",
      "What feels too risky to share right now?",
      "How can we begin with artifacts before moving toward deeper feedback?"
    ]
  },
  {
    id: "conditions",
    title: "Supportive Conditions",
    short: "Supportive Conditions",
    description: "The cultural and structural supports that make PLC work possible, including time, trust, norms, resources, facilitation, and data access.",
    items: [
      "The PLC has protected time and a predictable meeting structure.",
      "The team has norms that support honest, respectful, and productive conversation.",
      "Members have access to relevant data, resources, and tools for collaborative work.",
      "The team has enough psychological safety to name barriers and ask for support."
    ],
    prompts: [
      "What structural barrier most limits our PLC work?",
      "Which norm would improve the quality of our conversation?",
      "What support do we need from leadership to strengthen PLC readiness?"
    ]
  }
];

function readinessLabel(score) {
  if (score < 2) return {label:"Foundational Concern", cls:"low", desc:"Major readiness conditions appear absent or inconsistent. Begin with trust, time, norms, and clarity."};
  if (score < 2.8) return {label:"Emerging", cls:"mid", desc:"Some readiness conditions are present, but the team likely needs more consistency and support."};
  if (score < 3.5) return {label:"Developing", cls:"neutral", desc:"The team has usable readiness foundations and can strengthen PLC practice through focused next steps."};
  return {label:"Established", cls:"good", desc:"This area appears to be a strong readiness condition for deeper PLC work."};
}

function average(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a,b) => a + b, 0) / arr.length;
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
  if (!trimmed.startsWith("PLC-COMPASS|")) throw new Error("Code must begin with PLC-COMPASS|");
  const parts = trimmed.replace("PLC-COMPASS|", "").split("|");
  if (parts.length !== DOMAINS.length) throw new Error("Code does not contain all five PLC domains.");
  const out = {};
  parts.forEach((part, i) => {
    const nums = part.split(",").map(x => Number(x.trim()));
    if (nums.length !== 4 || nums.some(n => ![1,2,3,4].includes(n))) {
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
    const row = document.createElement("div");
    row.className = "score-row";
    row.innerHTML = `
      <div><strong>${d.short}</strong><br><span class="small">${d.title}</span></div>
      <div class="bar"><span style="width:${(score/4)*100}%"></span></div>
      <div><span class="badge ${info.cls}">${score.toFixed(2)}</span></div>
    `;
    container.appendChild(row);
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => alert("Copied."));
}

function generateIndividualForm() {
  const form = document.getElementById("assessmentForm");
  if (!form) return;
  DOMAINS.forEach((domain, dIndex) => {
    const section = document.createElement("section");
    section.className = "card domain";
    section.innerHTML = `
      <h2>${domain.title}</h2>
      <p>${domain.description}</p>
    `;
    domain.items.forEach((item, i) => {
      const name = `${domain.id}_${i}`;
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `
        <p>${i+1}. ${item}</p>
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
      <p>Optional evidence or notes for this domain</p>
      <textarea name="${domain.id}_evidence" placeholder="What evidence supports your ratings? What examples came to mind?"></textarea>
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
      if (!selected) missing.push(`${domain.short} item ${i+1}`);
      else scores[domain.id].push(Number(selected.value));
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
    document.getElementById("individualResults").style.display = "block";
    renderBars(domainScores, "individualBars");
    const overall = round2(average(Object.values(domainScores)));
    const level = readinessLabel(overall);
    document.getElementById("individualOverall").innerHTML = `
      <h3>Individual Readiness Snapshot</h3>
      <p><strong>Overall average:</strong> <span class="badge ${level.cls}">${overall.toFixed(2)} — ${level.label}</span></p>
      <p>${level.desc}</p>
      <p class="small">This score is a reflection prompt, not an evaluation of you or your team.</p>
    `;
    document.getElementById("responseCode").textContent = code;
    window.scrollTo({ top: document.getElementById("individualResults").offsetTop - 20, behavior: "smooth" });
  });

  const copyBtn = document.getElementById("copyCode");
  if (copyBtn) copyBtn.addEventListener("click", () => copyText(document.getElementById("responseCode").textContent));
}

function initDashboardPage() {
  const btn = document.getElementById("generateDashboard");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const raw = document.getElementById("codesInput").value.split(/\n+/).map(x => x.trim()).filter(Boolean);
    if (raw.length < 2) {
      alert("Paste at least two individual response codes to generate a team dashboard.");
      return;
    }
    let parsed = [];
    let errors = [];
    raw.forEach((code, idx) => {
      try { parsed.push(parseCode(code)); }
      catch (e) { errors.push(`Line ${idx+1}: ${e.message}`); }
    });
    if (errors.length) {
      alert("Some response codes could not be read:\n\n" + errors.join("\n"));
      return;
    }

    const domainTeamScores = {};
    const domainSpread = {};
    const domainMemberAverages = {};
    DOMAINS.forEach(d => {
      const memberAvgs = parsed.map(p => average(p[d.id]));
      domainMemberAverages[d.id] = memberAvgs;
      domainTeamScores[d.id] = round2(average(memberAvgs));
      domainSpread[d.id] = round2(stdDev(memberAvgs));
    });

    const overall = round2(average(Object.values(domainTeamScores)));
    const overallInfo = readinessLabel(overall);
    const sortedLow = [...DOMAINS].sort((a,b) => domainTeamScores[a.id] - domainTeamScores[b.id]);
    const lowest = sortedLow[0];
    const highest = sortedLow[sortedLow.length - 1];
    const widest = [...DOMAINS].sort((a,b) => domainSpread[b.id] - domainSpread[a.id])[0];

    document.getElementById("dashboardResults").style.display = "block";
    document.getElementById("teamSummary").innerHTML = `
      <h2>PLC Readiness Dashboard</h2>
      <p><strong>Number of individual assessments included:</strong> ${parsed.length}</p>
      <p><strong>Overall team average:</strong> <span class="badge ${overallInfo.cls}">${overall.toFixed(2)} — ${overallInfo.label}</span></p>
      <p>${overallInfo.desc}</p>
      <div class="notice">
        <strong>Primary conversation priority:</strong> ${lowest.title}. This domain had the lowest average score and may need attention before the team moves into deeper PLC work.
      </div>
    `;

    renderBars(domainTeamScores, "teamBars");

    let tableRows = DOMAINS.map(d => {
      const info = readinessLabel(domainTeamScores[d.id]);
      return `
        <tr>
          <td><strong>${d.title}</strong></td>
          <td>${domainTeamScores[d.id].toFixed(2)}</td>
          <td><span class="badge ${info.cls}">${info.label}</span></td>
          <td>${domainSpread[d.id].toFixed(2)}</td>
          <td>${info.desc}</td>
        </tr>
      `;
    }).join("");

    document.getElementById("domainTable").innerHTML = `
      <h3>Domain Results</h3>
      <table>
        <thead>
          <tr>
            <th>PLC Component</th>
            <th>Team Avg.</th>
            <th>Readiness Level</th>
            <th>Response Spread</th>
            <th>Interpretation</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
      <p class="small">Response spread is based on variation in member domain averages. A larger spread suggests members may be experiencing this PLC condition differently.</p>
    `;

    document.getElementById("strengthGap").innerHTML = `
      <h3>Conversation Drivers</h3>
      <div class="grid">
        <div class="result-card col-4">
          <h4>Highest Readiness Area</h4>
          <p><strong>${highest.title}</strong></p>
          <p>This can be used as a strength to support the next stage of PLC work.</p>
        </div>
        <div class="result-card col-4">
          <h4>Lowest Readiness Area</h4>
          <p><strong>${lowest.title}</strong></p>
          <p>This is the best starting point for conversation and action planning.</p>
        </div>
        <div class="result-card col-4">
          <h4>Largest Perception Gap</h4>
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
        <strong>Facilitation reminder:</strong> Treat the results as a conversation starter, not a verdict. Ask, “What evidence explains this pattern?” before asking, “What should we do next?”
      </div>
    `;

    document.getElementById("actionPlan").innerHTML = `
      <h3>PLC Action Plan</h3>
      <table>
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
            <td>&nbsp;<br>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${widest.title}</td>
            <td>&nbsp;<br>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    `;

    window.scrollTo({ top: document.getElementById("dashboardResults").offsetTop - 20, behavior: "smooth" });
  });

  const printBtn = document.getElementById("printReport");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  const sampleBtn = document.getElementById("loadSample");
  if (sampleBtn) sampleBtn.addEventListener("click", () => {
    document.getElementById("codesInput").value = [
      "PLC-COMPASS|3,3,2,3|3,4,3,3|3,2,3,3|2,2,2,3|3,2,3,2",
      "PLC-COMPASS|2,2,2,3|4,3,3,4|3,3,3,2|2,1,2,2|2,2,3,2",
      "PLC-COMPASS|3,2,3,2|3,3,4,3|2,3,2,3|1,2,2,2|2,2,2,3",
      "PLC-COMPASS|4,3,3,3|4,4,3,4|3,3,4,3|2,2,3,2|3,3,2,2"
    ].join("\n");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initIndividualPage();
  initDashboardPage();
});