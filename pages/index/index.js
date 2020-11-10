let Board = require("./board.js");

let app = getApp();

let config = {
  data: {
    // board: new Object(),
    hideLoading: true,
    overMsg: '游戏结束',
    over: false,
    score: 0,
    grids: []
  },
  onLoad: function () {
  },
  onReady: function () {
    this.gameStart()
  },
  onShow: function () {
    // 页面展示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  gameOver: function () {  // 游戏结束
    this.setData({
      over: true
    });
    if (this.data.score >= 2048) {
      this.setData({
        overMsg: '恭喜达到2048！'
      });
      // wx.setStorageSync('highScore', this.data.score);
    } else if (this.data.score > this.data.bestScore) {
      this.setData({
        overMsg: '创造新纪录！'
      });
      // wx.setStorageSync('highScore', this.data.score);
    } else {
      this.setData({
        overMsg: '游戏结束！'
      });
    }
  },
  gameStart: function () {  // 游戏开始
    let board = new Board(4)
    for (let i = 0; i < 2; i++) {
      board.randFillGrid()
    }
    // board.testFullGrid()
    this.setData({
      board: board,
      grids: board.grid,
      hideLoading: true,
    })

  },
  restart: function () {
    this.gameStart();
    this.setData({
      over: false,
      score: 0
    })
  },
  // 触摸
  touchStartX: 0,
  touchStartY: 0,
  touchEndX: 0,
  touchEndY: 0,
  touchStart: function (ev) { // 触摸开始坐标
    let touch = ev.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;

  },
  touchMove: function (ev) { // 触摸最后移动时的坐标
    let touch = ev.touches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;
  },
  touchEnd: function () {
    let disX = this.touchStartX - this.touchEndX;
    let absdisX = Math.abs(disX);
    let disY = this.touchStartY - this.touchEndY;
    let absdisY = Math.abs(disY);

    if (this.data.score >=2048) {
      this.gameOver();
      return
    }

    if (this.data.board.isOver()) { // 游戏是否结束
      this.gameOver();
    } else {
      if (Math.max(absdisX, absdisY) > 10) { // 确定是否在滑动
        // this.setData({
        //   start: "重新开始",
        // });
        let direction = absdisX > absdisY ? (disX < 0 ? "l" : "j") : (disY < 0 ? "k" : "i");  // 确定移动方向
        switch (direction) {
          case "j": // 左移
            console.log("direction is 左移")
            break;
          case "l": // 右移
            console.log("direction is 右移")
            break;
          case "i": // 上移
            console.log("direction is 上移")
            break;
          case "k": // 下移
            console.log("direction is 下移")
            break;
        }


        let data = this.data.board.move(direction);

        console.log("after move data", JSON.stringify(data))

        this.updateView(data);
      }
    }
  },
  updateView(data) {
    var max = 0;
    for (var i = 0; i < this.data.board.size; i++)
      for (var j = 0; j < this.data.board.size; j++)
        if (data[i][j] != 0 && data[i][j] > max) {
          max = data[i][j];
        }

    this.setData({
      grids: data,
      score: max
    });
  },
};

Page(config);