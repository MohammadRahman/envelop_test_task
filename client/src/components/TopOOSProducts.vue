
<template>
  <div class="container">
      
    <h3>Top OOS Products</h3>
        <div>
          <canvas ref="chartCanvas"></canvas>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Chart, ChartConfiguration } from "chart.js";
import axios from 'axios';
import memoize from 'memoizee';


const memoizedAxiosGet = memoize(axios.get, {
  promise: true, // Enable memoization for promises
  maxAge: 60000, // Set the cache expiry time (e.g., 60 seconds)
  preFetch: true, // Prefetch the next result when the cache expires
});

interface Product {
  timestamp: string;
  product_code: string;
  roi_percentage: number;
  roi_state: string;
  duration: number;
}
// const stateProducts = 
export default defineComponent({
  name: "TopOOSProduct",
  data() {
    return {
      topProducts: [] as Product[],
      chartInstance: null as Chart<"bar"> | null,
      products: []
    };
  },
  props: {
    selectedTimeRangeStart: {
      type: String,
      required: true,
    },
    selectedTimeRangeEnd: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    this.products = await this.fetchProducts()
    this.processTopOOSProducts();
  },
  watch: {
    selectedTimeRangeStart() {
      this.processTopOOSProducts();
    },
    selectedTimeRangeEnd() {
      this.processTopOOSProducts();
    },
  },
  methods: {
    processTopOOSProducts() {
      // sampleDataSet
      const data: Product[] = this.products;
      const productMap = new Map<string, number>();
      for (const product of data) {
        if (
          product.roi_state === "oos" &&
          product.timestamp >= this.selectedTimeRangeStart &&
          product.timestamp <= this.selectedTimeRangeEnd
        ) {
          const duration = productMap.get(product.product_code) || 0;
          productMap.set(product.product_code, duration + 1);
        }
      }     
      this.topProducts = Array.from(productMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([productCode, duration]) => {
          const product = data.find(
            (item) =>
              item.product_code === productCode &&
              item.roi_state === "oos" &&
              item.timestamp >= this.selectedTimeRangeStart &&
              item.timestamp <= this.selectedTimeRangeEnd
          );
          return {
            product_code: productCode,
            duration: duration,
            timestamp: product ? product.timestamp : "",
            roi_percentage: product ? product.roi_percentage : 0,
            roi_state: product ? product.roi_state : "",
          };
        });

      this.updateChart();
    },

    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy(); // Destroy the previous Chart instance
        const labels: any = this.topProducts.map((product) => product.product_code);
        const data: any = this.topProducts.map((product) => product.duration);
        this.renderChart(labels, data);
      } else {
        this.renderChart();
      }
    },
    renderChart(labels = [], data = []) {
  
      const chartCanvas = this.$refs.chartCanvas as HTMLCanvasElement;
      const ctx = chartCanvas.getContext("2d");

    const chartConfig: ChartConfiguration<"bar"> = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Cumulative OOS Duration',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Duration (hours)',
          },
        },
      },
    },
    }
  if(ctx){this.chartInstance = new Chart(ctx, chartConfig) as any;}

    },

            async fetchProducts() {
            try {
                const response = await memoizedAxiosGet('http://localhost:3009/products');
                return response.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
  },
});
</script>

<style scoped>
canvas {
  min-width: 400px;
  max-width: 500px;
  height: 300px;
  margin: 0 auto;
}
</style>

