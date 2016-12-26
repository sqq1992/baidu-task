
;
(function () {

    var Node = function (options) {

        this.parentNode = options.parentNode;
        this.allData = [];      //总数据信息

        //当前寻找到的对象数据信息
        this.currentFindArry = [];

        //插入数据信息
        this._addChild(this.allData, options);

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

        addChild:function(obj){
            var current;
            for(var i= 0,j=this.currentFindArry.length;i<j;i++){
                current = this.currentFindArry[i];

                this._addChild(current.childs,{
                    parentNode:current.element,
                    data:obj.data
                })
            }
        },

        /**
         * 插入对应的节点
         * @param dataContainer 当前包裹的数据
         * @param obj           当前插入的数据信息
         */
        _addChild:function(dataContainer,obj){
            var newObj = {};
            newObj.data = obj.data; //这个节点的名称
            newObj.childs = [];     //存放子节点数据的容器
            newObj.parentNode = obj.parentNode; //它的父节点

            //插入节点信息,并且返回对应的信息节点
            var element = this.addNode(obj);

            newObj.element = element;       //当前的信息节点
            dataContainer.push(newObj);

            //对当前的节点进行渲染样式,根据数据
            this.render({
                childs: newObj.childs,
                currentNode: element
            });

        },

        /**
         * 插入真实节点
         * @param obj   传入的数据集合
         * @returns {Element}   返回当前的节点
         */
        addNode:function(obj){
            var parentNode = obj.parentNode,
                text = obj.data;

            //创造对应的节点
            var childNode = document.createElement('div');
            childNode.className = "childnode";

            var label = document.createElement('label');
            label.className = "label-node";

            var arrow = document.createElement('div');
            arrow.className = "arrow arrow-down";

            var span = document.createElement('span');
            span.className = "root-title";
            span.innerHTML = text;

            var img = document.createElement('img');
            img.src = "add.png";
            img.className = "img add";

            //插入对应的节点
            label.appendChild(arrow);
            label.appendChild(span);
            label.appendChild(img);
            childNode.appendChild(label);
            parentNode.appendChild(childNode);

            return childNode;
        },

        findObjText:function(text){
            this.currentFindArry = [];
            var queryArry = this.allData.slice(0),
                queryObj;

            //广度优先搜索
            while(queryArry.length>0){

                queryObj = queryArry.shift();

                //如果查找的数据在数组里有的话，则添加到搜索数组里
                if(text==queryObj.data)this.currentFindArry.push(queryObj);

                for(var i= 0,j=queryObj.childs.length;i<j;i++){
                    queryArry.push(queryObj.childs[i]);
                }
            }

            return this;
        },


    };


    window['Node'] = Node;
})();


var node = new Node({
    parentNode:document.getElementById('root'),
    data:"前端技能大汇总"
});
node.findObjText('前端技能大汇总').addChild({
    data:"编程语言"
});
node.findObjText('编程语言').addChild({
    data:"javascript"
});

