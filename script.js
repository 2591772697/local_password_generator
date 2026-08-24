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
        lengthHint: "建议 8~32 位；默认 10 位。滑块为 0 时不生成密码。",
        pinLengthLabel: "PIN 位数",
        pinHint: "纯数字 PIN，支持 3~32 位；默认 6 位。",
        countLabel: "生成组数（1~16）",
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
        errorZeroLength: "密码位数不能为 0，请增加长度。",
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
        categorySpecial: "特殊字符",
        qrLabel: "二维码",
        qrPlaceholder: "点击复制密码后显示二维码",
        qrZoomLabel: "🔍 放大",
        pinOptionsLabel: "PIN 选项",
        excludeConsecutiveLabel: "排除连续数字（如 66, 11, 00）",
        excludeRepeatedLabel: "排除相同数字（每位数字只能出现一次）",
        pinOptionsHint: "排除相同数字仅在位数 ≤ 10 时生效",
        // 强度检测器
        strengthCheckerBtn: "🔍 强度检测",
        modalTitle: "🔍 专业密码强度检测",
        showPw: "显示密码",
        checkPwPlaceholder: "输入要检测的密码",
        lengthLabel: "长度",
        scoreLabel: "评分",
        crackTimeLabel: "破解时间估算（在线/离线）",
        crackTimeOnline: "在线（每秒 1 千次）",
        crackTimeOffline: "离线（每秒 1 万亿次）",
        timeSeconds: "秒",
        timeMinutes: "分钟",
        timeHours: "小时",
        timeDays: "天",
        timeYears: "年",
        timeOver100Years: "> 100 年",
        suggestionsLabel: "改进建议",
        suggestionShort: "密码太短，建议至少 8 位。",
        suggestionCharset: "增加字符种类（大小写、数字、特殊字符）。",
        suggestionNoRepeat: "避免重复字符。",
        suggestionNoSequence: "避免连续或键盘序列（如 'abc', '123', 'qwerty'）。",
        suggestionWeakCommon: "这是常见弱密码，请换一个。",
        suggestionExcellent: "密码强度极佳，继续保持！",
        suggestionGood: "密码强度不错，可考虑再增加长度或特殊字符。",
        scoreVeryWeak: "非常弱",
        scoreWeak: "弱",
        scoreMedium: "中等",
        scoreStrong: "强",
        scoreExcellent: "极强",
    },
    en: {
        appTitle: "🔐 Password Generator V8",
        appSub: "PIN mode, intelligent strength, charset enforcement, advanced filters; smartphone mode auto-excludes.",
        modePassword: "🔑 Password",
        modePin: "🔢 PIN",
        pwLengthLabel: "Password Length",
        lengthHint: "Recommended 8–32; default 10. Slider 0 means no password.",
        pinLengthLabel: "PIN Length",
        pinHint: "Numeric PIN, 3–32 digits; default 6.",
        countLabel: "Number of passwords (1–16)",
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
        errorZeroLength: "Password length cannot be 0, please increase.",
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
        categorySpecial: "Special",
        qrLabel: "QR Code",
        qrPlaceholder: "Click copy password to show QR",
        qrZoomLabel: "🔍 Zoom",
        pinOptionsLabel: "PIN Options",
        excludeConsecutiveLabel: "Exclude consecutive digits (e.g., 66, 11, 00)",
        excludeRepeatedLabel: "Exclude repeated digits (each digit can appear only once)",
        pinOptionsHint: "Exclude repeated digits only works when length ≤ 10",
        // Strength checker
        strengthCheckerBtn: "🔍 Strength Check",
        modalTitle: "🔍 Professional Password Strength Checker",
        showPw: "Show password",
        checkPwPlaceholder: "Enter a password to check",
        lengthLabel: "Length",
        scoreLabel: "Score",
        crackTimeLabel: "Estimated crack time (online / offline)",
        crackTimeOnline: "Online (1k/s)",
        crackTimeOffline: "Offline (1 trillion/s)",
        timeSeconds: "seconds",
        timeMinutes: "minutes",
        timeHours: "hours",
        timeDays: "days",
        timeYears: "years",
        timeOver100Years: "> 100 years",
        suggestionsLabel: "Suggestions",
        suggestionShort: "Password too short, use at least 8 characters.",
        suggestionCharset: "Add more character types (uppercase, digits, special).",
        suggestionNoRepeat: "Avoid repeated characters.",
        suggestionNoSequence: "Avoid sequential/keyboard patterns (e.g., 'abc', '123', 'qwerty').",
        suggestionWeakCommon: "This is a common weak password, choose another.",
        suggestionExcellent: "Excellent strength! Keep it up.",
        suggestionGood: "Good strength, consider increasing length or adding special characters.",
        scoreVeryWeak: "Very Weak",
        scoreWeak: "Weak",
        scoreMedium: "Medium",
        scoreStrong: "Strong",
        scoreExcellent: "Excellent",
    }
};

