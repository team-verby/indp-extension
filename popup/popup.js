document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('getInfo').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['scripts/content.js']
            })
        })
    });
})
