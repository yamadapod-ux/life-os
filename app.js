/* ============================================================
   Life OS — Personal Life Operating System
   ============================================================ */

const STORE_KEY = 'life-os-data-v1';
const TODAY_KEY = () => new Date().toISOString().slice(0, 10);

/* ---------- DEFAULT / SAMPLE DATA ---------- */
const SCHEMA_VERSION = 3;

const DEFAULT_DATA = {
  schemaVersion: SCHEMA_VERSION,
  timeBlocks: {},
  meals: {},
  cfaToday: {},
  clipsToday: {},
  pipeline: [],
  recipes: [
    { id: 1, name: 'ไข่ต้ม 2 ฟอง + ข้าวโอ๊ต', meal: 'breakfast', note: 'Protein + complex carb' },
    { id: 2, name: 'ไข่คน + ขนมปังโฮลวีต', meal: 'breakfast', note: '' },
    { id: 3, name: 'กรีกโยเกิร์ต + กล้วย + อัลมอนด์', meal: 'breakfast', note: '' },
    { id: 4, name: 'โอ๊ตมีล + นมไม่หวาน + ผลไม้', meal: 'breakfast', note: '' },
    { id: 5, name: 'แซนวิชอกไก่ + ผักสด', meal: 'breakfast', note: '' },
    { id: 6, name: 'ไข่ดาว + ข้าวกล้อง 1 ทัพพี', meal: 'breakfast', note: '' },

    { id: 10, name: 'อกไก่ย่าง + สลัด', meal: 'lunch', note: 'Protein + veggies' },
    { id: 11, name: 'ปลาแซลมอนย่าง + ผักนึ่ง', meal: 'lunch', note: '' },
    { id: 12, name: 'ข้าวกล้อง + ไก่อบ + ผัก', meal: 'lunch', note: '' },
    { id: 13, name: 'สเต็กเนื้อไม่ติดมัน + บร็อคโคลี่', meal: 'lunch', note: '' },
    { id: 14, name: 'ก๋วยเตี๋ยวไก่ (ไม่ใส่น้ำตาล)', meal: 'lunch', note: '' },
    { id: 15, name: 'ส้มตำไก่ย่าง', meal: 'lunch', note: 'ไม่ใส่น้ำปลาร้า' },
    { id: 16, name: 'โจ๊กไก่ (ไม่ใส่ปาท่องโก๋)', meal: 'lunch', note: '' },

    { id: 20, name: 'ปลานึ่ง + ผักลวก', meal: 'dinner', note: 'เบาๆ protein + veggies' },
    { id: 21, name: 'อกไก่ย่าง + สลัดผัก', meal: 'dinner', note: '' },
    { id: 22, name: 'ต้มจืดเต้าหู้หมูสับ', meal: 'dinner', note: '' },
    { id: 23, name: 'แกงจืดผักไก่', meal: 'dinner', note: '' },
    { id: 24, name: 'สลัดทูน่า', meal: 'dinner', note: '' },
    { id: 25, name: 'ไข่ตุ๋น + ผัก', meal: 'dinner', note: '' },
    { id: 26, name: 'ปลาเผา + น้ำจิ้มซีฟู้ด', meal: 'dinner', note: '' },

    { id: 30, name: 'กรีกโยเกิร์ต', meal: 'snack', note: '' },
    { id: 31, name: 'แอปเปิ้ล / ส้ม / ฝรั่ง', meal: 'snack', note: '' },
    { id: 32, name: 'อัลมอนด์ 10-15 เม็ด', meal: 'snack', note: '' },
    { id: 33, name: 'ไข่ต้ม', meal: 'snack', note: '' },
    { id: 34, name: 'ดาร์กช็อกโกแลต 70%+ 1 เหลี่ยม', meal: 'snack', note: '' }
  ],
  weeklyMeals: {},
  water: {},
  sleep: {},
  mood: {},
  workHours: {},
  cfaRoadmap: [
    { id: 1, level: 'Level 1', topic: 'Ethics & Professional Standards', progress: 0, current: false },
    { id: 2, level: 'Level 1', topic: 'Quantitative Methods', progress: 10, current: true },
    { id: 3, level: 'Level 1', topic: 'Economics', progress: 0, current: false },
    { id: 4, level: 'Level 1', topic: 'Financial Reporting & Analysis', progress: 0, current: false },
    { id: 5, level: 'Level 1', topic: 'Corporate Issuers', progress: 0, current: false },
    { id: 6, level: 'Level 1', topic: 'Equity Investments', progress: 0, current: false },
    { id: 7, level: 'Level 1', topic: 'Fixed Income', progress: 0, current: false },
    { id: 8, level: 'Level 1', topic: 'Derivatives', progress: 0, current: false },
    { id: 9, level: 'Level 1', topic: 'Alternative Investments', progress: 0, current: false },
    { id: 10, level: 'Level 1', topic: 'Portfolio Management', progress: 0, current: false }
  ],
  contentGoals: [
    { id: 1, title: 'CFA Level 1 — เนื้อหาที่จบ', target: 10, current: 0 },
    { id: 2, title: 'ลดน้ำหนัก — เป้า (กก.)', target: 15, current: 0 },
    { id: 3, title: 'งาน Freelance — งานสำเร็จ', target: 20, current: 0 },
    { id: 4, title: 'บลจ. — หุ้นที่วิเคราะห์', target: 100, current: 0 }
  ],
  personalGoals: [
    { id: 1, title: 'คุมอาหาร 3 มื้อ ต่อเนื่อง (วัน)', target: 90, current: 0 },
    { id: 2, title: 'เรียน CFA 3 ชม./วัน ต่อเนื่อง (วัน)', target: 90, current: 0 }
  ],
  monthlyReview: '',
  uiState: { activePage: 'today', activeCat: 'all' },
  importedInboxIds: []
};

/* ---------- DEFAULT DAILY SCHEDULE (real, not sample) ---------- */
function defaultDailySchedule() {
  return [
    { id: 1, time: '08:00', task: 'ตื่นนอน + ดื่มน้ำ', done: false },
    { id: 2, time: '08:30', task: 'อาหารเช้า (ลดน้ำหนัก)', done: false },
    { id: 3, time: '09:00', task: 'เรียน CFA — Quantitative Methods', done: false },
    { id: 4, time: '12:00', task: 'อาหารกลางวัน (ลดน้ำหนัก)', done: false },
    { id: 5, time: '13:00', task: 'พัก / วิเคราะห์หุ้นกับ บลจ.', done: false },
    { id: 6, time: '15:00', task: 'งาน Freelance', done: false },
    { id: 7, time: '19:00', task: 'อาหารเย็น (ลดน้ำหนัก)', done: false },
    { id: 8, time: '20:00', task: 'งาน Freelance ต่อ', done: false },
    { id: 9, time: '23:30', task: 'นอน (เป้า 24:00)', done: false }
  ];
}

function defaultMeals() {
  return {
    breakfast: 'ไข่ต้ม 2 ฟอง + ข้าวโอ๊ต',
    lunch: 'อกไก่ย่าง + สลัด',
    dinner: 'ปลานึ่ง + ผักลวก',
    snack: 'กรีกโยเกิร์ต / ผลไม้'
  };
}

