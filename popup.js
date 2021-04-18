window.onload=function(){
    document.getElementById("mainButton").addEventListener("click", randomURLFunction);
    document.getElementById('addURL').addEventListener('click', addURLFunction);
    document.getElementById('reset').addEventListener('click', resetToDefaults);
    document.getElementById('toggleSettings').addEventListener('click', toggleSettings);

    displayURLs();
}

const defaultWebsites = [
    "https://www.eugenewei.com/",
    "https://onezero.medium.com/",
    "https://www.theatlantic.com/",
    "https://sive.rs/blog",
    "https://www.youtube.com/playlist?list=WL",
    "https://www.google.com/",
    "https://stackoverflow.blog/",
    "https://www.ribbonfarm.com/for-new-readers/",
    "https://www.nytimes.com/section/business/smallbusiness",
    "https://www.nytimes.com/section/technology",
    "https://en.wikipedia.org/wiki/Main_Page",
    "https://www.wired.com/category/ideas/",
    "https://www.wired.com/category/backchannel/",
    "https://blog.x.company/",
    "https://www.bloomberg.com/businessweek"
]

function toggleSettings(){
    var settings = document.getElementById("settings");
    var settingsIcon = document.getElementById("toggleSettings");

    if (settings.style.display === "none") {
        settings.style.display = "block";
        settingsIcon.style.color = "#f76c6c";
    } else {
        settings.style.display = "none";
        settingsIcon.style.color = "#ffffff";
    }
}

function resetToDefaults(){

    localStorage.setItem('urls', JSON.stringify(defaultWebsites));
    displayURLs();
    return false;
}

function randomURLFunction(){

    var urls = get_urls();
    let randomURL = '';

    if (urls.length < 1) {
        document.getElementById('url').value="Please add a valid URL";
        document.getElementById('url').focus();
        return; 
    } else if (urls.length < 5) {
        randomURL = urls[Math.floor(Math.random()*urls.length)];
    } else {
        urls.push("https://perudayani.youcanbook.me/"); // A little easter egg :)
        randomURL = urls[Math.floor(Math.random()*urls.length)];
    }

    window.open(randomURL);
}

function addURLFunction() {

    let debug = false;

    var url = document.getElementById('url').value;

    if(url == "")
    {
        document.getElementById('url').focus();
        return;
    }

    if (debug) console.log(" New url given: ", url);
    var urls = get_urls();
    urls.push(url);

    if (debug) console.log(" New urls: ", urls);
    localStorage.setItem('urls', JSON.stringify(urls));
    displayURLs();

    document.getElementById('url').value=null;
    document.getElementById('url').focus();

    return false;
}

function displayURLs() {

    let debug = false;

    if (debug) console.log("displayURLS called");

    var urls = get_urls();    
    l1 = urls.length;

    if (debug) console.log("urls obtained: ", urls)

    var html = '<ul>';
    for(var i=0; i<urls.length; i++) {

        let urlHref = urls[i];
        let urlName = urls[i];

        let urlNameHelper = urls[i].split('www.');

        if (urlNameHelper.length == 1){
            urlNameHelper = urls[i].split('https://');
        } 
        urlNameHelper = urlNameHelper[1]
        urlNameHelper = urlNameHelper.replaceAll('.com', '')

        if (urlNameHelper[urlNameHelper.length-1] == "/"){
            urlNameHelper = urlNameHelper.slice(0,urlNameHelper.length-1);
        }
        urlName = urlNameHelper;

        html += '<li>' + 
                '<span class="d-inline-block text-truncate" style="width: 150px;">' + urlName + '</span>' +
                '<i class="fa fa-times-circle removeURL" style="color:white" id="' + i  + '"></i>' +
                '<a href=' + urlHref + ' target="_blank"> <i class="fa fa-link" style="color:white"> </i> </a>' + 
                '</li>';
    };
    html += '</ul>';

    if (debug) console.log("Generated html: ", html)

    document.getElementById('urls').innerHTML = html;

    if (debug) console.log("html applied");

    var buttons = document.getElementsByClassName('removeURL');

    if (debug) console.log("remove buttons: ", buttons)

    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', removeURL);
    };

    if (debug) console.log("listeners added");
}

function removeURL() {

    var id = this.getAttribute('id');
    var urls = get_urls();
    
    urls.splice(id, 1);
    localStorage.setItem('urls', JSON.stringify(urls));

    displayURLs();
    return false;
}

function get_urls() {
    var urls = new Array;
    var urls_str = localStorage.getItem('urls');

    if (urls_str !== null && urls_str !== []) {
        urls = JSON.parse(urls_str);
    } else {
        urls = defaultWebsites;
    }

    return urls;
}