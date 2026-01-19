import { 
  createImageUrlBuilder, 
  ImageFormat, 
  ImageUrlBuilder, 
  SanityImageSource 
} from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder: ImageUrlBuilder = createImageUrlBuilder({ 
  projectId, 
  dataset
});

type ImageOptions = {
  width?: number;
  height?: number;
  blur?: number;
  format?: ImageFormat;
};

export const urlFor = (
  source: SanityImageSource | undefined,
  options: ImageOptions = {}
): string | undefined => {
  if (!source) return undefined;

  let image = builder.image(source);
  image = image
    .auto("format")
    .fit("max");

  if (options?.width) image = image.width(options.width)
  if (options?.height) image = image.height(options.height)
  if (options?.blur) image = image.blur(options.blur)
  if (options?.format) image = image.format(options.format)

  return image.url();
}
