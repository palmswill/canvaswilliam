import {createStore} from 'redux';



const iniState= {
    users:[
        {id:"1",
        icon:null,
        username:"",
        password:"",
        profile:"",
        strkeys:[],
        activescene:"1",
        scenelist:[{id:"1" , name:"streampage",screenshot:"/waitscreen1.jpg"},
                    {id:"2" , name:"activepage",screenshot:"/waitscreen2.png"},
                    {id:"3" , name:"activepage",screenshot:"/waitscreen2.png"}
        ],
        /*customemized scene content with their css status*/
        scenetoollist:[{id:"1",
                        tools:[
                        {toolid:1,active:true,ttype:"p",css:{},opacity:0.5,zdex:3},
                       {toolid:4,active:true,ttype:"p",css:{},opacity:0.7,zdex:4},
                       {toolid:3,active:false,ttype:"p",css:{},opacity:0.3,zdex:2},
                       {toolid:2,active:true,ttype:"p",css:{},opacity:1,zdex:1}
        ]},
        {id:"2",
                        tools:[
                        {toolid:1,active:true,ttype:"p",css:{},opacity:1,zdex:3},
                       {toolid:4,active:true,ttype:"p",css:{},opacity:1,zdex:4},
                       {toolid:3,active:false,ttype:"p",css:{},opacity:1,zdex:2},
                       {toolid:2,active:true,ttype:"p",css:{},opacity:1,zdex:1}
        ]},

        {id:"3",
                        tools:[
                        {toolid:1,active:true,ttype:"p",css:{},opacity:1,zdex:3},
                       {toolid:4,active:true,ttype:"p",css:{},opacity:1,zdex:4},
                       {toolid:3,active:false,ttype:"p",css:{},opacity:1,zdex:2},
                       {toolid:5,active:true,ttype:"p",css:{},opacity:1,zdex:1}
        ]}

    
        ],
        /*privately created tools*/
        ptooldata:[{toolid:1, type:"img",url:"/frame2.png",name:"menu"},
                   {toolid:2,type:"img",url:"/frame1.jpg",name:"top-bar"},
                   {toolid:3,type:"img",url:"/frame3.jpg",name:"bottom-bar"},
                   {toolid:4,type:"img", url:"/frame4.jpg",name:"mark"},
                   {toolid:5,type:"img", url:"/waitscreen3.png",name:"waitscreen"}
                  ],
        friends:[]
        },
        {id:"2"}
    ],
    ctoollist:[],
    ctooldata:[],
    activeaccount:"1"
}


///quick sort according to zdex
function quickSort(arr) {
    // Base case
    if (!arr.length) return []

    const [head, ...tail] = arr,
          
          left = tail.filter( e => e.zdex < head.zdex),
          right = tail.filter( e => e.zdex >= head.zdex)

       return (quickSort(left).concat(head, quickSort(right)))

}
function quickRever(arr){
    return quickSort(arr).reverse();
}

