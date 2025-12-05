import { createClient } from "next-sanity";
import { dataset, projectId, apiVersion } from "../env";

const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

export function getVideoUrl(video: any) {
    if (!video?.asset?._ref) return undefined;

    // Use Sanity CDN URL
    const ref = video.asset._ref;
    // Format: file-<id>-<extension>
    const [_, id, extension] = ref.split("-");
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}
