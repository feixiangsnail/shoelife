import {
  GET_3DOBJ,
  SET_STYLE_DEF,
  SET_STYLE_PICTURE,
  UP_STYLE3D,
  UP_MODE_NAME,
  UP_MODE_TYPE,
  DEL_MODE_MATERIAL,
  DEF_MODE_MATERIAL,
  SET_COMMEND_MODE_MATERIAL,
  UN_COMMEND_MODE_MATERIAL,
  UP_MODE_MATERIAL,
  GET_STYLE_MATRIALS,
  SET_MODE_MAIN,
  ADD_MATRIALS_SIMILE,
  DEL_MATRIALS_SIMILE,
  UP_3D_MODE,
  UP_MODE_3D_PUT,
  FILE_3D_STYLE,
  ADD_MATRIAL_SIMILER,
  CUSTOMIZABLE,
  SHOE_3D_RENDER,
  GET_MATERIAL_MODE,
  SAVE_MATERIAL_3D_NEW
} from 'static/apiAlias'

//获取
const GET_OBJ = 'parts/GET_OBJ';
const GET_OBJ_SUCCESS = 'parts/GET_OBJ_SUCCESS';
const GET_OBJ_FAILURE = 'parts/GET_OBJ_FAILURE';
//设置默认
const SET_DEF = 'parts/SET_DEF';
const SET_DEF_SUCCESS = 'parts/SET_DEF_SUCCESS';
const SET_DEF_FAILURE = 'parts/SET_DEF_FAILURE';
//上图效果图
const SET_PICTURE = 'parts/SET_PICTURE';
const SET_PICTURE_SUCCESS = 'parts/SET_PICTURE_SUCCESS';
const SET_PICTURE_FAILURE = 'parts/SET_PICTURE_FAILURE';
//修改3D模型名称
const UP3D = 'parts/UP3D';
const UP3D_SUCCESS = 'parts/UP3D_SUCCESS';
const UP3D_FAILURE = 'parts/UP3D_FAILURE';
//修改3D模型部位名称
const UP_NAME = 'parts/UP_NAME';
const UP_NAME_SUCCESS = 'parts/UP_NAME_SUCCESS';
const UP_NAME_FAILURE = 'parts/UP_NAME_FAILURE';

const UP_TYPE = 'parts/UP_TYPE';
const UP_TYPE_SUCCESS = 'parts/UP_TYPE_SUCCESS';
const UP_TYPE_FAILURE = 'parts/UP_TYPE_FAILURE';

//删除模型材料
const DEL_MATERIAL = 'parts/DEL_MATERIAL';
const DEL_MATERIAL_SUCCESS = 'parts/DEL_MATERIAL_SUCCESS';
const DEL_MATERIA_FAILURE = 'parts/DEL_MATERIA_FAILURE';

//设置模型默认用料
const DEF_MATERIAL = 'parts/DEF_MATERIAL';
const DEF_MATERIAL_SUCCESS = 'parts/DEF_MATERIAL_SUCCESS';
const DEF_MATERIA_FAILURE = 'parts/DEF_MATERIA_FAILURE';

//设置模型推荐用料
const SET_COMMEND_MATERIAL = 'parts/SET_COMMEND_MATERIAL';
const SET_COMMEND_MATERIAL_SUCCESS = 'parts/SET_COMMEND_MATERIAL_SUCCESS';
const SET_COMMEND_MATERIA_FAILURE = 'parts/SET_COMMEND_MATERIA_FAILURE';
//取消模型推荐用料
const UN_COMMEND_MATERIAL = 'parts/UN_COMMEND_MATERIAL';
const UN_COMMEND_MATERIAL_SUCCESS = 'parts/UN_COMMEND_MATERIAL_SUCCESS';
const UN_COMMEND_MATERIA_FAILURE = 'parts/UN_COMMEND_MATERIA_FAILURE';
//修改模形用料 信息
const UP_MATERIAL = 'parts/UP_MATERIAL';
const UP_MATERIAL_SUCCESS = 'parts/UP_MATERIAL_SUCCESS';
const UP_MATERIAL_FAILURE = 'parts/UP_MATERIAL_FAILURE';

