export default {
  name: 'referAFriendForm',
  title: 'Refer a Friend Form',
    type: 'object',
  fields: [
    {
      name: 'yourName',
      title: 'Your Name',
      type: 'string',
      validation: (Rule : any) => Rule.required(),
    },
    {
      name: 'yourPhone',
      title: 'Your Phone Number',
      type: 'string',
      description: 'Include country code',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'yourEmail',
      title: 'Your Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'investedIn',
      title: 'Are you an existing customer registered in Investank City?',
      type: 'boolean',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'refereeName',
      title: 'Referee Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'refereePhone',
      title: 'Referee Phone Number',
      type: 'string',
      description: 'Include country code',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'refereeEmail',
      title: 'Referee Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.email(),
    },
    {
      name: 'disclaimer',
      title: 'Disclaimer / Terms Text',
      type: 'text',
      description: 'Optional marketing text or legal notice',
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Refer Friend Form",
      };
    }
  }
}
