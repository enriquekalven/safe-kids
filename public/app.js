// SafeKids Parent Portal - Client Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  renderChannels();
  setupChannelFilterListeners();
  setupChannelSearch();

  renderGames();
  setupGameFilterListeners();
  setupGameSearch();

  setupCopyButtons();
});

// Comprehensive Database of Approved Channels categorized by exact Age Bands
const channelsData = [
  // --- TODDLERS (AGES 2-3) ---
  {
    name: "Puffin Rock",
    researchAnchor: "Lillard & Peterson (2011) Low-Pacing Baseline; CPM < 3",
    semBreakdown: "Pacing: 0/2 • Audio: 0/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 1/10)",
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
    researchAnchor: "Anderson & Pempek (2005) Toddler Linguistic Cadence & Clear Articulation",
    semBreakdown: "Pacing: 0/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 2/10)",
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
    researchAnchor: "Kostyrka-Allchorne et al. (2017) Low-Stimulus Narrative Framing; CPM < 4",
    semBreakdown: "Pacing: 0/2 • Audio: 0/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 1/10)",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Classic storytelling with very slow pacing and emotional literacy focus. Promotes imagination and calm viewing habits.",
    checkmarks: ["Extremely slow pacing", "Daily routine focus", "Imaginative play"],
    startWith: ["Father Bear Comes Home", "Little Bear's Wish", "Grandpa's Attic"],
    link: "https://www.youtube.com/channel/UCncFzSeWqySvOXEbQoEJsZg"
  },
  {
    name: "Alphablocks",
    researchAnchor: "National Reading Panel (2000) Synthetic Phonics & Grapheme Mapping",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Short, energetic clips (under 5 minutes) with playful, whimsical letter characters. Structured for early reading readiness.",
    checkmarks: ["Reading readiness", "Clear pronunciation", "Educational foundation"],
    startWith: ["Meet the Alphabet", "Phonics Magic: The Letter A", "Word Magic: Cat & Hat"],
    link: "https://www.youtube.com/c/officialalphablocks"
  },
  {
    name: "Numberblocks",
    researchAnchor: "NCETM (UK) & Singapore Math Number Bond Visual Framework",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Teaches math concepts through animated number characters. Short 5-minute episodes with clear visuals and counting songs.",
    checkmarks: ["Concept-driven pacing", "Clear visuals", "Number recognition"],
    startWith: ["Meet Numberblock One", "Number Magic 1 to 5", "Ten Again"],
    link: "https://www.youtube.com/channel/UCPlwvN0w4qFSP1FllALB92w"
  },
  {
    name: "Sarah & Duck",
    researchAnchor: "Lillard & Peterson (2011) Deliberate Story Pacing & Everyday Routines",
    semBreakdown: "Pacing: 0/2 • Audio: 0/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 2/10)",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Simple animation with gentle narration. Focuses on problem-solving, friendship, and everyday adventures.",
    checkmarks: ["Simple animation", "Gentle narration", "Everyday adventures"],
    startWith: ["Lots of Shallots", "Bouncing Ball", "Ribbon Sisters"],
    link: "https://www.youtube.com/channel/UC3OUMU3s7Oy6Ta0wnpZFBWw"
  },
  {
    name: "Ms. Rachel - Songs for Littles",
    researchAnchor: "Kuhl et al. (2003) Social Gating in Infant Speech Learning",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Speech development focus with interactive approach. Expert-designed content for language acquisition.",
    checkmarks: ["Speech development focus", "Interactive approach", "Expert design"],
    startWith: ["First Words & Speech Practice", "Baby Learning Songs", "Phonics & Gentle Rhymes"],
    link: "https://www.youtube.com/@msrachel"
  },
  {
    name: "Hey Duggee",
    researchAnchor: "Bandura (1977) Social Modeling & Activity Goal Setting",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Simple animation with clear narration. Activity-based learning focusing on teamwork and achievement.",
    checkmarks: ["Simple animation", "Clear narration", "Activity-based learning"],
    startWith: ["The Drawing Badge", "The Birdwatching Badge", "The Tree Badge"],
    link: "https://www.youtube.com/channel/UCj_mFUb-47d9QNiJ5556LjQ"
  },
  {
    name: "Bluey",
    researchAnchor: "Singer & Singer (2005) Sociodramatic Play & Emotional Co-Regulation",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
    age: "toddler",
    ageLabel: "Toddlers (Ages 2-3)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Story-driven pacing with natural dialogue. Focuses on imaginative play, family relationships, and play-based learning.",
    checkmarks: ["Story-driven pacing", "Natural dialogue", "Play-based learning"],
    startWith: ["Rain (Tranquil Dialogue-Free Episode)", "Sleepytime (Holst's Jupiter Orchestral)", "Camping"],
    link: "https://www.youtube.com/channel/UCVzLLZkDuFGAE2BGdBuBNBg"
  },

  // --- PRESCHOOLERS (AGES 4-5) ---
  {
    name: "Puffin Rock",
    researchAnchor: "Lillard & Peterson (2011) Low-Pacing Baseline; CPM < 3",
    semBreakdown: "Pacing: 0/2 • Audio: 0/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 1/10)",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "1/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Described as 'Bob Ross level soothing' with gentle narration by Chris O'Dowd. Focuses on nature exploration and family relationships.",
    checkmarks: ["Gentle narration", "Natural sounds", "Watercolor animation"],
    startWith: ["Oona and Baba", "Tidal Pool Adventure", "Stormy Weather"],
    link: "https://www.youtube.com/c/PuffinRock"
  },
  {
    name: "Alphablocks",
    researchAnchor: "National Reading Panel (2000) Synthetic Phonics & Grapheme Mapping",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "3/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Each cube-shaped letter has a unique personality matching its sound, creating engaging phonics lessons.",
    checkmarks: ["Clear pronunciation", "Visual phonics concepts", "Reading foundations"],
    startWith: ["Meet the Alphabet", "Phonics Magic: The Letter A", "Word Magic: Cat & Hat"],
    link: "https://www.youtube.com/c/officialalphablocks"
  },
  {
    name: "Numberblocks",
    researchAnchor: "NCETM (UK) & Singapore Math Number Bond Visual Framework",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
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
    researchAnchor: "Diamond (2013) Embodied Self-Regulation & Motor Mindfulness",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
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
    researchAnchor: "Anderson & Pempek (2005) Toddler Linguistic Cadence & Clear Articulation",
    semBreakdown: "Pacing: 0/2 • Audio: 1/2 • Visual: 0/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 2/10)",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "2/10",
    stimulusClass: "stimulus-low",
    whyThisChannel: "Deliberate pacing with clear language focus. Songs specifically designed with simple, repetitive patterns and slow tempo.",
    checkmarks: ["Language development", "Clear vocals", "Educational songs"],
    startWith: ["Meet Numberblock One", "Number Magic 1 to 5", "Ten Again"],
    link: "https://www.youtube.com/channel/UCLsooMJoIpl_7ux2jvdPB-Q"
  },
  {
    name: "Sesame Street",
    researchAnchor: "Fisch & Truglio (2001) 'G' is for Growing: 30 Years of Research",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 4/10)",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "4-5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Research-backed educational content with social skills focus. Select quieter segments for lower stimulus viewing.",
    checkmarks: ["Educational research base", "Diverse representation", "Social-emotional learning"],
    startWith: ["Breathe with Elmo & Colbie Caillat", "Count von Count Number Walks", "Cookie Monster Mindfulness"],
    link: "https://www.youtube.com/sesamestreet"
  },
  {
    name: "StoryBots",
    researchAnchor: "Hirsh-Pasek et al. (2015) Question-Driven Inquiry Pedagogy",
    semBreakdown: "Pacing: 2/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 5/10)",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Question-based learning that encourages curiosity. Varied animation styles keep interest while teaching information literacy.",
    checkmarks: ["Encourages questions", "Varied topics", "Information literacy"],
    startWith: ["How Does the Eye See?", "Why Do We Brush Our Teeth?", "How Do Airplanes Fly?"],
    link: "https://www.youtube.com/playlist?list=PLPphPHIzdSQPhHIEDhqwg0qh5p-FgwxTH"
  },
  {
    name: "PBS Kids",
    researchAnchor: "US Dept of Education Ready to Learn Grant Longitudinal Research",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 4/10)",
    age: "preschool",
    ageLabel: "Preschoolers (Ages 4-5)",
    stimulusScore: "4-5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Wide variety of educational shows with varying pacing. Most have faster editing than dedicated low-stimulus content but still have an educational focus.",
    checkmarks: ["Research-backed content", "Diverse representation", "Social skills focus"],
    startWith: ["Daniel Tiger: Count to Four", "Peg + Cat: The Golden Egg Math", "Wild Kratts: Great Horned Owl"],
    link: "https://www.youtube.com/pbskids"
  },

  // --- EARLY ELEMENTARY (AGES 6-7) ---
  {
    name: "Art for Kids Hub",
    researchAnchor: "Vygotsky (1978) Zone of Proximal Development in Fine Motor Drawing",
    semBreakdown: "Pacing: 1/2 • Audio: 0/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
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
    researchAnchor: "Dewey (1938) Phenomenon-Driven Inquiry & Socratic Questioning",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 4/10)",
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
    researchAnchor: "NRC (2012) K-12 Framework for Scientific Conceptual Literacy",
    semBreakdown: "Pacing: 2/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 5/10)",
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
    researchAnchor: "US Dept of Education Ready to Learn Grant Longitudinal Research",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 4/10)",
    age: "early-elementary",
    ageLabel: "Early Elementary (Ages 6-7)",
    stimulusScore: "4-5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Character-based learning with research backing. Balanced pacing with focus on educational outcomes.",
    checkmarks: ["Educational research", "Character learning", "Balanced content"],
    startWith: ["Daniel Tiger: Count to Four", "Peg + Cat: The Golden Egg Math", "Wild Kratts: Great Horned Owl"],
    link: "https://www.youtube.com/pbskids"
  },
  {
    name: "TED-Ed",
    researchAnchor: "Mayer (2009) Multimedia Learning Principles & Dual Coding",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 2/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 5/10)",
    age: "early-elementary",
    ageLabel: "Early Elementary (Ages 6-7)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Animated explanations of diverse topics with thoughtful pacing. Encourages curiosity about the world.",
    checkmarks: ["Well-paced animations", "Diverse topics", "Critical thinking"],
    startWith: ["How Do Memories Form?", "Why Do We Dream?", "How Does the Immune System Work?"],
    link: "https://www.youtube.com/TEDEducation"
  },

  // --- MIDDLE ELEMENTARY (AGES 8-9) ---
  {
    name: "National Geographic Kids",
    researchAnchor: "E.O. Wilson (1984) Biophilia Hypothesis & Habitat Observation",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 2/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 5/10)",
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
    researchAnchor: "Next Generation Science Standards (NGSS) Earth & Physical Systems",
    semBreakdown: "Pacing: 2/2 • Audio: 1/2 • Visual: 2/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 6/10)",
    age: "middle-elementary",
    ageLabel: "Middle Elementary (Ages 8-9)",
    stimulusScore: "6/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Systematic science education aligned with standards. Builds knowledge progressively with moderate pacing.",
    checkmarks: ["Standards-aligned", "Systematic learning", "Critical thinking"],
    startWith: ["Amazing Animals: Sea Otters", "Habitat Discovery: Rain Forests", "Weird But True: Ocean Giants"],
    link: "https://www.youtube.com/crashcoursekids"
  },
  {
    name: "Art for Kids Hub",
    researchAnchor: "Vygotsky (1978) Zone of Proximal Development in Fine Motor Drawing",
    semBreakdown: "Pacing: 1/2 • Audio: 0/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 3/10)",
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
    researchAnchor: "Paivio (1986) Dual-Coding Auditory Rhyme in Geography Retention",
    semBreakdown: "Pacing: 2/2 • Audio: 2/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 6/10)",
    age: "middle-elementary",
    ageLabel: "Middle Elementary (Ages 8-9)",
    stimulusScore: "6/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Educational songs that aid memory through music. Covers varied topics with global awareness focus.",
    checkmarks: ["Memory through music", "Varied topics", "Global awareness"],
    startWith: ["The Basics of Engineering", "Ecosystem Interactions: Food Webs", "Gravity & Earth's Spheres"],
    link: "https://www.youtube.com/channel/UC7EFWpvc1wYuUwrtZ_BLi9A"
  },
  {
    name: "Mystery Doug",
    researchAnchor: "Dewey (1938) Phenomenon-Driven Inquiry & Socratic Questioning",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 4/10)",
    age: "middle-elementary",
    ageLabel: "Middle Elementary (Ages 8-9)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Question-based learning with controlled transitions. Encourages critical thinking through scientific inquiry.",
    checkmarks: ["Question-based learning", "Controlled transitions", "Critical thinking"],
    startWith: ["The Solar System Song", "Continents & Oceans of the World", "The Skeletal System"],
    link: "https://www.youtube.com/mysterydoug"
  },

  // --- PRE-TEENS (AGES 10-12) ---
  {
    name: "Veritasium",
    researchAnchor: "Muller et al. (2008) Addressing Physics Misconceptions via Dialogue",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 4/10)",
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
    researchAnchor: "Feynman Technique of Physical Observation & High-Speed Optics",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 2/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 5/10)",
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
    researchAnchor: "American Association of Physics Teachers (AAPT) Exploratory Models",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 2/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 5/10)",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "5/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Female STEM representation with clean graphics. Makes physics accessible through clear explanations.",
    checkmarks: ["STEM representation", "Clear graphics", "Scientific thinking"],
    startWith: ["The Science of Thinking", "Why Trees Don't Run Out of Water", "Secret of Synchronization"],
    link: "https://www.youtube.com/c/physicsgirl"
  },
  {
    name: "Mark Rober",
    researchAnchor: "Engineering Prototyping Cycle; High-Stimulus Dynamic Editing",
    semBreakdown: "Pacing: 2/2 • Audio: 2/2 • Visual: 2/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 7/10)",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "7/10",
    stimulusClass: "stimulus-high",
    whyThisChannel: "Engineering projects with design thinking focus. Real-world applications that inspire problem-solving.",
    checkmarks: ["Engineering focus", "Design thinking", "Real applications"],
    startWith: ["How Rockets Steer in Space", "Physics of Cat Twisting in Slow Motion", "How Birds Fly in Air"],
    link: "https://www.youtube.com/markrober"
  },
  {
    name: "TED-Ed",
    researchAnchor: "Mayer (2009) Multimedia Learning Principles & Dual Coding",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 2/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 5/10)",
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
    researchAnchor: "NRC (2012) K-12 Framework for Scientific Conceptual Literacy",
    semBreakdown: "Pacing: 2/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 5/10)",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "6/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Scientific literacy with moderate pacing. Clear explanations aligned with educational standards.",
    checkmarks: ["Scientific literacy", "Moderate pacing", "Clear explanations"],
    startWith: ["How Do Memories Form?", "Why Do We Dream?", "How Does the Immune System Work?"],
    link: "https://www.youtube.com/scishowkids"
  },
  {
    name: "Mystery Science",
    researchAnchor: "NGSS Phenomenon-Driven Elementary Science Modules",
    semBreakdown: "Pacing: 1/2 • Audio: 1/2 • Visual: 1/2 • Pressure: 0/2 • Ad/Host: 1/2 (Total: 4/10)",
    age: "preteen",
    ageLabel: "Pre-Teens (Ages 10-12)",
    stimulusScore: "4/10",
    stimulusClass: "stimulus-med",
    whyThisChannel: "Question-based learning with clear explanations. Promotes scientific inquiry with thoughtful pacing.",
    checkmarks: ["Question-based learning", "Clear explanations", "Scientific inquiry"],
    startWith: ["Why Does Ice Float?", "Singing Plates & Sound Waves (Chladni)", "How Waves Move Underwater"],
    link: "https://www.youtube.com/channel/UCPRCRM3JKm3sw55lB_427qg"
  }
];

