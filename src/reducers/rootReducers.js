import { createStore ,applyMiddleware} from 'redux';
import {createStateSyncMiddleware,withReduxStateSync} from 'redux-state-sync'



const iniState = {
    users: [
        {
            id: "1",
            icon: null,
            username: "",
            password: "",
            profile: "",
            strkeys: [],
            activescene: "1",
            scenelist: [{ id: "1", name: "streampage", screenshot: "/waitscreen1.jpg", active: true },
            { id: "2", name: "activepage", screenshot: "/waitscreen2.png", active: true },
            { id: "3", name: "activepage", screenshot: "/waitscreen2.png", active: true }
            ],
            /*customemized scene content with their css status*/
            scenetoollist: [{
                id: "1",
                dragging: false,
                resizing: false,
                tools: [
                    { toolid: 1, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false, pin: false }, opacity: 0.5, zdex: 3 },
                    { toolid: 6, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false, pin: false }, opacity: 0.7, zdex: 4 },
                    { toolid: 3, active: false, ttype: "p", media:{},css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false, pin: false }, opacity: 1, zdex: 5 },
                    { toolid: 2, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false, pin: false }, opacity: 1, zdex: 2 },
                    { toolid: 5, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 70, focus: false, pin: false }, opacity: 1, zdex: 1 },
                ]
            },
            {
                id: "2",
                dragging: false,
                resizing: false,
                tools: [
                    { toolid: 1, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false }, opacity: 0.5, zdex: 3 },
                    { toolid: 4, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false }, opacity: 0.7, zdex: 4 },
                    { toolid: 3, active: false, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false }, opacity: 0.3, zdex: 2 },
                    { toolid: 4, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false }, opacity: 1, zdex: 1 }
                ]
            },

            {
                id: "3",
                dragging: false,
                resizing: false,
                tools: [
                    { toolid: 1, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false }, opacity: 0.5, zdex: 3 },
                    { toolid: 4, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false }, opacity: 0.7, zdex: 4 },
                    { toolid: 3, active: false, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false }, opacity: 0.3, zdex: 2 },
                    { toolid: 2, active: true, ttype: "p", css: {}, coords: { x: 0, y: 0, width: 120, height: 120, focus: false }, opacity: 1, zdex: 1 }
                ]
            }


            ],
            rooms: [],
            /*privately created tools*/
            ptooldata: [{ toolid: 1, type: "img", url: "/frame2.png", name: "menu" },
            { toolid: 2, type: "img", url: "/frame1.jpg", name: "top-bar" },
            { toolid: 3, type: "camera", url: "/frame3.jpg", name: "camera" },
            { toolid: 4, type: "screen", url: "/frame4.jpg", name: "screen" },
            { toolid: 5, type: "img", url: "/transparent.png", name: "waitscreen" },
            { toolid: 6, type: "patcamera", url: "/frame3.jpg", name: "patcamera" }

            ],
            friends: []
        },
        { id: "2" }
    ],
    ctoollist: [],
    ctooldata: [],
    meetingagent: ["video", "meeting member(host,volume,private chat)", "timer", "plug-in:send document to member, commitment,actionitem,agenda,prerequirement document"],
    activeaccount: "1"
}


///quick sort according to zdex
function quickSort(arr) {
    // Base case
    if (!arr.length) return []

    const [head, ...tail] = arr,

        left = tail.filter(e => e.zdex < head.zdex),
        right = tail.filter(e => e.zdex >= head.zdex)

    return (quickSort(left).concat(head, quickSort(right)))

}
function quickRever(arr) {
    return quickSort(arr).reverse();
}

