export function find_in_object(my_object, my_criteria) {

  return my_object.filter(o => Object.keys(my_criteria)
  .every(k => my_criteria[k]
    .some(f => o[k] === f)));
  }

export function update_criteria(criteria, criteria_list){
  if(criteria === "Clear"){
    criteria_list = [];
  }
  else if(criteria_list.includes(criteria)){
    criteria_list = criteria_list.filter( item => item !== criteria);
  }
  else{
    criteria_list.push(criteria);
  }
  return criteria_list;
}
