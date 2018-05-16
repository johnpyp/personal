<template>
  <v-container grid-list-xl fluid class="ma-0 pa-0">
    <v-layout row wrap justify-center>
      <v-flex xs12 md10 lg8>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              Available Apps

            </v-toolbar-title>
          </v-toolbar>
          <template v-for="(item, index) in apps">
            <v-subheader v-if="item.type === 'subheader'" :key="index">{{item.content}}</v-subheader>
            <v-list two-line subheader v-if="item.type === 'items'" :key="index">
              <div v-for="(app, index2) in item.content" :key="index2">

                <v-list-tile avatar :to="app.route" @click="" exact>
                  <v-list-tile-avatar>
                    <v-icon>{{app.icon}}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{app.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{app.description}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index !== apps.length - 1 && index2 == item.content.length - 1"></v-divider>
              </div>

            </v-list>

          </template>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  computed: {
    apps() {
      return this.$store.state.apps
    }
  }
}
</script>
