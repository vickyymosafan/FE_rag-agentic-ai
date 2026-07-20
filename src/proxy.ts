import { auth } from "../auth"

export { auth as proxy }

export const config = {
  matcher: ["/admin/:path*"],
}
