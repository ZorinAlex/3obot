<template>
    <v-container fluid>
        <v-btn
                icon="mdi-plus"
                theme="dark"
                v-if="!addMode"
                class="mb-10"
                @click="addMode = true"
        ></v-btn>
        <v-card v-else>
            <v-card-text>
                <v-row class="mb-5">
                    <v-col cols="12" md="12" class="pb-0">
                        <div class="settings-section"><span>Main Settings</span></div>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-switch
                                class="pt-0"
                                v-model="strategy.isActive"
                                label="Active"
                                hide-details
                                color="primary"
                        ></v-switch>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-switch
                                class="pt-0"
                                v-model="strategy.sequential"
                                label="Sequential Trade"
                                hide-details
                                color="primary"
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" class="pb-0">
                        <div class="settings-section"><span>BUY Settings</span></div>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-text-field
                                label="BUY Confidence"
                                v-model="strategy.buyConfidence"
                                type="number"
                                suffix="%"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-text-field
                                label="BUY Amount"
                                v-model="strategy.buyAmountPercent"
                                type="number"
                                suffix="%"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mb-5">
                    <v-col cols="12" md="4" class="pt-0">
                        <v-switch
                                v-model="strategy.trailingBuy"
                                label="Trailing BUY"
                                hide-details
                                color="green"
                        ></v-switch>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-text-field
                                label="Trailing BUY"
                                v-model="strategy.trailingBuyPercent"
                                type="number"
                                suffix="%"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" class="pb-0">
                        <div class="settings-section"><span>Sell Settings</span></div>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-text-field
                                label="SELL Confidence"
                                v-model="strategy.sellConfidence"
                                type="number"
                                suffix="%"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mb-5">
                    <v-col cols="12" md="4" class="pt-0">
                        <v-switch
                                v-model="strategy.trailingSell"
                                label="Trailing SELL"
                                hide-details
                                color="red"
                        ></v-switch>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-text-field
                                label="Trailing SELL"
                                v-model="strategy.trailingSellPercent"
                                type="number"
                                suffix="%"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" class="pb-0">
                        <div class="settings-section"><span>Stop Loss Settings</span></div>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-switch
                                v-model="strategy.stopLoss"
                                label="Stop Loss"
                                hide-details
                                color="orange"
                        ></v-switch>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-switch
                                v-model="strategy.stopLossIsTrailing"
                                label="Stop Loss Trailing"
                                hide-details
                                color="orange"
                        ></v-switch>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-0">
                        <v-text-field
                                label="Stop Loss"
                                v-model="strategy.stopLossPercent"
                                type="number"
                                suffix="%"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn size="x-large"
                           theme="dark"
                           @click="addStrat()"
                    >Save</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card v-if="!addMode" v-for="(strat, index) in strategies" class="mb-5">
            <v-card-title>
                model: {{strat.model}}
                version: {{strat.version}}
                <v-icon v-if=strat.isActive icon="mdi-checkbox-marked-circle-outline" color="green"></v-icon>
                <v-icon v-else icon="mdi-close-circle-outline" color="red"></v-icon>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>sequential: {{strat.sequential}}</v-col>
                </v-row>
                <v-row>
                    <v-col>buyConfidence: {{strat.buyConfidence}}%</v-col>
                    <v-col>sellConfidence: {{strat.sellConfidence}}%</v-col>
                    <v-col>buyAmountPercent: {{strat.buyAmountPercent}}%</v-col>
                </v-row>
                <v-row>
                    <v-col>trailingBuy: {{strat.trailingBuy}}</v-col>
                    <v-col>trailingBuyPercent: {{strat.trailingBuyPercent}}%</v-col>
                    <v-col></v-col>
                </v-row>
                <v-row>
                    <v-col>trailingSell: {{strat.trailingSell}}</v-col>
                    <v-col>trailingSellPercent: {{strat.trailingSellPercent}}%</v-col>
                    <v-col></v-col>
                </v-row>
                <v-row>
                    <v-col>stopLoss: {{strat.stopLoss}}</v-col>
                    <v-col>stopLossIsTrailing: {{strat.stopLossIsTrailing}}</v-col>
                    <v-col>stopLossPercent: {{strat.stopLossPercent}}%</v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="editStrategy(index)">edit</v-btn>
            </v-card-actions>
        </v-card>

    </v-container>

</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import * as _ from 'lodash';
    export default {
        name: 'Strategies',
        data: () => ({
            loading: false,
            addMode: false,
            strategy: {
                model: '',
                version: '',
                isActive: true,
                sequential: true,
                buyConfidence: 80,
                buyAmountPercent: 20,
                trailingBuy: true,
                trailingBuyPercent: 5,
                sellConfidence: 80,
                trailingSell: true,
                trailingSellPercent: 10,
                stopLoss: true,
                stopLossIsTrailing: true,
                stopLossPercent: 10
            },
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
        computed:{
            ...mapGetters([
                'strategies'
            ]),
        },
        methods: {
            ...mapActions(["getStrategies", "addStrategy"]),
            addStrat(){
                this.addMode = false;
                this.strategy.model = this.currentModel.name;
                this.strategy.version = this.currentModel.version;
                this.addStrategy(this.strategy)
            },
            editStrategy(index){
                this.strategy = this.strategies[index];
                this.addMode = true;
            }
        },
        mounted() {
            this.currentModel= this.models[0];
            this.getStrategies();
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
    .settings-section{
        font-size: 18px;
        text-transform: uppercase;
        font-weight: bold;
        padding-bottom: 10px;
    }
</style>
