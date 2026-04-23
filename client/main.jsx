// ===== STATE =====
const state = {
  portal: 'alumni',
  activePage: 'home',
  adminPage: 'admin-home',
  donateCat: 'Student Projects',
  donationView: 'list',
  selectedCampaign: null,
  activeDetailTab: 'team',
  pledgeType: 'Recurring',
  adminQueueView: 'list'
};

// ===== CAMPAIGNS DATA =====
const campaignsData = {
  'Student Projects': [
    {id:'sp1',title:'Robotics Club Finals Trip',desc:'Support the Engineering robotics team traveling to Tokyo for the international finals.',raised:800,goal:1200,imgClass:'bg-robotics',icon:'🤖',verified:true},
    {id:'sp2',title:'Solar Water Purifier Prototype',desc:'Funding materials for a senior capstone project aimed at rural communities.',raised:4500,goal:10000,imgClass:'bg-scholarship',icon:'☀️',verified:true}
  ],
  'Alumni Business': [
    {id:'ab1',title:'Kape Atenista Roasters',desc:'Expanding our locally-sourced coffee shop to a second branch near campus.',raised:25000,goal:50000,imgClass:'bg-business',icon:'☕',verified:true},
    {id:'ab2',title:'EduTech App Seed Funding',desc:'Developing a peer-tutoring app bridging alumni mentors and current students.',raised:15000,goal:100000,imgClass:'bg-robotics',icon:'📱',verified:false}
  ],
  'Community Initiatives': [
    {id:'ci1',title:"Class of '24 Scholarship Fund",desc:'Helping underprivileged students fulfill their dreams at ADDU.',raised:4500,goal:5000,imgClass:'bg-scholarship',icon:'🎓',verified:true},
    {id:'ci2',title:'Campus Greening Project',desc:'Planting 500 native trees around the new campus buildings.',raised:1200,goal:3000,imgClass:'bg-community',icon:'🌳',verified:true}
  ],
  'Emergency Fund': [
    {id:'ef1',title:'Medical Aid for Alumni',desc:'Urgent assistance for surgery costs for a fellow alumnus.',raised:2000,goal:10000,imgClass:'bg-emergency',icon:'🏥',verified:true,urgent:true},
    {id:'ef2',title:'Typhoon Relief Operation',desc:'Providing immediate relief goods to affected student families.',raised:18000,goal:50000,imgClass:'bg-robotics',icon:'🌧️',verified:true,urgent:true}
  ]
};

// ===== TOAST =====
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3500);
}

// ===== AUTH =====
function biometricLogin(){
  showToast('Biometric authentication successful!');
  setTimeout(doLogin,800);
}
function doLogin(){
  document.getElementById('login-page').style.display='none';
  document.getElementById('app-shell').style.display='block';
  showPage('home');
}
function doLogout(){
  document.getElementById('app-shell').style.display='none';
  document.getElementById('login-page').style.display='flex';
}

// ===== PORTAL SWITCH =====
function switchPortal(p){
  state.portal=p;
  document.getElementById('tabAlumni').classList.toggle('active',p==='alumni');
  document.getElementById('tabAdmin').classList.toggle('active',p==='admin');
  document.getElementById('alumniPortal').classList.toggle('hidden',p==='admin');
  document.getElementById('adminPortal').classList.toggle('hidden',p==='alumni');
  if(p==='admin') showAdminPage('admin-home');
  else showPage('home');
}

// ===== ALUMNI SIDEBAR =====
function setSidebarActive(id){
  document.querySelectorAll('#alumniPortal .sidebar-item').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('si-'+id);
  if(el) el.classList.add('active');
}
function setAdminSidebarActive(id){
  document.querySelectorAll('#adminPortal .sidebar-item').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('asi-'+id);
  if(el) el.classList.add('active');
}

// ===== ALUMNI PAGES =====
function showPage(page){
  state.activePage=page;
  setSidebarActive(page);
  if(page==='donation'){state.donationView='list';renderDonationList();}
  else{
    const mc=document.getElementById('mainContent');
    mc.innerHTML='';
    mc.className='main-content page-anim';
    if(page==='home') mc.innerHTML=renderHome();
    else if(page==='network') mc.innerHTML=renderNetwork();
    else if(page==='career') mc.innerHTML=renderCareer();
    else if(page==='documents') mc.innerHTML=renderDocuments();
    else if(page==='profile') mc.innerHTML=renderProfile();
    else if(page==='transactions') mc.innerHTML=renderTransactions();
  }
}

function goHome(){if(state.portal==='alumni') showPage('home'); else showAdminPage('admin-home');}

// ===== HOME =====
function renderHome(){return `
<div class="hero-card"><div class="hero-card-inner">
  <div class="hero-welcome">Welcome back,</div>
  <div class="hero-name">Hello, Alex!</div>
  <div class="hero-meta">
    <span class="hero-chip">Class of 2015</span>
    <span class="hero-chip">Engineering Dept.</span>
    <span class="hero-chip">✔ Verified</span>
  </div>
</div></div>
<div class="quick-nav">
  <button class="quick-nav-btn" onclick="showPage('profile')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>My Profile</span></button>
  <button class="quick-nav-btn" onclick="showPage('network')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>Network</span></button>
  <button class="quick-nav-btn" onclick="showPage('donation')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span>Donate</span></button>
  <button class="quick-nav-btn" onclick="showPage('career')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg><span>Career</span></button>
</div>
<div class="dashboard-grid">
  <div>
    <div class="card" style="margin-bottom:1.5rem">
      <div class="card-header"><div class="card-title">Your Daily Snapshot</div></div>
      <div class="snapshot-grid">
        <div class="snapshot-item"><div class="label">Jobs For You</div><div class="value">5</div><div class="sub">New matches today</div></div>
        <div class="snapshot-item"><div class="label">Profile</div><div class="value">95%</div><div class="sub">Verified • Complete</div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Recent Activity</div><button class="view-all" onclick="showPage('transactions')">View All</button></div>
      <div class="activity-item"><div class="activity-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div class="activity-text"><h4>New Mentor Message</h4><p>Dr. Reyes replied to your inquiry about UX Design roles</p></div><div class="activity-time">15m ago</div></div>
      <div class="activity-item"><div class="activity-icon green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg></div><div class="activity-text"><h4>Donation Receipt Ready</h4><p>Thank you for your contribution to the Robotics team</p></div><div class="activity-time">2h ago</div></div>
    </div>
  </div>
  <div>
    <div class="impact-card" onclick="showDonationImpact()">
      <h3>Your Total Impact</h3><div class="impact-stat">15</div><div class="impact-label">Projects Funded</div>
      <div class="impact-row"><div class="impact-col"><div class="num">1,240+</div><div class="lbl">Lives Touched</div></div><div class="impact-col"><div class="num">₱2,500</div><div class="lbl">Contributed</div></div></div>
      <button class="btn-ghost" style="width:100%;margin-top:1rem;background:rgba(255,255,255,0.15);border:none">View Impact Details & Automate →</button>
    </div>
    <div class="card" style="margin-top:1.5rem">
      <div class="card-title" style="margin-bottom:12px">Quick Donate</div>
      <p style="font-size:13px;color:var(--gray-600);margin-bottom:12px">Support a cause you believe in</p>
      <button class="btn-donate" onclick="showPage('donation')">Browse Campaigns →</button>
    </div>
  </div>
</div>`;}

