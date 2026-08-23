const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const EXCLUDE_SPOKEN = new Set("lI1oO0B8S5Z2g9qG6T7".split(""));
const EXCLUDE_SIMILAR = new Set("lI1|0Oo5Ss8B2Zz6G9gq".split(""));
const EXCLUDE_MOBILE = new Set([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ..."!@#$%^&*()-_=+[]{};:,.?/~`\"\\|<>"]);

// ===== 语言翻译表 =====
const translations = {
    zh: {
        appTitle: "🔐 密码生成器 V8",
        appSub: "PIN 模式、智能强度、字符集强制覆盖、高级过滤；智能手机模式自动互斥。",
        modePassword: "🔑 普通密码",
        modePin: "🔢 PIN 密码",
        pwLengthLabel: "密码位数",
        lengthHint: "建议 8~32 位；默认 10 位。",
        pinLengthLabel: "PIN 位数",
        pinHint: "纯数字 PIN，支持 3~32 位；默认 6 位。",
        countLabel: "生成组数（1~10）",
        countHint: "一次生成多组，直接复制全部结果即可。",
        charsetLabel: "字符集",
        charsetTag: "（勾选 N 种则密码至少含 N 位，每种至少 1 个）",
        lowerLabel: "小写字母 a–z",
        upperLabel: "大写字母 A–Z",
        digitsLabel: "数字 0–9",
        specialLabel: "特殊字符",
        specialCharsLabel: "特殊字符内容",
        specialHint: "勾选“特殊字符”后，这里的字符会被纳入生成池；也可以自己删改内容。",
        advancedLabel: "高级选项",
        easySpeakLabel: "易于朗读（避免歧义字符）",
        easyReadLabel: "易于阅读（避免相似字符）",
        easyMobileLabel: "智能手机上输入简单（大写和特殊字符总数 ≤ 2）",
        waiting: "等待生成",
        poolPrefix: "字符池：",
        generateBtn: "✨ 生成密码",
        copyAllBtn: "📋 复制全部",
        clearBtn: "🗑️ 清空",
        strengthTitle: "🔍 密码强度检测",
        strengthScoreLabel: "密码强度",
        strengthVeryWeak: "非常弱",
        strengthWeak: "弱",
        strengthMedium: "中等",
        strengthStrong: "强",
        strengthExcellent: "极强",
        bits: "bits",
        diversityLabel: "字符多样性",
        poolSizeLabel: "字符池",
        theoreticalEntropy: "理论熵",
        effectiveEntropy: "有效熵",
        penaltyLabel: "惩罚",
        copiedSingle: "✅ 已复制第 {index} 组密码。",
        copiedAll: "📋 已复制全部结果到剪贴板。",
        noContent: "没有可复制的内容。",
        generateFailed: "生成失败",
        filterHintMobile: "📱 智能手机简单模式：大写和特殊字符总数 ≤ 2 个（已启用自动约束）。",
        filterHintRemoved: "高级选项已过滤掉：{names}（该类别无可用字符）",
        lengthAutoAdjusted: "已自动调整为最小位数 {minLen}（有效字符集 {minLen} 种）。",
        errorEmptySpecial: "你勾选了特殊字符，但字符内容为空。",
        errorNoCharset: "请至少选择一种字符集。",
        errorFilterNoPool: "高级选项过滤后没有可用字符，请调整选项。",
        errorFilterNoCategory: "高级选项过滤后没有可用字符类别，请调整选项。",
        errorLengthTooShort: "当前有效字符集 {n} 种，密码位数不能小于 {n}。",
        errorMobileConstraintNoFill: "智能手机简单模式下，需要至少勾选小写字母或数字来填充剩余位，请调整。",
        repeatPenalty: "重复字符",
        sequencePenalty: "连续/键盘序列",
        allSamePenalty: "全同字符 -90%",
        tooShortPenalty: "长度过短",
        singleTypePenalty: "字符单一 -30%",
        generationSuccess: "已生成 {count} 组，每组 {length} 位",
        strengthScorePrefix: "强度",
        strengthDetails: "详情",
        copySingle: "复制",
        categoryLower: "小写字母",
        categoryUpper: "大写字母",
        categoryDigits: "数字",
        categorySpecial: "特殊字符"
    },
    en: {
        appTitle: "🔐 Password Generator V8",
        appSub: "PIN mode, intelligent strength, charset enforcement, advanced filters; smartphone mode auto-excludes.",
        modePassword: "🔑 Password",
        modePin: "🔢 PIN",
        pwLengthLabel: "Password Length",
        lengthHint: "Recommended 8–32; default 10.",
        pinLengthLabel: "PIN Length",
        pinHint: "Numeric PIN, 3–32 digits; default 6.",
        countLabel: "Number of passwords (1–10)",
        countHint: "Generate multiple at once, copy all.",
        charsetLabel: "Character Set",
        charsetTag: "(Checking N types ensures at least N characters, one from each)",
        lowerLabel: "Lowercase a–z",
        upperLabel: "Uppercase A–Z",
        digitsLabel: "Digits 0–9",
        specialLabel: "Special characters",
        specialCharsLabel: "Special characters content",
        specialHint: "When 'Special characters' is checked, these characters are included; you can edit them.",
        advancedLabel: "Advanced Options",
        easySpeakLabel: "Easy to speak (avoid ambiguous characters)",
        easyReadLabel: "Easy to read (avoid similar characters)",
        easyMobileLabel: "Smartphone-friendly (uppercase + special ≤ 2 chars)",
        waiting: "Waiting",
        poolPrefix: "Pool: ",
        generateBtn: "✨ Generate",
        copyAllBtn: "📋 Copy All",
        clearBtn: "🗑️ Clear",
        strengthTitle: "🔍 Password Strength",
        strengthScoreLabel: "Strength",
        strengthVeryWeak: "Very Weak",
        strengthWeak: "Weak",
        strengthMedium: "Medium",
        strengthStrong: "Strong",
        strengthExcellent: "Excellent",
        bits: "bits",
        diversityLabel: "Diversity",
        poolSizeLabel: "Pool size",
        theoreticalEntropy: "Theoretical entropy",
        effectiveEntropy: "Effective entropy",
        penaltyLabel: "Penalty",
        copiedSingle: "✅ Copied password #{index}.",
        copiedAll: "📋 Copied all results to clipboard.",
        noContent: "No content to copy.",
        generateFailed: "Generation failed",
        filterHintMobile: "📱 Smartphone mode: uppercase + special ≤ 2 (auto-enforced).",
        filterHintRemoved: "Filtered out: {names} (no usable characters in that category)",
        lengthAutoAdjusted: "Auto-adjusted to minimum {minLen} (effective character sets: {minLen}).",
        errorEmptySpecial: "Special characters enabled but content is empty.",
        errorNoCharset: "Please select at least one character set.",
        errorFilterNoPool: "No usable characters after filtering. Adjust options.",
        errorFilterNoCategory: "No usable character categories after filtering. Adjust options.",
        errorLengthTooShort: "Effective character sets: {n}, password length cannot be less than {n}.",
        errorMobileConstraintNoFill: "Smartphone mode requires at least lowercase or digits for filling remaining positions, please adjust.",
        repeatPenalty: "Repeated chars",
        sequencePenalty: "Sequential/keyboard pattern",
        allSamePenalty: "All same char -90%",
        tooShortPenalty: "Too short",
        singleTypePenalty: "Single type -30%",
        generationSuccess: "Generated {count} passwords, each {length} chars",
        strengthScorePrefix: "Strength",
        strengthDetails: "Details",
        copySingle: "Copy",
        categoryLower: "Lowercase",
        categoryUpper: "Uppercase",
        categoryDigits: "Digits",
        categorySpecial: "Special"
    }
};

