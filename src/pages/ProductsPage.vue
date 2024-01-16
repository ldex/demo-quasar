<template>
  <q-page padding>
    <section v-if="errorMessage" class="errorMessage">
      {{ errorMessage }}
    </section>
    <section v-else>
      <div v-if="isLoading">
        <q-circular-progress indeterminate size="190px" :thickness="0.2" color="primary" center-color="grey-8"
          track-color="transparent" class="q-ma-md" />
      </div>
      <product-list v-else :products="products" :page-size="5">
        <template v-slot="sp">
          <q-item-section>
            <q-item-label>{{ sp.product.name }}</q-item-label>
            <q-item-label caption>{{ sp.product.description }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>{{ sp.product.price }}$</q-item-label>
          </q-item-section>
        </template>
      </product-list>
    </section>
  </q-page>
</template>

<script setup>
import { computed, onErrorCaptured } from 'vue'
import ProductList from 'components/ProductList.vue'
import { useProductStore } from 'stores/product';

const productStore = useProductStore();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const errorMessage = computed(() => productStore.errorMessage);

onErrorCaptured((error) => {
  console.error('Error in component: ', error.message);
  return true;
});

productStore.fetchProducts();
</script>

<style lang="scss" scoped></style>