// DOM 引用
const $ = id => document.getElementById(id);
const els = {
    lengthSlider: $("lengthSlider"),
    lengthDisplay: $("lengthDisplay"),
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
    langSwitch: $("langSwitch"),
    qrcodeContainer: $("qrcodeContainer"),
    qrLabel: $("qrLabel"),
    qrZoomBtn: $("qrZoomBtn"),
    excludeConsecutive: $("excludeConsecutive"),
    excludeRepeated: $("excludeRepeated"),
    pinOptionsHint: $("pinOptionsHint"),
    // 强度检测器
    openStrengthChecker: $("openStrengthChecker"),
    strengthModal: $("strengthModal"),
    closeModal: $("closeModal"),
    checkPwInput: $("checkPwInput"),
    showPwCheck: $("showPwCheck"),
    rLen: $("rLen"),
    rTypes: $("rTypes"),
    rEntropy: $("rEntropy"),
    rEffEntropy: $("rEffEntropy"),
    rScore: $("rScore"),
    rScoreBar: $("rScoreBar"),
    rCrackTime: $("rCrackTime"),
    rSuggestions: $("rSuggestions"),
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.placeholder = translations[lang][key];
        }
    });
    generate();
    // 如果模态框打开，刷新内容
    if (els.strengthModal.classList.contains('active')) {
        updateStrengthReport(els.checkPwInput.value);
    }
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

// ===== 提示更新（仅显示约束说明） =====
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
    document.getElementById('qrcodePanel').style.display = 'block';
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

function generateMobilePassword(length, categories, effectivePool) {
    const hasUpper = categories.some(c => c.name === getCategoryName('upper'));
    const hasSpecial = categories.some(c => c.name === getCategoryName('special'));

    if (!hasUpper && !hasSpecial) {
        return generatePassword(effectivePool, length, categories);
    }

    const lowerCat = categories.find(c => c.name === getCategoryName('lower'));
    const digitCat = categories.find(c => c.name === getCategoryName('digits'));
    let fillPool = '';
    if (lowerCat) fillPool += lowerCat.chars;
    if (digitCat) fillPool += digitCat.chars;
    if (!fillPool) {
        throw new Error(t('errorMobileConstraintNoFill'));
    }

    const chars = [];
    if (hasUpper) {
        const upperCat = categories.find(c => c.name === getCategoryName('upper'));
        chars.push(randomChar(upperCat.chars));
    }
    if (hasSpecial) {
        const specialCat = categories.find(c => c.name === getCategoryName('special'));
        chars.push(randomChar(specialCat.chars));
    }

    const remain = length - chars.length;
    if (remain < 0) throw new Error(t('errorLengthTooShort', { n: categories.length }));
    for (let i = 0; i < remain; i++) {
        chars.push(randomChar(fillPool));
    }
    shuffle(chars);
    return chars.join('');
}

function generatePin(length, excludeConsecutive, excludeRepeated) {
    let attempts = 0;
    const maxAttempts = 1000;
    let pin;
    do {
        let out = "";
        for (let i = 0; i < length; i++) out += randomChar(DIGITS);
        pin = out;
        if (excludeConsecutive) {
            let consecutive = false;
            for (let i = 0; i < pin.length - 1; i++) {
                if (pin[i] === pin[i+1]) { consecutive = true; break; }
            }
            if (consecutive) continue;
        }
        if (excludeRepeated) {
            const set = new Set(pin);
            if (set.size !== pin.length) continue;
        }
        break;
    } while (attempts++ < maxAttempts);
    if (attempts >= maxAttempts) {
        let fallback = "";
        for (let i = 0; i < length; i++) fallback += randomChar(DIGITS);
        return fallback;
    }
    return pin;
}

