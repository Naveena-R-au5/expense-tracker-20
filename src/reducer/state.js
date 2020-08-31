export const initialState = null


export const reducer = (state,action)=>{
    if(action.type === "USER"){
        return action.payload
    }
    if(action.type === "ADMIN"){
        return action.payload
    }
    if(action.type === "CLEAR"){
        return null
    }
    if(action.type === "UPDATE_EXPENSE"){
        return {
            ...state,
            amount:action.payload.amount,
            description:action.payload.description,
            date:action.payload.date
        }
    }
    return state
}