function buildSampleToday() {
  const t = TODAY_KEY();
  return {
    timeBlocks: { [t]: defaultDailySchedule() },
    meals: { [t]: defaultMeals() },
    cfaToday: {
      [t]: [
        { id: 1, topic: 'Quantitative Methods — Reading หลักวันนี้', done: false },
        { id: 2, topic: 'Practice Q — 20 ข้อ', done: false }
      ]
    },
    clipsToday: { [t]: [] },
    weeklyMeals: buildSampleWeeklyMeals()
  };
}

function buildSampleWeeklyMeals() {
  const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
  const out = {};
  const samples = [
    { breakfast: 'ไข่ต้ม 2 ฟอง + ข้าวโอ๊ต', lunch: 'อกไก่ย่าง + สลัด', dinner: 'ปลานึ่ง + ผักลวก' },
    { breakfast: 'ไข่คน + ขนมปังโฮลวีต', lunch: 'ข้าวกล้อง + ไก่อบ', dinner: 'ต้มจืดเต้าหู้หมูสับ' },
    { breakfast: 'กรีกโยเกิร์ต + กล้วย + อัลมอนด์', lunch: 'แซลมอนย่าง + ผักนึ่ง', dinner: 'สลัดทูน่า' }
  ];
  days.forEach((d, i) => { out[d] = samples[i % samples.length]; });
  return out;
}

/* ---------- STORAGE ---------- */
function loadData() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { console.warn('load failed', e); }
  // First-time seed
  const seeded = { ...DEFAULT_DATA, ...buildSampleToday() };
  saveData(seeded);
  return seeded;
}

function saveData(d) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(d));
  } catch (e) { console.warn('save failed', e); }
}

function migrateData(d) {
  if (!d.schemaVersion || d.schemaVersion < SCHEMA_VERSION) {
    if (!d.schemaVersion || d.schemaVersion < 2) {
      d.pipeline = [];
      d.recipes = JSON.parse(JSON.stringify(DEFAULT_DATA.recipes));
      d.cfaRoadmap = JSON.parse(JSON.stringify(DEFAULT_DATA.cfaRoadmap));
      d.contentGoals = JSON.parse(JSON.stringify(DEFAULT_DATA.contentGoals));
      d.personalGoals = JSON.parse(JSON.stringify(DEFAULT_DATA.personalGoals));
      d.weeklyMeals = buildSampleWeeklyMeals();

      const t = TODAY_KEY();
      d.timeBlocks = d.timeBlocks || {};
      d.timeBlocks[t] = defaultDailySchedule();
      d.meals = d.meals || {};
      d.meals[t] = defaultMeals();

      delete d.exercise;
      delete d.calories;
    }

    if (d.schemaVersion < 3) {
      // rename pipeline category 'content' → 'freelance'
      if (Array.isArray(d.pipeline)) {
        d.pipeline.forEach((p) => { if (p.cat === 'content') p.cat = 'freelance'; });
      }
    }

    d.schemaVersion = SCHEMA_VERSION;
    saveData(d);
  }
  return d;
}

let DATA = migrateData(loadData());
const save = () => saveData(DATA);

/* ---------- HELPERS ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const uid = () => Date.now() + Math.floor(Math.random() * 1000);

function fmtThaiDate(d = new Date()) {
  const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'];
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  return `วัน${days[d.getDay()]}ที่ ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 1800);
}

function daysLeft(deadline) {
  if (!deadline) return null;
  const d = new Date(deadline);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - now) / (24 * 60 * 60 * 1000));
}

/* ---------- NAVIGATION ---------- */
const PAGE_TITLES = {
  today: 'วันนี้',
  pipeline: 'Pipeline',
  meals: 'มื้ออาหาร',
  wellness: 'Wellness',
  'cfa-study': 'เรียน CFA',
  goals: 'เป้าหมาย'
};

