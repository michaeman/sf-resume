// ============================================================
// SALESFORCE EINSTEIN INTERACTIVE RESUME — Gallery Style
// ============================================================

// ---- COLORS ----
const C = {
  BLUE: '#00A1E0',
  DARK_BLUE: '#032D60',
  NAVY: '#0B1D3A',
  ORANGE: '#FF6900',
  WHITE: '#FFFFFF',
  LIGHT_GRAY: '#C9D1D9',
  DIM: '#8B949E',
  CLOUD: '#B0C4D8',
  PANEL_BG: 'rgba(11, 29, 58, 0.88)',
  PANEL_BORDER: 'rgba(0, 161, 224, 0.3)',
};

// ---- LAYOUT ----
const GRAVITY = 0.5;
const MOVE_SPEED = 4.5;
const PLAYER_W = 32;
const PLAYER_H = 48;
const GROUND_FROM_BOTTOM = 100; // ground is 100px from canvas bottom

// ---- RESUME DATA (PLACEHOLDER) ----
const RESUME = {
  name: 'Your Name',
  title: 'Salesforce Developer / Architect',
  summary: 'Results-driven Salesforce professional with 7+ years of experience designing, developing, and deploying scalable CRM solutions. Passionate about leveraging the Salesforce platform to drive business transformation, streamline operations, and deliver exceptional user experiences. Proven track record of leading cross-functional teams and delivering projects on time.Results-driven Salesforce professional with 7+ years of experience designing, developing, and deploying scalable CRM solutions. Passionate about leveraging the Salesforce platform to drive business transformation, streamline operations, and deliver exceptional user experiences. Proven track record of leading cross-functional teams and delivering projects on time.Results-driven Salesforce professional with 7+ years of experience designing, developing, and deploying scalable CRM solutions. Passionate about leveraging the Salesforce platform to drive business transformation, streamline operations, and deliver exceptional user experiences. Proven track record of leading cross-functional teams and delivering projects on time.Results-driven Salesforce professional with 7+ years of experience designing, developing, and deploying scalable CRM solutions. Passionate about leveraging the Salesforce platform to drive business transformation, streamline operations, and deliver exceptional user experiences. Proven track record of leading cross-functional teams and delivering projects on time.Results-driven Salesforce professional with 7+ years of experience designing, developing, and deploying scalable CRM solutions. Passionate about leveraging the Salesforce platform to drive business transformation, streamline operations, and deliver exceptional user experiences. Proven track record of leading cross-functional teams and delivering projects on time.Results-driven Salesforce professional with 7+ years of experience designing, developing, and deploying scalable CRM solutions. Passionate about leveraging the Salesforce platform to drive business transformation, streamline operations, and deliver exceptional user experiences. Proven track record of leading cross-functional teams and delivering projects on time.',
  experience: [
    {
      company: 'Acme Corporation',
      role: 'Senior Salesforce Developer',
      date: 'Jan 2022 — Present',
      location: 'San Francisco, CA',
      description: [
        'Led end-to-end migration of legacy CRM system to Salesforce Lightning, reducing operational costs by 30% and improving user adoption to 95%.',
        'Architected and developed custom Apex triggers, batch processes, and scheduled jobs handling 2M+ records daily with zero production incidents.',
        'Designed and implemented MuleSoft integrations connecting Salesforce with SAP, NetSuite, and internal microservices, processing 50K+ API calls daily.',
        'Mentored a team of 4 junior developers through code reviews, pair programming sessions, and internal Trailhead learning paths.',
        'Established CI/CD pipeline using Salesforce CLI, GitHub Actions, and scratch orgs, reducing deployment time from 4 hours to 20 minutes.',
      ],
    },
    {
      company: 'Tech Solutions Inc.',
      role: 'Salesforce Administrator & Developer',
      date: 'Mar 2019 — Dec 2021',
      location: 'Austin, TX',
      description: [
        'Managed and optimized a multi-org Salesforce environment with 500+ active users across Sales, Service, and Marketing clouds.',
        'Designed complex Flows and Process Builder automations that replaced 15+ legacy workflow rules, improving system performance by 40%.',
        'Implemented Salesforce CPQ from scratch, configuring product bundles, pricing rules, and approval workflows that shortened the sales cycle by 25%.',
        'Reduced average case resolution time by 35% through custom Lightning components, macros, and knowledge base optimization.',
        'Created executive dashboards and reports providing real-time visibility into pipeline, forecasting, and team performance metrics.',
      ],
    },
    {
      company: 'StartUp Labs',
      role: 'Junior Salesforce Developer',
      date: 'Jun 2017 — Feb 2019',
      location: 'Remote',
      description: [
        'Developed reusable Lightning Web Components for customer-facing Experience Cloud portal, serving 10K+ community users.',
        'Wrote comprehensive Apex unit tests achieving 92% code coverage across the org, well above the 75% requirement.',
        'Built custom REST API endpoints enabling mobile app integration, handling user authentication and real-time data sync.',
        'Participated in agile sprint ceremonies including daily standups, sprint planning, and retrospectives as part of a 6-person scrum team.',
        'Designed and built 20+ operational reports and dashboards for sales leadership and C-suite stakeholders.',
      ],
    },
  ],
  skills: {
    'Salesforce Platform': ['Apex', 'Lightning Web Components', 'Visualforce', 'SOQL/SOSL', 'Flows & Process Builder', 'Platform Events', 'Change Data Capture'],
    'Salesforce Products': ['Sales Cloud', 'Service Cloud', 'Experience Cloud', 'CPQ', 'Marketing Cloud', 'Tableau CRM'],
    'Development': ['JavaScript', 'HTML5 / CSS3', 'REST & SOAP APIs', 'MuleSoft', 'Node.js', 'SQL', 'Git & GitHub'],
    'DevOps & Tools': ['Salesforce CLI (sf/sfdx)', 'VS Code', 'GitHub Actions', 'Copado', 'Gearset', 'JIRA', 'Confluence'],
    'Methodology': ['Agile / Scrum', 'Data Modeling', 'Release Management', 'Code Review', 'Technical Documentation'],
  },
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      date: '2013 — 2017',
      details: 'GPA: 3.7 / 4.0 · Dean\'s List · Senior Capstone: Cloud-Based CRM Analytics Platform',
    },
  ],
  certifications: [
    { name: 'Salesforce Certified Platform Developer II', date: '2023' },
    { name: 'Salesforce Certified Platform Developer I', date: '2021' },
    { name: 'Salesforce Certified Administrator', date: '2020' },
    { name: 'Salesforce Certified Platform App Builder', date: '2020' },
    { name: 'Salesforce Certified Sales Cloud Consultant', date: '2022' },
    { name: 'Salesforce Certified Service Cloud Consultant', date: '2023' },
  ],
  contact: {
    email: 'your.email@example.com',
    phone: '(555) 123-4567',
    linkedin: 'linkedin.com/in/yourprofile',
    github: 'github.com/yourprofile',
    trailhead: 'trailhead.salesforce.com/en/me/yourprofile',
    location: 'San Francisco, CA',
  },
};

// ---- SECTIONS (define the world) ----
// Each section is a stretch of the world with content panels rendered in it.
// We'll compute positions after measuring text.
const SECTION_GAP = 600; // breathing room between sections

// ============================================================
// TERMINAL LOGIC (unchanged)
// ============================================================
(function initTerminal() {
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const screen = document.getElementById('terminal-screen');

  const bootLines = [
    { text: '> Initializing einstein-resume v1.0...', cls: 'dim' },
    { text: '> Loading Salesforce modules............. OK', cls: 'success' },
    { text: '> Connecting to Trailhead................. OK', cls: 'success' },
    { text: '> Deploying interactive experience........ OK', cls: 'success' },
    { text: '', cls: '' },
    { text: '  ╔══════════════════════════════════════════╗', cls: 'highlight' },
    { text: '  ║   SALESFORCE EINSTEIN RESUME EXPLORER    ║', cls: 'highlight' },
    { text: '  ╚══════════════════════════════════════════╝', cls: 'highlight' },
    { text: '', cls: '' },
    { text: `  Hello! I'm ${RESUME.name}.`, cls: '' },
    { text: `  ${RESUME.title}`, cls: 'sf-orange' },
    { text: '', cls: '' },
    { text: '  Available commands:', cls: 'dim' },
    { text: '    start    - Launch the interactive resume', cls: '' },
    { text: '    about    - Quick summary', cls: '' },
    { text: '    help     - Show commands', cls: '' },
    { text: '', cls: '' },
  ];

  let lineIndex = 0;
  let ready = false;

  function typeLine() {
    if (lineIndex >= bootLines.length) {
      ready = true;
      input.focus();
      return;
    }
    const line = bootLines[lineIndex];
    const el = document.createElement('div');
    if (line.cls) el.classList.add(line.cls);
    el.textContent = line.text || '\u00A0';
    output.appendChild(el);
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
    lineIndex++;
    setTimeout(typeLine, lineIndex <= 4 ? 300 : 50);
  }

  typeLine();

  function addOutput(text, cls) {
    const el = document.createElement('div');
    if (cls) el.classList.add(cls);
    el.textContent = text;
    output.appendChild(el);
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
  }

  function handleCommand(cmd) {
    addOutput(`visitor@resume:~$ ${cmd}`, 'dim');
    const c = cmd.trim().toLowerCase();
    if (c === 'start') {
      addOutput('> Launching experience...', 'success');
      setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(() => {
          screen.style.display = 'none';
          document.getElementById('game-screen').classList.remove('hidden');
          initGame();
        }, 800);
      }, 500);
    } else if (c === 'about') {
      addOutput(`${RESUME.name} — ${RESUME.title}`, 'sf-orange');
      addOutput('Type "start" to explore the full interactive resume.', '');
    } else if (c === 'help') {
      addOutput('  start    - Launch the interactive resume', '');
      addOutput('  about    - Quick summary', '');
      addOutput('  help     - Show commands', '');
    } else if (c === '') {
      // do nothing
    } else {
      addOutput(`Command not found: ${cmd}. Type "help" for available commands.`, 'sf-orange');
    }
    input.value = '';
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && ready) {
      handleCommand(input.value);
    }
  });

  document.getElementById('terminal-screen').addEventListener('click', () => {
    input.focus();
  });
})();

