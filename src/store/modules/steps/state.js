export default {
  currentStep: 0,
  stepsMap: [
    {
      title: 'Автомобиль',
      detailTitle: 'Информация об автомобиле',
      path: 'common-data',
      subSteps: [
        'auto',
        'features',
        'cost',
      ],
      currentSubStep: 0,
      hasError: false,
    },
    {
      title: 'Водители',
      detailTitle: '',
      path: 'user-role',
      subSteps: [
        'auto',
        'features',
        'cost',
      ],
      currentSubStep: 0,
      hasError: false,
    },
    {
      title: 'Расчет стоимости',
      detailTitle: '',
      path: 'check',
      subSteps: [
        'auto',
        'features',
        'cost',
      ],
      currentSubStep: 0,
      hasError: false,
    },
    {
      title: 'Данные',
      detailTitle: '',
      path: 'check',
      subSteps: [
        'auto',
        'features',
        'cost',
      ],
      currentSubStep: 0,
      hasError: false,
    },
  ],
};
