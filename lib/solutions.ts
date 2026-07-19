/**
 * The SEO solution cluster — one deep landing page per vertical or
 * category keyword. Content lives here as data; the template at
 * app/solutions/[slug]/page.tsx renders it. Every claim in this file
 * must satisfy the house fact rules: the only named client is Pranav
 * Doors & Windows, no invented outcomes, no pricing.
 */

export interface SolutionSection {
  title: string;
  body: string;
}

export interface SolutionFaq {
  q: string;
  a: string;
}

export interface Solution {
  slug: string;
  /** primary search keyword this page targets */
  keyword: string;
  /** <=55 chars, no brand suffix (layout template appends it) */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** H1 = h1Metal + h1Flow rendered as one sentence, flow part in blue */
  h1Metal: string;
  h1Flow: string;
  intro: string;
  /** short label + one-liner for the /solutions hub card */
  cardTitle: string;
  cardBlurb: string;
  pains: SolutionSection[];
  modules: SolutionSection[];
  proof: SolutionSection;
  faqs: SolutionFaq[];
}

export const solutions: Solution[] = [
  {
    "slug": "door-window-manufacturing-software",
    "keyword": "door and window manufacturing software",
    "metaTitle": "Door and Window Manufacturing Software for India",
    "metaDescription": "Door and window manufacturing software for Indian uPVC and aluminium OEMs. Enquiry to installation on one platform — first module live in 2 weeks. Talk to us.",
    "eyebrow": "Solutions · Door & Window OEMs",
    "h1Metal": "Door and window manufacturing software",
    "h1Flow": "that already runs a real factory.",
    "intro": "ArchFlow is door and window manufacturing software for uPVC, aluminium and wooden fenestration OEMs in India. It replaces the Excel sheets, WhatsApp threads and paper job cards holding your factory together — one platform from enquiry to installation, built custom for how your plant actually runs.",
    "cardTitle": "Door & Window Manufacturing",
    "cardBlurb": "For uPVC, aluminium and wooden fenestration OEMs — quotation to installation on one platform.",
    "pains": [
      {
        "title": "Quotes take days, orders take minutes to lose",
        "body": "Every window is a fresh calculation — series, profile, glass, mesh, hardware, size, sqft rate. When one estimator holds it all in a spreadsheet, a 40-window commercial enquiry sits for days while the client's architect shortlists someone faster."
      },
      {
        "title": "The order lives in ten places at once",
        "body": "The measurement sheet is on a site engineer's phone. The revised quote is in email. Production has a printed cutting list from version two. Dispatch loads what the challan says. Nobody can answer the only question that matters: where is order 214?"
      },
      {
        "title": "Leadership finds out when the customer calls",
        "body": "Pending advances, stuck production, delayed glass, dealers across five states chasing follow-ups on WhatsApp — none of it rolls up anywhere. Directors run a crore-scale operation on gut feel and month-old Excel reports, and growth just multiplies the blind spots."
      }
    ],
    "modules": [
      {
        "title": "BOM-aware quotation engine",
        "body": "Pick series, profile system, glass, mesh and hardware; enter sizes; get a priced, versioned quotation PDF in minutes. Discount approvals route to the right person — not a WhatsApp thread."
      },
      {
        "title": "Enquiry and site measurement",
        "body": "Every enquiry — dealer, architect or walk-in — logged with source and follow-ups. Site measurements and recheck sheets sit against the order, so production never cuts to a stale dimension."
      },
      {
        "title": "Production on live job cards",
        "body": "Orders move through cutting, machining, welding or crimping, hardware, QC and packing as live stages. Cutting lists and glass orders generate from the confirmed BOM, never retyped by hand."
      },
      {
        "title": "Dispatch, installation and snags",
        "body": "Vehicle-wise dispatch planning with challans, installation teams closing sites from their phones, snag lists photographed and tracked to closure — across every state your dealers and projects sit in."
      },
      {
        "title": "Service that survives the handover",
        "body": "Complaints for hardware, mesh or glass breakage are logged against the original order and its full history — assigned, time-stamped, visible until closed. The relationship outlasts the installation; your system should too."
      },
      {
        "title": "Dashboards, GST and Tally",
        "body": "Directors see enquiry-to-dispatch numbers live on one screen. GST invoicing and Tally integration are scoped in from day one, so accounts stops re-entering what the factory already knows."
      }
    ],
    "proof": {
      "title": "Live every day at Pranav Doors & Windows",
      "body": "ArchFlow has run daily at Pranav Doors & Windows since 2024 — a premium fenestration manufacturer in Chandigarh with 10 departments, 100+ employees and operations across 5+ states. The full 14-stage order lifecycle, enquiry to installation to service, lives on the platform. First modules were live in weeks one and two; full deployment by week four. Co-founder Tanishq Trehan is a director there — this is our home vertical."
    },
    "faqs": [
      {
        "q": "What should door and window manufacturing software actually cover?",
        "a": "Everything between the first enquiry and the last service call — fourteen stages in practice: enquiry, quotation, revisions, order confirmation, measurement recheck, BOM and cutting lists, glass ordering, production, QC, packing, dispatch, installation, snag closure and service. Point solutions cover one slice, and the gaps between slices are where orders get lost. ArchFlow builds the full lifecycle on one platform, custom-fit to your factory."
      },
      {
        "q": "Is there uPVC window manufacturing software that also covers aluminium and wooden lines?",
        "a": "Yes. The platform is built per client, so it works as uPVC window manufacturing software — series, profiles, reinforcement, fusion-welded frames — and equally as aluminium window fabrication software, with sections, crimping and powder-coat tracking. Wooden and hybrid lines fit the same way. Your product catalogue, pricing logic and production stages are modelled as they exist, not forced into someone else's template."
      },
      {
        "q": "Why doesn't a generic ERP work for door and window manufacturing?",
        "a": "Generic ERPs treat every product as a stock SKU. In fenestration, nothing is stock — every window is made to a site's size and specification, so quoting, BOM and production all hinge on configuration. ArchFlow was built inside this exact workflow, so the spine — quotation, cutting lists, glass ordering, installation — already matches how a fenestration ERP in India has to work. Nothing is bolted on afterwards."
      },
      {
        "q": "How long does it take to implement door and window manufacturing software?",
        "a": "Your first module — usually quotation — is live in one to two weeks, and the full deployment lands by week four. We start with the module bleeding the most time, put it in real users' hands, then roll the rest around it. That was the exact sequence at Pranav Doors & Windows, and it is how we run every engagement."
      },
      {
        "q": "How much does window and door business software cost?",
        "a": "There is no price list — every ArchFlow platform is scoped per project, because a two-plant uPVC OEM and a single-line aluminium fabricator need different things. One conversation gives you a clear scope and a firm estimate before any commitment. You talk directly to the two founders who design and build the system; there is no sales layer in between."
      }
    ]
  },
  {
    "slug": "fabrication-management-software",
    "keyword": "fabrication management software India",
    "metaTitle": "Fabrication Management Software India | Custom-Built",
    "metaDescription": "Custom fabrication management software for Indian metal & aluminium fabricators — quotes, job cards, dispatch, Tally-ready billing on one platform. Talk to us.",
    "eyebrow": "Solutions · Metal Fabrication",
    "h1Metal": "Fabrication management software for India,",
    "h1Flow": "from enquiry to erection.",
    "intro": "ArchFlow builds custom fabrication management software for India's metal and aluminium fabricators — job-work shops, facade contractors and structural fabrication units. It replaces the Excel cutting lists, paper job cards and WhatsApp follow-ups your shop currently runs on, with one platform that carries every job from enquiry to erection.",
    "cardTitle": "Fabrication Management",
    "cardBlurb": "For metal & aluminium fabricators — BOQs, job cards, dispatch and billing without the paper chase.",
    "pains": [
      {
        "title": "Quotes crawl while the enquiry goes cold",
        "body": "A facade BOQ lands. Your estimator digs through section catalogues, works out weights in Excel, checks today's aluminium rate, and the quotation goes out four days later — after two revisions over WhatsApp. By then the client has three other numbers."
      },
      {
        "title": "Nobody can say where Job 214 is",
        "body": "Paper job cards travel with the material — until they don't. Cutting done? Welding queued? Sent for powder coating and not back yet? The answer lives in one supervisor's head, and client-supplied material blurs into your own stock with no trail to separate them."
      },
      {
        "title": "Billing is where the truth finally surfaces",
        "body": "Measurement sheets don't match dispatch challans. RA bills wait on site sign-offs. Retention amounts live in a diary, and Tally only knows what accounts remembered to enter. The owner learns a job lost money months after the trucks left."
      }
    ],
    "modules": [
      {
        "title": "Quotation & BOQ engine",
        "body": "Quote from drawings with section weights, per-kg or per-sqm rates and current material costs built in. Every revision tracked, every approval logged — the enquiry that lands on Monday quotes by Tuesday."
      },
      {
        "title": "Digital job cards",
        "body": "Every job carries a live card through cutting, fit-up, welding, finishing and QC. Fabrication job card software that answers \"which stage is it at?\" in one search, not five phone calls."
      },
      {
        "title": "Material, scrap & job-work tracking",
        "body": "Material issued against job cards, offcuts logged, client-supplied stock reconciled separately from your own. Outsourced powder coating, anodizing and galvanizing tracked challan-out to challan-in, so nothing leaves the gate untracked."
      },
      {
        "title": "Dispatch & site installation",
        "body": "Delivery challans, e-way bill details and installation teams on one screen. Site measurements, fitment status and photos flow back from the field instead of dying in WhatsApp groups."
      },
      {
        "title": "Billing that talks to Tally",
        "body": "GST invoices, RA bills, retention and outstandings generated from actual dispatch and measurement data, synced with Tally — so accounts stops re-typing what the factory already knows."
      },
      {
        "title": "The owner's single screen",
        "body": "Every enquiry, job, stage and outstanding in one live view. Fabrication shop management stops depending on the morning phone round — leadership sees the floor without walking it."
      }
    ],
    "proof": {
      "title": "Battle-tested where aluminium is cut every day",
      "body": "ArchFlow's spine — enquiry to installation across 14 stages, BOM-aware quoting, multi-department coordination — runs every day at Pranav Doors & Windows, a premium fenestration manufacturer in Chandigarh: 10 departments, 100+ employees, operations across five states, live since 2024. Fenestration is aluminium fabrication held to tighter tolerances. Your deployment is custom-built for your vertical, on a spine already proven under daily production pressure."
    },
    "faqs": [
      {
        "q": "What does fabrication management software cost in India?",
        "a": "There is no fixed price — every ArchFlow deployment is scoped per project, because a five-person job-work shop and a hundred-person facade contractor need very different systems. You pay for what your shop will actually use, not per-user licences for modules nobody opens. That is how custom fabrication management software in India should work: tell us your workflow, get a scoped proposal, and see the first working module in one to two weeks."
      },
      {
        "q": "How long does it take to implement fabrication management software?",
        "a": "The first working module — usually quotations or job cards — is live in one to two weeks, and full deployment is done by week four. ArchFlow is built around your existing stage names, documents and formats, so the floor isn't relearning its own process. No six-month ERP implementation, no consultants camped in your office, no big-bang cutover that stalls production while everyone learns new screens."
      },
      {
        "q": "Can it handle job-work orders with client-supplied material?",
        "a": "Yes — client-supplied material is tracked separately from your own stock, from inward challan through consumption, scrap and return, with the challan trail your GST job-work filings need. Every job card shows what was received, what was consumed and what remains, so month-end reconciliation stops being an argument. Material you send out — powder coating, anodizing, galvanizing — is tracked the same way, challan-out to challan-in."
      },
      {
        "q": "Does it work for facade projects with RA bills and retention?",
        "a": "Yes. Facade and structural work bills nothing like supply orders — measurement-sheet-based RA bills, retention percentages, and progress spread across multiple sites. ArchFlow tracks measured, dispatched and installed quantities per site, so every RA bill is backed by data instead of a diary, and retention and outstanding amounts are visible per project. Aluminium fabrication software has to bill the way your clients actually pay."
      },
      {
        "q": "Is this a ready-made metal fabrication ERP or custom-built?",
        "a": "Custom-built — every deployment is shaped to the client's own workflow, on a platform spine that has run daily production at a premium fenestration manufacturer since 2024. A generic metal fabrication ERP makes your shop adapt to its screens; ArchFlow adapts to your stage names, your documents and your approval chain. And it connects to what you already run — Tally for accounts, GST invoicing formats your CA will recognise."
      }
    ]
  },
  {
    "slug": "peb-manufacturing-software",
    "keyword": "PEB software India",
    "metaTitle": "PEB Software India — One Platform, Enquiry to Erection",
    "metaDescription": "PEB software India: one platform from enquiry to erection — BOM-aware quoting, project tracking, milestone billing. First module live in 1-2 weeks. Talk to us.",
    "eyebrow": "Solutions · PEB & Steel Structures",
    "h1Metal": "The PEB software India's steel builders",
    "h1Flow": "can actually run a project on.",
    "intro": "ArchFlow builds the PEB software India's pre-engineered building and steel structure manufacturers run entire projects on — enquiry, estimation, drawings, fabrication, dispatch, erection, billing. It replaces the Excel trackers and WhatsApp threads holding long project cycles together, and every deployment is shaped around how your plant and sites actually run.",
    "cardTitle": "PEB & Steel Buildings",
    "cardBlurb": "For pre-engineered building manufacturers — long project cycles, milestone billing, site erection.",
    "pains": [
      {
        "title": "Quotes priced in tonnes, delivered in weeks",
        "body": "Every enquiry needs an estimate built from span, eave height, bay spacing and crane loads — and your best estimator is the bottleneck. By the time the quote goes out, steel prices have moved and the client is holding three other bids."
      },
      {
        "title": "Thirty live projects, status on WhatsApp",
        "body": "One building is stuck at drawing approval, one is half-fabricated, one has trucks loading, one has an idle erection crew. The real status lives in project managers' heads and WhatsApp groups — so leadership learns about slippage after the client does."
      },
      {
        "title": "Milestone billing that leaks money",
        "body": "Advance on order, payment against approved drawings, pro-rata billing on dispatched tonnage, balance after erection — plus retention. Dispatch registers, invoices and site reports sit in separate Excel sheets, so tonnage goes unbilled and retention quietly ages past its due date."
      }
    ],
    "modules": [
      {
        "title": "Enquiry to estimate, in hours",
        "body": "Capture building specs — length, width, eave height, bays, cladding, crane loads — and build tonne-based, BOM-aware estimates from your own rates. Revisions stay linked to the enquiry, so requoting takes minutes."
      },
      {
        "title": "Drawing approvals that don't stall",
        "body": "Track GA drawings, approval drawings and anchor bolt plans per project — submitted, revised, approved, with dates. The stage where PEB projects silently lose weeks finally has an owner."
      },
      {
        "title": "Fabrication, tracked by the tonne",
        "body": "Work orders per building, tracked through cutting, fit-up, welding, blasting and painting. See fabricated tonnage against plan for every project, so dispatch commitments are made on facts."
      },
      {
        "title": "Dispatch that matches erection sequence",
        "body": "Truckload-wise packing lists, e-way bills and dispatched tonnage per project — sequenced so columns reach site before purlins do, and your erection crew never stands idle waiting for members."
      },
      {
        "title": "Site erection, visible from the office",
        "body": "Erection progress per site, across states, updated by your site teams — not reconstructed from phone calls. Milestone completion is recorded once and flows straight into billing."
      },
      {
        "title": "Milestone billing, GST and Tally",
        "body": "Raise milestone invoices — advance, drawings, pro-rata dispatch, erection — with GST e-invoicing, retention tracked to its due date, and everything flowing into Tally. Billed tonnage never drifts from dispatched tonnage."
      }
    ],
    "proof": {
      "title": "Battle-tested spine. Custom-built for steel.",
      "body": "ArchFlow's spine — the full lifecycle from enquiry to installation, BOM-aware quoting, ten departments on one platform — was built and proven inside Pranav Doors & Windows, a premium fenestration manufacturer running daily operations on it across five states since 2024. Your PEB deployment is custom-built: your stages, your drawings, your milestone billing. First modules live in weeks one and two; deployed by week four."
    },
    "faqs": [
      {
        "q": "What is the best PEB software in India for a mid-size manufacturer?",
        "a": "The best PEB software India's manufacturers can run is one shaped around their own workflow, not a generic ERP with a steel label. Look for enquiry-to-erection coverage: tonne-based estimation, drawing approval tracking, fabrication and dispatch by tonnage, site progress and milestone billing with GST and Tally. ArchFlow builds exactly that, custom for each manufacturer, on a spine already running a multi-state manufacturing business daily."
      },
      {
        "q": "What should a pre-engineered building ERP cover besides accounting?",
        "a": "A pre-engineered building ERP should run the whole project, not just the ledger: enquiry capture, tonne-based estimation, quotation revisions, drawing submissions and approvals, fabrication tracking, truckload-wise dispatch, site erection progress and milestone billing with retention. Accounting is the last step — most of your money leaks earlier, between departments. ArchFlow covers the full lifecycle on one platform, with Tally handling the books it feeds."
      },
      {
        "q": "How does PEB project tracking software handle long cycles and site erection?",
        "a": "Good PEB project tracking software treats each building as a project with stages — drawings, fabrication, dispatch, erection — not as a sales order that ships once. ArchFlow tracks every project through those stages, shows dispatched versus erected tonnage per site, and ties milestone completion directly to billing. A director sees every live project, in every state, on one screen — without calling a single project manager."
      },
      {
        "q": "How long does it take to implement steel building manufacturing software?",
        "a": "With ArchFlow, your first modules are live in one to two weeks and the full platform is deployed by week four. We build steel building manufacturing software around your existing workflow — your stages, your document names, your billing terms — so your team isn't relearning their own business. You start with the module that hurts most, usually estimation or project tracking, and expand from there."
      },
      {
        "q": "What does PEB ERP software cost in India?",
        "a": "ArchFlow is scoped per project — talk to us. The scope depends on which modules you start with, how many departments come on, and how much of your workflow we build custom. There are no per-user licence tiers to decode. You start with one or two modules in the first fortnight, see them working on real projects, and scope the rest from there."
      }
    ]
  },
  {
    "slug": "modular-kitchen-manufacturing-software",
    "keyword": "modular kitchen manufacturing software",
    "metaTitle": "Modular Kitchen Manufacturing Software, Built Custom",
    "metaDescription": "Modular kitchen manufacturing software that runs dealers, site measurements, production and installation on one platform. Deployed by week 4. Talk to us.",
    "eyebrow": "Solutions · Kitchens & Interiors",
    "h1Metal": "Modular kitchen manufacturing software that runs your factory,",
    "h1Flow": "from site measurement to installation.",
    "intro": "ArchFlow builds modular kitchen manufacturing software for kitchen, wardrobe and modular furniture factories that have outgrown Excel. If your orders live across designer files, WhatsApp groups and a dealer's memory, we replace all of it with one platform — from first site measurement to installed kitchen.",
    "cardTitle": "Modular Kitchens & Interiors",
    "cardBlurb": "For kitchen and wardrobe factories — dealer orders, site measurements, installation handovers.",
    "pains": [
      {
        "title": "Quotations take days and still leak margin",
        "body": "Every kitchen is quoted from scratch — modules, finishes, hardware, all in a designer's Excel. The client swaps laminate for acrylic and someone rebuilds the sheet. Three revisions later, nobody knows which version was approved or what margin survived."
      },
      {
        "title": "Site measurements reach the factory broken",
        "body": "Final measurements come in after tiling — on paper, or as photos in a WhatsApp group. Production cuts to the old drawing. The error surfaces at installation, in the customer's home, where a wrong carcass costs the most to fix."
      },
      {
        "title": "Dealers call for status because there is no status",
        "body": "Your dealers in other cities sell your kitchens, then chase your office for every update. Orders sit in someone's head. Leadership finds out about a stuck order when the customer escalates — usually after the installation date has already slipped."
      }
    ],
    "modules": [
      {
        "title": "Dealer & franchise order desk",
        "body": "Every dealer and franchise showroom gets a login. They raise orders, upload site photos and see live status themselves — no more calling your office to ask where a kitchen is."
      },
      {
        "title": "Site measurement, versioned",
        "body": "Measurement visits are scheduled from the order itself. Pre-civil and final dimensions are recorded against each module, every revision kept — so the factory always cuts to the latest wall, not the first one."
      },
      {
        "title": "BOM-aware quoting",
        "body": "Quotes built module by module — base units, wall units, tall units, wardrobe internals. Swap a finish or hardware and the price recalculates. The approved revision is the one production sees."
      },
      {
        "title": "Cutting lists & production tracking",
        "body": "An approved order becomes cutting lists and a hardware BOM automatically. Track panels through cutting, edge banding, assembly and QC — and pack module-wise, so nothing reaches site missing a shutter."
      },
      {
        "title": "Dispatch to handover",
        "body": "Packing lists, dispatch challans and installer schedules live on the same order. Installation teams close snag lists on site, and handover is signed off in the system — not in a diary."
      },
      {
        "title": "Accounts that follow the order",
        "body": "Booking amount, stage payments, GST invoicing and Tally integration — tied to order status, not chased at month-end. Leadership sees receivables against every kitchen, dealer-wise and state-wise."
      }
    ],
    "proof": {
      "title": "Battle-tested on a real factory floor",
      "body": "ArchFlow's spine — enquiry to installation, BOM-aware quoting, ten departments working one order — was built for Pranav Doors & Windows, a premium fenestration manufacturer running 14 order stages across 5+ states on ArchFlow daily since 2024. Modular kitchens share that spine: measured on site, made to order, installed in homes. Your deployment is custom-built for how your factory runs."
    },
    "faqs": [
      {
        "q": "What is the best modular kitchen manufacturing software for a mid-size Indian factory?",
        "a": "The best modular kitchen manufacturing software is the one that mirrors how your factory actually works — dealer orders, site measurements, module-wise quoting, cutting lists, installation. Generic ERPs make you bend your process to their screens. ArchFlow builds the platform around your process instead, with the first module live in one to two weeks and full deployment by week four."
      },
      {
        "q": "How do I manage kitchen orders from dealers and franchise showrooms in different cities?",
        "a": "Give every dealer a login instead of a phone number. In ArchFlow, dealers raise orders, attach site details and track live status themselves — a kitchen dealer order management layer on top of your factory. Your team stops answering update calls, dealers stop guessing delivery dates, and leadership sees every dealer's pipeline, city by city, on one screen."
      },
      {
        "q": "Is there software to track a modular kitchen order from site measurement to installation?",
        "a": "Yes — ArchFlow is built around exactly that flow. Measurement visits are scheduled against the order, dimensions are versioned so re-measurements after tiling replace old sizes everywhere, production cuts from the latest approved dimensions, and dispatch, installation and snag-list closure happen on the same record. One order, one timeline, from the first wall measured to the customer's sign-off."
      },
      {
        "q": "Is there manufacturing software for wardrobes and modular furniture, or only kitchens?",
        "a": "ArchFlow covers the full modular interiors range — kitchens, wardrobes, TV units, vanities and made-to-order furniture. It works as furniture manufacturing software for Indian factories where every order is custom-measured and module-built, and as a modular interiors ERP when you want accounts, production and dealers on one system. Each deployment is built for your catalogue, so your product mix defines the platform — not the other way around."
      },
      {
        "q": "How much does modular kitchen manufacturing software cost, and how long does it take?",
        "a": "Pricing is scoped per project, because every factory's build is different — talk to us and we'll map your flow before quoting anything. On timeline: your first module is live in one to two weeks, and the full platform is deployed by week four — module by module, starting with whatever hurts most, usually quoting or dealer orders. GST invoicing and Tally integration are part of the build, not add-ons."
      }
    ]
  },
  {
    "slug": "glass-processing-software",
    "keyword": "glass processing software India",
    "metaTitle": "Glass Processing Software India | Plant to Dispatch",
    "metaDescription": "Glass processing software for India's toughened, laminated and DGU plants. Batch, rack and breakage tracking from enquiry to dispatch. Talk to us.",
    "eyebrow": "Solutions · Glass Processing",
    "h1Metal": "Glass processing software for India's",
    "h1Flow": "toughening, lamination and DGU lines.",
    "intro": "ArchFlow builds glass processing software for India's toughened, laminated and insulated glass processors — plants that have outgrown Excel cutting lists, WhatsApp order threads and registers at the dispatch gate. One platform carries every order from enquiry to delivery, with every lite, batch and rack accounted for.",
    "cardTitle": "Glass Processing",
    "cardBlurb": "For toughened and insulated glass units — racks, remakes and dispatch sequencing under control.",
    "pains": [
      {
        "title": "One broken lite holds the whole order",
        "body": "A lite cracks in the furnace or on the truck. The remake goes on a paper chit, jumps no queue, and nobody tells the customer. The order dispatches short, the site calls, and your team scrambles to reconstruct what happened."
      },
      {
        "title": "Racks leave the gate and go dark",
        "body": "A-frames carry lakhs worth of finished glass to sites across states — and no one can say which rack holds which order, which came back, or which has stood in a dealer's yard since March. Loading sequence is guesswork every evening."
      },
      {
        "title": "Quotes wait for one person's calculator",
        "body": "Sqm rates by thickness and process, hole and cutout charges, tempering extras, GST — it all lives in the owner's head or a locked Excel. Enquiries wait days for a number while a faster processor replies the same afternoon."
      }
    ],
    "modules": [
      {
        "title": "Enquiry to confirmed order",
        "body": "Capture sizes, thickness, process — toughened, laminated, DGU — and the drawings your customer sent on WhatsApp. One record from first call to confirmed order, nothing retyped, nothing lost."
      },
      {
        "title": "BOM-aware glass quoting",
        "body": "Sqm pricing by thickness and process, hole, cutout and shape extras, spacer and gas options for DGUs. Quotes go out in hours, GST-correct, from rates you control centrally."
      },
      {
        "title": "Batch and rack tracking",
        "body": "Every lite carries its order through cutting, edging, drilling and the toughening batch. Rack labels tie finished glass to racks, so dispatch knows exactly what stands where."
      },
      {
        "title": "Breakage and remake flow",
        "body": "Log a breakage at any stage — furnace, handling, transit — and a remake is raised instantly, prioritised in the queue, with the parent order showing exactly what is short."
      },
      {
        "title": "Dispatch sequencing and challans",
        "body": "Plan loads by route and drop order, so the last delivery goes in first. Challans, packing lists and e-way bill details come off the same order record."
      },
      {
        "title": "Owner's view, Tally and GST",
        "body": "One screen for leadership: orders by stage, remakes pending, racks out, dispatches due today. Invoices flow to Tally, GST-ready, without a clerk retyping a single line."
      }
    ],
    "proof": {
      "title": "Battle-tested next door to your industry",
      "body": "ArchFlow's spine — enquiry to installation, BOM-aware quoting, multi-department tracking — runs daily at Pranav Doors & Windows, a premium fenestration manufacturer in Chandigarh: 10 departments, 100-plus employees, a 14-stage order lifecycle, operations across five-plus states, live since 2024. Fenestration consumes processed glass every day, so we know your product from the buyer's side too. Your deployment is custom-built for glass processing."
    },
    "faqs": [
      {
        "q": "What is the best glass processing software in India?",
        "a": "The best glass processing software in India is the one built around how your plant actually runs — cutting lists, toughening batches, rack labels, dispatch challans — not a generic ERP you bend to fit. ArchFlow custom-builds one platform per processor, on a spine already running a 14-stage order lifecycle daily in Indian manufacturing. First modules go live in one to two weeks."
      },
      {
        "q": "Can glass ERP software track breakage and remakes?",
        "a": "Yes — breakage tracking sits inside the order itself. When a lite breaks in the furnace, in handling or in transit, your team logs it in seconds, a remake is raised against the parent order, and it takes priority in production. The order shows exactly what is short until the remake ships, so nothing dispatches incomplete and no customer is left waiting uninformed."
      },
      {
        "q": "How does glass factory management software handle racks and dispatch?",
        "a": "Every rack gets an identity. Finished lites are assigned to racks, racks to vehicles, vehicles to routes — loaded in reverse drop order, so the first delivery comes off the truck first. The platform shows which racks are out, at which site, and for how long, and generates challans, packing lists and e-way bill details from the same order record."
      },
      {
        "q": "How long does it take to implement software in a glass processing unit?",
        "a": "Weeks, not months. ArchFlow puts your first modules — typically enquiry, quotation and order tracking — live in one to two weeks, with full deployment by week four. Your team keeps working while each module lands; there is no big-bang migration and no six-month consulting project. Every deployment is custom-built around your plant's actual stages, so nothing arrives that you must work around."
      },
      {
        "q": "What does toughened glass plant software cost in India?",
        "a": "ArchFlow is scoped per project — the price depends on your lines, stages and volumes, so we quote after understanding your plant, not from a rate card. Talk to us with a picture of your current flow — even if it is Excel cutting lists and WhatsApp today — and you will get a clear scope, a clear timeline and a clear number."
      }
    ]
  },
  {
    "slug": "custom-erp-development",
    "keyword": "custom ERP development India",
    "metaTitle": "Custom ERP Development India | Live by Week 4",
    "metaDescription": "Custom ERP development in India for mid-size manufacturers. First module live in 1–2 weeks, full rollout by week 4. Scoped per project — talk to us.",
    "eyebrow": "Custom ERP · Build vs Buy",
    "h1Metal": "Custom ERP development in India,",
    "h1Flow": "built around your factory, live by week 4.",
    "intro": "ArchFlow does custom ERP development in India for mid-size manufacturers who have outgrown Excel but dread an 18-month off-the-shelf rollout. One platform shaped to your exact workflow — first module live in 1–2 weeks, deployed by week 4 — replacing scattered sheets, WhatsApp threads and rigid module suites.",
    "cardTitle": "Custom ERP Development",
    "cardBlurb": "The ERP alternative — built around your operation in weeks, not rolled out over 18 months.",
    "pains": [
      {
        "title": "Excel is running the factory",
        "body": "Enquiries in one sheet, quotations in another, order status on WhatsApp. Dispatch details re-typed into Tally for GST invoicing. When a director asks how many orders are stuck in production, someone spends half a day finding out."
      },
      {
        "title": "Off-the-shelf modules, your workflow",
        "body": "Generic ERPs sell modules; your business runs on workflows. Your quotation logic, your BOM structure, your approval chain get bent to fit someone else's forms. Rollouts stretch 12–18 months — and midway through, staff quietly go back to Excel."
      },
      {
        "title": "Per-seat pricing punishes growth",
        "body": "Every new hire needs a new licence, so supervisors share logins and half the factory stays off the system. The software meant to be your single source of truth ends up seeing only half the truth."
      }
    ],
    "modules": [
      {
        "title": "One thread from enquiry to installation",
        "body": "Every order lives on a single timeline — enquiry, quotation, order, production, dispatch, installation, service. Anyone can open it and see exactly which stage it is sitting at, and why."
      },
      {
        "title": "Quotations that know your BOM",
        "body": "Quotes are built from your actual bill of materials and pricing rules, not a blank spreadsheet — so complex, multi-item quotations can go out the same day, with nothing missed or under-priced."
      },
      {
        "title": "Every department, one platform",
        "body": "Sales, production, stores, dispatch, accounts, service — each department gets its own queue and screens, and every handoff is recorded. Nothing gets dropped between desks or lost in a forwarded email."
      },
      {
        "title": "Tally and GST without re-entry",
        "body": "Order data flows into GST-ready invoices and syncs with Tally, so accounts stops re-typing what sales already entered. One entry, everywhere it is needed, matching at month-end."
      },
      {
        "title": "Follow-ups that leave WhatsApp",
        "body": "Dealer enquiries, site measurements, payment reminders — every follow-up gets an owner and a date inside the platform. A multi-state dealer network stops depending on whoever remembers the chat thread."
      },
      {
        "title": "Reports your directors actually ask for",
        "body": "Custom MIS development is part of every build: orders by stage, overdue quotations, pending dispatches, department workloads — live, on your phone, without asking anyone to compile a sheet."
      }
    ],
    "proof": {
      "title": "Built on a factory floor, not a pitch deck",
      "body": "The ArchFlow spine — enquiry to installation across 14 stages, BOM-aware quoting, ten departments on one platform — was built for Pranav Doors & Windows, a premium fenestration manufacturer in Chandigarh with 100+ employees and operations across 5+ states. Deployed by week 4, it has run their full order lifecycle daily since 2024. Every new build is custom-made for its vertical, on that proven spine."
    },
    "faqs": [
      {
        "q": "What does custom ERP development in India cost?",
        "a": "Every ArchFlow project is scoped individually — no price lists, no per-seat licences, no module menus. You pay for a platform built around your workflow, then add users and departments freely as you grow. Deploying in weeks rather than months also removes much of the consulting overhead that inflates typical ERP budgets. Share your workflow and we will give you a clear, fixed scope."
      },
      {
        "q": "Is custom ERP a better alternative to off-the-shelf ERP for small manufacturers in India?",
        "a": "Usually, yes — when your workflow does not match standard modules, custom is the stronger option. Off-the-shelf ERPs offer broad feature lists and a known product, but rollouts commonly run 12–18 months, customisation is charged per change request, and per-seat pricing grows with headcount. A custom ERP is built to your exact stages and documents, deploys in weeks, and changes when your business changes."
      },
      {
        "q": "How long does it take to build a custom ERP for a manufacturer?",
        "a": "With ArchFlow, the first working module is live in one to two weeks and full deployment lands by week 4. We start with the stage that hurts most — usually quotations or order tracking — so your team is using the platform while the rest is built around them. That is the point of building custom: you do not wait for a big-bang go-live."
      },
      {
        "q": "Can you build a custom ERP for manufacturers outside doors and windows?",
        "a": "Yes. The ArchFlow spine — enquiry-to-installation tracking, BOM-aware quoting, multi-department handoffs — was built and battle-tested in fenestration manufacturing, and those bones fit most made-to-order manufacturers. Each deployment is custom-built for the client's vertical: your stages, your documents, your approval chains. If your business runs enquiry to quotation to production to dispatch, the spine already speaks your language."
      },
      {
        "q": "Who builds custom ERP software in Chandigarh?",
        "a": "ArchFlow is a two-founder company based in Chandigarh that builds custom ERP and MIS platforms for Indian manufacturers. Harsh Dhankhar leads engineering; Tanishq Trehan, a director at Pranav Doors & Windows, leads industry and strategy — so the software is shaped by someone who has run a factory's chaos, not just written code. We work with manufacturers across India, on-site where it matters."
      }
    ]
  },
  {
    "slug": "crm-for-manufacturers",
    "keyword": "CRM for manufacturers India",
    "metaTitle": "CRM for Manufacturers in India — Custom-Built",
    "metaDescription": "Custom CRM for manufacturers in India — enquiries, BOM-aware quotes, site visits, dealer networks on one platform. First module live in 2 weeks. Talk to us.",
    "eyebrow": "Solutions · Manufacturing CRM",
    "h1Metal": "A CRM for manufacturers in India who have",
    "h1Flow": "outgrown Excel.",
    "intro": "ArchFlow builds custom CRM for manufacturers in India — factories and industrial B2B sales teams still running on Excel sheets, WhatsApp forwards, and one overworked coordinator. It replaces the spreadsheet-and-memory system with one platform: every enquiry, quotation, site visit, follow-up, and dealer visible to leadership in real time.",
    "cardTitle": "CRM for Manufacturers",
    "cardBlurb": "Industrial sales CRM — site visits, dealer networks and quotation follow-ups that actually close.",
    "pains": [
      {
        "title": "Quotations take days, then go silent",
        "body": "An enquiry comes in from a dealer or an architect. Someone digs through old sheets for rates, builds the quote in Excel, emails a PDF. Revision three lives on one laptop. Nobody remembers to follow up — until the client buys elsewhere."
      },
      {
        "title": "Generic CRMs don't speak factory",
        "body": "Pipeline stages like 'Contacted' and 'Qualified' mean nothing when your sale runs through site visits, measurement sheets, quotation revisions, and a decision cycle that runs for months. Your BDMs stop updating a tool that doesn't match how they sell — and the CRM quietly dies."
      },
      {
        "title": "Leadership finds out at month-end",
        "body": "Which BDM visited which site this week? Which dealer's orders are slipping? What is the real pipeline across five states? Today the answer means calling six people and merging four Excel sheets — and by then the numbers are already old."
      }
    ],
    "modules": [
      {
        "title": "Enquiry desk",
        "body": "Every enquiry — phone, IndiaMART, dealer, architect referral — lands in one queue and gets an owner by territory and product line. Nothing lives in a personal inbox again."
      },
      {
        "title": "BOM-aware quotations",
        "body": "Quotes built from your real products, specs, and rates — not a blank spreadsheet. Revisions tracked, approvals in-app, a clean PDF out the same day the enquiry lands."
      },
      {
        "title": "Site visits and territories",
        "body": "BDMs log visits, measurements, and site photos from their phone. Leadership sees beat plans, visit history, and territory coverage without asking anyone for a report."
      },
      {
        "title": "Dealer network management",
        "body": "Every dealer and distributor as an account: their enquiries, orders, outstanding, and performance by state. The dealer management CRM your multi-state network actually needs."
      },
      {
        "title": "Follow-up engine",
        "body": "Every quotation carries a next action, an owner, and a date. Reminders fire before things go cold — so follow-up stops depending on one person's memory and WhatsApp scroll."
      },
      {
        "title": "Quote to order, no re-entry",
        "body": "A won quotation becomes an order in one click — and flows into production, dispatch, and installation if you run those on ArchFlow too. Tally and GST-ready invoicing sit alongside."
      }
    ],
    "proof": {
      "title": "Battle-tested on a factory floor",
      "body": "The spine of this CRM — enquiry to quotation to order to installation, fourteen stages — runs daily at Pranav Doors & Windows, a premium fenestration manufacturer in Chandigarh with ten departments, 100+ employees, and operations across five-plus states. Live since 2024. Every deployment is custom-built for the client's vertical, with first modules live in week one or two and full deployment by week four."
    },
    "faqs": [
      {
        "q": "Which is the best CRM for manufacturers in India?",
        "a": "The best CRM for manufacturers in India is one that models how factories actually sell: enquiries from dealers and architects, BOM-based quotations with revisions, site visits, long decision cycles, and multi-state dealer networks. Generic CRMs model none of this, which is why sales teams abandon them. ArchFlow builds custom CRM platforms around your exact sales process, so the tool matches the business instead of the other way around."
      },
      {
        "q": "Why do generic CRMs fail for industrial B2B sales?",
        "a": "Because they were designed for software and inside sales, not factories. An industrial sales CRM has to handle site visits and measurement sheets, quotations with a bill of materials, revision histories, BDM territories, and deals that take months to close. When the tool cannot record how the sale actually happens, salespeople stop updating it — and leadership goes back to Excel and phone calls."
      },
      {
        "q": "How much does custom CRM development in India cost?",
        "a": "ArchFlow scopes every project individually — custom CRM development in India depends on your sales process, team size, and the modules you need, so we don't publish a rate card. What we commit to publicly: your first module goes live in one to two weeks, and full deployment completes by week four. Talk to us and we'll scope it for your factory."
      },
      {
        "q": "Can manufacturing CRM software integrate with Tally and GST invoicing?",
        "a": "Yes. Manufacturing CRM software for India has to live alongside Tally, GST invoicing, and WhatsApp — that's where your accounts team and salespeople already work. ArchFlow builds these capabilities into the platform itself: quotations that respect GST structures, invoicing data that flows to Tally without re-entry, and follow-ups your team can act on from their phone."
      },
      {
        "q": "How do I manage dealers and distributors across multiple states?",
        "a": "Treat every dealer as a managed account, not a contact. ArchFlow's dealer management CRM capability gives each dealer and distributor a live record — enquiries they've sent, quotations pending, orders in production, outstanding payments, and performance by territory. Directors see the whole multi-state network on one screen instead of calling state heads for numbers that are a week old."
      }
    ]
  },
{
  "slug": "custom-mis-software",
  "keyword": "custom MIS software India",
  "metaTitle": "Custom MIS Software India | Live Reports, Not Excel",
  "metaDescription": "Custom MIS software for Indian businesses — live dashboards and automated MIS reports built on your actual workflow, not month-end Excel. Talk to us.",
  "eyebrow": "Solutions · MIS & Reporting",
  "h1Metal": "Custom MIS software for Indian businesses",
  "h1Flow": "where the reports write themselves.",
  "intro": "ArchFlow builds custom MIS software for Indian businesses that have outgrown Excel. The MIS sits on top of your live workflow — quotation, production, dispatch — so reports and dashboards generate themselves from work already happening. No re-entry, no month-old sheets: numbers that are true and live, on one screen.",
  "cardTitle": "Custom MIS Software",
  "cardBlurb": "Live dashboards and automated MIS reports built on your workflow — numbers that are true today.",
  "pains": [
    {
      "title": "One person spends the month building the MIS",
      "body": "Somewhere in your office sits the MIS person — chasing department heads for sheets, merging formats, fixing formulas. The report lands days into the next month, and when they take leave, the company flies blind. That is a bottleneck, not a system."
    },
    {
      "title": "Every department reports a different number",
      "body": "Sales says 62 orders dispatched. Dispatch says 58. Accounts has invoiced 51. The monthly review becomes an argument about whose Excel is right, and the real question — why did dispatches slip — never gets asked. Numbers that disagree are worse than no numbers."
    },
    {
      "title": "Directors read last week's business in a PDF",
      "body": "By the time the MIS PDF reaches the director, the stuck order has been stuck ten days and the dealer's payment has aged another week. Leadership steers a crore-scale operation through the rear-view mirror — and finds out when the customer calls."
    }
  ],
  "modules": [
    {
      "title": "Role-scoped live dashboards",
      "body": "Every role gets its own screen: directors see the whole business, department heads see their queue, coordinators see today's exceptions. Numbers update as work happens — nobody compiles anything, ever."
    },
    {
      "title": "Automated MIS reports",
      "body": "Daily and weekly digests build themselves from live operations — orders, production, dispatch, collections — and reach leadership on email or WhatsApp, on schedule. The month-end compilation ritual stops existing."
    },
    {
      "title": "KPI drill-down to the order",
      "body": "Every number opens. Dispatch looks low? Click from the KPI to the state, the dealer, the exact stuck order — which stage it is sitting at, and since when."
    },
    {
      "title": "Exception alerts",
      "body": "An MIS should interrupt you, not wait to be read. Quotations silent past their follow-up date, orders stuck at one stage too long, payments ageing past terms — flagged the day it happens."
    },
    {
      "title": "Leadership view on mobile",
      "body": "The director's MIS lives on the phone: today's enquiries, dispatches, collections and stuck points, glanceable between site visits and meetings. No laptop, no calling the office for numbers."
    },
    {
      "title": "Finance MIS with Tally and GST",
      "body": "Finance reporting aligned with Tally and GST invoicing, tied to the same orders operations tracks. Billing, outstanding and dealer-wise collections reconcile with the factory's numbers because they share one source."
    }
  ],
  "proof": {
    "title": "The MIS a real factory's directors read daily",
    "body": "ArchFlow runs the full 14-stage order lifecycle at Pranav Doors & Windows — a premium fenestration manufacturer in Chandigarh with 10 departments, 100+ employees and operations across 5+ states — daily since 2024. Its directors read live numbers, not compiled sheets. First modules were live in weeks one and two, full deployment by week four. Co-founder Tanishq Trehan is a director there."
  },
  "faqs": [
    {
      "q": "What is MIS software?",
      "a": "MIS software — management information system software — collects data from a business's daily operations and turns it into the reports and dashboards leadership uses to run the company: sales, production, dispatch, collections, outstanding. In most Indian SMEs, the 'MIS' is actually a person compiling Excel sheets every month. ArchFlow builds the MIS on top of your live workflow instead, so reports generate themselves from work that is already recorded."
    },
    {
      "q": "How much does MIS software cost in India?",
      "a": "There is no fixed price — ArchFlow scopes every MIS project individually, so the cost depends on which reports leadership needs, how many departments feed them, and whether the underlying workflow moves onto the platform too. Weigh it against what the Excel MIS already costs: a full-time person compiling numbers that arrive stale. Talk to us — you will have a clear scope before any commitment."
    },
    {
      "q": "What is the difference between MIS and ERP?",
      "a": "An ERP runs the work — orders, production, inventory and accounts move through it as transactions. MIS software reports on the work — dashboards and summaries for decision-makers. In practice, an Indian SME buying 'MIS' needs both halves connected, because reports are only as true as the operational data underneath. ArchFlow builds them as one platform: the workflow generates the transactions, and the MIS layer reads them live, so nothing is compiled or re-entered."
    },
    {
      "q": "Which is the best MIS software for manufacturers?",
      "a": "The best MIS software for manufacturers is one that reads from live operations instead of asking anyone to enter data. Generic MIS dashboard software fails on factory floors because it needs clean, current data — and a factory run on Excel has neither. ArchFlow is an MIS software company that builds the operational workflow first — enquiry, quotation, production, dispatch — then the MIS on top, so every number a director sees traces to a real order at a real stage."
    },
    {
      "q": "Can MIS reports be generated automatically?",
      "a": "Yes — if the MIS sits on the system where work actually happens. When quotations, production, dispatch and collections run on one platform, daily and weekly MIS reports compile themselves: a digest in leadership's inbox every morning, dashboards live all day. What cannot be automated is an MIS built on Excel, because someone still has to collect and re-type the sheets. Automating the report means moving the workflow, not just the report."
    },
    {
      "q": "Is there MIS report software that works with Tally?",
      "a": "Yes. In most Indian businesses the finance MIS lives in Tally and the operations MIS lives in Excel — and the two never agree. ArchFlow builds MIS report software that reads both sides: operational numbers from the live workflow, finance numbers aligned with Tally and GST invoicing, in one set of reports. Sales, dispatch, billing and outstanding finally reconcile, because they come from a single order thread instead of separate sheets."
    }
  ]
}
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** Location page — rendered at /custom-software-company-chandigarh (top-level, not part of the industry hub). */
export const chandigarhPage: Solution = {
  "slug": "custom-software-company-chandigarh",
  "keyword": "custom software development company in Chandigarh",
  "metaTitle": "Custom Software Development Company in Chandigarh",
  "metaDescription": "Custom software development company in Chandigarh building ERP-alternative platforms, MIS and CRM for tricity manufacturers. Visit a live deployment.",
  "eyebrow": "Chandigarh · Mohali · Panchkula",
  "h1Metal": "The custom software development company in Chandigarh",
  "h1Flow": "that has stood on a factory floor.",
  "intro": "ArchFlow is a custom software development company in Chandigarh building ERP-alternative platforms, MIS dashboards and industrial CRMs for the tricity's manufacturers. Two founders who walk your factory during discovery and sit across the table during rollout. Our flagship deployment runs daily in Chandigarh — come and see it.",
  "cardTitle": "Custom Software Company, Chandigarh",
  "cardBlurb": "ERP-alternative platforms, MIS and CRM for tricity manufacturers — with a live deployment you can visit.",
  "pains": [
    {
      "title": "The metro agency that never saw your factory",
      "body": "You hired a team from Gurugram or Bengaluru. Discovery happened over video calls. The software that arrived had never met your store room, your dispatch yard or your billing desk — and it shows. Within months, the floor is quietly back on Excel."
    },
    {
      "title": "Tricity IT firms that build websites, not factories",
      "body": "Most software companies in the tricity live on websites, apps and outsourced work. Ask them about BOM structures, cutting lists or dispatch challans and the room goes quiet. Industrial software built without industrial understanding demos well — and dies on the floor."
    },
    {
      "title": "The 18-month ERP quotation",
      "body": "The branded ERP proposal arrives with per-user licences, a consultant bench and an 18-month rollout plan. You need order tracking this quarter, not a transformation programme. Halfway through rollouts like that, staff drift back to the spreadsheets that always worked."
    }
  ],
  "modules": [
    {
      "title": "ERP-alternative platforms",
      "body": "One platform from enquiry to dispatch, shaped to your exact stages. Where an ERP software company in Chandigarh sells modules, we build the workflow your factory already runs — live by week four."
    },
    {
      "title": "MIS dashboards for directors",
      "body": "Orders by stage, pending advances, department workloads — live on your phone. Built for owners running plants in Mohali's Phase 8–9 belt who are done waiting for month-end Excel."
    },
    {
      "title": "Industrial CRM",
      "body": "As a CRM software development company in Chandigarh, we model how industrial sales actually run — dealer enquiries, site visits, quotation revisions, and WhatsApp follow-ups that finally get owners and dates."
    },
    {
      "title": "Quotation engines",
      "body": "Spec-heavy, multi-item quotes priced from your real bill of materials, out the same day the enquiry lands. Discount approvals route to the right person in-app, not through a chat thread."
    },
    {
      "title": "Production and dispatch",
      "body": "Live job cards from cutting to QC to loading. Challans and e-way details generate off the order, so the gate register and the system finally tell the same story."
    },
    {
      "title": "Multi-state operations",
      "body": "Dealers in Punjab, projects in Himachal, sites across five states — run from your Chandigarh office. GST invoicing and Tally integration are scoped in from day one, not bolted on."
    }
  ],
  "proof": {
    "title": "Live in Chandigarh. Come and see it.",
    "body": "ArchFlow runs daily at Pranav Doors & Windows, a premium fenestration manufacturer in Chandigarh — 10 departments, 100+ employees, operations across 5+ states, the full 14-stage order lifecycle live since 2024. First modules were live in weeks one and two; full deployment by week four. The factory is a short drive from anywhere in the tricity, and we will walk you through it ourselves."
  },
  "faqs": [
    {
      "q": "Which is the best custom software development company in Chandigarh for manufacturers?",
      "a": "Judge on three things: has the firm shipped software a factory actually runs daily, will the builders stand on your floor during discovery, and can they show you a live deployment nearby. Most tricity firms build websites and apps; big vendors quote 18-month rollouts. ArchFlow is two founders in Chandigarh building custom ERP and MIS platforms for manufacturers — and our flagship deployment runs daily in Chandigarh, open for you to visit."
    },
    {
      "q": "Is there an ERP software company in Chandigarh that builds custom, not off-the-shelf?",
      "a": "Yes — that is exactly what ArchFlow is. We build platforms that do an ERP's job — enquiry, quotation, production, dispatch, accounts handoff to Tally — without an ERP's rollout. No module menus, no per-user licences: software shaped to your stages, first module live in one to two weeks, deployed by week four. If Excel is currently your ERP, that is the exact situation we build for."
    },
    {
      "q": "Do you work with factories in Mohali and Panchkula?",
      "a": "Yes — we treat the tricity as one market. If you have searched for a custom software development company in Mohali or an IT company in Panchkula that understands manufacturing, we serve both, along with Zirakpur, Derabassi and Baddi. Factory visits during discovery are standard: we walk your floor in Mohali's Phase 8–9 industrial belt or Panchkula's industrial area before we scope a single screen."
    },
    {
      "q": "How much does custom software development cost in Chandigarh?",
      "a": "There is no rate card — every ArchFlow platform is scoped per project, because a quotation engine for a fabricator and a full order-lifecycle platform for a multi-state manufacturer are entirely different builds. You sit with both founders, we map your workflow — usually on your own floor — and you get a clear scope and a firm number before any commitment. Talk to us; scoping costs you one conversation."
    },
    {
      "q": "Can we visit a live deployment before committing?",
      "a": "Yes, and we encourage it. Pranav Doors & Windows in Chandigarh has run its full 14-stage order lifecycle on ArchFlow daily since 2024, across 10 departments and 100+ employees. You can stand in the departments and watch real orders move. No proof we could put on a website compares to watching a factory in your own city run on the platform."
    },
    {
      "q": "Do you work with businesses outside the Chandigarh tricity?",
      "a": "Yes. Pranav Doors & Windows itself operates across five-plus states, and ArchFlow runs its dealer networks and site teams wherever they sit. For clients further out, discovery still gets the on-site treatment — we travel to the factory when the work needs it. Chandigarh is our home advantage, not our boundary."
    }
  ]
};
