/* ============================================================
   CFA Study Tools — Hypothesis Testing
   ============================================================ */

/* ---- MATH ---- */
function cfaErfc(x) {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z*z - 1.26551223 + t*(1.00002368 + t*(0.37409196 +
    t*(0.09678418 + t*(-0.18628806 + t*(0.27886807 + t*(-1.13520398 +
    t*(1.48851587 + t*(-0.82215223 + t*0.17087294)))))))));
  return x >= 0 ? r : 2 - r;
}
function cfaNormCDF(x) { return 0.5 * cfaErfc(-x / Math.SQRT2); }

function cfaLnGamma(z) {
  const c = [76.18009172947146,-86.50532032941677,24.01409824083091,
             -1.231739572450155,0.1208650973866179e-2,-0.5395239384953e-5];
  let y = z, tmp = z + 5.5;
  tmp -= (z + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += c[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / z);
}

function cfaBetaCF(a, b, x) {
  const fp = 1e-30, mi = 200, ep = 3e-7;
  const qab = a+b, qap = a+1, qam = a-1;
  let c = 1, d = 1 - qab*x/qap;
  if (Math.abs(d) < fp) d = fp; d = 1/d; let h = d;
  for (let m = 1; m <= mi; m++) {
    const m2 = 2*m;
    let aa = m*(b-m)*x/((qam+m2)*(a+m2));
    d=1+aa*d; if(Math.abs(d)<fp)d=fp; c=1+aa/c; if(Math.abs(c)<fp)c=fp;
    d=1/d; h*=d*c;
    aa=-(a+m)*(qab+m)*x/((a+m2)*(qap+m2));
    d=1+aa*d; if(Math.abs(d)<fp)d=fp; c=1+aa/c; if(Math.abs(c)<fp)c=fp;
    d=1/d; const del=d*c; h*=del;
    if (Math.abs(del-1) < ep) break;
  }
  return h;
}

function cfaIncBeta(x, a, b) {
  if (x <= 0) return 0; if (x >= 1) return 1;
  const lbeta = cfaLnGamma(a) + cfaLnGamma(b) - cfaLnGamma(a+b);
  const front = Math.exp(a*Math.log(x) + b*Math.log(1-x) - lbeta);
  if (x < (a+1)/(a+b+2)) return (front/a) * cfaBetaCF(a, b, x);
  return 1 - (front/b) * cfaBetaCF(b, a, 1-x);
}

function tPVal2(t, df) { return cfaIncBeta(df/(df+t*t), df/2, 0.5); }

function tCrit(alpha, df) {
  let lo = 0, hi = 20;
  for (let i = 0; i < 64; i++) {
    const m = (lo+hi)/2;
    tPVal2(m, df) > alpha ? lo = m : hi = m;
  }
  return (lo+hi)/2;
}

function zCrit(alpha) {
  let lo = 0, hi = 5;
  for (let i = 0; i < 64; i++) {
    const m = (lo+hi)/2;
    1 - cfaNormCDF(m) > alpha ? lo = m : hi = m;
  }
  return (lo+hi)/2;
}

/* ---- STATE ---- */
let _cfaInit = false;
let _calcType = 't';
let _flash = { idx: 0, flipped: false, known: new Set(), unknown: new Set() };
let _quiz = { started: false, current: 0, answers: [] };

/* ---- INIT ---- */
function initCfaStudy() {
  if (_cfaInit) return; _cfaInit = true;
  document.querySelectorAll('#cfaStudyTabs .cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#cfaStudyTabs .cat-tab').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.cfa-tool').forEach(t => t.style.display = 'none');
      document.getElementById('cfaTool-' + btn.dataset.tool).style.display = 'block';
    });
  });
  _initCalc();
  _initFlash();
  _initQuiz();
}

/* ============================================================
   TOOL 1 — CALCULATOR
   ============================================================ */
function _initCalc() {
  document.getElementById('cfaCalcBtnT').addEventListener('click', () => _setCalc('t'));
  document.getElementById('cfaCalcBtnZ').addEventListener('click', () => _setCalc('z'));
  document.getElementById('cfaCalcRun').addEventListener('click', _runCalc);
}

