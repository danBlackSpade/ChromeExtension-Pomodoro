const timeOption = document.getElementById("time-option")
timeOption.addEventListener("change", (event) => {
    const val = event.target.value
    if (val < 1 || val > 60) {
        timeOption.value = 25
    }
})

const breakOption = document.getElementById("break-option")
breakOption.addEventListener("change", (event) => {
    const val = event.target.value
    if (val < 1 || val > 60) {
        breakOption.value = 10
    }
})

const saveBtn = document.getElementById("save-btn")
saveBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        timeOption: timeOption.value,
        isRunning: false,
        breakOption: breakOption.value,
        breakTimer: 0,
        breakRunning: false

    })
})

chrome.storage.local.get(["timeOption", "breakOption"], (res) => {
    timeOption.value = res.timeOption
    breakOption.value = res.breakOption
})

