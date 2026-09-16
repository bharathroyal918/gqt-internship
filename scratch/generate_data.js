const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 1. Categories (12)
const categories = [
  { id: "cat-1", name: "AI Internship", slug: "ai-internship", count: 24, icon: "Brain", description: "Deep Learning, LLMs, Neural Networks, Computer Vision, and NLP applications.", accentColor: "#0B5ED7", bgGradient: "from-blue-600 to-indigo-700" },
  { id: "cat-2", name: "Java Full Stack", slug: "java-full-stack", count: 32, icon: "Code2", description: "Spring Boot, Microservices, Hibernate, REST APIs, and React/Angular frontends.", accentColor: "#DC2626", bgGradient: "from-red-600 to-amber-700" },
  { id: "cat-3", name: "Python Full Stack", slug: "python-full-stack", count: 28, icon: "Terminal", description: "Django, FastAPI, Flask, PostgreSQL, Celery, and Next.js integrations.", accentColor: "#16A34A", bgGradient: "from-emerald-600 to-teal-700" },
  { id: "cat-4", name: "MERN Stack", slug: "mern-stack", count: 30, icon: "Layers", description: "MongoDB, Express.js, React 19, Node.js, and serverless architectures.", accentColor: "#0284C7", bgGradient: "from-cyan-600 to-blue-700" },
  { id: "cat-5", name: "Data Science", slug: "data-science", count: 18, icon: "BarChart3", description: "Pandas, NumPy, Predictive Modeling, PowerBI, Tableau, and Big Data.", accentColor: "#8B5CF6", bgGradient: "from-purple-600 to-indigo-800" },
  { id: "cat-6", name: "Cyber Security", slug: "cyber-security", count: 14, icon: "ShieldCheck", description: "Ethical Hacking, SOC, Penetration Testing, SIEM, and Network Security.", accentColor: "#E11D48", bgGradient: "from-rose-600 to-pink-700" },
  { id: "cat-7", name: "Cloud Computing", slug: "cloud-computing", count: 20, icon: "Cloud", description: "AWS, Azure, Google Cloud Platform, Terraform, and Serverless architectures.", accentColor: "#0284C7", bgGradient: "from-sky-600 to-blue-800" },
  { id: "cat-8", name: "UI UX", slug: "ui-ux", count: 16, icon: "Palette", description: "Figma design systems, wireframing, heuristic evaluation, and interaction design.", accentColor: "#F59E0B", bgGradient: "from-amber-500 to-orange-600" },
  { id: "cat-9", name: "Digital Marketing", slug: "digital-marketing", count: 12, icon: "Megaphone", description: "SEO, Performance Marketing, Social Media Analytics, and Growth Funnels.", accentColor: "#D97706", bgGradient: "from-yellow-600 to-amber-800" },
  { id: "cat-10", name: "Embedded Systems", slug: "embedded-systems", count: 15, icon: "Cpu", description: "ARM Cortex, STM32, RTOS, IoT protocols, Arduino, and Automotive firmware.", accentColor: "#059669", bgGradient: "from-teal-600 to-green-700" },
  { id: "cat-11", name: "DevOps", slug: "devops", count: 19, icon: "GitMerge", description: "Docker, Kubernetes, GitHub Actions, CI/CD, Ansible, and Observability.", accentColor: "#4F46E5", bgGradient: "from-indigo-600 to-violet-800" },
  { id: "cat-12", name: "Testing", slug: "testing", count: 17, icon: "CheckCircle2", description: "Automation testing with Selenium, Playwright, Cypress, TestNG, and JMeter.", accentColor: "#2563EB", bgGradient: "from-blue-500 to-cyan-700" }
];
fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));

