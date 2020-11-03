<template>
  <section class="gb-wheel-container">
    <div class="gb-wheel-free-head-light"></div>
    <div class="gb-wheel-free-head"></div>
    <div class="gb-wheel-free-flag"></div>
    <div class="gb-wheel-free-ball2"></div>
    <div class="gb-wheel-free-Y"></div>
    <div class="gb-wheel-free-R"></div>
    <div class="gb-wheel-free-ball1"></div>
    <div class="gb-wheel-free-go"></div>
    <div class="gb-wheel-free-BG">
      <div class="gb-wheel-light">
        <div
          class="gb-wheel-content"
          :class="isRes ?'gb-wheel-run' :'gb-wheel-run-before'"
          :style="{
       backgroundImage:
       `url('${require(`@/assets/${$global_config.platform_config
       .ASSET_PATH}/img/wheel/[H5] Free-Spin Wheel ${awards.length}.svg`)}')` ,
       transform: gbWheelContent
          }"
        >
          <div class="gb-wheel-list">
            <div class="gb-wheel-item" v-for="(data,i) in awards" :key="data.name">
              <div
                class="gb-wheel-icontent"
                :class="awards.length>6 &&'gb-wheel-vertical'"
                :style="{
                paddingTop: getPaddingTop,
                transform: `rotate(${(i * angle)+(angle/2)}deg)`}"
              >
                <p class="gb-wheel-itext" :class="awards.length>6 &&'gb-wheel-stext'">{{data.text}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gb-wheel-btn" @click="go">
      <img
        :src="require(`@/assets/${$global_config.platform_config.ASSET_PATH}/img/wheel/Free-Pointer.svg`)"
      />
    </div>
    <div class="gb-wheel-now" @click="go">
      <div>立即抽奖</div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      awards: [],
      i: 0,
      angle: 0,
      gbWheelContent: '',
      isRes: false,
      isRun: false,
      runAngle: 0,
    };
  },
  computed: {
    getPaddingTop() {
      let paddingTop = '1rem';
      switch (this.awards.length) {
        case 4:
          paddingTop = '1.5rem';
          break;
        case 5:
          paddingTop = '1.2rem';
          break;
        case 6:
          paddingTop = '0.8rem';
          break;
        case 7:
        case 8:
        case 9:
        case 10:
          paddingTop = '0.6rem';
          break;
        default:
          break;
      }
      return paddingTop;
    },
  },
  created() {
    this.awards = [
      { text: '耳机耳机耳机耳机耳机' },
      { text: 'iPhone' },
      { text: '存送優惠十字元50%' },
      { text: '咖啡杯' },
      { text: '日历日历日历日历日历' },
      { text: '存送優惠十字元40%' },
      { text: 'google' },
      { text: 'yahoo' },
      { text: '存送優惠十字元30%' },
      { text: 'android' },
    ];
    this.angle = 360 / this.awards.length;
    this.gbWheelContent = `rotate(${this.angle / 2}deg)`;
  },
  methods: {
    go() {
      if (this.isRun) {
        return;
      }
      this.i += 1;
      this.isRes = false;
      this.isRun = true;
      this.runAngle += 360 * 10;
      this.gbWheelContent = `rotate(${this.runAngle}deg)`;
      setTimeout(() => {
        // eslint-disable-next-line no-constant-condition
        if (true) {
          this.isRes = true;
          const randomItem = Math.floor(Math.random() * this.awards.length);
          const itemAngle = 360 - this.angle * randomItem;
          this.gbWheelContent = `rotate(${itemAngle + this.runAngle - (this.angle / 2)}deg)`;
          setTimeout(() => {
            this.$commonFun.showConfirmSuccessDialog({
              message: `恭喜抽到${this.awards[randomItem].text}`,
            });
            this.isRun = false;
            this.isRes = false;
          }, 6500);
        } else {
          this.$commonFun.showConfirmDialog({
            message: '請稍後在試',
          });
          this.isRun = false;
          this.isRes = false;
        }
      }, 4000);
    },
  },
};

</script>

<style>
.gb-wheel-container p {
  margin: 0;
  padding: 0;
}

.gb-wheel-container {
  margin: 0 auto;
  position: relative;
  width: 340Px;
  height: 416Px;
}

.gb-wheel-free-ball1 {
  position: absolute;
  width: 50Px;
  height: 50Px;
  bottom: 65px;
  right: -5Px;
}

.gb-wheel-free-ball2 {
  position: absolute;
  width: 40Px;
  height: 40Px;
  top: 80Px;
  left: -5Px;
}

.gb-wheel-free-Y {
  position: absolute;
  width: 102Px;
  height: 268Px;
  top: -10Px;
  right: -25Px;
}

.gb-wheel-free-go {
  position: absolute;
  width: 102Px;
  height: 268Px;
  top: 10Px;
  right: -40Px;
}

.gb-wheel-free-R {
  position: absolute;
  width: 185Px;
  height: 206Px;
  bottom: -55Px;
  left: -5Px;
  z-index: 2;
}

.gb-wheel-free-flag {
  position: absolute;
  width: 100%;
  height: 28Px;
  left: 18Px;
}

.gb-wheel-free-head-light {
  position: absolute;
  width: 100%;
  height: 45Px;
  top: 30Px;
  z-index: 3;
}

.gb-wheel-free-head {
  position: absolute;
  width: 100%;
  height: 45Px;
  top: 30Px;
  z-index: 2;
}

.gb-wheel-content {
  position: absolute;
  width: 300Px;
  height: 300Px;
  top: -6Px;
  left: -5Px;
}

.gb-wheel-light {
  position: absolute;
  width: 288Px;
  height: 288Px;
  top: 25Px;
  left: 25Px;
}

.gb-wheel-free-BG {
  position: absolute;
  top: 30Px;
  width: 100%;
  height: 340Px;
}

.gb-wheel-list {
  position: absolute;
  left: 0;
  top: 0;
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

.gb-wheel-stext{
    font-size: 14Px !important;
}

.gb-wheel-itext {
  font-size: 16Px;
  letter-spacing: 0.8Px;
  color: #ffffff;
  opacity: 1;
}

.gb-wheel-btn {
  position: absolute;
  left: 125Px;
  top: 128Px;
  width: 82Px;
  height: 113Px;
  cursor: pointer;
}

.gb-wheel-btn img {
  margin-top: 62Px;
  margin-left: 4Px;
  width: initial;
}

.gb-wheel-now {
  position: absolute;
  width: 144Px;
  height: 48Px;
  cursor: pointer;
  background: transparent linear-gradient(0deg, #bf2621 0%, #eb524d 100%) 0% 0%
    no-repeat padding-box;
  box-shadow: -1px -1px 2px #ffffff80;
  border-radius: 27px;
  bottom: -1Px;
  right: 95Px;
  z-index: 2;
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
</style>
