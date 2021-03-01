import _ from 'lodash';

export default {
  state: {
    companies: [],
    countries: [],
    filters: [],
    src: '',
    des: '',

  },
  mutations: {
    setCompanies(state, companies) {
      state.companies = companies;
    },
    setCountries(state, countries) {
      state.countries = countries;
    },

    setFilters(state, filters) {
      state.filters = filters;
    },

    setSrc(state, src) {
      state.src = src;
    },

    setDes(state, des) {
      state.des = des;
    },

  },
  actions: {

    async initStore({ commit }) {
      try {
        const res = await fetch('/api/call-paths.json', {
          method: 'GET',
        });
        const { data } = await res.json();
        const { company, country } = data;

        const normalCountries = Object.keys(country)
          .map((key) => ({ value: key, text: `${country[key]} (${key})` }));

        const normalCompanies = [];

        Object.keys(company)
          .map((c) => company[c]
            .forEach(({ src, des, price }) => normalCompanies.push({
              id: _.uniqueId(), c, src, des, price,
            })));
        commit('setCompanies', normalCompanies);

        commit('setCountries', normalCountries);
      } catch (e) {
        throw new Error(e);
      }
    },
    setFilters({ commit }, filters) {
      commit('setFilters', filters);
    },
    setSrc({ commit }, src) {
      commit('setSrc', src);
    },
    setDes({ commit }, des) {
      commit('setDes', des);
    },

  },
  getters: {
    countries: (state) => state.countries,
    routesData: ({
      filters, companies, src, des,
    }) => {
      if (src === '') {
        return [];
      }
      if (des === '') {
        return [];
      }
      if (companies.length === 0) {
        return [];
      }
      if (filters.length === 0) {
        return [];
      }

      const vertexes = companies.map((el) => el.id);
      const siblings1 = [];
      companies.forEach((el) => {
        siblings1[el.id] = [];
        companies.forEach((el2) => {
          if (el.des === el2.src) {
            siblings1[el.id].push(el2.id);
          }
        });
      });

      const siblings = {};
      siblings1.forEach((el, idx) => {
        if (el.length === 0) {
          return;
        }
        if (!siblings[idx]) {
          siblings[idx] = [];
        }

        siblings[idx] = el;
      });

      function getPaths(v, s) {
        const path = [];
        const result = [];

        // eslint-disable-next-line no-shadow
        const iter = (v, s, path, result) => {
          if (!v) {
            if (path.length > 1) {
              result.push(path.slice(0));
            }
            return;
          }

          for (let i = 0; i < v.length; i += 1) {
            path.push(v[i]);

            iter(s[v[i]], s, path, result);
            path.pop();
          }
        };

        iter(v, s, path, result);
        return result;
      }

      const pathsIDs = getPaths(vertexes, siblings);

      const paths = pathsIDs.map((path) => path.map((id) => companies.find((el) => el.id === id)));

      const result = [];

      if (filters.includes('direct') || filters.includes('all')) {
        result.push(...companies
          .filter((c) => c.src === src && c.des === des)
          .map((res) => [res]));
      }
      if (filters.includes('one') || filters.includes('all')) {
        const temp = paths
          .filter((el) => el.length === 2)
          .filter((el) => (el[0].src.includes(src) && el[el.length - 1].des.includes(des)));

        result.push(...temp);
      }

      if (filters.includes('two') || filters.includes('all')) {
        const temp = paths
          .filter((el) => el.length === 3)
          .filter((el) => (el[0].src.includes(src) && el[el.length - 1].des.includes(des)));

        result.push(...temp);
      }

      return result.filter((el) => el.length > 0)
        .map(((el) => {
          const total = el.reduce((acc, item) => acc + item.price, 0);
          return { total, items: el };
        }))
        .sort((a, b) => a.total - b.total);
    },

  },

};
