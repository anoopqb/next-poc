'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateOnDemandPage() {
    // Invalidate the cache for the /on-demand-isr route
    revalidatePath(`${process.env.NEXT_PUBLIC_APP_URL}/on-demand-isr`)
    return { revalidated: true, timestamp: new Date().toISOString() }
}