// Comprehensive Database of Educator-Approved, Low-Stimulus Cognitive Games
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
    "category": "creative",
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
      "iOS / iPadOS"
    ],
    "monetization": "Subscription (Zero Ads/IAPs)",
    "monetizationType": "paid",
    "link": "https://playpokpok.com",
    "researchAnchor": "Hirsh-Pasek et al. (2015) Active Mind-On Play; Montessori Auto-Education",
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 0/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 1/10)"
  },
  {
    "name": "Sago Mini World / Forest Flyer",
    "developer": "Sago Mini",
    "age": [
      "toddler"
    ],
    "ageLabel": "Toddlers (Ages 2\u20133)",
    "stimulusScore": "2/10",
    "stimulusClass": "stimulus-low",
    "category": "creative",
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://avokiddo.com",
    "researchAnchor": "Hirsh-Pasek et al. (2015) Spatial Problem-Solving & Physics Intuition",
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "Monument Valley 1 & 2",
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
    "whyEducatorsApprove": "An architectural masterpiece exploring impossible geometry and optical illusions. Children manipulate moving platforms and rotate camera angles to create viable walking paths for Princess Ida. The meditative acoustic ambient soundscape and tranquil pacing offer a deeply calming, contemplative alternative to twitch mobile games.",
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 0/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 1/10)"
  },
  {
    "name": "DragonBox Numbers",
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
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://dragonbox.com",
    "researchAnchor": "Singapore Ministry of Education CPA (Concrete-Pictorial-Abstract) Framework",
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 0/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 1/10)"
  },
  {
    "name": "DragonBox Big Numbers",
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
      "One-time upfront purchase"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://dragonbox.com",
    "researchAnchor": "Sj\u00f6man et al. (2015), Computers & Education; Base-10 Structuring",
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
  },
  {
    "name": "DragonBox Algebra (5+ & 12+)",
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
      "One-time purchase without microtransactions"
    ],
    "platforms": [
      "iOS",
      "Android"
    ],
    "monetization": "One-Time Purchase",
    "monetizationType": "paid",
    "link": "https://dragonbox.com",
    "researchAnchor": "Sj\u00f6man et al. (2015), Computers & Education; Norwegian Research Council",
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 1/2 \u2022 Visual: 1/2 \u2022 Pressure: 1/2 \u2022 Reward: 0/2 (Total: 4/10)"
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
    "semBreakdown": "Pacing: 0/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 2/10)"
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
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
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
    "semBreakdown": "Pacing: 1/2 \u2022 Audio: 0/2 \u2022 Visual: 1/2 \u2022 Pressure: 0/2 \u2022 Reward: 0/2 (Total: 3/10)"
  }
];

