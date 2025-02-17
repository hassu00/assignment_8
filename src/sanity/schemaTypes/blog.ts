

export const blog ={
    name:"blog",
    type:"document",
    title:"blog",
    fields:[
        {
            name:"title",
            type:"string",
            title:"Title"
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
            }
        },
        {
            name:"date",
            type:"date",
            title:"Date"
            
        },
        {
            name:"tags",
            type:"tag",
            title:"Tag",
            of:[{ type: 'reference', to: [{ type: 'tag' }] }],
        },
        {
            name:"content",
            type:"array",
            title:"Content",
            of: [{ type: 'block' }],
        },
        {
            name:"author",
            type:"reference",
            title:"Author",
            to:{type:"author"}
        },
        {
            name:"image",
            type:"image",
            title:"Image",
            options:{
                hotspot:true
            },
            fields: [
              {
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
              },
            ]
        }

        // Add more fields as needed for your blog posts. For example, author, tags, etc.
    ]
}