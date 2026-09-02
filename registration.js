const form = document.getElementById('registrationForm');
const statusBox = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
const paymentsBox = document.getElementById('payments');
const selectionBox = document.getElementById('selectionBox');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const applicationBox = document.getElementById('applicationBox');
let applicationData = null;

function normalizeDigits(value) {
  const bn = '০১২৩৪৫৬৭৮৯';
  return String(value || '').replace(/[০-৯]/g, d => String(bn.indexOf(d)));
}
function validBangladeshPhone(value) {
  return /^01[3-9]\d{8}$/.test(normalizeDigits(value).replace(/\D/g, ''));
}
function bn(n){ return Number(n).toLocaleString('bn-BD'); }
function esc(v){ return String(v ?? '').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[m])); }
function params(){ return new URLSearchParams(location.search); }
function findEvent(id){ return SITE_CONFIG.competitions.find(x=>x.id===id); }

const type = params().get('type') || 'competition';
const preselected = params().get('event');
let selectedIds = [];

function setupPage(){
  if(type === 'mind-marathon'){
    pageTitle.textContent = 'মাইন্ড ম্যারাথন';
    pageSubtitle.innerHTML = `আলাদা রেজিস্ট্রেশন | ফি: <strong>৳${bn(SITE_CONFIG.mindMarathonFee)}</strong>`;
    selectionBox.innerHTML = `<strong>🧠 মাইন্ড ম্যারাথন</strong><p>এই রেজিস্ট্রেশনটি ৫ম–৭ম শ্রেণির শিক্ষার্থীদের জন্য আলাদাভাবে সংরক্ষণ করা হবে।</p>`;
    selectedIds = ['mind-marathon'];
    renderPayments();
    return;
  }
  if(type === 'anniversary-general'){
    pageTitle.textContent = `${SITE_CONFIG.anniversaryNumber} তম প্রতিষ্ঠাবার্ষিকী অনুষ্ঠান রেজিস্ট্রেশন`;
    pageSubtitle.innerHTML = `বিশেষ অনুষ্ঠান রেজিস্ট্রেশন | ফি: <strong>৳${bn(SITE_CONFIG.anniversaryGeneralFee)}</strong>`;
    selectionBox.innerHTML = `<strong>🎉 ${SITE_CONFIG.anniversaryTitle} অনুষ্ঠান</strong><p>ব্যক্তিগত তথ্য ও একটি পেমেন্ট তথ্য দিয়ে বিশেষ রেজিস্ট্রেশন সম্পন্ন করুন।</p>`;
    selectedIds = ['anniversary-general'];
    renderPayments();
    return;
  }
  pageTitle.textContent = `${SITE_CONFIG.anniversaryNumber} তম প্রতিষ্ঠাবার্ষিকীর প্রতিযোগিতা সমূহ`;
  pageSubtitle.innerHTML = `এক বা একাধিক প্রতিযোগিতা নির্বাচন করুন — প্রতি প্রতিযোগিতা <strong>৳${bn(SITE_CONFIG.competitionFee)}</strong>`;
  selectedIds = preselected ? [preselected] : [];
  renderCompetitionChooser();
  renderPayments();
}

