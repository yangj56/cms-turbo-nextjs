'use client'

import { useRouter } from 'next/navigation'

export function PublishButton() {
  const router = useRouter()

  const handlePublish = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to revalidate')
      }

      // Refresh the current route
      router.refresh()
    } catch (error) {
      console.error('Error publishing:', error)
    }
  }

  return (
    <div className="flex flex-row justify-end items-end w-full">
      <button
        onClick={handlePublish}
        className="w-[200px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Publish Changes
      </button>
    </div>
  )
}
