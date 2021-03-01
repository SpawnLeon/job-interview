<template>

  <v-card>
    <v-card-text>
      <v-select
        :items="countries"
        label="Звонящая сторона (Caller)"
        v-model="src"
        @change="changeSrcHandler"
      />

      <v-select
        :items="countries"
        label="Принимающая сторона (Calle)"
        v-model="des"
        @change="changeDesHandler"
      />

      <v-checkbox
        v-for="(value, key) in filterList"
        :key="key"
        v-model="filters"
        :label="value"
        :value="key"
        @change="changeFilterHandler"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'FilterForm',
  model: {
    prop: 'filters',
  },
  props: {
    countries: {
      type: Array,
      required: true,
    },

  },
  data() {
    return {
      filters: [],
      src: '',
      des: '',

      filterList: {
        all: 'Все',
        direct: 'Прямое соединение',
        one: 'Один дополнительный узел',
        two: 'Два дополнительных узла',
      },

    };
  },
  methods: {
    ...mapActions(['setFilters', 'setSrc', 'setDes']),

    changeFilterHandler() {
      this.setFilters(this.filters);
    },
    changeSrcHandler() {
      this.setSrc(this.src);
    },
    changeDesHandler() {
      this.setDes(this.des);
    },
  },
};
</script>
