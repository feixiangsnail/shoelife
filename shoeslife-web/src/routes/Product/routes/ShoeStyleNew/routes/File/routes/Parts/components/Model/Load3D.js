import { LoadScene } from './LoadScene';
import { IMG_URL } from 'static/apiAlias';
import { CTMModel } from './CTMModel';

var shoeScene,shoeModel;

export function loadStart(shoeData, succ) {
    console.log(shoeData);
    if(shoeModel){
        shoeModel.clearAll();
        shoeModel=null;
    }
    if(shoeScene){
        shoeScene.clearAll();
        shoeScene=null;
    }

    //创建并初始化场景
    shoeScene = new LoadScene({ container: $("#shoeshow")[0] });
    //创建并初始化模型
    shoeModel = new CTMModel(shoeData);
    var haveChoosed = sessionStorage.getItem('materialsMid');
    if (haveChoosed) {
        sessionStorage.removeItem('materialsMid')
    }
    shoeModel.haveChoosed = haveChoosed;
   
    for (var i in shoeData) {
        for (var j = 0; j < shoeData[i].length; j++) {
            shoeModel.sonGroupName.push("styleId" + shoeData[i][j].styleId)
            var group2 = new THREE.Object3D;
            group2.name = "styleId" + shoeData[i][j].styleId;
            shoeModel.object3D.add(group2);
        }
    }
    for (var i = 0; i < shoeData.heel.length; i++) {
        
            reLoads(shoeData.heel[i].mode, "styleId" + shoeData.heel[i].styleId);
        
        
    }

    for (var i = 0; i < shoeData.upper.length; i++) {
        
             reLoads(shoeData.upper[i].mode, "styleId" + shoeData.upper[i].styleId);
           
        
    }


    function reLoads(mode, groupName) {

        var times = mode.length;
        while (times > 0) {
            times--;
            // mode[times]["modeMaterial3dList"] = [];
            var matList=[];
            var defaultMat = null;
            for (var i in mode[times]["map"]) {
                for (var j = 0; j < mode[times]["map"][i].length; j++) {
                    var material = mode[times]["map"][i][j]
                    // mode[times]["modeMaterial3dList"].push(material);
                    matList.push(material);
                    if (material.isDefault) {
                        defaultMat = material;
                       
                    }
                    
                }
                if(!defaultMat){
                    //defaultMat = mode[times]["modeMaterial3dList"][0];
                    defaultMat = matList[0];
                }
            }
            // console.log(defaultMat);
            shoeModel.addMesh({
                url: mode[times]["modeUrl"],
                material: defaultMat,
                modeID: mode[times]["modeId"],
                parentId: mode[times].parentId,
                meshLoadFinish: times,
                groupName: groupName,
               
                fullMesh: mode[times],
                isEye: mode[times].isEye
            })
            reLoads(mode[times].mode, groupName)
        }
    }
    
    // //添加拾取效果
    shoeModel.PickObj($("#shoeshow")[0], (mesh) => {
            succ(mesh, shoeModel);
            
        }, () => {})
        //将模型添加到场景。
    shoeScene.addModel(shoeModel);
    shoeScene.run();
    return { shoeScene, shoeModel };
}
