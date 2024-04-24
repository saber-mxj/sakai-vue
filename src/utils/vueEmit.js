class VueEvent {
  constructor() {
    this.events = {};
  }

  $emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(...args);
      });
    }
  }

  $on(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  $off(eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
}

export const VueEmit = new VueEvent();
