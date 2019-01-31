function calculateAverage(items) {
  if (items.length < 1) return 0;
  return items.reduce((sum, i) => sum + i, 0)/items.length;
}

function calculateVariance(items) {
  if (items.length <= 1) return 0;
  let avg = calculateAverage(items);
  return items.reduce((sum, i) => sum + (i - avg)^2, 0)/(items.length - 1);
}

function getTempo(clickTimes) {
  let diffs = [];
  for (let i = 1; i < clickTimes.length; i++) {
    diffs.push(clickTimes[i] - clickTimes[i - 1]);
  }
  let average = calculateAverage(diffs);
  let variance = calculateVariance(diffs);

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
  }
})