function renderCompetitionChooser(){
  selectionBox.innerHTML = `<strong>☑️ প্রতিযোগিতা নির্বাচন করুন</strong><div class="selected-list" id="selectedList"></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-top:15px">${SITE_CONFIG.competitions.map(e=>`<label style="display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #dce9df;padding:12px;border-radius:12px;cursor:pointer"><input class="event-check" type="checkbox" value="${esc(e.id)}" ${selectedIds.includes(e.id)?'checked':''}> <span>${e.icon} ${esc(e.title)} <small>(৳${bn(SITE_CONFIG.competitionFee)})</small></span></label>`).join('')}</div>`;
  document.querySelectorAll('.event-check').forEach(ch=>ch.addEventListener('change',()=>{
    selectedIds=[...document.querySelectorAll('.event-check:checked')].map(x=>x.value);
    updateSelectedList(); renderPayments();
  }));
  updateSelectedList();
}
function updateSelectedList(){
  const box=document.getElementById('selectedList'); if(!box)return;
  box.innerHTML=selectedIds.length?selectedIds.map(id=>{const e=findEvent(id);return `<span class="selected-pill">${e?.icon||''} ${esc(e?.title||id)}</span>`}).join(''):'<span style="color:#c62828">এখনও কোনো প্রতিযোগিতা নির্বাচন করা হয়নি।</span>';
}
function getItems(){
  if(type==='mind-marathon') return [{id:'mind-marathon',title:'মাইন্ড ম্যারাথন',fee:SITE_CONFIG.mindMarathonFee}];
  if(type==='anniversary-general') return [{id:'anniversary-general',title:`${SITE_CONFIG.anniversaryNumber} তম প্রতিষ্ঠাবার্ষিকী অনুষ্ঠান`,fee:SITE_CONFIG.anniversaryGeneralFee}];
  return selectedIds.map(id=>{const e=findEvent(id);return {id,title:e?.title||id,fee:SITE_CONFIG.competitionFee};});
}
function renderPayments(){
  const items=getItems();
  paymentsBox.innerHTML = `<div class="payment-reminder"><strong>পেমেন্ট আগে করুন:</strong> বিকাশ ${bn(SITE_CONFIG.payment.bkash)} অথবা নগদ ${bn(SITE_CONFIG.payment.nagad)} নম্বরে প্রতিটি নির্বাচিত আইটেমের নির্ধারিত টাকা Send Money করুন।</div>${items.length?items.map((item,i)=>`<div class="payment-item"><h3>${item.id==='anniversary-general'?'🎉':item.id==='mind-marathon'?'🧠':'💳'} ${esc(item.title)} — ৳${bn(item.fee)}</h3><div class="payment-row"><label>পেমেন্ট মাধ্যম *<select name="paymentMethod_${i}" required><option value="">নির্বাচন করুন</option><option value="bKash">বিকাশ</option><option value="Nagad">নগদ</option></select></label><label>Transaction ID *<input type="text" name="transactionId_${i}" required maxlength="100" placeholder="Transaction ID"></label></div></div>`).join(''):'<p style="color:#c62828">কমপক্ষে একটি প্রতিযোগিতা নির্বাচন করুন।</p>'}`;
}

form.addEventListener('submit', async (event)=>{
  event.preventDefault(); statusBox.textContent=''; statusBox.style.color='';
  if(!form.checkValidity()){form.reportValidity();return;}
  if(type==='competition' && !selectedIds.length){statusBox.textContent='কমপক্ষে একটি প্রতিযোগিতা নির্বাচন করুন।';statusBox.style.color='#c62828';return;}
  const phone=form.elements.phone.value;
  if(!validBangladeshPhone(phone)){statusBox.textContent='অনুগ্রহ করে সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।';statusBox.style.color='#c62828';form.elements.phone.focus();return;}
  const items=getItems();
  const payments=items.map((item,i)=>({eventId:item.id,eventName:item.title,amount:item.fee,paymentMethod:form.elements[`paymentMethod_${i}`].value,transactionId:form.elements[`transactionId_${i}`].value.trim()}));
  if(payments.some(p=>p.transactionId.length<5)){statusBox.textContent='প্রতিটি Transaction ID সঠিকভাবে লিখুন।';statusBox.style.color='#c62828';return;}
  const totalAmount=payments.reduce((s,p)=>s+p.amount,0);
  if(!confirm(`সব তথ্য সঠিক আছে কি?\n\nমোট রেজিস্ট্রেশন ফি: ৳${bn(totalAmount)}`)) return;
  const payload={
    registrationType:type, participantName:form.elements.participantName.value.trim(), guardianName:form.elements.guardianName.value.trim(), institution:form.elements.institution.value.trim(), class:form.elements.class.value,
    phone:normalizeDigits(phone).replace(/\D/g,''), email:form.elements.email.value.trim(), address:form.elements.address.value.trim(), district:form.elements.district.value.trim(),
    selectedCompetitions:payments.map(p=>p.eventName), competitionIds:payments.map(p=>p.eventId), payments, totalAmount, note:form.elements.note.value.trim(), status:'Pending', createdAt:firebase.firestore.FieldValue.serverTimestamp()
  };
  submitBtn.disabled=true; submitBtn.textContent='জমা দেওয়া হচ্ছে...';
  try{
    const ref=await db.collection('registrations').add(payload);
    applicationData={...payload,id:ref.id,createdAt:new Date()};
    form.style.display='none';
    statusBox.textContent='✅ রেজিস্ট্রেশন সফলভাবে জমা হয়েছে।'; statusBox.style.color='#08733d';
    applicationBox.style.display='block';
  }catch(error){console.error(error);statusBox.textContent='❌ তথ্য জমা দেওয়া যায়নি। Firebase সেটআপ ও ইন্টারনেট সংযোগ যাচাই করুন।';statusBox.style.color='#c62828';}
  finally{submitBtn.disabled=false;submitBtn.innerHTML='রেজিস্ট্রেশন নিশ্চিত করুন <span>→</span>';}
});

