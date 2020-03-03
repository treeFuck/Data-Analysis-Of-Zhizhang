<style lang="scss">
.index {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  color: #fff;
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 20vw;
    height: 100vh;
    background-color: #444;
    .top {
      height: 25vh;
      .logo {
        margin: 1vh auto;
        height: 13vh;
        width: 13vh;
        border-radius: 50%;
        background-color: #666;
        background-image: url(../assets/blind.png);
        background-position: 70% center;
        background-size: 66%;
        background-repeat: no-repeat;
      }
      .welCome {
        margin: 1vh auto;
        height: 4vh;
        width: 10em;
        color: #999;
        font-size: 18px;
        line-height: 4vh;
        text-align: center;
        border-bottom: 1px solid #999;
      }
      .pattern {
        text-align: center;
        div {
          display: inline-block;
          margin: 0 1vw;
          min-width: 6em;
          max-width: 8vw;
          height: 4vh;
          color: #fff;
          cursor: pointer;
          line-height: 5vh;
          text-align: center;
          border-bottom: 1px solid #999;
          transition: all 0.5s;
        }
        .choosed {
          color: #f40;
          border-bottom: 1px solid #f40;
        }
      }
    }
    .bottom {
      margin: 2vh 0.5vw;
      width: 19vw;
      height: 71vh;
      background-color: #666;
      .heatMapCon {
        display: flex;
        padding: 2vh 0;
        height: 67vh;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        span {
          display: block;
          width: 70%;
          height: 5vh;
          font-size: 16px;
          line-height: 5vh;
          text-align: center;
          cursor: pointer;
          transition: font-size 0.3s;
        }
        .choosed {
          color: #6dbd15;
          font-size: 18px;
          border-right: 3px solid #6dbd15;
          border-left: 1px solid #6dbd15;
        }
      }
      .serviceCon {
        .logoIntr {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          height: 10vh;
          span {
            display: inline-block;
            margin: 0 0.5em;
            width: 7em;
            height: 25px;
            line-height: 25px;
            font-size: 16px;
            text-align: right;
            color: #999;
            background-repeat: no-repeat;
            background-position: left center;
            background-size: auto 100%;
            transition: color 0.2s;
          }
          .set {
            color: #d81e06;
            background-image: url(../assets/position3.png);
          }
          .rec {
            color: #6dbd15;
            background-image: url(../assets/position4.png);
          }
        }
        .choosePoint {
          margin: 20vh auto;
          width: 16vw;
          color: #222;
          font-size: 16px;
          line-height: 2em;
          text-align: center;
        }
        .dataCon {
          .data {
            padding: 0 1em;
            height: 45vh;
            overflow-x: hidden;
            overflow-y: inherit;

            span {
              display: inline-block;
              margin: 0.5em;
              color: #000;
              input {
                display: inline-block;
                width: 6em;
                border: none;
                outline: none;
                color: #fff;
                background: none;
                text-align: center;
                border-bottom: 1px solid #fff;
              }
            }
          }
          .button {
            position: absolute;
            left: 2.5vw;
            width: 15vw;
            height: 5vh;
            cursor: pointer;
            line-height: 5vh;
            text-align: center;
            border-radius: 5px;
          }
          .add {
            bottom: 5vh;
            color: #111;
            background-color: #ffa35c;
          }
          .sure {
            bottom: 9vh;
            color: #fff;
            background-color: #6dbd15;
          }
          .delete {
            bottom: 3vh;
            color: #000;
            background-color: #f40;
          }
        }
      }
    }
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 80vw;
    height: 100vh;
    #map {
      width: 100%;
      height: 100%;
      .amap-icon img {
        width: 50px;
        height: 50px;
      }
    }
    .info {
      word-wrap: break-word;
      width: 150px;
      // height: 150px;
    }
  }
}
</style> 
<template>
  <div class="index">
    <div class="left">
      <div class="top">
        <div class="logo"></div>
        <div class="welCome">Thanks for using!</div>
        <div class="pattern">
          <div :class="{choosed:pattern==0}" @click="toHeatMap">热力图</div>
          <div :class="{choosed:pattern==1}" @click="toService">服务点</div>
        </div>
      </div>
      <div class="bottom">
        <div class="heatMapCon" v-show="pattern==0">
          <span
            v-for="(data, index) in heatMapRegion"
            :key="index"
            :class="{choosed: heatMapIndex == index}"
            @click="heatMapIndex = index"
          >{{data=='广州'?'全广州':data}}</span>
        </div>
        <div class="serviceCon" v-show="pattern==1">
          <div class="logoIntr">
            <span class="set">已设服务点</span>
            <span class="rec">推荐服务点</span>
          </div>
          <div class="choosePoint" v-show="!markerDate.data">请在地图上选择你要操作的服务点!</div>
          <div class="dataCon" v-show="markerDate.data">
            <div class="data">
              <span>
                经度：
                <input
                  type="text"
                  :value="markerDate.longitude"
                  disabled
                  style="border:none;color:#f40"
                />
              </span>
              <span>
                纬度：
                <input
                  type="text"
                  :value="markerDate.latitude"
                  disabled
                  style="border:none;color:#f40"
                />
              </span>
              <span>
                数据1：
                <input type="text" :value="markerDate.num1" />
              </span>
              <span>
                数据2：
                <input type="text" :value="markerDate.num2" />
              </span>
              <span>
                负责人：
                <input type="text" :value="markerDate.leader" />
              </span>
              <span>
                志愿者数量：
                <input type="text" :value="markerDate.volunteerNum" />
              </span>
            </div>
            <div v-show="markerDate.type!='set'" class="add button">设为服务点</div>
            <div v-show="markerDate.type=='set'" class="sure button" @click="changeMaeker">确定修改</div>
            <div v-show="markerDate.type=='set'" class="delete button">删除服务点</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div id="map"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

