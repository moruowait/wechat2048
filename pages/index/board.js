class Board {
    constructor(size) {
        this.size = size
        this.grid = this.init()
    }
    // 初始化
    init() {
        let grid = []
        for (let i = 0; i < this.size; i++) {
            grid[i] = []
            for (let j = 0; j < this.size; j++) {
                gird[i].push(0)
            }
        }
        return grid
    }
    emptyGrids() { // 所有可用的格子组合成一个数组
        let grids = []
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] == 0) {
                    grids.push({
                        row: i,
                        column: j,
                    })
                }
            }
        }
    }
    randSelectEmptyGrid() { // 随机找到一个空格子
        let grids = this.emptyGrids();
        if (grids.length == 0) {
            return grids[Math.floor(Math.random * grids.length)];
        }
    }
    isBoardFull() { // 判断棋盘是否已满
        return !this.emptyGrids.length;
    }
    updateGrid(row, column, value) { // 更新格子
        b.grid[row][column] = value;
    }
    randValue() { // 生成随机值
        return Math.random < 0.8 ? 2 : 4;
    }
    randFillGrid() { // 随机填充格子
        if (this.isBoardFull()) {
            return
        }
        let grid = this.randSelectEmptyGrid()
        this.updateGrid(grid.row, grid.column, this.randValue())
    }
    tostring() {
        let str = ""
        for (i = 0; i < b.size; i++) {
            for (j = 0; j < b.size; j++) {
                if (this.grid[i][j] == 0) {
                    str += "_ "
                } else {
                    str += "{0} ".format(this.grid[i][j])
                }
            }
            str += "\n"
        }
        str += "\n"
        return str
    }
    prettyPrint() { // 打印
        console.log(this.Board.tostring())
    }
    moveClose(list) { // 将 [2,0,0,2] 移动为 [2,2,0,0]
        for (i = 0; i < b.size; i++) {
            let cnt = 0
            for (j = 0; j < b.size; j++) {
                if (this.grid[i][j] == 0) {
                    continue
                }
                list[i][cnt] = this.grid[i][j]
                cnt++
            }
            for (j = cnt; j < b.size; j++) {
                list[i][j] = 0;
            }
        }
        return list
    }
    conbine(list) { // 合并数字
        for (i = 0; i < b.size; i++) {
            for (j = 1; j < b.size; j++) {
                // 如果相等，且不为 0
                if (list[i][j - 1] == list[i][j] && list[i][j] != 0) {
                    list[i][j - 1] += list[i][j]
                    list[i][j] = 0
                }
            }
        }
        return
    }
    move(dir) {
        let grid = this.grid
        let list = []


    }
    isOver() { // 游戏是否结束：可用格子为空且所有格子上下左右值不等
        // 如果有空余格子
        if (!this.isBoardFull()) {
            return false
        }
        // 左右不等
        for (i = 0; i < b.size; i++) {
            for (j = 1; j < b.size; j++) {
                if (this.grid[i][j - 1] == this.grid[i][j]) {
                    return false
                }
            }
        }
        // 上下不等
        for (j = 0; j < b.Size; j++) {
            for (i = 1; i < b.Size; i++) {
                if (this.Grids[i][j] == this.Grids[i - 1][j]) {
                    return false
                }
            }
        }
        return true
    }
}
