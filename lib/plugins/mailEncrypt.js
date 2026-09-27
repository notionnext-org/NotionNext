export const handleEmailClick = (e, emailIcon, CONTACT_EMAIL) => {
  if (CONTACT_EMAIL && emailIcon && !emailIcon.current.href) {
    e.preventDefault()
    const email = decryptEmail(CONTACT_EMAIL)
    emailIcon.current.href = `mailto:${email}`
    emailIcon.current.click()
  }
}

export const encryptEmail = email => {
  return btoa(unescape(encodeURIComponent(email)))
}

export const decryptEmail = encryptedEmail => {
  try {
    return decodeURIComponent(escape(atob(encryptedEmail)))
  } catch (error) {
    console.error('解密邮箱失败:', error)
    return encryptedEmail
  }
}

/** 将配置中的 CONTACT_EMAIL（可能为 base64 密文）解析为可显示的明文 */
export const resolveContactEmail = raw => {
  if (!raw || typeof raw !== 'string') {
    return ''
  }
  if (raw.includes('@')) {
    return raw
  }
  return decryptEmail(raw)
}
