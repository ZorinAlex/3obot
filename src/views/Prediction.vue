<template>
    <v-container fluid>
        <pixi-line-chart
                ref="chart"
                :pointsData="points"
                :main-chart-padding="{top: 20, bottom: 90, left: 25, right: 25}"
        />
        <v-row class="justify-start py-10 align-end">
            <v-col cols="2" class="mr-10">
                <span class="text-button">Start</span>
                <datepicker
                        class="datepick"
                        minimumView='time'
                        v-model="startTime"
                        inputFormat='yy-MM-dd H:m'
                />

            </v-col>

            <v-col cols="2" class="mr-10">
                <span class="text-button">End</span>
                <datepicker
                        class="datepick"
                        minimumView='time'
                        v-model="endTime"
                        inputFormat='yy-MM-dd H:m'
                />

            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2" class="">
                <v-btn block variant="outlined" size="large" :loading="loading" @click="start">
                    START
                </v-btn>
            </v-col>
        </v-row>


    </v-container>

</template>

<script>
    import pixiLineChart from 'pixi-line-chart'
    import datepicker from 'vue3-datepicker'
    import {mapActions} from "vuex";
    import * as _ from 'lodash';

    export default {
        name: 'Prediction',
        components: {
            pixiLineChart, datepicker
        },
        data: () => ({
            points: [],
            loading: false,
            startTime: new Date( Date.now() - 60*60 * 1000 * 24),
            endTime: new Date(),
            models: [
                {
                    name: 'L_512_L_512_L_256_D_256_D_128_D_64_BTCUSD_blockchain_hours_10_200_450',
                    version: '1',
                    hours: 10,
                    from: 'blockchain_BTCUSD'
                },
            ],
            currentModel: null,
        }),
        methods: {
            ...mapActions(["getHoursData", "getPrediction"]),

            getShape(prediction) {
                console.log(prediction.predictionAction);
                switch (prediction.predictionAction) {
                    case 'BUY':
                        return {color: '#06cf0a', shape: 'circle', info: "BUY " + prediction.predictionPercentage + "%", size: 2};
                    case 'SELL':
                        return {color: '#cf2b06', shape: 'circle', info: "SELL " + prediction.predictionPercentage + "%", size: 2};
                    default:
                        return {color: '#0a0a0a', shape: 'circle', info: "NONE " + prediction.predictionPercentage + "%", size: 0};
                }
            },
            async start() {
                this.loading = true;
                this.points = [];
                const exchangeData = await this.getHoursData({
                    startTime: this.startTime.getTime(),
                    endTime: this.endTime.getTime()
                });
                for (let index = 0; index < exchangeData.length - this.currentModel.hours; index++) {
                    let data = exchangeData.slice(index, index + this.currentModel.hours + 1);
                    let prediction = await this.getPrediction({
                        data,
                        model: this.currentModel.name,
                        version: this.currentModel.version,
                        from: this.currentModel.from
                    });
                    this.points.push({
                        x: new Date(prediction.timestamp).getTime(),
                        y: parseFloat(data.slice(-1)[0].close),
                        color: this.getShape(prediction).color,
                        shape: this.getShape(prediction).shape,
                        info: this.getShape(prediction).info,
                        size: this.getShape(prediction).size,
                    })
                }
                this.loading = false;
            },
        },
        mounted() {
            this.currentModel= this.models[0]
        }
    }
</script>

<style lang="scss">
    .datepick {
        background: #444444;
        color: white;
        padding: 10px;
        border-radius: 3px;
    }

</style>