function goToPage(page) {
  DATA.uiState.activePage = page;
  save();
  $$('.page').forEach((p) => p.classList.toggle('active', p.id === `page-${page}`));
  $$('.nav-btn[data-page]').forEach((b) => b.classList.toggle('active', b.dataset.page === page));
  const pageLabel = PAGE_TITLES[page] || page;
  $('#pageTitle').textContent = pageLabel;
  document.title = `Life OS · ${pageLabel}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- TODAY: TIME BLOCKS ---------- */
function getTodayBlocks() {
  const t = TODAY_KEY();
  if (!DATA.timeBlocks[t]) DATA.timeBlocks[t] = [];
  return DATA.timeBlocks[t];
}

function renderTimeBlocks() {
  const blocks = getTodayBlocks().slice().sort((a, b) => a.time.localeCompare(b.time));
  const root = $('#timeBlocks');
  if (!blocks.length) {
    root.innerHTML = '<div class="text-mute" style="padding: 20px; text-align: center;">ยังไม่มีงานวันนี้ กด + เพื่อเพิ่ม</div>';
  } else {
    root.innerHTML = blocks.map((b) => `
      <div class="time-block ${b.done ? 'done' : ''}" data-id="${b.id}">
        <div class="tb-time">${b.time}</div>
        <div class="tb-task">${escape(b.task)}</div>
        <div class="tb-actions">
          <button class="check ${b.done ? 'checked' : ''}" data-act="toggle"></button>
          <button class="icon-btn" data-act="edit" style="width:32px;height:32px;font-size:14px;">✎</button>
          <button class="icon-btn" data-act="del" style="width:32px;height:32px;font-size:14px;color:var(--danger);">×</button>
        </div>
      </div>
    `).join('');
  }
  // Stats
  const done = blocks.filter((b) => b.done).length;
  $('#statDone').textContent = done;
  $('#statTotal').textContent = blocks.length;
  $('#timeProgress').textContent = blocks.length ? Math.round((done / blocks.length) * 100) + '%' : '0%';
}

function bindTimeBlockActions() {
  $('#timeBlocks').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const card = btn.closest('.time-block');
    const id = Number(card.dataset.id);
    const blocks = getTodayBlocks();
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx < 0) return;

    if (btn.dataset.act === 'toggle') {
      blocks[idx].done = !blocks[idx].done;
      save(); renderTimeBlocks();
    } else if (btn.dataset.act === 'del') {
      if (!confirm('ลบรายการนี้?')) return;
      blocks.splice(idx, 1);
      save(); renderTimeBlocks();
      toast('ลบแล้ว');
    } else if (btn.dataset.act === 'edit') {
      openTimeBlockModal(blocks[idx]);
    }
  });
  $('#addTimeBlockBtn').addEventListener('click', () => openTimeBlockModal(null));
}

function openTimeBlockModal(item) {
  const isEdit = !!item;
  openModal(isEdit ? 'แก้ไขรายการ' : 'เพิ่มรายการ', `
    <div class="text-mute">เวลา</div>
    <input class="field" type="time" id="mTime" value="${item ? item.time : '09:00'}" />
    <div class="text-mute mt-sm">สิ่งที่ต้องทำ</div>
    <input class="field" type="text" id="mTask" placeholder="เช่น อ่าน CFA Ethics..." value="${item ? escapeAttr(item.task) : ''}" />
  `, () => {
    const time = $('#mTime').value;
    const task = $('#mTask').value.trim();
    if (!task) { toast('กรอกงานก่อน'); return false; }
    const blocks = getTodayBlocks();
    if (isEdit) {
      const idx = blocks.findIndex((b) => b.id === item.id);
      blocks[idx].time = time; blocks[idx].task = task;
    } else {
      blocks.push({ id: uid(), time, task, done: false });
    }
    save(); renderTimeBlocks();
    toast(isEdit ? 'แก้ไขแล้ว' : 'เพิ่มแล้ว');
  });
}

/* ---------- TODAY: MEALS ---------- */
function getTodayMeals() {
  const t = TODAY_KEY();
  if (!DATA.meals[t]) DATA.meals[t] = { breakfast: '', lunch: '', dinner: '', snack: '' };
  return DATA.meals[t];
}

function renderTodayMeals() {
  const m = getTodayMeals();
  const labels = [
    ['breakfast', '🌅 เช้า'],
    ['lunch', '☀️ กลางวัน'],
    ['dinner', '🌙 เย็น'],
    ['snack', '🍎 ของว่าง']
  ];
  $('#todayMeals').innerHTML = labels.map(([k, l]) => `
    <div class="meal-card">
      <div class="label">${l}</div>
      <input class="meal-input" data-key="${k}" placeholder="—" value="${escapeAttr(m[k] || '')}" />
    </div>
  `).join('');

  $$('#todayMeals .meal-input').forEach((inp) => {
    inp.addEventListener('change', () => {
      const key = inp.dataset.key;
      getTodayMeals()[key] = inp.value;
      save();
    });
  });
}

/* ---------- TODAY: CFA ---------- */
function getCfaToday() {
  const t = TODAY_KEY();
  if (!DATA.cfaToday[t]) DATA.cfaToday[t] = [];
  return DATA.cfaToday[t];
}

function renderCfaToday() {
  const items = getCfaToday();
  const root = $('#cfaToday');
  if (!items.length) {
    root.innerHTML = '<div class="text-mute" style="padding: 12px; text-align: center;">ยังไม่มี — เพิ่มหัวข้อที่จะเรียนวันนี้</div>';
    return;
  }
  root.innerHTML = items.map((it) => `
    <div class="time-block ${it.done ? 'done' : ''}" data-id="${it.id}" style="grid-template-columns: 1fr auto;">
      <div class="tb-task">📚 ${escape(it.topic)}</div>
      <div class="tb-actions">
        <button class="check ${it.done ? 'checked' : ''}" data-act="toggle"></button>
        <button class="icon-btn" data-act="del" style="width:32px;height:32px;font-size:14px;color:var(--danger);">×</button>
      </div>
    </div>
  `).join('');
  root.onclick = (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = Number(btn.closest('[data-id]').dataset.id);
    const list = getCfaToday();
    const idx = list.findIndex((x) => x.id === id);
    if (btn.dataset.act === 'toggle') { list[idx].done = !list[idx].done; }
    else if (btn.dataset.act === 'del') { list.splice(idx, 1); toast('ลบแล้ว'); }
    save(); renderCfaToday();
  };
}

$('#addCfaTodayBtn')?.addEventListener?.('click', () => {
  openModal('เพิ่มหัวข้อ CFA', `
    <input class="field" type="text" id="cfaTopic" placeholder="เช่น Ethics — Reading 1" />
  `, () => {
    const topic = $('#cfaTopic').value.trim();
    if (!topic) return false;
    getCfaToday().push({ id: uid(), topic, done: false });
    save(); renderCfaToday(); toast('เพิ่มแล้ว');
  });
});

/* ---------- TODAY: CLIPS ---------- */
function getClipsToday() {
  const t = TODAY_KEY();
  if (!DATA.clipsToday[t]) DATA.clipsToday[t] = [];
  return DATA.clipsToday[t];
}

function renderClipsToday() {
  const items = getClipsToday();
  const root = $('#clipsToday');
  if (!items.length) {
    root.innerHTML = '<div class="text-mute" style="padding: 12px; text-align: center;">ยังไม่มีคลิปที่ต้องทำวันนี้</div>';
    return;
  }
  root.innerHTML = items.map((c) => `
    <div class="time-block ${c.done ? 'done' : ''}" data-id="${c.id}" style="grid-template-columns: 1fr auto;">
      <div class="tb-task">
        <div>🎬 ${escape(c.title)}</div>
        <div class="text-mute">${escape(c.stage || '')}</div>
      </div>
      <div class="tb-actions">
        <button class="check ${c.done ? 'checked' : ''}" data-act="toggle"></button>
        <button class="icon-btn" data-act="del" style="width:32px;height:32px;font-size:14px;color:var(--danger);">×</button>
      </div>
    </div>
  `).join('');
  root.onclick = (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = Number(btn.closest('[data-id]').dataset.id);
    const list = getClipsToday();
    const idx = list.findIndex((x) => x.id === id);
    if (btn.dataset.act === 'toggle') list[idx].done = !list[idx].done;
    else if (btn.dataset.act === 'del') { list.splice(idx, 1); toast('ลบแล้ว'); }
    save(); renderClipsToday();
  };
}

$('#addClipTodayBtn')?.addEventListener?.('click', () => {
  openModal('เพิ่มคลิป', `
    <input class="field" type="text" id="clipTitle" placeholder="ชื่อคลิป..." />
    <input class="field mt-sm" type="text" id="clipStage" placeholder="ขั้นตอน เช่น เขียน script / ตัดต่อ" />
  `, () => {
    const title = $('#clipTitle').value.trim();
    const stage = $('#clipStage').value.trim();
    if (!title) return false;
    getClipsToday().push({ id: uid(), title, stage, done: false });
    save(); renderClipsToday(); toast('เพิ่มแล้ว');
  });
});

/* ---------- PIPELINE ---------- */
function renderPipeline() {
  const cat = DATA.uiState.activeCat;
  const list = cat === 'all' ? DATA.pipeline : DATA.pipeline.filter((p) => p.cat === cat);
  $('#pipeCount').textContent = list.length;
  const root = $('#pipelineList');
  if (!list.length) {
    root.innerHTML = '<div class="text-mute" style="padding:20px;text-align:center;">ไม่มีรายการในหมวดนี้</div>';
    return;
  }
  root.innerHTML = list.map((p) => {
    const dl = daysLeft(p.deadline);
    let dlText = '';
    if (dl !== null) {
      const cls = dl < 0 ? 'urgent' : dl <= 3 ? 'urgent' : dl <= 7 ? 'soon' : '';
      dlText = `<span class="deadline ${cls}">⏰ ${dl < 0 ? 'เลย ' + Math.abs(dl) + ' วัน' : 'อีก ' + dl + ' วัน'}</span>`;
    }
    const catLabels = { cfa: '📚 CFA', investment: '💹 บลจ.', freelance: '💼 Freelance', personal: '🌱 Personal' };
    return `
      <div class="task-card" data-id="${p.id}" data-cat="${p.cat}" draggable="true">
        <div class="title">
          <span>${escape(p.title)}</span>
          <span class="text-mute" style="font-size:18px;cursor:grab;">⋮⋮</span>
        </div>
        ${p.note ? `<div class="text-dim" style="margin-bottom:6px;font-size:12px;">${escape(p.note)}</div>` : ''}
        <div class="meta">
          <span>${catLabels[p.cat] || p.cat}</span>
          ${dlText}
          <span style="margin-left:auto; display:flex; gap:6px;">
            ${p.fullContent ? `<button class="btn btn-sm btn-ghost" data-act="read">📖 อ่าน</button>` : ''}
            <button class="btn btn-sm btn-ghost" data-act="edit">แก้</button>
            <button class="btn btn-sm btn-ghost" data-act="del" style="color:var(--danger);">ลบ</button>
          </span>
        </div>
      </div>
    `;
  }).join('');
  bindPipelineDnD();
}

function bindPipelineDnD() {
  let dragging = null;
  $$('.task-card', $('#pipelineList')).forEach((card) => {
    card.addEventListener('dragstart', () => {
      dragging = card; card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => {
      dragging?.classList.remove('dragging');
      $$('.task-card').forEach((c) => c.classList.remove('drag-over'));
      dragging = null;
    });
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!dragging || dragging === card) return;
      card.classList.add('drag-over');
    });
    card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      if (!dragging || dragging === card) return;
      const fromId = Number(dragging.dataset.id);
      const toId = Number(card.dataset.id);
      const fromIdx = DATA.pipeline.findIndex((p) => p.id === fromId);
      const toIdx = DATA.pipeline.findIndex((p) => p.id === toId);
      const [item] = DATA.pipeline.splice(fromIdx, 1);
      DATA.pipeline.splice(toIdx, 0, item);
      save(); renderPipeline();
    });
  });
}

$('#pipelineList')?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const id = Number(btn.closest('[data-id]').dataset.id);
  const idx = DATA.pipeline.findIndex((p) => p.id === id);
  if (btn.dataset.act === 'del') {
    if (!confirm('ลบรายการนี้?')) return;
    DATA.pipeline.splice(idx, 1); save(); renderPipeline(); toast('ลบแล้ว');
  } else if (btn.dataset.act === 'edit') {
    openPipelineModal(DATA.pipeline[idx]);
  } else if (btn.dataset.act === 'read') {
    const item = DATA.pipeline[idx];
    openModal(
      item.title,
      `<div style="max-height:65vh;overflow-y:auto;white-space:pre-wrap;font-size:16px;line-height:1.9;color:var(--text);font-family:inherit;">${item.fullContent.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`,
      () => {},
      () => { $('#modalConfirm').textContent = 'ปิด'; }
    );
  }
});

$$('#catTabs .cat-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    $$('#catTabs .cat-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    DATA.uiState.activeCat = tab.dataset.cat;
    save(); renderPipeline();
  });
});

$('#addPipelineBtn').addEventListener('click', () => openPipelineModal(null));

function openPipelineModal(item) {
  const isEdit = !!item;
  openModal(isEdit ? 'แก้ไขงาน' : 'เพิ่มงาน', `
    <div class="text-mute">หมวด</div>
    <select class="field" id="pCat">
      <option value="cfa">📚 CFA</option>
      <option value="investment">💹 บลจ.</option>
      <option value="freelance">💼 Freelance</option>
      <option value="personal">🌱 Personal</option>
    </select>
    <div class="text-mute mt-sm">ชื่อ</div>
    <input class="field" type="text" id="pTitle" />
    <div class="text-mute mt-sm">หมายเหตุ (ไม่บังคับ)</div>
    <input class="field" type="text" id="pNote" />
    <div class="text-mute mt-sm">Deadline (ไม่บังคับ)</div>
    <input class="field" type="date" id="pDl" />
  `, () => {
    const cat = $('#pCat').value;
    const title = $('#pTitle').value.trim();
    const note = $('#pNote').value.trim();
    const deadline = $('#pDl').value;
    if (!title) return false;
    if (isEdit) Object.assign(item, { cat, title, note, deadline });
    else DATA.pipeline.push({ id: uid(), cat, title, note, deadline, done: false });
    save(); renderPipeline(); toast(isEdit ? 'แก้แล้ว' : 'เพิ่มแล้ว');
  }, () => {
    if (item) {
      $('#pCat').value = item.cat;
      $('#pTitle').value = item.title;
      $('#pNote').value = item.note || '';
      $('#pDl').value = item.deadline || '';
    }
  });
}

/* ---------- MEALS PAGE ---------- */
function renderWeeklyMeals() {
  const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
  const wm = DATA.weeklyMeals || {};
  $('#weeklyMeals').innerHTML = days.map((d) => {
    const m = wm[d] || {};
    return `
      <div class="meal-card" style="margin-bottom:8px;">
        <div class="label">${d}</div>
        <div class="row" style="gap:6px; flex-wrap:wrap; margin-top:6px;">
          <input class="field" data-day="${d}" data-k="breakfast" placeholder="เช้า" value="${escapeAttr(m.breakfast || '')}" />
          <input class="field" data-day="${d}" data-k="lunch" placeholder="กลางวัน" value="${escapeAttr(m.lunch || '')}" />
          <input class="field" data-day="${d}" data-k="dinner" placeholder="เย็น" value="${escapeAttr(m.dinner || '')}" />
        </div>
      </div>
    `;
  }).join('');
  $$('#weeklyMeals input').forEach((inp) => {
    inp.addEventListener('change', () => {
      const d = inp.dataset.day, k = inp.dataset.k;
      DATA.weeklyMeals[d] = DATA.weeklyMeals[d] || {};
      DATA.weeklyMeals[d][k] = inp.value;
      save();
    });
  });
}

function renderRecipes() {
  const root = $('#recipeList');
  if (!DATA.recipes.length) {
    root.innerHTML = '<div class="text-mute" style="padding:12px;text-align:center;">ยังไม่มีสูตร</div>';
    return;
  }
  const groups = [
    { key: 'breakfast', label: '🌅 เช้า — protein + complex carb' },
    { key: 'lunch', label: '☀️ กลางวัน — protein + veggies' },
    { key: 'dinner', label: '🌙 เย็น — เบาๆ protein + veggies' },
    { key: 'snack', label: '🍎 ของว่าง' }
  ];
  root.innerHTML = groups.map((g) => {
    const items = DATA.recipes.filter((r) => (r.meal || 'snack') === g.key);
    if (!items.length) return '';
    return `
      <div class="text-mute" style="margin: 12px 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${g.label}</div>
      ${items.map((r) => `
        <div class="task-card" data-id="${r.id}">
          <div class="title"><span>${escape(r.name)}</span></div>
          ${r.note ? `<div class="text-dim">${escape(r.note)}</div>` : ''}
          <div class="meta mt-sm">
            <span style="margin-left:auto; display:flex; gap:6px;">
              <button class="btn btn-sm btn-ghost" data-act="del" style="color:var(--danger);">ลบ</button>
            </span>
          </div>
        </div>
      `).join('')}
    `;
  }).join('');
  root.onclick = (e) => {
    const btn = e.target.closest('[data-act="del"]');
    if (!btn) return;
    const id = Number(btn.closest('[data-id]').dataset.id);
    DATA.recipes = DATA.recipes.filter((r) => r.id !== id);
    save(); renderRecipes(); toast('ลบแล้ว');
  };
}

$('#addRecipeBtn').addEventListener('click', () => {
  openModal('เพิ่มเมนูอาหาร', `
    <div class="text-mute">มื้อ</div>
    <select class="field" id="rMeal">
      <option value="breakfast">🌅 เช้า</option>
      <option value="lunch">☀️ กลางวัน</option>
      <option value="dinner">🌙 เย็น</option>
      <option value="snack">🍎 ของว่าง</option>
    </select>
    <div class="text-mute mt-sm">ชื่ออาหาร</div>
    <input class="field" type="text" id="rName" placeholder="เช่น อกไก่ย่าง + สลัด" />
    <div class="text-mute mt-sm">หมายเหตุ (ไม่บังคับ)</div>
    <input class="field" type="text" id="rNote" />
  `, () => {
    const name = $('#rName').value.trim();
    if (!name) return false;
    DATA.recipes.push({ id: uid(), name, meal: $('#rMeal').value, note: $('#rNote').value.trim() });
    save(); renderRecipes(); toast('เพิ่มแล้ว');
  });
});

/* ---------- WATER ---------- */
function getTodayWater() {
  const t = TODAY_KEY();
  if (typeof DATA.water[t] !== 'number') DATA.water[t] = 0;
  return DATA.water[t];
}

function renderWater() {
  const filled = getTodayWater();
  const grid = $('#waterGrid');
  grid.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const cup = document.createElement('div');
    cup.className = 'water-cup' + (i < filled ? ' filled' : '');
    cup.textContent = i < filled ? '💧' : '🥛';
    cup.addEventListener('click', () => {
      const cur = getTodayWater();
      DATA.water[TODAY_KEY()] = (i < cur) ? i : i + 1;
      save(); renderWater(); updateTodayStats();
    });
    grid.appendChild(cup);
  }
}

$('#resetWaterBtn').addEventListener('click', () => {
  DATA.water[TODAY_KEY()] = 0; save(); renderWater(); updateTodayStats(); toast('รีเซ็ตน้ำดื่ม');
});

/* ---------- WELLNESS ---------- */
function getTodaySleep() {
  const t = TODAY_KEY();
  if (!DATA.sleep[t]) DATA.sleep[t] = { start: '', end: '' };
  return DATA.sleep[t];
}

function calcSleep() {
  const s = getTodaySleep();
  if (!s.start || !s.end) { $('#sleepTotal').textContent = '— ชม.'; return; }
  const [sh, sm] = s.start.split(':').map(Number);
  const [eh, em] = s.end.split(':').map(Number);
  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  $('#sleepTotal').textContent = `${(mins / 60).toFixed(1)} ชม.`;
}

['sleepStart', 'sleepEnd'].forEach((id) => {
  $(`#${id}`).addEventListener('change', () => {
    const s = getTodaySleep();
    if (id === 'sleepStart') s.start = $('#sleepStart').value;
    else s.end = $('#sleepEnd').value;
    save(); calcSleep();
  });
});

