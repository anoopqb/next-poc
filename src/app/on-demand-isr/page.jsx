import RevalidateButton from './revalidate-button'

// Enable ISR with on-demand revalidation
export const revalidate = 60 // Revalidate at most every 60 seconds

const OnDemandISRPage = () => {
    const timestamp = new Date().toISOString()

    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
            <h1>On Demand ISR Page</h1>
            <p>This page is statically generated and can be updated on demand using revalidatePath.</p>
            <div style={{
                background: '#f0f0f0',
                padding: '1rem',
                borderRadius: '8px',
                margin: '1rem 0',
                color: 'black',
            }}>
                <strong>Last Generated:</strong> {timestamp}
            </div>
            <RevalidateButton />
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: '#e3f2fd',
                borderRadius: '8px',
                color: 'black',
            }}>
                <h3>How it works:</h3>
                <ul>
                    <li>This page is statically generated with a revalidation period of 60 seconds</li>
                    <li>Click "Revalidate Page" to trigger on-demand revalidation</li>
                    <li>The <code>revalidatePath()</code> function invalidates the cache immediately</li>
                    <li>Refresh the page to see the updated timestamp</li>
                </ul>
            </div>
        </div>
    )
}

export default OnDemandISRPage