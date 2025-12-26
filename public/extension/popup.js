const DEFAULTS = {
    homeName: "111",
    bal: "1.22",
    delta: "-0.0274",
    pct: "-2.21",
    tokAmt: "0.01 SOL",
    tokUsd: "1.22",
    tokChg: "-0.03",
    badgeCount: "3",
    addr: "7fXB...Hin7",
    banner: "Meet Phantom Terminal, your new home for desktop trading",
    tokName: "Solana"
};

let currentData = { ...DEFAULTS };

function updateUI() {
    const data = currentData;
    
    // Display updates
    const homeNameEl = document.getElementById('disp-homeName');
    if (homeNameEl) homeNameEl.textContent = data.homeName;
    
    const balEl = document.getElementById('disp-bal');
    if (balEl) balEl.textContent = data.bal;
    
    const bannerEl = document.getElementById('disp-banner');
    if (bannerEl) bannerEl.textContent = data.banner;
    
    const badgeEl = document.getElementById('disp-badgeCount');
    if (badgeEl) badgeEl.textContent = data.badgeCount;
    
    const tokNameEl = document.getElementById('disp-tokName');
    if (tokNameEl) tokNameEl.textContent = data.tokName;
    
    // Delta
    const deltaStr = String(data.delta);
    const deltaVal = deltaStr.replace('-', '').replace('+', '');
    const isNegDelta = deltaStr.startsWith('-');
    const deltaDisp = document.getElementById('disp-delta');
    if (deltaDisp) deltaDisp.textContent = deltaVal;
    
    const deltaSign = document.getElementById('disp-delta-sign');
    if (deltaSign) deltaSign.textContent = isNegDelta ? "-$" : "+$";
    
    const deltaColor = document.getElementById('disp-delta-color');
    if (deltaColor) deltaColor.style.color = isNegDelta ? "var(--down-color)" : "var(--up-color)";
    
    // Pct
    const pctStr = String(data.pct);
    const pctVal = pctStr.replace('-', '').replace('+', '');
    const isNegPct = pctStr.startsWith('-');
    const pctDisp = document.getElementById('disp-pct');
    if (pctDisp) pctDisp.textContent = pctVal;
    
    const pctSign = document.getElementById('disp-pct-sign');
    if (pctSign) pctSign.textContent = isNegPct ? "-" : "+";
    
    const pctBadge = document.getElementById('disp-pct-badge');
    if (pctBadge) pctBadge.className = "pct-badge " + (isNegPct ? "" : "up");
    
    // Token
    const tokAmtEl = document.getElementById('disp-tokAmt');
    if (tokAmtEl) tokAmtEl.textContent = data.tokAmt;
    
    const tokUsdEl = document.getElementById('disp-tokUsd');
    if (tokUsdEl) tokUsdEl.textContent = data.tokUsd;
    
    const chgStr = String(data.tokChg);
    const chgVal = chgStr.replace('-', '').replace('+', '');
    const isNegChg = chgStr.startsWith('-');
    const tokChgDisp = document.getElementById('disp-tokChg');
    if (tokChgDisp) tokChgDisp.textContent = chgVal;
    
    const tokChgSign = document.getElementById('disp-tokChg-sign');
    if (tokChgSign) tokChgSign.textContent = isNegChg ? "-$" : "+$";
    
    const tokChgColor = document.getElementById('disp-tokChg-color');
    if (tokChgColor) tokChgColor.style.color = isNegChg ? "var(--down-color)" : "var(--up-color)";

    // Import PK screen address disp
    const importAddrDisp = document.getElementById('import-addr-disp');
    if (importAddrDisp) {
        importAddrDisp.textContent = data.addr;
    }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    if (id) {
        const target = document.getElementById(id);
        if (target) target.classList.add('active');
    }
}

function switchTab(tabId) {
    showScreen(null);
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById(tabId);
    if (tab) tab.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const navItem = document.querySelector(`[data-tab="${tabId}"]`);
    if (navItem) navItem.classList.add('active');
}

