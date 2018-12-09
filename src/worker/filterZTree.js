self.addEventListener('message', function (e) {
  let showNodes = e.data;
  console.log(showNodes);
  let nodes = [];
  for(let i = 0,len = showNodes.length; i < len ; i++) {
    let pathOfOne = showNodes[i].getPath();
    for(let j = 0,len = pathOfOne.length; j < len; j++) {
      nodes.push(pathOfOne[j]);
    }
  }
  self.postMessage(nodes);
  self.close();
}, false);
