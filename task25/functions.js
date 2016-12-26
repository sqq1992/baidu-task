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