/////////////////////////////////////////////////////////////////// reducer////////////////////////////////////////
const rootReducer = (state=iniState, {type, payload}) =>{
    ///capture active user and scene
    const actuserid=state.activeaccount;
    const actuser=state.users.findIndex(user=>user.id===state.activeaccount)
    const actscene=state.users[actuser].scenetoollist.findIndex(scene=>scene.id===state.users[actuser].activescene)
    const actsceneid=state.users[actuser].activescene
    ///sorting tools in active user
    let mirror=JSON.parse(JSON.stringify(state.users[actuser].scenetoollist));
    for (let sceneid in mirror){
        mirror[sceneid].tools=quickRever(mirror[sceneid].tools)
    }
    ///
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

            /////cases for toolbar
        case 'DELETE_TOOL':
            console.log(actscene)
            return {
                ...state,
                users:[...state.users.filter(user=>(user.id!==actuserid)),
                    state.users[actuser]={
                        ...state.users[actuser],
                        scenetoollist:[
                            ...state.users[actuser].scenetoollist.filter(scenetool=>scenetool.id!==actsceneid),
                            {   id:state.users[actuser].activescene,
                                tools:quickRever(state.users[actuser].scenetoollist[actscene].tools.filter(tool=>!(tool.toolid ===payload[1] &&tool.ttype ===payload[0])))
                            }
                        ]
                        }
                ]
            };
            case 'HIDESHOW_TOOL':
                mirror=JSON.parse(JSON.stringify(state.users[actuser].scenetoollist[actscene].tools.filter(tool=>(tool.toolid ===payload[1] &&tool.ttype ===payload[0]))[0]))
                if (mirror.active){
                mirror.css.opacity=0;
                }
                if (!mirror.active){
                mirror.css.opacity=mirror.opacity;
                }
                mirror.active=!mirror.active;
                return {
                    ...state,
                    users:[...state.users.filter(user=>(user.id!==actuserid)),
                        state.users[actuser]={
                            ...state.users[actuser],
                            scenetoollist:[
                                ...state.users[actuser].scenetoollist.filter(scenetool=>scenetool.id!==actsceneid),
                                {   id:state.users[actuser].activescene,
                                    tools:quickRever([...state.users[actuser].scenetoollist[actscene].tools.filter(tool=>!(tool.toolid ===payload[1] &&tool.ttype ===payload[0])),
                                            mirror])
                                }
                            ]
                            }
                    ]
                };


                case 'TOOL_UP':
                    mirror=JSON.parse(JSON.stringify(state.users[actuser].scenetoollist[actscene].tools))
                    for (let order in mirror){
                        if (order !=="0" &&mirror[order].toolid ===payload[1] &&mirror[order].ttype ===payload[0]){
                            order=Number(order);
                            [mirror[order].zdex ,mirror[order-1].zdex]=[mirror[order-1].zdex ,mirror[order].zdex];
                            [mirror[order],mirror[order-1]]=[mirror[order-1],mirror[order]];
                            break;
                        }
                        
                    }

                    return {
                        ...state,
                        users:[...state.users.filter(user=>(user.id!==actuserid)),
                            state.users[actuser]={
                                ...state.users[actuser],
                                scenetoollist:[
                                    ...state.users[actuser].scenetoollist.filter(scenetool=>scenetool.id!==actsceneid),
                                    {   id:state.users[actuser].activescene,
                                        tools:mirror
                                    }
                                ]
                                }
                        ]
                    }; 
                case 'TOOL_DOWN':
                    console.log(mirror)
                    mirror=JSON.parse(JSON.stringify(state.users[actuser].scenetoollist[actscene].tools))
                    for (let order in mirror){
                        if (( order!== (mirror.length-1).toString() &&mirror[order].toolid ===payload[1] &&mirror[order].ttype ===payload[0])){
                            order=Number(order)
                            mirror[order].zdex --;
                            mirror[order+1].zdex ++;
                            [mirror[order],mirror[order+1]]=[mirror[order+1],mirror[order]];
                            break;
                        }
                        
                    }
                    return {
                        ...state,
                        users:[...state.users.filter(user=>(user.id!==actuserid)),
                            state.users[actuser]={
                                ...state.users[actuser],
                                scenetoollist:[
                                    ...state.users[actuser].scenetoollist.filter(scenetool=>scenetool.id!==actsceneid),
                                    {   id:state.users[actuser].activescene,
                                        tools:mirror
                                    }
                                ]
                                }
                        ]
                    }; 
                    /////// cases end for toolbar
            case 'SECENE_SELECT':
            return {
                ...state,
                users:[...state.users.filter(user=>(user.id!==actuserid)),
                    state.users[actuser]={
                        ...state.users[actuser],
                        activescene:payload
                        }
                ]
            };
            
        default:
            return {
                ...state,
                users:[...state.users.filter(user=>(user.id!==actuserid)),
                    state.users[actuser]={
                        ...state.users[actuser],
                        scenetoollist:mirror
                        }
                ]
            };;

    }
    
}

///for toolbox

export const addtool=(tooltype,toolid)=>({
    type:'ADD_TOOL',
    payload:[tooltype,toolid]
})

export const deleteTool=(tooltype,toolid)=>({
    type:'DELETE_TOOL',
    payload: [tooltype,toolid]

})

export const toolUp=(tooltype,toolid)=>({
    type:'TOOL_UP',
    payload:[tooltype,toolid]

})

export const toolDown=(tooltype,toolid)=>({
    type:'TOOL_DOWN',
    payload:[tooltype,toolid]

})

export const hideShowTool= (tooltype,toolid)=>({
    type:'HIDESHOW_TOOL',
    payload:[tooltype,toolid]
})
///for sceneselect
export const sceneSelect=(sceneid)=>({
    type:'SECENE_SELECT',
    payload:sceneid.toString()
})


export const store= createStore(
    rootReducer,
    iniState,
)