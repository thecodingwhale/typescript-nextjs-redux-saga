import Router from 'next/router'
import nookies from 'nookies'

export const auth = (ctx) => {
  const cookies = nookies.get(ctx)
  if (ctx.req && !cookies.token) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
    return
  }
  if (!cookies.token) {
    Router.push('/')
  }
  return cookies.token
}