function _setCalc(type) {
  _calcType = type;
  document.getElementById('cfaCalcBtnT').className = 'btn' + (type === 't' ? '' : ' btn-ghost');
  document.getElementById('cfaCalcBtnZ').className = 'btn' + (type === 'z' ? '' : ' btn-ghost');
  document.getElementById('cfaTInputs').style.display = type === 't' ? 'block' : 'none';
  document.getElementById('cfaZInputs').style.display  = type === 'z' ? 'block' : 'none';
  document.getElementById('cfaCalcResult').innerHTML = '';
}

function _runCalc() { _calcType === 't' ? _runT() : _runZ(); }

function _step(label, body, note) {
  return `<div class="cfa-step"><div class="cfa-step-lbl">${label}</div><div class="cfa-step-body">${body}</div>${note ? `<div class="cfa-step-note">${note}</div>` : ''}</div>`;
}

function _runT() {
  const xbar = parseFloat(document.getElementById('tXbar').value);
  const s    = parseFloat(document.getElementById('tS').value);
  const n    = parseInt(document.getElementById('tN').value);
  const mu0  = parseFloat(document.getElementById('tMu0').value);
  const alp  = parseFloat(document.getElementById('tAlpha').value);
  const tail = document.getElementById('tTail').value;
  const res  = document.getElementById('cfaCalcResult');

  if ([xbar,s,n,mu0,alp].some(isNaN) || n < 2 || s <= 0) {
    res.innerHTML = '<div class="cfa-err">กรุณากรอกข้อมูลให้ครบ (n≥2, s>0)</div>'; return;
  }
  const se    = s / Math.sqrt(n);
  const tStat = (xbar - mu0) / se;
  const df    = n - 1;
  const p2    = tPVal2(Math.abs(tStat), df);
  const pVal  = tail === 'two' ? p2 : p2 / 2;
  const tc    = tCrit(tail === 'two' ? alp : alp*2, df);
  const reject = tail === 'two' ? Math.abs(tStat) > tc : tail === 'upper' ? tStat > tc : tStat < -tc;
  const h1map = { two:`μ ≠ ${mu0}`, upper:`μ > ${mu0}`, lower:`μ < ${mu0}` };

  res.innerHTML = `
    <div class="cfa-result-box" style="border-left-color:var(--info);">
      <div class="cfa-result-title" style="color:var(--info);">📊 t-test Results</div>
      ${_step('Step 1 — สมมติฐาน', `H₀: μ = ${mu0} &nbsp;|&nbsp; H₁: ${h1map[tail]}`)}
      ${_step('Step 2 — Standard Error', `SE = s/√n = ${s}/√${n} = <strong>${se.toFixed(4)}</strong>`)}
      ${_step('Step 3 — Test Statistic', `t = (x̄ − μ₀)/SE = (${xbar} − ${mu0})/${se.toFixed(4)}<br><strong style="color:var(--accent);font-size:18px;">t = ${tStat.toFixed(4)}</strong>`, `df = n−1 = ${df}`)}
      ${_step('Step 4 — Critical Value', `t<sub>crit</sub> = ${tail==='two'?'±':''}${tc.toFixed(4)}`, `${tail==='two'?`α/2 = ${alp/2}`:`α = ${alp}`}, df = ${df}`)}
      ${_step('Step 5 — p-value', `<strong>p = ${pVal.toFixed(4)}</strong> (${tail==='two'?'two-tailed':'one-tailed'})`, `p ${pVal<alp?'<':'≥'} α (${alp})`)}
      <div class="cfa-decision" style="background:${reject?'var(--accent-glow)':'rgba(255,77,109,0.1)'};border-color:${reject?'var(--accent)':'var(--danger)'};">
        <div style="font-size:22px;">${reject?'✅':'❌'}</div>
        <div style="font-weight:700;color:${reject?'var(--accent)':'var(--danger)'};">${reject?'Reject H₀':'Fail to Reject H₀'}</div>
        <div class="cfa-step-note">${reject?`|t| = ${Math.abs(tStat).toFixed(4)} > t_crit = ${tc.toFixed(4)}`:`|t| = ${Math.abs(tStat).toFixed(4)} ≤ t_crit = ${tc.toFixed(4)}`}</div>
      </div>
      <div class="cfa-blj-note">💡 บลจ. context: กองทุนอ้าง return = ${mu0}% → sample ${n} เดือน ได้ x̄ = ${xbar}%, s = ${s}%${reject?' → <strong style="color:var(--accent)">หลักฐานเพียงพอปฏิเสธข้อกล่าวอ้าง</strong>':' → <strong>ยังไม่มีหลักฐานเพียงพอปฏิเสธ</strong>'}</div>
    </div>`;
}

