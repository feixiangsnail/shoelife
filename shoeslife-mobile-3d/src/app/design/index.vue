<template>
    <div class="design" id="design">
      <mt-popup
        v-model="$store.state.isSign"
        closeOnClickModal=true
        position="bottom">
        <login-wrap ></login-wrap>
      </mt-popup>
      <div class="bg"></div>
      <div class="menu" :class="{'is-wx':isWx}" @click="ok()" v-if="!isApp" style="border:0px;">
          <span class="right" v-if="isPage">完成设计</span>
      </div>
      <div class="relative">
        <div class="regression " :class="{'is-app':isApp,'is-wx':isWx}">
            <i @click="resetAngle" class="on"></i>
        </div>
      </div>
      <div class="mode" ref="showShoe" :class="{'is-app':isApp}">
            <mt-spinner type="fading-circle" :size="60" v-show="isLoading" ></mt-spinner>
      </div>
      <div class="modify" :class="{'is-web':isApp==false&&isWx==false}">
        <div class="mint-navbar">
            <div class="mint-tab-item" :class="{'is-selected':selected=='style'}" @click="optDesign('style')">
                <span class="mint-tab-item-label">
                    换款式
                </span>
            </div>
            <div class="mint-tab-item" :class="{'is-selected':selected=='color'}" @click="optDesign('color')">
                <span class="mint-tab-item-label">换颜色</span>
            </div>
        </div>

          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="style" class="style">
                <div class="buts">
                    <mt-button @click="optNav('withHigh')" :class="buts.withHigh" type="default">跟高</mt-button>
                    <mt-button @click="optNav('heel')" :class="buts.heel" type="default">跟型</mt-button>
                    <mt-button @click="optNav('upper')" :class="buts.upper" type="default">鞋面</mt-button>
                </div>
                <div class="with-high" v-show="buts.withHigh">
                    <div class="change-heel" :class="{on:item.self}" @click="optHeihtStyle(item)" v-for="item in heightStyle">
                      <div class="link"></div>
                      <i></i>
                      <span>{{item.shoeLastHeight}}cm</span>
                    </div>
                </div>
                <div class="with-type" v-show="buts.heel">
                    <div class="block" @click="optStyle(item,'heel')" v-for="item in heel" :class="{on:item.isDefault}">
                        <img :src="$img+'/'+item.stylePic" />
                        <span class="overflow">{{item.styleName}}</span>
                    </div>
                </div>
                <div class="upper" v-show="buts.upper">
                    <div class="block" @click="optStyle(item,'upper')" v-for="item in upper" :class="{on:item.isDefault&&item.self}">
                        <img :src="$img+'/'+item.stylePic" />
                        <span class="overflow">{{item.styleName}}</span>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="color" class="color">
                <div>
                    <div class="buts" ref="modeId">
                        <template v-for="item in colorD">
                            <mt-button v-if="!item.isGroup" :class="{on:item.isDefault}" @click="optParts(item,colorD)" :ref="item.modeId" type="default">{{item.modeName}}</mt-button>
                            <mt-button v-for="mode in item.mode" v-else v-show="mode.isCustomizable" :class="{on:mode.isDefault,none:mode.isCustomizable=='none'}" @click="optParts(mode,colorD)" :ref="mode.modeId" type="default">{{mode.modeName}}</mt-button>
                        </template>
                    </div>
                    <template v-for="item in colorD">
                        <div class="material" v-if="!item.isGroup" v-show="item.isDefault">
                            <div class="type">
                                <span v-if="item.type==2" :class="{on:item.noMaterial==true}" @click="delDecorate(item)">无</span>
                                <span  v-for="value in item.materils" :class="{on:value.isDefault}" @click="optDecorate(value,item)">{{value.name}} </span>
                            </div>
                            <div class="goods" v-for="value in item.materils" v-show="value.isDefault">
                                <div class="block" :class="{on:material.isDefault}" v-for="material in value.list" @click="optMaterial(material,item.materils)">
                                    <i class="commend" v-if="material.isCommend"></i>
                                    <img :src="$img+'/'+material.material3d.icon" />
                                    <span>{{material.material3d.materialColor}}</span>
                                </div>
                            </div>
                        </div>
                        <template v-else v-for="mode in item.mode">
                            <div class="material"  v-show="mode.isDefault">
                                <div class="type">
                                    <span v-if="item.type==2" :class="{on:mode.noMaterial==true}" @click="delDecorate(mode)">无</span>
                                    <span v-for="value in mode.materils" :class="{on:value.isDefault}" @click="optDecorate(value,mode)">{{value.name}} </span>
                                </div>
                                <div class="goods" v-for="value in mode.materils" v-show="value.isDefault">
                                    <div class="block" :class="{on:material.isDefault}" v-for="material in value.list" @click="optMaterial(material,mode.materils)">
                                        <i class="commend" v-if="material.isCommend"></i>
                                        <img :src="$img+'/'+material.material3d.icon" />
                                        <span>{{material.material3d.materialColor}}</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </mt-tab-container-item>
          </mt-tab-container>
      </div>
    <div class="bg-fixed" v-if="isBgFixed"></div></div>
</template>
<script src="./index.js"></script>