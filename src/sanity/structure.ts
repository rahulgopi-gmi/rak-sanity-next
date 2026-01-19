import { ActivityIcon, CogIcon, DocumentsIcon, FeedbackIcon, TagsIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([

      // BLOG SECTION
      S.listItem()
        .title('Blog')
        .icon(FeedbackIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('category')
                .title('Categories')
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }]) // order by title
                    .filter('_type == "category"') // basic filter example
                ),

              S.documentTypeListItem('post')
                .title('Posts')
                .child(
                  S.documentTypeList('post')
                    .title('Posts')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                    .filter('_type == "post"')
                ),

              S.documentTypeListItem('author')
                .title('Authors')
                .child(
                  S.documentTypeList('author')
                    .title('Authors')
                    .defaultOrdering([{ field: 'name', direction: 'asc' }])
                ),
            ])
        ),

      // ACTIVITIES SECTION
      S.listItem()
        .title('Activities')
        .icon(ActivityIcon)
        .child(
          S.list()
            .title('Activities')
            .items([
              S.documentTypeListItem('standardActivities')
                .title('Standard Activities')
                .child(
                  S.documentTypeList('standardActivities')
                    .title('Standard Activities')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),

              S.documentTypeListItem('customActivities')
                .title('Custom Activities')
                .child(
                  S.documentTypeList('customActivities')
                    .title('Custom Activities')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),

              S.documentTypeListItem('premiumActivities')
                .title('Premium Activities')
                .child(
                  S.documentTypeList('premiumActivities')
                    .title('Premium Activities')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
            ])
        ),

      // PACKAGES
      S.listItem()
        .title('Packages')
        .icon(TagsIcon)
        .child(
          S.documentTypeList('packages')
            .title('Packages')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]) // sort by custom order
        ),

      S.divider(),

      // PAGES
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      S.divider(),

      // SETTINGS
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Settings')
        ),

      S.divider(),

      // ALL OTHER DOCUMENT TYPES
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'post',
            'category',
            'author',
            'standardActivities',
            'customActivities',
            'premiumActivities',
            'packages',
            'page',
            'settings'
          ].includes(item.getId()!)
      ),
    ])
