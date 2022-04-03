function str(any) {
  if(typeof any === "string") return any;
  else return any.join("\n");
}
function td(el){
  return `<td>${el}</td>`
}
function th(el){
  return `<th>${el}</th>`
}
function tr(str) {
  return `<tr> ${str} </tr>`
}

function __labels(list) {
  return `${tr( str( list.map(th) ) )}`
}
function __data(list){
  return `${tr( str( list.map(td) ) )}`
}
function table(d,h){
  return `
  <table class="pure-table pure-table-striped">
    ${ h && h.length ? "<thead>"+__labels(h)+"</thead>" : "" }
    <tbody>
      ${str(d.map(__data))}
    </tbody>
  </table>
  `
}