// ===== DONATION =====
function renderDonationList(){
  setSidebarActive('donation');
  const mc=document.getElementById('mainContent');
  mc.className='main-content page-anim';
  mc.innerHTML=`
<div class="donation-header">
  <div class="donation-header-inner">
    <div><h1>Donation Hub</h1><p>Support University Initiatives & Student Dreams</p></div>
    <div class="total-impact" onclick="showDonationImpact()">
      <div class="label">Your Total Impact</div>
      <div class="amount">₱1,250.00</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.8);margin-top:4px">Click to Pledge & Automate →</div>
    </div>
  </div>
</div>
<div class="donation-search">
  <div class="search-bar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="text" placeholder="Find a student project, cause, or fund..."/></div>
  <button class="start-campaign-btn" onclick="openModal()">+ Start a Campaign</button>
</div>
<div class="category-grid" id="catGrid">${Object.keys(campaignsData).map(cat=>`
  <div class="category-card ${state.donateCat===cat?'active':''}" onclick="selectCat('${cat}')">
    <div class="category-icon">${getCatIcon(cat)}</div>
    <div class="category-name">${cat}</div>
  </div>`).join('')}
</div>
<div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem"><h2>Featured: ${state.donateCat}</h2></div>
  <div class="campaign-cards">${campaignsData[state.donateCat].map(camp=>renderCampaignCard(camp)).join('')}</div>
</div>`;}

