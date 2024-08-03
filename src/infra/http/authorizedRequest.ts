/* eslint-disable @typescript-eslint/no-explicit-any */
// authService.ts
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"; 
import { LoginResponse } from "../../interfaces/login-response/login-response";
import env from "../env/env";

// Função para obter o token de autenticação do localStorage
const getAuthToken = (): string | null => {
  const token = localStorage.getItem('account');
  if (token) {
    try {
      const account: LoginResponse = JSON.parse(token);
      return account.token;
    } catch (error) {
      console.error("Error parsing account data:", error);
    }
  }
  return null;
};

// Função genérica para fazer requisições autorizadas
export const makeAuthorizedRequest = async <T = any>(
  method: Method,
  url: string,
  params?: any,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const token = getAuthToken();
    const config: AxiosRequestConfig = {
      method,
      url: `${env.apiUrl}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    if (method === 'GET' || method === 'DELETE') {
      config.params = params;
    } else {
      config.data = params;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
};
