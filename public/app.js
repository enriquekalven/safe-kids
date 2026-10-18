// SafeKids Parent Portal - Client Interactive Logic (XSS-Safe DOM Architecture)

document.addEventListener('DOMContentLoaded', () => {
  renderChannels();
  setupChannelFilterListeners();
  setupChannelSearch();
  setupWhitelistExport();

  renderGames();
  setupGameFilterListeners();
  setupGameSearch();

  setupSemCalculator();
  setupCopyButtons();
});

// Comprehensive Database of 25 Unique Curated Low-Stimulus Channels (Deduplicated Multi-Age Bands)
const channelsData = [
  // --- ULTRA-LOW STIMULUS (1/10 - 2/10): TODDLERS & PRESCHOOL ---
  {
    name: "Puffin Rock",
    researchAnchor: "Lillard & Peterson (2011) Low-Pacing Baseline; CPM < 3",
    semBreakdown: "Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 1/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 1/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 1/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 1/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 1/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 1/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 2/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 2/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 2/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 3/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 3/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 3/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 3/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 3/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 0/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 3/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 3/10)",
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
    semBreakdown: "Pacing: 0/2 • Visual: 1/2 • Audio: 0/2 • Pressure: 1/2 • Host/Ad: 1/2 (Total: 3/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 4/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 4/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 4/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 4/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 4/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 5/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 5/10)",
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
    semBreakdown: "Pacing: 2/2 • Visual: 1/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 5/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 5/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 5/10)",
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
    semBreakdown: "Pacing: 1/2 • Visual: 2/2 • Audio: 1/2 • Pressure: 0/2 • Host/Ad: 1/2 (Total: 5/10)",
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 0/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 1/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 0/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 1/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 0/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 1/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 1/2 \u2022 Reward: 0/2 (Total: 4/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Base 1 + Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 0/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 1/10)"
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
    "semBreakdown": "Base 1 + Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
  }
];

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

// ==================== CHANNEL CONTROLS & RENDERING ====================
let currentChannelFilter = 'all';
let currentChannelSearch = '';

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
  semBadge.textContent = ch.semBreakdown || 'Pacing: Low • Audio: Balanced • Visual: Calm';
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
      currentChannelFilter = activeBtn.getAttribute('data-filter') || 'all';
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