function _runZ() {
  const ph  = parseFloat(document.getElementById('zPhat').value);
  const p0  = parseFloat(document.getElementById('zP0').value);
  const n   = parseInt(document.getElementById('zN').value);
  const alp = parseFloat(document.getElementById('zAlpha').value);
  const tail= document.getElementById('zTail').value;
  const res = document.getElementById('cfaCalcResult');

  if ([ph,p0,n,alp].some(isNaN) || p0<=0||p0>=1||ph<0||ph>1||n<1) {
    res.innerHTML = '<div class="cfa-err">กรุณากรอกข้อมูลให้ถูกต้อง (0 &lt; p &lt; 1, n > 0)</div>'; return;
  }
  const se    = Math.sqrt(p0*(1-p0)/n);
  const zStat = (ph - p0) / se;
  const zc    = zCrit(tail === 'two' ? alp/2 : alp);
  const p2    = 2*(1 - cfaNormCDF(Math.abs(zStat)));
  const pVal  = tail === 'two' ? p2 : p2/2;
  const reject = tail==='two' ? Math.abs(zStat)>zc : tail==='upper' ? zStat>zc : zStat<-zc;
  const h1map = { two:`p ≠ ${p0}`, upper:`p > ${p0}`, lower:`p < ${p0}` };

  res.innerHTML = `
    <div class="cfa-result-box" style="border-left-color:var(--warn);">
      <div class="cfa-result-title" style="color:var(--warn);">📊 z-test (Proportion) Results</div>
      ${_step('Step 1 — สมมติฐาน', `H₀: p = ${p0} &nbsp;|&nbsp; H₁: ${h1map[tail]}`)}
      ${_step('Step 2 — Standard Error', `SE = √[p₀(1−p₀)/n] = √[${p0}×${(1-p0).toFixed(4)}/${n}]<br><strong>SE = ${se.toFixed(4)}</strong>`)}
      ${_step('Step 3 — Test Statistic', `z = (p̂−p₀)/SE = (${ph}−${p0})/${se.toFixed(4)}<br><strong style="color:var(--accent);font-size:18px;">z = ${zStat.toFixed(4)}</strong>`)}
      ${_step('Step 4 — Critical Value', `z<sub>crit</sub> = ${tail==='two'?'±':''}${zc.toFixed(4)}`, `${tail==='two'?`α/2 = ${alp/2}`:`α = ${alp}`}`)}
      ${_step('Step 5 — p-value', `<strong>p = ${pVal.toFixed(4)}</strong>`, `p ${pVal<alp?'<':'≥'} α (${alp})`)}
      <div class="cfa-decision" style="background:${reject?'var(--accent-glow)':'rgba(255,77,109,0.1)'};border-color:${reject?'var(--accent)':'var(--danger)'};">
        <div style="font-size:22px;">${reject?'✅':'❌'}</div>
        <div style="font-weight:700;color:${reject?'var(--accent)':'var(--danger)'};">${reject?'Reject H₀':'Fail to Reject H₀'}</div>
      </div>
    </div>`;
}

/* ============================================================
   TOOL 2 — FLASHCARDS
   ============================================================ */
