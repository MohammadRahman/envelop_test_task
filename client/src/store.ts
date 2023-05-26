import { defineStore } from 'pinia';
import axios from 'axios';

interface Product {
    _id: string;
    product_code: string;
    timestamps: string;
    roi_percentage: number,
    roi_state: string
}

export const useStore = defineStore('store', {
    state: () => ({
        products: [] as Product[],
    }),
    actions: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3009/products');
                this.products = response.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    },
});