// ==================== WHITELIST EXPORT TOOLS ====================
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
      navigator.clipboard.writeText(urlsText).then(() => {
        flashButtonSuccess(btnCopyUrls, `✓ Copied ${activeChannels.length} URLs!`);
        if (window.trackSafeKidsEvent) {
          window.trackSafeKidsEvent('export_whitelist', { format: 'clipboard', count: activeChannels.length });
        }
      });
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
      const escapeCsv = (val) => `"${String(val || '').replace(/"/g, '""')}"`;
      const header = ['Channel Name', 'Age Group', 'SEM-10 Score', 'SEM-10 Breakdown', 'Research Anchor', 'Recommended Starters', 'YouTube URL'];
      const rows = activeChannels.map(ch => [
        escapeCsv(ch.name),
        escapeCsv(ch.ageLabel),
        escapeCsv(ch.stimulusScore),
        escapeCsv(ch.semBreakdown),
        escapeCsv(ch.researchAnchor),
        escapeCsv((ch.startWith || []).join(' | ')),
        escapeCsv(ch.link)
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

// ==================== EDUCATOR GAMES CONTROLS & RENDERING ====================
let currentGameAgeFilter = 'all';
let currentGameDomainFilter = 'all';
let currentGameSearch = '';

function buildGameCard(g) {
  const monetizationClass =
    g.monetizationType === 'free' ? 'monetization-free' :
    g.monetizationType === 'foss' ? 'monetization-foss' :
    g.monetizationType === 'arcade' ? 'monetization-arcade' : 'monetization-paid';

  const card = document.createElement('div');
  card.className = 'card game-card';

  const body = document.createElement('div');

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

  const filtered = gamesData.filter(g => {
    const ageVal = Array.isArray(g.age) ? g.age : [g.age || ''];
    const matchesAge = currentGameAgeFilter === 'all' || ageVal.includes(currentGameAgeFilter);
    const matchesDomain = currentGameDomainFilter === 'all' || g.category === currentGameDomainFilter;

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

    return matchesAge && matchesDomain && matchesSearch;
  });

  const countBadge = document.getElementById('game-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} games`;
  }

  if (filtered.length === 0) {
    container.replaceChildren(
      createEmptyState(
        'No educational games match your search criteria.',
        "Try selecting 'All Games' or clearing the domain and search filters."
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
      currentGameAgeFilter = activeBtn.getAttribute('data-filter') || 'all';
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
      currentGameDomainFilter = activeBtn.getAttribute('data-filter') || 'all';
      renderGames();
      if (window.trackSafeKidsEvent) {
        window.trackSafeKidsEvent('filter_games_domain', { domain: currentGameDomainFilter });
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

// ==================== INTERACTIVE SEM-10 CALCULATOR ====================
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
    const rawSum = scores.pacing + scores.visual + scores.audio + scores.pressure + scores.reward;
    // Scale 1/10 to 10/10 (0 pts across all 5 dimensions = 1/10 ultra-calm baseline; 10 pts = 10/10 extreme)
    const displayScore = rawSum === 0 ? 1 : rawSum;

    if (breakdownText) {
      breakdownText.textContent = `Pacing: ${scores.pacing}/2 • Visual: ${scores.visual}/2 • Audio: ${scores.audio}/2 • Pressure: ${scores.pressure}/2 • Reward/Ad: ${scores.reward}/2`;
    }

    if (scoreBadge && verdictDesc) {
      if (rawSum <= 3) {
        scoreBadge.className = 'stimulus-tag stimulus-low';
        scoreBadge.textContent = `SEM-10 Score: ${displayScore}/10 — Low Stimulus (Approved)`;
        verdictDesc.textContent = 'Safe for developing executive function & bedtime wind-down. Protects endogenous attention (Lillard & Peterson, 2011; Dunckley, 2015).';
      } else if (rawSum <= 6) {
        scoreBadge.className = 'stimulus-tag stimulus-med';
        scoreBadge.textContent = `SEM-10 Score: ${displayScore}/10 — Moderate Stimulus (Co-View)`;
        verdictDesc.textContent = 'Acceptable for daytime educational sessions (20–30 mins) with parent co-viewing. Avoid within 90 minutes of sleep.';
      } else {
        scoreBadge.className = 'stimulus-tag stimulus-high';
        scoreBadge.textContent = `SEM-10 Score: ${displayScore}/10 — High Stimulus (Block / Avoid)`;
        verdictDesc.textContent = 'High risk of orienting reflex exhaustion, dopaminergic conditioning, and post-screen emotional dysregulation. Block via YouTube whitelist or NextDNS.';
      }
    }
  }

  const dimGroups = calcContainer.querySelectorAll('.calc-options');
  dimGroups.forEach(group => {
    const dim = group.getAttribute('data-dim');
    const buttons = group.querySelectorAll('.calc-opt-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        scores[dim] = parseInt(btn.getAttribute('data-pts') || '0', 10);
        updateCalculatorView();
        if (window.trackSafeKidsEvent) {
          window.trackSafeKidsEvent('use_sem_calculator', { dimension: dim, total: scores.pacing + scores.visual + scores.audio + scores.pressure + scores.reward });
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

// ==================== COPY CODE BUTTONS ====================
function setupCopyButtons() {
  const btns = document.querySelectorAll('.copy-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-target');
      const codeEl = document.getElementById(codeId);
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.innerText).then(() => {
          if (window.trackSafeKidsEvent) {
            window.trackSafeKidsEvent('copy_lockdown_code', { target: codeId });
          }
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = orig; }, 2000);
        });
      }
    });
  });
}

