<template>
  <v-app>
    <v-navigation-drawer permanent :rail="mini" theme="dark" app>
      <v-list dense>
        <v-list-item @click.stop="mini = !mini" link>
          <v-list-item-icon>
            <v-icon v-show="mini">mdi-chevron-right</v-icon>
            <v-icon v-show="!mini">mdi-chevron-left</v-icon>
          </v-list-item-icon>
          <v-list-item-title></v-list-item-title>
        </v-list-item>
        <v-list-item prepend-icon="mdi-nas" title="Data" to="/data" link></v-list-item>
        <v-list-item prepend-icon="mdi-chart-bar-stacked" title="Prediction" to="/prediction" link></v-list-item>
        <v-list-item prepend-icon="mdi-clipboard-text-outline" title="Strategies" to="/strategies" link></v-list-item>
        <v-list-item prepend-icon="mdi-chart-scatter-plot" title="Strategy test" to="/strategy" link></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    mini: true
  }),
}
</script>
