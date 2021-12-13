import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@/config";

const config: AxiosRequestConfig = { baseURL: API_URL };

export const axios = Axios.create(config);
