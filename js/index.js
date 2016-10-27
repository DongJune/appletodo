var app=angular.module("list",[])
app.controller("mainCtrl",["$scope",function($scope){
    $scope.as=[{id:1,title:"新建1",color:"round1",todos:[{id:1,title:"332",state:1},{id:2,title:"332",state:1},{id:3,title:"332",state:0},{id:4,title:"332",state:0}]},
        {id:2,title:"新建2",color:"round2",todos:[{id:1,title:"332",state:0},{id:2,title:"332",state:1},{id:3,title:"332",state:0},{id:4,title:"332",state:0}]},
        {id:3,title:"新建3",color:"round3",todos:[{id:1,title:"332",state:0},{id:2,title:"332",state:0},{id:3,title:"332",state:0},{id:4,title:"332",state:1}]}]
    $scope.color=["round1","round2","round3","round4","round5","round6","round7"]
    $scope.cir=["circle0","circle1","circle2","circle3","circle4","circle5","circle6"]
    $scope.colors=["ci-font0","ci-font1","ci-font2","ci-font3","ci-font4","ci-font5","ci-font6"]
    $scope.bgcolor=["bgcolor1","bgcolor2","bgcolor3","bgcolor4","bgcolor5","bgcolor6","bgcolor7"]
    $scope.add=function () {
      var max=-Infinity
        $scope.as.forEach(function(v,i){
            if(max<v.id){
                max=v.id
            }
        })
            var item={
                    id:max+1,
                    title:"新建"+($scope.as.length+1),
                    color:$scope.color[$scope.as.length%7],
                todos:[]
                }
        $scope.as.push(item)
        $scope.current=item
        $scope.rounds=$scope.current.color
        var is=0
        $scope.num=0;
        $scope.color.forEach(function (v,i) {
            if(v== $scope.current.color){
                is=i
            }
        })
        $scope.rounds=$scope.current.color
        $scope.rounds1=$scope.colors[is]
        $scope.rounds2=$scope.cir[is]
        $scope.rounds3=$scope.bgcolor[is]
    }
    $scope.current=$scope.as[0]
    $scope.rounds3=$scope.bgcolor[0]
    $scope.rounds=$scope.current.color
    $scope.num=0
    $scope.addcurrent=function (v) {
        $scope.current= v
        var is=0
        $scope.color.forEach(function (v,i) {
            if(v== $scope.current.color){
                is=i
            }
        })
        $scope.rounds=$scope.current.color
        $scope.rounds1=$scope.colors[is]
        $scope.rounds2=$scope.cir[is]
        // $scope.rounds3=$scope.bgcolor[is]
        $scope.num=0
        $scope.current.todos.forEach(function (v,i) {
            if(v.state==1){
                $scope.num=$scope.num+1
            }
        })
    }
    $scope.delete=function(id){
        $scope.current.todos = $scope.current.todos.filter(function (v,i) {
            if(v.state==1&& id===v.id){
                $scope.num=$scope.num-1
            }
            return id!==v.id
        })
    }
    $scope.xiaoshi=function (id,title) {
        // if($scope.current.id)
        if(title==""){
            $scope.current.todos=$scope.current.todos.filter(function (v,i) {
                if(v.state==1&&id==v.id){
                    $scope.num=$scope.num-1
                }
                return id !==v.id
            })

        }
    }
    $scope.num=0
    $scope.current.todos.forEach(function (v,i) {
        if(v.state==1){
            $scope.num=$scope.num+1
        }
    })
    $scope.nums=function () {
        $scope.num=$scope.num-1
    }
    $scope.nums1=function () {
        $scope.num=$scope.num+1
    }
    $scope.it=0
}])
app.directive("colorBox",[function () {
    return {
        restrict: 'AE',
        transclude: true,
        template: '<div><div ng-transclude></div></div>',
        replace: true,
        link:function (scope,el) {
            $(".color-box").on("click",false)
            $(el).on("click",".quan",function () {
                var id1=$(this).attr("data-col")
                var is=0
    scope.color.forEach(function (v,i) {
        if(v==id1){
            is=i
        }

        $(".quan1 .rounds").removeClass(v)
    })
                scope.cir.forEach(function (v,i) {
                 $(".quan").removeClass(v)
                    $(".quan1").removeClass(v)

                })
                scope.colors.forEach(function (v,i) {
                    $(".font-style").removeClass(v)
                    $(".title").removeClass(v)
                    $(".ko").removeClass(v)
                })
                $(this).addClass(scope.cir[is])
                $(".title").addClass(scope.colors[is])
                $(".font-style").addClass(scope.colors[is])
                $(".ko").addClass(scope.colors[is])
                $(".quan1").addClass(scope.cir[is])
                $(".quan1 .rounds").addClass(scope.color[is])
                scope.rounds=scope.color[is]
                scope.rounds1=scope.colors[is]
                scope.rounds2=scope.cir[is]
                scope.rounds3=scope.bgcolor[is]
                scope.$apply(function(){scope.current.color=scope.color[is]})
                scope.bgcolor.forEach(function (v,i) {
                    if($(".bgs1").hasClass(v)){
                        $(".bgs1").eq(scope.it).removeClass(v).addClass(scope.rounds3)
                    }

                })
            })
            $("#btn3").on("click",function () {
                var ss=0;
                scope.as.forEach(function (v,i) {
                    if(v==scope.current){
                        ss=i
                    }
                })
                // scope.rounds=scope.color[ss+1]
                scope.rounds1=scope.colors[ss+1]
                // scope.rounds2=scope.cir[ss+1]
                // scope.rounds3=scope.bgcolor[ss+1]
                scope.$apply(function(){scope.as.splice(ss,1)
                scope.current=scope.as[ss]
                })
                scope.num=0;
             scope.current.todos.forEach(function (v,i) {
                 if(v.state==1){
                     scope.num=scope.num+1
                 }
                })
            })
        }
    }
}])
app.directive("listDiv",[function () {
    return{
        restrict:'AE',
        transclude:true,
        template:'<ul><div ng-transclude></div></ul>',
        replace:true,
        link:function (scope,el) {
            $(el).on("mousedown",".lis",false)
            var ids
            $(el).on("dblclick",".lis",function () {
                $(this).addClass("lis1")
                $(this).find("input").focus()
                ids=parseInt($(this).attr("data-id"))
                $(this).find("input").val( $(this).find("input").val())
            })
            $(el).on("click",".lis",function () {
                $(".lis").removeClass("bgs lis1")
                $(this).addClass("bgs")
                var is=0
                scope.color.forEach(function (v,i) {
                    if(v==scope.current.color){
                        is=i
                    }
                    $(".quan1 .rounds").removeClass(v)
                })
                scope.cir.forEach(function (v,i) {
                    $(".quan").removeClass(v)
                    $(".quan1").removeClass(v)

                })
                scope.colors.forEach(function (v,i) {
                    $(".font-style").removeClass(v)
                    $(".title").removeClass(v)
                    $(".ko").removeClass(v)
                })
                $(".title").addClass(scope.colors[is])
                $(".font-style").addClass(scope.colors[is])
                $(".ko").addClass(scope.colors[is])
                $(".quan1").addClass(scope.cir[is])
                $(".quan1 .rounds").addClass(scope.color[is])
                scope.rounds=scope.color[is]
                scope.rounds1=scope.colors[is]
                scope.rounds2=scope.cir[is]
                scope.rounds3=scope.bgcolor[is]

            })
            $(el).on("blur","input",function () {
                $(this).closest(".lis").removeClass("lis1")

            })
            $(document).on("keyup",function (e) {
                var  id=parseInt($(".bgs").attr("data-id"))
                if(e.keyCode===8){
                    scope.$apply(function () {
                        scope.as=scope.as.filter(function (v,i){
                            return  v.id!==id
                        })
                        scope.current=scope.as[0]
                    })
                }

            })
        }
    }
}])
app.directive("finish",[function () {
    return{
        restrict:'AE',
        transclude:true,
        template:'<div class="col-md-12 line bgs1"   ng-repeat="v in current.todos|filter:{state:0}"  ng-click="bgs(v.id,$index)"><div class="quan1 circle0 {{rounds2}}" ng-click="nums1();v.state=1"></div><span class="border-bto2"><input type="text" ng-model="v.title" class="to-title" ng-blur="xiaoshi(v.id,v.title)"><span class="delete" v-id="{{v.id}}" ng-click="delete(v.id)">删除</span></span></div>',
        replace:true,
        link:function (scope,el) {
            var par=$(el).closest("ul")
            $(".new").on("click",function () {
                var max=-Infinity
                scope.current.todos.forEach(function(v,i){
                if(max<v.id){
                    max=v.id
                }
            })
                var item={
                    id:max+1,
                    title:"请添加内容",
                    state:0
                }
               scope.$apply(scope.current.todos.push(item))
        })
            $(".col-sm-8").on("click",".bgs1",function () {
              scope.bgcolor.forEach(function (v,i) {
                  $(".bgs1").removeClass(v)
              })
                scope.it=$(".bgs1").index($(this))
                console.log(scope.it)
                $(this).addClass(scope.rounds3)
            })
        }
    }
}])