function renderSleepInputs() {
  const s = getTodaySleep();
  $('#sleepStart').value = s.start || '';
  $('#sleepEnd').value = s.end || '';
  calcSleep();
}

/* MOOD */
const MOODS = ['😞', '😐', '🙂', '😊', '🤩'];

function renderMood() {
  const today = TODAY_KEY();
  if (!DATA.mood[today]) DATA.mood[today] = { morning: null, evening: null };
  const m = DATA.mood[today];
  $$('.mood-row').forEach((row) => {
    const time = row.dataset.mood;
    row.innerHTML = MOODS.map((emoji, i) => `
      <button class="mood-btn ${m[time] === i ? 'selected' : ''}" data-i="${i}">${emoji}</button>
    `).join('');
    row.querySelectorAll('.mood-btn').forEach((b) => {
      b.addEventListener('click', () => {
        m[time] = Number(b.dataset.i);
        save(); renderMood();
      });
    });
  });
}

/* WORK HOURS */
function getTodayWork() {
  const t = TODAY_KEY();
  if (typeof DATA.workHours[t] !== 'number') DATA.workHours[t] = 0;
  return DATA.workHours[t];
}

function renderWork() {
  const h = getTodayWork();
  $('#workBadge').textContent = h.toFixed(1) + 'h';
  $('#statWork').textContent = h.toFixed(1) + 'h';
  const warn = $('#workWarn');
  if (h > 8) warn.innerHTML = `<div style="background: var(--danger); color:white; padding:10px; border-radius:8px; font-size:13px;">⚠️ ทำงานเกิน 8 ชม. แล้ว — พักหน่อยนะ</div>`;
  else if (h >= 7) warn.innerHTML = `<div style="background: var(--warn); color:black; padding:10px; border-radius:8px; font-size:13px;">⏰ ใกล้ครบ 8 ชม. — เตรียมพัก</div>`;
  else warn.innerHTML = '';
}

