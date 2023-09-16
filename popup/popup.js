
function updateTime() {
  chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
    const time = document.getElementById("time")
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(2, "0")
    let seconds = "00"
    if (res.timer % 60 != 0) {
      seconds = `${60 - res.timer % 60}`.padStart(2, "0")
    } else {
      seconds = "00"
    }
    time.textContent = `${minutes}:${seconds}`
    startTimerBtn.textContent = res.isRunning ? "Pause Pomodoro" : "Start Pomodoro"
  })
}25

updateTime()
setInterval(updateTime, 100)

const startTimerBtn = document.getElementById("start-pomodoro-btn")
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set({
      isRunning: !res.isRunning,
    }, () => {
      startTimerBtn.textContent = !res.isRunning ? "Pause Pomodoro" : "Start Pomodoro"
    })
  })
})

const resetTimerBtn = document.getElementById("reset-pomodoro-btn")
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  }, () => {
    startTimerBtn.textContent = "Start Pomodoro"
  })
})