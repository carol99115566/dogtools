import axios from 'axios'
import { API_BASE_URL } from './constant'
import { AUTH_TOKEN_KEY } from '@/utils/constant'
import { history } from 'umi'
import { notification } from 'antd'

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // 基础请求地址
  timeout: 600000, // 请求超时
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求前做一些处理，添加token
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.status === 431) {
      // 处理未授权错误，例如跳转到登录页面
      notification.warning({
        message: 'Signed out, please login',
      })
      history.replace('/')
      return
    }
    return response.data
  },
  (error) => {
    if (error.response) {
      // 服务器返回了一个状态码，表示请求失败
      const { status, data } = error.response
      if (status === 431) {
        // 处理未授权错误，例如跳转到登录页面
        notification.warning({
          message: 'Signed out, please login',
        })
        history.replace('/')
      } else {
        // 其他错误提示
        console.error(data.message || '请求失败')
      }
    } else if (error.request) {
      // 请求已发出，但未收到响应
      console.error('网络错误')
    } else {
      // 其他错误
      console.error('请求错误', error.message)
    }
    return Promise.reject(error)
  },
)

// 封装 GET 请求
export const get = (url: string, params = {}) => {
  return axiosInstance.get(url, { params })
}

// 封装 POST 请求
export const post = (url: string, data = {}, ...args) => {
  return axiosInstance.post(url, data, ...args)
}

// 封装其他请求方法
export const put = (url: string, data = {}) => {
  return axiosInstance.put(url, data)
}

export const del = (url: string) => {
  return axiosInstance.delete(url)
}

export default axiosInstance
