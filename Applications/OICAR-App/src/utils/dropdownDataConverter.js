export const convert = (data, array) => {

  for (const index in data) { 
    array.push(
      {
        label: data[index].name,
        value: data[index].id
      }
    );
  }
};