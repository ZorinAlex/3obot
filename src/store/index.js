import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        strategies: [],
    },
    getters: {
        strategies: state => state.strategies
    },
    mutations: {
        addStrategies(state, strategies){
            state.strategies = strategies
        },
        addStrategy(state, strategy) {
            state.strategies.push(strategy)
        }
    },
    actions: {
        async loadFile({state}) {
            let data = await axios.get(
                `http://localhost:3030/data/datafiles`
            );
            return data.data;
        },
        async getPrediction({commit}, predictionData) {
            const prediction = await axios.post("http://localhost:3030/prediction", {
                data: predictionData.data,
                model: predictionData.model,
                version: predictionData.version,
                from: predictionData.from
            });

            return prediction.data
        },

        async getHoursData({state}, timedata) {
            let data = await axios.get(
                `http://localhost:3030/data/${timedata.startTime}/${timedata.endTime}/3600`
            );
            return data.data;
        },
        async getStrategyTest({}, testData) {
            const test = await axios.post("http://localhost:3030/strategy/addTestInput", {
                modelName: testData.modelName,
                modelVersion: testData.modelVersion,
                price: testData.price,
                from: testData.from,
                isFromTicker: testData.isFromTicker,
                predictionData: testData.predictionData,
                strategyData: testData.strategyData
            });
            return test
        },
        async getStrategies({commit}) {
            const strategies = await axios.get("http://localhost:3030/strategy");
            commit('addStrategies', strategies.data)
        },
        async addStrategy({commit}, strategyData) {
            await axios.post('http://localhost:3030/strategy', strategyData);
            if(strategyData._id) return;
            commit('addStrategy', strategyData)
        }
    },
    modules: {}
})