//款式材料
const GET_MATRIALS = 'parts/GET_MATRIALS';
const GET_MATRIALS_SUCCESS = 'parts/GET_MATRIALS_SUCCESS';
const GET_MATRIALS_FAILURE = 'parts/GET_MATRIALS_FAILURE';

//设为主要
const SET_MAIN = 'parts/SET_MAIN';
const SET_MAIN_SUCCESS = 'parts/SET_MAIN_SUCCESS';
const SET_MAIN_FAILURE = 'parts/SET_MAIN_FAILURE';

//关联用料
const ADD_RELATION_MATRIALS = 'parts/RELATION_MATRIALS';
const ADD_RELATION_MATRIALS_SUCCESS = 'parts/RELATION_MATRIALS_SUCCESS';
const ADD_RELATION_MATRIALS_FAILURE = 'parts/RELATION_MATRIALS_FAILURE';

//解除关联
const DEL_RELATION_MATERIAL = 'parts/DEL_RELATION_MATERIAL';
const DEL_RELATION_MATERIAL_SUCCESS = 'parts/DEL_RELATION_MATERIAL_SUCCESS';
const DEL_RELATION_MATERIAL_FAILURE = 'parts/DEL_RELATION_MATERIAL_FAILURE';

//上传部份obj
const UP_MODE = 'parts/DEL_RELATION_MATERIAL';
const UP_MODE_SUCCESS = 'parts/DEL_RELATION_MATERIAL_SUCCESS';
const UP_MODE_FAILURE = 'parts/DEL_RELATION_MATERIAL_FAILURE';
//上下架
const UP_MODE_PUT = 'parts/UP_MODE_PUT';
const UP_MODE_PUT_SUCCESS = 'parts/UP_MODE_PUT_SUCCESS';
const UP_MODE_PUT_FAILURE = 'parts/UP_MODE_PUT_FAILURE';
//上下架
const ADD_MATRIAL_RELATION = 'parts/ADD_MATRIAL_RELATION';
const ADD_MATRIAL_RELATION_SUCCESS = 'parts/ADD_MATRIAL_RELATION_SUCCESS';
const ADD_MATRIAL_RELATION_FAILURE = 'parts/ADD_MATRIAL_RELATION_FAILURE';

//是否可修改
const SELECT_CUSTOMIZABLE = 'parts/SELECT_CUSTOMIZABLE';
const SELECT_CUSTOMIZABLE_SUCCESS = 'parts/SELECT_CUSTOMIZABLE_SUCCESS';
const SELECT_CUSTOMIZABLE_FAILURE = 'parts/SELECT_CUSTOMIZABLE_FAILURE';

//修改 3d 模型效果
const SHOE_STYLE_UPDATE = 'parts/SHOE_STYLE_UPDATE';
const SHOE_STYLE_UPDATE_SUCCESS = 'parts/SHOE_STYLE_UPDATE_SUCCESS';
const SHOE_STYLE_UPDATE_FAILURE = 'parts/SHOE_STYLE_UPDATE_FAILURE';

const MATERIAL_GET_OBJ = 'parts/MATERIAL_GET_OBJ';
const MATERIAL_GET_OBJ_SUCCESS = 'parts/MATERIAL_GET_OBJ_SUCCESS';
const MATERIAL_GET_OBJ_FAILURE = 'parts/MATERIAL_GET_OBJ_FAILURE';

const MATERIAL_GET_OBJ_COLSE = 'parts/MATERIAL_GET_OBJ_COLSE';
const MATERIAL_GET_OBJ_COLSE_SUCCESS = 'parts/MATERIAL_GET_OBJ_COLSE_SUCCESS';
const MATERIAL_GET_OBJ_COLSE_FAILURE = 'parts/MATERIAL_GET_OBJ_COLSE_FAILURE';

const MATERIAL_SAVE_3D = 'parts/MATERIAL_SAVE_3D';
const MATERIAL_SAVE_3D_SUCCESS = 'parts/MATERIAL_SAVE_3D_SUCCESS';
const MATERIAL_SAVE_3D_FAILURE = 'parts/MATERIAL_SAVE_3D_FAILURE';


/**
 * 获取3d模型
 *
 * @export
 * @param string id
 * @returns (description)
 */
