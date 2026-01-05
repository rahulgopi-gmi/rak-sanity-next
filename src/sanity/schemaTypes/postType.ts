import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,

  groups: [
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],

  fields: [
    {
      name: 'title',
      type: 'string',
      group: 'content',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      group: 'content'
    },
    {
      name: "showInSlider",
      title: "Show in Top Slider",
      type: "boolean",
      group: "content",
      initialValue: false,
    },
    {
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
      group: 'content',
    },
    {
      name: 'mainImage',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    },
    {
      name: 'categories',
      type: 'array',
      of: [
        {type: 'reference', to: {type: 'category'}}
      ],
      group: 'content'
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      group: 'content'
    },
    {
      name: 'body',
      type: 'blockContent',
      group: 'content'
    },
    {
      name: "seo",
      title: "SEO Metadata",
      type: "seoMeta",
      group: 'seo',
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
