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
                <p
                  class="gb-wheel-itext"
                  :class="awards.length>6 &&'gb-wheel-stext'"
                >{{data.prizeName}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="gb-wheel-btn"
      @click="go"
      v-if="!((wheelGameData.jifunNumber ===0 && wheelGameData.restNumber===0)
      || wheelGameData.todayPlayedByTimesNumber >=wheelGameData.dailyLimit)"
    >
      <img
        :src="require(`@/assets/${$global_config.platform_config.ASSET_PATH}/img/wheel/Free-Pointer.svg`)"
      />
    </div>
    <goBtn
      @go="go"
      :rest-number="wheelGameData.restNumber"
      :jifun-number="wheelGameData.jifunNumber"
      :deduct-jifun="wheelGameData.deductJifun"
      :today-played-by-times-number="wheelGameData.todayPlayedByTimesNumber"
      :daily-limit="wheelGameData.dailyLimit"
    />
  </section>
</template>

<script>

export default {
  props: {
    isRun: {
      type: Boolean,
      default: false,
    },
    prizeDetail: {
      type: Object,
    },
  },
  data() {
    return {
      i: 0,
      gbWheelContent: '',
      isRes: false,
      runAngle: 0,
      PRIZE_ENUM: {
        CHANGE: 409,
      },
    };
  },
  computed: {
    wheelGameData() {
      return this.$store.state.wheelGameData;
    },
    type() {
      return this.$store.state.wheelGameType;
    },
    awards() {
      return this.wheelGameData.itemList;
    },
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
    angle() {
      return 360 / this.awards.length;
    },
  },
  created() {
    this.gbWheelContent = `rotate(${this.angle / 2}deg)`;
  },
  methods: {
    changeType() {
      const { type } = this;
      this.$store.commit('setWheelGameType');
      setTimeout(async () => {
        this.$api.actiList.initActivityLuckySpin({ body: type }, (res) => {
          this.$store.commit('setWheelGameData', res.data);
          this.$store.commit('setWheelGameType', type);
        });
      });
    },
    go() {
      if (this.isRun) {
        return;
      }
      this.$emit('onRun', true);
      this.$api.actiList.checkBeforeGoActivityLuckySpin({ body: this.wheelGameData.id }, () => {
        this.i += 1;
        this.isRes = false;

        this.runAngle += 360 * 10;
        this.gbWheelContent = `rotate(${this.runAngle + (this.angle / 2)}deg)`;
        setTimeout(() => {
          this.$api.actiList.goActivityLuckySpin({ body: this.wheelGameData.id }, (res) => {
            this.isRes = true;
            const itemIndex = this.awards.findIndex((d) => d.prizeId === res.data.prizeId);
            const itemAngle = 360 - this.angle * itemIndex;
            this.gbWheelContent = `rotate(${itemAngle + this.runAngle - (this.angle / 2) + 1}deg)`;
            setTimeout(() => {
              this.$emit('onRun', false);
              this.isRes = false;
              this.$emit('onGetPrize', this.awards[itemIndex]);
              this.$api.actiList.initActivityLuckySpin({ body: this.type }, (resSpin) => {
                this.$store.commit('setWheelGameData', resSpin.data);
              });
            }, 6500);
          }, (err) => {
            setTimeout(() => {
              this.$emit('onRun', false);
              this.isRes = false;
              this.$commonFun.showConfirmDialog({
                message: err.message,
              });
              this.$api.actiList.initActivityLuckySpin({ body: this.type }, (resSpin) => {
                this.$store.commit('setWheelGameData', resSpin.data);
              });
            }, 16500);
          });
        }, 2500);
      }, (err) => {
        this.$emit('onRun', false);
        if (err.code === this.PRIZE_ENUM.CHANGE) {
          this.$commonFun.showConfirmDialog({
            title: err.message,
            confirm: () => {
              this.changeType();
            },
          });
        } else {
          this.$commonFun.showErrorMessageDialog(err.message);
        }
      });
    },
  },
  components: {
    goBtn: (goBtn) => { require(['@/components/wheelGame/goBtn.vue'], goBtn); },
  },
};

</script>

<style scoped>
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
  writing-mode: vertical-rl;
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

.gb-wheel-run {
  transition: transform 6s ease-out;
}

.gb-wheel-run-before {
  transition: transform 20s ease;
}
</style>
