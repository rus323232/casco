<template>
<div class="main-info-block">
  <v-tabs-slider
    :tabs="tabs"
  >
    <div slot="slide-1">
      <p class="main-info-block__bold-text">
        Наличие автомобиля всегда связано с рисками, к которым нужно быть готовым.
      </p>
      <p class="main-info-block__paragraph">
        Страхование каско обеспечивает защиту от угона, полной конструктивной гибелиавтомобиля
        или его повреждения.
        При страховом случае страховая компания организует и оплатит ремонт или выплатит страховую
        сумму,
        если автомобиль не подлежит восстановлению или угнан.
      </p>
      <div class="main-info-block__grey-text main-info-block__bold-text">
        В отличие от ОСАГО каско защитит ваш автомобиль, если:
      </div>
      <v-infographic />
      <div class="main-info-block__bottom">
        Для оформления полиса не обязательно приходить в офис.
        Рассчитать стоимость страховки и вызвать специалиста можно в режиме онлайн.
        И в этом поможет <a class="link _uppercase _underline">онлайн-калькулятор каско</a>
      </div>
    </div>
    <div slot="slide-2">
      <p class="main-info-block__paragraph">
        Расчет стоимости каско зависит от большого числа факторов:
      </p>
      <p class="main-info-block__paragraph">
        1. Чем шире страховое покрытие, тем выше цена. С другой стороны,
        наиболее полный перечень рисков и дополнительные опции позволят использовать страховку
        в большинстве
        непредвиденных ситуаций.
        <br>
        2. Цена страхования зависит от допущенных к управлению водителей, их возраста и
        водительского стажа.
        Если допущены молодые или неопытные водители, то цена страхового полиса будет
        значительно выше стоимости полиса,
        где к управлению допущены опытные водители.
        <br>
        3. Год выпуска, марка, модель автомобиля также влияют на стоимость страхования.
      </p>
    </div>
  </v-tabs-slider>
</div>
</template>

<script>
import VInfographic from './VInfographic.vue';
import VTabsSlider from '../ui/VTabsSlider.vue';

export default {
  components: {
    VTabsSlider,
    VInfographic,
  },
  data() {
    return {
      tabs: [
        'Зачем нужно страховать КАСКО?',
        'Факторы, влияющие на стоимость КАСКО',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.main-info-block {
  margin-top: 100px;
  margin-bottom: 64px;
  font-size: rem(16);
  &__bold-text {
    margin-bottom: 23px;
    padding: 0;
    color: #252525;
    font-family: $open-sans-bold;
    font-size: rem(18);
  }
  &__paragraph {
    margin-bottom: 40px;
    padding: 0;
  }
  &__grey-text {
    color: $grey;
  }
  &__bottom {
    margin-top: rem(50);
  }
}
</style>
