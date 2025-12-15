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
                  .child(S.documentTypeList('category').title('Categories')),

                S.documentTypeListItem('post')
                  .title('Posts')
                  .child(S.documentTypeList('post').title('Posts')),

                S.documentTypeListItem('author')
                  .title('Authors')
                  .child(S.documentTypeList('author').title('Authors')),
              ])
          ),

        //S.divider(),

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
                  .child(S.documentTypeList('standardActivities').title('Standard Activities')),

                S.documentTypeListItem('customActivities')
                  .title('Custom Activities')
                  .child(S.documentTypeList('customActivities').title('Custom Activities')),

                S.documentTypeListItem('premiumActivities')
                  .title('Premium Activities')
                  .child(S.documentTypeList('premiumActivities').title('Premium Activities')),
              ])
          ),

        //S.divider(),
        S.listItem()
          .title("Packages")
          .icon(TagsIcon)
          .child(S.documentTypeList("packages").title("Packages")),

        S.divider(),
        S.listItem()
          .title("Pages")
          .icon(DocumentsIcon)
          .child(S.documentTypeList("page").title("Pages")),

        S.divider(),
        S.listItem()
          .title("Settings")
          .icon(CogIcon)
          .child(S.documentTypeList("settings").title("Settings")),

        //S.divider(),
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
