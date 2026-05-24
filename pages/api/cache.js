import { cleanCache } from '@/lib/cache/local_file_cache'

/**
 * 清理缓存
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' })
  }

  const token = process.env.CACHE_REVALIDATION_TOKEN
  if (token && req.headers.authorization !== `Bearer ${token}`) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' })
  }

  try {
    await cleanCache()
    res.status(200).json({ status: 'success', message: 'Clean cache successful!' })
  } catch (error) {
    console.error('Cache clean error:', error)
    res.status(400).json({ status: 'error', message: 'Clean cache failed!' })
  }
}
