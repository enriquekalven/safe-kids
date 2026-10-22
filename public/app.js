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
const ALLOWED_WORKSPACE_TABS = new Set(['overview', 'science', 'channels', 'games', 'nutrition', 'listen', 'lockdown', 'all']);
const ALLOWED_BLUEPRINT_AGES = new Set(['under-2', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen']);
const ALLOWED_THEMES = new Set(['light', 'dark']);
const ALLOWED_LANGUAGES = new Set(['en', 'es', 'zh', 'ja', 'ko']);
const ORDERED_WORKSPACE_TABS = ['overview', 'science', 'channels', 'games', 'nutrition', 'listen', 'lockdown'];

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
  LANGUAGE: 'safekids_language'
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

// ==================== LEFT-PANEL WORKSPACE TAB NAVIGATION & DEEP-LINK ROUTING ====================
const WORKSPACE_TAB_METADATA = {
  overview: {
    kicker: 'Tab 1 of 7 • Start Here',
    title: 'Overview & Top 9 Parent Recommendations + Pillar 4 Audio',
    sub: 'Calm daily age rhythm, printable 4-pillar fridge sheet, and core family guidelines.',
    shortLabel: 'Daily Plan & Overview'
  },
  science: {
    kicker: 'Tab 2 of 7 • Clinical Evidence & Rubrics',
    title: 'Clinical Science, Dual 10-Point Auditors (SEM-10 & NFI-10) & 30 Citations',
    sub: 'Peer-reviewed neuroimaging, developmental psychology, pediatric nutrition RCTs, and interactive 60-second calculators.',
    shortLabel: 'Science & Rubrics (30)'
  },
  channels: {
    kicker: 'Tab 3 of 7 • Pillar 1 (Watch)',
    title: 'Parent-Approved Low-Stimulus Channel Directory (28 Channels)',
    sub: 'Curated calm video channels scored on the SEM-10 rubric with 1-click JSON/CSV whitelist export.',
    shortLabel: 'Watch · Channels (28)'
  },
  games: {
    kicker: 'Tab 4 of 7 • Pillar 2 (Play)',
    title: 'Educator-Approved Cognitive Games & Apps Directory (33 Games)',
    sub: 'Constructivist sandboxes, spatial puzzles, and Montessori apps with zero ads and zero loot boxes.',
    shortLabel: 'Play · Games (33)'
  },
  nutrition: {
    kicker: 'Tab 5 of 7 • Pillar 3 (Nourish)',
    title: 'Pediatrician- & Dietitian-Vetted Whole Foods & Lunchbox Swaps (32 Swaps)',
    sub: 'Concrete NOVA-1 whole-food upgrades replacing ultra-processed kid snacks, pouches, and synthetic dyes.',
    shortLabel: 'Nourish · Foods (32)'
  },
  listen: {
    kicker: 'Tab 6 of 7 • Pillar 4 (Listen & Read)',
    title: 'Listen & Read: Screen-Free Audio, Podcasts & Living Books Directory (26 Picks)',
    sub: 'Curated STEM & story podcasts, Yoto/Tonie audio cards, synthetic phonics decodables, and dialogic living books.',
    shortLabel: 'Listen & Read (26)'
  },
  lockdown: {
    kicker: 'Tab 7 of 7 • Technical Defense',
    title: 'Open-Source Parental Tools & Step-by-Step Device/DNS Lockdown Guides',
    sub: '13 open-source parental control architectures plus Steps A–E for BrainRotGuard, KidTube, Family Link, Guided Access, and NextDNS.',
    shortLabel: 'Device & DNS Lockdown'
  },
  all: {
    kicker: 'Full Handbook Mode • All 7 Tabs Visible',
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
      indicatorEl.textContent = (i18n && i18n.fullHandbookModeLabel) || 'Full Handbook Mode • All 7 Tabs Visible';
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

// ==================== DARK MODE & 5-LANGUAGE I18N ENGINE (EN / ES / ZH / JA / KO) ====================
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
    fullHandbookModeLabel: 'Full Handbook Mode • All 7 Tabs Visible',
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
    sidebarGroups: ['1. Start Here', '2. Curated Daily Directories', '3. Tools & Clinical Science'],
    sidebarNav: {
      overview: { title: 'Daily Plan & 10 Rules', caption: 'Fridge sheet & 4-pillar hub', pill: 'Start' },
      channels: { title: 'Watch: Safe Channels', caption: 'Low-stimulus video whitelist', pill: '28' },
      games: { title: 'Play: Educator Games', caption: 'Ad-free logic & STEM play', pill: '33' },
      nutrition: { title: 'Nourish: Whole Foods', caption: 'Lunchbox swaps & NFI-10', pill: '32' },
      listen: { title: 'Listen & Read: Audio', caption: 'Podcasts, Yoto & living books', pill: '26' },
      science: { title: 'Science & Self-Auditors', caption: 'SEM-10, NFI-10 & 30 studies', pill: '30 Cited' },
      lockdown: { title: 'Lockdown Guides', caption: 'FOSS apps, OS & DNS shields', pill: '13 Tools' },
      all: { title: 'View Full Guide / Print All', caption: 'Show all sections on one page', pill: 'All' }
    },
    mobileBar: {
      overview: 'All 6',
      channels: 'Watch',
      games: 'Play',
      nutrition: 'Food',
      listen: 'Audio',
      lockdown: 'Shield'
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
    blueprintStages: BLUEPRINT_STAGE_RULES
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
    fullHandbookModeLabel: 'Modo Manual Completo • Las 7 Pestañas Visibles',
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
    sidebarGroups: ['1. Empieza Aquí', '2. Directorios Diarios Curados', '3. Herramientas y Ciencia Clínica'],
    sidebarNav: {
      overview: { title: 'Plan Diario y 10 Reglas', caption: 'Hoja de refrigerador y 4 pilares', pill: 'Inicio' },
      channels: { title: 'Ver: Canales Seguros', caption: 'Lista blanca de baja estimulación', pill: '28' },
      games: { title: 'Jugar: Juegos Educativos', caption: 'Lógica y STEM sin anuncios', pill: '33' },
      nutrition: { title: 'Nutrir: Alimentos Reales', caption: 'Cambios de lonchera y NFI-10', pill: '32' },
      listen: { title: 'Escuchar y Leer: Audio', caption: 'Pódcasts, Yoto y libros vivos', pill: '26' },
      science: { title: 'Ciencia y Auditores', caption: 'SEM-10, NFI-10 y 30 estudios', pill: '30 Citas' },
      lockdown: { title: 'Guías de Bloqueo', caption: 'Apps libres, SO y escudos DNS', pill: '13 Herr.' },
      all: { title: 'Ver Guía Completa / Imprimir', caption: 'Mostrar todas las secciones juntas', pill: 'Todo' }
    },
    mobileBar: {
      overview: 'Plan',
      channels: 'Ver',
      games: 'Jugar',
      nutrition: 'Nutrir',
      listen: 'Audio',
      lockdown: 'Escudo'
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
        kicker: 'Pestaña 1 de 7 • Empieza Aquí',
        title: 'Resumen, Plan Diario por Edad y 10 Reglas Familiares Clave',
        sub: 'Rutina diaria calma, hoja imprimible de 4 pilares para el refrigerador y guía esencial para padres.',
        shortLabel: 'Plan Diario y Resumen'
      },
      science: {
        kicker: 'Pestaña 2 de 7 • Evidencia Clínica y Rúbricas',
        title: 'Ciencia Clínica, Auditores Dobles de 10 Puntos (SEM-10 y NFI-10) y 30 Citas',
        sub: 'Neuroimagen revisada por pares, psicología del desarrollo, nutrición pediátrica y calculadoras de 60 segundos.',
        shortLabel: 'Ciencia y Rúbricas (30)'
      },
      channels: {
        kicker: 'Pestaña 3 de 7 • Pilar 1 (Ver)',
        title: 'Directorio de Canales de Baja Estimulación Aprobados por Padres (28 Canales)',
        sub: 'Canales de video calmos evaluados con la rúbrica SEM-10 y exportación de lista blanca en JSON/CSV.',
        shortLabel: 'Ver · Canales (28)'
      },
      games: {
        kicker: 'Pestaña 4 de 7 • Pilar 2 (Jugar)',
        title: 'Directorio de Juegos Cognitivos y Apps Aprobados por Educadores (33 Juegos)',
        sub: 'Mundos constructivistas, acertijos espaciales y apps Montessori con cero anuncios y cero cajas de botín.',
        shortLabel: 'Jugar · Juegos (33)'
      },
      nutrition: {
        kicker: 'Pestaña 5 de 7 • Pilar 3 (Nutrir)',
        title: 'Alimentos Integrales y Cambios de Lonchera Avalados por Pediatras (32 Cambios)',
        sub: 'Alternativas reales NOVA-1 que reemplazan snacks ultraprocesados, bolsas exprimibles y colorantes sintéticos.',
        shortLabel: 'Nutrir · Alimentos (32)'
      },
      listen: {
        kicker: 'Pestaña 6 de 7 • Pilar 4 (Escuchar y Leer)',
        title: 'Escuchar y Leer: Directorio de Audio Sin Pantalla, Pódcasts y Libros Vivos (26 Selecciones)',
        sub: 'Pódcasts de ciencia y cuentos, tarjetas Yoto/Tonie, libros fonéticos decodificables y lectura dialógica.',
        shortLabel: 'Escuchar y Leer (26)'
      },
      lockdown: {
        kicker: 'Pestaña 7 de 7 • Defensa Técnica',
        title: 'Herramientas Abiertas de Control Parental y Guías Paso a Paso de Bloqueo DNS',
        sub: '13 arquitecturas de código abierto más los Pasos A–E para BrainRotGuard, KidTube, Family Link, Acceso Guiado y NextDNS.',
        shortLabel: 'Bloqueo de Dispositivos y DNS'
      },
      all: {
        kicker: 'Modo Manual Completo • Las 7 Pestañas Visibles',
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
    }
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
    fullHandbookModeLabel: '完整手册模式 • 全部 7 个分栏已展开',
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
    sidebarGroups: ['1. 从这里开始', '2. 每日严选四大目录', '3. 自测工具与临床科学'],
    sidebarNav: {
      overview: { title: '每日计划与10大原则', caption: '冰箱速查表与四大支柱中心', pill: '首页' },
      channels: { title: '观看：低刺激安全频道', caption: '温和慢节奏视频白名单', pill: '28' },
      games: { title: '益智：教育家严选游戏', caption: '无广告逻辑与STEM探索', pill: '33' },
      nutrition: { title: '营养：天然原型食物', caption: '健康餐盒替换与NFI-10评分', pill: '32' },
      listen: { title: '倾听与阅读：无屏音频', caption: '科普播客、音频卡与绘本', pill: '26' },
      science: { title: '临床科学与自测计算器', caption: 'SEM-10、NFI-10与30项研究', pill: '30篇文献' },
      lockdown: { title: '设备与DNS锁定指南', caption: '开源工具、系统限制与DNS防护', pill: '13项工具' },
      all: { title: '查看完整指南 / 打印全部', caption: '在同一页面展开所有章节', pill: '全部' }
    },
    mobileBar: {
      overview: '计划',
      channels: '观看',
      games: '益智',
      nutrition: '营养',
      listen: '倾听',
      lockdown: '防护'
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
        kicker: '第 1 / 7 页 • 从这里开始',
        title: '总览、分龄每日作息计划与 10 大核心家庭准则',
        sub: '温和的日常作息节奏、可打印的四维支柱冰箱速查表以及核心家庭指导框架。',
        shortLabel: '每日计划与总览'
      },
      science: {
        kicker: '第 2 / 7 页 • 临床证据与量表',
        title: '临床科学、双10分制评估器（SEM-10 与 NFI-10）及 30 篇权威文献',
        sub: '同行评审神经影像学、发展心理学、儿科营养随机对照试验及60秒交互式自测工具。',
        shortLabel: '科学与量表 (30)'
      },
      channels: {
        kicker: '第 3 / 7 页 • 第一支柱（观看）',
        title: '家长严选低刺激视频频道目录（28 个频道）',
        sub: '基于 SEM-10 量表评分的温和视频频道，支持一键导出 JSON/CSV 白名单。',
        shortLabel: '观看 · 频道 (28)'
      },
      games: {
        kicker: '第 4 / 7 页 • 第二支柱（益智）',
        title: '教育家严选认知游戏与应用目录（33 款游戏）',
        sub: '建构主义沙盒、空间几何解谜与蒙氏应用，零广告、零开箱抽奖机制。',
        shortLabel: '益智 · 游戏 (33)'
      },
      nutrition: {
        kicker: '第 5 / 7 页 • 第三支柱（营养）',
        title: '儿科医生与营养师严选天然食物及便当替换方案（32 项替换）',
        sub: '用 NOVA-1 完整细胞基质食物替换超加工儿童零食、果泥吸吸袋与人工合成色素。',
        shortLabel: '营养 · 食物 (32)'
      },
      listen: {
        kicker: '第 6 / 7 页 • 第四支柱（倾听与阅读）',
        title: '倾听与阅读：无屏音频、科普播客与经典绘本目录（26 项精选）',
        sub: '严选 STEM 科普与故事播客、Yoto/Tonie 实体音频卡、自然拼读读物与对话式阅读绘本。',
        shortLabel: '倾听与阅读 (26)'
      },
      lockdown: {
        kicker: '第 7 / 7 页 • 技术防护体系',
        title: '开源家长控制工具与分步设备 / DNS 锁定指南',
        sub: '13 项开源家长控制架构，以及 BrainRotGuard、KidTube、Family Link、引导式访问与 NextDNS 设置指南。',
        shortLabel: '设备与 DNS 防护'
      },
      all: {
        kicker: '完整手册模式 • 全部 7 个分栏可见',
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
    }
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
    fullHandbookModeLabel: 'フルハンドブックモード • 全 7 タブ表示中',
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
    sidebarGroups: ['1. はじめに', '2. 厳選デイリーディレクトリ', '3. 評価ツールと臨床科学'],
    sidebarNav: {
      overview: { title: '1日のプランと10のルール', caption: '冷蔵庫シート＆4つの柱', pill: '開始' },
      channels: { title: '観る：安全な低刺激番組', caption: '低刺激動画ホワイトリスト', pill: '28' },
      games: { title: '遊ぶ：教育者推奨ゲーム', caption: '広告なし論理＆STEM遊び', pill: '33' },
      nutrition: { title: '食べる：自然食品と弁当', caption: '超加工食品の代替＆NFI-10', pill: '32' },
      listen: { title: '聴く・読む：音声と絵本', caption: 'ポッドキャスト・Yoto・絵本', pill: '26' },
      science: { title: '臨床科学と自己診断ツール', caption: 'SEM-10・NFI-10・30の研究', pill: '30文献' },
      lockdown: { title: '端末・DNSロック手順', caption: 'オープンソース＆DNS防御', pill: '13ツール' },
      all: { title: '全ガイド表示 / 印刷モード', caption: '全セクションを1ページに表示', pill: 'すべて' }
    },
    mobileBar: {
      overview: 'プラン',
      channels: '観る',
      games: '遊ぶ',
      nutrition: '食べる',
      listen: '聴く',
      lockdown: '防御'
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
        kicker: 'タブ 1 / 7 • はじめに',
        title: '概要・年齢別デイリープラン＆家庭のための10大ルール',
        sub: '落ち着いた1日の生活リズム、印刷できる冷蔵庫用4柱シート、家庭向け基本ガイドライン。',
        shortLabel: 'デイリープランと概要'
      },
      science: {
        kicker: 'タブ 2 / 7 • 臨床エビデンスと評価基準',
        title: '臨床科学・10点満点デュアル評価ツール（SEM-10 & NFI-10）・30の引用研究',
        sub: '査読付き脳画像研究、発達心理学、小児栄養学RCT、および60秒で判定できる対話型計算機。',
        shortLabel: '科学と評価基準 (30)'
      },
      channels: {
        kicker: 'タブ 3 / 7 • 第1の柱（観る）',
        title: '保護者承認・低刺激動画チャンネルディレクトリ（全28チャンネル）',
        sub: 'SEM-10基準で採点された穏やかな動画チャンネルと、ワンクリックJSON/CSVホワイトリスト出力。',
        shortLabel: '観る · チャンネル (28)'
      },
      games: {
        kicker: 'タブ 4 / 7 • 第2の柱（遊ぶ）',
        title: '教育者推奨・知育ゲーム＆アプリディレクトリ（全33ゲーム）',
        sub: '広告ゼロ・ガチャ課金ゼロの構築主義サンドボックス、空間パズル、モンテッソーリ知育アプリ。',
        shortLabel: '遊ぶ · ゲーム (33)'
      },
      nutrition: {
        kicker: 'タブ 5 / 7 • 第3の柱（食べる）',
        title: '小児科医・管理栄養士監修の自然食品＆お弁当スワップ（全32種）',
        sub: '超加工スナックやパウチ飲料、合成着色料を置き換えるNOVA-1ホールフード代替ガイド。',
        shortLabel: '食べる · 自然食 (32)'
      },
      listen: {
        kicker: 'タブ 6 / 7 • 第4の柱（聴く・読む）',
        title: '聴く・読む：スクリーンフリー音声・ポッドキャスト＆絵本ディレクトリ（全26選）',
        sub: '科学＆物語ポッドキャスト、Yoto/Tonieオーディオカード、フォニックス読本、対話型読み聞かせ名作本。',
        shortLabel: '聴く・読む (26)'
      },
      lockdown: {
        kicker: 'タブ 7 / 7 • 技術的ディフェンス',
        title: 'オープンソース保護者管理ツール＆端末 / DNSロックダウン手順',
        sub: '13のオープンソース管理ツールと、BrainRotGuard・KidTube・ファミリー リンク・アクセスガイド・NextDNS設定手順。',
        shortLabel: '端末＆DNSロック設定'
      },
      all: {
        kicker: 'フルハンドブックモード • 全7タブを表示中',
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
    }
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
    fullHandbookModeLabel: '전체 핸드북 모드 • 7개 탭 모두 표시됨',
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
    sidebarGroups: ['1. 시작하기', '2. 일일 엄선 4대 디렉토리', '3. 자가 진단 도구 및 임상 과학'],
    sidebarNav: {
      overview: { title: '일일 플랜 및 10대 원칙', caption: '냉장고 시트 & 4대 핵심 허브', pill: '시작' },
      channels: { title: '시청: 안전한 저자극 채널', caption: '저자극 영상 화이트리스트', pill: '28' },
      games: { title: '놀이: 교육자 추천 게임', caption: '광고 없는 논리 & STEM 놀이', pill: '33' },
      nutrition: { title: '영양: 자연식품 & 도시락', caption: '초가공 간식 대체 & NFI-10', pill: '32' },
      listen: { title: '청취 및 독서: 오디오북', caption: '팟캐스트, Yoto & 살아있는 책', pill: '26' },
      science: { title: '임상 과학 및 자가 판독기', caption: 'SEM-10, NFI-10 & 30편 논문', pill: '30편 인용' },
      lockdown: { title: '기기 및 DNS 차단 가이드', caption: '오픈소스 앱, OS & DNS 방어', pill: '13개 도구' },
      all: { title: '전체 가이드 보기 / 인쇄', caption: '모든 섹션을 한 페이지에 표시', pill: '전체' }
    },
    mobileBar: {
      overview: '플랜',
      channels: '시청',
      games: '놀이',
      nutrition: '영양',
      listen: '청취',
      lockdown: '차단'
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
        kicker: '탭 1 / 7 • 시작하기',
        title: '개요, 연령별 일일 플랜 및 부모를 위한 10대 핵심 원칙',
        sub: '차분한 일일 연령별 리듬, 인쇄 가능한 4대 영역 냉장고 시트 및 핵심 가족 가이드라인.',
        shortLabel: '일일 플랜 및 개요'
      },
      science: {
        kicker: '탭 2 / 7 • 임상 근거 및 루브릭',
        title: '임상 과학, 듀얼 10점 판독기(SEM-10 & NFI-10) 및 30편의 학술 인용',
        sub: '동료 심사 뇌영상 연구, 발달심리학, 소아영양학 무작위 대조시험 및 60초 대화형 계산기.',
        shortLabel: '과학 및 루브릭 (30)'
      },
      channels: {
        kicker: '탭 3 / 7 • 영역 1 (시청)',
        title: '부모 승인 저자극 영상 채널 디렉토리 (28개 채널)',
        sub: 'SEM-10 기준으로 평가된 차분한 영상 채널 및 원클릭 JSON/CSV 화이트리스트 내보내기.',
        shortLabel: '시청 · 채널 (28)'
      },
      games: {
        kicker: '탭 4 / 7 • 영역 2 (놀이)',
        title: '교육자 승인 인지 발달 게임 및 앱 디렉토리 (33개 게임)',
        sub: '광고 제로, 확률형 아이템 제로의 구성주의 샌드박스, 공간 퍼즐 및 몬테소리 앱.',
        shortLabel: '놀이 · 게임 (33)'
      },
      nutrition: {
        kicker: '탭 5 / 7 • 영역 3 (영양)',
        title: '소아과 전문의 및 영양사 검증 자연식품 & 도시락 대체안 (32개 대체안)',
        sub: '초가공 어린이 간식, 파우치 음료, 합성 착색료를 대체하는 NOVA-1 자연식품 업그레이드.',
        shortLabel: '영양 · 식품 (32)'
      },
      listen: {
        kicker: '탭 6 / 7 • 영역 4 (청취 및 독서)',
        title: '청취 및 독서: 스크린 없는 오디오, 팟캐스트 & 살아있는 책 디렉토리 (26선)',
        sub: '엄선된 STEM 및 동화 팟캐스트, Yoto/Tonie 오디오 카드, 파닉스 리더스 및 대화형 그림책.',
        shortLabel: '청취 및 독서 (26)'
      },
      lockdown: {
        kicker: '탭 7 / 7 • 기술적 방어',
        title: '오픈소스 자녀 보호 도구 및 단계별 기기 / DNS 차단 가이드',
        sub: '13개의 오픈소스 자녀 보호 아키텍처와 BrainRotGuard, KidTube, 패밀리 링크, 사용법 유도, NextDNS 설정 가이드.',
        shortLabel: '기기 및 DNS 차단'
      },
      all: {
        kicker: '전체 핸드북 모드 • 7개 탭 모두 표시',
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
    }
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
const HTML_LANG_TAGS = { en: 'en', es: 'es', zh: 'zh-Hans', ja: 'ja', ko: 'ko' };

function setDocumentLanguageTag(lang) {
  if (document.documentElement && typeof document.documentElement.setAttribute === 'function') {
    document.documentElement.setAttribute('lang', ALLOWED_LANGUAGES.has(lang) ? HTML_LANG_TAGS[lang] : 'en');
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

  // 4. Update Blueprint Action Buttons & Search Placeholders
  const btnSync = document.getElementById('btn-sync-age-directories');
  if (btnSync && i18n.blueprintSyncBtn) btnSync.textContent = i18n.blueprintSyncBtn;
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


