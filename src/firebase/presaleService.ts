// import { addDoc, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"

// import { db } from "./config"

// export interface Purchase {
//   amount: number
//   price: number
//   timestamp: Date
//   address: string
//   txHash: string
// }

// const COLLECTION_NAME = "purchases"

// export const addPurchase = async (purchase: Purchase) => {
//   try {
//     await addDoc(collection(db, COLLECTION_NAME), {
//       ...purchase,
//       timestamp: new Date(),
//     })
//   } catch (error) {
//     console.error("Error adding purchase: ", error)
//     throw error
//   }
// }

// export const getTotalSales = async (): Promise<number> => {
//   try {
//     const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
//     let total = 0
//     querySnapshot.forEach((doc) => {
//       total += doc.data().amount
//     })
//     return total
//   } catch (error) {
//     console.error("Error getting total sales: ", error)
//     throw error
//   }
// }

// export const getLatestPurchase = async (): Promise<Purchase | null> => {
//   try {
//     const q = query(collection(db, COLLECTION_NAME), orderBy("timestamp", "desc"), limit(1))
//     const querySnapshot = await getDocs(q)
//     if (querySnapshot.empty) {
//       return null
//     }
//     const latestDoc = querySnapshot.docs[0]
//     return latestDoc.data() as Purchase
//   } catch (error) {
//     console.error("Error getting latest purchase: ", error)
//     throw error
//   }
// }

// export const getUserPurchases = async (address: string): Promise<Purchase[]> => {
//   try {
//     const q = query(collection(db, COLLECTION_NAME), where("address", "==", address))
//     const querySnapshot = await getDocs(q)
//     return querySnapshot.docs.map((doc) => doc.data() as Purchase)
//   } catch (error) {
//     console.error("Error getting user purchases: ", error)
//     throw error
//   }
// }

const API_URL = '/presale.json';

export const getPresaleData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch presale data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

