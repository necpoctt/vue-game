<template>
  <div class="chipBetBoard">
    <div class="board">
      <div class="bigBlock" v-for="(data, index) in betData" :key="data.text">
        <div class="contentBlock" @click="blockClick($event, index)">
          <div class="title">
            {{ data.text }}
            <div
              class="showMoneyBlock"
              :title="`${chipsStack[index].money}`"
              v-if="chipsStack[index].money !== 0"
            >{{ chipsStack[index].money }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="controlBlock" ref="control">
      <div class="top clearf">
        <div class="center clearf">
          <div
            v-for="(chip, index) in chipData"
            :key="chip.value"
            :class="chip.CSS"
            :style="chipSelectIndex === index ? 'opacity:1' : ''"
            @click="chipSelectIndex = index"
          >{{ chip.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, reactive, onBeforeMount, onUnmounted,
} from 'vue';

const control = ref<HTMLDivElement>();

const betData = [
  { text: 'BP' },
  { text: 'T' },
  { text: 'PP' },
  { text: 'BB' },
  { text: 'P' },
];

const chipData = [
  { CSS: 'blackUnFillChip', value: 110 },
  { CSS: 'redChip', value: 20 },
  { CSS: 'blueChip', value: 30 },
  { CSS: 'greenChip', value: 40 },
  { CSS: 'yellowChip', value: 50 },
];

const chipsStack = reactive([
  { money: 0 },
  { money: 0 },
  { money: 0 },
  { money: 0 },
  { money: 0 },
]);
const chipSelectIndex = ref(0);

const getShootRect = (shootTargetElement: Element) => {
  const shootTargetElementRect = shootTargetElement.getBoundingClientRect();
  const targetMiddlePos = {
    x: shootTargetElementRect.x + 20,
    y: shootTargetElementRect.y,
  };
  return targetMiddlePos;
};

const shootAnimation = (shootTargetElement: Element, index: number) => {
  const pickChipCSS = `.${chipData[chipSelectIndex.value].CSS}`;
  const pickChip: any = document.querySelector(pickChipCSS);
  const clonePick: HTMLElement = pickChip.cloneNode(true);
  clonePick.classList.add('posAbsolute');
  clonePick.classList.add(`block${index}`);

  const startRect: DOMRect | undefined = control.value?.getBoundingClientRect();

  const startPos = {
    x: (startRect?.x || 0) + (startRect?.width || 0) / 2,
    y: (startRect?.y || 0),
  };

  clonePick.style.setProperty(
    'transition',
    'all 0.6s ease-out',
  );
  clonePick.style.left = `${startPos.x}px`;
  clonePick.style.top = `${startPos.y}px`;

  pickChip.parentNode.appendChild(clonePick);

  const targetPos = getShootRect(shootTargetElement);

  setTimeout(() => {
    clonePick.style.left = `${targetPos.x}px`;
    clonePick.style.top = `${targetPos.y}px`;
  });
};

const blockClick = (event: Event, index: number) => {
  const el = event.currentTarget as HTMLElement;
  chipsStack[index].money += chipData[chipSelectIndex.value].value;
  shootAnimation(el, index);
};

const resizeChipHandler = () => {
  const allContentBlock = document.querySelectorAll('.contentBlock');

  allContentBlock.forEach((contentBlock, index) => {
    const targetPos = getShootRect(contentBlock);
    const allContentBlockChips = document.querySelectorAll(`.posAbsolute.block${index}`);

    allContentBlockChips.forEach((contentBlockChip: Element) => {
      const contentBlockChipEle = contentBlockChip as HTMLElement;
      contentBlockChipEle.style.removeProperty(
        'transition',
      );
      contentBlockChipEle.style.left = `${targetPos.x}px`;
      contentBlockChipEle.style.top = `${targetPos.y}px`;
    });
  });
};

onBeforeMount(() => {
  window.addEventListener('resize', resizeChipHandler);
});

onUnmounted(() => {
  window.addEventListener('resize', resizeChipHandler);
});

</script>

<style lang="scss" scoped>
$assetsPath: "../assets";
.clearf:after,
.clearf:before {
  content: " ";
  display: block;
  clear: both;
}
@mixin absoluteMiddle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.posAbsolute {
  position: absolute;
}

.controlBlock {
  %ChipBase {
    $size: 80px;
    $lineHeightOffset: 5px;
    background-size: $size $size;
    line-height: $size - $lineHeightOffset;
    height: $size;
    width: $size;
    font-size: 26px;
    color: black;
    text-align: center;
    font-weight: 900;
  }

  .redChip,
  .blueChip,
  .greenChip,
  .yellowChip,
  .blackUnFillChip {
    @extend %ChipBase;
    cursor: pointer;
    opacity: 0.3;
  }
  %throwChipBase {
    $size: 50px;
    $lineHeightOffset: 5px;
    background-size: $size $size;
    line-height: $size - $lineHeightOffset;
    height: $size;
    width: $size;
    font-size: 15px;
    color: black;
    text-align: center;
    font-weight: 900;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .throw_redChip,
  .throw_blueChip,
  .throw_greenChip,
  .throw_yellowChip,
  .throw_blackUnFillChip {
    @extend %throwChipBase;
    cursor: pointer;
  }
  .redChip,
  .throw_redChip {
    background-image: url("#{$assetsPath}/images/Chip_Red.png");
  }
  .blueChip,
  .throw_blueChip {
    background-image: url("#{$assetsPath}/images/Chip_Blue.png");
  }
  .greenChip,
  .throw_greenChip {
    background-image: url("#{$assetsPath}/images/Chip_Green.png");
  }
  .yellowChip,
  .throw_yellowChip {
    background-image: url("#{$assetsPath}/images/Chip_Yellow.png");
  }
  .blackUnFillChip,
  .throw_blackUnFillChip {
    background-image: url("#{$assetsPath}/images/Chip_BlackUnFill.png");
  }
}

.chipBetBoard {
  width: 100%;
  margin: 0 auto;
  .board {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    padding: 10px;

    .bigBlock:nth-child(n + 4) {
      width: 50%;
    }

    .bigBlock {
      width: 33.3%;
      height: 80px;
      background-color: #366f1c;

      &:hover {
        background-color: #91b786;
      }
      .contentBlock {
        $fontSize: 16px;
        z-index: 1;
        @include absoluteMiddle();
        cursor: pointer;
        position: relative;
        border: 1px solid white;
        height: 100%;
        color: white;
        font-size: $fontSize;
        text-align: center;
        line-height: $fontSize * 1.5;
        .title {
          font-size: $fontSize * 1.5;
        }
        .showMoneyBlock {
          background-color: #404040;
          border: 1px solid black;
          border-radius: 5px;
          font-size: 14px;
          text-align: center;
          color: gold;
          margin-top: 5px;
          width: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .controlBlock {
    margin-top: 320px;
    .top {
      background-color: #366f1c;
      .center {
        height: 100%;
        @include absoluteMiddle;
        width: 100%;
      }
    }
  }
}
</style>
