function calculateAverage(items) {
  if (items.length < 1) return 0;
  return items.reduce((sum, i) => sum + i, 0)/items.length;
}

function validateConsistency(values, upperBound, lowerBound) {
  return values.every(function(value) {
    return value <= upperBound && value >= lowerBound;
  });
}

const CONSISTENCY_THRESHOLD = 1.2

function getTempo(clickTimes) {
  if (clickTimes.length < 4) return 0;
  let diffs = [];
  for (let i = 1; i < clickTimes.length; i++) {
    diffs.push(clickTimes[i] - clickTimes[i - 1]);
  }
  let average = calculateAverage(diffs);
  if (!validateConsistency(diffs, average * CONSISTENCY_THRESHOLD, average / CONSISTENCY_THRESHOLD)) {
    throw new Error('Inconsistent differences in time')
  }
  return Math.round(60/(average / 1000));
}

Vue.component('clicker', {
  props: {
    timestamps: {
        type: Array
    }
  },
  methods: {
    onClick: function() {
      this.timestamps.push(new Date());
    }
  },
  template: '<button v-on:click="onClick()">You clicked me {{ timestamps.length }} times.</button>'
})

var app = new Vue({
  el: '#app',
  data: {
    timestamps: []
  },
  methods: {
    getTempo: function() {
      try {
        return getTempo(this.timestamps.slice(-10));
      } catch (e) {
        this.timestamps = [];
        return 0;
      }
    }
  }
})
