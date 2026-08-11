// SafeKids Parent Portal - Client Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  renderChannels();
  setupFilterListeners();
  setupSearch();
  setupCopyButtons();
});

// Comprehensive Database of Approved Channels categorized by exact Age Bands
const channelsData = [
  // --- TODDLERS (AGES 2-3) ---
  {
    name: "Puffin Rock",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Described as 'Bob Ross level soothing' with gentle narration by Chris O'Dowd. Slow pacing, watercolor animation, and nature sounds create an extremely calm viewing experience. Perfect for developing attention without overstimulation.",
    checkmarks: ["Slow, deliberate pacing", "Nature-focused content", "Gentle voice narration"],
    startWith: ["Oona and Baba", "Tidal Pool Adventure", "Stormy Weather"],
    link: "https://www.youtube.com/c/PuffinRock"
  },
  {
    name: "Super Simple Songs",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Deliberate pacing with clear language focus. Songs are specifically designed for language development with simple, repetitive patterns.",
    checkmarks: ["Clear pronunciation", "Educational focus", "Simple animations"],
    startWith: ["Colors Song", "Animal Sounds", "Clean Up Song"],
    link: "https://www.youtube.com/channel/UCLsooMJoIpl_7ux2jvdPB-Q"
  },
  {
    name: "Little Bear",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Classic storytelling with very slow pacing and emotional literacy focus. Promotes imagination and calm viewing habits.",
    checkmarks: ["Extremely slow pacing", "Daily routine focus", "Imaginative play"],
    startWith: [],
    link: "https://www.youtube.com/channel/UCncFzSeWqySvOXEbQoEJsZg"
  },
  {
    name: "Alphablocks",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Short, energetic clips (under 5 minutes) with playful, whimsical letter characters. Structured for early reading readiness.",
    checkmarks: ["Reading readiness", "Clear pronunciation", "Educational foundation"],
    startWith: [],
    link: "https://www.youtube.com/c/officialalphablocks"
  },
  {
    name: "Numberblocks",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Teaches math concepts through animated number characters. Short 5-minute episodes with clear visuals and counting songs.",
    checkmarks: ["Concept-driven pacing", "Clear visuals", "Number recognition"],
    startWith: [],
    link: "https://www.youtube.com/channel/UCPlwvN0w4qFSP1FllALB92w"
  },
  {
    name: "Sarah & Duck",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Simple animation with gentle narration. Focuses on problem-solving, friendship, and everyday adventures.",
    checkmarks: ["Simple animation", "Gentle narration", "Everyday adventures"],
    startWith: [],
    link: "https://www.youtube.com/channel/UC3OUMU3s7Oy6Ta0wnpZFBWw"
  },
  {
    name: "Ms. Rachel - Songs for Littles",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Speech development focus with interactive approach. Expert-designed content for language acquisition.",
    checkmarks: ["Speech development focus", "Interactive approach", "Expert design"],
    startWith: [],
    link: "https://www.youtube.com/@msrachel"
  },
  {
    name: "Hey Duggee",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Simple animation with clear narration. Activity-based learning focusing on teamwork and achievement.",
    checkmarks: ["Simple animation", "Clear narration", "Activity-based learning"],
    startWith: [],
    link: "https://www.youtube.com/channel/UCj_mFUb-47d9QNiJ5556LjQ"
  },
  {
    name: "Bluey",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Story-driven pacing with natural dialogue. Focuses on imaginative play, family relationships, and play-based learning.",
    checkmarks: ["Story-driven pacing", "Natural dialogue", "Play-based learning"],
    startWith: [],
    link: "https://www.youtube.com/channel/UCVzLLZkDuFGAE2BGdBuBNBg"
  },

  // --- PRESCHOOLERS (AGES 4-5) ---
  {
    name: "Puffin Rock",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Described as 'Bob Ross level soothing' with gentle narration by Chris O'Dowd. Focuses on nature exploration and family relationships.",
    checkmarks: ["Gentle narration", "Natural sounds", "Watercolor animation"],
    startWith: [],
    link: "https://www.youtube.com/c/PuffinRock"
  },
  {
    name: "Alphablocks",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Each cube-shaped letter has a unique personality matching its sound, creating engaging phonics lessons.",
    checkmarks: ["Clear pronunciation", "Visual phonics concepts", "Reading foundations"],
    startWith: [],
    link: "https://www.youtube.com/c/officialalphablocks"
  },
  {
    name: "Numberblocks",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Teaches math concepts through animated number characters with bright colors but clear focus on mathematical concepts appropriate for older preschoolers.",
    checkmarks: ["Visual math learning", "Clear explanations", "Number recognition"],
    startWith: ["Meet the Numberblocks", "Number Magic", "Counting Songs"],
    link: "https://www.youtube.com/channel/UCPlwvN0w4qFSP1FllALB92w"
  },
  {
    name: "Cosmic Kids Yoga",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Combines movement with mindfulness through story-based yoga. Promotes body awareness and self-regulation skills.",
    checkmarks: ["Physical activity", "Mindfulness practice", "Self-regulation"],
    startWith: ["Tiny the T-Rex", "Cosmic Kids Peace Out", "Popcorn the Dolphin"],
    link: "https://www.youtube.com/channel/UC5uIZ2KOZZeQDQo_Gsi_qbQ"
  },
  {
    name: "Super Simple Songs",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Deliberate pacing with clear language focus. Songs specifically designed with simple, repetitive patterns and slow tempo.",
    checkmarks: ["Language development", "Clear vocals", "Educational songs"],
    startWith: [],
    link: "https://www.youtube.com/channel/UCLsooMJoIpl_7ux2jvdPB-Q"
  },
  {
    name: "Sesame Street",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "4-5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Research-backed educational content with social skills focus. Select quieter segments for lower stimulus viewing.",
    checkmarks: ["Educational research base", "Diverse representation", "Social-emotional learning"],
    startWith: [],
    link: "https://www.youtube.com/sesamestreet"
  },
  {
    name: "StoryBots",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Question-based learning that encourages curiosity. Varied animation styles keep interest while teaching information literacy.",
    checkmarks: ["Encourages questions", "Varied topics", "Information literacy"],
    startWith: [],
    link: "https://www.youtube.com/playlist?list=PLPphPHIzdSQPhHIEDhqwg0qh5p-FgwxTH"
  },
  {
    name: "PBS Kids",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "4-5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Wide variety of educational shows with varying pacing. Most have faster editing than dedicated low-stimulus content but still have an educational focus.",
    checkmarks: ["Research-backed content", "Diverse representation", "Social skills focus"],
    startWith: [],
    link: "https://www.youtube.com/pbskids"
  },

  // --- EARLY ELEMENTARY (AGES 6-7) ---
  {
    name: "Art for Kids Hub",
    age: "early-elementary",
    ageLabel: "Early Elementary (Ages 6-7)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Step-by-step art instruction with calm narration. Develops creativity and fine motor skills through patient guidance.",
    checkmarks: ["Patient instruction", "Creativity development", "Clear demonstrations"],
    startWith: ["How To Draw Animals", "Art Projects for Kids", "Season-themed drawing lessons"],
    link: "https://www.youtube.com/user/ArtforKidsHub"
  },
  {
    name: "Mystery Doug",
    age: "early-elementary",
    ageLabel: "Early Elementary (Ages 6-7)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Question-based science learning with appropriate pacing. Encourages curiosity through clear explanations of everyday phenomena.",
    checkmarks: ["Scientific thinking", "Clear explanations", "Moderate pacing"],
    startWith: ["How Does a Telescope Work?", "Why is Mars Red?", "What is the Biggest Spider in the World?"],
    link: "https://www.youtube.com/channel/UCPRCRM3JKm3sw55lB_427qg"
  },
  {
    name: "SciShow Kids",
    age: "early-elementary",
    ageLabel: "Early Elementary (Ages 6-7)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Science concepts explained at appropriate level with balanced pacing. Aligns with educational standards while keeping engagement.",
    checkmarks: ["Standards-aligned", "Kid-friendly explanations", "Scientific literacy"],
    startWith: ["Why Do We Get Sick?", "The Coolest Machine Ever!", "How Do Plants Know Which Way Is Up?"],
    link: "https://www.youtube.com/channel/UCRFIPG2u1DxKLNuE3y2SjHA"
  },
  {
    name: "PBS Kids",
    age: "early-elementary",
    ageLabel: "Early Elementary (Ages 6-7)",
    stimulusScore: "4-5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Character-based learning with research backing. Balanced pacing with focus on educational outcomes.",
    checkmarks: ["Educational research", "Character learning", "Balanced content"],
    startWith: [],
    link: "https://www.youtube.com/pbskids"
  },
  {
    name: "TED-Ed",
    age: "early-elementary",
    ageLabel: "Early Elementary (Ages 6-7)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Animated explanations of diverse topics with thoughtful pacing. Encourages curiosity about the world.",
    checkmarks: ["Well-paced animations", "Diverse topics", "Critical thinking"],
    startWith: [],
    link: "https://www.youtube.com/TEDEducation"
  },

  // --- MIDDLE ELEMENTARY (AGES 8-9) ---
  {
    name: "National Geographic Kids",
    age: "middle-elementary",
    ageLabel: "Middle Elementary (Ages 8-9)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "High-quality nature footage with environmental focus. Develops global awareness through balanced pacing.",
    checkmarks: ["Quality footage", "Environmental awareness", "Balanced pacing"],
    startWith: ["Amazing Animals: Gorillas", "Exploring Habitats", "Saving Endangered Species"],
    link: "https://www.youtube.com/channel/UCXVCgDuD_QCkI7gTKU7-tpg"
  },
  {
    name: "Crash Course Kids",
    age: "middle-elementary",
    ageLabel: "Middle Elementary (Ages 8-9)",
    stimulusScore: "6/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Systematic science education aligned with standards. Builds knowledge progressively with moderate pacing.",
    checkmarks: ["Standards-aligned", "Systematic learning", "Critical thinking"],
    startWith: [],
    link: "https://www.youtube.com/crashcoursekids"
  },
  {
    name: "Art for Kids Hub",
    age: "middle-elementary",
    ageLabel: "Middle Elementary (Ages 8-9)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Advanced drawing techniques with patient instruction. Develops focus and artistic skills through calm guidance.",
    checkmarks: ["Advanced techniques", "Patience development", "Step-by-step guidance"],
    startWith: ["How To Draw A Tiger", "How To Make Origami Animals", "Drawing Landscapes Tutorial"],
    link: "https://www.youtube.com/user/ArtforKidsHub"
  },
  {
    name: "Kids Learning Tube",
    age: "middle-elementary",
    ageLabel: "Middle Elementary (Ages 8-9)",
    stimulusScore: "6/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Educational songs that aid memory through music. Covers varied topics with global awareness focus.",
    checkmarks: ["Memory through music", "Varied topics", "Global awareness"],
    startWith: [],
    link: "https://www.youtube.com/channel/UC7EFWpvc1wYuUwrtZ_BLi9A"
  },
  {
    name: "Mystery Doug",
    age: "middle-elementary",
    ageLabel: "Middle Elementary (Ages 8-9)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Question-based learning with controlled transitions. Encourages critical thinking through scientific inquiry.",
    checkmarks: ["Question-based learning", "Controlled transitions", "Critical thinking"],
    startWith: [],
    link: "https://www.youtube.com/mysterydoug"
  },

  // --- PRE-TEENS (AGES 10-12) ---
  {
    name: "Veritasium",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Deep scientific explanations with thoughtful pacing. Evidence-based content that encourages critical thinking.",
    checkmarks: ["Deep explanations", "Evidence-based", "Thoughtful pacing"],
    startWith: ["The Most Radioactive Places on Earth", "Why Are Mosquitoes Attracted To You?", "World's Roundest Object"],
    link: "https://www.youtube.com/@veritasium"
  },
  {
    name: "Smarter Every Day",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Scientific methodology through real experiments. Thoughtful explanations that model problem-solving approaches.",
    checkmarks: ["Scientific method", "Problem-solving", "Real experiments"],
    startWith: ["How Do Bees Make Honey?", "How Does a Telescope Work?", "The Backwards Brain Bicycle"],
    link: "https://www.youtube.com/channel/UC6107grRI4m0o2-emgoDnAA"
  },
  {
    name: "Physics Girl",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Female STEM representation with clean graphics. Makes physics accessible through clear explanations.",
    checkmarks: ["STEM representation", "Clear graphics", "Scientific thinking"],
    startWith: [],
    link: "https://www.youtube.com/c/physicsgirl"
  },
  {
    name: "Mark Rober",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "7/10",
    stimulusClass: "stimulus-high",
    whyThisChannel: "Engineering projects with design thinking focus. Real-world applications that inspire problem-solving.",
    checkmarks: ["Engineering focus", "Design thinking", "Real applications"],
    startWith: [],
    link: "https://www.youtube.com/markrober"
  },
  {
    name: "TED-Ed",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Complex topics explained through animation. Develops critical thinking and global awareness.",
    checkmarks: ["Complex topics", "Well-paced animation", "Global perspectives"],
    startWith: ["How One Scientist Took On The Chemical Industry", "Why Do Cities Need Trees?", "What Would Happen If You Didn't Sleep?"],
    link: "https://www.youtube.com/TEDEducation"
  },
  {
    name: "SciShow Kids",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "6/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Scientific literacy with moderate pacing. Clear explanations aligned with educational standards.",
    checkmarks: ["Scientific literacy", "Moderate pacing", "Clear explanations"],
    startWith: [],
    link: "https://www.youtube.com/scishowkids"
  },
  {
    name: "Mystery Science",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Question-based learning with clear explanations. Promotes scientific inquiry with thoughtful pacing.",
    checkmarks: ["Question-based learning", "Clear explanations", "Scientific inquiry"],
    startWith: [],
    link: "https://www.youtube.com/channel/UCPRCRM3JKm3sw55lB_427qg"
  }
];

