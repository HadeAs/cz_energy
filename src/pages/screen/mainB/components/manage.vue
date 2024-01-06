<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u6.png" />设备情况及运维管理
    </div>
    <div class="cs-right-wrap2">
      <div class="cs-right-wrap3">
        <div class="cs-sub-header">
          <span class="cs-sub-header-text">设备情况</span>
          <el-button
            type="primary"
            @click="goDeviceMgr"
            class="btn btn-primary btn-sm"
            >设备管理</el-button
          >
        </div>
        <div class="cs-right-info">
          <div class="cs-right-text1">
            <img src="@/assets/img/screen/mainB/u6245.png" />监测设备总量
          </div>
          <div class="cs-right-text2">
            <span class="num">584</span>
            <span class="unit">台</span>
          </div>
        </div>
        <div class="cs-right-box">
          <div class="cs-img-box">
            <img src="@/assets/img/screen/mainB/u6241.png" />
          </div>
          <div class="cs-info-detail">
            <div class="progress progress-ty">
              <div class="progress-bars">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style="width: 60%"
                ></div>
              </div>
              <span class="label label-primary">正常监测设备</span>
              <div class="cs-info-num">
                <span class="num">561</span>
                <span class="unit">台</span>
              </div>
            </div>
          </div>
        </div>
        <div class="cs-right-box">
          <div class="cs-img-box">
            <img src="@/assets/img/screen/mainB/u6243.png" />
          </div>
          <div class="cs-info-detail">
            <div class="progress progress-ty">
              <div class="progress-bars">
                <div
                  class="progress-bar progress-bar-danger"
                  role="progressbar"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style="width: 60%"
                ></div>
              </div>
              <span class="label label-carrot">异常监测设备</span>
              <div class="cs-info-num">
                <span class="num">23</span>
                <span class="unit">台</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cs-right-wrap4">
        <div class="cs-sub-header">
          <span class="cs-sub-header-text">设备在线率</span>
        </div>
        <div class="cs-circle-wrap">
          <canvas
            ref="canvasRef"
            id="scoreCanvas"
            width="146"
            height="146"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="Manage">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import c1 from "@/assets/img/screen/mainB/c1.png";
// import c2 from "@/assets/img/screen/mainB/c2.png";
// import c3 from "@/assets/img/screen/mainB/c3.png";
// import c4 from "@/assets/img/screen/mainB/c4.png";

const images = [
  "@/assets/img/screen/mainB/c1.png",
  "@/assets/img/screen/mainB/c2.png",
  "@/assets/img/screen/mainB/c3.png",
  "@/assets/img/screen/mainB/c4.png",
];

