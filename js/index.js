var maxIndex = 15; //最大图片索引值
var curIndex = 0; //当前索引
var isOver = false; //游戏是否结束

// 获取dom
var imgWrap = document.querySelector('.img-area'); //磨盘
var img = imgWrap.querySelector('img:first-child'); //磨盘圆心
var imgShow = imgWrap.querySelector('img:last-child'); //显示图片
var rightWrap = document.querySelector('.right-area'); //右边区域

//产生一个随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//初始化
function init() {
    //创建100张图
    createDivs();
}
init()

//创建100个div
function createDivs() {
    curIndex = getRandom(0, 15); //当前索引，用于后面9的倍数都渲染这张图
    rightWrap.innerHTML = '';
    for (var i = 0; i < 100; i++) {
        var imgIndex = null; //用于存储图片索引
        if (i % 9 === 0) { //如果当前索引是9的倍数
          imgIndex = curIndex;
        } else {
          imgIndex = getRandom(0,maxIndex);
        }
      rightWrap.innerHTML += `
        <div class="item">
            <span>${i}</span>
            <img src="./images/values/${imgIndex}.png" alt="">
        </div>
      `
    }
}


//转盘转动事件
imgWrap.onclick = function (e) {
    console.log(e.currentTarget);
    if (isOver) {
        //如果游戏结束，询问是否再玩一次
        myPlugin.openConfirm({
            title: '重要提示',
            cancelText: '取消',
            confirmText: '确定',
            content: '游戏结束，要再玩一次吗？',
            confirmClass: 'confirm',
            cancelClass: 'cancel',
            oncancel:function(){
                isOver = true;
            },
            onconfirm: function(){
                init(); //重新初始化右边图案
                img.style.opacity = 1; // 把魔盘中心显示出来
                imgShow.style.opacity = 0; // 将结果图片隐藏掉
                isOver = false; //改变游戏状态
                imgWrap.setAttribute('style','')
                imgWrap.removeEventListener('transitionend',handle)
            },
        
        })
    }else{
        //旋转磨盘
        e.currentTarget.style.transition = 'all 2s';
        e.currentTarget.style.transform = 'rotate(1800deg)';
        //为磨盘绑定transitionend事件
        imgWrap.addEventListener('transitionend',handle)
    }
}

//动画结束的回调
function handle(){
    img.style.opacity = 0; //隐藏磨盘中心
    imgShow.src = `./images/values/${curIndex}.png`; //改变显示图片
    imgShow.style.opacity = 1; //显示图片
    isOver = true; //游戏结束
}