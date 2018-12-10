<template>
  <div class="infographic">
    <div class="infographic__item">
      <div class="infographic__icon">
        <img src="@/assets/images/info/info-1.png" alt="ДТП">
      </div>
      <div class="infographic__text">
        Виновник ДТП не будет установлен
      </div>
    </div>
    <div class="infographic__item">
      <div class="infographic__icon">
        <img src="@/assets/images/info/info-2.png" alt="Повреждение">
      </div>
      <div class="infographic__text">
        Неизвестное лицо повредит автомобиль
      </div>
    </div>
    <div class="infographic__item">
      <div class="infographic__icon">
        <img src="@/assets/images/info/info-3.png" alt="Погода">
      </div>
      <div class="infographic__text">
        Автомобиль побьет градом или на него упадет дерево из-за ураганного ветра
      </div>
    </div>
    <div class="infographic__item">
      <div class="infographic__icon">
        <img src="@/assets/images/info/info-4.png" alt="Угон">
      </div>
      <div class="infographic__text">
        Автомобиль угонят
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infographic {
  @include flex-row;
  justify-content: space-between;
  &__item {
    text-align: center;
    width: 220px;
  }
  &__icon {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__text {
    color: $grey;
    font-size: rem(14);
    line-height: 18px;
  }
}
@include media-small-desktop() {
  .infographic {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
