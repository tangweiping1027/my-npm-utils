import '../lib'
const obj = function() {}
myNpmUtils(obj)
let vm = new obj()

let obj1 = {
  aaa: {}
}

let obj2 = vm.utils.clone(obj1)
obj2.aaa.bb = 123

console.log(obj1.aaa.bb)