export function queryObj(id) {
  return {
    types: [GET_OBJ, GET_OBJ_SUCCESS, GET_OBJ_FAILURE],
    promise: (client) => client.post(GET_3DOBJ+id)
  }
}
/**
* 查询材料
*
* @export
*/
export function getMaterialModel(id){
  return {
    types:[MATERIAL_GET_OBJ,MATERIAL_GET_OBJ_SUCCESS,MATERIAL_GET_OBJ_FAILURE],
    promise: (client) => client.post(GET_MATERIAL_MODE+id)
  }
}

/**
* 清除材料
*
* @export
*/
export function materialModelColse(id){
  return {
    type: MATERIAL_GET_OBJ_COLSE
  }
}

/**
 * 设置3d模型模认选项
 *
 * @export
 * @param string id
 * @returns (description)
 */
export function setDefault(id){
  return {
    types:[SET_DEF,SET_DEF_SUCCESS,SET_DEF_FAILURE],
    promise:(client) => client.post(SET_STYLE_DEF+id,{'hasMsg' : true})
  }
}
/**
 * 获取3d模型
 *
 * @export
 * @param obj {styleId,stylePic}
 * @returns (description)
 */
 export function setPicture(file){
   return {
     types:[SET_PICTURE,SET_PICTURE_SUCCESS,SET_PICTURE_FAILURE],
     promise:(client) => client.post(SET_STYLE_PICTURE,file,{'hasMsg' : true})
   }
 }
 /**
  * 修改3d模型名称
  *
  * @export
  * @param obj {styleId,styleName,styleCode}
  * @returns (description)
  */

  export function up3DName(file){
    return {
      types:[UP3D,UP3D_SUCCESS,UP3D_FAILURE],
      promise:(client) => client.post(UP_STYLE3D,file,{'hasMsg' : true})
    }
  }
  /**
  * 修改3d模型部位名称
  *
  * @export
  * @param obj {modeId,modeName}
  * @returns (description)
  */
  export function up3DModeName(file){
   return {
     types:[UP_NAME,UP_NAME_SUCCESS,UP_NAME_FAILURE],
     promise:(client) => client.post(UP_MODE_NAME,file,{'hasMsg' : true})
   }
  }

  /**
  * 修改3d模型类型
  *
  * @export
  * @param obj {modeId,modeName}
  * @returns (description)
  */