$('#logWorkBtn').addEventListener('click', () => {
  const v = Number($('#workHoursInput').value) || 0;
  if (v <= 0) return;
  DATA.workHours[TODAY_KEY()] = getTodayWork() + v;
  $('#workHoursInput').value = '';
  save(); renderWork(); toast(`+${v} ชม.`);
});

/* MEAL COMPLETION (count meals logged today) */
function renderMealCompletion() {
  const m = getTodayMeals();
  const main = ['breakfast', 'lunch', 'dinner'];
  const done = main.filter((k) => (m[k] || '').trim().length > 0).length;
  const root = $('#mealCompletion');
  if (!root) return;
  const labels = { breakfast: 'เช้า', lunch: 'กลางวัน', dinner: 'เย็น' };
  root.innerHTML = `
    <div class="row" style="gap:8px;flex-wrap:wrap;justify-content:space-between;">
      <div class="text-dim">มื้อหลักวันนี้</div>
      <div style="font-weight:600;color:${done === 3 ? 'var(--accent)' : 'var(--text)'};">${done} / 3 ${done === 3 ? '✓' : ''}</div>
    </div>
    <div class="row mt-sm" style="gap:6px;flex-wrap:wrap;">
      ${main.map((k) => {
        const ok = (m[k] || '').trim().length > 0;
        return `<span style="padding:4px 10px;border-radius:999px;font-size:12px;background:${ok ? 'var(--accent-glow)' : 'var(--bg-elev-2)'};color:${ok ? 'var(--accent)' : 'var(--text-mute)'};">${ok ? '✓' : '○'} ${labels[k]}</span>`;
      }).join('')}
    </div>
  `;
}

