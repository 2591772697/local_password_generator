const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const EXCLUDE_SPOKEN = new Set("lI1oO0B8S5Z2g9qG6T7".split(""));
const EXCLUDE_SIMILAR = new Set("lI1|0Oo5Ss8B2Zz6G9gq".split(""));
const EXCLUDE_MOBILE = new Set([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ..."!@#$%^&*()-_=+[]{};:,.?/~`\"\\|<>"]);

const $ = id => document.getElementById(id);
const els = {
    length: $("length"),
    pinLength: $("pinLength"),
    count: $("count"),
    lower: $("lower"),
    upper: $("upper"),
    digits: $("digits"),
    special: $("special"),
    specialChars: $("specialChars"),
    easySpeak: $("easySpeak"),
    easyRead: $("easyRead"),
    easyMobile: $("easyMobile"),
    output: $("output"),
    error: $("error"),
    stats: $("stats"),
    summaryChip: $("summaryChip"),
    poolChip: $("poolChip"),
    strengthPanel: $("strengthPanel"),
    strengthScore: $("strengthScore"),
    strengthBar: $("strengthBar"),
    strengthDetails: $("strengthDetails"),
    modePassword: $("modePassword"),
    modePin: $("modePin"),
    pwLengthPanel: $("pwLengthPanel"),
    pinLengthPanel: $("pinLengthPanel"),
    charsetPanel: $("charsetPanel"),
    advancedPanel: $("advancedPanel"),
    lengthHint: $("lengthHint"),
    filterHint: $("filterHint")
};
let currentMode = 'password';

// ===== 新增：智能手机简单模式互斥逻辑 =====
function enforceMobileSimple() {
    // 仅在普通密码模式下生效
    if (currentMode !== 'password') return;

    const mobile = els.easyMobile.checked;
    const special = els.special.checked;
    const upper = els.upper.checked;

    // 如果开启简单模式，且特殊和大写同时勾选 → 取消大写（保留特殊）
    if (mobile && special && upper) {
        els.upper.checked = false;
        els.filterHint.textContent = "📱 智能手机简单模式下，大写字母已自动取消（与特殊字符互斥）。";
        els.filterHint.className = "hint warn";
    } 
    // 如果关闭简单模式，清除相关提示
    else if (!mobile) {
        if (els.filterHint.textContent.includes("智能手机简单模式") || 
            els.filterHint.textContent.includes("大写字母已自动取消")) {
            els.filterHint.textContent = "";
            els.filterHint.className = "hint";
        }
    }
    // 如果简单模式开启但不同时勾选特殊和大写，提示可清除
    else if (mobile && !(special && upper)) {
        // 可能之前有提示，但现在是合法状态，清除提示
        if (els.filterHint.textContent.includes("大写字母已自动取消")) {
            els.filterHint.textContent = "";
            els.filterHint.className = "hint";
        }
    }
}

// 在相关复选框变化时调用
function handleCheckboxChange(e) {
    // 先执行互斥调整
    enforceMobileSimple();
    // 特殊字符toggle
    if (e.target === els.special) {
        els.specialChars.disabled = !els.special.checked;
    }
    // 生成新密码
    generate();
}

// ---- 以下为原 V6 核心函数（未改动，仅提取） ----
function randomInt(maxExclusive) {
    if (maxExclusive <= 0) return 0;
    if (maxExclusive > 0x100000000) throw new Error("随机范围过大");
    const arr = new Uint32Array(1);
    const limit = 0x100000000 - (0x100000000 % maxExclusive);
    let x;
    do { crypto.getRandomValues(arr); x = arr[0]; } while (x >= limit);
    return x % maxExclusive;
}

function randomChar(str) { return str[randomInt(str.length)]; }

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function clampInt(value, min, max, fallback) {
    const n = parseInt(value, 10);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, n));
}

function setMode(mode) {
    currentMode = mode;
    if (mode === 'password') {
        els.modePassword.classList.add('active');
        els.modePin.classList.remove('active');
        els.pwLengthPanel.classList.remove('hidden');
        els.pinLengthPanel.classList.add('hidden');
        els.charsetPanel.classList.remove('hidden');
        els.advancedPanel.classList.remove('hidden');
    } else {
        els.modePin.classList.add('active');
        els.modePassword.classList.remove('active');
        els.pwLengthPanel.classList.add('hidden');
        els.pinLengthPanel.classList.remove('hidden');
        els.charsetPanel.classList.add('hidden');
        els.advancedPanel.classList.add('hidden');
    }
    // 切换模式时重新执行互斥检查（针对密码模式）
    enforceMobileSimple();
    generate();
}

