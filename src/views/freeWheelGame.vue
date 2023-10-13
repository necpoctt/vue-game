<template>
  <div class="row">
    <div>
      <textarea v-model="settingAwards" />
      <div style="margin-top: 12px;">
        <span style="color:white; margin-right: 12px;">用Enter換行隔開獎項</span>
        <button @click="setting()">設定獎項</button>
      </div>
    </div>
    <div class="gb-wheel-container">

      <div class="gb-wheel-content" :class="runCssName" :style="{
        backgroundImage:
          `url('${img}')`,
        transform: gbWheelContent
      }">
      </div>

      <div class="btnContainer" v-if="img">
        <img class="pointer" @click="go" src="../assets/img/wheel/Common-Pointer.svg" />

        <div class="gb-wheel-btn" @click="go">
          <img src="../assets/img/wheel/Free-Pointer.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {
  ref,
} from 'vue';

let awards: any[] = [];
let isRun = false;
let runAngle = -90;
const settingAwards = ref('hi\nhello\nthank you\nok');

const angle = ref(0);
const gbWheelContent = ref('');
const img = ref('');

const runCssName = ref('');

const getRandomHexColor = () => {
  const r = Math.floor(Math.random() * 256); // 生成 0 到 255 之间的随机红色值
  const g = Math.floor(Math.random() * 256); // 生成 0 到 255 之间的随机绿色值
  const b = Math.floor(Math.random() * 256); // 生成 0 到 255 之间的随机蓝色值

  const hexR = r.toString(16).padStart(2, '0'); // 将红色值转换为两位十六进制，不足两位的补0
  const hexG = g.toString(16).padStart(2, '0'); // 将绿色值转换为两位十六进制，不足两位的补0
  const hexB = b.toString(16).padStart(2, '0'); // 将蓝色值转换为两位十六进制，不足两位的补0

  return `#${hexR}${hexG}${hexB}`;
};

const drawSector = (i: number, ctx: any, sectors: any) => {
  const tot = sectors.length;
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const { PI } = Math;
  const TAU = 2 * PI;
  const arc = TAU / tot;
  const ang = arc * i;
  ctx.save();
  // COLOR
  ctx.beginPath();
  ctx.fillStyle = getRandomHexColor();
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();
  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(sectors[i], rad - 10, 10);
  ctx.restore();
};

const genWheel = (tempAwards: any) => {
  const canvas = document.createElement('canvas');
  canvas.hidden = true;
  canvas.width = 400;
  canvas.height = 400;

  const context = canvas.getContext('2d');

  for (let i = 0; i < tempAwards.length; i += 1) {
    drawSector(i, context, tempAwards);
  }

  img.value = canvas.toDataURL('image/png');
};

const setting = () => {
  const tempAwards = settingAwards.value.split('\n');

  awards = tempAwards;

  angle.value = 360 / tempAwards.length;
  gbWheelContent.value = `rotate(${runAngle}deg)`;

  genWheel(awards);
};

const go = () => {
  if (isRun) {
    return;
  }
  isRun = true;
  runCssName.value = 'gb-wheel-run-before';
  runAngle -= 360 * 10;
  gbWheelContent.value = `rotate(${runAngle}deg)`;

  setTimeout(() => {
    runCssName.value = 'gb-wheel-run';
    const randomItem = Math.floor(Math.random() * awards.length);
    console.log(randomItem);
    const itemAngle = angle.value * (randomItem);
    gbWheelContent.value = `rotate(${runAngle - itemAngle - (angle.value / 2)}deg)`;

    setTimeout(() => {
      runCssName.value = '';
      alert(`恭喜抽到${awards[randomItem]} `);

      isRun = false;
    }, 6500);
  }, 4000);
};

</script>

<style lang="scss" scoped>
$assetsPath: "../assets";

.gb-wheel-container p {
  margin: 0;
  padding: 0;
}

.gb-wheel-container {
  position: relative;
  margin-left: 240px;
}

.gb-wheel-content {
  position: absolute;
  width: 400Px;
  height: 400Px;
}

.gb-wheel-light {
  position: absolute;
  width: 288Px;
  height: 288Px;
  top: 25Px;
  left: 25Px;
}

.gb-wheel-list {
  position: absolute;
  top: 40Px;
  width: inherit;
  height: inherit;
}

.gb-wheel-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.gb-wheel-icontent {
  position: relative;
  display: block;
  margin: 0 auto;
  text-align: center;
  transform-origin: 50% 150Px;
  width: 90Px;
}

.gb-wheel-vertical {
  text-orientation: sideways-right;
  height: 85Px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-lr;
}

.gb-wheel-stext {
  font-size: 14Px !important;
}

.gb-wheel-itext {
  font-size: 16Px;
  letter-spacing: 0.8Px;
  color: #ffffff;
  opacity: 1;
}

.btnContainer {
  position: absolute;
  left: 158Px;
  top: 131Px;
}

.gb-wheel-btn {
  position: absolute;
  left: 21Px;
  top: 58Px;
  cursor: pointer;
}

.gb-wheel-now div {
  padding: 12Px 32Px;
  letter-spacing: 1.8Px;
  color: #ffffff;
  font-size: 18Px;
}

.gb-wheel-run {
  transition: transform 6s ease-out;
}

.gb-wheel-run-before {
  transition: transform 30s ease;
}

.gb-wheel-run-init {
  transition: transform 0s ease;
}

.pointer {
  position: absolute;
  left: -10px;
  top: -20px;
  cursor: pointer;
}

textarea {
  resize: none;
  height: 350px;
  width: 250px;
  font-size: 20px;
}

.row {
  display: flex;
  padding: 60px;
}
</style>
