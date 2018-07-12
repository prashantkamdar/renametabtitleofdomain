function setTitleDomain(data) {
    if (data[document.domain]) {
        document.title = data[document.domain];
    }

    browser.storage.local.get(document.URL).then(setTitleURL, onError);
}

function setTitleURL(data) {
    if (data[document.URL]) {
        document.title = data[document.URL];
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function init() {
    browser.storage.local.get(document.domain).then(setTitleDomain, onError);
}

init();