export function upType(file){
  return {
    types:[UP_TYPE,UP_TYPE_SUCCESS,UP_TYPE_FAILURE],
    promise:(client) => client.post(UP_MODE_TYPE,file,{'hasMsg' : true})
  }
}

  /**
  * 删除模型材料
  *
  * @export
  */
  export function delMaterial(id){
   return {
     types:[DEL_MATERIAL,DEL_MATERIAL_SUCCESS,DEL_MATERIA_FAILURE],
     promise:(client) => client.post(DEL_MODE_MATERIAL+id,{'hasMsg' : true})
   }
  }
  /**
  * 设置默认模型材料
  *
  * @export
  */
  export function defMaterial(id){
    return {
      types:[DEF_MATERIAL,DEF_MATERIAL_SUCCESS,DEF_MATERIA_FAILURE],
      promise:(client) => client.post(DEF_MODE_MATERIAL+id,{'hasMsg' : true})
    }
  }
  /**
  * 设置模型推荐用料
  *
  * @export
  */
  export function setCommend(id){
   return {
     types:[SET_COMMEND_MATERIAL,SET_COMMEND_MATERIAL_SUCCESS,SET_COMMEND_MATERIA_FAILURE],
     promise:(client) => client.post(SET_COMMEND_MODE_MATERIAL+id,{'hasMsg' : true})
   }
  }
  /**
  * 取消模型推荐用料
  *
  * @export
  */
  export function unCommend(id){
    return {
      types:[UN_COMMEND_MATERIAL,UN_COMMEND_MATERIAL_SUCCESS,UN_COMMEND_MATERIA_FAILURE],
      promise:(client) => client.post(UN_COMMEND_MODE_MATERIAL+id,{'hasMsg' : true})
    }
  }
  /**
  * 修改模型信息
  *
  * @export
  */
  export function upMaterial(file){
    return {
      types:[UP_MATERIAL,UP_MATERIAL_SUCCESS,UP_MATERIAL_FAILURE],
      promise:(client) => client.post(UP_MODE_MATERIAL,file,{'hasMsg' : true})
    }
  }
  /**
  * 关联材料
  *
  * @export
  */
  export function getMaterial(id){
    return {
      types:[GET_MATRIALS,GET_MATRIALS_SUCCESS,GET_MATRIALS_FAILURE],
      promise:(client) => client.post(GET_STYLE_MATRIALS+id,{'hasMsg' : true})
    }
  }
  /**
  * 设置主要
  *
  * @export
  */
  export function setMain(id){
    return {
      types:[SET_MAIN,SET_MAIN_SUCCESS,SET_MAIN_FAILURE],
      promise:(client) => client.post(SET_MODE_MAIN+id,{'hasMsg' : true})
    }
  }
  /**
  * 添加关联用料
  * param  {childrenids:array}
  * @export
  */
  export function addRelation(file){
    return {
      types:[ADD_RELATION_MATRIALS,ADD_RELATION_MATRIALS_SUCCESS,ADD_RELATION_MATRIALS_FAILURE],
      promise:(client) => client.post(ADD_MATRIALS_SIMILE,file,{'hasMsg' : true})
    }
  }
  /**
  * 删除关联用料
  *
  * @export
  */
  export function delRelation(id){
    return {
      types:[DEL_RELATION_MATERIAL,DEL_RELATION_MATERIAL_SUCCESS,DEL_RELATION_MATERIAL_FAILURE],
      promise:(client) => client.post(DEL_MATRIALS_SIMILE+id,{'hasMsg' : true})
    }
  }
  /**
  * 上传部份obj
  *
  * @export
  */
  export function upMode(id){
    return {
      types:[UP_MODE,UP_MODE_SUCCESS,UP_MODE_FAILURE],
      promise:(client) => client.post(UP_3D_MODE+id,{'hasMsg' : true})
    }
  }
  /**
  * 上下架
  *
  * @export
  */
  export function upModePut(id,pIs){
    return {
      types:[UP_MODE_PUT,UP_MODE_PUT_SUCCESS,UP_MODE_PUT_FAILURE],
      promise:(client) => client.post(UP_MODE_3D_PUT+id+'/'+pIs,{'hasMsg' : true})
    }
  }
  /**
  * 选择用户是否可修改
  *
  * @export
  */
  export function selectMode(id,sIs){
    return {
      types:[SELECT_CUSTOMIZABLE,SELECT_CUSTOMIZABLE_SUCCESS,SELECT_CUSTOMIZABLE_FAILURE],
      promise:(client) => client.post(CUSTOMIZABLE+id+'/'+sIs,{'hasMsg' : true})
    }
  }
  /**
  * 选择用户是否可修改
  *
  * @export
  */
  export function shoeStyleUp(file){
    return {
      types:[SHOE_STYLE_UPDATE,SHOE_STYLE_UPDATE_SUCCESS,SHOE_STYLE_UPDATE_FAILURE],
      promise:(client) => client.post(SHOE_3D_RENDER,file,{'hasMsg' : true})
    }
  }
  /**
  * 保存用料
  *
  * @export
  */
  export function saveMaterial3D(id){
    return {
      types:[MATERIAL_SAVE_3D,MATERIAL_SAVE_3D_SUCCESS,MATERIAL_SAVE_3D_FAILURE],
      promise:(client) => client.post(SAVE_MATERIAL_3D_NEW+id)
    }
  }


