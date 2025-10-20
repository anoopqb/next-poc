'use client'

import { useState } from 'react'
import { revalidateOnDemandPage } from './actions'

export default function RevalidateButton() {
    const [isRevalidating, setIsRevalidating] = useState(false)
    const [message, setMessage] = useState('')

    const handleRevalidate = async () => {
        setIsRevalidating(true)
        setMessage('')

        try {
            const result = await revalidateOnDemandPage()
            if (result.revalidated) {
                setMessage(`✓ Cache revalidated successfully at ${result.timestamp}. Refresh to see updated content.`)
            }
        } catch (error) {
            setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Failed to revalidate'}`)
        } finally {
            setIsRevalidating(false)
        }
    }

    return (
        <div>
            <button
                onClick={handleRevalidate}
                disabled={isRevalidating}
                style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                    background: isRevalidating ? '#9e9e9e' : '#2563eb',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isRevalidating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                }}
            >
                {isRevalidating ? 'Revalidating...' : 'Revalidate Page'}
            </button>
            {message && (
                <p style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: message.startsWith('✓') ? '#d4edda' : '#f8d7da',
                    color: message.startsWith('✓') ? '#155724' : '#721c24',
                    borderRadius: '4px'
                }}>
                    {message}
                </p>
            )}
        </div>
    )
}

