'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateOnDemandPage() {
    // Invalidate the cache for the /on-demand-isr route
    revalidatePath('/on-demand-isr')
    return { revalidated: true, timestamp: new Date().toISOString() }
}