export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case GET_OBJ:
    case GET_OBJ_SUCCESS:
      return {
        ...state,
        result:action.result
      }
    case SET_DEF:
    case SET_DEF_SUCCESS:
      return {
        ...state,
        resultDef:action.result
      }
    case SET_PICTURE:
    case SET_PICTURE_SUCCESS:
      return {
        ...state,
        resultSetP:action.result
      }
    case UP3D:
    case UP3D_SUCCESS:
      return {
        ...state,
        resultup3DP:action.result
      }
    case UP_NAME:
    case UP_NAME_SUCCESS:
      return {
        ...state,
        resultup3DMode:action.result
      }
    case UP_TYPE:
    case UP_TYPE_SUCCESS:
      return {
        ...state,
        resultupType:action.result
      }
    case DEL_MATERIAL:
    case DEL_MATERIAL_SUCCESS:
      return {
        ...state,
        resultMDel:action.result
      }
    case DEF_MATERIAL:
    case DEF_MATERIAL_SUCCESS:
      return {
        ...state,
        resultMDef:action.result
      }
    case SET_COMMEND_MATERIAL:
    case SET_COMMEND_MATERIAL_SUCCESS:
      return {
        ...state,
        resultSetC:action.result
      }
    case UN_COMMEND_MATERIAL:
    case UN_COMMEND_MATERIAL_SUCCESS:
      return {
        ...state,
        resultUnC:action.result
      }
    case UP_MATERIAL:
    case UP_MATERIAL_SUCCESS:
      return {
        ...state,
        resultUpC:action.result
      }
    case GET_MATRIALS:
    case GET_MATRIALS_SUCCESS:
      return {
        ...state,
        resultGetM:action.result
      }
    case SET_MAIN:
    case SET_MAIN_SUCCESS:
      return {
        ...state,
        resultSetMain:action.result
      }
    case DEL_RELATION_MATERIAL:
    case DEL_RELATION_MATERIAL_SUCCESS:
      return {
        ...state,
        resultDelR:action.result
      }
    case UP_MODE:
    case UP_MODE_SUCCESS:
      return {
        ...state,
        resultUMode:action.result
      }
    case UP_MODE_PUT:
    case UP_MODE_PUT_SUCCESS:
      return {
        ...state,
        resultP:action.result
      }
    case ADD_MATRIAL_RELATION:
    case ADD_MATRIAL_RELATION_SUCCESS:
      return {
        ...state,
        resultAR:action.result
      }
    case SELECT_CUSTOMIZABLE:
    case SELECT_CUSTOMIZABLE_SUCCESS:
      return {
        ...state,
        resultSelt:action.result
      }
    case ADD_RELATION_MATRIALS:
    case ADD_RELATION_MATRIALS_SUCCESS:
      return {
        ...state,
        resultARM:{is:true}
      }
    case SHOE_STYLE_UPDATE:
    case SHOE_STYLE_UPDATE_SUCCESS:
      return {
        ...state,
        resultSSU:{is:true}
      }
    case MATERIAL_GET_OBJ:
    case MATERIAL_GET_OBJ_SUCCESS:
      return {
        ...state,
        resultMM:action.result
      }
    case MATERIAL_GET_OBJ_COLSE:
      return {
        ...state,
        resultMM:false
      }
    case MATERIAL_SAVE_3D:
      return {
        ...state,
        resultSMD:{is:true}
      }
    case MATERIAL_SAVE_3D_SUCCESS:
      return {
        ...state
      }
    case MATERIAL_SAVE_3D_FAILURE:
      return {
        ...state
      }
    case MATERIAL_GET_OBJ_FAILURE:
      return {
        ...state
      }
    case SHOE_STYLE_UPDATE_FAILURE:
      return {
        ...state
      }
    case SELECT_CUSTOMIZABLE_FAILURE:
      return {
        ...state
      }
    case ADD_MATRIAL_RELATION_FAILURE:
      return {
        ...state
      }
    case UP_MODE_PUT_FAILURE:
      return {
        ...state
      }
    case UP_MODE_FAILURE:
      return {
        ...state
      }
    case GET_MATRIALS_FAILURE:
      return {
        ...state
      }
    case SET_MAIN_FAILURE:
      return {
        ...state
      }
    case UP_MATERIAL_FAILURE:
      return {
        ...state
      }
    case ADD_RELATION_MATRIALS_FAILURE:
      return {
        ...state
      }
    case DEL_RELATION_MATERIAL_FAILURE:
      return {
        ...state
      }
    case UN_COMMEND_MATERIA_FAILURE:
      return {
        ...state
      }
    case SET_COMMEND_MATERIA_FAILURE:
      return {
        ...state
      }
    case DEL_MATERIA_FAILURE:
      return {
        ...state
      }
    case SET_PICTURE_FAILURE:
      return {
        ...state
      }
    case SET_DEF_FAILURE:
      return {
        ...state
      }
    case GET_OBJ_FAILURE:
      return {
        ...state
      }
    case UP3D_FAILURE:
      return {
        ...state
      }
    case UP_NAME_FAILURE:
      return {
        ...state
      }
    case UP_TYPE_FAILURE:
      return {
        ...state
      }
    case DEF_MATERIA_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
