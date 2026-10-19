// SafeKids Parent Portal - Client Interactive Logic (XSS-Safe DOM Architecture)

document.addEventListener('DOMContentLoaded', () => {
  restorePersistedDirectoryFilters();
  setupWorkspaceTabs();
  setupDailyBlueprintBuilder();
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

  setupSemCalculator();
  setupFoodCalculator();
  setupCopyButtons();
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

// ==================== DETERMINISTIC SEM-10 & NFI-10 ORACLES & SECURITY HELPERS ====================
const ALLOWED_AGE_FILTERS = new Set(['all', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen']);
const ALLOWED_GAME_DOMAINS = new Set(['all', 'logic', 'spatial', 'coding', 'sandbox', 'stem', 'sel']);
const ALLOWED_GAME_STOPPING_FILTERS = new Set(['all', 'discrete-levels', 'calm-toybox', 'deep-sandbox', 'co-play']);
const ALLOWED_FOOD_DOMAINS = new Set(['all', 'brain-dha', 'iron-focus', 'steady-glucose', 'bone-growth', 'gut-immune', 'lunchbox-swaps']);
const ALLOWED_WORKSPACE_TABS = new Set(['overview', 'science', 'channels', 'games', 'nutrition', 'lockdown', 'all']);
const ALLOWED_BLUEPRINT_AGES = new Set(['under-2', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen']);
const ORDERED_WORKSPACE_TABS = ['overview', 'science', 'channels', 'games', 'nutrition', 'lockdown'];

const STORAGE_KEYS = {
  CHANNEL_AGE: 'safekids_channel_age_filter',
  GAME_AGE: 'safekids_game_age_filter',
  GAME_DOMAIN: 'safekids_game_domain_filter',
  GAME_STOPPING: 'safekids_game_stopping_filter',
  FOOD_AGE: 'safekids_food_age_filter',
  FOOD_DOMAIN: 'safekids_food_domain_filter',
  ACTIVE_TAB: 'safekids_active_tab',
  BLUEPRINT_AGE: 'safekids_blueprint_age'
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

// ==================== CHANNEL, GAME & FOOD STATE INITIALIZATION ====================
let currentChannelFilter = 'all';
let currentChannelSearch = '';
let currentGameAgeFilter = 'all';
let currentGameDomainFilter = 'all';
let currentGameStoppingFilter = 'all';
let currentGameSearch = '';
let currentFoodAgeFilter = 'all';
let currentFoodDomainFilter = 'all';
let currentFoodSearch = '';
let currentBlueprintAge = 'toddler';

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
  currentBlueprintAge = readPersistedFilter(STORAGE_KEYS.BLUEPRINT_AGE, ALLOWED_BLUEPRINT_AGES, 'toddler');

  syncFilterButtons('#channel-filters .filter-btn', currentChannelFilter);
  syncFilterButtons('#game-age-filters .filter-btn', currentGameAgeFilter);
  syncFilterButtons('#game-domain-filters .filter-btn', currentGameDomainFilter);
  syncFilterButtons('#game-stopping-filters .filter-btn', currentGameStoppingFilter);
  syncFilterButtons('#food-age-filters .filter-btn', currentFoodAgeFilter);
  syncFilterButtons('#food-domain-filters .filter-btn', currentFoodDomainFilter);
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

  const vMeta = getChannelVisualMeta(ch);
  body.appendChild(createCardVisualStrip(vMeta.src, vMeta.alt, vMeta.kicker, vMeta.sub));

  // Header
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

  // Age Badge
  const ageWrap = document.createElement('div');
  ageWrap.style.marginBottom = '0.75rem';
  const ageBadge = document.createElement('span');
  ageBadge.className = 'tag-badge';
  ageBadge.style.background = '#e0f2fe';
  ageBadge.style.color = '#0369a1';
  ageBadge.style.fontWeight = '600';
  ageBadge.textContent = ch.ageLabel;
  ageWrap.appendChild(ageBadge);
  body.appendChild(ageWrap);

  // Description
  const descP = document.createElement('p');
  descP.className = 'channel-desc';
  const descStrong = document.createElement('strong');
  descStrong.textContent = 'Why This Channel: ';
  descP.appendChild(descStrong);
  descP.appendChild(document.createTextNode(ch.whyThisChannel));
  body.appendChild(descP);

  // Citation Box
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
  body.appendChild(citBox);

  // Checkmarks
  if (ch.checkmarks && ch.checkmarks.length > 0) {
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.margin = '0.75rem 0';
    ul.style.fontSize = '0.85rem';
    ul.style.color = 'var(--text-muted)';

    ch.checkmarks.forEach(cm => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '0.35rem';
      li.style.marginBottom = '0.25rem';

      const tick = document.createElement('span');
      tick.style.color = 'var(--success)';
      tick.style.fontWeight = '700';
      tick.textContent = '✓';

      li.appendChild(tick);
      li.appendChild(document.createTextNode(' ' + cm));
      ul.appendChild(li);
    });
    body.appendChild(ul);
  }

  // Start With
  if (ch.startWith && ch.startWith.length > 0) {
    const swBox = document.createElement('div');
    swBox.style.marginTop = '0.75rem';
    swBox.style.padding = '0.6rem';
    swBox.style.background = 'var(--bg-alt)';
    swBox.style.borderRadius = 'var(--radius-sm)';

    const swTitle = document.createElement('div');
    swTitle.style.fontSize = '0.75rem';
    swTitle.style.fontWeight = '700';
    swTitle.style.color = 'var(--text-main)';
    swTitle.style.marginBottom = '0.35rem';
    swTitle.textContent = '🎬 Start With:';

    const swList = document.createElement('div');
    swList.style.display = 'flex';
    swList.style.flexWrap = 'wrap';
    swList.style.gap = '0.35rem';

    ch.startWith.forEach(sw => {
      const badge = document.createElement('span');
      badge.className = 'tag-badge';
      badge.style.background = '#ffffff';
      badge.style.border = '1px solid var(--border-color)';
      badge.style.color = 'var(--text-main)';
      badge.textContent = sw;
      swList.appendChild(badge);
    });

    swBox.appendChild(swTitle);
    swBox.appendChild(swList);
    body.appendChild(swBox);
  }

  // Educational PhD Lens: Off-Screen Transfer Activity
  body.appendChild(
    createExpertBridgeBox(
      'expert-bridge-phd',
      '🎓 Educational PhD • Off-Screen Transfer Activity (Hirsh-Pasek et al., 2015):',
      getChannelOffScreenTransfer(ch)
    )
  );

  card.appendChild(body);

  // Action Link
  const link = document.createElement('a');
  link.href = ch.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline';
  link.style.marginTop = '1rem';
  link.style.width = '100%';
  link.style.justifyContent = 'center';
  link.appendChild(createExternalLinkSvg());
  link.appendChild(document.createTextNode(' View Channel'));

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

  const countBadge = document.getElementById('channel-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} channels`;
  }

  if (filtered.length === 0) {
    container.replaceChildren(
      createEmptyState(
        'No channels match your search criteria.',
        'Try adjusting your age filter or search term.'
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

  const gMeta = getGameVisualMeta(g);
  body.appendChild(createCardVisualStrip(gMeta.src, gMeta.alt, gMeta.kicker, gMeta.sub));

  // Header
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

  // Age + Monetization Badges
  const metaRow = document.createElement('div');
  metaRow.style.display = 'flex';
  metaRow.style.flexWrap = 'wrap';
  metaRow.style.gap = '0.35rem';
  metaRow.style.margin = '0.6rem 0';

  const ageBadge = document.createElement('span');
  ageBadge.className = 'tag-badge';
  ageBadge.style.background = '#e0f2fe';
  ageBadge.style.color = '#0369a1';
  ageBadge.style.fontWeight = '600';
  ageBadge.textContent = g.ageLabel;

  const monBadge = document.createElement('span');
  monBadge.className = `monetization-badge ${monetizationClass}`;
  monBadge.textContent = g.monetization;

  metaRow.appendChild(ageBadge);
  metaRow.appendChild(monBadge);
  body.appendChild(metaRow);

  // Game Systems Expert Lens: Stopping-Cue / Session-Exit Friction + Co-Play Mode Row
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

  // Cognitive Focus
  if (g.cognitiveSkills && g.cognitiveSkills.length > 0) {
    const cogSection = document.createElement('div');
    cogSection.style.marginBottom = '0.75rem';

    const cogTitle = document.createElement('div');
    cogTitle.style.fontSize = '0.75rem';
    cogTitle.style.fontWeight = '700';
    cogTitle.style.color = 'var(--text-light)';
    cogTitle.style.textTransform = 'uppercase';
    cogTitle.style.marginBottom = '0.25rem';
    cogTitle.textContent = 'Cognitive Focus:';

    const cogList = document.createElement('div');
    cogList.style.display = 'flex';
    cogList.style.flexWrap = 'wrap';
    cogList.style.gap = '0.25rem';

    g.cognitiveSkills.forEach(cs => {
      const span = document.createElement('span');
      span.className = 'domain-badge';
      span.textContent = cs;
      cogList.appendChild(span);
    });

    cogSection.appendChild(cogTitle);
    cogSection.appendChild(cogList);
    body.appendChild(cogSection);
  }

  // Educator Backing
  if (g.endorsements && g.endorsements.length > 0) {
    const endSection = document.createElement('div');
    endSection.style.marginBottom = '0.75rem';

    const endTitle = document.createElement('div');
    endTitle.style.fontSize = '0.72rem';
    endTitle.style.fontWeight = '700';
    endTitle.style.color = 'var(--text-light)';
    endTitle.style.textTransform = 'uppercase';
    endTitle.style.marginBottom = '0.25rem';
    endTitle.textContent = 'Educator Backing:';

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

    endSection.appendChild(endTitle);
    endSection.appendChild(endList);
    body.appendChild(endSection);
  }

  // Why Educators Approve
  const descP = document.createElement('p');
  descP.className = 'channel-desc';
  descP.style.marginBottom = '0.75rem';
  const descStrong = document.createElement('strong');
  descStrong.textContent = 'Why Educators Approve: ';
  descP.appendChild(descStrong);
  descP.appendChild(document.createTextNode(g.whyEducatorsApprove));
  body.appendChild(descP);

  // Citation Box
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
  body.appendChild(citBox);

  // Calm & Ethical Design Highlights
  if (g.calmHighlights && g.calmHighlights.length > 0) {
    const calmBox = document.createElement('div');
    calmBox.style.background = 'var(--bg-alt)';
    calmBox.style.padding = '0.65rem';
    calmBox.style.borderRadius = 'var(--radius-sm)';
    calmBox.style.marginBottom = '0.75rem';

    const calmTitle = document.createElement('div');
    calmTitle.style.fontSize = '0.75rem';
    calmTitle.style.fontWeight = '700';
    calmTitle.style.color = 'var(--text-main)';
    calmTitle.style.marginBottom = '0.3rem';
    calmTitle.textContent = '🛡️ Calm & Ethical Design:';

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

    calmBox.appendChild(calmTitle);
    calmBox.appendChild(ul);
    body.appendChild(calmBox);
  }

  // Educational PhD Lens: Screen-to-Tabletop Transfer
  body.appendChild(
    createExpertBridgeBox(
      'expert-bridge-phd',
      '🎓 Educational PhD • Screen-to-Tabletop Transfer (Papert / Vygotsky):',
      getGameOffScreenTransfer(g)
    )
  );

  // Platforms
  const platDiv = document.createElement('div');
  platDiv.style.fontSize = '0.78rem';
  platDiv.style.color = 'var(--text-muted)';
  platDiv.style.marginBottom = '0.5rem';
  const platStrong = document.createElement('strong');
  platStrong.textContent = 'Platforms: ';
  platDiv.appendChild(platStrong);
  platDiv.appendChild(document.createTextNode((g.platforms || []).join(' • ')));
  body.appendChild(platDiv);

  card.appendChild(body);

  // Action Link
  const link = document.createElement('a');
  link.href = g.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline';
  link.style.marginTop = '0.75rem';
  link.style.width = '100%';
  link.style.justifyContent = 'center';
  link.appendChild(createExternalLinkSvg());
  link.appendChild(document.createTextNode(' Visit Official Game / App'));

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

  const countBadge = document.getElementById('game-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} games`;
  }

  if (filtered.length === 0) {
    container.replaceChildren(
      createEmptyState(
        'No educational games match your search criteria.',
        "Try selecting 'All Games' or clearing the domain, stopping-cue, and search filters."
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

  const fMeta = getFoodVisualMeta(f);
  body.appendChild(createCardVisualStrip(fMeta.src, fMeta.alt, fMeta.kicker, fMeta.sub));

  // Header
  const header = document.createElement('div');
  header.className = 'channel-header';

  const titleWrap = document.createElement('div');
  const nameDiv = document.createElement('div');
  nameDiv.className = 'channel-name';
  nameDiv.textContent = f.name;

  const catDiv = document.createElement('div');
  catDiv.style.fontSize = '0.75rem';
  catDiv.style.color = '#15803d';
  catDiv.style.fontWeight = '600';
  catDiv.textContent = f.categoryLabel;

  titleWrap.appendChild(nameDiv);
  titleWrap.appendChild(catDiv);

  const nfiSpan = document.createElement('span');
  nfiSpan.className = `stimulus-tag ${f.stimulusClass}`;
  nfiSpan.textContent = `NFI-10: ${f.nfiScore}`;

  header.appendChild(titleWrap);
  header.appendChild(nfiSpan);
  body.appendChild(header);

  // Age Badge
  const metaRow = document.createElement('div');
  metaRow.style.display = 'flex';
  metaRow.style.flexWrap = 'wrap';
  metaRow.style.gap = '0.35rem';
  metaRow.style.margin = '0.6rem 0';

  const ageBadge = document.createElement('span');
  ageBadge.className = 'tag-badge';
  ageBadge.style.background = '#e0f2fe';
  ageBadge.style.color = '#0369a1';
  ageBadge.style.fontWeight = '600';
  ageBadge.textContent = f.ageLabel;

  const novaBadge = document.createElement('span');
  novaBadge.className = 'monetization-badge monetization-free';
  novaBadge.textContent = 'NOVA-1 Whole Matrix';

  metaRow.appendChild(ageBadge);
  metaRow.appendChild(novaBadge);
  body.appendChild(metaRow);

  // Swap Box: Trap Replaced -> Whole-Food Upgrade
  const swapBox = document.createElement('div');
  swapBox.style.background = '#f0fdf4';
  swapBox.style.border = '1px solid #bbf7d0';
  swapBox.style.borderRadius = 'var(--radius-sm)';
  swapBox.style.padding = '0.65rem';
  swapBox.style.marginBottom = '0.75rem';
  swapBox.style.fontSize = '0.82rem';

  const trapDiv = document.createElement('div');
  trapDiv.style.color = '#991b1b';
  trapDiv.style.marginBottom = '0.35rem';
  const trapStrong = document.createElement('strong');
  trapStrong.textContent = '❌ Replaces UPF Trap: ';
  trapDiv.appendChild(trapStrong);
  trapDiv.appendChild(document.createTextNode(f.trapReplaced));

  const upgDiv = document.createElement('div');
  upgDiv.style.color = '#14532d';
  const upgStrong = document.createElement('strong');
  upgStrong.textContent = '✅ Whole-Food Upgrade: ';
  upgDiv.appendChild(upgStrong);
  upgDiv.appendChild(document.createTextNode(f.wholeFoodSwap));

  swapBox.appendChild(trapDiv);
  swapBox.appendChild(upgDiv);
  body.appendChild(swapBox);

  // Key Brain & Growth Nutrients
  if (f.keyNutrients && f.keyNutrients.length > 0) {
    const nutSection = document.createElement('div');
    nutSection.style.marginBottom = '0.75rem';

    const nutTitle = document.createElement('div');
    nutTitle.style.fontSize = '0.75rem';
    nutTitle.style.fontWeight = '700';
    nutTitle.style.color = 'var(--text-light)';
    nutTitle.style.textTransform = 'uppercase';
    nutTitle.style.marginBottom = '0.25rem';
    nutTitle.textContent = 'Key Brain & Growth Nutrients:';

    const nutList = document.createElement('div');
    nutList.style.display = 'flex';
    nutList.style.flexWrap = 'wrap';
    nutList.style.gap = '0.25rem';

    f.keyNutrients.forEach(kn => {
      const span = document.createElement('span');
      span.className = 'domain-badge';
      span.textContent = kn;
      nutList.appendChild(span);
    });

    nutSection.appendChild(nutTitle);
    nutSection.appendChild(nutList);
    body.appendChild(nutSection);
  }

  // Why Pediatric Clinicians Approve
  const descP = document.createElement('p');
  descP.className = 'channel-desc';
  descP.style.marginBottom = '0.75rem';
  const descStrong = document.createElement('strong');
  descStrong.textContent = 'Why Clinicians Approve: ';
  descP.appendChild(descStrong);
  descP.appendChild(document.createTextNode(f.whyCliniciansApprove));
  body.appendChild(descP);

  // Bioavailability Synergy & Choking/Allergen Safety Box
  const synBox = document.createElement('div');
  synBox.style.background = '#eff6ff';
  synBox.style.border = '1px solid #bfdbfe';
  synBox.style.borderRadius = 'var(--radius-sm)';
  synBox.style.padding = '0.65rem';
  synBox.style.marginBottom = '0.75rem';
  synBox.style.fontSize = '0.8rem';
  synBox.style.color = '#1e3a8a';

  const synStrong = document.createElement('strong');
  synStrong.textContent = '🧬 Bioavailability Synergy & Prep Safety: ';
  synBox.appendChild(synStrong);
  synBox.appendChild(document.createTextNode(f.synergySafety));
  body.appendChild(synBox);

  // Citation & NFI-10 Breakdown Box
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
  body.appendChild(citBox);

  // Pediatric Feeding MD Lens: 3-Step Picky-Eater Sensory Bridge
  body.appendChild(
    createExpertBridgeBox(
      'expert-bridge-md',
      '🩺 Pediatric Feeding MD • 3-Step Picky-Eater Sensory Bridge (SOS / Birch, 1999):',
      getFoodSensoryBridge(f)
    )
  );

  card.appendChild(body);

  // Action Link
  const link = document.createElement('a');
  link.href = f.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline';
  link.style.marginTop = '0.75rem';
  link.style.width = '100%';
  link.style.justifyContent = 'center';
  link.appendChild(createExternalLinkSvg());
  link.appendChild(document.createTextNode(' View Clinical & Nutrient Reference'));

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

  const countBadge = document.getElementById('food-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} whole foods & swaps`;
  }

  if (filtered.length === 0) {
    container.replaceChildren(
      createEmptyState(
        'No whole foods or swaps match your search criteria.',
        "Try selecting 'All Whole Foods & Swaps' or clearing the nutrient domain and search filters."
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
    kicker: 'Tab 1 of 6 • Start Here',
    title: 'Overview & Top 9 Parent Recommendations',
    sub: 'Prioritized decision framework across screen media, constructivist gaming, and whole-food pediatric nutrition.',
    shortLabel: 'Overview & 9 Pillars'
  },
  science: {
    kicker: 'Tab 2 of 6 • Clinical Evidence & Rubrics',
    title: 'Clinical Science, Dual 10-Point Auditors (SEM-10 & NFI-10) & 30 Citations',
    sub: 'Peer-reviewed neuroimaging, developmental psychology, pediatric nutrition RCTs, and interactive 60-second calculators.',
    shortLabel: 'Clinical Science & Rubrics'
  },
  channels: {
    kicker: 'Tab 3 of 6 • Pillar 1 (Watch)',
    title: 'Parent-Approved Low-Stimulus Channel Directory (28 Channels)',
    sub: 'Curated calm video channels scored on the SEM-10 rubric with 1-click JSON/CSV whitelist export.',
    shortLabel: 'Safe Channels (28)'
  },
  games: {
    kicker: 'Tab 4 of 6 • Pillar 2 (Play)',
    title: 'Educator-Approved Cognitive Games & Apps Directory (33 Games)',
    sub: 'Constructivist sandboxes, spatial puzzles, and Montessori apps with zero ads and zero loot boxes.',
    shortLabel: 'Educator Games (33)'
  },
  nutrition: {
    kicker: 'Tab 5 of 6 • Pillar 3 (Nourish)',
    title: 'Pediatrician- & Dietitian-Vetted Whole Foods & Lunchbox Swaps (32 Swaps)',
    sub: 'Concrete NOVA-1 whole-food upgrades replacing ultra-processed kid snacks, pouches, and synthetic dyes.',
    shortLabel: 'Wholesome Food (32)'
  },
  lockdown: {
    kicker: 'Tab 6 of 6 • Technical Defense',
    title: 'Open-Source Parental Tools & Step-by-Step Device/DNS Lockdown Guides',
    sub: '13 open-source parental control architectures plus Steps A–E for BrainRotGuard, KidTube, Family Link, Guided Access, and NextDNS.',
    shortLabel: 'Tools & Lockdown Guides'
  },
  all: {
    kicker: 'Full Handbook Mode • All 6 Tabs Visible',
    title: 'Complete SafeKids Parent Portal Reference (All Sections)',
    sub: 'Showing all 9 recommendations, 30 clinical studies, 28 channels, 33 games, 32 whole-food swaps, and 5 lockdown guides on one page.',
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

  const meta = WORKSPACE_TAB_METADATA[tab] || WORKSPACE_TAB_METADATA.overview;
  const kickerEl = document.getElementById('workspace-context-kicker');
  const titleEl = document.getElementById('workspace-context-title');
  const subEl = document.getElementById('workspace-context-sub');
  const headerPill = document.getElementById('header-active-pill');
  const contextToggleBtn = document.getElementById('btn-context-view-all');
  const headerToggleBtn = document.getElementById('btn-header-view-all');

  if (kickerEl) kickerEl.textContent = meta.kicker;
  if (titleEl) titleEl.textContent = meta.title;
  if (subEl) subEl.textContent = meta.sub;
  if (headerPill) headerPill.textContent = `Active: ${meta.shortLabel}`;

  if (contextToggleBtn) {
    contextToggleBtn.textContent = tab === 'all' ? 'Return to Focused Tabs' : 'Show All Sections';
    contextToggleBtn.setAttribute('data-tab', tab === 'all' ? 'overview' : 'all');
  }
  if (headerToggleBtn) {
    headerToggleBtn.textContent = tab === 'all' ? '🎯 Focused Tabs' : '📖 View Full Guide';
    headerToggleBtn.setAttribute('data-tab', tab === 'all' ? 'overview' : 'all');
  }

  const prevBtn = document.getElementById('btn-prev-tab');
  const nextBtn = document.getElementById('btn-next-tab');
  const indicatorEl = document.getElementById('workspace-pager-indicator');
  const idx = ORDERED_WORKSPACE_TABS.indexOf(tab);

  if (idx !== -1) {
    const prevTab = ORDERED_WORKSPACE_TABS[(idx - 1 + ORDERED_WORKSPACE_TABS.length) % ORDERED_WORKSPACE_TABS.length];
    const nextTab = ORDERED_WORKSPACE_TABS[(idx + 1) % ORDERED_WORKSPACE_TABS.length];
    if (prevBtn) {
      prevBtn.textContent = `\u2190 Prev: ${WORKSPACE_TAB_METADATA[prevTab].shortLabel}`;
      prevBtn.setAttribute('data-target-tab', prevTab);
    }
    if (nextBtn) {
      nextBtn.textContent = `Next: ${WORKSPACE_TAB_METADATA[nextTab].shortLabel} \u2192`;
      nextBtn.setAttribute('data-target-tab', nextTab);
    }
    if (indicatorEl) {
      indicatorEl.textContent = `Viewing Tab ${idx + 1} of ${ORDERED_WORKSPACE_TABS.length} • ${meta.shortLabel}`;
    }
  } else {
    if (prevBtn) {
      prevBtn.textContent = '\u2190 Back to Overview & 9 Pillars';
      prevBtn.setAttribute('data-target-tab', 'overview');
    }
    if (nextBtn) {
      nextBtn.textContent = 'Jump to Safe Channels (28) \u2192';
      nextBtn.setAttribute('data-target-tab', 'channels');
    }
    if (indicatorEl) {
      indicatorEl.textContent = 'Full Handbook Mode • All 6 Tabs Visible';
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
  const stageMeta = BLUEPRINT_STAGE_RULES[ageKey] || BLUEPRINT_STAGE_RULES.toddler;

  if (ageKey === 'under-2') {
    return {
      ageKey,
      ageLabelShort: stageMeta.ageLabelShort,
      directoryFilterAge: stageMeta.directoryFilterAge,
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

  return {
    ageKey,
    ageLabelShort: stageMeta.ageLabelShort,
    directoryFilterAge: stageMeta.directoryFilterAge,
    stageHeadline: stageMeta.stageHeadline,
    stageSummary: stageMeta.stageSummary,
    screenBudget: stageMeta.screenBudget,
    sleepCutoff: stageMeta.sleepCutoff,
    mealRule: stageMeta.mealRule,
    channels: matchedChannels,
    games: matchedGames,
    foods: matchedFoods
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

    if (clearSyncBanner && syncStatusEl) {
      syncStatusEl.textContent = '';
    }
  }

  ageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget || e.target;
      const requestedAge = targetBtn.getAttribute('data-bp-age') || 'toddler';
      const validAge = ALLOWED_BLUEPRINT_AGES.has(requestedAge) ? requestedAge : 'toddler';
      writePersistedFilter(STORAGE_KEYS.BLUEPRINT_AGE, validAge, ALLOWED_BLUEPRINT_AGES);
      updateBlueprintView(validAge, true);
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('select_blueprint_age', { age: validAge });
      }
    });
  });

  if (btnSync) {
    btnSync.addEventListener('click', () => {
      const bp = computeDailyBlueprint(currentBlueprintAge);
      const targetDirAge = ALLOWED_AGE_FILTERS.has(bp.directoryFilterAge) ? bp.directoryFilterAge : 'toddler';

      currentChannelFilter = targetDirAge;
      currentGameAgeFilter = targetDirAge;
      currentFoodAgeFilter = targetDirAge;

      writePersistedFilter(STORAGE_KEYS.CHANNEL_AGE, currentChannelFilter, ALLOWED_AGE_FILTERS);
      writePersistedFilter(STORAGE_KEYS.GAME_AGE, currentGameAgeFilter, ALLOWED_AGE_FILTERS);
      writePersistedFilter(STORAGE_KEYS.FOOD_AGE, currentFoodAgeFilter, ALLOWED_AGE_FILTERS);

      syncFilterButtons('#channel-filters .filter-btn', currentChannelFilter);
      syncFilterButtons('#game-age-filters .filter-btn', currentGameAgeFilter);
      syncFilterButtons('#food-age-filters .filter-btn', currentFoodAgeFilter);

      renderChannels();
      renderGames();
      renderFoods();

      const chCount = getFilteredChannels().length;
      const gmCount = getFilteredGames().length;
      const fdCount = getFilteredFoods().length;

      if (syncStatusEl) {
        syncStatusEl.textContent = bp.ageKey === 'under-2'
          ? `✓ Synced Watch (${chCount}), Play (${gmCount}) & Nourish (${fdCount}) directories to Early-Years / Toddler prep mode (Note: 0 passive screen mins under 24m per AAP)!`
          : `✓ Synced Watch (${chCount} channels), Play (${gmCount} games) & Nourish (${fdCount} swaps) directories to ${bp.ageLabelShort}!`;
      }
      flashButtonSuccess(btnSync, `✓ Synced All 3 Directories (${bp.ageLabelShort})!`);
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