const _CARDS = [
  { f:'H₀ (Null Hypothesis) คืออะไร?', b:'H₀ = สมมติฐานเริ่มต้นที่สมมติว่าเป็นจริง\nเช่น μ = μ₀, p = p₀\n\n→ เราพยายาม "ปฏิเสธ" H₀ ด้วยหลักฐาน\n→ มักแทน "ไม่มีผล" หรือ "ไม่มีความแตกต่าง"' },
  { f:'H₁ (Alternative Hypothesis) คืออะไร?', b:'H₁ = สมมติฐานที่ต้องการพิสูจน์\nเช่น μ ≠ μ₀ (two-tail) หรือ μ > μ₀ (one-tail)\n\n→ ทิศทางของ H₁ กำหนดว่าใช้ two-tailed\n   หรือ one-tailed test' },
  { f:'Type I Error คืออะไร?', b:'Reject H₀ ทั้งที่ H₀ เป็นจริง\n= False Positive / False Rejection\n\nโอกาสเกิด = α (significance level)\n\nตัวอย่าง: ตัดสินว่ากองทุนผิดปกติ\nทั้งที่จริงๆ ไม่ผิดปกติ' },
  { f:'Type II Error คืออะไร?', b:'Fail to Reject H₀ ทั้งที่ H₀ เป็นเท็จ\n= False Negative\n\nโอกาสเกิด = β\n\nตัวอย่าง: ตัดสินว่ากองทุนปกติ\nทั้งที่จริงๆ ผิดปกติ' },
  { f:'p-value คืออะไร?', b:'โอกาสที่จะสังเกตผลลัพธ์รุนแรงเท่านี้หรือมากกว่า\nโดยสมมติว่า H₀ เป็นจริง\n\n→ p < α → Reject H₀\n→ p ≥ α → Fail to Reject H₀\n\nยิ่ง p เล็ก = หลักฐานแรงขึ้นต่อต้าน H₀' },
  { f:'t-test vs z-test ใช้เมื่อไหร่?', b:'t-test:\n→ ไม่รู้ σ (population std) → ใช้ s\n→ t-distribution, df = n−1\n\nz-test:\n→ รู้ σ หรือ n ≥ 30 (CLT)\n→ standard normal distribution\n\nCFA tip: ส่วนใหญ่ใช้ t-test' },
  { f:'Two-Tailed vs One-Tailed test?', b:'Two-Tailed: H₁: μ ≠ μ₀\n→ Reject ถ้า |t| > t_{α/2, df}\n→ α แบ่งครึ่งซ้าย+ขวา\n\nOne-Tailed Upper: H₁: μ > μ₀\n→ Reject ถ้า t > t_{α, df}\n\nOne-Tailed Lower: H₁: μ < μ₀\n→ Reject ถ้า t < −t_{α, df}' },
  { f:'Rejection Region คืออะไร?', b:'พื้นที่ที่ถ้า test statistic ตกอยู่ → Reject H₀\n\n→ ขนาด = α (significance level)\n→ ขอบ = Critical Value\n\nTwo-tail: ปลายทั้งสองข้าง (α/2 ต่อข้าง)\nOne-tail: ปลายข้างเดียว (α ทั้งหมด)' },
  { f:'Significance Level α คืออะไร?\nค่าที่ใช้ใน CFA?', b:'α = โอกาส Type I Error ที่ยอมรับได้\n= ขนาดของ rejection region\n\nใช้ใน CFA:\n→ α = 0.05 (5%) — พบบ่อยที่สุด\n→ α = 0.01 (1%) — เข้มงวดกว่า\n→ α = 0.10 (10%) — หลวมกว่า\n\nα ลด → Type I ลด แต่ Type II เพิ่ม' },
  { f:'Degrees of Freedom (df) คืออะไร?', b:'df = จำนวนค่าที่ "อิสระ" ในการประมาณค่า\n\nOne-sample t-test: df = n − 1\nTwo-sample t-test: df = n₁+n₂ − 2\n\nยิ่ง df มาก:\n→ t-distribution → standard normal\n→ Critical value เล็กลง\n→ Power มากขึ้น' },
  { f:'Power of a Test คืออะไร?', b:'Power = 1 − β\n= P(Reject H₀ | H₀ เป็นเท็จ)\n= โอกาสตรวจพบ effect จริง\n\nPower เพิ่มขึ้นเมื่อ:\n→ n เพิ่ม\n→ α เพิ่ม\n→ Effect size ใหญ่\n→ σ เล็กลง' },
  { f:'Critical Value คืออะไร?', b:'ค่าที่แบ่ง Rejection Region จาก Non-rejection\n\nค่า z ที่ต้องจำ:\n→ two-tail 5%: z = ±1.960\n→ one-tail 5%: z = 1.645\n→ two-tail 1%: z = ±2.576\n\nHalfaa df น้อย → t_crit ใหญ่กว่า z_crit' },
  { f:'Standard Error of Mean คืออะไร?', b:'SE = σ/√n (รู้ σ)\nSE = s/√n (ไม่รู้ σ)\n\n→ วัดความแปรปรวนของ sample mean\n→ n เพิ่ม → SE เล็ก → แม่นยำขึ้น\n→ n เพิ่ม 4 เท่า → SE ลด 2 เท่า\n\nใช้ใน t-stat: t = (x̄−μ₀)/SE' },
  { f:'95% Confidence Interval หมายความว่าอะไร?', b:'CI = x̄ ± t_{α/2,df} × (s/√n)\n\nความหมายที่ถูกต้อง:\nถ้าสุ่ม sample ซ้ำ 100 ครั้ง\n→ ~95 ครั้งที่ CI ครอบ μ จริง\n\nCFA tip: ถ้า μ₀ อยู่นอก 95% CI\n→ Reject H₀ ที่ α = 0.05' },
  { f:'Statistical vs Practical Significance\nต่างกันอย่างไร?', b:'Statistical: p < α → มีนัยสำคัญทางสถิติ\n\nPractical: ผลกระทบมีความหมายจริงๆ ไหม?\n\nปัญหา: n ใหญ่มากทำให้แทบทุกอย่าง\nsignificant ทั้งที่ effect เล็กมาก\n\nตัวอย่าง: กองทุน A ผลตอบแทน 0.001%\nสูงกว่า B → statistical significant\nแต่ค่าธรรมเนียมสูงกว่า 0.5% → ไม่ practical' }
];

