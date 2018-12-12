export function find_in_object(my_object, my_criteria) {

  return my_object.filter(o => Object.keys(my_criteria)
  .every(k => my_criteria[k]
    .some(f => o[k] === f)));
  }
