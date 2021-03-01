<template>
  <v-container>
    <v-row v-if="currentPageRoutes">
      <v-col cols="12"
             v-for="route in currentPageRoutes"
             :key="route.id">
        <v-card class="py-6 px-2">
          <v-container class="d-flex flex-wrap align-center">
            <v-avatar color="blue darken-4"
                      size="48">
              <span class="white--text">{{ route.total }}$</span>
            </v-avatar>
            <v-spacer />

            <div class="arrow d-inline-flex align-center justify-center route__path"
                 v-for="(item, idx) in route.items"
                 :key="idx">
              <div v-if="idx === 0"
                   class="route__country country rounded blue pa-2 white--text">{{ item.src }}
              </div>
              <div class="route__company-wrap">
                <v-icon color="grey darken-2"
                        size="18"
                        class="mx-8">mdi-arrow-right
                </v-icon>
                <div
                  class="route__company country rounded green py-0 px-1 white--text caption">
                  {{ item.c }} {{ item.price }}$
                </div>
              </div>
              <div
                class="route__country country rounded blue pa-2 white--text">{{ item.des }}
              </div>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <div class="text-center mt-4"
           v-if="countPage > 1">
        <v-pagination
          v-model="page"
          :length="countPage"
          :total-visible="7"
          @input="setPageHandler"
        ></v-pagination>
      </div>
    </v-row>
    <v-row v-else>
      <h3>Нет маршрутов, подходящих под условия</h3>
    </v-row>
  </v-container>

</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RouterList',
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(
      [
        'currentPageRoutes',
        'currentPage',
        'countPage',
      ],
    ),
    page: {
      get() {
        return this.currentPage;
      },
      set() { },

    },
  },
  methods: {
    ...mapActions(['setPage']),
    setPageHandler(page) {
      this.setPage(page);
    },
  },

};
</script>
<style lang="scss"
       scoped>
.route {
  // .route__path
  &__path {
    position : relative;
  }

  // .route__company
  &__company {
    position: absolute;
    top: -45px;
    white-space: nowrap;

  }

  // .route__company-wrap
  &__company-wrap {
    position        : relative;
    display         : flex;
    justify-content : center;
  }
}
</style>