function _initFlash() {
  document.getElementById('flashFlip').addEventListener('click', _flipCard);
  document.getElementById('flashCard').addEventListener('click', _flipCard);
  document.getElementById('flashKnow').addEventListener('click', () => _rateCard(true));
  document.getElementById('flashDontKnow').addEventListener('click', () => _rateCard(false));
  document.getElementById('flashReset').addEventListener('click', _resetFlash);
  _renderFlash();
}

function _renderFlash() {
  const total = _CARDS.length;
  const known = _flash.known.size;
  document.getElementById('flashProgress').textContent = `รู้แล้ว ${known}/${total}`;
  document.getElementById('flashProgressBar').style.width = `${(known/total)*100}%`;

  if (known === total) {
    document.getElementById('flashCardNum').textContent = `${total}/${total} ✓`;
    document.getElementById('flashFront').style.display = 'none';
    document.getElementById('flashBack').style.display = 'none';
    document.getElementById('flashDone').style.display = 'flex';
    document.getElementById('flashRateRow').style.display = 'none';
    document.getElementById('flashFlip').style.display = 'none';
    document.getElementById('flashStats').innerHTML = '';
    return;
  }
  document.getElementById('flashDone').style.display = 'none';
  document.getElementById('flashFlip').style.display = 'block';

  const card = _CARDS[_flash.idx];
  document.getElementById('flashCardNum').textContent = `${_flash.idx+1} / ${total}`;

  const fEl = document.getElementById('flashFront');
  const bEl = document.getElementById('flashBack');
  fEl.innerHTML = card.f.replace(/\n/g,'<br>');
  bEl.innerHTML = card.b.replace(/\n/g,'<br>');

  if (_flash.flipped) {
    fEl.style.display = 'none';
    bEl.style.display = 'block';
    document.getElementById('flashFlip').textContent = 'กลับหน้า 🔄';
    document.getElementById('flashRateRow').style.display = 'flex';
  } else {
    fEl.style.display = 'flex';
    bEl.style.display = 'none';
    document.getElementById('flashFlip').textContent = 'พลิกดูเฉลย 🔄';
    document.getElementById('flashRateRow').style.display = 'none';
  }

  document.getElementById('flashStats').innerHTML =
    `<span style="color:var(--accent);">✓ ${_flash.known.size}</span>` +
    `<span style="color:var(--danger);">  ✗ ${_flash.unknown.size}</span>` +
    `<span style="color:var(--text-mute);">  ? ${total-_flash.known.size-_flash.unknown.size}</span>`;
}

