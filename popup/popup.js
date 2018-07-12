var activeTab, editTabBox, editDomainBox;

function onError(error) {
    console.log(`Error: ${error}`);
}

function onExecuted(result) {
    console.log(`Success: ${result}`);
}

function deleteTitle(delData) {
    var removing = browser.storage.local.remove(delData);
    removing.then(onExecuted, onError);	
}

function deleteTab(){
	deleteTitle(activeTab.url);
}

function deleteDomain(){
	var url = new URL(activeTab.url);	
    deleteTitle(url.hostname);
}

function updateTitleTab() {
    var executing = browser.tabs.executeScript({
        code: 'document.title = '  + '"' + editTabBox.value + '";'
    });
    executing.then(onExecuted, onError);
}

function updateTitleDomain() {
    var executing = browser.tabs.executeScript({
        code: 'document.title = '  + '"' + editDomainBox.value + '";'
    });
    executing.then(onExecuted, onError);
}

function saveTab() {
    var m = {};
    m[activeTab.url] = editTabBox.value;
    var saving = browser.storage.local.set(m);
    saving.then(onExecuted, onError);
    window.close();
}

function saveDomain() {
    var m = {};	
	var url = new URL(activeTab.url);
    m[url.hostname] = editDomainBox.value;
    var saving = browser.storage.local.set(m);
    saving.then(onExecuted, onError);
    window.close();
}

function getTabInfo(tabs) {
    if(tabs) {
        activeTab = tabs[0];
        editTabBox.value = activeTab.title;
		editDomainBox.value = activeTab.title;
    }
}

function init() {

    editTabBox = document.querySelector("#editTab");
	editDomainBox = document.querySelector("#editDomain");

    browser.tabs.query({active: true, currentWindow: true}).then(getTabInfo, onError);

    editTabBox.addEventListener("input", updateTitleTab);
	editDomainBox.addEventListener("input", updateTitleDomain);
    editTabBox.addEventListener('keyup', function onkeyup(event) {
        if (event.keyCode == 27) {
            window.close();
        }
    }, false);

    document.querySelector("#saveTab").addEventListener("click", saveTab);
	document.querySelector("#saveDomain").addEventListener("click", saveDomain);
	document.querySelector("#deleteTab").addEventListener("click", deleteTab);
	document.querySelector("#deleteDomain").addEventListener("click", deleteDomain);	
}

document.addEventListener("DOMContentLoaded", init);