// DOM 引用
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
    filterHint: $("filterHint"),
    langSwitch: $("langSwitch")
};

let currentMode = 'password';
let currentLang = 'zh';

// ===== 语言切换函数 =====
function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
        }
    });
    generate();
}

function t(key, params) {
    let text = translations[currentLang]?.[key] || translations['zh'][key] || key;
    if (params) {
        for (let k in params) {
            text = text.replace(new RegExp(`{${k}}`, 'g'), params[k]);
        }
    }
    return text;
}

function getCategoryName(type) {
    const map = {
        lower: 'categoryLower',
        upper: 'categoryUpper',
        digits: 'categoryDigits',
        special: 'categorySpecial'
    };
    return t(map[type] || type);
}

// ===== 移除原互斥逻辑，改为仅提示 =====
function updateMobileHint() {
    if (els.easyMobile.checked && currentMode === 'password') {
        els.filterHint.textContent = t('filterHintMobile');
        els.filterHint.className = "hint warn";
    } else {
        if (els.filterHint.textContent === t('filterHintMobile')) {
            els.filterHint.textContent = "";
            els.filterHint.className = "hint";
        }
    }
}

function handleCheckboxChange(e) {
    if (e.target === els.special) {
        els.specialChars.disabled = !els.special.checked;
    }
    updateMobileHint();
    generate();
}

