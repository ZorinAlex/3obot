<template>
  <v-container fluid>
      <pixi-line-chart
              :pointsData="points"
              :main-chart-padding="{top: 20, bottom: 90, left: 25, right: 25}"
      />
      <v-btn class="my-5" :loading="loading" variant="outlined" size="x-large"
             @click="loadData">LOAD</v-btn>
  </v-container>

</template>

<script>
import pixiLineChart from 'pixi-line-chart'
import {mapActions} from "vuex";
import * as _ from 'lodash';

export default {
  name: 'Home',
  components: {
    pixiLineChart
  },
  data: ()=>({
    points: [],
    loading: false
  }),
  methods: {
    ...mapActions(["loadFile"]),

    async loadData(){
      this.loading = true;
      this.points = [];
      const data = await this.loadFile();
      _.forEach(data, dataline=>{
        this.points.push({
          x: new Date(dataline.timestamp).getTime(),
          y: parseFloat(dataline.close),
          color: this.getShape(dataline.target).color,
          shape: this.getShape(dataline.target).shape,
          info: this.getShape(dataline.target).info,
          size: this.getShape(dataline.target).size,
        })
      });
      this.loading = false;
    },
    getShape(target){
      switch (Number(target)) {
        case 1:
          return {color: '#06cf0a', shape: 'circle', info: "BUY", size: 2};
        case 2:
          return {color: '#cf2b06', shape: 'circle', info: "SELL", size: 2};
        default:
          return {color: '#0a0a0a', shape: 'circle', info: "NONE", size: 0};
      }
    }
  }
}
</script>