function buildPool() {
    let pool = "";
    const categories = [];
    if (els.lower.checked) { pool += LOWER; categories.push({ name: "小写", chars: LOWER }); }
    if (els.upper.checked) { pool += UPPER; categories.push({ name: "大写", chars: UPPER }); }
    if (els.digits.checked) { pool += DIGITS; categories.push({ name: "数字", chars: DIGITS }); }
    if (els.special.checked) {
        const s = els.specialChars.value;
        if (!s.length) throw new Error("你勾选了特殊字符，但字符内容为空。");
        pool += s;
        categories.push({ name: "特殊字符", chars: s });
    }
    if (!pool.length) throw new Error("请至少选择一种字符集。");
    return { pool, categories };
}

function applyFilters(pool, categories) {
    const exclude = new Set();
    if (els.easySpeak.checked) EXCLUDE_SPOKEN.forEach(c => exclude.add(c));
    if (els.easyRead.checked) EXCLUDE_SIMILAR.forEach(c => exclude.add(c));
    if (els.easyMobile.checked) EXCLUDE_MOBILE.forEach(c => exclude.add(c));
    if (!exclude.size) return { pool, categories, removed: [] };
    const filteredPool = pool.split('').filter(c => !exclude.has(c)).join('');
    const removed = [];
    const filteredCategories = categories.map(cat => {
        const filteredChars = cat.chars.split('').filter(c => !exclude.has(c)).join('');
        return { name: cat.name, chars: filteredChars };
    }).filter(cat => {
        if (cat.chars.length === 0) { removed.push(cat.name); return false; }
        return true;
    });
    if (!filteredPool.length) throw new Error("高级选项过滤后没有可用字符，请调整选项。");
    if (!filteredCategories.length) throw new Error("高级选项过滤后没有可用字符类别，请调整选项。");
    return { pool: filteredPool, categories: filteredCategories, removed };
}

function generatePassword(pool, length, categories) {
    const n = categories.length;
    if (length < n) throw new Error(`当前有效字符集 ${n} 种，密码位数不能小于 ${n}。`);
    const result = categories.map(cat => randomChar(cat.chars));
    for (let i = n; i < length; i++) result.push(randomChar(pool));
    shuffle(result);
    return result.join("");
}

function generatePin(length) {
    let out = "";
    for (let i = 0; i < length; i++) out += randomChar(DIGITS);
    return out;
}

