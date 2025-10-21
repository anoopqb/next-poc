import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";

// Initialize CloudFront client with configuration
// CloudFront is a global service, so we use us-east-1 region
const cloudFrontClient = new CloudFrontClient({
    region: "us-east-1",
    // Add credentials if needed (will use default credential chain if not specified)
});

/**
 * Invalidates CloudFront cache for the specified paths
 * @param paths - Array of paths to invalidate (e.g., ['/page1', '/page2/*'])
 * @returns Promise that resolves when invalidation is created
 * @throws Error if CLOUDFRONT_DISTRIBUTION_ID is not set or invalidation fails
 */
export async function invalidateCloudFrontPaths(paths: string[]): Promise<void> {
    const distributionId = process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_ID;

    if (!distributionId) {
        throw new Error("NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_ID environment variable is not set");
    }

    if (!paths.length) {
        console.warn("No paths provided for CloudFront invalidation");
        return;
    }

    try {
        const command = new CreateInvalidationCommand({
            DistributionId: distributionId,
            InvalidationBatch: {
                CallerReference: `${Date.now()}`,
                Paths: {
                    Quantity: paths.length,
                    Items: paths,
                },
            },
        });

        // THIS WAS MISSING - Actually send the command!
        const response = await cloudFrontClient.send(command);
        console.log(`CloudFront invalidation created for ${paths.length} path(s)`, response.Invalidation?.Id);
    } catch (error) {
        console.error("Failed to invalidate CloudFront paths:", error);
        throw error;
    }
}

/**
 * Invalidates a single CloudFront path
 * @param path - Path to invalidate
 */
export async function invalidateCloudFrontPath(path: string): Promise<void> {
    return invalidateCloudFrontPaths([path]);
}