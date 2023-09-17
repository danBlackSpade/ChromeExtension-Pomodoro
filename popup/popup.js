
function updateTime() {
  chrome.storage.local.get(["timer", "timeOption", "isRunning", "pomodoroCompleted", "breakRunning", "breakOption", "breakTimer"], (res) => {


    if (!res.pomodoroCompleted) {
      document.body.style.backgroundColor = "indianred"
      document.getElementById("start-pomodoro-btn").style.display = "block"
      document.getElementById("start-break-btn").style.display = "none"
      document.getElementById("skip-break-btn").style.display = "none"
      document.getElementById("reset-pomodoro-btn").style.display = "block"
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
    } else {
      document.body.style.backgroundColor = "blue"
      document.getElementById("start-pomodoro-btn").style.display = "none"
      document.getElementById("start-break-btn").style.display = "block"
      document.getElementById("skip-break-btn").style.display = "block"
      document.getElementById("reset-pomodoro-btn").style.display = "none"
      const time = document.getElementById("time")
      const minutes = `${res.breakOption - Math.ceil(res.breakTimer / 60)}`.padStart(2, "0")

      if (res.breakTimer % 60 != 0) {
        seconds = `${60 - res.breakTimer % 60}`.padStart(2, "0")
      } else {
        seconds = "00"
      }
      time.textContent = `${minutes}:${seconds}`
      startBreakBtn.textContent = res.breakRunning ? "Pause Break" : "Start Break"
    }
  })
}


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

const skipBreakBtn = document.getElementById("skip-break-btn")
skipBreakBtn.addEventListener("click", () => {
  chrome.storage.local.get(["breakRunning", "breakTimer", "breakOption"], (res) => {
    chrome.storage.local.set({
      pomodoroCompleted: false,
      // breakTimer: res.breakOption,
      breakRunning: false,
      
    }, () => {
      document.getElementById("start-pomodoro-btn").style.display = "block"
      document.getElementById("start-break-btn").style.display = "none"
      document.getElementById("skip-break-btn").style.display = "none"
      document.getElementById("reset-pomodoro-btn").style.display = "block"
      document.body.style.backgroundColor = "indianred"
      startTimerBtn.textContent = "Start Pomodoro"
  
    })

  })

})

const startBreakBtn = document.getElementById("start-break-btn")
startBreakBtn.addEventListener("click", () => {
  chrome.storage.local.get(["breakRunning"], (res) => {
    chrome.storage.local.set({
      breakRunning: !res.breakRunning,
    }, () => {
      // startBreakBtn.textContent = !res.breakRunning ? "Pause Break" : "Star Break"
    })
  })

})