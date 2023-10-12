<template>
  <div class="card-module">
    <div
      class="card"
      :style="getstyle(i)"
      :class="{change:showClass, getprize :curOpen === i }"
      v-for="(cardItem,i) in cardData"
      :key="i"
      @click="itemChage(cardItem, i)"
    >
      <div class="front card-item">{{cardItem.front}}</div>
      <div class="back card-item">{{cardItem.back}}</div>
    </div>
    <button @click="resetData">重置数据</button>
    <button @click="allChange">全部翻转</button>
    <button @click="allMove">全部移动</button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      cardData: [
        {
          animationData: {},
          front: '正面1',
          back: '反面1',
        },
        {
          animationData: {},
          front: '正面2',
          back: '反面2',
        },
        {
          animationData: {},
          front: '正面3',
          back: '反面3',
        },
        {
          animationData: {},
          front: '正面4',
          back: '反面4',
        },
        {
          animationData: {},
          front: '正面5',
          back: '反面5',
        },
        {
          animationData: {},
          front: '正面6',
          back: '反面6',
        },
        {
          animationData: {},
          front: '正面7',
          back: '反面7',
        },
        {
          animationData: {},
          front: '正面8',
          back: '反面8',
        },
        {
          animationData: {},
          front: '正面9',
          back: '反面9',
        },
      ],
      showClass: true,
      shuffle: false,
      curOpen: -1,
    };
  },
  methods: {
    resetData() {
      this.curOpen = -1;
      this.allMove();
      this.cardData = [
        {
          animationData: {},
          front: '正面1',
          back: '反面1',
        },
        {
          animationData: {},
          front: '正面2',
          back: '反面2',
        },
        {
          animationData: {},
          front: '正面3',
          back: '反面3',
        },
        {
          animationData: {},
          front: '正面4',
          back: '反面4',
        },
        {
          animationData: {},
          front: '正面5',
          back: '反面5',
        },
        {
          animationData: {},
          front: '正面6',
          back: '反面6',
        },
        {
          animationData: {},
          front: '正面7',
          back: '反面7',
        },
        {
          animationData: {},
          front: '正面8',
          back: '反面8',
        },
        {
          animationData: {},
          front: '正面9',
          back: '反面9',
        },
      ];
    },

    getstyle(i) {
      let res = '';
      if (this.shuffle) {
        switch (i) {
          case 0:
            res = 'transform: translate(130%, 130%);';
            break;
          case 1:
            res = 'transform: translate(0, 130%);';
            break;
          case 2:
            res = 'transform: translate(-130%, 130%);';
            break;
          case 3:
            res = 'transform: translate(130%, 0);';
            break;
          case 4:
            res = 'transform: translate(0, 0);';
            break;
          case 5:
            res = 'transform: translate(-130%, 0);';
            break;
          case 6:
            res = 'transform: translate(130%, -130%);';
            break;
          case 7:
            res = 'transform: translate(0, -130%);';
            break;
          case 8:
            res = 'transform: translate(-130%, -130%);';
            break;
          default:
        }
      }

      return res;
    },
    allChange() {
      this.showClass = !this.showClass;
    },
    itemChage(item, curIndex) {
      this.curOpen = curIndex;
    },
    allMove() {
      this.shuffle = true;
      setTimeout(() => {
        this.shuffle = false;
      }, 1000);
    },
  },

};
</script>


<style scoped>

.card-module{
  padding: 45px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  transform:translate3d(0,0,0);
}

.card-module .card{
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    margin: 10px;
    position:relative;
    overflow:hidden;
    transition: all 0.5s ease 0s;
  }

.card-module .card .card-item{
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      transition:all .5s ease-in-out;
      transform-style:preserve-3d;
      backface-visibility:hidden;
      box-sizing:border-box;
    }
.card-module .card .front{
      background-color: red;
      transform: rotateY(0deg);
      z-index:2;
    }
.card-module .card .back{
      background-color: #009fff;
      transform: rotateY(180deg);
      z-index:1;
    }

 .card.change  .front{
      z-index:1;
      transform: rotateY(180deg);
}

.card.change .back{
  z-index:2;
  transform: rotateY(0deg);
}


.card.getprize .front{
    z-index:2;
    transform: rotateY(0deg);
}

.card.getprize .back{
  z-index:1;
	transform: rotateY(180deg);
}

</style>