function _flipCard() {
  if (_flash.known.size === _CARDS.length) return;
  _flash.flipped = !_flash.flipped;
  _renderFlash();
}

function _rateCard(know) {
  const idx = _flash.idx;
  if (know) { _flash.known.add(idx); _flash.unknown.delete(idx); }
  else       { _flash.unknown.add(idx); _flash.known.delete(idx); }
  if (_flash.known.size === _CARDS.length) { _flash.flipped = false; _renderFlash(); return; }
  let next = (idx+1) % _CARDS.length, tries = 0;
  while (_flash.known.has(next) && tries++ < _CARDS.length) next = (next+1) % _CARDS.length;
  _flash.idx = next; _flash.flipped = false; _renderFlash();
}

function _resetFlash() {
  _flash = { idx:0, flipped:false, known:new Set(), unknown:new Set() };
  _renderFlash();
}

/* ============================================================
   TOOL 3 — QUIZ
   ============================================================ */
const _QS = [
  { q:'A portfolio manager claims the average monthly return of her fund is 2.0%. A sample of 25 months yields x̄ = 1.5% and s = 1.2%. The test statistic (two-tailed t-test) is:',
    opts:['A) −2.083','B) −1.960','C) −1.711','D) −2.576'], ans:0,
    exp:'SE = s/√n = 1.2/√25 = 0.24\nt = (1.5−2.0)/0.24 = −2.083\ndf = 24, t_crit(α=0.05) = ±2.064\n|t| = 2.083 > 2.064 → Reject H₀' },
  { q:'Which error is committed when the null hypothesis is rejected but is actually true?',
    opts:['A) Type II Error','B) Type I Error','C) Power Error','D) Sampling Error'], ans:1,
    exp:'Type I Error = Reject H₀ เมื่อ H₀ จริง (False Positive)\nโอกาสเกิด = α\n\nType II = Fail to Reject H₀ เมื่อ H₀ เท็จ\nโอกาสเกิด = β' },
  { q:'For a two-tailed t-test at α = 0.05 with df = 24, the critical value is closest to:',
    opts:['A) 1.711','B) 1.960','C) 2.064','D) 2.492'], ans:2,
    exp:'t_crit(α/2 = 0.025, df=24) = 2.064\n\nต้องจำ:\n→ df=∞: t ≈ 1.960 (= z)\n→ df=30: t ≈ 2.042\n→ df=24: t ≈ 2.064\n→ df=20: t ≈ 2.086\n\ndf เล็ก → t_crit ใหญ่' },
  { q:'A test yields p-value = 0.03 at α = 0.05. The correct conclusion is:',
    opts:['A) Fail to reject H₀ since p > α','B) Reject H₀ since p < α','C) Accept H₀','D) Cannot determine without t-statistic'], ans:1,
    exp:'p = 0.03 < α = 0.05 → Reject H₀\n\nRule: p < α → Reject H₀\np ≥ α → Fail to Reject H₀\n\nNote: ไม่มี "Accept H₀"\nแค่ "Fail to Reject"' },
  { q:'An analyst tests if the proportion of winning trades equals 0.50. With n = 100, p̂ = 0.58. The most appropriate test is:',
    opts:['A) t-test (df=99)','B) z-test for proportions','C) F-test','D) Chi-square'], ans:1,
    exp:'z = (p̂−p₀)/√[p₀(1−p₀)/n]\n= (0.58−0.50)/√[0.50×0.50/100]\n= 0.08/0.05 = 1.60\n\nz-test สำหรับ proportion:\n→ binary data (win/loss)\n→ n ใหญ่พอ (np₀ > 5)' },
  { q:'The power of a hypothesis test is best described as:',
    opts:['A) P(Type I Error) = α','B) 1 − α','C) P(Reject H₀ | H₀ false) = 1 − β','D) P(Fail to Reject H₀)'], ans:2,
    exp:'Power = 1−β = P(Reject H₀ | H₀ เท็จ)\n= โอกาสตรวจพบ effect จริง\n\nPower เพิ่มเมื่อ:\n→ n เพิ่ม\n→ α เพิ่ม\n→ Effect size ใหญ่\n→ σ เล็กลง' },
  { q:'If s = 6 and n = 144, the standard error of the mean equals:',
    opts:['A) 0.042','B) 0.500','C) 6.000','D) 0.250'], ans:1,
    exp:'SE = s/√n = 6/√144 = 6/12 = 0.5\n\n→ n เพิ่ม 4 เท่า → SE ลด 2 เท่า\n→ n = 144 คือ n = 36 × 4\n   ถ้า n=36: SE=1.0 → n=144: SE=0.5' },
  { q:'A one-tailed upper test at α = 0.05 yields z = 1.75. The conclusion is:',
    opts:['A) Fail to reject H₀ since 1.75 < 1.96','B) Reject H₀ since 1.75 > 1.645','C) Reject H₀ since 1.75 > 1.96','D) Cannot determine'], ans:1,
    exp:'One-tail upper α=0.05: z_crit = 1.645\n(ไม่ใช่ 1.96 ซึ่งใช้ two-tail)\n\n1.75 > 1.645 → Reject H₀\n\nจำ:\n→ two-tail 5%: z = ±1.960\n→ one-tail 5%: z = 1.645' },
  { q:'All else equal, increasing sample size n will:',
    opts:['A) Increase significance level α','B) Decrease standard error and increase power','C) Widen the confidence interval','D) Increase Type I error probability'], ans:1,
    exp:'n เพิ่ม → SE = s/√n ลด\n→ t-stat ใหญ่ขึ้น (effect เดิม)\n→ Power เพิ่ม\n→ CI แคบลง\n\nα ไม่เปลี่ยน (นักวิเคราะห์เลือก)' },
  { q:'Which statement about the t-distribution is CORRECT?',
    opts:['A) Thinner tails than normal','B) Identical to normal for any df','C) Fatter tails than normal; thinner as df → ∞','D) Skewed to the right'], ans:2,
    exp:'t-distribution:\n→ Symmetric, bell-shaped เหมือน normal\n→ Fatter tails → t_crit > z_crit\n→ df เพิ่ม → tails บาง → → standard normal\n→ df→∞: t = z\n\nเหตุ: ชดเชยความไม่แน่นอนจาก s แทน σ' }
];