// ============================================================
// GAME / GALLERY ENGINE
// ============================================================
function initGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const sectionIndicator = document.getElementById('section-indicator');

  let W, H, GROUND_Y, WORLD_WIDTH;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    GROUND_Y = H - GROUND_FROM_BOTTOM;
    buildWorld(); // rebuild content positions on resize
  }

  // ---- TEXT UTILITIES ----
  function setFont(size, weight, family) {
    ctx.font = `${weight || '400'} ${size}px ${family || "'Inter', sans-serif"}`;
  }

  function wrapText(text, maxWidth, fontSize) {
    setFont(fontSize, '400');
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
      const test = line + (line ? ' ' : '') + word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  // ---- HTML MODAL CONTENT GENERATORS ----
  function htmlIntro() {
    return `
      <h1>${RESUME.name}</h1>
      <p class="subtitle">${RESUME.title}</p>
      <div class="accent-bar"></div>
      <p>${RESUME.summary}</p>
      <div class="divider"></div>
      <div class="contact-row"><div class="contact-label">Location</div><div class="contact-value">${RESUME.contact.location}</div></div>
      <div class="contact-row"><div class="contact-label">Email</div><div class="contact-value">${RESUME.contact.email}</div></div>
      <div class="contact-row"><div class="contact-label">LinkedIn</div><div class="contact-value">${RESUME.contact.linkedin}</div></div>
      <div class="contact-row"><div class="contact-label">GitHub</div><div class="contact-value">${RESUME.contact.github}</div></div>
    `;
  }

  function htmlJob(job) {
    return `
      <h1>${job.company}</h1>
      <p class="subtitle">${job.role}</p>
      <p class="meta">${job.date} &nbsp;·&nbsp; ${job.location}</p>
      <div class="accent-bar"></div>
      <ul>${job.description.map(b => `<li>${b}</li>`).join('')}</ul>
    `;
  }

  function htmlSkills() {
    return `
      <h1>Technical Skills</h1>
      <div class="accent-bar"></div>
      ${Object.entries(RESUME.skills).map(([cat, skills]) => `
        <div class="skill-category">
          <div class="skill-category-name">${cat}</div>
          <div class="skill-tags">${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
        </div>
      `).join('')}
    `;
  }

  function htmlEducation() {
    return `
      <h1>Education & Certifications</h1>
      <div class="accent-bar"></div>
      <h2>Education</h2>
      ${RESUME.education.map(e => `
        <h3>${e.school}</h3>
        <p class="subtitle">${e.degree}</p>
        <p class="meta">${e.date}</p>
        <p>${e.details}</p>
      `).join('')}
      <h2>Certifications</h2>
      ${RESUME.certifications.map(c => `
        <div class="cert-row">
          <div class="cert-icon">✓</div>
          <div class="cert-name">${c.name}</div>
          <div class="cert-date">${c.date}</div>
        </div>
      `).join('')}
    `;
  }

  function htmlContact() {
    const items = [
      { label: 'Email',     value: RESUME.contact.email },
      { label: 'Phone',     value: RESUME.contact.phone },
      { label: 'LinkedIn',  value: RESUME.contact.linkedin },
      { label: 'GitHub',    value: RESUME.contact.github },
      { label: 'Trailhead', value: RESUME.contact.trailhead },
      { label: 'Location',  value: RESUME.contact.location },
    ];
    return `
      <h1>Let's Connect</h1>
      <div class="accent-bar"></div>
      ${items.map(i => `
        <div class="contact-row">
          <div class="contact-label">${i.label}</div>
          <div class="contact-value">${i.value}</div>
        </div>
      `).join('')}
      <div class="divider"></div>
      <p style="color:#FF6900;font-size:16px;">Thanks for exploring my resume!</p>
    `;
  }

  // ---- FINISH LINE ----
  let FINISH_X = 9999;
  const finish = {
    flagY: 1,        // 0 = top, 1 = bottom; raises 1→0 as hill enters frame
    raising: false,  // starts once hill scrolls into view
    triggered: false,
    celebrateTimer: 0,
  };

  // ---- THANK YOU MODAL ----
  function htmlThankYou() {
    return `
      <div style="text-align:center; padding: 20px 0 32px;">
        <div style="font-size:52px; margin-bottom:16px;">☁️</div>
        <h1 style="font-size:30px; margin-bottom:8px;">You Made It to the End!</h1>
        <div class="accent-bar" style="margin: 10px auto 24px;"></div>
        <p style="font-size:17px; color:#FF6900; font-weight:600; margin-bottom:24px;">
          Thanks for exploring my interactive resume — you're clearly someone who appreciates good UX&nbsp;😄
        </p>
      </div>

      <p>
        I'm <strong style="color:#fff;">${RESUME.name}</strong>, a <strong style="color:#00A1E0;">${RESUME.title}</strong>
        who believes the best Salesforce solutions aren't just technically sound — they're a pleasure to use.
        The fact that you walked (and jumped) all the way here tells me we might think alike.
      </p>

      <p>
        Whether you're looking for someone to untangle a gnarly org, architect a clean multi-cloud solution,
        or just want to geek out about Agentforce and AI — I'd love to connect.
      </p>

      <h2>What I Bring to the Table</h2>
      <ul>
        <li>7+ years turning messy Salesforce orgs into clean, scalable platforms</li>
        <li>Hands-on experience across Sales Cloud, Service Cloud, Experience Cloud & MuleSoft</li>
        <li>A genuine obsession with developer experience, CI/CD, and doing things the right way</li>
        <li>The rare ability to translate between "what the business wants" and "what the system can do"</li>
        <li>Certified across the Salesforce stack — and always studying for the next one</li>
      </ul>

      <h2>Let's Talk</h2>
      <div class="contact-row">
        <div class="contact-label">Email</div>
        <div class="contact-value">${RESUME.contact.email}</div>
      </div>
      <div class="contact-row">
        <div class="contact-label">LinkedIn</div>
        <div class="contact-value">${RESUME.contact.linkedin}</div>
      </div>
      <div class="contact-row">
        <div class="contact-label">Trailhead</div>
        <div class="contact-value">${RESUME.contact.trailhead}</div>
      </div>

      <div class="divider"></div>
      <p style="text-align:center; color:#6E7681; font-size:13px; font-family:'JetBrains Mono',monospace;">
        Built with HTML5 Canvas · Vanilla JS · Zero frameworks · 100% caffeine
      </p>
    `;
  }

  // ---- KIOSKS (world objects) ----
  let kiosks = [];
  let sectionMarkers = [];

  const PANEL_W = 340;
  const PANEL_PAD = 20;
  const PANEL_SPACING = 560;
  const PROXIMITY = 200;

  function buildWorld() {
    kiosks = [];
    sectionMarkers = [];
    let cursorX = Math.max(300, W * 0.25);

    function addKiosk(label, htmlFn, snippetFn) {
      kiosks.push({ x: cursorX, label, htmlFn, snippetFn, centerX: cursorX + PANEL_W / 2 });
      sectionMarkers.push({ x: cursorX, name: label });
      cursorX += PANEL_W + PANEL_SPACING;
    }

    addKiosk('INTRODUCTION', htmlIntro, snippetIntro);
    addKiosk('ACME CORPORATION',   () => htmlJob(RESUME.experience[0]), () => snippetJob(RESUME.experience[0]));
    addKiosk('TECH SOLUTIONS INC', () => htmlJob(RESUME.experience[1]), () => snippetJob(RESUME.experience[1]));
    addKiosk('STARTUP LABS',       () => htmlJob(RESUME.experience[2]), () => snippetJob(RESUME.experience[2]));
    addKiosk('SKILLS',             htmlSkills,    snippetSkills);
    addKiosk('EDUCATION & CERTS',  htmlEducation, snippetEducation);

    // Finish line sits between Education and Contact, pushed far enough
    // that the hill is fully off-screen while the player is at Education
    FINISH_X = cursorX + PANEL_SPACING;
    cursorX = FINISH_X + 420; // leave room for the hill before the last panel

    addKiosk('CONTACT', htmlContact, snippetContact);

    WORLD_WIDTH = cursorX + W * 0.5;
  }

  // ---- SNIPPET RENDERERS (draw preview content onto canvas panel) ----
  // Each returns the height used so the panel can size itself.

  function snippetIntro(sx, sy, pw) {
    let y = sy;
    setFont(20, '700');
    ctx.fillStyle = C.WHITE;
    ctx.fillText(RESUME.name, sx, y); y += 26;
    setFont(13, '500');
    ctx.fillStyle = C.ORANGE;
    ctx.fillText(RESUME.title, sx, y); y += 22;
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(sx, y, 36, 2); y += 14;
    setFont(12, '400');
    ctx.fillStyle = C.LIGHT_GRAY;
    const lines = wrapText(RESUME.summary, pw, 12).slice(0, 3);
    for (const l of lines) { ctx.fillText(l, sx, y); y += 18; }
    ctx.fillStyle = 'rgba(11,29,58,0)'; // fade handled by gradient
    return y - sy;
  }

  function snippetJob(job, sx, sy, pw) {
    let y = sy;
    setFont(17, '700');
    ctx.fillStyle = C.WHITE;
    ctx.fillText(job.company, sx, y); y += 24;
    setFont(13, '500');
    ctx.fillStyle = C.ORANGE;
    ctx.fillText(job.role, sx, y); y += 20;
    setFont(11, '400', "'JetBrains Mono', monospace");
    ctx.fillStyle = C.DIM;
    ctx.fillText(`${job.date}  ·  ${job.location}`, sx, y); y += 18;
    ctx.fillStyle = C.PANEL_BORDER;
    ctx.fillRect(sx, y, pw, 1); y += 12;
    setFont(12, '400');
    for (let i = 0; i < Math.min(2, job.description.length); i++) {
      const blines = wrapText(job.description[i], pw - 14, 12).slice(0, 2);
      ctx.fillStyle = C.BLUE;
      ctx.fillText('▸', sx, y);
      ctx.fillStyle = C.LIGHT_GRAY;
      for (const bl of blines) { ctx.fillText(bl, sx + 12, y); y += 17; }
      y += 3;
    }
    return y - sy;
  }

  function snippetSkills(sx, sy, pw) {
    let y = sy;
    setFont(17, '700');
    ctx.fillStyle = C.WHITE;
    ctx.fillText('Technical Skills', sx, y); y += 24;
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(sx, y, 36, 2); y += 14;
    // Show first 2 categories with first 3 tags each
    const entries = Object.entries(RESUME.skills).slice(0, 2);
    for (const [cat, skills] of entries) {
      setFont(10, '600', "'JetBrains Mono', monospace");
      ctx.fillStyle = C.ORANGE;
      ctx.fillText(cat.toUpperCase(), sx, y); y += 16;
      setFont(11, '400', "'JetBrains Mono', monospace");
      let tx = sx;
      for (const s of skills.slice(0, 4)) {
        const tw = ctx.measureText(s).width + 16;
        if (tx + tw > sx + pw) { tx = sx; y += 22; }
        ctx.fillStyle = 'rgba(0,161,224,0.12)';
        roundRect(ctx, tx, y - 13, tw, 18, 3); ctx.fill();
        ctx.strokeStyle = 'rgba(0,161,224,0.3)'; ctx.lineWidth = 1;
        roundRect(ctx, tx, y - 13, tw, 18, 3); ctx.stroke();
        ctx.fillStyle = C.LIGHT_GRAY;
        ctx.fillText(s, tx + 8, y); tx += tw + 5;
      }
      y += 26;
    }
    return y - sy;
  }

  function snippetEducation(sx, sy, pw) {
    let y = sy;
    setFont(17, '700');
    ctx.fillStyle = C.WHITE;
    ctx.fillText('Education & Certifications', sx, y); y += 24;
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(sx, y, 36, 2); y += 14;
    const edu = RESUME.education[0];
    setFont(13, '600');
    ctx.fillStyle = C.WHITE;
    ctx.fillText(edu.school, sx, y); y += 19;
    setFont(12, '400');
    ctx.fillStyle = C.ORANGE;
    ctx.fillText(edu.degree, sx, y); y += 17;
    setFont(11, '400', "'JetBrains Mono', monospace");
    ctx.fillStyle = C.DIM;
    ctx.fillText(edu.date, sx, y); y += 20;
    ctx.fillStyle = C.PANEL_BORDER;
    ctx.fillRect(sx, y, pw, 1); y += 12;
    setFont(12, '400');
    for (const cert of RESUME.certifications.slice(0, 3)) {
      ctx.fillStyle = C.BLUE;
      ctx.beginPath(); ctx.arc(sx + 6, y - 3, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.WHITE;
      setFont(7, '700'); ctx.textAlign = 'center';
      ctx.fillText('✓', sx + 6, y); ctx.textAlign = 'left';
      setFont(12, '400');
      ctx.fillStyle = C.LIGHT_GRAY;
      ctx.fillText(cert.name, sx + 18, y); y += 20;
    }
    return y - sy;
  }

  function snippetContact(sx, sy, pw) {
    let y = sy;
    setFont(17, '700');
    ctx.fillStyle = C.WHITE;
    ctx.fillText("Let's Connect", sx, y); y += 24;
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(sx, y, 36, 2); y += 18;
    const items = [
      { label: 'EMAIL',    value: RESUME.contact.email },
      { label: 'LINKEDIN', value: RESUME.contact.linkedin },
      { label: 'GITHUB',   value: RESUME.contact.github },
    ];
    for (const item of items) {
      setFont(9, '600', "'JetBrains Mono', monospace");
      ctx.fillStyle = C.DIM;
      ctx.fillText(item.label, sx, y); y += 14;
      setFont(12, '500');
      ctx.fillStyle = C.WHITE;
      ctx.fillText(item.value, sx, y); y += 22;
    }
    return y - sy;
  }

  // ---- DRAW PANEL (preview card with snippet + E to expand) ----
  function drawKiosk(k, time) {
    const near = isNearKiosk(k);
    const pulse = Math.sin(time * 0.003) * 0.5 + 0.5;
    const sx = k.x - camera.x;

    // Measure snippet height by doing a dry run off-screen
    // We use a consistent height per type instead for simplicity
    const INNER_H = 220;
    const FOOTER_H = 30;
    const PANEL_H = INNER_H + FOOTER_H + PANEL_PAD * 2;
    const panelY = GROUND_Y - PANEL_H - 8;
    const innerX = sx + PANEL_PAD;
    const innerY = panelY + PANEL_PAD + 8;
    const innerW = PANEL_W - PANEL_PAD * 2;

    // Outer glow when near
    if (near) {
      ctx.fillStyle = `rgba(0,161,224,${0.07 + pulse * 0.06})`;
      roundRect(ctx, sx - 8, panelY - 8, PANEL_W + 16, PANEL_H + 16, 14);
      ctx.fill();
    }

    // Panel background
    ctx.fillStyle = near ? 'rgba(6,24,50,0.96)' : 'rgba(5,15,32,0.92)';
    roundRect(ctx, sx, panelY, PANEL_W, PANEL_H, 10);
    ctx.fill();

    // Panel border
    ctx.strokeStyle = near
      ? `rgba(0,161,224,${0.7 + pulse * 0.3})`
      : 'rgba(0,161,224,0.18)';
    ctx.lineWidth = near ? 1.5 : 1;
    roundRect(ctx, sx, panelY, PANEL_W, PANEL_H, 10);
    ctx.stroke();

    // Top accent bar
    ctx.fillStyle = near ? C.BLUE : 'rgba(0,161,224,0.25)';
    roundRect(ctx, sx, panelY, PANEL_W, 4, 4);
    ctx.fill();

    // Clip content area so overflow is hidden
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, sx + 1, panelY + 4, PANEL_W - 2, INNER_H + PANEL_PAD, 0);
    ctx.clip();

    // Draw snippet content
    const snippetFns = {
      'INTRODUCTION':       () => snippetIntro(innerX, innerY, innerW),
      'ACME CORPORATION':   () => snippetJob(RESUME.experience[0], innerX, innerY, innerW),
      'TECH SOLUTIONS INC': () => snippetJob(RESUME.experience[1], innerX, innerY, innerW),
      'STARTUP LABS':       () => snippetJob(RESUME.experience[2], innerX, innerY, innerW),
      'SKILLS':             () => snippetSkills(innerX, innerY, innerW),
      'EDUCATION & CERTS':  () => snippetEducation(innerX, innerY, innerW),
      'CONTACT':            () => snippetContact(innerX, innerY, innerW),
    };
    if (snippetFns[k.label]) snippetFns[k.label]();

    // Fade-out gradient at bottom of content area
    const fadeY = panelY + INNER_H;
    const fadeGrad = ctx.createLinearGradient(0, fadeY - 30, 0, fadeY + PANEL_PAD);
    fadeGrad.addColorStop(0, 'rgba(6,24,50,0)');
    fadeGrad.addColorStop(1, near ? 'rgba(6,24,50,1)' : 'rgba(5,15,32,1)');
    ctx.fillStyle = fadeGrad;
    ctx.fillRect(sx, fadeY - 30, PANEL_W, PANEL_PAD + 34);

    ctx.restore();

    // Footer divider
    ctx.strokeStyle = 'rgba(0,161,224,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx + PANEL_PAD, panelY + PANEL_H - FOOTER_H);
    ctx.lineTo(sx + PANEL_W - PANEL_PAD, panelY + PANEL_H - FOOTER_H);
    ctx.stroke();

    // "Press E for more" footer
    const footerY = panelY + PANEL_H - FOOTER_H + 19;
    setFont(10, '500', "'JetBrains Mono', monospace");
    ctx.textAlign = 'center';
    ctx.fillStyle = near
      ? `rgba(0,161,224,${0.6 + pulse * 0.4})`
      : 'rgba(0,161,224,0.2)';
    ctx.fillText('press  E  for full details', sx + PANEL_W / 2, footerY);
    ctx.textAlign = 'left';

    // E bubble above panel when near
    if (near) {
      drawEBubble(sx + PANEL_W / 2, panelY, time);
    }
  }

  // ---- DRAW BOUNCING E BUBBLE ----
  function drawEBubble(cx, baseY, time) {
    const bounce = Math.sin(time * 0.005) * 8;
    const bx = cx - 16;
    const by = baseY - 36 + bounce;
    const bw = 32;
    const bh = 28;

    // Tail
    ctx.fillStyle = C.BLUE;
    ctx.beginPath();
    ctx.moveTo(cx - 5, by + bh);
    ctx.lineTo(cx + 5, by + bh);
    ctx.lineTo(cx, by + bh + 8);
    ctx.closePath();
    ctx.fill();

    // Bubble body
    roundRect(ctx, bx, by, bw, bh, 6);
    ctx.fillStyle = C.BLUE;
    ctx.fill();

    // E letter
    setFont(16, '700', "'JetBrains Mono', monospace");
    ctx.fillStyle = C.WHITE;
    ctx.textAlign = 'center';
    ctx.fillText('E', cx, by + 20);
    ctx.textAlign = 'left';
  }

  // ---- PROXIMITY CHECK ----
  function isNearKiosk(k) {
    return Math.abs((player.x + PLAYER_W / 2) - k.centerX) < PROXIMITY;
  }

  function nearestKiosk() {
    return kiosks.find(k => isNearKiosk(k)) || null;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  resize();
  window.addEventListener('resize', resize);

  // ---- CAMERA ----
  const camera = { x: 0 };

  // ---- INPUT ----
  const keys = {};
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    const typingInInput = document.activeElement && document.activeElement.tagName === 'INPUT';
    const gameActive = !document.getElementById('game-screen').classList.contains('hidden');
    if (gameActive && !typingInInput && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'w', 'W', 's', 'S'].includes(e.key)) e.preventDefault();
  });
  window.addEventListener('keyup', (e) => { keys[e.key] = false; });


  // Mobile controls
  function bindMobile(id, keyName) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('touchstart', (e) => { e.preventDefault(); keys[keyName] = true; });
    el.addEventListener('touchend', (e) => { e.preventDefault(); keys[keyName] = false; });
    el.addEventListener('mousedown', () => { keys[keyName] = true; });
    el.addEventListener('mouseup', () => { keys[keyName] = false; });
  }
  bindMobile('btn-left', 'ArrowLeft');
  bindMobile('btn-right', 'ArrowRight');

  // ---- PLAYER ----
  const JUMP_FORCE = -13;
  const SLIDE_SPEED = MOVE_SPEED * 2.0;
  const JUMP_H_SPEED = MOVE_SPEED * 1.4;

  // ---- INTRO LANDING SEQUENCE ----
  let introActive = true;
  const balloon = {
    visible: true,
    y: -220,       // tracks with player.y during descent; floats away after landing
    screenX: null, // locked to Einstein's screen X when he touches down
    leaving: false,
  };

  const player = {
    x: 80,
    y: -220,     // start above screen, will float down
    vx: 0,
    vy: 0,
    onGround: false,
    facing: 1,
    frame: 0,
    frameTimer: 0,
    // state: idle | walk | jump | jump_side | squish | slide | land
    state: 'jump',
    landTimer: 0,
    jumpFrames: 0,
  };

  // ---- AGENTFORCE COMPANION ----
  const companion = {
    x: 40,
    y: -280,     // starts a bit higher — arrives just after Einstein
    facing: 1,
    bobPhase: 0, // for hovering animation
  };

  const COMP_W = 38;
  const COMP_H = 50;

  function drawAgentforce(screenX, screenY, facing, time) {
    ctx.save();

    // Hover bob
    const hover = Math.sin(time * 0.004) * 4;
    const tilt = Math.sin(time * 0.003) * 0.03; // subtle tilt

    if (facing === -1) {
      ctx.translate(screenX + COMP_W / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-COMP_W / 2, 0);
    } else {
      ctx.translate(screenX, 0);
    }

    const sy = screenY + hover;

    // ---- Shadow on ground ----
    ctx.fillStyle = 'rgba(0, 161, 224, 0.1)';
    ctx.beginPath();
    ctx.ellipse(COMP_W / 2, screenY + COMP_H + 6, 14 - Math.abs(hover) * 0.5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // ---- Hover glow under feet ----
    ctx.fillStyle = 'rgba(0, 161, 224, 0.06)';
    ctx.beginPath();
    ctx.ellipse(COMP_W / 2, screenY + COMP_H + 2, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // ---- Legs / boots (blue-accented) ----
    ctx.fillStyle = '#D0D8E0';
    ctx.fillRect(10, 40 + sy, 7, 8);
    ctx.fillRect(21, 40 + sy, 7, 8);
    // Boot accents
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(9, 45 + sy, 9, 4);
    ctx.fillRect(20, 45 + sy, 9, 4);

    // ---- Body (white/light gray torso) ----
    ctx.fillStyle = '#E8EDF2';
    ctx.fillRect(8, 22 + sy, 22, 20);
    // Body shading
    ctx.fillStyle = '#D0D8E0';
    ctx.fillRect(8, 22 + sy, 3, 20);
    ctx.fillRect(27, 22 + sy, 3, 20);

    // Chest panel (dark blue with Salesforce cloud)
    ctx.fillStyle = C.DARK_BLUE;
    ctx.fillRect(12, 26 + sy, 14, 10);
    // Salesforce cloud on chest
    ctx.fillStyle = C.WHITE;
    ctx.fillRect(15, 28 + sy, 8, 4);
    ctx.fillRect(14, 29 + sy, 3, 3);
    ctx.fillRect(21, 29 + sy, 3, 3);
    // Blue cloud detail
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(16, 29 + sy, 6, 2);

    // ---- Arms (white with blue joints) ----
    // Left arm (pointing forward)
    ctx.fillStyle = '#E8EDF2';
    ctx.fillRect(2, 24 + sy, 6, 14);
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(2, 30 + sy, 6, 3); // elbow joint
    // Right arm
    ctx.fillStyle = '#E8EDF2';
    ctx.fillRect(30, 24 + sy, 6, 14);
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(30, 30 + sy, 6, 3);
    // Hands
    ctx.fillStyle = '#D0D8E0';
    ctx.fillRect(1, 37 + sy, 6, 4);
    ctx.fillRect(31, 37 + sy, 6, 4);

    // ---- Head (large spherical helmet) ----
    // Helmet base (white/light gray round shape)
    ctx.fillStyle = '#E8EDF2';
    ctx.fillRect(5, 2 + sy, 28, 22);
    ctx.fillRect(3, 4 + sy, 32, 18);
    ctx.fillRect(7, 0 + sy, 24, 2);
    ctx.fillRect(7, 24 + sy, 24, 2);
    // Helmet top highlight
    ctx.fillStyle = '#F5F7FA';
    ctx.fillRect(9, 1 + sy, 20, 4);

    // Visor (dark blue reflective, sunglasses-style)
    ctx.fillStyle = '#0A1D3D';
    ctx.fillRect(7, 8 + sy, 24, 10);
    ctx.fillRect(9, 7 + sy, 20, 12);
    // Visor reflection/shine
    ctx.fillStyle = 'rgba(0, 161, 224, 0.5)';
    ctx.fillRect(10, 9 + sy, 8, 3);
    ctx.fillStyle = 'rgba(0, 161, 224, 0.3)';
    ctx.fillRect(20, 11 + sy, 6, 2);
    // Visor highlight (white reflection streak)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(11, 9 + sy, 5, 2);

    // ---- Antennae ----
    // Left antenna
    ctx.fillStyle = '#B0BEC5';
    ctx.fillRect(12, -4 + sy, 2, 6);
    ctx.fillStyle = C.BLUE;
    ctx.beginPath();
    ctx.arc(13, -5 + sy, 3, 0, Math.PI * 2);
    ctx.fill();
    // Antenna glow
    ctx.fillStyle = 'rgba(0, 161, 224, 0.4)';
    ctx.beginPath();
    ctx.arc(13, -5 + sy, 5, 0, Math.PI * 2);
    ctx.fill();

    // Right antenna
    ctx.fillStyle = '#B0BEC5';
    ctx.fillRect(24, -4 + sy, 2, 6);
    ctx.fillStyle = C.BLUE;
    ctx.beginPath();
    ctx.arc(25, -5 + sy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(0, 161, 224, 0.4)';
    ctx.beginPath();
    ctx.arc(25, -5 + sy, 5, 0, Math.PI * 2);
    ctx.fill();

    // ---- Blue accent lights (on sides of head) ----
    ctx.fillStyle = 'rgba(0, 161, 224, 0.7)';
    ctx.fillRect(4, 12 + sy, 3, 3);
    ctx.fillRect(31, 12 + sy, 3, 3);

    ctx.restore();
  }

  // ---- DRAW EINSTEIN — state-based ----
  function drawEinstein(screenX, screenY, facing, frame, state) {
    ctx.save();
    if (facing === -1) {
      ctx.translate(screenX + PLAYER_W / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-PLAYER_W / 2, 0);
    } else {
      ctx.translate(screenX, 0);
    }

    switch (state) {
      case 'squish': _einsteinBow(screenY); break;
      case 'land':   _einsteinLand(screenY);           break;
      case 'jump':   _einsteinJump(screenY, false);    break;
      case 'jump_side': _einsteinJump(screenY, true);  break;
      case 'slide':  _einsteinSlide(screenY, frame);   break;
      default:       _einsteinWalk(screenY, frame, state === 'walk'); break;
    }
    ctx.restore();
  }

  // ---- shared drawing helpers ----
  function _eHair(ox, sy, bob, style) {
    // style: 'normal' | 'squish' | 'jump' | 'slide'
    ctx.fillStyle = '#F5F5F5';
    if (style === 'squish') {
      // Hair flattened wide
      ctx.fillRect(ox - 6, -2 + sy + bob, 56, 8);
      ctx.fillRect(ox - 4, 0 + sy + bob, 52, 10);
      ctx.fillRect(ox - 8, 0 + sy + bob, 4, 6);
      ctx.fillRect(ox + 52, 0 + sy + bob, 4, 6);
    } else if (style === 'jump') {
      // Hair blown upward — taller and more spread
      ctx.fillRect(ox + 4, -14 + sy + bob, 36, 20);
      ctx.fillRect(ox + 2, -12 + sy + bob, 40, 14);
      ctx.fillRect(ox - 2, -8 + sy + bob, 8, 12);
      ctx.fillRect(ox + 38, -8 + sy + bob, 10, 12);
      ctx.fillRect(ox + 8, -22 + sy + bob, 6, 10);
      ctx.fillRect(ox + 16, -26 + sy + bob, 8, 10);
      ctx.fillRect(ox + 28, -24 + sy + bob, 7, 10);
      ctx.fillRect(ox + 36, -20 + sy + bob, 5, 8);
    } else if (style === 'slide') {
      // Hair swept back (rightward for forward-facing slide)
      ctx.fillRect(ox + 8, -6 + sy, 44, 14);
      ctx.fillRect(ox + 14, -12 + sy, 38, 8);
      ctx.fillRect(ox + 42, -4 + sy, 10, 12);
      ctx.fillRect(ox + 50, 0 + sy, 8, 10);
    } else {
      // Normal puffy hair
      ctx.fillRect(ox + 4, -6 + sy + bob, 36, 16);
      ctx.fillRect(ox + 2, -4 + sy + bob, 40, 12);
      ctx.fillRect(ox + 6, -10 + sy + bob, 32, 8);
      ctx.fillRect(ox + 10, -14 + sy + bob, 24, 6);
      ctx.fillRect(ox + 14, -16 + sy + bob, 16, 4);
      ctx.fillRect(ox - 2, -2 + sy + bob, 8, 10);
      ctx.fillRect(ox - 4, 0 + sy + bob, 6, 10);
      ctx.fillRect(ox + 38, -2 + sy + bob, 8, 10);
      ctx.fillRect(ox + 42, 0 + sy + bob, 6, 10);
      ctx.fillRect(ox + 8, -18 + sy + bob, 4, 6);
      ctx.fillRect(ox + 18, -20 + sy + bob, 6, 6);
      ctx.fillRect(ox + 30, -18 + sy + bob, 5, 6);
    }
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(ox + 4, 2 + sy + bob, 6, 8);
    ctx.fillRect(ox + 34, 2 + sy + bob, 6, 8);
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(ox + 4, 8 + sy + bob, 6, 12);
    ctx.fillRect(ox + 34, 8 + sy + bob, 6, 12);
  }

  function _eHead(ox, sy, bob, eyeStyle) {
    // Face
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox + 8, 6 + sy + bob, 28, 20);
    ctx.fillRect(ox + 6, 10 + sy + bob, 32, 14);

    // Eyes — style: 'normal' | 'wide' (squish/land) | 'closed' (slide)
    ctx.fillStyle = '#1A1A1A';
    if (eyeStyle === 'wide') {
      ctx.fillRect(ox + 12, 13 + sy + bob, 5, 5);
      ctx.fillRect(ox + 27, 13 + sy + bob, 5, 5);
    } else if (eyeStyle === 'closed') {
      ctx.fillRect(ox + 14, 15 + sy + bob, 6, 2);
      ctx.fillRect(ox + 26, 15 + sy + bob, 6, 2);
    } else {
      ctx.fillRect(ox + 14, 14 + sy + bob, 4, 4);
      ctx.fillRect(ox + 26, 14 + sy + bob, 4, 4);
    }
    if (eyeStyle !== 'closed') {
      ctx.fillStyle = '#FFF';
      ctx.fillRect(ox + 15, 14 + sy + bob, 2, 2);
      ctx.fillRect(ox + 27, 14 + sy + bob, 2, 2);
    }

    // Mustache
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(ox + 10, 20 + sy + bob, 24, 5);
    ctx.fillRect(ox + 8, 21 + sy + bob, 28, 3);
    ctx.fillRect(ox + 7, 22 + sy + bob, 4, 3);
    ctx.fillRect(ox + 33, 22 + sy + bob, 4, 3);
    // Goatee
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(ox + 16, 25 + sy + bob, 12, 3);
    ctx.fillRect(ox + 18, 27 + sy + bob, 8, 2);
  }

  function _eBody(ox, sy, bob) {
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(ox + 5, 24 + sy + bob, 34, 22);
    ctx.fillRect(ox + 2, 24 + sy + bob, 7, 16);
    ctx.fillRect(ox + 35, 24 + sy + bob, 7, 16);
    ctx.fillRect(ox + 4, 40 + sy + bob, 8, 6);
    ctx.fillRect(ox + 32, 40 + sy + bob, 8, 6);
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 14, 24 + sy + bob, 2, 18);
    ctx.fillRect(ox + 28, 24 + sy + bob, 2, 18);
    ctx.fillStyle = '#1A3A5C';
    ctx.fillRect(ox + 14, 24 + sy + bob, 16, 20);
    ctx.fillStyle = '#4FC3F7';
    ctx.fillRect(ox + 21, 25 + sy + bob, 3, 14);
    ctx.fillRect(ox + 20, 24 + sy + bob, 5, 3);
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(ox + 8, 42 + sy + bob, 28, 3);
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(ox + 20, 42 + sy + bob, 5, 3);
  }

  function _eAtom(ox, sy) {
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(ox + 43, 38 + sy, 8, 4, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(ox + 43, 38 + sy, 4, 8, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(ox + 43, 38 + sy, 8, 4, Math.PI / 3, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath(); ctx.arc(ox + 43, 38 + sy, 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(79,195,247,0.15)';
    ctx.beginPath(); ctx.arc(ox + 43, 38 + sy, 12, 0, Math.PI * 2); ctx.fill();
  }

  // ---- IDLE / WALK ----
  function _einsteinWalk(screenY, frame, walking) {
    const EW = 44, EH = 56;
    const ox = (PLAYER_W - EW) / 2;
    const bob = walking ? Math.sin(frame * 0.3) * 1.5 : 0;
    const sy = screenY + PLAYER_H - EH;
    const legOff = walking ? Math.sin(frame * 0.4) * 3 : 0;

    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(ox + EW/2, screenY + PLAYER_H + 1, 16, 4, 0, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = '#2C2C2C';
    ctx.fillRect(ox + 8 - legOff, 49 + sy, 11, 5); ctx.fillRect(ox + 6 - legOff, 51 + sy, 4, 3);
    ctx.fillRect(ox + 25 + legOff, 49 + sy, 11, 5); ctx.fillRect(ox + 34 + legOff, 51 + sy, 4, 3);
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 10, 42 + sy + bob, 10, 9);
    ctx.fillRect(ox + 24, 42 + sy + bob, 10, 9);

    _eBody(ox, sy, bob);

    // Arms — swing opposite to legs when walking
    const armSwing = walking ? Math.sin(frame * 0.4) * 5 : 0;
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(ox + 0,  26 + sy + bob + armSwing,  6, 14);
    ctx.fillRect(ox + 38, 26 + sy + bob - armSwing,  6, 14);
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox + 0,  40 + sy + bob + armSwing,  6, 4);
    ctx.fillRect(ox + 38, 40 + sy + bob - armSwing,  6, 4);
    if (!walking) _eAtom(ox, sy);

    _eHead(ox, sy, bob, 'normal');
    _eHair(ox, sy, bob, 'normal');
  }

  // ---- SQUISH (S key idle) ----
  function _einsteinSquish(screenY, frame) {
    const EW = 52, EH = 38; // wider, shorter
    const ox = (PLAYER_W - EW) / 2;
    const sy = screenY + PLAYER_H - EH;
    const pulse = Math.sin(frame * 0.2) * 1; // slight vibration

    // Big flat shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(ox + EW/2, screenY + PLAYER_H + 1, 22, 5, 0, 0, Math.PI*2); ctx.fill();

    // Flat squished shoes spread wide
    ctx.fillStyle = '#2C2C2C';
    ctx.fillRect(ox + 2, 30 + sy + pulse, 13, 5);
    ctx.fillRect(ox + 38, 30 + sy + pulse, 13, 5);

    // Squished pants
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 8, 25 + sy + pulse, 12, 7);
    ctx.fillRect(ox + 30, 25 + sy + pulse, 12, 7);

    // Squished body (wider, shorter)
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(ox + 2, 12 + sy + pulse, 48, 16);
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 16, 12 + sy + pulse, 2, 14);
    ctx.fillRect(ox + 32, 12 + sy + pulse, 2, 14);
    ctx.fillStyle = '#1A3A5C';
    ctx.fillRect(ox + 16, 12 + sy + pulse, 18, 14);
    ctx.fillStyle = '#4FC3F7';
    ctx.fillRect(ox + 24, 12 + sy + pulse, 3, 10);
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(ox + 6, 25 + sy + pulse, 40, 3);

    // Arms spread wide out to sides
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(ox - 8, 12 + sy + pulse, 10, 8);
    ctx.fillRect(ox + 50, 12 + sy + pulse, 10, 8);
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox - 9, 18 + sy + pulse, 8, 5);
    ctx.fillRect(ox + 52, 18 + sy + pulse, 8, 5);

    // Head squished / wide eyes
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox + 8, 1 + sy + pulse, 36, 14);
    ctx.fillRect(ox + 5, 4 + sy + pulse, 42, 10);

    // Wide surprised eyes
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(ox + 12, 5 + sy + pulse, 5, 6);
    ctx.fillRect(ox + 34, 5 + sy + pulse, 5, 6);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(ox + 13, 5 + sy + pulse, 2, 2);
    ctx.fillRect(ox + 35, 5 + sy + pulse, 2, 2);

    // Squished mustache
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(ox + 10, 11 + sy + pulse, 30, 3);
    ctx.fillRect(ox + 6, 11 + sy + pulse, 5, 2);
    ctx.fillRect(ox + 39, 11 + sy + pulse, 5, 2);

    _eHair(ox - 4, sy - 2, pulse, 'squish');
  }

  // ---- LAND (brief squish on touchdown) ----
  function _einsteinLand(screenY) {
    _einsteinSquish(screenY, 0); // keep the flat squish for landing impact
  }

  // ---- DAB (S key held idle) ----
  // Elbow is the PEAK — upper arm raises elbow above the head,
  // forearm comes back DOWN with hand near the face/chin.
  // Draw order: body → left arm → upper arm (behind head) → head → forearm+hand (over face)
  // ---- BOW (S key) ----
  function _einsteinBow(screenY) {
    const EW = 44, EH = 56;
    const ox = (PLAYER_W - EW) / 2;
    const sy = screenY + PLAYER_H - EH;

    // Shadow (slightly wider — leaning forward spreads silhouette)
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.ellipse(ox + EW / 2, screenY + PLAYER_H + 1, 20, 5, 0, 0, Math.PI * 2); ctx.fill();

    // Shoes (normal)
    ctx.fillStyle = '#2C2C2C';
    ctx.fillRect(ox + 8,  49 + sy, 12, 5); ctx.fillRect(ox + 6,  51 + sy, 4, 3);
    ctx.fillRect(ox + 24, 49 + sy, 12, 5); ctx.fillRect(ox + 36, 51 + sy, 4, 3);

    // Legs (normal)
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 10, 42 + sy, 10, 9);
    ctx.fillRect(ox + 24, 42 + sy, 10, 9);

    // Body (shifted down — torso bent forward = appears lower/shorter from front)
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(ox + 4,  33 + sy, 36, 12);
    ctx.fillRect(ox + 0,  33 + sy,  7,  9);  // left arm
    ctx.fillRect(ox + 37, 33 + sy,  7,  9);  // right arm
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 13, 33 + sy, 2, 10);
    ctx.fillRect(ox + 29, 33 + sy, 2, 10);
    ctx.fillStyle = '#1A3A5C';
    ctx.fillRect(ox + 13, 33 + sy, 18, 10);
    ctx.fillStyle = '#4FC3F7';
    ctx.fillRect(ox + 21, 34 + sy,  3,  7);
    ctx.fillRect(ox + 20, 33 + sy,  5,  3);
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(ox + 8,  41 + sy, 28,  3);  // belt
    // Hands hanging at sides
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox - 1, 41 + sy, 6, 4);
    ctx.fillRect(ox + 39, 41 + sy, 6, 4);

    // Head bowed low — crown faces viewer, hair prominent
    const hsy = sy + 14; // shift head 14px lower than upright pose
    _eHair(ox, hsy, 0, 'normal');

    // Compressed face under the hair (looking down — features near bottom edge)
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox + 8,  8 + hsy, 28, 14);
    ctx.fillRect(ox + 6, 11 + hsy, 32,  9);
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(ox + 14, 17 + hsy, 4, 2); // eyes very low
    ctx.fillRect(ox + 26, 17 + hsy, 4, 2);
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(ox + 10, 20 + hsy, 24, 3); // mustache at chin
    ctx.fillRect(ox +  8, 21 + hsy, 28, 2);
  }

  // ---- JUMP / JUMP_SIDE ----
  function _einsteinJump(screenY, sideways) {
    const EW = 44, EH = 56;
    const ox = (PLAYER_W - EW) / 2;
    const sy = screenY + PLAYER_H - EH;

    // Smaller airborne shadow
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.beginPath(); ctx.ellipse(ox + EW/2, GROUND_Y - screenY + screenY + PLAYER_H + 6, 10, 3, 0, 0, Math.PI*2); ctx.fill();

    if (sideways) {
      // Leaning: legs kicked back, arms forward
      // Back leg
      ctx.fillStyle = '#4E342E'; ctx.fillRect(ox + 6, 44 + sy, 10, 7);
      ctx.fillStyle = '#2C2C2C'; ctx.fillRect(ox + 4, 49 + sy, 12, 4);
      // Front leg tucked up and forward
      ctx.fillStyle = '#4E342E'; ctx.fillRect(ox + 22, 36 + sy, 10, 10);
      ctx.fillStyle = '#2C2C2C'; ctx.fillRect(ox + 24, 43 + sy, 12, 4);
    } else {
      // Vertical jump: both legs tucked up
      ctx.fillStyle = '#4E342E';
      ctx.fillRect(ox + 8, 40 + sy, 10, 8);
      ctx.fillRect(ox + 24, 40 + sy, 10, 8);
      ctx.fillStyle = '#2C2C2C';
      ctx.fillRect(ox + 6, 45 + sy, 12, 4);
      ctx.fillRect(ox + 26, 45 + sy, 12, 4);
    }

    _eBody(ox, sy, 0);

    // Arms spread wide for balance
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(ox - 6, 22 + sy, 8, 14);
    ctx.fillRect(ox + 38, 22 + sy, 8, 14);
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox - 7, 34 + sy, 8, 5);
    ctx.fillRect(ox + 39, 34 + sy, 8, 5);

    _eHead(ox, sy, 0, 'normal');
    _eHair(ox, sy, 0, 'jump');
  }

  // ---- SLIDE (soccer tackle — body nearly horizontal, one leg extended, one knee up) ----
  function _einsteinSlide(screenY, frame) {
    const EW = 72, EH = 30;
    const ox = (PLAYER_W - EW) / 2; // = -20
    const sy = screenY + PLAYER_H - EH;

    // Long flat shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(ox + EW / 2, screenY + PLAYER_H + 2, 32, 5, 0, 0, Math.PI * 2); ctx.fill();

    // Dust puffs trailing behind (left side)
    const d = 0.18 + Math.sin(frame * 0.4) * 0.08;
    ctx.fillStyle = `rgba(210,185,130,${d})`;
    ctx.beginPath(); ctx.ellipse(ox + 4,  sy + 27, 14, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(210,185,130,${d * 0.55})`;
    ctx.beginPath(); ctx.ellipse(ox - 8, sy + 25, 9,  4, 0, 0, Math.PI * 2); ctx.fill();

    // === BENT KNEE LEG (back leg, knee raised) ===
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 26, sy + 12, 12, 10); // upper thigh (near vertical)
    ctx.fillRect(ox + 20, sy + 6,  10,  8); // shin bending back-upward
    ctx.fillStyle = '#2C2C2C';
    ctx.fillRect(ox + 13, sy + 4,  11,  5); // shoe pointing backward
    ctx.fillRect(ox + 11, sy + 6,  4,   3); // toe overhang

    // === EXTENDED LEAD LEG (the full soccer slide leg, stretching right) ===
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 40, sy + 18, 22,  8); // thigh
    ctx.fillRect(ox + 58, sy + 20, 14,  7); // shin
    ctx.fillStyle = '#2C2C2C';
    ctx.fillRect(ox + 68, sy + 20, 9,   7); // shoe pointing forward
    ctx.fillRect(ox + 75, sy + 22, 4,   4); // toe

    // === BODY (horizontal, leaning back — drawn over leg tops) ===
    ctx.fillStyle = '#5D4037'; // brown blazer
    ctx.fillRect(ox + 12, sy + 8,  38, 14);
    ctx.fillRect(ox + 8,  sy + 10, 6,  10); // left shoulder bulk
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 22, sy + 8,  2,  12); // lapel crease left
    ctx.fillRect(ox + 36, sy + 8,  2,  12); // lapel crease right
    ctx.fillStyle = '#1A3A5C'; // shirt front
    ctx.fillRect(ox + 22, sy + 8,  16, 12);
    ctx.fillStyle = '#4FC3F7'; // tie (flowing)
    ctx.fillRect(ox + 29, sy + 9,  3,  10);
    ctx.fillRect(ox + 27, sy + 17, 4,  3); // tie tip flapping up
    ctx.fillStyle = '#3E2723'; // belt
    ctx.fillRect(ox + 12, sy + 20, 38, 2);

    // === LEFT ARM (trailing arm, bracing near ground) ===
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(ox + 6,  sy + 14, 8,  8); // upper arm down-left
    ctx.fillRect(ox + 0,  sy + 18, 8,  6); // forearm
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox - 2,  sy + 22, 8,  5); // hand near ground

    // === RIGHT ARM (raised up for balance) ===
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(ox + 46, sy + 4,  7,  8); // upper arm up
    ctx.fillRect(ox + 50, sy - 2,  6,  8); // forearm continuing up
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox + 52, sy - 6,  6,  5); // hand raised high

    // === HEAD (at left end, looking forward) ===
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox + 2,  sy + 0,  22, 14); // face (compact, horizontal)
    ctx.fillRect(ox + 0,  sy + 3,  26, 10); // wider cheek band

    // Eyes: fierce determined squint
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(ox + 5,  sy + 4,  7,  2);
    ctx.fillRect(ox + 15, sy + 4,  7,  2);

    // Mustache blown back (rightward since moving right)
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(ox + 4,  sy + 8,  20, 4);
    ctx.fillRect(ox + 22, sy + 9,  4,  3); // swept-back right end
    ctx.fillRect(ox + 2,  sy + 9,  4,  3); // left end curl

    // Hair blown back (trailing left as body moves right)
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(ox - 4,  sy - 1,  14, 8); // main hair mass trailing
    ctx.fillRect(ox - 8,  sy + 1,  10, 6); // flowing left
    ctx.fillRect(ox - 10, sy + 3,  6,  4); // hair tip
    ctx.fillRect(ox - 2,  sy - 4,  10, 4); // tuft on top
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(ox - 4,  sy + 5,  6,  6); // sideburn/temple lock
  }

  // ---- HOT AIR BALLOON (intro landing) ----
  // Shared geometry helper so back and front use identical coords
  function _balloonGeom(screenX, refY, time) {
    const cx  = screenX + PLAYER_W / 2;
    const bw  = 160, bh = 180;
    // Basket rim sits at Einstein's waist — shows head + chest above the rim
    const bkw = 64, bkh = 36;
    const bkx = cx - bkw / 2;
    const basketTop = refY + 18;          // ~18 px below Einstein top ≈ waist
    const ropeGap   = 18;
    const ropeTop   = basketTop - ropeGap; // ropes connect here up to balloon
    const by = ropeTop - bh;              // balloon envelope top
    const bx = cx - bw / 2;
    const sway = Math.sin(time * 0.0015) * 3;
    return { cx, bw, bh, bx, by, bkw, bkh, bkx, basketTop, ropeTop, sway };
  }

  // Draw envelope + ropes — called BEFORE Einstein so they sit behind him
  function drawBalloonBack(screenX, refY, time) {
    const { cx, bw, bh, bx, by, bkw, bkx, basketTop, ropeTop, sway } = _balloonGeom(screenX, refY, time);
    ctx.save();
    ctx.translate(sway, 0);

    // Shadow on envelope
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.ellipse(cx + 6, by + bh * 0.55, bw * 0.35, bh * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Envelope panels — 4 Salesforce-coloured vertical stripes
    const panels = [C.BLUE, C.ORANGE, C.BLUE, C.ORANGE];
    const pw = bw / panels.length;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, by + bh * 0.5, bw / 2, bh / 2, 0, 0, Math.PI * 2);
    ctx.clip();
    panels.forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.fillRect(bx + i * pw, by, pw, bh);
    });
    ctx.restore();

    // Envelope outline
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx, by + bh * 0.5, bw / 2, bh / 2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Highlight sheen
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.ellipse(cx - bw * 0.15, by + bh * 0.28, bw * 0.18, bh * 0.22, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Ropes from balloon bottom down to basket rim
    ctx.strokeStyle = '#8D6E63';
    ctx.lineWidth = 2;
    [[cx - bw * 0.28, cx - 26], [cx - bw * 0.1, cx - 9],
     [cx + bw * 0.1,  cx + 9],  [cx + bw * 0.28, cx + 26]].forEach(([from, to]) => {
      ctx.beginPath(); ctx.moveTo(from, by + bh); ctx.lineTo(to, basketTop); ctx.stroke();
    });

    ctx.restore();
  }

  // Draw basket only — called AFTER Einstein so it sits in front and hides his lower body
  function drawBalloonFront(screenX, refY, time) {
    const { cx, bkw, bkh, bkx, basketTop, sway } = _balloonGeom(screenX, refY, time);
    ctx.save();
    ctx.translate(sway, 0);

    // Basket body
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(bkx,              basketTop,      bkw, bkh);
    // Rim + struts
    ctx.fillStyle = '#6D4C41';
    ctx.fillRect(bkx,              basketTop,      bkw, 5);         // top rim
    ctx.fillRect(bkx,              basketTop + 5,  4,   bkh - 5);   // left strut
    ctx.fillRect(bkx + bkw - 4,    basketTop + 5,  4,   bkh - 5);   // right strut
    ctx.fillRect(bkx + bkw/2 - 2,  basketTop + 5,  4,   bkh - 5);   // centre strut
    // Salesforce cloud logo on front of basket
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(bkx + 12, basketTop + 10, 30, 11);
    ctx.fillRect(bkx + 10, basketTop + 13, 6,   7);
    ctx.fillRect(bkx + 33, basketTop + 13, 6,   7);

    ctx.restore();
  }

  // ---- BACKGROUND ----
  function drawBackground() {
    // Sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#050D1A');
    grad.addColorStop(0.5, '#0B1D3A');
    grad.addColorStop(1, '#0F2847');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i < 80; i++) {
      const sx = ((i * 173 + 50) % W + camera.x * 0.01) % W;
      const sy = (i * 97 + 20) % (H * 0.55);
      const size = (i % 3 === 0) ? 2 : 1;
      ctx.fillRect(sx, sy, size, size);
    }

    // Distant clouds (very subtle)
    ctx.fillStyle = 'rgba(0, 161, 224, 0.04)';
    for (let i = 0; i < 5; i++) {
      const cx = ((i * 500 + 200) - camera.x * 0.05) % (W + 400) - 200;
      const cy = 80 + (i * 71) % 180;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 100 + (i % 3) * 40, 25, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Distant hills
    ctx.fillStyle = 'rgba(0, 161, 224, 0.06)';
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 4) {
      const wx = x + camera.x * 0.08;
      const h = Math.sin(wx * 0.002) * 50 + Math.sin(wx * 0.005) * 25 + 140;
      ctx.lineTo(x, H - h);
    }
    ctx.lineTo(W, H);
    ctx.fill();

    // Closer hills
    ctx.fillStyle = 'rgba(0, 161, 224, 0.04)';
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 4) {
      const wx = x + camera.x * 0.15;
      const h = Math.sin(wx * 0.004 + 1) * 35 + Math.sin(wx * 0.009) * 18 + 110;
      ctx.lineTo(x, H - h);
    }
    ctx.lineTo(W, H);
    ctx.fill();
  }

  // ---- GROUND ----
  function drawGround() {
    // Ground
    ctx.fillStyle = '#0A1628';
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

    // Ground line
    ctx.fillStyle = 'rgba(0, 161, 224, 0.2)';
    ctx.fillRect(0, GROUND_Y, W, 1);

    // Subtle grid lines on ground (perspective feel)
    ctx.fillStyle = 'rgba(0, 161, 224, 0.04)';
    for (let i = 0; i < 6; i++) {
      const gy = GROUND_Y + 15 + i * 15;
      ctx.fillRect(0, gy, W, 1);
    }
  }

  // ---- DRAW FINISH LINE ----
  // Inspired by flag-on-hill icons: a green dome hill, a tall pole, and a Salesforce-orange triangular flag
  function drawFinishLine(time) {
    const sx = FINISH_X - camera.x;
    if (sx > W + 200 || sx < -300) return;

    const HILL_CX = sx + 40;        // hill center
    const HILL_BASE_Y = GROUND_Y;
    const HILL_W = 120;
    const HILL_H = 60;

    const POLE_X = HILL_CX;
    const POLE_BASE_Y = HILL_BASE_Y - HILL_H; // top of hill
    const POLE_H = 130;
    const POLE_TOP_Y = POLE_BASE_Y - POLE_H;

    const FLAG_H = 36;
    const FLAG_W = 52;

    // ---- Hill shadow ----
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(HILL_CX, HILL_BASE_Y + 4, HILL_W * 0.55, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // ---- Hill (dome) ----
    // Dark green base
    ctx.fillStyle = '#1B4D1F';
    ctx.beginPath();
    ctx.moveTo(HILL_CX - HILL_W, HILL_BASE_Y);
    ctx.quadraticCurveTo(HILL_CX - HILL_W * 0.5, HILL_BASE_Y - HILL_H * 0.5, HILL_CX, HILL_BASE_Y - HILL_H);
    ctx.quadraticCurveTo(HILL_CX + HILL_W * 0.5, HILL_BASE_Y - HILL_H * 0.5, HILL_CX + HILL_W, HILL_BASE_Y);
    ctx.closePath();
    ctx.fill();

    // Mid green layer
    ctx.fillStyle = '#2E7D32';
    ctx.beginPath();
    ctx.moveTo(HILL_CX - HILL_W * 0.85, HILL_BASE_Y);
    ctx.quadraticCurveTo(HILL_CX - HILL_W * 0.35, HILL_BASE_Y - HILL_H * 0.65, HILL_CX - 6, HILL_BASE_Y - HILL_H + 8);
    ctx.quadraticCurveTo(HILL_CX + HILL_W * 0.35, HILL_BASE_Y - HILL_H * 0.65, HILL_CX + HILL_W * 0.85, HILL_BASE_Y);
    ctx.closePath();
    ctx.fill();

    // Highlight on upper-left of dome
    ctx.fillStyle = '#43A047';
    ctx.beginPath();
    ctx.moveTo(HILL_CX - 20, HILL_BASE_Y - HILL_H);
    ctx.quadraticCurveTo(HILL_CX - 50, HILL_BASE_Y - HILL_H * 0.55, HILL_CX - HILL_W * 0.5, HILL_BASE_Y - HILL_H * 0.2);
    ctx.quadraticCurveTo(HILL_CX - 30, HILL_BASE_Y - HILL_H * 0.6, HILL_CX + 10, HILL_BASE_Y - HILL_H * 0.9);
    ctx.closePath();
    ctx.fill();

    // ---- Pole ----
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(POLE_X - 2, POLE_TOP_Y, 4, POLE_H);
    // Pole highlight
    ctx.fillStyle = '#A1887F';
    ctx.fillRect(POLE_X - 1, POLE_TOP_Y, 1, POLE_H);
    // Pole top knob
    ctx.fillStyle = '#FFCC02';
    ctx.beginPath();
    ctx.arc(POLE_X, POLE_TOP_Y, 5, 0, Math.PI * 2);
    ctx.fill();

    // ---- Flag (slides from top to bottom when triggered) ----
    const slideDist = POLE_H - FLAG_H - 8;
    const flagOffsetY = finish.flagY * slideDist;
    const flagTopY = POLE_TOP_Y + 4 + flagOffsetY;

    // Flag triangle (Salesforce cloud shape approximated as a triangle + notch)
    // Main body — Salesforce blue
    ctx.fillStyle = C.BLUE;
    ctx.beginPath();
    ctx.moveTo(POLE_X + 2, flagTopY);
    ctx.lineTo(POLE_X + 2 + FLAG_W, flagTopY + FLAG_H * 0.5);
    ctx.lineTo(POLE_X + 2, flagTopY + FLAG_H);
    ctx.closePath();
    ctx.fill();

    // Flag highlight
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.moveTo(POLE_X + 2, flagTopY);
    ctx.lineTo(POLE_X + 2 + FLAG_W * 0.6, flagTopY + FLAG_H * 0.35);
    ctx.lineTo(POLE_X + 2, flagTopY + FLAG_H * 0.55);
    ctx.closePath();
    ctx.fill();

    // Salesforce cloud icon on flag (white pixel-art cloud)
    const fcx = POLE_X + 14;
    const fcy = flagTopY + 8;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillRect(fcx + 3, fcy + 2, 12, 7);
    ctx.fillRect(fcx, fcy + 4, 18, 5);
    ctx.fillRect(fcx + 2, fcy, 4, 4);
    ctx.fillRect(fcx + 7, fcy - 2, 6, 4);
    ctx.fillRect(fcx + 12, fcy + 1, 4, 4);

    // ---- Floating "FINISH LINE" banner above the pole ----
    const bannerBob = Math.sin(time * 0.002) * 5;
    const bannerY = POLE_TOP_Y - 30 + bannerBob;
    const bannerText = 'FINISH LINE';
    setFont(13, '700', "'JetBrains Mono', monospace");
    ctx.textAlign = 'center';
    const bannerW = ctx.measureText(bannerText).width + 28;
    const bannerH = 26;
    const bannerX = HILL_CX - bannerW / 2;

    // Glow halo
    ctx.shadowColor = '#FFCC02';
    ctx.shadowBlur = finish.triggered ? 18 : 10;

    // Banner background
    roundRect(ctx, bannerX, bannerY - bannerH + 4, bannerW, bannerH, 5);
    ctx.fillStyle = finish.triggered ? '#FFCC02' : 'rgba(20,14,0,0.82)';
    ctx.fill();

    // Banner border
    ctx.strokeStyle = '#FFCC02';
    ctx.lineWidth = finish.triggered ? 2.5 : 1.5;
    roundRect(ctx, bannerX, bannerY - bannerH + 4, bannerW, bannerH, 5);
    ctx.stroke();

    // Dashed line tails on each side
    ctx.strokeStyle = 'rgba(255,204,2,0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(bannerX - 2, bannerY - bannerH * 0.5 + 4); ctx.lineTo(POLE_X - 2, bannerY - bannerH * 0.5 + 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bannerX + bannerW + 2, bannerY - bannerH * 0.5 + 4); ctx.lineTo(POLE_X + 2, bannerY - bannerH * 0.5 + 4); ctx.stroke();
    ctx.setLineDash([]);

    // Text
    ctx.fillStyle = finish.triggered ? '#1A1000' : '#FFCC02';
    ctx.fillText(bannerText, HILL_CX, bannerY);
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';

    // ---- Celebrate particles ----
    if (finish.celebrateTimer > 0) {
      const t = finish.celebrateTimer;
      const colors = [C.BLUE, C.ORANGE, '#FFCC02', '#FFFFFF', '#43A047'];
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const dist = (1 - t / 120) * 100;
        const px = HILL_CX + Math.cos(angle + t * 0.05) * dist;
        const py = (POLE_TOP_Y - 20) + Math.sin(angle + t * 0.05) * dist;
        ctx.fillStyle = colors[i % colors.length];
        const size = 4 + (i % 3) * 2;
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }
    }
  }

  // ---- RENDER KIOSKS ----
  function renderKiosks(time) {
    for (const k of kiosks) {
      const sx = k.x - camera.x;
      if (sx + PANEL_W < -50 || sx > W + 50) continue;
      drawKiosk(k, time);
    }
  }

  // ---- SECTION MARKERS (subtle vertical lines + labels) ----
  function renderSectionMarkers() {
    for (const marker of sectionMarkers) {
      const sx = marker.x - camera.x - 80;
      if (sx < -100 || sx > W + 100) continue;

      // Vertical line
      ctx.fillStyle = 'rgba(0, 161, 224, 0.08)';
      ctx.fillRect(sx, 0, 1, H);

      // Section label (vertical, at top)
      ctx.save();
      ctx.translate(sx - 8, 60);
      ctx.rotate(-Math.PI / 2);
      setFont(10, '500', "'JetBrains Mono', monospace");
      ctx.fillStyle = 'rgba(0, 161, 224, 0.2)';
      ctx.fillText(marker.name, 0, 0);
      ctx.restore();
    }
  }

  // ---- UPDATE SECTION INDICATOR ----
  function updateSectionIndicator() {
    let currentSection = '';
    for (let i = sectionMarkers.length - 1; i >= 0; i--) {
      if (camera.x + W / 2 >= sectionMarkers[i].x - 200) {
        currentSection = sectionMarkers[i].name;
        break;
      }
    }
    sectionIndicator.textContent = currentSection;
  }

  // ---- MODAL ----
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle   = document.getElementById('modal-title');
  const modalBody    = document.getElementById('modal-body');
  const modalClose   = document.getElementById('modal-close');
  let modalOpen = false;

  function openModal(kiosk) {
    modalTitle.textContent = kiosk.label;
    modalBody.innerHTML = kiosk.htmlFn();
    modalBody.scrollTop = 0;
    modalOverlay.classList.remove('hidden');
    modalOpen = true;
  }

  function closeModal() {
    modalOverlay.classList.add('hidden');
    modalOpen = false;
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ---- BACK TO TERMINAL ----
  const backBtn = document.getElementById('back-to-terminal');
  let backBtnShown = false;

  function checkEndOfWorld() {
    if (!backBtnShown && (finish.triggered || player.x >= FINISH_X + 60)) {
      backBtn.classList.remove('hidden');
      requestAnimationFrame(() => backBtn.classList.add('visible'));
      backBtnShown = true;
    }
  }

  backBtn.addEventListener('click', () => {
    document.getElementById('game-screen').classList.add('hidden');
    backBtn.classList.remove('visible');
    backBtn.classList.add('hidden');
    const termScreen = document.getElementById('terminal-screen');
    termScreen.style.display = 'flex';
    termScreen.classList.remove('fade-out');
    document.getElementById('terminal-input').focus();
  });

  // ---- GAME LOOP ----
  let lastTime = 0;

  function update() {
    // Modal key handling
    if ((keys['e'] || keys['E']) && !modalOpen) {
      keys['e'] = false; keys['E'] = false;
      const k = nearestKiosk();
      if (k) openModal(k);
    }
    if (keys['Escape'] && modalOpen) { keys['Escape'] = false; closeModal(); }
    if (modalOpen) return;

    // ---- Intro: both characters float slowly down from above ----
    if (introActive) {
      const playerGroundY = GROUND_Y - PLAYER_H;
      const compGroundY   = GROUND_Y - COMP_H;

      // Gentle lerp descent — ease-out feel, companion lags slightly behind
      player.y    += (playerGroundY - player.y)   * 0.028;
      companion.y += (compGroundY   - companion.y) * 0.022;
      companion.x += (player.x - 50 - companion.x) * 0.05;

      player.state = 'jump'; // arms-out float pose during descent

      // Balloon tracks Einstein during descent
      balloon.y = player.y;

      // Land once close enough to ground
      if (Math.abs(player.y - playerGroundY) < 1.5) {
        player.y      = playerGroundY;
        player.onGround = true;
        player.state  = 'land';
        player.landTimer = 14;
        introActive     = false;
        balloon.leaving = true;           // balloon floats back up
        balloon.screenX = player.x - camera.x; // lock horizontal position
      }

      // Keep camera locked at 0 during intro — no clamping issues on transition
      camera.x = 0;
      return;
    }

    // Balloon floats back up after landing
    if (balloon.leaving && balloon.visible) {
      balloon.y -= 5;
      if (balloon.y < -300) balloon.visible = false;
    }

    const left  = keys['ArrowLeft']  || keys['a'] || keys['A'];
    const right = keys['ArrowRight'] || keys['d'] || keys['D'];
    const jump  = keys['w'] || keys['W'];
    const squat = keys['s'] || keys['S'];

    // ---- State machine ----
    if (player.landTimer > 0) {
      player.landTimer--;
      player.state = 'land';
      player.vx = 0;
    } else if (!player.onGround) {
      player.jumpFrames++;
      // Allow late directional input: if W still held and A/D pressed within ~20 frames of jump
      if (jump && (left || right) && player.jumpFrames < 20) {
        player.vx = right ? JUMP_H_SPEED : -JUMP_H_SPEED;
        player.facing = right ? 1 : -1;
      }
      player.state = (player.vx !== 0) ? 'jump_side' : 'jump';
    } else if (jump && (left || right)) {
      // Sideways jump
      player.vy = JUMP_FORCE;
      player.vx = right ? JUMP_H_SPEED : -JUMP_H_SPEED;
      player.facing = right ? 1 : -1;
      player.onGround = false;
      player.jumpFrames = 0;
      player.state = 'jump_side';
    } else if (jump) {
      // Vertical jump
      player.vy = JUMP_FORCE;
      player.vx = 0;
      player.onGround = false;
      player.jumpFrames = 0;
      player.state = 'jump';
    } else if (squat && (left || right)) {
      // Slide
      player.vx = right ? SLIDE_SPEED : -SLIDE_SPEED;
      player.facing = right ? 1 : -1;
      player.state = 'slide';
    } else if (squat) {
      // Squish in place
      player.vx = 0;
      player.state = 'squish';
    } else if (left || right) {
      player.vx = right ? MOVE_SPEED : -MOVE_SPEED;
      player.facing = right ? 1 : -1;
      player.state = 'walk';
    } else {
      player.vx = 0;
      player.state = 'idle';
    }

    // ---- Physics ----
    if (!player.onGround) player.vy += GRAVITY;

    player.x += player.vx;
    player.y += player.vy;

    player.x = Math.max(0, Math.min((WORLD_WIDTH || 5000) - PLAYER_W, player.x));

    // Ground collision
    if (player.y + PLAYER_H >= GROUND_Y) {
      const wasInAir = !player.onGround;
      player.y = GROUND_Y - PLAYER_H;
      player.vy = 0;
      player.onGround = true;
      if (wasInAir) {
        player.landTimer = 8; // brief land squish
        player.vx = 0;
        player.jumpFrames = 0;
      }
    } else {
      player.onGround = false;
    }

    // ---- Walk frame animation ----
    if (player.state === 'walk' || player.state === 'slide') {
      player.frameTimer++;
      if (player.frameTimer > 5) { player.frame++; player.frameTimer = 0; }
    } else {
      player.frame = 0; player.frameTimer = 0;
    }

    // ---- Finish line flag interaction ----
    const hillScreenX = FINISH_X - camera.x;
    // Start raising the flag once the hill scrolls into view
    if (!finish.raising && hillScreenX < W + 100) {
      finish.raising = true;
    }
    // Slowly raise flag (1 → 0) while not yet triggered
    if (finish.raising && !finish.triggered && finish.flagY > 0) {
      finish.flagY = Math.max(0, finish.flagY - 0.004);
    }
    // Trigger when Einstein walks past the hill centre
    if (!finish.triggered) {
      const poleCX = FINISH_X + 40;
      if (player.x + PLAYER_W / 2 >= poleCX) {
        finish.triggered = true;
        finish.flagY = 0;
        finish.celebrateTimer = 120;
        setTimeout(() => openModal({ label: 'THANKS FOR VISITING', htmlFn: htmlThankYou }), 600);
      }
    }
    if (finish.celebrateTimer > 0) finish.celebrateTimer--;

    // ---- Camera ----
    const targetX = player.x - W * 0.25;
    camera.x += (targetX - camera.x) * 0.07;
    camera.x = Math.max(0, Math.min((WORLD_WIDTH || 5000) - W, camera.x));

    // ---- Companion ----
    const targetCompX = player.x - 50;
    companion.x += (targetCompX - companion.x) * 0.04;
    companion.y = GROUND_Y - COMP_H; // snap to hover height once intro is done
    companion.facing = player.facing;
  }

  function render() {
    ctx.clearRect(0, 0, W, H);

    drawBackground();
    renderSectionMarkers();
    drawGround();
    renderKiosks(lastTime);
    drawFinishLine(lastTime);

    // Agentforce companion
    const compScreenX = companion.x - camera.x;
    const compScreenY = companion.y;
    drawAgentforce(compScreenX, compScreenY, companion.facing, lastTime);

    // Player
    const playerScreenX = player.x - camera.x;
    const playerScreenY = player.y;

    // Balloon: during descent track Einstein, after landing ascend from fixed spot
    const balloonScreenX = balloon.screenX !== null ? balloon.screenX : playerScreenX;

    // Balloon back (envelope + ropes) — drawn behind Einstein
    if (balloon.visible) drawBalloonBack(balloonScreenX, balloon.y, lastTime);

    drawEinstein(playerScreenX, playerScreenY, player.facing, player.frame, player.state);

    // Balloon front (basket) — drawn in front of Einstein so he stands inside
    if (balloon.visible) drawBalloonFront(balloonScreenX, balloon.y, lastTime);

    updateSectionIndicator();
    checkEndOfWorld();
  }

  function gameLoop(timestamp) {
    lastTime = timestamp;
    update();
    render();
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}
