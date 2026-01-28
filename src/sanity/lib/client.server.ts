import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from '../env'

export const sanityServerClient = createClient({
    projectId: projectId,
    dataset: dataset,
    apiVersion: apiVersion, 
    token: token,
    useCdn: false,
});
