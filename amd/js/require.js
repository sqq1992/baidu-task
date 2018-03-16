

;(function () {
    
    var moduleCache = {};

    /**
     * main
     * @param arry
     * @param callBack
     */
    var require = function (arry,callBack) {

        var dependentCe = 0;
        var moduleName = document.currentScript && document.currentScript.id || 'noName';
        var cacheParams = [];
        
        if(arry.length){        //only having dependences

            for(var i=0,j=arry.length;i<j;i++){


                dependentCe++

                ;(function (modules) {


                    loadModules(modules,function (params) {

                        dependentCe--;
                        cacheParams.push(params);
                        
                        if(dependentCe==0){
                            callBack && callBack.apply(null, cacheParams);
                        }
                        
                    })


                })(arry[i])


            }
            
            
        }else {         //not having dependence

            saveModule(moduleName,null,callBack)

        }

    }

    require.config = {};


    /**
     * only give js not having dependence to run and then give back params
     * @param moduleName
     * @param params
     * @param callBack
     */
    var saveModule = function (moduleName,params,callBack) {


        if(moduleCache[moduleName]){
            var fn
            var mod = moduleCache[moduleName];
            var exportParmas = (callBack && callBack()) || null;
            mod.status = "loaded";
            mod.export = exportParmas;

            while (fn = mod.onload.shift()){
                fn && fn.call(null, exportParmas);
            }


        }else {

            callBack && callBack.apply(null, params);

        }


    }

    /**
     * only make js of having dependence run after js denpendent runing
     * @param moduleName
     * @param callBack
     */
    var loadModules = function (moduleName, callBack) {


        if (moduleCache[moduleName]) {
            
            moduleCache[moduleName].onload.push(callBack);

        } else {

            moduleCache[moduleName] = {
                status:'loading',
                export:null,
                onload:[callBack]
            }

            var script = document.createElement('script');
            script.id = moduleName;
            script.async = true;
            script.type = "text/javascript";
            script.src = getUrl(moduleName);


            var _script = document.getElementsByTagName('script')[0];
            _script.parentNode.insertBefore(script, _script);

        }

    };

    var getUrl = function (name) {
        var loadConfig = require.config;
        var url = '';
        var initUrl = window.location.origin;

        url =initUrl+ loadConfig.baseUrl;
        url += loadConfig.moudles[name];

        if(url.indexOf('.js')==-1)url += ".js";

        return url;

    }


    window.require = require;
    window.define = require;


})()