function _initQuiz() {
  document.getElementById('quizStartBtn').addEventListener('click', _startQuiz);
}

function _startQuiz() {
  _quiz = { started:true, current:0, answers:new Array(_QS.length).fill(null) };
  _renderQ();
}

function _renderQ() {
  const c = document.getElementById('quizContainer');
  const qi = _quiz.current;
  const q = _QS[qi];
  const ans = _quiz.answers[qi];
  const total = _QS.length;

  c.innerHTML = `
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span style="font-size:12px;color:var(--text-mute);">ข้อ ${qi+1}/${total}</span>
        <span style="font-size:12px;color:var(--accent);">${_quiz.answers.filter(a=>a!==null).length} ตอบแล้ว</span>
      </div>
      <div class="progress"><div class="progress-fill" style="width:${(qi/total)*100}%"></div></div>
    </div>
    <div style="background:var(--bg-elev-2);border-radius:10px;padding:14px 16px;margin-bottom:12px;border-left:3px solid var(--info);">
      <div style="font-size:11px;color:var(--text-mute);margin-bottom:6px;font-family:'JetBrains Mono',monospace;">Q${qi+1}</div>
      <div style="font-size:14px;line-height:1.75;">${q.q}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;" id="qOpts">
      ${q.opts.map((o,i)=>{
        let s='', mark='';
        if (ans!==null) {
          if (i===q.ans) { s='border-color:var(--accent);background:var(--accent-glow);'; mark=' ✓'; }
          else if (i===ans) { s='border-color:var(--danger);background:rgba(255,77,109,0.1);'; mark=' ✗'; }
          else s='opacity:0.45;';
        }
        return `<button class="quiz-opt" data-i="${i}" style="text-align:left;padding:12px 14px;border-radius:8px;background:var(--bg-elev-2);border:1px solid var(--border);font-size:14px;line-height:1.5;transition:all 0.15s;${s}">${o}${mark}</button>`;
      }).join('')}
    </div>
    ${ans!==null ? `
      <div style="margin-top:12px;padding:14px;background:var(--bg);border-radius:10px;border-left:3px solid ${ans===q.ans?'var(--accent)':'var(--danger)'};">
        <div style="font-weight:700;color:${ans===q.ans?'var(--accent)':'var(--danger)'};margin-bottom:6px;">${ans===q.ans?'✅ ถูกต้อง!':'❌ ผิด'}</div>
        <div style="font-size:13px;color:var(--text-dim);white-space:pre-line;">${q.exp}</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;">
        ${qi>0?'<button class="btn btn-ghost" id="qPrev">← ก่อนหน้า</button>':''}
        ${qi<total-1?'<button class="btn" id="qNext" style="flex:1;">ข้อถัดไป →</button>':'<button class="btn" id="qDone" style="flex:1;background:var(--info);color:var(--bg);">ดูผลลัพธ์ 🏆</button>'}
      </div>` : ''}
  `;

  if (ans === null) {
    document.querySelectorAll('#qOpts .quiz-opt').forEach(b => {
      b.addEventListener('mouseenter', () => { if(b.style.opacity!=='0.45') b.style.borderColor='var(--accent)'; });
      b.addEventListener('mouseleave', () => { if(b.style.opacity!=='0.45') b.style.borderColor='var(--border)'; });
      b.addEventListener('click', () => { _quiz.answers[qi] = Number(b.dataset.i); _renderQ(); });
    });
  }
  document.getElementById('qPrev')?.addEventListener('click', () => { _quiz.current--; _renderQ(); });
  document.getElementById('qNext')?.addEventListener('click', () => { _quiz.current++; _renderQ(); });
  document.getElementById('qDone')?.addEventListener('click', _showResults);
}

