import { type SchemaTypeDefinition } from 'sanity'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { page } from './documents/page'
import { packages } from './documents/package'
import heroSection from './objects/heroSection'
import card from './objects/card'
import imageView from './objects/imageView'
import seoMeta from './objects/seoMeta'
import featureItem from './objects/featureItem'
import referAFriendForm from './objects/referAFriendForm'
import contactForm from './objects/contactForm'
import standardActivities from './documents/standardActivities'
import customActivities from './documents/customActivities'
import premiumActivities from './documents/premiumActivities'
import campaigns from './objects/campaigns'
import settings from './documents/settings'
import aboutSection from './objects/aboutSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [    
    page,
    blockContentType,
    categoryType, 
    postType,
    aboutSection,
    authorType,
    heroSection,
    card,
    imageView,
    packages,
    seoMeta,
    featureItem,
    contactForm,
    referAFriendForm,
    standardActivities,
    customActivities,
    premiumActivities,
    campaigns,
    settings
  ],
}
