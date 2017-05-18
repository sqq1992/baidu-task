function hasClass(node,className){
    var regExp = new RegExp('(\s*|^)' + className + '($|\s*)');
    if(regExp.test(node.className)){
        return true;
    }else{
        return false;
    }
}


function addClass(node,clasName){
    if(hasClass(node,clasName)){

    }else{
        node.className += ' '+clasName;
    }

}

function delClass(node,claName){
    if(hasClass(node,claName)){
        var regExp = new RegExp('(\s*|^)' + claName + '($|\s*)');
        node.className= node.className.replace(regExp, '');
    }
}

/**
 * 多浏览器绑定事件
 * @param dom   传入的dom
 * @param event 事件类型
 * @param fn    回调函数
 */
function handleEvent(dom,event,fn){
    if(dom.addEventListener){
        dom.addEventListener(event, fn, false);
    }else if(dom.attachEvent){
        dom.attachEvent('on' + event, fn);
    }else{
        dom['on' + event] = fn;
    }

}