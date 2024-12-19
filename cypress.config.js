import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
       
    },
  },
  env: {
    NODE_ENV: "test",  
    STRIPE_API_KEY: "test_key",  
    API_BASE_URL: "http://localhost:3000"  
  },
});