// import Vue from "vue";
// import Component from "vue-class-component";
import position1 from "../assets/position1.png";
// 推荐
import position2 from "../assets/position2.png";
// 已设
import position3 from "../assets/position3.png";
declare var AMap: any;
declare var heatmapData: any;

@Component
export default class index extends Vue {
  // 地图实例
  map: any;
  // 模式
  pattern: number = 1; // 0--热力图， 1--服务点
  // 请求地址
  reqUrl: string = "http://6e2dce46.ngrok.io";
  // 热力图实例
  heatmap: any = null;
  // 显示热力图的所在区域编号
  heatMapIndex: number = 0;
  // 热力图区域信息
  heatMapRegion: any = [
    "广州",
    "花都区",
    "南沙区",
    "增城区",
    "从化区",
    "番禺区",
    "白云区",
    "黄埔区",
    "荔湾区",
    "海珠区",
    "天河区",
    "越秀区"
  ];
  // 区域视野实例（用多边形描绘）
  polygons: any = [];
  // 已设服务点实例
  setMarkerList: any = [];
  // 推荐服务点实例
  recMarkerList: any = [];
  // 鼠标选中的服务点实例
  chooseMarker: any = null;
  // 鼠标选中的服务点数据
  markerDate: any = { data: null };

  // 初始化
  init(): void {
    this.map = new AMap.Map("map", {
      zoom: 14,
      center: [113.39, 23.05]
    });
    this.map.plugin([
      "AMap.Heatmap",
      "AMap.ElasticMarker",
      "AMap.DistrictSearch"
    ]);
    let option = {
      radius: 25,
      opacity: [0, 0.5],
      gradient: {
        0.5: "rgb(0, 0, 255)",
        0.65: "rgb(117, 211, 248)",
        0.7: "rgb(0, 255, 0)",
        0.9: "rgb(255, 234, 0)",
        1.0: "rgb(255, 0, 0)"
      }
    };
    this.heatmap = new AMap.Heatmap(this.map, option);
  }
  // 热力图模块
  toHeatMap() {
    this.pattern = 0;
    this.removeMarker();
    this.getHeatMap();
    this.map.setFitView();
    if (this.chooseMarker) {
      this.map.remove(this.chooseMarker);
    }
    this.markerDate = { data: null };
  }
  // 服务点模块
  toService() {
    this.pattern = 1;
    this.deleteView();
    this.getMarker();
    this.hideHeatMap();
  }
  // 显示热力图
  getHeatMap() {
    this.changeView(this.heatMapRegion[this.heatMapIndex]);
    console.log(this.heatMapIndex);
    this.$axios
      .get(this.reqUrl + "/api/data/listBlinds/" + this.heatMapIndex)
      .then((res: any) => {
        console.log(res.data.data);
        console.log(this.heatmap);
        this.heatmap.setDataSet({ data: res.data.data });
      })
      .catch((err: any) => {
        console.log(err);
      });
    // this.heatmap.setDataSet({ data: [{ lng: 113.49, lat: 23.26, count: 10 }] });
  }
  // 隐藏热力图
  hideHeatMap() {
    this.heatmap.hide();
  }
  // 热力图模块，改变地图视野
  changeView(districtName: string) {
    this.deleteView();
    var district = new AMap.DistrictSearch({ extensions: "all" });
    district.search(districtName, (status: any, result: any) => {
      if (status == "complete") {
        var bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (let i = 0; i < bounds.length; i++) {
            var polygon = new AMap.Polygon({
              map: this.map,
              strokeWeight: 0,
              strokeColor: "rgba(1,1,1,0)",
              fillColor: "#80d8ff",
              fillOpacity: 0,
              path: bounds[i]
            });
            this.polygons.push(polygon);
          }
          this.map.setFitView();
        }
      }
    });
  }
  // 热力图模块，删除地图视野
  deleteView() {
    for (let i = 0; i < this.polygons.length; i++) {
      this.polygons[i].setMap(null);
    }
    this.polygons = [];
  }
  // 获取服务点数据
  getMarker() {
    // 获取推荐服务点
    this.$axios
      .get(this.reqUrl + "/api/data/listLocation/0")
      .then((res: any) => {
        console.log(res.data);
        let recMarkerDatas = res.data.data;
        let len1 = recMarkerDatas.length;
        for (let i = 0; i < len1; i++) {
          this.setMarker(recMarkerDatas[i], "rec");
        }
        setTimeout(() => {
          this.map.setFitView();
        }, 500);
      })
      .catch((err: any) => {
        console.log(err);
      });
    // 获取设置的服务点
    this.$axios
      .get(this.reqUrl + "/api/data/serverPoints")
      .then((res: any) => {
        console.log(res.data);
        let setMarkerDatas = res.data.data;
        let len2 = setMarkerDatas.length;
        for (let i = 0; i < len2; i++) {
          this.setMarker(setMarkerDatas[i], "set");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    return;
    let recMarkerDatas = [
      {
        serverId: 2,
        longitude: 113.49,
        latitude: 23.06
      },
      {
        serverId: 3,
        longitude: 113.12,
        latitude: 22.99
      },
      {
        serverId: 4,
        longitude: 113.45,
        latitude: 23.11
      }
    ];
    let setMarkerDatas = [
      {
        serverId: 1, // 代表的是服务点的id
        longitude: 113.39, // 代表服务点的经度
        latitude: 23.05 // 代表服务点的纬度
      },
      {
        serverId: 4,
        longitude: 113.45,
        latitude: 23.11
      }
    ];
    this.recMarkerList = [];
    this.setMarkerList = [];
    let len1 = recMarkerDatas.length;
    for (let i = 0; i < len1; i++) {
      this.setMarker(recMarkerDatas[i], "rec");
    }
    let len2 = setMarkerDatas.length;
    for (let i = 0; i < len2; i++) {
      this.setMarker(setMarkerDatas[i], "set");
    }
    this.map.setFitView();
  }
  // 显示服务点
  setMarker(
    obj: {
      serverId: number | string;
      longitude: number | string;
      latitude: number | string;
    },
    type: string
  ) {
    // serverId 可以用来请求marker的其他数据
    let marker = new AMap.Marker({
      position: [obj.longitude, obj.latitude],
      icon: type == "rec" ? position2 : position3,
      offset: new AMap.Pixel(-25, -25)
    });
    this.bindMarkerData(marker, obj, type);
    if (type == "set") {
      this.setMarkerList.push(marker);
    } else {
      this.recMarkerList.push(marker);
    }
    marker.on("click", this.clickMarker);
    this.map.add([marker]);
  }
  // 给服务点绑定具体信息
  bindMarkerData(marker: any, obj: any, type: string) {
    marker.data = {
      data: "666",
      serverId: obj.serverId,
      longitude: obj.longitude,
      latitude: obj.latitude,
      type: type
    };
    this.$axios
      .get(this.reqUrl + "/api/test/select/" + obj.serverId)
      .then((res: any) => {
        console.log(JSON.parse(res.data.data));
        Object.assign(marker.data, JSON.parse(res.data.data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  // 服务点点击事件
  clickMarker(event: any) {
    let marker = event.target;
    this.markerDate = marker.data; // 显示服务点信息
    if (this.chooseMarker) {
      this.map.remove(this.chooseMarker);
    }
    this.chooseMarker = new AMap.CircleMarker({
      center: new AMap.LngLat(marker.data.longitude, marker.data.latitude), // 圆心位置
      radius: 40, // 圆半径
      fillOpacity: 0,
      strokeColor: "#222", // 描边颜色
      strokeWeight: 5 // 描边宽度
    });
    this.map.add(this.chooseMarker);
  }
  // 从地图移除全部服务点
  removeMarker() {
    let len1 = this.recMarkerList.length;
    for (let i = 0; i < len1; i++) {
      this.map.remove(this.recMarkerList[i]);
    }
    let len2 = this.setMarkerList.length;
    for (let j = 0; j < len2; j++) {
      this.map.remove(this.setMarkerList[j]);
    }
  }
  // 添加服务点
  addMarker() {
    let judge = confirm("您确定设定改点为新的服务点吗？");
    if (!judge) {
      return;
    }
    let param = {
      longitude: this.markerDate.lng,
      latitude: this.markerDate.lat
    };
    // this.$axios.post(this.reqUrl+'/api/data/addServerpoint', param)
    //   .then((res:any) => {
    //     console.log(res.data)
    //   })
    //   .catch((err:any) => {
    //     alert(err)
    //   })
    this.changeMaekerData(this.markerDate.serverId);
  }
  // 修改服务点json数据
  changeMaekerData(serverId: any) {
    let param = {
      volunteerNum: this.markerDate.volunteerNum,
      leader: this.markerDate.leader,
      num1: this.markerDate.num1,
      num2: this.markerDate.num2
    };
    this.$axios.post(this.reqUrl+'/api/test/update', {id: serverId, data: JSON.stringify(param)})
      .then((res:any) => {
        console.log(res.data)
      })
      .catch((err:any) => {
        console.log(err);
      })
    this.getMarker();
  }
  // 删除服务点
  deleteMarker() {
    let judge = confirm("您确定删除这个服务点吗？");
    if (!judge) {
      return;
    }
    // this.$axios.post(this.reqUrl+'/api/data/deleteServerpoint', {id: this.markerDate.serverId})
    //   .then((res:any) => {
    //     console.log(res.data)
    //   })
    //   .catch((err:any) => {
    //     alert(err)
    //   })
    this.getMarker();
  }
  // 修改服务点
  changeMaeker() {
    let judge = confirm("您确定修改这个服务点吗？");
    if (!judge) {
      return;
    }
    this.changeMaekerData(this.markerDate.serverId);
  }

  mounted() {
    this.init();
    this.getMarker();
  }
  @Watch("heatMapIndex")
  getCount(newVal: number) {
    this.getHeatMap();
  }
}
</script>

