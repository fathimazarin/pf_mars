var Distance = require('./distance.js')
var Util     = require('../core/Util.js')

class CellAttributes {
    constructor(f, g, h, i, j){
      this.g = g;
      this.f = f;
      this.h = h;
      this.parent_i = i
      this.parent_j = j
    }
}

// Astar has attributes:-
// htype = type of h distace to be cal
function AstarSearch(obj){
    // if there is choice between distance then h type = manhattan by default
    if(obj == undefined || obj.htype == undefined ){this.htype = Distance.manhattan}
    else{this.htype = obj.htype}
}

AstarSearch.prototype.minFscore = function(openList,cellDetails){
    minF=cellDetails[openList[0].x][openList[0].y].f
    index = 0
    for(var i=1; i<openList.length; i++){
        if(cellDetails[openList[i].x][openList[i].y].f < minF){
            minF=cellDetails[openList[i].x][openList[i].y].f
            index=i
        }//  if f value is same then choose wrt h value
    }//end for
    return index
}//end function

AstarSearch.prototype.successor = function(cellDetails, cell, parentNode, endNode, weight, closedList, grid, openList){
    htype = this.htype;
    if(cell.x == endNode.x && cell.y == endNode.y){
    cellDetails[cell.x][cell.y].parent_i = parentNode.x;
    cellDetails[cell.x][cell.y].parent_j = parentNode.y;
    return true;
    // break;
    }
// If the successor is already on the closed list or if it is blocked(the get neighbors fun takes care of it ie, does not return blocked neighbours), then ignore it. Else do the following
// && !grid.isBlock(cell.x, cell.y, block)
    else if (closedList[cell.x][cell.y] == false ) {
        gnew = cellDetails[parentNode.x][parentNode.y].g + weight;
        hnew = htype(cell.x, cell.y, endNode)
        fnew = gnew + hnew
        //

    // If the cell isn't in the oprn list or if it there and we have f cost less that the previous one then update it
        if(cellDetails[cell.x][cell.y].f == Number.MAX_VALUE || cellDetails[cell.x][cell.y].f > fnew){
            openList.push(cell);
            cell.opened = true;
            cellDetails[cell.x][cell.y].f = fnew;
            cellDetails[cell.x][cell.y].g = gnew;
            cellDetails[cell.x][cell.y].h = hnew;
            cellDetails[cell.x][cell.y].parent_i = parentNode.x;
            cellDetails[cell.x][cell.y].parent_j = parentNode.y;
            }
        }
    return false;
};

AstarSearch.prototype.findPath = function(startX, startY, endX, endY, grid){
// check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);
// check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}
    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    var openList = [];
    var foundDest = false;
    // making 2d array for closed list
    var values = grid.dimention();
    closedList=[];
    var i,j;
    for(i=0;i<values[0];++i){
      closedList.push([]);
      for(j=0;j<values[1];++j){
        closedList[i].push(false);
      }
    }
    // 2d array that holds details of cell
    let cellDetails = [];

    for(let i = 0; i < values[0]; i++) {
        for (let j = 0; j < values[1]; j++){
            cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
                new CellAttributes(Number.MAX_VALUE , Number.MAX_VALUE , Number.MAX_VALUE , -1, -1)
        ];
      }
  }
    // parameters of starting node
    cellDetails[sourceNode.x][sourceNode.y].f = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].g = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].h = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].parent_i = sourceNode.x;
    cellDetails[sourceNode.x][sourceNode.y].parent_j = sourceNode.y;

// // TODO: check if same node is being pushed (can it be pushed?)
    openList.push(sourceNode);
    sourceNode.opened = true;

    while(openList.length != 0){
        index=this.minFscore(openList, cellDetails)
        cell=openList[index]

        if(index>-1){openList.splice(index, 1)}
        closedList[cell.x][cell.y] = true;
        cell.closed = true;
        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell)
        // console.log(neighbours, weights)
        for (var i = 0; i < weights.length; i++) {
            foundDest = this.successor(cellDetails, neighbours[i], cell, endNode, weights[i], closedList, grid, openList)
            if(foundDest){break}
        }// end for loop
            if(foundDest){break}
            console.log(openList)
    } //end while loop

     if (foundDest == 0) {return 'not found'}
     else{
         // console.log(closedList)
         // console.log(cellDetails)
         return Util.backtrace(cellDetails, endNode)}
 };

module.exports = AstarSearch;
