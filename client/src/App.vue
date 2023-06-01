
<template>
<div class="container-fluid pt-4">
  <div class="container">
  <div class="row">
    <div class="col-6">
      <div class="row">
        <div class="col-6">
          <label for="">Start date</label>
          <input type="date" v-model="selectedTimeRangeStart">
        </div>
        <div class="col-6">
          <label for="">
            End date
          </label>
          <input type="date" v-model="selectedTimeRangeEnd"/>
        </div>
      </div>
    </div>
    <div class="col-6 select">
      <div class="row">
        <div class="col-4">
          <p>selcet product</p>
          <select v-model="selectedProductCode" multiple>
        <option  v-for="product in option" :value="product" :key="product">{{ product}}</option>
     </select>
    </div>
    <div class="col-6">
      <div class="row">
        <div class="col-8">
          <p>selected products:</p>
           <h6>{{ selectedProductCode }}</h6>
        </div>
        <div class="col-3">
          <button type="button" @click="clearProducts">clear</button>
        </div>
      </div>
     
      
    </div>
      </div>
     
     
    </div>
  </div>
  </div>
  <div class="container fluid">
    <div class="row pt-5">
      <div class="col-6 stock">
          <!-- <stock-timeline-chart
           :selectedProductCode="selectedProductCode"
           :selectedTimeRangeStart="selectedTimeRangeStart" 
           :selectedTimeRangeEnd="selectedTimeRangeEnd"
           :data="chartData"
           /> -->
           <!-- :data="chartData" -->
        <stock-time-line 
         :products="selectedProductCode"
         :selectedTimeRangeStart="selectedTimeRangeStart" 
        :selectedTimeRangeEnd="selectedTimeRangeEnd"
        />
      </div>
      <div class="col-6 top-prodcuts">
        <top-o-o-s-products
        :selectedTimeRangeStart="selectedTimeRangeStart" 
        :selectedTimeRangeEnd="selectedTimeRangeEnd"
        />
      </div>
    </div>
  </div>
    
</div>
</template>

<script lang="ts">
import StockTimeLine from './components/StockTimeLine.vue';
import TopOOSProducts from './components/TopOOSProducts.vue';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
// ChartData,
// Point,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export default {
  name: 'App',
  components: {
    StockTimeLine,
    TopOOSProducts,
    Bar
  },
  data() {
        return {
         selectedTimeRangeStart: '',
          selectedTimeRangeEnd: '',
          selectedProductCode: [],
          option: ['SKU001', 'SKU002', 'SKU003', 'SKU004', 'SKU005'],
        }
  },
  methods: {
    clearProducts() {
          return this.selectedProductCode = []
        }
      }
}
</script>
<style scoped src="./select.css">
</style>