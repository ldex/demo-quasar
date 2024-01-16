<template>
  <div>
    <h2>{{ title }}</h2>
    <fieldset class="row items-center">
      Sort by:
      <q-btn-group push class="q-ml-sm q-mr-sm">
        <q-btn color="amber" glossy text-color="black" @click="sort('name')" push label="Name" />
        <q-btn color="amber" glossy text-color="black" @click="sort('price')" push label="Price" />
        <q-btn color="amber" glossy text-color="black" @click="sort('modifiedDate')" push label="Date" />
      </q-btn-group>
      <q-input filled dense float-right v-model="filterName" label="Filter by name" style="max-width: 180px;" />
    </fieldset>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="product in sortedFilteredPaginatedProducts" v-bind:key="product.id"
        v-bind:class='{ discontinued: product.discontinued }' @click="onSelect(product)">
        <slot :product="product">
          {{ product.name }}
        </slot>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" to="/product/insert" />
    </q-page-sticky>

    <q-btn color="accent" @click="prevPage" label="&lt; Previous" :disabled="pageNumber === 1" />
    Page {{ pageNumber }}
    <q-btn color="accent" @click="nextPage" label="Next &gt;" :disabled="pageNumber >= pageCount" />
  </div>
</template>

<script setup>
import useList from "../composables/items-list";
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  products: {
    type: Array
  },
  pageSize: {
    type: Number,
    required: false,
    default: 5
  },
  title: {
    type: String,
    default: "Products"
  }
});

function onSelect(product) {
  router.push({ name: "product", params: { id: product.id } });
}

const { sort, nextPage, prevPage, filterName, pageNumber, pageCount, sortedFilteredPaginatedItems: sortedFilteredPaginatedProducts, itemsNumber } = useList(props.products, props.pageSize, "modifiedDate", "desc")
</script>

<style lang="css" scoped>
.products {
  margin: 0;
  list-style-type: none;
  padding: 0;
}

.products li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0em;
  height: 1.8em;
  border-radius: 4px;
}

.products li:hover {
  color: #607D8B;
  background-color: yellow;
  left: .1em;
}

.products li:hover .name,
.products li:hover .price {
  color: #607D8B;
  background-color: #FFD800;
  left: .1em;
}

.products li.selected {
  background-color: #0094FF;
  color: white;
}

.products li.selected:hover {
  color: white;
}

.products li.selected .name,
.products li.selected .price {
  background-color: #0026FF;
  color: white;
}

.products .text {
  padding: 0.5em 0.7em 0em 0.7em;
  line-height: 1em;
  left: -1px;
  top: -4px;
  height: 1.8em;
}

.products .name {
  display: inline-block;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: .8em;
  border-radius: 4px 0px 0px 4px;
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.products .price {
  float: right;
  width: 15%;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-left: .8em;
  border-radius: 0px 4px 4px 0px;
}

.products .description {
  height: 1.8em;
  display: inline-block;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.products .discontinued,
.products .discontinued * {
  color: red !important;
}
</style>