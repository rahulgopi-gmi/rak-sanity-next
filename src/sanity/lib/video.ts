import { dataset, projectId } from "../env";

/**
 * Sanity video asset
 */
type SanityVideoAsset = {
    _ref?: string;
    url?: string;
};

/**
 * Sanity video block
 */
export type SanityFileBlock = {
    _type: "video";
    asset?: SanityVideoAsset;
};

/**
 * Type guard to narrow unknown → SanityFileBlock 
 */
function SanityFileBlock (value: unknown): value is SanityFileBlock  {
  return (
    typeof value === "object" &&
    value !== null &&
    "_type" in value &&
    (value)._type === "file"
  );
}


/**
 * Safely generate a video URL from a Sanity video block
 */
export function getVideoUrl(value: unknown): string | undefined {    
    try{
        if (!SanityFileBlock(value)) return undefined;

        const asset = value.asset;
        if (!asset) return undefined;

        // Preferred: direct URL (newer Sanity)
        if (asset.url) return asset.url;

        // Legacy fallback: file-<id>-<extension>
        if (!asset._ref) return undefined;

        const parts = asset._ref.split("-");
        if (parts.length < 3) return undefined;

        const [, id, extension] = parts;
        if (!id || !extension) return undefined;
        return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
    } 
    catch (error) {
        console.error("getVideoUrl failed:", error);
        return undefined;
    }    
}
