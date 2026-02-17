import { createClient } from "next-sanity";
import { apiVersionServer, datasetServer, projectIdServer, token } from '../env.server'

export const sanityServerClient = createClient({
    projectId: projectIdServer,
    dataset: datasetServer,
    apiVersion: apiVersionServer, 
    token: token,
    useCdn: false
});
