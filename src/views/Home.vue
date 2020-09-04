<style>
.property-heading {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <el-card>
    <div slot="header" class="property-heading">
      <div class="w-50">
        <el-input
          v-model="property.filters.search"
          placeholder="Type to search"
          clearable
        />
      </div>

      <div class="spacer"></div>

      <el-button @click="drawer = true" type="primary" round>Filters</el-button>
    </div>

    <el-drawer
      title="I am the title"
      :visible.sync="drawer"
      :before-close="cancelFilters"
      direction="ltr"
    >
      <el-form ref="form" label-width="100px" label-position="top" style="padding: 15px">
        <el-form-item
          v-for="key in property.filterKeys"
          :label="key.replace('_', ' ')"
          :key="`filter-${key}`"
        >
          <el-input
            v-model="property.filters[key]"
            :placeholder="key.replace('_', ' ')"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="applyFilters">Apply</el-button>
          <el-button @click="cancelFilters">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-table :data="properties" height="calc(100vh - 160px)" style="width: 100%">
      <el-table-column
        v-for="header in property.headers"
        :label="header.toUpperCase()"
        :prop="header"
        :key="header"
        align="center"
      />
    </el-table>
  </el-card>
</template>

<script>
import {Property} from "@/models/Property";

export default {
  name: 'Home',
  components: {},
  data: () => ({
    loading: false,
    drawer: false,
    properties: [],
    property: new Property(),
  }),
  methods: {
    getProperties() {
      this.loading = true;

      const {
        search,
        garages,
        storeys,
        bedrooms,
        bathrooms,
        price_to,
        price_from,
      } = this.property.filters;

      let req = Property.all();

      if (search)
        req.query({name: search});

      if (garages)
        req.query({garages});

      if (storeys)
        req.query({storeys});

      if (bedrooms)
        req.query({bedrooms});

      if (bathrooms)
        req.query({bathrooms});

      if (price_from && price_to)
        req.query({price_from, price_to});

      req.send()
        .then(res => this.properties = res.data)
        .catch(err => console.log(err))
        .finally(() => this.loading = false);
    },
    applyFilters() {
      this.getProperties();
    },
    cancelFilters() {
      this.drawer = false;
      this.property.resetFilters();
    }
  },
  created() {
    this.getProperties();
  }
}
</script>