function openEditor() {
    const addrInput = document.getElementById('edit-addr');
    if (addrInput) addrInput.value = currentData.addr;
    
    const balInput = document.getElementById('edit-bal');
    if (balInput) balInput.value = currentData.bal;
    
    const deltaInput = document.getElementById('edit-delta');
    if (deltaInput) deltaInput.value = currentData.delta;
    
    const pctInput = document.getElementById('edit-pct');
    if (pctInput) pctInput.value = currentData.pct;
    
    const tokAmtInput = document.getElementById('edit-tokAmt');
    if (tokAmtInput) tokAmtInput.value = currentData.tokAmt;
    
    const tokUsdInput = document.getElementById('edit-tokUsd');
    if (tokUsdInput) tokUsdInput.value = currentData.tokUsd;
    
    const tokChgInput = document.getElementById('edit-tokChg');
    if (tokChgInput) tokChgInput.value = currentData.tokChg;
    
    const homeNameInput = document.getElementById('edit-homeName');
    if (homeNameInput) homeNameInput.value = currentData.homeName;
    
    const badgeInput = document.getElementById('edit-badgeCount');
    if (badgeInput) badgeInput.value = currentData.badgeCount;
    
    const tokNameInput = document.getElementById('edit-tokName');
    if (tokNameInput) tokNameInput.value = currentData.tokName;
    
    const bannerInput = document.getElementById('edit-banner');
    if (bannerInput) bannerInput.value = currentData.banner;
    
    showScreen('s-editor');
}

function saveData() {
    currentData = {
        ...currentData,
        addr: document.getElementById('edit-addr').value,
        bal: document.getElementById('edit-bal').value,
        delta: document.getElementById('edit-delta').value,
        pct: document.getElementById('edit-pct').value,
        tokAmt: document.getElementById('edit-tokAmt').value,
        tokUsd: document.getElementById('edit-tokUsd').value,
        tokChg: document.getElementById('edit-tokChg').value,
        homeName: document.getElementById('edit-homeName').value,
        badgeCount: document.getElementById('edit-badgeCount').value,
        tokName: document.getElementById('edit-tokName').value,
        banner: document.getElementById('edit-banner').value,
    };
    
    updateUI();
    showScreen(null);
    switchTab('tab-home');
    
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ mockData: currentData });
    } else {
        localStorage.setItem('phantom_mock_data', JSON.stringify(currentData));
    }
}

window.onload = () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['mockData'], (res) => {
            if (res.mockData) {
                currentData = { ...DEFAULTS, ...res.mockData };
                updateUI();
            }
        });
    } else {
        const saved = localStorage.getItem('phantom_mock_data');
        if (saved) {
            currentData = { ...DEFAULTS, ...JSON.parse(saved) };
            updateUI();
        }
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            switchTab(item.getAttribute('data-tab'));
        });
    });

    document.getElementById('btn-s1-close')?.addEventListener('click', () => showScreen(null));
    document.getElementById('btn-s1-close-bottom')?.addEventListener('click', () => showScreen(null));
    document.getElementById('badge-account')?.addEventListener('click', () => showScreen('s1'));
    
    document.getElementById('item-import-phrase')?.addEventListener('click', () => openEditor());
    document.getElementById('item-import-pk')?.addEventListener('click', () => showScreen('s-import-pk'));
    
    document.getElementById('import-key')?.addEventListener('input', (e) => {
        const val = e.target.value;
        const addrRow = document.getElementById('import-addr-row');
        if (addrRow) addrRow.style.display = val ? 'flex' : 'none';
    });

    document.getElementById('btn-import-pk-action')?.addEventListener('click', () => {
        showScreen(null);
        switchTab('tab-home');
    });

    document.getElementById('banner-close')?.addEventListener('click', (e) => {
        const banner = document.getElementById('banner');
        if (banner) banner.style.display = 'none';
    });
    document.getElementById('btn-editor-back')?.addEventListener('click', () => showScreen('s1'));
    document.getElementById('btn-save')?.addEventListener('click', () => saveData());

    updateUI();
};