var Distance = require('./distance.js')
var Util     = require('../core/Util.js')


class CellAttributes {
    constructor(f, g, h, i, j, a){
      this.g = g;
      this.f = f;
      this.h = h;
      this.parent_i = i;
      this.parent_j = j;
      this.visitedBy = a; // a is 1 for sourcenode n 2 for end node
    }
}

// Astar has attributes:-
// htype = type of h distace to be cal
function AstarSearchBi(obj){
    // if there is choice between distance then h type = manhattan by default
    if(obj == undefined || obj.htype == undefined ){this.htype = Distance.manhattan}
    else{this.htype = obj.htype}
}

AstarSearchBi.prototype.minFscore = function(openList,cellDetails){
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

AstarSearchBi.prototype.successor = function(cellDetails, cell, parentNode, targetNode, weight, closedList, grid, openList, endNode){
    htype = this.htype;
    if(targetNode.x == endNode.x && targetNode.y == endNode.y){visitedvia = 2; target_source = 1;}
    else{visitedvia = 1; target_source = 2;}

    if(cellDetails[cell.x][cell.y].visitedBy == target_source){return true}
// If the successor is already on the closed list or if it is blocked(the get neighbors fun takes care of it ie, does not return blocked neighbours), then ignore it. Else do the following
    else if (closedList[cell.x][cell.y] == false ) {
        gnew = cellDetails[parentNode.x][parentNode.y].g + weight;
        hnew = htype(cell.x, cell.y, targetNode)
        fnew = gnew + hnew
        //

    // If the cell isn't in the oprn list or if it there and we have f cost less that the previous one then update it
        if(cellDetails[cell.x][cell.y].f == Number.MAX_VALUE || cellDetails[cell.x][cell.y].f > fnew){
            openList.push(cell);
            cell.opened = true;
            cellDetails[cell.x][cell.y].f = fnew;
            cellDetails[cell.x][cell.y].g = gnew;
            cellDetails[cell.x][cell.y].h = hnew;
            cellDetails[cell.x][cell.y].visitedBy = visitedvia;
            cellDetails[cell.x][cell.y].parent_i = parentNode.x;
            cellDetails[cell.x][cell.y].parent_j = parentNode.y;
            }
        }
    return false;
};

AstarSearchBi.prototype.findPath = function(startX, startY, endX, endY, grid){
// check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);
// check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}
    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    var openListstart = [];
    var openListend  = [];
    var foundDest = false;

    var values = grid.dimention();
    // making 2d array for closed list
    closedList=[];
    var i,j;
    for(i=0;i<values[1];++i){
        closedList.push([]);
        for(j=0;j<values[0];++j){
            closedList[i].push(false);
        }
    }
    // 2d array that holds details of cell
    let cellDetails = [];

    for(let i = 0; i < values[1]; i++) {
        for (let j = 0; j < values[0]; j++){
            cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
                new CellAttributes(Number.MAX_VALUE , Number.MAX_VALUE , Number.MAX_VALUE , -1, -1)
        ];
      }
  }
    // parameters of starting node
    cellDetails[sourceNode.x][sourceNode.y].f = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].g = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].h = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].visitedBy = 1;
    cellDetails[sourceNode.x][sourceNode.y].parent_i = sourceNode.x;
    cellDetails[sourceNode.x][sourceNode.y].parent_j = sourceNode.y;

// // TODO: check if same node is being pushed (can it be pushed?)
    openListstart.push(sourceNode);
    sourceNode.opened = true;

    // parameters of starting node
    cellDetails[endNode.x][endNode.y].f = 0.0;
    cellDetails[endNode.x][endNode.y].g = 0.0;
    cellDetails[endNode.x][endNode.y].h = 0.0;
    cellDetails[endNode.x][endNode.y].visitedBy = 2;
    cellDetails[endNode.x][endNode.y].parent_i = endNode.x;
    cellDetails[endNode.x][endNode.y].parent_j = endNode.y;

// // TODO: check if same node is being pushed (can it be pushed?)
    openListend.push(endNode);
    endNode.opened = true;

    while(openListstart.length != 0  && openListend.length != 0){
        //for list from start
        index=this.minFscore(openListstart, cellDetails)
        cell=openListstart[index]

        if(index>-1){openListstart.splice(index, 1)}
        closedList[cell.x][cell.y] = true;
        cell.closed = true;
        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell)
        // console.log(neighbours, weights)
        for (var i = 0; i < weights.length; i++) {
            // cellDetails[neighbours[i].x][neighbours[i].y].visitedBy = 1;
            foundDest = this.successor(cellDetails, neighbours[i], cell, endNode, weights[i], closedList, grid, openListstart, endNode)
            if(foundDest){return Util.backtracebi(cellDetails, sourceNode, endNode);}
            }// end for loop
            // if(foundDest){break}
            // console.log(openList)

        index=this.minFscore(openListend, cellDetails)
        cell=openListend[index]

        if(index>-1){openListend.splice(index, 1)}
        closedList[cell.x][cell.y] = true;
        cell.closed = true;
        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell)
        // console.log(neighbours, weights)
        for (var i = 0; i < weights.length; i++) {
            // cellDetails[neighbours[i].x][neighbours[i].y].visitedBy = 2;
            foundDest = this.successor(cellDetails, neighbours[i], cell, sourceNode, weights[i], closedList, grid, openListend, endNode)
            if(foundDest){{return Util.backtracebi(cellDetails, sourceNode, endNode);}}
        }// end for loop

    } //end while loop

     if (foundDest == 0) {return 'not found'}
     else{
         // console.log(closedList)
         // console.log(cellDetails)
         return Util.backtracebi(cellDetails, sourceNode, endNode);}
 };

module.exports = AstarSearchBi;