// ==================== CHANNEL CONTROLS & RENDERING ====================
let currentChannelFilter = 'all';
let currentChannelSearch = '';

function renderChannels() {
  const container = document.getElementById('channel-grid');
  if (!container) return;

  const filtered = channelsData.filter(ch => {
    const ageVal = Array.isArray(ch.age) ? ch.age : [ch.age || ''];
    const matchesFilter = currentChannelFilter === 'all' || ageVal.includes(currentChannelFilter);

    const matchesSearch = !currentChannelSearch ||
                          (ch.name && ch.name.toLowerCase().includes(currentChannelSearch)) ||
                          (ch.whyThisChannel && ch.whyThisChannel.toLowerCase().includes(currentChannelSearch)) ||
                          (ch.ageLabel && ch.ageLabel.toLowerCase().includes(currentChannelSearch)) ||
                          (ch.checkmarks && ch.checkmarks.some(c => c.toLowerCase().includes(currentChannelSearch)));
    return matchesFilter && matchesSearch;
  });

  const countBadge = document.getElementById('channel-count-badge');
  if (countBadge) {
    countBadge.innerText = `${filtered.length} channels`;
  }

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

        <div class="citation-box">
          <div><strong>📚 Research Anchor:</strong> ${ch.researchAnchor || 'Lillard & Peterson (2011) Pacing Guidelines'}</div>
          <div style="margin-top:0.25rem;"><strong>🔬 SEM-10 Rubric:</strong> <span class="sem-badge">${ch.semBreakdown || 'Pacing: Low • Audio: Balanced • Visual: Calm'}</span></div>
        </div>
        
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

function setupChannelFilterListeners() {
  const buttons = document.querySelectorAll('#channel-filters .filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeBtn = e.currentTarget || e.target;
      buttons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      currentChannelFilter = activeBtn.getAttribute('data-filter') || 'all';
      renderChannels();
    });
  });
}

