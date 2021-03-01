<template>
  <v-app>
    <v-main>

      <v-container>

        <v-row justify="center">
          <v-col cols="12">
            <h1 class="text-center">Рассчитать дешевый маршрут</h1>
          </v-col>

          <v-col md="4"
                 sm="12"
                 cols="12">
            <FilterForm :countries="countries" />
          </v-col>

          <v-col md="8"
                 sm="12"
                 cols="12">
            <RouterList />
          </v-col>
        </v-row>

      </v-container>

    </v-main>
  </v-app>

</template>
<script>

import FilterForm from '@/components/FilterForm.vue';
import RouterList from '@/components/RouterList.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: { RouterList, FilterForm },

  data() {
    return {};
  },
  methods: {
    ...mapActions(['initStore']),
  },
  mounted() {
    this.initStore();
  },
  computed: {
    ...mapGetters(['countries']),
  },
};
</script>
