export default function DemoTest() {
  const list = [
    {name: 'a', age: 1},
    {name: 'a', age: 2},
    {name: 'a', age: 3},
  ];
  console.log(list.find(item => item.age === 2));
}