let currentFilter = 'all';
let currentSearch = '';

function renderChannels() {
  const container = document.getElementById('channel-grid');
  if (!container) return;

  const filtered = channelsData.filter(ch => {
    const matchesFilter = currentFilter === 'all' || ch.age === currentFilter;
    const matchesSearch = ch.name.toLowerCase().includes(currentSearch) ||
                          ch.whyThisChannel.toLowerCase().includes(currentSearch) ||
                          ch.ageLabel.toLowerCase().includes(currentSearch) ||
                          ch.checkmarks.some(c => c.toLowerCase().includes(currentSearch));
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; font-weight: 600;">No channels match your search criteria.</p>
        <p style="font-size: 0.9rem;">Try adjusting your age filter or search term.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ch => `
    <div class="card channel-card">
      <div>
        <div class="channel-header">
          <span class="channel-name">${ch.name}</span>
          <span class="stimulus-tag ${ch.stimulusClass}">Stimulus: ${ch.stimulusScore}</span>
        </div>
        
        <div style="margin-bottom:0.75rem;">
          <span class="tag-badge" style="background:#e0f2fe; color:#0369a1; font-weight:600;">${ch.ageLabel}</span>
        </div>

        <p class="channel-desc"><strong>Why This Channel:</strong> ${ch.whyThisChannel}</p>
        
        ${ch.checkmarks && ch.checkmarks.length > 0 ? `
          <ul style="list-style:none; margin: 0.75rem 0; font-size:0.85rem; color:var(--text-muted);">
            ${ch.checkmarks.map(cm => `<li style="display:flex; align-items:center; gap:0.35rem; margin-bottom:0.25rem;"><span style="color:var(--success); font-weight:700;">✓</span> ${cm}</li>`).join('')}
          </ul>
        ` : ''}

        ${ch.startWith && ch.startWith.length > 0 ? `
          <div style="margin-top:0.75rem; padding:0.6rem; background:var(--bg-alt); border-radius:var(--radius-sm);">
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">🎬 Start With:</div>
            <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">
              ${ch.startWith.map(sw => `<span class="tag-badge" style="background:#ffffff; border:1px solid var(--border-color); color:var(--text-main);">${sw}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <a href="${ch.link}" target="_blank" rel="noopener" class="btn btn-outline" style="margin-top:1rem; width:100%; justify-content:center;">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        View Channel
      </a>
    </div>
  `).join('');
}

function setupFilterListeners() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter');
      renderChannels();
    });
  });
}

function setupSearch() {
  const input = document.getElementById('channel-search');
  if (!input) return;
  input.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    renderChannels();
  });
}

function setupCopyButtons() {
  const btns = document.querySelectorAll('.copy-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-target');
      const codeEl = document.getElementById(codeId);
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.innerText).then(() => {
          const orig = btn.innerText;
          btn.innerText = 'Copied!';
          setTimeout(() => btn.innerText = orig, 2000);
        });
      }
    });
  });
}