// ---- 核心函数 ----
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
    updateMobileHint();
    generate();
}

function buildPool() {
    let pool = "";
    const categories = [];
    if (els.lower.checked) {
        pool += LOWER;
        categories.push({ name: getCategoryName('lower'), chars: LOWER });
    }
    if (els.upper.checked) {
        pool += UPPER;
        categories.push({ name: getCategoryName('upper'), chars: UPPER });
    }
    if (els.digits.checked) {
        pool += DIGITS;
        categories.push({ name: getCategoryName('digits'), chars: DIGITS });
    }
    if (els.special.checked) {
        const s = els.specialChars.value;
        if (!s.length) throw new Error(t('errorEmptySpecial'));
        pool += s;
        categories.push({ name: getCategoryName('special'), chars: s });
    }
    if (!pool.length) throw new Error(t('errorNoCharset'));
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
    if (!filteredPool.length) throw new Error(t('errorFilterNoPool'));
    if (!filteredCategories.length) throw new Error(t('errorFilterNoCategory'));
    return { pool: filteredPool, categories: filteredCategories, removed };
}

function generatePassword(pool, length, categories) {
    const n = categories.length;
    if (length < n) throw new Error(t('errorLengthTooShort', { n }));
    const result = categories.map(cat => randomChar(cat.chars));
    for (let i = n; i < length; i++) result.push(randomChar(pool));
    shuffle(result);
    return result.join("");
}

// ===== 重写的智能手机简单模式生成函数（构造法） =====
function generateMobilePassword(length, categories, effectivePool) {
    // 判断是否勾选了大写和特殊
    const hasUpper = categories.some(c => c.name === getCategoryName('upper'));
    const hasSpecial = categories.some(c => c.name === getCategoryName('special'));

    // 如果两者都未勾选，则退化为普通生成
    if (!hasUpper && !hasSpecial) {
        return generatePassword(effectivePool, length, categories);
    }

    // 构造填充池（小写 + 数字，因为这是简单的字符）
    const lowerCat = categories.find(c => c.name === getCategoryName('lower'));
    const digitCat = categories.find(c => c.name === getCategoryName('digits'));
    let fillPool = '';
    if (lowerCat) fillPool += lowerCat.chars;
    if (digitCat) fillPool += digitCat.chars;

    // 如果填充池为空，则无法满足长度（只能产生1或2位），抛出错误
    if (!fillPool) {
        throw new Error(t('errorMobileConstraintNoFill'));
    }

    // 创建一个空数组
    const chars = [];

    // 1. 如果需要大写，从大写池中取一个随机字符
    if (hasUpper) {
        const upperCat = categories.find(c => c.name === getCategoryName('upper'));
        chars.push(randomChar(upperCat.chars));
    }

    // 2. 如果需要特殊，从特殊池中取一个随机字符
    if (hasSpecial) {
        const specialCat = categories.find(c => c.name === getCategoryName('special'));
        chars.push(randomChar(specialCat.chars));
    }

    // 此时 chars 长度可能是 1（只勾了一个）或 2（两个都勾了）

    // 3. 剩余位数填充
    const remain = length - chars.length;
    if (remain < 0) {
        throw new Error(t('errorLengthTooShort', { n: categories.length }));
    }
    for (let i = 0; i < remain; i++) {
        chars.push(randomChar(fillPool));
    }

    // 4. 打乱顺序（shuffle）
    shuffle(chars);
    return chars.join('');
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
        `<div class="out-item"><div class="pw">${escapeHtml(pw)}</div><button class="mini" data-copy="${idx}">${t('copySingle')}</button></div>`
    ).join("");
    els.output.querySelectorAll("[data-copy]").forEach(btn => {
        btn.addEventListener("click", async () => {
            const index = Number(btn.getAttribute("data-copy"));
            await navigator.clipboard.writeText(list[index]);
            els.error.textContent = t('copiedSingle', { index: index+1 });
            setTimeout(() => {
                if (els.error.textContent === t('copiedSingle', { index: index+1 })) els.error.textContent = "";
            }, 1500);
        });
    });
    if (list.length > 0) analyzeStrength(list[0]);
}

