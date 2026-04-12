const ORGS = [
  {
    id: 1,
    name: "Greater Louisville Inc. / One Louisville",
    geo: "Louisville metro",
    type: "chamber",
    sectors: ["all"],
    priority: true,
    url: "https://www.greaterlouisville.com",
    freq: "Weekly events",
    note: "The metro chamber of commerce. Now merging with LEDA as 'One Louisville' — will be the single economic development and business advocacy org for the region. Primary networking hub; member companies span every sector TrueTym targets."
  },
  {
    id: 2,
    name: "St. Matthews Area Businesses",
    geo: "Louisville metro",
    type: "chamber",
    sectors: ["all"],
    priority: false,
    url: "https://www.stmatthewschamber.com",
    freq: "Monthly",
    note: "Neighborhood chamber for the St. Matthews corridor. Good for hyperlocal SME contacts. Monthly luncheons and mixers draw owner-operators from the east Louisville business community."
  },
  {
    id: 3,
    name: "Jeffersontown Chamber of Commerce",
    geo: "Louisville metro",
    type: "chamber",
    sectors: ["all"],
    priority: false,
    url: "https://www.jtownchamber.com",
    freq: "Monthly",
    note: "Active east Louisville chamber with historically strong manufacturing and industrial membership. The J-town industrial corridor has several distribution and light manufacturing employers."
  },
  {
    id: 4,
    name: "Oldham County Chamber of Commerce",
    geo: "Louisville metro",
    type: "chamber",
    sectors: ["all"],
    priority: false,
    url: "https://www.oldhamcountychamber.com",
    freq: "Monthly",
    note: "Growing suburban market north of Louisville. Strong construction and home services presence as the county continues residential expansion."
  },
  {
    id: 5,
    name: "Louisville Independent Business Alliance (LIBA)",
    geo: "Louisville metro",
    type: "indie",
    sectors: ["all"],
    priority: true,
    url: "https://louisvilleiba.org",
    freq: "Monthly+",
    note: "Louisville's independent business coalition focused on preserving the city's unique community character. Progressive SME audience with strong local ties. Monthly mixers well-attended by owner-operators."
  },
  {
    id: 6,
    name: "Louisville Hispanic Chamber of Commerce",
    geo: "Louisville metro",
    type: "chamber",
    sectors: ["all"],
    priority: false,
    url: "https://www.louisvillehcc.com",
    freq: "Monthly",
    note: "Serves Hispanic/Latino business community. The Hispanic population in KY grew 247% from 2000-2020, with a significant share in frontline manufacturing, construction, and home healthcare roles — a key TrueTym demographic."
  },
  {
    id: 7,
    name: "Civitas (LGBTQ+ Chamber of Commerce)",
    geo: "Statewide KY",
    type: "chamber",
    sectors: ["all"],
    priority: false,
    url: "https://civitasky.org",
    freq: "Periodic",
    note: "Statewide LGBTQ+ chamber with Louisville and Lexington presence. Emerging networking community, not a primary target but good for relationship-building."
  },
  {
    id: 8,
    name: "NuLu Business Association",
    geo: "Louisville metro",
    type: "indie",
    sectors: ["all"],
    priority: false,
    url: "https://nulubusinessassociation.org",
    freq: "Monthly",
    note: "East Market District neighborhood association. Boutique networking, arts and food-heavy. Lower overlap with TrueTym's frontline employer target but good for general Louisville business visibility."
  },
  {
    id: 9,
    name: "Middletown Area Chamber of Commerce",
    geo: "Louisville metro",
    type: "chamber",
    sectors: ["all"],
    priority: false,
    url: "https://middletownchamber.com",
    freq: "Monthly",
    note: "East Louisville neighborhood chamber. Growing commercial and light industrial corridor along the Shelbyville Road corridor."
  },
  {
    id: 10,
    name: "Kentucky Chamber of Commerce",
    geo: "Statewide KY",
    type: "chamber",
    sectors: ["all"],
    priority: true,
    url: "https://www.kychamber.com",
    freq: "Regular summits + annual",
    note: "The statewide chamber. Partners with 80+ local chambers across KY, 25,000 professionals. Hosts annual Kentucky Workforce Summit and legislative events. Key relationship for statewide reach."
  },
  {
    id: 11,
    name: "Kentucky Chamber Foundation Workforce Center (KCWC)",
    geo: "Statewide KY",
    type: "econ",
    sectors: ["manufacturing", "construction", "healthcare", "logistics"],
    priority: true,
    url: "https://www.kychamber.com/WorkforceCenter",
    freq: "Ongoing programs + events",
    note: "Top coalition priority. Runs Talent Pipeline Management, Bus to Business, and Workforce Ecosystem Alignment programs statewide. 650 employers across 70 industries. The right institutional partner for embedding TrueTym as a technology layer."
  },
  {
    id: 12,
    name: "Kentucky Workforce Innovation Board (KWIB)",
    geo: "Statewide KY",
    type: "econ",
    sectors: ["manufacturing", "construction", "healthcare", "logistics"],
    priority: true,
    url: "https://kwib.ky.gov",
    freq: "Quarterly board meetings + events",
    note: "State workforce governance body under the KY Education and Labor Cabinet. Access to all 10 Local Workforce Development Areas across Kentucky. Attending KWIB events signals government-level legitimacy for TrueTym."
  },
  {
    id: 13,
    name: "Kentucky Association of Manufacturers (KAM)",
    geo: "Statewide KY",
    type: "industry",
    sectors: ["manufacturing"],
    priority: true,
    url: "https://kam.us.com",
    freq: "Annual summit + periodic events",
    note: "Premier KY manufacturing association. Annual KAM Summit and Kentucky Industry Conference (co-hosted with MI2) are must-attend events. Direct access to plant managers, HR directors, and operations leads across manufacturing."
  },
  {
    id: 14,
    name: "Metals Innovation Initiative (MI2)",
    geo: "Statewide KY",
    type: "industry",
    sectors: ["manufacturing"],
    priority: true,
    url: "https://mi2ky.org",
    freq: "Annual conference + periodic",
    note: "KY metals and advanced manufacturing innovation network. Co-hosts Kentucky Industry Conference with KAM. Strong workforce development and technology adoption focus — natural audience for TrueTym's labor intelligence positioning."
  },
  {
    id: 15,
    name: "Associated General Contractors of Kentucky (AGC-KY)",
    geo: "Statewide KY",
    type: "industry",
    sectors: ["construction"],
    priority: true,
    url: "https://www.agcky.org",
    freq: "Regular events + Build KY Awards",
    note: "Full-service commercial construction association, 550+ contractor members statewide. Build Kentucky Awards is a major annual event. Members are exactly the distributed-workforce construction companies TrueTym is built for."
  },
  {
    id: 16,
    name: "Building Industry Association of Greater Louisville (BIA)",
    geo: "Louisville metro",
    type: "industry",
    sectors: ["construction"],
    priority: true,
    url: "https://bialouisville.com",
    freq: "Monthly networking + annual events",
    note: "Louisville home building and construction industry association. Monthly networking events, annual golf tournament, continuing education events. Member companies have distributed field workforces — high TrueTym fit."
  },
  {
    id: 17,
    name: "Louisville Contractor Association",
    geo: "Louisville metro",
    type: "industry",
    sectors: ["construction"],
    priority: false,
    url: "https://www.louisvillecontractors.com",
    freq: "Regular",
    note: "Covers mechanical, electrical, plumbing, and specialty contractors in Louisville. Good secondary contact source for construction employers with significant hourly workforces."
  },
  {
    id: 18,
    name: "Kentucky Home Care Association (KHCA)",
    geo: "Statewide KY",
    type: "industry",
    sectors: ["healthcare"],
    priority: true,
    url: "https://khca.org",
    freq: "Annual conference + periodic",
    note: "Represents home health agencies, home care providers, and hospice organizations statewide. Home health has some of the highest frontline turnover in any sector — a core TrueTym pain point. Annual conference is a must-attend."
  },
  {
    id: 19,
    name: "Kentucky Association of Health Care Facilities (KAHCF)",
    geo: "Statewide KY",
    type: "industry",
    sectors: ["healthcare"],
    priority: false,
    url: "https://kahcf.org",
    freq: "Periodic",
    note: "Long-term care and skilled nursing facility focus. Workforce retention is the sector's biggest challenge. Secondary target after KHCA."
  },
  {
    id: 20,
    name: "Kentucky Trucking Association (KTA)",
    geo: "Statewide KY",
    type: "industry",
    sectors: ["logistics"],
    priority: false,
    url: "https://kytrucking.com",
    freq: "Annual convention + periodic",
    note: "Covers trucking, freight, and supply chain across KY. Louisville is a major logistics hub (UPS Worldport). Driver management, dispatch scheduling, and workforce reliability are persistent pain points."
  },
  {
    id: 21,
    name: "Louisville Logistics Council",
    geo: "Louisville metro",
    type: "industry",
    sectors: ["logistics"],
    priority: false,
    url: "",
    freq: "Periodic",
    note: "Logistics and distribution networking in the Louisville market. UPS, Amazon, and major 3PL operators in the region create a dense frontline logistics workforce that fits TrueTym's model."
  },
  {
    id: 22,
    name: "One Southern Indiana (1si)",
    geo: "Southern Indiana",
    type: "econ",
    sectors: ["all"],
    priority: false,
    url: "https://www.1si.org",
    freq: "Regular events",
    note: "Clark and Floyd County economic development organization and chamber. Bridges the Louisville metro into Southern Indiana. Good for cross-market reach with similar frontline employer demographics."
  },
  {
    id: 23,
    name: "Louisville Forward (Louisville Metro Government)",
    geo: "Louisville metro",
    type: "econ",
    sectors: ["all"],
    priority: false,
    url: "https://louisvilleky.gov/government/forward",
    freq: "Periodic",
    note: "City's economic development arm. Runs forgivable loan programs and employer engagement initiatives tied to job creation. Can be a back-channel for introductions to larger employers."
  },
  {
    id: 24,
    name: "Kentucky Cabinet for Economic Development",
    geo: "Statewide KY",
    type: "econ",
    sectors: ["manufacturing", "logistics"],
    priority: false,
    url: "https://newkentuckyhome.ky.gov",
    freq: "Periodic / announcement-based",
    note: "State-level economic development agency under the New Kentucky Home initiative. Events are typically tied to major investment announcements. Good for staying aware of large employers entering or expanding in KY."
  },
  {
    id: 25,
    name: "GAME Change (NSF Manufacturing Innovation Engine)",
    geo: "Statewide KY",
    type: "econ",
    sectors: ["manufacturing", "logistics"],
    priority: false,
    url: "https://gamechangemanufacturing.org",
    freq: "Periodic",
    note: "NSF-funded innovation engine for advanced manufacturing and supply chain across KY/TN corridor. Partners with KAM and MI2. Workforce development is a core pillar. Emerging organization worth tracking."
  }
];