/////////////////////////////////////////////////////////////////// reducer////////////////////////////////////////
const rootReducer = (state = iniState, { type, payload }) => {
    ///capture active user and scene
    const actuserid = state.activeaccount;
    const actuser = state.users.findIndex(user => user.id === state.activeaccount)
    const actscene = state.users[actuser].scenetoollist.findIndex(scene => scene.id === state.users[actuser].activescene)
    const actsceneid = state.users[actuser].activescene
    ///sorting tools in active user
    ///
    switch (type) {
        case 'ADD_TOOL':
            return {
                ...state,
                users: [...state.users,
                state.users[actuser] = {
                    ...state.users[actuser],
                    scenetoollist: [
                        ...state.users[actuser].scenetoollist,
                        state.users[actuser].scenetoollist[actscene] = [
                            ...state.users[actuser].scenetoollist[actscene],
                            payload
                        ]

                    ]
                }

                ]

            };

        /////cases for toolbar
        case 'DELETE_TOOL':
            return {
                ...state,
                users: [...state.users.filter(user => (user.id !== actuserid)),
                state.users[actuser] = {
                    ...state.users[actuser],
                    scenetoollist: [
                        ...state.users[actuser].scenetoollist.filter(scenetool => scenetool.id !== actsceneid),
                        {
                            id: state.users[actuser].activescene,
                            tools: quickRever(state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => !(tool.toolid === payload[1] && tool.ttype === payload[0] && Number(payload[2]) === index)))
                        }
                    ]
                }
                ]
            };
        case 'HIDESHOW_TOOL':
            return {
                ...state,
                users: [...state.users.filter(user => (user.id !== actuserid)),
                state.users[actuser] = {
                    ...state.users[actuser],
                    scenetoollist: [
                        ...state.users[actuser].scenetoollist.filter(scenetool => scenetool.id !== actsceneid),
                        {
                            id: state.users[actuser].activescene,
                            tools: quickRever([...state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => !(tool.toolid === payload[1] && tool.ttype === payload[0] && Number(payload[2]) === index)),
                            {
                                ...state.users[actuser].scenetoollist[actscene].tools[payload[2]],
                                active: !(state.users[actuser].scenetoollist[actscene].tools[payload[2]].active)
                            }])
                        }
                    ]
                }
                ]
            };


        case 'TOOL_UP':
            ///<state.users[actuser].scenetoollist[actscene].tools.length-1
            if (Number(payload[2]) > 0) {
                console.log(state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => (index === Number(payload[2]) || index === Number(payload[2]) - 1)))
                console.log(quickRever([
                    ...state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => !(index === Number(payload[2]) || index === Number(payload[2]) - 1)),
                    {
                        ...state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]))],
                        zdex: (state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]))].zdex) + 1

                    },
                    {
                        ...state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]) - 1)],
                        zdex: (state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]) - 1)].zdex) - 1

                    }


                ]))

                return {
                    ...state,
                    users: [...state.users.filter(user => (user.id !== actuserid)),
                    state.users[actuser] = {
                        ...state.users[actuser],
                        scenetoollist: [
                            ...state.users[actuser].scenetoollist.filter(scenetool => scenetool.id !== actsceneid),
                            {
                                ...state.users[actuser].scenetoollist[actscene],
                                tools:
                                    quickRever([
                                        ...state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => !(index === Number(payload[2]) || index === Number(payload[2]) - 1)),
                                        {
                                            ...state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]))],
                                            zdex: (state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]))].zdex) + 1

                                        },
                                        {
                                            ...state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]) - 1)],
                                            zdex: (state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]) - 1)].zdex) - 1

                                        }


                                    ]),
                            }
                        ]
                    }
                    ]
                }



            }
            return { ...state };
        case 'TOOL_DOWN':
            ///<state.users[actuser].scenetoollist[actscene].tools.length-1
            if (Number(payload[2]) < state.users[actuser].scenetoollist[actscene].tools.length - 1) {
                console.log(state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => (index === Number(payload[2]) || index === Number(payload[2]) + 1)))
                console.log(quickRever([
                    ...state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => !(index === Number(payload[2]) || index === Number(payload[2]) + 1)),
                    {
                        ...state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]))],
                        zdex: (state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]))].zdex) - 1

                    },
                    {
                        ...state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]) + 1)],
                        zdex: (state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]) + 1)].zdex) + 1

                    }


                ]))

                return {
                    ...state,
                    users: [...state.users.filter(user => (user.id !== actuserid)),
                    state.users[actuser] = {
                        ...state.users[actuser],
                        scenetoollist: [
                            ...state.users[actuser].scenetoollist.filter(scenetool => scenetool.id !== actsceneid),
                            {
                                ...state.users[actuser].scenetoollist[actscene],
                                tools:
                                    quickRever([
                                        ...state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => !(index === Number(payload[2]) || index === Number(payload[2]) + 1)),
                                        {
                                            ...state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]))],
                                            zdex: (state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]))].zdex) - 1

                                        },
                                        {
                                            ...state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]) + 1)],
                                            zdex: (state.users[actuser].scenetoollist[actscene].tools[(Number(payload[2]) + 1)].zdex) + 1

                                        }


                                    ]),
                            }
                        ]
                    }
                    ]
                }



            }
            return { ...state }
        /////// cases end for toolbar
        case 'SECENE_SELECT':
            return {
                ...state,
                users: [...state.users.filter(user => (user.id !== actuserid)),
                state.users[actuser] = {
                    ...state.users[actuser],
                    activescene: payload
                }
                ]
            };

        case 'ADJUST_TOOL':
            return {
                ...state,
                users: [...state.users.filter(user => (user.id !== actuserid)),
                state.users[actuser] = {
                    ...state.users[actuser],
                    scenetoollist: [
                        ...state.users[actuser].scenetoollist.filter(scenetool => scenetool.id !== actsceneid),
                        {
                            id: state.users[actuser].activescene,
                            tools: quickRever([
                                ...state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => index !== Number(payload[6])),
                                payload[2]
                            ]),
                            resizing: payload[3],
                            dragging: payload[4],
                            pinned: payload[5]

                        }
                    ]
                }
                ]
            };


        ////
        case 'LOAD_MEDIA':
            console.log("triggered",payload[3])
            return {
                ...state,
                users: [...state.users.filter(user => (user.id !== actuserid)),
                state.users[actuser] = {
                    ...state.users[actuser],
                    scenetoollist: [
                        ...state.users[actuser].scenetoollist.filter(scenetool => scenetool.id !== actsceneid),
                        {
                            id: state.users[actuser].activescene,
                            tools: quickRever([...state.users[actuser].scenetoollist[actscene].tools.filter((tool, index) => !(tool.toolid === payload[1] && tool.ttype === payload[0] && Number(payload[2]) === index)),
                            {
                                ...state.users[actuser].scenetoollist[actscene].tools[payload[2]],
                                media:{source: payload[3]}
                            }])
                        }
                    ]
                }
                ]
            };



        default:
            return {
                ...state,
                users: [...state.users.filter(user => (user.id !== actuserid)),
                state.users[actuser] = {
                    ...state.users[actuser],
                    scenetoollist: [
                        ...state.users[actuser].scenetoollist.filter(scenetool => scenetool.id !== actsceneid),
                        {
                            id: state.users[actuser].activescene,
                            tools: quickRever(state.users[actuser].scenetoollist[actscene].tools),

                        }
                    ]
                }
                ]
            };

    }

}

