// SafeKids Parent Portal - Client Interactive Logic (XSS-Safe DOM Architecture)

document.addEventListener('DOMContentLoaded', () => {
  restorePersistedDirectoryFilters();
  setupDarkModeToggle();
  setupLanguageSwitcher();
  setupWorkspaceTabs();
  setupDailyBlueprintBuilder();
  setupGlobalAgeBar();
  setupClinicalDrawerToggleAll();
  renderChannels();
  setupChannelFilterListeners();
  setupChannelSearch();
  setupWhitelistExport();

  renderGames();
  setupGameFilterListeners();
  setupGameSearch();
  setupGamesExport();

  renderFoods();
  setupFoodFilterListeners();
  setupFoodSearch();
  setupFoodsExport();

  renderListenItems();
  setupListenFilterListeners();
  setupListenSearch();
  setupListenExport();

  setupSemCalculator();
  setupFoodCalculator();
  setupCopyButtons();
  setupInfographicExperience();
  setupExpertScriptFilters();
  setupExpertCopyButtons();
  setupChirpReadAloud();
  if (currentLanguage !== 'en') {
    applyPortalLanguage(currentLanguage, { persist: false });
  }
});

// Comprehensive Database of 28 Unique Curated Low-Stimulus Channels (Deduplicated Multi-Age Bands)
const channelsData = [
  // --- ULTRA-LOW STIMULUS (1/10 - 2/10): TODDLERS & PRESCHOOL ---
  {
    name: "Puffin Rock",
    researchAnchor: "Lillard & Peterson (2011) Low-Pacing Baseline; CPM < 3",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    age: ["toddler", "preschool"],
    ageLabel: "Toddlers (2–3) & Preschool (4–5)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Described as 'Bob Ross level soothing' with gentle narration by Chris O'Dowd. Slow pacing, watercolor animation, and coastal nature sounds create an ultra-calm viewing experience that protects developing attention spans.",
    checkmarks: ["Slow, deliberate pacing (>15s scenes)", "Biophilic watercolor art & nature audio", "Gentle conversational narration"],
    startWith: ["Oona and Baba", "Tidal Pool Adventure", "Stormy Weather"],
    link: "https://www.youtube.com/c/PuffinRock"
  },
  {
    name: "Tumble Leaf",
    researchAnchor: "Hirsh-Pasek et al. (2015) Tactile Physical Inquiry & Constructivist Play",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    age: ["toddler", "preschool"],
    ageLabel: "Toddlers (2–3) & Preschool (4–5)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Multi-Emmy-winning stop-motion series following Fig the Fox as he discovers physical objects washed ashore in the 'Finding Place' and figures out how they work through calm, hands-on scientific play.",
    checkmarks: ["Handcrafted stop-motion textures", "Teaches physical cause-and-effect inquiry", "Tranquil acoustic soundtrack"],
    startWith: ["Fig Finds a Magnifying Glass", "The Floating Leaf Boat", "Shadow Puppet Play"],
    link: "https://www.youtube.com/results?search_query=Tumble+Leaf+Official+Prime+Video+Kids"
  },
  {
    name: "Frog and Toad",
    researchAnchor: "Kostyrka-Allchorne et al. (2017) Slow Conversational Cadence & Prosocial Empathy",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Ages 2–7 (Toddler to Early Elementary)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Hand-drawn storybook adaptation of Arnold Lobel's classic books. Celebrates quiet friendship, patience, seasonal nature routines, and emotional kindness without villains, shouting, or rapid camera cuts.",
    checkmarks: ["Storybook watercolor aesthetic", "Models patience and emotional loyalty", "Acoustic folk instrumentation"],
    startWith: ["Spring", "The Garden", "Cookies (Willpower & Patience)"],
    link: "https://www.youtube.com/results?search_query=Frog+and+Toad+Apple+TV+Official"
  },
  {
    name: "Little Bear",
    researchAnchor: "Kostyrka-Allchorne et al. (2017) Low-Stimulus Narrative Framing; CPM < 4",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    age: ["toddler", "preschool"],
    ageLabel: "Toddlers (2–3) & Preschool (4–5)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Classic Maurice Sendak / Else Holmelund Minarik storytelling with ultra-slow pacing, classical woodwind orchestration, and warm family literacy. Promotes outdoor imaginative play.",
    checkmarks: ["Extremely slow, unhurried camera framing", "Classical Schubert/Bach chamber music", "Warm family & nature routines"],
    startWith: ["Father Bear Comes Home", "Little Bear's Wish", "Grandpa's Attic"],
    link: "https://www.youtube.com/channel/UCncFzSeWqySvOXEbQoEJsZg"
  },
  {
    name: "Trash Truck",
    researchAnchor: "Lillard & Peterson (2011) Naturalistic Pacing & Unhurried Dialogue",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    age: ["toddler", "preschool"],
    ageLabel: "Toddlers (2–3) & Preschool (4–5)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Created by Max Keane, featuring natural child voice acting, sunlit backyard framing, and gentle everyday adventures between 6-year-old Hank and his best friend, a giant honking Trash Truck.",
    checkmarks: ["Authentic, unhurried child dialogue", "Zero flashing effects or frantic music", "Grounded in imaginative backyard play"],
    startWith: ["Sleepover", "Hide and Seek", "Olive Surfs"],
    link: "https://www.youtube.com/results?search_query=Trash+Truck+Netflix+Jr+Official"
  },
  {
    name: "Stillwater",
    researchAnchor: "Diamond (2013) Mindfulness, Perspective-Taking & Emotional Regulation",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    age: ["preschool", "early-elementary"],
    ageLabel: "Preschool (4–5) & Early Elementary (6–7)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Peabody Award-winning series based on Jon J Muth's Zen Shorts books. A wise panda neighbor named Stillwater helps three siblings navigate frustration, disappointment, and empathy through peaceful parables.",
    checkmarks: ["Peabody Award winner for mindfulness", "Teaches deep breathing & perspective shifts", "Serene ink-wash & watercolor transitions"],
    startWith: ["The Impossible Goal", "Theolin's Rain", "One Drop of Water"],
    link: "https://www.youtube.com/results?search_query=Stillwater+Apple+TV+Official+Clips"
  },
  {
    name: "Sarah & Duck",
    researchAnchor: "Lillard & Peterson (2011) Deliberate Story Pacing & Everyday Routines",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)",
    age: ["toddler", "preschool"],
    ageLabel: "Toddlers (2–3) & Preschool (4–5)",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "BAFTA-winning British animation with ample negative space, gentle conversational narration by Roger Allam, and whimsical everyday problem-solving.",
    checkmarks: ["Minimalist uncluttered visual backgrounds", "Gentle, interactive narrator dialogue", "Everyday curiosity & friendship"],
    startWith: ["Lots of Shallots", "Bouncing Ball", "Ribbon Sisters"],
    link: "https://www.youtube.com/channel/UC3OUMU3s7Oy6Ta0wnpZFBWw"
  },
  {
    name: "Daniel Tiger's Neighborhood",
    researchAnchor: "Fred Rogers Center (2016) Emotional Co-Regulation & Coping Songs",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)",
    age: ["toddler", "preschool"],
    ageLabel: "Toddlers (2–3) & Preschool (4–5)",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Direct successor to Mister Rogers' Neighborhood. Uses short, memorable musical strategies ('When you feel so mad that you want to roar, take a deep breath and count to four') proven in clinical studies to build toddler emotional regulation.",
    checkmarks: ["Singable emotional coping strategies", "Prepares toddlers for real-world transitions", "Backed by Fred Rogers Center research"],
    startWith: ["Calm Down & Count to Four", "Grown-Ups Come Back", "Sharing at the Park"],
    link: "https://www.youtube.com/@DanielTigersNeighborhood"
  },
  {
    name: "Super Simple Songs",
    researchAnchor: "Anderson & Pempek (2005) Toddler Linguistic Cadence & Clear Articulation",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)",
    age: ["toddler", "preschool"],
    ageLabel: "Toddlers (2–3) & Preschool (4–5)",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Created by ESL teachers specifically to counter overly fast children's music. Features deliberate, slowed-down vocal tempos, uncluttered 2D puppetry/animation, and gesture-based vocabulary building.",
    checkmarks: ["Slowed-down vocal articulation for speech", "Uncluttered 2D backgrounds", "Predictable, calming musical cadence"],
    startWith: ["Twinkle Twinkle Little Star", "Down By The Bay", "Clean Up Song"],
    link: "https://www.youtube.com/channel/UCLsooMJoIpl_7ux2jvdPB-Q"
  },
  {
    name: "Ms. Rachel - Songs for Littles",
    researchAnchor: "Kuhl et al. (2003) Social Gating & Parentese in Infant Speech Learning",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)",
    age: ["toddler"],
    ageLabel: "Toddlers (Ages 2–3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Created by a music educator with a Master's in Early Childhood Development. Uses close-up mouth framing, ASL baby sign language, 'parentese' pitch contours, and expectant pauses to model real speech therapy techniques.",
    checkmarks: ["Speech-language pathology techniques", "ASL sign language & lip-reading focus", "Best when co-viewed with parent interaction"],
    startWith: ["First Words & Speech Practice", "Baby Sign Language Basics", "Phonics & Gentle Rhymes"],
    link: "https://www.youtube.com/@msrachel"
  },
  {
    name: "Bluey",
    researchAnchor: "Singer & Singer (2005) Sociodramatic Play & Emotional Co-Regulation",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Ages 2–7 (Toddler to Early Elementary)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Acclaimed Australian series centering on 7-minute episodes of imaginative family roleplay, emotional resilience, and classical musical arrangements. Select tranquil episodes ('Rain', 'Sleepytime') for wind-down viewing.",
    checkmarks: ["Models rich offline sociodramatic play", "Classical orchestral scores (Holst, Bach)", "High emotional intelligence & family warmth"],
    startWith: ["Rain (Dialogue-Free Tranquil Episode)", "Sleepytime (Holst's Jupiter)", "The Creek"],
    link: "https://www.youtube.com/channel/UCVzLLZkDuFGAE2BGdBuBNBg"
  },
  {
    name: "Alphablocks",
    researchAnchor: "National Reading Panel (2000) Synthetic Phonics & Grapheme Mapping",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Ages 2–7 (Toddler to Early Elementary)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "BBC CBeebies educational series where each letter block physically sounds out its phoneme when holding hands with adjacent letters, visually demonstrating synthetic phonics blending and decoding.",
    checkmarks: ["Direct grapheme-to-phoneme blending", "Short 5-minute focused lessons", "Aligned with UK/US phonics curricula"],
    startWith: ["Meet the Alphablocks", "C-A-T & H-A-T Word Magic", "Short Vowel Blending"],
    link: "https://www.youtube.com/c/officialalphablocks"
  },
  {
    name: "Numberblocks",
    researchAnchor: "NCETM (UK) & Singapore Math Number Bond Visual Framework",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Ages 2–7 (Toddler to Early Elementary)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "BAFTA-winning CBeebies series built with the UK National Centre for Excellence in the Teaching of Mathematics. Characters are made of countable blocks that physically split and combine to show number bonds, multiplication, and squares.",
    checkmarks: ["Concrete-Pictorial-Abstract math mastery", "Zero arbitrary visual clutter", "Builds deep subitizing & number sense"],
    startWith: ["Meet Numberblock One", "Number Bonds to 10", "Square Numbers Club"],
    link: "https://www.youtube.com/channel/UCPlwvN0w4qFSP1FllALB92w"
  },
  {
    name: "Hey Duggee",
    researchAnchor: "Bandura (1977) Social Modeling & Cooperative Activity Framing",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)",
    age: ["toddler", "preschool"],
    ageLabel: "Toddlers (2–3) & Preschool (4–5)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Flat vector animation against clean backgrounds with calm British narration by Alexander Armstrong. Encourages real-world offline activities (drawing, birdwatching, gardening) to earn Squirrel Club badges.",
    checkmarks: ["Clean vector design with zero strobing", "Models cooperative teamwork", "Inspires offline hands-on crafts"],
    startWith: ["The Drawing Badge", "The Birdwatching Badge", "The Tree Badge"],
    link: "https://www.youtube.com/channel/UCj_mFUb-47d9QNiJ5556LjQ"
  },
  {
    name: "Cosmic Kids Yoga",
    researchAnchor: "Diamond (2013) Embodied Self-Regulation & Motor Mindfulness",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)",
    age: ["preschool", "early-elementary"],
    ageLabel: "Preschool (4–5) & Early Elementary (6–7)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Transforms passive screen time into full-body proprioceptive movement, balance, and guided 'Peace Out' relaxation stories led by Jaime Amor.",
    checkmarks: ["Converts screen time into physical yoga", "Guided breathing & body-scan relaxation", "Builds gross motor balance & focus"],
    startWith: ["Cosmic Kids Peace Out (Guided Relaxation)", "Tiny the T-Rex Yoga", "Popcorn the Dolphin"],
    link: "https://www.youtube.com/channel/UC5uIZ2KOZZeQDQo_Gsi_qbQ"
  },
  {
    name: "Art for Kids Hub",
    researchAnchor: "Vygotsky (1978) Zone of Proximal Development in Fine Motor Drawing",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)",
    age: ["early-elementary", "middle-elementary"],
    ageLabel: "Early & Middle Elementary (Ages 6–9)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "A father draws side-by-side in real time with his children using a static overhead camera. Eyes stay 80% on physical paper and markers rather than the screen, celebrating imperfection and fine-motor focus.",
    checkmarks: ["80% eyes-on-paper physical activity", "Single static overhead camera (0 cuts)", "Models growth mindset & patience"],
    startWith: ["How To Draw A Realistic Owl", "How To Fold Origami Animals", "Watercolor Landscape for Kids"],
    link: "https://www.youtube.com/user/ArtforKidsHub"
  },
  {
    name: "3Blue1Brown / Numberphile",
    researchAnchor: "Papert (1980) & Lockhart (2009) Visual Geometric Intuition in Mathematics",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 1/2 • Reward: 0/2 (Total: 3/10)",
    age: ["preteen"],
    ageLabel: "Pre-Teens (Ages 10–12) & Teens",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Grant Sanderson's custom Python animation engine (Manim) and Brady Haran's brown-paper mathematician interviews present geometry, prime numbers, and topology at a meditative, deeply intellectual pace.",
    checkmarks: ["Calm, dark-mode geometric visualizations", "Acoustic cello & piano background score", "Cultivates deep mathematical wonder"],
    startWith: ["Why Do Prime Numbers Make These Spirals?", "The Monty Hall Problem Explained", "But What Is Pi Visually?"],
    link: "https://www.youtube.com/@3blue1brown"
  },

  // --- MODERATE STIMULUS (4/10 - 6/10): PRESCHOOL TO PRE-TEENS ---
  {
    name: "Sesame Street",
    researchAnchor: "Fisch & Truglio (2001) 'G' is for Growing: 30 Years of Research",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 4/10)",
    age: ["preschool"],
    ageLabel: "Preschoolers (Ages 4–5)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "The most extensively researched educational program in television history. Classic street stories and acoustic musical guests foster literacy, inclusivity, and emotional vocabulary.",
    checkmarks: ["50+ years of peer-reviewed literacy impact", "Strong social-emotional curriculum", "Tip: Select acoustic & street story segments"],
    startWith: ["Breathe with Elmo & Colbie Caillat", "Count von Count Number Walks", "Cookie Monster's Self-Control Practice"],
    link: "https://www.youtube.com/sesamestreet"
  },
  {
    name: "PBS Kids",
    researchAnchor: "US Dept of Education Ready to Learn Grant Longitudinal Research",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 4/10)",
    age: ["preschool", "early-elementary", "middle-elementary"],
    ageLabel: "Ages 4–9 (Preschool to Middle Elementary)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Publicly funded, curriculum-audited shows including Wild Kratts (zoology), Molly of Denali (informational text literacy), Elinor Wonders Why (scientific observation), and Odd Squad (elementary math).",
    checkmarks: ["Federally audited curriculum goals", "Zero commercial toy-selling agendas", "Use the dedicated PBS Video App for 0 algorithms"],
    startWith: ["Elinor Wonders Why: Butterfly Camouflage", "Wild Kratts: Great Horned Owl", "Molly of Denali: Northern Lights"],
    link: "https://www.youtube.com/pbskids"
  },
  {
    name: "Mystery Doug / Mystery Science",
    researchAnchor: "Dewey (1938) & NGSS Phenomenon-Driven Socratic Inquiry",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 4/10)",
    age: ["early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Ages 6–12 (Elementary to Pre-Teen)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Former classroom science teacher Doug Peltz answers real questions submitted by elementary students. Pauses mid-video to ask children to hypothesize why a phenomenon happens before revealing the mechanism.",
    checkmarks: ["Built-in Socratic discussion pauses", "NGSS classroom science curriculum", "Calm, warm, teacher-led narration"],
    startWith: ["Why Is Mars Red?", "How Do Bees Make Honey?", "Why Does Ice Float?"],
    link: "https://www.youtube.com/channel/UCPRCRM3JKm3sw55lB_427qg"
  },
  {
    name: "BBC Earth Kids",
    researchAnchor: "E.O. Wilson (1984) Biophilia Hypothesis & Natural History Observation",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 4/10)",
    age: ["early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Ages 6–12 (Elementary to Pre-Teen)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "World-class BBC Natural History Unit cinematography adapted for young viewers. Long, patient wildlife camera shots and factual narration cultivate awe for marine biology, botany, and conservation.",
    checkmarks: ["Cinematic long-take wildlife photography", "Develops ecological & biological literacy", "Free of frantic YouTuber jump-cuts"],
    startWith: ["How Sea Otters Hold Hands", "The Secret Life of Coral Reefs", "Arctic Fox Winter Survival"],
    link: "https://www.youtube.com/@BBCEarthKids"
  },
  {
    name: "Veritasium",
    researchAnchor: "Muller et al. (2008) Addressing Physics Misconceptions via Dialogue",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 4/10)",
    age: ["preteen"],
    ageLabel: "Pre-Teens (Ages 10–12) & Teens",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Founded by Dr. Derek Muller based on his Ph.D. thesis in physics education research. Demonstrates that confronting common intuitive misconceptions before explaining physical laws dramatically improves retention.",
    checkmarks: ["Grounded in physics education Ph.D. research", "Long-form 15–25 minute deep dives", "Models rigorous scientific skepticism"],
    startWith: ["World's Roundest Object (Silicon Sphere)", "How Trees Bend the Laws of Physics", "The Secret of Synchronization"],
    link: "https://www.youtube.com/@veritasium"
  },
  {
    name: "Smarter Every Day",
    researchAnchor: "Feynman Technique of Physical Observation & High-Speed Optics",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 5/10)",
    age: ["preteen"],
    ageLabel: "Pre-Teens (Ages 10–12) & Teens",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Aerospace engineer Destin Sandlin uses ultra-slow-motion Phantom cameras to slow down fast physical phenomena (fluid dynamics, insect flight, acoustics), literally decelerating visual stimulus to study nature.",
    checkmarks: ["High-speed slow-motion physical analysis", "Models humble curiosity & family values", "Zero clickbait outrage or cynicism"],
    startWith: ["The Backwards Brain Bicycle (Neuroplasticity)", "How Do Honeybees Build Hexagons?", "Physics of Cat Twisting in Slow Motion"],
    link: "https://www.youtube.com/channel/UC6107grRI4m0o2-emgoDnAA"
  },
  {
    name: "TED-Ed",
    researchAnchor: "Mayer (2009) Multimedia Learning Principles & Dual Coding",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 5/10)",
    age: ["early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Ages 7–12 (Elementary to Pre-Teen)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "5-minute animated lessons pairing university professors and subject-matter experts with bespoke studio animators across history, cellular biology, logic riddles, and literature.",
    checkmarks: ["Written by vetted university educators", "Bespoke artistic animation per episode", "Includes comprehension & discussion prompts"],
    startWith: ["How Do Memories Form?", "Why Do Cities Need Trees?", "Can You Solve the Bridge Riddle?"],
    link: "https://www.youtube.com/TEDEducation"
  },
  {
    name: "SciShow Kids / Crash Course Kids",
    researchAnchor: "NRC (2012) K-12 Framework & Next Generation Science Standards (NGSS)",
    semBreakdown: "Base 1 + Pacing: 2/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 5/10)",
    age: ["early-elementary", "middle-elementary"],
    ageLabel: "Early & Middle Elementary (Ages 6–9)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Structured elementary science explainers covering botany, astronomy, simple machines, and Earth systems. Moderate pacing best used as a 10-minute supplement to hands-on kitchen science experiments.",
    checkmarks: ["Directly aligned with NGSS 1st–5th grade standards", "Clear diagramming of scientific vocabulary", "Pairs well with offline experiments"],
    startWith: ["How Do Plants Know Which Way Is Up?", "The Basics of Simple Machines", "Ecosystems & Food Webs"],
    link: "https://www.youtube.com/channel/UCRFIPG2u1DxKLNuE3y2SjHA"
  },
  {
    name: "StoryBots (Ask the StoryBots)",
    researchAnchor: "Mayer (2009) Multimodal Concept Integration & Musical Mnemonics",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 5/10)",
    age: ["preschool", "early-elementary"],
    ageLabel: "Preschool (4–5) & Early Elementary (6–7)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Multi-Emmy-winning educational series that answers big questions ('How Do Eyes See?', 'Why Is the Sky Blue?', 'How Do Computers Work?') by blending claymation, 2D art, and live-action field trips.",
    checkmarks: ["Tackles genuine molecular & physical mechanisms", "High-craft multi-medium studio animation", "Best viewed as 1 single episode per session"],
    startWith: ["How Do Eyes See?", "Why Do I Have to Brush My Teeth?", "How Do Planets Form?"],
    link: "https://www.youtube.com/channel/UCcdwLMPsaU2ezNSJU1nFoBQ"
  },
  {
    name: "National Geographic Kids",
    researchAnchor: "E.O. Wilson (1984) Biophilia & Empirical Natural World Literacy",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 5/10)",
    age: ["early-elementary", "middle-elementary"],
    ageLabel: "Early & Middle Elementary (Ages 6–9)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Field expeditions, animal conservation reports, archaeology, and geology explainers. Avoid short clips and select full-length 'Destination World' or 'Weird But True!' wildlife documentaries.",
    checkmarks: ["Real-world wildlife & geography footage", "Inspires outdoor nature journaling", "Select long-form playlists over Shorts"],
    startWith: ["Destination World: All 7 Continents", "How Glaciers Shape the Earth", "Amazing Animal Migrations"],
    link: "https://www.youtube.com/natgeokids"
  },
  {
    name: "Physics Girl / Kurzgesagt – In a Nutshell",
    researchAnchor: "Mayer (2009) Coherence Principle & Systems-Level Scientific Modeling",
    semBreakdown: "Base 1 + Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 5/10)",
    age: ["preteen"],
    ageLabel: "Pre-Teens (Ages 10–12) & Teens",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "MIT physics alumna Dianna Cowern (Physics Girl) demonstrates hands-on acoustics and electromagnetism, while Kurzgesagt provides peer-reviewed flat-vector explanations of immunology, astrophysics, and ecology.",
    checkmarks: ["Peer-reviewed scripts with public source logs", "Hands-on physics kitchen riddles", "Sparks deep dinner-table STEM debates"],
    startWith: ["The Immune System Explained", "Crazy Pool Vortex (Fluid Physics)", "What If You Detonated a Nuclear Bomb in the Marianas Trench?"],
    link: "https://www.youtube.com/c/physicsgirl"
  }
];

// Comprehensive Database of 33 Educator-Approved, Low-Stimulus Cognitive Games
const gamesData = [
  {
    "name": "Pok Pok Playroom",
    "developer": "Pok Pok / Snowman",
    "age": [
      "toddler",
      "preschool"
    ],
    "ageLabel": "Toddlers (Ages 2\u20133) & Preschool (Ages 4\u20135)",
    "stimulusScore": "1/10",
    "stimulusClass": "stimulus-low",
    "category": "sandbox",
    "categoryLabel": "Montessori & Sensory Play",
    "cognitiveSkills": [
      "Spatial Reasoning",
      "Cause & Effect",
      "Sensory Regulation",
      "Open-Ended Inquiry"
    ],
    "endorsements": [
      "Apple Design Award Winner",
      "Pediatrician Approved",
      "Montessori Certified"
    ],
    "whyEducatorsApprove": "A handcrafted digital playroom with zero text, zero menus, and zero language barriers. Uses real-world acoustic recordings (wooden blocks, paper, physical marble clacks) rather than electronic synthesizers. Children are free to explore without timers, points, or failure states, nurturing self-directed curiosity and intrinsic cognitive focus.",
    "calmHighlights": [
      "Zero ads or in-app purchases",
      "No timers, levels, or score pressure",
      "Hand-drawn animation with organic acoustic audio"
    ],
    "platforms": [
      "iOS / iPadOS",
      "Android"
    ],
    "monetization": "Subscription (Zero Ads/IAPs)",
    "monetizationType": "paid",
    "link": "https://playpokpok.com",
    "researchAnchor": "Hirsh-Pasek et al. (2015) Active Mind-On Play; Montessori Auto-Education",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)"
  },
  {
    "name": "Sago Mini World / Forest Flyer",
    "developer": "Sago Mini",
    "age": [
      "toddler",
      "preschool"
    ],
    "ageLabel": "Toddlers (Ages 2\u20133) & Preschool (Ages 4\u20135)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "sandbox",
    "categoryLabel": "Imaginative Exploration",
    "cognitiveSkills": [
      "Cause & Effect",
      "Fine Motor Coordination",
      "Empathy & Caretaking"
    ],
    "endorsements": [
      "Parents' Choice Gold Award",
      "Common Sense Media Selection"
    ],
    "whyEducatorsApprove": "Designed specifically for toddlers' developing nervous systems. Characters respond gently to touches without abrupt startling sound effects or frantic animations. Encourages open-ended digital pretend play without rules, points, or game-over penalties.",
    "calmHighlights": [
      "Gentle, predictable animations",
      "100% offline-capable",
      "Zero external ads or pop-ups"
    ],
    "platforms": [
      "iOS",
      "Android",
      "Amazon Fire"
    ],
    "monetization": "Paid / Subscription",
    "monetizationType": "paid",
    "link": "https://sagomini.com",
    "researchAnchor": "Anderson & Pempek (2005) Sensory Pacing Guidelines in Toddlers",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Endless Alphabet",
    "developer": "Originator Kids",
    "age": [
      "toddler",
      "preschool"
    ],
    "ageLabel": "Toddlers (Ages 2\u20133) & Preschool (Ages 4\u20135)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Phonics & Literacy",
    "cognitiveSkills": [
      "Phonemic Awareness",
      "Letter-Sound Correspondence",
      "Vocabulary Acquisition"
    ],
    "endorsements": [
      "App Store Editor's Choice",
      "Teachers With Apps Certified"
    ],
    "whyEducatorsApprove": "Transforms abstract phonics into tactile, voice-activated puzzle pieces. As children drag monster letters toward a word slot, the letter repeatedly enunciates its phonetic sound (e.g. 'm-m-m-m'). Completed words trigger delightful, educational animated definitions without scoring pressure or countdown timers.",
    "calmHighlights": [
      "Self-paced interactive puzzles",
      "No timers or high scores",
      "One-time upfront purchase with zero ads"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://www.originatorkids.com",
    "researchAnchor": "National Reading Panel (2000) Synthetic Phonics & Phonemic Awareness",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Breathe, Think, Do with Sesame",
    "developer": "Sesame Workshop",
    "age": [
      "toddler",
      "preschool"
    ],
    "ageLabel": "Toddlers (Ages 2\u20133) & Preschool (Ages 4\u20135)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "sel",
    "categoryLabel": "Social-Emotional & Self-Regulation",
    "cognitiveSkills": [
      "Inhibitory Control",
      "Emotional Regulation",
      "Problem-Solving Mindset"
    ],
    "endorsements": [
      "Sesame Workshop Research",
      "AAP Recommended Resource"
    ],
    "whyEducatorsApprove": "A research-grounded social-emotional tool that helps young children navigate frustration, impatience, and anxiety. Walk a friendly monster through a 3-step calm-down strategy: tap belly to take slow deep breaths, pop thought bubbles to brainstorm ideas, and choose a solution. Directly strengthens prefrontal cortex executive function.",
    "calmHighlights": [
      "100% free non-profit educational app",
      "Gentle, reassuring voice guidance",
      "Zero ads, zero data tracking"
    ],
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "monetization": "100% Free Non-Profit",
    "monetizationType": "free",
    "link": "https://sesameworkshop.org",
    "researchAnchor": "Diamond (2013) Inhibitory Control & Prefrontal Cortex Regulation",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Khan Academy Kids",
    "developer": "Khan Academy",
    "age": [
      "toddler",
      "preschool",
      "early-elementary"
    ],
    "ageLabel": "Ages 2\u20137 (Toddler to Early Elementary)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Curriculum Math & Reading",
    "cognitiveSkills": [
      "Early Numeracy",
      "Phonics & Decoding",
      "Logical Categorization",
      "Executive Function"
    ],
    "endorsements": [
      "Stanford GSE Collaboration",
      "Common Sense 5-Star Selection",
      "100% Free 501(c)(3)"
    ],
    "whyEducatorsApprove": "Developed in close collaboration with early childhood researchers at Stanford Graduate School of Education. Aligned with Head Start and Common Core standards, featuring thousands of interactive lessons, books, and creative drawing tools. Deliberate, calm pacing with lovable animal guides and completely absent of commercial incentives.",
    "calmHighlights": [
      "Completely free forever (zero ads, zero subscriptions)",
      "Offline learning library available",
      "No addictive gambling/loot mechanics"
    ],
    "platforms": [
      "iOS",
      "Android",
      "Amazon Fire"
    ],
    "monetization": "100% Free Non-Profit",
    "monetizationType": "free",
    "link": "https://www.khanacademy.org/kids",
    "researchAnchor": "Stanford Graduate School of Education (2018) Early Learning Evaluation",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "PBS KIDS Games",
    "developer": "PBS KIDS / Public Broadcasting Service",
    "age": [
      "preschool",
      "early-elementary"
    ],
    "ageLabel": "Preschool (Ages 4\u20135) & Early Elementary (Ages 6\u20137)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Public Educational Media",
    "cognitiveSkills": [
      "Curriculum Math & Science",
      "Social-Emotional Learning",
      "Foundational Problem Solving"
    ],
    "endorsements": [
      "US Department of Education Ready to Learn",
      "Emmy Award Winning Pedagogy"
    ],
    "whyEducatorsApprove": "The gold standard of publicly-funded children's interactive media. Features over 250 curriculum-tested mini-games built around trusted shows like Peg + Cat (math), Wild Kratts (natural science), and Daniel Tiger (emotional literacy). Evaluated under rigorous federally-funded Ready to Learn research grants.",
    "calmHighlights": [
      "100% free with zero commercial ads",
      "Zero in-app purchases or subscription paywalls",
      "Educational goal declared for every game"
    ],
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "monetization": "100% Free Public Media",
    "monetizationType": "free",
    "link": "https://pbskids.org/games",
    "researchAnchor": "US Dept of Education Ready-to-Learn Grant Evaluation (2015-2020)",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Thinkrolls: Logic & Physics Puzzles",
    "developer": "Avokiddo",
    "age": [
      "preschool",
      "early-elementary"
    ],
    "ageLabel": "Preschool (Ages 4\u20135) & Early Elementary (Ages 6\u20137)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "logic",
    "categoryLabel": "Physics & Spatial Logic",
    "cognitiveSkills": [
      "Spatial Reasoning",
      "Physics Intuition (Gravity, Buoyancy)",
      "Trial-and-Error Planning"
    ],
    "endorsements": [
      "Children's Technology Review Editor's Choice",
      "Moms' Choice Gold Award"
    ],
    "whyEducatorsApprove": "A brilliant spatial physics game where children navigate quirky circular characters through multi-layered puzzle mazes. Teaches fundamental physical properties\u2014gravity, buoyancy, elasticity, thermal expansion\u2014through interactive experimentation. There are no time limits or penalty countdowns, encouraging systematic scientific thinking.",
    "calmHighlights": [
      "Zero time limits or countdown stress",
      "No in-app purchases or third-party ads",
      "Pure visual mechanics without reading requirements"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "One-Time Purchase / Bundle",
    "monetizationType": "paid",
    "link": "https://avokiddo.com",
    "researchAnchor": "Hirsh-Pasek et al. (2015) Spatial Problem-Solving & Physics Intuition",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Monument Valley Series (1, 2 & 3)",
    "developer": "ustwo games",
    "age": [
      "preschool",
      "early-elementary",
      "middle-elementary"
    ],
    "ageLabel": "Ages 4\u201310 (Preschool to Middle Elementary)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "spatial",
    "categoryLabel": "Spatial Geometry & Architecture",
    "cognitiveSkills": [
      "Perspective Shifting",
      "M.C. Escher Spatial Geometry",
      "Mindfulness & Meditative Focus"
    ],
    "endorsements": [
      "Apple Game of the Year",
      "BAFTA Video Game Award",
      "Common Sense 5-Star Selection"
    ],
    "whyEducatorsApprove": "An architectural masterpiece (including Monument Valley 1, 2, and the December 2024 release of Monument Valley 3) exploring impossible geometry and optical illusions. Children manipulate moving platforms, origami boats, and camera angles to create viable paths. The meditative acoustic soundscape and tranquil pacing offer a deeply calming, contemplative alternative to twitch mobile games.",
    "calmHighlights": [
      "Tranquil, meditative ambient sound design",
      "Zero timers, combat, or failure states",
      "Pristine artistic design without sensory overload"
    ],
    "platforms": [
      "iOS",
      "Android",
      "PC",
      "Apple Arcade"
    ],
    "monetization": "One-Time Purchase / Apple Arcade",
    "monetizationType": "paid",
    "link": "https://www.monumentvalleygame.com",
    "researchAnchor": "M.C. Escher Spatial Geometry; Dunckley (2015) Meditative Flow",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Toca Nature",
    "developer": "Toca Boca",
    "age": [
      "preschool",
      "early-elementary"
    ],
    "ageLabel": "Preschool (Ages 4\u20135) & Early Elementary (Ages 6\u20137)",
    "stimulusScore": "1/10",
    "stimulusClass": "stimulus-low",
    "category": "sandbox",
    "categoryLabel": "Ecological Sandbox",
    "cognitiveSkills": [
      "Ecosystem Interdependence",
      "Animal Diets & Habitats",
      "Relaxation & Nature Appreciation"
    ],
    "endorsements": [
      "Common Sense Media Selection",
      "App Store Best of the Year"
    ],
    "whyEducatorsApprove": "An open-ended digital terrarium where children shape 3D terrain: raising mountains, planting distinct tree species, and carving rivers. Woodland animals (bears, foxes, deer, beavers) populate the biome and thrive when fed their natural diet. Features no missions, no currency, no timers, and no failure conditions.",
    "calmHighlights": [
      "Extremely quiet, peaceful nature soundscape",
      "No scores, currency, or timers",
      "One-time purchase with zero ads or tracking"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://tocaboca.com",
    "researchAnchor": "Dunckley (2015) Sensory De-escalation & Open-World Nature Cognition",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)"
  },
  {
    "name": "Kahoot! DragonBox Numbers",
    "developer": "Kahoot! / WeWantToKnow",
    "age": [
      "preschool",
      "early-elementary"
    ],
    "ageLabel": "Preschool (Ages 4\u20135) & Early Elementary (Ages 6\u20137)",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Visual Mathematics",
    "cognitiveSkills": [
      "Number Sense",
      "Singapore Math Number Bonds",
      "Additive & Subtractive Reasoning"
    ],
    "endorsements": [
      "Bett Award Best Educational App",
      "Serious Play Gold Award"
    ],
    "whyEducatorsApprove": "Groundbreaking mathematical game designed around the Singapore Math method. Numbers 1 through 10 are visualized as colorful rods ('Nooms'). Slicing a '5' rod yields a '2' and a '3'; combining rods demonstrates addition. Children develop a profound intuitive mental model of numbers before touching numeral notation.",
    "calmHighlights": [
      "Intuitive puzzle progression without drills",
      "Zero commercial advertisements",
      "Self-paced conceptual mastery"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "Kahoot!+ Bundle / Legacy Standalone",
    "monetizationType": "paid",
    "link": "https://dragonbox.com",
    "researchAnchor": "Singapore Ministry of Education CPA (Concrete-Pictorial-Abstract) Framework",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "Daniel Tiger's Grr-ific Feelings",
    "developer": "PBS KIDS / The Fred Rogers Company",
    "age": [
      "toddler",
      "preschool"
    ],
    "ageLabel": "Toddlers (Ages 2\u20133) & Preschool (Ages 4\u20135)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "sel",
    "categoryLabel": "Social-Emotional Learning",
    "cognitiveSkills": [
      "Emotional Literacy",
      "Coping Mechanisms",
      "Self-Soothing Strategies"
    ],
    "endorsements": [
      "Fred Rogers Center Endorsed",
      "Parents' Choice Gold Award"
    ],
    "whyEducatorsApprove": "Direct descendant of Mister Rogers' Neighborhood philosophy. Helps young children identify feelings (mad, sad, happy, frustrated) and provides concrete, singable coping mechanisms ('When you feel so mad that you want to roar, take a deep breath and count to four'). Empowers emotional co-regulation between parent and child.",
    "calmHighlights": [
      "Gentle, empathetic narration",
      "100% free non-profit media",
      "Zero commercial ads or tracked purchases"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "100% Free Public Media",
    "monetizationType": "free",
    "link": "https://pbskids.org/apps/daniel-tigers-grr-ific-feelings.html",
    "researchAnchor": "Fred Rogers Center for Early Learning & Children's Media (2016)",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "ScratchJr",
    "developer": "MIT Media Lab & Tufts University (DevTech)",
    "age": [
      "preschool",
      "early-elementary"
    ],
    "ageLabel": "Preschool (Ages 4\u20135) & Early Elementary (Ages 6\u20137)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "coding",
    "categoryLabel": "Visual Algorithmic Coding",
    "cognitiveSkills": [
      "Computational Thinking",
      "Sequencing & Syntax",
      "Cause-and-Effect Logic",
      "Creative Expression"
    ],
    "endorsements": [
      "MIT Media Lab",
      "Tufts University DevTech Research",
      "100% Free Open-Source"
    ],
    "whyEducatorsApprove": "Created by Prof. Marina Umaschi Bers and Mitch Resnick. An introductory programming language that enables young children to snap together graphical programming blocks to make characters move, jump, dance, and sing. Empowers children to become producers of digital media rather than passive consumers, with zero ads or internet requirements.",
    "calmHighlights": [
      "100% free, open-source educational software",
      "Zero ads, zero data tracking, completely offline",
      "Constructivist creative sandbox"
    ],
    "platforms": [
      "iOS",
      "Android",
      "Chromebook",
      "Desktop (Unofficial FOSS port)"
    ],
    "monetization": "100% Free Open-Source",
    "monetizationType": "foss",
    "link": "https://www.scratchjr.org",
    "researchAnchor": "Bers et al. (2014), Computers & Education; Tufts DevTech Lab",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Slice Fractions",
    "developer": "Ululab",
    "age": [
      "early-elementary",
      "middle-elementary"
    ],
    "ageLabel": "Early & Middle Elementary (Ages 6\u20139)",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Conceptual Mathematics",
    "cognitiveSkills": [
      "Fraction Sense (Parts of a Whole)",
      "Spatial Equal Partitioning",
      "Problem Decomposition"
    ],
    "endorsements": [
      "University of Quebec Educational Study",
      "Apple Best of App Store",
      "Parents' Choice Gold Award"
    ],
    "whyEducatorsApprove": "An academic study by researchers at the Universit\u00e9 du Qu\u00e9bec \u00e0 Montr\u00e9al confirmed that playing Slice Fractions for just a few hours significantly boosted elementary students' fractional understanding. Players clear paths for a woolly mammoth by slicing blocks of ice and lava into fractional segments without reading dry formulas or numeric drills.",
    "calmHighlights": [
      "Research-validated conceptual pedagogy",
      "No repetitive timed quizzes or stress",
      "Zero advertisements or pay-to-win microtransactions"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://ululab.com/slice-fractions",
    "researchAnchor": "Charland et al. (2016), Universit\u00e9 du Qu\u00e9bec \u00e0 Montr\u00e9al (UQAM) Study",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "Lightbot: Code Hour / Lightbot Jr.",
    "developer": "Danny Yaroslavski",
    "age": [
      "early-elementary",
      "middle-elementary"
    ],
    "ageLabel": "Early & Middle Elementary (Ages 6\u20139)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "coding",
    "categoryLabel": "Procedural Programming Logic",
    "cognitiveSkills": [
      "Algorithmic Sequencing",
      "Procedures & Subroutines",
      "Loop Mechanics",
      "Debugging"
    ],
    "endorsements": [
      "Hour of Code Featured Resource",
      "Used in over 50,000 classrooms globally"
    ],
    "whyEducatorsApprove": "A quiet, brain-teasing puzzle game that teaches programming logic without teaching a specific coding syntax. Players instruct a small robot to light up blue tiles by queuing commands: walk, turn, jump, light, and call function. Deeply exercises working memory and procedural decomposition.",
    "calmHighlights": [
      "Minimalist isometric design with calm sound effects",
      "No time limits or speed pressure",
      "Free Hour of Code edition available"
    ],
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "monetization": "Free Demo / One-Time Purchase",
    "monetizationType": "free",
    "link": "https://lightbot.com",
    "researchAnchor": "Wing (2006) Computational Thinking & Algorithmic Decomposition",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Townscaper",
    "developer": "Oskar St\u00e5lberg",
    "age": [
      "early-elementary",
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "All Ages 6+ (Early Elementary to Pre-Teen)",
    "stimulusScore": "1/10",
    "stimulusClass": "stimulus-low",
    "category": "sandbox",
    "categoryLabel": "Calm Architectural Sandbox",
    "cognitiveSkills": [
      "3D Spatial Aesthetics",
      "Organic Pattern Emergence",
      "Stress Reduction & Flow State"
    ],
    "endorsements": [
      "Independent Games Festival Nominee",
      "Acclaimed by Child Psychologists for Calming"
    ],
    "whyEducatorsApprove": "Not a game in the conventional sense, but an experimental architectural toy. Tap to place colorful blocks into a tranquil blue ocean; the underlying algorithm automatically morphs them into quaint houses, bridges, arches, and cathedrals depending on their configuration. Perfect for sensory de-escalation and soothing creative flow.",
    "calmHighlights": [
      "Ultra-low stimulus: calming water splashes and gentle pop sounds",
      "Zero goals, zero timers, zero failure states",
      "One-time purchase with completely offline gameplay"
    ],
    "platforms": [
      "iOS",
      "Android",
      "PC",
      "Mac",
      "Nintendo Switch",
      "Web Demo"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://oskarstalberg.com/Townscaper",
    "researchAnchor": "Papert (1980) Microworlds; Sensory De-escalation Spatial Flow",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)"
  },
  {
    "name": "Kahoot! DragonBox Big Numbers",
    "developer": "Kahoot! / WeWantToKnow",
    "age": [
      "early-elementary",
      "middle-elementary"
    ],
    "ageLabel": "Early & Middle Elementary (Ages 6\u20139)",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Base-10 Arithmetic & Systems",
    "cognitiveSkills": [
      "Base-10 Place Value",
      "Multi-Digit Addition & Subtraction",
      "Resource Management"
    ],
    "endorsements": [
      "Serious Play Gold Award",
      "Common Sense Media Certified"
    ],
    "whyEducatorsApprove": "Demystifies long addition and subtraction through immersive resource collection. Children mine apples and gems, packaging them into tens, hundreds, and thousands to trade with whimsical monsters. Instills a physical understanding of carrying and borrowing in multi-digit arithmetic.",
    "calmHighlights": [
      "Whimsical storybook art style without flashing banners",
      "No timer pressure or sudden failure screens",
      "Zero third-party ads"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "Kahoot!+ Bundle / Legacy Standalone",
    "monetizationType": "paid",
    "link": "https://dragonbox.com",
    "researchAnchor": "Sj\u00f6man et al. (2015), Computers & Education; Base-10 Structuring",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "ChessKid",
    "developer": "ChessKid.com (Chess.com Education)",
    "age": [
      "early-elementary",
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Ages 6\u201312 (Elementary to Pre-Teen)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "logic",
    "categoryLabel": "Strategic Foresight & Impulse Control",
    "cognitiveSkills": [
      "Inhibitory Control",
      "Working Memory",
      "Look-Ahead Planning",
      "Hypothesis Evaluation"
    ],
    "endorsements": [
      "FIDE Educational Partner",
      "COPPA Verified Safe Harbor",
      "Used in 20,000+ Schools"
    ],
    "whyEducatorsApprove": "Chess is the most thoroughly studied non-digital board game for developing executive function. ChessKid adapts chess into a 100% safe, COPPA-compliant environment with interactive video lessons and animated puzzles. Zero external social media links, no unrestricted chat between strangers, and turn-based pacing that rewards patient impulse control.",
    "calmHighlights": [
      "Turn-based pacing that enforces patience",
      "Strictly moderated, child-safe environment (zero stranger chat)",
      "Rich tactical puzzles and animated lessons"
    ],
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "monetization": "Free Tier / Educational Membership",
    "monetizationType": "free",
    "link": "https://www.chesskid.com",
    "researchAnchor": "Diamond (2013) Inhibitory Control & Look-Ahead Strategic Planning",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Zoombinis (Logical Journey of the Zoombinis)",
    "developer": "TERC & Broderbund / National Science Foundation",
    "age": [
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Middle Elementary (Ages 8\u20139) & Pre-Teens (Ages 10\u201312)",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "logic",
    "categoryLabel": "Deductive Logic & Discrete Math",
    "cognitiveSkills": [
      "Set Theory & Venn Diagrams",
      "Boolean Logic Attributes",
      "Hypothesis Testing",
      "Data Sorting Algorithms"
    ],
    "endorsements": [
      "Funded by National Science Foundation (NSF)",
      "TERC Educational Research Lab",
      "Legendary Educator Classic"
    ],
    "whyEducatorsApprove": "Widely regarded as the pinnacle of educational computer games. Zoombinis possess combinations of 4 visual attributes (hair, eyes, nose color, feet). Every puzzle (e.g. Pizza Pass, Mudball Wall, Titanic Cliffs) requires children to systematically formulate hypotheses, test data, and infer hidden Boolean sorting rules. Truly rigorous mathematical reasoning.",
    "calmHighlights": [
      "Deliberate, thought-intensive puzzle structure",
      "Zero reflex-based twitch mechanics",
      "One-time purchase, completely ad-free and offline"
    ],
    "platforms": [
      "iOS",
      "Android",
      "PC",
      "Mac"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://www.zoombinis.com",
    "researchAnchor": "Asbell-Clarke et al. (2012), TERC / NSF Grant DRL-1118534",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "Scratch 3.0",
    "developer": "MIT Media Lab & Scratch Foundation",
    "age": [
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Middle Elementary (Ages 8\u20139) & Pre-Teens (Ages 10\u201312)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "coding",
    "categoryLabel": "Full Creative Block Programming",
    "cognitiveSkills": [
      "Computational Thinking",
      "Variables & Conditionals",
      "Event-Driven Architecture",
      "Systemic Debugging"
    ],
    "endorsements": [
      "MIT Media Lab",
      "National Science Foundation Grantee",
      "World's #1 Kid Coding Language"
    ],
    "whyEducatorsApprove": "The gold standard of Seymour Papert's constructionist philosophy. Mitch Resnick's Lifelong Kindergarten group designed Scratch to allow children to program their own interactive stories, games, and animations. Promotes creative thinking, systematic reasoning, and collaborative problem solving. Free offline desktop app requires zero internet access.",
    "calmHighlights": [
      "100% free non-profit platform (no corporate ads or trackers)",
      "Offline desktop client available for zero-distraction focus",
      "Strictly human-moderated community rules"
    ],
    "platforms": [
      "Web",
      "Mac Desktop",
      "Windows Desktop",
      "Linux",
      "Chromebook"
    ],
    "monetization": "100% Free Non-Profit",
    "monetizationType": "foss",
    "link": "https://scratch.mit.edu",
    "researchAnchor": "Papert (1980) Constructionism; Resnick (2017) Lifelong Kindergarten",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Kahoot! DragonBox Algebra (5+ & 12+)",
    "developer": "Kahoot! / WeWantToKnow",
    "age": [
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Middle Elementary (Ages 8\u20139) & Pre-Teens (Ages 10\u201312)",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Algebraic Reasoning",
    "cognitiveSkills": [
      "Isolating Variables",
      "Balancing Equations",
      "Inverse Operations",
      "Symbolic Substitution"
    ],
    "endorsements": [
      "Norwegian Research Council Study",
      "Bett Award Winner",
      "Forbes Best Learning Game"
    ],
    "whyEducatorsApprove": "A pedagogical miracle that teaches linear algebra without math anxiety. Players start by clearing cards from two sides of a game board to isolate a mystical box, intuitively learning rules of equivalence and balance. Over progressive levels, pictures transform into letters (x, y) and numbers, revealing they have been solving advanced algebraic equations all along.",
    "calmHighlights": [
      "Zero time pressure or stressful failure penalties",
      "Self-guided discovery of complex mathematical concepts",
      "Zero third-party advertisements"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "Kahoot!+ Bundle / Legacy Standalone",
    "monetizationType": "paid",
    "link": "https://dragonbox.com",
    "researchAnchor": "Sj\u00f6man et al. (2015), Computers & Education; Norwegian Research Council",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "A Short Hike",
    "developer": "adamgryu",
    "age": [
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Middle Elementary (Ages 8\u20139) & Pre-Teens (Ages 10\u201312)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "sandbox",
    "categoryLabel": "Wholesome Exploration & Autonomy",
    "cognitiveSkills": [
      "Spatial Mapping",
      "Intrinsic Goal Setting",
      "Reading Comprehension",
      "Emotional Autonomy"
    ],
    "endorsements": [
      "IGF Seumas McNally Grand Prize Winner",
      "Common Sense 5-Star Selection"
    ],
    "whyEducatorsApprove": "Follows Claire, a young bird taking a peaceful hike up Hawk Peak in a provincial park. There is zero combat, zero death, and zero time pressure. Encourages self-directed exploration, climbing, gliding, helping fellow hikers with gentle errands, and building intrinsic confidence. Outstanding alternative to violent open-world games.",
    "calmHighlights": [
      "Mellow acoustic guitar and nature soundtrack",
      "Zero violence, gore, or stressful jump-scares",
      "Respects child autonomy with self-paced goals"
    ],
    "platforms": [
      "PC",
      "Mac",
      "Nintendo Switch",
      "PlayStation",
      "Xbox"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://ashorthike.com",
    "researchAnchor": "Ryan & Deci (2000) Self-Determination Theory (Intrinsic Autonomy)",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Human Resource Machine",
    "developer": "Tomorrow Corporation",
    "age": [
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Middle Elementary (Ages 8\u20139) & Pre-Teens (Ages 10\u201312)",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "coding",
    "categoryLabel": "Assembly & Low-Level Computer Science",
    "cognitiveSkills": [
      "Assembly Language Concepts",
      "Memory Registers & Pointers",
      "Algorithmic Efficiency",
      "Loop Optimization"
    ],
    "endorsements": [
      "Used in Computer Science Education",
      "Excellence in Design Nominee"
    ],
    "whyEducatorsApprove": "Don't let the corporate satire fool you: this is a brilliant, rigorous course in fundamental computer architecture. Program an office worker to pick up blocks from an 'Inbox' conveyor and sort them to an 'Outbox' using low-level assembly commands. Teaches zero-based indexing, conditional branching, and efficiency optimization without syntax headaches.",
    "calmHighlights": [
      "Cerebral, quiet problem-solving with no timer urgency",
      "Deeply satisfying 'Aha!' logic moments",
      "One-time purchase, offline-ready"
    ],
    "platforms": [
      "iOS",
      "Android",
      "PC",
      "Mac",
      "Nintendo Switch"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://tomorrowcorporation.com/humanresourcemachine",
    "researchAnchor": "Patterson & Hennessy (2013) Computer Architecture & Assembly Models",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "Alba: A Wildlife Adventure",
    "developer": "ustwo games",
    "age": [
      "early-elementary",
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Ages 6\u201312 (Elementary to Pre-Teen)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "sandbox",
    "categoryLabel": "Environmental Conservation & Biology",
    "cognitiveSkills": [
      "Fauna Taxonomy & Identification",
      "Civic Engagement",
      "Observation & Scientific Note-Taking"
    ],
    "endorsements": [
      "Apple Design Award Finalist",
      "1M+ Trees Planted Initiative",
      "Common Sense 5-Star"
    ],
    "whyEducatorsApprove": "Alba visits her grandparents on a sun-drenched Mediterranean island. When a luxury hotel threatens the local nature reserve, Alba and her friend start a movement to protect the wildlife. Players photograph animal species, catalog birds by sound, repair bridges, and pick up litter. Deeply uplifting, prosocial, and ecologically educational.",
    "calmHighlights": [
      "Sun-drenched, tranquil Mediterranean soundscape",
      "Prosocial themes of civic empowerment and conservation",
      "Zero stressful combat or microtransaction traps"
    ],
    "platforms": [
      "iOS (Apple Arcade)",
      "PC",
      "Mac",
      "Nintendo Switch",
      "PlayStation",
      "Xbox"
    ],
    "monetization": "Apple Arcade / One-Time Purchase",
    "monetizationType": "arcade",
    "link": "https://www.albawildlife.com",
    "researchAnchor": "Sobel (2008) Childhood & Nature; Place-Based Environmental Education",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Baba Is You",
    "developer": "Arvi Teikari (Hempuli)",
    "age": [
      "preteen"
    ],
    "ageLabel": "Pre-Teens (Ages 10\u201312) & Teens",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "logic",
    "categoryLabel": "Formal Predicate Logic & Metacognition",
    "cognitiveSkills": [
      "Predicate Logic",
      "Linguistic Semantics",
      "Lateral Thinking",
      "Systemic Rule Induction"
    ],
    "endorsements": [
      "IGF Excellence in Design Winner",
      "Praised by Oxford & MIT Computer Scientists"
    ],
    "whyEducatorsApprove": "A revolutionary puzzle game where the rules of interaction exist as physical text blocks in the level. Push 'FLAG' and 'IS' and 'WIN' together, and touching the flag wins; change it to 'BABA IS WIN' and you instantly win. Forces players to examine fundamental assumptions of causality, formal logic, and linguistic semantics.",
    "calmHighlights": [
      "Turn-based puzzle thinking: take as long as you want",
      "Charming retro pixel art with gentle ambient chiptune",
      "One-time purchase with hundreds of mind-bending levels"
    ],
    "platforms": [
      "PC",
      "Mac",
      "Nintendo Switch",
      "iOS",
      "Android"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://hempuli.com/baba",
    "researchAnchor": "Tarski (1956) Formal Semantics & Predicate Rule Induction",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "Minecraft (Creative Mode & Redstone Logic)",
    "developer": "Mojang Studios",
    "age": [
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Middle Elementary (Ages 8\u20139) & Pre-Teens (Ages 10\u201312)",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "sandbox",
    "categoryLabel": "3D Spatial Architecture & Boolean Circuits",
    "cognitiveSkills": [
      "3D Spatial Geometry",
      "Boolean Logic Gates (AND/OR/NOT/XOR)",
      "Structural Engineering",
      "Collaborative Building"
    ],
    "endorsements": [
      "Minecraft: Education Edition in 115+ Countries",
      "Seymour Papert Constructivism Epitome"
    ],
    "whyEducatorsApprove": "In Creative Mode or Peaceful Survival (and especially on a private family LAN server), Minecraft is the ultimate digital LEGO set. Redstone circuitry functions identically to real-world electrical engineering, allowing children to build logic gates, binary counters, automated farms, and functional computers. Unmatched constructivist depth.",
    "calmHighlights": [
      "Peaceful / Creative mode eliminates monster stress and jumps",
      "Tranquil ambient piano soundtrack by C418",
      "Pure spatial engineering and self-directed creation"
    ],
    "platforms": [
      "PC / Java",
      "Mac",
      "Consoles",
      "iOS",
      "Android"
    ],
    "monetization": "One-Time Purchase (Private LAN Recommended)",
    "monetizationType": "paid",
    "link": "https://www.minecraft.net",
    "researchAnchor": "Papert (1980) Constructionism; Digital Boolean Logic Gates",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "Kerbal Space Program",
    "developer": "Squad",
    "age": [
      "preteen"
    ],
    "ageLabel": "Pre-Teens (Ages 10\u201312) & Teens",
    "stimulusScore": "4/10",
    "stimulusClass": "stimulus-med",
    "category": "stem",
    "categoryLabel": "Aerospace Physics & Orbital Mechanics",
    "cognitiveSkills": [
      "Orbital Mechanics (Kepler's Laws)",
      "Newtonian Physics & Aerodynamics",
      "Engineering Iteration Cycle",
      "Data-Driven Failure Analysis"
    ],
    "endorsements": [
      "Praised by NASA and ESA Engineers",
      "Used in University & High School Physics Programs"
    ],
    "whyEducatorsApprove": "Players design, build, and fly rockets, spaceplanes, and satellites for a fictional aerospace program obeying real orbital mechanics and physics. Children intuitively learn delta-V, thrust-to-weight ratio, atmospheric drag, Hohmann transfer orbits, and orbital rendezvous. Builds profound resilience: when a rocket explodes, players analyze flight logs and iterate.",
    "calmHighlights": [
      "Deeply methodical engineering and mission planning",
      "Zero loot boxes or microtransaction grinds",
      "Promotes genuine scientific literacy and resilience"
    ],
    "platforms": [
      "PC",
      "Mac",
      "Linux"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://www.kerbalspaceprogram.com",
    "researchAnchor": "NASA / ESA Orbital Physics & Newtonian Mechanics Education",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 1/2 • Reward: 0/2 (Total: 4/10)"
  },
  {
    "name": "The Witness",
    "developer": "Thekla, Inc.",
    "age": [
      "preteen"
    ],
    "ageLabel": "Pre-Teens (Ages 10\u201312) & Teens",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "spatial",
    "categoryLabel": "Visual Induction & Symbolic Deduction",
    "cognitiveSkills": [
      "Symbolic Rule Induction",
      "Non-Verbal Pattern Recognition",
      "Spatial Perspective",
      "Epistemological Reflection"
    ],
    "endorsements": [
      "BAFTA Video Game Award Nominee",
      "Acclaimed by Mathematicians & Cognitive Scientists"
    ],
    "whyEducatorsApprove": "Set on a silent, gorgeous, uninhabited island filled with over 500 line-drawing puzzle panels. The game has zero text, zero tutorials, and zero voiceover. Every series of panels teaches a new symbolic syntax through inductive learning. Demands intense concentration, spatial perspective alignment, and intellectual patience.",
    "calmHighlights": [
      "Completely silent world: no background music, only natural footstep and wind audio",
      "Zero combat, time limits, or reflex requirements",
      "One-time purchase, 100% offline"
    ],
    "platforms": [
      "PC",
      "Mac",
      "PlayStation 4",
      "iOS"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://the-witness.net",
    "researchAnchor": "Peirce (1903) Semiotic Induction; Silent Epistemic Discovery",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Civilization VI / Freeciv",
    "developer": "Firaxis Games / Freeciv Community (Open Source)",
    "age": [
      "preteen"
    ],
    "ageLabel": "Pre-Teens (Ages 10\u201312) & Teens",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "sandbox",
    "categoryLabel": "Macro-Economics & Complex Systems",
    "cognitiveSkills": [
      "Macro-Systems Thinking",
      "Resource Allocation",
      "Geopolitics & History",
      "Long-Term Strategic Trade-Offs"
    ],
    "endorsements": [
      "Used in History & Political Science Classrooms",
      "Freeciv is 100% Free Open-Source"
    ],
    "whyEducatorsApprove": "A turn-based 4X strategy game spanning human history from the Stone Age to the Space Age. Players balance economic production, scientific research trees, cultural civics, and international diplomacy. Turn-based mechanics ensure players have infinite time to weigh complex decisions without reflex pressure. (Freeciv offers an open-source, ad-free alternative).",
    "calmHighlights": [
      "Turn-based mechanics: zero reaction-time or dexterity panic",
      "Rich historical, geographical, and technological context",
      "Offline capable with deep intellectual satisfaction"
    ],
    "platforms": [
      "PC",
      "Mac",
      "iPad",
      "Nintendo Switch (Freeciv is FOSS on Web/Linux)"
    ],
    "monetization": "One-Time Purchase / FOSS",
    "monetizationType": "paid",
    "link": "https://civilization.com",
    "researchAnchor": "Sterman (2000) Business Dynamics: Complex Systems & Policy Trade-offs",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "Turing Complete / Opus Magnum",
    "developer": "Turing Complete Team / Zachtronics",
    "age": [
      "preteen"
    ],
    "ageLabel": "Pre-Teens (Ages 10\u201312) & Teens",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "coding",
    "categoryLabel": "Computer Engineering & Logic Gates",
    "cognitiveSkills": [
      "Boolean Gate Architecture",
      "Binary Math & ALUs",
      "CPU Microarchitecture",
      "Spatial Optimization"
    ],
    "endorsements": [
      "Acclaimed by Computer Science Professors",
      "Used in Electrical Engineering Education"
    ],
    "whyEducatorsApprove": "Turing Complete starts with a single NAND gate and challenges the player to build basic logic gates (AND, OR, XOR), then half-adders, full-adders, an Arithmetic Logic Unit (ALU), registers, and eventually an entire functional, programmable computer CPU architecture. A masterclass in constructionist engineering.",
    "calmHighlights": [
      "Cerebral puzzle engineering with zero time pressure",
      "Zero ads, telemetry, or predatory mechanics",
      "Builds real-world computer hardware comprehension"
    ],
    "platforms": [
      "PC",
      "Mac",
      "Linux (Steam)"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://turingcomplete.game",
    "researchAnchor": "Nisan & Schocken (2005) The Elements of Computing Systems (NAND to CPU)",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  },
  {
    "name": "Lucas & Friends (RV AppStudios)",
    "developer": "RV AppStudios",
    "age": [
      "toddler",
      "preschool"
    ],
    "ageLabel": "Toddlers (Ages 2\u20133) & Preschool (Ages 4\u20135)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Early Phonics, Tracing & Math",
    "cognitiveSkills": [
      "Letter Tracing & Fine Motor",
      "Early Counting & Subitizing",
      "Shape & Color Sorting"
    ],
    "endorsements": [
      "100% Free Philanthropic Initiative",
      "Zero Ads & Zero In-App Purchases",
      "Teacher Approved Badge"
    ],
    "whyEducatorsApprove": "Funded entirely as a philanthropic initiative by RV AppStudios, their suite of early learning apps (ABC Kids Tracing & Phonics, Math Kids, 123 Numbers) contains zero third-party ads, zero paywalls, and zero in-app purchases. Offers calm, distraction-free letter tracing and early counting exercises.",
    "calmHighlights": [
      "100% free forever with zero ads or pop-ups",
      "Parent-locked settings menu",
      "Simple, predictable touch-and-trace mechanics"
    ],
    "platforms": [
      "iOS",
      "Android",
      "Amazon Fire"
    ],
    "monetization": "100% Free (Zero Ads/IAPs)",
    "monetizationType": "free",
    "link": "https://www.rvappstudios.com",
    "researchAnchor": "National Reading Panel (2000) Letter-Sound & Kinesthetic Tracing",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Teach Your Monster to Read",
    "developer": "The Usborne Foundation",
    "age": [
      "preschool",
      "early-elementary"
    ],
    "ageLabel": "Preschool (Ages 4\u20135) & Early Elementary (Ages 6\u20137)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "stem",
    "categoryLabel": "Systematic Synthetic Phonics",
    "cognitiveSkills": [
      "Grapheme-Phoneme Correspondence",
      "Blending & Segmenting",
      "Sight Word Automaticity"
    ],
    "endorsements": [
      "Usborne Foundation Non-Profit",
      "University of Roehampton Vetted",
      "BAFTA Children's Nominee"
    ],
    "whyEducatorsApprove": "Funded by the Usborne Foundation charity and designed with reading academics at the University of Roehampton (UK). Guides children from initial letter sounds through full sentence reading at a calm, self-directed pace without commercial ads or manipulative monetization.",
    "calmHighlights": [
      "100% free on desktop web browser",
      "Zero advertisements or microtransactions",
      "Structured synthetic phonics progression"
    ],
    "platforms": [
      "Web (100% Free)",
      "iOS",
      "Android",
      "Amazon Fire"
    ],
    "monetization": "Free on Web / Paid Mobile App",
    "monetizationType": "free",
    "link": "https://www.teachyourmonster.org",
    "researchAnchor": "Rose (2006) Independent Review of Early Reading & Synthetic Phonics",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Dorfromantik",
    "developer": "Toukana Interactive",
    "age": [
      "early-elementary",
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Ages 6\u201312 (Elementary to Pre-Teen)",
    "stimulusScore": "1/10",
    "stimulusClass": "stimulus-low",
    "category": "spatial",
    "categoryLabel": "Hexagonal Spatial Strategy & Topology",
    "cognitiveSkills": [
      "Spatial Topology & Adjacency",
      "Forward Planning",
      "Pattern Matching & Geometry",
      "Sensory De-escalation"
    ],
    "endorsements": [
      "German Computer Games Award Best Game",
      "BAFTA Debut Game Nominee",
      "Educator Recommended Board-Game Adaptation"
    ],
    "whyEducatorsApprove": "A tranquil hexagonal tile-placement puzzle and strategy game that feels like a living tabletop board game. Players place tiles of forests, windmills, rivers, and train tracks to form harmonious landscapes. Includes a Creative Mode with infinite tiles and zero score pressure.",
    "calmHighlights": [
      "Ultra-low stimulus acoustic soundtrack & birdsong",
      "Turn-based hexagonal placement with zero timers",
      "One-time purchase, 100% offline"
    ],
    "platforms": [
      "PC",
      "Mac",
      "Nintendo Switch"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://toukana.com/dorfromantik/",
    "researchAnchor": "Dunckley (2015) Low-Arousal Spatial Cognition & Tabletop Flow",
    "semBreakdown": "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)"
  },
  {
    "name": "World of Goo 2 / Poly Bridge",
    "developer": "2D Boy & Tomorrow Corporation / Dry Cactus",
    "age": [
      "middle-elementary",
      "preteen"
    ],
    "ageLabel": "Middle Elementary (Ages 8\u20139) & Pre-Teens (Ages 10\u201312)",
    "stimulusScore": "3/10",
    "stimulusClass": "stimulus-low",
    "category": "logic",
    "categoryLabel": "Structural Statics & Civil Engineering",
    "cognitiveSkills": [
      "Triangulation & Structural Load",
      "Center of Mass & Torque",
      "Fluid Dynamics",
      "Iterative Hypothesis Testing"
    ],
    "endorsements": [
      "2024 Indie Engineering Landmark",
      "Used in Middle School STEM & Physics Clubs"
    ],
    "whyEducatorsApprove": "Released in August 2024 (16 years after the original classic), World of Goo 2 and Poly Bridge challenge players to construct bridges, towers, and fluid conduits obeying real-world structural statics, tension, compression, and center-of-gravity physics.",
    "calmHighlights": [
      "Methodical structural experimentation without countdown clocks",
      "Zero microtransactions, battle passes, or ads",
      "Builds tangible civil engineering intuition"
    ],
    "platforms": [
      "PC",
      "Mac",
      "Linux",
      "Nintendo Switch"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://worldofgoo2.com",
    "researchAnchor": "Hirsh-Pasek et al. (2015) Constructivist Physics & Structural Statics",
    "semBreakdown": "Base 1 + Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 3/10)"
  }
];

// Comprehensive Database of 32 Pediatrician- & Dietitian-Vetted Whole Foods & Lunchbox Swaps
const foodsData = [
  // --- DOMAIN 1: BRAIN MYELINATION (DHA, CHOLINE & LUTEIN) ---
  {
    name: "Wild Alaskan Salmon Flakes & Avocado Mash",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Deboned Flakes for Toddlers)",
    category: "brain-dha",
    categoryLabel: "Brain Myelination (DHA, Choline & Lutein)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Breaded Fast-Food Fish Sticks & Commercial Tartar Sauce (Refined seed oils, <15% actual fish, high sodium)",
    wholeFoodSwap: "Wild-caught sockeye or pink salmon flakes gently folded with ripe Hass avocado, lemon juice, and extra-virgin olive oil",
    keyNutrients: ["Preformed Marine DHA & EPA", "Natural Vitamin D3", "Monounsaturated Oleic Acid", "Selenium & Iodine"],
    synergySafety: "Avocado lipids maximize fat-soluble Vitamin D3 absorption; rub salmon flakes between fingers to verify zero pin bones before serving to toddlers (Ages 2–3). Low-mercury FDA/EPA 'Best Choice' species.",
    whyCliniciansApprove: "DHA comprises over 90% of the omega-3 fatty acids in the developing cerebral cortex and retina. Pairing wild salmon with avocado delivers preformed structural phospholipids alongside fat-soluble Vitamin D3 without inflammatory breading.",
    researchAnchor: "Schwarzenberg et al. (2018) AAP First 1,000 Days Policy; Richardson & Montgomery (2005) Oxford-Durham Trial",
    link: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/"
  },
  {
    name: "Pasture-Raised Whole Eggs (Soft-Scrambled or Hard-Boiled Halves)",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "brain-dha",
    categoryLabel: "Brain Myelination (DHA, Choline & Lutein)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Toaster Breakfast Pastries, Sweetened Waffle Mixes & Liquid Egg-White Cartons (Stripped of yolk choline)",
    wholeFoodSwap: "Whole pasture-raised eggs cooked gently in olive oil or grass-fed butter with the nutrient-dense yolk completely intact",
    keyNutrients: ["Choline (147mg/egg for Acetylcholine)", "Macular Lutein & Zeaxanthin", "Vitamin B12 & D3", "Complete Bioavailable Protein"],
    synergySafety: "Over 99% of an egg's choline and neural lutein reside in the lipid-rich yolk; cook both white and yolk thoroughly for young children and maintain regular dietary exposure per NIAID/AAP guidance.",
    whyCliniciansApprove: "Choline is the direct biochemical precursor to acetylcholine—the primary neurotransmitter governing memory encoding, hippocampal neurogenesis, and rapid synaptic signaling in school-age children.",
    researchAnchor: "Schwarzenberg et al. (2018) AAP Policy Statement; NIH Office of Dietary Supplements (Choline)",
    link: "https://ods.od.nih.gov/factsheets/Choline-HealthProfessional/"
  },
  {
    name: "Sardine & Lemon-Herb Ricotta Toast Strips",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Cut into Finger Strips for Ages 2–3)",
    category: "brain-dha",
    categoryLabel: "Brain Myelination (DHA, Choline & Lutein)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Commercial Lunch-Kit Tuna Packets with Sweet Corn-Syrup Relish & Soybean-Oil Mayonnaise",
    wholeFoodSwap: "Wild Atlantic sardines in extra-virgin olive oil mashed with whole-milk ricotta and lemon zest on sprouted whole-grain toast strips",
    keyNutrients: ["Marine DHA & EPA", "Soft-Bone Hydroxyapatite Calcium", "Vitamin B12 & D3", "Coenzyme Q10 & Selenium"],
    synergySafety: "Mash sardines thoroughly with creamy ricotta into a mild, spreadable pâté and slice toast into narrow finger strips for toddlers; lowest trophic-level forage fish with virtually zero methylmercury accumulation.",
    whyCliniciansApprove: "Delivers one of the highest natural concentrations of marine DHA, Vitamin D3, and bioavailable calcium in a single whole food while avoiding predatory-fish heavy metals.",
    researchAnchor: "USDA & HHS (2020) Dietary Guidelines for Americans; Richardson & Montgomery (2005)",
    link: "https://www.fda.gov/food/consumers/advice-about-eating-fish"
  },
  {
    name: "Walnut-Flax-Hemp 'Brain Dust' Porridge & Yogurt Topper",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Finely Milled for Under Age 4)",
    category: "brain-dha",
    categoryLabel: "Brain Myelination (DHA, Choline & Lutein)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Rainbow Sprinkles, Marshmallow Bits & Artificial-Dye Yogurt Toppers (Red 40, Yellow 5, Blue 1)",
    wholeFoodSwap: "Cold-milled raw walnuts, hulled hemp hearts, and ground golden flaxseed stirred into warm oatmeal or plain Greek yogurt",
    keyNutrients: ["Plant Alpha-Linolenic Acid (ALA Omega-3)", "Magnesium & Manganese", "Polyphenol Ellagitannins", "Complete Hemp Edestin Protein"],
    synergySafety: "CRITICAL CDC/AAP CHOKING RULE: Whole nuts are a leading aspiration hazard under age 4—always serve finely milled into a powder/meal or thinned nut butter for toddlers and preschoolers.",
    whyCliniciansApprove: "Combines the highest plant sources of omega-3 ALA, magnesium (essential for NMDA receptor regulation and calm focus), and prebiotic lignans without a single gram of added sugar.",
    researchAnchor: "Jacka et al. (2017) Nutritional Psychiatry; AAP Policy on Prevention of Choking Among Children",
    link: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/choking-hazards.html"
  },
  {
    name: "Hass Avocado, Hemp Heart & Lime Mash on Sprouted Grain Toast",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "brain-dha",
    categoryLabel: "Brain Myelination (DHA, Choline & Lutein)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Margarine / Interesterified Vegetable-Oil Spread on Refined White Sandwich Bread",
    wholeFoodSwap: "Fresh Hass avocado mashed with hulled hemp hearts, lime juice, and a pinch of sea salt on sprouted whole-grain toast",
    keyNutrients: ["Neural & Retinal Lutein", "Monounsaturated Oleic Acid", "Folate (Vitamin B9) & Potassium", "Magnesium & Zinc"],
    synergySafety: "Avocado's monounsaturated lipid matrix increases intestinal carotenoid (lutein and zeaxanthin) absorption by 3x to 5x while lime Vitamin C protects against oxidation.",
    whyCliniciansApprove: "Lutein selectively accumulates in pediatric neural tissue and the macula, where higher macular pigment optical density correlates directly with superior academic and executive performance.",
    researchAnchor: "Schwarzenberg et al. (2018) AAP Neuro-Nutrition Policy; USDA & HHS (2020) Dietary Guidelines",
    link: "https://nutritionsource.hsph.harvard.edu/avocados/"
  },
  {
    name: "Wild Blueberry, Baby Spinach & Pre-Hydrated Chia Kefir Bowl",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Served in Open Bowl with Spoon)",
    category: "brain-dha",
    categoryLabel: "Brain Myelination (DHA, Choline & Lutein)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Shelf-Stable 'Fruit & Veggie' Squeeze Pouches (Boiled High-Fructose Slurry with Zero Chewing Resistance)",
    wholeFoodSwap: "Thick spoonable bowl of plain whole-milk kefir blended with frozen wild blueberries, baby spinach, and pre-hydrated chia seeds",
    keyNutrients: ["Wild Berry Anthocyanins (Flavonoids)", "Non-Heme Iron & Folate", "Pre-Hydrated Chia Omega-3 ALA", "Live Probiotic Cultures"],
    synergySafety: "Serve with a spoon topped with whole/halved berries to engage oral-motor chewing (never a suckable nozzle pouch per ESPGHAN); pre-soak chia seeds 15+ minutes in liquid so they never expand dry in the throat.",
    whyCliniciansApprove: "Double-blind trials by Whyte et al. (2016) demonstrated that wild blueberry anthocyanins acutely improve memory accuracy, delayed word recall, and conflict-resolution reaction time in 7–10-year-old children.",
    researchAnchor: "Whyte et al. (2016) Wild Blueberry Flavonoid RCT; Koletzko et al. (2019) ESPGHAN Pouch Position Paper",
    link: "https://pubmed.ncbi.nlm.nih.gov/26437830/"
  },

  // --- DOMAIN 2: ATTENTION & DOPAMINE (HEME/NON-HEME IRON, ZINC & B12) ---
  {
    name: "Slow-Simmered Grass-Fed Beef & Red Lentil Bolognese",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "iron-focus",
    categoryLabel: "Attention & Dopamine (Iron, Zinc & B12)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Canned Pasta Shapes in High-Fructose Tomato Syrup with Mechanically Separated Poultry Meatballs",
    wholeFoodSwap: "Finely minced grass-fed beef and split red lentils simmered in crushed whole tomatoes, garlic, oregano, and extra-virgin olive oil",
    keyNutrients: ["High-Bioavailability Heme Iron", "Zinc & Vitamin B12", "Prebiotic Lentil Soluble Fiber", "Olive-Oil-Unlocked Lycopene"],
    synergySafety: "The 'MFP Factor' (meat peptide) plus tomato Vitamin C doubles intestinal uptake of non-heme iron from the red lentils; soft minced texture is naturally choking-safe for toddlers (Ages 2–3).",
    whyCliniciansApprove: "Iron is the rate-limiting cofactor for tyrosine hydroxylase (dopamine synthesis) and oligodendrocyte myelination. Lozoff et al. (2006) showed early iron deficiency leaves lasting executive-function deficits.",
    researchAnchor: "Lozoff et al. (2006) Iron Deficiency & Dopamine Transmission; Hallberg et al. (1989) Iron Absorption",
    link: "https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/"
  },
  {
    name: "Tender Chickpeas & Red Bell Pepper Strips with Lemon-Garlic Tahini",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Mash Chickpeas & Steam Peppers for Ages 2–3)",
    category: "iron-focus",
    categoryLabel: "Attention & Dopamine (Iron, Zinc & B12)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Artificially Flavored Nacho-Cheese Tortilla Chips & Jarred 'Cheese' Dip (Yellow 6, Red 40, Maltodextrin)",
    wholeFoodSwap: "Warm tender chickpeas and julienned red bell pepper strips dipped in creamy lemon-garlic sesame tahini dressing",
    keyNutrients: ["Plant Non-Heme Iron & Folate", "High-Dose Vitamin C (Ascorbic Acid)", "Sesame Zinc, Copper & Calcium", "Galacto-Oligosaccharide Prebiotics"],
    synergySafety: "Vitamin C in raw red bell pepper (3x more Vitamin C than an orange) and lemon juice reduces ferric iron (Fe3+) to ferrous iron (Fe2+), tripling plant iron absorption; slightly flatten chickpeas and steam pepper strips for toddlers.",
    whyCliniciansApprove: "Exemplifies clinical nutrient synergy: pairing legume/seed non-heme iron with high-ascorbic-acid produce overcomes phytic acid inhibition without requiring synthetic fortification.",
    researchAnchor: "Hallberg et al. (1989) Ascorbic Acid & Non-Heme Iron Uptake; Schwarzenberg et al. (2018) AAP Policy",
    link: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/"
  },
  {
    name: "Hull-Less Pumpkin Seeds (Pepitas) & Unsulphured Apricot Trail Mix",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Ages 4–12 Whole • Ages 2–3 Ground into Seed Butter",
    category: "iron-focus",
    categoryLabel: "Attention & Dopamine (Iron, Zinc & B12)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 1/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Candy-Coated Chocolate Trail Mix & Bright-Orange Sulfite-Treated Gummy Snacks",
    wholeFoodSwap: "Raw or lightly toasted green pumpkin seeds paired with finely diced dark unsulphured dried apricots (or smooth pumpkin-seed butter for toddlers)",
    keyNutrients: ["Concentrated Plant Zinc & Magnesium", "Non-Heme Iron", "Pro-Vitamin A Carotenoids", "L-Tryptophan (Serotonin/Melatonin Precursor)"],
    synergySafety: "Choose naturally dark-brown unsulphured apricots to avoid E220 sulfur dioxide preservative (a known bronchospasm trigger in asthmatic children); grind pepitas into butter for children under age 4.",
    whyCliniciansApprove: "Zinc is co-released with glutamate in hippocampal mossy fibers to regulate synaptic plasticity and attention; pumpkin seeds and apricots provide a portable, nut-free-classroom-compatible iron and zinc boost.",
    researchAnchor: "Schwarzenberg et al. (2018) AAP Priority Nutrients; CDC Choking Prevention Guidelines",
    link: "https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/"
  },
  {
    name: "Pasture-Raised Chicken Thigh Strips & Lemon-Olive Oil Broccoli Florets",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "iron-focus",
    categoryLabel: "Attention & Dopamine (Iron, Zinc & B12)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Deep-Fried Fast-Food Chicken Nuggets (45% Refined Flour/Starch Breading, Fried in Oxidized Seed Oils)",
    wholeFoodSwap: "Oven-baked dark-meat chicken thigh strips tossed with lightly steamed broccoli florets, fresh lemon juice, and extra-virgin olive oil",
    keyNutrients: ["Myoglobin Heme Iron & Zinc", "Sulforaphane & Vitamin C", "Vitamin B6, B12 & Niacin", "Choline & Taurine"],
    synergySafety: "Dark-meat chicken thighs contain nearly twice the iron and zinc of dry white breast meat and shred into moist, tender strips safe for toddler chewing; broccoli Vitamin C further enhances iron uptake.",
    whyCliniciansApprove: "Replaces ultra-processed nugget breading and phosphate binders with intact muscle protein, bioavailable heme iron, and cruciferous sulforaphane that supports cellular antioxidant pathways.",
    researchAnchor: "Lozoff et al. (2006) Pediatric Iron & Executive Function; Monteiro et al. (2019) NOVA-1 Whole Foods",
    link: "https://fdc.nal.usda.gov/"
  },
  {
    name: "Black Bean, Sweet Potato & Avocado Quesadilla on Nixtamalized Corn Tortilla",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "iron-focus",
    categoryLabel: "Attention & Dopamine (Iron, Zinc & B12)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Frozen Microwave Taco Roll-Ups (Textured Soy Protein Isolate, Maltodextrin, Artificial Smoke & Preservatives)",
    wholeFoodSwap: "Mashed black beans, roasted orange sweet potato, and real cheddar melted inside a 100% stone-ground nixtamalized corn tortilla with lime-avocado mash",
    keyNutrients: ["Nixtamalized Calcium & Unbound Niacin (B3)", "Black Bean Iron, Folate & Molybdenum", "Lipid-Unlocked Beta-Carotene", "Soluble Prebiotic Fiber"],
    synergySafety: "Traditional alkaline lime nixtamalization unlocks bound niacin (Vitamin B3), reduces mycotoxins, and triples corn calcium bioavailability; avocado fats maximize sweet potato Vitamin A uptake.",
    whyCliniciansApprove: "A traditional Mesoamerican food-matrix synergy combining legume amino acids with nixtamalized whole corn for complete protein, steady blood sugar, and iron-rich cognitive stamina.",
    researchAnchor: "USDA & HHS (2020) Dietary Guidelines for Americans; Hallberg et al. (1989)",
    link: "https://www.dietaryguidelines.gov/"
  },
  {
    name: "Steamed Edamame Beans with Sea Salt & Fresh Mandarin Segments",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Shell & Halve/Mash Beans for Ages 2–3)",
    category: "iron-focus",
    categoryLabel: "Attention & Dopamine (Iron, Zinc & B12)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Extruded Soy/Potato Crisps & Artificially Flavored Savory Snack Crackers",
    wholeFoodSwap: "Warm steamed whole green soybeans (edamame) paired with fresh peeled mandarin or clementine segments",
    keyNutrients: ["Complete Plant Protein (All 9 Essential Amino Acids)", "Non-Heme Iron & Folate", "Mandarin Vitamin C & Hesperidin", "Choline & Vitamin K1"],
    synergySafety: "Mandarin Vitamin C unlocks soy non-heme iron against phytates; shell edamame pods, flatten/halve the beans, and remove mandarin seeds/membranes for toddlers (Ages 2–3).",
    whyCliniciansApprove: "Whole green soybeans provide intact plant protein, folate, choline, and iron in a fibrous matrix that requires active hand-to-mouth coordination and chewing rather than mindless snacking.",
    researchAnchor: "Hallberg et al. (1989) Vitamin C Iron Synergy; Schwarzenberg et al. (2018) AAP Policy",
    link: "https://nutritionsource.hsph.harvard.edu/soy/"
  },

  // --- DOMAIN 3: STEADY CLASSROOM GLUCOSE (SLOW OATS, LEGUMES & TUBERS) ---
  {
    name: "Steel-Cut Oats Simmered with Ceylon Cinnamon, Diced Apple & Almond Butter",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "steady-glucose",
    categoryLabel: "Steady Classroom Glucose (Slow Oats, Legumes & Tubers)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Instant Flavored Oatmeal Packets & Frosted Flake Cereals (14–18g Added Sugar + Pulverized Starch)",
    wholeFoodSwap: "Intact steel-cut or thick old-fashioned rolled oats simmered with Ceylon cinnamon, skin-on diced apple, and 100% roasted almond butter",
    keyNutrients: ["Viscous Beta-Glucan Soluble Fiber", "Almond Vitamin E & Magnesium", "Apple Pectin & Quercetin", "Slow-Release Complex Carbohydrates"],
    synergySafety: "Swirl almond butter thoroughly into warm porridge so it is smooth and non-sticky, and simmer apple dices until fork-tender for toddlers (Ages 2–3); use Ceylon cinnamon (low coumarin).",
    whyCliniciansApprove: "Randomized school trials (Ingwersen et al., 2007; Micha et al., 2011) prove that low-GI intact-grain breakfasts preserve secondary memory and sustained classroom attention at 90–150 minutes post-meal.",
    researchAnchor: "Micha et al. (2011) Low-GI Breakfast & Adolescent Cognition; Ingwersen et al. (2007) Appetite",
    link: "https://pubmed.ncbi.nlm.nih.gov/17267070/"
  },
  {
    name: "Cooled & Reheated Sweet Potato Wedges with Grass-Fed Butter & Rosemary",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "steady-glucose",
    categoryLabel: "Steady Classroom Glucose (Slow Oats, Legumes & Tubers)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Frozen Extruded Tater Tots & Fast-Food French Fries (Modified Potato Starch, Dextrose & Industrial Frying Oils)",
    wholeFoodSwap: "Oven-roasted skin-on orange or purple sweet potato wedges cooled in the fridge and gently reheated with grass-fed butter and rosemary",
    keyNutrients: ["Retrograded Type-3 Resistant Starch", "Lipid-Soluble Beta-Carotene", "Potassium & Manganese", "Colonic Butyrate Prebiotics"],
    synergySafety: "Cooling cooked tubers and reheating retrogrades amylose into Type-3 resistant starch (lowering glycemic impact while feeding gut bacteria); butter lipids maximize pro-Vitamin A absorption.",
    whyCliniciansApprove: "Delivers steady complex glucose to the brain (which consumes ~50% of a 5-year-old's daily bodily glucose) while avoiding the glycemic spike-and-crash of extruded potato starch.",
    researchAnchor: "Micha et al. (2011) Glycemic Load & Executive Function; Jacka et al. (2017) Gut-Brain Axis",
    link: "https://nutritionsource.hsph.harvard.edu/carbohydrates/glycemic-index/"
  },
  {
    name: "Sprouted Grain or Long-Fermented Sourdough Toast with 100% Peanut Butter & Smashed Raspberries",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Thin Peanut Butter Layer for Ages 2–3)",
    category: "steady-glucose",
    categoryLabel: "Steady Classroom Glucose (Slow Oats, Legumes & Tubers)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Refined White Bread PB&J with Hydrogenated-Oil Sugar-Sweetened Peanut Spread & High-Fructose Jelly",
    wholeFoodSwap: "Sprouted whole-grain or 24-hour sourdough toast spread thinly with 100% dry-roasted peanuts + fresh fork-smashed raspberries",
    keyNutrients: ["Phytase-Unlocked Grain Zinc & Magnesium", "Raspberry Ellagic Acid & Fiber (8g/cup)", "Peanut Niacin (B3), Vitamin E & Arginine", "Low-Glycemic Organic Acids"],
    synergySafety: "Grain sprouting and sourdough lacto-fermentation activate endogenous phytase to break down phytic acid; thin peanut butter with warm water or berry mash for toddlers so globs never obstruct the airway.",
    whyCliniciansApprove: "Replaces 22g of refined jelly/bread sugar with intact berry seeds/pectin and organic sourdough acids that slow gastric emptying and sustain morning working memory.",
    researchAnchor: "NIAID (2017) LEAP Peanut Allergy Prevention; Micha et al. (2011) Low-GI Breakfasts",
    link: "https://www.niaid.nih.gov/Zero-Peanut-Allergy-Guidelines"
  },
  {
    name: "Warm Quinoa, Black Bean, Sweet Corn & Avocado School Thermos Bowl",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "steady-glucose",
    categoryLabel: "Steady Classroom Glucose (Slow Oats, Legumes & Tubers)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Instant Fried Ramen / Cup Noodles (Palm-Oil-Fried Refined Flour, 1,100mg Sodium, Maltodextrin & TBHQ)",
    wholeFoodSwap: "Fluffy tri-color quinoa tossed with black beans, roasted sweet corn, diced avocado, cilantro, and lime in an insulated lunchbox thermos",
    keyNutrients: ["Complete Quinoa-Legume Protein (All 9 Amino Acids)", "Magnesium, Iron & Folate", "Corn Lutein & Zeaxanthin", "High-Satiety Soluble & Insoluble Fiber"],
    synergySafety: "Rinse quinoa before cooking to remove bitter saponins; gently mash beans and corn kernels for toddlers (Ages 2–3) to ensure safe mastication.",
    whyCliniciansApprove: "Prevents the afternoon post-lunch glycemic dip and irritability associated with refined-flour school lunches, supplying magnesium and B-vitamins for afternoon problem solving.",
    researchAnchor: "Zahedi et al. (2014) Junk Food vs. Whole Dietary Quality; Ingwersen et al. (2007)",
    link: "https://nutritionsource.hsph.harvard.edu/food-features/quinoa/"
  },
  {
    name: "Whole-Buckwheat, Ripe Banana & Pasture-Egg Silver-Dollar Pancakes",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "steady-glucose",
    categoryLabel: "Steady Classroom Glucose (Slow Oats, Legumes & Tubers)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Boxed White-Flour Pancake Mix Drenched in High-Fructose 'Pancake Syrup' (Caramel Color & Artificial Maple)",
    wholeFoodSwap: "Blender batter of 100% whole buckwheat groats/flour, mashed ripe banana, pasture-raised eggs, and cinnamon topped with warm crushed berries",
    keyNutrients: ["Buckwheat Rutin & D-Chiro-Inositol", "Egg Choline & Vitamin B12", "Banana Potassium & Vitamin B6", "Naturally Gluten-Free Resistant Starch"],
    synergySafety: "Buckwheat is a dicot pseudocereal (unrelated to wheat) rich in D-chiro-inositol that supports insulin signaling; soft silver-dollar cakes are easy for toddlers to self-feed without sticky syrup.",
    whyCliniciansApprove: "Eliminates the 35–45g liquid high-fructose corn syrup bolus of commercial pancake breakfasts while delivering choline, bioflavonoids, and steady glucose.",
    researchAnchor: "Vos et al. (2017) AHA Added Sugars Statement; Micha et al. (2011) Low-GI Cognition",
    link: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/sugar-recommendation-healthy-kids-and-teens-infographic"
  },

  // --- DOMAIN 4: SKELETAL & CRANIOFACIAL GROWTH (CA, D3, K2 & MG) ---
  {
    name: "Plain Full-Fat (5%) Greek Yogurt Parfait with Mashed Strawberries & Hemp Hearts",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "bone-growth",
    categoryLabel: "Skeletal & Craniofacial Growth (Ca, D3, K2 & Mg)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Sweetened Kids' Yogurt Tubes & Cookie-Crumble Flip Cups (14–18g Added Sugar, Red 40, Blue 1 & Carrageenan)",
    wholeFoodSwap: "Unsweetened plain whole-milk Greek yogurt swirled with fresh mashed strawberries, hulled hemp hearts, and a dash of vanilla bean or cinnamon",
    keyNutrients: ["Bioavailable Calcium & Phosphorus", "Menaquinone-4 (Vitamin K2 in Full-Fat Dairy)", "Dense Casein & Whey Protein", "Live Lactic Acid Probiotics"],
    synergySafety: "Full-fat dairy retains fat-soluble Vitamin K2 (MK-4), which activates osteocalcin to direct calcium into growing bone matrix; hemp hearts add magnesium required for parathyroid hormone regulation.",
    whyCliniciansApprove: "Commercial kids' yogurts often contain more sugar per ounce than cola plus synthetic dyes (McCann et al., 2007). Plain whole-milk Greek yogurt delivers double the protein and zero added sugar.",
    researchAnchor: "Golden et al. (2014) AAP Bone Building Clinical Report; McCann et al. (2007) Lancet",
    link: "https://publications.aap.org/pediatrics/article/134/4/e1229/32964/Optimizing-Bone-Health-in-Children-and-Adolescents"
  },
  {
    name: "Aged Grass-Fed Cheddar Slices, Crisp Skin-On Apple & Seeded Whole-Grain Crackers",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Ages 4–12 Crisp Wedges • Ages 2–3 Paper-Thin or Grated Apple",
    category: "bone-growth",
    categoryLabel: "Skeletal & Craniofacial Growth (Ca, D3, K2 & Mg)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Pre-Packaged 'Lunch Kits' (Pasteurized Prepared Cheese Product with Sodium Phosphate + Nitrite Ham + Candy)",
    wholeFoodSwap: "Real aged grass-fed cheddar slices, crisp skin-on apple wedges, and high-fiber flax/sesame whole-grain crackers",
    keyNutrients: ["Calcium & Long-Chain Vitamin K2 (MK-7/MK-9 from Aging)", "Apple Pectin & Quercetin", "Phosphorus & Vitamin A", "Masticatory Jaw-Arch Loading"],
    synergySafety: "Chewing firm raw apple and aged cheddar stimulates alkaline saliva (buffering dental plaque acids) and loads the mandible for healthy dental arch growth; grate or slice apples paper-thin for toddlers under 4.",
    whyCliniciansApprove: "Bacterial fermentation during traditional cheese aging synthesizes menaquinones (Vitamin K2) and degrades lactose, while avoiding the endocrine-disrupting phthalates and phosphates of processed cheese slices.",
    researchAnchor: "Golden et al. (2014) AAP Bone Report; Koletzko et al. (2019) Oral-Motor & Dental Health",
    link: "https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/"
  },
  {
    name: "Canned Wild Pink Salmon Salad (with Soft Crushable Bones) in Cucumber Boats",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "bone-growth",
    categoryLabel: "Skeletal & Craniofacial Growth (Ca, D3, K2 & Mg)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Imitation Crab Sticks (Pulverized Surimi Starch, Sorbitol, MSG, Carmine/Paprika Color & Phosphate Binders)",
    wholeFoodSwap: "Wild pink salmon (with its pressure-softened calcium-rich bones mashed right in) mixed with Greek yogurt, dill, and lemon in crisp cucumber boats",
    keyNutrients: ["Microcrystalline Hydroxyapatite Bone Calcium", "Natural Cholecalciferol (Vitamin D3: 500+ IU)", "Marine DHA & EPA", "Phosphorus & Iodine"],
    synergySafety: "Pressure canning renders salmon bones completely soft and crushable with a fork—mashing them into the yogurt dressing makes them imperceptible and 100% choking-safe while adding ~200mg natural bone calcium.",
    whyCliniciansApprove: "Very few whole foods naturally contain high-dose Vitamin D3 alongside hydroxyapatite calcium and phosphorus in the exact physiological ratio required for pediatric skeletal mineralization.",
    researchAnchor: "Golden et al. (2014) AAP Calcium & Vitamin D Report; Schwarzenberg et al. (2018)",
    link: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/"
  },
  {
    name: "Calcium-Set Organic Tofu, Baby Bok Choy & UV-Shiitake Miso-Sesame Bowl",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "bone-growth",
    categoryLabel: "Skeletal & Craniofacial Growth (Ca, D3, K2 & Mg)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "High-Sodium Flavored Instant Noodle Bricks (Fried in Palm Oil with TBHQ & Artificial Flavor Packets)",
    wholeFoodSwap: "Organic firm tofu set with calcium sulfate, steamed baby bok choy, and sunlight/UV-exposed shiitake mushrooms in a mild miso-sesame broth with buckwheat soba",
    keyNutrients: ["Low-Oxalate Bioavailable Calcium (Bok Choy + Tofu)", "Ergocalciferol Vitamin D2 (UV-Shiitake)", "Vitamin K1 (Osteocalcin Cofactor)", "Fermented Miso Isoflavones & Zinc"],
    synergySafety: "Unlike spinach (whose high oxalic acid binds 95% of its calcium), baby bok choy is low-oxalate with >50% calcium absorption—making it the premier plant-based bone builder for dairy-free children.",
    whyCliniciansApprove: "Provides a complete dairy-free skeletal growth matrix combining high-absorption cruciferous calcium, tofu calcium/protein, Vitamin K1, and mushroom Vitamin D.",
    researchAnchor: "Golden et al. (2014) AAP Bone Health Report; USDA & HHS (2020) Dietary Guidelines",
    link: "https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/"
  },
  {
    name: "Homemade Bone Broth & Chickpea Pastina Soup with Sweet Peas & Parmigiano-Reggiano",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "bone-growth",
    categoryLabel: "Skeletal & Craniofacial Growth (Ca, D3, K2 & Mg)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Canned Condensed Noodle Soups (High Sodium, Autolyzed Yeast Extract, Disodium Inosinate & Mushy White Noodles)",
    wholeFoodSwap: "Slow-simmered chicken or beef bone broth with chickpea/whole-wheat pastina stars, sweet green peas, diced carrots, and 24-month aged Parmigiano-Reggiano",
    keyNutrients: ["Collagen Peptides (Glycine, Proline & Hydroxyproline)", "Aged Parmesan Calcium & Phosphorus", "Vitamin K1 & Beta-Carotene", "Legume Iron & Fiber"],
    synergySafety: "Simmering bone broth with a splash of apple cider vinegar leaches trace minerals while extracting gelatin/collagen; small pastina stars and tender peas are ideal for toddlers.",
    whyCliniciansApprove: "Growing bones are ~30% flexible Type-1 collagen matrix (osteoid) by volume before calcium mineralizes onto them; pairing collagen amino acids with aged Parmesan calcium supports both tensile strength and bone density.",
    researchAnchor: "Golden et al. (2014) AAP Bone Building; Monteiro et al. (2019) NOVA-1 Culinary Preparations",
    link: "https://www.dietaryguidelines.gov/"
  },

  // --- DOMAIN 5: MICROBIOME & POLYPHENOLS (FERMENTED FOODS & BERRIES) ---
  {
    name: "Plain Whole-Milk Kefir & Mango-Turmeric Golden Probiotic Cup",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Served in Open Cup or Straw Cup)",
    category: "gut-immune",
    categoryLabel: "Microbiome & Polyphenols (Fermented Foods & Berries)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Commercial Sweetened 'Kids Probiotic' Shots (15g Cane Sugar, Carrageenan, Polysorbate 80 & Red 40)",
    wholeFoodSwap: "Plain fermented whole-milk kefir (12+ live bacterial and beneficial yeast strains) blended with frozen mango chunks, a pinch of turmeric, and black pepper",
    keyNutrients: ["Multi-Strain Live Probiotics (Lactobacillus & Kefiran)", "Piperine-Activated Curcuminoids", "Mango Vitamin C, Vitamin A & Folate", "Bioavailable Calcium"],
    synergySafety: "A tiny pinch of black pepper piperine increases turmeric curcumin bioavailability by up to 2,000%, while kefir lipids aid fat-soluble absorption; zero emulsifiers that erode the gut mucus layer.",
    whyCliniciansApprove: "Over 90% of peripheral serotonin is synthesized by enterochromaffin cells in the gut regulated by commensal microbes. Fermented whole kefir colonizes the gut-brain axis without refined sugar.",
    researchAnchor: "Jacka et al. (2017) Gut-Brain Microbiome Axis; Hall et al. (2019) NIH Ultra-Processed Trial",
    link: "https://pubmed.ncbi.nlm.nih.gov/31105044/"
  },
  {
    name: "Rainbow Veggie Crudités (Carrots, Snap Peas & Bell Peppers) with Lemon-Garlic Hummus",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Ages 4–12 Raw Crunch • Ages 2–3 Par-Steamed or Ribbon-Grated",
    category: "gut-immune",
    categoryLabel: "Microbiome & Polyphenols (Fermented Foods & Berries)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Extruded 'Veggie Straws' & Ranch Potato Crisps (Potato Starch Fried in Canola/Corn Oil with Trace Spinach Powder)",
    wholeFoodSwap: "Crisp rainbow carrot sticks, sugar snap peas, and cucumber spears dipped in extra-virgin-olive-oil chickpea-tahini hummus",
    keyNutrients: ["Intact Plant Cell-Wall Prebiotic Fibers", "Alpha- & Beta-Carotene + Lutein", "Chickpea Galacto-Oligosaccharides", "Tahini Sesame Lignans & Calcium"],
    synergySafety: "CRITICAL CDC/AAP CHOKING RULE: Raw hard carrot rounds/sticks are a top choking hazard under age 4—always par-steam carrots until fork-tender or grate into thin ribbons for toddlers (Ages 2–3).",
    whyCliniciansApprove: "Exposes the deception of 'Veggie Straws' (which contain zero intact plant cells) by delivering true cellular fiber that feeds short-chain fatty acid (butyrate) production and exercises chewing muscles.",
    researchAnchor: "Hall et al. (2019) NIH Intact Matrix vs. UPF; CDC Infant & Toddler Choking Prevention",
    link: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/choking-hazards.html"
  },
  {
    name: "Firm Green-Tipped Banana Halves with Almond Butter, Hemp Hearts & Ceylon Cinnamon",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "gut-immune",
    categoryLabel: "Microbiome & Polyphenols (Fermented Foods & Berries)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Packaged Mini Frosted Donuts & Snack Cakes (Partially Hydrogenated Oils, Mono- & Diglycerides, Polysorbate 60)",
    wholeFoodSwap: "Lengthwise-split firm (barely ripe) banana spread thinly with 100% roasted almond butter and sprinkled with hemp hearts and Ceylon cinnamon",
    keyNutrients: ["Type-2 Resistant Starch & Inulin Prebiotics", "Pyridoxine (Vitamin B6 for GABA/Serotonin)", "Potassium & Magnesium", "Tocopherol (Vitamin E)"],
    synergySafety: "Barely-ripe bananas retain high Type-2 resistant starch that resists small-intestine amylase to ferment into anti-inflammatory butyrate in the colon; almond fats further blunt glucose rise.",
    whyCliniciansApprove: "Provides prebiotic inulin and Vitamin B6 (essential cofactor for converting tryptophan to serotonin and glutamate to calming GABA) without synthetic emulsifiers that disrupt tight junctions.",
    researchAnchor: "Jacka et al. (2017) Nutritional Psychiatry; Monteiro et al. (2019) NOVA Classification",
    link: "https://nutritionsource.hsph.harvard.edu/bananas/"
  },
  {
    name: "Warm Stewed Cinnamon Apples (Peel-On Pectin Gel) with Toasted Rolled Oats",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "gut-immune",
    categoryLabel: "Microbiome & Polyphenols (Fermented Foods & Berries)",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Sweetened Commercial Applesauce Cups & Squeeze Pouches (Peeled, Boiled & Sweetened with High-Fructose Corn Syrup)",
    wholeFoodSwap: "Unpeeled diced apples gently stewed with water, Ceylon cinnamon, and vanilla bean until tender and glossy—topped with toasted rolled oats and yogurt",
    keyNutrients: ["Cross-Linked Soluble Apple Pectin", "Apple-Peel Quercetin & Catechin Polyphenols", "Oat Beta-Glucan", "Akkermansia-Supporting Prebiotics"],
    synergySafety: "Keeping the crimson apple peel intact preserves 300% more quercetin flavonoids, while gentle stewing releases soluble pectin gel and makes the fruit completely soft and choking-safe for toddlers.",
    whyCliniciansApprove: "Cooked apple pectin acts as a selective prebiotic substrate for *Akkermansia muciniphila* and *Faecalibacterium prausnitzii*, strengthening intestinal barrier integrity after illness or antibiotics.",
    researchAnchor: "Hall et al. (2019) NIH Study; Zahedi et al. (2014) Dietary Quality & Behavior",
    link: "https://nutritionsource.hsph.harvard.edu/food-features/apples/"
  },
  {
    name: "Refrigerated Lacto-Fermented Dill Pickles, Castelvetrano Olives & Hummus Mezze",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Ages 4–12 Spears • Ages 2–3 Finely Quartered Lengthwise",
    category: "gut-immune",
    categoryLabel: "Microbiome & Polyphenols (Fermented Foods & Berries)",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 1/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Neon-Green Relish & Shelf-Stable Dill Pickles (Yellow 5 Tartrazine, Blue 1, Polysorbate 80 & Sodium Benzoate)",
    wholeFoodSwap: "Refrigerated brine-fermented cucumber pickles (water, cucumbers, garlic, dill, sea salt—zero vinegar or dye), pitted olives, and hummus",
    keyNutrients: ["Live Lacto-Fermented Lactic Acid Bacteria", "Olive Hydroxytyrosol Polyphenols & Oleic Acid", "Vitamin K1", "Chickpea Prebiotic Fiber"],
    synergySafety: "Scored 1/2 on Additives solely for natural fermentation sea-salt brine (pair with potassium-rich fresh cucumber/tomatoes); always pit and slice olives and pickles lengthwise into thin strips for children under 4.",
    whyCliniciansApprove: "Commercial shelf-stable pickles are dead pasteurized cucumbers dyed with Tartrazine (Yellow 5—implicated in McCann et al., 2007). Refrigerated salt-brine pickles deliver live *Lactiplantibacillus plantarum*.",
    researchAnchor: "McCann et al. (2007) Lancet Southampton Trial; OEHHA (2021) Synthetic Food Dye Assessment",
    link: "https://oehha.ca.gov/risk-assessment/report/health-effects-assessment-potential-neurobehavioral-effects-synthetic-food-dyes-children"
  },

  // --- DOMAIN 6: SUPERMARKET & LUNCHBOX UPF TRAP SWAPS ---
  {
    name: "Whole Fresh Strawberries, 100% Freeze-Dried Berry Crisps & 70% Dark Cacao Chips",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Quarter Berries for Ages 2–3)",
    category: "lunchbox-swaps",
    categoryLabel: "Supermarket & Lunchbox UPF Trap Swaps",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 1/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "'Real Fruit' Gummies, Fruit Roll-Ups & Chewable Fruit Snacks (Corn Syrup, Red 40, Yellow 5, Carnauba Wax)",
    wholeFoodSwap: "Fresh whole strawberries or single-ingredient freeze-dried strawberry slices paired with a few 70%+ dark chocolate chips and pumpkin seeds",
    keyNutrients: ["Intact Vitamin C, Folate & Ellagic Acid", "Cacao Flavanols, Iron & Magnesium", "Zero Petroleum Dyes (No Red 40 / Yellow 5)", "Non-Sticky Dental Clearance"],
    synergySafety: "Commercial gummy 'fruit snacks' cement sucrose into molar fissures for hours and drive dental caries; fresh berries and dark cacao flavanols clear rapidly from enamel while Vitamin C boosts cacao iron uptake.",
    whyCliniciansApprove: "Directly replaces the #1 deceptive 'health halo' lunchbox snack with real cellular fruit polyphenols and dark cacao flavanols that support cerebral blood flow without synthetic dye hyperactivity triggers.",
    researchAnchor: "Vos et al. (2017) AHA Added Sugars Statement; OEHHA (2021) Synthetic Food Dye Report",
    link: "https://oehha.ca.gov/risk-assessment/report/health-effects-assessment-potential-neurobehavioral-effects-synthetic-food-dyes-children"
  },
  {
    name: "Stovetop Popcorn in Avocado Oil with Savory B-Vitamin Nutritional Yeast ('Cheesy' Crunch)",
    age: ["preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Ages 4–12 Only (Strict AAP Choking Gate: Not for Under Age 4)",
    category: "lunchbox-swaps",
    categoryLabel: "Supermarket & Lunchbox UPF Trap Swaps",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 1/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Extruded 'Cheese' Puffs, Doritos & Neon Goldfish Crackers (Maltodextrin, MSG, Yellow 5 Tartrazine & Yellow 6 Sunset Yellow)",
    wholeFoodSwap: "Organic butterfly popcorn kernels popped on the stovetop in avocado/coconut oil and dusted with savory unfortified/B-complex nutritional yeast and sea salt",
    keyNutrients: ["100% Intact Whole-Grain Pericarp Polyphenols (Ferulic Acid)", "Natural B-Complex Vitamins (B1, B2, B6, B12)", "Complete Yeast Amino Acids & Beta-Glucans", "Zero Synthetic Azo Dyes"],
    synergySafety: "STRICT AAP AGE GATE: Popcorn hulls and kernels are a leading aspiration hazard for children under age 4—restricted to Preschool (Ages 4–5) through Pre-Teen (10–12). For Toddlers (2–3), serve thin whole-grain sesame flatbread crackers.",
    whyCliniciansApprove: "Gives elementary kids the savory, 'cheesy' finger-food crunch they crave in lunchboxes while replacing extruded starch and Yellow 5/6 neuro-irritants with whole-grain fiber and B-vitamins.",
    researchAnchor: "McCann et al. (2007) Lancet Southampton Trial; AAP Policy on Prevention of Choking Among Children",
    link: "https://publications.aap.org/pediatrics/article/125/3/601/72642/Policy-Statement-Prevention-of-Choking-Among"
  },
  {
    name: "Chilled Sparkling Water Infused with Crushed Pomegranate Arils, Orange Wheels & Mint",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Flat Filtered Infused Water for Ages 2–3)",
    category: "lunchbox-swaps",
    categoryLabel: "Supermarket & Lunchbox UPF Trap Swaps",
    nfiScore: "1/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 1/10)",
    trapReplaced: "Neon Sports Drinks, 'Fruit Punch' Pouches & Diet Sodas (35g Liquid Fructose/Sucrose or Sucralose + Red 40 / Blue 1)",
    wholeFoodSwap: "Cold filtered or lightly sparkling water infused with a splash of crushed pomegranate arils, fresh orange slices, and crushed mint leaves",
    keyNutrients: ["Zero Liquid Free Sugars (0g Added Sugar)", "Pomegranate Punicalagin Antioxidants", "Citrus Vitamin C & Bioflavonoids", "Optimal Cellular & Cerebral Hydration"],
    synergySafety: "Serve flat fruit-infused water or open-cup milk to toddlers (Ages 2–3) per RWJF/AAP/AND consensus; even 2% mild dehydration impairs pediatric working memory and visual-motor tracking.",
    whyCliniciansApprove: "The American Heart Association (Vos et al., 2017) and Healthy Eating Research consensus (Lott et al., 2019) identify sugar-sweetened beverages as the single largest source of hepatic fructose overload in children.",
    researchAnchor: "Vos et al. (2017) AHA Added Sugars Statement; Lott et al. (2019) Healthy Beverage Consensus",
    link: "https://healthyeatingresearch.org/research/consensus-statement-healthy-beverage-consumption-in-early-childhood-recommendations-from-key-national-health-and-nutrition-organizations/"
  },
  {
    name: "No-Bake Rolled Oat, SunButter, Chia & Whole-Date Energy Bites (100% Nut-Free School Safe)",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Roll Soft & Bite-Sized for Ages 2–3)",
    category: "lunchbox-swaps",
    categoryLabel: "Supermarket & Lunchbox UPF Trap Swaps",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 0/2 • Glycemic: 1/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Commercial Dip-Coated Granola Bars (High-Fructose Brown Rice Syrup, Palm Kernel Oil, Soy Lecithin & Caramel Color)",
    wholeFoodSwap: "Old-fashioned rolled oats, unsweetened sunflower seed butter, chia seeds, shredded coconut, and whole Medjool dates pulsed into soft bite-sized spheres",
    keyNutrients: ["Sunflower Seed Vitamin E, Selenium & Zinc", "Oat Beta-Glucan & Chia Omega-3 ALA", "Whole-Date Fiber, Potassium & Magnesium", "Zero Refined Syrups or Emulsifiers"],
    synergySafety: "100% peanut-free and tree-nut-free to comply with strict classroom allergy policies; blending whole Medjool dates retains their cellular fiber matrix, blunting the glycemic spike of liquid syrups.",
    whyCliniciansApprove: "Replaces ultra-processed candy-bar masqueraders ('granola bars') with an intact seed-and-oat matrix rich in Vitamin E and slow-release complex carbohydrates.",
    researchAnchor: "Hall et al. (2019) NIH Ultra-Processed Trial; Micha et al. (2011) Low-GI School Nutrition",
    link: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(19)30248-7"
  },
  {
    name: "Oven-Roasted Rosemary Turkey Breast, Cucumber Rounds & Hummus in Whole-Wheat Pita",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12",
    category: "lunchbox-swaps",
    categoryLabel: "Supermarket & Lunchbox UPF Trap Swaps",
    nfiScore: "2/10",
    stimulusClass: "stimulus-low",
    nfiBreakdown: "Base 1 + Matrix: 1/2 • Glycemic: 0/2 • Nutrients: 0/2 • Additives: 0/2 • Texture: 0/2 (Total: 2/10)",
    trapReplaced: "Pre-Packaged Nitrite-Cured Deli Combos (Bologna/Ham Preserved with Sodium Nitrite, Sodium Phosphate & Carrageenan)",
    wholeFoodSwap: "Thick-sliced real oven-roasted turkey breast (seasoned only with olive oil, rosemary, and garlic—zero nitrites or celery-powder nitrates) in a whole-wheat pita with hummus and cucumber",
    keyNutrients: ["Complete Lean Protein & L-Tryptophan", "Vitamin B6, B12, Niacin & Selenium", "Zero N-Nitroso Carcinogen Precursors", "Whole-Wheat Arabinoxylan Fiber"],
    synergySafety: "Avoids both synthetic sodium nitrite (E250) and deceptive 'uncured' celery-juice-powder nitrates (which form identical endogenous nitrosamines in the stomach); shred turkey thinly for toddlers.",
    whyCliniciansApprove: "Pediatric oncology and WHO/IARC guidelines advise minimizing nitrite-cured processed meats in children's daily school lunches; real roasted poultry with hummus delivers clean iron, zinc, and B-vitamins.",
    researchAnchor: "Monteiro et al. (2019) NOVA Classification; USDA & HHS (2020) Dietary Guidelines for Americans",
    link: "https://www.who.int/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat"
  }
];

// Comprehensive Database of 26 Screen-Free Audio, Podcasts & Living Books (Pillar 4: Listen & Read)
const listenReadData = [
  // --- DOMAIN 1: STEM & CURIOSITY PODCASTS (5 ITEMS) ---
  {
    name: "Brains On! Science Podcast for Kids",
    creator: "American Public Media (Molly Bloom & Kid Co-Hosts)",
    age: ["early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Early Elem (6–7), Middle Elem (8–9) & Pre-Teen (10–12)",
    category: "stem-podcast",
    categoryLabel: "STEM & Curiosity Podcasts",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)",
    trapReplaced: "Backseat YouTube Shorts & Hyper-Edited 'Science Stunt' Videos (MrBeast-Style Rapid Cuts)",
    whyEducatorsApprove: "Co-hosted each week by a real child and interviewed university scientists. Without screen visuals doing the work, children must construct mental models of sound waves, tectonic plates, and microbiology in their own visual association cortex.",
    languageSkills: ["Default Mode Network Visual Imagery", "Tier-2 & Tier-3 STEM Vocabulary", "Hypothesis & Mystery Deduction", "Sustained 25-Min Auditory Working Memory"],
    dialogicPrompt: "Pause during the 'Mystery Sound' segment before the answer is revealed and ask: 'Close your eyes—what material (metal, water, wood) do you picture making that vibration?'",
    startWith: ["How Do Airplanes Stay in the Sky?", "Why Do Dogs Sniff Butts?", "The Secret Life of Soil & Fungi"],
    researchAnchor: "Hutton et al. (2018) Pediatrics 'Goldilocks' fMRI Study; Romeo et al. (2018) Conversational Turn-Taking",
    link: "https://www.brainson.org/"
  },
  {
    name: "But Why: A Podcast for Curious Kids",
    creator: "Vermont Public / NPR (Jane Lindholm & Melo)",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Elementary (6–9)",
    category: "stem-podcast",
    categoryLabel: "STEM & Curiosity Podcasts",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Dinner-Prep Tablet Pacification &Loud Commercial Kids' YouTube Channels",
    whyEducatorsApprove: "Features a warm, unhurried public-radio cadence with zero frantic sound effects. Real young children submit voice recordings of their biggest questions, which are answered directly by naturalists, astronomers, and pediatricians.",
    languageSkills: ["Question Formulation & Inquiry Syntax", "Calm Prosodic Listening", "Causal Reasoning ('Why / Because')", "Receptive Language Comprehension"],
    dialogicPrompt: "After listening, record a 15-second voice memo with your child on your phone asking their own 'Why?' question and brainstorm two testable guesses together.",
    startWith: ["Why Is the Sky Blue?", "How Do Caterpillars Turn Into Butterflies?", "Why Do People Have Different Skin Colors?"],
    researchAnchor: "Romeo et al. (2018) Psychological Science Conversational Turns & Broca's White Matter",
    link: "https://www.vermontpublic.org/podcast/but-why-a-podcast-for-curious-kids"
  },
  {
    name: "Wow in the World",
    creator: "Tinkercast (Mindy Thomas & Guy Raz)",
    age: ["preschool", "early-elementary", "middle-elementary"],
    ageLabel: "Preschool (4–5) & Elementary (6–9)",
    category: "stem-podcast",
    categoryLabel: "STEM & Curiosity Podcasts",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)",
    trapReplaced: "Afternoon Cartoon Binging & Fast-Paced Animated Sci-Fi Shows",
    whyEducatorsApprove: "Translates newly published peer-reviewed scientific papers into theater-of-the-mind audio expeditions. Scored 1/2 on Audio for theatrical character voices while maintaining 0/2 visual stimulus and 100% screen-free imagination.",
    languageSkills: ["Narrative-to-Concept Mapping", "Mental Scene Construction", "Scientific Method Literacy", "Humorous Wordplay & Idioms"],
    dialogicPrompt: "Ask at the dinner table: 'What was the real-world scientific study Mindy and Guy talked about today, and how could we draw it on a napkin?'",
    startWith: ["The Great Pancake Freeze", "Octopus Brains in Nine Places", "Tardigrades: The Indestructible Water Bears"],
    researchAnchor: "Hutton et al. (2018) Pediatrics Audio vs. Video fMRI Connectivity",
    link: "https://tinkercast.com/shows/wow-in-the-world/"
  },
  {
    name: "Tumble Science Podcast for Kids",
    creator: "Tumble Media (Science Journalist Lindsay Patterson & Teacher Marshall Escamilla)",
    age: ["early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Early Elem (6–7), Middle Elem (8–9) & Pre-Teen (10–12)",
    category: "stem-podcast",
    categoryLabel: "STEM & Curiosity Podcasts",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Algorithmic '5-Minute Crafts' & Clickbait Science Videos",
    whyEducatorsApprove: "Called 'Radiolab for kids,' Tumble focuses not just on scientific facts, but on *how* scientists know what they know—teaching epistemic humility, failed experiments, and peer review through calm storytelling.",
    languageSkills: ["Epistemic Reasoning & Evidence Evaluation", "Academic Tier-2 Discourse", "Auditory Sequence Retention", "Active Listening Focus"],
    dialogicPrompt: "Ask your child: 'What did the scientist in this episode think was true at first, and what clue changed their mind?'",
    startWith: ["The Cave of the Glowing Skulls", "The Whale Poop Expedition", "How Do We Know Dinosaurs Had Feathers?"],
    researchAnchor: "Hirsh-Pasek et al. (2015) Active Minds-On Inquiry; Hutton et al. (2018) Pediatrics",
    link: "https://www.sciencepodcastforkids.com/"
  },
  {
    name: "Moment of Um (Daily 3-Minute Micro-Inquiry)",
    creator: "APM Studios (Brains On! Universe)",
    age: ["preschool", "early-elementary", "middle-elementary"],
    ageLabel: "Preschool (4–5) & Elementary (6–9)",
    category: "stem-podcast",
    categoryLabel: "STEM & Curiosity Podcasts",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "60-Second YouTube Shorts, TikTok Loops & Toothbrushing Screen Videos",
    whyEducatorsApprove: "A single 3-minute screen-free question answered each day by an expert—perfectly sized for morning toothbrushing, tying shoes, or a short drive to school without triggering a visual dopamine loop.",
    languageSkills: ["Concise Auditory Attention", "Daily Fact Retention", "Micro-Habit Transition Routine", "Oral Retelling Practice"],
    dialogicPrompt: "Play one 3-minute episode while brushing teeth, then challenge your child to summarize the answer in 1 sentence before getting into the car.",
    startWith: ["Why Do Cats Purr?", "How Do Glow Sticks Glow?", "Why Do Onions Make Us Cry?"],
    researchAnchor: "Lillard & Peterson (2011) Executive Function Protection; Hutton et al. (2018)",
    link: "https://www.brainson.org/page/moment-of-um"
  },

  // --- DOMAIN 2: CALM FOLKLORE & BEDTIME PODCASTS (5 ITEMS) ---
  {
    name: "Circle Round (WBUR / NPR Global Folktales)",
    creator: "WBUR Boston Public Radio (Rebecca Sheir & Live Acoustic Musicians)",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Elementary (6–9)",
    category: "story-podcast",
    categoryLabel: "Calm Folklore & Bedtime Podcasts",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Pre-Bedtime Cartoons & Tablet Shows (Blue-Light Melatonin Suppression)",
    whyEducatorsApprove: "Adapts folktales from around the world into 15–20 minute radio plays scored entirely with live acoustic instruments (cello, harp, clarinet, acoustic guitar) and ends every episode with a structured family conversation prompt.",
    languageSkills: ["Cross-Cultural Narrative Schema", "Moral & Perspective-Taking Inference", "Acoustic Musical Appreciation", "Expressive Vocabulary"],
    dialogicPrompt: "Use Circle Round's closing 'Now it's your turn' question before lights-out to practice 3 back-and-forth conversational turns (Romeo et al., 2018).",
    startWith: ["The Violin in the Forest", "The Tortoise and the Geese", "The Magic Soup Pot"],
    researchAnchor: "Hutton et al. (2018) Pediatrics fMRI Study; Chang et al. (2015) PNAS Melatonin Protection",
    link: "https://www.wbur.org/circleround"
  },
  {
    name: "Stories Podcast (Classic Fables & Original Literary Tales)",
    creator: "Amanda Weldin & Daniel Hines",
    age: ["preschool", "early-elementary", "middle-elementary"],
    ageLabel: "Preschool (4–5) & Elementary (6–9)",
    category: "story-podcast",
    categoryLabel: "Calm Folklore & Bedtime Podcasts",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Passive Animated Fairy-Tale Videos & Algorithmic Story Channels",
    whyEducatorsApprove: "Delivers rich literary prose and classic fables (Aesop, Andersen, original gentle adventures) at a calm storytelling pace that deliberately includes advanced descriptive adjectives for children to visualize.",
    languageSkills: ["Story Grammar (Setting, Conflict, Resolution)", "Rich Adjective & Verb Imagery", "Sustained Narrative Listening", "Emotional Empathy"],
    dialogicPrompt: "Hand your child blank paper and beeswax crayons while listening: 'Draw the main character's home exactly the way the narrator's words made it look in your head.'",
    startWith: ["The Velveteen Rabbit Audio Retelling", "The Snow Queen's Garden", "Dog King of the Forest"],
    researchAnchor: "Montag et al. (2015) Psychological Science Lexical Diversity; Hutton et al. (2018)",
    link: "https://storiespodcast.com/"
  },
  {
    name: "Julie's Library: Storytime with Julie Andrews",
    creator: "APM Studios (Dame Julie Andrews & Emma Walton Hamilton)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Early Elem (6–7)",
    category: "story-podcast",
    categoryLabel: "Calm Folklore & Bedtime Podcasts",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Loud Animated Read-Along Videos with Flashing Text Boxes",
    whyEducatorsApprove: "Julie Andrews and her daughter read cherished children's picture books aloud with gentle acoustic piano/violin underscore, modeling expressive prosody, breath control, and a love of physical books.",
    languageSkills: ["Prosodic Fluency Modeling", "Phonological & Rhyming Sensitivity", "Literary Appreciation", "Parent-Child Shared Attention"],
    dialogicPrompt: "Check out the physical picture book from your local library and let your child turn the physical pages at the chime while listening to Julie Andrews read.",
    startWith: ["The Serious Goose", "Marilyn's Monster", "The Hike"],
    researchAnchor: "Whitehurst et al. (1988) Dialogic Reading; AAP (2014) Literacy Promotion Policy",
    link: "https://www.julieslibraryshow.org/"
  },
  {
    name: "Greeking Out from National Geographic Kids",
    creator: "National Geographic Kids (Kenny Curtis & Torpey)",
    age: ["middle-elementary", "preteen"],
    ageLabel: "Middle Elementary (8–9) & Pre-Teens (10–12)",
    category: "story-podcast",
    categoryLabel: "Calm Folklore & Bedtime Podcasts",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)",
    trapReplaced: "Fast-Cut Gaming Streams & Superhero Action Cartoons",
    whyEducatorsApprove: "Retells classical Greek, Norse, and world mythology alongside the real ancient history and geography behind the myths—giving 8–12-year-olds complex character webs and classical allusions to hold in working memory.",
    languageSkills: ["Classical Root Words & Etymology", "Multi-Episode Plot Working Memory", "Historical & Geographic Context", "Complex Literary Allusions"],
    dialogicPrompt: "Keep a physical world atlas or globe nearby and find the real Mediterranean islands, mountains, or constellations mentioned in the myth.",
    startWith: ["Jason and the Argonauts", "The Odyssey: Perilous Journey", "Athena and Arachne"],
    researchAnchor: "Diamond (2013) Working Memory & Cognitive Flexibility; Hutton et al. (2018)",
    link: "https://kids.nationalgeographic.com/podcasts/greeking-out"
  },
  {
    name: "Nothing Much Happens (Kids & Family Bedtime Edition) & Gardenkeeper Gus",
    creator: "Kathryn Nicolai / Calm Acoustic Sleep Storytelling",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Elementary (6–9)",
    category: "story-podcast",
    categoryLabel: "Calm Folklore & Bedtime Podcasts",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Late-Evening TV Shows & Bedroom Tablet Viewing Before Sleep",
    whyEducatorsApprove: "Deliberately plots cozy, sensory-rich nature and village vignettes where 'nothing much happens' (baking bread, rain on a greenhouse roof, gathering acorns), told twice at progressively slower ~60 BPM cadence to lower evening cortisol.",
    languageSkills: ["Sensory & Biophilic Imagery", "Parasympathetic Vagal Down-Regulation", "Mindful Auditory Anchoring", "Zero-Cliffhanger Sleep Transition"],
    dialogicPrompt: "Play at low volume in a 100% dark room 20 minutes before sleep: 'Notice three quiet sounds or cozy textures the narrator describes as you rest your eyes.'",
    startWith: ["The Bake Shop in Autumn", "Rain on the Tin Roof", "A Walk Through the Apple Orchard"],
    researchAnchor: "Chang et al. (2015) PNAS Blue-Light vs. Dark Sleep Latency; Dunckley (2015) ESS",
    link: "https://www.nothingmuchhappens.com/"
  },

  // --- DOMAIN 3: CLASSIC AUDIOBOOKS & TACTILE STORY CARDS (4 ITEMS) ---
  {
    name: "Frog and Toad Audio Collection (Read by Author Arnold Lobel)",
    creator: "Arnold Lobel (HarperAudio / Yoto & Tonies Classic Card)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Early Elem (6–7)",
    category: "audiobook-card",
    categoryLabel: "Classic Audiobooks & Story Cards",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "High-BPM Toddler Cartoons & Noisy Plastic Flashing Toys",
    whyEducatorsApprove: "Recorded by Arnold Lobel himself at a gentle, deliberate 110-word-per-minute cadence with warm acoustic woodwind interludes. Twenty 4-minute stories celebrate patience, friendship, waiting for seeds to grow, and quiet humor.",
    languageSkills: ["Conversational Dialogue Modeling", "Emotional Self-Regulation Humor", "Discrete 4-Min Story Arcs", "Print-to-Audio Tracking"],
    dialogicPrompt: "Pair the audio card with the physical 'Frog and Toad Are Friends' I-Can-Read book so your 5–7-year-old tracks each printed line with their index finger.",
    startWith: ["Spring", "A Lost Button", "Cookies (Willpower!)", "The Garden"],
    researchAnchor: "Hutton et al. (2018) Pediatrics; Lillard & Peterson (2011) Low-Pacing Baseline",
    link: "https://us.yotoplay.com/products/frog-and-toad-audio-collection"
  },
  {
    name: "Winnie-the-Pooh & The House at Pooh Corner (Full-Cast Acoustic Audio)",
    creator: "A.A. Milne (Performed by Alan Bennett / Stephen Fry & Chamber Ensemble)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Early Elem (6–7)",
    category: "audiobook-card",
    categoryLabel: "Classic Audiobooks & Story Cards",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Fast-Cut Commercial Franchises & Merchandised Toy Videos",
    whyEducatorsApprove: "A.A. Milne's original 1926 prose is a masterpiece of gentle irony, rhythmic poetry ('hums'), and social-emotional acceptance across different temperaments (nervous Piglet, exuberant Tigger, melancholy Eeyore).",
    languageSkills: ["Theory of Mind & Temperament Empathy", "Poetic Meter & Rhyming Cadence", "Rich British Literary Syntax", "Unhurried Afternoon Quiet Time"],
    dialogicPrompt: "Ask after a chapter: 'How did Pooh help Piglet feel brave without rushing him or telling him not to be scared?'",
    startWith: ["In Which Pooh Goes Visiting and Gets Into a Tight Place", "In Which Eeyore Loses a Tail", "An Expotition to the North Pole"],
    researchAnchor: "Montag et al. (2015) Lexical Diversity in Classic Children's Literature",
    link: "https://us.yotoplay.com/products/the-complete-winnie-the-pooh-bbc-collection"
  },
  {
    name: "The Chronicles of Narnia & The Hobbit Unabridged Audio Classics",
    creator: "C.S. Lewis & J.R.R. Tolkien (HarperAudio / Kenneth Branagh, Patrick Stewart, Andy Serkis)",
    age: ["early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Early Elem (6–7), Middle Elem (8–9) & Pre-Teen (10–12)",
    category: "audiobook-card",
    categoryLabel: "Classic Audiobooks & Story Cards",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Backseat Road-Trip Movies & Endless Video Game Sessions",
    whyEducatorsApprove: "Multi-hour unabridged literary epics stretch a child's sustained attention span from 5-minute fragments to 45-minute chapter arcs, requiring the prefrontal cortex to hold complex geography, riddles, and moral choices in working memory.",
    languageSkills: ["Long-Horizon Episodic Working Memory", "Complex Subordinate Clause Syntax", "World-Building Mental Cartography", "Ethical & Moral Reasoning"],
    dialogicPrompt: "Pause between chapters on road trips and have kids sketch their own hand-drawn map of Narnia or Middle-earth in a travel notebook.",
    startWith: ["The Lion, the Witch and the Wardrobe (Ch. 1: Lucy Looks Into a Wardrobe)", "The Magician's Nephew", "The Hobbit: Riddles in the Dark"],
    researchAnchor: "Hutton et al. (2018) Pediatrics; Diamond (2013) Sustained Working Memory",
    link: "https://www.harpercollins.com/blogs/harperkids/the-chronicles-of-narnia"
  },
  {
    name: "Prokofiev's Peter and the Wolf & Saint-Saëns' Carnival of the Animals",
    creator: "Maestro Classics / London Philharmonic Orchestra Story Cards",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary"],
    ageLabel: "All Ages 2–9 (Toddlers through Middle Elementary)",
    category: "audiobook-card",
    categoryLabel: "Classic Audiobooks & Story Cards",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Synthetic 130-BPM Nursery Rhyme Loops & Auto-Tuned Kid Pop",
    whyEducatorsApprove: "Introduces young ears to real orchestral timbre and leitmotifs: the bird is a flute, the duck is an oboe, the cat is a clarinet, the wolf is three French horns, and the swan is a solo cello.",
    languageSkills: ["Auditory Timbre & Pitch Discrimination", "Musical Leitmotif Recognition", "Emotional-Acoustic Mapping", "Active Listening Without Visual Crutches"],
    dialogicPrompt: "Play 'Guess the Character by the Instrument': pause when the oboe or French horn enters and ask which animal just stepped into the meadow.",
    startWith: ["Peter and the Wolf (Full Orchestral Story)", "The Swan (Carnival of the Animals)", "The Sorcerer's Apprentice"],
    researchAnchor: "Anderson & Pempek (2005) Auditory Processing; Kuhl (2007) Acoustic Feature Mapping",
    link: "https://www.maestroclassics.com/"
  },

  // --- DOMAIN 4: SCIENCE-OF-READING PHONICS DECODABLES (4 ITEMS) ---
  {
    name: "Bob Books Set 1–5: Systematic Beginning & Advancing Readers",
    creator: "Bobby Lynn Maslen & John R. Maslen (Scholastic Print Box Sets)",
    age: ["preschool", "early-elementary"],
    ageLabel: "Preschool (4–5) & Early Elementary (6–7)",
    category: "phonics-decodable",
    categoryLabel: "Science-of-Reading Phonics Decodables",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Gamified 'Sight-Word Guessing' Apps & Flashy Edutainment Subscriptions",
    whyEducatorsApprove: "Book 1 uses only four letters (M, A, T, S) so a 4- or 5-year-old can decode the entire physical book ('Mat sat. Sam sat.') on day one. Minimalist two-color line drawings prevent picture-guessing ('three-cueing') and wire orthographic mapping.",
    languageSkills: ["Grapheme-to-Phoneme Blending (CVC)", "Orthographic Mapping (Left Fusiform Gyrus)", "Left-to-Right Saccadic Eye Tracking", "Intrinsic 'I Read a Whole Book!' Mastery"],
    dialogicPrompt: "Have your child tap under each letter with their finger to sound out /m/-/a/-/t/, then slide their finger smoothly across the word to blend 'mat!'",
    startWith: ["Set 1 Book 1: Mat", "Set 2: Advancing Beginners (Short Vowels)", "Set 3: Word Families & Consonant Blends"],
    researchAnchor: "Castles, Rastle & Nation (2018) Psychological Science in the Public Interest: Ending the Reading Wars",
    link: "https://bobbooks.com/"
  },
  {
    name: "Primary Phonics & Explode The Code Decodable Storybooks",
    creator: "Barbara W. Makar / Hall (Educators Publishing Service — Orton-Gillingham Print)",
    age: ["preschool", "early-elementary"],
    ageLabel: "Preschool (4–5) & Early Elementary (6–7)",
    category: "phonics-decodable",
    categoryLabel: "Science-of-Reading Phonics Decodables",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Noisy Electronic Phonics Toys & Unstructured Leveled Readers",
    whyEducatorsApprove: "Gold-standard Orton-Gillingham-aligned physical decodable storybooks and pencil-and-paper workbooks used by reading specialists for 40+ years. Strictly controls phonetic scope and sequence so children never have to guess unlearned spelling patterns.",
    languageSkills: ["Systematic Synthetic Phonics", "Consonant Digraphs (sh, ch, th, wh)", "Silent-E & Vowel Team Decoding", "Pencil-to-Paper Kinesthetic Spelling"],
    dialogicPrompt: "Before opening the storybook, build 3 target words from the story on the table using physical wooden or magnetic letters, swapping one vowel at a time (cat -> cot -> cut).",
    startWith: ["Primary Phonics Set 1: Short Vowel Storybooks (Mac and Tab)", "Explode The Code Book 1", "Primary Phonics Set 2: Long Vowels (CVCE)"],
    researchAnchor: "National Reading Panel (2000) & Castles et al. (2018) Systematic Phonics Consensus",
    link: "https://epslearning.com/products/primary-phonics"
  },
  {
    name: "Flyleaf Publishing 'Books to Remember' Emergent Decodable Series",
    creator: "Laura Appleton-Smith (Flyleaf Publishing)",
    age: ["preschool", "early-elementary"],
    ageLabel: "Preschool (4–5) & Early Elementary (6–7)",
    category: "phonics-decodable",
    categoryLabel: "Science-of-Reading Phonics Decodables",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Repetitive Nonsense Phonics Drills & Digital Reading Streak Apps",
    whyEducatorsApprove: "Combines strict cumulative phonics decodability with rich watercolor artwork and genuine literary story arcs—bridging the gap between phonemic decoding and reading comprehension.",
    languageSkills: ["Cumulative Phonetic Decoding", "Reading Comprehension & Inference", "Syllable Division (Closed/Open)", "Oral Reading Prosody"],
    dialogicPrompt: "Use the inside front cover's warm-up word chart for 60 seconds, then read the story together and ask: 'Why did the character make that choice at the end?'",
    startWith: ["I Am Sam (Foundational CVC)", "The Sunset Pond", "Bess Makes a Nest"],
    researchAnchor: "Castles et al. (2018) Science of Reading;Scarborough's Reading Rope (2001)",
    link: "https://flyleafpublishing.com/"
  },
  {
    name: "Read Write Inc. Phonics Book Bag Books & Usborne Phonics Readers",
    creator: "Ruth Miskin (Oxford University Press) & Usborne Print",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Early Elem (6–7)",
    category: "phonics-decodable",
    categoryLabel: "Science-of-Reading Phonics Decodables",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Autoplay Alphabet Songs & Flashing Letter-Tap Tablet Games",
    whyEducatorsApprove: "Uses 'Fred Talk' oral sound-blending games for ages 3–4 followed by color-banded decodable print books for ages 4–7—teaching pure phoneme pronunciation (/mmmm/, not 'muh') for effortless blending.",
    languageSkills: ["Pure Phoneme Articulation (No Schwa)", "Rhyming & Alliteration Awareness", "Sound-Blending Automaticity", "Partner Reading Turn-Taking"],
    dialogicPrompt: "Play 'Fred Talk' at the breakfast table with zero screens: 'Can you pass me the c-u-p? Now let's put on your h-a-t!'",
    startWith: ["Sound Blending Books 1–5", "Red Ditty Books", "Fat Cat on a Mat (Usborne Phonics)"],
    researchAnchor: "Rose Report (2006) UK Synthetic Phonics Review; Castles et al. (2018)",
    link: "https://home.oxfordowl.co.uk/reading/reading-schemes-oxford-levels/read-write-inc-phonics-guide/"
  },

  // --- DOMAIN 5: CALDECOTT, NEWBERY & READ-ALOUD LIVING BOOKS (4 ITEMS) ---
  {
    name: "The Complete Tales of Beatrix Potter (Original Unabridged Hardcover)",
    creator: "Beatrix Potter (Frederick Warne & Co. — 1902 Original Text & Watercolors)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Early Elem (6–7)",
    category: "living-book",
    categoryLabel: "Caldecott & Read-Aloud Living Books",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Fast-Cut CGI Animal Reboots & Simplified Board-Book Adaptations",
    whyEducatorsApprove: "Beatrix Potter respected young children's intellect by pairing serene botanical and naturalist watercolors with precise, elevated vocabulary ('soporific', 'implored', 'exertions', 'gooseberry net') learned effortlessly in context.",
    languageSkills: ["1.7x Rare Tier-2 Vocabulary Acquisition", "Botanical & Naturalist Observation", "Complex Sentence Syntax", "Calm Visual Gaze Fixation"],
    dialogicPrompt: "When you read 'the effect of eating too much lettuce is soporific,' ask your child to look at the watercolour of the sleeping bunnies and guess what 'soporific' means!",
    startWith: ["The Tale of Peter Rabbit", "The Tale of Benjamin Bunny", "The Tale of Jemima Puddle-Duck", "The Tale of Jeremy Fisher"],
    researchAnchor: "Montag, Jones & Smith (2015) Psychological Science: Picture Books & Lexical Diversity",
    link: "https://www.penguinrandomhouse.com/series/BPO/beatrix-potter/"
  },
  {
    name: "Robert McCloskey & Virginia Lee Burton Caldecott Picture Book Treasury",
    creator: "Robert McCloskey (*Blueberries for Sal*, *Make Way for Ducklings*) & Virginia Lee Burton (*The Little House*, *Mike Mulligan*)",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Early Elem (6–7)",
    category: "living-book",
    categoryLabel: "Caldecott & Read-Aloud Living Books",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Noisy Battery-Operated Sound Books & Hyper-Saturated Toddlers' Cartoons",
    whyEducatorsApprove: "Panoramic sepia, charcoal, and watercolor spreads invite slow visual scanning (15–30 seconds per page) while onomatopoeic prose ('Kuplink, kuplank, kuplunk!') builds rhythmic auditory memory and emotional security.",
    languageSkills: ["Slow Visual Detail Scanning", "Seasonal & Historical Time Concepts", "Parallel Plot Comparison (Sal & Little Bear)", "Dialogic Question-Asking"],
    dialogicPrompt: "Practice Whitehurst's PEER dialogic loop on each spread: Prompt ('Where is the mother duck looking?'), Evaluate, Expand, and Repeat.",
    startWith: ["Blueberries for Sal", "Make Way for Ducklings", "Mike Mulligan and His Steam Shovel", "The Little House"],
    researchAnchor: "Whitehurst et al. (1988) Developmental Psychology Dialogic Reading; Parish-Morris et al. (2013)",
    link: "https://www.ala.org/alsc/awardsgrants/bookmedia/caldecott"
  },
  {
    name: "E.B. White's Family Read-Aloud Trilogy (*Charlotte's Web*, *Stuart Little*, *The Trumpet of the Swan*)",
    creator: "E.B. White & Garth Williams Illustrations (HarperCollins Print)",
    age: ["early-elementary", "middle-elementary"],
    ageLabel: "Early Elementary (6–7) & Middle Elementary (8–9)",
    category: "living-book",
    categoryLabel: "Caldecott & Read-Aloud Living Books",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Evening Sitcoms, YouTube Gaming Let's Plays & Solo Tablet Time",
    whyEducatorsApprove: "Reading one chapter aloud together each night after dinner builds a multi-week family ritual. E.B. White's luminous prose cultivates deep empathy, loyalty, natural science observation (how orb spiders spin webs), and emotional resilience.",
    languageSkills: ["Multi-Week Episodic Memory", "Deep Theory-of-Mind Empathy", "Figurative Language & Simile", "Listening Comprehension Above Reading Level"],
    dialogicPrompt: "Note that a child's *listening comprehension level* stays 2–3 grade levels above their independent reading level until age 13—pause to savor words like 'salutations', 'magnum opus', and 'radiant'.",
    startWith: ["Charlotte's Web (Ch. 1: Before Breakfast)", "The Trumpet of the Swan", "Stuart Little"],
    researchAnchor: "AAP Policy Statement on Literacy Promotion (High et al., Pediatrics, 2014); Montag et al. (2015)",
    link: "https://www.harpercollins.com/products/charlottes-web-e-b-white"
  },
  {
    name: "David Macaulay's *The Way Things Work Now* & DK Smithsonian Visual Encyclopedias",
    creator: "David Macaulay (HMH) & DK Smithsonian Print Reference",
    age: ["early-elementary", "middle-elementary", "preteen"],
    ageLabel: "Early Elem (6–7), Middle Elem (8–9) & Pre-Teen (10–12)",
    category: "living-book",
    categoryLabel: "Caldecott & Read-Aloud Living Books",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "late-Night Wikipedia Rabbit Holes, YouTube 'Explainer' Binging & Tablet Browsing",
    whyEducatorsApprove: "Oversized physical hardcover cutaway diagrams (gears, levers, locks, jet engines, silicon chips, ocean trenches, and anatomy) let curious 6–12-year-olds study complex systems in bed for hours with zero blue light or algorithmic rabbit holes.",
    languageSkills: ["Mechanical & Systems Diagram Literacy", "Spatial Cross-Section Reasoning", "Non-Fiction Index & Glossary Navigation", "Self-Directed Deep Focus"],
    dialogicPrompt: "Leave 'The Way Things Work Now' open on the kitchen counter or bedside table: trace the path of a lever, pulley, or lock mechanism with your finger and find a real one in your house.",
    startWith: ["The Way Things Work Now (Mechanics of Movement)", "DK Knowledge Encyclopedia: Ocean & Space", "Castle & Cathedral (Architectural Cutaways)"],
    researchAnchor: "Hirsh-Pasek et al. (2015) Meaningful Context; Chang et al. (2015) Print vs. Light-Emitting eReaders",
    link: "https://www.dk.com/us/category/childrens-encyclopedias/"
  },

  // --- DOMAIN 6: SCREEN-FREE TACTILE AUDIO PLAYERS & LIBRARY INFRASTRUCTURE (4 ITEMS) ---
  {
    name: "Yoto Player (3rd Gen) & Yoto Mini + 'Make Your Own' (MYO) NFC Cards",
    creator: "Yoto Ltd. (Montessori-Inspired Tactile NFC Audio Player)",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (Toddlers through Pre-Teens)",
    category: "hardware-player",
    categoryLabel: "Screen-Free Players & Library Tools",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Personal Kid Tablets, Smartphones & Always-On Bedroom Voice Assistants",
    whyEducatorsApprove: "Designed from Montessori principles: zero microphone, zero camera, zero browser, and zero ads. Children insert physical NFC cards to play audiobooks, Yoto Daily, or parent-recorded 'Make Your Own' MP3 cards, with an optional amber/green OK-to-wake nightlight.",
    languageSkills: ["Child-Directed Tactile Autonomy", "Screen-Free Bedtime & Quiet-Time Ritual", "Parent/Grandparent Voice Bonding (MYO Cards)", "Independent Chapter Navigation"],
    dialogicPrompt: "Use blank 'Make Your Own' (MYO) cards to record grandparents reading family stories or link RSS feeds of Brains On! and Circle Round for 100% screen-free playback.",
    startWith: ["Yoto Make Your Own (MYO) 10-Card Pack", "Yoto Daily (Jake's Screen-Free Daily Micro-Podcast)", "Classical Sleep Radio & Brown Noise Timer"],
    researchAnchor: "Hutton et al. (2018) Pediatrics Audio fMRI; Chang et al. (2015) Zero Blue-Light Bedroom Standard",
    link: "https://us.yotoplay.com/"
  },
  {
    name: "Toniebox Tactile Figurine Audio Speaker Cube + Open-Source TeddyCloud",
    creator: "boxine GmbH (Tonies) & TeddyCloud Self-Hosted FOSS Firmware/Server",
    age: ["toddler", "preschool", "early-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Early Elem (6–7)",
    category: "hardware-player",
    categoryLabel: "Screen-Free Players & Library Tools",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Toddler Touchscreens, YouTube Nursery Rhyme Loops & Smart Speakers",
    whyEducatorsApprove: "A soft, tumble-proof padded speaker cube with zero screen: toddlers place a magnetic hand-painted story figurine on top to start playback, pinch the big/little ears for volume, and tap the side to skip tracks. Tech-savvy parents can also run open-source **TeddyCloud** to host custom local audio.",
    languageSkills: ["3D Tactile Object-to-Story Mapping", "Autonomous Fine-Motor Control for Ages 2–5", "Repeated Story Listening Mastery", "Zero-Screen Rest Time"],
    dialogicPrompt: "Use 'Creative-Tonies' (90 minutes of custom upload space) to load public-domain LibriVox stories or home recordings of parents singing bedtime lullabies.",
    startWith: ["Creative-Tonie (Custom Family Audio)", "The Gruffalo & Room on the Broom Audio Tonie", "National Geographic Kids Whale & Dinosaur Tonies"],
    researchAnchor: "AAP (2016) Media & Young Minds; Kuhl (2007) Acoustic Language Processing",
    link: "https://us.tonies.com/"
  },
  {
    name: "Voxblock Screen-Free Offline Audiobook Player (Zero Wi-Fi / Physical Blocks)",
    creator: "Voxblock UK (100% Offline Physical Cartridge Audiobook Player)",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary"],
    ageLabel: "Toddlers (2–3), Preschool (4–5) & Elementary (6–9)",
    category: "hardware-player",
    categoryLabel: "Screen-Free Players & Library Tools",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Cloud-Connected Tablets & App-Dependent Streaming Devices",
    whyEducatorsApprove: "Requires zero Wi-Fi, zero Bluetooth, zero smartphone app setup, and zero cloud accounts right out of the box. Children snap a physical cassette-sized book-block into the player and press physical Play/Pause/Chapter buttons—making it impossible to drift online.",
    languageSkills: ["100% Offline Distraction-Free Listening", "Tactile Book-Block Library Curation", "Long-Form Chapter Attention", "Zero-Setup Caregiver/Grandparent Simplicity"],
    dialogicPrompt: "Pack in a car caddy or camping bag alongside physical paperbacks so children can listen on flights and road trips with zero Wi-Fi or battery anxiety.",
    startWith: ["Paddington Bear Audio Block", "The Railway Children Audio Block", "Swallows and Amazons Audio Block"],
    researchAnchor: "Hutton et al. (2018) Pediatrics; 5Rights Foundation (2021) Privacy-by-Design",
    link: "https://voxblock.co.uk/"
  },
  {
    name: "Libby / Hoopla Public Library Audio & Print Hold Pipeline ($0 Municipal Card)",
    creator: "OverDrive (Libby), Hoopla Digital & LibriVox Public Domain",
    age: ["toddler", "preschool", "early-elementary", "middle-elementary", "preteen"],
    ageLabel: "All Ages 2–12 (100% Free with Municipal Library Card)",
    category: "hardware-player",
    categoryLabel: "Screen-Free Players & Library Tools",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    semBreakdown: "Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)",
    trapReplaced: "Commercial Paid App Subscriptions & Ad-Supported Video Channels",
    whyEducatorsApprove: "Every public library card unlocks thousands of free, unabridged children's audiobooks (via Libby/Hoopla) and physical weekly book crates. Keep the parent's phone out of sight on a high shelf and route audio to a simple kitchen/living-room Bluetooth speaker.",
    languageSkills: ["Weekly Physical Library Ritual", "Unlimited Multi-Genre Vocabulary Exposure", "Zero-Cost Equity & Access", "Family Read-Aloud Habit Formation"],
    dialogicPrompt: "Establish a weekly 'Saturday Morning Library Basket' ritual: let each child pick 5 physical non-fiction books, 5 picture/chapter books, and 1 family audiobook for the week's car rides.",
    startWith: ["Libby Kids Reading Room Filter (Audiobooks)", "LibriVox Free Public-Domain Children's Classics (MP3)", "Local Public Library '1,000 Books Before Kindergarten' Program"],
    researchAnchor: "High et al. (2014) AAP Policy Statement: Literacy Promotion as an Essential Component of Primary Care",
    link: "https://www.overdrive.com/apps/libby"
  }
];

// ==================== DETERMINISTIC SEM-10 & NFI-10 ORACLES & SECURITY HELPERS ====================
const ALLOWED_AGE_FILTERS = new Set(['all', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen']);
const ALLOWED_GAME_DOMAINS = new Set(['all', 'logic', 'spatial', 'coding', 'sandbox', 'stem', 'sel']);
const ALLOWED_GAME_STOPPING_FILTERS = new Set(['all', 'discrete-levels', 'calm-toybox', 'deep-sandbox', 'co-play']);
const ALLOWED_FOOD_DOMAINS = new Set(['all', 'brain-dha', 'iron-focus', 'steady-glucose', 'bone-growth', 'gut-immune', 'lunchbox-swaps']);
const ALLOWED_LISTEN_DOMAINS = new Set(['all', 'stem-podcast', 'story-podcast', 'audiobook-card', 'phonics-decodable', 'living-book', 'hardware-player']);
const ALLOWED_WORKSPACE_TABS = new Set(['overview', 'science', 'channels', 'games', 'nutrition', 'listen', 'lockdown', 'expert', 'all']);
const ALLOWED_BLUEPRINT_AGES = new Set(['under-2', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen']);
const ALLOWED_THEMES = new Set(['light', 'dark']);
const ALLOWED_LANGUAGES = new Set(['en', 'es', 'zh', 'yue', 'ja', 'ko', 'pt', 'fr', 'it', 'de', 'ar']);
const ALLOWED_CHIRP_PERSONAS = new Set(['Aoede', 'Kore', 'Leda', 'Zephyr', 'Puck', 'Charon', 'Fenrir', 'Orus']);
const ORDERED_WORKSPACE_TABS = ['overview', 'science', 'channels', 'games', 'nutrition', 'listen', 'lockdown', 'expert'];

const STORAGE_KEYS = {
  CHANNEL_AGE: 'safekids_channel_age_filter',
  GAME_AGE: 'safekids_game_age_filter',
  GAME_DOMAIN: 'safekids_game_domain_filter',
  GAME_STOPPING: 'safekids_game_stopping_filter',
  FOOD_AGE: 'safekids_food_age_filter',
  FOOD_DOMAIN: 'safekids_food_domain_filter',
  LISTEN_AGE: 'safekids_listen_age_filter',
  LISTEN_DOMAIN: 'safekids_listen_domain_filter',
  ACTIVE_TAB: 'safekids_active_tab',
  BLUEPRINT_AGE: 'safekids_blueprint_age',
  THEME: 'safekids_theme',
  LANGUAGE: 'safekids_language',
  CHIRP_PERSONA: 'safekids_chirp_persona'
};

function clampSemDimension(val) {
  if (typeof val === 'boolean' || val === null || val === undefined) return 0;
  let num = 0;
  if (typeof val === 'number') {
    if (!Number.isFinite(val)) return 0;
    num = val >= 0 ? Math.floor(val + 0.5) : Math.ceil(val - 0.5);
  } else if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!/^-?\d+$/.test(trimmed)) return 0;
    num = parseInt(trimmed, 10);
  } else {
    return 0;
  }
  return Math.max(0, Math.min(2, num));
}

function computeSem10Score(dims) {
  const safeDims = dims && typeof dims === 'object' ? dims : {};
  const pacing = clampSemDimension(safeDims.pacing);
  const visual = clampSemDimension(safeDims.visual);
  const audio = clampSemDimension(safeDims.audio);
  const pressure = clampSemDimension(safeDims.pressure);
  const reward = clampSemDimension(safeDims.reward);

  const rawSum = pacing + visual + audio + pressure + reward;
  const totalScore = Math.min(10, 1 + rawSum);

  let tier = 'high';
  let stimulusClass = 'stimulus-high';
  if (totalScore <= 3) {
    tier = 'low';
    stimulusClass = 'stimulus-low';
  } else if (totalScore <= 6) {
    tier = 'med';
    stimulusClass = 'stimulus-med';
  }

  const semBreakdown = `Base 1 + Pacing: ${pacing}/2 \u2022 Visual: ${visual}/2 \u2022 Audio: ${audio}/2 \u2022 Pressure: ${pressure}/2 \u2022 Reward: ${reward}/2 (Total: ${totalScore}/10)`;
  return {
    pacing,
    visual,
    audio,
    pressure,
    reward,
    rawSum,
    score: totalScore,
    scoreLabel: `${totalScore}/10`,
    tier,
    stimulusClass,
    semBreakdown
  };
}

function computeNfi10Score(dims) {
  const safeDims = dims && typeof dims === 'object' ? dims : {};
  const matrix = clampSemDimension(safeDims.matrix);
  const glycemic = clampSemDimension(safeDims.glycemic);
  const nutrients = clampSemDimension(safeDims.nutrients);
  const additives = clampSemDimension(safeDims.additives);
  const texture = clampSemDimension(safeDims.texture);

  const rawSum = matrix + glycemic + nutrients + additives + texture;
  const totalScore = Math.min(10, 1 + rawSum);

  let tier = 'high';
  let stimulusClass = 'stimulus-high';
  if (totalScore <= 3) {
    tier = 'low';
    stimulusClass = 'stimulus-low';
  } else if (totalScore <= 6) {
    tier = 'med';
    stimulusClass = 'stimulus-med';
  }

  const nfiBreakdown = `Base 1 + Matrix: ${matrix}/2 \u2022 Glycemic: ${glycemic}/2 \u2022 Nutrients: ${nutrients}/2 \u2022 Additives: ${additives}/2 \u2022 Texture: ${texture}/2 (Total: ${totalScore}/10)`;
  return {
    matrix,
    glycemic,
    nutrients,
    additives,
    texture,
    rawSum,
    score: totalScore,
    scoreLabel: `${totalScore}/10`,
    tier,
    stimulusClass,
    nfiBreakdown
  };
}

function sanitizeCsvCell(val) {
  const raw = val === null || val === undefined ? '' : String(val);
  const normalized = raw.replace(/\r\n/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ');
  const trimmedLeading = normalized.replace(/^[ \u00a0\u3000\u200b]+/, '');
  let safe = normalized;
  if (/^[=+\-@\t\r]/.test(trimmedLeading) || /^[=+\-@\t\r]/.test(normalized)) {
    safe = "'" + normalized;
  }
  return `"${safe.replace(/"/g, '""')}"`;
}

function readPersistedFilter(key, allowedSet, fallback) {
  try {
    if (typeof localStorage === 'undefined' || !localStorage) return fallback;
    const stored = localStorage.getItem(key);
    if (typeof stored !== 'string') return fallback;
    return allowedSet.has(stored) ? stored : fallback;
  } catch (_err) {
    return fallback;
  }
}

function writePersistedFilter(key, value, allowedSet) {
  try {
    if (typeof localStorage === 'undefined' || !localStorage) return;
    if (allowedSet.has(value)) {
      localStorage.setItem(key, value);
    }
  } catch (_err) {
    // Ignore storage quota or private-browsing restrictions
  }
}

function safeCopyText(text, onSuccess, onFallback) {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(text).then(
        () => { if (onSuccess) onSuccess(); },
        () => { if (onFallback) onFallback(); }
      );
      return;
    }
  } catch (_err) {
    // Fallback when clipboard API throws synchronously
  }
  if (onFallback) onFallback();
}

// ==================== XSS-SAFE DOM HELPERS ====================
function createExternalLinkSvg() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('viewBox', '0 0 24 24');
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14');
  svg.appendChild(path);
  return svg;
}

function createEmptyState(primaryMsg, secondaryMsg) {
  const wrapper = document.createElement('div');
  wrapper.style.gridColumn = '1 / -1';
  wrapper.style.textAlign = 'center';
  wrapper.style.padding = '3rem';
  wrapper.style.color = 'var(--text-muted)';

  const p1 = document.createElement('p');
  p1.style.fontSize = '1.1rem';
  p1.style.fontWeight = '600';
  p1.textContent = primaryMsg;

  const p2 = document.createElement('p');
  p2.style.fontSize = '0.9rem';
  p2.textContent = secondaryMsg;

  wrapper.appendChild(p1);
  wrapper.appendChild(p2);
  return wrapper;
}

function createCardVisualStrip(imgSrc, altText, kickerText, subText) {
  const strip = document.createElement('div');
  strip.className = 'card-visual-strip';

  const img = document.createElement('img');
  img.className = 'card-visual-thumb';
  img.src = imgSrc;
  img.alt = altText;
  img.loading = 'lazy';
  img.width = 52;
  img.height = 38;

  const meta = document.createElement('div');
  meta.className = 'card-visual-meta';

  const kicker = document.createElement('span');
  kicker.className = 'card-visual-kicker';
  kicker.textContent = kickerText;

  const sub = document.createElement('span');
  sub.className = 'card-visual-sub';
  sub.textContent = subText;

  meta.appendChild(kicker);
  meta.appendChild(sub);
  strip.appendChild(img);
  strip.appendChild(meta);
  return strip;
}

function getChannelVisualMeta(ch) {
  const ages = Array.isArray(ch.age) ? ch.age : [ch.age || ''];
  if (ages.includes('toddler') || ages.includes('preschool')) {
    return {
      src: 'images/rec-2-curated-tv.jpg',
      alt: 'Calm living-room co-viewing illustration',
      kicker: 'Pillar 1 • Calm Living-Room Media',
      sub: 'Slow Scene Pacing • Acoustic Storytelling'
    };
  }
  if (ch.stimulusClass === 'stimulus-low') {
    return {
      src: 'images/rec-4-offline-travel.jpg',
      alt: 'Offline and low-stimulus viewing illustration',
      kicker: 'Pillar 1 • Low-Stimulus Documentary & Craft',
      sub: 'Zero Algorithm Feeds • Offline yt-dlp Ready'
    };
  }
  return {
    src: 'images/rec-5-pin-kidtube.jpg',
    alt: 'PIN-locked whitelisted STEM channel illustration',
    kicker: 'Pillar 1 • Whitelisted STEM & Inquiry',
    sub: 'Parent-Curated Channel • Daytime Co-Viewing'
  };
}

function getGameVisualMeta(g) {
  if (g.category === 'sandbox' || g.category === 'sel') {
    return {
      src: 'images/rec-1-zero-screen.jpg',
      alt: 'Open-ended constructivist sandbox play illustration',
      kicker: `Pillar 2 • ${g.categoryLabel || 'Constructivist Play'}`,
      sub: 'Self-Paced Microworld • Zero Timers or Loot Boxes'
    };
  }
  return {
    src: 'images/rec-7-calm-gaming.jpg',
    alt: 'Calm cognitive puzzle and spatial reasoning illustration',
    kicker: `Pillar 2 • ${g.categoryLabel || 'Cognitive Skill Game'}`,
    sub: 'Executive Function • Ad-Free & Dark-Pattern Free'
  };
}

function getFoodVisualMeta(f) {
  if (f.category === 'lunchbox-swaps') {
    return {
      src: 'images/nutrition-swap-guide.jpg',
      alt: 'Side-by-side ultra-processed snack trap vs whole-food upgrade illustration',
      kicker: 'Pillar 3 • Supermarket UPF Trap Swap',
      sub: 'Zero Synthetic Dyes • Intact Cellular Fiber Matrix'
    };
  }
  return {
    src: 'images/rec-9-wholesome-food.jpg',
    alt: 'Wholesome pediatric whole-food bento illustration',
    kicker: `Pillar 3 • ${f.categoryLabel || 'Pediatric Neuro-Nutrition'}`,
    sub: 'NOVA-1 Intact Whole Food • Clinician-Vetted Synergy'
  };
}

function getListenVisualMeta(item) {
  const cat = (item && item.category) ? item.category : '';
  if (cat === 'hardware-player' || cat === 'audiobook-card') {
    return {
      src: 'images/rec-4-offline-travel.jpg',
      alt: 'Screen-free tactile audio player and physical story cards illustration',
      kicker: `Pillar 4 • ${item.categoryLabel || 'Tactile Screen-Free Audio'}`,
      sub: 'Zero Blue Light • Child-Directed Physical Cards'
    };
  }
  return {
    src: 'images/rec-10-listen-read.jpg',
    alt: 'Warm screen-free podcast listening and dialogic shared picture-book reading illustration',
    kicker: `Pillar 4 • ${item.categoryLabel || 'Screen-Free Audio & Living Books'}`,
    sub: 'Default Mode Network Imagery • Tier-2 Vocabulary'
  };
}

// ==================== PROGRESSIVE DISCLOSURE CLINICAL DRAWER HELPER ====================
let expandAllClinicalDrawers = false;

function appendClinicalDrawer(body, card, drawerNodes) {
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
  const showLabel = (i18n && i18n.drawerShowLabel) || '🔬 + Why It Works, Parent Guide & Citations';
  const hideLabel = (i18n && i18n.drawerHideLabel) || '🔬 \u2212 Hide Clinical Details & Parent Guide';

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'card-drawer-toggle';
  toggleBtn.setAttribute('aria-expanded', expandAllClinicalDrawers ? 'true' : 'false');
  toggleBtn.textContent = expandAllClinicalDrawers ? hideLabel : showLabel;

  const drawer = document.createElement('div');
  drawer.className = expandAllClinicalDrawers
    ? 'card-clinical-drawer drawer-open'
    : 'card-clinical-drawer';
  if (expandAllClinicalDrawers) {
    card.classList.add('card-expanded');
  }

  (drawerNodes || []).forEach(node => {
    if (node) drawer.appendChild(node);
  });

  toggleBtn.addEventListener('click', () => {
    const curI18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
    const curShow = (curI18n && curI18n.drawerShowLabel) || '🔬 + Why It Works, Parent Guide & Citations';
    const curHide = (curI18n && curI18n.drawerHideLabel) || '🔬 \u2212 Hide Clinical Details & Parent Guide';
    const isOpen = drawer.classList.contains('drawer-open');
    if (isOpen) {
      drawer.classList.remove('drawer-open');
      card.classList.remove('card-expanded');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.textContent = curShow;
    } else {
      drawer.classList.add('drawer-open');
      card.classList.add('card-expanded');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.textContent = curHide;
    }
  });

  body.appendChild(toggleBtn);
  body.appendChild(drawer);
}

// ==================== MULTI-DISCIPLINARY EXPERT LENS HELPERS (PhD / MD / GAME SYSTEMS) ====================
function createExpertBridgeBox(variantClass, titleText, bodyText) {
  const box = document.createElement('div');
  box.className = `expert-bridge-box ${variantClass}`;

  const title = document.createElement('div');
  title.className = 'expert-bridge-title';
  title.textContent = titleText;

  const content = document.createElement('div');
  content.textContent = bodyText;

  box.appendChild(title);
  box.appendChild(content);
  return box;
}

function getChannelOffScreenTransfer(ch) {
  const name = (ch && ch.name) ? ch.name : '';
  const lower = name.toLowerCase();
  if (lower.includes('art for kids') || lower.includes('mister maker')) {
    return 'Place folding sketchbooks, beeswax crayons, and origami paper on the coffee table before pressing play so 80% of visual attention stays on physical hand-eye drawing.';
  }
  if (lower.includes('cosmic kids')) {
    return 'Roll out a physical yoga mat and practice the "Peace Out" belly-breathing sequence offline before naptime or bedtime without turning on the TV.';
  }
  if (lower.includes('numberblocks') || lower.includes('math') || lower.includes('3blue1brown')) {
    return 'Pair one episode with physical snap-cubes, wooden Cuisenaire rods, or graph paper so your child physically builds the exact number bonds or geometric patterns shown.';
  }
  if (lower.includes('alphablocks') || lower.includes('ms. rachel') || lower.includes('super simple') || lower.includes('reading')) {
    return 'Echo the target phonemes using physical magnetic fridge letters or sing the gesture song face-to-face during diaper changes and car rides with zero screen.';
  }
  if (lower.includes('daniel tiger') || lower.includes('stillwater') || lower.includes('bluey')) {
    return 'Re-enact the episode\'s game or emotional coping song ("Take a deep breath and count to four") using physical stuffed animals or backyard roleplay immediately after viewing.';
  }
  const ages = Array.isArray(ch && ch.age) ? ch.age : [];
  if (ages.includes('toddler') || ages.includes('preschool')) {
    return 'Co-view and ask 1 open-ended "serve-and-return" question afterward ("What did they discover outside?"), then step into the yard or playroom to find a real object that matches.';
  }
  return 'After watching 1 episode, invite your child to sketch a 3-step diagram or run a hands-on kitchen-table experiment testing the phenomenon they just observed.';
}

function getGameStoppingProfile(g) {
  const name = (g && g.name) ? g.name : '';
  const cat = (g && g.category) ? g.category : '';
  const deepSandboxNames = [
    'Minecraft',
    'Kerbal Space Program',
    'Civilization VI',
    'Scratch 3.0',
    'Turing Complete',
    'SimCity',
    ' Stardew'
  ];
  const isDeepSandbox = deepSandboxNames.some(token => name.includes(token));
  if (isDeepSandbox) {
    return {
      stoppingType: 'deep-sandbox',
      stoppingLabel: '🟡 Deep Flow Sandbox (Set 5m Visual Timer)',
      stoppingClass: 'stopping-timer',
      coPlay: true,
      coPlayLabel: '👨‍👩‍👧 Parent + Child Co-Play'
    };
  }

  const calmToyboxNames = [
    'Pok Pok',
    'Toca Life',
    'Sago Mini',
    'Breathe, Think, Do',
    'Daniel Tiger',
    'Endless Alphabet',
    'Crayola',
    'PBS KIDS',
    'Khan Academy Kids',
    'A Short Hike',
    'Alba:',
    'Dorfromantik',
    'Townscaper',
    'ScratchJr'
  ];
  const isCalmToybox = cat === 'sandbox' || cat === 'sel' || calmToyboxNames.some(token => name.includes(token));
  if (isCalmToybox) {
    const coPlayToybox = !name.includes('Dorfromantik');
    return {
      stoppingType: 'calm-toybox',
      stoppingLabel: '🟢 Calm Open Toybox (Zero-Penalty Stop)',
      stoppingClass: 'stopping-low',
      coPlay: coPlayToybox,
      coPlayLabel: coPlayToybox ? '👨‍👩‍👧 Parent + Child Co-Play' : '🧘 Solo Quiet Focus'
    };
  }

  const coPlayLogicNames = [
    'ChessKid',
    'Zoombinis',
    'Monument Valley',
    'Thinkrolls',
    'Lightbot',
    'Slice Fractions',
    'DragonBox',
    'Baba Is You',
    'World of Goo',
    'The Witness',
    'Good Pizza'
  ];
  const isCoPlay = coPlayLogicNames.some(token => name.includes(token));
  return {
    stoppingType: 'discrete-levels',
    stoppingLabel: '🟢 Discrete 3–5m Levels (Natural Stopping Cue)',
    stoppingClass: 'stopping-low',
    coPlay: isCoPlay,
    coPlayLabel: isCoPlay ? '👨‍👩‍👧 Parent + Child Co-Play' : '🧘 Solo Quiet Focus'
  };
}

function getGameOffScreenTransfer(g) {
  const cat = (g && g.category) ? g.category : '';
  if (cat === 'spatial') {
    return 'Bridge to physical spatial geometry: pair 15 minutes of digital play with wooden tangram blocks, Magna-Tiles, origami folding, or LEGO architectural builds.';
  }
  if (cat === 'coding') {
    return 'Bridge to physical "Robot Turtle" unplugged coding: have your child write arrow-card algorithms on index cards to guide a parent across the living room floor.';
  }
  if (cat === 'logic') {
    return 'Bridge to tabletop deduction: play a physical round of Mastermind, Rush Hour, Set, or over-the-board wooden chess to reinforce look-ahead inhibitory control.';
  }
  if (cat === 'sandbox' || cat === 'sel') {
    return 'Bridge to real-world autonomy: translate today\'s in-game nature/town discovery into a backyard bug-identification journal, cardboard diorama, or calm breathing ritual.';
  }
  return 'Bridge to concrete manipulatives: use kitchen measuring cups, fraction pizza slices, or magnetic phonics tiles on the table to cement the concept in 3D space.';
}

function getFoodSensoryBridge(f) {
  const cat = (f && f.category) ? f.category : '';
  if (cat === 'brain-dha') {
    return 'Step 1 (Familiar Anchor): Serve alongside warm toast strips or mild crackers → Step 2 (50/50 Sensory Bridge): Blend flaky fish/egg yolk into creamy avocado or ricotta dip → Step 3 (Target Whole Matrix): Intact omega-3 & choline whole-food portion.';
  }
  if (cat === 'iron-focus') {
    return 'Step 1 (Familiar Anchor): Keep texture ultra-smooth or finely minced in favorite pasta/dip → Step 2 (50/50 Sensory Bridge): Pair with sweet bell pepper or orange slices (Vitamin C 3x iron uptake) → Step 3 (Target Whole Matrix): Intact lentil/beef/seed iron staple.';
  }
  if (cat === 'steady-glucose') {
    return 'Step 1 (Familiar Anchor): Offer familiar crunchy shape (apple wedges or warm oats) → Step 2 (50/50 Sensory Bridge): Add a "dip moat" of 100% nut/seed butter + cinnamon → Step 3 (Target Whole Matrix): Zero-spike intact cellular fiber + lipid snack.';
  }
  if (cat === 'bone-growth') {
    return 'Step 1 (Familiar Anchor): Serve cold in a small open cup or fun silicone mold → Step 2 (50/50 Sensory Bridge): Swirl mashed real berries + chia into plain full-fat dairy/kefir → Step 3 (Target Whole Matrix): Unsweetened D3 + K2 + calcium matrix.';
  }
  if (cat === 'gut-immune') {
    return 'Step 1 (Familiar Anchor): Start with 1 teaspoon of mild probiotic dip or fruit puree → Step 2 (50/50 Sensory Bridge): Let child sprinkle "crunchy toppings" (hemp/flax/pomegranate) themselves → Step 3 (Target Whole Matrix): Live-culture + prebiotic fiber bowl.';
  }
  return 'Step 1 (Familiar Anchor): Keep the visual bento compartment shape kids expect → Step 2 (50/50 Sensory Bridge): Plate a zero-pressure "exploler bite" next to a safe favorite (Satter Division of Responsibility) → Step 3 (Target Whole Matrix): 100% NOVA-1 lunchbox swap.';
}

// ==================== CHANNEL, GAME, FOOD & LISTEN STATE INITIALIZATION ====================
let currentChannelFilter = 'all';
let currentChannelSearch = '';
let currentGameAgeFilter = 'all';
let currentGameDomainFilter = 'all';
let currentGameStoppingFilter = 'all';
let currentGameSearch = '';
let currentFoodAgeFilter = 'all';
let currentFoodDomainFilter = 'all';
let currentFoodSearch = '';
let currentListenAgeFilter = 'all';
let currentListenDomainFilter = 'all';
let currentListenSearch = '';
let currentBlueprintAge = 'toddler';
let currentTheme = 'light';
let currentLanguage = 'en';
let currentChirpPersona = 'Aoede';
let currentExpertTopic = 'all';
let refreshExpertFilterStatusRef = null;
let lastChirpAudioSrc = '';

function syncFilterButtons(selector, activeValue) {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach(btn => {
    if (btn.getAttribute('data-filter') === activeValue) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function restorePersistedDirectoryFilters() {
  currentChannelFilter = readPersistedFilter(STORAGE_KEYS.CHANNEL_AGE, ALLOWED_AGE_FILTERS, 'all');
  currentGameAgeFilter = readPersistedFilter(STORAGE_KEYS.GAME_AGE, ALLOWED_AGE_FILTERS, 'all');
  currentGameDomainFilter = readPersistedFilter(STORAGE_KEYS.GAME_DOMAIN, ALLOWED_GAME_DOMAINS, 'all');
  currentGameStoppingFilter = readPersistedFilter(STORAGE_KEYS.GAME_STOPPING, ALLOWED_GAME_STOPPING_FILTERS, 'all');
  currentFoodAgeFilter = readPersistedFilter(STORAGE_KEYS.FOOD_AGE, ALLOWED_AGE_FILTERS, 'all');
  currentFoodDomainFilter = readPersistedFilter(STORAGE_KEYS.FOOD_DOMAIN, ALLOWED_FOOD_DOMAINS, 'all');
  currentListenAgeFilter = readPersistedFilter(STORAGE_KEYS.LISTEN_AGE, ALLOWED_AGE_FILTERS, 'all');
  currentListenDomainFilter = readPersistedFilter(STORAGE_KEYS.LISTEN_DOMAIN, ALLOWED_LISTEN_DOMAINS, 'all');
  currentBlueprintAge = readPersistedFilter(STORAGE_KEYS.BLUEPRINT_AGE, ALLOWED_BLUEPRINT_AGES, 'toddler');
  currentTheme = readPersistedFilter(STORAGE_KEYS.THEME, ALLOWED_THEMES, 'light');
  currentLanguage = readPersistedFilter(STORAGE_KEYS.LANGUAGE, ALLOWED_LANGUAGES, 'en');
  currentChirpPersona = readPersistedFilter(STORAGE_KEYS.CHIRP_PERSONA, ALLOWED_CHIRP_PERSONAS, 'Aoede');

  syncFilterButtons('#channel-filters .filter-btn', currentChannelFilter);
  syncFilterButtons('#game-age-filters .filter-btn', currentGameAgeFilter);
  syncFilterButtons('#game-domain-filters .filter-btn', currentGameDomainFilter);
  syncFilterButtons('#game-stopping-filters .filter-btn', currentGameStoppingFilter);
  syncFilterButtons('#food-age-filters .filter-btn', currentFoodAgeFilter);
  syncFilterButtons('#food-domain-filters .filter-btn', currentFoodDomainFilter);
  syncFilterButtons('#listen-age-filters .filter-btn', currentListenAgeFilter);
  syncFilterButtons('#listen-domain-filters .filter-btn', currentListenDomainFilter);
}

// ==================== CHANNEL CONTROLS & RENDERING ====================
function getFilteredChannels() {
  return channelsData.filter(ch => {
    const ageVal = Array.isArray(ch.age) ? ch.age : [ch.age || ''];
    const matchesFilter = currentChannelFilter === 'all' || ageVal.includes(currentChannelFilter);

    const matchesSearch = !currentChannelSearch ||
      (ch.name && ch.name.toLowerCase().includes(currentChannelSearch)) ||
      (ch.researchAnchor && ch.researchAnchor.toLowerCase().includes(currentChannelSearch)) ||
      (ch.whyThisChannel && ch.whyThisChannel.toLowerCase().includes(currentChannelSearch)) ||
      (ch.ageLabel && ch.ageLabel.toLowerCase().includes(currentChannelSearch)) ||
      (ch.checkmarks && ch.checkmarks.some(c => c.toLowerCase().includes(currentChannelSearch))) ||
      (ch.startWith && ch.startWith.some(s => s.toLowerCase().includes(currentChannelSearch)));
    return matchesFilter && matchesSearch;
  });
}

function buildChannelCard(ch) {
  const card = document.createElement('div');
  card.className = 'card channel-card';

  const body = document.createElement('div');

  // 1. Glanceable Header (Title + Calm Stimulus Score)
  const header = document.createElement('div');
  header.className = 'channel-header';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'channel-name';
  nameSpan.textContent = ch.name;

  const stimSpan = document.createElement('span');
  stimSpan.className = `stimulus-tag ${ch.stimulusClass}`;
  stimSpan.textContent = `Stimulus: ${ch.stimulusScore}`;

  header.appendChild(nameSpan);
  header.appendChild(stimSpan);
  body.appendChild(header);

  // 2. Glanceable Age Badge
  const ageWrap = document.createElement('div');
  ageWrap.style.marginBottom = '0.55rem';
  const ageBadge = document.createElement('span');
  ageBadge.className = 'tag-badge age-range-badge';
  ageBadge.textContent = ch.ageLabel;
  ageWrap.appendChild(ageBadge);
  body.appendChild(ageWrap);

  // 3. Glanceable Summary
  const descP = document.createElement('p');
  descP.className = 'channel-desc card-summary-clamp';
  descP.textContent = ch.whyThisChannel;
  body.appendChild(descP);

  // 4. Glanceable "Start With" Chips
  if (ch.startWith && ch.startWith.length > 0) {
    const swBox = document.createElement('div');
    swBox.className = 'quick-start-strip';

    const swTitle = document.createElement('span');
    swTitle.className = 'quick-start-label';
    swTitle.textContent = '🎬 Start With:';
    swBox.appendChild(swTitle);

    ch.startWith.forEach(sw => {
      const badge = document.createElement('span');
      badge.className = 'tag-badge quick-start-chip';
      badge.textContent = sw;
      swBox.appendChild(badge);
    });
    body.appendChild(swBox);
  }

  // 5. Progressive-Disclosure Clinical Drawer Nodes
  const drawerNodes = [];
  const vMeta = getChannelVisualMeta(ch);
  drawerNodes.push(createCardVisualStrip(vMeta.src, vMeta.alt, vMeta.kicker, vMeta.sub));

  const citBox = document.createElement('div');
  citBox.className = 'citation-box';

  const resDiv = document.createElement('div');
  const resStrong = document.createElement('strong');
  resStrong.textContent = '📚 Research Anchor: ';
  resDiv.appendChild(resStrong);
  resDiv.appendChild(document.createTextNode(ch.researchAnchor || 'Lillard & Peterson (2011) Pacing Guidelines'));

  const semDiv = document.createElement('div');
  semDiv.style.marginTop = '0.25rem';
  const semStrong = document.createElement('strong');
  semStrong.textContent = '🔬 SEM-10 Rubric: ';
  const semBadge = document.createElement('span');
  semBadge.className = 'sem-badge';
  semBadge.textContent = ch.semBreakdown || 'Base 1 + Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 1/10)';
  semDiv.appendChild(semStrong);
  semDiv.appendChild(semBadge);

  citBox.appendChild(resDiv);
  citBox.appendChild(semDiv);
  drawerNodes.push(citBox);

  if (ch.checkmarks && ch.checkmarks.length > 0) {
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.margin = '0.6rem 0';
    ul.style.fontSize = '0.82rem';
    ul.style.color = 'var(--text-muted)';

    ch.checkmarks.forEach(cm => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '0.35rem';
      li.style.marginBottom = '0.2rem';

      const tick = document.createElement('span');
      tick.style.color = 'var(--success)';
      tick.style.fontWeight = '700';
      tick.textContent = '✓';

      li.appendChild(tick);
      li.appendChild(document.createTextNode(' ' + cm));
      ul.appendChild(li);
    });
    drawerNodes.push(ul);
  }

  drawerNodes.push(
    createExpertBridgeBox(
      'expert-bridge-phd',
      '🎓 Educational PhD • Off-Screen Transfer Activity (Hirsh-Pasek et al., 2015):',
      getChannelOffScreenTransfer(ch)
    )
  );

  appendClinicalDrawer(body, card, drawerNodes);
  card.appendChild(body);

  // Action Link
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
  const viewChannelLabel = (i18n && i18n.viewChannelBtn) || 'View Channel';
  const link = document.createElement('a');
  link.href = ch.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline btn-sm';
  link.style.marginTop = '0.75rem';
  link.style.width = '100%';
  link.style.justifyContent = 'center';
  link.appendChild(createExternalLinkSvg());
  link.appendChild(document.createTextNode(' ' + viewChannelLabel));

  link.addEventListener('click', () => {
    if (window.trackSafeKidsEvent) {
      window.trackSafeKidsEvent('click_channel', { name: ch.name, url: ch.link });
    }
  });

  card.appendChild(link);
  return card;
}

function renderChannels() {
  const container = document.getElementById('channel-grid');
  if (!container) return;

  const filtered = getFilteredChannels();
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;

  const countBadge = document.getElementById('channel-count-badge');
  if (countBadge) {
    countBadge.textContent = (i18n && typeof i18n.formatChannelsCount === 'function')
      ? i18n.formatChannelsCount(filtered.length)
      : `${filtered.length} channels`;
  }

  if (filtered.length === 0) {
    container.replaceChildren(
      createEmptyState(
        (i18n && i18n.emptyChannelsTitle) || 'No channels match your search criteria.',
        (i18n && i18n.emptyChannelsSub) || 'Try adjusting your age filter or search term.'
      )
    );
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach(ch => {
    fragment.appendChild(buildChannelCard(ch));
  });
  container.replaceChildren(fragment);
}

function setupChannelFilterListeners() {
  const buttons = document.querySelectorAll('#channel-filters .filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      buttons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const rawFilter = activeBtn.getAttribute('data-filter') || 'all';
      currentChannelFilter = ALLOWED_AGE_FILTERS.has(rawFilter) ? rawFilter : 'all';
      writePersistedFilter(STORAGE_KEYS.CHANNEL_AGE, currentChannelFilter, ALLOWED_AGE_FILTERS);
      renderChannels();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_channels', { filter: currentChannelFilter });
      }
    });
  });
}

function setupChannelSearch() {
  const input = document.getElementById('channel-search');
  if (!input) return;
  let chSearchTimer;
  input.addEventListener('input', (e) => {
    currentChannelSearch = e.target.value.toLowerCase().trim();
    renderChannels();
    clearTimeout(chSearchTimer);
    if (currentChannelSearch.length >= 3 && window.trackSafeKidsEvent) {
      chSearchTimer = setTimeout(() => {
        window.trackSafeKidsEvent('search_channels', { query: currentChannelSearch });
      }, 500);
    }
  });
}

// ==================== WHITELIST & CATALOG EXPORT TOOLS ====================
function triggerFileDownload(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function flashButtonSuccess(btn, tempText) {
  const originalText = btn.textContent;
  btn.textContent = tempText;
  btn.classList.add('copied-flash');
  setTimeout(() => {
    btn.textContent = originalText;
    btn.classList.remove('copied-flash');
  }, 2000);
}

function setupWhitelistExport() {
  const btnCopyUrls = document.getElementById('btn-copy-urls');
  const btnExportJson = document.getElementById('btn-export-json');
  const btnExportCsv = document.getElementById('btn-export-csv');

  if (btnCopyUrls) {
    btnCopyUrls.addEventListener('click', () => {
      const activeChannels = getFilteredChannels();
      const urlsText = activeChannels.map(ch => `${ch.name}: ${ch.link}`).join('\n');
      safeCopyText(
        urlsText,
        () => {
          flashButtonSuccess(btnCopyUrls, `✓ Copied ${activeChannels.length} URLs!`);
          if (window.trackSafeKidsEvent) {
            window.trackSafeKidsEvent('export_whitelist', { format: 'clipboard', count: activeChannels.length });
          }
        },
        () => {
          flashButtonSuccess(btnCopyUrls, `✓ Prepared ${activeChannels.length} URLs`);
        }
      );
    });
  }

  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      const activeChannels = getFilteredChannels();
      const payload = {
        exportedAt: new Date().toISOString(),
        filterApplied: currentChannelFilter,
        channelCount: activeChannels.length,
        channels: activeChannels.map(ch => ({
          name: ch.name,
          ageBands: ch.age,
          ageLabel: ch.ageLabel,
          sem10Score: ch.stimulusScore,
          sem10Breakdown: ch.semBreakdown,
          url: ch.link,
          recommendedStarters: ch.startWith
        }))
      };
      triggerFileDownload(
        `safekids-whitelist-${currentChannelFilter}.json`,
        JSON.stringify(payload, null, 2),
        'application/json'
      );
      flashButtonSuccess(btnExportJson, '✓ Downloaded JSON!');
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('export_whitelist', { format: 'json', count: activeChannels.length });
      }
    });
  }

  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      const activeChannels = getFilteredChannels();
      const header = ['Channel Name', 'Age Group', 'SEM-10 Score', 'SEM-10 Breakdown', 'Research Anchor', 'Recommended Starters', 'YouTube URL'].map(sanitizeCsvCell);
      const rows = activeChannels.map(ch => [
        sanitizeCsvCell(ch.name),
        sanitizeCsvCell(ch.ageLabel),
        sanitizeCsvCell(ch.stimulusScore),
        sanitizeCsvCell(ch.semBreakdown),
        sanitizeCsvCell(ch.researchAnchor),
        sanitizeCsvCell((ch.startWith || []).join(' | ')),
        sanitizeCsvCell(ch.link)
      ].join(','));
      const csvContent = [header.join(','), ...rows].join('\n');
      triggerFileDownload(
        `safekids-whitelist-${currentChannelFilter}.csv`,
        csvContent,
        'text/csv;charset=utf-8;'
      );
      flashButtonSuccess(btnExportCsv, '✓ Downloaded CSV!');
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('export_whitelist', { format: 'csv', count: activeChannels.length });
      }
    });
  }
}

// ==================== EDUCATOR GAMES CONTROLS, EXPORT & RENDERING ====================
function getFilteredGames() {
  return gamesData.filter(g => {
    const ageVal = Array.isArray(g.age) ? g.age : [g.age || ''];
    const matchesAge = currentGameAgeFilter === 'all' || ageVal.includes(currentGameAgeFilter);
    const matchesDomain = currentGameDomainFilter === 'all' || g.category === currentGameDomainFilter;
    const stopProfile = getGameStoppingProfile(g);
    const matchesStopping =
      currentGameStoppingFilter === 'all' ||
      (currentGameStoppingFilter === 'co-play' && stopProfile.coPlay) ||
      stopProfile.stoppingType === currentGameStoppingFilter;

    const matchesSearch = !currentGameSearch ||
      (g.name && g.name.toLowerCase().includes(currentGameSearch)) ||
      (g.developer && g.developer.toLowerCase().includes(currentGameSearch)) ||
      (g.researchAnchor && g.researchAnchor.toLowerCase().includes(currentGameSearch)) ||
      (g.semBreakdown && g.semBreakdown.toLowerCase().includes(currentGameSearch)) ||
      (g.whyEducatorsApprove && g.whyEducatorsApprove.toLowerCase().includes(currentGameSearch)) ||
      (g.ageLabel && g.ageLabel.toLowerCase().includes(currentGameSearch)) ||
      (g.categoryLabel && g.categoryLabel.toLowerCase().includes(currentGameSearch)) ||
      (g.cognitiveSkills && g.cognitiveSkills.some(cs => cs.toLowerCase().includes(currentGameSearch))) ||
      (g.endorsements && g.endorsements.some(ed => ed.toLowerCase().includes(currentGameSearch))) ||
      (g.platforms && g.platforms.some(pl => pl.toLowerCase().includes(currentGameSearch)));

    return matchesAge && matchesDomain && matchesStopping && matchesSearch;
  });
}

function setupGamesExport() {
  const btnCopyGames = document.getElementById('btn-copy-games-urls');
  const btnExportGamesJson = document.getElementById('btn-export-games-json');
  const btnExportGamesCsv = document.getElementById('btn-export-games-csv');

  if (btnCopyGames) {
    btnCopyGames.addEventListener('click', () => {
      const activeGames = getFilteredGames();
      const text = activeGames.map(g => `${g.name} (${g.stimulusScore}): ${g.link}`).join('\n');
      safeCopyText(
        text,
        () => {
          flashButtonSuccess(btnCopyGames, `✓ Copied ${activeGames.length} Games!`);
          if (window.trackSafeKidsEvent) {
            window.trackSafeKidsEvent('export_games', { format: 'clipboard', count: activeGames.length });
          }
        },
        () => {
          flashButtonSuccess(btnCopyGames, `✓ Prepared ${activeGames.length} Games`);
        }
      );
    });
  }

  if (btnExportGamesJson) {
    btnExportGamesJson.addEventListener('click', () => {
      const activeGames = getFilteredGames();
      const payload = {
        exportedAt: new Date().toISOString(),
        ageFilterApplied: currentGameAgeFilter,
        domainFilterApplied: currentGameDomainFilter,
        gameCount: activeGames.length,
        games: activeGames.map(g => ({
          name: g.name,
          developer: g.developer,
          ageBands: g.age,
          ageLabel: g.ageLabel,
          domain: g.category,
          sem10Score: g.stimulusScore,
          sem10Breakdown: g.semBreakdown,
          researchAnchor: g.researchAnchor,
          monetization: g.monetization,
          platforms: g.platforms,
          url: g.link
        }))
      };
      triggerFileDownload(
        `safekids-games-${currentGameAgeFilter}-${currentGameDomainFilter}.json`,
        JSON.stringify(payload, null, 2),
        'application/json'
      );
      flashButtonSuccess(btnExportGamesJson, '✓ Downloaded JSON!');
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('export_games', { format: 'json', count: activeGames.length });
      }
    });
  }

  if (btnExportGamesCsv) {
    btnExportGamesCsv.addEventListener('click', () => {
      const activeGames = getFilteredGames();
      const header = ['Game Title', 'Developer', 'Age Group', 'Cognitive Domain', 'SEM-10 Score', 'SEM-10 Breakdown', 'Research Anchor', 'Monetization', 'Official URL'].map(sanitizeCsvCell);
      const rows = activeGames.map(g => [
        sanitizeCsvCell(g.name),
        sanitizeCsvCell(g.developer),
        sanitizeCsvCell(g.ageLabel),
        sanitizeCsvCell(g.categoryLabel),
        sanitizeCsvCell(g.stimulusScore),
        sanitizeCsvCell(g.semBreakdown),
        sanitizeCsvCell(g.researchAnchor),
        sanitizeCsvCell(g.monetization),
        sanitizeCsvCell(g.link)
      ].join(','));
      const csvContent = [header.join(','), ...rows].join('\n');
      triggerFileDownload(
        `safekids-games-${currentGameAgeFilter}-${currentGameDomainFilter}.csv`,
        csvContent,
        'text/csv;charset=utf-8;'
      );
      flashButtonSuccess(btnExportGamesCsv, '✓ Downloaded CSV!');
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('export_games', { format: 'csv', count: activeGames.length });
      }
    });
  }
}

function buildGameCard(g) {
  const monetizationClass =
    g.monetizationType === 'free' ? 'monetization-free' :
    g.monetizationType === 'foss' ? 'monetization-foss' :
    g.monetizationType === 'arcade' ? 'monetization-arcade' : 'monetization-paid';

  const card = document.createElement('div');
  card.className = 'card game-card';

  const body = document.createElement('div');

  // 1. Glanceable Header (Title + Developer + Calm Stimulus Score)
  const header = document.createElement('div');
  header.className = 'channel-header';

  const titleWrap = document.createElement('div');
  const nameDiv = document.createElement('div');
  nameDiv.className = 'channel-name';
  nameDiv.textContent = g.name;

  const devDiv = document.createElement('div');
  devDiv.style.fontSize = '0.75rem';
  devDiv.style.color = 'var(--text-light)';
  devDiv.style.fontWeight = '500';
  devDiv.textContent = `By ${g.developer}`;

  titleWrap.appendChild(nameDiv);
  titleWrap.appendChild(devDiv);

  const stimSpan = document.createElement('span');
  stimSpan.className = `stimulus-tag ${g.stimulusClass}`;
  stimSpan.textContent = `Stimulus: ${g.stimulusScore}`;

  header.appendChild(titleWrap);
  header.appendChild(stimSpan);
  body.appendChild(header);

  // 2. Glanceable Age + Monetization + Stopping-Cue Pills
  const metaRow = document.createElement('div');
  metaRow.style.display = 'flex';
  metaRow.style.flexWrap = 'wrap';
  metaRow.style.gap = '0.35rem';
  metaRow.style.margin = '0.5rem 0';

  const ageBadge = document.createElement('span');
  ageBadge.className = 'tag-badge age-range-badge';
  ageBadge.textContent = g.ageLabel;

  const monBadge = document.createElement('span');
  monBadge.className = `monetization-badge ${monetizationClass}`;
  monBadge.textContent = g.monetization;

  metaRow.appendChild(ageBadge);
  metaRow.appendChild(monBadge);
  body.appendChild(metaRow);

  const stopProfile = getGameStoppingProfile(g);
  const stopRow = document.createElement('div');
  stopRow.className = 'stopping-cue-row';

  const stopPill = document.createElement('span');
  stopPill.className = `stopping-cue-pill ${stopProfile.stoppingClass}`;
  stopPill.textContent = stopProfile.stoppingLabel;

  const coPlayPill = document.createElement('span');
  coPlayPill.className = 'coplay-pill';
  coPlayPill.textContent = stopProfile.coPlayLabel;

  stopRow.appendChild(stopPill);
  stopRow.appendChild(coPlayPill);
  body.appendChild(stopRow);

  // 3. Glanceable Summary
  const descP = document.createElement('p');
  descP.className = 'channel-desc card-summary-clamp';
  descP.textContent = g.whyEducatorsApprove;
  body.appendChild(descP);

  // 4. Glanceable Cognitive Focus Chips
  if (g.cognitiveSkills && g.cognitiveSkills.length > 0) {
    const cogList = document.createElement('div');
    cogList.className = 'quick-start-strip';

    g.cognitiveSkills.forEach(cs => {
      const span = document.createElement('span');
      span.className = 'domain-badge';
      span.textContent = cs;
      cogList.appendChild(span);
    });
    body.appendChild(cogList);
  }

  // 5. Progressive-Disclosure Clinical Drawer Nodes
  const drawerNodes = [];
  const gMeta = getGameVisualMeta(g);
  drawerNodes.push(createCardVisualStrip(gMeta.src, gMeta.alt, gMeta.kicker, gMeta.sub));

  if (g.endorsements && g.endorsements.length > 0) {
    const endSection = document.createElement('div');
    endSection.style.marginBottom = '0.6rem';

    const endList = document.createElement('div');
    endList.style.display = 'flex';
    endList.style.flexWrap = 'wrap';
    endList.style.gap = '0.25rem';

    g.endorsements.forEach(ed => {
      const span = document.createElement('span');
      span.className = 'endorsement-badge';
      span.textContent = `★ ${ed}`;
      endList.appendChild(span);
    });
    endSection.appendChild(endList);
    drawerNodes.push(endSection);
  }

  const citBox = document.createElement('div');
  citBox.className = 'citation-box';

  const resDiv = document.createElement('div');
  const resStrong = document.createElement('strong');
  resStrong.textContent = '📚 Research Anchor: ';
  resDiv.appendChild(resStrong);
  resDiv.appendChild(document.createTextNode(g.researchAnchor));

  const semDiv = document.createElement('div');
  semDiv.style.marginTop = '0.25rem';
  const semStrong = document.createElement('strong');
  semStrong.textContent = '🔬 SEM-10 Rubric: ';
  const semBadge = document.createElement('span');
  semBadge.className = 'sem-badge';
  semBadge.textContent = g.semBreakdown;
  semDiv.appendChild(semStrong);
  semDiv.appendChild(semBadge);

  citBox.appendChild(resDiv);
  citBox.appendChild(semDiv);
  drawerNodes.push(citBox);

  if (g.calmHighlights && g.calmHighlights.length > 0) {
    const calmBox = document.createElement('div');
    calmBox.style.background = 'var(--bg-alt)';
    calmBox.style.padding = '0.6rem';
    calmBox.style.borderRadius = 'var(--radius-sm)';
    calmBox.style.marginBottom = '0.6rem';

    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.fontSize = '0.8rem';
    ul.style.color = 'var(--text-muted)';

    g.calmHighlights.forEach(ch => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'flex-start';
      li.style.gap = '0.3rem';
      li.style.marginBottom = '0.2rem';

      const tick = document.createElement('span');
      tick.style.color = 'var(--success)';
      tick.style.fontWeight = '700';
      tick.textContent = '✓';

      li.appendChild(tick);
      li.appendChild(document.createTextNode(' ' + ch));
      ul.appendChild(li);
    });

    calmBox.appendChild(ul);
    drawerNodes.push(calmBox);
  }

  drawerNodes.push(
    createExpertBridgeBox(
      'expert-bridge-phd',
      '🎓 Educational PhD • Screen-to-Tabletop Transfer (Papert / Vygotsky):',
      getGameOffScreenTransfer(g)
    )
  );

  const platDiv = document.createElement('div');
  platDiv.style.fontSize = '0.78rem';
  platDiv.style.color = 'var(--text-muted)';
  platDiv.style.marginTop = '0.4rem';
  const platStrong = document.createElement('strong');
  platStrong.textContent = 'Platforms: ';
  platDiv.appendChild(platStrong);
  platDiv.appendChild(document.createTextNode((g.platforms || []).join(' • ')));
  drawerNodes.push(platDiv);

  appendClinicalDrawer(body, card, drawerNodes);
  card.appendChild(body);

  // Action Link
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
  const visitGameLabel = (i18n && i18n.visitGameBtn) || 'Visit Official Game / App';
  const link = document.createElement('a');
  link.href = g.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline btn-sm';
  link.style.marginTop = '0.75rem';
  link.style.width = '100%';
  link.style.justifyContent = 'center';
  link.appendChild(createExternalLinkSvg());
  link.appendChild(document.createTextNode(' ' + visitGameLabel));

  link.addEventListener('click', () => {
    if (window.trackSafeKidsEvent) {
      window.trackSafeKidsEvent('click_game', { name: g.name, url: g.link });
    }
  });

  card.appendChild(link);
  return card;
}

function renderGames() {
  const container = document.getElementById('game-grid');
  if (!container) return;

  const filtered = getFilteredGames();
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;

  const countBadge = document.getElementById('game-count-badge');
  if (countBadge) {
    countBadge.textContent = (i18n && typeof i18n.formatGamesCount === 'function')
      ? i18n.formatGamesCount(filtered.length)
      : `${filtered.length} games`;
  }

  if (filtered.length === 0) {
    container.replaceChildren(
      createEmptyState(
        (i18n && i18n.emptyGamesTitle) || 'No educational games match your search criteria.',
        (i18n && i18n.emptyGamesSub) || "Try selecting 'All Games' or clearing the domain, stopping-cue, and search filters."
      )
    );
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach(g => {
    fragment.appendChild(buildGameCard(g));
  });
  container.replaceChildren(fragment);
}

function setupGameFilterListeners() {
  const ageButtons = document.querySelectorAll('#game-age-filters .filter-btn');
  ageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      ageButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const rawAge = activeBtn.getAttribute('data-filter') || 'all';
      currentGameAgeFilter = ALLOWED_AGE_FILTERS.has(rawAge) ? rawAge : 'all';
      writePersistedFilter(STORAGE_KEYS.GAME_AGE, currentGameAgeFilter, ALLOWED_AGE_FILTERS);
      renderGames();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_games_age', { age: currentGameAgeFilter });
      }
    });
  });

  const domainButtons = document.querySelectorAll('#game-domain-filters .filter-btn');
  domainButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      domainButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const rawDomain = activeBtn.getAttribute('data-filter') || 'all';
      currentGameDomainFilter = ALLOWED_GAME_DOMAINS.has(rawDomain) ? rawDomain : 'all';
      writePersistedFilter(STORAGE_KEYS.GAME_DOMAIN, currentGameDomainFilter, ALLOWED_GAME_DOMAINS);
      renderGames();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_games_domain', { domain: currentGameDomainFilter });
      }
    });
  });

  const stoppingButtons = document.querySelectorAll('#game-stopping-filters .filter-btn');
  stoppingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      stoppingButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const rawStopping = activeBtn.getAttribute('data-filter') || 'all';
      currentGameStoppingFilter = ALLOWED_GAME_STOPPING_FILTERS.has(rawStopping) ? rawStopping : 'all';
      writePersistedFilter(STORAGE_KEYS.GAME_STOPPING, currentGameStoppingFilter, ALLOWED_GAME_STOPPING_FILTERS);
      renderGames();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_games_stopping', { stopping: currentGameStoppingFilter });
      }
    });
  });
}

function setupGameSearch() {
  const input = document.getElementById('game-search');
  if (!input) return;
  let gSearchTimer;
  input.addEventListener('input', (e) => {
    currentGameSearch = e.target.value.toLowerCase().trim();
    renderGames();
    clearTimeout(gSearchTimer);
    if (currentGameSearch.length >= 3 && window.trackSafeKidsEvent) {
      gSearchTimer = setTimeout(() => {
        window.trackSafeKidsEvent('search_games', { query: currentGameSearch });
      }, 500);
    }
  });
}

// ==================== INTERACTIVE SEM-10 CALCULATOR (MUST_RESET_ON_RELOAD) ====================
function setupSemCalculator() {
  const calcContainer = document.getElementById('sem-calculator');
  if (!calcContainer) return;

  const scores = {
    pacing: 0,
    visual: 0,
    audio: 0,
    pressure: 0,
    reward: 0
  };

  const scoreBadge = document.getElementById('calc-score-badge');
  const breakdownText = document.getElementById('calc-breakdown-text');
  const verdictDesc = document.getElementById('calc-verdict-desc');
  const resetBtn = document.getElementById('calc-reset-btn');

  function updateCalculatorView() {
    const result = computeSem10Score(scores);

    if (breakdownText) {
      breakdownText.textContent = result.semBreakdown;
    }

    if (scoreBadge && verdictDesc) {
      scoreBadge.className = `stimulus-tag ${result.stimulusClass}`;
      if (result.tier === 'low') {
        scoreBadge.textContent = `SEM-10 Score: ${result.scoreLabel} — Low Stimulus (Approved)`;
        verdictDesc.textContent = 'Safe for developing executive function & bedtime wind-down. Protects endogenous attention (Lillard & Peterson, 2011; Dunckley, 2015).';
      } else if (result.tier === 'med') {
        scoreBadge.textContent = `SEM-10 Score: ${result.scoreLabel} — Moderate Stimulus (Co-View)`;
        verdictDesc.textContent = 'Acceptable for daytime educational sessions (20–30 mins) with parent co-viewing. Avoid within 90 minutes of sleep.';
      } else {
        scoreBadge.textContent = `SEM-10 Score: ${result.scoreLabel} — High Stimulus (Block / Avoid)`;
        verdictDesc.textContent = 'High risk of orienting reflex exhaustion, dopaminergic conditioning, and post-screen emotional dysregulation. Block via YouTube whitelist or NextDNS.';
      }
    }
  }

  const dimGroups = calcContainer.querySelectorAll('.calc-dim-box');
  dimGroups.forEach(group => {
    const dim = group.getAttribute('data-dim');
    const buttons = group.querySelectorAll('.calc-opt-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        scores[dim] = clampSemDimension(btn.getAttribute('data-pts') || '0');
        updateCalculatorView();
        if (window.trackSafeKidsEvent) {
          const currentResult = computeSem10Score(scores);
          window.trackSafeKidsEvent('use_sem_calculator', { dimension: dim, total: currentResult.score });
        }
      });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      Object.keys(scores).forEach(k => { scores[k] = 0; });
      dimGroups.forEach(group => {
        const buttons = group.querySelectorAll('.calc-opt-btn');
        buttons.forEach((b, idx) => {
          if (idx === 0) b.classList.add('active');
          else b.classList.remove('active');
        });
      });
      updateCalculatorView();
    });
  }

  updateCalculatorView();
}

// ==================== WHOLESOME FOOD CONTROLS, EXPORT & RENDERING ====================
function getFilteredFoods() {
  return foodsData.filter(f => {
    const ageVal = Array.isArray(f.age) ? f.age : [f.age || ''];
    const matchesAge = currentFoodAgeFilter === 'all' || ageVal.includes(currentFoodAgeFilter);
    const matchesDomain = currentFoodDomainFilter === 'all' || f.category === currentFoodDomainFilter;

    const matchesSearch = !currentFoodSearch ||
      (f.name && f.name.toLowerCase().includes(currentFoodSearch)) ||
      (f.trapReplaced && f.trapReplaced.toLowerCase().includes(currentFoodSearch)) ||
      (f.wholeFoodSwap && f.wholeFoodSwap.toLowerCase().includes(currentFoodSearch)) ||
      (f.synergySafety && f.synergySafety.toLowerCase().includes(currentFoodSearch)) ||
      (f.whyCliniciansApprove && f.whyCliniciansApprove.toLowerCase().includes(currentFoodSearch)) ||
      (f.researchAnchor && f.researchAnchor.toLowerCase().includes(currentFoodSearch)) ||
      (f.nfiBreakdown && f.nfiBreakdown.toLowerCase().includes(currentFoodSearch)) ||
      (f.ageLabel && f.ageLabel.toLowerCase().includes(currentFoodSearch)) ||
      (f.categoryLabel && f.categoryLabel.toLowerCase().includes(currentFoodSearch)) ||
      (f.keyNutrients && f.keyNutrients.some(kn => kn.toLowerCase().includes(currentFoodSearch)));

    return matchesAge && matchesDomain && matchesSearch;
  });
}

function setupFoodsExport() {
  const btnCopyFoods = document.getElementById('btn-copy-foods-swaps');
  const btnExportFoodsJson = document.getElementById('btn-export-foods-json');
  const btnExportFoodsCsv = document.getElementById('btn-export-foods-csv');

  if (btnCopyFoods) {
    btnCopyFoods.addEventListener('click', () => {
      const activeFoods = getFilteredFoods();
      const text = activeFoods.map(f => `${f.name} (NFI ${f.nfiScore}) — Swap Out: ${f.trapReplaced} -> Upgrade: ${f.wholeFoodSwap}`).join('\n');
      safeCopyText(
        text,
        () => {
          flashButtonSuccess(btnCopyFoods, `✓ Copied ${activeFoods.length} Swaps!`);
          if (window.trackSafeKidsEvent) {
            window.trackSafeKidsEvent('export_foods', { format: 'clipboard', count: activeFoods.length });
          }
        },
        () => {
          flashButtonSuccess(btnCopyFoods, `✓ Prepared ${activeFoods.length} Swaps`);
        }
      );
    });
  }

  if (btnExportFoodsJson) {
    btnExportFoodsJson.addEventListener('click', () => {
      const activeFoods = getFilteredFoods();
      const payload = {
        exportedAt: new Date().toISOString(),
        ageFilterApplied: currentFoodAgeFilter,
        domainFilterApplied: currentFoodDomainFilter,
        foodCount: activeFoods.length,
        foods: activeFoods.map(f => ({
          name: f.name,
          ageBands: f.age,
          ageLabel: f.ageLabel,
          domain: f.category,
          domainLabel: f.categoryLabel,
          nfi10Score: f.nfiScore,
          nfi10Breakdown: f.nfiBreakdown,
          trapReplaced: f.trapReplaced,
          wholeFoodSwap: f.wholeFoodSwap,
          keyNutrients: f.keyNutrients,
          synergySafety: f.synergySafety,
          researchAnchor: f.researchAnchor,
          url: f.link
        }))
      };
      triggerFileDownload(
        `safekids-wholesome-foods-${currentFoodAgeFilter}-${currentFoodDomainFilter}.json`,
        JSON.stringify(payload, null, 2),
        'application/json'
      );
      flashButtonSuccess(btnExportFoodsJson, '✓ Downloaded JSON!');
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('export_foods', { format: 'json', count: activeFoods.length });
      }
    });
  }

  if (btnExportFoodsCsv) {
    btnExportFoodsCsv.addEventListener('click', () => {
      const activeFoods = getFilteredFoods();
      const header = ['Whole-Food & Swap Name', 'Age Group', 'Nutrient Domain', 'NFI-10 Score', 'NFI-10 Breakdown', 'UPF Trap Replaced', 'Whole-Food Upgrade', 'Key Brain & Growth Nutrients', 'Bioavailability Synergy & Choking/Allergen Safety', 'Clinical Anchor', 'Reference URL'].map(sanitizeCsvCell);
      const rows = activeFoods.map(f => [
        sanitizeCsvCell(f.name),
        sanitizeCsvCell(f.ageLabel),
        sanitizeCsvCell(f.categoryLabel),
        sanitizeCsvCell(f.nfiScore),
        sanitizeCsvCell(f.nfiBreakdown),
        sanitizeCsvCell(f.trapReplaced),
        sanitizeCsvCell(f.wholeFoodSwap),
        sanitizeCsvCell((f.keyNutrients || []).join(' | ')),
        sanitizeCsvCell(f.synergySafety),
        sanitizeCsvCell(f.researchAnchor),
        sanitizeCsvCell(f.link)
      ].join(','));
      const csvContent = [header.join(','), ...rows].join('\n');
      triggerFileDownload(
        `safekids-wholesome-foods-${currentFoodAgeFilter}-${currentFoodDomainFilter}.csv`,
        csvContent,
        'text/csv;charset=utf-8;'
      );
      flashButtonSuccess(btnExportFoodsCsv, '✓ Downloaded CSV!');
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('export_foods', { format: 'csv', count: activeFoods.length });
      }
    });
  }
}

function buildFoodCard(f) {
  const card = document.createElement('div');
  card.className = 'card food-card';

  const body = document.createElement('div');

  // 1. Glanceable Header (Title + Category + NFI-10 Score)
  const header = document.createElement('div');
  header.className = 'channel-header';

  const titleWrap = document.createElement('div');
  const nameDiv = document.createElement('div');
  nameDiv.className = 'channel-name';
  nameDiv.textContent = f.name;

  const catDiv = document.createElement('div');
  catDiv.className = 'food-category-label';
  catDiv.textContent = f.categoryLabel;

  titleWrap.appendChild(nameDiv);
  titleWrap.appendChild(catDiv);

  const nfiSpan = document.createElement('span');
  nfiSpan.className = `stimulus-tag ${f.stimulusClass}`;
  nfiSpan.textContent = `NFI-10: ${f.nfiScore}`;

  header.appendChild(titleWrap);
  header.appendChild(nfiSpan);
  body.appendChild(header);

  // 2. Glanceable Age + NOVA-1 Badge
  const metaRow = document.createElement('div');
  metaRow.style.display = 'flex';
  metaRow.style.flexWrap = 'wrap';
  metaRow.style.gap = '0.35rem';
  metaRow.style.margin = '0.5rem 0';

  const ageBadge = document.createElement('span');
  ageBadge.className = 'tag-badge age-range-badge';
  ageBadge.textContent = f.ageLabel;

  const novaBadge = document.createElement('span');
  novaBadge.className = 'monetization-badge monetization-free';
  novaBadge.textContent = 'NOVA-1 Whole Matrix';

  metaRow.appendChild(ageBadge);
  metaRow.appendChild(novaBadge);
  body.appendChild(metaRow);

  // 3. Glanceable Swap Box: Trap Replaced -> Whole-Food Upgrade
  const swapBox = document.createElement('div');
  swapBox.className = 'food-swap-box';

  const trapDiv = document.createElement('div');
  trapDiv.className = 'food-trap-line';
  const trapStrong = document.createElement('strong');
  trapStrong.textContent = '❌ Replaces Trap: ';
  trapDiv.appendChild(trapStrong);
  trapDiv.appendChild(document.createTextNode(f.trapReplaced));

  const upgDiv = document.createElement('div');
  upgDiv.className = 'food-upgrade-line';
  const upgStrong = document.createElement('strong');
  upgStrong.textContent = '✅ Whole-Food Swap: ';
  upgDiv.appendChild(upgStrong);
  upgDiv.appendChild(document.createTextNode(f.wholeFoodSwap));

  swapBox.appendChild(trapDiv);
  swapBox.appendChild(upgDiv);
  body.appendChild(swapBox);

  // 4. Glanceable Key Nutrients Chips
  if (f.keyNutrients && f.keyNutrients.length > 0) {
    const nutList = document.createElement('div');
    nutList.className = 'quick-start-strip';

    f.keyNutrients.forEach(kn => {
      const span = document.createElement('span');
      span.className = 'domain-badge';
      span.textContent = kn;
      nutList.appendChild(span);
    });
    body.appendChild(nutList);
  }

  // 5. Progressive-Disclosure Clinical Drawer Nodes
  const drawerNodes = [];
  const fMeta = getFoodVisualMeta(f);
  drawerNodes.push(createCardVisualStrip(fMeta.src, fMeta.alt, fMeta.kicker, fMeta.sub));

  const descP = document.createElement('p');
  descP.className = 'channel-desc';
  descP.style.marginBottom = '0.6rem';
  const descStrong = document.createElement('strong');
  descStrong.textContent = 'Why Clinicians Approve: ';
  descP.appendChild(descStrong);
  descP.appendChild(document.createTextNode(f.whyCliniciansApprove));
  drawerNodes.push(descP);

  const synBox = document.createElement('div');
  synBox.className = 'food-synergy-box';

  const synStrong = document.createElement('strong');
  synStrong.textContent = '🧬 Bioavailability Synergy & Prep Safety: ';
  synBox.appendChild(synStrong);
  synBox.appendChild(document.createTextNode(f.synergySafety));
  drawerNodes.push(synBox);

  const citBox = document.createElement('div');
  citBox.className = 'citation-box';

  const resDiv = document.createElement('div');
  const resStrong = document.createElement('strong');
  resStrong.textContent = '📚 Clinical Anchor: ';
  resDiv.appendChild(resStrong);
  resDiv.appendChild(document.createTextNode(f.researchAnchor));

  const nfiDiv = document.createElement('div');
  nfiDiv.style.marginTop = '0.25rem';
  const nfiStrong = document.createElement('strong');
  nfiStrong.textContent = '🥗 NFI-10 Rubric: ';
  const nfiBadge = document.createElement('span');
  nfiBadge.className = 'sem-badge';
  nfiBadge.textContent = f.nfiBreakdown;
  nfiDiv.appendChild(nfiStrong);
  nfiDiv.appendChild(nfiBadge);

  citBox.appendChild(resDiv);
  citBox.appendChild(nfiDiv);
  drawerNodes.push(citBox);

  drawerNodes.push(
    createExpertBridgeBox(
      'expert-bridge-md',
      '🩺 Pediatric Feeding MD • 3-Step Picky-Eater Sensory Bridge (SOS / Birch, 1999):',
      getFoodSensoryBridge(f)
    )
  );

  appendClinicalDrawer(body, card, drawerNodes);
  card.appendChild(body);

  // Action Link
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
  const viewFoodRefLabel = (i18n && i18n.viewFoodRefBtn) || 'View Clinical & Nutrient Reference';
  const link = document.createElement('a');
  link.href = f.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline btn-sm';
  link.style.marginTop = '0.75rem';
  link.style.width = '100%';
  link.style.justifyContent = 'center';
  link.appendChild(createExternalLinkSvg());
  link.appendChild(document.createTextNode(' ' + viewFoodRefLabel));

  link.addEventListener('click', () => {
    if (window.trackSafeKidsEvent) {
      window.trackSafeKidsEvent('click_food_reference', { name: f.name, url: f.link });
    }
  });

  card.appendChild(link);
  return card;
}

function renderFoods() {
  const container = document.getElementById('food-grid');
  if (!container) return;

  const filtered = getFilteredFoods();
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;

  const countBadge = document.getElementById('food-count-badge');
  if (countBadge) {
    countBadge.textContent = (i18n && typeof i18n.formatFoodsCount === 'function')
      ? i18n.formatFoodsCount(filtered.length)
      : `${filtered.length} whole foods & swaps`;
  }

  if (filtered.length === 0) {
    container.replaceChildren(
      createEmptyState(
        (i18n && i18n.emptyFoodsTitle) || 'No whole foods or swaps match your search criteria.',
        (i18n && i18n.emptyFoodsSub) || "Try selecting 'All Whole Foods & Swaps' or clearing the nutrient domain and search filters."
      )
    );
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach(f => {
    fragment.appendChild(buildFoodCard(f));
  });
  container.replaceChildren(fragment);
}

function setupFoodFilterListeners() {
  const ageButtons = document.querySelectorAll('#food-age-filters .filter-btn');
  ageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      ageButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const rawAge = activeBtn.getAttribute('data-filter') || 'all';
      currentFoodAgeFilter = ALLOWED_AGE_FILTERS.has(rawAge) ? rawAge : 'all';
      writePersistedFilter(STORAGE_KEYS.FOOD_AGE, currentFoodAgeFilter, ALLOWED_AGE_FILTERS);
      renderFoods();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_foods_age', { age: currentFoodAgeFilter });
      }
    });
  });

  const domainButtons = document.querySelectorAll('#food-domain-filters .filter-btn');
  domainButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      domainButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const rawDomain = activeBtn.getAttribute('data-filter') || 'all';
      currentFoodDomainFilter = ALLOWED_FOOD_DOMAINS.has(rawDomain) ? rawDomain : 'all';
      writePersistedFilter(STORAGE_KEYS.FOOD_DOMAIN, currentFoodDomainFilter, ALLOWED_FOOD_DOMAINS);
      renderFoods();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_foods_domain', { domain: currentFoodDomainFilter });
      }
    });
  });
}

function setupFoodSearch() {
  const input = document.getElementById('food-search');
  if (!input) return;
  let fSearchTimer;
  input.addEventListener('input', (e) => {
    currentFoodSearch = e.target.value.toLowerCase().trim();
    renderFoods();
    clearTimeout(fSearchTimer);
    if (currentFoodSearch.length >= 3 && window.trackSafeKidsEvent) {
      fSearchTimer = setTimeout(() => {
        window.trackSafeKidsEvent('search_foods', { query: currentFoodSearch });
      }, 500);
    }
  });
}

// ==================== LISTEN & READ (SCREEN-FREE AUDIO, PODCASTS & LIVING BOOKS) ====================
function getFilteredListenItems() {
  return listenReadData.filter(item => {
    const ageVal = Array.isArray(item.age) ? item.age : [item.age || ''];
    const matchesAge = currentListenAgeFilter === 'all' || ageVal.includes(currentListenAgeFilter);
    const matchesDomain = currentListenDomainFilter === 'all' || item.category === currentListenDomainFilter;

    const matchesSearch = !currentListenSearch ||
      (item.name && item.name.toLowerCase().includes(currentListenSearch)) ||
      (item.creator && item.creator.toLowerCase().includes(currentListenSearch)) ||
      (item.formatBadge && item.formatBadge.toLowerCase().includes(currentListenSearch)) ||
      (item.categoryLabel && item.categoryLabel.toLowerCase().includes(currentListenSearch)) ||
      (item.whyNeurologistsApprove && item.whyNeurologistsApprove.toLowerCase().includes(currentListenSearch)) ||
      (item.dialogicPrompt && item.dialogicPrompt.toLowerCase().includes(currentListenSearch)) ||
      (item.researchAnchor && item.researchAnchor.toLowerCase().includes(currentListenSearch)) ||
      (item.ageLabel && item.ageLabel.toLowerCase().includes(currentListenSearch)) ||
      (item.literacySkills && item.literacySkills.some(ls => ls.toLowerCase().includes(currentListenSearch))) ||
      (item.startWith && item.startWith.some(sw => sw.toLowerCase().includes(currentListenSearch)));

    return matchesAge && matchesDomain && matchesSearch;
  });
}

function setupListenExport() {
  const btnCopyListen = document.getElementById('btn-copy-listen-list');
  const btnExportListenJson = document.getElementById('btn-export-listen-json');
  const btnExportListenCsv = document.getElementById('btn-export-listen-csv');

  if (btnCopyListen) {
    btnCopyListen.addEventListener('click', () => {
      const activeItems = getFilteredListenItems();
      const text = activeItems.map(item => `${item.name} (${item.categoryLabel} • SEM-10: ${item.stimulusScore}): ${item.link}`).join('\n');
      safeCopyText(
        text,
        () => {
          flashButtonSuccess(btnCopyListen, `✓ Copied ${activeItems.length} Audio & Book Picks!`);
          if (window.trackSafeKidsEvent) {
            window.trackSafeKidsEvent('export_listen_read', { format: 'clipboard', count: activeItems.length });
          }
        },
        () => {
          flashButtonSuccess(btnCopyListen, `✓ Prepared ${activeItems.length} Picks`);
        }
      );
    });
  }

  if (btnExportListenJson) {
    btnExportListenJson.addEventListener('click', () => {
      const activeItems = getFilteredListenItems();
      const payload = {
        exportedAt: new Date().toISOString(),
        ageFilterApplied: currentListenAgeFilter,
        domainFilterApplied: currentListenDomainFilter,
        itemCount: activeItems.length,
        items: activeItems.map(item => ({
          name: item.name,
          creator: item.creator,
          ageBands: item.age,
          ageLabel: item.ageLabel,
          domain: item.category,
          domainLabel: item.categoryLabel,
          formatBadge: item.formatBadge,
          sem10Score: item.stimulusScore,
          sem10Breakdown: item.semBreakdown,
          literacySkills: item.literacySkills,
          startWith: item.startWith,
          dialogicPrompt: item.dialogicPrompt,
          researchAnchor: item.researchAnchor,
          url: item.link
        }))
      };
      triggerFileDownload(
        `safekids-listen-read-${currentListenAgeFilter}-${currentListenDomainFilter}.json`,
        JSON.stringify(payload, null, 2),
        'application/json'
      );
      flashButtonSuccess(btnExportListenJson, '✓ Downloaded JSON!');
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('export_listen_read', { format: 'json', count: activeItems.length });
      }
    });
  }

  if (btnExportListenCsv) {
    btnExportListenCsv.addEventListener('click', () => {
      const activeItems = getFilteredListenItems();
      const header = ['Title', 'Creator / Author', 'Age Group', 'Format Domain', 'Delivery Format', 'SEM-10 Score', 'SEM-10 Breakdown', 'Literacy & Cognitive Skills', 'Start With', 'Dialogic Reading & Serve-and-Return Prompt', 'Clinical Research Anchor', 'Official / Library URL'].map(sanitizeCsvCell);
      const rows = activeItems.map(item => [
        sanitizeCsvCell(item.name),
        sanitizeCsvCell(item.creator),
        sanitizeCsvCell(item.ageLabel),
        sanitizeCsvCell(item.categoryLabel),
        sanitizeCsvCell(item.formatBadge),
        sanitizeCsvCell(item.stimulusScore),
        sanitizeCsvCell(item.semBreakdown),
        sanitizeCsvCell((item.literacySkills || []).join(' | ')),
        sanitizeCsvCell((item.startWith || []).join(' | ')),
        sanitizeCsvCell(item.dialogicPrompt),
        sanitizeCsvCell(item.researchAnchor),
        sanitizeCsvCell(item.link)
      ].join(','));
      const csvContent = [header.join(','), ...rows].join('\n');
      triggerFileDownload(
        `safekids-listen-read-${currentListenAgeFilter}-${currentListenDomainFilter}.csv`,
        csvContent,
        'text/csv;charset=utf-8;'
      );
      flashButtonSuccess(btnExportListenCsv, '✓ Downloaded CSV!');
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('export_listen_read', { format: 'csv', count: activeItems.length });
      }
    });
  }
}

function buildListenCard(item) {
  const card = document.createElement('div');
  card.className = 'card listen-card';

  const body = document.createElement('div');

  // 1. Glanceable Header (Title + Creator + Calm Stimulus Score)
  const header = document.createElement('div');
  header.className = 'channel-header';

  const titleWrap = document.createElement('div');
  const nameDiv = document.createElement('div');
  nameDiv.className = 'channel-name';
  nameDiv.textContent = item.name;

  const creatorDiv = document.createElement('div');
  creatorDiv.className = 'listen-creator-label';
  creatorDiv.textContent = `${item.categoryLabel} • ${item.creator}`;

  titleWrap.appendChild(nameDiv);
  titleWrap.appendChild(creatorDiv);

  const stimSpan = document.createElement('span');
  stimSpan.className = `stimulus-tag ${item.stimulusClass}`;
  stimSpan.textContent = `SEM-10: ${item.stimulusScore}`;

  header.appendChild(titleWrap);
  header.appendChild(stimSpan);
  body.appendChild(header);

  // 2. Glanceable Age + Screen-Free Format Badges
  const metaRow = document.createElement('div');
  metaRow.style.display = 'flex';
  metaRow.style.flexWrap = 'wrap';
  metaRow.style.gap = '0.35rem';
  metaRow.style.margin = '0.5rem 0';

  const ageBadge = document.createElement('span');
  ageBadge.className = 'tag-badge age-range-badge';
  ageBadge.textContent = item.ageLabel;

  const formatBadge = document.createElement('span');
  formatBadge.className = 'monetization-badge monetization-free';
  formatBadge.textContent = item.formatBadge || '100% Screen-Free';

  metaRow.appendChild(ageBadge);
  metaRow.appendChild(formatBadge);
  body.appendChild(metaRow);

  // 3. Glanceable Summary
  const descP = document.createElement('p');
  descP.className = 'channel-desc card-summary-clamp';
  descP.textContent = item.whyNeurologistsApprove;
  body.appendChild(descP);

  // 4. Glanceable "Start With" Chips
  if (item.startWith && item.startWith.length > 0) {
    const swBox = document.createElement('div');
    swBox.className = 'quick-start-strip';

    const swTitle = document.createElement('span');
    swTitle.className = 'quick-start-label';
    swTitle.textContent = '🎧 Start With:';
    swBox.appendChild(swTitle);

    item.startWith.forEach(sw => {
      const badge = document.createElement('span');
      badge.className = 'tag-badge quick-start-chip';
      badge.textContent = sw;
      swBox.appendChild(badge);
    });
    body.appendChild(swBox);
  }

  // 5. Progressive-Disclosure Clinical Drawer Nodes
  const drawerNodes = [];
  const lMeta = getListenVisualMeta(item);
  drawerNodes.push(createCardVisualStrip(lMeta.src, lMeta.alt, lMeta.kicker, lMeta.sub));

  if (item.literacySkills && item.literacySkills.length > 0) {
    const skillList = document.createElement('div');
    skillList.style.display = 'flex';
    skillList.style.flexWrap = 'wrap';
    skillList.style.gap = '0.25rem';
    skillList.style.marginBottom = '0.6rem';

    item.literacySkills.forEach(ls => {
      const span = document.createElement('span');
      span.className = 'domain-badge';
      span.textContent = ls;
      skillList.appendChild(span);
    });
    drawerNodes.push(skillList);
  }

  const citBox = document.createElement('div');
  citBox.className = 'citation-box';

  const resDiv = document.createElement('div');
  const resStrong = document.createElement('strong');
  resStrong.textContent = '📚 Neuroscience & Literacy Anchor: ';
  resDiv.appendChild(resStrong);
  resDiv.appendChild(document.createTextNode(item.researchAnchor));

  const semDiv = document.createElement('div');
  semDiv.style.marginTop = '0.25rem';
  const semStrong = document.createElement('strong');
  semStrong.textContent = '🔬 SEM-10 Rubric: ';
  const semBadge = document.createElement('span');
  semBadge.className = 'sem-badge';
  semBadge.textContent = item.semBreakdown;
  semDiv.appendChild(semStrong);
  semDiv.appendChild(semBadge);

  citBox.appendChild(resDiv);
  citBox.appendChild(semDiv);
  drawerNodes.push(citBox);

  drawerNodes.push(
    createExpertBridgeBox(
      'expert-bridge-phd',
      '📖 Dialogic Reading & Serve-and-Return Prompt (Hutton et al., 2018 / Romeo et al., 2018):',
      item.dialogicPrompt
    )
  );

  appendClinicalDrawer(body, card, drawerNodes);
  card.appendChild(body);

  // Action Link
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
  const viewListenRefLabel = (i18n && i18n.viewListenRefBtn) || 'Listen / View Book Reference';
  const link = document.createElement('a');
  link.href = item.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline btn-sm';
  link.style.marginTop = '0.75rem';
  link.style.width = '100%';
  link.style.justifyContent = 'center';
  link.appendChild(createExternalLinkSvg());
  link.appendChild(document.createTextNode(' ' + viewListenRefLabel));

  link.addEventListener('click', () => {
    if (window.trackSafeKidsEvent) {
      window.trackSafeKidsEvent('click_listen_read', { name: item.name, url: item.link });
    }
  });

  card.appendChild(link);
  return card;
}

function renderListenItems() {
  const container = document.getElementById('listen-grid');
  if (!container) return;

  const filtered = getFilteredListenItems();
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;

  const countBadge = document.getElementById('listen-count-badge');
  if (countBadge) {
    countBadge.textContent = (i18n && typeof i18n.formatListenCount === 'function')
      ? i18n.formatListenCount(filtered.length)
      : `${filtered.length} audio & book picks`;
  }

  if (filtered.length === 0) {
    container.replaceChildren(
      createEmptyState(
        (i18n && i18n.emptyListenTitle) || 'No podcasts, audiobooks, or books match your search criteria.',
        (i18n && i18n.emptyListenSub) || "Try selecting 'All Audio & Books' or clearing the format and search filters."
      )
    );
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach(item => {
    fragment.appendChild(buildListenCard(item));
  });
  container.replaceChildren(fragment);
}

function setupListenFilterListeners() {
  const ageButtons = document.querySelectorAll('#listen-age-filters .filter-btn');
  ageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      ageButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const rawAge = activeBtn.getAttribute('data-filter') || 'all';
      currentListenAgeFilter = ALLOWED_AGE_FILTERS.has(rawAge) ? rawAge : 'all';
      writePersistedFilter(STORAGE_KEYS.LISTEN_AGE, currentListenAgeFilter, ALLOWED_AGE_FILTERS);
      renderListenItems();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_listen_age', { age: currentListenAgeFilter });
      }
    });
  });

  const domainButtons = document.querySelectorAll('#listen-domain-filters .filter-btn');
  domainButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      domainButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const rawDomain = activeBtn.getAttribute('data-filter') || 'all';
      currentListenDomainFilter = ALLOWED_LISTEN_DOMAINS.has(rawDomain) ? rawDomain : 'all';
      writePersistedFilter(STORAGE_KEYS.LISTEN_DOMAIN, currentListenDomainFilter, ALLOWED_LISTEN_DOMAINS);
      renderListenItems();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_listen_domain', { domain: currentListenDomainFilter });
      }
    });
  });
}

function setupListenSearch() {
  const input = document.getElementById('listen-search');
  if (!input) return;
  let lSearchTimer;
  input.addEventListener('input', (e) => {
    currentListenSearch = e.target.value.toLowerCase().trim();
    renderListenItems();
    clearTimeout(lSearchTimer);
    if (currentListenSearch.length >= 3 && window.trackSafeKidsEvent) {
      lSearchTimer = setTimeout(() => {
        window.trackSafeKidsEvent('search_listen', { query: currentListenSearch });
      }, 500);
    }
  });
}

// ==================== INTERACTIVE NFI-10 FOOD AUDITOR (MUST_RESET_ON_RELOAD) ====================
function setupFoodCalculator() {
  const calcContainer = document.getElementById('food-calculator');
  if (!calcContainer) return;

  const scores = {
    matrix: 0,
    glycemic: 0,
    nutrients: 0,
    additives: 0,
    texture: 0
  };

  const scoreBadge = document.getElementById('food-calc-score-badge');
  const breakdownText = document.getElementById('food-calc-breakdown-text');
  const verdictDesc = document.getElementById('food-calc-verdict-desc');
  const resetBtn = document.getElementById('food-calc-reset-btn');

  function updateFoodCalculatorView() {
    const result = computeNfi10Score(scores);

    if (breakdownText) {
      breakdownText.textContent = result.nfiBreakdown;
    }

    if (scoreBadge && verdictDesc) {
      scoreBadge.className = `stimulus-tag ${result.stimulusClass}`;
      if (result.tier === 'low') {
        scoreBadge.textContent = `NFI-10 Score: ${result.scoreLabel} — Whole-Food Matrix (Approved Daily Staple)`;
        verdictDesc.textContent = 'Intact cellular matrix, zero synthetic dyes/emulsifiers, and steady glycemic release. Supports brain myelination, dopamine synthesis, and microbiome health (Schwarzenberg et al., 2018; Hall et al., 2019).';
      } else if (result.tier === 'med') {
        scoreBadge.textContent = `NFI-10 Score: ${result.scoreLabel} — Culinary / Mildly Processed (Pair with Protein & Fiber)`;
        verdictDesc.textContent = 'Acceptable culinary or lightly processed food. Pair with intact protein, healthy fat, or raw produce to slow gastric emptying and buffer postprandial glucose.';
      } else {
        scoreBadge.textContent = `NFI-10 Score: ${result.scoreLabel} — Ultra-Processed Trap (Replace with Whole-Food Swap)`;
        verdictDesc.textContent = 'High risk of rapid glycemic spike-and-crash, neurobehavioral dye/additive reactivity (McCann et al., 2007; OEHHA, 2021), and hyper-palatable satiety bypass. See Section 5 for a 1-to-1 whole-food swap.';
      }
    }
  }

  const dimGroups = calcContainer.querySelectorAll('.food-dim-box');
  dimGroups.forEach(group => {
    const dim = group.getAttribute('data-food-dim');
    const buttons = group.querySelectorAll('.food-opt-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        scores[dim] = clampSemDimension(btn.getAttribute('data-pts') || '0');
        updateFoodCalculatorView();
        if (window.trackSafeKidsEvent) {
          const currentResult = computeNfi10Score(scores);
          window.trackSafeKidsEvent('use_nfi_calculator', { dimension: dim, total: currentResult.score });
        }
      });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      Object.keys(scores).forEach(k => { scores[k] = 0; });
      dimGroups.forEach(group => {
        const buttons = group.querySelectorAll('.food-opt-btn');
        buttons.forEach((b, idx) => {
          if (idx === 0) b.classList.add('active');
          else b.classList.remove('active');
        });
      });
      updateFoodCalculatorView();
    });
  }

  updateFoodCalculatorView();
}

// ==================== EXPERT LENS: DR. BECKY SCRIPT FILTER ====================
const ALLOWED_EXPERT_TOPICS = new Set(['all', 'confidence', 'frustration', 'big-feelings', 'repair']);

function formatExpertStatusText(topic, shown, total) {
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
  const exp = i18n && i18n.expertTab ? i18n.expertTab : null;
  if (topic === 'all') {
    const tpl = (exp && exp.statusAll) || 'Showing all {n} scripts.';
    return tpl.replace('{n}', String(shown));
  }
  const tpl = (exp && exp.statusFiltered) || 'Showing {shown} of {total} scripts.';
  return tpl.replace('{shown}', String(shown)).replace('{total}', String(total));
}

function setupExpertScriptFilters() {
  const filterBtns = document.querySelectorAll('#expert-topic-filters .filter-btn');
  const scriptCards = document.querySelectorAll('#expert-script-grid .expert-script-card');
  const statusEl = document.getElementById('expert-filter-status');
  if (!filterBtns || !filterBtns.length) return;

  const applyTopic = (rawTopic) => {
    const topic = ALLOWED_EXPERT_TOPICS.has(rawTopic) ? rawTopic : 'all';
    currentExpertTopic = topic;
    let shown = 0;
    scriptCards.forEach(card => {
      const match = topic === 'all' || card.getAttribute('data-expert-topic') === topic;
      card.classList.toggle('expert-card-hidden', !match);
      if (match) shown += 1;
    });
    filterBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-expert-topic') === topic;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    if (statusEl) {
      statusEl.textContent = formatExpertStatusText(topic, shown, scriptCards.length);
    }
    return topic;
  };

  refreshExpertFilterStatusRef = () => applyTopic(currentExpertTopic);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget || e.target;
      const applied = applyTopic(target.getAttribute('data-expert-topic') || 'all');
      const grid = document.getElementById('expert-script-grid');
      if (applied !== 'all' && grid && typeof grid.scrollIntoView === 'function') {
        const reduceMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        grid.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_expert_scripts', { topic: applied });
      }
    });
  });
}

function setupExpertCopyButtons() {
  const copyBtns = document.querySelectorAll('#expert-script-grid .expert-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = typeof btn.closest === 'function' ? btn.closest('.expert-script-card') : null;
      const phraseEl = card ? card.querySelector('.expert-try-text') : null;
      if (!phraseEl) return;
      const phrase = (phraseEl.textContent || '').trim();
      const getCopyLabel = () => {
        const exp = getPortalI18n().expertTab;
        return (exp && exp.copyBtn) || 'Copy phrase';
      };
      const getCopiedLabel = () => {
        const exp = getPortalI18n().expertTab;
        return (exp && exp.copiedBtn) || 'Copied ✓';
      };
      const flash = (msg) => {
        btn.textContent = msg;
        setTimeout(() => { btn.textContent = getCopyLabel(); }, 2000);
      };
      safeCopyText(
        phrase,
        () => {
          flash(getCopiedLabel());
          if (window.trackSafeKidsEvent) {
            window.trackSafeKidsEvent('copy_expert_phrase', { topic: card.getAttribute('data-expert-topic') || 'unknown' });
          }
        },
        () => flash(getCopiedLabel())
      );
    });
  });
}

// ==================== CHIRP 3 HD READ ALOUD ENGINE (11 LANGUAGES) ====================
const SPEECH_SYNTH_LANG_MAP = {
  en: 'en-US',
  es: 'es-ES',
  zh: 'zh-CN',
  yue: 'zh-HK',
  ja: 'ja-JP',
  ko: 'ko-KR',
  pt: 'pt-BR',
  fr: 'fr-FR',
  it: 'it-IT',
  de: 'de-DE',
  ar: 'ar-SA'
};

let activeSpeechState = {
  audio: null,
  blobUrl: null,
  abortCtrl: null,
  btnEl: null,
  restoreLabelFn: null
};

function stopSafeKidsSpeech() {
  if (activeSpeechState.abortCtrl && typeof activeSpeechState.abortCtrl.abort === 'function') {
    try { activeSpeechState.abortCtrl.abort(); } catch (err) { /* ignore */ }
  }
  if (activeSpeechState.audio) {
    try {
      activeSpeechState.audio.pause();
      activeSpeechState.audio.removeAttribute('src');
    } catch (err) { /* ignore */ }
  }
  if (activeSpeechState.blobUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
    try { URL.revokeObjectURL(activeSpeechState.blobUrl); } catch (err) { /* ignore */ }
  }
  if (typeof window !== 'undefined' && window.speechSynthesis && typeof window.speechSynthesis.cancel === 'function') {
    try { window.speechSynthesis.cancel(); } catch (err) { /* ignore */ }
  }
  if (activeSpeechState.btnEl) {
    activeSpeechState.btnEl.classList.remove('is-speaking');
    activeSpeechState.btnEl.setAttribute('aria-pressed', 'false');
    if (typeof activeSpeechState.restoreLabelFn === 'function') {
      activeSpeechState.btnEl.textContent = activeSpeechState.restoreLabelFn();
    }
  }
  activeSpeechState = { audio: null, blobUrl: null, abortCtrl: null, btnEl: null, restoreLabelFn: null };
}

function stripDecorativeQuotesAndEmoji(raw) {
  return String(raw || '')
    .replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF•⇒→←«»„“”"「」『』]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function playBrowserSpeechFallback(cleanText, safeLang, btnEl) {
  if (typeof window === 'undefined' || !window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== 'function') {
    stopSafeKidsSpeech();
    return;
  }
  try {
    const utter = new window.SpeechSynthesisUtterance(cleanText);
    const bcp47 = SPEECH_SYNTH_LANG_MAP[safeLang] || 'en-US';
    utter.lang = bcp47;
    if (typeof window.speechSynthesis.getVoices === 'function') {
      const voices = window.speechSynthesis.getVoices() || [];
      const exact = voices.find(v => v && v.lang && v.lang.toLowerCase() === bcp47.toLowerCase());
      const prefix = voices.find(v => v && v.lang && v.lang.toLowerCase().startsWith(bcp47.split('-')[0]));
      if (exact || prefix) utter.voice = exact || prefix;
    }
    utter.onend = () => {
      if (activeSpeechState.btnEl === btnEl) stopSafeKidsSpeech();
    };
    utter.onerror = () => {
      if (activeSpeechState.btnEl === btnEl) stopSafeKidsSpeech();
    };
    window.speechSynthesis.speak(utter);
  } catch (err) {
    stopSafeKidsSpeech();
  }
}

function playAudioUrlWithFallback(srcUrl, isBlob, onFail, btnEl) {
  if (typeof Audio !== 'function') {
    onFail();
    return;
  }
  const audio = new Audio(srcUrl);
  activeSpeechState.audio = audio;
  if (isBlob) activeSpeechState.blobUrl = srcUrl;
  let failed = false;
  const triggerFail = () => {
    if (failed || activeSpeechState.btnEl !== btnEl) return;
    failed = true;
    onFail();
  };
  audio.onended = () => {
    if (activeSpeechState.btnEl === btnEl) stopSafeKidsSpeech();
  };
  audio.onerror = triggerFail;
  try {
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(triggerFail);
    }
  } catch (err) {
    triggerFail();
  }
}

function speakSafeKidsItem(rawText, audioKey, btnEl, restoreLabelFn) {
  if (!btnEl) return;
  if (activeSpeechState.btnEl === btnEl) {
    stopSafeKidsSpeech();
    return;
  }
  stopSafeKidsSpeech();

  const cleanText = stripDecorativeQuotesAndEmoji(rawText);
  if (!cleanText) return;

  const safeLang = ALLOWED_LANGUAGES.has(currentLanguage) ? currentLanguage : 'en';
  const safePersona = ALLOWED_CHIRP_PERSONAS.has(currentChirpPersona) ? currentChirpPersona : 'Aoede';
  const safeKey = /^[a-z0-9_-]+$/i.test(String(audioKey || '')) ? String(audioKey) : '';
  const i18n = getPortalI18n();
  const stopLabel = (i18n.expertTab && i18n.expertTab.chirpStopBtn) || '⏹ Stop';

  activeSpeechState.btnEl = btnEl;
  activeSpeechState.restoreLabelFn = restoreLabelFn;
  btnEl.classList.add('is-speaking');
  btnEl.setAttribute('aria-pressed', 'true');
  btnEl.textContent = stopLabel;

  const staticMp3Url = safeKey ? `audio/${safeLang}/${safeKey}.mp3` : '';
  lastChirpAudioSrc = staticMp3Url;

  if (window.trackSafeKidsEvent) {
    window.trackSafeKidsEvent('chirp_read_aloud', { lang: safeLang, key: safeKey || 'custom', persona: safePersona });
  }

  const tryLiveProxyThenStaticOrWebSpeech = () => {
    if (typeof fetch !== 'function') {
      if (staticMp3Url && safePersona !== 'Aoede') {
        playAudioUrlWithFallback(staticMp3Url, false, () => playBrowserSpeechFallback(cleanText, safeLang, btnEl), btnEl);
      } else {
        playBrowserSpeechFallback(cleanText, safeLang, btnEl);
      }
      return;
    }
    const ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    activeSpeechState.abortCtrl = ctrl;
    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, lang: safeLang, persona: safePersona }),
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(resp => {
        if (!resp || !resp.ok) throw new Error('tts_proxy_unavailable');
        const ctype = (resp.headers && typeof resp.headers.get === 'function' ? resp.headers.get('Content-Type') : '') || '';
        if (ctype && !ctype.includes('audio/')) throw new Error('not_audio');
        return resp.blob();
      })
      .then(blob => {
        if (activeSpeechState.btnEl !== btnEl) return;
        if (!blob || blob.size < 256 || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
          throw new Error('empty_blob');
        }
        const blobUrl = URL.createObjectURL(blob);
        lastChirpAudioSrc = `/api/tts?lang=${safeLang}&persona=${safePersona}`;
        playAudioUrlWithFallback(blobUrl, true, () => {
          if (staticMp3Url && safePersona !== 'Aoede') {
            playAudioUrlWithFallback(staticMp3Url, false, () => playBrowserSpeechFallback(cleanText, safeLang, btnEl), btnEl);
          } else {
            playBrowserSpeechFallback(cleanText, safeLang, btnEl);
          }
        }, btnEl);
      })
      .catch(() => {
        if (activeSpeechState.btnEl !== btnEl) return;
        if (staticMp3Url && safePersona !== 'Aoede') {
          lastChirpAudioSrc = staticMp3Url;
          playAudioUrlWithFallback(staticMp3Url, false, () => playBrowserSpeechFallback(cleanText, safeLang, btnEl), btnEl);
        } else {
          playBrowserSpeechFallback(cleanText, safeLang, btnEl);
        }
      });
  };

  if (safePersona === 'Aoede' && staticMp3Url) {
    playAudioUrlWithFallback(staticMp3Url, false, tryLiveProxyThenStaticOrWebSpeech, btnEl);
  } else {
    tryLiveProxyThenStaticOrWebSpeech();
  }
}

function setupChirpReadAloud() {
  const personaSelect = document.getElementById('chirp-persona-select');
  if (personaSelect) {
    personaSelect.value = ALLOWED_CHIRP_PERSONAS.has(currentChirpPersona) ? currentChirpPersona : 'Aoede';
    personaSelect.addEventListener('change', (e) => {
      const target = e.currentTarget || e.target;
      const val = target && target.value ? target.value : 'Aoede';
      currentChirpPersona = ALLOWED_CHIRP_PERSONAS.has(val) ? val : 'Aoede';
      personaSelect.value = currentChirpPersona;
      writePersistedFilter(STORAGE_KEYS.CHIRP_PERSONA, currentChirpPersona, ALLOWED_CHIRP_PERSONAS);
      stopSafeKidsSpeech();
    });
  }

  const listenBtns = document.querySelectorAll('#expert-script-grid .expert-listen-btn');
  listenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = typeof btn.closest === 'function' ? btn.closest('.expert-script-card') : null;
      const phraseEl = card ? card.querySelector('.expert-try-text') : null;
      const phrase = phraseEl ? (phraseEl.textContent || '').trim() : '';
      const audioKey = btn.getAttribute('data-audio-key') || '';
      speakSafeKidsItem(phrase, audioKey, btn, () => {
        const exp = getPortalI18n().expertTab;
        return (exp && exp.chirpListenBtn) || '🔊 Read Aloud';
      });
    });
  });

  const bpReadBtn = document.getElementById('btn-read-blueprint');
  if (bpReadBtn) {
    bpReadBtn.addEventListener('click', () => {
      const bp = computeDailyBlueprint(currentBlueprintAge);
      const spoken = `${bp.stageHeadline}. ${bp.screenBudget}. ${bp.sleepCutoff}. ${bp.mealRule}`;
      speakSafeKidsItem(spoken, `blueprint_${bp.ageKey}`, bpReadBtn, () => {
        const i18n = getPortalI18n();
        return i18n.blueprintReadBtn || '🔊 Read Fridge Plan';
      });
    });
  }
}

function applyExpertTabTranslations(i18n) {
  if (!i18n || !i18n.expertTab) return;
  const exp = i18n.expertTab;

  const entryCard = document.getElementById('expert-entry-card');
  if (entryCard && typeof entryCard.querySelector === 'function') {
    const ek = entryCard.querySelector('.expert-entry-kicker');
    const et = entryCard.querySelector('.expert-entry-title');
    const es = entryCard.querySelector('.expert-entry-sub');
    const ec = entryCard.querySelector('.expert-entry-cta');
    if (ek && exp.entryKicker) ek.textContent = exp.entryKicker;
    if (et && exp.entryTitle) et.textContent = exp.entryTitle;
    if (es && exp.entrySub) es.textContent = exp.entrySub;
    if (ec && exp.entryCta) ec.textContent = exp.entryCta;
  }

  const setById = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
  };

  setById('expert-heading-text', exp.heading);
  setById('expert-video-count-badge', exp.badge);
  setById('expert-lede-text', exp.lede);
  setById('expert-about-text', exp.about);
  setById('expert-disclaimer-text', exp.disclaimer);
  setById('expert-picker-title', exp.pickerTitle);
  setById('expert-picker-sub', exp.pickerSub);
  setById('chirp-voice-label', exp.chirpVoiceLabel);
  setById('expert-principles-title', exp.principlesTitle);
  setById('expert-practice-title', exp.practiceTitle);
  setById('expert-practice-sub', exp.practiceSub);
  setById('expert-videos-title', exp.videosTitle);
  setById('expert-videos-sub', exp.videosSub);
  setById('expert-channels-title', exp.channelsTitle);
  setById('expert-channels-sub', exp.channelsSub);

  if (exp.topics) {
    const topicBtns = document.querySelectorAll('#expert-topic-filters .expert-topic-btn');
    topicBtns.forEach(btn => {
      if (typeof btn.querySelector !== 'function') return;
      const tKey = btn.getAttribute('data-expert-topic');
      const lbl = btn.querySelector('.expert-topic-label');
      if (lbl && tKey && exp.topics[tKey]) {
        lbl.textContent = exp.topics[tKey];
      }
    });
  }

  const cards = document.querySelectorAll('#expert-script-grid .expert-script-card');
  if (Array.isArray(exp.scripts)) {
    cards.forEach((card, idx) => {
      const sc = exp.scripts[idx];
      if (!sc || typeof card.querySelector !== 'function') return;
      const mEl = card.querySelector('.expert-moment-text');
      const ilEl = card.querySelector('.expert-instead-label');
      const itEl = card.querySelector('.expert-instead-text');
      const tlEl = card.querySelector('.expert-try-label');
      const ttEl = card.querySelector('.expert-try-text');
      const lBtn = card.querySelector('.expert-listen-btn');
      const cBtn = card.querySelector('.expert-copy-btn');
      const wsEl = card.querySelector('.expert-why summary');
      const wyEl = card.querySelector('.expert-script-why');
      if (mEl) mEl.textContent = sc.moment;
      if (ilEl && exp.insteadLabel) ilEl.textContent = exp.insteadLabel;
      if (itEl) itEl.textContent = sc.instead;
      if (tlEl && exp.tryLabel) tlEl.textContent = exp.tryLabel;
      if (ttEl) ttEl.textContent = sc.tryText;
      if (lBtn && exp.chirpListenBtn) lBtn.textContent = exp.chirpListenBtn;
      if (cBtn && exp.copyBtn) cBtn.textContent = exp.copyBtn;
      if (wsEl && exp.whySummary) wsEl.textContent = exp.whySummary;
      if (wyEl) wyEl.textContent = sc.why;
    });
  }

  const pCards = document.querySelectorAll('.expert-principles-grid .expert-principle-card');
  if (Array.isArray(exp.principles)) {
    pCards.forEach((pCard, idx) => {
      const pr = exp.principles[idx];
      if (!pr || typeof pCard.querySelector !== 'function') return;
      const tEl = pCard.querySelector('.card-title');
      const bEl = pCard.querySelector('p');
      if (tEl) tEl.textContent = pr.title;
      if (bEl) bEl.textContent = pr.body;
    });
  }

  if (typeof refreshExpertFilterStatusRef === 'function') {
    refreshExpertFilterStatusRef();
  }
}

// ==================== LEFT-PANEL WORKSPACE TAB NAVIGATION & DEEP-LINK ROUTING ====================
const WORKSPACE_TAB_METADATA = {
  overview: {
    kicker: 'Tab 1 of 8 • Start Here',
    title: 'Overview & Top 9 Parent Recommendations + Pillar 4 Audio',
    sub: 'Calm daily age rhythm, printable 4-pillar fridge sheet, and core family guidelines.',
    shortLabel: 'Daily Plan & Overview'
  },
  science: {
    kicker: 'Tab 2 of 8 • Clinical Evidence & Rubrics',
    title: 'Clinical Science, Dual 10-Point Auditors (SEM-10 & NFI-10) & 30 Citations',
    sub: 'Peer-reviewed neuroimaging, developmental psychology, pediatric nutrition RCTs, and interactive 60-second calculators.',
    shortLabel: 'Science & Rubrics (30)'
  },
  channels: {
    kicker: 'Tab 3 of 8 • Pillar 1 (Watch)',
    title: 'Parent-Approved Low-Stimulus Channel Directory (28 Channels)',
    sub: 'Curated calm video channels scored on the SEM-10 rubric with 1-click JSON/CSV whitelist export.',
    shortLabel: 'Watch · Channels (28)'
  },
  games: {
    kicker: 'Tab 4 of 8 • Pillar 2 (Play)',
    title: 'Educator-Approved Cognitive Games & Apps Directory (33 Games)',
    sub: 'Constructivist sandboxes, spatial puzzles, and Montessori apps with zero ads and zero loot boxes.',
    shortLabel: 'Play · Games (33)'
  },
  nutrition: {
    kicker: 'Tab 5 of 8 • Pillar 3 (Nourish)',
    title: 'Pediatrician- & Dietitian-Vetted Whole Foods & Lunchbox Swaps (32 Swaps)',
    sub: 'Concrete NOVA-1 whole-food upgrades replacing ultra-processed kid snacks, pouches, and synthetic dyes.',
    shortLabel: 'Nourish · Foods (32)'
  },
  listen: {
    kicker: 'Tab 6 of 8 • Pillar 4 (Listen & Read)',
    title: 'Listen & Read: Screen-Free Audio, Podcasts & Living Books Directory (26 Picks)',
    sub: 'Curated STEM & story podcasts, Yoto/Tonie audio cards, synthetic phonics decodables, and dialogic living books.',
    shortLabel: 'Listen & Read (26)'
  },
  lockdown: {
    kicker: 'Tab 7 of 8 • Technical Defense',
    title: 'Open-Source Parental Tools & Step-by-Step Device/DNS Lockdown Guides',
    sub: '13 open-source parental control architectures plus Steps A–E for BrainRotGuard, KidTube, Family Link, Guided Access, and NextDNS.',
    shortLabel: 'Device & DNS Lockdown'
  },
  expert: {
    kicker: "Tab 8 of 8 • Confidence & Co-Regulation",
    title: "Confidence & Co-Regulation Scripts: What to Say in Hard Moments",
    sub: "5 attachment & self-trust principles, 9 \"say this instead\" scripts, a 7-day practice plan, and 10 free psychologist talks.",
    shortLabel: "Confidence Scripts (9)"
  },
  all: {
    kicker: 'Full Handbook Mode • All 8 Tabs Visible',
    title: 'Complete SafeKids Parent Portal Reference (All Sections)',
    sub: 'Showing all 10 recommendations, 30+ clinical studies, 28 channels, 33 games, 32 whole-food swaps, 26 audio/book picks, and 5 lockdown guides.',
    shortLabel: 'Full Guide (All Sections)'
  }
};

const HASH_TO_TAB_MAP = {
  '#overview': 'overview',
  '#recommendations': 'overview',
  '#daily-blueprint-builder': 'overview',
  '#science': 'science',
  '#research': 'science',
  '#methodology': 'science',
  '#sem-calculator': 'science',
  '#food-calculator': 'science',
  '#channels': 'channels',
  '#directory': 'channels',
  '#games': 'games',
  '#games-directory': 'games',
  '#nutrition': 'nutrition',
  '#nutrition-directory': 'nutrition',
  '#listen': 'listen',
  '#listen-directory': 'listen',
  '#lockdown': 'lockdown',
  '#solutions': 'lockdown',
  '#expert': 'expert',
  '#confidence-scripts': 'expert',
  '#expert-dr-becky': 'expert',
  '#expert-scripts': 'expert',
  '#expert-video-library': 'expert',
  '#all': 'all'
};

let currentWorkspaceTab = 'overview';

function switchWorkspaceTab(rawTab, opts) {
  const options = opts && typeof opts === 'object' ? opts : {};
  const tab = ALLOWED_WORKSPACE_TABS.has(rawTab) ? rawTab : 'overview';
  currentWorkspaceTab = tab;

  if (options.persist !== false) {
    writePersistedFilter(STORAGE_KEYS.ACTIVE_TAB, tab, ALLOWED_WORKSPACE_TABS);
  }

  const panels = document.querySelectorAll('[data-tab-panel]');
  panels.forEach(panel => {
    const panelTab = panel.getAttribute('data-tab-panel');
    if (tab === 'all' || panelTab === tab) {
      panel.classList.remove('tab-hidden');
    } else {
      panel.classList.add('tab-hidden');
    }
  });

  const navBtns = document.querySelectorAll('.sidebar-nav-btn');
  navBtns.forEach(btn => {
    const btnTab = btn.getAttribute('data-tab');
    if (btnTab === tab) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  const mobileBtns = document.querySelectorAll('.mobile-pillar-btn');
  mobileBtns.forEach(btn => {
    const btnTab = btn.getAttribute('data-tab');
    if (btnTab === tab) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
  const tabMetaMap = (i18n && i18n.tabs) ? i18n.tabs : WORKSPACE_TAB_METADATA;
  const meta = tabMetaMap[tab] || WORKSPACE_TAB_METADATA[tab] || WORKSPACE_TAB_METADATA.overview;
  const kickerEl = document.getElementById('workspace-context-kicker');
  const titleEl = document.getElementById('workspace-context-title');
  const subEl = document.getElementById('workspace-context-sub');
  const headerPill = document.getElementById('header-active-pill');
  const contextToggleBtn = document.getElementById('btn-context-view-all');
  const headerToggleBtn = document.getElementById('btn-header-view-all');

  if (kickerEl) kickerEl.textContent = meta.kicker;
  if (titleEl) titleEl.textContent = meta.title;
  if (subEl) subEl.textContent = meta.sub;
  if (headerPill) {
    const activePrefix = (i18n && i18n.activePrefix) || 'Active:';
    const prefixGap = activePrefix.endsWith('：') ? '' : ' ';
    headerPill.textContent = `${activePrefix}${prefixGap}${meta.shortLabel}`;
  }

  if (contextToggleBtn) {
    const returnTabsLabel = (i18n && i18n.returnFocusedTabsBtn) || 'Return to Focused Tabs';
    const showAllLabel = (i18n && i18n.showAllSectionsBtn) || 'Show All Sections';
    contextToggleBtn.textContent = tab === 'all' ? returnTabsLabel : showAllLabel;
    contextToggleBtn.setAttribute('data-tab', tab === 'all' ? 'overview' : 'all');
  }
  if (headerToggleBtn) {
    const focusedTabsLabel = (i18n && i18n.headerFocusedTabsBtn) || '🎯 Focused Tabs';
    const fullGuideLabel = (i18n && i18n.headerViewFullGuideBtn) || '📖 View Full Guide';
    headerToggleBtn.textContent = tab === 'all' ? focusedTabsLabel : fullGuideLabel;
    headerToggleBtn.setAttribute('data-tab', tab === 'all' ? 'overview' : 'all');
  }

  const prevBtn = document.getElementById('btn-prev-tab');
  const nextBtn = document.getElementById('btn-next-tab');
  const indicatorEl = document.getElementById('workspace-pager-indicator');
  const idx = ORDERED_WORKSPACE_TABS.indexOf(tab);

  if (idx !== -1) {
    const prevTab = ORDERED_WORKSPACE_TABS[(idx - 1 + ORDERED_WORKSPACE_TABS.length) % ORDERED_WORKSPACE_TABS.length];
    const nextTab = ORDERED_WORKSPACE_TABS[(idx + 1) % ORDERED_WORKSPACE_TABS.length];
    const prevMeta = tabMetaMap[prevTab] || WORKSPACE_TAB_METADATA[prevTab];
    const nextMeta = tabMetaMap[nextTab] || WORKSPACE_TAB_METADATA[nextTab];
    const prevPrefix = (i18n && i18n.prevPrefix) || 'Prev:';
    const nextPrefix = (i18n && i18n.nextPrefix) || 'Next:';
    if (prevBtn) {
      prevBtn.textContent = `\u2190 ${prevPrefix} ${prevMeta.shortLabel}`;
      prevBtn.setAttribute('data-target-tab', prevTab);
    }
    if (nextBtn) {
      nextBtn.textContent = `${nextPrefix} ${nextMeta.shortLabel} \u2192`;
      nextBtn.setAttribute('data-target-tab', nextTab);
    }
    if (indicatorEl) {
      indicatorEl.textContent = (i18n && typeof i18n.formatPagerIndicator === 'function')
        ? i18n.formatPagerIndicator(idx + 1, ORDERED_WORKSPACE_TABS.length, meta.shortLabel)
        : `Viewing Tab ${idx + 1} of ${ORDERED_WORKSPACE_TABS.length} • ${meta.shortLabel}`;
    }
  } else {
    if (prevBtn) {
      prevBtn.textContent = (i18n && i18n.backToOverviewBtn) || '\u2190 Back to Daily Plan & Overview';
      prevBtn.setAttribute('data-target-tab', 'overview');
    }
    if (nextBtn) {
      nextBtn.textContent = (i18n && i18n.jumpToChannelsBtn) || 'Jump to Watch · Channels (28) \u2192';
      nextBtn.setAttribute('data-target-tab', 'channels');
    }
    if (indicatorEl) {
      indicatorEl.textContent = (i18n && i18n.fullHandbookModeLabel) || 'Full Handbook Mode • All 8 Tabs Visible';
    }
  }

  if (options.scrollTargetId) {
    const targetEl = document.getElementById(options.scrollTargetId);
    if (targetEl && typeof targetEl.scrollIntoView === 'function') {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (options.scrollToTop && typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function setupWorkspaceTabs() {
  const persistedTab = readPersistedFilter(STORAGE_KEYS.ACTIVE_TAB, ALLOWED_WORKSPACE_TABS, 'overview');
  let initialTab = persistedTab;
  let initialScrollId = null;

  if (typeof window !== 'undefined' && window.location && typeof window.location.hash === 'string') {
    const rawHash = window.location.hash.trim();
    if (HASH_TO_TAB_MAP[rawHash]) {
      initialTab = HASH_TO_TAB_MAP[rawHash];
      initialScrollId = rawHash.slice(1);
    }
  }

  switchWorkspaceTab(initialTab, { persist: false, scrollTargetId: initialScrollId });

  const tabBtns = document.querySelectorAll('.sidebar-nav-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget || e.target;
      const requestedTab = targetBtn.getAttribute('data-tab') || 'overview';
      switchWorkspaceTab(requestedTab, { persist: true, scrollToTop: true });
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('switch_workspace_tab', { tab: currentWorkspaceTab });
      }
    });
  });

  const toggleAllBtns = [
    document.getElementById('btn-context-view-all'),
    document.getElementById('btn-header-view-all')
  ];
  toggleAllBtns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const nextMode = currentWorkspaceTab === 'all' ? 'overview' : 'all';
      switchWorkspaceTab(nextMode, { persist: true, scrollToTop: true });
    });
  });

  const prevBtn = document.getElementById('btn-prev-tab');
  const nextBtn = document.getElementById('btn-next-tab');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const target = prevBtn.getAttribute('data-target-tab') || 'overview';
      switchWorkspaceTab(target, { persist: true, scrollToTop: true });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const target = nextBtn.getAttribute('data-target-tab') || 'science';
      switchWorkspaceTab(target, { persist: true, scrollToTop: true });
    });
  }

  const hashLinks = document.querySelectorAll('a[href^="#"]');
  hashLinks.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href') || '';
      const mappedTab = HASH_TO_TAB_MAP[href];
      if (mappedTab) {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        const targetId = href.slice(1);
        switchWorkspaceTab(mappedTab, { persist: true, scrollTargetId: targetId });
      }
    });
  });
}

// ==================== DAILY AGE RHYTHM & FRIDGE QUICK-SHEET BUILDER ====================
const BLUEPRINT_STAGE_RULES = {
  'under-2': {
    ageLabelShort: 'Under 2 (0–24m)',
    directoryFilterAge: 'toddler',
    stageHeadline: '👶 Under 2 Years (0–24 Months) — 100% Zero-Screen Sensorimotor & Iron/DHA Foundation',
    stageSummary: 'AAP (2016) & Kuhl (2003) Social Gating: Infants and toddlers under 24 months experience a video-deficit effect and require live 3D parent-child serve-and-return vocal interaction, floor exploration, and iron/DHA-rich complementary foods.',
    screenBudget: '0 mins/day passive video (Live family video-chat only per AAP)',
    sleepCutoff: '100% dark, screen-free nursery; 12–16 hrs total sleep/naps',
    mealRule: 'Zero added sugar & zero honey (<12m); soft iron + DHA whole foods'
  },
  'toddler': {
    ageLabelShort: 'Toddlers (Ages 2–3)',
    directoryFilterAge: 'toddler',
    stageHeadline: '🧸 Toddlers (Ages 2–3) — Co-Viewed Slow Pacing (SEM-10 ≤ 2/10) & Choking-Safe Whole Foods',
    stageSummary: 'WHO (2019) & Lillard (2011): Keep total screen media under 30–45 mins/day, always co-viewed on a shared living-room TV. Prioritize open-ended digital toyboxes with zero failure states and quartered/mashed NOVA-1 whole foods.',
    screenBudget: '≤ 30–45 mins/day (100% Parent Co-Viewed on Shared TV)',
    sleepCutoff: 'Screens OFF 60+ mins before nap & bedtime (Melatonin Protection)',
    mealRule: '100% Screen-Free Table; quarter grapes/tomatoes lengthwise; thin nut butters'
  },
  'preschool': {
    ageLabelShort: 'Preschool (Ages 4–5)',
    directoryFilterAge: 'preschool',
    stageHeadline: '🎨 Preschool (Ages 4–5) — Prefrontal Executive Function, Phonics & Sensory Food Bridges',
    stageSummary: 'Diamond (2013) & Hirsh-Pasek (2015): Build inhibitory control, synthetic phonics, and spatial number sense through low-arousal stories and tactile apps, paired with division-of-responsibility family meals.',
    screenBudget: '≤ 45–60 mins/day Curated Low-Stimulus TV or Guided App',
    sleepCutoff: 'All screens OFF 60+ mins before bedtime (Read-aloud wind-down)',
    mealRule: '100% Screen-Free Meals; zero synthetic dyes (Red 40 / Yellow 5); intact fruit over pouches'
  },
  'early-elementary': {
    ageLabelShort: 'Early Elementary (Ages 6–7)',
    directoryFilterAge: 'early-elementary',
    stageHeadline: '🚀 Early Elementary (Ages 6–7) — Hands-On STEM Inquiry, Spatial Logic & Steady School Glucose',
    stageSummary: 'Papert (1980) & Benton (2007): Transition from passive watching to hands-on drawing, nature inquiry, and discrete-level spatial logic puzzles. Pack low-glycemic-load school lunches to prevent the 10:30 AM classroom attention crash.',
    screenBudget: '≤ 60 mins/day School-Day Recreational Cap (Shared Room Only)',
    sleepCutoff: 'Hardware shutoff 60+ mins before sleep; zero screens in bedrooms',
    mealRule: 'Low-GL Breakfast + Bento (Oats/Eggs/Seeds) for 4-hr morning classroom focus'
  },
  'middle-elementary': {
    ageLabelShort: 'Middle Elementary (Ages 8–9)',
    directoryFilterAge: 'middle-elementary',
    stageHeadline: '🧩 Middle Elementary (Ages 8–9) — Constructivist Coding, Deductive Math & Neuro-Cofactor Nutrition',
    stageSummary: 'Resnick (2017) & Asbell-Clarke (2012): Channel growing autonomy into Scratch block programming, Zoombinis Boolean logic, and engineering sandboxes (with a 5-min visual stopping timer) alongside iron/zinc/DHA brain staples.',
    screenBudget: '≤ 60–75 mins/day (Prioritize Creative Coding & Co-Op Puzzles)',
    sleepCutoff: 'Devices docked in kitchen 60+ mins before lights-out (Chang et al., 2015)',
    mealRule: 'Screen-Free Family Dinner; Heme/Lentil Iron + Vitamin C & Marine DHA 2–3x/wk'
  },
  'preteen': {
    ageLabelShort: 'Pre-Teens (Ages 10–12)',
    directoryFilterAge: 'preteen',
    stageHeadline: '🔭 Pre-Teens (Ages 10–12) — Deep Systems Thinking, Peak Bone Mineralization & Zero Social Feeds',
    stageSummary: 'Nisan & Schocken (2005) & Weaver (2016): Replace algorithmic short-form feeds (Shorts/TikTok) and loot-box shooters with orbital physics, CPU architecture, and deep strategy, fueled by peak-velocity calcium/D3/K2 and high-polyphenol brain foods.',
    screenBudget: '≤ 60–90 mins/day Recreational (Zero Infinite-Scroll Feeds or Chat)',
    sleepCutoff: 'Strict 60-min pre-bedtime curfew; chargers stay outside bedrooms overnight',
    mealRule: 'Peak Bone-Mass D3 + K2 + Calcium + Prebiotic Fiber; zero caffeine/energy drinks'
  }
};

function computeDailyBlueprint(rawAgeKey) {
  const ageKey = ALLOWED_BLUEPRINT_AGES.has(rawAgeKey) ? rawAgeKey : 'toddler';
  const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
  const stageRulesMap = (i18n && i18n.blueprintStages) ? i18n.blueprintStages : BLUEPRINT_STAGE_RULES;
  const stageMeta = stageRulesMap[ageKey] || BLUEPRINT_STAGE_RULES[ageKey] || BLUEPRINT_STAGE_RULES.toddler;

  if (ageKey === 'under-2') {
    return {
      ageKey,
      ageLabelShort: stageMeta.ageLabelShort,
      directoryFilterAge: stageMeta.directoryFilterAge || 'toddler',
      stageHeadline: stageMeta.stageHeadline,
      stageSummary: stageMeta.stageSummary,
      screenBudget: stageMeta.screenBudget,
      sleepCutoff: stageMeta.sleepCutoff,
      mealRule: stageMeta.mealRule,
      channels: [
        'Live Parent-Sung Gestures (Zero Screen) — Use Super Simple Songs melodies face-to-face',
        'Live Parentese & ASL Sign Modeling — Practice Ms. Rachel speech pauses in 3D space',
        'Acoustic Chamber Music (Speaker Only) — Schubert/Bach woodwinds from Little Bear',
        'Board-Book Shared Reading — Point-and-name picture books (Puffin Rock / Frog & Toad)'
      ],
      games: [
        'Physical Object Permanence Box & Wooden Coin Drop (Zero Screen Sensorimotor)',
        'Montessori Treasure Basket (Safe Wood, Brushed Steel, Silicone & Natural Fabrics)',
        'Tactile Water Pouring, Stacking Cups & Nesting Rings (Cause-and-Effect Mastery)',
        'Serve-and-Return Floor Roll-the-Ball & Peek-a-Boo (Joint Attention Circuitry)'
      ],
      foods: [
        'Slow-Simmered Grass-Fed Beef & Red Lentil Mash (NFI 1/10 • Heme Iron for Myelination)',
        'Wild Alaskan Salmon Flakes & Avocado Mash (NFI 1/10 • Pin-Bone Checked Marine DHA)',
        'Pasture-Raised Soft-Scrambled Whole Egg Yolk (NFI 1/10 • 147mg Choline for Memory)',
        'Plain Whole-Milk Kefir & Mashed Berries (NFI 1/10 • Zero Added Sugar; No Honey <12m)'
      ],
      listen: [
        'Goodnight Moon & Dear Zoo Board Books (SEM-10: 1/10 • Live Parent Point-and-Name)',
        'Yoto Player / Mini (Nightlight Off) — Classical Lullabies & Acoustic Guitar Cards',
        'Super Simple Songs Audio-Only Speaker Sing-Along (Zero Screen Serve-and-Return)',
        'Frog and Toad Audio Collection (SEM-10: 1/10 • Gentle Acoustic Bedtime Stories)'
      ]
    };
  }

  const matchedChannels = channelsData
    .filter(ch => (Array.isArray(ch.age) ? ch.age : [ch.age]).includes(ageKey))
    .slice(0, 4)
    .map(ch => `${ch.name} (SEM-10: ${ch.stimulusScore}) — Start: ${(ch.startWith && ch.startWith[0]) || 'Calm Episode'}`);

  const matchedGames = gamesData
    .filter(g => (Array.isArray(g.age) ? g.age : [g.age]).includes(ageKey))
    .slice(0, 4)
    .map(g => {
      const stopProf = getGameStoppingProfile(g);
      return `${g.name} (SEM-10: ${g.stimulusScore} • ${stopProf.stoppingLabel})`;
    });

  const matchedFoods = foodsData
    .filter(f => (Array.isArray(f.age) ? f.age : [f.age]).includes(ageKey))
    .slice(0, 4)
    .map(f => `${f.name} (NFI-10: ${f.nfiScore} • Replaces: ${f.trapReplaced.split('(')[0].trim()})`);

  const matchedListen = listenReadData
    .filter(item => (Array.isArray(item.age) ? item.age : [item.age]).includes(ageKey))
    .slice(0, 4)
    .map(item => `${item.name} (SEM-10: ${item.stimulusScore} • ${item.categoryLabel})`);

  return {
    ageKey,
    ageLabelShort: stageMeta.ageLabelShort,
    directoryFilterAge: stageMeta.directoryFilterAge || ageKey,
    stageHeadline: stageMeta.stageHeadline,
    stageSummary: stageMeta.stageSummary,
    screenBudget: stageMeta.screenBudget,
    sleepCutoff: stageMeta.sleepCutoff,
    mealRule: stageMeta.mealRule,
    channels: matchedChannels,
    games: matchedGames,
    foods: matchedFoods,
    listen: matchedListen
  };
}

function renderBlueprintList(ulEl, items) {
  if (!ulEl) return;
  const frag = document.createDocumentFragment();
  (items || []).forEach(txt => {
    const li = document.createElement('li');
    li.textContent = txt;
    frag.appendChild(li);
  });
  ulEl.replaceChildren(frag);
}

let updateBlueprintViewRef = null;

function syncAllDirectoriesToAge(targetDirAge) {
  const validDirAge = ALLOWED_AGE_FILTERS.has(targetDirAge) ? targetDirAge : 'all';

  currentChannelFilter = validDirAge;
  currentGameAgeFilter = validDirAge;
  currentFoodAgeFilter = validDirAge;
  currentListenAgeFilter = validDirAge;

  writePersistedFilter(STORAGE_KEYS.CHANNEL_AGE, currentChannelFilter, ALLOWED_AGE_FILTERS);
  writePersistedFilter(STORAGE_KEYS.GAME_AGE, currentGameAgeFilter, ALLOWED_AGE_FILTERS);
  writePersistedFilter(STORAGE_KEYS.FOOD_AGE, currentFoodAgeFilter, ALLOWED_AGE_FILTERS);
  writePersistedFilter(STORAGE_KEYS.LISTEN_AGE, currentListenAgeFilter, ALLOWED_AGE_FILTERS);

  syncFilterButtons('#channel-filters .filter-btn', currentChannelFilter);
  syncFilterButtons('#game-age-filters .filter-btn', currentGameAgeFilter);
  syncFilterButtons('#food-age-filters .filter-btn', currentFoodAgeFilter);
  syncFilterButtons('#listen-age-filters .filter-btn', currentListenAgeFilter);

  renderChannels();
  renderGames();
  renderFoods();
  renderListenItems();
}

function syncGlobalAgeBarButtons(activeGlobalAge) {
  const globalBtns = document.querySelectorAll('#global-age-bar .global-age-btn');
  globalBtns.forEach(btn => {
    if (btn.getAttribute('data-global-age') === activeGlobalAge) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function setupDailyBlueprintBuilder() {
  const container = document.getElementById('daily-blueprint-builder');
  if (!container) return;

  const ageBtns = container.querySelectorAll('.blueprint-age-btn');
  const headlineEl = document.getElementById('bp-stage-headline');
  const summaryEl = document.getElementById('bp-stage-summary');
  const syncStatusEl = document.getElementById('bp-sync-status');
  const screenBudgetEl = document.getElementById('bp-screen-budget');
  const sleepCutoffEl = document.getElementById('bp-sleep-cutoff');
  const mealRuleEl = document.getElementById('bp-meal-rule');
  const channelsListEl = document.getElementById('bp-channels-list');
  const gamesListEl = document.getElementById('bp-games-list');
  const foodsListEl = document.getElementById('bp-foods-list');
  const listenListEl = document.getElementById('bp-listen-list');

  const btnSync = document.getElementById('btn-sync-age-directories');
  const btnCopy = document.getElementById('btn-copy-blueprint');
  const btnPrint = document.getElementById('btn-print-fridge-sheet');

  function updateBlueprintView(ageKey, clearSyncBanner) {
    const bp = computeDailyBlueprint(ageKey);
    currentBlueprintAge = bp.ageKey;

    ageBtns.forEach(btn => {
      if (btn.getAttribute('data-bp-age') === bp.ageKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (headlineEl) headlineEl.textContent = bp.stageHeadline;
    if (summaryEl) summaryEl.textContent = bp.stageSummary;
    if (screenBudgetEl) screenBudgetEl.textContent = bp.screenBudget;
    if (sleepCutoffEl) sleepCutoffEl.textContent = bp.sleepCutoff;
    if (mealRuleEl) mealRuleEl.textContent = bp.mealRule;

    renderBlueprintList(channelsListEl, bp.channels);
    renderBlueprintList(gamesListEl, bp.games);
    renderBlueprintList(foodsListEl, bp.foods);
    renderBlueprintList(listenListEl, bp.listen);

    if (clearSyncBanner && syncStatusEl) {
      syncStatusEl.textContent = '';
    }
  }

  updateBlueprintViewRef = updateBlueprintView;

  ageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget || e.target;
      const requestedAge = targetBtn.getAttribute('data-bp-age') || 'toddler';
      const validAge = ALLOWED_BLUEPRINT_AGES.has(requestedAge) ? requestedAge : 'toddler';
      writePersistedFilter(STORAGE_KEYS.BLUEPRINT_AGE, validAge, ALLOWED_BLUEPRINT_AGES);
      updateBlueprintView(validAge, true);
      syncGlobalAgeBarButtons(validAge);
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('select_blueprint_age', { age: validAge });
      }
    });
  });

  if (btnSync) {
    btnSync.addEventListener('click', () => {
      const bp = computeDailyBlueprint(currentBlueprintAge);
      const targetDirAge = ALLOWED_AGE_FILTERS.has(bp.directoryFilterAge) ? bp.directoryFilterAge : 'toddler';

      syncAllDirectoriesToAge(targetDirAge);
      syncGlobalAgeBarButtons(bp.ageKey);

      const chCount = getFilteredChannels().length;
      const gmCount = getFilteredGames().length;
      const fdCount = getFilteredFoods().length;
      const lsCount = getFilteredListenItems().length;

      if (syncStatusEl) {
        syncStatusEl.textContent = bp.ageKey === 'under-2'
          ? `✓ Synced Watch (${chCount}), Play (${gmCount}), Nourish (${fdCount}) & Listen (${lsCount}) directories to Early-Years / Toddler prep mode (Note: 0 passive screen mins under 24m per AAP)!`
          : `✓ Synced Watch (${chCount} channels), Play (${gmCount} games), Nourish (${fdCount} swaps) & Listen (${lsCount} picks) directories to ${bp.ageLabelShort}!`;
      }
      flashButtonSuccess(btnSync, `✓ Synced All 4 Directories (${bp.ageLabelShort})!`);
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const bp = computeDailyBlueprint(currentBlueprintAge);
      const lines = [
        `SAFEKIDS CAREGIVER & BABYSITTER DAILY PLAN — ${bp.stageHeadline}`,
        `====================================================================`,
        `• Daily Screen Budget: ${bp.screenBudget}`,
        `• Sleep & Melatonin Rule: ${bp.sleepCutoff}`,
        `• Mealtime & Safety Rule: ${bp.mealRule}`,
        ``,
        `📺 PILLAR 1: APPROVED CALM CHANNELS (WATCH)`,
        ...bp.channels.map(c => `  - ${c}`),
        ``,
        `🎮 PILLAR 2: APPROVED COGNITIVE GAMES & STOPPING CUES (PLAY)`,
        ...bp.games.map(g => `  - ${g}`),
        ``,
        `🥗 PILLAR 3: WHOLE-FOOD SWAPS & PREP SAFETY (NOURISH)`,
        ...bp.foods.map(f => `  - ${f}`),
        ``,
        `🎧 PILLAR 4: SCREEN-FREE AUDIO & LIVING BOOKS (LISTEN & READ)`,
        ...bp.listen.map(l => `  - ${l}`),
        ``,
        `Source: SafeKids Parent Portal (https://safe-kids.web.app)`
      ];
      safeCopyText(
        lines.join('\n'),
        () => {
          flashButtonSuccess(btnCopy, '✓ Copied Caregiver Plan!');
        },
        () => {
          flashButtonSuccess(btnCopy, '✓ Prepared Caregiver Plan');
        }
      );
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      if (typeof window !== 'undefined' && typeof window.print === 'function') {
        window.print();
      }
      flashButtonSuccess(btnPrint, '✓ Print Dialog Opened');
    });
  }

  updateBlueprintView(currentBlueprintAge, false);
}

// ==================== GLOBAL HEADER AGE BAR & CLINICAL DRAWER TOGGLE ====================
function setupGlobalAgeBar() {
  const globalBtns = document.querySelectorAll('#global-age-bar .global-age-btn');
  if (!globalBtns || globalBtns.length === 0) return;

  // Determine initial active state based on directory filters
  const allDirsSameAge =
    currentChannelFilter !== 'all' &&
    currentChannelFilter === currentGameAgeFilter &&
    currentChannelFilter === currentFoodAgeFilter;
  const initialGlobalAge = allDirsSameAge ? currentChannelFilter : 'all';
  syncGlobalAgeBarButtons(initialGlobalAge);

  globalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget || e.target;
      const rawGlobalAge = targetBtn.getAttribute('data-global-age') || 'all';

      if (rawGlobalAge === 'all') {
        syncAllDirectoriesToAge('all');
        syncGlobalAgeBarButtons('all');
      } else if (ALLOWED_BLUEPRINT_AGES.has(rawGlobalAge)) {
        writePersistedFilter(STORAGE_KEYS.BLUEPRINT_AGE, rawGlobalAge, ALLOWED_BLUEPRINT_AGES);
        if (typeof updateBlueprintViewRef === 'function') {
          updateBlueprintViewRef(rawGlobalAge, false);
        }
        const bp = computeDailyBlueprint(rawGlobalAge);
        syncAllDirectoriesToAge(bp.directoryFilterAge);
        syncGlobalAgeBarButtons(rawGlobalAge);
      }
    });
  });
}

function setupClinicalDrawerToggleAll() {
  const toggleBtn = document.getElementById('btn-toggle-clinical-details');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    expandAllClinicalDrawers = !expandAllClinicalDrawers;
    const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
    toggleBtn.textContent = expandAllClinicalDrawers
      ? ((i18n && i18n.hideClinicalDetailsBtn) || '🔬 Hide Clinical Details')
      : ((i18n && i18n.expandAllScienceBtn) || '🔬 Expand All Science');
    if (expandAllClinicalDrawers) {
      toggleBtn.classList.add('active');
    } else {
      toggleBtn.classList.remove('active');
    }

    renderChannels();
    renderGames();
    renderFoods();
    renderListenItems();
  });
}

// ==================== COPY CODE BUTTONS ====================
function setupCopyButtons() {
  const btns = document.querySelectorAll('.copy-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-target') || btn.getAttribute('data-copy-target');
      const codeEl = document.getElementById(codeId);
      if (codeEl) {
        safeCopyText(
          codeEl.innerText,
          () => {
            if (window.trackSafeKidsEvent) {
              window.trackSafeKidsEvent('copy_lockdown_code', { target: codeId });
            }
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = orig; }, 2000);
          },
          () => {
            const orig = btn.textContent;
            btn.textContent = 'Prepared';
            setTimeout(() => { btn.textContent = orig; }, 2000);
          }
        );
      }
    });
  });
}

// ==================== MOBILE INFOGRAPHIC QUICK MODE, LIGHTBOX & BOTTOM BAR ====================
let infographicQuickModeActive = false;

function setupInfographicExperience() {
  const modeBtn = document.getElementById('btn-toggle-infographic-mode');
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      infographicQuickModeActive = !infographicQuickModeActive;
      if (document.body && document.body.classList) {
        if (infographicQuickModeActive) {
          document.body.classList.add('infographic-quick-mode');
        } else {
          document.body.classList.remove('infographic-quick-mode');
        }
      }
      const i18n = typeof getPortalI18n === 'function' ? getPortalI18n() : null;
      if (infographicQuickModeActive) {
        modeBtn.classList.add('active');
        modeBtn.textContent = (i18n && i18n.infographicExitBtn) || '📸 Exit 2-Min Infographic View';
      } else {
        modeBtn.classList.remove('active');
        modeBtn.textContent = (i18n && i18n.infographicEnterBtn) || '📸 2-Min Infographic View';
      }
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('toggle_infographic_mode', { active: infographicQuickModeActive });
      }
    });
  }

  // Jump buttons inside Overview Infographic Hub
  const jumpBtns = document.querySelectorAll('.infographic-jump-btn');
  jumpBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget || e.target;
      const targetTab = targetBtn.getAttribute('data-jump-tab') || 'nutrition';
      switchWorkspaceTab(targetTab, { persist: true, scrollToTop: true });
    });
  });

  // Sticky Mobile Bottom Pillar Bar
  const mobilePillarBtns = document.querySelectorAll('.mobile-pillar-btn');
  mobilePillarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget || e.target;
      const targetTab = targetBtn.getAttribute('data-tab') || 'overview';
      switchWorkspaceTab(targetTab, { persist: true, scrollToTop: true });
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('mobile_pillar_switch', { tab: targetTab });
      }
    });
  });

  // Fullscreen Poster Lightbox Modal
  const lightbox = document.getElementById('infographic-lightbox');
  const lightboxImg = document.getElementById('infographic-lightbox-img');
  const lightboxTitle = document.getElementById('infographic-lightbox-title');
  const lightboxDownload = document.getElementById('infographic-lightbox-download');
  const lightboxClose = document.getElementById('infographic-lightbox-close');
  const lightboxBackdrop = document.getElementById('infographic-lightbox-backdrop');

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  const zoomTriggers = document.querySelectorAll('.infographic-zoom-trigger');
  zoomTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const btn = e.currentTarget || e.target;
      const src = btn.getAttribute('data-zoom-src');
      const title = btn.getAttribute('data-zoom-title') || 'SafeKids Parent Infographic Poster';
      if (!lightbox || !src) return;

      if (lightboxImg) {
        lightboxImg.setAttribute('src', src);
        lightboxImg.setAttribute('alt', `${title} — Fullscreen parent infographic poster`);
      }
      if (lightboxTitle) {
        lightboxTitle.textContent = title;
      }
      if (lightboxDownload) {
        lightboxDownload.setAttribute('href', src);
        const filename = src.split('/').pop() || 'SafeKids-Infographic.jpg';
        lightboxDownload.setAttribute('download', filename);
      }

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');

      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('open_infographic_lightbox', { poster: src });
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }
}

// ==================== DARK MODE & 11-LANGUAGE I18N ENGINE (ATLAS OF WONDER PARITY) ====================
const PORTAL_I18N = {
  en: {
    langCode: 'en',
    langName: 'English',
    darkModeBtnOff: '🌙 Dark Mode',
    darkModeBtnOn: '☀️ Light Mode',
    darkModeToggleTitle: 'Toggle Dark / Light Mode',
    languageSwitcherLabel: 'Language Switcher',
    languageSelectLabel: 'Select Language',
    languagePillsLabel: 'Quick Language Buttons',
    infographicEnterBtn: '📸 2-Min Infographic View',
    infographicExitBtn: '📸 Exit 2-Min Infographic View',
    expandAllScienceBtn: '🔬 Expand All Science',
    hideClinicalDetailsBtn: '🔬 Hide Clinical Details',
    headerViewFullGuideBtn: '📖 View Full Guide',
    headerFocusedTabsBtn: '🎯 Focused Tabs',
    showAllSectionsBtn: 'Show All Sections',
    returnFocusedTabsBtn: 'Return to Focused Tabs',
    activePrefix: 'Active:',
    prevPrefix: 'Prev:',
    nextPrefix: 'Next:',
    formatPagerIndicator: (cur, total, label) => `Viewing Tab ${cur} of ${total} • ${label}`,
    backToOverviewBtn: '\u2190 Back to Daily Plan & Overview',
    jumpToChannelsBtn: 'Jump to Watch · Channels (28) \u2192',
    fullHandbookModeLabel: 'Full Handbook Mode • All 8 Tabs Visible',
    globalAgeLabel: "👶 Child's Age:",
    globalAges: {
      'all': 'All Ages',
      'under-2': '0–24m',
      'toddler': '2–3 yrs',
      'preschool': '4–5 yrs',
      'early-elementary': '6–7 yrs',
      'middle-elementary': '8–9 yrs',
      'preteen': '10–12 yrs'
    },
    sidebarBrandTitle: 'Watch • Play • Nourish • Listen',
    sidebarBrandSub: 'Pick an age above or jump to any focused directory below.',
    sidebarGroups: ['1. Start Here', '2. Curated Daily Directories', '3. Tools & Clinical Science', "4. Parenting & Co-Regulation"],
    sidebarNav: {
      overview: { title: 'Daily Plan & 10 Rules', caption: 'Fridge sheet & 4-pillar hub', pill: 'Start' },
      channels: { title: 'Watch: Safe Channels', caption: 'Low-stimulus video whitelist', pill: '28' },
      games: { title: 'Play: Educator Games', caption: 'Ad-free logic & STEM play', pill: '33' },
      nutrition: { title: 'Nourish: Whole Foods', caption: 'Lunchbox swaps & NFI-10', pill: '32' },
      listen: { title: 'Listen & Read: Audio', caption: 'Podcasts, Yoto & living books', pill: '26' },
      science: { title: 'Science & Self-Auditors', caption: 'SEM-10, NFI-10 & 30 studies', pill: '30 Cited' },
      lockdown: { title: 'Lockdown Guides', caption: 'FOSS apps, OS & DNS shields', pill: '13 Tools' },
      expert: { title: "Speak: Confidence Scripts", caption: "Co-regulation swaps & talks", pill: "9 Scripts" },
      all: { title: 'View Full Guide / Print All', caption: 'Show all sections on one page', pill: 'All' }
    },
    mobileBar: {
      overview: 'All 6',
      channels: 'Watch',
      games: 'Play',
      nutrition: 'Food',
      listen: 'Audio',
      lockdown: 'Shield',
      expert: "Scripts"
    },
    heroHeading: 'Calm, Evidence-Backed Media, Play, Whole-Food & Audio Hub for Parents',
    heroSubtitle: "Pick your child's age to get an instant daily rhythm, or browse 119 curated low-stimulus shows, constructivist games, whole-food lunchbox swaps, and screen-free podcasts & living books—with 1-click expandable clinical science.",
    heroStats: [
      'Curated Calm Channels',
      'Educator-Approved Games',
      'Whole-Food Swaps & Staples',
      'Screen-Free Audio & Books',
      'Dual 10-Pt Audit Rubrics',
      'Studies & Laws Cited'
    ],
    blueprintSyncBtn: '🔗 Sync All 4 Directories to This Age',
    blueprintCopyBtn: '📋 Copy Caregiver Plan',
    blueprintReadBtn: "🔊 Read Fridge Plan",
    blueprintPrintBtn: '🖨️ Print Fridge Quick-Sheet',
    searchPlaceholders: {
      channel: 'Search approved channels by title, research anchor, or topic (e.g. STEM, Nature, Phonics, Mindfulness)...',
      game: 'Search approved games by title, developer, cognitive skill (e.g. Spatial, Phonics, Boolean Logic, Montessori), or platform...',
      food: 'Search 32 whole foods & swaps by food, ultra-processed trap (e.g. Fruit Snacks, Goldfish, Pouches, Cereal), nutrient (DHA, Iron, Choline, K2), or study...',
      listen: 'Search 26 podcasts, audiobooks, phonics decodables, living books, or screen-free players (e.g. Brains On, Yoto, Bob Books, Narnia)...'
    },
    viewChannelBtn: 'View Channel',
    visitGameBtn: 'Visit Official Game / App',
    viewFoodRefBtn: 'View Clinical & Nutrient Reference',
    viewListenRefBtn: 'Listen / View Book Reference',
    drawerShowLabel: '🔬 + Why It Works, Parent Guide & Citations',
    drawerHideLabel: '🔬 \u2212 Hide Clinical Details & Parent Guide',
    formatChannelsCount: (n) => (n === 1 ? '1 channel' : `${n} channels`),
    formatGamesCount: (n) => (n === 1 ? '1 game' : `${n} games`),
    formatFoodsCount: (n) => (n === 1 ? '1 whole food or swap' : `${n} whole foods & swaps`),
    formatListenCount: (n) => (n === 1 ? '1 audio or book pick' : `${n} audio & book picks`),
    emptyChannelsTitle: 'No channels match your search criteria.',
    emptyChannelsSub: 'Try adjusting your age filter or search term.',
    emptyGamesTitle: 'No educational games match your search criteria.',
    emptyGamesSub: "Try selecting 'All Games' or clearing the domain, stopping-cue, and search filters.",
    emptyFoodsTitle: 'No whole foods or swaps match your search criteria.',
    emptyFoodsSub: "Try selecting 'All Whole Foods & Swaps' or clearing the nutrient domain and search filters.",
    emptyListenTitle: 'No podcasts, audiobooks, or books match your search criteria.',
    emptyListenSub: "Try selecting 'All Audio & Books' or clearing the format and search filters.",
    tabs: WORKSPACE_TAB_METADATA,
    blueprintStages: BLUEPRINT_STAGE_RULES,
    expertTab: {"chirpListenBtn": "🔊 Read Aloud", "chirpStopBtn": "⏹ Stop", "chirpReadPlanBtn": "🔊 Read Fridge Plan", "chirpVoiceLabel": "🎙️ Chirp 3 HD Voice:", "entryKicker": "New • Confidence & Co-Regulation", "entryTitle": "What to say to raise confident kids", "entrySub": "9 calm phrases for everyday hard moments, with Chirp 3 HD read-aloud and 10 free clinical psychologist talks.", "entryCta": "Open →", "heading": "What to Say to Raise Confident Kids", "badge": "10 verified videos", "lede": "Hard moments are normal. Here is what to say when they happen — calm, short phrases you can use today.", "about": "Grounded in attachment theory, emotion-coaching research (Gottman), and self-determination psychology (Deci & Ryan), paired with free public talks by clinical psychologist Dr. Becky Kennedy (TED, YouTube, and podcast interviews) for parents who want to hear related examples.", "disclaimer": "Educational resource only — not psychotherapy, medical, or clinical advice. SafeKids is an independent, non-commercial guide and is not affiliated with, sponsored by, or endorsed by Dr. Becky Kennedy, Good Inside®, TED, or any linked speaker. Good Inside® is a registered trademark of Good Inside, Inc., used nominatively solely to identify outbound public video links. Scripts below are original SafeKids paraphrases of developmental-psychology ideas, not verbatim quotes — each card links to a public talk (verified 2026-11-07). Questions or takedown requests: github.com/enriquekalven/safe-kids/issues.", "pickerTitle": "What's happening right now?", "pickerSub": "Tap a moment to see what to say, or tap Read Aloud to hear the phrase in Google Cloud Chirp 3 HD.", "topics": {"confidence": "Building confidence (4)", "frustration": "Holding a limit (2)", "big-feelings": "Big feelings (2)", "repair": "After I lost it (1)", "all": "Show all (9)"}, "statusAll": "Showing all {n} scripts.", "statusFiltered": "Showing {shown} of {total} scripts.", "insteadLabel": "Instead of", "tryLabel": "Try saying", "copyBtn": "Copy phrase", "copiedBtn": "Copied ✓", "whySummary": "Why this works", "principlesTitle": "The 5 big ideas behind the scripts", "practiceTitle": "Try it for a week: one small swap a day", "practiceSub": "A SafeKids practice plan built from the ideas above. Small, repeated swaps work better than a big overhaul.", "videosTitle": "Recommended viewing: 10 free psychologist talks", "videosSub": "Links open on YouTube in a new tab. Nothing is embedded, so no YouTube trackers load until you choose to watch.", "channelsTitle": "Outbound speaker & public talk links", "channelsSub": "External links to official public channels where the talks above are hosted. Third-party platforms may ask you to sign in.", "scripts": [{"id": "script_1", "moment": "Your child shows you a drawing or project", "instead": "\"Good job! You're such a great artist!\"", "tryText": "\"Tell me about it. How did you decide where to start?\"", "why": "A curious question points your child inward, so their confidence rests on their own thinking instead of on your approval."}, {"id": "script_2", "moment": "\"She's so much better at this than me.\"", "instead": "\"No way, you're the best one there!\"", "tryText": "\"It stings when someone is better at something you care about. I've felt that too. And you're still you, and you're okay.\"", "why": "Arguing with the feeling teaches kids their inner experience is wrong. Naming it shows them they can feel envy and still be okay being themselves."}, {"id": "script_3", "moment": "Stuck on homework or a puzzle and wants to quit", "instead": "\"Here, let me just do it for you.\"", "tryText": "\"This is really hard. I'm right here. What's one small thing you could try next?\"", "why": "Rescuing removes the struggle that builds confidence. Staying close without fixing gives your child a track record of getting through hard things."}, {"id": "script_4", "moment": "Your tween or teen is nervous before a tryout or test", "instead": "\"Don't worry, you'll be great!\"", "tryText": "\"Of course you're nervous — this matters to you. Nervous and ready can both be true.\"", "why": "Reassurance can make nerves feel like a problem. Holding both feelings at once tells them the emotion is normal and does not mean they can't do it."}, {"id": "script_5", "moment": "Screen time is over and a meltdown starts", "instead": "\"Stop crying, it's just a show!\"", "tryText": "\"You wish you could keep watching. It's so hard to stop. And screens are done for today. You can be upset — I'm right here.\"", "why": "The limit holds and the feeling is allowed. Kids build frustration tolerance by being disappointed next to a calm adult, not by being talked out of it."}, {"id": "script_6", "moment": "Whining or begging after you've said \"no\"", "instead": "\"Fine, just one more — but stop whining.\"", "tryText": "\"The answer is still no. It's okay to be mad about it. I can handle your big feelings.\"", "why": "Caving teaches that big reactions change limits. A sturdy, warm \"no\" shows your child the boundary is safe and their feelings are not too much for you."}, {"id": "script_7", "moment": "Your child hits a sibling", "instead": "\"We don't hit! Go to your room!\"", "tryText": "\"I won't let you hit. I'm going to move you so everyone is safe. You're a good kid having a really hard time.\"", "why": "You stop the behavior with your actions, not threats, and keep the message that your child is good — which makes it easier to talk about what happened once everyone is calm."}, {"id": "script_8", "moment": "A sensitive, intense child explodes over something small", "instead": "\"You're totally overreacting.\"", "tryText": "\"That felt really big. I'm here.\"", "why": "Intense kids often feel more overwhelmed by lots of talking during a storm. Your steady presence first, problem-solving later."}, {"id": "script_9", "moment": "You yelled and regret it", "instead": "Pretending it didn't happen, or \"I yelled because you didn't listen.\"", "tryText": "\"I've been thinking about earlier. I'm sorry I yelled. That wasn't your fault — it's mine to work on. I love you.\"", "why": "Owning your part without blaming your child protects their sense of being good and shows them how to repair their own mistakes."}], "principles": [{"title": "Separate the Child From the Behavior", "body": "Hard behavior is a signal of an overwhelmed nervous system, not proof of a bad kid. Lead with warmth and curiosity about what is underneath while keeping everyone safe."}, {"title": "Hold the Limit & Validate the Feeling", "body": "You can keep a firm boundary and still allow the disappointment about it: \"You really want more time, and screens are done for today.\""}, {"title": "Calm, Steady Leadership", "body": "Your job is not to prevent every upset feeling; it is to stay calm and anchored while your child learns they can ride out frustration."}, {"title": "Confidence Grows From Self-Trust", "body": "Lasting confidence comes from internal reflection (\"How did I figure that out?\") and surviving manageable struggle, not constant \"good job\" praise."}, {"title": "Relationship Repair Beats Perfection", "body": "Every parent loses patience sometimes. Returning calmly, owning your part without blaming your child, and reconnecting models accountability and secure attachment."}]}
  },
  es: {
    langCode: 'es',
    langName: 'Español',
    darkModeBtnOff: '🌙 Modo Oscuro',
    darkModeBtnOn: '☀️ Modo Claro',
    darkModeToggleTitle: 'Cambiar entre modo oscuro y claro',
    languageSwitcherLabel: 'Selector de idioma',
    languageSelectLabel: 'Seleccionar idioma',
    languagePillsLabel: 'Botones rápidos de idioma',
    infographicEnterBtn: '📸 Vista Infográfica (2 min)',
    infographicExitBtn: '📸 Salir de Vista Infográfica',
    expandAllScienceBtn: '🔬 Expandir Ciencia Clínica',
    hideClinicalDetailsBtn: '🔬 Ocultar Detalles Clínicos',
    headerViewFullGuideBtn: '📖 Ver Guía Completa',
    headerFocusedTabsBtn: '🎯 Pestañas Enfocadas',
    showAllSectionsBtn: 'Mostrar Todas las Secciones',
    returnFocusedTabsBtn: 'Volver a Pestañas Enfocadas',
    activePrefix: 'Activo:',
    prevPrefix: 'Ant.:',
    nextPrefix: 'Sig.:',
    formatPagerIndicator: (cur, total, label) => `Pestaña ${cur} de ${total} • ${label}`,
    backToOverviewBtn: '\u2190 Volver al Plan Diario y Resumen',
    jumpToChannelsBtn: 'Ir a Ver · Canales (28) \u2192',
    fullHandbookModeLabel: 'Modo Manual Completo • Las 8 Pestañas Visibles',
    globalAgeLabel: '👶 Edad del Niño:',
    globalAges: {
      'all': 'Todas las Edades',
      'under-2': '0–24 m',
      'toddler': '2–3 años',
      'preschool': '4–5 años',
      'early-elementary': '6–7 años',
      'middle-elementary': '8–9 años',
      'preteen': '10–12 años'
    },
    sidebarBrandTitle: 'Ver • Jugar • Nutrir • Escuchar',
    sidebarBrandSub: 'Elige una edad arriba o salta a cualquier directorio especializado abajo.',
    sidebarGroups: ['1. Empieza Aquí', '2. Directorios Diarios Curados', '3. Herramientas y Ciencia Clínica', "4. Crianza y Corregulación"],
    sidebarNav: {
      overview: { title: 'Plan Diario y 10 Reglas', caption: 'Hoja de refrigerador y 4 pilares', pill: 'Inicio' },
      channels: { title: 'Ver: Canales Seguros', caption: 'Lista blanca de baja estimulación', pill: '28' },
      games: { title: 'Jugar: Juegos Educativos', caption: 'Lógica y STEM sin anuncios', pill: '33' },
      nutrition: { title: 'Nutrir: Alimentos Reales', caption: 'Cambios de lonchera y NFI-10', pill: '32' },
      listen: { title: 'Escuchar y Leer: Audio', caption: 'Pódcasts, Yoto y libros vivos', pill: '26' },
      science: { title: 'Ciencia y Auditores', caption: 'SEM-10, NFI-10 y 30 estudios', pill: '30 Citas' },
      lockdown: { title: 'Guías de Bloqueo', caption: 'Apps libres, SO y escudos DNS', pill: '13 Herr.' },
      expert: { title: "Hablar: Guiones de Confianza", caption: "Corregulación y charlas", pill: "9 Guiones" },
      all: { title: 'Ver Guía Completa / Imprimir', caption: 'Mostrar todas las secciones juntas', pill: 'Todo' }
    },
    mobileBar: {
      overview: 'Plan',
      channels: 'Ver',
      games: 'Jugar',
      nutrition: 'Nutrir',
      listen: 'Audio',
      lockdown: 'Escudo',
      expert: "Guiones"
    },
    heroHeading: 'Centro Calmo con Evidencia Científica de Medios, Juego, Nutrición y Audio para Padres',
    heroSubtitle: 'Selecciona la edad de tu hijo para obtener una rutina diaria al instante o explora 119 recursos seleccionados: programas de baja estimulación, juegos constructivistas, cambios de lonchera con alimentos integrales y pódcasts y libros sin pantalla.',
    heroStats: [
      'Canales Calmos Curados',
      'Juegos Aprobados por Educadores',
      'Alimentos Reales y Cambios',
      'Audio y Libros Sin Pantalla',
      'Doble Rúbrica de 10 Puntos',
      'Estudios y Leyes Citadas'
    ],
    blueprintSyncBtn: '🔗 Sincronizar los 4 Directorios a Esta Edad',
    blueprintCopyBtn: '📋 Copiar Plan para Cuidadores',
    blueprintReadBtn: "🔊 Leer Plan Diario",
    blueprintPrintBtn: '🖨️ Imprimir Hoja de Refrigerador',
    searchPlaceholders: {
      channel: 'Buscar canales (ej., Bluey, naturaleza, matemáticas, fonética)...',
      game: 'Buscar juegos (ej., ajedrez, programación, DragonBox, Montessori)...',
      food: 'Buscar alimentos y cambios (ej., salmón, hierro, sin colorantes, lonchera)...',
      listen: 'Buscar audio y libros (ej., Yoto, Brains On, fonética, cuentos)...'
    },
    viewChannelBtn: 'Ver Canal Oficial',
    visitGameBtn: 'Visitar Juego / App Oficial',
    viewFoodRefBtn: 'Ver Referencia Clínica y Nutricional',
    viewListenRefBtn: 'Escuchar / Ver Referencia del Libro',
    drawerShowLabel: '🔬 + Por Qué Funciona, Guía para Padres y Citas',
    drawerHideLabel: '🔬 \u2212 Ocultar Detalles Clínicos y Guía',
    formatChannelsCount: (n) => (n === 1 ? '1 canal' : `${n} canales`),
    formatGamesCount: (n) => (n === 1 ? '1 juego' : `${n} juegos`),
    formatFoodsCount: (n) => (n === 1 ? '1 alimento o cambio' : `${n} alimentos y cambios`),
    formatListenCount: (n) => (n === 1 ? '1 audio o libro' : `${n} audios y libros`),
    emptyChannelsTitle: 'Ningún canal coincide con tu búsqueda.',
    emptyChannelsSub: 'Intenta cambiar el filtro de edad o el término de búsqueda.',
    emptyGamesTitle: 'Ningún juego educativo coincide con tu búsqueda.',
    emptyGamesSub: 'Intenta limpiar los filtros de edad, dominio, señal de parada y búsqueda.',
    emptyFoodsTitle: 'Ningún alimento o cambio coincide con tu búsqueda.',
    emptyFoodsSub: 'Intenta seleccionar todos los alimentos o limpiar el filtro nutricional.',
    emptyListenTitle: 'Ningún pódcast, audiolibro o libro coincide con tu búsqueda.',
    emptyListenSub: 'Intenta seleccionar todos los formatos o limpiar la búsqueda.',
    tabs: {
      overview: {
        kicker: 'Pestaña 1 de 8 • Empieza Aquí',
        title: 'Resumen, Plan Diario por Edad y 10 Reglas Familiares Clave',
        sub: 'Rutina diaria calma, hoja imprimible de 4 pilares para el refrigerador y guía esencial para padres.',
        shortLabel: 'Plan Diario y Resumen'
      },
      science: {
        kicker: 'Pestaña 2 de 8 • Evidencia Clínica y Rúbricas',
        title: 'Ciencia Clínica, Auditores Dobles de 10 Puntos (SEM-10 y NFI-10) y 30 Citas',
        sub: 'Neuroimagen revisada por pares, psicología del desarrollo, nutrición pediátrica y calculadoras de 60 segundos.',
        shortLabel: 'Ciencia y Rúbricas (30)'
      },
      channels: {
        kicker: 'Pestaña 3 de 8 • Pilar 1 (Ver)',
        title: 'Directorio de Canales de Baja Estimulación Aprobados por Padres (28 Canales)',
        sub: 'Canales de video calmos evaluados con la rúbrica SEM-10 y exportación de lista blanca en JSON/CSV.',
        shortLabel: 'Ver · Canales (28)'
      },
      games: {
        kicker: 'Pestaña 4 de 8 • Pilar 2 (Jugar)',
        title: 'Directorio de Juegos Cognitivos y Apps Aprobados por Educadores (33 Juegos)',
        sub: 'Mundos constructivistas, acertijos espaciales y apps Montessori con cero anuncios y cero cajas de botín.',
        shortLabel: 'Jugar · Juegos (33)'
      },
      nutrition: {
        kicker: 'Pestaña 5 de 8 • Pilar 3 (Nutrir)',
        title: 'Alimentos Integrales y Cambios de Lonchera Avalados por Pediatras (32 Cambios)',
        sub: 'Alternativas reales NOVA-1 que reemplazan snacks ultraprocesados, bolsas exprimibles y colorantes sintéticos.',
        shortLabel: 'Nutrir · Alimentos (32)'
      },
      listen: {
        kicker: 'Pestaña 6 de 8 • Pilar 4 (Escuchar y Leer)',
        title: 'Escuchar y Leer: Directorio de Audio Sin Pantalla, Pódcasts y Libros Vivos (26 Selecciones)',
        sub: 'Pódcasts de ciencia y cuentos, tarjetas Yoto/Tonie, libros fonéticos decodificables y lectura dialógica.',
        shortLabel: 'Escuchar y Leer (26)'
      },
      lockdown: {
        kicker: 'Pestaña 7 de 8 • Defensa Técnica',
        title: 'Herramientas Abiertas de Control Parental y Guías Paso a Paso de Bloqueo DNS',
        sub: '13 arquitecturas de código abierto más los Pasos A–E para BrainRotGuard, KidTube, Family Link, Acceso Guiado y NextDNS.',
        shortLabel: 'Bloqueo de Dispositivos y DNS'
      },
      expert: {
        kicker: "Pestaña 8 de 8 • Confianza y Corregulación",
        title: "Guiones de Confianza y Corregulación: Qué Decir en Momentos Difíciles",
        sub: "5 principios de apego y autoconfianza, 9 guiones de \"di esto en su lugar\", un plan de 7 días y 10 charlas gratuitas de psicología.",
        shortLabel: "Guiones de Confianza (9)"
      },
      all: {
        kicker: 'Modo Manual Completo • Las 8 Pestañas Visibles',
        title: 'Referencia Completa del Portal para Padres SafeKids (Todas las Secciones)',
        sub: 'Mostrando las 10 recomendaciones, 30+ estudios clínicos, 28 canales, 33 juegos, 32 alimentos, 26 audios/libros y 5 guías.',
        shortLabel: 'Guía Completa (Todo)'
      }
    },
    blueprintStages: {
      'under-2': {
        ageLabelShort: 'Menores de 2 años (0–24 m)',
        directoryFilterAge: 'toddler',
        stageHeadline: '👶 Menores de 2 Años (0–24 Meses) — 100% Cero Pantallas, Base Sensoriomotora y Hierro/DHA',
        stageSummary: 'AAP (2016) y Kuhl (2003): Por el efecto de déficit de video, los menores de 24 meses aprenden poco de las pantallas y necesitan interacción vocal en vivo con los padres, exploración en el suelo y alimentos ricos en hierro hemo, colina y DHA marino.',
        screenBudget: '0 min/día de video pasivo (Solo videollamadas familiares en vivo según AAP)',
        sleepCutoff: 'Habitación 100% oscura y libre de pantallas; 12–16 h de sueño total y siestas',
        mealRule: 'Cero azúcar añadido y cero miel (<12 m); alimentos suaves ricos en hierro + DHA'
      },
      'toddler': {
        ageLabelShort: 'Pequeños (2–3 años)',
        directoryFilterAge: 'toddler',
        stageHeadline: '🧸 Pequeños (2–3 Años) — Ritmo Lento en Familia (SEM-10 ≤ 2/10) y Alimentos Seguros contra el Atragantamiento',
        stageSummary: 'OMS (2019) y Lillard (2011): Mantener el tiempo total de pantalla bajo 30–45 min/día, siempre acompañado en TV compartida, con cajas de juguetes digitales calmadas y alimentos integrales NOVA-1 cortados en cuartos o machacados.',
        screenBudget: '≤ 30–45 min/día (100% acompañado por padres en TV compartida)',
        sleepCutoff: 'Pantallas APAGADAS 60+ min antes de siesta y noche (Protección de melatonina)',
        mealRule: 'Mesa 100% sin pantallas; cortar uvas y tomates cherry en cuartos a lo largo; untar crema de cacahuate o de frutos secos en capa fina'
      },
      'preschool': {
        ageLabelShort: 'Preescolar (4–5 años)',
        directoryFilterAge: 'preschool',
        stageHeadline: '🎨 Preescolar (4–5 Años) — Función Ejecutiva Prefrontal, Fonética y Puentes Sensoriales',
        stageSummary: 'Diamond (2013) y Hirsh-Pasek (2015): Desarrolla control inhibitorio, fonética sintética y sentido numérico espacial mediante cuentos calmos, apps táctiles y comidas familiares sin presión.',
        screenBudget: '≤ 45–60 min/día de TV de baja estimulación o app educativa guiada',
        sleepCutoff: 'Pantallas APAGADAS 60+ min antes de dormir (Rutina de cuentos leídos)',
        mealRule: 'Comidas 100% sin pantallas; cero colorantes sintéticos (Rojo 40 / Amarillo 5; E129 / E102); fruta entera en lugar de purés en bolsita'
      },
      'early-elementary': {
        ageLabelShort: 'Primaria Inicial (6–7 años)',
        directoryFilterAge: 'early-elementary',
        stageHeadline: '🚀 Primaria Inicial (6–7 Años) — Indagación STEM Práctica, Lógica Espacial y Glucosa Estable',
        stageSummary: 'Papert (1980) y Benton (2007): Transición hacia dibujo práctico, ciencia en la naturaleza, acertijos espaciales por niveles y desayunos/loncheras de baja carga glucémica.',
        screenBudget: '≤ 60 min/día recreativo en días escolares (Solo en sala compartida)',
        sleepCutoff: 'Apagado físico 60+ min antes de dormir; cero pantallas en dormitorios',
        mealRule: 'Desayuno y lonchera de baja carga glucémica (avena/huevos/semillas) para 4 h de concentración en clase'
      },
      'middle-elementary': {
        ageLabelShort: 'Primaria Media (8–9 años)',
        directoryFilterAge: 'middle-elementary',
        stageHeadline: '🧩 Primaria Media (8–9 Años) — Programación Constructivista, Deducción y Nutrición Cerebral',
        stageSummary: 'Resnick (2017) y Asbell-Clarke (2012): Canaliza la autonomía hacia programación por bloques en Scratch, lógica booleana y mundos de ingeniería (con temporizador visual de 5 min) junto con hierro, zinc y DHA.',
        screenBudget: '≤ 60–75 min/día (Priorizar programación creativa y acertijos cooperativos)',
        sleepCutoff: 'Dispositivos cargando en la cocina 60+ min antes de apagar luces (Chang et al., 2015)',
        mealRule: 'Cena familiar sin pantallas; Hierro hemo/lentejas + Vitamina C y DHA marino 2–3 veces/sem'
      },
      'preteen': {
        ageLabelShort: 'Preadolescentes (10–12 años)',
        directoryFilterAge: 'preteen',
        stageHeadline: '🔭 Preadolescentes (10–12 Años) — Pensamiento Sistémico, Mineralización Ósea y Cero Redes',
        stageSummary: 'Nisan y Schocken (2005) y Weaver (2016): Reemplaza feeds algorítmicos cortos (Shorts/TikTok) y cajas de botín con física orbital, arquitectura de CPU y estrategia profunda, apoyado por calcio/D3/K2 y polifenoles.',
        screenBudget: '≤ 60–90 min/día recreativo (Cero feeds de desplazamiento infinito o chat)',
        sleepCutoff: 'Toque de queda estricto 60 min antes de dormir; cargadores fuera de la habitación',
        mealRule: 'Calcio + D3 + K2 + fibra prebiótica para pico de masa ósea; cero cafeína o bebidas energéticas'
      }
    },
    expertTab: {"chirpListenBtn": "🔊 Escuchar", "chirpStopBtn": "⏹ Detener", "chirpReadPlanBtn": "🔊 Leer Plan Diario", "chirpVoiceLabel": "🎙️ Voz Chirp 3 HD:", "entryKicker": "Nuevo • Confianza y Corregulación", "entryTitle": "Qué decir para criar niños seguros", "entrySub": "9 frases serenas para momentos difíciles cotidianos, con lectura en voz alta Chirp 3 HD y 10 charlas gratuitas de psicología clínica.", "entryCta": "Abrir →", "heading": "Qué Decir para Criar Niños Seguros de Sí Mismos", "badge": "10 videos verificados", "lede": "Los momentos difíciles son normales. Aquí tienes qué decir cuando ocurren: frases breves y serenas que puedes usar hoy mismo.", "about": "Basado en la teoría del apego, la investigación sobre acompañamiento emocional (Gottman) y la psicología de la autodeterminación (Deci y Ryan), junto con charlas públicas gratuitas de la psicóloga clínica Dra. Becky Kennedy (TED, YouTube y pódcast).", "disclaimer": "Recurso exclusivamente educativo — no constituye psicoterapia ni consejo médico o clínico. SafeKids es una guía independiente sin fines de lucro y no está afiliada, patrocinada ni respaldada por la Dra. Becky Kennedy, Good Inside®, TED ni ningún ponente enlazado. Good Inside® es una marca registrada de Good Inside, Inc., citada de forma nominativa solo para identificar enlaces externos públicos. Los guiones son paráfrasis originales de SafeKids, no citas textuales (enlaces verificados el 2026-11-07).", "pickerTitle": "¿Qué está pasando ahora mismo?", "pickerSub": "Toca un momento para ver qué decir o pulsa Escuchar para oír la frase con Google Cloud Chirp 3 HD.", "topics": {"confidence": "Construir confianza (4)", "frustration": "Sostener un límite (2)", "big-feelings": "Emociones intensas (2)", "repair": "Después de perder la calma (1)", "all": "Mostrar todo (9)"}, "statusAll": "Mostrando los {n} guiones.", "statusFiltered": "Mostrando {shown} de {total} guiones.", "insteadLabel": "En lugar de", "tryLabel": "Prueba decir", "copyBtn": "Copiar frase", "copiedBtn": "Copiado ✓", "whySummary": "Por qué funciona", "principlesTitle": "Las 5 grandes ideas detrás de estas frases", "practiceTitle": "Pruébalo una semana: un pequeño cambio al día", "practiceSub": "Un plan práctico de SafeKids basado en las ideas anteriores. Los cambios pequeños y constantes funcionan mejor.", "videosTitle": "Lecturas y charlas recomendadas: 10 videos gratuitos", "videosSub": "Los enlaces se abren en YouTube en una pestaña nueva sin cargar rastreadores antes de hacer clic.", "channelsTitle": "Enlaces externos a charlas y canales oficiales", "channelsSub": "Enlaces externos a los canales públicos donde se alojan las charlas anteriores. Algunas plataformas pueden pedir iniciar sesión.", "scripts": [{"id": "script_1", "moment": "Tu hijo te muestra un dibujo o proyecto", "instead": "«¡Buen trabajo! ¡Eres un gran artista!»", "tryText": "«Cuéntame sobre tu dibujo. ¿Cómo decidiste por dónde empezar?»", "why": "Una pregunta curiosa dirige la atención del niño hacia su propio criterio, fortaleciendo la autoconfianza en lugar de depender del aplauso externo."}, {"id": "script_2", "moment": "«Ella es mucho mejor que yo en esto.»", "instead": "«¡De ninguna manera, tú eres el mejor de todos!»", "tryText": "«Duele cuando alguien es mejor en algo que te importa. Yo también he sentido eso. Y sigues siendo tú, y estás bien.»", "why": "Negar lo que siente le enseña a desconfiar de su mundo interior. Nombrarlo le muestra que puede sentir frustración y seguir valiendo tal como es."}, {"id": "script_3", "moment": "Se atasca con la tarea o un rompecabezas y quiere rendirse", "instead": "«Ven, déjame hacerlo por ti.»", "tryText": "«Esto está realmente difícil. Estoy aquí contigo. ¿Qué pequeña cosa podrías intentar ahora?»", "why": "Rescatarlo elimina el esfuerzo que construye confianza. Acompañar sin resolver le da experiencia real superando retos."}, {"id": "script_4", "moment": "Tu preadolescente o adolescente está nervioso antes de una prueba", "instead": "«¡No te preocupes, te saldrá genial!»", "tryText": "«Claro que estás nervioso: esto te importa. Estar nervioso y estar preparado pueden ser verdad al mismo tiempo.»", "why": "Minimizar los nervios puede hacer que parezcan un problema. Sostener ambas emociones a la vez les muestra que sentir nervios es normal y que aun así están preparados."}, {"id": "script_5", "moment": "Se termina el tiempo de pantalla y empieza el llanto", "instead": "«¡Deja de llorar, es solo un programa!»", "tryText": "«Desearías seguir mirando. Es muy difícil parar. Y las pantallas terminaron por hoy. Puedes estar enojado; estoy aquí contigo.»", "why": "El límite se mantiene firme y la emoción se permite. La tolerancia a la frustración crece junto a un adulto tranquilo."}, {"id": "script_6", "moment": "Insiste o se queja después de que dijiste «no»", "instead": "«Está bien, solo uno más, pero deja de quejarte.»", "tryText": "«La respuesta sigue siendo no. Está bien que te enoje. Puedo sostener tus emociones grandes.»", "why": "Un «no» cálido y firme demuestra que el límite es seguro y que sus sentimientos no te desbordan."}, {"id": "script_7", "moment": "Tu hijo golpea a su hermano", "instead": "«¡No se pega! ¡Vete a tu cuarto!»", "tryText": "«No voy a dejar que pegues. Me acerco para que todos estén seguros. Eres un buen niño pasando un momento muy difícil.»", "why": "Detienes la conducta físicamente con calma y proteges su identidad de niño bueno para poder reparar después."}, {"id": "script_8", "moment": "Un niño sensible e intenso estalla por algo pequeño", "instead": "«Estás exagerando por completo.»", "tryText": "«Eso se sintió enorme. Estoy aquí contigo.»", "why": "En plena tormenta emocional, muchas palabras abruman más. Primero presencia calmada; las soluciones vienen después."}, {"id": "script_9", "moment": "Gritaste y te arrepientes", "instead": "Fingir que no pasó nada o decir «Grité porque no hiciste caso».", "tryText": "«Estuve pensando en lo de antes. Siento haber gritado. No fue tu culpa; me toca a mí trabajar en mi calma. Te quiero.»", "why": "Asumir tu parte sin culpar al niño protege su seguridad emocional y le modela cómo reparar errores."}], "principles": [{"title": "Separar al Niño de la Conducta", "body": "La conducta difícil es señal de un sistema nervioso desbordado, no de un mal niño. Lidera con calidez y curiosidad manteniendo la seguridad de todos."}, {"title": "Sostener el Límite y Validar la Emoción", "body": "Puedes mantener un límite firme y permitir la decepción: \"De verdad quieres más tiempo, y las pantallas terminaron por hoy.\""}, {"title": "Liderazgo Sereno y Firme", "body": "Tu tarea no es evitar cada disgusto, sino mantener la calma mientras tu hijo aprende que puede atravesar la frustración."}, {"title": "La Confianza Nace de la Autoconfianza", "body": "La seguridad duradera crece con la reflexión interna («¿Cómo lo logré?») y al superar retos manejables, no con elogios automáticos."}, {"title": "La Reparación Supera a la Perfección", "body": "Todo padre pierde la paciencia alguna vez. Volver con calma, asumir tu parte sin culpar al niño y reconectar modela responsabilidad y apego seguro."}]}
  },
  zh: {
    langCode: 'zh',
    langName: '中文',
    darkModeBtnOff: '🌙 深色模式',
    darkModeBtnOn: '☀️ 浅色模式',
    darkModeToggleTitle: '切换深色 / 浅色模式',
    languageSwitcherLabel: '语言切换',
    languageSelectLabel: '选择语言',
    languagePillsLabel: '快捷语言按钮',
    infographicEnterBtn: '📸 2分钟信息图速览',
    infographicExitBtn: '📸 退出2分钟信息图模式',
    expandAllScienceBtn: '🔬 展开全部临床科学',
    hideClinicalDetailsBtn: '🔬 隐藏临床科学细节',
    headerViewFullGuideBtn: '📖 查看完整指南',
    headerFocusedTabsBtn: '🎯 分栏专注视图',
    showAllSectionsBtn: '显示全部章节',
    returnFocusedTabsBtn: '返回分栏专注视图',
    activePrefix: '当前：',
    prevPrefix: '上一页：',
    nextPrefix: '下一页：',
    formatPagerIndicator: (cur, total, label) => `正在浏览第 ${cur} / ${total} 页 • ${label}`,
    backToOverviewBtn: '\u2190 返回每日计划与总览',
    jumpToChannelsBtn: '前往 观看 · 低刺激频道 (28) \u2192',
    fullHandbookModeLabel: '完整手册模式 • 全部 8 个分栏已展开',
    globalAgeLabel: '👶 孩子年龄：',
    globalAges: {
      'all': '全部年龄',
      'under-2': '0–24个月',
      'toddler': '2–3岁',
      'preschool': '4–5岁',
      'early-elementary': '6–7岁',
      'middle-elementary': '8–9岁',
      'preteen': '10–12岁'
    },
    sidebarBrandTitle: '观看 • 益智 • 营养 • 倾听',
    sidebarBrandSub: '在上方选择孩子年龄，或点击下方任一临床严选目录。',
    sidebarGroups: ['1. 从这里开始', '2. 每日严选四大目录', '3. 自测工具与临床科学', "4. 亲子沟通与情绪共调"],
    sidebarNav: {
      overview: { title: '每日计划与10大原则', caption: '冰箱速查表与四大支柱中心', pill: '首页' },
      channels: { title: '观看：低刺激安全频道', caption: '温和慢节奏视频白名单', pill: '28' },
      games: { title: '益智：教育家严选游戏', caption: '无广告逻辑与STEM探索', pill: '33' },
      nutrition: { title: '营养：天然原型食物', caption: '健康餐盒替换与NFI-10评分', pill: '32' },
      listen: { title: '倾听与阅读：无屏音频', caption: '科普播客、音频卡与绘本', pill: '26' },
      science: { title: '临床科学与自测计算器', caption: 'SEM-10、NFI-10与30项研究', pill: '30篇文献' },
      lockdown: { title: '设备与DNS锁定指南', caption: '开源工具、系统限制与DNS防护', pill: '13项工具' },
      expert: { title: "沟通：自信养育话术", caption: "情绪共调表达与讲座", pill: "9 条话术" },
      all: { title: '查看完整指南 / 打印全部', caption: '在同一页面展开所有章节', pill: '全部' }
    },
    mobileBar: {
      overview: '计划',
      channels: '观看',
      games: '益智',
      nutrition: '营养',
      listen: '倾听',
      lockdown: '防护',
      expert: "话术"
    },
    heroHeading: '循证温和的儿童媒体、益智游戏、天然脑营养与无屏音频家长门户',
    heroSubtitle: '选择孩子的年龄即可生成专属24小时健康作息，或浏览119项严选低刺激节目、建构主义益智游戏、NOVA-1原型食物便当替换方案及无屏播客与绘本。',
    heroStats: [
      '严选低刺激频道',
      '教育家认可益智游戏',
      '原型食物与健康替换',
      '无屏音频与经典绘本',
      '双10分制临床评估量表',
      '引用临床研究与法规'
    ],
    blueprintSyncBtn: '🔗 将全部4个目录同步至此年龄段',
    blueprintCopyBtn: '📋 复制看护人每日计划',
    blueprintReadBtn: "🔊 朗读每日计划",
    blueprintPrintBtn: '🖨️ 打印冰箱速查表',
    searchPlaceholders: {
      channel: '搜索频道（例如：Bluey、自然、数学、自然拼读）...',
      game: '搜索游戏（例如：国际象棋、编程、DragonBox、空间逻辑）...',
      food: '搜索食物与替换方案（例如：三文鱼、补铁、无人工色素、便当）...',
      listen: '搜索音频与绘本（例如：Yoto、科普播客、自然拼读、青蛙和蟾蜍）...'
    },
    viewChannelBtn: '访问官方频道',
    visitGameBtn: '访问官方游戏 / 应用',
    viewFoodRefBtn: '查看临床与营养学参考',
    viewListenRefBtn: '收听 / 查看绘本参考',
    drawerShowLabel: '🔬 + 科学原理、家长引导与文献引用',
    drawerHideLabel: '🔬 \u2212 收起临床科学细节与家长指南',
    formatChannelsCount: (n) => `${n} 个频道`,
    formatGamesCount: (n) => `${n} 款游戏`,
    formatFoodsCount: (n) => `${n} 项天然食物与替换`,
    formatListenCount: (n) => `${n} 项音频与绘本精选`,
    emptyChannelsTitle: '没有符合搜索条件的频道。',
    emptyChannelsSub: '请尝试调整年龄筛选或搜索关键词。',
    emptyGamesTitle: '没有符合搜索条件的益智游戏。',
    emptyGamesSub: '请尝试选择“全部游戏”或清除领域与停止信号筛选。',
    emptyFoodsTitle: '没有符合搜索条件的天然食物或替换方案。',
    emptyFoodsSub: '请尝试选择“全部食物”或清除营养领域筛选。',
    emptyListenTitle: '没有符合搜索条件的播客、有声书或绘本。',
    emptyListenSub: '请尝试选择“全部音频与图书”或清除搜索条件。',
    tabs: {
      overview: {
        kicker: '第 1 / 8 页 • 从这里开始',
        title: '总览、分龄每日作息计划与 10 大核心家庭准则',
        sub: '温和的日常作息节奏、可打印的四维支柱冰箱速查表以及核心家庭指导框架。',
        shortLabel: '每日计划与总览'
      },
      science: {
        kicker: '第 2 / 8 页 • 临床证据与量表',
        title: '临床科学、双10分制评估器（SEM-10 与 NFI-10）及 30 篇权威文献',
        sub: '同行评审神经影像学、发展心理学、儿科营养随机对照试验及60秒交互式自测工具。',
        shortLabel: '科学与量表 (30)'
      },
      channels: {
        kicker: '第 3 / 8 页 • 第一支柱（观看）',
        title: '家长严选低刺激视频频道目录（28 个频道）',
        sub: '基于 SEM-10 量表评分的温和视频频道，支持一键导出 JSON/CSV 白名单。',
        shortLabel: '观看 · 频道 (28)'
      },
      games: {
        kicker: '第 4 / 8 页 • 第二支柱（益智）',
        title: '教育家严选认知游戏与应用目录（33 款游戏）',
        sub: '建构主义沙盒、空间几何解谜与蒙氏应用，零广告、零开箱抽奖机制。',
        shortLabel: '益智 · 游戏 (33)'
      },
      nutrition: {
        kicker: '第 5 / 8 页 • 第三支柱（营养）',
        title: '儿科医生与营养师严选天然食物及便当替换方案（32 项替换）',
        sub: '用 NOVA-1 完整细胞基质食物替换超加工儿童零食、果泥吸吸袋与人工合成色素。',
        shortLabel: '营养 · 食物 (32)'
      },
      listen: {
        kicker: '第 6 / 8 页 • 第四支柱（倾听与阅读）',
        title: '倾听与阅读：无屏音频、科普播客与经典绘本目录（26 项精选）',
        sub: '严选 STEM 科普与故事播客、Yoto/Tonie 实体音频卡、自然拼读读物与对话式阅读绘本。',
        shortLabel: '倾听与阅读 (26)'
      },
      lockdown: {
        kicker: '第 7 / 8 页 • 技术防护体系',
        title: '开源家长控制工具与分步设备 / DNS 锁定指南',
        sub: '13 项开源家长控制架构，以及 BrainRotGuard、KidTube、Family Link、引导式访问与 NextDNS 设置指南。',
        shortLabel: '设备与 DNS 防护'
      },
      expert: {
        kicker: "第 8 / 8 页 • 自信培养与情绪共调",
        title: "自信与情绪共调话术：在棘手时刻怎么对孩子说",
        sub: "5 项依恋与自我信任心理学原则、9 条“换个说法”话术、7 天微习惯计划，以及 10 个免费心理学公开讲座。",
        shortLabel: "自信话术 (9)"
      },
      all: {
        kicker: '完整手册模式 • 全部 8 个分栏可见',
        title: 'SafeKids 家长门户完整参考手册（全部章节）',
        sub: '展示全部 10 项建议、30+ 项临床研究、28 个频道、33 款游戏、32 项食物替换、26 项音频绘本与 5 份锁定指南。',
        shortLabel: '完整指南（全部章节）'
      }
    },
    blueprintStages: {
      'under-2': {
        ageLabelShort: '2岁以下 (0–24个月)',
        directoryFilterAge: 'toddler',
        stageHeadline: '👶 2岁以下（0–24个月）— 100% 零屏幕感官运动与铁 / DHA 脑发育基石',
        stageSummary: 'AAP (2016) 与 Kuhl (2003)：24个月以下婴幼儿存在“视频缺陷效应”，需要真人面对面发声互动、地板探索以及富含血红素铁、胆碱与海洋 DHA 的辅食。',
        screenBudget: '0 分钟/天被动视频（按 AAP 指南仅限亲友真人视频通话）',
        sleepCutoff: '100% 无屏幕暗光婴儿房；每日 12–16 小时总睡眠（含小睡）',
        mealRule: '零添加糖、1岁（12个月）内禁蜂蜜；软烂富铁与 DHA 天然原型辅食'
      },
      'toddler': {
        ageLabelShort: '幼儿期 (2–3岁)',
        directoryFilterAge: 'toddler',
        stageHeadline: '🧸 幼儿期（2–3岁）— 家长共视慢节奏媒体（SEM-10 ≤ 2/10）与防噎天然食物',
        stageSummary: 'WHO (2019) 与 Lillard (2011)：每日屏幕时间控制在 30–45 分钟以内，始终在客厅电视上由家长陪同观看；优先选择无失败惩罚的数字玩具箱与纵向切四瓣的 NOVA-1 原型食物。',
        screenBudget: '≤ 30–45 分钟/天（100% 客厅电视家长陪同共视）',
        sleepCutoff: '午睡与夜间入睡前 60+ 分钟关闭所有屏幕（保护褪黑素分泌）',
        mealRule: '100% 无屏幕餐桌；整颗葡萄/小番茄纵向切四瓣；坚果酱需稀释涂抹'
      },
      'preschool': {
        ageLabelShort: '学龄前 (4–5岁)',
        directoryFilterAge: 'preschool',
        stageHeadline: '🎨 学龄前（4–5岁）— 前额叶执行功能、自然拼读与感官食物过渡桥',
        stageSummary: 'Diamond (2013) 与 Hirsh-Pasek (2015)：通过低唤醒度故事与触觉动手应用培养抑制控制、自然拼读和空间数感，配合无压力的家庭共餐。',
        screenBudget: '≤ 45–60 分钟/天 严选低刺激电视或引导式教学应用',
        sleepCutoff: '睡前 60+ 分钟关闭全部屏幕（纸质绘本共读放松）',
        mealRule: '100% 无屏幕进餐；零人工合成色素（美国标示红40/黄5，即诱惑红 E129、柠檬黄 E102）；用完整水果替代果泥吸吸袋'
      },
      'early-elementary': {
        ageLabelShort: '小学低年级 (6–7岁)',
        directoryFilterAge: 'early-elementary',
        stageHeadline: '🚀 小学低年级（6–7岁）— 动手 STEM 探究、空间逻辑解谜与平稳校园血糖',
        stageSummary: 'Papert (1980) 与 Benton (2007)：从被动观看转向动手绘画、自然科普与分关卡空间逻辑解谜；搭配低升糖负荷（Low-GL）早餐与便当，预防上午课堂注意力骤降。',
        screenBudget: '≤ 60 分钟/天 上学日娱乐上限（仅限客厅公共区域）',
        sleepCutoff: '睡前 60+ 分钟硬件断电；卧室 100% 零屏幕',
        mealRule: '低升糖负荷早餐与便当（燕麦/全蛋/种子），维持上午 4 小时课堂专注'
      },
      'middle-elementary': {
        ageLabelShort: '小学中年级 (8–9岁)',
        directoryFilterAge: 'middle-elementary',
        stageHeadline: '🧩 小学中年级（8–9岁）— 建构主义编程、演绎数学与神经辅因子营养',
        stageSummary: 'Resnick (2017) 与 Asbell-Clarke (2012)：将成长的自主性引导至 Scratch 积木编程、布尔逻辑解谜与工程沙盒（配合 5 分钟视觉计时器），并补充铁、锌与海洋 DHA。',
        screenBudget: '≤ 60–75 分钟/天（优先创意编程与双人合作解谜）',
        sleepCutoff: '熄灯前 60+ 分钟所有设备集中在厨房充电（Chang et al., 2015）',
        mealRule: '无屏幕家庭晚餐；每周 2–3 次血红素/扁豆铁 + 维C 与深海鱼 DHA'
      },
      'preteen': {
        ageLabelShort: '青春期前夕 (10–12岁)',
        directoryFilterAge: 'preteen',
        stageHeadline: '🔭 青春期前夕（10–12岁）— 深度系统思维、骨矿化高峰营养与零算法短视频',
        stageSummary: 'Nisan & Schocken (2005) 与 Weaver (2016)：用轨道物理、CPU 架构与深度策略游戏替代算法短视频（Shorts/TikTok）与开箱射击游戏，同时强化钙/D3/K2 与高多酚健脑食物。',
        screenBudget: '≤ 60–90 分钟/天 娱乐时间（禁止无限下拉信息流与聊天功能）',
        sleepCutoff: '睡前 60 分钟严格宵禁；充电器整夜留在卧室外',
        mealRule: '骨量峰值期补足 D3 + K2 + 钙 + 益生元纤维；严禁咖啡因与能量饮料'
      }
    },
    expertTab: {"chirpListenBtn": "🔊 语音朗读", "chirpStopBtn": "⏹ 停止", "chirpReadPlanBtn": "🔊 朗读每日计划", "chirpVoiceLabel": "🎙️ Chirp 3 HD 音色：", "entryKicker": "新增 • 自信培养与情绪共调", "entryTitle": "培养自信孩子的日常回应话术", "entrySub": "9 句应对日常棘手时刻的平和表达，配备 Chirp 3 HD 语音朗读与 10 个免费临床心理学公开视频。", "entryCta": "打开 →", "heading": "怎么说才能培养自信的孩子", "badge": "10 个已核实视频", "lede": "育儿中的崩溃时刻很正常。下面这些简短、平和的话术，今天就能直接用上。", "about": "基于依恋理论、情绪辅导研究（Gottman）与自我决定论心理学（Deci & Ryan），并附临床心理学家 Becky Kennedy 博士在 TED、YouTube 与播客上的免费公开讲座链接供家长延伸观看。", "disclaimer": "本页仅供家庭教育参考，不构成心理治疗、医疗或临床诊断建议。SafeKids 为独立非营利指南，与 Becky Kennedy 博士、Good Inside®、TED 或任何受访讲者均无隶属、赞助或背书关系。Good Inside® 为 Good Inside, Inc. 的注册商标，此处仅作指称性引用以标明外部公开视频来源。以下话术均为 SafeKids 基于发展心理学独立撰写的意译改写，并非原话摘录（链接核验于 2026-11-07）。", "pickerTitle": "此刻正在发生什么？", "pickerSub": "点击场景查看建议说法，或点击“语音朗读”用 Google Cloud Chirp 3 HD 聆听示范语气。", "topics": {"confidence": "建立内在自信 (4)", "frustration": "温和守住界限 (2)", "big-feelings": "应对强烈情绪 (2)", "repair": "发火后的修复 (1)", "all": "显示全部 (9)"}, "statusAll": "当前显示全部 {n} 条话术。", "statusFiltered": "当前显示 {shown} / {total} 条话术。", "insteadLabel": "别急着说", "tryLabel": "试试这样说", "copyBtn": "复制这句话", "copiedBtn": "已复制 ✓", "whySummary": "为什么有效", "principlesTitle": "话术背后的 5 个核心理念", "practiceTitle": "练习一周：每天一个小替换", "practiceSub": "循序渐进的微小改变，比一次性的完美主义更容易坚持。", "videosTitle": "延伸观看：10 个免费心理学公开视频", "videosSub": "链接将在新标签页打开 YouTube，点击前不会加载任何第三方追踪脚本。", "channelsTitle": "外部讲者与公开讲座主页链接", "channelsSub": "以下为上述公开视频所属的官方外部频道链接；部分第三方平台可能需要登录。", "scripts": [{"id": "script_1", "moment": "孩子向你展示一幅画或手工作品", "instead": "“太棒了！你真是个小画家！”", "tryText": "“快跟我讲讲这幅画吧。你是怎么想到从这里开始画的？”", "why": "好奇的提问能引导孩子向内看，让自信建立在自己的思考之上，而不是依赖大人的夸奖。"}, {"id": "script_2", "moment": "“她画得比我好多了。”", "instead": "“胡说，你才是最棒的那个！”", "tryText": "“在自己在意的事情上别人做得更好，心里确实会不好受。我也有过这种感觉。但你依然是你，你这样就很好。”", "why": "否定感受会让孩子怀疑自己的直觉；接纳嫉妒与失落，孩子才能学会在落差中依然接纳自己。"}, {"id": "script_3", "moment": "写作业或拼图卡住了，想放弃", "instead": "“来，我直接帮你弄好吧。”", "tryText": "“这道题确实很难。我就在你身边陪着你。接下来有什么小小的一步可以试试看？”", "why": "代劳会剥夺锻炼抗挫力的机会；温和陪伴而不抢着解决，才能帮孩子积累克服困难的底气。"}, {"id": "script_4", "moment": "大孩子在考试或选拔前紧张不安", "instead": "“别担心，你肯定没问题的！”", "tryText": "“你会紧张太正常了，因为这件事对你很重要。既紧张又准备好，这两件事可以同时成立。”", "why": "空洞安慰会让紧张看起来像个问题。接纳两种感受并存能告诉孩子：紧张很正常，并不妨碍自己做好准备。"}, {"id": "script_5", "moment": "屏幕时间到了，孩子开始哭闹", "instead": "“别哭了，不就是个动画片吗！”", "tryText": "“你真的很想继续看，要停下来确实很难受。不过今天的屏幕时间结束了。你可以生我的气，我就在这儿陪你。”", "why": "界限坚定不变，同时允许情绪流露。孩子是在情绪稳定的大人身边学会承受失望的。"}, {"id": "script_6", "moment": "你说“不行”之后，孩子不停软磨硬泡", "instead": "“行吧行吧，就最后一次，别再哼唧了。”", "tryText": "“答案依然是不行。你可以为此感到生气，我接得住你的大情绪。”", "why": "温和而坚定的拒绝告诉孩子：规则是安全的，他的情绪也不会把父母压垮。"}, {"id": "script_7", "moment": "孩子动手打了兄弟姐妹", "instead": "“不许打人！回你自己房间去！”", "tryText": "“我不能让你打人。我先把你们分开，保证大家都安全。你是个好孩子，只是现在遇到了很难受的时刻。”", "why": "用平稳的行动制止行为，同时把“坏行为”与“好孩子”分开，等平静后才更容易引导真诚修复。"}, {"id": "script_8", "moment": "高敏感、情绪强烈的孩子因小事瞬间爆发", "instead": "“你也太小题大做了吧。”", "tryText": "“刚才那一下让你觉得特别委屈对不对？我在这儿陪你。”", "why": "情绪风暴正盛时，讲大道理只会让神经系统更加过载。先用简短的话稳住安全感，事后再复盘。"}, {"id": "script_9", "moment": "你没忍住吼了孩子，事后很后悔", "instead": "假装没发生过，或说“还不是因为你不听话我才吼你的”。", "tryText": "“我一直在想刚才的事。对不起，我不该冲你大吼。这不是你的错，管好情绪是我自己的功课。我爱你。”", "why": "真诚承担大人的责任而不甩锅给孩子，能修复安全感，也为孩子示范如何面对错误。"}], "principles": [{"title": "把孩子本人与当下行为分开", "body": "棘手行为是神经系统超载的信号，不代表孩子不好。在确保安全的前提下，用温和与好奇去理解行为背后的需求。"}, {"title": "坚定守住界限，同时接纳情绪", "body": "你可以温和而坚定地立规矩，同时允许孩子失望：“你真的很想再看一会儿，但今天的屏幕时间结束了。”"}, {"title": "做平和稳健的引导者", "body": "父母的职责不是消除每一次不开心，而是在孩子学习度过挫败时保持稳定与陪伴。"}, {"title": "真正的自信源于自我信任", "body": "持久的自信来自内在反思（“我是怎么想出来的？”）与跨过适度困难的经历，而非频繁的“你真棒”式夸奖。"}, {"title": "关系修复胜过追求完美", "body": "每位父母都会有失控的时候。平静回到孩子身边、坦诚承担自己的责任而不推卸给孩子，最能建立安全依恋。"}]}
  },
  ja: {
    langCode: 'ja',
    langName: '日本語',
    darkModeBtnOff: '🌙 ダークモード',
    darkModeBtnOn: '☀️ ライトモード',
    darkModeToggleTitle: 'ダーク / ライトモードを切り替え',
    languageSwitcherLabel: '言語切り替え',
    languageSelectLabel: '言語を選択',
    languagePillsLabel: 'クイック言語ボタン',
    infographicEnterBtn: '📸 2分インフォグラフィック表示',
    infographicExitBtn: '📸 インフォグラフィック表示を終了',
    expandAllScienceBtn: '🔬 すべての科学的根拠を展開',
    hideClinicalDetailsBtn: '🔬 科学的根拠を折りたたむ',
    headerViewFullGuideBtn: '📖 全ガイドを表示',
    headerFocusedTabsBtn: '🎯 タブ表示に戻る',
    showAllSectionsBtn: '全セクションを一括表示',
    returnFocusedTabsBtn: 'タブ表示に戻る',
    activePrefix: '表示中：',
    prevPrefix: '前へ：',
    nextPrefix: '次へ：',
    formatPagerIndicator: (cur, total, label) => `タブ ${cur} / ${total} を表示中 • ${label}`,
    backToOverviewBtn: '\u2190 1日のプランと概要へ戻る',
    jumpToChannelsBtn: '観る · 低刺激チャンネル (28) へ移動 \u2192',
    fullHandbookModeLabel: 'フルハンドブックモード • 全 8 タブ表示中',
    globalAgeLabel: '👶 お子様の年齢：',
    globalAges: {
      'all': '全年齢',
      'under-2': '0–24ヶ月',
      'toddler': '2–3歳',
      'preschool': '4–5歳',
      'early-elementary': '6–7歳',
      'middle-elementary': '8–9歳',
      'preteen': '10–12歳'
    },
    sidebarBrandTitle: '観る • 遊ぶ • 食べる • 聴く',
    sidebarBrandSub: '上で年齢を選択するか、下の各専門ディレクトリへ移動してください。',
    sidebarGroups: ['1. はじめに', '2. 厳選デイリーディレクトリ', '3. 評価ツールと臨床科学', "4. 声かけと感情の共同調整"],
    sidebarNav: {
      overview: { title: '1日のプランと10のルール', caption: '冷蔵庫シート＆4つの柱', pill: '開始' },
      channels: { title: '観る：安全な低刺激番組', caption: '低刺激動画ホワイトリスト', pill: '28' },
      games: { title: '遊ぶ：教育者推奨ゲーム', caption: '広告なし論理＆STEM遊び', pill: '33' },
      nutrition: { title: '食べる：自然食品と弁当', caption: '超加工食品の代替＆NFI-10', pill: '32' },
      listen: { title: '聴く・読む：音声と絵本', caption: 'ポッドキャスト・Yoto・絵本', pill: '26' },
      science: { title: '臨床科学と自己診断ツール', caption: 'SEM-10・NFI-10・30の研究', pill: '30文献' },
      lockdown: { title: '端末・DNSロック手順', caption: 'オープンソース＆DNS防御', pill: '13ツール' },
      expert: { title: "対話：自信を育む声かけ", caption: "感情コーチングと言い換え", pill: "9フレーズ" },
      all: { title: '全ガイド表示 / 印刷モード', caption: '全セクションを1ページに表示', pill: 'すべて' }
    },
    mobileBar: {
      overview: 'プラン',
      channels: '観る',
      games: '遊ぶ',
      nutrition: '食べる',
      listen: '聴く',
      lockdown: '防御',
      expert: "声かけ"
    },
    heroHeading: '科学的根拠に基づく低刺激メディア・知育ゲーム・自然食・音声読書ポータル',
    heroSubtitle: 'お子様の年齢を選んで1日の理想的なリズムを作成したり、厳選された119の低刺激番組・構築主義ゲーム・NOVA-1自然食ランチ代替案・画面なしの音声＆絵本を探索できます。',
    heroStats: [
      '厳選された低刺激チャンネル',
      '教育者推奨の知育ゲーム',
      '自然食品＆ランチ代替案',
      '画面なしの音声＆良書',
      '2つの10点満点評価基準',
      '引用された臨床研究と法規'
    ],
    blueprintSyncBtn: '🔗 全4ディレクトリをこの年齢に同期',
    blueprintCopyBtn: '📋 ケアプランをコピー',
    blueprintReadBtn: "🔊 プランを読み上げ",
    blueprintPrintBtn: '🖨️ 冷蔵庫シートを印刷',
    searchPlaceholders: {
      channel: 'チャンネルを検索（例：Bluey、自然、算数、フォニックス）...',
      game: 'ゲームを検索（例：チェス、プログラミング、DragonBox、空間パズル）...',
      food: '食品・代替案を検索（例：サーモン、鉄分、無着色、お弁当）...',
      listen: '音声・本を検索（例：Yoto、科学ポッドキャスト、フォニックス、絵本）...'
    },
    viewChannelBtn: '公式チャンネルを見る',
    visitGameBtn: '公式ゲーム / アプリを見る',
    viewFoodRefBtn: '臨床・栄養リファレンスを見る',
    viewListenRefBtn: '聴く / 書籍リファレンスを見る',
    drawerShowLabel: '🔬 + 科学的根拠・親向けガイド・引用文献を表示',
    drawerHideLabel: '🔬 \u2212 臨床詳細とガイドを折りたたむ',
    formatChannelsCount: (n) => `${n} チャンネル`,
    formatGamesCount: (n) => `${n} ゲーム`,
    formatFoodsCount: (n) => `${n} 種類の自然食品・代替案`,
    formatListenCount: (n) => `${n} 種類の音声・書籍`,
    emptyChannelsTitle: '検索条件に一致するチャンネルがありません。',
    emptyChannelsSub: '年齢フィルターや検索キーワードを変更してお試しください。',
    emptyGamesTitle: '検索条件に一致する教育ゲームがありません。',
    emptyGamesSub: '「すべて」を選択するか、フィルター条件をクリアしてください。',
    emptyFoodsTitle: '検索条件に一致する自然食品・代替案がありません。',
    emptyFoodsSub: '栄養ドメインや検索フィルターをリセットしてお試しください。',
    emptyListenTitle: '検索条件に一致するポッドキャストや書籍がありません。',
    emptyListenSub: 'フォーマットフィルターや検索キーワードをクリアしてお試しください。',
    tabs: {
      overview: {
        kicker: 'タブ 1 / 8 • はじめに',
        title: '概要・年齢別デイリープラン＆家庭のための10大ルール',
        sub: '落ち着いた1日の生活リズム、印刷できる冷蔵庫用4柱シート、家庭向け基本ガイドライン。',
        shortLabel: 'デイリープランと概要'
      },
      science: {
        kicker: 'タブ 2 / 8 • 臨床エビデンスと評価基準',
        title: '臨床科学・10点満点デュアル評価ツール（SEM-10 & NFI-10）・30の引用研究',
        sub: '査読付き脳画像研究、発達心理学、小児栄養学RCT、および60秒で判定できる対話型計算機。',
        shortLabel: '科学と評価基準 (30)'
      },
      channels: {
        kicker: 'タブ 3 / 8 • 第1の柱（観る）',
        title: '保護者承認・低刺激動画チャンネルディレクトリ（全28チャンネル）',
        sub: 'SEM-10基準で採点された穏やかな動画チャンネルと、ワンクリックJSON/CSVホワイトリスト出力。',
        shortLabel: '観る · チャンネル (28)'
      },
      games: {
        kicker: 'タブ 4 / 8 • 第2の柱（遊ぶ）',
        title: '教育者推奨・知育ゲーム＆アプリディレクトリ（全33ゲーム）',
        sub: '広告ゼロ・ガチャ課金ゼロの構築主義サンドボックス、空間パズル、モンテッソーリ知育アプリ。',
        shortLabel: '遊ぶ · ゲーム (33)'
      },
      nutrition: {
        kicker: 'タブ 5 / 8 • 第3の柱（食べる）',
        title: '小児科医・管理栄養士監修の自然食品＆お弁当スワップ（全32種）',
        sub: '超加工スナックやパウチ飲料、合成着色料を置き換えるNOVA-1ホールフード代替ガイド。',
        shortLabel: '食べる · 自然食 (32)'
      },
      listen: {
        kicker: 'タブ 6 / 8 • 第4の柱（聴く・読む）',
        title: '聴く・読む：スクリーンフリー音声・ポッドキャスト＆絵本ディレクトリ（全26選）',
        sub: '科学＆物語ポッドキャスト、Yoto/Tonieオーディオカード、フォニックス読本、対話型読み聞かせ名作本。',
        shortLabel: '聴く・読む (26)'
      },
      lockdown: {
        kicker: 'タブ 7 / 8 • 技術的ディフェンス',
        title: 'オープンソース保護者管理ツール＆端末 / DNSロックダウン手順',
        sub: '13のオープンソース管理ツールと、BrainRotGuard・KidTube・ファミリー リンク・アクセスガイド・NextDNS設定手順。',
        shortLabel: '端末＆DNSロック設定'
      },
      expert: {
        kicker: "タブ 8 / 8 • 自信と感情の共同調整",
        title: "自信と共同調整の声かけ集：困った場面で使える言葉",
        sub: "愛着理論と自己信頼の5原則、9つの「こう言い換えよう」フレーズ、7日間の練習プラン、無料の心理学講演10本。",
        shortLabel: "声かけ集 (9)"
      },
      all: {
        kicker: 'フルハンドブックモード • 全8タブを表示中',
        title: 'SafeKids 保護者ポータル完全リファレンス（全セクション表示）',
        sub: '10の推奨事項、30以上の臨床研究、28チャンネル、33ゲーム、32の食品スワップ、26の音声・書籍、5つのロック手順を表示。',
        shortLabel: '全ガイド（全セクション）'
      }
    },
    blueprintStages: {
      'under-2': {
        ageLabelShort: '2歳未満 (0–24ヶ月)',
        directoryFilterAge: 'toddler',
        stageHeadline: '👶 2歳未満（0–24ヶ月）— 100% スクリーンゼロ・感覚運動と鉄分/DHAの基盤',
        stageSummary: 'AAP (2016) & Kuhl (2003)：24ヶ月未満の乳幼児は「ビデオ欠損効果」により画面から学びにくいため、親子の生の声のやり取り、床での全身遊び、ヘム鉄・コリン・海洋性DHAを含む離乳食が不可欠です。',
        screenBudget: '受動的動画 0分/日（AAP基準により家族とのライブビデオ通話のみ可）',
        sleepCutoff: '100%スクリーンなしの暗い寝室；昼寝を含め1日計12–16時間の睡眠',
        mealRule: '砂糖添加ゼロ・1歳（12ヶ月）未満はハチミツ厳禁；柔らかい鉄分＋DHA自然食'
      },
      'toddler': {
        ageLabelShort: '幼児前期 (2–3歳)',
        directoryFilterAge: 'toddler',
        stageHeadline: '🧸 幼児前期（2–3歳）— 親子で一緒に観るスロー映像（SEM-10 ≤ 2/10）と誤嚥防止の自然食',
        stageSummary: 'WHO (2019) & Lillard (2011)：画面時間は1日30–45分以内に抑え、必ずリビングのテレビで親子一緒に視聴。失敗ペナルティのない知育トイボックスと縦4等分に切ったNOVA-1自然食品を優先します。',
        screenBudget: '≤ 30–45分/日（リビングの共有テレビで100%保護者と一緒）',
        sleepCutoff: '昼寝および就寝の60分以上前に画面オフ（メラトニン保護）',
        mealRule: '食事中は100%画面オフ；ブドウやミニトマトは縦4等分；ナッツバターは薄く伸ばす'
      },
      'preschool': {
        ageLabelShort: '幼児後期 (4–5歳)',
        directoryFilterAge: 'preschool',
        stageHeadline: '🎨 幼児後期（4–5歳）— 前頭前野の実行機能・フォニックス・感覚の食育ブリッジ',
        stageSummary: 'Diamond (2013) & Hirsh-Pasek (2015)：穏やかな物語と手先を使うアプリで抑制制御・フォニックス・空間数感覚を育て、プレッシャーのない楽しい食卓を作ります。',
        screenBudget: '≤ 45–60分/日 厳選された低刺激テレビまたはガイド付き知育アプリ',
        sleepCutoff: '就寝60分以上前にすべての画面をオフ（絵本の読み聞かせへ移行）',
        mealRule: '食事中は100%画面なし；合成着色料ゼロ（米国表示 Red 40 / Yellow 5＝日本の赤色40号・黄色4号）；パウチ入りピューレより丸ごとの果物を'
      },
      'early-elementary': {
        ageLabelShort: '小学校低学年 (6–7歳)',
        directoryFilterAge: 'early-elementary',
        stageHeadline: '🚀 小学校低学年（6–7歳）— 体験型STEM探究・空間論理パズルと安定した血糖値',
        stageSummary: 'Papert (1980) & Benton (2007)：受動的な視聴から工作・自然観察・ステージ完結型パズルへ移行。低GLの朝食とお弁当で午前中の集中力低下を防ぎます。',
        screenBudget: '≤ 60分/日 平日の娯楽上限（リビング共有スペースのみ）',
        sleepCutoff: '就寝60分以上前にハードウェア終了；子供部屋への端末持ち込みゼロ',
        mealRule: '低GL朝食＋お弁当（オーツ麦・卵・種子類）で午前4時間の授業集中を維持'
      },
      'middle-elementary': {
        ageLabelShort: '小学校中学年 (8–9歳)',
        directoryFilterAge: 'middle-elementary',
        stageHeadline: '🧩 小学校中学年（8–9歳）— 構築主義プログラミング・論理推論と脳補酵素栄養',
        stageSummary: 'Resnick (2017) & Asbell-Clarke (2012)：Scratchブロックプログラミングや論理パズル、工学サンドボックス（5分視覚タイマー併用）と、鉄・亜鉛・DHA豊富な食事を組み合わせます。',
        screenBudget: '≤ 60–75分/日（創作プログラミングと協力型パズルを優先）',
        sleepCutoff: '消灯60分以上前に端末をキッチンで充電（Chang et al., 2015）',
        mealRule: '画面なしの家族の夕食；週2–3回のヘム鉄/レンズ豆＋ビタミンC＆青魚DHA'
      },
      'preteen': {
        ageLabelShort: 'プレティーン (10–12歳)',
        directoryFilterAge: 'preteen',
        stageHeadline: '🔭 プレティーン（10–12歳）— システム思考・骨密度ピーク期の栄養とSNSフィード遮断',
        stageSummary: 'Nisan & Schocken (2005) & Weaver (2016)：ショート動画（Shorts/TikTok）やルートボックス型ゲームを軌道物理・CPU設計・戦略ゲームに置き換え、カルシウム/D3/K2とポリフェノールで脳と骨を支えます。',
        screenBudget: '≤ 60–90分/日 娯楽上限（無限スクロールのフィードとチャットは禁止）',
        sleepCutoff: '就寝60分前の厳格な門限；充電器は一晩中寝室の外に配置',
        mealRule: '最大骨量のためのD3 + K2 + カルシウム + 食物繊維；カフェイン・エナジードリンク禁止'
      }
    },
    expertTab: {"chirpListenBtn": "🔊 音声で聴く", "chirpStopBtn": "⏹ 停止", "chirpReadPlanBtn": "🔊 プランを読み上げ", "chirpVoiceLabel": "🎙️ Chirp 3 HD 音声：", "entryKicker": "新設 • 自信と感情の共同調整", "entryTitle": "自信のある子を育てる日常の声かけフレーズ", "entrySub": "困った場面で使える9つの穏やかな言葉（Chirp 3 HD 音声読み上げ＆無料の臨床心理学トーク10本付き）。", "entryCta": "開く →", "heading": "自信のある子を育てる親の声かけ", "badge": "確認済み動画 10本", "lede": "子育ての大変な瞬間は誰にでもあります。今日からすぐに使える、短く穏やかな声かけ集です。", "about": "愛着理論、感情コーチング研究（Gottman）、自己決定理論（Deci & Ryan）に基づき、臨床心理学者ベッキー・ケネディ博士の無料公開トーク（TED・YouTube・ポッドキャスト）を参考リンクとして併載しています。", "disclaimer": "本ページは教育目的の情報提供であり、心理療法・医療・臨床上の助言ではありません。SafeKidsは独立した非営利ガイドであり、ベッキー・ケネディ博士、Good Inside®、TED、または各講演者との提携・推奨関係はありません。Good Inside®はGood Inside, Inc.の登録商標であり、外部公開動画の出所を示す目的でのみ言及しています。掲載フレーズは発達心理学に基づくSafeKids独自の言い換え要約であり、逐語的な引用ではありません（リンク確認日：2026-11-07）。", "pickerTitle": "今、どんな場面ですか？", "pickerSub": "場面をタップして声かけを見るか、「音声で聴く」で Google Cloud Chirp 3 HD の自然な読み上げを聴けます。", "topics": {"confidence": "自信を育てる (4)", "frustration": "境界線を守る (2)", "big-feelings": "大きな感情 (2)", "repair": "怒りすぎた後の修復 (1)", "all": "すべて表示 (9)"}, "statusAll": "全 {n} 件のフレーズを表示中。", "statusFiltered": "{total} 件中 {shown} 件のフレーズを表示中。", "insteadLabel": "こう言う代わりに", "tryLabel": "こう伝えてみよう", "copyBtn": "フレーズをコピー", "copiedBtn": "コピー完了 ✓", "whySummary": "なぜ効果的なのか", "principlesTitle": "声かけを支える5つの基本理念", "practiceTitle": "1週間チャレンジ：1日1つの言い換え", "practiceSub": "一度に全部変えるより、小さな言い換えを繰り返すほうが自然に身につきます。", "videosTitle": "参考視聴：無料で学べる心理学トーク10選", "videosSub": "リンクは新しいタブで YouTube を開きます。クリックするまでトラッカーは読み込まれません。", "channelsTitle": "外部スピーカー・公式公開チャンネル", "channelsSub": "上記トークが公開されている外部公式チャンネルへのリンクです。一部サイトではログインが必要な場合があります。", "scripts": [{"id": "script_1", "moment": "子どもが絵や作品を見せてくれたとき", "instead": "「すごいね！絵の天才だね！」", "tryText": "「この絵について教えて。どこから描こうってどうやって決めたの？」", "why": "好奇心からの質問は子どもの意識を自分の内側へ向け、大人の評価ではなく自分の工夫に自信を持てるようにします。"}, {"id": "script_2", "moment": "「あの子、私よりずっと上手なんだもん」", "instead": "「そんなことないよ、あなたのほうが一番上手だよ！」", "tryText": "「大事なことで誰かのほうが上手だと、胸がチクッとするよね。私もそう感じたことがあるよ。それでもあなたはあなたのままで大丈夫だよ。」", "why": "気持ちを打ち消すと自分の感覚を信じられなくなります。悔しさを認めることで、揺れても自分は大丈夫だと学べます。"}, {"id": "script_3", "moment": "宿題やパズルで行き詰まり、投げ出しそうなとき", "instead": "「貸してごらん、やってあげるから。」", "tryText": "「本当に難しいね。すぐ隣にいるよ。次に試せそうな小さな一歩は何かな？」", "why": "先回りして解決すると自信の種になる試行錯誤を奪ってしまいます。そばで見守ることが「乗り越えた実績」になります。"}, {"id": "script_4", "moment": "テストや選考の前に緊張しているとき", "instead": "「心配しないで、絶対うまくいくよ！」", "tryText": "「ドキドキして当然だよ、それだけ大切に思っているんだもの。緊張していることと準備ができていることは、同時に成り立つよ。」", "why": "「大丈夫」と打ち消すと不安が悪いことのように感じます。両方の気持ちを同時に認めることで、緊張していても力を発揮できると伝わります。"}, {"id": "script_5", "moment": "スクリーンタイムが終わり、かんしゃくが始まったとき", "instead": "「泣かないの！たかが動画でしょ！」", "tryText": "「もっと観たかったよね。やめるのは本当につらいね。でも今日の画面はおしまいだよ。怒っても大丈夫、ここにいるからね。」", "why": "ルールは守りつつ感情は否定しません。落ち着いた大人の隣でがっかりする経験が欲求不満耐性を育てます。"}, {"id": "script_6", "moment": "「ダメ」と言ったあともぐずって頼み続けるとき", "instead": "「わかった、あと1回だけよ。そのかわり泣き言はやめて。」", "tryText": "「答えはやっぱりノーだよ。悔しくて怒ってもいいよ。あなたの大きな気持ちはちゃんと受け止められるからね。」", "why": "温かく揺るがない「ノー」は、境界線が安全であり、自分の感情で親が崩れないという安心感を与えます。"}, {"id": "script_7", "moment": "きょうだいを叩いてしまったとき", "instead": "「叩いちゃダメ！自分の部屋に行きなさい！」", "tryText": "「叩くことはさせないよ。みんなが安全でいられるように離れるね。あなたはいい子だけど、今はとても大変な気持ちなんだね。」", "why": "脅しではなく行動で安全を守り、「本来はいい子」という前提を保つことで、落ち着いた後の仲直りが進みやすくなります。"}, {"id": "script_8", "moment": "感受性が強く繊細な子が、些細なことで爆発したとき", "instead": "「大げさに騒ぎすぎだよ。」", "tryText": "「すごく大きなことに感じられたんだね。ここにいるよ。」", "why": "感情の嵐の最中に言葉を重ねるとさらにパニックになります。まずは穏やかな存在で安心させ、話し合いは落ち着いてから。"}, {"id": "script_9", "moment": "つい怒鳴ってしまい、後悔しているとき", "instead": "何事もなかったふりをする、または「言うことを聞かないから怒鳴ったのよ」と言う。", "tryText": "「さっきのことを考えていたんだ。怒鳴ってごめんね。あなたのせいじゃないよ、落ち着く練習は私の課題なの。大好きだよ。」", "why": "子どものせいにせず親が自分の責任を引き受けることで、子どもの自己肯定感が守られ、謝り方の手本にもなります。"}], "principles": [{"title": "子ども自身と行動を切り離す", "body": "困った行動は神経系がいっぱいになっているサインであり、悪い子だからではありません。安全を守りつつ、背景にある気持ちに目を向けます。"}, {"title": "境界線を守りながら気持ちを認める", "body": "ルールをぶれずに保ちつつ、残念がる気持ちも受け止めます：「もっと見たいよね。でも今日のテレビはおしまいだよ。」"}, {"title": "穏やかでぶれないリーダーでいる", "body": "親の役割は不満をゼロにすることではなく、子どもが悔しさを乗り越える隣で落ち着いた土台でい続けることです。"}, {"title": "自信は「自己信頼」から育つ", "body": "揺るぎない自信は「すごいね」という評価ではなく、自分で考え試行錯誤を乗り越えた実感から育ちます。"}, {"title": "完璧さより「関係の修復」", "body": "親も感情的になることがあります。落ち着いてから子どものせいにせず謝り、つながり直す姿勢が安心感と責任感を育てます。"}]}
  },
  ko: {
    langCode: 'ko',
    langName: '한국어',
    darkModeBtnOff: '🌙 다크 모드',
    darkModeBtnOn: '☀️ 라이트 모드',
    darkModeToggleTitle: '다크 / 라이트 모드 전환',
    languageSwitcherLabel: '언어 전환',
    languageSelectLabel: '언어 선택',
    languagePillsLabel: '빠른 언어 버튼',
    infographicEnterBtn: '📸 2분 인포그래픽 보기',
    infographicExitBtn: '📸 인포그래픽 보기 종료',
    expandAllScienceBtn: '🔬 모든 임상 과학 펼치기',
    hideClinicalDetailsBtn: '🔬 임상 과학 세부정보 접기',
    headerViewFullGuideBtn: '📖 전체 가이드 보기',
    headerFocusedTabsBtn: '🎯 집중 탭 보기',
    showAllSectionsBtn: '모든 섹션 한눈에 보기',
    returnFocusedTabsBtn: '집중 탭 보기로 돌아가기',
    activePrefix: '현재 탭:',
    prevPrefix: '이전:',
    nextPrefix: '다음:',
    formatPagerIndicator: (cur, total, label) => `탭 ${cur} / ${total} 보는 중 • ${label}`,
    backToOverviewBtn: '\u2190 일일 플랜 및 개요로 돌아가기',
    jumpToChannelsBtn: '시청 · 저자극 채널 (28)로 이동 \u2192',
    fullHandbookModeLabel: '전체 핸드북 모드 • 8개 탭 모두 표시됨',
    globalAgeLabel: '👶 자녀 연령:',
    globalAges: {
      'all': '전체 연령',
      'under-2': '0–24개월',
      'toddler': '2–3세',
      'preschool': '4–5세',
      'early-elementary': '6–7세',
      'middle-elementary': '8–9세',
      'preteen': '10–12세'
    },
    sidebarBrandTitle: '시청 • 놀이 • 영양 • 청취',
    sidebarBrandSub: '위에서 자녀 연령을 선택하거나 아래의 전문 디렉토리로 바로 이동하세요.',
    sidebarGroups: ['1. 시작하기', '2. 일일 엄선 4대 디렉토리', '3. 자가 진단 도구 및 임상 과학', "4. 양육 대화 및 감정 코칭"],
    sidebarNav: {
      overview: { title: '일일 플랜 및 10대 원칙', caption: '냉장고 시트 & 4대 핵심 허브', pill: '시작' },
      channels: { title: '시청: 안전한 저자극 채널', caption: '저자극 영상 화이트리스트', pill: '28' },
      games: { title: '놀이: 교육자 추천 게임', caption: '광고 없는 논리 & STEM 놀이', pill: '33' },
      nutrition: { title: '영양: 자연식품 & 도시락', caption: '초가공 간식 대체 & NFI-10', pill: '32' },
      listen: { title: '청취 및 독서: 오디오북', caption: '팟캐스트, Yoto & 살아있는 책', pill: '26' },
      science: { title: '임상 과학 및 자가 판독기', caption: 'SEM-10, NFI-10 & 30편 논문', pill: '30편 인용' },
      lockdown: { title: '기기 및 DNS 차단 가이드', caption: '오픈소스 앱, OS & DNS 방어', pill: '13개 도구' },
      expert: { title: "대화: 자신감 대화 스크립트", caption: "감정 공동조절 표현 & 강연", pill: "9개 스크립트" },
      all: { title: '전체 가이드 보기 / 인쇄', caption: '모든 섹션을 한 페이지에 표시', pill: '전체' }
    },
    mobileBar: {
      overview: '플랜',
      channels: '시청',
      games: '놀이',
      nutrition: '영양',
      listen: '청취',
      lockdown: '차단',
      expert: "스크립트"
    },
    heroHeading: '과학적 근거 기반의 저자극 미디어, 창의 놀이, 자연식 두뇌 영양 및 오디오 부모 포털',
    heroSubtitle: '자녀의 연령을 선택해 맞춤형 일일 리듬을 확인하거나, 엄선된 119개의 저자극 프로그램, 구성주의 게임, NOVA-1 자연식 도시락 대체식, 스크린 없는 팟캐스트와 그림책을 살펴보세요.',
    heroStats: [
      '엄선된 저자극 채널',
      '교육자 승인 두뇌 게임',
      '자연식품 및 간식 대체안',
      '스크린 없는 오디오 & 도서',
      '듀얼 10점 임상 평가 루브릭',
      '인용된 임상 연구 및 법령'
    ],
    blueprintSyncBtn: '🔗 4대 디렉토리를 이 연령으로 동기화',
    blueprintCopyBtn: '📋 돌봄 일일 플랜 복사',
    blueprintReadBtn: "🔊 플랜 읽어주기",
    blueprintPrintBtn: '🖨️ 냉장고 요약 시트 인쇄',
    searchPlaceholders: {
      channel: '채널 검색 (예: Bluey, 자연, 수학, 파닉스)...',
      game: '게임 검색 (예: 체스, 코딩, DragonBox, 공간 퍼즐)...',
      food: '식품 및 대체안 검색 (예: 연어, 철분, 무색소, 도시락)...',
      listen: '오디오 및 도서 검색 (예: Yoto, 과학 팟캐스트, 파닉스, 그림책)...'
    },
    viewChannelBtn: '공식 채널 보기',
    visitGameBtn: '공식 게임 / 앱 방문',
    viewFoodRefBtn: '임상 및 영양 참고자료 보기',
    viewListenRefBtn: '오디오 듣기 / 도서 참고자료 보기',
    drawerShowLabel: '🔬 + 과학적 원리, 부모 가이드 및 인용 논문 보기',
    drawerHideLabel: '🔬 \u2212 임상 세부정보 및 부모 가이드 접기',
    formatChannelsCount: (n) => `${n}개 채널`,
    formatGamesCount: (n) => `${n}개 게임`,
    formatFoodsCount: (n) => `${n}개 자연식품 및 대체안`,
    formatListenCount: (n) => `${n}개 오디오 및 도서`,
    emptyChannelsTitle: '검색 조건에 일치하는 채널이 없습니다.',
    emptyChannelsSub: '연령 필터나 검색어를 변경해 보세요.',
    emptyGamesTitle: '검색 조건에 일치하는 교육용 게임이 없습니다.',
    emptyGamesSub: "'전체 게임'을 선택하거나 도메인 및 검색 필터를 초기화해 보세요.",
    emptyFoodsTitle: '검색 조건에 일치하는 자연식품이나 대체안이 없습니다.',
    emptyFoodsSub: '영양 도메인 필터나 검색어를 초기화해 보세요.',
    emptyListenTitle: '검색 조건에 일치하는 팟캐스트나 도서가 없습니다.',
    emptyListenSub: '포맷 필터나 검색어를 지우고 다시 시도해 보세요.',
    tabs: {
      overview: {
        kicker: '탭 1 / 8 • 시작하기',
        title: '개요, 연령별 일일 플랜 및 부모를 위한 10대 핵심 원칙',
        sub: '차분한 일일 연령별 리듬, 인쇄 가능한 4대 영역 냉장고 시트 및 핵심 가족 가이드라인.',
        shortLabel: '일일 플랜 및 개요'
      },
      science: {
        kicker: '탭 2 / 8 • 임상 근거 및 루브릭',
        title: '임상 과학, 듀얼 10점 판독기(SEM-10 & NFI-10) 및 30편의 학술 인용',
        sub: '동료 심사 뇌영상 연구, 발달심리학, 소아영양학 무작위 대조시험 및 60초 대화형 계산기.',
        shortLabel: '과학 및 루브릭 (30)'
      },
      channels: {
        kicker: '탭 3 / 8 • 영역 1 (시청)',
        title: '부모 승인 저자극 영상 채널 디렉토리 (28개 채널)',
        sub: 'SEM-10 기준으로 평가된 차분한 영상 채널 및 원클릭 JSON/CSV 화이트리스트 내보내기.',
        shortLabel: '시청 · 채널 (28)'
      },
      games: {
        kicker: '탭 4 / 8 • 영역 2 (놀이)',
        title: '교육자 승인 인지 발달 게임 및 앱 디렉토리 (33개 게임)',
        sub: '광고 제로, 확률형 아이템 제로의 구성주의 샌드박스, 공간 퍼즐 및 몬테소리 앱.',
        shortLabel: '놀이 · 게임 (33)'
      },
      nutrition: {
        kicker: '탭 5 / 8 • 영역 3 (영양)',
        title: '소아과 전문의 및 영양사 검증 자연식품 & 도시락 대체안 (32개 대체안)',
        sub: '초가공 어린이 간식, 파우치 음료, 합성 착색료를 대체하는 NOVA-1 자연식품 업그레이드.',
        shortLabel: '영양 · 식품 (32)'
      },
      listen: {
        kicker: '탭 6 / 8 • 영역 4 (청취 및 독서)',
        title: '청취 및 독서: 스크린 없는 오디오, 팟캐스트 & 살아있는 책 디렉토리 (26선)',
        sub: '엄선된 STEM 및 동화 팟캐스트, Yoto/Tonie 오디오 카드, 파닉스 리더스 및 대화형 그림책.',
        shortLabel: '청취 및 독서 (26)'
      },
      lockdown: {
        kicker: '탭 7 / 8 • 기술적 방어',
        title: '오픈소스 자녀 보호 도구 및 단계별 기기 / DNS 차단 가이드',
        sub: '13개의 오픈소스 자녀 보호 아키텍처와 BrainRotGuard, KidTube, 패밀리 링크, 사용법 유도, NextDNS 설정 가이드.',
        shortLabel: '기기 및 DNS 차단'
      },
      expert: {
        kicker: "탭 8 / 8 • 자신감 및 감정 공동조절",
        title: "자신감 & 감정 공동조절 스크립트: 힘든 순간 건네는 말",
        sub: "애착 및 자기신뢰 심리학 원칙 5가지, '이렇게 바꿔 말하기' 스크립트 9개, 7일 연습 플랜, 무료 심리학 강연 10선.",
        shortLabel: "대화 스크립트 (9)"
      },
      all: {
        kicker: '전체 핸드북 모드 • 8개 탭 모두 표시',
        title: 'SafeKids 부모 포털 전체 레퍼런스 (모든 섹션)',
        sub: '10대 권장사항, 30+ 임상 연구, 28개 채널, 33개 게임, 32개 식품 대체안, 26개 오디오/도서 및 5개 차단 가이드 표시.',
        shortLabel: '전체 가이드 (모든 섹션)'
      }
    },
    blueprintStages: {
      'under-2': {
        ageLabelShort: '2세 미만 (0–24개월)',
        directoryFilterAge: 'toddler',
        stageHeadline: '👶 2세 미만 (0–24개월) — 100% 스크린 제로 감각운동 & 철분/DHA 두뇌 기초',
        stageSummary: 'AAP (2016) & Kuhl (2003): 24개월 미만 영유아는 비디오 결핍 효과를 겪으므로 부모와의 실시간 3D 음성 상호작용, 바닥 탐색 놀이, 헴철·콜린·해양성 DHA가 풍부한 이유식이 필수적입니다.',
        screenBudget: '수동적 영상 0분/일 (AAP 지침에 따라 가족 실시간 영상통화만 허용)',
        sleepCutoff: '100% 스크린 없는 어두운 침실; 낮잠 포함 하루 총 12–16시간 수면',
        mealRule: '첨가당 제로 & 12개월 미만 꿀 금지; 부드러운 철분 + DHA 자연식 이유식'
      },
      'toddler': {
        ageLabelShort: '유아기 (2–3세)',
        directoryFilterAge: 'toddler',
        stageHeadline: '🧸 유아기 (2–3세) — 부모와 함께 보는 느린 템포 영상(SEM-10 ≤ 2/10) & 질식 예방 자연식',
        stageSummary: 'WHO (2019) & Lillard (2011): 총 화면 시간을 하루 30–45분 이내로 제한하고 거실 TV로 부모와 함께 시청하세요. 실패 패널티가 없는 디지털 토이박스와 세로로 4등분한 NOVA-1 자연식을 제공합니다.',
        screenBudget: '≤ 30–45분/일 (거실 공유 TV에서 100% 부모 동반 시청)',
        sleepCutoff: '낮잠 및 취침 60분 이상 전 화면 끄기 (멜라토닌 분비 보호)',
        mealRule: '100% 스크린 없는 식탁; 포도/방울토마토 세로 4등분; 견과류 버터는 얇게 펴 바르기'
      },
      'preschool': {
        ageLabelShort: '학령전기 (4–5세)',
        directoryFilterAge: 'preschool',
        stageHeadline: '🎨 학령전기 (4–5세) — 전두엽 실행 기능, 파닉스 & 감각 식습관 브릿지',
        stageSummary: 'Diamond (2013) & Hirsh-Pasek (2015): 자극이 적은 이야기와 촉각 앱으로 억제 조절력, 파닉스, 공간 수 감각을 키우고 압박감 없는 가족 식사를 실천합니다.',
        screenBudget: '≤ 45–60분/일 엄선된 저자극 TV 또는 가이드형 교육 앱',
        sleepCutoff: '취침 60분 이상 전 모든 화면 끄기 (종이책 낭독으로 수면 유도)',
        mealRule: '100% 스크린 없는 식사; 합성 착색료 제로 (미국 표기 Red 40 / Yellow 5 = 한국 적색 40호 · 황색 4호); 파우치 퓨레 대신 통과일 제공'
      },
      'early-elementary': {
        ageLabelShort: '초등 저학년 (6–7세)',
        directoryFilterAge: 'early-elementary',
        stageHeadline: '🚀 초등 저학년 (6–7세) — 체험형 STEM 탐구, 공간 논리 퍼즐 & 안정적인 학교 혈당',
        stageSummary: 'Papert (1980) & Benton (2007): 수동적 시청에서 손으로 그리기, 자연 탐구, 단계별 공간 논리 퍼즐로 전환하세요. 혈당부하지수(GL)가 낮은 아침 식사와 도시락으로 오전 수업 집중력을 지켜줍니다.',
        screenBudget: '≤ 60분/일 평일 여가 화면 상한선 (거실 공용 공간만 허용)',
        sleepCutoff: '취침 60분 이상 전 기기 종료; 침실 내 스크린 반입 금지',
        mealRule: '저혈당부하(Low-GL) 아침 식사 + 도시락(귀리/달걀/씨앗류)으로 오전 4시간 집중력 유지'
      },
      'middle-elementary': {
        ageLabelShort: '초등 중학년 (8–9세)',
        directoryFilterAge: 'middle-elementary',
        stageHeadline: '🧩 초등 중학년 (8–9세) — 구성주의 코딩, 연역적 수학 & 신경 보조인자 영양',
        stageSummary: 'Resnick (2017) & Asbell-Clarke (2012): 자라나는 자율성을 스크래치 블록 코딩, 불리언 논리 퍼즐, 공학 샌드박스(5분 시각 타이머 활용)로 연결하고 철분·아연·DHA 식품을 보충합니다.',
        screenBudget: '≤ 60–75분/일 (창의적 코딩 및 협동 퍼즐 우선)',
        sleepCutoff: '소등 60분 이상 전 모든 기기를 주방 충전소에 거치 (Chang et al., 2015)',
        mealRule: '스크린 없는 가족 저녁 식사; 주 2–3회 헴철/렌틸콩 + 비타민 C & 등푸른생선 DHA'
      },
      'preteen': {
        ageLabelShort: '프리틴 (10–12세)',
        directoryFilterAge: 'preteen',
        stageHeadline: '🔭 프리틴 (10–12세) — 심층 시스템 사고, 최대 골밀도 형성 영양 & 알고리즘 피드 차단',
        stageSummary: 'Nisan & Schocken (2005) & Weaver (2016): 알고리즘 숏폼 피드(Shorts/TikTok)와 확률형 아이템 게임을 궤도 물리, CPU 아키텍처, 전략 시뮬레이션으로 대체하고 칼슘/D3/K2 및 폴리페놀 두뇌 식품을 공급합니다.',
        screenBudget: '≤ 60–90분/일 여가 상한선 (무한 스크롤 피드 및 채팅 금지)',
        sleepCutoff: '취침 60분 전 엄격한 통금; 충전기는 밤새 침실 밖에 보관',
        mealRule: '최대 골량 형성을 위한 D3 + K2 + 칼슘 + 프리바이오틱 식이섬유; 카페인·에너지 음료 금지'
      }
    },
    expertTab: {"chirpListenBtn": "🔊 음성 듣기", "chirpStopBtn": "⏹ 정지", "chirpReadPlanBtn": "🔊 플랜 읽어주기", "chirpVoiceLabel": "🎙️ Chirp 3 HD 음성:", "entryKicker": "신규 • 자신감 및 감정 공동조절", "entryTitle": "자신감 있는 아이로 키우는 일상 대화법", "entrySub": "힘든 육아 순간 바로 쓰는 차분한 문장 9개 — Chirp 3 HD 음성 읽기 및 무료 임상심리 강연 10편 수록.", "entryCta": "열기 →", "heading": "자신감 있는 아이로 키우는 부모의 말하기", "badge": "검증된 영상 10개", "lede": "육아에서 힘든 순간은 자연스럽습니다. 오늘 바로 써볼 수 있는 짧고 단단한 문장들을 모았습니다.", "about": "애착 이론, 감정 코칭 연구(Gottman), 자기결정이론(Deci & Ryan)에 기반하며, 임상심리학자 베키 케네디 박사의 무료 공개 강연(TED, YouTube, 팟캐스트)을 참고 영상으로 연결합니다.", "disclaimer": "본 페이지는 교육용 자료이며 심리치료나 의학적·임상적 자문이 아닙니다. SafeKids는 독립 비영리 가이드로 베키 케네디 박사, Good Inside®, TED 또는 링크된 강연자와 제휴·후원·보증 관계가 없습니다. Good Inside®는 Good Inside, Inc.의 등록상표이며 외부 공개 영상 출처 표기를 위해서만 언급됩니다. 아래 문장은 발달심리학 개념을 바탕으로 SafeKids가 직접 작성한 의역 예시이며 원문 인용이 아닙니다(링크 확인일: 2026-11-07).", "pickerTitle": "지금 어떤 상황인가요?", "pickerSub": "상황을 눌러 표현을 확인하거나 ‘음성 듣기’를 눌러 Google Cloud Chirp 3 HD 목소리로 들어보세요.", "topics": {"confidence": "자신감 키우기 (4)", "frustration": "한계 지켜주기 (2)", "big-feelings": "격한 감정 다루기 (2)", "repair": "화낸 뒤 관계 회복 (1)", "all": "전체 보기 (9)"}, "statusAll": "전체 {n}개 스크립트를 표시 중입니다.", "statusFiltered": "{total}개 중 {shown}개 스크립트를 표시 중입니다.", "insteadLabel": "이런 말 대신", "tryLabel": "이렇게 말해보세요", "copyBtn": "문구 복사", "copiedBtn": "복사됨 ✓", "whySummary": "효과적인 이유", "principlesTitle": "스크립트에 담긴 5가지 핵심 원칙", "practiceTitle": "일주일 실천: 하루에 작은 말 바꾸기 하나", "practiceSub": "한꺼번에 완벽해지기보다 작은 말 습관을 꾸준히 바꾸는 편이 훨씬 오래갑니다.", "videosTitle": "추천 시청: 무료 심리학 공개 강연 10선", "videosSub": "클릭하기 전에는 어떠한 유튜브 추적기도 로드되지 않으며 새 탭에서 열립니다.", "channelsTitle": "외부 강연자 및 공식 공개 채널 링크", "channelsSub": "위 강연들이 게시된 공식 외부 채널 링크입니다. 일부 플랫폼은 로그인이 필요할 수 있습니다.", "scripts": [{"id": "script_1", "moment": "아이가 그림이나 만든 작품을 보여줄 때", "instead": "“잘했네! 정말 멋진 화가구나!”", "tryText": "“이 그림 이야기 좀 해줄래? 어디부터 그릴지 어떻게 정했어?”", "why": "호기심 어린 질문은 아이가 외부 칭찬 대신 자기 생각과 과정을 돌아보며 내면의 자신감을 쌓게 도와줍니다."}, {"id": "script_2", "moment": "“쟤는 나보다 이걸 훨씬 잘해.”", "instead": "“무슨 소리야, 네가 제일 잘해!”", "tryText": "“내가 좋아하는 걸 다른 친구가 더 잘하면 마음이 쓰리지. 엄마도 그런 적 있어. 그래도 너는 여전히 너고, 지금 그대로 괜찮아.”", "why": "속상한 마음을 부정하면 자기 감정을 불신하게 됩니다. 부러움을 인정해주어야 흔들려도 괜찮다는 자기신뢰가 자랍니다."}, {"id": "script_3", "moment": "숙제나 퍼즐이 막혀서 포기하려 할 때", "instead": "“이리 줘 봐, 내가 해줄게.”", "tryText": "“이게 정말 어렵구나. 내가 바로 옆에 있어. 다음에 해볼 수 있는 아주 작은 시도 하나는 뭘까?”", "why": "대신 해결해주면 자신감을 키우는 과정을 빼앗게 됩니다. 곁을 지키며 스스로 넘어보게 할 때 진짜 회복탄력성이 생깁니다."}, {"id": "script_4", "moment": "시험이나 발표를 앞두고 긴장할 때", "instead": "“걱정 마, 무조건 잘할 거야!”", "tryText": "“떨리는 게 당연하지, 너한테 중요한 일이잖아. 떨리는 마음과 준비된 상태는 동시에 진짜일 수 있어.”", "why": "무조건 괜찮다고만 하면 긴장감이 문제처럼 느껴집니다. 두 감정을 함께 인정해 주면 긴장되면서도 해낼 수 있음을 배우게 됩니다."}, {"id": "script_5", "moment": "화면 시청 시간이 끝나자 울고불고할 때", "instead": "“울지 마, 고작 만화잖아!”", "tryText": "“계속 보고 싶었구나. 멈추기가 정말 힘들지. 그래도 오늘 화면 시간은 끝났어. 속상해도 괜찮아, 내가 옆에 있을게.”", "why": "규칙은 단단히 지키되 감정은 허용합니다. 차분한 어른 곁에서 실망을 견뎌보는 경험이 좌절 내성을 키웁니다."}, {"id": "script_6", "moment": "‘안 돼’라고 한 뒤에도 계속 조르고 칭얼거릴 때", "instead": "“알았어, 딱 한 번만 더야. 대신 칭얼거리지 마.”", "tryText": "“대답은 여전히 안 돼야. 화가 나도 괜찮아. 네 큰 감정을 내가 다 받아줄 수 있어.”", "why": "따뜻하지만 흔들리지 않는 거절은 경계가 안전하며 아이의 감정이 부모를 무너뜨리지 않는다는 믿음을 줍니다."}, {"id": "script_7", "moment": "아이가 동생이나 형제를 때렸을 때", "instead": "“때리면 안 되지! 당장 방으로 들어가!”", "tryText": "“때리는 건 허락할 수 없어. 모두가 안전하도록 자리를 옮길게. 너는 좋은 아이인데 지금 무척 힘든 순간을 겪고 있구나.”", "why": "위협 대신 차분한 행동으로 제지하고 ‘좋은 아이’라는 정체성을 지켜주면 진정한 화해로 이어지기 쉽습니다."}, {"id": "script_8", "moment": "예민하고 감정 폭이 큰 아이가 사소한 일로 폭발할 때", "instead": "“별일 아닌데 너무 오바하잖아.”", "tryText": "“방금 그 일이 정말 크게 느껴졌구나. 내가 여기 있어.”", "why": "감정 폭풍 한가운데서 긴 설명은 오히려 자극이 됩니다. 먼저 차분한 존재감으로 진정시킨 뒤 대화를 나누세요."}, {"id": "script_9", "moment": "아이에게 소리 지르고 후회될 때", "instead": "아무 일 없던 척하거나 “네가 말을 안 들어서 소리 지른 거야”라고 말하기.", "tryText": "“아까 일을 계속 생각해 봤어. 소리 질러서 미안해. 네 잘못이 아니야. 화를 다스리는 건 내가 연습해야 할 몫이야. 사랑해.”", "why": "아이 탓을 하지 않고 어른의 책임을 인정할 때 아이의 자존감이 지켜지고 사과하는 법도 배우게 됩니다."}], "principles": [{"title": "아이 존재와 문제 행동을 분리하기", "body": "힘든 행동은 신경계가 버겁다는 신호이지 나쁜 아이라는 뜻이 아닙니다. 안전을 지키며 행동 이면의 마음을 살펴보세요."}, {"title": "한계는 지키고 감정은 수용하기", "body": "단호한 규칙을 유지하면서도 속상한 마음을 인정할 수 있습니다: \"더 보고 싶구나. 그래도 오늘 화면 시간은 끝났어.\""}, {"title": "차분하고 단단한 리더십", "body": "부모의 역할은 모든 불만을 없애 주는 것이 아니라, 아이가 좌절을 통과하는 동안 흔들리지 않는 안전기지가 되어 주는 것입니다."}, {"title": "자신감은 자기 신뢰에서 자란다", "body": "단단한 자신감은 습관적인 칭찬이 아니라 스스로 궁리하고 적절한 어려움을 이겨낸 경험에서 자랍니다."}, {"title": "완벽함보다 관계 회복(Repair)", "body": "모든 부모가 때로 화를 냅니다. 아이 탓을 하지 않고 부모의 실수를 인정하며 다시 연결될 때 안정 애착이 깊어집니다."}]}
  },
  yue: {
    langCode: "yue",
    langName: "粵語",
    darkModeBtnOff: "🌙 深色模式",
    darkModeBtnOn: "☀️ 淺色模式",
    darkModeToggleTitle: "切換深色 / 淺色模式",
    languageSwitcherLabel: "語言切換",
    languageSelectLabel: "選擇語言",
    languagePillsLabel: "快捷語言按鈕",
    infographicEnterBtn: "📸 2分鐘資訊圖速覽",
    infographicExitBtn: "📸 退出2分鐘資訊圖速覽",
    expandAllScienceBtn: "🔬 展開全部臨床依據",
    hideClinicalDetailsBtn: "🔬 收起臨床細節",
    headerViewFullGuideBtn: "📖 檢視完整指南",
    headerFocusedTabsBtn: "🎯 分欄聚焦檢視",
    showAllSectionsBtn: "展開全部章節",
    returnFocusedTabsBtn: "返回分欄檢視",
    activePrefix: "目前：",
    prevPrefix: "上一欄：",
    nextPrefix: "下一欄：",
    formatPagerIndicator: (cur, total, label) => `正在瀏覽第 ${cur} / ${total} 頁 • ${label}`,
    backToOverviewBtn: "← 返回每日計劃與總覽",
    jumpToChannelsBtn: "前往觀看 · 安全頻道 (28) →",
    fullHandbookModeLabel: "完整手冊模式 • 全部 8 個分欄已展開",
    globalAgeLabel: "👶 孩子年齡：",
    globalAges: {"all": "全部年齡", "under-2": "0–24個月", "toddler": "2–3歲", "preschool": "4–5歲", "early-elementary": "6–7歲", "middle-elementary": "8–9歲", "preteen": "10–12歲"},
    sidebarBrandTitle: "觀看 • 益智 • 營養 • 傾聽",
    sidebarBrandSub: "喺上方揀選年齡，或直接跳去下方專題目錄。",
    sidebarGroups: ["1. 由呢度開始", "2. 每日嚴選四大目錄", "3. 自測工具與臨床科學", "4. 親子溝通與情緒共調"],
    sidebarNav: {"overview": {"title": "每日計劃與10大守則", "caption": "雪櫃貼與四大支柱總覽", "pill": "起點"}, "channels": {"title": "觀看：低刺激頻道", "caption": "零演算法影片白名單", "pill": "28"}, "games": {"title": "益智：教育者遊戲", "caption": "無廣告空間與邏輯遊戲", "pill": "33"}, "nutrition": {"title": "營養：天然全食物", "caption": "便當盒替換與 NFI-10", "pill": "32"}, "listen": {"title": "傾聽與閱讀：無屏音頻", "caption": "科普播客、音頻卡與繪本", "pill": "26"}, "science": {"title": "科學與自測量表", "caption": "SEM-10、NFI-10 與 30 項研究", "pill": "30 文獻"}, "lockdown": {"title": "裝置與網絡防護", "caption": "開源應用、系統與 DNS 鎖定", "pill": "13 工具"}, "expert": {"title": "溝通：自信教養話術", "caption": "情緒共調換句話講", "pill": "9 條話術"}, "all": {"title": "檢視完整手冊 / 列印", "caption": "單頁展開所有章節", "pill": "全部"}},
    mobileBar: {"overview": "總覽", "channels": "觀看", "games": "益智", "nutrition": "營養", "listen": "傾聽", "lockdown": "防護", "expert": "話術"},
    heroHeading: "溫和、實證支持嘅兒童影視、益智遊戲、天然營養與無屏音頻家長中心",
    heroSubtitle: "揀選孩子年齡即可獲得每日作息方案，或瀏覽 119 項精選低刺激節目、建構主義益智遊戲、天然全食物便當替換，以及無屏播客同經典繪本。",
    heroStats: ["精選低刺激頻道", "教育者認可遊戲", "全食物替換與主食", "無屏播客與經典繪本", "雙 10 分制評估量表", "臨床研究與法規引用"],
    blueprintSyncBtn: "🔗 將四大目錄同步至呢個年齡",
    blueprintReadBtn: "🔊 朗讀每日計劃",
    blueprintCopyBtn: "📋 複製照護者每日計劃",
    blueprintPrintBtn: "🖨️ 列印雪櫃速查貼",
    searchPlaceholders: {"channel": "搜尋核准頻道（例如：自然、數學、自然拼讀、科學）...", "game": "搜尋益智遊戲（例如：國際象棋、編程、空間幾何、蒙特梭利）...", "food": "搜尋 32 款天然食物與替換方案（例如：DHA、鐵、膽鹼、無人工色素）...", "listen": "搜尋音頻與繪本（例如：Yoto、科普播客、自然拼讀、青蛙與蟾蜍）..."},
    viewChannelBtn: "前往官方頻道",
    visitGameBtn: "造訪官方遊戲 / 應用",
    viewFoodRefBtn: "檢視臨床與營養參考",
    viewListenRefBtn: "收聽 / 檢視圖書參考",
    drawerShowLabel: "🔬 + 點解有效、家長指南與文獻引用",
    drawerHideLabel: "🔬 − 收起臨床細節與家長指南",
    formatChannelsCount: (n) => (n === 1 ? "1 個頻道" : `${n} 個頻道`),
    formatGamesCount: (n) => (n === 1 ? "1 款遊戲" : `${n} 款遊戲`),
    formatFoodsCount: (n) => (n === 1 ? "1 項全食物或替換方案" : `${n} 項全食物與替換方案`),
    formatListenCount: (n) => (n === 1 ? "1 項音頻或圖書精選" : `${n} 項音頻與圖書精選`),
    emptyChannelsTitle: "冇搵到符合條件嘅頻道。",
    emptyChannelsSub: "請試下切換年齡篩選或清除搜尋關鍵字。",
    emptyGamesTitle: "冇搵到符合條件嘅益智遊戲。",
    emptyGamesSub: "請試下揀選「全部遊戲」或清除領域、退出摩擦與搜尋篩選。",
    emptyFoodsTitle: "冇搵到符合條件嘅全食物或替換方案。",
    emptyFoodsSub: "請試下揀選全部食物或清除營養領域篩選。",
    emptyListenTitle: "冇搵到符合條件嘅播客、有聲書或繪本。",
    emptyListenSub: "請試下揀選全部音頻與圖書或清除搜尋詞。",
    tabs: {"overview": {"kicker": "第 1 / 8 頁 • 由呢度開始", "title": "總覽、分齡每日作息計劃與 10 大核心家庭守則", "sub": "溫和每日節奏、可列印四大支柱雪櫃速查貼與家長核心行動框架。", "shortLabel": "每日計劃與總覽"}, "science": {"kicker": "第 2 / 8 頁 • 臨床證據與量表", "title": "臨床神經科學、雙 10 分自測器（SEM-10 與 NFI-10）及 30 項文獻", "sub": "同儕審查腦成像、發展心理學、兒科營養隨機對照試驗與 60 秒自測工具。", "shortLabel": "科學與量表 (30)"}, "channels": {"kicker": "第 3 / 8 頁 • 第一支柱（觀看）", "title": "家長認可低刺激影視頻道目錄（28 個頻道）", "sub": "按 SEM-10 量表評分嘅慢節奏頻道，支援一鍵匯出 JSON/CSV 白名單。", "shortLabel": "觀看 · 頻道 (28)"}, "games": {"kicker": "第 4 / 8 頁 • 第二支柱（益智）", "title": "教育者認可認知與建構主義遊戲目錄（33 款遊戲）", "sub": "零廣告、零抽獎箱嘅空間幾何、邏輯編程與蒙特梭利互動應用。", "shortLabel": "益智 · 遊戲 (33)"}, "nutrition": {"kicker": "第 5 / 8 頁 • 第三支柱（營養）", "title": "兒科醫生與營養師審核全食物及便當替換目錄（32 項方案）", "sub": "用天然 NOVA-1 全食物取代超加工零食、果泥吸吸袋與人工合成色素。", "shortLabel": "營養 · 全食物 (32)"}, "listen": {"kicker": "第 6 / 8 頁 • 第四支柱（傾聽與閱讀）", "title": "傾聽與閱讀：無屏音頻、科普播客與經典繪本目錄（26 項精選）", "sub": "精選科學故事播客、Yoto/Tonie 實體音頻卡、自然拼讀讀本與對話式共讀繪本。", "shortLabel": "傾聽與閱讀 (26)"}, "lockdown": {"kicker": "第 7 / 8 頁 • 技術防護體系", "title": "開源家長控制工具對比與分步裝置 / DNS 鎖定指南", "sub": "13 款開源工具架構對比，以及 BrainRotGuard、KidTube、Family Link、引導使用模式與 NextDNS 設定步驟。", "shortLabel": "裝置與 DNS 防護"}, "expert": {"kicker": "第 8 / 8 頁 • 自信培養與情緒共調", "title": "自信與情緒共調話術：棘手時刻點樣同小朋友講", "sub": "5 項依附與自我信任心理學原則、9 條「換個講法」話術、7 日微習慣計劃同 10 條免費心理學公開影片。", "shortLabel": "自信話術 (9)"}, "all": {"kicker": "完整手冊模式 • 全部 8 個分欄可見", "title": "SafeKids 家長門戶完整參考手冊（全部章節）", "sub": "單頁展示 10 大建議、30+ 臨床研究、28 個頻道、33 款遊戲、32 項全食物方案、26 項無屏音頻圖書與 5 套防護指南。", "shortLabel": "完整手冊（全部章節）"}},
    blueprintStages: {"under-2": {"ageLabelShort": "2歲以下（0–24個月）", "directoryFilterAge": "toddler", "stageHeadline": "👶 2歲以下（0–24個月）— 100% 零螢幕感官動作與鐵 / DHA 黃金期", "stageSummary": "AAP (2016) 與 Kuhl (2003)：24個月以下嬰幼兒存在「影片學習赤字」，需要真人面對面語言互動、地板探索，以及富含血紅素鐵與 DHA 嘅天然輔食。", "screenBudget": "0 分鐘/日被動影片（按 AAP 僅限親友即時視像通話）", "sleepCutoff": "100% 無屏暗光嬰兒房；每日總睡眠/小睡 12–16 小時", "mealRule": "零添加糖、零蜜糖（<12個月）；軟爛天然高鐵 + DHA 全食物"}, "toddler": {"ageLabelShort": "幼兒期（2–3歲）", "directoryFilterAge": "toddler", "stageHeadline": "🧸 幼兒期（2–3歲）— 家長陪睇慢節奏（SEM-10 ≤ 2/10）與防鯁塞天然飲食", "stageSummary": "WHO (2019) 與 Lillard (2011)：每日螢幕總時長控制喺 30–45 分鐘內，並喺客廳電視全程陪睇；配搭無失敗懲罰嘅開放式玩具箱與切開四瓣嘅 NOVA-1 全食物。", "screenBudget": "≤ 30–45 分鐘/日（100% 家長喺共享電視陪睇）", "sleepCutoff": "午睡及睡前 60+ 分鐘關閉所有螢幕（保護褪黑激素）", "mealRule": "100% 無屏餐桌；提子/車厘茄縱向切成四瓣；堅果醬薄塗防鯁塞"}, "preschool": {"ageLabelShort": "學齡前（4–5歲）", "directoryFilterAge": "preschool", "stageHeadline": "🎨 學齡前（4–5歲）— 前額葉執行功能、自然拼讀與感官食物橋樑", "stageSummary": "Diamond (2013) 與 Hirsh-Pasek (2015)：透過低喚醒度故事與觸覺拼讀應用培養抑制控制與數感，並實踐零壓力家庭共餐。", "screenBudget": "≤ 45–60 分鐘/日精選低刺激電視或引導式應用", "sleepCutoff": "睡前 60+ 分鐘關閉所有螢幕（改為繪本共讀與有聲故事）", "mealRule": "100% 無屏用餐；零人工合成色素（誘惑紅 Red 40 / E129、檸檬黃 Yellow 5 / E102）；完整生果取代吸吸袋果泥"}, "early-elementary": {"ageLabelShort": "小學低年級（6–7歲）", "directoryFilterAge": "early-elementary", "stageHeadline": "🚀 小學低年級（6–7歲）— 動手 STEM 探究、空間邏輯與平穩課堂血糖", "stageSummary": "Papert (1980) 與 Benton (2007)：由被動觀看轉向動手繪畫、自然探究與關卡制空間謎題；準備低升糖負荷早餐與便當，預防上午 10:30 注意力下滑。", "screenBudget": "上學日娛樂螢幕 ≤ 60 分鐘/日（僅限客廳公共區域）", "sleepCutoff": "睡前 60+ 分鐘硬體斷網；睡房嚴禁擺放螢幕", "mealRule": "低升糖負荷早餐 + 便當（燕麥/雞蛋/堅果籽仁），維持 4 小時課堂專注"}, "middle-elementary": {"ageLabelShort": "小學中年級（8–9歲）", "directoryFilterAge": "middle-elementary", "stageHeadline": "🧩 小學中年級（8–9歲）— 建構主義編程、演繹數學與神經輔因子營養", "stageSummary": "Resnick (2017) 與 Asbell-Clarke (2012)：將自主性引導至 Scratch 積木編程、布爾邏輯與工程沙盒（配 5 分鐘視覺倒數計時），補充鐵、鋅與海洋 DHA。", "screenBudget": "≤ 60–75 分鐘/日（優先創意編程與雙人合作解謎）", "sleepCutoff": "熄燈前 60+ 分鐘所有裝置統一放廚房充電（Chang et al., 2015）", "mealRule": "無屏家庭晚餐；血紅素鐵/扁豆鐵 + 維他命 C 及每週 2–3 次深海魚 DHA"}, "preteen": {"ageLabelShort": "青春前期（10–12歲）", "directoryFilterAge": "preteen", "stageHeadline": "🔭 青春前期（10–12歲）— 深度系統思維、骨量峰值儲備與零演算法短片", "stageSummary": "Nisan & Schocken (2005) 與 Weaver (2016)：用軌道物理、CPU 架構與深度策略取代短片瀑布流同抽獎箱遊戲，把握骨礦化峰值補充鈣 / D3 / K2 與多酚。", "screenBudget": "娛樂螢幕 ≤ 60–90 分鐘/日（零無限捲動短片流、零聊天功能）", "sleepCutoff": "睡前 60 分鐘嚴格宵禁；充電器過夜留喺睡房外", "mealRule": "骨量峰值 D3 + K2 + 鈣 + 益生元膳食纖維；零咖啡因與能量飲品"}},
    expertTab: {"chirpListenBtn": "🔊 粵語朗讀", "chirpStopBtn": "⏹ 停止", "chirpReadPlanBtn": "🔊 朗讀每日計劃", "chirpVoiceLabel": "🎙️ Chirp 3 HD 聲線：", "entryKicker": "新增 • 自信培養與情緒共調", "entryTitle": "培養自信小朋友嘅日常回應話術", "entrySub": "9 句應對日常棘手時刻嘅平和說話，支援 Chirp 3 HD 粵語朗讀同 10 條免費臨床心理學公開影片。", "entryCta": "打開 →", "heading": "點樣同小朋友講先可以培養自信", "badge": "10 條已核實影片", "lede": "湊仔女遇到崩潰時刻好正常。呢度有幾句簡短、平和嘅說話，今日就可以即刻用。", "about": "植根於依附理論、情緒輔導研究（Gottman）同自我決定論心理學（Deci & Ryan），並附上臨床心理學家 Becky Kennedy 博士喺 TED、YouTube 同 Podcast 嘅免費公開講座連結供家長參考。", "disclaimer": "本頁僅供家庭教育參考，唔構成心理治療、醫療或臨床建議。SafeKids 係獨立非牟利指南，與 Becky Kennedy 博士、Good Inside®、TED 或任何講者均無隸屬、贊助或背書關係。Good Inside® 係 Good Inside, Inc. 嘅註冊商標，僅作指稱性引用以標示外部公開影片來源。以下話術係 SafeKids 根據發展心理學獨立撰寫嘅意譯改寫，並非逐字引用（連結核實於 2026-11-07）。", "pickerTitle": "而家發生緊咩事？", "pickerSub": "撳一下情境睇建議講法，或者撳「粵語朗讀」用 Google Cloud Chirp 3 HD 聽下示範語氣。", "topics": {"confidence": "建立內在自信 (4)", "frustration": "溫和守住界線 (2)", "big-feelings": "處理強烈情緒 (2)", "repair": "發脾氣後修補 (1)", "all": "顯示全部 (9)"}, "statusAll": "顯示緊全部 {n} 條話術。", "statusFiltered": "顯示緊 {shown} / {total} 條話術。", "insteadLabel": "唔好急住講", "tryLabel": "試下咁樣講", "copyBtn": "複製呢句", "copiedBtn": "已複製 ✓", "whySummary": "點解有效", "principlesTitle": "話術背後嘅 5 大核心理念", "practiceTitle": "試足一星期：每日一個小改變", "practiceSub": "SafeKids 整理嘅練習計劃。細微而持續嘅改變，好過一次過推倒重來。", "videosTitle": "延伸觀看：10 條免費心理學公開影片", "videosSub": "連結會喺新分頁打開 YouTube，未撳之前唔會載入任何追蹤器。", "channelsTitle": "外部講者與公開講座連結", "channelsSub": "以下係上述公開講座所屬嘅官方外部頻道；部分第三方平台可能需要登入。", "scripts": [{"id": "script_1", "moment": "小朋友攞幅畫或者勞作畀你睇", "instead": "「好叻呀！你真係個小畫家！」", "tryText": "「同我講下幅畫啦，你點樣決定由邊度開始畫先㗎？」", "why": "好奇嘅提問令小朋友將注意力放返自己身上，令自信建立喺自己嘅思考，而唔係單靠大人讚賞。"}, {"id": "script_2", "moment": "「佢玩呢樣嘢叻過我好多呀。」", "instead": "「傻啦，你先係最叻嗰個！」", "tryText": "「見到人哋喺自己重視嘅事上面叻過自己，個心真係會唔舒服。我都試過咁樣覺得。不過你依然係你，你已經好好。」", "why": "否定感受會令小朋友懷疑自己嘅內心體驗；講出嗰份失落，先至教到佢就算羨慕人哋都可以接納自己。"}, {"id": "script_3", "moment": "做功課或者砌拼圖卡住咗，想放棄", "instead": "「畀我啦，等我幫你整埋佢。」", "tryText": "「呢度真係好難喎。我喺度陪住你。有冇邊一小步你可以而家試下先？」", "why": "即刻出手幫忙會拎走練習抗逆力嘅機會；留喺身邊陪佢試，先可以幫佢儲起靠自己過關嘅信心。"}, {"id": "script_4", "moment": "大仔大女喺比賽或者測驗前好緊張", "instead": "「唔使驚，你一定得嘅！」", "tryText": "「你會緊張好正常呀，因為呢件事對你好重要。又緊張、又準備好，兩樣嘢可以同時係真嘅。」", "why": "單純安慰有時會令緊張變成問題。容許兩種感受並存可以話畀孩子知：緊張好正常，唔代表做唔到。"}, {"id": "script_5", "moment": "夠鐘熄電視，小朋友即刻大喊", "instead": "「唔好喊啦，只不過係套卡通片啫！」", "tryText": "「你好想繼續睇落去，要停低真係好唔捨得。不過今日睇螢幕嘅時間完咗喇。你可以嬲我，我會喺度陪住你。」", "why": "界線企硬，同時容許佢唔開心。小朋友係喺冷靜嘅大人身邊學會承受失望嘅。"}, {"id": "script_6", "moment": "你講咗「唔得」之後，小朋友不斷扭計乞求", "instead": "「好啦好啦，最後一次咋，唔好再扭計喇。」", "tryText": "「答案依然係唔得。你為咗呢件事嬲係無問題嘅，我接得住你嘅大情緒。」", "why": "溫和而堅定嘅「唔得」話畀小朋友知：界線係安全嘅，佢嘅情緒亦唔會令爸爸媽媽失控。"}, {"id": "script_7", "moment": "小朋友出手打細佬妹", "instead": "「唔准打人！返入房反省！」", "tryText": "「我唔會畀你打人。我而家帶開你先，確保大家都安全。你係個好孩子，只係而家好辛苦。」", "why": "用行動冷靜制止，同時保住「你係好孩子」嘅訊息，等大家冷靜落嚟先容易傾點樣修補。"}, {"id": "script_8", "moment": "高敏感、情緒強烈嘅小朋友因為小事突然爆發", "instead": "「你使唔使咁誇張呀。」", "tryText": "「頭先嗰下令你覺得好大件事呀呵。我喺度陪住你。」", "why": "情緒風暴期間講太多道理只會令神經系統更加超載。先用簡短陪伴穩住安全感，遲啲再慢慢傾。"}, {"id": "script_9", "moment": "你忍唔住鬧咗小朋友，事後好後悔", "instead": "扮無事發生，或者講「都係因為你唔聽話我先大聲鬧你」。", "tryText": "「我頭先一直諗緊之前件事。對唔住，我唔應該向你大聲呼喝。呢個唔係你嘅錯，控制情緒係我自己要練習嘅事。我好愛你。」", "why": "大人誠實承擔自己嗰份責任、唔賴落小朋友度，可以保護佢嘅自我價值，仲示範咗點樣修補關係。"}], "principles": [{"title": "將小朋友同當下行為分開", "body": "棘手行為係神經系統超負荷嘅訊號，唔代表係壞細路。喺確保安全嘅同時，以溫和同好奇心理解背後原因。"}, {"title": "堅守界線，同時接納情緒", "body": "你可以企硬規矩，同時容許孩子失望：「你好想繼續睇，不過今日嘅螢幕時間完咗喇。」"}, {"title": "做冷靜穩健嘅引導者", "body": "家長嘅角色唔係令小朋友每分鐘都開心，而係保持穩定陪伴佢哋學習面對挫折。"}, {"title": "自信源自內在自我信任", "body": "長久嘅自信嚟自內在思考（「我點樣諗到㗎？」）同埋跨過困難嘅經歷，而唔係單靠「好叻」式讚賞。"}, {"title": "關係修補勝過追求完美", "body": "每個家長都有失控嘅時候。冷靜返嚟認清自己責任、唔將責任推畀小朋友，最能建立安全依附。"}]}
  },
  pt: {
    langCode: "pt",
    langName: "Português",
    darkModeBtnOff: "🌙 Modo Escuro",
    darkModeBtnOn: "☀️ Modo Claro",
    darkModeToggleTitle: "Alternar entre modo escuro e claro",
    languageSwitcherLabel: "Seletor de idioma",
    languageSelectLabel: "Selecionar idioma",
    languagePillsLabel: "Botões rápidos de idioma",
    infographicEnterBtn: "📸 Visão Infográfica (2 min)",
    infographicExitBtn: "📸 Sair da Visão Infográfica",
    expandAllScienceBtn: "🔬 Expandir Ciência Clínica",
    hideClinicalDetailsBtn: "🔬 Ocultar Detalhes Clínicos",
    headerViewFullGuideBtn: "📖 Ver Guia Completo",
    headerFocusedTabsBtn: "🎯 Abas Focadas",
    showAllSectionsBtn: "Mostrar Todas as Seções",
    returnFocusedTabsBtn: "Voltar às Abas Focadas",
    activePrefix: "Ativo:",
    prevPrefix: "Ant.:",
    nextPrefix: "Próx.:",
    formatPagerIndicator: (cur, total, label) => `Aba ${cur} de ${total} • ${label}`,
    backToOverviewBtn: "← Voltar ao Plano Diário e Visão Geral",
    jumpToChannelsBtn: "Ir para Assistir · Canais (28) →",
    fullHandbookModeLabel: "Modo Guia Completo • Todas as 8 Abas Visíveis",
    globalAgeLabel: "👶 Idade da Criança:",
    globalAges: {"all": "Todas as Idades", "under-2": "0–24 m", "toddler": "2–3 anos", "preschool": "4–5 anos", "early-elementary": "6–7 anos", "middle-elementary": "8–9 anos", "preteen": "10–12 anos"},
    sidebarBrandTitle: "Assistir • Brincar • Nutrir • Ouvir",
    sidebarBrandSub: "Escolha uma idade acima ou pule para qualquer diretório abaixo.",
    sidebarGroups: ["1. Comece Aqui", "2. Diretórios Diários Curados", "3. Ferramentas e Ciência Clínica", "4. Parentalidade e Corregulação"],
    sidebarNav: {"overview": {"title": "Plano Diário e 10 Regras", "caption": "Folha de geladeira e 4 pilares", "pill": "Início"}, "channels": {"title": "Assistir: Canais Seguros", "caption": "Lista branca de baixa estimulação", "pill": "28"}, "games": {"title": "Brincar: Jogos Educativos", "caption": "Lógica e STEM sem anúncios", "pill": "33"}, "nutrition": {"title": "Nutrir: Comida de Verdade", "caption": "Trocas de lancheira e NFI-10", "pill": "32"}, "listen": {"title": "Ouvir e Ler: Áudio", "caption": "Podcasts, Yoto e livros vivos", "pill": "26"}, "science": {"title": "Ciência e Auditores", "caption": "SEM-10, NFI-10 e 30 estudos", "pill": "30 Citas"}, "lockdown": {"title": "Guias de Bloqueio", "caption": "Apps livres, SO e escudos DNS", "pill": "13 Ferr."}, "expert": {"title": "Falar: Frases de Confiança", "caption": "Corregulação e palestras", "pill": "9 Frases"}, "all": {"title": "Ver Guia Completo / Imprimir", "caption": "Mostrar todas as seções juntas", "pill": "Tudo"}},
    mobileBar: {"overview": "Plano", "channels": "Ver", "games": "Jogar", "nutrition": "Nutrir", "listen": "Áudio", "lockdown": "Escudo", "expert": "Frases"},
    heroHeading: "Central Calma e Baseada em Evidências de Mídia, Jogos, Nutrição e Áudio para Pais",
    heroSubtitle: "Escolha a idade do seu filho para obter um ritmo diário instantâneo ou explore 119 recursos curados: séries de baixa estimulação, jogos construtivistas, trocas de lancheira com alimentos integrais e podcasts e livros sem tela.",
    heroStats: ["Canais Calmos Curados", "Jogos Aprovados por Educadores", "Alimentos Reais e Trocas", "Áudio e Livros Sem Tela", "Dupla Rubrica de 10 Pontos", "Estudos e Leis Citados"],
    blueprintSyncBtn: "🔗 Sincronizar os 4 Diretórios para Esta Idade",
    blueprintReadBtn: "🔊 Ouvir Plano Diário",
    blueprintCopyBtn: "📋 Copiar Plano para Cuidadores",
    blueprintPrintBtn: "🖨️ Imprimir Folha de Geladeira",
    searchPlaceholders: {"channel": "Buscar canais aprovados (ex.: Bluey, natureza, matemática, fonética)...", "game": "Buscar jogos educativos (ex.: xadrez, programação, DragonBox, Montessori)...", "food": "Buscar 32 alimentos e trocas (ex.: salmão, ferro, DHA, sem corantes)...", "listen": "Buscar áudio e livros (ex.: Yoto, Brains On, fonética, histórias)..."},
    viewChannelBtn: "Ver Canal Oficial",
    visitGameBtn: "Visitar Jogo / App Oficial",
    viewFoodRefBtn: "Ver Referência Clínica e Nutricional",
    viewListenRefBtn: "Ouvir / Ver Referência do Livro",
    drawerShowLabel: "🔬 + Por Que Funciona, Guia para Pais e Citações",
    drawerHideLabel: "🔬 − Ocultar Detalhes Clínicos e Guia",
    formatChannelsCount: (n) => (n === 1 ? "1 canal" : `${n} canais`),
    formatGamesCount: (n) => (n === 1 ? "1 jogo" : `${n} jogos`),
    formatFoodsCount: (n) => (n === 1 ? "1 alimento ou troca" : `${n} alimentos e trocas`),
    formatListenCount: (n) => (n === 1 ? "1 áudio ou livro" : `${n} áudios e livros`),
    emptyChannelsTitle: "Nenhum canal corresponde à sua busca.",
    emptyChannelsSub: "Tente alterar o filtro de idade ou limpar o termo de busca.",
    emptyGamesTitle: "Nenhum jogo educativo corresponde à sua busca.",
    emptyGamesSub: "Tente limpar os filtros de idade, domínio, sinal de parada e busca.",
    emptyFoodsTitle: "Nenhum alimento ou troca corresponde à sua busca.",
    emptyFoodsSub: "Tente selecionar todos os alimentos ou limpar o filtro nutricional.",
    emptyListenTitle: "Nenhum podcast, audiolivro ou livro corresponde à sua busca.",
    emptyListenSub: "Tente selecionar todos os formatos ou limpar a busca.",
    tabs: {"overview": {"kicker": "Aba 1 de 8 • Comece Aqui", "title": "Visão Geral, Plano Diário por Idade e 10 Regras Essenciais da Família", "sub": "Ritmo diário calmo, folha imprimível de 4 pilares para a geladeira e guia prático para pais.", "shortLabel": "Plano Diário e Visão Geral"}, "science": {"kicker": "Aba 2 de 8 • Evidência Clínica e Rubricas", "title": "Ciência Clínica, Auditores Duplos de 10 Pontos (SEM-10 e NFI-10) e 30 Citações", "sub": "Neuroimagem revisada por pares, psicologia do desenvolvimento, nutrição pediátrica e calculadoras de 60 segundos.", "shortLabel": "Ciência e Rubricas (30)"}, "channels": {"kicker": "Aba 3 de 8 • Pilar 1 (Assistir)", "title": "Diretório de Canais de Baixa Estimulação Aprovados por Pais (28 Canais)", "sub": "Canais de vídeo calmos avaliados na rubrica SEM-10 com exportação de lista branca em JSON/CSV.", "shortLabel": "Assistir · Canais (28)"}, "games": {"kicker": "Aba 4 de 8 • Pilar 2 (Brincar)", "title": "Diretório de Jogos Cognitivos e Apps Aprovados por Educadores (33 Jogos)", "sub": "Mundos construtivistas, quebra-cabeças espaciais e apps Montessori com zero anúncios e zero loot boxes.", "shortLabel": "Brincar · Jogos (33)"}, "nutrition": {"kicker": "Aba 5 de 8 • Pilar 3 (Nutrir)", "title": "Alimentos Integrais e Trocas de Lancheira Avaliados por Pediatras (32 Trocas)", "sub": "Substituições reais NOVA-1 no lugar de ultraprocessados infantis, sachês de purê e corantes sintéticos.", "shortLabel": "Nutrir · Alimentos (32)"}, "listen": {"kicker": "Aba 6 de 8 • Pilar 4 (Ouvir e Ler)", "title": "Ouvir e Ler: Diretório de Áudio Sem Tela, Podcasts e Livros Vivos (26 Escolhas)", "sub": "Podcasts de ciência e contos, cartões Yoto/Tonie, livros fonéticos decodificáveis e leitura dialógica.", "shortLabel": "Ouvir e Ler (26)"}, "lockdown": {"kicker": "Aba 7 de 8 • Defesa Técnica", "title": "Ferramentas Abertas de Controle Parental e Guias Passo a Passo de Bloqueio DNS", "sub": "13 arquiteturas de código aberto mais os Passos A–E para BrainRotGuard, KidTube, Family Link, Acesso Guiado e NextDNS.", "shortLabel": "Bloqueio de Dispositivos e DNS"}, "expert": {"kicker": "Aba 8 de 8 • Confiança e Corregulação", "title": "Frases de Confiança e Corregulação: O Que Dizer em Momentos Difíceis", "sub": "5 princípios de apego e autoconfiança, 9 frases \"diga isto em vez disso\", plano de 7 dias e 10 palestras gratuitas de psicologia.", "shortLabel": "Frases de Confiança (9)"}, "all": {"kicker": "Modo Guia Completo • Todas as 8 Abas Visíveis", "title": "Referência Completa do Portal SafeKids para Pais (Todas as Seções)", "sub": "Exibindo todas as 10 recomendações, 30+ estudos clínicos, 28 canais, 33 jogos, 32 trocas alimentares, 26 áudios/livros e 5 guias.", "shortLabel": "Guia Completo (Tudo)"}},
    blueprintStages: {"under-2": {"ageLabelShort": "Menores de 2 anos (0–24 m)", "directoryFilterAge": "toddler", "stageHeadline": "👶 Menores de 2 Anos (0–24 Meses) — 100% Zero Telas, Base Sensório-Motora e Ferro/DHA", "stageSummary": "AAP (2016) e Kuhl (2003): Pelo efeito de déficit de vídeo, bebês menores de 24 meses precisam de interação vocal ao vivo com os pais, exploração no chão e alimentos ricos em ferro heme e DHA.", "screenBudget": "0 min/dia de vídeo passivo (Apenas videochamadas familiares ao vivo segundo a AAP)", "sleepCutoff": "Quarto 100% escuro e sem telas; 12–16 h de sono total e sonecas", "mealRule": "Zero açúcar adicionado e zero mel (<12 m); alimentos macios ricos em ferro + DHA"}, "toddler": {"ageLabelShort": "Crianças pequenas (2–3 anos)", "directoryFilterAge": "toddler", "stageHeadline": "🧸 Crianças Pequenas (2–3 Anos) — Ritmo Lento em Família (SEM-10 ≤ 2/10) e Segurança contra Engasgo", "stageSummary": "OMS (2019) e Lillard (2011): Manter o tempo total de tela abaixo de 30–45 min/dia, sempre assistindo junto na TV da sala, com alimentos integrais NOVA-1 cortados em quartos ou amassados.", "screenBudget": "≤ 30–45 min/dia (100% acompanhado pelos pais na TV compartilhada)", "sleepCutoff": "Telas DESLIGADAS 60+ min antes da soneca e de dormir (Proteção da melatonina)", "mealRule": "Mesa 100% sem telas; cortar uvas e tomates-cereja em quartos no sentido do comprimento; pasta de oleaginosas em camada fina"}, "preschool": {"ageLabelShort": "Pré-escola (4–5 anos)", "directoryFilterAge": "preschool", "stageHeadline": "🎨 Pré-Escola (4–5 Anos) — Função Executiva Pré-Frontal, Fonética e Pontes Sensoriais", "stageSummary": "Diamond (2013) e Hirsh-Pasek (2015): Desenvolva controle inibitório, fonética sintética e senso numérico espacial com histórias calmas, apps táteis e refeições em família.", "screenBudget": "≤ 45–60 min/dia de TV de baixa estimulação ou app educativo guiado", "sleepCutoff": "Todas as telas DESLIGADAS 60+ min antes de dormir (Rotina de leitura em voz alta)", "mealRule": "Refeições 100% sem telas; zero corantes sintéticos (Vermelho 40 / Amarelo 5; E129 / E102); fruta inteira em vez de sachês de purê"}, "early-elementary": {"ageLabelShort": "Fundamental I inicial (6–7 anos)", "directoryFilterAge": "early-elementary", "stageHeadline": "🚀 Fundamental Inicial (6–7 Anos) — Investigação STEM Prática, Lógica Espacial e Glicose Estável", "stageSummary": "Papert (1980) e Benton (2007): Transição do vídeo passivo para desenho prático, ciência na natureza, desafios espaciais em fases e lancheiras de baixa carga glicêmica para 10:30 da manhã.", "screenBudget": "≤ 60 min/dia recreativo em dias de aula (Apenas em sala compartilhada)", "sleepCutoff": "Desligamento físico 60+ min antes de dormir; zero telas nos quartos", "mealRule": "Café da manhã + lancheira de baixa carga glicêmica (aveia/ovos/sementes) para 4 h de foco na aula"}, "middle-elementary": {"ageLabelShort": "Fundamental I médio (8–9 anos)", "directoryFilterAge": "middle-elementary", "stageHeadline": "🧩 Fundamental Médio (8–9 Anos) — Programação Construtivista, Matemática Dedutiva e Neuro-Nutrição", "stageSummary": "Resnick (2017) e Asbell-Clarke (2012): Canalize a autonomia para programação em blocos no Scratch, lógica booleana e engenharia (com timer visual de 5 min) junto com ferro, zinco e DHA.", "screenBudget": "≤ 60–75 min/dia (Priorizar programação criativa e quebra-cabeças cooperativos)", "sleepCutoff": "Dispositivos carregando na cozinha 60+ min antes de apagar as luzes (Chang et al., 2015)", "mealRule": "Jantar em família sem telas; Ferro heme/lentilha + Vitamina C e DHA marinho 2–3x/sem"}, "preteen": {"ageLabelShort": "Pré-adolescentes (10–12 anos)", "directoryFilterAge": "preteen", "stageHeadline": "🔭 Pré-Adolescentes (10–12 Anos) — Pensamento Sistêmico, Pico de Massa Óssea e Zero Feeds Sociais", "stageSummary": "Nisan & Schocken (2005) e Weaver (2016): Substitua feeds algorítmicos curtos (Shorts/TikTok) por física orbital, arquitetura de CPU e estratégia profunda, com cálcio/D3/K2 e polifenóis.", "screenBudget": "≤ 60–90 min/dia recreativo (Zero feeds de rolagem infinita ou chat)", "sleepCutoff": "Toque de recolher estrito 60 min antes de dormir; carregadores fora do quarto à noite", "mealRule": "Pico de massa óssea com D3 + K2 + cálcio + fibra prebiótica; zero cafeína ou energéticos"}},
    expertTab: {"chirpListenBtn": "🔊 Ouvir Frase", "chirpStopBtn": "⏹ Parar", "chirpReadPlanBtn": "🔊 Ouvir Plano Diário", "chirpVoiceLabel": "🎙️ Voz Chirp 3 HD:", "entryKicker": "Novo • Confiança e Corregulação", "entryTitle": "O que dizer para criar filhos confiantes", "entrySub": "9 frases calmas para momentos difíceis do dia a dia, com leitura Chirp 3 HD e 10 palestras gratuitas de psicologia clínica.", "entryCta": "Abrir →", "heading": "O Que Dizer para Criar Crianças Confiantes", "badge": "10 vídeos verificados", "lede": "Momentos difíceis são normais. Aqui está o que dizer quando eles acontecem — frases curtas e serenas para usar hoje.", "about": "Baseado na teoria do apego, pesquisas em educação emocional (Gottman) e psicologia da autodeterminação (Deci & Ryan), acompanhado de palestras públicas gratuitas da psicóloga clínica Dra. Becky Kennedy (TED, YouTube e podcasts).", "disclaimer": "Recurso exclusivamente educativo — não constitui psicoterapia nem orientação médica ou clínica. O SafeKids é um guia independente sem fins lucrativos e não possui afiliação, patrocínio ou endosso da Dra. Becky Kennedy, Good Inside®, TED ou de qualquer palestrante citado. Good Inside® é marca registrada da Good Inside, Inc., mencionada apenas de forma nominativa para identificar links públicos externos. As frases abaixo são paráfrases originais do SafeKids fundamentadas na psicologia do desenvolvimento, não citações literais (links verificados em 2026-11-07).", "pickerTitle": "O que está acontecendo agora?", "pickerSub": "Toque em um momento para ver o que dizer ou toque em Ouvir Frase com Google Cloud Chirp 3 HD.", "topics": {"confidence": "Construir confiança (4)", "frustration": "Manter um limite (2)", "big-feelings": "Emoções intensas (2)", "repair": "Depois que perdi a calma (1)", "all": "Mostrar tudo (9)"}, "statusAll": "Mostrando todas as {n} frases.", "statusFiltered": "Mostrando {shown} de {total} frases.", "insteadLabel": "Em vez de", "tryLabel": "Tente dizer", "copyBtn": "Copiar frase", "copiedBtn": "Copiado ✓", "whySummary": "Por que isso funciona", "principlesTitle": "As 5 grandes ideias por trás das frases", "practiceTitle": "Experimente por uma semana: uma pequena troca por dia", "practiceSub": "Pequenas trocas repetidas funcionam melhor do que tentar mudar tudo de uma vez.", "videosTitle": "Palestras recomendadas: 10 vídeos gratuitos de psicologia", "videosSub": "Os links abrem no YouTube em nova aba; nenhum rastreador carrega antes do clique.", "channelsTitle": "Links externos para palestras e canais públicos", "channelsSub": "Links externos para os canais públicos onde as palestras acima estão hospedadas. Algumas plataformas podem solicitar login.", "scripts": [{"id": "script_1", "moment": "Seu filho mostra um desenho ou projeto", "instead": "“Muito bem! Você é um grande artista!”", "tryText": "“Me conta sobre o seu desenho. Como você decidiu por onde começar?”", "why": "Uma pergunta curiosa direciona a criança para dentro, apoiando a confiança no próprio pensamento em vez de depender de aprovação externa."}, {"id": "script_2", "moment": "“Ela é muito melhor nisso do que eu.”", "instead": "“Imagina, você é o melhor de todos!”", "tryText": "“Dói quando alguém manda melhor em algo que importa para você. Eu já senti isso também. E você continua sendo você, e está tudo bem.”", "why": "Negar o sentimento ensina a criança a desconfiar do que sente; acolher a frustração mostra que ela continua inteira mesmo comparando-se."}, {"id": "script_3", "moment": "Travou na lição ou no quebra-cabeça e quer desistir", "instead": "“Deixa aqui que eu faço para você.”", "tryText": "“Isso está bem difícil mesmo. Estou bem aqui com você. Qual pequena coisa você poderia testar agora?”", "why": "Resolver pela criança tira o esforço que constrói autoconfiança. Ficar perto sem assumir o controle cria histórico de superação."}, {"id": "script_4", "moment": "Seu pré-adolescente ou adolescente está nervoso antes de uma prova", "instead": "“Não se preocupe, vai dar tudo certo!”", "tryText": "“Claro que você está nervoso — isso importa para você. Estar nervoso e estar pronto podem ser verdade ao mesmo tempo.”", "why": "Minimizar o nervosismo pode fazer a emoção parecer errada. Acolher os dois sentimentos ao mesmo tempo mostra que estar nervoso é normal e compatível com estar pronto."}, {"id": "script_5", "moment": "O tempo de tela acabou e começa o choro", "instead": "“Pare de chorar, é só um desenho!”", "tryText": "“Você queria muito continuar assistindo. É difícil parar. E as telas acabaram por hoje. Você pode ficar bravo — estou aqui com você.”", "why": "O limite permanece firme e a emoção é permitida. A tolerância à frustração nasce ao lado de um adulto calmo."}, {"id": "script_6", "moment": "Choramingo ou insistência depois de ouvir “não”", "instead": "“Está bom, só mais um — mas pare de choramingar.”", "tryText": "“A resposta continua sendo não. Tudo bem ficar chateado com isso. Eu dou conta dos seus sentimentos grandes.”", "why": "Um “não” calmo e firme mostra que o limite é seguro e que as emoções da criança não assustam você."}, {"id": "script_7", "moment": "Seu filho bate no irmão", "instead": "“Não pode bater! Vai já para o seu quarto!”", "tryText": "“Eu não vou deixar você bater. Vou afastar vocês para todo mundo ficar seguro. Você é uma boa criança passando por um momento bem difícil.”", "why": "Você interrompe o comportamento com firmeza calma e preserva a identidade positiva da criança para reparar depois."}, {"id": "script_8", "moment": "Uma criança sensível e intensa explode por algo pequeno", "instead": "“Você está exagerando completamente.”", "tryText": "“Isso pareceu gigante para você. Estou aqui.”", "why": "No auge da tempestade emocional, muitas palavras sobrecarregam ainda mais. Primeiro presença tranquila; conversa depois."}, {"id": "script_9", "moment": "Você gritou e se arrependeu", "instead": "Fingir que nada aconteceu ou dizer “Gritei porque você não obedeceu”.", "tryText": "“Fiquei pensando no que aconteceu antes. Me desculpe por ter gritado. Não foi culpa sua — cuidar disso é responsabilidade minha. Eu te amo.”", "why": "Assumir sua parte sem culpar a criança protege a autoestima dela e ensina na prática como reparar erros."}], "principles": [{"title": "Separar a Criança do Comportamento", "body": "O comportamento difícil é sinal de sobrecarga emocional, não prova de uma criança má. Mantenha todos seguros com acolhimento e curiosidade."}, {"title": "Manter o Limite e Validar a Emoção", "body": "Você pode sustentar uma regra firme e acolher a frustração: \"Você queria continuar assistindo, e o tempo de tela acabou por hoje.\""}, {"title": "Liderança Calma e Firme", "body": "Seu papel não é impedir toda frustração, mas permanecer calmo e seguro enquanto seu filho aprende a atravessar contrariedades."}, {"title": "Confiança Nasce da Autoconfiança", "body": "A confiança duradoura vem da reflexão interna («Como resolvi isso?») e de superar desafios possíveis, não de elogios automáticos."}, {"title": "Reparação Vale Mais que Perfeição", "body": "Todo adulto perde a paciência às vezes. Voltar com calma, assumir sua parte sem culpar a criança e reconectar fortalece o vínculo seguro."}]}
  },
  fr: {
    langCode: "fr",
    langName: "Français",
    darkModeBtnOff: "🌙 Mode Sombre",
    darkModeBtnOn: "☀️ Mode Clair",
    darkModeToggleTitle: "Basculer entre le mode sombre et clair",
    languageSwitcherLabel: "Sélecteur de langue",
    languageSelectLabel: "Choisir la langue",
    languagePillsLabel: "Boutons rapides de langue",
    infographicEnterBtn: "📸 Vue Infographie (2 min)",
    infographicExitBtn: "📸 Quitter la Vue Infographie",
    expandAllScienceBtn: "🔬 Déplier la Science Clinique",
    hideClinicalDetailsBtn: "🔬 Masquer les Détails Cliniques",
    headerViewFullGuideBtn: "📖 Voir le Guide Complet",
    headerFocusedTabsBtn: "🎯 Onglets Ciblés",
    showAllSectionsBtn: "Afficher Toutes les Sections",
    returnFocusedTabsBtn: "Retour aux Onglets Ciblés",
    activePrefix: "Actif :",
    prevPrefix: "Préc. :",
    nextPrefix: "Suiv. :",
    formatPagerIndicator: (cur, total, label) => `Onglet ${cur} sur ${total} • ${label}`,
    backToOverviewBtn: "← Retour au Plan Quotidien et Aperçu",
    jumpToChannelsBtn: "Aller à Regarder · Chaînes (28) →",
    fullHandbookModeLabel: "Mode Manuel Complet • Les 8 Onglets Visibles",
    globalAgeLabel: "👶 Âge de l’Enfant :",
    globalAges: {"all": "Tous Âges", "under-2": "0–24 m", "toddler": "2–3 ans", "preschool": "4–5 ans", "early-elementary": "6–7 ans", "middle-elementary": "8–9 ans", "preteen": "10–12 ans"},
    sidebarBrandTitle: "Regarder • Jouer • Nourrir • Écouter",
    sidebarBrandSub: "Choisissez un âge ci-dessus ou accédez à un répertoire ci-dessous.",
    sidebarGroups: ["1. Commencer Ici", "2. Répertoires Quotidiens", "3. Outils et Science Clinique", "4. Parentalité et Co-régulation"],
    sidebarNav: {"overview": {"title": "Plan Quotidien et 10 Règles", "caption": "Fiche frigo et 4 piliers", "pill": "Début"}, "channels": {"title": "Regarder : Chaînes Calmes", "caption": "Liste blanche basse stimulation", "pill": "28"}, "games": {"title": "Jouer : Jeux Éducatifs", "caption": "Logique et STEM sans pub", "pill": "33"}, "nutrition": {"title": "Nourrir : Aliments Bruts", "caption": "Échanges boîte à lunch et NFI-10", "pill": "32"}, "listen": {"title": "Écouter et Lire : Audio", "caption": "Podcasts, Yoto et livres vivants", "pill": "26"}, "science": {"title": "Science et Auto-Audits", "caption": "SEM-10, NFI-10 et 30 études", "pill": "30 Études"}, "lockdown": {"title": "Guides de Verrouillage", "caption": "Apps libres, OS et boucliers DNS", "pill": "13 Outils"}, "expert": {"title": "Parler : Phrases Confiance", "caption": "Co-régulation et conférences", "pill": "9 Phrases"}, "all": {"title": "Guide Complet / Imprimer", "caption": "Afficher toutes les sections", "pill": "Tout"}},
    mobileBar: {"overview": "Plan", "channels": "Vidéo", "games": "Jeux", "nutrition": "Repas", "listen": "Audio", "lockdown": "Bouclier", "expert": "Phrases"},
    heroHeading: "Portail Calme et Fondé sur la Science : Écrans, Jeux, Nutrition et Audio pour Parents",
    heroSubtitle: "Choisissez l’âge de votre enfant pour obtenir un rythme quotidien immédiat, ou parcourez 119 ressources sélectionnées : émissions apaisées, jeux constructivistes, collations brutes et podcasts sans écran.",
    heroStats: ["Chaînes Calmes Sélectionnées", "Jeux Validés par des Éducateurs", "Aliments Bruts et Échanges", "Audio et Livres Sans Écran", "Double Grille sur 10 Points", "Études et Lois Citées"],
    blueprintSyncBtn: "🔗 Synchroniser les 4 Répertoires sur Cet Âge",
    blueprintReadBtn: "🔊 Lire le Plan",
    blueprintCopyBtn: "📋 Copier le Plan pour Proches / Garde",
    blueprintPrintBtn: "🖨️ Imprimer la Fiche Frigo",
    searchPlaceholders: {"channel": "Rechercher une chaîne approuvée (ex. : nature, maths, phonétique, pleine conscience)...", "game": "Rechercher un jeu éducatif (ex. : échecs, codage, DragonBox, Montessori)...", "food": "Rechercher parmi 32 aliments bruts et échanges (ex. : saumon, fer, DHA, sans colorants)...", "listen": "Rechercher un podcast, une carte Yoto ou un livre (ex. : Brains On, phonétique, contes)..."},
    viewChannelBtn: "Voir la Chaîne Officielle",
    visitGameBtn: "Visiter le Jeu / l’App",
    viewFoodRefBtn: "Voir la Référence Clinique et Nutritionnelle",
    viewListenRefBtn: "Écouter / Voir la Référence du Livre",
    drawerShowLabel: "🔬 + Pourquoi Ça Marche, Guide Parent et Études",
    drawerHideLabel: "🔬 − Masquer les Détails Cliniques",
    formatChannelsCount: (n) => (n === 1 ? "1 chaîne" : `${n} chaînes`),
    formatGamesCount: (n) => (n === 1 ? "1 jeu" : `${n} jeux`),
    formatFoodsCount: (n) => (n === 1 ? "1 aliment brut ou échange" : `${n} aliments bruts et échanges`),
    formatListenCount: (n) => (n === 1 ? "1 audio ou livre" : `${n} audios et livres`),
    emptyChannelsTitle: "Aucune chaîne ne correspond à votre recherche.",
    emptyChannelsSub: "Essayez de modifier le filtre d’âge ou d’effacer votre recherche.",
    emptyGamesTitle: "Aucun jeu éducatif ne correspond à votre recherche.",
    emptyGamesSub: "Essayez d’effacer les filtres d’âge, de domaine, d’arrêt et de recherche.",
    emptyFoodsTitle: "Aucun aliment brut ou échange ne correspond à votre recherche.",
    emptyFoodsSub: "Essayez d’afficher tous les aliments ou d’effacer le filtre nutritionnel.",
    emptyListenTitle: "Aucun podcast, livre audio ou album ne correspond à votre recherche.",
    emptyListenSub: "Essayez d’afficher tous les formats ou d’effacer la recherche.",
    tabs: {"overview": {"kicker": "Onglet 1 sur 8 • Commencer Ici", "title": "Aperçu, Plan Quotidien par Âge et 10 Règles Familiales Clés", "sub": "Rythme quotidien apaisé, fiche frigo imprimable en 4 piliers et repères essentiels pour les parents.", "shortLabel": "Plan Quotidien et Aperçu"}, "science": {"kicker": "Onglet 2 sur 8 • Preuves Cliniques et Grilles", "title": "Science Clinique, Doubles Auditeurs sur 10 Points (SEM-10 et NFI-10) et 30 Études", "sub": "Neuro-imagerie évaluée par les pairs, psychologie du développement, nutrition pédiatrique et calculateurs en 60 secondes.", "shortLabel": "Science et Grilles (30)"}, "channels": {"kicker": "Onglet 3 sur 8 • Pilier 1 (Regarder)", "title": "Répertoire de Chaînes à Basse Stimulation Approuvées par les Parents (28 Chaînes)", "sub": "Chaînes vidéo calmes notées selon la grille SEM-10 avec export de liste blanche JSON/CSV.", "shortLabel": "Regarder · Chaînes (28)"}, "games": {"kicker": "Onglet 4 sur 8 • Pilier 2 (Jouer)", "title": "Répertoire de Jeux Cognitifs et d’Apps Validés par des Éducateurs (33 Jeux)", "sub": "Bacs à sable constructivistes, puzzles spatiaux et apps Montessori sans publicité ni coffres à butin.", "shortLabel": "Jouer · Jeux (33)"}, "nutrition": {"kicker": "Onglet 5 sur 8 • Pilier 3 (Nourrir)", "title": "Aliments Bruts et Échanges de Boîte à Lunch Validés en Pédiatrie (32 Échanges)", "sub": "Alternatives NOVA-1 remplaçant snacks ultra-transformés, gourdes de compote et colorants synthétiques.", "shortLabel": "Nourrir · Aliments (32)"}, "listen": {"kicker": "Onglet 6 sur 8 • Pilier 4 (Écouter et Lire)", "title": "Écouter et Lire : Audio Sans Écran, Podcasts et Livres Vivants (26 Sélections)", "sub": "Podcasts scientifiques et contes, cartes Yoto/Tonie, décodables phonétiques et lecture dialogique.", "shortLabel": "Écouter et Lire (26)"}, "lockdown": {"kicker": "Onglet 7 sur 8 • Défense Technique", "title": "Outils Libres de Contrôle Parental et Guides de Verrouillage Appareil / DNS", "sub": "13 architectures open source et étapes A–E pour BrainRotGuard, KidTube, Family Link, Accès Guidé et NextDNS.", "shortLabel": "Verrouillage Appareil et DNS"}, "expert": {"kicker": "Onglet 8 sur 8 • Confiance et Co-régulation", "title": "Phrases de Confiance et de Co-régulation : Que Dire dans les Moments Difficiles", "sub": "5 principes d’attachement et d’auto-confiance, 9 phrases « dites plutôt ceci », un plan sur 7 jours et 10 conférences gratuites.", "shortLabel": "Phrases Confiance (9)"}, "all": {"kicker": "Mode Manuel Complet • Les 8 Onglets Visibles", "title": "Référence Complète du Portail Parent SafeKids (Toutes les Sections)", "sub": "Affichage des 10 recommandations, 30+ études cliniques, 28 chaînes, 33 jeux, 32 échanges alimentaires, 26 audios/livres et 5 guides.", "shortLabel": "Guide Complet (Tout)"}},
    blueprintStages: {"under-2": {"ageLabelShort": "Moins de 2 ans (0–24 m)", "directoryFilterAge": "toddler", "stageHeadline": "👶 Moins de 2 Ans (0–24 Mois) — 100 % Zéro Écran, Base Sensorimotrice et Fer/DHA", "stageSummary": "AAP (2016) et Kuhl (2003) : En raison du déficit d’apprentissage vidéo avant 24 mois, privilégiez les échanges vocaux en direct, le jeu au sol et des aliments riches en fer héminique et DHA.", "screenBudget": "0 min/jour de vidéo passive (Appels vidéo familiaux en direct uniquement selon l’AAP)", "sleepCutoff": "Chambre 100 % sombre et sans écran ; 12–16 h de sommeil total et siestes", "mealRule": "Zéro sucre ajouté et zéro miel (<12 m) ; aliments fondants riches en fer + DHA"}, "toddler": {"ageLabelShort": "Tout-petits (2–3 ans)", "directoryFilterAge": "toddler", "stageHeadline": "🧸 Tout-Petits (2–3 Ans) — Co-Visionnage Lent (SEM-10 ≤ 2/10) et Prévention de l’Étouffement", "stageSummary": "OMS (2019) et Lillard (2011) : Limiter l’écran à 30–45 min/jour maximum, toujours co-visionné sur le téléviseur du salon, avec des aliments bruts NOVA-1 coupés en quartiers.", "screenBudget": "≤ 30–45 min/jour (100 % co-visionné avec un parent sur TV partagée)", "sleepCutoff": "Écrans ÉTEINTS 60+ min avant la sieste et le coucher (Protection de la mélatonine)", "mealRule": "Table 100 % sans écran ; couper raisins et tomates cerises en quartiers dans la longueur ; purées d’oléagineux en couche fine"}, "preschool": {"ageLabelShort": "Maternelle (4–5 ans)", "directoryFilterAge": "preschool", "stageHeadline": "🎨 Maternelle (4–5 Ans) — Fonction Exécutive Préfrontale, Phonétique et Ponts Sensoriels", "stageSummary": "Diamond (2013) et Hirsh-Pasek (2015) : Développer le contrôle inhibiteur, la phonétique synthétique et le sens du nombre grâce à des récits calmes et des repas familiaux sereins.", "screenBudget": "≤ 45–60 min/jour de TV à basse stimulation ou d’app éducative guidée", "sleepCutoff": "Tous les écrans ÉTEINTS 60+ min avant le coucher (Rituel lecture à voix haute)", "mealRule": "Repas 100 % sans écran ; zéro colorant synthétique (Rouge 40 / Jaune 5 ; E129 / E102) ; fruits entiers plutôt que gourdes"}, "early-elementary": {"ageLabelShort": "CP–CE1 (6–7 ans)", "directoryFilterAge": "early-elementary", "stageHeadline": "🚀 Primaire Début (6–7 Ans) — Exploration STEM Manuelle, Logique Spatiale et Glycémie Stable", "stageSummary": "Papert (1980) et Benton (2007) : Passer du visionnage passif au dessin, à l’enquête nature et aux puzzles spatiaux par niveaux, avec un déjeuner à faible charge glycémique pour éviter le creux de 10h30.", "screenBudget": "≤ 60 min/jour de loisir les jours d’école (Pièce commune uniquement)", "sleepCutoff": "Arrêt matériel 60+ min avant le sommeil ; zéro écran dans les chambres", "mealRule": "Petit-déjeuner + boîte à lunch à faible charge glycémique (avoine/œufs/graines) pour 4 h d’attention en classe"}, "middle-elementary": {"ageLabelShort": "CE2–CM1 (8–9 ans)", "directoryFilterAge": "middle-elementary", "stageHeadline": "🧩 Primaire Milieu (8–9 Ans) — Codage Constructiviste, Mathématiques Déductives et Neuro-Nutrition", "stageSummary": "Resnick (2017) et Asbell-Clarke (2012) : Orienter l’autonomie vers Scratch, la logique booléenne et l’ingénierie (avec minuteur visuel de 5 min), soutenus par le fer, le zinc et le DHA marin.", "screenBudget": "≤ 60–75 min/jour (Priorité au codage créatif et aux énigmes coopératives)", "sleepCutoff": "Appareils posés en cuisine 60+ min avant l’extinction des feux (Chang et al., 2015)", "mealRule": "Dîner familial sans écran ; Fer héminique/lentilles + Vitamine C et DHA marin 2–3x/sem."}, "preteen": {"ageLabelShort": "Pré-ados (10–12 ans)", "directoryFilterAge": "preteen", "stageHeadline": "🔭 Pré-Ados (10–12 Ans) — Pensée Systémique, Pic de Minéralisation Osseuse et Zéro Flux Social", "stageSummary": "Nisan & Schocken (2005) et Weaver (2016) : Remplacer les flux courts algorithmiques (Shorts/TikTok) par la physique orbitale, l’architecture CPU et la stratégie, avec calcium/D3/K2 et polyphénols.", "screenBudget": "≤ 60–90 min/jour récréatif (Zéro flux à défilement infini ni chat)", "sleepCutoff": "Couvre-feu strict 60 min avant le coucher ; chargeurs hors des chambres la nuit", "mealRule": "Pic osseux D3 + K2 + calcium + fibres prébiotiques ; zéro caféine ni boissons énergisantes"}},
    expertTab: {"chirpListenBtn": "🔊 Écouter", "chirpStopBtn": "⏹ Arrêter", "chirpReadPlanBtn": "🔊 Lire le Plan", "chirpVoiceLabel": "🎙️ Voix Chirp 3 HD :", "entryKicker": "Nouveau • Confiance et Co-régulation", "entryTitle": "Que dire pour élever des enfants confiants", "entrySub": "9 phrases apaisées pour les moments difficiles du quotidien, avec lecture Chirp 3 HD et 10 conférences gratuites de psychologie.", "entryCta": "Ouvrir →", "heading": "Quoi Dire pour Élever des Enfants Confiants", "badge": "10 vidéos vérifiées", "lede": "Les moments difficiles sont normaux. Voici des phrases courtes et posées à utiliser dès aujourd’hui.", "about": "Fondé sur la théorie de l’attachement, l’accompagnement émotionnel (Gottman) et la psychologie de l’autodétermination (Deci & Ryan), accompagné de conférences publiques gratuites de la psychologue clinicienne Dre Becky Kennedy (TED, YouTube et podcasts).", "disclaimer": "Ressource strictement éducative — ne constitue ni une psychothérapie ni un avis médical ou clinique. SafeKids est un guide indépendant à but non lucratif, non affilié, ni parrainé ni approuvé par la Dre Becky Kennedy, Good Inside®, TED ou tout intervenant cité. Good Inside® est une marque déposée de Good Inside, Inc., mentionnée à titre purement nominatif pour identifier les vidéos publiques externes. Les phrases ci-dessous sont des paraphrases originales de SafeKids issues de la psychologie du développement, et non des citations textuelles (liens vérifiés le 2026-11-07).", "pickerTitle": "Que se passe-t-il en ce moment ?", "pickerSub": "Touchez une situation pour voir quoi dire, ou cliquez sur Écouter pour entendre la voix Google Cloud Chirp 3 HD.", "topics": {"confidence": "Bâtir la confiance (4)", "frustration": "Tenir une limite (2)", "big-feelings": "Grandes émotions (2)", "repair": "Après avoir crié (1)", "all": "Tout afficher (9)"}, "statusAll": "Affichage des {n} phrases.", "statusFiltered": "Affichage de {shown} phrases sur {total}.", "insteadLabel": "Au lieu de", "tryLabel": "Essayez de dire", "copyBtn": "Copier la phrase", "copiedBtn": "Copié ✓", "whySummary": "Pourquoi ça marche", "principlesTitle": "Les 5 grandes idées derrière ces phrases", "practiceTitle": "Essayez pendant une semaine : un petit changement par jour", "practiceSub": "De petits ajustements répétés valent mieux qu’un grand bouleversement.", "videosTitle": "À voir : 10 conférences gratuites de psychologie", "videosSub": "Les liens s’ouvrent sur YouTube dans un nouvel onglet sans traceur intégré.", "channelsTitle": "Liens externes vers les conférences et chaînes publiques", "channelsSub": "Liens externes vers les chaînes officielles hébergeant ces interventions publiques. Certaines plateformes peuvent demander une connexion.", "scripts": [{"id": "script_1", "moment": "Votre enfant vous montre un dessin ou un bricolage", "instead": "« Bravo ! Tu es un grand artiste ! »", "tryText": "« Raconte-moi ton dessin. Comment as-tu choisi par où commencer ? »", "why": "Une question curieuse invite l’enfant à se tourner vers lui-même afin d’ancrer sa confiance dans sa propre réflexion."}, {"id": "script_2", "moment": "« Elle est tellement plus forte que moi. »", "instead": "« Mais non, c’est toi le meilleur ! »", "tryText": "« Ça pince le cœur quand quelqu’un réussit mieux quelque chose qui compte pour toi. J’ai déjà ressenti ça aussi. Et tu restes toi, et tu es très bien comme tu es. »", "why": "Nier l’émotion fait douter l’enfant de son ressenti ; la nommer lui montre qu’on peut ressentir de l’envie sans perdre sa valeur."}, {"id": "script_3", "moment": "Bloqué sur un devoir ou un puzzle, il veut abandonner", "instead": "« Donne, je vais le faire pour toi. »", "tryText": "« C’est vraiment difficile. Je suis juste là avec toi. Quelle toute petite chose pourrais-tu essayer maintenant ? »", "why": "Faire à sa place retire l’effort qui construit la confiance. Rester présent sans sauver bâtit son expérience de persévérance."}, {"id": "script_4", "moment": "Votre pré-ado ou ado stresse avant un examen ou un essai", "instead": "« Ne t’inquiète pas, tout ira bien ! »", "tryText": "« Bien sûr que tu as le trac : ça compte beaucoup pour toi. Être stressé et être prêt peuvent être vrais en même temps. »", "why": "Minimiser le trac peut faire croire que l’émotion pose problème. Accueillir les deux ressentis ensemble montre que le trac est normal et n’empêche pas d’être prêt."}, {"id": "script_5", "moment": "Le temps d’écran est fini et la crise éclate", "instead": "« Arrête de pleurer, ce n’est qu’un dessin animé ! »", "tryText": "« Tu aurais vraiment voulu continuer à regarder. C’est dur d’arrêter. Et les écrans sont finis pour aujourd’hui. Tu as le droit d’être fâché — je suis là. »", "why": "La limite tient bon et l’émotion est accueillie. La tolérance à la frustration grandit auprès d’un adulte calme."}, {"id": "script_6", "moment": "Il pleurniche ou insiste après un « non »", "instead": "« Bon d’accord, juste un dernier, mais arrête de râler. »", "tryText": "« La réponse reste non. Tu as le droit d’être mécontent. Je peux accueillir ta grande colère. »", "why": "Un « non » chaleureux et solide prouve que le cadre est fiable et que ses émotions ne vous dépassent pas."}, {"id": "script_7", "moment": "Votre enfant tape son frère ou sa sœur", "instead": "« On ne tape pas ! File dans ta chambre ! »", "tryText": "« Je ne te laisserai pas taper. Je vous sépare pour que tout le monde soit en sécurité. Tu es un bon enfant qui traverse un moment très dur. »", "why": "On stoppe le geste calmement tout en préservant l’identité positive de l’enfant, ce qui facilite la réparation une fois le calme revenu."}, {"id": "script_8", "moment": "Un enfant sensible et intense explose pour un détail", "instead": "« Tu exagères complètement. »", "tryText": "« Ça t’a semblé immense. Je suis là. »", "why": "En pleine tempête émotionnelle, trop de paroles submergent davantage. D’abord une présence calme, les explications plus tard."}, {"id": "script_9", "moment": "Vous avez crié et vous le regrettez", "instead": "Faire comme si de rien n’était ou dire « J’ai crié parce que tu n’écoutais pas ».", "tryText": "« J’ai repensé à tout à l’heure. Je suis désolé d’avoir crié. Ce n’était pas ta faute — c’est à moi de travailler là-dessus. Je t’aime. »", "why": "Reconnaître sa part sans blâmer l’enfant protège son estime de soi et lui montre comment réparer ses propres erreurs."}], "principles": [{"title": "Distinguer l’Enfant de son Comportement", "body": "Un comportement difficile signale un système nerveux débordé, pas un mauvais enfant. Protégez chacun avec calme et curiosité."}, {"title": "Tenir la Limite et Valider l’Émotion", "body": "Vous pouvez maintenir un cadre ferme tout en accueillant la déception : « Tu voulais continuer, et l’écran est terminé pour aujourd’hui. »"}, {"title": "Un Repère Calme et Solide", "body": "Votre rôle n’est pas d’éviter toute frustration, mais de rester stable pendant que votre enfant apprend à traverser ses émotions."}, {"title": "La Confiance Naît de la Confiance en Soi", "body": "La confiance durable grandit quand l’enfant réfléchit par lui-même et surmonte un défi à sa portée, plutôt qu’avec des compliments automatiques."}, {"title": "La Réparation Compte Plus que la Perfection", "body": "Tout parent s’emporte parfois. Revenir calmement, reconnaître sa part sans blâmer l’enfant et renouer le lien nourrit un attachement sûr."}]}
  },
  it: {
    langCode: "it",
    langName: "Italiano",
    darkModeBtnOff: "🌙 Modalità Scura",
    darkModeBtnOn: "☀️ Modalità Chiara",
    darkModeToggleTitle: "Passa tra modalità scura e chiara",
    languageSwitcherLabel: "Selettore lingua",
    languageSelectLabel: "Seleziona lingua",
    languagePillsLabel: "Pulsanti rapidi lingua",
    infographicEnterBtn: "📸 Vista Infografica (2 min)",
    infographicExitBtn: "📸 Esci dalla Vista Infografica",
    expandAllScienceBtn: "🔬 Espandi Scienza Clinica",
    hideClinicalDetailsBtn: "🔬 Nascondi Dettagli Clinici",
    headerViewFullGuideBtn: "📖 Vedi Guida Completa",
    headerFocusedTabsBtn: "🎯 Schede Mirate",
    showAllSectionsBtn: "Mostra Tutte le Sezioni",
    returnFocusedTabsBtn: "Torna alle Schede Mirate",
    activePrefix: "Attivo:",
    prevPrefix: "Prec.:",
    nextPrefix: "Succ.:",
    formatPagerIndicator: (cur, total, label) => `Scheda ${cur} di ${total} • ${label}`,
    backToOverviewBtn: "← Torna al Piano Giornaliero e Panoramica",
    jumpToChannelsBtn: "Vai a Guarda · Canali (28) →",
    fullHandbookModeLabel: "Modalità Manuale Completo • Tutte le 8 Schede Visibili",
    globalAgeLabel: "👶 Età del Bambino:",
    globalAges: {"all": "Tutte le Età", "under-2": "0–24 m", "toddler": "2–3 anni", "preschool": "4–5 anni", "early-elementary": "6–7 anni", "middle-elementary": "8–9 anni", "preteen": "10–12 anni"},
    sidebarBrandTitle: "Guarda • Gioca • Nutri • Ascolta",
    sidebarBrandSub: "Scegli un’età sopra o passa a una directory qui sotto.",
    sidebarGroups: ["1. Inizia Qui", "2. Directory Giornaliere Curate", "3. Strumenti e Scienza Clinica", "4. Genitorialità e Co-regolazione"],
    sidebarNav: {"overview": {"title": "Piano Giornaliero e 10 Regole", "caption": "Scheda frigo e 4 pilastri", "pill": "Inizio"}, "channels": {"title": "Guarda: Canali Sicuri", "caption": "Whitelist a bassa stimolazione", "pill": "28"}, "games": {"title": "Gioca: Giochi Educativi", "caption": "Logica e STEM senza pubblicità", "pill": "33"}, "nutrition": {"title": "Nutri: Cibi Integrali", "caption": "Alternative merenda e NFI-10", "pill": "32"}, "listen": {"title": "Ascolta e Leggi: Audio", "caption": "Podcast, Yoto e libri vivi", "pill": "26"}, "science": {"title": "Scienza e Auto-Revisori", "caption": "SEM-10, NFI-10 e 30 studi", "pill": "30 Studi"}, "lockdown": {"title": "Guide di Blocco", "caption": "App libere, OS e scudi DNS", "pill": "13 Strum."}, "expert": {"title": "Parlare: Frasi di Fiducia", "caption": "Co-regolazione e interventi", "pill": "9 Frasi"}, "all": {"title": "Guida Completa / Stampa", "caption": "Mostra tutte le sezioni insieme", "pill": "Tutto"}},
    mobileBar: {"overview": "Piano", "channels": "Guarda", "games": "Gioca", "nutrition": "Cibo", "listen": "Audio", "lockdown": "Scudo", "expert": "Frasi"},
    heroHeading: "Centro Calmo e Basato sulle Evidenze per Media, Gioco, Nutrizione e Audio per Genitori",
    heroSubtitle: "Scegli l’età di tuo figlio per ottenere subito un ritmo giornaliero o esplora 119 risorse selezionate: programmi a bassa stimolazione, giochi costruttivisti, merende integrali e podcast e libri senza schermo.",
    heroStats: ["Canali Calmi Selezionati", "Giochi Approvati da Educatori", "Cibi Integrali e Sostituzioni", "Audio e Libri Senza Schermo", "Doppia Rubrica a 10 Punti", "Studi e Leggi Citati"],
    blueprintSyncBtn: "🔗 Sincronizza le 4 Directory su Questa Età",
    blueprintReadBtn: "🔊 Leggi il Piano",
    blueprintCopyBtn: "📋 Copia Piano per Educatori / Nonni",
    blueprintPrintBtn: "🖨️ Stampa Scheda da Frigorifero",
    searchPlaceholders: {"channel": "Cerca canali approvati (es. natura, matematica, fonetica, mindfulness)...", "game": "Cerca giochi educativi (es. scacchi, programmazione, DragonBox, Montessori)...", "food": "Cerca tra 32 cibi integrali e sostituzioni (es. salmone, ferro, DHA, senza coloranti)...", "listen": "Cerca podcast, audiolibri o libri (es. Yoto, Brains On, fonetica, fiabe)..."},
    viewChannelBtn: "Vedi Canale Ufficiale",
    visitGameBtn: "Visita Gioco / App Ufficiale",
    viewFoodRefBtn: "Vedi Riferimento Clinico e Nutrizionale",
    viewListenRefBtn: "Ascolta / Vedi Riferimento Libro",
    drawerShowLabel: "🔬 + Perché Funziona, Guida Genitori e Fonti",
    drawerHideLabel: "🔬 − Nascondi Dettagli Clinici e Guida",
    formatChannelsCount: (n) => (n === 1 ? "1 canale" : `${n} canali`),
    formatGamesCount: (n) => (n === 1 ? "1 gioco" : `${n} giochi`),
    formatFoodsCount: (n) => (n === 1 ? "1 cibo integrale o sostituzione" : `${n} cibi integrali e sostituzioni`),
    formatListenCount: (n) => (n === 1 ? "1 audio o libro" : `${n} audio e libri`),
    emptyChannelsTitle: "Nessun canale corrisponde alla ricerca.",
    emptyChannelsSub: "Prova a cambiare il filtro per età o a cancellare il testo cercato.",
    emptyGamesTitle: "Nessun gioco educativo corrisponde alla ricerca.",
    emptyGamesSub: "Prova a reimpostare età, dominio, segnale di stop e ricerca.",
    emptyFoodsTitle: "Nessun cibo integrale o sostituzione corrisponde alla ricerca.",
    emptyFoodsSub: "Prova a mostrare tutti gli alimenti o a cancellare il filtro nutrizionale.",
    emptyListenTitle: "Nessun podcast, audiolibro o libro corrisponde alla ricerca.",
    emptyListenSub: "Prova a mostrare tutti i formati o a cancellare la ricerca.",
    tabs: {"overview": {"kicker": "Scheda 1 di 8 • Inizia Qui", "title": "Panoramica, Piano Giornaliero per Età e 10 Regole Familiari Chiave", "sub": "Ritmo quotidiano calmo, scheda stampabile a 4 pilastri per il frigo e guida essenziale per i genitori.", "shortLabel": "Piano Giornaliero e Panoramica"}, "science": {"kicker": "Scheda 2 di 8 • Evidenze Cliniche e Rubriche", "title": "Scienza Clinica, Doppi Revisori a 10 Punti (SEM-10 e NFI-10) e 30 Citazioni", "sub": "Neuroimaging peer-reviewed, psicologia dello sviluppo, nutrizione pediatrica e calcolatori da 60 secondi.", "shortLabel": "Scienza e Rubriche (30)"}, "channels": {"kicker": "Scheda 3 di 8 • Pilastro 1 (Guarda)", "title": "Directory dei Canali a Bassa Stimolazione Approvati dai Genitori (28 Canali)", "sub": "Canali video calmi valutati con la rubrica SEM-10 ed esportazione whitelist in JSON/CSV.", "shortLabel": "Guarda · Canali (28)"}, "games": {"kicker": "Scheda 4 di 8 • Pilastro 2 (Gioca)", "title": "Directory di Giochi Cognitivi e App Approvati dagli Educatori (33 Giochi)", "sub": "Ambienti costruttivisti, puzzle spaziali e app Montessori con zero pubblicità e zero loot box.", "shortLabel": "Gioca · Giochi (33)"}, "nutrition": {"kicker": "Scheda 5 di 8 • Pilastro 3 (Nutri)", "title": "Cibi Integrali e Sostituzioni per la Merenda Validati dai Pediatri (32 Scelte)", "sub": "Alternative reali NOVA-1 al posto di snack ultra-processati, spremibili di purea e coloranti sintetici.", "shortLabel": "Nutri · Cibi (32)"}, "listen": {"kicker": "Scheda 6 di 8 • Pilastro 4 (Ascolta e Leggi)", "title": "Ascolta e Leggi: Audio Senza Schermo, Podcast e Libri Vivi (26 Scelte)", "sub": "Podcast di scienza e fiabe, schede Yoto/Tonie, letture fonetiche decodificabili e lettura dialogica.", "shortLabel": "Ascolta e Leggi (26)"}, "lockdown": {"kicker": "Scheda 7 di 8 • Difesa Tecnica", "title": "Strumenti Open Source di Parental Control e Guide Passo-Passo di Blocco DNS", "sub": "13 architetture open source più i Passi A–E per BrainRotGuard, KidTube, Family Link, Accesso Guidato e NextDNS.", "shortLabel": "Blocco Dispositivi e DNS"}, "expert": {"kicker": "Scheda 8 di 8 • Fiducia e Co-regolazione", "title": "Frasi di Fiducia e Co-regolazione: Cosa Dire nei Momenti Difficili", "sub": "5 principi di attaccamento e fiducia interiore, 9 frasi \"prova a dire così\", piano di 7 giorni e 10 interventi gratuiti di psicologia.", "shortLabel": "Frasi di Fiducia (9)"}, "all": {"kicker": "Modalità Manuale Completo • Tutte le 8 Schede Visibili", "title": "Riferimento Completo del Portale Genitori SafeKids (Tutte le Sezioni)", "sub": "Mostra tutte le 10 raccomandazioni, 30+ studi clinici, 28 canali, 33 giochi, 32 scelte alimentari, 26 audio/libri e 5 guide.", "shortLabel": "Guida Completa (Tutto)"}},
    blueprintStages: {"under-2": {"ageLabelShort": "Sotto i 2 anni (0–24 m)", "directoryFilterAge": "toddler", "stageHeadline": "👶 Sotto i 2 Anni (0–24 Mesi) — 100% Zero Schermi, Base Sensomotoria e Ferro/DHA", "stageSummary": "AAP (2016) e Kuhl (2003): Per l’effetto deficit da video sotto i 24 mesi servono interazione vocale dal vivo con i genitori, gioco a terra e cibi ricchi di ferro eme e DHA.", "screenBudget": "0 min/giorno di video passivi (Solo videochiamate familiari dal vivo secondo AAP)", "sleepCutoff": "Cameretta 100% buia e senza schermi; 12–16 ore di sonno totale e riposini", "mealRule": "Zero zuccheri aggiunti e zero miele (<12 m); cibi morbidi ricchi di ferro + DHA"}, "toddler": {"ageLabelShort": "Bambini piccoli (2–3 anni)", "directoryFilterAge": "toddler", "stageHeadline": "🧸 Bambini Piccoli (2–3 Anni) — Co-Visione Lenta (SEM-10 ≤ 2/10) e Tagli Sicuri Anti-Soffocamento", "stageSummary": "OMS (2019) e Lillard (2011): Mantenere gli schermi entro 30–45 min/giorno, sempre insieme sulla TV del soggiorno, con cibi integrali NOVA-1 tagliati in quarti o schiacciati.", "screenBudget": "≤ 30–45 min/giorno (100% co-visione con i genitori su TV condivisa)", "sleepCutoff": "Schermi SPENTI 60+ min prima del riposino e della nanna (Protezione melatonina)", "mealRule": "Tavola 100% senza schermi; tagliare uva e pomodorini in quarti per il lungo; creme di frutta secca in strato sottile"}, "preschool": {"ageLabelShort": "Età prescolare (4–5 anni)", "directoryFilterAge": "preschool", "stageHeadline": "🎨 Età Prescolare (4–5 Anni) — Funzioni Esecutive Prefrontali, Fonetica e Ponti Sensoriali", "stageSummary": "Diamond (2013) e Hirsh-Pasek (2015): Allenare controllo inibitorio, fonetica sintetica e senso del numero con storie calme, app tattili e pasti familiari sereni.", "screenBudget": "≤ 45–60 min/giorno di TV a bassa stimolazione o app educativa guidata", "sleepCutoff": "Tutti gli schermi SPENTI 60+ min prima della nanna (Lettura ad alta voce)", "mealRule": "Pasti 100% senza schermi; zero coloranti sintetici (Rosso 40 / Giallo 5; E129 / E102); frutta intera invece di puree in bustina"}, "early-elementary": {"ageLabelShort": "Primaria iniziale (6–7 anni)", "directoryFilterAge": "early-elementary", "stageHeadline": "🚀 Primaria Iniziale (6–7 Anni) — Indagine STEM Pratica, Logica Spaziale e Glicemia Stabile", "stageSummary": "Papert (1980) e Benton (2007): Passare dalla visione passiva al disegno pratico, all’esplorazione naturale e ai puzzle spaziali a livelli, con pranzi a basso carico glicemico per evitare il calo delle 10:30.", "screenBudget": "≤ 60 min/giorno ricreativi nei giorni di scuola (Solo stanza condivisa)", "sleepCutoff": "Spegnimento fisico 60+ min prima del sonno; zero schermi nelle camere", "mealRule": "Colazione + merenda a basso carico glicemico (avena/uova/semi) per 4 ore di attenzione in classe"}, "middle-elementary": {"ageLabelShort": "Primaria media (8–9 anni)", "directoryFilterAge": "middle-elementary", "stageHeadline": "🧩 Primaria Media (8–9 Anni) — Coding Costruttivista, Matematica Deduttiva e Neuro-Nutrizione", "stageSummary": "Resnick (2017) e Asbell-Clarke (2012): Indirizzare l’autonomia verso Scratch, logica booleana e sandbox ingegneristiche (con timer visivo di 5 min) insieme a ferro, zinco e DHA marino.", "screenBudget": "≤ 60–75 min/giorno (Priorità a coding creativo e rompicapi cooperativi)", "sleepCutoff": "Dispositivi in carica in cucina 60+ min prima di spegnere le luci (Chang et al., 2015)", "mealRule": "Cena in famiglia senza schermi; Ferro eme/lenticchie + Vitamina C e DHA marino 2–3 volte/sett."}, "preteen": {"ageLabelShort": "Pre-adolescenti (10–12 anni)", "directoryFilterAge": "preteen", "stageHeadline": "🔭 Pre-Adolescenti (10–12 Anni) — Pensiero Sistemico, Picco di Massa Ossea e Zero Feed Social", "stageSummary": "Nisan & Schocken (2005) e Weaver (2016): Sostituire i feed brevi algoritmici (Shorts/TikTok) con fisica orbitale, architettura CPU e strategia profonda, con calcio/D3/K2 e polifenoli.", "screenBudget": "≤ 60–90 min/giorno ricreativi (Zero feed a scorrimento infinito o chat)", "sleepCutoff": "Coprifuoco rigoroso 60 min prima della nanna; caricabatterie fuori dalla camera", "mealRule": "Picco osseo con D3 + K2 + calcio + fibre prebiotiche; zero caffeina o energy drink"}},
    expertTab: {"chirpListenBtn": "🔊 Ascolta", "chirpStopBtn": "⏹ Ferma", "chirpReadPlanBtn": "🔊 Leggi il Piano", "chirpVoiceLabel": "🎙️ Voce Chirp 3 HD:", "entryKicker": "Nuovo • Fiducia e Co-regolazione", "entryTitle": "Cosa dire per crescere bambini sicuri di sé", "entrySub": "9 frasi calme per i momenti difficili quotidiani, con lettura vocale Chirp 3 HD e 10 video gratuiti di psicologia clinica.", "entryCta": "Apri →", "heading": "Cosa Dire per Crescere Bambini Sicuri di Sé", "badge": "10 video verificati", "lede": "I momenti difficili sono normali. Ecco frasi brevi e serene che puoi usare già oggi.", "about": "Basato sulla teoria per attaccamento sicuro, sulla ricerca di coaching emotivo (Gottman) e sulla psicologia di autodeterminazione (Deci & Ryan), con link a interventi pubblici gratuiti di psicologia clinica (TED, YouTube e podcast, inclusa la Dott.ssa Becky Kennedy).", "disclaimer": "Risorsa puramente educativa — non costituisce psicoterapia né parere medico o clinico. SafeKids è una guida indipendente senza fini di lucro e non è affiliata, sponsorizzata né approvata da Becky Kennedy, Good Inside®, TED o altri relatori citati. Good Inside® è un marchio registrato di Good Inside, Inc., indicato solo in modo nominativo per identificare i link video pubblici esterni. Le frasi riportate sono parafrasi originali SafeKids basate sulla psicologia dello sviluppo, non citazioni testuali (link verificati il 2026-11-07).", "pickerTitle": "Cosa sta succedendo adesso?", "pickerSub": "Tocca un momento per leggere cosa dire oppure premi Ascolta con voce Google Cloud Chirp 3 HD.", "topics": {"confidence": "Costruire fiducia (4)", "frustration": "Tenere un limite (2)", "big-feelings": "Grandi emozioni (2)", "repair": "Dopo aver urlato (1)", "all": "Mostra tutte (9)"}, "statusAll": "Visualizzazione di tutte le {n} frasi.", "statusFiltered": "Visualizzazione di {shown} frasi su {total}.", "insteadLabel": "Invece di", "tryLabel": "Prova a dire", "copyBtn": "Copia frase", "copiedBtn": "Copiato ✓", "whySummary": "Perché funziona", "principlesTitle": "Le 5 grandi idee alla base delle frasi", "practiceTitle": "Prova per una settimana: un piccolo cambio al giorno", "practiceSub": "Piccoli cambiamenti ripetuti funzionano meglio di grandi rivoluzioni.", "videosTitle": "Approfondimenti video: 10 interventi gratuiti di psicologia", "videosSub": "I link aprono YouTube in una nuova scheda senza caricare traccianti in anticipo.", "channelsTitle": "Link esterni ai canali pubblici e agli interventi", "channelsSub": "Link esterni ai canali ufficiali che ospitano i video pubblici sopra elencati. Alcune piattaforme possono richiedere accesso.", "scripts": [{"id": "script_1", "moment": "Tuo figlio ti mostra un disegno o un lavoretto", "instead": "«Bravissimo! Sei un vero artista!»", "tryText": "«Raccontami di questo disegno. Come hai deciso da dove cominciare?»", "why": "Una domanda curiosa porta il bambino a guardarsi dentro, fondando la fiducia sul proprio pensiero anziché sul giudizio esterno."}, {"id": "script_2", "moment": "«Lei è molto più brava di me in questo.»", "instead": "«Ma no, sei tu il più bravo di tutti!»", "tryText": "«Brucia quando qualcuno riesce meglio in qualcosa a cui tieni. L’ho provato anch’io. E tu resti comunque tu, e vai bene così.»", "why": "Negare il sentimento fa dubitare il bambino di ciò che prova; dargli un nome insegna che si può provare invidia restando al sicuro in sé stessi."}, {"id": "script_3", "moment": "Bloccato sui compiti o su un puzzle, vuole mollare", "instead": "«Dai qua, lo faccio io per te.»", "tryText": "«Questo passaggio è davvero difficile. Sono qui vicino a te. Qual è una piccola prova che potresti fare adesso?»", "why": "Sostituirsi toglie la fatica che costruisce autostima. Restare accanto senza risolvere crea esperienza reale nel superare gli ostacoli."}, {"id": "script_4", "moment": "Il tuo ragazzo è agitato prima di una verifica o di una gara", "instead": "«Non agitarti, andrà benissimo!»", "tryText": "«Certo che sei agitato: questa cosa conta per te. Essere agitati ed essere pronti possono essere veri insieme.»", "why": "Minimizzare l’ansia può farla sembrare sbagliata. Accogliere entrambe le emozioni insieme mostra che essere agitati è normale e compatibile con l’essere pronti."}, {"id": "script_5", "moment": "Il tempo dello schermo finisce e inizia la crisi", "instead": "«Smettila di piangere, è solo un cartone!»", "tryText": "«Vorresti tanto continuare a guardare. È durissima fermarsi. E per oggi gli schermi sono finiti. Puoi essere arrabbiato: io sono qui.»", "why": "Il limite resta fermo e l’emozione è accolta. La tolleranza alla frustrazione cresce accanto a un adulto calmo."}, {"id": "script_6", "moment": "Insiste o piagnucola dopo che hai detto «no»", "instead": "«E va bene, solo un altro, ma smettila di lamentarti.»", "tryText": "«La risposta resta no. Va bene essere arrabbiato per questo. Posso reggere le tue emozioni grandi.»", "why": "Un «no» caldo e saldo mostra che il confine è sicuro e che le sue emozioni non ti spaventano."}, {"id": "script_7", "moment": "Tuo figlio colpisce il fratello o la sorella", "instead": "«Non si picchia! Fila in camera tua!»", "tryText": "«Non ti lascerò picchiare. Vi allontano così siete tutti al sicuro. Sei un buon bambino che sta vivendo un momento molto difficile.»", "why": "Fermi il gesto con calma senza minacce e proteggi l’identità buona del bambino, facilitando la riparazione quando torna la calma."}, {"id": "script_8", "moment": "Un bambino sensibile e intenso esplode per una piccola cosa", "instead": "«Stai esagerando per niente.»", "tryText": "«Questa cosa ti è sembrata enorme. Sono qui con te.»", "why": "Nel pieno della tempesta emotiva troppe parole sovraccaricano ancora di più. Prima presenza calma, poi il confronto."}, {"id": "script_9", "moment": "Hai urlato e te ne penti", "instead": "Far finta di niente o dire «Ho urlato perché non ascoltavi».", "tryText": "«Ho ripensato a prima. Mi dispiace aver urlato. Non è stata colpa tua: tocca a me lavorarci su. Ti voglio bene.»", "why": "Assumersi la propria responsabilità senza incolpare il figlio protegge il suo valore e gli insegna come riparare gli errori."}], "principles": [{"title": "Separare il Bambino dal Comportamento", "body": "Un comportamento difficile segnala sovraccarico emotivo, non cattiveria. Mantieni tutti al sicuro guidando con calma e curiosità."}, {"title": "Mantenere il Limite e Validare l’Emozione", "body": "Puoi tenere fermo un confine accogliendo la delusione: \"Vorresti guardare ancora, e per oggi gli schermi sono finiti.\""}, {"title": "Guida Calma e Autorevole", "body": "Il tuo compito non è evitare ogni dispiacere, ma restare un punto fermo mentre tuo figlio impara ad attraversare la frustrazione."}, {"title": "La Sicurezza Nasce dalla Fiducia in Sé", "body": "La fiducia duratura nasce dalla riflessione interiore («Come ci sono riuscito?») e dal superare ostacoli graduali, non da lodi automatiche."}, {"title": "La Riparazione Conta Più della Perfezione", "body": "Ogni genitore perde la pazienza a volte. Tornare con calma, assumersi la propria parte senza incolpare il bambino e riconnettersi costruisce fiducia."}]}
  },
  de: {
    langCode: "de",
    langName: "Deutsch",
    darkModeBtnOff: "🌙 Dunkelmodus",
    darkModeBtnOn: "☀️ Hellmodus",
    darkModeToggleTitle: "Zwischen Dunkel- und Hellmodus wechseln",
    languageSwitcherLabel: "Sprachauswahl",
    languageSelectLabel: "Sprache wählen",
    languagePillsLabel: "Schnellauswahl Sprache",
    infographicEnterBtn: "📸 2-Min-Infografik-Ansicht",
    infographicExitBtn: "📸 Infografik-Ansicht beenden",
    expandAllScienceBtn: "🔬 Klinische Evidenz ausklappen",
    hideClinicalDetailsBtn: "🔬 Klinische Details ausblenden",
    headerViewFullGuideBtn: "📖 Gesamtleitfaden",
    headerFocusedTabsBtn: "🎯 Einzel-Tabs",
    showAllSectionsBtn: "Alle Abschnitte anzeigen",
    returnFocusedTabsBtn: "Zurück zu Einzel-Tabs",
    activePrefix: "Aktiv:",
    prevPrefix: "Zurück:",
    nextPrefix: "Weiter:",
    formatPagerIndicator: (cur, total, label) => `Tab ${cur} von ${total} • ${label}`,
    backToOverviewBtn: "← Zurück zu Tagesplan & Übersicht",
    jumpToChannelsBtn: "Weiter zu Schauen · Kanäle (28) →",
    fullHandbookModeLabel: "Vollständiges Handbuch • Alle 8 Tabs sichtbar",
    globalAgeLabel: "👶 Alter des Kindes:",
    globalAges: {"all": "Alle Alter", "under-2": "0–24 Mon.", "toddler": "2–3 J.", "preschool": "4–5 J.", "early-elementary": "6–7 J.", "middle-elementary": "8–9 J.", "preteen": "10–12 J."},
    sidebarBrandTitle: "Schauen • Spielen • Ernähren • Hören",
    sidebarBrandSub: "Oben ein Alter wählen oder direkt in ein Verzeichnis springen.",
    sidebarGroups: ["1. Startpunkt", "2. Kuratierte Tagesverzeichnisse", "3. Selbsttests & Klinische Evidenz", "4. Elternsprache & Co-Regulation"],
    sidebarNav: {"overview": {"title": "Tagesplan & 10 Regeln", "caption": "Kühlschrankblatt & 4 Säulen", "pill": "Start"}, "channels": {"title": "Schauen: Ruhige Kanäle", "caption": "Reizarme Video-Whitelist", "pill": "28"}, "games": {"title": "Spielen: Lernspiele", "caption": "Werbefreie Logik- & MINT-Spiele", "pill": "33"}, "nutrition": {"title": "Ernähren: Vollwertkost", "caption": "Brotdosen-Tausch & NFI-10", "pill": "32"}, "listen": {"title": "Hören & Lesen: Audio", "caption": "Podcasts, Yoto & Vorlesebücher", "pill": "26"}, "science": {"title": "Wissenschaft & Rechner", "caption": "SEM-10, NFI-10 & 30 Studien", "pill": "30 Studien"}, "lockdown": {"title": "Schutz-Anleitungen", "caption": "FOSS-Apps, OS- & DNS-Sperren", "pill": "13 Tools"}, "expert": {"title": "Sprechen: Selbstvertrauen", "caption": "Co-Regulation & Fachvorträge", "pill": "9 Sätze"}, "all": {"title": "Gesamtleitfaden / Drucken", "caption": "Alle Abschnitte auf einer Seite", "pill": "Alle"}},
    mobileBar: {"overview": "Plan", "channels": "Video", "games": "Spiel", "nutrition": "Essen", "listen": "Audio", "lockdown": "Schutz", "expert": "Sätze"},
    heroHeading: "Ruhiger, evidenzbasierter Medien-, Spiel-, Vollwert- & Audio-Kompass für Eltern",
    heroSubtitle: "Wählen Sie das Alter Ihres Kindes für einen sofortigen Tagesrhythmus oder entdecken Sie 119 geprüfte Angebote: reizarme Sendungen, konstruktivistische Spiele, Vollwert-Alternativen für die Brotdose sowie bildschirmfreie Podcasts und Bücher.",
    heroStats: ["Geprüfte ruhige Kanäle", "Pädagogisch empfohlene Spiele", "Vollwert-Lebensmittel & Tauschideen", "Bildschirmfreie Podcasts & Bücher", "Zwei 10-Punkte-Prüfraster", "Zitierte Studien & Gesetze"],
    blueprintSyncBtn: "🔗 Alle 4 Verzeichnisse auf dieses Alter filtern",
    blueprintReadBtn: "🔊 Tagesplan vorlesen",
    blueprintCopyBtn: "📋 Betreuungsplan kopieren",
    blueprintPrintBtn: "🖨️ Kühlschrank-Kurzblatt drucken",
    searchPlaceholders: {"channel": "Geprüfte Kanäle durchsuchen (z. B. Natur, MINT, Anlaute, Achtsamkeit)...", "game": "Lernspiele durchsuchen (z. B. Schach, Programmieren, DragonBox, Montessori)...", "food": "32 Vollwert-Lebensmittel & Tauschideen durchsuchen (z. B. Lachs, Eisen, DHA, farbstofffrei)...", "listen": "26 Podcasts, Hörkarten oder Bücher durchsuchen (z. B. Yoto, Brains On, Erstlesebücher)..."},
    viewChannelBtn: "Zum Kanal",
    visitGameBtn: "Zum Spiel / zur App",
    viewFoodRefBtn: "Klinische & Nährstoff-Referenz",
    viewListenRefBtn: "Hörprobe / Buchreferenz",
    drawerShowLabel: "🔬 + Wirkprinzip, Elternleitfaden & Quellen",
    drawerHideLabel: "🔬 − Klinische Details ausblenden",
    formatChannelsCount: (n) => (n === 1 ? "1 Kanal" : `${n} Kanäle`),
    formatGamesCount: (n) => (n === 1 ? "1 Spiel" : `${n} Spiele`),
    formatFoodsCount: (n) => (n === 1 ? "1 Vollwert-Lebensmittel oder Tausch" : `${n} Vollwert-Lebensmittel & Tauschideen`),
    formatListenCount: (n) => (n === 1 ? "1 Audio- oder Buchtipp" : `${n} Audio- & Buchtipps`),
    emptyChannelsTitle: "Keine Kanäle entsprechen Ihrer Suche.",
    emptyChannelsSub: "Bitte Altersfilter wechseln oder den Suchbegriff löschen.",
    emptyGamesTitle: "Keine Lernspiele entsprechen Ihrer Suche.",
    emptyGamesSub: "Bitte Alters-, Förderbereichs-, Ausstiegs- und Suchfilter zurücksetzen.",
    emptyFoodsTitle: "Keine Vollwert-Lebensmittel entsprechen Ihrer Suche.",
    emptyFoodsSub: "Bitte alle Lebensmittel wählen oder den Nährstofffilter zurücksetzen.",
    emptyListenTitle: "Keine Podcasts, Hörbücher oder Bücher gefunden.",
    emptyListenSub: "Bitte alle Formate wählen oder den Suchbegriff löschen.",
    tabs: {"overview": {"kicker": "Tab 1 von 8 • Startpunkt", "title": "Übersicht, Alters-Tagesplan & 10 zentrale Familienregeln", "sub": "Ruhiger Tagesrhythmus, druckbares 4-Säulen-Kühlschrankblatt und Entscheidungshilfe für Eltern.", "shortLabel": "Tagesplan & Übersicht"}, "science": {"kicker": "Tab 2 von 8 • Klinische Evidenz & Prüfraster", "title": "Klinische Forschung, 10-Punkte-Rechner (SEM-10 & NFI-10) & 30 Quellen", "sub": "Begutachtete Bildgebungsstudien, Entwicklungspsychologie, pädiatrische Ernährungsstudien und 60-Sekunden-Rechner.", "shortLabel": "Evidenz & Raster (30)"}, "channels": {"kicker": "Tab 3 von 8 • Säule 1 (Schauen)", "title": "Elterngeprüftes Verzeichnis reizarmer Videokanäle (28 Kanäle)", "sub": "Ruhige Kanäle nach dem SEM-10-Raster bewertet, inklusive 1-Klick-JSON/CSV-Whitelist-Export.", "shortLabel": "Schauen · Kanäle (28)"}, "games": {"kicker": "Tab 4 von 8 • Säule 2 (Spielen)", "title": "Pädagogisch geprüfte Kognitions- & Konstruktionsspiele (33 Spiele)", "sub": "Konstruktivistische Welten, Raumlogik-Rätsel und Montessori-Apps ohne Werbung und ohne Lootboxen.", "shortLabel": "Spielen · Spiele (33)"}, "nutrition": {"kicker": "Tab 5 von 8 • Säule 3 (Ernähren)", "title": "Kinderärztlich & ernährungsmedizinisch geprüfte Vollwertkost (32 Tauschideen)", "sub": "Echte NOVA-1-Lebensmittel statt hochverarbeiteter Kindersnacks, Quetschbeutel und synthetischer Farbstoffe.", "shortLabel": "Ernähren · Vollwert (32)"}, "listen": {"kicker": "Tab 6 von 8 • Säule 4 (Hören & Lesen)", "title": "Hören & Lesen: Bildschirmfreie Podcasts, Hörkarten & Bücher (26 Tipps)", "sub": "Wissens- und Erzählpodcasts, Yoto/Tonie-Hörkarten, lautgetreue Erstlesebücher und dialogisches Vorlesen.", "shortLabel": "Hören & Lesen (26)"}, "lockdown": {"kicker": "Tab 7 von 8 • Technischer Schutz", "title": "Open-Source-Kinderschutz & Schritt-für-Schritt-Geräte-/DNS-Sperren", "sub": "13 Open-Source-Architekturen sowie Schritte A–E für BrainRotGuard, KidTube, Family Link, Geführten Zugriff und NextDNS.", "shortLabel": "Geräte- & DNS-Schutz"}, "expert": {"kicker": "Tab 8 von 8 • Selbstvertrauen & Co-Regulation", "title": "Selbstvertrauen & Co-Regulation: Was Sie in schwierigen Momenten sagen können", "sub": "5 Prinzipien aus Bindungs- und Selbstvertrauensforschung, 9 „Sag lieber das“-Sätze, 7-Tage-Plan und 10 kostenlose Psychologie-Vorträge.", "shortLabel": "Elternsätze (9)"}, "all": {"kicker": "Vollständiges Handbuch • Alle 8 Tabs sichtbar", "title": "Komplettes SafeKids-Elternhandbuch (Alle Abschnitte)", "sub": "Alle 10 Empfehlungen, 30+ klinische Studien, 28 Kanäle, 33 Spiele, 32 Vollwert-Alternativen, 26 Hör-/Buchtipps und 5 Sperranleitungen.", "shortLabel": "Gesamtleitfaden (Alle)"}},
    blueprintStages: {"under-2": {"ageLabelShort": "Unter 2 J. (0–24 Mon.)", "directoryFilterAge": "toddler", "stageHeadline": "👶 Unter 2 Jahren (0–24 Monate) — 100 % Bildschirmfrei, Sensomotorik & Eisen/DHA", "stageSummary": "AAP (2016) & Kuhl (2003): Wegen des Video-Defizit-Effekts brauchen Kinder unter 24 Monaten echten Sprachdialog mit Bezugspersonen, freies Bodenspiel sowie eisen- und DHA-reiche Beikost.", "screenBudget": "0 Min./Tag passives Video (Nur Live-Videoanrufe mit der Familie laut AAP)", "sleepCutoff": "100 % dunkles, bildschirmfreies Schlafzimmer; 12–16 Std. Gesamtschlaf inkl. Tagschlaf", "mealRule": "Null zugesetzter Zucker & kein Honig (<12 Mon.); weiche Vollwertkost mit Eisen + DHA"}, "toddler": {"ageLabelShort": "Kleinkinder (2–3 J.)", "directoryFilterAge": "toddler", "stageHeadline": "🧸 Kleinkinder (2–3 Jahre) — Begleitetes ruhiges Schauen (SEM-10 ≤ 2/10) & Verschluckschutz", "stageSummary": "WHO (2019) & Lillard (2011): Bildschirmzeit unter 30–45 Min./Tag halten, immer gemeinsam am Wohnzimmer-TV, kombiniert mit geviertelten NOVA-1-Lebensmitteln.", "screenBudget": "≤ 30–45 Min./Tag (100 % gemeinsam mit Eltern am Familien-TV)", "sleepCutoff": "Bildschirme 60+ Min. vor Mittagsschlaf & Zubettgehen AUS (Melatoninschutz)", "mealRule": "100 % bildschirmfreier Esstisch; Trauben & Kirschtomaten längs vierteln; Nussmus dünn verstreichen"}, "preschool": {"ageLabelShort": "Vorschule (4–5 J.)", "directoryFilterAge": "preschool", "stageHeadline": "🎨 Vorschule (4–5 Jahre) — Exekutive Funktionen, Anlaute & Sensorische Esserfahrungen", "stageSummary": "Diamond (2013) & Hirsh-Pasek (2015): Impulskontrolle, Lautbewusstsein und Mengenverständnis durch ruhige Geschichten, taktile Lern-Apps und druckfreie Familienmahlzeiten stärken.", "screenBudget": "≤ 45–60 Min./Tag kuratiertes reizarmes TV oder begleitete Lern-App", "sleepCutoff": "Alle Bildschirme 60+ Min. vor dem Schlafen AUS (Vorleseritual am Abend)", "mealRule": "100 % bildschirmfreie Mahlzeiten; keine Azofarbstoffe (Allurarot Red 40 / E129, Tartrazin Yellow 5 / E102); ganzes Obst statt Quetschies"}, "early-elementary": {"ageLabelShort": "Grundschule Start (6–7 J.)", "directoryFilterAge": "early-elementary", "stageHeadline": "🚀 Frühe Grundschule (6–7 Jahre) — Praktisches MINT-Forschen, Raumlogik & Stabiler Blutzucker", "stageSummary": "Papert (1980) & Benton (2007): Vom passiven Schauen zu Zeichnen, Naturerkundung und Raumlogik-Rätseln wechseln; Brotdose mit niedriger glykämischer Last gegen das Konzentrationstief um 10:30 Uhr.", "screenBudget": "≤ 60 Min./Tag Freizeit-Bildschirm an Schultagen (Nur im Gemeinschaftsraum)", "sleepCutoff": "Geräte 60+ Min. vor dem Schlafen abschalten; keine Bildschirme im Kinderzimmer", "mealRule": "Frühstück + Brotdose mit niedriger GL (Hafer/Eier/Saaten) für 4 Std. Unterrichtsfokus"}, "middle-elementary": {"ageLabelShort": "Mittlere Grundschule (8–9 J.)", "directoryFilterAge": "middle-elementary", "stageHeadline": "🧩 Mittlere Grundschule (8–9 Jahre) — Kreatives Programmieren, Logik & Gehirn-Mikronährstoffe", "stageSummary": "Resnick (2017) & Asbell-Clarke (2012): Wachsende Selbstständigkeit in Scratch-Programmierung, Boolesche Logik und Konstruktionsspiele (mit sichtbarem 5-Min-Timer) lenken, ergänzt durch Eisen, Zink und DHA.", "screenBudget": "≤ 60–75 Min./Tag (Vorrang für kreatives Coding & kooperative Rätsel)", "sleepCutoff": "Alle Geräte 60+ Min. vor dem Lichtlöschen in der Küche parken (Chang et al., 2015)", "mealRule": "Bildschirmfreies Familienabendessen; Häm-/Linseneisen + Vitamin C & Meeresfisch-DHA 2–3x/Woche"}, "preteen": {"ageLabelShort": "Vorpubertät (10–12 J.)", "directoryFilterAge": "preteen", "stageHeadline": "🔭 Vorpubertät (10–12 Jahre) — Systemdenken, Knochenmineralisierung & Null Kurzvideo-Feeds", "stageSummary": "Nisan & Schocken (2005) & Weaver (2016): Algorithmische Kurzvideo-Feeds (Shorts/TikTok) und Lootbox-Spiele durch Orbitalphysik, CPU-Logik und Strategie ersetzen; Knochenaufbau mit Kalzium/D3/K2 stärken.", "screenBudget": "≤ 60–90 Min./Tag Freizeit (Null Endlos-Scroll-Feeds und null Chat)", "sleepCutoff": "Striktes Geräteende 60 Min. vor dem Schlafen; Ladegeräte über Nacht außerhalb des Zimmers", "mealRule": "Knochenaufbau mit D3 + K2 + Kalzium + präbiotischen Ballaststoffen; null Koffein/Energy-Drinks"}},
    expertTab: {"chirpListenBtn": "🔊 Vorlesen", "chirpStopBtn": "⏹ Stopp", "chirpReadPlanBtn": "🔊 Tagesplan vorlesen", "chirpVoiceLabel": "🎙️ Chirp 3 HD Stimme:", "entryKicker": "Neu • Selbstvertrauen & Co-Regulation", "entryTitle": "Was man sagt, um selbstbewusste Kinder zu stärken", "entrySub": "9 ruhige Sätze für herausfordernde Alltagsmomente – mit Chirp-3-HD-Vorlesefunktion und 10 kostenlosen Psychologie-Vorträgen.", "entryCta": "Öffnen →", "heading": "Was Sagen, Damit Kinder Selbstbewusst Aufwachsen", "badge": "10 geprüfte Videos", "lede": "Schwierige Momente sind völlig normal. Hier finden Sie kurze, ruhige Sätze, die Sie sofort im Alltag nutzen können.", "about": "Fundiert durch Bindungstheorie, Emotionscoaching-Forschung (Gottman) und Selbstbestimmungstheorie (Deci & Ryan), ergänzt durch kostenlose öffentliche Vorträge der klinischen Psychologin Dr. Becky Kennedy (TED, YouTube und Podcasts).", "disclaimer": "Rein informatives Bildungsangebot – keine Psychotherapie und keine medizinische oder klinische Beratung. SafeKids ist ein unabhängiger, nichtkommerzieller Leitfaden und steht in keiner Verbindung zu Dr. Becky Kennedy, Good Inside®, TED oder verlinkten Vortragenden. Good Inside® ist eine eingetragene Marke von Good Inside, Inc. und wird ausschließlich nominativ zur Kennzeichnung externer öffentlicher Videolinks genannt. Alle Sätze sind eigenständige SafeKids-Paraphrasen entwicklungspsychologischer Konzepte, keine wörtlichen Zitate (Links geprüft am 2026-11-07).", "pickerTitle": "Was passiert gerade?", "pickerSub": "Tippen Sie auf eine Situation oder auf Vorlesen, um den Satz mit Google Cloud Chirp 3 HD anzuhören.", "topics": {"confidence": "Selbstvertrauen stärken (4)", "frustration": "Grenze ruhig halten (2)", "big-feelings": "Große Gefühle (2)", "repair": "Nach eigenem Ausraster (1)", "all": "Alle zeigen (9)"}, "statusAll": "Alle {n} Sätze werden angezeigt.", "statusFiltered": "{shown} von {total} Sätzen werden angezeigt.", "insteadLabel": "Statt", "tryLabel": "Versuchen Sie", "copyBtn": "Satz kopieren", "copiedBtn": "Kopiert ✓", "whySummary": "Warum das wirkt", "principlesTitle": "Die 5 Grundideen hinter den Sätzen", "practiceTitle": "7-Tage-Praxis: jeden Tag ein kleiner Tausch", "practiceSub": "Kleine, wiederholte Formulierungswechsel wirken nachhaltiger als perfekte Vorsätze.", "videosTitle": "Empfohlene Vorträge: 10 kostenlose Psychologie-Videos", "videosSub": "Links öffnen YouTube in einem neuen Tab – ohne eingebettete Tracker.", "channelsTitle": "Externe Links zu öffentlichen Vorträgen & Kanälen", "channelsSub": "Externe Links zu den offiziellen Kanälen, auf denen die oben genannten Vorträge veröffentlicht sind. Drittplattformen erfordern ggf. eine Anmeldung.", "scripts": [{"id": "script_1", "moment": "Ihr Kind zeigt Ihnen ein Bild oder Bauwerk", "instead": "„Super gemacht! Du bist ein richtiger Künstler!“", "tryText": "„Erzähl mir davon. Wie bist du darauf gekommen, genau dort anzufangen?“", "why": "Eine neugierige Frage lenkt den Blick nach innen – Selbstvertrauen wächst aus eigenem Nachdenken statt aus Lob von außen."}, {"id": "script_2", "moment": "„Sie kann das viel besser als ich.“", "instead": "„Quatsch, du bist doch die Beste!“", "tryText": "„Es tut weh, wenn jemand in etwas besser ist, das dir wichtig ist. Das kenne ich auch. Und du bleibst trotzdem du – und bist genau richtig.“", "why": "Gefühle wegzureden lässt Kinder an ihrer Wahrnehmung zweifeln. Anerkennung zeigt: Neid darf sein, ohne den eigenen Wert zu verlieren."}, {"id": "script_3", "moment": "Bei Hausaufgaben oder einem Puzzle festgefahren und kurz vorm Aufgeben", "instead": "„Gib her, ich mach das schnell für dich.“", "tryText": "„Das ist wirklich knifflig. Ich bin direkt bei dir. Welchen kleinen Schritt könntest du als Nächstes probieren?“", "why": "Abnehmen nimmt genau das Ringen weg, aus dem Selbstvertrauen entsteht. Ruhig dabeibleiben schafft echte Erfolgserfahrung."}, {"id": "script_4", "moment": "Ihr älteres Kind ist vor einer Prüfung oder Sichtung nervös", "instead": "„Mach dir keine Sorgen, das klappt bestimmt!“", "tryText": "„Klar bist du aufgeregt – dir liegt viel daran. Aufgeregt sein und gut vorbereitet sein kann gleichzeitig stimmen.“", "why": "Bloßes Beschwichtigen lässt Nervosität wie ein Problem wirken. Beide Gefühle gleichzeitig zuzulassen zeigt, dass Aufregung normal ist und man trotzdem bereit sein kann."}, {"id": "script_5", "moment": "Die Bildschirmzeit ist vorbei und der Wutanfall beginnt", "instead": "„Hör auf zu weinen, es ist doch nur eine Serie!“", "tryText": "„Du würdest so gern weiterschauen. Aufhören fällt richtig schwer. Und für heute sind die Bildschirme aus. Du darfst sauer sein – ich bin hier.“", "why": "Die Grenze bleibt bestehen und das Gefühl darf da sein. Frustrationstoleranz wächst neben einem ruhigen Erwachsenen."}, {"id": "script_6", "moment": "Quengeln oder Betteln nach einem klaren „Nein“", "instead": "„Na gut, noch ein einziges – aber hör auf zu quengeln.“", "tryText": "„Die Antwort bleibt Nein. Es ist völlig okay, darüber wütend zu sein. Ich halte deine großen Gefühle aus.“", "why": "Ein warmes, standfestes Nein zeigt: Die Grenze ist verlässlich und Gefühle überfordern die Eltern nicht."}, {"id": "script_7", "moment": "Ihr Kind schlägt ein Geschwisterkind", "instead": "„Wir hauen nicht! Ab in dein Zimmer!“", "tryText": "„Ich lasse nicht zu, dass du haust. Ich gehe dazwischen, damit alle sicher sind. Du bist ein gutes Kind in einem richtig schweren Moment.“", "why": "Sie stoppen das Verhalten ruhig durch Handeln statt Drohen und schützen das Selbstbild als gutes Kind."}, {"id": "script_8", "moment": "Ein feinfühliges, gefühlsstarkes Kind explodiert wegen einer Kleinigkeit", "instead": "„Du übertreibst maßlos.“", "tryText": "„Das hat sich gerade riesig angefühlt. Ich bin bei dir.“", "why": "Mitten im Gefühlssturm überfordern viele Worte noch mehr. Erst ruhige Präsenz, Lösungen später."}, {"id": "script_9", "moment": "Sie haben geschrien und bereuen es", "instead": "So tun, als wäre nichts gewesen, oder sagen: „Ich habe geschrien, weil du nicht gehört hast.“", "tryText": "„Ich habe über vorhin nachgedacht. Es tut mir leid, dass ich geschrien habe. Das war nicht deine Schuld – daran arbeite ich. Ich hab dich lieb.“", "why": "Verantwortung ohne Schuldumkehr schützt den Selbstwert Ihres Kindes und lebt echte Wiedergutmachung vor."}], "principles": [{"title": "Kind und Verhalten voneinander trennen", "body": "Schwieriges Verhalten ist ein Signal für ein überlastetes Nervensystem, kein Beweis für ein „schlechtes“ Kind. Sorgen Sie ruhig für Sicherheit und blicken Sie hinter das Verhalten."}, {"title": "Grenze halten & Gefühl anerkennen", "body": "Sie können eine klare Grenze setzen und die Enttäuschung darüber erlauben: „Du möchtest gern weiterschauen, und für heute ist Schluss mit Bildschirmzeit.“"}, {"title": "Ruhige, verlässliche Führung", "body": "Ihre Aufgabe ist nicht, jeden Frust zu verhindern, sondern ruhig präsent zu bleiben, während Ihr Kind lernt, Enttäuschungen zu bewältigen."}, {"title": "Selbstvertrauen wächst aus Selbstvertrauen", "body": "Nachhaltiges Selbstvertrauen entsteht durch eigenes Nachdenken („Wie habe ich das gelöst?“) und bewältigte Herausforderungen statt pauschalem Lob."}, {"title": "Beziehungsreparatur schlägt Perfektion", "body": "Jedes Elternteil verliert einmal die Geduld. Ruhig zurückzukommen, den eigenen Anteil ohne Schuldzuweisung zu übernehmen und wieder Verbindung aufzunehmen stärkt sichere Bindung."}]}
  },
  ar: {
    langCode: "ar",
    langName: "العربية",
    darkModeBtnOff: "🌙 الوضع الداكن",
    darkModeBtnOn: "☀️ الوضع الفاتح",
    darkModeToggleTitle: "التبديل بين الوضع الداكن والفاتح",
    languageSwitcherLabel: "مبدّل اللغة",
    languageSelectLabel: "اختر اللغة",
    languagePillsLabel: "أزرار اللغة السريعة",
    infographicEnterBtn: "📸 عرض الملصقات (دقيقتان)",
    infographicExitBtn: "📸 إنهاء عرض الملصقات",
    expandAllScienceBtn: "🔬 عرض الأدلة السريرية",
    hideClinicalDetailsBtn: "🔬 إخفاء التفاصيل السريرية",
    headerViewFullGuideBtn: "📖 عرض الدليل الكامل",
    headerFocusedTabsBtn: "🎯 التبويبات المركّزة",
    showAllSectionsBtn: "إظهار جميع الأقسام",
    returnFocusedTabsBtn: "العودة للتبويبات المركّزة",
    activePrefix: "الحالي:",
    prevPrefix: "السابق:",
    nextPrefix: "التالي:",
    formatPagerIndicator: (cur, total, label) => `التبويب ${cur} من ${total} • ${label}`,
    backToOverviewBtn: "← العودة إلى الخطة اليومية والملخص",
    jumpToChannelsBtn: "الانتقال إلى المشاهدة · القنوات (28) →",
    fullHandbookModeLabel: "وضع الدليل الكامل • جميع التبويبات الـ 8 ظاهرة",
    globalAgeLabel: "👶 عمر الطفل:",
    globalAges: {"all": "كل الأعمار", "under-2": "0–24 شهراً", "toddler": "2–3 سنوات", "preschool": "4–5 سنوات", "early-elementary": "6–7 سنوات", "middle-elementary": "8–9 سنوات", "preteen": "10–12 سنة"},
    sidebarBrandTitle: "شاهد • العب • تغذَّ • استمع",
    sidebarBrandSub: "اختر عمر طفلك في الأعلى أو انتقل مباشرة إلى أي دليل بالأسفل.",
    sidebarGroups: ["1. ابدأ من هنا", "2. الأدلة اليومية المنتقاة", "3. أدوات التقييم والعلوم السريرية", "4. الحوار التربوي والتنظيم المشترك"],
    sidebarNav: {"overview": {"title": "الخطة اليومية و10 قواعد", "caption": "ملصق الثلاجة والمحاور الأربعة", "pill": "البداية"}, "channels": {"title": "شاهد: قنوات هادئة آمنة", "caption": "قائمة بيضاء منخفضة التحفيز", "pill": "28"}, "games": {"title": "العب: ألعاب تعليمية", "caption": "منطق وعلوم بلا إعلانات", "pill": "33"}, "nutrition": {"title": "تغذَّ: أطعمة طبيعية كاملة", "caption": "بدائل حقيبة الغداء وNFI-10", "pill": "32"}, "listen": {"title": "استمع واقرأ: صوتيات وكتب", "caption": "بودكاست، Yoto وكتب حية", "pill": "26"}, "science": {"title": "العلوم ومقاييس الفحص", "caption": "SEM-10 وNFI-10 و30 دراسة", "pill": "30 دراسة"}, "lockdown": {"title": "أدلة الحماية والإغلاق", "caption": "تطبيقات مفتوحة ونظام وDNS", "pill": "13 أداة"}, "expert": {"title": "حوار: عبارات الثقة", "caption": "تنظيم المشاعر ومحاضرات", "pill": "9 عبارات"}, "all": {"title": "الدليل الكامل / طباعة الكل", "caption": "عرض جميع الأقسام في صفحة واحدة", "pill": "الكل"}},
    mobileBar: {"overview": "الخطة", "channels": "شاهد", "games": "العب", "nutrition": "غذاء", "listen": "صوتيات", "lockdown": "حماية", "expert": "عبارات"},
    heroHeading: "بوابة هادئة قائمة على الأدلة العلمية للإعلام واللعب والتغذية الطبيعية والصوتيات للوالدين",
    heroSubtitle: "اختر عمر طفلك للحصول على روتين يومي فوري، أو تصفّح 119 مورداً منتقى: قنوات منخفضة التحفيز، ألعاب بنائية، بدائل غذائية طبيعية، وبودكاست وكتب بلا شاشات.",
    heroStats: ["قناة هادئة منتقاة", "لعبة معتمدة تربوياً", "غذاءً كاملاً وبديلاً صحياً", "صوتية وكتاباً بلا شاشة", "مقياسان من 10 نقاط", "دراسة وتشريعاً موثقاً"],
    blueprintSyncBtn: "🔗 مزامنة الأدلة الأربعة مع هذا العمر",
    blueprintReadBtn: "🔊 قراءة الخطة اليومية",
    blueprintCopyBtn: "📋 نسخ خطة مقدم الرعاية",
    blueprintPrintBtn: "🖨️ طباعة ملصق الثلاجة السريع",
    searchPlaceholders: {"channel": "ابحث في القنوات المعتمدة (مثل: الطبيعة، العلوم، الصوتيات، الهدوء)...", "game": "ابحث في الألعاب التعليمية (مثل: الشطرنج، البرمجة، الهندسة المكانية، مونتيسوري)...", "food": "ابحث في 32 غذاءً طبيعياً وبديلاً (مثل: السلمون، الحديد، DHA، بدون ألوان صناعية)...", "listen": "ابحث في الصوتيات والكتب (مثل: Yoto، بودكاست علمي، القراءة الصوتية، القصص)..."},
    viewChannelBtn: "زيارة القناة الرسمية",
    visitGameBtn: "زيارة اللعبة / التطبيق",
    viewFoodRefBtn: "عرض المرجع السريري والغذائي",
    viewListenRefBtn: "استماع / عرض مرجع الكتاب",
    drawerShowLabel: "🔬 + لماذا ينجح، دليل الوالدين والمراجع",
    drawerHideLabel: "🔬 − إخفاء التفاصيل السريرية والدليل",
    formatChannelsCount: (n) => (n === 1 ? "قناة واحدة (1)" : `${n} قناة`),
    formatGamesCount: (n) => (n === 1 ? "لعبة واحدة (1)" : `${n} لعبة`),
    formatFoodsCount: (n) => (n === 1 ? "غذاء طبيعي أو بديل واحد (1)" : `${n} غذاءً طبيعياً وبديلاً`),
    formatListenCount: (n) => (n === 1 ? "اختيار صوتي أو كتاب واحد (1)" : `${n} اختياراً صوتياً وكتاباً`),
    emptyChannelsTitle: "لا توجد قنوات تطابق بحثك.",
    emptyChannelsSub: "جرّب تغيير فلتر العمر أو مسح كلمة البحث.",
    emptyGamesTitle: "لا توجد ألعاب تعليمية تطابق بحثك.",
    emptyGamesSub: "جرّب مسح فلاتر العمر والمجال وإشارة التوقف والبحث.",
    emptyFoodsTitle: "لا توجد أطعمة طبيعية أو بدائل تطابق بحثك.",
    emptyFoodsSub: "جرّب اختيار كل الأطعمة أو مسح الفلتر الغذائي.",
    emptyListenTitle: "لا توجد حلقات بودكاست أو كتب صوتية تطابق بحثك.",
    emptyListenSub: "جرّب اختيار جميع الصيغ أو مسح البحث.",
    tabs: {"overview": {"kicker": "التبويب 1 من 8 • ابدأ من هنا", "title": "نظرة عامة، الخطة اليومية حسب العمر و10 توصيات أساسية للأسرة", "sub": "روتين يومي هادئ، ملصق ثلاجة قابل للطباعة من 4 محاور، وإطار عملي للوالدين.", "shortLabel": "الخطة اليومية والملخص"}, "science": {"kicker": "التبويب 2 من 8 • الأدلة السريرية والمقاييس", "title": "العلوم السريرية، مقياسا الفحص من 10 نقاط (SEM-10 وNFI-10) و30 مرجعاً", "sub": "تصوير عصبي محكّم، علم نفس النمو، تجارب تغذية الأطفال، وحاسبات تقييم في 60 ثانية.", "shortLabel": "العلوم والمقاييس (30)"}, "channels": {"kicker": "التبويب 3 من 8 • المحور 1 (شاهد)", "title": "دليل القنوات الهادئة منخفضة التحفيز المعتمدة من الوالدين (28 قناة)", "sub": "قنوات فيديو هادئة مقيّمة بمقياس SEM-10 مع تصدير القائمة البيضاء بصيغة JSON/CSV.", "shortLabel": "شاهد · القنوات (28)"}, "games": {"kicker": "التبويب 4 من 8 • المحور 2 (العب)", "title": "دليل الألعاب المعرفية والتطبيقات المعتمدة من التربويين (33 لعبة)", "sub": "بيئات بنائية وألغاز مكانية وتطبيقات مونتيسوري بلا إعلانات وبلا صناديق حظ.", "shortLabel": "العب · الألعاب (33)"}, "nutrition": {"kicker": "التبويب 5 من 8 • المحور 3 (تغذَّ)", "title": "الأطعمة الطبيعية الكاملة وبدائل حقيبة الغداء المعتمدة طبياً (32 بديلاً)", "sub": "بدائل طبيعية من الفئة NOVA-1 تحلّ محل الوجبات فائقة التصنيع وأكياس الهريس والألوان الصناعية.", "shortLabel": "تغذَّ · الأطعمة (32)"}, "listen": {"kicker": "التبويب 6 من 8 • المحور 4 (استمع واقرأ)", "title": "استمع واقرأ: صوتيات بلا شاشة وبودكاست وكتب حية (26 اختياراً)", "sub": "بودكاست علوم وحكايات، بطاقات Yoto/Tonie الصوتية، كتب صوتيات منهجية وقراءة حوارية.", "shortLabel": "استمع واقرأ (26)"}, "lockdown": {"kicker": "التبويب 7 من 8 • الحماية التقنية", "title": "أدوات الرقابة الأبوية مفتوحة المصدر وأدلة قفل الأجهزة وشبكة DNS", "sub": "مقارنة 13 أداة مفتوحة المصدر مع الخطوات A–E لإعداد BrainRotGuard وKidTube وFamily Link والوصول الموجّه وNextDNS.", "shortLabel": "قفل الأجهزة وDNS"}, "expert": {"kicker": "التبويب 8 من 8 • الثقة والتنظيم المشترك للمشاعر", "title": "عبارات الثقة والتنظيم المشترك: ماذا تقول لطفلك في اللحظات الصعبة", "sub": "5 مبادئ من علم التعلق والثقة الذاتية، و9 عبارات «قل هذا بدلاً من ذلك»، وخطة تدريب لـ 7 أيام، و10 محاضرات مجانية في علم النفس.", "shortLabel": "عبارات الثقة (9)"}, "all": {"kicker": "وضع الدليل الكامل • جميع التبويبات الـ 8 ظاهرة", "title": "المرجع الكامل لبوابة SafeKids للوالدين (جميع الأقسام)", "sub": "يعرض التوصيات الـ 10، وأكثر من 30 دراسة سريرية، و28 قناة، و33 لعبة، و32 بديلاً غذائياً، و26 مادة صوتية/كتاباً، و5 أدلة حماية.", "shortLabel": "الدليل الكامل (الكل)"}},
    blueprintStages: {"under-2": {"ageLabelShort": "أقل من سنتين (0–24 شهراً)", "directoryFilterAge": "toddler", "stageHeadline": "👶 أقل من سنتين (0–24 شهراً) — 100% بلا شاشات، تأسيس حسي حركي وحديد/DHA", "stageSummary": "الأكاديمية الأمريكية لطب الأطفال AAP (2016) وKuhl (2003): بسبب ضعف التعلّم من الفيديو قبل عمر 24 شهراً، يحتاج الرضيع إلى تفاعل صوتي حي مع الوالدين ولعب أرضي وأغذية غنية بالحديد وDHA.", "screenBudget": "0 دقيقة/يوم من الفيديو السلبي (مكالمات الفيديو العائلية الحية فقط حسب AAP)", "sleepCutoff": "غرفة مظلمة 100% خالية من الشاشات؛ 12–16 ساعة نوم إجمالي مع القيلولة", "mealRule": "صفر سكر مضاف وصفر عسل (<12 شهراً)؛ أطعمة طبيعية طرية غنية بالحديد + DHA"}, "toddler": {"ageLabelShort": "الصغار (2–3 سنوات)", "directoryFilterAge": "toddler", "stageHeadline": "🧸 الصغار (2–3 سنوات) — مشاهدة مشتركة بطيئة الإيقاع (SEM-10 ≤ 2/10) وأمان من الاختناق", "stageSummary": "منظمة الصحة العالمية (2019) وLillard (2011): إبقاء الشاشة ضمن 30–45 دقيقة/يوم بمشاهدة مشتركة على تلفاز الصالة، مع أطعمة NOVA-1 مقطّعة إلى أرباع.", "screenBudget": "≤ 30–45 دقيقة/يوم (مشاهدة مشتركة 100% مع الوالدين على التلفاز)", "sleepCutoff": "إيقاف الشاشات قبل القيلولة والنوم بـ 60+ دقيقة (حماية الميلاتونين)", "mealRule": "مائدة خالية من الشاشات 100%؛ تقطيع العنب والطماطم الكرزية طولياً إلى أرباع (4 أجزاء)؛ فرد زبدة المكسرات بطبقة رقيقة"}, "preschool": {"ageLabelShort": "ما قبل المدرسة (4–5 سنوات)", "directoryFilterAge": "preschool", "stageHeadline": "🎨 ما قبل المدرسة (4–5 سنوات) — الوظائف التنفيذية، الصوتيات وجسور التذوق الحسية", "stageSummary": "Diamond (2013) وHirsh-Pasek (2015): تنمية ضبط النفس والوعي الصوتي والحس العددي عبر قصص هادئة وتطبيقات لمسية ووجبات عائلية بلا ضغط.", "screenBudget": "≤ 45–60 دقيقة/يوم من تلفاز منخفض التحفيز أو تطبيق تعليمي موجّه", "sleepCutoff": "إيقاف جميع الشاشات قبل النوم بـ 60+ دقيقة (روتين قراءة بصوت عالٍ)", "mealRule": "وجبات بلا شاشات 100%؛ صفر ألوان صناعية (الأحمر 40 / الأصفر 5؛ E129 / E102)؛ فاكهة كاملة بدلاً من أكياس الهريس"}, "early-elementary": {"ageLabelShort": "بداية الابتدائي (6–7 سنوات)", "directoryFilterAge": "early-elementary", "stageHeadline": "🚀 بداية الابتدائي (6–7 سنوات) — استكشاف علمي يدوي، منطق مكاني وسكر دم مستقر", "stageSummary": "Papert (1980) وBenton (2007): الانتقال من المشاهدة السلبية إلى الرسم واستكشاف الطبيعة وألغاز المنطق المكاني، مع فطور وحقيبة غداء منخفضَي الحمل الجلايسيمي لمنع هبوط التركيز الساعة 10:30 صباحاً.", "screenBudget": "≤ 60 دقيقة/يوم ترفيهي في أيام الدراسة (في غرفة المعيشة فقط)", "sleepCutoff": "إغلاق الأجهزة قبل النوم بـ 60+ دقيقة؛ صفر شاشات في غرف النوم", "mealRule": "فطور وغداء منخفضا الحمل الجلايسيمي (شوفان/بيض/بذور) لتركيز صفي يدوم 4 ساعات"}, "middle-elementary": {"ageLabelShort": "وسط الابتدائي (8–9 سنوات)", "directoryFilterAge": "middle-elementary", "stageHeadline": "🧩 وسط الابتدائي (8–9 سنوات) — برمجة بنائية، رياضيات استنتاجية وتغذية عصبية", "stageSummary": "Resnick (2017) وAsbell-Clarke (2012): توجيه الاستقلالية نحو برمجة Scratch والمنطق البولياني والهندسة (مع مؤقّت بصري لـ 5 دقائق) مع الحديد والزنك وDHA البحري.", "screenBudget": "≤ 60–75 دقيقة/يوم (الأولوية للبرمجة الإبداعية والألغاز التعاونية)", "sleepCutoff": "شحن جميع الأجهزة في المطبخ قبل إطفاء الأنوار بـ 60+ دقيقة (Chang et al., 2015)", "mealRule": "عشاء عائلي بلا شاشات؛ حديد الهيم/العدس + فيتامين C وDHA بحري 2–3 مرات أسبوعياً"}, "preteen": {"ageLabelShort": "ما قبل المراهقة (10–12 سنة)", "directoryFilterAge": "preteen", "stageHeadline": "🔭 ما قبل المراهقة (10–12 سنة) — تفكير منظومي، ذروة بناء العظام وصفر خلاصات خوارزمية", "stageSummary": "Nisan & Schocken (2005) وWeaver (2016): استبدال المقاطع القصيرة الخوارزمية (Shorts/TikTok) وصناديق الحظ بفيزياء المدارات وهندسة المعالجات والاستراتيجية العميقة، مع الكالسيوم وD3 وK2.", "screenBudget": "≤ 60–90 دقيقة/يوم ترفيهي (صفر تمرير لا نهائي وصفر دردشة)", "sleepCutoff": "حظر صارم قبل النوم بـ 60 دقيقة؛ إبقاء الشواحن خارج غرف النوم ليلاً", "mealRule": "ذروة الكتلة العظمية بـ D3 + K2 + الكالسيوم + الألياف الحيوية؛ صفر كافيين أو مشروبات طاقة"}},
    expertTab: {"chirpListenBtn": "🔊 استماع", "chirpStopBtn": "⏹ إيقاف", "chirpReadPlanBtn": "🔊 قراءة الخطة اليومية", "chirpVoiceLabel": "🎙️ صوت Chirp 3 HD:", "entryKicker": "جديد • الثقة والتنظيم المشترك", "entryTitle": "ماذا تقول لتنشئة أطفال واثقين بأنفسهم", "entrySub": "9 عبارات هادئة للمواقف اليومية الصعبة مع قراءة صوتية عبر Chirp 3 HD و10 محاضرات مجانية في علم النفس السريري.", "entryCta": "افتح ←", "heading": "ماذا تقول لتربّي أطفالاً واثقين بأنفسهم", "badge": "10 فيديوهات موثّقة", "lede": "اللحظات الصعبة في التربية أمر طبيعي. إليك عبارات قصيرة وهادئة يمكنك استخدامها اليوم.", "about": "يستند هذا القسم إلى نظرية التعلق وأبحاث التوجيه العاطفي (Gottman) ونظرية تقرير المصير (Deci & Ryan)، مع روابط لمحاضرات عامة مجانية للأخصائية النفسية السريرية د. بيكي كينيدي عبر TED وYouTube والبودكاست.", "disclaimer": "مورد تعليمي فقط — لا يُعد علاجاً نفسياً ولا استشارة طبية أو سريرية. بوابة SafeKids دليل مستقل غير ربحي وغير تابع أو مدعوم أو معتمد من د. بيكي كينيدي أو Good Inside® أو TED أو أي متحدث مشار إليه. تُعد Good Inside® علامة تجارية مسجلة لشركة Good Inside, Inc. وتُذكر اسمياً فقط للإشارة إلى روابط الفيديو العامة الخارجية. جميع العبارات أدناه صياغات إرشادية أصلية من إعداد SafeKids مستندة إلى علم نفس النمو وليست اقتباسات حرفية (تم التحقق من الروابط في 2026-11-07).", "pickerTitle": "ما الذي يحدث الآن؟", "pickerSub": "اختر الموقف لمعرفة ما يُقال، أو اضغط على «استماع» لسماع العبارة بصوت Google Cloud Chirp 3 HD.", "topics": {"confidence": "بناء الثقة بالنفس (4)", "frustration": "تثبيت الحدود بهدوء (2)", "big-feelings": "المشاعر الكبيرة (2)", "repair": "الإصلاح بعد الغضب (1)", "all": "عرض الكل (9)"}, "statusAll": "عرض جميع العبارات ({n}).", "statusFiltered": "عرض {shown} من أصل {total} عبارات.", "insteadLabel": "بدلاً من قول", "tryLabel": "جرّب أن تقول", "copyBtn": "نسخ العبارة", "copiedBtn": "تم النسخ ✓", "whySummary": "لماذا تنجح هذه العبارة؟", "principlesTitle": "الأفكار الخمس الكبرى وراء هذه العبارات", "practiceTitle": "جرّبها لمدة أسبوع: تبديل بسيط كل يوم", "practiceSub": "التغييرات الصغيرة المتكررة أعمق أثراً من محاولة المثالية دفعة واحدة.", "videosTitle": "مشاهدات مقترحة: 10 محاضرات مجانية في علم النفس", "videosSub": "تُفتح الروابط في تبويب جديد على YouTube دون تحميل أي أدوات تتبّع مسبقة.", "channelsTitle": "روابط خارجية للمحاضرات والقنوات العامة", "channelsSub": "روابط خارجية للقنوات الرسمية التي تستضيف المحاضرات العامة المذكورة أعلاه. قد تطلب بعض المنصات تسجيل الدخول.", "scripts": [{"id": "script_1", "moment": "يريك طفلك رسماً أو عملاً يدوياً أنجزه", "instead": "«أحسنت! أنت فنان عبقري!»", "tryText": "«حدّثني عن رسمتك، كيف قررت من أين تبدأ؟»", "why": "السؤال الفضولي يوجّه انتباه الطفل إلى تفكيره الداخلي، فتُبنى ثقته على جهده وقراره لا على انتظار المديح الخارجي."}, {"id": "script_2", "moment": "«إنها أبرع مني بكثير في هذا الأمر.»", "instead": "«مستحيل، أنت الأفضل بين الجميع!»", "tryText": "«يؤلمنا فعلاً أن يتفوّق غيرنا في شيء نهتم به. شعرتُ بذلك من قبل أيضاً. ومع ذلك تبقى أنت نفسك، وأنت بخير كما أنت.»", "why": "إنكار الشعور يعلّم الطفل التشكيك في إحساسه، أما تسميته فتُظهر له أنه يستطيع الشعور بالغيرة مع بقاء قيمته محفوظة."}, {"id": "script_3", "moment": "يتعثر في واجب أو أحجية ويريد الاستسلام", "instead": "«هاتها، دعني أحلّها عنك.»", "tryText": "«هذه المسألة صعبة حقاً. أنا بجانبك هنا. ما الخطوة الصغيرة التي يمكنك تجربتها الآن؟»", "why": "التدخل لحل المشكلة يحرمه من المحاولة التي تصنع الثقة؛ أما البقاء بقربه بهدوء فيمنحه رصيداً حقيقياً في تجاوز الصعاب."}, {"id": "script_4", "moment": "يشعر طفلك بالتوتر قبل اختبار أو تجربة أداء", "instead": "«لا تقلق أبداً، ستبدع بالتأكيد!»", "tryText": "«طبيعي جداً أن تتوتر لأن هذا الأمر يهمّك. يمكن أن تكون متوتراً ومستعداً في الوقت نفسه.»", "why": "التطمين السريع قد يجعل التوتر يبدو وكأنه مشكلة. أما جمع الشعورين معاً فيُطمئن الطفل أن القلق طبيعي ولا يمنعه من الاستعداد والنجاح."}, {"id": "script_5", "moment": "انتهى وقت الشاشة وبدأ البكاء والغضب", "instead": "«توقّف عن البكاء، إنه مجرد كرتون!»", "tryText": "«كنتَ تتمنى متابعة المشاهدة، ومن الصعب جداً التوقف. وقد انتهى وقت الشاشات لليوم. يحق لك أن تغضب، وأنا هنا بجانبك.»", "why": "يبقى الحد ثابتاً مع السماح بالمشاعر؛ هكذا تنمو قدرة تحمّل الإحباط بجوار بالغ هادئ."}, {"id": "script_6", "moment": "الإلحاح والتذمّر بعد سماع كلمة «لا»", "instead": "«حسناً، مرة أخيرة فقط ولكن توقف عن التذمر.»", "tryText": "«الجواب ما زال لا. لا بأس أن تغضب بسبب ذلك، فأنا قادر على استيعاب مشاعرك الكبيرة.»", "why": "كلمة «لا» الدافئة والثابتة تثبت للطفل أن الحدود آمنة وأن مشاعره لا تُربك والديه."}, {"id": "script_7", "moment": "يضرب طفلك أخاه أو أخته", "instead": "«ممنوع الضرب! اذهب إلى غرفتك فوراً!»", "tryText": "«لن أسمح لك بالضرب. سأُبعدك الآن ليبقى الجميع بأمان. أنت طفل طيب يمرّ بلحظة صعبة جداً.»", "why": "تُوقف السلوك بهدوء دون تهديد مع الحفاظ على صورته كطفل طيب، مما يسهّل الإصلاح بعد هدوء الجميع."}, {"id": "script_8", "moment": "طفل حساس وعميق الانفعال ينفجر بسبب أمر بسيط", "instead": "«أنت تبالغ كثيراً بلا سبب.»", "tryText": "«بدا ذلك كبيراً جداً عليك. أنا هنا معك.»", "why": "أثناء العاصفة العاطفية تزيد كثرة الكلام من إرهاق الجهاز العصبي؛ الحضور الهادئ أولاً، والنقاش لاحقاً."}, {"id": "script_9", "moment": "صرختَ في وجه طفلك وندمت بعدها", "instead": "التظاهر بأن شيئاً لم يحدث، أو قول «صرختُ لأنك لم تسمع الكلام».", "tryText": "«كنتُ أفكر فيما حدث قبل قليل. أنا آسف لأنني صرخت. لم يكن ذلك خطأك أبداً، بل مسؤوليتي أنا أن أدرّب نفسي على الهدوء. أنا أحبك.»", "why": "تحمُّل الوالد لمسؤوليته دون لوم الطفل يحمي ثقته بنفسه ويعلّمه عملياً كيف يصلح أخطاءه."}], "principles": [{"title": "الفصل بين قيمة الطفل وسلوكه", "body": "السلوك الصعب إشارة إلى جهاز عصبي مرهق وليس دليلاً على طفل سيئ. حافظ على سلامة الجميع بهدوء وفضول لفهم السبب الكامن."}, {"title": "الثبات على الحد وتقبّل الشعور", "body": "يمكنك الحفاظ على حد واضح مع السماح بمشاعر الإحباط: «أعلم أنك تتمنى المتابعة، وقد انتهى وقت الشاشات لليوم.»"}, {"title": "قيادة هادئة ومتزنة", "body": "مهمتك ليست منع كل انزعاج، بل البقاء هادئاً وثابتاً بينما يتعلم طفلك أنه قادر على تجاوز الإحباط."}, {"title": "الثقة الحقيقية تنبع من الثقة بالنفس", "body": "تنمو الثقة المستدامة من التأمل الداخلي («كيف توصلت إلى ذلك؟») وتجاوز التحديات المناسبة، لا من المدح التلقائي المستمر."}, {"title": "إصلاح العلاقة أهم من المثالية", "body": "كل والد يفقد أعصابه أحياناً. العودة بهدوء وتحمّل مسؤوليتك دون لوم الطفل يعززان الأمان العاطفي وتحمّل المسؤولية."}]}
  }
};

function getPortalI18n() {
  const lang = ALLOWED_LANGUAGES.has(currentLanguage) ? currentLanguage : 'en';
  return PORTAL_I18N[lang] || PORTAL_I18N.en;
}

function updateDarkModeButtonLabel() {
  const btn = document.getElementById('btn-toggle-dark-mode');
  if (!btn) return;
  const i18n = getPortalI18n();
  const isDark = currentTheme === 'dark';
  // The visible label names the action ("Light Mode" while dark is on), so the button must not
  // also expose aria-pressed: screen readers would announce "Light Mode, pressed" during dark mode.
  btn.textContent = isDark ? i18n.darkModeBtnOn : i18n.darkModeBtnOff;
  if (i18n.darkModeToggleTitle) btn.setAttribute('title', i18n.darkModeToggleTitle);
  if (isDark) {
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
}

function applyPortalTheme(rawTheme, opts) {
  const options = opts && typeof opts === 'object' ? opts : {};
  const theme = ALLOWED_THEMES.has(rawTheme) ? rawTheme : 'light';
  currentTheme = theme;

  if (options.persist !== false) {
    writePersistedFilter(STORAGE_KEYS.THEME, theme, ALLOWED_THEMES);
  }

  if (document.documentElement && typeof document.documentElement.setAttribute === 'function') {
    document.documentElement.setAttribute('data-theme', theme);
  }
  if (document.body && document.body.classList) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  updateDarkModeButtonLabel();
}

function setupDarkModeToggle() {
  const initialTheme = readPersistedFilter(STORAGE_KEYS.THEME, ALLOWED_THEMES, 'light');
  applyPortalTheme(initialTheme, { persist: false });

  const btn = document.getElementById('btn-toggle-dark-mode');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyPortalTheme(nextTheme, { persist: true });
    if (window.trackSafeKidsEvent) {
      window.trackSafeKidsEvent('toggle_dark_mode', { theme: currentTheme });
    }
  });
}

// BCP 47 tags for <html lang>: the zh dictionary is Simplified Chinese, so tag it zh-Hans
// (drives Han glyph selection and screen-reader voice choice).
const HTML_LANG_TAGS = {
  en: 'en',
  es: 'es',
  zh: 'zh-Hans',
  yue: 'yue-Hant-HK',
  ja: 'ja',
  ko: 'ko',
  pt: 'pt',
  fr: 'fr',
  it: 'it',
  de: 'de',
  ar: 'ar'
};

function setDocumentLanguageTag(lang) {
  const validLang = ALLOWED_LANGUAGES.has(lang) ? lang : 'en';
  if (document.documentElement && typeof document.documentElement.setAttribute === 'function') {
    document.documentElement.setAttribute('lang', HTML_LANG_TAGS[validLang] || 'en');
    document.documentElement.setAttribute('dir', validLang === 'ar' ? 'rtl' : 'ltr');
  }
  if (document.body && document.body.classList) {
    if (validLang === 'ar') {
      document.body.classList.add('rtl-mode');
    } else {
      document.body.classList.remove('rtl-mode');
    }
  }
}

function applyLanguageSwitcherLabels(i18n) {
  const switcher = document.getElementById('language-switcher');
  if (switcher && i18n.languageSwitcherLabel) switcher.setAttribute('aria-label', i18n.languageSwitcherLabel);
  const selectEl = document.getElementById('language-select');
  if (selectEl && i18n.languageSelectLabel) selectEl.setAttribute('aria-label', i18n.languageSelectLabel);
  const pillGroup = document.querySelector('.language-pill-group');
  if (pillGroup && i18n.languagePillsLabel) pillGroup.setAttribute('aria-label', i18n.languagePillsLabel);
}

function syncLanguageControls(lang) {
  const selectEl = document.getElementById('language-select');
  if (selectEl) {
    selectEl.value = lang;
  }
  const langBtns = document.querySelectorAll('.lang-switch-btn');
  langBtns.forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}

function applyPortalLanguage(rawLang, opts) {
  const options = opts && typeof opts === 'object' ? opts : {};
  const lang = ALLOWED_LANGUAGES.has(rawLang) ? rawLang : 'en';
  currentLanguage = lang;

  if (options.persist !== false) {
    writePersistedFilter(STORAGE_KEYS.LANGUAGE, lang, ALLOWED_LANGUAGES);
  }

  setDocumentLanguageTag(lang);
  syncLanguageControls(lang);

  const i18n = getPortalI18n();
  applyLanguageSwitcherLabels(i18n);

  // 1. Update Header Action Buttons & Global Age Bar
  updateDarkModeButtonLabel();

  const infoBtn = document.getElementById('btn-toggle-infographic-mode');
  if (infoBtn) {
    infoBtn.textContent = infographicQuickModeActive ? i18n.infographicExitBtn : i18n.infographicEnterBtn;
  }

  const clinBtn = document.getElementById('btn-toggle-clinical-details');
  if (clinBtn) {
    clinBtn.textContent = expandAllClinicalDrawers ? i18n.hideClinicalDetailsBtn : i18n.expandAllScienceBtn;
  }

  const ageLabelEl = document.querySelector('#global-age-bar .global-age-label');
  if (ageLabelEl && i18n.globalAgeLabel) {
    ageLabelEl.textContent = i18n.globalAgeLabel;
  }

  const globalAgeBtns = document.querySelectorAll('#global-age-bar .global-age-btn');
  globalAgeBtns.forEach(btn => {
    const ageKey = btn.getAttribute('data-global-age');
    if (ageKey && i18n.globalAges && i18n.globalAges[ageKey]) {
      btn.textContent = i18n.globalAges[ageKey];
    }
  });

  // 2. Update Left Sidebar Navigation & Mobile Bottom Bar
  const sbBrandTitle = document.querySelector('.sidebar-brand-title');
  if (sbBrandTitle && i18n.sidebarBrandTitle) sbBrandTitle.textContent = i18n.sidebarBrandTitle;
  const sbBrandSub = document.querySelector('.sidebar-brand-sub');
  if (sbBrandSub && i18n.sidebarBrandSub) sbBrandSub.textContent = i18n.sidebarBrandSub;

  const sbGroupLabels = document.querySelectorAll('.sidebar-group > .sidebar-group-label');
  sbGroupLabels.forEach((el, idx) => {
    if (i18n.sidebarGroups && i18n.sidebarGroups[idx]) {
      el.textContent = i18n.sidebarGroups[idx];
    }
  });

  const sbNavBtns = document.querySelectorAll('.sidebar-nav-btn');
  sbNavBtns.forEach(btn => {
    const tabKey = btn.getAttribute('data-tab');
    const navMeta = i18n.sidebarNav && i18n.sidebarNav[tabKey];
    if (!navMeta || typeof btn.querySelector !== 'function') return;
    const tEl = btn.querySelector('.sidebar-nav-title');
    const cEl = btn.querySelector('.sidebar-nav-caption');
    const pEl = btn.querySelector('.sidebar-count-pill');
    if (tEl && navMeta.title) tEl.textContent = navMeta.title;
    if (cEl && navMeta.caption) cEl.textContent = navMeta.caption;
    if (pEl && navMeta.pill) pEl.textContent = navMeta.pill;
  });

  const mobileBtns = document.querySelectorAll('.mobile-pillar-btn');
  mobileBtns.forEach(btn => {
    if (typeof btn.querySelector !== 'function') return;
    const tabKey = btn.getAttribute('data-tab');
    const txtEl = btn.querySelector('.mobile-pillar-text');
    if (txtEl && i18n.mobileBar && i18n.mobileBar[tabKey]) {
      txtEl.textContent = i18n.mobileBar[tabKey];
    }
  });

  // 3. Update Hero Heading, Subtitle & Stat Labels
  const heroH2 = document.querySelector('.hero h2');
  if (heroH2 && i18n.heroHeading) heroH2.textContent = i18n.heroHeading;
  const heroP = document.querySelector('.hero .hero-content > p');
  if (heroP && i18n.heroSubtitle) heroP.textContent = i18n.heroSubtitle;

  const statLabels = document.querySelectorAll('.hero-stats .stat-label');
  statLabels.forEach((el, idx) => {
    if (i18n.heroStats && i18n.heroStats[idx]) {
      el.textContent = i18n.heroStats[idx];
    }
  });

  stopSafeKidsSpeech();

  // 4. Update Blueprint Action Buttons & Search Placeholders
  const btnSync = document.getElementById('btn-sync-age-directories');
  if (btnSync && i18n.blueprintSyncBtn) btnSync.textContent = i18n.blueprintSyncBtn;
  const btnReadBp = document.getElementById('btn-read-blueprint');
  if (btnReadBp && i18n.blueprintReadBtn) btnReadBp.textContent = i18n.blueprintReadBtn;
  const btnCopy = document.getElementById('btn-copy-blueprint');
  if (btnCopy && i18n.blueprintCopyBtn) btnCopy.textContent = i18n.blueprintCopyBtn;
  const btnPrint = document.getElementById('btn-print-fridge-sheet');
  if (btnPrint && i18n.blueprintPrintBtn) btnPrint.textContent = i18n.blueprintPrintBtn;

  if (i18n.searchPlaceholders) {
    const chInput = document.getElementById('channel-search');
    if (chInput && i18n.searchPlaceholders.channel) chInput.setAttribute('placeholder', i18n.searchPlaceholders.channel);
    const gmInput = document.getElementById('game-search');
    if (gmInput && i18n.searchPlaceholders.game) gmInput.setAttribute('placeholder', i18n.searchPlaceholders.game);
    const fdInput = document.getElementById('food-search');
    if (fdInput && i18n.searchPlaceholders.food) fdInput.setAttribute('placeholder', i18n.searchPlaceholders.food);
    const lsInput = document.getElementById('listen-search');
    if (lsInput && i18n.searchPlaceholders.listen) lsInput.setAttribute('placeholder', i18n.searchPlaceholders.listen);
  }

  // 5. Refresh Workspace Context Bar, Daily Blueprint & All 4 Directory Grids
  switchWorkspaceTab(currentWorkspaceTab, { persist: false });
  if (typeof updateBlueprintViewRef === 'function') {
    updateBlueprintViewRef(currentBlueprintAge, false);
  }
  renderChannels();
  renderGames();
  renderFoods();
  renderListenItems();
  applyExpertTabTranslations(i18n);
}

function setupLanguageSwitcher() {
  const initialLang = readPersistedFilter(STORAGE_KEYS.LANGUAGE, ALLOWED_LANGUAGES, 'en');
  currentLanguage = initialLang;
  syncLanguageControls(initialLang);
  setDocumentLanguageTag(initialLang);

  const selectEl = document.getElementById('language-select');
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      const target = e.currentTarget || e.target;
      const requestedLang = (target && target.value) ? target.value : 'en';
      applyPortalLanguage(requestedLang, { persist: true });
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('switch_language', { lang: currentLanguage, source: 'select' });
      }
    });
  }

  const langBtns = document.querySelectorAll('.lang-switch-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget || e.target;
      const requestedLang = targetBtn.getAttribute('data-lang') || 'en';
      applyPortalLanguage(requestedLang, { persist: true });
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('switch_language', { lang: currentLanguage, source: 'pill' });
      }
    });
  });
}


