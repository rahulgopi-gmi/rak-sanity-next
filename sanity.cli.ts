/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

function requireEnv(name: string): string {
    const value = process.env[name]
    if (!value || value.trim() === '') {
        console.error(`Missing required environment variable: ${name} Sanity CLI cannot run without this value.
            Make sure it is defined, for example: export ${name}=your-value
            # or
            ${name}=your-value npx sanity <command>
        `);
        process.exit(1);
    }
    return value;
}

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const projectId = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID')
const dataset = requireEnv('NEXT_PUBLIC_SANITY_DATASET')

export default defineCliConfig({ 
    api: { 
        projectId, 
        dataset
    } 
})