function renderStats(selectedNames, poolLen, length, count, removedNames) {
    const badges = [
        `<span class="badge">${t('charsetLabel')}：${selectedNames.join(" / ") || t('categoryDigits')}</span>`,
        `<span class="badge">${t('poolSizeLabel')}：${poolLen}</span>`,
        `<span class="badge">${t('pwLengthLabel')}：${length}</span>`,
        `<span class="badge">${t('countLabel')}：${count}</span>`
    ];
    if (removedNames && removedNames.length) {
        const hint = t('filterHintRemoved', { names: removedNames.join("、") });
        badges.push(`<span class="badge" style="color:var(--warning);border-color:var(--warning);">${hint}</span>`);
    }
    els.stats.innerHTML = badges.join("");
    els.poolChip.textContent = t('poolPrefix') + poolLen;
    els.summaryChip.textContent = t('generationSuccess', { count, length });
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
    if (repeats > 0) { penalties += repeats * 0.5; reasons.push(`${t('repeatPenalty')} -${(repeats*0.5).toFixed(1)} bits`); }
    const sequences = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "qwertyuiop",
        "asdfghjkl", "zxcvbnm"
    ];
    let seqPenalty = 0;
    for (let seq of sequences) {
        for (let i = 0; i < password.length - 2; i++) {
            if (seq.includes(password.slice(i, i + 3))) seqPenalty += 3;
        }
    }
    if (seqPenalty > 0) { penalties += seqPenalty; reasons.push(`${t('sequencePenalty')} -${seqPenalty.toFixed(1)} bits`); }
    if (new Set(password).size === 1) { penalties += entropy * 0.9; reasons.push(t('allSamePenalty')); }
    if (len < 8) { penalties += (8 - len) * 2; reasons.push(`${t('tooShortPenalty')} -${((8-len)*2).toFixed(1)} bits`); }
    const variety = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
    if (variety === 1 && len > 6) { penalties += len * 0.3; reasons.push(t('singleTypePenalty')); }
    let finalEntropy = Math.max(0, entropy - penalties);
    let grade, labelClass, barClass, percent;
    if (finalEntropy < 28) { grade = t('strengthVeryWeak'); labelClass = "strength-weak"; barClass = "bar-weak"; percent = Math.min(100, (finalEntropy / 28) * 20); } 
    else if (finalEntropy < 48) { grade = t('strengthWeak'); labelClass = "strength-fair"; barClass = "bar-fair"; percent = 20 + ((finalEntropy - 28) / 20) * 20; } 
    else if (finalEntropy < 64) { grade = t('strengthMedium'); labelClass = "strength-good"; barClass = "bar-good"; percent = 40 + ((finalEntropy - 48) / 16) * 20; } 
    else if (finalEntropy < 128) { grade = t('strengthStrong'); labelClass = "strength-strong"; barClass = "bar-strong"; percent = 60 + ((finalEntropy - 64) / 64) * 20; } 
    else { grade = t('strengthExcellent'); labelClass = "strength-excellent"; barClass = "bar-excellent"; percent = 80 + Math.min(20, (finalEntropy - 128) / 128 * 20); }
    els.strengthScore.textContent = `${grade} · ${finalEntropy.toFixed(1)} ${t('bits')}`;
    els.strengthScore.className = `strength-score ${labelClass}`;
    els.strengthBar.className = `strength-bar-fill ${barClass}`;
    els.strengthBar.style.width = `${percent}%`;
    const detailItems = [
        `${t('diversityLabel')}：${variety}/4`,
        `${t('poolSizeLabel')}：${poolSize}`,
        `${t('theoreticalEntropy')}：${entropy.toFixed(1)} ${t('bits')}`,
        `${t('effectiveEntropy')}：${finalEntropy.toFixed(1)} ${t('bits')}`
    ];
    if (reasons.length) detailItems.push(`${t('penaltyLabel')}：${reasons.join("；")}`);
    els.strengthDetails.innerHTML = detailItems.map(s => `<span>${s}</span>`).join("");
}

