function starOutGrid(grid) {
    console.log(grid)
    // Shows entire array of arrays

    let starCoords = [];
    
    for(let i=0; i<grid.length; i++){
        let currentArrLength = grid[i].length;
        for(let j=0; j<currentArrLength; j++){
            if(grid[i][j] === '*'){
                starCoords.push([i,j]);                      
            }
        }
    }

    /* This loop below runs through any coordinate pairs we find in the original grid.
    /  This allows the algorithm to be expanded into non square arrays and arrays of non standard sizes
    /  Works as follows.  We check whether the coordinate pair is located at within the grid, and then we determin where in relation to the bounds
    /  of the grid we are at.  Based on wether we are at the edge or middle, we proceed to convert the other values in the array into '*' values
    /  Current limitations is non standard size arrays, as it will create a new addition into the array, future update removes this edge case
    */
    for(let item of starCoords){
        x = item[0];
        y = item[1];

        console.log(x,y)

        if(grid[x-1] < 0){
            console.log('IM HERE');
            for(let i = x; i > 0; i--){
                grid[x-i][y] = '*';
            }
            if(grid[x][y-1] < 0){
                for(let j=y; j<grid[y].length; j++){
                    grid[x][y+j] = '*';
                }
            }
            else if(grid[x][y+1] > grid[x].length){
                for(let j=y; j > 0; j--){
                    grid[x][y-j] = '*';
                }
            }
            else{
                for(let j=0; j<grid[y].length; j++){
                    grid[x][j] = '*';
                }
            }
        }
        else if(grid[x+1] > grid.length){
            console.log('IM HERE');
            for(let i = 0; i < grid.length; i++){
                grid[x+i][y] = '*';
            }
            if(grid[x][y+1] > grid[x].length){
                for(let j=y; j>0; j--){
                    grid[x][y-j] = '*';
                }
            }
            else if(grid[x][y-1] < 0){
                for(let j=y; j<grid[y].length; j++){
                    grid[x][y+j] = '*';
                }
            }
            else{
                for(let j=0; j<grid[y].length; j++){
                    grid[x][j] = '*';
                }
            }
        }
        else{
            console.log('IM HERE');
            for(let i = 0; i < grid.length; i++){
                grid[i][y] = '*';
            }
            if(grid[x][y+1] > grid[x].length){
                for(let j=y; j>0; j--){
                    grid[x][y-j] = '*';
                }
            }
            else if(grid[x][y-1] < 0){
                for(let j=y; j<grid[y].length; j++){
                    grid[x][y+j] = '*';
                }
            }
            else{
                for(let j=0; j<grid[y].length; j++){
                    grid[x][j] = '*';
                }
            }
        }
    }

    return grid
}