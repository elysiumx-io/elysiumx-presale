/**
 * Deposit logging system for presale
 * Logs addresses, amounts, timestamps, and token prices for successful deposits
 */

class DepositLogger {
  constructor(logsFilePath = '/home/coder/presale/public/presale.json') {
    this.logsFilePath = logsFilePath;
  }

  async logDeposit(depositData) {
    const { address, amount, currency, tokenPrice, txHash, chainId } = depositData;
    
    const logEntry = {
      id: Date.now().toString(),
      address,
      amount,
      currency,
      tokenPrice,
      tokensReceived: amount / tokenPrice,
      timestamp: new Date().toISOString(),
      txHash,
      chainId,
      status: 'confirmed'
    };

    try {
      const fs = require('fs').promises;
      const presaleData = JSON.parse(await fs.readFile(this.logsFilePath, 'utf8'));
      
      if (!presaleData.depositLogs) {
        presaleData.depositLogs = [];
      }
      
      presaleData.depositLogs.push(logEntry);
      
      await fs.writeFile(this.logsFilePath, JSON.stringify(presaleData, null, 2));
      
      return logEntry;
    } catch (error) {
      console.error('Failed to log deposit:', error);
      throw error;
    }
  }

  async getDepositHistory(address = null) {
    try {
      const fs = require('fs').promises;
      const presaleData = JSON.parse(await fs.readFile(this.logsFilePath, 'utf8'));
      
      if (!presaleData.depositLogs) {
        return [];
      }
      
      if (address) {
        return presaleData.depositLogs.filter(log => log.address === address);
      }
      
      return presaleData.depositLogs;
    } catch (error) {
      console.error('Failed to get deposit history:', error);
      return [];
    }
  }

  async getTotalDeposits() {
    const logs = await this.getDepositHistory();
    return logs.reduce((total, log) => total + log.amount, 0);
  }
}

module.exports = DepositLogger;
