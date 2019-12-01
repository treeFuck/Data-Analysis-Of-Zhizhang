<style lang="scss">
.index {
  #map {
    width: 100vw;
    height: 100vh;

    .amap-icon img {
      width: 50px;
      height: 50px;
    }

    // .amap-marker-label {
    //   padding: 1em;
    //   width: 150px;
    //   height: 150px;
    //   border: none;
    //   border-radius: 5px;
    //   background-color: #fff;
    //   box-shadow: 2px 2px 10px 0 #999;
    // }
  }
  .info {
    word-wrap: break-word;
    width: 150px;
    // height: 150px;
  }
}
</style> 
<template>
  <div class="index">
    <div id="map"></div>
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