function escapeHtml(str) {
    return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

// ---- 二维码生成 ----
function generateQRCode(text) {
    const container = els.qrcodeContainer;
    container.innerHTML = '';
    if (!text) {
        container.innerHTML = `<span style="color:var(--muted);font-size:14px;" data-i18n="qrPlaceholder">${t('qrPlaceholder')}</span>`;
        container._qrText = '';
        return;
    }
    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    const qr = new QRCode(tempDiv, {
        text: text,
        width: 470,
        height: 470,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
    });
    const canvas = tempDiv.querySelector('canvas');
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.style.display = 'block';
    img.style.width = '100%';
    img.style.height = 'auto';

    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    wrapper.style.background = '#ffffff';
    wrapper.style.padding = '10px';
    wrapper.style.border = '20px solid #fed400';
    wrapper.style.borderRadius = '8px';
    wrapper.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    wrapper.appendChild(img);

    container.appendChild(wrapper);
    container._qrText = text;
    container._qrImg = img;
    document.body.removeChild(tempDiv);
}

function openQRCodeInNewTab() {
    const container = els.qrcodeContainer;
    const text = container._qrText;
    if (!text) {
        els.error.textContent = t('noContent') || '没有内容可生成二维码';
        setTimeout(() => els.error.textContent = '', 1500);
        return;
    }

    // 1. 生成二维码 Canvas（放入隐藏容器）
    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);

    try { // 因为大尺寸的图780*780 能保证扫描成功，所以保留
        new QRCode(tempDiv, {
            text: text,
            width: 780,
            height: 780,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.L
        });
    } catch (e) {
        console.error('QR Code generation error:', e);
        els.error.textContent = '⚠️ 二维码生成失败，请重试。';
        setTimeout(() => els.error.textContent = '', 2000);
        document.body.removeChild(tempDiv);
        return;
    }

    const canvas = tempDiv.querySelector('canvas');
    if (!canvas) {
        els.error.textContent = '⚠️ 无法获取二维码图像';
        setTimeout(() => els.error.textContent = '', 1800);
        document.body.removeChild(tempDiv);
        return;
    }

    // 获取图片 Data URL
    const dataUrl = canvas.toDataURL('image/png');
    document.body.removeChild(tempDiv); // 立即清理临时元素

    // 2. 构建完整 HTML 字符串
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>QR Code</title>
    <style>
        * { box-sizing: border-box; }
        html, body { margin: 0; min-height: 100vh; }
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f0f4f8;
            font-family: Arial, sans-serif;
        }
        .qr-wrapper {
            display: inline-block;
            background: #ffffff;
            padding: 14px;
            border: 19px solid #1d4ed8;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .qr-wrapper img {
            display: block;
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="qr-wrapper">
        <img src="${dataUrl}" alt="QR Code" />
    </div>
</body>
</html>
    `;

    // 3. 使用 Blob URL 在新标签页中打开
    try {
        const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);

        const win = window.open(blobUrl, '_blank');
        if (!win) {
            els.error.textContent = '⚠️ 请允许弹出窗口，以打开二维码。';
            setTimeout(() => els.error.textContent = '', 1800);
            return;
        }

        // 延迟释放 Blob URL，确保新窗口已加载（一般10秒后释放，不影响已打开页面）
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (e) {
        console.error('Open new tab error:', e);
        els.error.textContent = '⚠️ 打开新窗口失败，请手动复制密码到二维码生成器。';
        setTimeout(() => els.error.textContent = '', 2000);
    }
}

// ---- 渲染输出 ----
function renderOutput(list) {
    els.output.innerHTML = list.map((pw, idx) =>
        `<div class="out-item"><div class="pw">${escapeHtml(pw)}</div><button class="mini" data-copy="${idx}">${t('copySingle')}</button></div>`
    ).join("");
    els.output.querySelectorAll("[data-copy]").forEach(btn => {
        btn.addEventListener("click", async () => {
            const index = Number(btn.getAttribute("data-copy"));
            const pw = list[index];
            await navigator.clipboard.writeText(pw);
            els.error.textContent = t('copiedSingle', { index: index+1 });
            setTimeout(() => {
                if (els.error.textContent === t('copiedSingle', { index: index+1 })) els.error.textContent = "";
            }, 1500);
            generateQRCode(pw);
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

// ---- 强度分析（复用并增强） ----
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

// ---- 专业强度检测器（模态框专用，更详细） ----
function updateStrengthReport(password) {
    const tKey = (key, params) => t(key, params);
    const len = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    const variety = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigit) poolSize += 10;
    if (hasSpecial) poolSize += 33;
    if (poolSize === 0 && /^\d+$/.test(password)) poolSize = 10;

    let entropy = len * Math.log2(poolSize || 1);
    let penalties = 0;
    const reasons = [];
    const repeats = len - new Set(password).size;
    if (repeats > 0) { penalties += repeats * 0.5; reasons.push(tKey('repeatPenalty') + ` -${(repeats*0.5).toFixed(1)} bits`); }
    const sequences = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "qwertyuiop", "asdfghjkl", "zxcvbnm"];
    let seqPenalty = 0;
    for (let seq of sequences) {
        for (let i = 0; i < password.length - 2; i++) {
            if (seq.includes(password.slice(i, i + 3))) seqPenalty += 3;
        }
    }
    if (seqPenalty > 0) { penalties += seqPenalty; reasons.push(tKey('sequencePenalty') + ` -${seqPenalty.toFixed(1)} bits`); }
    if (new Set(password).size === 1) { penalties += entropy * 0.9; reasons.push(tKey('allSamePenalty')); }
    if (len < 8) { penalties += (8 - len) * 2; reasons.push(tKey('tooShortPenalty') + ` -${((8-len)*2).toFixed(1)} bits`); }
    if (variety === 1 && len > 6) { penalties += len * 0.3; reasons.push(tKey('singleTypePenalty')); }

    let finalEntropy = Math.max(0, entropy - penalties);
    let score = 0, grade, gradeLabel;
    if (finalEntropy < 28) { grade = 'veryWeak'; score = Math.min(20, (finalEntropy/28)*20); gradeLabel = tKey('scoreVeryWeak'); }
    else if (finalEntropy < 48) { grade = 'weak'; score = 20 + ((finalEntropy-28)/20)*20; gradeLabel = tKey('scoreWeak'); }
    else if (finalEntropy < 64) { grade = 'medium'; score = 40 + ((finalEntropy-48)/16)*20; gradeLabel = tKey('scoreMedium'); }
    else if (finalEntropy < 128) { grade = 'strong'; score = 60 + ((finalEntropy-64)/64)*20; gradeLabel = tKey('scoreStrong'); }
    else { grade = 'excellent'; score = 80 + Math.min(20, (finalEntropy-128)/128*20); gradeLabel = tKey('scoreExcellent'); }
    score = Math.min(100, Math.round(score));

    // 破解时间估算
    const onlineRate = 1000; // 每秒1千次
    const offlineRate = 1e12; // 每秒1万亿次
    const totalCombinations = Math.pow(poolSize, len);
    const onlineSeconds = totalCombinations / onlineRate;
    const offlineSeconds = totalCombinations / offlineRate;
    const formatTime = (sec) => {
        if (sec < 60) return `${Math.round(sec)} ${tKey('timeSeconds')}`;
        if (sec < 3600) return `${Math.round(sec/60)} ${tKey('timeMinutes')}`;
        if (sec < 86400) return `${Math.round(sec/3600)} ${tKey('timeHours')}`;
        if (sec < 31536000) return `${Math.round(sec/86400)} ${tKey('timeDays')}`;
        if (sec < 31536000*100) return `${Math.round(sec/31536000)} ${tKey('timeYears')}`;
        return tKey('timeOver100Years');
    };
    const onlineStr = formatTime(onlineSeconds);
    const offlineStr = formatTime(offlineSeconds);

    // 常见弱密码检测
    const commonWeak = ["password","123456","12345678","123456789","qwerty","abc123","password1","admin","letmein","welcome","monkey","dragon","master","hello","freedom","whatever","trustno1","sunshine","qwertyuiop","iloveyou","princess","rockyou","1234567890","password123"];
    const isCommon = commonWeak.includes(password.toLowerCase());

    // 生成建议
    let suggestions = [];
    if (len < 8) suggestions.push(tKey('suggestionShort'));
    if (variety < 3) suggestions.push(tKey('suggestionCharset'));
    if (repeats > 2) suggestions.push(tKey('suggestionNoRepeat'));
    if (seqPenalty > 0) suggestions.push(tKey('suggestionNoSequence'));
    if (isCommon) suggestions.push(tKey('suggestionWeakCommon'));
    if (grade === 'excellent') suggestions.push(tKey('suggestionExcellent'));
    else if (grade === 'strong' || grade === 'medium') suggestions.push(tKey('suggestionGood'));
    // 如果无建议但又不强，给一个通用提示
    if (suggestions.length === 0 && grade !== 'excellent') {
        suggestions.push(tKey('suggestionCharset'));
    }

    // 填充UI
    els.rLen.textContent = len;
    els.rTypes.textContent = variety + (variety > 0 ? ` (${[
        hasLower ? tKey('categoryLower') : '',
        hasUpper ? tKey('categoryUpper') : '',
        hasDigit ? tKey('categoryDigits') : '',
        hasSpecial ? tKey('categorySpecial') : ''
    ].filter(Boolean).join('/')})` : '');
    els.rEntropy.textContent = entropy.toFixed(1) + ' bits';
    els.rEffEntropy.textContent = finalEntropy.toFixed(1) + ' bits';
    els.rScore.textContent = `${score} / 100 (${gradeLabel})`;
    els.rScoreBar.style.width = score + '%';
    els.rScoreBar.style.background = score < 40 ? '#ef4444' : score < 60 ? '#f59e0b' : score < 80 ? '#38bdf8' : '#22c55e';
    els.rCrackTime.innerHTML = `<span style="color:var(--muted);">${tKey('crackTimeOnline')}:</span> ${onlineStr} &nbsp;|&nbsp; <span style="color:var(--muted);">${tKey('crackTimeOffline')}:</span> ${offlineStr}`;
    els.rSuggestions.innerHTML = `<strong>${tKey('suggestionsLabel')}:</strong><ul>${suggestions.map(s => `<li>${s}</li>`).join('')}</ul>`;
}

// ---- 生成主函数 ----
function generate() {
    els.error.textContent = "";
    updateMobileHint();

    let length = parseInt(els.lengthSlider.value, 10);
    els.lengthDisplay.textContent = length;
    const count = clampInt(els.count.value, 1, 16, 2);
    els.count.value = count;

    if (length === 0) {
        els.output.innerHTML = "";
        els.stats.innerHTML = "";
        els.summaryChip.textContent = t('waiting');
        els.poolChip.textContent = t('poolPrefix') + "0";
        els.strengthPanel.style.display = 'none';
        els.error.textContent = t('errorZeroLength');
        generateQRCode('');
        return;
    }

    let list = [],
        selectedNames = [],
        poolLen = 0,
        removedNames = [];
    try {
        if (currentMode === 'pin') {
            length = clampInt(els.pinLength.value, 3, 32, 6);
            els.pinLength.value = length;
            poolLen = 10;
            selectedNames = [t('categoryDigits')];
            const excludeConsecutive = els.excludeConsecutive.checked;
            let excludeRepeated = els.excludeRepeated.checked;
            if (length > 10 && excludeRepeated) {
                els.excludeRepeated.checked = false;
                excludeRepeated = false;
                els.pinOptionsHint.textContent = "⚠️ " + t('pinOptionsHint');
                els.pinOptionsHint.style.color = "var(--warning)";
            } else {
                els.pinOptionsHint.textContent = t('pinOptionsHint');
                els.pinOptionsHint.style.color = "";
            }
            list = Array.from({ length: count }, () => generatePin(length, excludeConsecutive, excludeRepeated));
        } else {
            const { pool, categories } = buildPool();
            const filtered = applyFilters(pool, categories);
            const effectivePool = filtered.pool,
                effectiveCategories = filtered.categories;
            removedNames = filtered.removed || [];
            poolLen = effectivePool.length;
            selectedNames = effectiveCategories.map(c => c.name);
            const minLen = effectiveCategories.length;
            if (length < minLen) {
                length = minLen;
                els.lengthSlider.value = length;
                els.lengthDisplay.textContent = length;
                els.lengthHint.textContent = t('lengthAutoAdjusted', { minLen });
                els.lengthHint.style.color = "var(--warning)";
            } else {
                els.lengthHint.textContent = t('lengthHint');
                els.lengthHint.style.color = "";
            }
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
        generateQRCode('');
    } catch (err) {
        els.output.innerHTML = "";
        els.stats.innerHTML = "";
        els.summaryChip.textContent = t('generateFailed');
        els.poolChip.textContent = t('poolPrefix') + "0";
        els.strengthPanel.style.display = 'none';
        els.error.textContent = err.message || String(err);
        generateQRCode('');
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
    generateQRCode(text);
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

function updateLengthFromSlider() {
    const val = parseInt(els.lengthSlider.value, 10);
    els.lengthDisplay.textContent = val;
    generate();
}

function updateLengthFromStepper(delta) {
    let val = parseInt(els.lengthSlider.value, 10) + delta;
    val = Math.max(0, Math.min(128, val));
    els.lengthSlider.value = val;
    els.lengthDisplay.textContent = val;
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
    generateQRCode('');
});
els.modePassword.addEventListener("click", () => setMode('password'));
els.modePin.addEventListener("click", () => setMode('pin'));

$("lengthDown").addEventListener("click", () => updateLengthFromStepper(-1));
$("lengthUp").addEventListener("click", () => updateLengthFromStepper(1));
els.lengthSlider.addEventListener("input", updateLengthFromSlider);

$("pinLengthDown").addEventListener("click", () => setStepperValue(els.pinLength, -1, 3, 32));
$("pinLengthUp").addEventListener("click", () => setStepperValue(els.pinLength, 1, 3, 32));

$("countDown").addEventListener("click", () => setStepperValue(els.count, -1, 1, 16));
$("countUp").addEventListener("click", () => setStepperValue(els.count, 1, 1, 16));

[els.count, els.pinLength].forEach(el => {
    el.addEventListener("input", generate);
    el.addEventListener("change", generate);
    el.addEventListener("blur", generate);
});

[els.lower, els.upper, els.digits, els.special, els.specialChars, els.easySpeak, els.easyRead, els.easyMobile, els.excludeConsecutive, els.excludeRepeated].forEach(el => {
    el.addEventListener("change", handleCheckboxChange);
    if (el === els.specialChars) {
        el.addEventListener("input", generate);
    }
});
els.special.addEventListener("change", function() {
    els.specialChars.disabled = !this.checked;
});

// ---- 二维码放大 ----
els.qrZoomBtn.addEventListener("click", openQRCodeInNewTab);

// ---- 强度检测模态框 ----
els.openStrengthChecker.addEventListener("click", () => {
    els.strengthModal.classList.add('active');
    // 清空输入和结果
    els.checkPwInput.value = '';
    els.rLen.textContent = '-';
    els.rTypes.textContent = '-';
    els.rEntropy.textContent = '-';
    els.rEffEntropy.textContent = '-';
    els.rScore.textContent = '-';
    els.rScoreBar.style.width = '0%';
    els.rCrackTime.textContent = '-';
    els.rSuggestions.innerHTML = '';
    els.checkPwInput.focus();
});
els.closeModal.addEventListener("click", () => {
    els.strengthModal.classList.remove('active');
});
els.strengthModal.addEventListener("click", (e) => {
    if (e.target === els.strengthModal) els.strengthModal.classList.remove('active');
});
els.checkPwInput.addEventListener("input", function() {
    updateStrengthReport(this.value);
});
els.showPwCheck.addEventListener("change", function() {
    els.checkPwInput.type = this.checked ? 'text' : 'password';
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