export interface Purchase {
  amount: number;
  price: number;
  timestamp: Date;
  address: string;
  txHash: string;
}

export interface PresaleData {
  backend_host: string;
  countdown: {
    endDate: string;
  };
  progressBar: {
    currentStage: number;
    stages: Array<{
      name: string;
      target: number;
      raised: number;
    }>;
  };
  presalePoolAddress: {
    evm: string;
    solana: string;
  };
  paymentOptions: {
    usdt: {
      contractSolana: string;
      contractEvmETH: string;
      contractEvmAvax: string;
      contractEvmBsc: string;
      contractEvmFtm: string;
      contractEvmBase: string;
      contractEvmScroll: string;
      contractEvmOptimism: string;
      contractEvmArb: string;
    };
    usdc: {
      contractSolana: string;
      contractEvmETH: string;
      contractEvmAvax: string;
      contractEvmBsc: string;
      contractEvmFtm: string;
      contractEvmBase: string;
      contractEvmScroll: string;
      contractEvmOptimism: string;
      contractEvmArb: string;
    };
  };
  investmentOptions: Array<{
    id: number;
    name: string;
    price: number;
    allocation: number;
  }>;
  depositLogs: Array<any>;
}

class BackendService {
  private config: PresaleData | null = null;

  async loadConfig(): Promise<PresaleData> {
    if (this.config) {
      return this.config;
    }

    try {
      const response = await fetch('/presale.json');
      if (!response.ok) {
        throw new Error('Failed to fetch presale configuration');
      }
      this.config = await response.json();
      return this.config!;
    } catch (error) {
      console.error('Error loading config:', error);
      throw error;
    }
  }

  async getPresaleData(): Promise<PresaleData> {
    return await this.loadConfig();
  }

  async addPurchase(purchase: Purchase): Promise<any> {
    try {
      const config = await this.loadConfig();
      const response = await fetch(`${config.backend_host}/backend/api.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_address: purchase.address,
          network: 'ethereum', // You can modify this based on your needs
          amount: purchase.amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add purchase');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding purchase:', error);
      throw error;
    }
  }

  async getUserPurchases(address: string): Promise<any[]> {
    try {
      const config = await this.loadConfig();
      const response = await fetch(`${config.backend_host}/backend/api.php?address=${encodeURIComponent(address)}`);
      
      if (!response.ok) {
        throw new Error('Failed to get user purchases');
      }

      const data = await response.json();
      return data.deposits || [];
    } catch (error) {
      console.error('Error getting user purchases:', error);
      throw error;
    }
  }

  async getTotalSales(): Promise<number> {
    try {
      const config = await this.loadConfig();
      const response = await fetch(`${config.backend_host}/backend/api.php`);
      
      if (!response.ok) {
        throw new Error('Failed to get total sales');
      }

      const data = await response.json();
      const deposits = data.deposits || [];
      
      return deposits.reduce((total: number, deposit: any) => {
        return total + parseFloat(deposit.amount || 0);
      }, 0);
    } catch (error) {
      console.error('Error getting total sales:', error);
      throw error;
    }
  }

  async getLatestPurchase(): Promise<Purchase | null> {
    try {
      const config = await this.loadConfig();
      const response = await fetch(`${config.backend_host}/backend/api.php`);
      
      if (!response.ok) {
        throw new Error('Failed to get latest purchase');
      }

      const data = await response.json();
      const deposits = data.deposits || [];
      
      if (deposits.length === 0) {
        return null;
      }

      // Sort by timestamp and get the latest
      const latest = deposits.sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0];

      return {
        amount: parseFloat(latest.amount),
        price: parseFloat(latest.token_price),
        timestamp: new Date(latest.timestamp),
        address: latest.user_address,
        txHash: latest.user_address, // Using address as txHash placeholder
      };
    } catch (error) {
      console.error('Error getting latest purchase:', error);
      throw error;
    }
  }
}

const backendService = new BackendService();

export const getPresaleData = () => backendService.getPresaleData();
export const addPurchase = (purchase: Purchase) => backendService.addPurchase(purchase);
export const getUserPurchases = (address: string) => backendService.getUserPurchases(address);
export const getTotalSales = () => backendService.getTotalSales();
export const getLatestPurchase = () => backendService.getLatestPurchase();

export default backendService;