function _showResults() {
  const correct = _quiz.answers.filter((a,i)=>a===_QS[i].ans).length;
  const total = _QS.length;
  const pct = Math.round((correct/total)*100);
  const col = pct>=70?'var(--accent)':pct>=50?'var(--warn)':'var(--danger)';
  const msg = pct>=70?'🎉 ผ่าน! พร้อมสอบ CFA':pct>=50?'📚 พอใช้ ทบทวนเพิ่ม':'💪 ต้องเรียนเพิ่มนะ';

  document.getElementById('quizContainer').innerHTML = `
    <div style="text-align:center;padding:24px;background:var(--bg-elev-2);border-radius:12px;margin-bottom:16px;">
      <div style="font-size:56px;font-weight:700;color:${col};">${pct}%</div>
      <div style="font-size:18px;font-weight:600;margin:6px 0;">${correct} / ${total} ข้อ</div>
      <div style="color:var(--text-dim);">${msg}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px;">
      ${_QS.map((q,i)=>{
        const ok=_quiz.answers[i]===q.ans;
        return `<div style="padding:10px 14px;border-radius:8px;background:var(--bg-elev-2);border-left:3px solid ${ok?'var(--accent)':'var(--danger)'};">
          <span style="font-size:13px;color:${ok?'var(--accent)':'var(--danger)'};">${ok?'✓':'✗'} ข้อ ${i+1}</span>
          <span style="font-size:12px;color:var(--text-mute);margin-left:8px;">เฉลย: ${q.opts[q.ans].slice(0,2)}</span>
        </div>`;
      }).join('')}
    </div>
    <button class="btn btn-ghost" id="qRetry" style="width:100%;">ทำใหม่อีกครั้ง 🔄</button>
  `;
  document.getElementById('qRetry').addEventListener('click', () => {
    _quiz = { started:false, current:0, answers:[] };
    document.getElementById('quizContainer').innerHTML = `
      <div style="text-align:center;padding:20px;">
        <div style="font-size:40px;margin-bottom:12px;">📝</div>
        <div style="font-size:15px;color:var(--text-dim);margin-bottom:4px;">10 ข้อ Multiple Choice</div>
        <div style="font-size:13px;color:var(--text-mute);margin-bottom:20px;">เหมือน CFA Level 1 + เฉลยอธิบายทุกข้อ</div>
        <button class="btn" id="quizStartBtn" style="width:100%;max-width:280px;">เริ่ม Quiz →</button>
      </div>`;
    document.getElementById('quizStartBtn').addEventListener('click', _startQuiz);
  });
}

/* ---- AUTO INIT (runs after DOM is ready, scripts loaded in order) ---- */
initCfaStudy();
