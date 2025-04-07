// ... 现有代码 ...
import { ref, onMounted } from 'vue';
import axios from 'axios';
import config from '../config';

export default {
  // ... 现有代码 ...
  setup() {
    // ... 现有代码 ...
    
    const fetchAccounts = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const response = await axios.get(`${config.apiBaseUrl}/api/accounts`);
        accounts.value = response.data.accounts;
      } catch (err) {
        // ... 错误处理 ...
      }
    };
    
    // ... 其余代码 ...
  }
}