import axios from "axios";
export const API_URL ='http://localhost:8000'
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});
export default class ApiService{
  static saveStripeInfo(data={}){
    return api.post(`${API_URL}/api/v1/payments/save-stripe-info/`, data)
  }

  static getClientSecret(data={}){
      return api.post(`${API_URL}/api/v1/payments/setup-intent/`, data)
    }
  // static getSetupIntent(data={}){
  //   return api.get(`${API_URL}/api/v1/payments/setup-intent/`, data)
  // }

  static getStripePK(data={}){
      return api.get(`${API_URL}/api/v1/payments/publishable-key/`, data)
    }
}