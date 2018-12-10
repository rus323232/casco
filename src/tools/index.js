export const sortArrayOfObjectByAlphabet = (value, fieldName = null) => value
  .sort((currentValue, nextValue) => {
    let fieldCurrent = '';
    let fieldNext = '';
    if (fieldName) {
      fieldCurrent = currentValue[fieldName].toLowerCase();
      fieldNext = nextValue[fieldName].toLowerCase();
    } else {
      fieldCurrent = currentValue.toLowerCase();
      fieldNext = nextValue.toLowerCase();
    }
    if (fieldCurrent > fieldNext) {
      return 1;
    }
    if (fieldCurrent < fieldNext) {
      return -1;
    }
    return 0;
  });

export const groupByLetter = (arrayForGroup = [], groupPropertyName = null) => {
  const groupsHolder = arrayForGroup.reduce((groupsAcc, item) => {
    const letter = groupPropertyName
      ? item[groupPropertyName].charAt(0).toLowerCase()
      : item.charAt(0).toLowerCase();
    if (!(letter in groupsAcc)) {
      groupsAcc[letter] = [];
    }
    groupsAcc[letter].push(item);
    return groupsAcc;
  }, {});
  return Object.keys(groupsHolder).map((key, index) => ({
    key,
    id: index,
    group: groupsHolder[key],
  }));
};