// 2. Companies (50)
const companyNames = [
  { name: "Infosys Labs", domain: "IT & Cloud Solutions", loc: "Electronic City, Bangalore", tier: "Enterprise", emp: "250,000+" },
  { name: "Wipro Digital", domain: "Software & Digital Engineering", loc: "Sarjapur Road, Bangalore", tier: "Enterprise", emp: "240,000+" },
  { name: "Tata Consultancy Services", domain: "Consulting & Enterprise Tech", loc: "Whitefield, Bangalore", tier: "Enterprise", emp: "600,000+" },
  { name: "Bosch Global Software", domain: "Automotive & Embedded Systems", loc: "Adugodi, Bangalore", tier: "Global Partner", emp: "35,000+" },
  { name: "L&T Technology Services", domain: "Industrial IoT & Embedded", loc: "Hebbal, Bangalore", tier: "Enterprise", emp: "22,000+" },
  { name: "Dell Technologies", domain: "Cloud & Storage Infrastructure", loc: "Domlur, Bangalore", tier: "Global Partner", emp: "130,000+" },
  { name: "Intel India", domain: "Semiconductor & AI Hardware", loc: "Bellandur, Bangalore", tier: "Global Partner", emp: "14,000+" },
  { name: "PhonePe", domain: "FinTech & Payments", loc: "Bellandur, Bangalore", tier: "Enterprise", emp: "5,000+" },
  { name: "Razorpay", domain: "Payment Gateway & Banking Tech", loc: "Koramangala, Bangalore", tier: "Enterprise", emp: "4,000+" },
  { name: "Zerodha Tech", domain: "FinTech & Trading Platforms", loc: "JP Nagar, Bangalore", tier: "Scale-up", emp: "1,200+" },
  { name: "Titan Company Ltd", domain: "IoT & Smart Wearables", loc: "Electronic City, Bangalore", tier: "Enterprise", emp: "8,000+" },
  { name: "Tejas Networks", domain: "Optical & 5G Telecom", loc: "Electronic City, Bangalore", tier: "Scale-up", emp: "1,500+" },
  { name: "Mindtree (LTIMindtree)", domain: "Digital Transformation", loc: "Global Village, Bangalore", tier: "Enterprise", emp: "80,000+" },
  { name: "Cisco Systems India", domain: "Networking & Cyber Security", loc: "Cessna Business Park, Bangalore", tier: "Global Partner", emp: "12,000+" },
  { name: "SAP Labs India", domain: "Enterprise ERP & AI Cloud", loc: "Whitefield, Bangalore", tier: "Global Partner", emp: "15,000+" },
  { name: "Oracle India", domain: "Database & Cloud Infrastructure", loc: "Bannerghatta Road, Bangalore", tier: "Global Partner", emp: "40,000+" },
  { name: "Mercedes-Benz R&D India", domain: "Connected Vehicles & Autonomous Tech", loc: "Whitefield, Bangalore", tier: "Global Partner", emp: "7,000+" },
  { name: "Schneider Electric", domain: "Energy Management & Smart Grids", loc: "Attibele, Bangalore", tier: "Global Partner", emp: "20,000+" },
  { name: "HCL Technologies", domain: "IT Infrastructure & Digital", loc: "Jigani, Bangalore", tier: "Enterprise", emp: "220,000+" },
  { name: "Cognizant India", domain: "Enterprise Digital Services", loc: "Manyata Tech Park, Bangalore", tier: "Enterprise", emp: "340,000+" },
  { name: "KPIT Technologies", domain: "Automotive Software & Mobility", loc: "Mahadevapura, Bangalore", tier: "Scale-up", emp: "10,000+" },
  { name: "Subex", domain: "Telecom AI & Fraud Management", loc: "RMZ Ecoworld, Bangalore", tier: "Scale-up", emp: "1,000+" },
  { name: "Happiest Minds", domain: "Generative AI & Cloud Services", loc: "Madivala, Bangalore", tier: "Scale-up", emp: "5,000+" },
  { name: "Tata Elxsi", domain: "Design & Technology Services", loc: "Hoodi, Bangalore", tier: "Enterprise", emp: "12,000+" },
  { name: "Micron Technology", domain: "Memory & Storage Systems", loc: "Marathahalli, Bangalore", tier: "Global Partner", emp: "4,000+" },
  { name: "Siemens Healthineers", domain: "Healthcare AI & Medical Imaging", loc: "Electronic City, Bangalore", tier: "Global Partner", emp: "8,000+" },
  { name: "ABB India", domain: "Industrial Automation & Robotics", loc: "Peenya Industrial Area, Bangalore", tier: "Enterprise", emp: "7,500+" },
  { name: "Honeywell Technology", domain: "Aerospace & Building Tech", loc: "Bellandur, Bangalore", tier: "Global Partner", emp: "15,000+" },
  { name: "Texas Instruments India", domain: "Analog & Embedded Processing", loc: "CV Raman Nagar, Bangalore", tier: "Global Partner", emp: "3,000+" },
  { name: "Continental Automotive", domain: "ADAS & Vehicle Electronics", loc: "Electronic City, Bangalore", tier: "Global Partner", emp: "6,000+" },
  { name: "Persistent Systems", domain: "Software Product Engineering", loc: "Manyata Tech Park, Bangalore", tier: "Scale-up", emp: "23,000+" },
  { name: "Sonata Software", domain: "Modernization Engineering", loc: "Richmond Road, Bangalore", tier: "Scale-up", emp: "6,000+" },
  { name: "Mphasis", domain: "Cloud & Cognitive Services", loc: "Bagmane Tech Park, Bangalore", tier: "Enterprise", emp: "35,000+" },
  { name: "Cyient", domain: "Intelligent Engineering", loc: "Electronic City, Bangalore", tier: "Scale-up", emp: "16,000+" },
  { name: "Birlasoft", domain: "Enterprise Digital & ERP", loc: "Whitefield, Bangalore", tier: "Scale-up", emp: "12,000+" },
  { name: "Quest Global", domain: "Aerospace & Defence Engineering", loc: "Whitefield, Bangalore", tier: "Scale-up", emp: "18,000+" },
  { name: "Global Quest Labs", domain: "GQT Incubation & Product Lab", loc: "HSR Layout, Bangalore", tier: "Startup", emp: "350+" },
  { name: "Swiggy Engineering", domain: "Hyperlocal Logistics & Machine Learning", loc: "Koramangala, Bangalore", tier: "Enterprise", emp: "6,000+" },
  { name: "Flipkart Tech", domain: "E-Commerce & Supply Chain Cloud", loc: "Bellandur, Bangalore", tier: "Enterprise", emp: "15,000+" },
  { name: "Postman India", domain: "API Platform & Developer Tools", loc: "Indiranagar, Bangalore", tier: "Scale-up", emp: "1,200+" },
  { name: "Hasura", domain: "GraphQL & Instant Backend Engines", loc: "Koramangala, Bangalore", tier: "Startup", emp: "400+" },
  { name: "CRED Engineering", domain: "FinTech & Real-Time Payments", loc: "Indiranagar, Bangalore", tier: "Scale-up", emp: "900+" },
  { name: "Groww", domain: "WealthTech & Investment Engines", loc: "Bellandur, Bangalore", tier: "Scale-up", emp: "2,000+" },
  { name: "KreditBee", domain: "Digital Lending & Risk Analytics", loc: "HSR Layout, Bangalore", tier: "Scale-up", emp: "1,500+" },
  { name: "InMobi", domain: "AdTech & Consumer AI", loc: "Kadubeesanahalli, Bangalore", tier: "Scale-up", emp: "2,500+" },
  { name: "Mu Sigma", domain: "Decision Sciences & Analytics", loc: "Whitefield, Bangalore", tier: "Scale-up", emp: "3,500+" },
  { name: "Acko General Insurance", domain: "InsurTech & Cloud Microservices", loc: "HSR Layout, Bangalore", tier: "Scale-up", emp: "1,800+" },
  { name: "Urban Company Tech", domain: "Gig Tech & Service Logistics", loc: "Indiranagar, Bangalore", tier: "Scale-up", emp: "1,400+" },
  { name: "Ather Energy", domain: "EV Powertrains & Connected Firmware", loc: "IBC Knowledge Park, Bangalore", tier: "Scale-up", emp: "3,000+" },
  { name: "Ola Electric Mobility", domain: "EV Battery Tech & Smart OS", loc: "Koramangala, Bangalore", tier: "Scale-up", emp: "4,000+" }
];

