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
      height: 30vh;
      .logo {
        margin: 15px auto;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        background-color: #666;
        background-image: url(../assets/blind.png);
        background-position: 70% center;
        background-size: 66%;
        background-repeat: no-repeat;
      }
      .welCome {
        margin: 25px auto;
        height: 30px;
        width: 10em;
        font-size: 18px;
        line-height: 30px;
        text-align: center;
        border-bottom: 1px solid #999;
      }
      .heatMap {
        margin: 0 auto;
        width: 15vw;
        height: 35px;
        color: #000;
        cursor: pointer;
        line-height: 35px;
        text-align: center;
        border-radius: 5px;
        background-color: #999;
        // background-color: #6dbd15;
      }
    }
    .bottom {
      margin: 2vh 0.5vw;
      width: 19vw;
      height: 66vh;
      background-color: #666;
      .data {
        padding: 1em;
        height: 50vh;
        span {
          display: block;
          margin: 0.5em 0;
          input {
            display: inline-block;
            border: none;
            outline: none;
            background: none;
            text-align:center;
            border-bottom: 1px solid #fff;
          }
        }
      }
      .sure {
        margin: 1.5vh auto;
        width: 15vw;
        height: 5vh;
        color: #fff;
        cursor: pointer;
        line-height: 5vh;
        text-align: center;
        border-radius: 5px;
        background-color: #6dbd15;
      }
      .delete {
        margin: 1.5vh auto;
        width: 15vw;
        height: 5vh;
        color: #000;
        cursor: pointer;
        line-height: 5vh;
        text-align: center;
        border-radius: 5px;
        background-color: #f40;
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
        <div class="heatMap">热力图数据分析</div>
      </div>
      <div class="bottom">
        <div class="data">
          <span>数据1：<input type="text"></span>
          <span>数据2：<input type="text"></span>
        </div>
        <div class="sure">确定修改</div>
        <div class="delete">删除服务点</div>
      </div>
    </div>
    <div class="right">
      <div id="map"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
declare var AMap: any;
import position1 from "../assets/position1.png";
import position2 from "../assets/position2.png";
import position3 from "../assets/position3.png";

@Component
export default class index extends Vue {
  map: any;
  // markerList: object[] = [];

  init(): void {
    this.map = new AMap.Map("map", {
      zoom: 14,
      center: [113.39, 23.05]
    });
    this.map.plugin(["AMap.Heatmap", "AMap.ElasticMarker"]);
  }

  getMarker() {
    let data = [
      {
        id: 1,
        lng: 113.39,
        lat: 23.05
      },
      {
        id: 2,
        lng: 113.49,
        lat: 23.06
      },
      {
        id: 3,
        lng: 113.12,
        lat: 22.99
      },
      {
        id: 4,
        lng: 113.45,
        lat: 23.11
      }
    ];

    let len = data.length;
    for (let i = 0; i < len; i++) {
      this.setMarker(data[i], i);
    }
    this.map.setFitView();
  }

  setMarker(obj: { id: number; lng: number; lat: number }, index: number) {
    // id 可以用来请求marker的其他数据
    let marker = new AMap.Marker({
      position: [obj.lng, obj.lat],
      icon: position3,
      offset: new AMap.Pixel(-25, -25)
    });

    marker.on("click", this.clickMarker);
    marker.on("mouseover", this.mouseOverMarker);
    this.map.add([marker]);
  }

  clickMarker(event: any) {
    let marker = event.target;
    if (marker.getIcon() == position1) {
      marker.setIcon(position3);
    } else {
      marker.setIcon(position1);
    }
  }

  mouseOverMarker(event: any) {
    let marker = event.target;
    let info = `<div class="info">服务志愿点的具体数据……</div>`;
    marker.infoWindow = new AMap.InfoWindow({
      content: info //使用默认信息窗体框样式，显示信息内容
    });
    marker.infoWindow.open(this.map, marker.getPosition());
  }

  mounted() {
    this.init();
    this.getMarker();
  }
}
</script>