/* ---------- GOALS ---------- */
function renderCfaRoadmap() {
  const root = $('#cfaRoadmap');
  root.innerHTML = DATA.cfaRoadmap.map((g) => `
    <div class="goal-card" data-id="${g.id}">
      <div class="head">
        <div class="title"><span class="text-dim" style="font-size:11px;font-weight:500;">${g.level}</span><br/>${escape(g.topic)}</div>
        <div class="pct">${g.progress}%</div>
      </div>
      <div class="progress"><div class="progress-fill" style="width:${g.progress}%"></div></div>
      <div class="row mt-sm" style="gap:6px;">
        <button class="btn btn-sm btn-ghost" data-act="dec">−10</button>
        <button class="btn btn-sm btn-ghost" data-act="inc">+10</button>
      </div>
    </div>
  `).join('');
  root.onclick = (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = Number(btn.closest('[data-id]').dataset.id);
    const g = DATA.cfaRoadmap.find((x) => x.id === id);
    g.progress = Math.max(0, Math.min(100, g.progress + (btn.dataset.act === 'inc' ? 10 : -10)));
    save(); renderCfaRoadmap();
  };
}

function renderContentGoals() {
  const root = $('#contentGoals');
  if (!DATA.contentGoals.length) { root.innerHTML = '<div class="text-mute" style="padding:12px;text-align:center;">ยังไม่มีเป้าหมาย</div>'; return; }
  root.innerHTML = DATA.contentGoals.map((g) => {
    const pct = Math.min(100, Math.round((g.current / g.target) * 100)) || 0;
    return `
      <div class="goal-card" data-id="${g.id}">
        <div class="head">
          <div class="title">${escape(g.title)}</div>
          <div class="pct">${g.current.toLocaleString()} / ${g.target.toLocaleString()} (${pct}%)</div>
        </div>
        <div class="progress"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="row mt-sm" style="gap:6px;">
          <input class="field" type="number" placeholder="อัพเดทค่าปัจจุบัน" data-input="cur" />
          <button class="btn btn-sm" data-act="set">บันทึก</button>
          <button class="btn btn-sm btn-ghost" data-act="del" style="color:var(--danger);">ลบ</button>
        </div>
      </div>
    `;
  }).join('');
  root.onclick = (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const card = btn.closest('[data-id]');
    const id = Number(card.dataset.id);
    if (btn.dataset.act === 'set') {
      const v = Number(card.querySelector('[data-input="cur"]').value);
      if (Number.isFinite(v)) {
        const g = DATA.contentGoals.find((x) => x.id === id);
        g.current = v; save(); renderContentGoals(); toast('บันทึก');
      }
    } else if (btn.dataset.act === 'del') {
      DATA.contentGoals = DATA.contentGoals.filter((x) => x.id !== id);
      save(); renderContentGoals(); toast('ลบแล้ว');
    }
  };
}

$('#addContentGoalBtn').addEventListener('click', () => {
  openModal('เพิ่มเป้าหมาย Content', `
    <input class="field" type="text" id="cgTitle" placeholder="ชื่อเป้าหมาย" />
    <input class="field mt-sm" type="number" id="cgTarget" placeholder="เป้า (ตัวเลข)" />
  `, () => {
    const title = $('#cgTitle').value.trim();
    const target = Number($('#cgTarget').value);
    if (!title || target <= 0) return false;
    DATA.contentGoals.push({ id: uid(), title, target, current: 0 });
    save(); renderContentGoals(); toast('เพิ่มแล้ว');
  });
});

function renderPersonalGoals() {
  const root = $('#personalGoals');
  if (!DATA.personalGoals.length) { root.innerHTML = '<div class="text-mute" style="padding:12px;text-align:center;">ยังไม่มีเป้าหมาย</div>'; return; }
  root.innerHTML = DATA.personalGoals.map((g) => {
    const pct = Math.min(100, Math.round((g.current / g.target) * 100)) || 0;
    return `
      <div class="goal-card" data-id="${g.id}">
        <div class="head">
          <div class="title">${escape(g.title)}</div>
          <div class="pct">${g.current} / ${g.target} (${pct}%)</div>
        </div>
        <div class="progress"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="row mt-sm" style="gap:6px;">
          <button class="btn btn-sm btn-ghost" data-act="dec">−1</button>
          <button class="btn btn-sm btn-ghost" data-act="inc">+1</button>
          <button class="btn btn-sm btn-ghost" data-act="del" style="margin-left:auto;color:var(--danger);">ลบ</button>
        </div>
      </div>
    `;
  }).join('');
  root.onclick = (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = Number(btn.closest('[data-id]').dataset.id);
    const g = DATA.personalGoals.find((x) => x.id === id);
    if (btn.dataset.act === 'inc') g.current = Math.min(g.target, g.current + 1);
    else if (btn.dataset.act === 'dec') g.current = Math.max(0, g.current - 1);
    else if (btn.dataset.act === 'del') DATA.personalGoals = DATA.personalGoals.filter((x) => x.id !== id);
    save(); renderPersonalGoals();
  };
}

$('#addPersonalGoalBtn').addEventListener('click', () => {
  openModal('เพิ่มเป้าหมายส่วนตัว', `
    <input class="field" type="text" id="pgTitle" placeholder="ชื่อเป้าหมาย" />
    <input class="field mt-sm" type="number" id="pgTarget" placeholder="เป้า" />
  `, () => {
    const title = $('#pgTitle').value.trim();
    const target = Number($('#pgTarget').value);
    if (!title || target <= 0) return false;
    DATA.personalGoals.push({ id: uid(), title, target, current: 0 });
    save(); renderPersonalGoals(); toast('เพิ่มแล้ว');
  });
});

$('#saveReviewBtn').addEventListener('click', () => {
  DATA.monthlyReview = $('#monthlyReview').value;
  save(); toast('บันทึก Review แล้ว');
});

/* ---------- MODAL ---------- */
let modalConfirmCb = null;

function openModal(title, bodyHTML, onConfirm, afterRender) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = bodyHTML;
  $('#modal').classList.add('open');
  modalConfirmCb = onConfirm;
  if (afterRender) afterRender();
  setTimeout(() => $('#modalBody input,#modalBody select,#modalBody textarea')?.focus?.(), 50);
}

function closeModal() {
  $('#modal').classList.remove('open');
  modalConfirmCb = null;
}

$('#modalCancel').addEventListener('click', closeModal);
$('#modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});
$('#modalConfirm').addEventListener('click', () => {
  if (modalConfirmCb) {
    const r = modalConfirmCb();
    if (r === false) return;
  }
  closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Enter' && $('#modal').classList.contains('open') && e.target.tagName !== 'TEXTAREA') {
    $('#modalConfirm').click();
  }
});