const companies = companyNames.map((c, idx) => ({
  id: `comp-${idx + 1}`,
  name: c.name,
  logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=0B5ED7&color=fff&size=128&bold=true`,
  domain: c.domain,
  location: c.loc,
  openRoles: Math.floor(Math.random() * 8) + 2,
  rating: parseFloat((4.1 + Math.random() * 0.8).toFixed(1)),
  reviewsCount: Math.floor(Math.random() * 400) + 50,
  website: `https://${c.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
  linkedin: `https://linkedin.com/company/${c.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
  about: `${c.name} is a market leader in ${c.domain}, partnering with Global Quest Technologies to train and deploy aspiring engineers from VTU and premier institutes across Karnataka through structured internship programs.`,
  tier: c.tier,
  verified: true,
  foundedYear: 1980 + (idx % 42),
  employees: c.emp
}));
fs.writeFileSync(path.join(dataDir, 'companies.json'), JSON.stringify(companies, null, 2));

// 3. Colleges (30 VTU Colleges)
const collegesList = [
  { name: "RV College of Engineering", short: "RVCE", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1RV", est: 1963 },
  { name: "BMS College of Engineering", short: "BMSCE", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1BM", est: 1946 },
  { name: "MS Ramaiah Institute of Technology", short: "MSRIT", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1MS", est: 1962 },
  { name: "PES Institute of Technology (South Campus)", short: "PESIT", dist: "Bangalore Urban", univ: "VTU Affiliated", code: "1PE", est: 1988 },
  { name: "National Institute of Engineering", short: "NIE Mysore", dist: "Mysuru", univ: "VTU / Autonomous", code: "4NI", est: 1946 },
  { name: "Siddaganga Institute of Technology", short: "SIT Tumkur", dist: "Tumakuru", univ: "VTU / Autonomous", code: "1SI", est: 1963 },
  { name: "Dayananda Sagar College of Engineering", short: "DSCE", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1DS", est: 1979 },
  { name: "BMS Institute of Technology and Management", short: "BMSIT", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1BY", est: 2002 },
  { name: "Sir M Visvesvaraya Institute of Technology", short: "Sir MVIT", dist: "Bangalore Urban", univ: "VTU Affiliated", code: "1MV", est: 1986 },
  { name: "Bangalore Institute of Technology", short: "BIT", dist: "Bangalore Urban", univ: "VTU Affiliated", code: "1BI", est: 1979 },
  { name: "BNM Institute of Technology", short: "BNMIT", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1BN", est: 2001 },
  { name: "KLE Technological University (B.V. Bhoomaraddi)", short: "KLE Tech", dist: "Hubballi-Dharwad", univ: "State Private / VTU Partner", code: "2BV", est: 1947 },
  { name: "Sri Jayachamarajendra College of Engineering", short: "SJCE (JSS STU)", dist: "Mysuru", univ: "Autonomous / VTU Partner", code: "4JC", est: 1963 },
  { name: "Malnad College of Engineering", short: "MCE Hassan", dist: "Hassan", univ: "VTU / Autonomous", code: "4MC", est: 1960 },
  { name: "PDA College of Engineering", short: "PDACE Kalaburagi", dist: "Kalaburagi", univ: "VTU / Autonomous", code: "3PD", est: 1958 },
  { name: "NMAM Institute of Technology", short: "NMAMIT Nitte", dist: "Udupi", univ: "Deemed / VTU Partner", code: "4NM", est: 1986 },
  { name: "St Joseph Engineering College", short: "SJEC Mangaluru", dist: "Dakshina Kannada", univ: "VTU / Autonomous", code: "4SO", est: 2002 },
  { name: "Canara Engineering College", short: "CEC Mangaluru", dist: "Dakshina Kannada", univ: "VTU Affiliated", code: "4CB", est: 2001 },
  { name: "Sahyadri College of Engineering & Management", short: "SCEM", dist: "Dakshina Kannada", univ: "VTU / Autonomous", code: "4SF", est: 2007 },
  { name: "KLS Gogte Institute of Technology", short: "GIT Belagavi", dist: "Belagavi", univ: "VTU / Autonomous", code: "2GI", est: 1979 },
  { name: "Basaveshwar Engineering College", short: "BEC Bagalkot", dist: "Bagalkot", univ: "VTU / Autonomous", code: "2BA", est: 1963 },
  { name: "SDM College of Engineering and Technology", short: "SDMCET Dharwad", dist: "Dharwad", univ: "VTU / Autonomous", code: "2SD", est: 1979 },
  { name: "UBDT College of Engineering", short: "UBDT Davanagere", dist: "Davanagere", univ: "VTU Constituent College", code: "4BD", est: 1951 },
  { name: "New Horizon College of Engineering", short: "NHCE", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1NH", est: 2001 },
  { name: "JSS Academy of Technical Education", short: "JSSATE", dist: "Bangalore Urban", univ: "VTU Affiliated", code: "1JS", est: 1997 },
  { name: "Acharya Institute of Technology", short: "AIT", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1AA", est: 2000 },
  { name: "RNS Institute of Technology", short: "RNSIT", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1RN", est: 2001 },
  { name: "CMR Institute of Technology", short: "CMRIT", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1CR", est: 2000 },
  { name: "Nitte Meenakshi Institute of Technology", short: "NMIT", dist: "Bangalore Urban", univ: "VTU / Autonomous", code: "1NT", est: 2001 },
  { name: "Vidyavardhaka College of Engineering", short: "VVCE Mysore", dist: "Mysuru", univ: "VTU / Autonomous", code: "4VV", est: 1997 }
];

const colleges = collegesList.map((col, idx) => ({
  id: `col-${idx + 1}`,
  name: col.name,
  shortCode: col.short,
  district: col.dist,
  state: "Karnataka",
  university: col.univ,
  placementOfficer: `Prof. ${['K. S. Narayana', 'M. Ramesh', 'S. Chandrashekar', 'V. Anitha', 'H. P. Suresh', 'B. K. Raghu', 'Deepak Patil', 'Geetha Rao', 'P. Mahadev'][idx % 9]}`,
  officerEmail: `placement@${col.short.toLowerCase().replace(/[^a-z0-9]/g, '')}.ac.in`,
  officerPhone: `+91 9845${Math.floor(100000 + Math.random() * 899999)}`,
  accreditation: idx % 3 === 0 ? "NAAC A++ / NBA Accredited" : "NAAC A+ / NBA Accredited",
  established: col.est,
  activeStudents: Math.floor(Math.random() * 2500) + 1200,
  assignedInternships: Math.floor(Math.random() * 80) + 25,
  status: "Active"
}));
fs.writeFileSync(path.join(dataDir, 'colleges.json'), JSON.stringify(colleges, null, 2));

// 4. Internships (100)
const roleTemplates = [
  { title: "Generative AI Research Intern", cat: "AI Internship", skills: ["Python", "PyTorch", "HuggingFace", "LangChain", "RAG"] },
  { title: "Computer Vision & Edge AI Intern", cat: "AI Internship", skills: ["OpenCV", "TensorFlow", "YOLOv8", "CUDA", "C++"] },
  { title: "Natural Language Processing (NLP) Intern", cat: "AI Internship", skills: ["Transformers", "BERT", "Python", "NLTK", "SpaCy"] },
  { title: "Java Full Stack Developer Intern", cat: "Java Full Stack", skills: ["Java 21", "Spring Boot", "Hibernate", "React", "PostgreSQL"] },
  { title: "Enterprise Backend Engineering Intern", cat: "Java Full Stack", skills: ["Java", "Spring Cloud", "Kafka", "Microservices", "Docker"] },
  { title: "Full Stack Java Cloud Developer", cat: "Java Full Stack", skills: ["Spring Boot", "Angular", "REST APIs", "AWS", "MySQL"] },
  { title: "Python & FastAPI Backend Intern", cat: "Python Full Stack", skills: ["Python 3.12", "FastAPI", "SQLAlchemy", "Redis", "Celery"] },
  { title: "Django Full Stack Web Intern", cat: "Python Full Stack", skills: ["Python", "Django", "Tailwind CSS", "React", "PostgreSQL"] },
  { title: "Python Data & Backend Developer", cat: "Python Full Stack", skills: ["Python", "Flask", "Pandas", "GraphQL", "Docker"] },
  { title: "MERN Stack Application Intern", cat: "MERN Stack", skills: ["MongoDB", "Express.js", "React 19", "Node.js", "TypeScript"] },
  { title: "Frontend Next.js 15 Engineering Intern", cat: "MERN Stack", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit"] },
  { title: "Node.js Microservices Intern", cat: "MERN Stack", skills: ["Node.js", "NestJS", "TypeScript", "RabbitMQ", "MongoDB"] },
  { title: "Data Science & Predictive Analytics Intern", cat: "Data Science", skills: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Statistics"] },
  { title: "Business Intelligence & Analytics Intern", cat: "Data Science", skills: ["PowerBI", "SQL", "Tableau", "Excel", "Data Modeling"] },
  { title: "Big Data & PySpark Engineering Intern", cat: "Data Science", skills: ["PySpark", "Hadoop", "Python", "BigQuery", "Data Pipelines"] },
  { title: "Cyber Security & SOC Analyst Intern", cat: "Cyber Security", skills: ["SIEM", "Splunk", "Wireshark", "Network Defense", "Incident Response"] },
  { title: "Penetration Testing & Ethical Hacking Intern", cat: "Cyber Security", skills: ["Burp Suite", "Metasploit", "Kali Linux", "OWASP Top 10", "Python"] },
  { title: "Cloud Infrastructure & AWS Intern", cat: "Cloud Computing", skills: ["AWS Core", "Terraform", "EC2", "S3", "CloudFormation"] },
  { title: "Azure Cloud Engineering Intern", cat: "Cloud Computing", skills: ["Azure Cloud", "Docker", "PowerShell", "ARM Templates", "Linux"] },
  { title: "UI/UX Product Design Intern", cat: "UI UX", skills: ["Figma", "Design Systems", "Wireframing", "User Research", "Prototyping"] },
  { title: "Digital Interaction Designer Intern", cat: "UI UX", skills: ["Figma", "Design Thinking", "Adobe XD", "Mobile UI", "Usability Testing"] },
  { title: "Growth & Performance Marketing Intern", cat: "Digital Marketing", skills: ["Google Ads", "Meta Ads", "SEO", "Google Analytics 4", "Copywriting"] },
  { title: "SEO & Content Marketing Strategy Intern", cat: "Digital Marketing", skills: ["Technical SEO", "Ahrefs", "Content Strategy", "SEM", "WordPress"] },
  { title: "Embedded Firmware Engineering Intern", cat: "Embedded Systems", skills: ["Embedded C", "STM32", "ARM Cortex", "UART/SPI/I2C", "Keil"] },
  { title: "Automotive RTOS & IoT Firmware Intern", cat: "Embedded Systems", skills: ["FreeRTOS", "CAN Bus", "C++", "Microcontrollers", "Python"] },
  { title: "DevOps & CI/CD Cloud Intern", cat: "DevOps", skills: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Linux"] },
  { title: "Cloud Automation & Site Reliability Intern", cat: "DevOps", skills: ["Ansible", "Prometheus", "Grafana", "Bash Scripting", "AWS"] },
  { title: "Software Automation Quality Intern", cat: "Testing", skills: ["Selenium", "Java", "TestNG", "Maven", "Jira", "API Testing"] },
  { title: "Playwright & TypeScript Testing Intern", cat: "Testing", skills: ["Playwright", "TypeScript", "Jest", "Postman", "CI Testing"] }
];

const locations = [
  "Bangalore, Karnataka",
  "Electronic City, Bangalore",
  "Whitefield, Bangalore",
  "HSR Layout, Bangalore",
  "Mysuru, Karnataka",
  "Hubballi, Karnataka",
  "Mangaluru, Karnataka",
  "Belagavi, Karnataka",
  "Remote, India",
  "Hybrid - Bangalore"
];

const modes = ["Remote", "Hybrid", "On-site"];
const types = ["Academic VTU", "Full-time", "Part-time", "Summer Internship"];
const durations = ["2 Months", "3 Months", "4 Months", "6 Months"];

const internships = [];
for (let i = 1; i <= 100; i++) {
  const tmpl = roleTemplates[(i - 1) % roleTemplates.length];
  const comp = companies[(i * 3 + 7) % companies.length];
  const mode = modes[i % modes.length];
  const type = types[i % types.length];
  const loc = mode === "Remote" ? "Remote, India" : locations[(i + 2) % locations.length];
  const dur = durations[i % durations.length];
  const stipendAmount = ((i % 7) + 2) * 4000 + (i % 3 === 0 ? 5000 : 0); // ₹8,000 to ₹37,000
  const stipend = `₹${stipendAmount.toLocaleString('en-IN')} / month`;

  internships.push({
    id: `gqt-int-${i.toString().padStart(3, '0')}`,
    title: `${tmpl.title}${i > 30 ? ` (Batch ${Math.floor(i / 10) + 1})` : ''}`,
    companyId: comp.id,
    company: comp.name,
    companyLogo: comp.logo,
    location: loc,
    mode: mode,
    type: type,
    duration: dur,
    stipend: stipend,
    stipendAmount: stipendAmount,
    category: tmpl.cat,
    skills: tmpl.skills,
    deadline: `2026-${String(((i % 4) + 10)).padStart(2, '0')}-${String(((i * 7) % 27) + 1).padStart(2, '0')}`,
    postedDate: `2026-09-${String(((i % 14) + 1)).padStart(2, '0')}`,
    vacancies: (i % 8) + 3,
    eligibility: `BE / B.Tech / MCA students of 6th, 7th & 8th Semesters with minimum 6.5 CGPA. VTU NOC eligible.`,
    responsibilities: [
      `Collaborate directly with the senior engineering team on core ${tmpl.cat} architecture.`,
      `Develop robust, unit-tested code conforming to industry standard design patterns.`,
      `Participate in daily Agile scrums, sprint planning, and code review pull requests.`,
      `Document architectural decisions and submit weekly progress milestones for VTU credit review.`
    ],
    learningOutcomes: [
      `Hands-on production deployment experience with modern cloud tooling.`,
      `Mastery of ${tmpl.skills.slice(0, 3).join(', ')} in a collaborative team setup.`,
      `Official Industry Internship Certificate validated through GQT verification portal.`,
      `Pre-Placement Interview (PPI) eligibility for high-performing interns.`
    ],
    certificateProvided: true,
    featured: i <= 16 || i % 6 === 0,
    status: i % 15 === 0 ? "draft" : (i % 25 === 0 ? "archived" : "published"),
    applicantsCount: Math.floor(Math.random() * 120) + 15,
    bannerImage: `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80`,
    aboutRole: `As a ${tmpl.title} at ${comp.name}, you will work on mission-critical applications that serve enterprise and retail customers. This role is formally accredited by Global Quest Technologies under VTU Internship Scheme guidelines.`
  });
}
fs.writeFileSync(path.join(dataDir, 'internships.json'), JSON.stringify(internships, null, 2));

// 5. Circulars (20)
const circulars = [
  {
    id: "circ-001",
    title: "Mandatory Guidelines for VTU 8th Semester Industry Internship (2026 Batch)",
    refNo: "VTU/GQT/INT/2026/041",
    category: "Latest",
    date: "14 Sep 2026",
    priority: "Urgent",
    excerpt: "All engineering colleges affiliated with VTU must verify NOC and ensure internship logging through the GQT Portal.",
    content: "In continuation of university notification regarding mandatory curriculum internships, all students must log daily work diaries and obtain digital approval from internal college guides and company mentors on the GQT Internship Portal.",
    pinned: true,
    showInTicker: true,
    department: "VTU Academic Affairs"
  },
  {
    id: "circ-002",
    title: "GQT Mega Placement & Internship Fair - Bengaluru Tech Summit Edition",
    refNo: "GQT/FAIR/2026/108",
    category: "Placement",
    date: "12 Sep 2026",
    priority: "High",
    excerpt: "Over 80+ tier-1 technology firms participating in the statewide placement drive for final and pre-final year students.",
    content: "Global Quest Technologies in association with IT-BT department is conducting the flagship internship drive. Registrations are open exclusively through student dashboard accounts.",
    pinned: true,
    showInTicker: true,
    department: "Corporate Relations"
  },
  {
    id: "circ-003",
    title: "Guidelines for Submitting Mid-Term Internship Progress Report & Viva Schedule",
    refNo: "VTU/EXAM/INT/26/089",
    category: "Exam",
    date: "10 Sep 2026",
    priority: "High",
    excerpt: "Detailed rubric and evaluation criteria for 2-credit and 3-credit curriculum internship vivas.",
    content: "Colleges are instructed to schedule internal evaluation panels between October 15 and October 30, 2026. Evaluation rubrics can be downloaded from the Circulars archive.",
    pinned: false,
    showInTicker: false,
    department: "Registrar (Evaluation)"
  },
  {
    id: "circ-004",
    title: "Free AI & GenAI Upskilling Bootcamp for Tier-2 & Tier-3 Karnataka Engineering Colleges",
    refNo: "GQT/TRAIN/AI/26/12",
    category: "Training",
    date: "08 Sep 2026",
    priority: "Normal",
    excerpt: "4-week intensive weekend masterclass by Silicon Valley veterans sponsored by GQT CSR Foundation.",
    content: "Eligible colleges can register up to 100 students each for the complimentary hands-on certification path covering LLMs, PyTorch, and cloud deployment.",
    pinned: false,
    showInTicker: true,
    department: "GQT Learning Foundation"
  },
  {
    id: "circ-005",
    title: "Notification Regarding Remote Internship Verification and Attendance Norms",
    refNo: "GQT/ADMIN/NOC/26/77",
    category: "Latest",
    date: "05 Sep 2026",
    priority: "Normal",
    excerpt: "Clarifications on biometric/geo-tagged attendance requirements for remote and hybrid corporate engagements.",
    content: "Companies providing remote internships must submit fortnightly student check-in reports to the affiliated placement offices via the admin portal.",
    pinned: false,
    showInTicker: false,
    department: "Quality Assurance Cell"
  },
  {
    id: "circ-006",
    title: "Bosch & Continental Joint Automotive Firmware Specialization Cohort",
    refNo: "GQT/IND/AUTO/26/03",
    category: "Training",
    date: "02 Sep 2026",
    priority: "High",
    excerpt: "Exclusive 6-month stipend-backed internship in ADAS, AUTOSAR, and CAN protocol programming.",
    content: "Shortlisted candidates will undergo preliminary technical assessment followed by company interviews.",
    pinned: false,
    showInTicker: true,
    department: "Industry Alliances"
  },
  {
    id: "circ-007",
    title: "Cyber Security Hackathon & Fast-Track Internship Hiring by Cisco",
    refNo: "GQT/CYBER/26/19",
    category: "Placement",
    date: "30 Aug 2026",
    priority: "Normal",
    excerpt: "Participate in the 36-hour Capture The Flag (CTF) tournament with direct summer intern offers.",
    content: "Top 25 teams will receive on-the-spot internship letters with stipends up to ₹35,000/month.",
    pinned: false,
    showInTicker: false,
    department: "Events & Hackathons"
  },
  {
    id: "circ-008",
    title: "Circular on Duplicate Internship Claims and Plagiarism in Project Reports",
    refNo: "VTU/VIG/2026/02",
    category: "Exam",
    date: "26 Aug 2026",
    priority: "Urgent",
    excerpt: "Strict action will be initiated against candidates claiming unauthorized external commercial certificates.",
    content: "All certificates must bear verifiable cryptographic hashes issued through GQT or approved AICTE-VTU industry partners.",
    pinned: false,
    showInTicker: false,
    department: "VTU Vigilance Cell"
  }
];

// Append remaining circulars up to 20
for (let c = 9; c <= 20; c++) {
  const catNames = ["Latest", "Placement", "Exam", "Training"];
  const prioNames = ["Normal", "High", "Urgent"];
  circulars.push({
    id: `circ-${c.toString().padStart(3, '0')}`,
    title: `Official Notification No. ${c + 40}: Academic Internship Norms and Placement Policy Update ${c}`,
    refNo: `GQT/NOTIF/2026/${c + 100}`,
    category: catNames[c % catNames.length],
    date: `${Math.max(1, 28 - c)} Aug 2026`,
    priority: prioNames[c % prioNames.length],
    excerpt: `Important policy advisory for college principals and department heads regarding industry internship tracking.`,
    content: `University guidelines require all candidates to maintain minimum 85% logged attendance during corporate internships. For detailed schedule refer to regional office notices.`,
    pinned: false,
    showInTicker: c % 3 === 0,
    department: "Academic Secretariat"
  });
}
fs.writeFileSync(path.join(dataDir, 'circulars.json'), JSON.stringify(circulars, null, 2));

// 6. Testimonials (30)
const testimonialNames = [
  { name: "Pooja Hegde", col: "RV College of Engineering", role: "AI Research Intern", comp: "Infosys Labs", pkg: "₹32,000/mo" },
  { name: "Nikhil Gowda", col: "BMS College of Engineering", role: "Java Backend Intern", comp: "Wipro Digital", pkg: "₹28,000/mo" },
  { name: "Aishwarya Rao", col: "MS Ramaiah Institute of Technology", role: "Cloud Security Intern", comp: "Cisco Systems", pkg: "₹35,000/mo" },
  { name: "Siddharth Shetty", col: "NIE Mysore", role: "MERN Stack Developer", comp: "Razorpay", pkg: "₹30,000/mo" },
  { name: "Sneha Kulkarni", col: "KLE Tech Hubballi", role: "Embedded Firmware Intern", comp: "Bosch Global Software", pkg: "₹26,000/mo" },
  { name: "Varun Deshpande", col: "GIT Belagavi", role: "DevOps & SRE Intern", comp: "PhonePe", pkg: "₹34,000/mo" },
  { name: "Meghana Bhat", col: "NMAMIT Nitte", role: "Data Science Intern", comp: "Dell Technologies", pkg: "₹30,000/mo" },
  { name: "Rohan Patil", col: "SIT Tumkur", role: "Full Stack Python Intern", comp: "Swiggy", pkg: "₹32,000/mo" },
  { name: "Divya Manjunath", col: "Dayananda Sagar College", role: "UI/UX Product Intern", comp: "CRED", pkg: "₹25,000/mo" },
  { name: "Aditya Murthy", col: "BIT Bangalore", role: "Automation QA Intern", comp: "Happiest Minds", pkg: "₹22,000/mo" }
];

const testimonials = [];
for (let t = 1; t <= 30; t++) {
  const base = testimonialNames[(t - 1) % testimonialNames.length];
  testimonials.push({
    id: `test-${t}`,
    name: t > 10 ? `${base.name} (Batch ${t})` : base.name,
    college: base.col,
    branch: ["Computer Science & Engineering", "Information Science", "Electronics & Communication", "AI & Machine Learning"][t % 4],
    batch: "2026 Passing Out",
    role: base.role,
    company: base.comp,
    stipend: base.pkg,
    photo: `https://images.unsplash.com/photo-${[
      "1534528741775-53994a69daeb",
      "1507003211169-0a1dd7228f2d",
      "1517841905240-472988babdf9",
      "1500648767791-00dcc994a43e",
      "1494790108377-be9c29b29330",
      "1522075469751-3a6694fb2f61"
    ][t % 6]}?auto=format&fit=crop&w=300&q=80`,
    rating: 5,
    feedback: `The GQT portal completely streamlined our VTU mandatory internship process. From applying with one click to getting verified digital certificates accepted by our college guide, everything was seamless! Secured a full-time PPI offer before 8th semester ended.`,
    videoBadge: t % 3 === 0
  });
}
fs.writeFileSync(path.join(dataDir, 'testimonials.json'), JSON.stringify(testimonials, null, 2));

// 7. FAQs (50)
const faqs = [];
const faqQuestions = [
  { q: "Is the internship provided on the GQT Portal valid for VTU curriculum credits?", a: "Yes, all internships listed on the Global Quest Technologies portal comply strictly with the Visvesvaraya Technological University (VTU) mandatory 8th semester / 6th semester internship guidelines and AICTE internship norms.", cat: "VTU Guidelines" },
  { q: "How do I download the No Objection Certificate (NOC) for college submission?", a: "Once you receive an offer letter on the portal, navigate to your Student Dashboard > My Applications > View Offer to download your pre-filled university NOC form signed by the hiring company.", cat: "Application Process" },
  { q: "Are all internships listed on this portal paid with stipends?", a: "Over 85% of corporate internships offer competitive stipends ranging from ₹10,000 to ₹45,000 per month. Academic research and CSR foundation cohorts are clearly marked with their respective stipend and allowance details.", cat: "Stipend & Offers" },
  { q: "How does digital certificate verification work?", a: "Every certificate issued through GQT contains a tamper-proof QR code and cryptographic verification ID. Anyone, including college placement officers and future employers, can verify credentials at verify.gqtech.in.", cat: "Certificates" },
  { q: "Can pre-final year students (6th semester) apply for summer internships?", a: "Yes! There are dedicated 2-month and 3-month summer internship openings specifically curated for 6th-semester students to fulfill their academic requirements before final year.", cat: "Application Process" },
  { q: "Can I apply for multiple internships simultaneously?", a: "Yes, students can apply to up to 10 active internships at any given time. Once an offer is accepted, other in-progress applications are automatically placed on hold.", cat: "Application Process" },
  { q: "What should I do if my college guide requires a signed evaluation rubrics sheet?", a: "You can download the official VTU rubric evaluation sheet directly from the Circulars section on the home page or from your student dashboard certificates tab.", cat: "VTU Guidelines" },
  { q: "How are interviews conducted on the platform?", a: "Shortlisted candidates receive interview slots directly on their student dashboard with Google Meet or MS Teams links, calendar invites, and automated SMS reminders.", cat: "Application Process" },
  { q: "What if a company requests physical presence for a remote internship?", a: "All internships are bound by the declared mode (Remote, Hybrid, or On-site). Any unauthorized change in terms can be reported directly to the GQT Grievance Cell via the Contact page.", cat: "General" },
  { q: "Are students from non-VTU universities eligible to apply?", a: "Yes, students from autonomous universities, private colleges, and NITs/IIITs in Karnataka and surrounding regions are welcome to register and apply.", cat: "General" }
];

for (let f = 1; f <= 50; f++) {
  const baseFaq = faqQuestions[(f - 1) % faqQuestions.length];
  faqs.push({
    id: `faq-${f}`,
    question: f > 10 ? `${baseFaq.q} [Policy Section ${Math.floor(f / 5)}]` : baseFaq.q,
    answer: baseFaq.a,
    category: baseFaq.cat
  });
}
fs.writeFileSync(path.join(dataDir, 'faqs.json'), JSON.stringify(faqs, null, 2));

// 8. Notifications (15)
const notifications = [
  { id: "notif-1", title: "Application Shortlisted!", message: "Your application for Generative AI Research Intern at Infosys Labs was shortlisted.", timestamp: "10 mins ago", type: "application", read: false, link: "/dashboard/applications" },
  { id: "notif-2", title: "New Interview Scheduled", message: "Technical Round 1 with Razorpay Engineering is set for tomorrow at 11:30 AM.", timestamp: "2 hours ago", type: "interview", read: false, link: "/dashboard/applications" },
  { id: "notif-3", title: "New Official Circular", message: "VTU released mandatory guidelines for 8th semester internship documentation.", timestamp: "5 hours ago", type: "circular", read: true, link: "/#circulars" },
  { id: "notif-4", title: "Certificate Ready for Download", message: "Your Java Cloud Developer completion certificate is verified and ready.", timestamp: "1 day ago", type: "system", read: true, link: "/dashboard/certificates" },
  { id: "notif-5", title: "Profile Strength: 85%", message: "Add your GitHub and LinkedIn links to boost your recruiter discovery score.", timestamp: "2 days ago", type: "system", read: false, link: "/dashboard/profile" },
  { id: "notif-6", title: "Stipend Disbursed", message: "August month stipend of ₹24,000 processed by Global Quest Labs.", timestamp: "3 days ago", type: "application", read: true, link: "/dashboard" },
  { id: "notif-7", title: "Placement Drive Registration Open", message: "Over 40 tech companies hiring 2026 batch interns at Bengaluru Tech Summit.", timestamp: "4 days ago", type: "circular", read: true, link: "/#circulars" },
  { id: "notif-8", title: "Application Under Review", message: "PhonePe recruiter has viewed your resume and project portfolio.", timestamp: "5 days ago", type: "application", read: true, link: "/dashboard/applications" },
  { id: "notif-9", title: "Upcoming Webinar Reminder", message: "Mastering System Design Interviews - Free session this Saturday at 6 PM.", timestamp: "6 days ago", type: "training", read: true, link: "/about" },
  { id: "notif-10", title: "Weekly Progress Log Due", message: "Submit your weekly task summary to your college mentor before Sunday midnight.", timestamp: "1 week ago", type: "system", read: true, link: "/dashboard" },
  { id: "notif-11", title: "Password Changed Successfully", message: "Security alert: Your account password was updated from a known device.", timestamp: "1 week ago", type: "system", read: true, link: "/dashboard/settings" },
  { id: "notif-12", title: "Offer Letter Generated", message: "Congratulations! Bosch Global Software has released your formal offer letter.", timestamp: "2 weeks ago", type: "application", read: true, link: "/dashboard/applications" },
  { id: "notif-13", title: "Feedback Request", message: "Rate your completed internship experience to help your juniors on the portal.", timestamp: "2 weeks ago", type: "system", read: true, link: "/dashboard" },
  { id: "notif-14", title: "College NOC Approved", message: "Your internal placement officer approved your off-campus remote internship.", timestamp: "3 weeks ago", type: "application", read: true, link: "/dashboard/applications" },
  { id: "notif-15", title: "Welcome to GQT Portal!", message: "Your student registration under Visvesvaraya Technological University is verified.", timestamp: "1 month ago", type: "system", read: true, link: "/dashboard" }
];
fs.writeFileSync(path.join(dataDir, 'notifications.json'), JSON.stringify(notifications, null, 2));

// 9. Applicants (40 applicants for Admin management)
const applicantNames = [
  "Rohan M. Patil", "Sneha Kulkarni", "Aditya Shenoy", "Priyanka Deshmukh", "Chandan Gowda",
  "Ananya Bhat", "Vikramaditya Rao", "Nisarga S.", "Karthik Hebbar", "Divyashree N.",
  "Harsha Vardhan", "Meghana Prabhu", "Darshan Kumar", "Sahana Joshi", "Manoj K. R.",
  "Deepika Sundar", "Pavan Kalyan", "Tejaswini Hegde", "Sanjay V.", "Keerthana M.",
  "Vinayaka K.", "Shruti Nayak", "Sharath Chandra", "Lavanya R.", "Abhishek Pai",
  "Rashmi K.", "Gautam Shenoy", "Bhavya Sri", "Naveen Raj", "Apoorva G.",
  "Sujay K.", "Pooja V. Rao", "Nikhil G.", "Varsha S.", "Rakshit Shetty",
  "Archana B.", "Santosh M.", "Kavya N.", "Sunil Kumar", "Vandana P."
];

const statuses = ["Applied", "Under Review", "Shortlisted", "Interview", "Selected", "Rejected"];
const branches = ["Computer Science & Engg", "Information Science", "Electronics & Comm", "Artificial Intelligence & ML", "Data Science"];

const applicants = applicantNames.map((name, i) => {
  const col = colleges[i % colleges.length];
  const int = internships[i * 2 % internships.length];
  return {
    id: `app-${(i + 1).toString().padStart(3, '0')}`,
    name: name,
    email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@student.${col.shortCode.toLowerCase()}.ac.in`,
    phone: `+91 9845${Math.floor(100000 + Math.random() * 899999)}`,
    usn: `${col.shortCode.slice(0, 3).toUpperCase()}22CS${(i + 1).toString().padStart(3, '0')}`,
    collegeId: col.id,
    college: col.name,
    degree: "B.Tech / B.E.",
    branch: branches[i % branches.length],
    cgpa: parseFloat((7.4 + Math.random() * 2.4).toFixed(2)),
    graduationYear: 2026,
    internshipId: int.id,
    internshipTitle: int.title,
    companyName: int.company,
    appliedDate: `2026-09-${String(15 - (i % 12)).padStart(2, '0')}`,
    status: statuses[i % statuses.length],
    resumeUrl: `/sample-resume.pdf`,
    githubUrl: `https://github.com/${name.toLowerCase().replace(/[^a-z]/g, '')}`,
    linkedinUrl: `https://linkedin.com/in/${name.toLowerCase().replace(/[^a-z]/g, '-')}`,
    portfolioUrl: `https://${name.toLowerCase().replace(/[^a-z]/g, '')}.dev`,
    skills: int.skills.slice(0, 4),
    reviewerNotes: i % 2 === 0 ? "Strong fundamentals in data structures, good GitHub project portfolio." : "Good communication, recommended for client interview round.",
    interviewScheduled: (statuses[i % statuses.length] === "Interview") ? {
      date: "2026-09-22",
      time: "11:00 AM IST",
      mode: "Google Meet",
      meetLink: "https://meet.google.com/gqt-intl-test"
    } : undefined
  };
});
fs.writeFileSync(path.join(dataDir, 'applicants.json'), JSON.stringify(applicants, null, 2));

console.log("All dummy JSON datasets generated successfully!");