///for toolbox

export const addtool = (tooltype, toolid) => ({
    type: 'ADD_TOOL',
    payload: [tooltype, toolid]
})

export const deleteTool = (tooltype, toolid, index) => ({
    type: 'DELETE_TOOL',
    payload: [tooltype, toolid, index]

})

export const toolUp = (tooltype, toolid, index) => ({
    type: 'TOOL_UP',
    payload: [tooltype, toolid, index]

})

export const toolDown = (tooltype, toolid, index) => ({
    type: 'TOOL_DOWN',
    payload: [tooltype, toolid, index]

})

export const hideShowTool = (tooltype, toolid, index) => ({
    type: 'HIDESHOW_TOOL',
    payload: [tooltype, toolid, index]
})
///for sceneshow

export const adjustTool = (tooltype, toolid, adjustment, resize, dragging, pinned, index) => ({
    type: 'ADJUST_TOOL',
    payload: [tooltype, toolid, adjustment, resize, dragging, pinned, index],
})





///for sceneselect
export const sceneSelect = (sceneid) => ({
    type: 'SECENE_SELECT',
    payload: sceneid.toString()
})

export const loadMedia = (tooltype, toolid, index,mediastream) => ({
    type: 'LOAD_MEDIA',
    payload: [tooltype, toolid, index,mediastream]
})



const config={}
const middlewares=[
    createStateSyncMiddleware(config)
    ,]







export const store = createStore(
    withReduxStateSync(rootReducer),
    iniState,applyMiddleware(...middlewares)
)