/* ---------- AI ASSISTANT ---------- */
const AI_TEMPLATES = [
  'ช่วยจัดตารางวันนี้ให้หน่อย เป้าหมาย: ___',
  'ช่วยวางแผน CFA Level 1 (เหลือเวลา ___ เดือน)',
  'ช่วยคิดไอเดียคลิป YouTube สาย CFA/Investment 5 ไอเดีย',
  'วิเคราะห์งานใน pipeline ของผม แนะนำลำดับความสำคัญ',
  'ช่วยรีวิวสุขภาพสัปดาห์นี้ (sleep, mood, exercise)'
];

function buildAIContext() {
  const t = TODAY_KEY();
  const tb = (DATA.timeBlocks[t] || []).map((b) => `- ${b.time} ${b.task}${b.done ? ' [DONE]' : ''}`).join('\n');
  const cfa = (DATA.cfaToday[t] || []).map((c) => `- ${c.topic}${c.done ? ' [DONE]' : ''}`).join('\n');
  const clips = (DATA.clipsToday[t] || []).map((c) => `- ${c.title} (${c.stage || ''})`).join('\n');
  const pipe = DATA.pipeline.slice(0, 10).map((p) => `- [${p.cat}] ${p.title}${p.deadline ? ' (deadline ' + p.deadline + ')' : ''}`).join('\n');
  return `วันที่: ${t}

TODAY:
${tb || '(ว่าง)'}

CFA วันนี้:
${cfa || '(ว่าง)'}

คลิปวันนี้:
${clips || '(ว่าง)'}

PIPELINE (top 10):
${pipe || '(ว่าง)'}

WATER: ${getTodayWater()}/8
WORK HOURS: ${getTodayWork()}h`;
}

function openAI() {
  const ctxStr = buildAIContext();
  openModal('🤖 AI Assistant', `
    <div class="text-mute">เลือก template หรือพิมพ์คำถามเอง</div>
    <select class="field mt-sm" id="aiTpl">
      ${AI_TEMPLATES.map((t, i) => `<option value="${i}">${t}</option>`).join('')}
      <option value="-1">— พิมพ์เอง —</option>
    </select>
    <textarea class="field mt-sm" id="aiPrompt" placeholder="พิมพ์คำถาม..."></textarea>
    <div class="text-mute mt-sm">Context (ส่งไปด้วยอัตโนมัติ)</div>
    <textarea class="field" id="aiCtx" readonly style="min-height:100px;font-size:12px;font-family:monospace;">${ctxStr}</textarea>
    <div class="row mt" style="gap:6px;flex-wrap:wrap;">
      <button class="btn btn-sm" id="aiCopy">📋 Copy ไป Claude</button>
      <button class="btn btn-sm btn-ghost" id="aiPaste">📥 Paste ผลลัพธ์</button>
    </div>
    <div class="text-mute mt-sm">วาง response ที่ได้จาก Claude ที่นี่:</div>
    <textarea class="field" id="aiResp" placeholder="วางคำตอบที่ได้จาก Claude..." style="min-height:120px;"></textarea>
  `, () => {
    closeModal();
  }, () => {
    $('#aiTpl').addEventListener('change', () => {
      const i = Number($('#aiTpl').value);
      $('#aiPrompt').value = i >= 0 ? AI_TEMPLATES[i] : '';
    });
    $('#aiPrompt').value = AI_TEMPLATES[0];

    $('#aiCopy').addEventListener('click', async () => {
      const full = `${$('#aiPrompt').value}\n\n--- CONTEXT ---\n${ctxStr}`;
      try {
        await navigator.clipboard.writeText(full);
        toast('📋 Copy แล้ว — เปิด Claude แล้ววาง');
      } catch (e) {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = full; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        toast('Copy แล้ว');
      }
    });

    $('#aiPaste').addEventListener('click', async () => {
      try {
        const txt = await navigator.clipboard.readText();
        $('#aiResp').value = txt;
        toast('Paste แล้ว');
      } catch (e) { toast('ต้อง paste ด้วย Ctrl+V'); }
    });
  });
}

$('#aiBtn').addEventListener('click', openAI);
$('#aiBtnSide').addEventListener('click', openAI);