const colorArr = [
  ["#56E0EF", "#1497DC"],
  ["#E3CD61", "#CDB025"],
  ["#E49664", "#C96424"],
  ["#E36363", "#CB2424"],
];
const bgImage = ref(images[0]);
const canvasRef = ref();
const router = useRouter();
const renderCanvas = (score) => {
  let color1;
  let color2;
  if (score >= 80) {
    bgImage.value = images[0];
    color1 = colorArr[0][0];
    color2 = colorArr[0][1];
  } else if (score >= 60 && score < 80) {
    bgImage.value = images[1];
    color1 = colorArr[1][0];
    color2 = colorArr[1][1];
  } else if (score >= 46 && score < 60) {
    bgImage.value = images[2];
    color1 = colorArr[2][0];
    color2 = colorArr[2][1];
  } else {
    bgImage.value = images[3];
    color1 = colorArr[3][0];
    color2 = colorArr[3][1];
  }
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  let rangeValue = score;
  let curRange = 0;
  const mW = canvas.width;
  const mH = canvas.height;
  let lineWidth = 2;
  let r = mH / 2; // 圆心坐标
  let cR = r; // 圆的半径

  let sX = 0;
  let axisLength = mW; //轴长
  const waveWidth = 0.095; //波浪宽度,数越小越宽
  const waveHeight = 5; //波浪高度,数越大越高
  const speed = 0.03; //波浪速度，数越大速度越快
  let xOffset = 0; //波浪x偏移量

  ctx.lineWidth = lineWidth;

  let IsdrawCircled = false;
  const drawCircle = function () {
    ctx.beginPath();
    ctx.arc(r, r, cR, 0, 2 * Math.PI);
    ctx.clip(); // 只有落在裁选取的部分才能显示
  };

  const drawSin = function (xOffset) {
    ctx.save();

    const points = []; // 存放绘制Sin曲线的点

    ctx.beginPath();

    for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
      // 坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
      const y = -Math.sin((sX + x) * waveWidth + xOffset);

      const dY = mH * (1 - curRange / 100);

      points.push([x, dY + y * waveHeight]);
      ctx.lineTo(x, dY + y * waveHeight);
    }

    ctx.lineTo(axisLength, mH);
    ctx.lineTo(sX, mH);
    ctx.lineTo(points[0][0], points[0][1]);
    var grad = ctx.createLinearGradient(0, 0, 0, 100);
    grad.addColorStop(0, color2);
    grad.addColorStop(1, color1);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  };

  const drawText = function () {
    ctx.save();

    const size = 36;
    ctx.font = size + "px Microsoft Yahei";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText(curRange + "%", r, 2 * r - 86);
    ctx.font = 14 + "px Microsoft Yahei";
    ctx.fillText("设备在线率", r, 2 * r - 50);
    ctx.restore();
  };

  const render = function () {
    ctx.clearRect(0, 0, mW, mH);

    rangeValue = score;

    if (IsdrawCircled === false) {
      drawCircle();
    }
    IsdrawCircled = true;
    if (curRange <= rangeValue) {
      const tmp = 1;
      curRange += tmp;
    }

    if (curRange > rangeValue) {
      const tmp = 1;
      curRange -= tmp;
    }

    drawSin(xOffset);
    drawText();

    xOffset += speed;
    // 达到目标值之前重复运行render函数
    requestAnimationFrame(render);
  };
  render();
};
const goDeviceMgr = () => {
  router.push({ path: "/deviceLedger" });
};
onMounted(() => {
  renderCanvas(80);
});
</script>
<style lang="scss" scoped>
.content {
  height: 334px;

  .cs-right-wrap2 {
    margin-top: 12px;
    width: 100%;
    height: 320px;
    display: flex;
  }

  .cs-right-wrap3 {
    width: 60%;
    padding-right: 20px;
    .btn-sm {
      height: 26px;
      font-size: 12px;
    }
  }

  .cs-right-wrap3 .cs-right-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    margin-top: 12px;
  }

  .cs-right-wrap3 .cs-right-info .cs-right-text1 {
    color: #a9c5e7;
  }

  .cs-right-wrap3 .cs-right-info .cs-right-text1 > img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  .cs-right-wrap3 .cs-right-info .cs-right-text2 .num {
    font-size: 30px;
    font-weight: bold;
    color: #fff;
  }

  .cs-right-wrap3 .cs-right-info .cs-right-text2 .unit {
    color: #a9c5e7;
  }

  .cs-right-wrap3 .cs-right-box {
    display: flex;
    height: 74px;
    margin-top: 12px;
  }

  .cs-right-wrap3 .cs-right-box .cs-img-box {
    width: 62px;
    height: 62px;
    border-radius: 5px;
    background-color: #312e39;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }

  .cs-right-wrap3 .cs-right-box .cs-info-detail {
    flex: 1;
    overflow: hidden;
  }

  .progress {
    overflow: visible;
    height: 20px;
    margin-bottom: 16px;
    background-color: rgba(110, 215, 254, 0.1);
    border-radius: 9px;
    border: 1px solid rgba(110, 215, 254, 0.2);
  }

  .progress-bar {
    float: left;
    width: 0%;
    height: 110%;
    font-size: 12px;
    line-height: 20px;
    color: #b4feff;
    text-align: right;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 249, 255, 0.8) 0%,
      rgba(0, 249, 255, 0.3) 100%
    );
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#CC00F9FF', endColorstr='#4D00F9FF', GradientType=0);
    border: 1px solid #00f9ff;
    transition: width 0.2s cubic-bezier(0.4, 1, 0.75, 0.9);
    border-radius: 9px;
    -webkit-border-radius: 9px;
    -moz-border-radius: 9px;
    -ms-border-radius: 9px;
    -o-border-radius: 9px;
    margin: -1px 0 0 -1px;
  }

  .progress-ty .progress-bar {
    position: relative;
    z-index: 1;
    height: 100%;
    margin: 0;
  }

  .progress-ty {
    position: relative;
    padding: 8px 50px 0 0;
    height: 16px;
    background-color: transparent;
    overflow: visible;
    border: none;
  }

  .progress-ty > .progress-bars .progress-bar:first-child {
    border-radius: 9px 0 0 9px;
    -webkit-border-radius: 9px 0 0 9px;
    -moz-border-radius: 9px 0 0 9px;
    -ms-border-radius: 9px 0 0 9px;
    -o-border-radius: 9px 0 0 9px;
    margin-left: -1px;
  }

  .progress-ty > .progress-bars {
    width: 100%;
    height: 8px;
    background-color: rgba(110, 215, 254, 0.1);
    border-radius: 9px;
    overflow: hidden;
  }

  .progress-ty > .progress-bars .progress-bar:last-child {
    border-radius: 0 9px 9px 0;
    -webkit-border-radius: 0 9px 9px 0;
    -moz-border-radius: 0 9px 9px 0;
    -ms-border-radius: 0 9px 9px 0;
    -o-border-radius: 0 9px 9px 0;
  }

  .cs-right-wrap3 .cs-right-box .cs-info-detail .progress-ty {
    padding-right: 0;
    padding-top: 0;
  }

  .cs-right-wrap3 .cs-right-box .cs-info-detail .progress-bar {
    background-color: #0470dd;
    background-image: none;
    border: none;
  }

  .cs-right-wrap3 .cs-right-box .cs-info-detail .progress-bar-danger {
    background-color: #ff6600;
  }

  .cs-right-wrap3 .cs-right-box .cs-info-detail .label {
    margin-left: 0;
    margin-top: 8px;
    color: #7a7886;
  }

  .cs-right-wrap3 .cs-right-box .cs-info-detail .cs-info-num .num {
    color: #fff;
    font-weight: bold;
    font-size: 22px;
  }

  .cs-right-wrap3 .cs-right-box .cs-info-detail .cs-info-num .unit {
    color: #a9c5e7;
  }

  .cs-right-wrap4 {
    width: 40%;
  }

  .cs-right-wrap4 .cs-circle-wrap {
    width: 176px;
    height: 176px;
    padding: 15px;
    background-image: url("@/assets/img/screen/mainB/c1.png");
    background-size: cover;
    margin-top: 36px;
  }
}
</style>
