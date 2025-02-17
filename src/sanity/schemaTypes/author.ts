
export const author = {
    name:'author',
    type:'document',
    title:'Author',
    fields:[
        {
            name:'name',
            type:'string',
            title:'name'
        },
        {
            name:"image",
            type:"image",
            title:"Image",
            options:{
                hotspot:true
            }
        },
        {
            name:'bio',
            type:'string',
            title:'bio'
        }
    ]
}