/* ---------- EXPORT / IMPORT ---------- */
function exportData() {
  const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `life-os-backup-${TODAY_KEY()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Export แล้ว');
}

function importData() {
  $('#importFile').click();
}

$('#importFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const obj = JSON.parse(reader.result);
      if (!confirm('ยืนยันการ import? ข้อมูลปัจจุบันจะถูกแทนที่')) return;
      DATA = obj;
      save();
      renderAll();
      toast('Import สำเร็จ');
    } catch (err) { toast('ไฟล์ไม่ถูกต้อง'); }
  };
  reader.readAsText(file);
  e.target.value = '';
});

/* ---------- AGENT INBOX ---------- */
async function checkInbox() {
  let items;
  try {
    const res = await fetch('./inbox.json?t=' + Date.now());
    if (!res.ok) throw new Error('not found');
    items = await res.json();
  } catch {
    toast('ไม่พบ inbox.json');
    return;
  }

  if (!Array.isArray(DATA.importedInboxIds)) DATA.importedInboxIds = [];
  const pending = items.filter((i) => i.id && !DATA.importedInboxIds.includes(i.id));

  if (!pending.length) { toast('ไม่มีงานใหม่จาก Agents'); return; }

  function hesc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  const groups = [
    { label: '💹 บลจ. — Investment Team', items: pending.filter(i => i.cat === 'investment') },
    { label: '💼 Content Team',           items: pending.filter(i => i.cat === 'freelance') },
    { label: '📋 อื่นๆ',                   items: pending.filter(i => i.cat !== 'investment' && i.cat !== 'freelance') }
  ].filter(g => g.items.length);

  const renderGroup = (g) => `
    <div style="margin-bottom:16px;">
      <div style="font-size:12px;font-weight:700;color:var(--accent);letter-spacing:.5px;padding-bottom:6px;margin-bottom:8px;border-bottom:1px solid var(--border);">
        ${g.label} · ${g.items.length} รายการ
      </div>
      ${g.items.map(item => {
        const idx = pending.indexOf(item);
        return `
          <div style="background:var(--surface2);border-radius:8px;padding:10px 12px;margin-bottom:8px;">
            <div style="font-weight:600;margin-bottom:3px;">${hesc(item.title)}</div>
            <div style="font-size:11px;color:var(--text-mute);white-space:pre-line;margin-bottom:6px;">${hesc(item.note||'')}</div>
            ${item.fullContent ? `<button class="btn btn-ghost" style="font-size:11px;padding:2px 10px;" data-itoggle="${idx}">📖 อ่านเนื้อหา</button>
            <div id="ic${idx}" style="display:none;margin-top:8px;max-height:320px;overflow-y:auto;background:var(--surface);border-radius:6px;padding:12px;white-space:pre-wrap;font-size:16px;line-height:1.9;color:var(--text);">${hesc(item.fullContent)}</div>` : ''}
          </div>`;
      }).join('')}
    </div>`;

  openModal(
    `📥 Inbox — ${pending.length} รายการใหม่`,
    `<div style="max-height:440px;overflow-y:auto;padding-right:2px;">${groups.map(renderGroup).join('')}</div>`,
    () => {
      pending.forEach(i => {
        DATA.pipeline.push({ id: uid(), cat: i.cat || 'investment', title: i.title, note: i.note || '', deadline: i.deadline || '', done: false, fullContent: i.fullContent || '' });
        DATA.importedInboxIds.push(i.id);
      });
      save(); renderPipeline();
      toast(`เพิ่ม ${pending.length} รายการเข้า Pipeline แล้ว`);
      updateInboxBadge(items);
    },
    () => {
      $('#modalConfirm').textContent = `เพิ่ม ${pending.length} รายการเข้า Pipeline`;
      $('#modalBody').addEventListener('click', e => {
        const btn = e.target.closest('[data-itoggle]');
        if (!btn) return;
        const div = document.getElementById('ic' + btn.dataset.itoggle);
        if (!div) return;
        const open = div.style.display !== 'none';
        div.style.display = open ? 'none' : 'block';
        btn.textContent = open ? '📖 อ่านเนื้อหา' : '📕 ซ่อน';
      });
    }
  );
}

async function updateInboxBadge(items) {
  const badges = $$('.inbox-badge');
  if (!badges.length) return;
  try {
    const src = items || await (await fetch('./inbox.json?t=' + Date.now())).json();
    if (!Array.isArray(DATA.importedInboxIds)) DATA.importedInboxIds = [];
    const count = src.filter((i) => i.id && !DATA.importedInboxIds.includes(i.id)).length;
    badges.forEach(b => { b.textContent = count || ''; b.style.display = count ? 'inline-block' : 'none'; });
  } catch { badges.forEach(b => b.style.display = 'none'); }
}

$('#exportBtnSide').addEventListener('click', exportData);
$('#importBtnSide').addEventListener('click', importData);
$$('.inbox-trigger').forEach(btn => btn.addEventListener('click', checkInbox));
updateInboxBadge();

// sync fullContent เข้า pipeline items ที่ยังไม่มี (background, ไม่รบกวน UI)
(async () => {
  try {
    const src = await (await fetch('./inbox.json?t=' + Date.now())).json();
    if (!Array.isArray(src)) return;
    let changed = false;
    DATA.pipeline.forEach(p => {
      if (p.fullContent) return;
      const match = src.find(i => i.title === p.title && i.fullContent);
      if (match) { p.fullContent = match.fullContent; changed = true; }
    });
    if (changed) { save(); renderPipeline(); }
  } catch { /* silent */ }
})();

$('#menuBtn').addEventListener('click', () => {
  openModal('เมนู', `
    <div class="row" style="flex-direction:column; gap:8px;">
      <button class="btn btn-ghost" id="mExport">⬇️ Export ข้อมูล (JSON)</button>
      <button class="btn btn-ghost" id="mImport">⬆️ Import ข้อมูล</button>
      <button class="btn btn-ghost" id="mInstall">📲 ติดตั้งเป็นแอพ</button>
      <button class="btn btn-ghost" id="mClear" style="color:var(--danger);">🗑️ ล้างข้อมูลทั้งหมด</button>
    </div>
  `, () => closeModal(), () => {
    $('#mExport').addEventListener('click', () => { closeModal(); exportData(); });
    $('#mImport').addEventListener('click', () => { closeModal(); importData(); });
    $('#mInstall').addEventListener('click', () => {
      closeModal();
      if (window.deferredInstall) window.deferredInstall.prompt();
      else toast('ไปที่เมนูเบราว์เซอร์ → "Add to Home Screen"');
    });
    $('#mClear').addEventListener('click', () => {
      if (!confirm('ลบข้อมูลทั้งหมด? ไม่สามารถกู้คืนได้')) return;
      localStorage.removeItem(STORE_KEY);
      DATA = loadData();
      renderAll();
      closeModal();
      toast('ล้างข้อมูลแล้ว');
    });
  });
});

/* PWA INSTALL */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredInstall = e;
});

/* ---------- FAB (context-aware) ---------- */
$('#fab').addEventListener('click', () => {
  const p = DATA.uiState.activePage;
  if (p === 'today') openTimeBlockModal(null);
  else if (p === 'pipeline') openPipelineModal(null);
  else if (p === 'meals') $('#addRecipeBtn').click();
  else if (p === 'goals') $('#addPersonalGoalBtn').click();
  else if (p === 'cfa-study') { /* no FAB action */ }
  else openTimeBlockModal(null);
});

/* ---------- NAV BINDINGS ---------- */
$$('.nav-btn[data-page]').forEach((b) => {
  b.addEventListener('click', () => goToPage(b.dataset.page));
});

/* ---------- PULL TO REFRESH (mobile) ---------- */
let touchStartY = 0;
let pulling = false;
document.addEventListener('touchstart', (e) => {
  if (window.scrollY === 0) touchStartY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener('touchmove', (e) => {
  if (window.scrollY === 0 && e.touches[0].clientY - touchStartY > 80) {
    pulling = true;
  }
}, { passive: true });
document.addEventListener('touchend', () => {
  if (pulling) {
    pulling = false;
    renderAll();
    toast('🔄 อัพเดท');
  }
});

/* ---------- SWIPE GESTURES (mobile) ---------- */
const PAGES = ['today', 'pipeline', 'meals', 'wellness', 'cfa-study', 'goals'];
let swipeStartX = 0, swipeStartY = 0;
document.addEventListener('touchstart', (e) => {
  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener('touchend', (e) => {
  if (!e.changedTouches[0]) return;
  const dx = e.changedTouches[0].clientX - swipeStartX;
  const dy = e.changedTouches[0].clientY - swipeStartY;
  if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2) {
    const idx = PAGES.indexOf(DATA.uiState.activePage);
    if (dx < 0 && idx < PAGES.length - 1) goToPage(PAGES[idx + 1]);
    else if (dx > 0 && idx > 0) goToPage(PAGES[idx - 1]);
  }
});

/* ---------- ESCAPING ---------- */
function escape(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) { return escape(s); }

/* ---------- STATS ---------- */
function updateTodayStats() {
  $('#statWater').textContent = `${getTodayWater()}/8`;
}

/* ---------- RENDER ALL ---------- */
function renderAll() {
  $('#todayDate').textContent = fmtThaiDate();
  renderTimeBlocks();
  renderTodayMeals();
  renderCfaToday();
  renderClipsToday();
  renderPipeline();
  renderWeeklyMeals();
  renderRecipes();
  renderWater();
  renderSleepInputs();
  renderMood();
  renderWork();
  renderMealCompletion();
  renderCfaRoadmap();
  renderContentGoals();
  renderPersonalGoals();
  $('#monthlyReview').value = DATA.monthlyReview || '';
  updateTodayStats();
  goToPage(DATA.uiState.activePage || 'today');
  $$('#catTabs .cat-tab').forEach((t) => t.classList.toggle('active', t.dataset.cat === DATA.uiState.activeCat));
}

/* ---------- INIT ---------- */
bindTimeBlockActions();
renderAll();

/* URL params */
const params = new URLSearchParams(location.search);
if (params.get('page')) goToPage(params.get('page'));
if (params.get('ai') === '1') openAI();