function escapeHtml(str) {
    return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function renderOutput(list) {
    els.output.innerHTML = list.map((pw, idx) =>
        `<div class="out-item"><div class="pw">${escapeHtml(pw)}</div><button class="mini" data-copy="${idx}">复制</button></div>`
    ).join("");
    els.output.querySelectorAll("[data-copy]").forEach(btn => {
        btn.addEventListener("click", async () => {
            const index = Number(btn.getAttribute("data-copy"));
            await navigator.clipboard.writeText(list[index]);
            els.error.textContent = `✅ 已复制第 ${index+1} 组密码。`;
            setTimeout(() => {
                if (els.error.textContent === `✅ 已复制第 ${index+1} 组密码。`) els.error.textContent = "";
            }, 1500);
        });
    });
    if (list.length > 0) analyzeStrength(list[0]);
}

function renderStats(selectedNames, poolLen, length, count, removedNames) {
    const badges = [
        `<span class="badge">字符集：${selectedNames.join(" / ")||"数字"}</span>`,
        `<span class="badge">字符池大小：${poolLen}</span>`,
        `<span class="badge">位数：${length}</span>`,
        `<span class="badge">组数：${count}</span>`
    ];
    if (removedNames && removedNames.length) badges.push(
        `<span class="badge" style="color:var(--warning);border-color:var(--warning);">已过滤：${removedNames.join("、")}</span>`
    );
    els.stats.innerHTML = badges.join("");
    els.poolChip.textContent = `字符池：${poolLen}`;
    els.summaryChip.textContent = `已生成 ${count} 组，每组 ${length} 位`;
}

function analyzeStrength(password) {
    if (!password) { els.strengthPanel.style.display = 'none'; return; }
    els.strengthPanel.style.display = 'block';
    const len = password.length;
    let poolSize = 0,
        hasLower = /[a-z]/.test(password),
        hasUpper = /[A-Z]/.test(password),
        hasDigit = /\d/.test(password),
        hasSpecial = /[^a-zA-Z0-9]/.test(password);
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigit) poolSize += 10;
    if (hasSpecial) poolSize += 33;
    if (poolSize === 0 && /^\d+$/.test(password)) poolSize = 10;
    let entropy = len * Math.log2(poolSize || 1),
        penalties = 0,
        reasons = [];
    const repeats = len - new Set(password).size;
    if (repeats > 0) { penalties += repeats * 0.5; reasons.push(`重复字符 -${(repeats*0.5).toFixed(1)} bits`); }
    const sequences = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "qwertyuiop",
        "asdfghjkl", "zxcvbnm"
    ];
    let seqPenalty = 0;
    for (let seq of sequences) {
        for (let i = 0; i < password.length - 2; i++) {
            if (seq.includes(password.slice(i, i + 3))) seqPenalty += 3;
        }
    }
    if (seqPenalty > 0) { penalties += seqPenalty; reasons.push(`连续/键盘序列 -${seqPenalty.toFixed(1)} bits`); }
    if (new Set(password).size === 1) { penalties += entropy * 0.9; reasons.push("全同字符 -90%"); }
    if (len < 8) { penalties += (8 - len) * 2; reasons.push(`长度过短 -${((8-len)*2).toFixed(1)} bits`); }
    const variety = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
    if (variety === 1 && len > 6) { penalties += len * 0.3; reasons.push("字符单一 -30%"); }
    let finalEntropy = Math.max(0, entropy - penalties);
    let grade, labelClass, barClass, percent;
    if (finalEntropy < 28) { grade = "非常弱"; labelClass = "strength-weak"; barClass = "bar-weak"; percent = Math.min(100, (finalEntropy / 28) * 20); } 
    else if (finalEntropy < 48) { grade = "弱"; labelClass = "strength-fair"; barClass = "bar-fair"; percent = 20 + ((finalEntropy - 28) / 20) * 20; } 
    else if (finalEntropy < 64) { grade = "中等"; labelClass = "strength-good"; barClass = "bar-good"; percent = 40 + ((finalEntropy - 48) / 16) * 20; } 
    else if (finalEntropy < 128) { grade = "强"; labelClass = "strength-strong"; barClass = "bar-strong"; percent = 60 + ((finalEntropy - 64) / 64) * 20; } 
    else { grade = "极强"; labelClass = "strength-excellent"; barClass = "bar-excellent"; percent = 80 + Math.min(20, (finalEntropy - 128) / 128 * 20); }
    els.strengthScore.textContent = `${grade} · ${finalEntropy.toFixed(1)} bits`;
    els.strengthScore.className = `strength-score ${labelClass}`;
    els.strengthBar.className = `strength-bar-fill ${barClass}`;
    els.strengthBar.style.width = `${percent}%`;
    const detailItems = [`字符多样性：${variety}/4`, `字符池：${poolSize}`, `理论熵：${entropy.toFixed(1)} bits`,
        `有效熵：${finalEntropy.toFixed(1)} bits`
    ];
    if (reasons.length) detailItems.push(`惩罚：${reasons.join("；")}`);
    els.strengthDetails.innerHTML = detailItems.map(s => `<span>${s}</span>`).join("");
}

