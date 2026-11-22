import React from 'react'
/**
 * 统一错误处理工具类
 */

// 错误类型枚举
export const ErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  CLIENT_ERROR: 'CLIENT_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

// 自定义错误类
export class AppError extends Error {
  constructor(message, type = ErrorTypes.UNKNOWN_ERROR, statusCode = 500, details = null) {
    super(message)
    this.name = 'AppError'
    this.type = type
    this.statusCode = statusCode
    this.details = details
    this.timestamp = new Date().toISOString()
    
    // 保持堆栈跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}

// 网络错误类
export class NetworkError extends AppError {
  constructor(message = '网络连接失败', details = null) {
    super(message, ErrorTypes.NETWORK_ERROR, 0, details)
    this.name = 'NetworkError'
  }
}

// API错误类
export class ApiError extends AppError {
  constructor(message = 'API请求失败', statusCode = 500, details = null) {
    super(message, ErrorTypes.API_ERROR, statusCode, details)
    this.name = 'ApiError'
  }
}

// 验证错误类
export class ValidationError extends AppError {
  constructor(message = '数据验证失败', details = null) {
    super(message, ErrorTypes.VALIDATION_ERROR, 400, details)
    this.name = 'ValidationError'
  }
}

/**
 * 错误处理器
 */
export class ErrorHandler {
  static logError(error, context = '') {
    const errorInfo = {
      message: error.message,
      type: error.type || ErrorTypes.UNKNOWN_ERROR,
      statusCode: error.statusCode || 500,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
      url: typeof window !== 'undefined' ? window.location.href : 'Server'
    }

    // 开发环境下输出详细错误信息
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Error Details:', errorInfo)
    } else {
      // 生产环境下只输出基本信息
      console.error('Error:', error.message, 'Type:', error.type)
    }

    // 这里可以添加错误上报逻辑
    // 例如发送到错误监控服务
    this.reportError(errorInfo)
  }

  static reportError(errorInfo) {
    // 错误上报逻辑
    // 可以集成 Sentry、LogRocket 等错误监控服务
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: errorInfo.message,
        fatal: false
      })
    }
  }

  static handleApiError(error) {
    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response
      throw new ApiError(
        data?.message || '服务器错误',
        status,
        data
      )
    } else if (error.request) {
      // 请求已发出但没有收到响应
      throw new NetworkError('网络连接超时或服务器无响应')
    } else {
      // 其他错误
      throw new AppError(error.message || '未知错误')
    }
  }

  static async safeExecute(fn, fallback = null, context = '') {
    try {
      return await fn()
    } catch (error) {
      this.logError(error, context)
      return fallback
    }
  }

  static createErrorBoundary(fallbackComponent) {
    return class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
      }

      static getDerivedStateFromError(error) {
        return { hasError: true, error }
      }

      componentDidCatch(error, errorInfo) {
        ErrorHandler.logError(error, `ErrorBoundary: ${errorInfo.componentStack}`)
      }

      render() {
        if (this.state.hasError) {
          return fallbackComponent || <div>Something went wrong.</div>
        }

        return this.props.children
      }
    }
  }
}

// 全局错误处理
export const setupGlobalErrorHandling = () => {
  // 处理未捕获的Promise拒绝
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
      ErrorHandler.logError(
        new AppError(event.reason?.message || 'Unhandled Promise Rejection'),
        'Global Promise Rejection'
      )
      event.preventDefault()
    })

    // 处理全局JavaScript错误
    window.addEventListener('error', (event) => {
      ErrorHandler.logError(
        new AppError(event.message || 'Global JavaScript Error'),
        `Global Error: ${event.filename}:${event.lineno}:${event.colno}`
      )
    })
  }
}

export default ErrorHandler
