
;
(function () {

    var Node = function (options) {

        this.parent = options.parent;                             //当前的父节点
        this.childs = options.childs || [];                       //子数据信息
        this.data = options.data;                                 //当前的文本内容
        this.srcElement = options.srcElement;                     //当前的信息节点
        this.srcElement.treeNode = this;                          //当前的信息节点的属性又指回这个对象
    };

    Node.prototype = {
        constructor:Node,

        render:function(obj){
            var childs = obj.childs,
                currentNode = obj.currentNode;

            //插入当前的节点，如果没有子元素的话，则默认不显示图片
            if(childs.length===0){
                currentNode.getElementsByClassName('arrow')[0].className = "arrow arrow-empty";
            }

            //插入元素后对父元素的影响
            var currentNodeParent = currentNode.parentNode;
            while(hasClass(currentNodeParent,'childnode')){
                currentNodeParent.getElementsByClassName('arrow')[0].className = "arrow arrow-right";
                currentNodeParent = currentNodeParent.parentNode;
            }

        },

        deleteNode:function(){
            var data = this.data;
            var parentNode = this.parent.parentNode;
            parentNode.removeChild(this.parent);

            //todo delete删除不了this吗？
            //delete this;
            var label = parentNode.getElementsByClassName('label-node')[0];
            var treeNode = label.treeNode;
            var treeNodeChilds = treeNode.childs;
            for(var i= 0;i<treeNodeChilds.length;i++){
                if(treeNodeChilds[i].data===data){
                    treeNodeChilds.splice(i, 1);
                    i--;
                }
            }

            //如果子节点没了，父节点的样式要变化无箭头
            if(treeNode.isEmptyChilds()){
                treeNode.showEmpty();
            }


        },

        addChild:function(text){

            if(!text || text===""){
                return this;
            }

            this._addNode({
                parent:this.parent,
                data:text
            });

            //如果有子节点，则渲染有右箭头的样式
            if(!this.isEmptyChilds()){
                this.showDown();
            }

            //如果当前的节点处于展开状态的话,他的子节点显示
            if(this.isNodeLoaf()){
                this.childs[this.childs.length - 1].parent.className = "childnode";
            }

            return this;
        },


        /**
         * 插入真实节点
         * @param obj   传入的数据集合
         * @returns {Element}   返回当前的节点
         */
        _addNode:function(obj){
            var parent = obj.parent,
                text = obj.data;

            //创造对应的节点
            var childNode = document.createElement('div');
            childNode.className = "childnode";

            var label = document.createElement('label');
            label.className = "label-node";

            var arrow = document.createElement('div');
            arrow.className = "arrow arrow-empty";

            var span = document.createElement('span');
            span.className = "root-title";
            span.innerHTML = text;

            var img = document.createElement('img');
            img.src = "add.png";
            img.className = "img add";

            var deleteimg = document.createElement('img');
            deleteimg.src = "delete.png";
            deleteimg.className = "img delete";

            //插入对应的节点
            label.appendChild(arrow);
            label.appendChild(span);
            label.appendChild(img);
            label.appendChild(deleteimg);
            childNode.appendChild(label);
            parent.appendChild(childNode);

            //在根节点的数组信息中插入一个新的子节点数据信息
            this.childs.push(new Node({
                parent:childNode,
                data:text,
                childs:[],
                srcElement:label
            }));

        },

        //显示当前有子节点的样式
        showRight:function(){
            this.srcElement.getElementsByClassName('arrow')[0].className = "arrow arrow-right";
        },

        showDown:function(){
            this.srcElement.getElementsByClassName('arrow')[0].className = "arrow arrow-down";
        },

        showEmpty:function(){
            this.srcElement.getElementsByClassName('arrow')[0].className = "arrow arrow-empty";
        },

        /**
         * 当前的节点的是否有子节点
         * @returns {boolean} 没有返回true 否则反之
         */
        isEmptyChilds:function(){
            return this.childs.length === 0;
        },

        //当前的节点是否处于展开状态
        isNodeLoaf:function(){
            var arrow = this.srcElement.getElementsByClassName('arrow')[0];
            var flag = true;        //true为显示字节点 否则反之
            if(arrow.className==='arrow arrow-right'){
                flag = false;
            }else if(arrow.className==='arrow arrow-down'){
                flag = true;
            }
            return flag;
        },

        //来回切换隐藏或者显示
        toggle:function(){

            //切换箭头的转化样式
            var arrow = this.srcElement.getElementsByClassName('arrow')[0];

            //如果是空白箭头，则直接返回
            if(arrow.className==="arrow arrow-empty"){
                return this;
            }

            var flag = this.isNodeLoaf();   //当前的节点是否处于展开状态
            if(flag){
                arrow.className = 'arrow arrow-right';
            }else{
                arrow.className = 'arrow arrow-down';
            }

            for(var i= 0,j=this.childs.length;i<j;i++){
                this.childs[i].parent.className = flag?"childnode hide":"childnode";
            }

            return this;
        },

        //直接切换到显示状态
        toggleFloder:function(){
            //切换箭头的转化样式
            var arrow = this.srcElement.getElementsByClassName('arrow')[0];
            arrow.className = 'arrow arrow-down';
            for(var i= 0,j=this.childs.length;i<j;i++){
                this.childs[i].parent.className = "childnode";
            }

            return this;
        }


    };


    window['Node'] = Node;
})();


var node = new Node({
    parent:document.getElementById('root'),
    data:"前端技能大汇总",
    childs:[],
    srcElement:document.getElementsByClassName('label-node')[0]
});

//添加节点
node.addChild('编程语言').addChild('构建工具').addChild('谈笑风生');
node.childs[0].addChild('javascript').addChild('nodeJs').addChild('php').toggle();
node.childs[1].addChild('gulp').addChild('grunt').addChild('webpack').toggle();
node.childs[2].addChild('粉丝').addChild('沟里').addChild('长者').toggle();

//绑定事件
handleEvent(document.getElementById('root'), 'click', function (e) {
    var target = e.target || e.srcElement,
        targetClassName = target.className;

    var parent = target.parentNode;

    if(targetClassName.indexOf('root-title')>-1||targetClassName.indexOf('arrow')>-1){  //是否显示字节点
        parent.treeNode.toggle();
    }else if(targetClassName.indexOf('add')>-1){    //增加子节点
        parent.treeNode.addChild(prompt('请输入节点的名称：'));
    }else if(targetClassName.indexOf('delete')>-1){
        parent.treeNode.deleteNode();
    }


});


//绑定搜索事件
handleEvent(document.getElementById('search'), 'click', function (e) {
    var input = document.getElementById('text'),
        text = input.value;

    var searchArry = [];        //搜的的列表对象数组
    var tempArry = [node];

    var obj;
    var saveArry = [];
    //广度优先搜索
    while(tempArry.length>0){

        saveArry = [];
        for(var i= 0;i<tempArry.length;i++){
            obj = tempArry[i];
            if(obj.data===text)searchArry.push(obj);
            saveArry = saveArry.concat(obj.childs);
            tempArry.splice(i, 1);
            i--;
        }

        if(saveArry.length){
            for(var i= 0,j=saveArry.length;i<j;i++){
                tempArry.push(saveArry[i]);
            }
        }
    }

    if(searchArry.length){
        var parent,
            Node,
            labelNode;
        for(var i= 0,j=searchArry.length;i<j;i++){
            Node = searchArry[i];
            parent = Node.parent.parentNode;
            while(parent){
                labelNode = parent.getElementsByClassName("label-node")[0];
                labelNode.treeNode.toggleFloder();
                parent = parent.parentNode;
            }
        }
    }


});