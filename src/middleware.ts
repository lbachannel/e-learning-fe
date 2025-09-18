export { auth as middleware } from "@/auth";


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   // debug logs (sẽ hiển thị trong logs hosting, ví dụ Vercel logs)
//   console.log('[MIDDLEWARE] pathname=', request.nextUrl.pathname)
//   console.log('[MIDDLEWARE] href=', request.nextUrl.href)
//   console.log('[MIDDLEWARE] host=', request.headers.get('host'))
//   console.log('[MIDDLEWARE] env=', process.env.NODE_ENV)
//   console.log('[MIDDLEWARE] cookie token=', request.cookies.get('token')?.value ?? '<no-token>')
//     console.log(request.nextUrl);
//   // ... existing logic
//   return NextResponse.next()
// }
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)|auth|verify|$).*)"],
    runtime: 'nodejs',
}