const GEO_OPTIONS = [
  { value: "all", label: "All geographies", color: "#888780" },
  { value: "Louisville metro", label: "Louisville metro", color: "#2D9B4E" },
  { value: "Statewide KY", label: "Statewide KY", color: "#2563EB" },
  { value: "Southern Indiana", label: "Southern Indiana", color: "#7C3AED" }
];

const TYPE_OPTIONS = [
  { value: "all",      label: "All categories",       color: "#888780" },
  { value: "chamber",  label: "Chambers of commerce", color: "#2563EB" },
  { value: "industry", label: "Industry associations", color: "#2D9B4E" },
  { value: "econ",     label: "Economic development",  color: "#F5A623" },
  { value: "indie",    label: "Independent business",  color: "#7C3AED" }
];

const SECTOR_OPTIONS = [
  { value: "all",            label: "All sectors",     color: "#888780" },
  { value: "manufacturing",  label: "Manufacturing",   color: "#2D9B4E" },
  { value: "construction",   label: "Construction",    color: "#F5A623" },
  { value: "healthcare",     label: "Home healthcare", color: "#2563EB" },
  { value: "logistics",      label: "Logistics",       color: "#7C3AED" }
];

const STATUS_OPTIONS = [
  { value: "all",        label: "All statuses",  color: "#888780" },
  { value: "upcoming",   label: "Upcoming",      color: "#2563EB" },
  { value: "tracking",   label: "Tracking",      color: "#F5A623" },
  { value: "registered", label: "Registered",    color: "#7C3AED" },
  { value: "attended",   label: "Attended",      color: "#2D9B4E" },
  { value: "missed",     label: "Missed",        color: "#888780" }
];

