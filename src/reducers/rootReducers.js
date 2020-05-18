const iniState= {
    users:[
        {id:1,
        icon:null,
        username:"",
        password:"",
        profile:"",
        strkeys:[],
        scenelist:[{name:"streampage",screenshot:null,state:[]}],
        /*customemized scene content with their css status*/
        scenetoollist:[[{toolid:1,active:true,pcss:[]},
                       {toolid:2,active:true,pcss:[]},
                       {toolid:3,active:true,pcss:[]},
                       {toolid:4,active:true,pcss:[]}
                        ],
                       []
                      ],
        /*privately created tools*/
        ptooldata:[{ptoolid:1, type:"img",url:"/frame2.png",name:"menu"},
                   {ptoolid:2,type:"img",url:"/frame1.jpg",name:"top-bar"},
                   {ptoolid:3,type:"img",url:"/frame3.jpg",name:"bottom-bar"},
                   {ptoolid:4,type:"img", url:"/frame4.jpg",name:"mark"}
                  ],
        friends:[]
        }
    ],
    ctoollist:[],
    ctooldata:[],
    activeaccount:{id:1}
}


const rootReducer = (state=iniState, action) =>{
    console.log(action)
    if (action.type==="DELETE_TOOL"){
        const activeuser=state.users.filter(user=>{return user.id===1})
        const activescenetool=activeuser[0].scenetoollist[0]; 
        let newscenetool=activescenetool.filter(tool=>{
            return action.id !==tool.toolid
        });
        console.log(newscenetool);
         return{
            ...state,
            users:[
                ...state.users,
                {
                 ...state.users[0],
                 scenetoollist:[
                    newscenetool,
                    state.users[0].scenetoollist[1]
                 ]

                }

            ]
        }
        
        
    }

    return state;
}

export default rootReducer