function applicationHtml(){
 const d=applicationData; const date=new Date(d.createdAt).toLocaleString('bn-BD');
 return `<!doctype html><html lang="bn"><head><meta charset="utf-8"><title>Application Copy - ${esc(d.participantName)}</title><style>body{font-family:"Noto Sans Bengali","Hind Siliguri",sans-serif;margin:0;background:#f5f8f6;color:#173b2a}.paper{max-width:760px;margin:25px auto;background:#fff;padding:35px;border:1px solid #ddd;box-shadow:0 4px 20px #0001}.head{text-align:center;border-bottom:2px solid #08733d;padding-bottom:15px;margin-bottom:20px}.head h1{margin:5px 0;color:#08733d}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.item{padding:10px;border-bottom:1px solid #eee}.item b{display:block;color:#567}.events{padding:15px;background:#f0f8ef;border-radius:10px;margin:15px 0}.payment{padding:10px;border:1px solid #ddd;border-radius:8px;margin:8px 0}.foot{margin-top:25px;font-size:13px;color:#666}@media print{body{background:#fff}.paper{margin:0;box-shadow:none;border:0;max-width:none}}@media(max-width:600px){.grid{grid-template-columns:1fr}}</style></head><body><div class="paper"><div class="head"><div>ফুলকুঁড়ি আসর, Sunamganj</div><h1>Application Copy</h1><div>${esc(d.registrationType==='mind-marathon'?'মাইন্ড ম্যারাথন':d.registrationType==='anniversary-general'?SITE_CONFIG.anniversaryTitle+' অনুষ্ঠান':'প্রতিযোগিতা রেজিস্ট্রেশন')}</div></div><div class="grid"><div class="item"><b>আবেদনকারী</b>${esc(d.participantName)}</div><div class="item"><b>পিতা/অভিভাবক</b>${esc(d.guardianName)}</div><div class="item"><b>প্রতিষ্ঠান</b>${esc(d.institution)}</div><div class="item"><b>শ্রেণি</b>${esc(d.class)}</div><div class="item"><b>মোবাইল</b>${esc(d.phone)}</div><div class="item"><b>ই-মেইল</b>${esc(d.email||'—')}</div><div class="item"><b>ঠিকানা</b>${esc(d.address)}</div><div class="item"><b>জেলা</b>${esc(d.district)}</div></div><div class="events"><b>নির্বাচিত অনুষ্ঠান/প্রতিযোগিতা</b>${d.selectedCompetitions.map(x=>`<div>• ${esc(x)}</div>`).join('')}</div><div><b>পেমেন্ট বিবরণ</b>${d.payments.map(p=>`<div class="payment"><b>${esc(p.eventName)}</b><br>ফি: ৳${bn(p.amount)} | মাধ্যম: ${esc(p.paymentMethod)} | Transaction ID: ${esc(p.transactionId)}</div>`).join('')}</div><p><b>মোট ফি:</b> ৳${bn(d.totalAmount)}</p><p><b>রেজিস্ট্রেশন আইডি:</b> ${esc(d.id)}</p><p><b>রেজিস্ট্রেশনের সময়:</b> ${esc(date)}</p><div class="foot">এই কপিটি সংরক্ষণ করে প্রয়োজনে প্রিন্ট করুন। পেমেন্ট যাচাই সাপেক্ষে রেজিস্ট্রেশন নিশ্চিত হবে।</div></div></body></html>`;
}
document.getElementById('printBtn').onclick=()=>{const w=window.open('','_blank');if(!w){alert('Popup blocked হয়েছে। Browser-এ popup allow করুন।');return;}w.document.write(applicationHtml());w.document.close();w.focus();setTimeout(()=>w.print(),400);};
document.getElementById('downloadBtn').onclick=()=>{const blob=new Blob([applicationHtml()],{type:'text/html;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`application-${applicationData.id}.html`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
setupPage();