function generate() {
    els.error.textContent = "";
    updateMobileHint();

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
            selectedNames = [t('categoryDigits')];
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
                // 已在统计中显示
            }
            const minLen = effectiveCategories.length;
            if (length < minLen) {
                length = minLen;
                els.length.value = length;
                els.lengthHint.textContent = t('lengthAutoAdjusted', { minLen });
                els.lengthHint.style.color = "var(--warning)";
            } else {
                els.lengthHint.textContent = t('lengthHint');
                els.lengthHint.style.color = "";
            }

            // ---- 生成密码（根据是否启用智能手机简单模式） ----
            const mobileMode = els.easyMobile.checked;
            const generatedList = [];
            for (let i = 0; i < count; i++) {
                let pw;
                if (mobileMode) {
                    pw = generateMobilePassword(length, effectiveCategories, effectivePool);
                } else {
                    pw = generatePassword(effectivePool, length, effectiveCategories);
                }
                generatedList.push(pw);
            }
            list = generatedList;
        }
        renderOutput(list);
        renderStats(selectedNames, poolLen, length, count, removedNames);
    } catch (err) {
        els.output.innerHTML = "";
        els.stats.innerHTML = "";
        els.summaryChip.textContent = t('generateFailed');
        els.poolChip.textContent = t('poolPrefix') + "0";
        els.strengthPanel.style.display = 'none';
        els.error.textContent = err.message || String(err);
    }
}

async function copyAll() {
    const text = Array.from(els.output.querySelectorAll(".pw")).map(el => el.textContent).filter(Boolean).join("\n");
    if (!text) { els.error.textContent = t('noContent'); return; }
    await navigator.clipboard.writeText(text);
    els.error.textContent = t('copiedAll');
    setTimeout(() => {
        if (els.error.textContent === t('copiedAll')) els.error.textContent = "";
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
    els.summaryChip.textContent = t('waiting');
    els.poolChip.textContent = t('poolPrefix') + "0";
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

[els.lower, els.upper, els.digits, els.special, els.specialChars, els.easySpeak, els.easyRead, els.easyMobile].forEach(el => {
    el.addEventListener("change", handleCheckboxChange);
    if (el === els.specialChars) {
        el.addEventListener("input", generate);
    }
});
els.special.addEventListener("change", function() {
    els.specialChars.disabled = !this.checked;
});

// ---- 语言切换 ----
els.langSwitch.addEventListener("change", function() {
    switchLanguage(this.value);
});

// ---- 初始化 ----
els.langSwitch.value = 'en';
switchLanguage('en');
setMode('password');

// ---- 主题切换 ----
const themeToggle = document.getElementById('themeToggle');
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
}
themeToggle.addEventListener('click', toggleTheme);
// 默认暗色，无需额外操作
// (可选) 默认记住用户偏好：如果你希望默认就是日间模式，取消下面这行的注释
// document.body.classList.add('light-theme');
// themeToggle.textContent = '🌙';

//  不行，我觉得这不是一件特别难的事情，当我选中“智能手机输入简单时”，先创建一个blank_pw_arr，
// 然后在生成密码时，先随机先后得从"大写池子"里和"特殊字符池子"各放一个到blank_pw_str里，然后剩下的位数按剩余位数用小写和数字填充，最后再shuffle，再打乱一次str的排序，这样就能保证大写和特殊字符总数不超过2个了。