function setupChannelSearch() {
  const input = document.getElementById('channel-search');
  if (!input) return;
  input.addEventListener('input', (e) => {
    currentChannelSearch = e.target.value.toLowerCase().trim();
    renderChannels();
  });
}

// ==================== EDUCATOR GAMES CONTROLS & RENDERING ====================
let currentGameAgeFilter = 'all';
let currentGameDomainFilter = 'all';
let currentGameSearch = '';

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
    countBadge.innerText = `${filtered.length} games`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; font-weight: 600;">No educational games match your search criteria.</p>
        <p style="font-size: 0.9rem;">Try selecting 'All Games' or clearing the domain and search filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(g => {
    const monetizationClass = 
      g.monetizationType === 'free' ? 'monetization-free' :
      g.monetizationType === 'foss' ? 'monetization-foss' :
      g.monetizationType === 'arcade' ? 'monetization-arcade' : 'monetization-paid';

    return `
      <div class="card game-card">
        <div>
          <div class="channel-header">
            <div>
              <div class="channel-name">${g.name}</div>
              <div style="font-size:0.75rem; color:var(--text-light); font-weight:500;">By ${g.developer}</div>
            </div>
            <span class="stimulus-tag ${g.stimulusClass}">Stimulus: ${g.stimulusScore}</span>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin: 0.6rem 0;">
            <span class="tag-badge" style="background:#e0f2fe; color:#0369a1; font-weight:600;">${g.ageLabel}</span>
            <span class="monetization-badge ${monetizationClass}">${g.monetization}</span>
          </div>

          <div style="margin-bottom:0.75rem;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-light); text-transform:uppercase; margin-bottom:0.25rem;">Cognitive Focus:</div>
            <div style="display:flex; flex-wrap:wrap; gap:0.25rem;">
              ${g.cognitiveSkills.map(cs => `<span class="domain-badge">${cs}</span>`).join('')}
            </div>
          </div>

          ${g.endorsements && g.endorsements.length > 0 ? `
            <div style="margin-bottom:0.75rem;">
              <div style="font-size:0.72rem; font-weight:700; color:var(--text-light); text-transform:uppercase; margin-bottom:0.25rem;">Educator Backing:</div>
              <div style="display:flex; flex-wrap:wrap; gap:0.25rem;">
                ${g.endorsements.map(ed => `<span class="endorsement-badge">★ ${ed}</span>`).join('')}
              </div>
            </div>
          ` : ''}

          <p class="channel-desc" style="margin-bottom:0.75rem;"><strong>Why Educators Approve:</strong> ${g.whyEducatorsApprove}</p>

          <div class="citation-box">
            <div><strong>📚 Research Anchor:</strong> ${g.researchAnchor}</div>
            <div style="margin-top:0.25rem;"><strong>🔬 SEM-10 Rubric:</strong> <span class="sem-badge">${g.semBreakdown}</span></div>
          </div>

          <div style="background:var(--bg-alt); padding:0.65rem; border-radius:var(--radius-sm); margin-bottom:0.75rem;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-main); margin-bottom:0.3rem;">🛡️ Calm & Ethical Design:</div>
            <ul style="list-style:none; font-size:0.8rem; color:var(--text-muted);">
              ${g.calmHighlights.map(ch => `<li style="display:flex; align-items:flex-start; gap:0.3rem; margin-bottom:0.2rem;"><span style="color:var(--success); font-weight:700;">✓</span> ${ch}</li>`).join('')}
            </ul>
          </div>

          <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.5rem;">
            <strong>Platforms:</strong> ${g.platforms.join(' • ')}
          </div>
        </div>

        <a href="${g.link}" target="_blank" rel="noopener" class="btn btn-outline" style="margin-top:0.75rem; width:100%; justify-content:center;">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          Visit Official Game / App
        </a>
      </div>
    `;
  }).join('');
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
    });
  });
}

function setupGameSearch() {
  const input = document.getElementById('game-search');
  if (!input) return;
  input.addEventListener('input', (e) => {
    currentGameSearch = e.target.value.toLowerCase().trim();
    renderGames();
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
