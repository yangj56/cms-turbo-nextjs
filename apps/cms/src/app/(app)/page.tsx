import type { NextPage } from 'next'
import Link from 'next/link'

import React from 'react'

const Page: NextPage = () => {
  return (
    <div className="container">
      <h1 className="text-4xl font-bold">Welcome to honest cms</h1>
      <Link href="/admin">Click here to redirect to admin portal</Link>
    </div>
  )
}

export default Page