chrome.alarms.create("pomodoro", {
    periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "pomodoro") {
        chrome.storage.local.get(["timer", "isRunning", "timeOption", "breakRunning", "breakOption", "breakTimer"], (res) => {
            if (res.isRunning) {
                let timer = res.timer  + 1
                let isRunning = true
                if (timer === 60 * res.timeOption) {
                    this.registration.showNotification("Pomodoro", {
                        body: `You completed ${res.timeOption} minutes of Pomodoro 👏🎉!`,
                        // icon: "icon.png",
                    })
                    timer = 0
                    isRunning = false
                    chrome.storage.local.set({pomodoroCompleted: true})
                }
                chrome.storage.local.set({
                    timer,
                    isRunning,
                })
            }
            //if breakrunnig
            if (res.breakRunning) {
                let breakTimer = res.breakTimer + 1
                let breakRunning = true
                if (breakTimer === 60 * res.breakOption) {
                    this.registration.showNotification("Pomodoro", {
                        body: "Break completed"
                    })
                    breakTimer = 0
                    breakRunning = false
                    chrome.storage.local.set({pomodoroCompleted: false})
                }
                chrome.storage.local.set({
                    breakTimer,
                    breakRunning,
                })
            }
        })
    }
})


chrome.storage.local.get(["timer", "isRunning", "timeOption", "pomodoroCompleted", "breakRunning", "breakOption", "breakTimer"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        timeOption: "timeOption" in res ? res.timeOption : 25,
        isRunning: "isRunning" in res ? res.isRunning : false,
        pomodoroCompleted: "pomodoroCompleted" in res ? res.pomodoroCompleted : false,
        breakRunning: "breakRunning" in res ? res.breakRunning : false,
        breakOption: "breakOption" in res ? res.breakOption : 10,
        breakTimer: "breakTimer" in res ? res.breakTimer : 0,
    })
})