function generate() {
    els.error.textContent = "";
    els.filterHint.textContent = "";
    els.filterHint.className = "hint";
    const count = clampInt(els.count.value, 1, 10, 1);
    els.count.value = count;
    let list = [],
        selectedNames = [],
        poolLen = 0,
        length = 0,
        removedNames = [];
    try {
        if (currentMode === 'pin') {
            length = clampInt(els.pinLength.value, 3, 32, 6);
            els.pinLength.value = length;
            poolLen = 10;
            selectedNames = ["数字"];
            list = Array.from({ length: count }, () => generatePin(length));
        } else {
            length = clampInt(els.length.value, 1, 256, 16);
            els.length.value = length;
            const { pool, categories } = buildPool();
            const filtered = applyFilters(pool, categories);
            const effectivePool = filtered.pool,
                effectiveCategories = filtered.categories;
            removedNames = filtered.removed || [];
            poolLen = effectivePool.length;
            selectedNames = effectiveCategories.map(c => c.name);
            if (removedNames.length) {
                els.filterHint.textContent = `高级选项已过滤掉：${removedNames.join('、')}（该类别无可用字符）`;
                els.filterHint.className = "hint warn";
            }
            const minLen = effectiveCategories.length;
            if (length < minLen) {
                length = minLen;
                els.length.value = length;
                els.lengthHint.textContent = `已自动调整为最小位数 ${minLen}（有效字符集 ${minLen} 种）。`;
                els.lengthHint.style.color = "var(--warning)";
            } else {
                els.lengthHint.textContent = "建议 8~32 位；默认 16 位。";
                els.lengthHint.style.color = "";
            }
            list = Array.from({ length: count }, () => generatePassword(effectivePool, length, effectiveCategories));
        }
        renderOutput(list);
        renderStats(selectedNames, poolLen, length, count, removedNames);
    } catch (err) {
        els.output.innerHTML = "";
        els.stats.innerHTML = "";
        els.summaryChip.textContent = "生成失败";
        els.poolChip.textContent = "字符池：0";
        els.strengthPanel.style.display = 'none';
        els.error.textContent = err.message || String(err);
    }
}

async function copyAll() {
    const text = Array.from(els.output.querySelectorAll(".pw")).map(el => el.textContent).filter(Boolean).join("\n");
    if (!text) { els.error.textContent = "没有可复制的内容。"; return; }
    await navigator.clipboard.writeText(text);
    els.error.textContent = "📋 已复制全部结果到剪贴板。";
    setTimeout(() => {
        if (els.error.textContent === "📋 已复制全部结果到剪贴板。") els.error.textContent = "";
    }, 1500);
}

function toggleSpecial() {
    els.specialChars.disabled = !els.special.checked;
    generate();
}

function setStepperValue(inputEl, delta, min, max) {
    const current = clampInt(inputEl.value, min, max, min);
    inputEl.value = Math.max(min, Math.min(max, current + delta));
    generate();
}

// ---- 事件绑定 ----
$("generate").addEventListener("click", generate);
$("copyAll").addEventListener("click", copyAll);
$("clear").addEventListener("click", () => {
    els.output.innerHTML = "";
    els.stats.innerHTML = "";
    els.error.textContent = "";
    els.summaryChip.textContent = "等待生成";
    els.poolChip.textContent = "字符池：0";
    els.strengthPanel.style.display = 'none';
    els.filterHint.textContent = "";
    els.filterHint.className = "hint";
});
els.modePassword.addEventListener("click", () => setMode('password'));
els.modePin.addEventListener("click", () => setMode('pin'));
$("lengthDown").addEventListener("click", () => setStepperValue(els.length, -1, 1, 256));
$("lengthUp").addEventListener("click", () => setStepperValue(els.length, 1, 1, 256));
$("pinLengthDown").addEventListener("click", () => setStepperValue(els.pinLength, -1, 3, 32));
$("pinLengthUp").addEventListener("click", () => setStepperValue(els.pinLength, 1, 3, 32));
$("countDown").addEventListener("click", () => setStepperValue(els.count, -1, 1, 10));
$("countUp").addEventListener("click", () => setStepperValue(els.count, 1, 1, 10));

[els.length, els.count, els.pinLength].forEach(el => {
    el.addEventListener("input", generate);
    el.addEventListener("change", generate);
    el.addEventListener("blur", generate);
});

// 为所有复选框绑定 change 事件（使用统一处理器）
[els.lower, els.upper, els.digits, els.special, els.specialChars, els.easySpeak, els.easyRead, els.easyMobile].forEach(el => {
    el.addEventListener("change", handleCheckboxChange);
    // 额外：对于特殊字符输入框，输入时触发生成
    if (el === els.specialChars) {
        el.addEventListener("input", generate);
    }
});

// 单独处理特殊字符的禁用状态
els.special.addEventListener("change", function() {
    els.specialChars.disabled = !this.checked;
});

// 启动
setMode('password');