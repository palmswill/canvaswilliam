import {createStore} from 'redux';



const iniState= {
    users:[
        {id:1,
        icon:null,
        username:"",
        password:"",
        profile:"",
        strkeys:[],
        activescene:"1",
        scenelist:[{id:"1" , name:"streampage",screenshot:null,state:[]}],
        /*customemized scene content with their css status*/
        scenetoollist:[{id:"1",
                        tools:[
                        {toolid:1,active:true,ttype:"p",css:{},opacity:0.5,zdex:3},
                       {toolid:4,active:true,ttype:"p",css:{},opacity:0.7,zdex:4},
                       {toolid:3,active:false,ttype:"p",css:{},opacity:0.3,zdex:2},
                       {toolid:2,active:true,ttype:"p",css:{},opacity:1,zdex:1}
        ]}],
        /*privately created tools*/
        ptooldata:[{toolid:1, type:"img",url:"/frame2.png",name:"menu"},
                   {toolid:2,type:"img",url:"/frame1.jpg",name:"top-bar"},
                   {toolid:3,type:"img",url:"/frame3.jpg",name:"bottom-bar"},
                   {toolid:4,type:"img", url:"/frame4.jpg",name:"mark"}
                  ],
        friends:[]
        }
    ],
    ctoollist:[],
    ctooldata:[],
    activeaccount:"1"
}




const rootReducer = (state=iniState, {type, payload}) =>{

    const actuser=state.users.findIndex(user=>user.id===Number(state.activeaccount))
    const actscene=state.users[actuser].scenetoollist.findIndex(scene=>scene.id===state.users[actuser].activescene)
    switch(type){
        case 'ADD_TOOL':
            return{
                ...state,
                users:[...state.users,
                    state.users[actuser]={
                    ...state.users[actuser],
                    scenetoollist:[
                        ...state.users[actuser].scenetoollist,
                        state.users[actuser].scenetoollist[actscene]=[
                            ...state.users[actuser].scenetoollist[actscene],
                            payload
                        ]
                    
                    ]
                    }

                ]

            };
        case 'DELETE_TOOL':
            return {
                ...state,
                users:[...state.users.filter(user=>(user.id===actuser)),
                    state.users[actuser]={
                        ...state.users[actuser],
                        scenetoollist:[
                            ...state.users[actuser].scenetoollist.filter(scenetool=>scenetool.id===actscene),
                            {   id:state.users[actuser].activescene,
                                tools:state.users[actuser].scenetoollist[actscene].tools.filter(tool=>!(tool.toolid ===payload[1] &&tool.ttype ===payload[0]))
                            }
                        ]
                        }
                ]
            };
            case 'HIDESHOW_TOOL':
                let mirror=JSON.parse(JSON.stringify(state.users[actuser].scenetoollist[actscene].tools.filter(tool=>(tool.toolid ===payload[1] &&tool.ttype ===payload[0]))[0]))
                if (mirror.active){
                mirror.css.opacity=0;
                }
                if (!mirror.active){
                mirror.css.opacity=mirror.opacity;
                }
                mirror.active=!mirror.active;
                return {
                    ...state,
                    users:[...state.users.filter(user=>(user.id===actuser)),
                        state.users[actuser]={
                            ...state.users[actuser],
                            scenetoollist:[
                                ...state.users[actuser].scenetoollist.filter(scenetool=>scenetool.id===actscene),
                                {   id:state.users[actuser].activescene,
                                    tools:[...state.users[actuser].scenetoollist[actscene].tools.filter(tool=>!(tool.toolid ===payload[1] &&tool.ttype ===payload[0])),
                                            mirror]
                                }
                            ]
                            }
                    ]
                };
        default:
            return state;

    }
    
}

export const addtool=(tooltype,toolid)=>({
    type:'ADD_TOOL',
    payload:[tooltype,toolid]
})

export const deleteTool=(tooltype,toolid)=>({
    type:'DELETE_TOOL',
    payload: [tooltype,toolid]

})

export const hideShowTool= (tooltype,toolid)=>({
    type:'HIDESHOW_TOOL',
    payload:[tooltype,toolid]
})


export const store= createStore(
    rootReducer,
    iniState,
)