function getCatIcon(cat){
  if(cat==='Student Projects') return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
  if(cat==='Alumni Business') return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
  if(cat==='Community Initiatives') return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

function renderCampaignCard(camp){
  const pct=Math.min((camp.raised/camp.goal)*100,100);
  return `<div class="campaign-card" onclick="openCampaignDetail('${camp.id}')">
    <div class="campaign-image ${camp.imgClass}">
      <div class="campaign-image-placeholder">${camp.icon}</div>
      ${camp.verified?'<div class="verified-stamp">✔ Verified</div>':''}
      ${camp.urgent?'<div class="verified-stamp" style="background:rgba(224,29,72,0.9);top:35px">🚨 Critical</div>':''}
    </div>
    <div class="campaign-body">
      <div class="campaign-title">${camp.title}</div>
      <div class="campaign-desc">${camp.desc}</div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <div class="campaign-stats"><span class="raised">₱${camp.raised.toLocaleString()} raised</span><span>Goal: ₱${camp.goal.toLocaleString()}</span></div>
      <button class="btn-donate">View Details & Donate</button>
    </div>
  </div>`;}

function selectCat(cat){
  state.donateCat=cat;
  renderDonationList();
}

function openCampaignDetail(id){
  let camp=null;
  for(const c of Object.values(campaignsData)){const f=c.find(x=>x.id===id);if(f){camp=f;break;}}
  if(!camp) return;
  state.selectedCampaign=camp;
  state.donationView='detail';
  state.activeDetailTab='team';
  renderCampaignDetail();
}

function renderCampaignDetail(){
  const camp=state.selectedCampaign;
  const pct=Math.round((camp.raised/camp.goal)*100);
  const mc=document.getElementById('mainContent');
  mc.className='main-content page-anim';
  mc.innerHTML=`
<button class="btn-back" onclick="renderDonationList()">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back to ${state.donateCat}
</button>
<div class="project-detail-layout">
  <div>
    <div class="project-hero ${camp.imgClass}">
      <div class="play-btn-overlay"><svg viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" width="28" height="28" style="margin-left:4px"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
      <div style="position:absolute;bottom:1.5rem;left:1.5rem;background:rgba(0,0,0,0.6);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;backdrop-filter:blur(4px)">▶ Watch Student Pitch</div>
    </div>
    <div style="margin-bottom:2rem">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <h1 style="font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:var(--addu-navy);line-height:1.2">${camp.title}</h1>
        ${camp.verified?'<span style="background:rgba(16,163,100,0.1);color:#10A364;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.05em">VERIFIED PROJECT</span>':''}
      </div>
      <p style="font-size:15px;color:var(--gray-600);line-height:1.6">${camp.desc} This initiative allows alumni to bypass bureaucracy and fund the students directly, providing them the materials they need to succeed in their academic and extra-curricular endeavors.</p>
    </div>
    <div class="project-tabs-nav">
      <button class="project-tab ${state.activeDetailTab==='team'?'active':''}" onclick="setDetailTab('team')">The Team</button>
      <button class="project-tab ${state.activeDetailTab==='impact'?'active':''}" onclick="setDetailTab('impact')">Expected Impact</button>
      <button class="project-tab ${state.activeDetailTab==='timeline'?'active':''}" onclick="setDetailTab('timeline')">Timeline</button>
    </div>
    <div id="detailTabContent">${renderDetailTab()}</div>
  </div>
  <div>
    <div class="support-card">
      <div style="font-size:13px;font-weight:600;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Funding Progress</div>
      <div style="font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:var(--addu-navy);line-height:1">₱${camp.raised.toLocaleString()}</div>
      <div style="font-size:14px;color:var(--gray-600);margin-bottom:1rem">raised of ₱${camp.goal.toLocaleString()} goal</div>
      <div class="progress-bar-wrap" style="height:8px"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <div style="text-align:right;font-size:12px;font-weight:700;color:var(--addu-blue);margin-top:8px">${pct}% Funded</div>
      <div class="support-btn-group">
        <button class="btn-primary" style="padding:16px;font-size:15px;display:flex;justify-content:center;align-items:center;gap:8px" onclick="renderDonationSuccess()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Donate Securely
        </button>
        <button class="btn-outline" onclick="showToast('Mentorship & Volunteer form opened.')">Volunteer as Mentor</button>
        <button class="btn-outline" onclick="showToast('Shipping details sent to your email.')">Send Equipment/Parts</button>
      </div>
      <p style="font-size:11px;color:var(--gray-400);text-align:center;margin-top:1rem;line-height:1.4">Secured via AdDU Payment Gateway. 100% of proceeds reach the students.</p>
    </div>
  </div>
</div>`;}

function renderDetailTab(){
  if(state.activeDetailTab==='team') return `
<div>
  <h3 style="margin-bottom:8px;font-size:16px;font-weight:700;color:var(--addu-navy)">Meet the Innovators</h3>
  <p style="font-size:13px;color:var(--gray-600);margin-bottom:1.5rem">Connect directly with the students. 100% of your support goes straight to their materials.</p>
  <div class="team-grid">
    <div class="team-card"><div class="team-avatar">JD</div><div><div style="font-weight:700;font-size:14px;color:var(--addu-navy)">John Doe</div><div style="font-size:12px;color:var(--gray-600)">Lead Engineer · BS ME '25</div><button class="btn-ghost" style="padding:4px 0;color:var(--addu-blue);font-size:12px;margin-top:4px;border:none" onclick="showToast('Messaging interface opened.')">Message Student →</button></div></div>
    <div class="team-card"><div class="team-avatar" style="background:var(--addu-gold);color:white">MR</div><div><div style="font-weight:700;font-size:14px;color:var(--addu-navy)">Maria Reyes</div><div style="font-size:12px;color:var(--gray-600)">Project Manager · BS IT '24</div><button class="btn-ghost" style="padding:4px 0;color:var(--addu-blue);font-size:12px;margin-top:4px;border:none" onclick="showToast('Messaging interface opened.')">Message Student →</button></div></div>
  </div>
</div>`;
  if(state.activeDetailTab==='impact') return `<div style="font-size:14px;color:var(--gray-700);line-height:1.6"><p>Your donation will directly fund the purchasing of raw materials (sensors, microcontrollers, and chassis elements). Leftover funds are allocated to subsidizing the students' travel fare to the competition venue.</p></div>`;
  return `<div style="font-size:14px;color:var(--gray-700);line-height:1.6"><p><strong>Phase 1 (Current):</strong> Prototyping and material gathering.<br/><strong>Phase 2 (Next Month):</strong> Testing and iterations.<br/><strong>Phase 3:</strong> Final competition deployment.</p></div>`;
}

function setDetailTab(tab){
  state.activeDetailTab=tab;
  document.querySelectorAll('.project-tab').forEach(b=>{b.classList.toggle('active',b.textContent.toLowerCase().includes(tab==='team'?'team':tab==='impact'?'impact':'time'));});
  document.getElementById('detailTabContent').innerHTML=renderDetailTab();
}

function renderDonationSuccess(){
  const camp=state.selectedCampaign;
  const mc=document.getElementById('mainContent');
  mc.className='main-content page-anim';
  mc.innerHTML=`
<div class="post-donation-view">
  <button class="btn-back" onclick="renderDonationList()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back to Hub</button>
  <div style="text-align:center;margin-bottom:2rem">
    <div style="width:64px;height:64px;background:rgba(16,163,100,0.1);color:#10A364;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="32" height="32"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <h1 style="font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:var(--addu-navy);margin-bottom:8px">Thank you for empowering our project!</h1>
    <p style="font-size:16px;color:var(--gray-600)">Your contribution to <strong>${camp.title}</strong> was successful.</p>
  </div>
  <div class="video-message-container" onclick="showToast('Video Playing...')">
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#1A3A8F,#2B57C8);display:flex;align-items:center;justify-content:center">
      <span style="font-size:14px;color:rgba(255,255,255,0.3);font-weight:700">VIDEO PLAYER PLACEHOLDER</span>
    </div>
    <div class="video-overlay">
      <div class="play-btn-overlay" style="margin-bottom:1rem;align-self:center;background:rgba(255,255,255,0.1);border:none;backdrop-filter:blur(8px)">
        <svg viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" width="32" height="32" style="margin-left:4px"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
      <h3 style="font-size:20px;font-weight:700;margin:0">A message from the ${camp.title} Team</h3>
      <p style="font-size:13px;opacity:0.8;margin-top:4px">Recorded 10 mins ago directly from the lab.</p>
    </div>
  </div>
  <div class="impact-summary-card">
    <div class="impact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="32" height="32"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
    <div style="flex:1"><h3 style="font-size:16px;font-weight:700;color:var(--addu-navy);margin-bottom:4px">Immediate Impact Confirmed</h3><p style="font-size:13px;color:var(--gray-600);line-height:1.5">Your funds are immediately credited to the team's material acquisition ledger.</p></div>
  </div>
  <div style="display:flex;gap:1rem;margin-top:2rem">
    <button class="btn-primary" style="flex:1;padding:14px;font-size:14px" onclick="showToast('Saved to your Profile Transactions.')">Save to Profile</button>
    <button class="btn-outline" style="flex:1;padding:14px;font-size:14px" onclick="showToast('Link copied to clipboard!')">Share Impact</button>
    <label style="flex:1;display:flex;align-items:center;justify-content:center;gap:10px;font-size:13px;font-weight:600;color:var(--gray-700);border:1px solid var(--gray-200);border-radius:var(--radius-sm);cursor:pointer">
      <input type="checkbox" checked style="width:16px;height:16px;accent-color:var(--addu-blue)"/>Notify me of updates
    </label>
  </div>
</div>`;}

function showDonationImpact(){
  setSidebarActive('donation');
  const mc=document.getElementById('mainContent');
  mc.className='main-content page-anim';
  mc.innerHTML=`
<button class="btn-back" onclick="renderDonationList()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back to Hub</button>
<div class="page-title-bar" style="margin-bottom:2rem"><div><div class="page-title">Your Impact Details</div><div class="page-subtitle">Visualize your giving history and set up automated pledges</div></div></div>
<div class="project-detail-layout">
  <div class="card">
    <div class="card-header"><div class="card-title">Lifetime Contributions</div></div>
    <div style="display:flex;flex-direction:column;align-items:center;padding:2rem 0">
      <div class="donut-wrap" style="width:240px">
        <svg viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="70" fill="none" stroke="var(--gray-100)" stroke-width="24"/>
          <circle cx="90" cy="90" r="70" fill="none" stroke="#1A3A8F" stroke-width="24" stroke-dasharray="197.9 241.9" stroke-dashoffset="0" stroke-linecap="round"/>
          <circle cx="90" cy="90" r="70" fill="none" stroke="#2B57C8" stroke-width="24" stroke-dasharray="109.9 329.9" stroke-dashoffset="-207.9" stroke-linecap="round"/>
          <circle cx="90" cy="90" r="70" fill="none" stroke="#C8971A" stroke-width="24" stroke-dasharray="87.9 351.9" stroke-dashoffset="-327.8" stroke-linecap="round"/>
          <circle cx="90" cy="90" r="70" fill="none" stroke="#E01D48" stroke-width="24" stroke-dasharray="43.9 395.9" stroke-dashoffset="-425.7" stroke-linecap="round"/>
        </svg>
        <div class="donut-center"><div class="total-label">Total Given</div><div class="total-value" style="font-size:28px">₱1,250</div></div>
      </div>
      <div class="legend-items" style="width:100%;margin-top:1.5rem">
        <div class="legend-item"><div class="legend-dot" style="background:#1A3A8F"></div><div class="legend-name">Scholarships</div><div class="legend-pct">₱562</div></div>
        <div class="legend-item"><div class="legend-dot" style="background:#2B57C8"></div><div class="legend-name">Student Projects</div><div class="legend-pct">₱312</div></div>
        <div class="legend-item"><div class="legend-dot" style="background:#C8971A"></div><div class="legend-name">Community</div><div class="legend-pct">₱250</div></div>
        <div class="legend-item"><div class="legend-dot" style="background:#E01D48"></div><div class="legend-name">Emergency</div><div class="legend-pct">₱125</div></div>
      </div>
    </div>
  </div>
  <div class="card" style="box-shadow:var(--shadow-md);border:1.5px solid var(--addu-blue)">
    <div class="card-header" style="margin-bottom:0.5rem"><div class="card-title" style="font-size:20px">Pledge & Automate</div></div>
    <p style="font-size:13px;color:var(--gray-600);margin-bottom:1.5rem;line-height:1.5">Turn your good intentions into consistent impact. We'll automatically process your pledge.</p>
    <div class="pledge-toggle-bar">
      <button class="pledge-tab active" id="ptRecurring" onclick="setPledgeType('Recurring')">Recurring</button>
      <button class="pledge-tab" id="ptOneTime" onclick="setPledgeType('One-time')">One-time</button>
    </div>
    <div class="form-group"><label class="form-label">Frequency</label><select class="form-input" style="appearance:auto;background:var(--gray-50)"><option>Every Payday (15th & 30th)</option><option>Monthly (1st of Month)</option><option>Quarterly</option></select></div>
    <div class="form-group"><label class="form-label">Amount per cycle (₱)</label><div style="position:relative"><span style="position:absolute;left:16px;top:14px;font-weight:700;color:var(--addu-navy)">₱</span><input class="form-input" type="number" value="500" style="padding-left:32px;font-size:16px;font-weight:700;color:var(--addu-navy)"/></div></div>
    <div class="form-group"><label class="form-label">Payment Method</label><select class="form-input" style="appearance:auto;background:var(--gray-50)"><option>GCash (...1234)</option><option>BPI Account (...9876)</option><option>Add New Card</option></select></div>
    <div class="form-group"><label class="form-label">Pin to Cause</label><select class="form-input" style="appearance:auto;background:var(--gray-50)"><option>General Scholarship Fund</option><option>Emergency & Calamity Fund</option><option>Robotics Club Support</option><option>Distribute Evenly</option></select></div>
    <button class="btn-primary" style="width:100%;padding:16px;margin-top:1rem;font-size:15px" onclick="showToast('Automated Pledge Setup Complete!');renderDonationList()">Confirm Pledge Setup</button>
  </div>
</div>`;}

function setPledgeType(t){
  state.pledgeType=t;
  document.getElementById('ptRecurring').classList.toggle('active',t==='Recurring');
  document.getElementById('ptOneTime').classList.toggle('active',t==='One-time');
}

// ===== NETWORK =====
function renderNetwork(){
  const alumni=[
    {i:'SC',name:'Sarah Chen',role:'Senior Product Designer at TechFlow',batch:"BS Computer Science '18",bg:'linear-gradient(135deg,#1A3A8F,#2B57C8)'},
    {i:'MJ',name:'Marcus Johnson',role:'Head of Marketing at Global Corp',batch:"BA Communications '15",bg:'linear-gradient(135deg,#1E8449,#27AE60)'},
    {i:'ER',name:'Elena Rodriguez',role:'Civil Engineer at BuildRight Inc.',batch:"BS Civil Engineering '19",bg:'linear-gradient(135deg,#7B2D8B,#9B59B6)'},
    {i:'JP',name:'Jose Palma',role:'Founder at StartupPH',batch:"BS Management '16",bg:'linear-gradient(135deg,#B7770D,#D4AC0D)'},
    {i:'MA',name:'Maria Aquino',role:'Lawyer at Cruz & Partners',batch:"JD Law '17",bg:'linear-gradient(135deg,#0F4C75,#1B6CA8)'},
    {i:'DT',name:'Diego Torres',role:'Data Scientist at Grab',batch:"BS Statistics '20",bg:'linear-gradient(135deg,#6C2E83,#8E44AD)'}
  ];
  return `
<div class="page-title-bar"><div><div class="page-title">AdDU Nation</div><div class="page-subtitle">Discover and connect with ADDU peers worldwide</div></div></div>
<div class="baybayin-accent"></div>
<div class="donation-search" style="margin-bottom:1rem"><div class="search-bar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="text" placeholder="Search alumni by name, year, or industry"/></div></div>
<div class="filter-pills">
  <button class="pill active" onclick="this.classList.toggle('active')">All Alumni</button>
  <button class="pill" onclick="this.classList.toggle('active')">Near Me</button>
  <button class="pill" onclick="this.classList.toggle('active')">Industry Experts</button>
  <button class="pill" onclick="this.classList.toggle('active')">Class of 2015</button>
  <button class="pill" onclick="this.classList.toggle('active')">Class of 2018</button>
  <button class="pill" onclick="this.classList.toggle('active')">Class of 2020</button>
</div>
<div class="section-title">Featured Alumni</div>
<div class="alumni-grid">${alumni.map(a=>`
  <div class="alumni-card">
    <div class="alumni-avatar" style="background:${a.bg}">${a.i}<div class="verified-dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div></div>
    <div class="alumni-name">${a.name}</div>
    <div class="alumni-role">${a.role}</div>
    <div class="alumni-batch">${a.batch}</div>
    <div class="alumni-actions">
      <button class="btn-connect" onclick="showToast('Connection request sent to ${a.name.split(' ')[0]}!')">Connect</button>
      <button class="btn-message" onclick="showToast('Opening message thread...')">Message</button>
    </div>
  </div>`).join('')}
</div>`;}

// ===== CAREER =====
function renderCareer(){return `
<div class="page-title-bar"><div><div class="page-title">Career Opportunities</div><div class="page-subtitle">Discover jobs, mentors, and professional workshops</div></div></div>
<div class="baybayin-accent"></div>
<div class="tabs-nav">
  <button class="tab-btn active">Job Board</button>
  <button class="tab-btn">Mentorship</button>
  <button class="tab-btn">Workshops</button>
</div>
<div class="donation-search" style="margin-bottom:1.5rem"><div class="search-bar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="text" placeholder="Search by title, company, or location..."/></div></div>
<div class="section-title">Recommended Jobs</div>
<div class="job-cards">
  <div class="job-card">
    <div class="job-logo" style="color:#4285F4">G</div>
    <div class="job-info"><div class="job-title">Senior Product Designer</div><div class="job-company">Google · Mountain View, CA</div><div class="job-tags"><span class="job-tag salary">$140k – $180k</span><span class="job-tag">Full-time</span><span class="job-tag">Remote</span></div></div>
    <button class="btn-apply" onclick="showToast('Application submitted to Google!')">Apply Now</button>
  </div>
  <div class="job-card">
    <div class="job-logo" style="color:#1DB954">S</div>
    <div class="job-info"><div class="job-title">UX Researcher</div><div class="job-company">Spotify · New York, NY</div><div class="job-tags"><span class="job-tag salary">$110k – $145k</span><span class="job-tag">Contract</span></div></div>
    <button class="btn-apply" onclick="showToast('Application submitted to Spotify!')">Apply Now</button>
  </div>
</div>`;}

// ===== DOCUMENTS =====
function renderDocuments(){return `
<div class="page-title-bar"><div><div class="page-title">Academic Records</div><div class="page-subtitle">Manage your credentials and official documents</div></div></div>
<div class="baybayin-accent"></div>
<div class="passport-card">
  <div class="passport-inner">
    <div class="passport-header"><div><div class="passport-institution">Ateneo de Davao University</div><div class="passport-label">Digital Academic Passport</div></div><div class="verified-badge" style="margin-left:auto">✔ Verified</div></div>
    <div class="passport-label">Degree Conferred</div>
    <div class="passport-degree">Bachelor of Science<br/>in Information Technology</div>
    <div class="passport-honors"><span class="honor-chip">Magna Cum Laude</span><span class="honor-chip">Class of 2024</span></div>
    <div class="passport-details">
      <div class="passport-detail"><div class="label">Student ID</div><div class="value">2020-10485</div></div>
      <div class="passport-detail"><div class="label">GPA</div><div class="value">3.85</div></div>
      <div class="passport-detail"><div class="label">Passport ID</div><div class="value" style="font-size:14px">ADDU-2020-8921</div></div>
      <div class="passport-qr">
        <div class="qr-placeholder">
          <svg viewBox="0 0 64 64" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="2" fill="#0D1B4B"/><rect x="8" y="8" width="16" height="16" rx="1" fill="white"/><rect x="11" y="11" width="10" height="10" rx="1" fill="#0D1B4B"/>
            <rect x="36" y="4" width="24" height="24" rx="2" fill="#0D1B4B"/><rect x="40" y="8" width="16" height="16" rx="1" fill="white"/><rect x="43" y="11" width="10" height="10" rx="1" fill="#0D1B4B"/>
            <rect x="4" y="36" width="24" height="24" rx="2" fill="#0D1B4B"/><rect x="8" y="40" width="16" height="16" rx="1" fill="white"/><rect x="11" y="43" width="10" height="10" rx="1" fill="#0D1B4B"/>
            <rect x="36" y="36" width="6" height="6" fill="#0D1B4B"/><rect x="44" y="36" width="6" height="6" fill="#0D1B4B"/><rect x="52" y="36" width="6" height="6" fill="#0D1B4B"/>
            <rect x="36" y="44" width="6" height="6" fill="#0D1B4B"/><rect x="52" y="44" width="6" height="6" fill="#0D1B4B"/>
            <rect x="36" y="52" width="6" height="6" fill="#0D1B4B"/><rect x="44" y="52" width="16" height="6" fill="#0D1B4B"/>
          </svg>
        </div>
        <button class="passport-share-btn" onclick="showToast('Verification link copied!')">Share Link</button>
      </div>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-title" style="margin-bottom:1rem">Document Services</div>
  <div class="doc-services">
    <div class="doc-service-item"><div class="doc-service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="doc-service-info"><h4>Official Transcript</h4><p>Sealed & Certified Copy</p></div><button class="btn-request" onclick="showToast('Transcript request submitted!')">Request</button></div>
    <div class="doc-service-item"><div class="doc-service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div class="doc-service-info"><h4>e-Diploma</h4><p>Digital Certificate</p></div><button class="btn-request" onclick="showToast('e-Diploma download started!')">Download</button></div>
    <div class="doc-service-item"><div class="doc-service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div><div class="doc-service-info"><h4>Degree Verification</h4><p>For HR & Employers</p></div><button class="btn-request" onclick="showToast('Verification link sent!')">Request</button></div>
  </div>
</div>`;}

// ===== PROFILE =====
function renderProfile(){return `
<div class="page-title-bar"><div><div class="page-title">My Profile</div><div class="page-subtitle">Manage your alumni identity and privacy settings</div></div></div>
<div class="profile-header-card">
  <div class="profile-pic">AJ<div class="profile-verified-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div></div>
  <div class="profile-info">
    <div class="profile-name">Alex Johnson</div>
    <div class="profile-role">BS Information Technology</div>
    <div class="profile-sync"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Synced with Registrar</div>
  </div>
  <button class="btn-request" onclick="showToast('Profile settings opened!')">Edit Profile</button>
</div>
<div class="dashboard-grid">
  <div class="card">
    <div class="card-title" style="margin-bottom:1rem">Academic Passport</div>
    <div style="background:linear-gradient(135deg,var(--addu-navy),#1A3070);border-radius:var(--radius);padding:1.5rem;color:white">
      <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:4px">Official Document · Ateneo de Davao University</div>
      <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;margin-bottom:8px">Bachelor of Science<br/>in Information Technology</div>
      <div style="font-size:12px;opacity:0.7;margin-bottom:12px">Magna Cum Laude</div>
      <div style="display:flex;gap:2rem;padding-top:12px;border-top:1px solid rgba(255,255,255,0.15)">
        <div><div style="font-size:10px;opacity:0.6">Class of</div><div style="font-weight:700">2018</div></div>
        <div><div style="font-size:10px;opacity:0.6">Passport ID</div><div style="font-weight:700;font-size:13px">ADDU-2018-8921</div></div>
      </div>
    </div>
    <button class="btn-request" style="width:100%;margin-top:12px" onclick="showToast('Verification link copied!')">Share Verification Link</button>
  </div>
  <div class="card">
    <div class="card-header" style="margin-bottom:1rem;border-bottom:1px solid var(--gray-100);padding-bottom:1rem">
      <div class="card-title">Additional Credentials</div>
      <select style="padding:6px 12px;border-radius:8px;border:1.5px solid var(--addu-blue);font-size:12px;outline:none;background:var(--addu-sky);color:var(--addu-blue);font-weight:600;cursor:pointer">
        <option>Employers Only</option><option>Public / All Alumni</option><option>Staff Verification Only</option>
      </select>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--gray-200);border-radius:8px">
        <div><div style="font-weight:700;font-size:14px;color:var(--addu-navy)">Advanced Data Analytics</div><div style="font-size:12px;color:var(--gray-600)">Google Career Certs</div></div>
        <span style="background:rgba(16,163,100,0.1);color:#10A364;font-size:10px;font-weight:700;padding:4px 8px;border-radius:4px">VERIFIED</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px dashed var(--gray-200);border-radius:8px">
        <div><div style="font-weight:700;font-size:14px;color:var(--gray-600)">Project Management Prof.</div><div style="font-size:12px;color:var(--gray-400)">PMI</div></div>
        <span style="background:var(--gray-100);color:var(--gray-600);font-size:10px;font-weight:700;padding:4px 8px;border-radius:4px">PENDING</span>
      </div>
    </div>
    <button class="btn-outline" style="margin-top:1rem;width:100%;border-style:dashed" onclick="showToast('Badge upload dialog opened.')">+ Add External Badge</button>
    <p style="font-size:11px;color:var(--gray-400);text-align:center;margin-top:12px">These credentials are verified by ADDU Staff.</p>
  </div>
</div>`;}

// ===== TRANSACTIONS =====
function renderTransactions(){
  const txns=[
    {icon:'clock',color:'rgba(43,87,200,0.1)',icolor:'var(--addu-blue)',title:'Science Lab Fund',sub:'Recurring Pledge',status:'completed',date:'Oct 15, 2024',amount:'-₱500.00'},
    {icon:'heart',color:'rgba(224,29,72,0.1)',icolor:'var(--addu-red)',title:'Typhoon Relief Operation',sub:'One-time Donation',status:'completed',date:'Sep 02, 2024',amount:'-₱1,500.00'},
    {icon:'file',color:'rgba(200,151,26,0.1)',icolor:'var(--addu-gold)',title:"Class of '24 Scholarship Fund",sub:'One-time Donation',status:'processing',date:'Today',amount:'-₱500.00'},
    {icon:'shield',color:'rgba(16,163,100,0.1)',icolor:'#10A364',title:'Robotics Club Trip',sub:'Student Project',status:'completed',date:'Aug 10, 2024',amount:'-₱375.00'},
    {icon:'users',color:'rgba(147,51,234,0.1)',icolor:'#9333EA',title:'Alumni Networking Gala',sub:'Event Purchase',status:'completed',date:'Jul 05, 2024',amount:'-₱120.00'}
  ];
  const icons={
    clock:`<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`,
    heart:`<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`,
    file:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`,
    shield:`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    users:`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>`
  };
  return `
<div class="page-title-bar"><div><div class="page-title">Transaction History</div><div class="page-subtitle">A transparent record of all your contributions</div></div></div>
<div class="baybayin-accent"></div>
<div class="admin-stats" style="grid-template-columns:repeat(3,1fr)">
  <div class="stat-card"><div class="stat-label">Total Contributed</div><div class="stat-value">₱2,500</div><div class="stat-growth">▲ Since joining</div></div>
  <div class="stat-card"><div class="stat-label">Projects Funded</div><div class="stat-value">15</div><div class="stat-growth">▲ Lives touched: 1,240+</div></div>
  <div class="stat-card"><div class="stat-label">Recurring Pledges</div><div class="stat-value">2</div><div class="stat-growth" style="color:var(--gray-600);background:var(--gray-100)">Active automated cycles</div></div>
</div>
<div class="card">
  <div class="card-header" style="border-bottom:1px solid var(--gray-100);padding-bottom:1rem">
    <div class="card-title">All Transactions</div>
    <button class="btn-ghost" style="border-color:var(--gray-200);color:var(--gray-600)" onclick="showToast('Downloading PDF...')">Download Receipt PDF ↓</button>
  </div>
  <div>${txns.map(t=>`
    <div class="transaction-item">
      <div class="txn-icon" style="background:${t.color};color:${t.icolor}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">${icons[t.icon]}</svg></div>
      <div class="txn-info">
        <div class="txn-title">${t.title}</div>
        <div class="txn-sub">${t.sub} • <span class="${t.status==='completed'?'txn-status-completed':'txn-status-processing'}">${t.status.toUpperCase()}</span> ${t.date}</div>
      </div>
      <div class="txn-amount negative">${t.amount}</div>
    </div>`).join('')}
  </div>
</div>`;}

// ===== ADMIN PAGES =====
function showAdminPage(page){
  state.adminPage=page;
  setAdminSidebarActive(page.replace('admin-',''));
  const ac=document.getElementById('adminContent');
  ac.innerHTML='';
  ac.className='main-content page-anim';
  if(page==='admin-home') ac.innerHTML=renderAdminHome();
  else if(page==='admin-queue'){state.adminQueueView='list';ac.innerHTML=renderAdminQueue();}
  else if(page==='admin-insights') ac.innerHTML=renderAdminInsights();
  else if(page==='admin-profile') ac.innerHTML=renderAdminProfile();
}

function renderAdminHome(){return `
<div class="hero-card"><div class="hero-card-inner">
  <div class="hero-welcome">Welcome back,</div><div class="hero-name">Hello, Admin!</div>
  <p style="color:rgba(255,255,255,0.8);font-size:15px;margin-top:8px;max-width:500px;line-height:1.5">You have <strong style="color:white">12 pending reviews</strong> today. Please check the moderation queue to ensure campaigns are verified promptly.</p>
</div></div>
<div class="admin-stats">
  <div class="stat-card" style="border-left:4px solid var(--addu-red)"><div class="stat-label">Pending Reviews</div><div class="stat-value">12</div><div class="stat-growth" style="color:var(--addu-red);background:rgba(224,29,72,0.1)">▲ 4 new today</div></div>
  <div class="stat-card"><div class="stat-label">Tasks Remaining</div><div class="stat-value">8</div><div class="stat-growth" style="color:var(--gray-600);background:var(--gray-100)">Verifications in Queue</div></div>
  <div class="stat-card"><div class="stat-label">Total Funds Managed</div><div class="stat-value">₱124k</div><div class="stat-growth">▲ +12% this month</div></div>
  <div class="stat-card"><div class="stat-label">New Donors</div><div class="stat-value">342</div><div class="stat-growth">▲ +5% this month</div></div>
</div>
<div class="dashboard-grid">
  <div class="card">
    <div class="card-header"><div class="card-title">Recent Activity Feed</div><button class="view-all">View All</button></div>
    <div class="queue-list">
      <div class="queue-item" style="box-shadow:none;border-bottom:1px solid var(--gray-100);border-radius:0;padding:1rem 0">
        <div class="queue-icon donation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
        <div class="queue-info"><div class="queue-title">New Donation Received</div><div class="queue-subtitle">Maria C. donated ₱500 to "Scholars Fund"</div><div class="queue-meta">Today, 9:42 AM</div></div>
      </div>
      <div class="queue-item" style="box-shadow:none;border-bottom:1px solid var(--gray-100);border-radius:0;padding:1rem 0">
        <div class="queue-icon network"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/></svg></div>
        <div class="queue-info"><div class="queue-title">Job Posting Approval</div><div class="queue-subtitle">Pending review for "Senior Dev" at TechCorp</div><div class="queue-meta">Yesterday, 4:00 PM</div></div>
      </div>
      <div class="queue-item" style="box-shadow:none;border-radius:0;padding:1rem 0">
        <div class="queue-icon registration"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg></div>
        <div class="queue-info"><div class="queue-title">New Alumni Registration</div><div class="queue-subtitle">Batch 2024 graduate registered via portal</div><div class="queue-meta">Sep 28, 2023</div></div>
      </div>
    </div>
  </div>
  <div class="card" style="background:var(--addu-sky);border:none">
    <div class="card-title">Quick Actions</div>
    <p style="font-size:13px;color:var(--gray-600);margin-bottom:1rem">Jump straight to your most pressing tasks.</p>
    <button class="btn-primary" style="width:100%;margin-bottom:12px;padding:12px;display:flex;justify-content:space-between" onclick="showAdminPage('admin-queue')">Review Queue <span>→</span></button>
    <button class="btn-primary" style="width:100%;background:white;color:var(--addu-navy);padding:12px;display:flex;justify-content:space-between" onclick="showAdminPage('admin-insights')">View Insights <span>→</span></button>
  </div>
</div>`;}

function renderAdminQueue(){
  if(state.adminQueueView==='review') return renderAdminReview();
  const items=[
    {cls:'donation',title:'New Campaign: Annual Charity Gala',sub:"By Sarah Jenkins, Class of '98",meta:'Submitted 2 hours ago',amount:'₱25,000',icon0:true},
    {cls:'donation',title:"Scholarship Fund: Class of '08",sub:'By Mark Davis',meta:'Submitted 5 hours ago',amount:'₱10,000',icon0:false},
    {cls:'network',title:'Project: Sports Complex Revamp',sub:'By Athletics Dept.',meta:'Submitted 1 day ago',amount:'₱500k'},
    {cls:'registration',title:'Alumni Business Verification',sub:'By Juan Dela Cruz',meta:'Submitted 2 days ago',amount:'-'}
  ];
  const icons={
    donation0:`<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`,
    donation1:`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    network:`<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>`,
    registration:`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>`
  };
  return `
<div class="page-title-bar"><div><div class="page-title">Moderation Queue</div><div class="page-subtitle">Review and verify pending submissions</div></div></div>
<div class="baybayin-accent"></div>
<div class="tabs-nav"><button class="tab-btn active">All Pending</button><button class="tab-btn">Donations</button><button class="tab-btn">Network</button></div>
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
  <div style="font-size:12px;font-weight:700;color:var(--gray-600);letter-spacing:0.05em">PENDING ITEMS (4)</div>
  <button class="btn-ghost" style="color:var(--gray-600);border-color:var(--gray-200);font-size:12px;padding:6px 12px">Sort by Date ↓</button>
</div>
<div class="queue-list">${items.map((item,i)=>{
    let iconKey=item.cls==='donation'?(item.icon0===undefined?i===0:item.icon0)?'donation0':'donation1':item.cls;
    return`<div class="queue-item">
      <div class="queue-icon ${item.cls}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">${icons[iconKey]||icons[item.cls]}</svg></div>
      <div class="queue-info"><div class="queue-title">${item.title}</div><div class="queue-subtitle">${item.sub}</div><div class="queue-meta">${item.meta}</div></div>
      <div class="queue-amount">${item.amount}</div>
      <button class="btn-review" onclick="openAdminReview()">Review →</button>
    </div>`;}).join('')}
</div>`;}

function openAdminReview(){state.adminQueueView='review';document.getElementById('adminContent').innerHTML=renderAdminReview();}

function renderAdminReview(){return `
<div style="animation:fadeIn 0.4s ease">
  <button class="btn-back" onclick="state.adminQueueView='list';showAdminPage('admin-queue')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back to Queue</button>
  <div class="page-title-bar" style="margin-bottom:1.5rem">
    <div><div class="page-title">Reviewing Charity Campaign</div><div class="page-subtitle">Verify the details below before publishing to the Alumni Network.</div></div>
    <div class="verified-badge" style="background:rgba(245,158,11,0.1);color:#D97706;font-size:12px;padding:6px 12px">PENDING VERIFICATION</div>
  </div>
  <div class="review-applicant-card">
    <div class="review-applicant-avatar">SJ</div>
    <div class="queue-info">
      <div style="display:flex;align-items:center;gap:8px">
        <h3 style="font-family:'Playfair Display',serif;font-size:20px;color:var(--addu-navy)">Sarah Jenkins</h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10A364" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div style="font-size:14px;color:var(--gray-600);margin-top:2px">Class of 1998 · Marketing</div>
    </div>
    <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;background:var(--gray-100);padding:6px 12px;border-radius:20px">ALUMNI</div>
  </div>
  <div class="review-section-box">
    <div class="review-section-header"><div class="review-section-title"><div class="step-num">1</div> Purpose & Details</div></div>
    <div class="review-data-grid">
      <div class="review-data-group"><label>Campaign Title</label><p>Annual Charity Gala 2024</p></div>
      <div class="review-data-group"><label>Selected Category</label><p>Community Initiatives</p></div>
      <div class="review-data-group" style="grid-column:1/-1"><label>Description</label><p style="font-size:14px;line-height:1.6;font-weight:400;color:var(--gray-800);background:var(--gray-50);padding:1rem;border-radius:8px;border:1px solid var(--gray-200)">This gala aims to raise funds for local scholarships and community outreach programs. We are targeting over 500 attendees from the alumni network to reconnect and give back to our beloved institution.</p></div>
    </div>
  </div>
  <div class="review-section-box">
    <div class="review-section-header"><div class="review-section-title"><div class="step-num">2</div> Set Your Goal</div></div>
    <div class="review-data-grid">
      <div class="review-data-group"><label>Target Amount</label><p style="font-size:24px;font-family:'Playfair Display',serif">₱ 25,000.00</p></div>
      <div class="review-data-group"><label>Campaign Deadline</label><p>December 31, 2024</p></div>
    </div>
  </div>
  <div class="review-section-box">
    <div class="review-section-header"><div class="review-section-title"><div class="step-num">3</div> Verification Documents</div></div>
    <div class="review-doc-item">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:36px;height:36px;background:var(--white);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--addu-red)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
        <div><div style="font-size:14px;font-weight:600;color:var(--text-dark)">Organization_Permit.pdf</div><div style="font-size:11px;color:var(--gray-400)">PDF · 2.4 MB</div></div>
      </div>
      <button class="btn-ghost" style="color:var(--addu-blue);border-color:var(--addu-blue)">View Document</button>
    </div>
  </div>
  <div class="review-actions-bar">
    <button class="btn-deny" onclick="showToast('Feedback requested from applicant.');state.adminQueueView='list';showAdminPage('admin-queue')">Deny with Feedback</button>
    <button class="btn-approve" onclick="showToast('Campaign Approved & Published successfully!');state.adminQueueView='list';showAdminPage('admin-queue')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>Approve & Publish</button>
  </div>
</div>`;}

function renderAdminInsights(){return `
<div class="page-title-bar">
  <div><div class="page-title">Donation Insights</div><div class="page-subtitle">Analytics and performance metrics</div></div>
  <select style="padding:10px 16px;border-radius:8px;border:1.5px solid var(--gray-200);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:var(--addu-navy);outline:none;background:white;cursor:pointer"><option>Last 30 Days</option><option>This Month</option><option>This Quarter</option><option>This Year</option></select>
</div>
<div class="baybayin-accent"></div>
<div class="admin-stats">
  <div class="stat-card"><div class="stat-label">Total Funds</div><div class="stat-value">₱124.5k</div><div class="stat-growth">▲ +12% vs last month</div></div>
  <div class="stat-card"><div class="stat-label">New Donors</div><div class="stat-value">342</div><div class="stat-growth">▲ +5% vs last month</div></div>
  <div class="stat-card"><div class="stat-label">Campaigns Active</div><div class="stat-value">18</div><div class="stat-growth" style="color:var(--gray-600);background:var(--gray-100)">3 pending verification</div></div>
  <div class="stat-card"><div class="stat-label">Avg. Donation</div><div class="stat-value">₱364</div><div class="stat-growth">▲ +8% vs last month</div></div>
</div>
<div class="chart-container">
  <div class="card-header" style="margin-bottom:0"><div class="card-title">Donation Trends</div><div style="font-size:12px;font-weight:600;color:var(--gray-400);letter-spacing:0.05em">₱ in Thousands</div></div>
  <div class="chart-svg-wrapper">
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible;margin-top:10px">
      <defs><linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(26,58,143,0.2)"/><stop offset="100%" stop-color="rgba(26,58,143,0)"/></linearGradient></defs>
      <line x1="0" y1="50" x2="800" y2="50" stroke="#F1F3F5" stroke-width="1" stroke-dasharray="4 4"/>
      <line x1="0" y1="100" x2="800" y2="100" stroke="#F1F3F5" stroke-width="1" stroke-dasharray="4 4"/>
      <line x1="0" y1="150" x2="800" y2="150" stroke="#F1F3F5" stroke-width="1" stroke-dasharray="4 4"/>
      <path d="M0,160 C100,150 150,80 250,100 C350,120 450,40 550,60 C650,80 750,20 800,30 L800,200 L0,200 Z" fill="url(#trendGrad)"/>
      <path d="M0,160 C100,150 150,80 250,100 C350,120 450,40 550,60 C650,80 750,20 800,30" fill="none" stroke="var(--addu-blue)" stroke-width="4" stroke-linecap="round"/>
      <g transform="translate(450,40)"><circle cx="0" cy="0" r="14" fill="rgba(26,58,143,0.2)"/><circle cx="0" cy="0" r="6" fill="var(--addu-navy)" stroke="white" stroke-width="2"/><rect x="-40" y="-35" width="80" height="24" rx="4" fill="var(--addu-navy)"/><text x="0" y="-19" fill="white" font-size="12" font-weight="700" text-anchor="middle" font-family="DM Sans">₱42.5k</text></g>
    </svg>
  </div>
  <div class="chart-x-labels"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div>
</div>
<div class="chart-container">
  <div class="card-header" style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--gray-100)">
    <div class="card-title">Category Breakdown</div>
    <select style="padding:8px 12px;border-radius:6px;border:1px solid var(--gray-200);font-size:13px;outline:none;background:var(--gray-50);cursor:pointer"><option>This Month</option><option>This Quarter</option><option>This Year</option></select>
  </div>
  <div class="donut-section">
    <div class="donut-wrap">
      <svg viewBox="0 0 180 180" style="filter:drop-shadow(0 4px 12px rgba(13,27,75,0.08))">
        <circle cx="90" cy="90" r="70" fill="none" stroke="#F1F3F5" stroke-width="24"/>
        <circle cx="90" cy="90" r="70" fill="none" stroke="#1A3A8F" stroke-width="24" stroke-dasharray="153.9 285.9" stroke-dashoffset="0" stroke-linecap="round"/>
        <circle cx="90" cy="90" r="70" fill="none" stroke="#2B57C8" stroke-width="24" stroke-dasharray="109.9 329.9" stroke-dashoffset="-153.9" stroke-linecap="round"/>
        <circle cx="90" cy="90" r="70" fill="none" stroke="#C8971A" stroke-width="24" stroke-dasharray="87.9 351.9" stroke-dashoffset="-263.8" stroke-linecap="round"/>
        <circle cx="90" cy="90" r="70" fill="none" stroke="#E01D48" stroke-width="24" stroke-dasharray="87.9 351.9" stroke-dashoffset="-351.7" stroke-linecap="round"/>
      </svg>
      <div class="donut-center"><div class="total-label">Total Impact</div><div class="total-value">100%</div></div>
    </div>
    <div class="legend-items">
      <div class="legend-item"><div class="legend-dot" style="background:#1A3A8F"></div><div class="legend-name">Student Projects</div><div class="legend-pct">35%</div></div>
      <div class="legend-item"><div class="legend-dot" style="background:#2B57C8"></div><div class="legend-name">Alumni Business</div><div class="legend-pct">25%</div></div>
      <div class="legend-item"><div class="legend-dot" style="background:#C8971A"></div><div class="legend-name">Community</div><div class="legend-pct">20%</div></div>
      <div class="legend-item"><div class="legend-dot" style="background:#E01D48"></div><div class="legend-name">Emergency Funds</div><div class="legend-pct">20%</div></div>
    </div>
  </div>
</div>`;}

function renderAdminProfile(){return `
<div class="page-title-bar"><div><div class="page-title">Staff Profile</div><div class="page-subtitle">Manage your administrative identity and privacy settings</div></div></div>
<div class="profile-header-card">
  <div class="profile-pic" style="background:linear-gradient(135deg,var(--addu-gold),#E6A817)">JT<div class="profile-verified-badge" style="border-color:white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div></div>
  <div class="profile-info">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:4px">
      <div class="profile-name">Joo Dan Te</div>
      <span class="verified-badge" style="background:rgba(200,151,26,0.15);color:var(--addu-gold);margin-top:0">★ University Staff</span>
    </div>
    <div class="profile-role">Alumni Coordinator</div>
    <div class="profile-sync"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Synced with Registrar Records</div>
  </div>
  <button class="btn-request" onclick="showToast('Profile settings opened!')">Edit Profile</button>
</div>
<div class="dashboard-grid">
  <div class="card">
    <div class="card-title" style="margin-bottom:1rem">Academic Passport</div>
    <div style="background:linear-gradient(135deg,#C8971A 0%,#E6A817 100%);border-radius:var(--radius);padding:1.5rem;color:white;position:relative;overflow:hidden">
      <div style="position:absolute;right:-20px;bottom:-20px;opacity:0.1;font-family:'Playfair Display',serif;font-size:120px;font-weight:900">AdDU</div>
      <div style="font-size:10px;opacity:0.9;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:4px;color:var(--addu-navy);font-weight:700">Official Document · Ateneo de Davao University</div>
      <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;margin-bottom:8px;color:var(--addu-navy);line-height:1.2">Bachelor of Science<br/>in Social Work</div>
      <div style="font-size:12px;color:var(--addu-navy);font-weight:600;opacity:0.9;margin-bottom:16px">Magna Cum Laude</div>
      <div style="display:flex;gap:2rem;padding-top:12px;border-top:1px solid rgba(13,27,75,0.15)">
        <div><div style="font-size:10px;opacity:0.8;color:var(--addu-navy);font-weight:600;text-transform:uppercase">Class of</div><div style="font-weight:700;color:var(--addu-navy);font-size:14px">2018</div></div>
        <div><div style="font-size:10px;opacity:0.8;color:var(--addu-navy);font-weight:600;text-transform:uppercase">Passport ID</div><div style="font-weight:700;font-size:14px;color:var(--addu-navy)">ADDU-2018-0021</div></div>
      </div>
    </div>
    <button class="btn-request" style="width:100%;margin-top:12px;border-color:var(--addu-gold);color:var(--addu-gold)" onclick="showToast('Verification link copied!')">Share Verification Link</button>
  </div>
  <div class="card">
    <div class="card-header" style="margin-bottom:1rem;border-bottom:1px solid var(--gray-100);padding-bottom:1rem">
      <div class="card-title">Additional Credentials</div>
      <select style="padding:6px 12px;border-radius:8px;border:1.5px solid var(--gray-200);font-size:12px;outline:none;background:white;color:var(--gray-600);font-weight:600;cursor:pointer"><option>Employers Only</option><option>Public / All Alumni</option><option>Staff Verification Only</option></select>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--gray-200);border-radius:8px"><div><div style="font-weight:700;font-size:14px;color:var(--addu-navy)">Advanced Data Analytics</div><div style="font-size:12px;color:var(--gray-600)">Google Career Certs</div></div><span style="background:rgba(16,163,100,0.1);color:#10A364;font-size:10px;font-weight:700;padding:4px 8px;border-radius:4px">VERIFIED</span></div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px dashed var(--gray-200);border-radius:8px"><div><div style="font-weight:700;font-size:14px;color:var(--gray-600)">Project Management Prof.</div><div style="font-size:12px;color:var(--gray-400)">PMI</div></div><span style="background:var(--gray-100);color:var(--gray-600);font-size:10px;font-weight:700;padding:4px 8px;border-radius:4px">PENDING</span></div>
    </div>
    <button class="btn-outline" style="margin-top:1rem;width:100%;border-style:dashed" onclick="showToast('Badge upload dialog opened.')">+ Add External Badge</button>
    <p style="font-size:11px;color:var(--gray-400);text-align:center;margin-top:12px">These credentials are verified by ADDU Staff.</p>
  </div>
</div>`;}

// ===== MODAL =====
function openModal(){document.getElementById('campaignModal').classList.add('open');}
function closeModal(){document.getElementById('campaignModal').classList.remove('open');}
function submitCampaign(){closeModal();showToast('Campaign submitted for verification!');}
function selectModalCat(btn,cat){
  document.querySelectorAll('#modalCatSelect .cat-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
}
document.getElementById('campaignModal').addEventListener('click',function(e){if(e.target===this)closeModal();});

// ===== PWA SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[AdDU Nation] SW registered:', reg.scope))
      .catch(err => console.error('[AdDU Nation] SW failed:', err));
  });
}