const EVENT_TYPES = [
  "Networking mixer", "Conference", "Roundtable", "Workshop",
  "Webinar", "Luncheon", "Award ceremony", "Summit", "Board meeting", "Other"
];

const SEED_EVENTS = [
  {
    id: 1,
    date: "2026-05-15",
    orgId: 13,
    event: "KAM 2026 Annual Summit",
    type: "Summit",
    status: "upcoming",
    notes: "Primary manufacturing networking event in KY. Target: HR managers and plant operations leaders. Position TrueTym around overtime cost reduction and workforce visibility."
  },
  {
    id: 2,
    date: "2026-05-01",
    orgId: 16,
    event: "BIA Monthly Networking Mixer",
    type: "Networking mixer",
    status: "tracking",
    notes: "Monthly construction industry networking. Good for distributed workforce construction contractors — core TrueTym use case."
  },
  {
    id: 3,
    date: "2026-04-24",
    orgId: 11,
    event: "Kentucky Workforce Summit",
    type: "Conference",
    status: "upcoming",
    notes: "Annual event hosted by KY Chamber Workforce Center. High priority. Attend and position TrueTym as the technology intelligence layer inside KCWC's Workforce Ecosystem Alignment work."
  },
  {
    id: 4,
    date: "2026-04-18",
    orgId: 1,
    event: "GLI Business After Hours",
    type: "Networking mixer",
    status: "tracking",
    notes: "General business networking. Look for manufacturing and construction firm contacts. GLI transitioning to One Louisville — good time to establish relationships with new leadership."
  },
  {
    id: 5,
    date: "2026-03-20",
    orgId: 5,
    event: "LIBA Spring Mixer",
    type: "Networking mixer",
    status: "attended",
    notes: "Good turnout — approx. 80 attendees. Collected 4 contacts in home services and light manufacturing. Follow up with: Jason K. (home cleaning franchise), Maria V. (medical staffing). Schedule demos."
  }
];
