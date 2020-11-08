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
                grid[i].push(0)
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
        return grids
    }
    randSelectEmptyGrid() { // 随机找到一个空格子
        let grids = this.emptyGrids();
        if (grids.length == 0) {
            return
        }
        return grids[Math.floor(Math.random() * grids.length)];
    }
    isBoardFull() { // 判断棋盘是否已满
        return !this.emptyGrids().length;
    }
    updateGrid(row, column, value) { // 更新格子
        this.grid[row][column] = value;
    }
    randValue() { // 生成随机值
        return Math.random() < 0.8 ? 2 : 4;
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
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] == 0) {
                    str += "_ "
                } else {
                    str += this.grid[i][j] + " "
                }
            }
            str += "\n"
        }
        str += "\n"
        return str
    }
    prettyPrint() { // 打印
        console.log(this.tostring())
    }
    moveClose(list) { // 将 [2,0,0,2] 移动为 [2,2,0,0]
        var cnt = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i] != 0) {
                list[cnt++] = list[i];
            }
        }
        for (let i = cnt; i < list.length; i++) {
            list[i] = 0;
        }
        return list
    }
    combine(list) { // 合并数字
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size - 1; j++) {
                // // 如果相等，且不为 0
                if (list[i][j + 1] == list[i][j] && list[i][j] != 0) {
                    list[i][j] = list[i][j] + list[i][j + 1]
                    list[i][j + 1] = 0
                }
            }
        }
        return list
    }
    different(list) {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (list[i][j] != this.grid[i][j]) {
                    return true
                }
            }
        }
        return false
    }
    move(dir) {
        var grid = [[], [], [], []]
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                grid[i][j] = this.grid[i][j]
            }
        }

        var list = [[], [], [], []]

        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                switch (dir) {
                    case "j": // 左移
                        list[i].push(this.grid[i][j])
                        break;
                    case "l": // 右移
                        list[i].push(this.grid[i][this.size - j - 1])
                        break;
                    case "i": // 上移
                        list[j].push(this.grid[i][j])
                        break;
                    case "k": // 下移
                        list[j].push(this.grid[this.size - i - 1][j])
                        break;
                }
            }
        }

        for (var i = 0; i < list.length; i++)  // 数字靠边
            list[i] = this.moveClose(list[i]);

        this.combine(list)

        for (var i = 0; i < list.length; i++)  // 再次数字靠边
            list[i] = this.moveClose(list[i]);

        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                switch (dir) {
                    case "j": // 左移
                        this.grid[i][j] = list[i][j]
                        break;
                    case "l": // 右移
                        this.grid[i][this.size - j - 1] = list[i][j]
                        break;
                    case "i": // 上移
                        this.grid[i][j] = list[j][i]
                        break;
                    case "k": // 下移
                        this.grid[this.size - i - 1][j] = list[j][i]
                        break;
                }
            }
        }
        // 如果移动完没有变化，则不添加随机值
        if (this.different(grid)) {
            // 重新添加一个随机值
            this.randFillGrid()
        }
        // 打印
        this.prettyPrint()
        return this.grid
    }
}

module.exports = Board;