<template>
  <div>
    <h3>Stock Time Line</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import exData from "../data.json";
// import { format } from "date-fns/esm";

Chart.register(...registerables);

export default defineComponent({
  name: "StockTimeLine",
  props: {
    selectedTimeRangeStart: {
      type: String as PropType<string>,
      required: true,
    },
    selectedTimeRangeEnd: {
      type: String as PropType<string>,
      required: true,
    },
    products: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const chartCanvas = ref<HTMLCanvasElement | null>(null);
    let chartInstance: Chart<"line"> | null = null;

    const prepareChartData = (filteredProducts: any[]): any => {
      const labels: string[] = [];
      const datasets: any[] = [];

      props.products.forEach((product: string) => {
        const stockLevels: number[] = [];
        filteredProducts.forEach((data: any) => {
          if (data.product_code === product) {
            const timestamp = new Date(data.timestamp);
            const formattedLabel = formatLabel(timestamp);
            const stockLevel = data.roi_percentage;
            labels.push(formattedLabel);
            stockLevels.push(stockLevel);
          }
        });
        datasets.push({
          label: product,
          data: stockLevels,
          fill: false,
          borderColor: getRandomColor(),
          tension: 0.1,
        });
      });

      return {
        labels,
        datasets,
      };
    };

    const formatLabel = (date: Date): string => {
      const isOneDayRange =
        new Date(props.selectedTimeRangeEnd).getTime() -
        new Date(props.selectedTimeRangeStart).getTime() <=
        24 * 60 * 60 * 1000;

      if (isOneDayRange) {
         return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        // return format(date, "yyyy-MM-dd'T'HH:mm:ss");
      } else {
        return date.toLocaleDateString();
        // return format(date, "yyyy-MM-dd");
      }
    };

    const getChartTimeUnit = (): any => {
      const isOneDayRange =
        new Date(props.selectedTimeRangeEnd).getTime() -
        new Date(props.selectedTimeRangeStart).getTime() <=
        24 * 60 * 60 * 1000;

      return isOneDayRange ? "hour" : "day";
    };

    const getChartStepSize = (): number => {
      const isOneDayRange =
        new Date(props.selectedTimeRangeEnd).getTime() -
        new Date(props.selectedTimeRangeStart).getTime() <=
        24 * 60 * 60 * 1000;

      return isOneDayRange ? 4 : 6;
    };

    const getRandomColor = (): string => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const updateChart = () => {
      const startDate = new Date(props.selectedTimeRangeStart);
      const endDate = new Date(props.selectedTimeRangeEnd);

      const filteredProducts = exData.filter((data: any) => {
        const timestamp = new Date(data.timestamp);
        return timestamp >= startDate && timestamp <= endDate;
      });

      const data = prepareChartData(filteredProducts);

      const chartCanvasElement = chartCanvas.value;

      if (chartCanvasElement) {
        const ctx = chartCanvasElement.getContext("2d");

        if (ctx) {
          if (chartInstance) {
            chartInstance.destroy();
          }

          chartInstance = new Chart(ctx, {
            type: "line",
            data,
            options: {
              responsive: true,
              scales: {
                x: {
                  type: "time",
                  time: {
                    parser: "MM/dd/yyyy HH:mm",
                    unit: getChartTimeUnit(),
                    tooltipFormat: "MM/dd/yyyy HH:mm",
                    displayFormats: {
                      hour: "HH:mm",
                      day: "MM/dd/yyyy",
                    },
                  },
                  ticks: {
                    stepSize: getChartStepSize(),
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      }
    };

    watch(
      () => [props.selectedTimeRangeStart, props.selectedTimeRangeEnd, props.products],
      () => {
        updateChart();
      }
    );

    onMounted(() => {
      updateChart();
    });

    return {
      chartCanvas,
    };
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
