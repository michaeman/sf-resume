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
  summary: 'Results-driven Salesforce professional with 7+ years of experience designing, developing, and deploying scalable CRM solutions. Passionate about leveraging the Salesforce platform to drive business transformation, streamline operations, and deliver exceptional user experiences. Proven track record of leading cross-functional teams and delivering projects on time.',
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

  // ---- CONTENT PANELS ----
  // Each panel is a large readable block positioned in the world
  let panels = [];
  let sectionMarkers = []; // { x, name } for the HUD

  function buildWorld() {
    panels = [];
    sectionMarkers = [];

    const panelW = Math.min(700, W * 0.75);
    const lineH = 22;
    const headingH = 36;
    const subheadH = 28;
    let cursorX = W * 0.4; // start a bit in so player walks to first panel

    // Helper to add a panel
    function addPanel(x, contentFn, estimatedHeight) {
      panels.push({ x, y: 0, w: panelW, contentFn, h: estimatedHeight || 400 });
      return x + panelW + SECTION_GAP;
    }

    // ====== SECTION 1: HERO / INTRO ======
    sectionMarkers.push({ x: cursorX, name: 'INTRODUCTION' });

    cursorX = addPanel(cursorX, (px, py, pw) => {
      let y = py;

      // Name
      setFont(42, '700');
      ctx.fillStyle = C.WHITE;
      ctx.fillText(RESUME.name, px, y);
      y += 52;

      // Title
      setFont(20, '500');
      ctx.fillStyle = C.ORANGE;
      ctx.fillText(RESUME.title, px, y);
      y += 16;

      // Divider
      y += 20;
      ctx.fillStyle = C.BLUE;
      ctx.fillRect(px, y, 60, 3);
      y += 30;

      // Summary
      setFont(15, '400');
      ctx.fillStyle = C.LIGHT_GRAY;
      const summaryLines = wrapText(RESUME.summary, pw, 15);
      for (const line of summaryLines) {
        ctx.fillText(line, px, y);
        y += lineH;
      }
      y += 20;

      // Location & contact snippet
      setFont(13, '400', "'JetBrains Mono', monospace");
      ctx.fillStyle = C.DIM;
      ctx.fillText(`${RESUME.contact.location}  ·  ${RESUME.contact.email}`, px, y);
      y += 18;
      ctx.fillText(`${RESUME.contact.linkedin}  ·  ${RESUME.contact.github}`, px, y);

      return y + 40 - py;
    }, 350);

    // ====== SECTION 2: EXPERIENCE ======
    sectionMarkers.push({ x: cursorX, name: 'EXPERIENCE' });

    for (const job of RESUME.experience) {
      cursorX = addPanel(cursorX, (px, py, pw) => {
        let y = py;

        // Company
        setFont(28, '700');
        ctx.fillStyle = C.WHITE;
        ctx.fillText(job.company, px, y);
        y += 34;

        // Role
        setFont(17, '600');
        ctx.fillStyle = C.ORANGE;
        ctx.fillText(job.role, px, y);
        y += 24;

        // Date & Location
        setFont(13, '400', "'JetBrains Mono', monospace");
        ctx.fillStyle = C.DIM;
        ctx.fillText(`${job.date}  ·  ${job.location}`, px, y);
        y += 12;

        // Divider
        y += 14;
        ctx.fillStyle = C.PANEL_BORDER;
        ctx.fillRect(px, y, pw, 1);
        y += 20;

        // Bullet points
        setFont(14, '400');
        ctx.fillStyle = C.LIGHT_GRAY;
        for (const bullet of job.description) {
          const lines = wrapText(bullet, pw - 20, 14);
          for (let i = 0; i < lines.length; i++) {
            if (i === 0) {
              ctx.fillStyle = C.BLUE;
              ctx.fillText('▸', px, y);
              ctx.fillStyle = C.LIGHT_GRAY;
              ctx.fillText(lines[i], px + 18, y);
            } else {
              ctx.fillText(lines[i], px + 18, y);
            }
            y += lineH;
          }
          y += 6; // gap between bullets
        }

        return y + 20 - py;
      }, 500);
    }

    // ====== SECTION 3: SKILLS ======
    sectionMarkers.push({ x: cursorX, name: 'SKILLS' });

    cursorX = addPanel(cursorX, (px, py, pw) => {
      let y = py;

      setFont(28, '700');
      ctx.fillStyle = C.WHITE;
      ctx.fillText('Technical Skills', px, y);
      y += 20;

      // Divider
      y += 12;
      ctx.fillStyle = C.BLUE;
      ctx.fillRect(px, y, 60, 3);
      y += 28;

      for (const [category, skills] of Object.entries(RESUME.skills)) {
        // Category name
        setFont(15, '600');
        ctx.fillStyle = C.ORANGE;
        ctx.fillText(category, px, y);
        y += 26;

        // Skill tags
        setFont(13, '500', "'JetBrains Mono', monospace");
        let tagX = px;
        const tagH = 28;
        const tagPad = 12;
        const tagGap = 8;

        for (const skill of skills) {
          const tw = ctx.measureText(skill).width + tagPad * 2;
          if (tagX + tw > px + pw) {
            tagX = px;
            y += tagH + tagGap;
          }

          // Tag background
          ctx.fillStyle = 'rgba(0, 161, 224, 0.12)';
          roundRect(ctx, tagX, y - 18, tw, tagH, 4);
          ctx.fill();

          // Tag border
          ctx.strokeStyle = 'rgba(0, 161, 224, 0.3)';
          ctx.lineWidth = 1;
          roundRect(ctx, tagX, y - 18, tw, tagH, 4);
          ctx.stroke();

          // Tag text
          ctx.fillStyle = C.LIGHT_GRAY;
          ctx.fillText(skill, tagX + tagPad, y);

          tagX += tw + tagGap;
        }
        y += tagH + 16;
      }

      return y + 20 - py;
    }, 600);

    // ====== SECTION 4: EDUCATION & CERTIFICATIONS ======
    sectionMarkers.push({ x: cursorX, name: 'EDUCATION & CERTS' });

    cursorX = addPanel(cursorX, (px, py, pw) => {
      let y = py;

      // Education heading
      setFont(28, '700');
      ctx.fillStyle = C.WHITE;
      ctx.fillText('Education', px, y);
      y += 20;
      y += 12;
      ctx.fillStyle = C.BLUE;
      ctx.fillRect(px, y, 60, 3);
      y += 28;

      for (const edu of RESUME.education) {
        setFont(20, '600');
        ctx.fillStyle = C.WHITE;
        ctx.fillText(edu.school, px, y);
        y += 28;

        setFont(15, '500');
        ctx.fillStyle = C.ORANGE;
        ctx.fillText(edu.degree, px, y);
        y += 22;

        setFont(13, '400', "'JetBrains Mono', monospace");
        ctx.fillStyle = C.DIM;
        ctx.fillText(edu.date, px, y);
        y += 22;

        setFont(14, '400');
        ctx.fillStyle = C.LIGHT_GRAY;
        const detailLines = wrapText(edu.details, pw, 14);
        for (const line of detailLines) {
          ctx.fillText(line, px, y);
          y += lineH;
        }
        y += 24;
      }

      // Certifications heading
      setFont(22, '700');
      ctx.fillStyle = C.WHITE;
      ctx.fillText('Certifications', px, y);
      y += 32;

      for (const cert of RESUME.certifications) {
        // Cert badge icon
        ctx.fillStyle = C.BLUE;
        ctx.beginPath();
        ctx.arc(px + 10, y - 4, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = C.WHITE;
        setFont(10, '700');
        ctx.textAlign = 'center';
        ctx.fillText('✓', px + 10, y);
        ctx.textAlign = 'left';

        // Cert name
        setFont(14, '500');
        ctx.fillStyle = C.LIGHT_GRAY;
        ctx.fillText(cert.name, px + 28, y);

        // Cert date
        setFont(12, '400', "'JetBrains Mono', monospace");
        ctx.fillStyle = C.DIM;
        ctx.fillText(cert.date, px + pw - 40, y);

        y += 30;
      }

      return y + 20 - py;
    }, 550);

    // ====== SECTION 5: CONTACT ======
    sectionMarkers.push({ x: cursorX, name: 'CONTACT' });

    cursorX = addPanel(cursorX, (px, py, pw) => {
      let y = py;

      setFont(28, '700');
      ctx.fillStyle = C.WHITE;
      ctx.fillText("Let's Connect", px, y);
      y += 20;
      y += 12;
      ctx.fillStyle = C.BLUE;
      ctx.fillRect(px, y, 60, 3);
      y += 36;

      const contactItems = [
        { label: 'Email', value: RESUME.contact.email },
        { label: 'Phone', value: RESUME.contact.phone },
        { label: 'LinkedIn', value: RESUME.contact.linkedin },
        { label: 'GitHub', value: RESUME.contact.github },
        { label: 'Trailhead', value: RESUME.contact.trailhead },
        { label: 'Location', value: RESUME.contact.location },
      ];

      for (const item of contactItems) {
        setFont(12, '500', "'JetBrains Mono', monospace");
        ctx.fillStyle = C.DIM;
        ctx.fillText(item.label.toUpperCase(), px, y);
        y += 20;

        setFont(16, '500');
        ctx.fillStyle = C.WHITE;
        ctx.fillText(item.value, px, y);
        y += 36;
      }

      // Thank you
      y += 10;
      setFont(16, '400');
      ctx.fillStyle = C.ORANGE;
      ctx.fillText('Thanks for exploring my resume!', px, y);

      return y + 40 - py;
    }, 450);

    WORLD_WIDTH = cursorX + W * 0.5;
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
    if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
  });
  window.addEventListener('keyup', (e) => { keys[e.key] = false; });

  // Scroll to move
  canvas.addEventListener('wheel', (e) => {
    camera.x += e.deltaY * 1.5;
    camera.x = Math.max(0, Math.min((WORLD_WIDTH || 5000) - W, camera.x));
    e.preventDefault();
  }, { passive: false });

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
  const player = {
    x: 80,
    y: 0,
    vx: 0,
    vy: 0,
    onGround: false,
    facing: 1,
    frame: 0,
    frameTimer: 0,
    walking: false,
  };

  // ---- AGENTFORCE COMPANION ----
  const companion = {
    x: 40,       // world x (follows player)
    y: 0,        // computed each frame
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

  // ---- DRAW EINSTEIN (Salesforce mascot: chibi with brown blazer, wild white hair, mustache) ----
  function drawEinstein(screenX, screenY, facing, frame, walking) {
    ctx.save();

    // Einstein is wider/stockier than the hitbox — draw centered on PLAYER_W
    const EW = 44; // draw width
    const EH = 56; // draw height
    const offsetX = (PLAYER_W - EW) / 2;

    if (facing === -1) {
      ctx.translate(screenX + PLAYER_W / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-PLAYER_W / 2, 0);
    } else {
      ctx.translate(screenX, 0);
    }

    const bob = walking ? Math.sin(frame * 0.3) * 1.5 : 0;
    // Shift everything so the character sits on the ground
    const baseY = screenY + PLAYER_H - EH;
    const sy = baseY;
    const ox = offsetX;

    // ---- Shadow ----
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(ox + EW / 2, screenY + PLAYER_H + 1, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // ---- Shoes (black, rounded) ----
    const legOff = walking ? Math.sin(frame * 0.4) * 3 : 0;
    ctx.fillStyle = '#2C2C2C';
    // Left shoe
    ctx.fillRect(ox + 8 - legOff, 49 + sy, 11, 5);
    ctx.fillRect(ox + 6 - legOff, 51 + sy, 4, 3);
    // Right shoe
    ctx.fillRect(ox + 25 + legOff, 49 + sy, 11, 5);
    ctx.fillRect(ox + 34 + legOff, 51 + sy, 4, 3);

    // ---- Pants (dark brown) ----
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 10, 42 + sy + bob, 10, 9);
    ctx.fillRect(ox + 24, 42 + sy + bob, 10, 9);

    // ---- Brown blazer/jacket ----
    ctx.fillStyle = '#5D4037';
    // Main jacket body
    ctx.fillRect(ox + 5, 24 + sy + bob, 34, 22);
    // Jacket shoulders (wider)
    ctx.fillRect(ox + 2, 24 + sy + bob, 7, 16);
    ctx.fillRect(ox + 35, 24 + sy + bob, 7, 16);
    // Jacket bottom flare
    ctx.fillRect(ox + 4, 40 + sy + bob, 8, 6);
    ctx.fillRect(ox + 32, 40 + sy + bob, 8, 6);

    // Jacket darker edge/lapels
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(ox + 14, 24 + sy + bob, 2, 18);
    ctx.fillRect(ox + 28, 24 + sy + bob, 2, 18);

    // ---- Navy blue vest/shirt underneath ----
    ctx.fillStyle = '#1A3A5C';
    ctx.fillRect(ox + 14, 24 + sy + bob, 16, 20);

    // ---- Light blue tie ----
    ctx.fillStyle = '#4FC3F7';
    ctx.fillRect(ox + 21, 25 + sy + bob, 3, 14);
    // Tie knot
    ctx.fillRect(ox + 20, 24 + sy + bob, 5, 3);

    // ---- Belt ----
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(ox + 8, 42 + sy + bob, 28, 3);
    // Belt buckle
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(ox + 20, 42 + sy + bob, 5, 3);

    // ---- Arms (brown jacket sleeves) ----
    ctx.fillStyle = '#5D4037';
    // Left arm
    ctx.fillRect(ox + 0, 26 + sy + bob, 6, 16);
    // Right arm (extended outward slightly)
    ctx.fillRect(ox + 38, 26 + sy + bob, 6, 16);
    // Hands (skin tone)
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox + 0, 40 + sy + bob, 6, 4);
    ctx.fillRect(ox + 38, 40 + sy + bob, 6, 4);

    // ---- Atom/orbital glow on right hand ----
    if (!walking) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      // Orbital rings
      ctx.beginPath();
      ctx.ellipse(ox + 43, 38 + sy + bob, 8, 4, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(ox + 43, 38 + sy + bob, 4, 8, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(ox + 43, 38 + sy + bob, 8, 4, Math.PI / 3, 0, Math.PI * 2);
      ctx.stroke();
      // Center dot
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(ox + 43, 38 + sy + bob, 2, 0, Math.PI * 2);
      ctx.fill();
      // Glow
      ctx.fillStyle = 'rgba(79, 195, 247, 0.15)';
      ctx.beginPath();
      ctx.arc(ox + 43, 38 + sy + bob, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    // ---- Head / Face (large, round — chibi proportions) ----
    ctx.fillStyle = '#FFCC80';
    ctx.fillRect(ox + 8, 6 + sy + bob, 28, 20);
    // Cheeks slightly wider
    ctx.fillRect(ox + 6, 10 + sy + bob, 32, 14);

    // ---- Eyes (dark, round, simple) ----
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(ox + 14, 14 + sy + bob, 4, 4);
    ctx.fillRect(ox + 26, 14 + sy + bob, 4, 4);
    // Eye shine
    ctx.fillStyle = '#FFF';
    ctx.fillRect(ox + 15, 14 + sy + bob, 2, 2);
    ctx.fillRect(ox + 27, 14 + sy + bob, 2, 2);

    // ---- Bushy white mustache ----
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(ox + 10, 20 + sy + bob, 24, 5);
    ctx.fillRect(ox + 8, 21 + sy + bob, 28, 3);
    // Mustache droop sides
    ctx.fillRect(ox + 7, 22 + sy + bob, 4, 3);
    ctx.fillRect(ox + 33, 22 + sy + bob, 4, 3);

    // ---- Small white beard/goatee ----
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(ox + 16, 25 + sy + bob, 12, 3);
    ctx.fillRect(ox + 18, 27 + sy + bob, 8, 2);

    // ---- MASSIVE wild white hair ----
    ctx.fillStyle = '#F5F5F5';
    // Main hair mass (big poofy top)
    ctx.fillRect(ox + 4, -6 + sy + bob, 36, 16);
    ctx.fillRect(ox + 2, -4 + sy + bob, 40, 12);
    ctx.fillRect(ox + 6, -10 + sy + bob, 32, 8);
    // Extra volume top
    ctx.fillRect(ox + 10, -14 + sy + bob, 24, 6);
    ctx.fillRect(ox + 14, -16 + sy + bob, 16, 4);
    // Wild side tufts (left)
    ctx.fillRect(ox - 2, -2 + sy + bob, 8, 10);
    ctx.fillRect(ox - 4, 0 + sy + bob, 6, 10);
    ctx.fillRect(ox - 6, 2 + sy + bob, 5, 8);
    // Wild side tufts (right)
    ctx.fillRect(ox + 38, -2 + sy + bob, 8, 10);
    ctx.fillRect(ox + 42, 0 + sy + bob, 6, 10);
    ctx.fillRect(ox + 45, 2 + sy + bob, 5, 8);
    // Wispy top bits
    ctx.fillRect(ox + 8, -18 + sy + bob, 4, 6);
    ctx.fillRect(ox + 18, -20 + sy + bob, 6, 6);
    ctx.fillRect(ox + 30, -18 + sy + bob, 5, 6);

    // Hair shadow/depth
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(ox + 4, 2 + sy + bob, 6, 8);
    ctx.fillRect(ox + 34, 2 + sy + bob, 6, 8);
    ctx.fillRect(ox + 8, -8 + sy + bob, 28, 3);

    // ---- Side hair framing face ----
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(ox + 4, 8 + sy + bob, 6, 12);
    ctx.fillRect(ox + 34, 8 + sy + bob, 6, 12);

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

  // ---- RENDER PANELS ----
  function renderPanels() {
    for (const panel of panels) {
      const screenX = panel.x - camera.x;
      // Skip off-screen panels
      if (screenX + panel.w < -100 || screenX > W + 100) continue;

      // Panel vertical position: centered above ground, with some margin
      const panelTopY = GROUND_Y - panel.h - 40;

      // Panel background
      ctx.fillStyle = C.PANEL_BG;
      roundRect(ctx, screenX - 30, panelTopY - 30, panel.w + 60, panel.h + 50, 12);
      ctx.fill();

      // Panel border
      ctx.strokeStyle = C.PANEL_BORDER;
      ctx.lineWidth = 1;
      roundRect(ctx, screenX - 30, panelTopY - 30, panel.w + 60, panel.h + 50, 12);
      ctx.stroke();

      // Subtle glow at top of panel
      const glowGrad = ctx.createLinearGradient(0, panelTopY - 30, 0, panelTopY + 20);
      glowGrad.addColorStop(0, 'rgba(0, 161, 224, 0.08)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      roundRect(ctx, screenX - 30, panelTopY - 30, panel.w + 60, 50, 12);
      ctx.fill();

      // Render content
      const actualH = panel.contentFn(screenX, panelTopY, panel.w);
      panel.h = Math.max(panel.h, actualH); // Update height if content is taller
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

  // ---- BACK TO TERMINAL ----
  const backBtn = document.getElementById('back-to-terminal');
  let backBtnShown = false;

  function checkEndOfWorld() {
    if (!backBtnShown && player.x >= (WORLD_WIDTH || 5000) - W - 100) {
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
    const left = keys['ArrowLeft'] || keys['a'] || keys['A'];
    const right = keys['ArrowRight'] || keys['d'] || keys['D'];

    // Movement
    player.vx = 0;
    player.walking = false;
    if (left) { player.vx = -MOVE_SPEED; player.facing = -1; player.walking = true; }
    if (right) { player.vx = MOVE_SPEED; player.facing = 1; player.walking = true; }

    // Apply
    player.x += player.vx;
    player.x = Math.max(0, Math.min((WORLD_WIDTH || 5000) - PLAYER_W, player.x));
    player.y = GROUND_Y - PLAYER_H;

    // Camera follows player smoothly
    const targetX = player.x - W * 0.25;
    camera.x += (targetX - camera.x) * 0.07;
    camera.x = Math.max(0, Math.min((WORLD_WIDTH || 5000) - W, camera.x));

    // Companion follows player (stays slightly behind and to the side)
    const targetCompX = player.x - 50;
    companion.x += (targetCompX - companion.x) * 0.04;
    companion.y = GROUND_Y - COMP_H;
    companion.facing = player.facing;

    // Animation
    if (player.walking) {
      player.frameTimer++;
      if (player.frameTimer > 5) {
        player.frame++;
        player.frameTimer = 0;
      }
    } else {
      player.frame = 0;
      player.frameTimer = 0;
    }
  }

  function render() {
    ctx.clearRect(0, 0, W, H);

    drawBackground();
    renderSectionMarkers();
    drawGround();
    renderPanels();

    // Agentforce companion
    const compScreenX = companion.x - camera.x;
    const compScreenY = companion.y;
    drawAgentforce(compScreenX, compScreenY, companion.facing, lastTime);

    // Player
    const playerScreenX = player.x - camera.x;
    const playerScreenY = player.y;
    drawEinstein(playerScreenX, playerScreenY, player.facing, player.frame, player.walking);

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
