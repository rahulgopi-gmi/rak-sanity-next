'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

import Image from 'next/image'

function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Image
        src="./src/sanity/static/innovation-city-logo.svg"
        alt="Innovation City"
        width={50}
        height={50}
      />
      <span style={{ fontWeight: 600 }}>Innovation City</span>
    </div>
  )
}

export default defineConfig({
  name: 'innovation-studio',
  title: 'Innovation City Studio', 
  basePath: '/studio',
  projectId,
  dataset,  
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  studio: {
    components: {
      logo: StudioLogo, //Custom logo component
    },
  },
  icon:StudioLogo,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
