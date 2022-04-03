import {GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS} from '../actions/index'

const initialState ={
    data:[],
    dataRequest:false,
    dataFailed:false,
    burgerIngridientItem:{
        _id:'',
        name:'',
        type:'',
        proteins:'',
        fat:'',
        carbohydrates:'',
        calories:'',
        price:'',
        image:'',
        image_mobile:'',
        image_large:'',
        __v:'',

    },
    burgerConstructorItems:{

    },
    order:{
        
    },

}

export const rootReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_DATA:{
            return{
                ...state,
                dataRequest:true,
                dataFailed:false,
            };
        }
        case GET_DATA_SUCCESS:{
            return{
                ...state,
                data:action.data,
                dataRequest:false,
            };
        }
        case GET_DATA_FAILED:{
            return{
                ...state,
                dataFailed:true,
                dataRequest:false
            };
        }
        default:{
            return state
        }
    }
}